package main

import (
	"bufio"
	"bytes"
	"encoding/csv"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"time"
)

const (
	buildDir    = "public"
	cachePath   = ".lycheecache"
	cacheMaxAge = 45 * 24 * time.Hour

	ccIndexURL                    = "https://index.commoncrawl.org/collinfo.json"
	commonCrawlIndexListCachePath = ".commoncrawl-collinfo.json"
	commonCrawlCooldownPath       = ".commoncrawl-cooldown"

	commonCrawlIndexListCacheMaxAge = 24 * time.Hour
	commonCrawlCooldown             = 24 * time.Hour
	commonCrawlRequestInterval      = time.Second
	commonCrawlRetryWait            = 2 * time.Second
	commonCrawlRetryMaxWait         = time.Minute

	commonCrawlUserAgent = "mtlynch.io-lychee-cache-warmer/1.0 (+https://mtlynch.io/)"
)

type commonCrawlIndex struct {
	ID     string `json:"id"`
	CDXAPI string `json:"cdx-api"`
	From   string `json:"from"`
	To     string `json:"to"`
}

type commonCrawlRecord struct {
	URL       string `json:"url"`
	Status    string `json:"status"`
	Timestamp string `json:"timestamp"`
}

type cacheEntry struct {
	URL       string
	Status    int
	Timestamp int64
}

type commonCrawlClient struct {
	httpClient  *http.Client
	lastRequest time.Time
	cdxRequests int
}

var (
	errCommonCrawlUnavailable = errors.New("Common Crawl index unavailable")
	errStopCommonCrawl        = errors.New("stop Common Crawl lookups")
)

func main() {
	log.SetFlags(log.LstdFlags | log.LUTC)

	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "prepopulate lychee cache: %v\n", err)
		os.Exit(1)
	}
}

func run() error {
	started := time.Now()
	now := time.Now().UTC()
	cutoff := now.Add(-cacheMaxAge)
	log.Printf("Prepopulating lychee cache from Common Crawl records newer than %s", cutoff.Format(time.RFC3339))
	if until, ok, err := loadCommonCrawlCooldown(commonCrawlCooldownPath, now); err != nil {
		return err
	} else if ok {
		log.Printf("Common Crawl cooldown active until %s; leaving lychee cache unchanged", until.Format(time.RFC3339))
		return nil
	}

	testDir, err := os.MkdirTemp("", "lychee-commoncrawl-*")
	if err != nil {
		return err
	}
	defer os.RemoveAll(testDir)

	log.Printf("Preparing temporary site copy in %s", testDir)
	if err := prepareTestDir(testDir); err != nil {
		return err
	}

	log.Printf("Extracting external links with lychee --dump")
	links, err := dumpExternalLinks(testDir)
	if err != nil {
		return err
	}
	log.Printf("Found %d unique external links", len(links))

	cache, err := loadCache(cachePath, cutoff)
	if err != nil {
		return err
	}
	log.Printf("Loaded %d fresh lychee cache entries from %s", len(cache), cachePath)

	client := newCommonCrawlClient()
	log.Printf("Fetching Common Crawl index list from %s", ccIndexURL)
	indexes, err := fetchRecentIndexes(client, cutoff, now)
	if errors.Is(err, errStopCommonCrawl) {
		cooldownUntil := time.Now().UTC().Add(commonCrawlCooldown)
		if err := storeCommonCrawlCooldown(commonCrawlCooldownPath, cooldownUntil); err != nil {
			return err
		}
		log.Printf("Common Crawl index list blocked; leaving lychee cache unchanged: %v", err)
		log.Printf("Common Crawl cooldown active until %s", cooldownUntil.Format(time.RFC3339))
		return nil
	}
	if errors.Is(err, errCommonCrawlUnavailable) {
		log.Printf("Common Crawl index list unavailable; leaving lychee cache unchanged: %v", err)
		return nil
	}
	if err != nil {
		return err
	}
	if len(indexes) == 0 {
		log.Printf("Common Crawl index list unavailable; leaving lychee cache unchanged")
		return nil
	}
	log.Printf("Using %d recent Common Crawl indexes: %s", len(indexes), strings.Join(indexDescriptions(indexes), ", "))

	added := 0
	skippedCached := 0
	missed := 0
	skippedUnavailable := 0
	uncached := countUncachedLinks(links, cache)
	log.Printf("Looking up up to %d uncached links in Common Crawl with at least %s between API calls", uncached, commonCrawlRequestInterval)
	if uncached > 0 {
		log.Printf("Common Crawl URLs to query:")
		for _, link := range links {
			if _, ok := cache[link]; !ok {
				log.Printf("Common Crawl URL: %s", link)
			}
		}
	}
	for i, link := range links {
		if _, ok := cache[link]; ok {
			skippedCached++
			continue
		}
		queried := added + missed + skippedUnavailable + 1
		if queried == 1 || queried%25 == 0 {
			log.Printf("Common Crawl lookup progress: %d/%d uncached links processed, %d added, %d misses, %d skipped because indexes were unavailable", queried, uncached, added, missed, skippedUnavailable)
		}

		entry, ok, searched, err := lookupCommonCrawl(client, indexes, link, cutoff)
		if errors.Is(err, errStopCommonCrawl) {
			remaining := countUncachedLinks(links[i:], cache)
			skippedCached += countCachedLinks(links[i:], cache)
			skippedUnavailable += remaining
			cooldownUntil := time.Now().UTC().Add(commonCrawlCooldown)
			if err := storeCommonCrawlCooldown(commonCrawlCooldownPath, cooldownUntil); err != nil {
				return err
			}
			log.Printf("Stopping Common Crawl lookups after %d CDX requests; skipping %d remaining uncached links: %v", client.cdxRequests, remaining, err)
			log.Printf("Common Crawl cooldown active until %s", cooldownUntil.Format(time.RFC3339))
			break
		}
		if err != nil {
			return err
		}
		if !searched {
			remaining := countUncachedLinks(links[i:], cache)
			skippedCached += countCachedLinks(links[i:], cache)
			skippedUnavailable += remaining
			log.Printf("No usable recent Common Crawl indexes remain; skipping %d uncached links", remaining)
			break
		}
		if !ok {
			missed++
			continue
		}

		cache[link] = entry
		added++
	}

	log.Printf("Writing %d lychee cache entries to %s", len(cache), cachePath)
	if err := storeCache(cachePath, cache); err != nil {
		return err
	}

	log.Printf("Common Crawl cache prepopulation complete in %s after %d CDX requests: %d external links, %d already cached, %d added, %d misses, %d skipped because indexes were unavailable", time.Since(started).Round(time.Second), client.cdxRequests, len(links), skippedCached, added, missed, skippedUnavailable)
	return nil
}

