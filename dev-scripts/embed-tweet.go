// /usr/bin/env true; exec /usr/bin/env go run "$0" "$@"
package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"time"
)

type TweetCache struct {
	URL                string    `json:"url"`
	CachedAt           string    `json:"cached_at"`
	ProfileImageBase64 string    `json:"profile_image_base64"`
	TweetData          TweetData `json:"tweet_data"`
}

type TweetData struct {
	Typename  string       `json:"__typename,omitempty"`
	CreatedAt string       `json:"created_at,omitempty"`
	Text      string       `json:"text,omitempty"`
	Lang      string       `json:"lang,omitempty"`
	User      TweetUser    `json:"user,omitempty"`
	Entities  TweetEntities `json:"entities,omitempty"`
}

type TweetUser struct {
	ScreenName        string `json:"screen_name"`
	Name              string `json:"name"`
	ProfileImageShape string `json:"profile_image_shape,omitempty"`
}

type TweetEntities struct {
	URLs         []EntityURL         `json:"urls,omitempty"`
	Hashtags     []EntityHashtag     `json:"hashtags,omitempty"`
	UserMentions []EntityUserMention `json:"user_mentions,omitempty"`
	Media        []EntityMedia       `json:"media,omitempty"`
}

type EntityURL struct {
	Indices     []int  `json:"indices"`
	ExpandedURL string `json:"expanded_url"`
	DisplayURL  string `json:"display_url"`
	URL         string `json:"url"`
}

type EntityHashtag struct {
	Indices []int  `json:"indices"`
	Text    string `json:"text"`
}

type EntityUserMention struct {
	Indices    []int  `json:"indices"`
	ScreenName string `json:"screen_name"`
}

type EntityMedia struct {
	Indices []int  `json:"indices"`
	URL     string `json:"url"`
}

