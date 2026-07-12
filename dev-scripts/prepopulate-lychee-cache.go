package main

import (
	"bufio"
	"bytes"
	"encoding/csv"
	"encoding/json"
	"errors"
	"fmt"
	"io"
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
	ccIndexURL  = "https://index.commoncrawl.org/collinfo.json"
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

var errCommonCrawlUnavailable = errors.New("Common Crawl index unavailable")

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "prepopulate lychee cache: %v\n", err)
		os.Exit(1)
	}
}

func run() error {
	now := time.Now().UTC()
	cutoff := now.Add(-cacheMaxAge)

	testDir, err := os.MkdirTemp("", "lychee-commoncrawl-*")
	if err != nil {
		return err
	}
	defer os.RemoveAll(testDir)

	if err := prepareTestDir(testDir); err != nil {
		return err
	}

	links, err := dumpExternalLinks(testDir)
	if err != nil {
		return err
	}

	cache, err := loadCache(cachePath, cutoff)
	if err != nil {
		return err
	}

	client := &http.Client{Timeout: 20 * time.Second}
	indexes, err := fetchRecentIndexes(client, cutoff)
	if err != nil {
		return err
	}
	if len(indexes) == 0 {
		fmt.Fprintln(os.Stderr, "Common Crawl index list unavailable; leaving lychee cache unchanged")
		return nil
	}

	added := 0
	skippedCached := 0
	missed := 0
	unavailableIndexes := map[string]bool{}
	for _, link := range links {
		if _, ok := cache[link]; ok {
			skippedCached++
			continue
		}

		entry, ok, err := lookupCommonCrawl(client, indexes, unavailableIndexes, link, cutoff)
		if err != nil {
			return err
		}
		if !ok {
			missed++
			continue
		}

		cache[link] = entry
		added++
	}

	if err := storeCache(cachePath, cache); err != nil {
		return err
	}

	fmt.Printf("Common Crawl cache prepopulation: %d external links, %d already cached, %d added, %d misses\n", len(links), skippedCached, added, missed)
	return nil
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

func fetchRecentIndexes(client *http.Client, cutoff time.Time) ([]commonCrawlIndex, error) {
	resp, err := client.Get(ccIndexURL)
	if err != nil {
		return nil, nil
	}
	defer resp.Body.Close()
	if resp.StatusCode == http.StatusTooManyRequests || resp.StatusCode >= 500 {
		return nil, nil
	}
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("fetch %s: %s", ccIndexURL, resp.Status)
	}

	var indexes []commonCrawlIndex
	if err := json.NewDecoder(resp.Body).Decode(&indexes); err != nil {
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

func lookupCommonCrawl(client *http.Client, indexes []commonCrawlIndex, unavailableIndexes map[string]bool, link string, cutoff time.Time) (cacheEntry, bool, error) {
	for _, index := range indexes {
		if unavailableIndexes[index.ID] {
			continue
		}

		record, ok, err := queryCommonCrawl(client, index, link)
		if errors.Is(err, errCommonCrawlUnavailable) {
			unavailableIndexes[index.ID] = true
			fmt.Fprintf(os.Stderr, "Common Crawl index %s unavailable; skipping it: %v\n", index.ID, err)
			continue
		}
		if err != nil {
			return cacheEntry{}, false, err
		}
		if !ok {
			continue
		}

		status, err := strconv.Atoi(record.Status)
		if err != nil || !shouldCacheStatus(status) {
			continue
		}

		crawlTime, err := parseCommonCrawlTimestamp(record.Timestamp)
		if err != nil {
			return cacheEntry{}, false, err
		}
		if crawlTime.Before(cutoff) {
			continue
		}

		return cacheEntry{URL: link, Status: status, Timestamp: crawlTime.Unix()}, true, nil
	}

	return cacheEntry{}, false, nil
}

func queryCommonCrawl(client *http.Client, index commonCrawlIndex, link string) (commonCrawlRecord, bool, error) {
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

	req, err := http.NewRequest(http.MethodGet, requestURL.String(), nil)
	if err != nil {
		return commonCrawlRecord{}, false, err
	}
	req.Header.Set("User-Agent", "mtlynch.io lychee cache warmer")

	resp, err := client.Do(req)
	if err != nil {
		return commonCrawlRecord{}, false, fmt.Errorf("%w: %v", errCommonCrawlUnavailable, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return commonCrawlRecord{}, false, nil
	}
	if resp.StatusCode == http.StatusTooManyRequests || resp.StatusCode >= 500 {
		return commonCrawlRecord{}, false, fmt.Errorf("%w: query %s for %s: %s", errCommonCrawlUnavailable, index.ID, link, resp.Status)
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