func indexDescriptions(indexes []commonCrawlIndex) []string {
	descriptions := make([]string, 0, len(indexes))
	for _, index := range indexes {
		descriptions = append(descriptions, fmt.Sprintf("%s (%s)", index.ID, index.CDXAPI))
	}
	return descriptions
}

func countUncachedLinks(links []string, cache map[string]cacheEntry) int {
	uncached := 0
	for _, link := range links {
		if _, ok := cache[link]; !ok {
			uncached++
		}
	}
	return uncached
}

func countCachedLinks(links []string, cache map[string]cacheEntry) int {
	cached := 0
	for _, link := range links {
		if _, ok := cache[link]; ok {
			cached++
		}
	}
	return cached
}

func prepareTestDir(testDir string) error {
	if err := copyDir(buildDir, testDir); err != nil {
		return err
	}

	for _, path := range []string{
		filepath.Join(testDir, "collect-debt", "full-emails", "index.html"),
		filepath.Join(testDir, "notes", "archivebox", "reddit-singlefile.html"),
	} {
		if err := os.Remove(path); err != nil && !errors.Is(err, os.ErrNotExist) {
			return err
		}
	}

	return filepath.WalkDir(testDir, func(path string, d os.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() || filepath.Ext(path) != ".html" {
			return nil
		}

		contents, err := os.ReadFile(path)
		if err != nil {
			return err
		}
		contents = bytes.ReplaceAll(contents, []byte("https://mtlynch.io/"), []byte("/"))
		return os.WriteFile(path, contents, 0o644)
	})
}