func main() {
	if len(os.Args) < 2 {
		fmt.Fprintf(os.Stderr, "Usage: %s <twitter-url>\n", os.Args[0])
		fmt.Fprintf(os.Stderr, "Example: %s https://twitter.com/user/status/1234567890\n", os.Args[0])
		os.Exit(1)
	}

	twitterURL := os.Args[1]

	// Extract tweet ID from URL
	tweetID := extractTweetID(twitterURL)
	if tweetID == "" {
		fmt.Fprintf(os.Stderr, "Error: Could not extract tweet ID from URL: %s\n", twitterURL)
		os.Exit(1)
	}

	fmt.Printf("Downloading tweet: %s ...\n", twitterURL)

	// Fetch tweet data from Twitter syndication API
	rawTweetData, err := fetchTweetData(tweetID)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error fetching tweet data: %v\n", err)
		os.Exit(1)
	}

	// Extract only the fields we need
	filteredTweetData := filterTweetData(rawTweetData)

	// Download and encode profile image
	profileImageURL := getProfileImageURL(rawTweetData)
	if profileImageURL == "" {
		fmt.Fprintf(os.Stderr, "Error: Could not find profile image URL in tweet data\n")
		os.Exit(1)
	}

	profileImageBase64, err := downloadAndEncodeImage(profileImageURL)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error downloading profile image: %v\n", err)
		os.Exit(1)
	}

	// Create cache object
	cache := TweetCache{
		URL:                twitterURL,
		CachedAt:           time.Now().UTC().Format(time.RFC3339),
		ProfileImageBase64: profileImageBase64,
		TweetData:          filteredTweetData,
	}

	// Save to data/tweet-data/[tweet-id].json
	if err := saveCacheFile(tweetID, cache); err != nil {
		fmt.Fprintf(os.Stderr, "Error saving cache file: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("Cached tweet locally!")
	fmt.Println("Embed in your blog like this:")
	fmt.Println()
	fmt.Printf("{{<tweet cached-url=\"%s\">}}\n", twitterURL)
}

func extractTweetID(url string) string {
	// Match patterns like:
	// https://twitter.com/user/status/1234567890
	// https://x.com/user/status/1234567890
	re := regexp.MustCompile(`(?:twitter\.com|x\.com)/[^/]+/status/(\d+)`)
	matches := re.FindStringSubmatch(url)
	if len(matches) > 1 {
		return matches[1]
	}
	return ""
}

func fetchTweetData(tweetID string) (map[string]interface{}, error) {
	// Use Twitter's syndication API (same as current shortcode)
	token := time.Now().Unix() % 10000
	apiURL := fmt.Sprintf("https://cdn.syndication.twimg.com/tweet-result?id=%s&lang=en&token=%d", tweetID, token)

	resp, err := http.Get(apiURL)
	if err != nil {
		return nil, fmt.Errorf("HTTP request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API returned status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	var data map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %w", err)
	}

	return data, nil
}

func filterTweetData(rawData map[string]interface{}) TweetData {
	filtered := TweetData{}

	// Extract __typename (for detecting deleted tweets)
	if typename, ok := rawData["__typename"].(string); ok {
		filtered.Typename = typename
	}

	// Extract created_at
	if createdAt, ok := rawData["created_at"].(string); ok {
		filtered.CreatedAt = createdAt
	}

	// Extract text
	if text, ok := rawData["text"].(string); ok {
		filtered.Text = text
	}

	// Extract lang
	if lang, ok := rawData["lang"].(string); ok {
		filtered.Lang = lang
	}

	// Extract user data
	if userRaw, ok := rawData["user"].(map[string]interface{}); ok {
		filtered.User = TweetUser{}
		if screenName, ok := userRaw["screen_name"].(string); ok {
			filtered.User.ScreenName = screenName
		}
		if name, ok := userRaw["name"].(string); ok {
			filtered.User.Name = name
		}
		if profileImageShape, ok := userRaw["profile_image_shape"].(string); ok {
			filtered.User.ProfileImageShape = profileImageShape
		}
	}

	// Extract entities
	if entitiesRaw, ok := rawData["entities"].(map[string]interface{}); ok {
		filtered.Entities = TweetEntities{}

		// Extract URLs
		if urlsRaw, ok := entitiesRaw["urls"].([]interface{}); ok {
			for _, urlItem := range urlsRaw {
				if urlMap, ok := urlItem.(map[string]interface{}); ok {
					entity := EntityURL{}
					if indices, ok := urlMap["indices"].([]interface{}); ok {
						entity.Indices = make([]int, len(indices))
						for i, idx := range indices {
							if idxFloat, ok := idx.(float64); ok {
								entity.Indices[i] = int(idxFloat)
							}
						}
					}
					if expandedURL, ok := urlMap["expanded_url"].(string); ok {
						entity.ExpandedURL = expandedURL
					}
					if displayURL, ok := urlMap["display_url"].(string); ok {
						entity.DisplayURL = displayURL
					}
					if url, ok := urlMap["url"].(string); ok {
						entity.URL = url
					}
					filtered.Entities.URLs = append(filtered.Entities.URLs, entity)
				}
			}
		}

		// Extract hashtags
		if hashtagsRaw, ok := entitiesRaw["hashtags"].([]interface{}); ok {
			for _, hashtagItem := range hashtagsRaw {
				if hashtagMap, ok := hashtagItem.(map[string]interface{}); ok {
					entity := EntityHashtag{}
					if indices, ok := hashtagMap["indices"].([]interface{}); ok {
						entity.Indices = make([]int, len(indices))
						for i, idx := range indices {
							if idxFloat, ok := idx.(float64); ok {
								entity.Indices[i] = int(idxFloat)
							}
						}
					}
					if text, ok := hashtagMap["text"].(string); ok {
						entity.Text = text
					}
					filtered.Entities.Hashtags = append(filtered.Entities.Hashtags, entity)
				}
			}
		}

		// Extract user mentions
		if mentionsRaw, ok := entitiesRaw["user_mentions"].([]interface{}); ok {
			for _, mentionItem := range mentionsRaw {
				if mentionMap, ok := mentionItem.(map[string]interface{}); ok {
					entity := EntityUserMention{}
					if indices, ok := mentionMap["indices"].([]interface{}); ok {
						entity.Indices = make([]int, len(indices))
						for i, idx := range indices {
							if idxFloat, ok := idx.(float64); ok {
								entity.Indices[i] = int(idxFloat)
							}
						}
					}
					if screenName, ok := mentionMap["screen_name"].(string); ok {
						entity.ScreenName = screenName
					}
					filtered.Entities.UserMentions = append(filtered.Entities.UserMentions, entity)
				}
			}
		}

		// Extract media
		if mediaRaw, ok := entitiesRaw["media"].([]interface{}); ok {
			for _, mediaItem := range mediaRaw {
				if mediaMap, ok := mediaItem.(map[string]interface{}); ok {
					entity := EntityMedia{}
					if indices, ok := mediaMap["indices"].([]interface{}); ok {
						entity.Indices = make([]int, len(indices))
						for i, idx := range indices {
							if idxFloat, ok := idx.(float64); ok {
								entity.Indices[i] = int(idxFloat)
							}
						}
					}
					if url, ok := mediaMap["url"].(string); ok {
						entity.URL = url
					}
					filtered.Entities.Media = append(filtered.Entities.Media, entity)
				}
			}
		}
	}

	return filtered
}

func getProfileImageURL(tweetData map[string]interface{}) string {
	user, ok := tweetData["user"].(map[string]interface{})
	if !ok {
		return ""
	}

	profileImageURL, ok := user["profile_image_url_https"].(string)
	if !ok {
		return ""
	}

	return profileImageURL
}

func downloadAndEncodeImage(imageURL string) (string, error) {
	resp, err := http.Get(imageURL)
	if err != nil {
		return "", fmt.Errorf("failed to download image: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("image download returned status %d", resp.StatusCode)
	}

	imageData, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read image data: %w", err)
	}

	// Determine content type
	contentType := resp.Header.Get("Content-Type")
	if contentType == "" {
		contentType = "image/jpeg" // default
	}

	// Encode as base64 data URI
	encoded := base64.StdEncoding.EncodeToString(imageData)
	dataURI := fmt.Sprintf("data:%s;base64,%s", contentType, encoded)

	return dataURI, nil
}

func saveCacheFile(tweetID string, cache TweetCache) error {
	// Create data/tweet-data directory if it doesn't exist
	dataDir := "data/tweet-data"
	if err := os.MkdirAll(dataDir, 0755); err != nil {
		return fmt.Errorf("failed to create directory: %w", err)
	}

	// Write JSON file
	filename := filepath.Join(dataDir, fmt.Sprintf("%s.json", tweetID))
	jsonData, err := json.MarshalIndent(cache, "", "  ")
	if err != nil {
		return fmt.Errorf("failed to marshal JSON: %w", err)
	}

	if err := os.WriteFile(filename, jsonData, 0644); err != nil {
		return fmt.Errorf("failed to write file: %w", err)
	}

	return nil
}