func copyDir(src string, dst string) error {
	return filepath.WalkDir(src, func(path string, d os.DirEntry, err error) error {
		if err != nil {
			return err
		}

		rel, err := filepath.Rel(src, path)
		if err != nil {
			return err
		}
		target := filepath.Join(dst, rel)

		info, err := d.Info()
		if err != nil {
			return err
		}

		if d.IsDir() {
			return os.MkdirAll(target, info.Mode().Perm())
		}
		if !info.Mode().IsRegular() {
			return nil
		}

		input, err := os.Open(path)
		if err != nil {
			return err
		}

		output, err := os.OpenFile(target, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, info.Mode().Perm())
		if err != nil {
			input.Close()
			return err
		}

		_, copyErr := io.Copy(output, input)
		closeInputErr := input.Close()
		closeOutputErr := output.Close()
		if copyErr != nil {
			return copyErr
		}
		if closeInputErr != nil {
			return closeInputErr
		}
		return closeOutputErr
	})
}

func dumpExternalLinks(testDir string) ([]string, error) {
	cmd := exec.Command(
		"lychee",
		"--config", "lychee.toml",
		"--root-dir", testDir,
		"--dump",
		filepath.Join(testDir, "**", "*.html"),
	)
	output, err := cmd.Output()
	if err != nil {
		var exitErr *exec.ExitError
		if errors.As(err, &exitErr) {
			return nil, fmt.Errorf("lychee --dump failed: %s", string(exitErr.Stderr))
		}
		return nil, err
	}

	seen := map[string]bool{}
	var links []string
	scanner := bufio.NewScanner(bytes.NewReader(output))
	for scanner.Scan() {
		link := strings.TrimSpace(scanner.Text())
		if !strings.HasPrefix(link, "http://") && !strings.HasPrefix(link, "https://") {
			continue
		}
		if seen[link] {
			continue
		}
		seen[link] = true
		links = append(links, link)
	}
	if err := scanner.Err(); err != nil {
		return nil, err
	}
	sort.Strings(links)
	return links, nil
}

func loadCache(path string, cutoff time.Time) (map[string]cacheEntry, error) {
	cache := map[string]cacheEntry{}
	file, err := os.Open(path)
	if errors.Is(err, os.ErrNotExist) {
		return cache, nil
	}
	if err != nil {
		return nil, err
	}
	defer file.Close()

	reader := csv.NewReader(file)
	reader.FieldsPerRecord = 3
	for {
		record, err := reader.Read()
		if errors.Is(err, io.EOF) {
			break
		}
		if err != nil {
			return nil, err
		}

		status, err := strconv.Atoi(record[1])
		if err != nil || !shouldCacheStatus(status) {
			continue
		}
		timestamp, err := strconv.ParseInt(record[2], 10, 64)
		if err != nil {
			continue
		}
		if time.Unix(timestamp, 0).Before(cutoff) {
			continue
		}

		cache[record[0]] = cacheEntry{URL: record[0], Status: status, Timestamp: timestamp}
	}

	return cache, nil
}

func storeCache(path string, cache map[string]cacheEntry) error {
	entries := make([]cacheEntry, 0, len(cache))
	for _, entry := range cache {
		entries = append(entries, entry)
	}
	sort.Slice(entries, func(i, j int) bool {
		return entries[i].URL < entries[j].URL
	})

	tmpPath := path + ".tmp"
	defer os.Remove(tmpPath)

	file, err := os.OpenFile(tmpPath, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0o644)
	if err != nil {
		return err
	}

	writer := csv.NewWriter(file)
	for _, entry := range entries {
		if err := writer.Write([]string{entry.URL, strconv.Itoa(entry.Status), strconv.FormatInt(entry.Timestamp, 10)}); err != nil {
			file.Close()
			return err
		}
	}
	writer.Flush()
	if err := writer.Error(); err != nil {
		file.Close()
		return err
	}
	if err := file.Close(); err != nil {
		return err
	}
	return os.Rename(tmpPath, path)
}

func newCommonCrawlClient() *commonCrawlClient {
	return &commonCrawlClient{httpClient: &http.Client{Timeout: 20 * time.Second}}
}

func (client *commonCrawlClient) get(rawURL string, cdx bool) (*http.Response, error) {
	if wait := time.Until(client.lastRequest.Add(commonCrawlRequestInterval)); !client.lastRequest.IsZero() && wait > 0 {
		log.Printf("Sleeping %s before next Common Crawl API request", wait.Round(time.Second))
		time.Sleep(wait)
	}

	req, err := http.NewRequest(http.MethodGet, rawURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", commonCrawlUserAgent)

	if cdx {
		client.cdxRequests++
	}
	resp, err := client.httpClient.Do(req)
	client.lastRequest = time.Now()
	if err != nil {
		return nil, fmt.Errorf("%w: fetch %s: %v", errCommonCrawlUnavailable, rawURL, err)
	}
	return resp, nil
}

func loadCommonCrawlCooldown(path string, now time.Time) (time.Time, bool, error) {
	contents, err := os.ReadFile(path)
	if errors.Is(err, os.ErrNotExist) {
		return time.Time{}, false, nil
	}
	if err != nil {
		return time.Time{}, false, err
	}

	until, err := time.Parse(time.RFC3339, strings.TrimSpace(string(contents)))
	if err != nil {
		return time.Time{}, false, err
	}
	return until, now.Before(until), nil
}

func storeCommonCrawlCooldown(path string, until time.Time) error {
	tmpPath := path + ".tmp"
	defer os.Remove(tmpPath)
	if err := os.WriteFile(tmpPath, []byte(until.Format(time.RFC3339)+"\n"), 0o644); err != nil {
		return err
	}
	return os.Rename(tmpPath, path)
}

func loadCommonCrawlIndexListCache(path string, now time.Time) ([]byte, bool, error) {
	info, err := os.Stat(path)
	if errors.Is(err, os.ErrNotExist) {
		return nil, false, nil
	}
	if err != nil {
		return nil, false, err
	}
	if info.ModTime().Before(now.Add(-commonCrawlIndexListCacheMaxAge)) {
		return nil, false, nil
	}

	contents, err := os.ReadFile(path)
	if err != nil {
		return nil, false, err
	}
	return contents, true, nil
}

func storeCommonCrawlIndexListCache(path string, contents []byte) error {
	tmpPath := path + ".tmp"
	defer os.Remove(tmpPath)
	if err := os.WriteFile(tmpPath, contents, 0o644); err != nil {
		return err
	}
	return os.Rename(tmpPath, path)
}

func fetchRecentIndexes(client *commonCrawlClient, cutoff time.Time, now time.Time) ([]commonCrawlIndex, error) {
	contents, ok, err := loadCommonCrawlIndexListCache(commonCrawlIndexListCachePath, now)
	if err != nil {
		return nil, err
	}
	if ok {
		log.Printf("Using cached Common Crawl index list from %s", commonCrawlIndexListCachePath)
	} else {
		resp, err := client.get(ccIndexURL, false)
		if err != nil {
			return nil, fmt.Errorf("%w: fetch %s: %v", errStopCommonCrawl, ccIndexURL, err)
		}
		defer resp.Body.Close()
		if isCommonCrawlBackoffStatus(resp.StatusCode) {
			retryDelay := commonCrawlRetryDelay(resp)
			log.Printf("Common Crawl returned %s for index list; sleeping %s before stopping lookups", resp.Status, retryDelay)
			time.Sleep(retryDelay)
			return nil, fmt.Errorf("%w: fetch %s: %s", errStopCommonCrawl, ccIndexURL, resp.Status)
		}
		if resp.StatusCode != http.StatusOK {
			return nil, fmt.Errorf("fetch %s: %s", ccIndexURL, resp.Status)
		}

		contents, err = io.ReadAll(resp.Body)
		if err != nil {
			return nil, err
		}
		if err := storeCommonCrawlIndexListCache(commonCrawlIndexListCachePath, contents); err != nil {
			return nil, err
		}
	}

	var indexes []commonCrawlIndex
	if err := json.Unmarshal(contents, &indexes); err != nil {
		return nil, err
	}

	var recent []commonCrawlIndex
	for _, index := range indexes {
		to, err := time.Parse("2006-01-02T15:04:05", index.To)
		if err != nil {
			return nil, err
		}
		if to.Before(cutoff) {
			continue
		}
		recent = append(recent, index)
	}

	if len(recent) == 0 {
		return nil, fmt.Errorf("no Common Crawl indexes found since %s", cutoff.Format(time.RFC3339))
	}
	sort.Slice(recent, func(i, j int) bool {
		return recent[i].To > recent[j].To
	})
	return recent, nil
}

func lookupCommonCrawl(client *commonCrawlClient, indexes []commonCrawlIndex, link string, cutoff time.Time) (cacheEntry, bool, bool, error) {
	searched := false
	for _, index := range indexes {
		record, ok, err := queryCommonCrawl(client, index, link)
		if errors.Is(err, errStopCommonCrawl) {
			return cacheEntry{}, false, false, err
		}
		if err != nil {
			return cacheEntry{}, false, false, err
		}
		searched = true
		if !ok {
			continue
		}

		status, err := strconv.Atoi(record.Status)
		if err != nil || !shouldCacheStatus(status) {
			continue
		}

		crawlTime, err := parseCommonCrawlTimestamp(record.Timestamp)
		if err != nil {
			return cacheEntry{}, false, false, err
		}
		if crawlTime.Before(cutoff) {
			continue
		}

		return cacheEntry{URL: link, Status: status, Timestamp: crawlTime.Unix()}, true, true, nil
	}

	return cacheEntry{}, false, searched, nil
}

func queryCommonCrawl(client *commonCrawlClient, index commonCrawlIndex, link string) (commonCrawlRecord, bool, error) {
	requestURL, err := url.Parse(index.CDXAPI)
	if err != nil {
		return commonCrawlRecord{}, false, err
	}
	query := requestURL.Query()
	query.Set("url", link)
	query.Set("output", "json")
	query.Set("fl", "url,status,timestamp")
	query.Set("limit", "1")
	requestURL.RawQuery = query.Encode()

	resp, err := client.get(requestURL.String(), true)
	if err != nil {
		return commonCrawlRecord{}, false, fmt.Errorf("%w: %v", errStopCommonCrawl, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return commonCrawlRecord{}, false, nil
	}
	if isCommonCrawlBackoffStatus(resp.StatusCode) {
		retryDelay := commonCrawlRetryDelay(resp)
		log.Printf("Common Crawl returned %s for %s; sleeping %s before stopping lookups", resp.Status, index.ID, retryDelay)
		time.Sleep(retryDelay)
		return commonCrawlRecord{}, false, fmt.Errorf("%w: query %s for %s: %s", errStopCommonCrawl, index.ID, link, resp.Status)
	}
	if resp.StatusCode != http.StatusOK {
		return commonCrawlRecord{}, false, fmt.Errorf("query %s for %s: %s", index.ID, link, resp.Status)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return commonCrawlRecord{}, false, err
	}
	body = bytes.TrimSpace(body)
	if len(body) == 0 {
		return commonCrawlRecord{}, false, nil
	}

	line := body
	if newline := bytes.IndexByte(body, '\n'); newline >= 0 {
		line = body[:newline]
	}

	var record commonCrawlRecord
	if err := json.Unmarshal(line, &record); err != nil {
		return commonCrawlRecord{}, false, err
	}
	return record, true, nil
}

func isCommonCrawlBackoffStatus(status int) bool {
	switch status {
	case http.StatusTooManyRequests, http.StatusInternalServerError, http.StatusBadGateway, http.StatusServiceUnavailable, http.StatusGatewayTimeout, 509:
		return true
	default:
		return false
	}
}

func commonCrawlRetryDelay(resp *http.Response) time.Duration {
	retryAfter := strings.TrimSpace(resp.Header.Get("Retry-After"))
	if retryAfter == "" {
		return commonCrawlRetryWait
	}
	if seconds, err := strconv.Atoi(retryAfter); err == nil && seconds > 0 {
		return minDuration(time.Duration(seconds)*time.Second, commonCrawlRetryMaxWait)
	}
	if retryAt, err := http.ParseTime(retryAfter); err == nil {
		return minDuration(time.Until(retryAt), commonCrawlRetryMaxWait)
	}
	return commonCrawlRetryWait
}

func minDuration(a time.Duration, b time.Duration) time.Duration {
	if a < 0 {
		return 0
	}
	if a < b {
		return a
	}
	return b
}

func shouldCacheStatus(status int) bool {
	return (status >= 100 && status <= 103) || (status >= 200 && status <= 299) || status == 403
}

var commonCrawlTimestamp = regexp.MustCompile(`^\d{14}$`)

func parseCommonCrawlTimestamp(value string) (time.Time, error) {
	if !commonCrawlTimestamp.MatchString(value) {
		return time.Time{}, fmt.Errorf("invalid Common Crawl timestamp %q", value)
	}
	return time.ParseInLocation("20060102150405", value, time.UTC)
}
