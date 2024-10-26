---
title: "Llama3.1 Nemotron Ollama"
date: 2024-10-26T11:37:26-04:00
---

## Provisioning a cloud server with a GPU

To run this experiment, I provisioned the following server on [Scaleway](https://scaleway.com):

- Server instance type: H100-1-80G
- OS: Debian 12
- Disk size: 200 GB (needed because the model is large)

To SSH in, I ran the following command with port forwarding because I'll need access to the web interface that will run on the server's `localhost` interface.

```bash
TARGET_IP='51.159.150.3' # Change to your server's IP.
REMOTE_PORT='8080'
LOCAL_PORT='8080'

# SSH in and port-forward a port to access the Open-WebUI web interface.
ssh "${TARGET_IP}" -L "${REMOTE_PORT}:localhost:${LOCAL_PORT}"
```

## Install docker

Next, install Docker so that you can run ollama under the Open-WebUI web interface for Ollama:

```bash
sudo apt-get update && \
   sudo apt-get install ca-certificates curl && \
   sudo install -m 0755 -d /etc/apt/keyrings && \
  sudo curl -fsSL https://download.docker.com/linux/debian/gpg \
    -o /etc/apt/keyrings/docker.asc && \
  sudo chmod a+r /etc/apt/keyrings/docker.asc &&\
  echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
  sudo apt-get update && \
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin && \
  sudo usermod -aG docker "${USER}" && \
  newgrp docker
```

To test everything is working, run the following command:

```bash
docker run hello-world
```

## Start Ollama and Open-WebUI

I adapted the standard [Open-WebUI](https://github.com/open-webui/open-webui) Docker Compose file to make one for Ollama, which you can download and run with the following command:

```bash
docker run \
  -d \
  -p 8080:8080 \
  --gpus=all \
  -v ollama:/root/.ollama \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:ollama
```

Once the server is up and running, visit the following URL in your browser:

- <http://localhost:8080>

You'll first see a page prompting for a login. Click "Sign up."

{{<img src="open-webui-signup.webp" has-border="true">}}

Then enter any details. You don't really need a valid email, as far as I can tell.

{{<img src="open-webui-create-account.webp" has-border="true">}}

From here, you need to download a model to use. Click the settings button:

{{<img src="open-webui-settings-button.webp" has-border="true">}}

Click where it says `Pull a model from Ollama.com`:

{{<img src="open-webui-select-model.webp" has-border="true">}}

{{<img src="open-webui-specify-nemotron.webp" has-border="true">}}

It's going to sit at 100% for a while, but it's not done until you see a popup announcing the model is fully downloaded.

---

---

## Test 1: Create unit tests for a Go function

For the first test, I asked Nemotron to write unit tests for a function in PicoShare:

### Prompt

Create unit tests for this code:

```go
package parse

import (
	"errors"
	"strings"

	"github.com/mtlynch/picoshare/v2/picoshare"
)

// MaxFilenameBytes is the maximum number of bytes allowed for uploaded files
// There's no technical reason on PicoShare's side for this limitation, but it's
// useful to have some upper bound to limit malicious inputs, and 255 is a
// common filename limit (in single-byte characters) across most filesystems.
const MaxFilenameBytes = 255

var ErrFilenameEmpty = errors.New("filename must be non-empty")
var ErrFilenameTooLong = errors.New("filename too long")
var ErrFilenameHasDotPrefix = errors.New("filename cannot begin with dots")
var ErrFilenameIllegalCharacters = errors.New("illegal characters in filename")

func Filename(s string) (picoshare.Filename, error) {
	if s == "" {
		return picoshare.Filename(""), ErrFilenameEmpty
	}
	if len(s) > MaxFilenameBytes {
		return picoshare.Filename(""), ErrFilenameTooLong
	}
	if s == "." || strings.HasPrefix(s, "..") {
		return picoshare.Filename(""), ErrFilenameHasDotPrefix
	}
	if strings.ContainsAny(s, "\\/\a\b\t\n\v\f\r\n") {
		return picoshare.Filename(""), ErrFilenameIllegalCharacters
	}
	return picoshare.Filename(s), nil
}
```

Match the style conventions of this file:

```go
package parse_test

import (
	"fmt"
	"strings"
	"testing"

	"github.com/mtlynch/picoshare/v2/handlers/parse"
	"github.com/mtlynch/picoshare/v2/picoshare"
)

func TestGuestLinkLabel(t *testing.T) {
	for _, tt := range []struct {
		description string
		input       string
		output      picoshare.GuestLinkLabel
		err         error
	}{
		{
			description: "accept valid label",
			input:       "For my good pals",
			output:      picoshare.GuestLinkLabel("For my good pals"),
			err:         nil,
		},
		{
			description: "allow empty label",
			input:       "",
			output:      picoshare.GuestLinkLabel(""),
			err:         nil,
		},
		{
			description: "reject labels that are too long",
			input:       strings.Repeat("A", parse.MaxGuestLinkLabelLength+1),
			output:      picoshare.GuestLinkLabel(""),
			err:         parse.ErrGuestLinkLabelTooLong,
		},
	} {
		t.Run(fmt.Sprintf("%s [%s]", tt.description, tt.input), func(t *testing.T) {
			label, err := parse.GuestLinkLabel(tt.input)
			if got, want := err, tt.err; got != want {
				t.Fatalf("err=%v, want=%v", err, want)
			}
			if got, want := label, tt.output; got != want {
				t.Errorf("label=%v, want=%v", label, want)
			}
		})
	}
}
```

Output:

```go
package parse_test
import (
    "fmt"
    "strings"
    "testing"
    "github.com/mtlynch/picoshare/v2/picoshare"
    "github.com/mtlynch/picoshare/v2/parse"
)

func TestFilename(t *testing.T) {
    for _, tt := range []struct {
        description string
        input       string
        output      picoshare.Filename
        err         error
    }{
        {
            description: "accept valid filename",
            input:       "example.txt",
            output:      picoshare.Filename("example.txt"),
            err:         nil,
        },
        {
        (description: "reject empty filename",
            input:       "",
            output:      picoshare.Filename(""),
            err:         parse.ErrFilenameEmpty,
        },
        {
            description: "reject filename too long",
            input:       strings.Repeat("A", parse.MaxFilenameBytes+1),
            output:      picoshare.Filename(""),
            err:         parse.ErrFilenameTooLong,
        },
        {
            description: "reject filename with dot prefix (single dot)",
            input:       ".hidden",
            output:      picoshare.Filename(""),
            err:         parse.ErrFilenameHasDotPrefix,
        },
        {
            description: "reject filename with dot prefix (double dots)",
            input:       "..parentdir",
            output:      picoshare.Filename(""),
            err:         parse.ErrFilenameHasDotPrefix,
        },
        {
        (description: "reject filename with illegal characters (slash)",
            input:       "example/file.txt",
            output:      picoshare.Filename(""),
            err:         parse.ErrFilenameIllegalCharacters,
        },
        {
            description: "reject filename with illegal characters (backspace)",
            input:       "example\x08.txt", // \x08 represents a backspace character
            output:      picoshare.Filename(""),
            err:         parse.ErrFilenameIllegalCharacters,
        },
    } {
        t.Run(fmt.Sprintf("%s [%s]", tt.description, tt.input), func(t *testing.T) {
            filename, err := parse.Filename(tt.input)
            if got, want := err, tt.err; got != want {
                t.Fatalf("err=%v, want=%v", err, want)
            }
            if got, want := filename, tt.output; got != want {
                t.Errorf("filename=%v, want=%v", filename, want)
            }
        })
    }
}
```

Nemotron did okay, but it makes some mistakes:

- It gets the wrong path for the import, which it should have learned from the example test.
- It has syntax errors where it sometimes puts in `(` instead tabs before `description`.
- It misunderstood the behavior of the function and created a test with the wrong expectation.
  - `.hidden` is a legal filename on PicoShare

It otherwise created valid tests that have decent coverage of the behavior. I compared it with `claude-3-5-sonnet-20241022`, and Claude created similar tests but without Nemotron's errors.

## Test 2: Refactor SQL queries in Go

### Input

```go
package sqlite
import (
    "database/sql"
    "log"
    "github.com/mtlynch/picoshare/v2/picoshare"
)
func (d DB) InsertEntryDownload(id picoshare.EntryID, r picoshare.DownloadRecord) error {
    log.Printf("recording download of file ID %s from client %s", id.String(), r.ClientIP)
    if _, err := d.ctx.Exec(`
    INSERT INTO
        downloads
    (
        entry_id,
        download_timestamp,
        client_ip,
        user_agent
    )
    VALUES(?,?,?,?)`,
        id.String(),
        formatTime(r.Time),
        r.ClientIP,
        r.UserAgent,
    ); err != nil {
        log.Printf("insert into downloads table failed: %v", err)
        return err
    }
    return nil
}

func (d DB) GetEntryDownloads(id picoshare.EntryID) ([]picoshare.DownloadRecord, error) {
    rows, err := d.ctx.Query(`
    SELECT
        download_timestamp,
        client_ip,
        user_agent
    FROM
        downloads
    WHERE
        entry_id=?
    ORDER BY
        download_timestamp DESC`, id)
    if err == sql.ErrNoRows {
        return []picoshare.DownloadRecord{}, nil
    } else if err != nil {
        return []picoshare.DownloadRecord{}, err
    }
    downloads := []picoshare.DownloadRecord{}
    for rows.Next() {
        var downloadTimeRaw string
        var clientIP string
        var userAgent string
        if err := rows.Scan(&downloadTimeRaw, &clientIP, &userAgent); err != nil {
            return []picoshare.DownloadRecord{}, err
        }
        dt, err := parseDatetime(downloadTimeRaw)
        if err != nil {
            return []picoshare.DownloadRecord{}, err
        }
        downloads = append(downloads, picoshare.DownloadRecord{
            Time:      dt,
            ClientIP:  clientIP,
            UserAgent: userAgent,
        })
    }
    return downloads, nil
}
```

### Output

```go
package sqlite

import (
    "database/sql"
    "log"
    "github.com/mtlynch/picoshare/v2/picoshare"
)

func (d DB) InsertEntryDownload(id picoshare.EntryID, r picoshare.DownloadRecord) error {
    log.Printf("recording download of file ID %s from client %s", id.String(), r.ClientIP)
    params := []sql.NamedArg{
        {Name: "entry_id", Value: id.String()},
        {Name: "download_timestamp", Value: formatTime(r.Time)},
        {Name: "client_ip", Value: r.ClientIP},
        {Name: "user_agent", Value: r.UserAgent},
    }
    if _, err := d.ctx.Exec(`
    INSERT INTO
        downloads
    (
        entry_id,
        download_timestamp,
        client_ip,
        user_agent
    )
    VALUES(:entry_id, :download_timestamp, :client_ip, :user_agent)`,
        params...,
    ); err != nil {
        log.Printf("insert into downloads table failed: %v", err)
        return err
    }
    return nil
}

func (d DB) GetEntryDownloads(id picoshare.EntryID) ([]picoshare.DownloadRecord, error) {
    params := []sql.NamedArg{
        {Name: "entry_id", Value: id},
    }
    rows, err := d.ctx.Query(`
    SELECT
        download_timestamp,
        client_ip,
        user_agent
    FROM
        downloads
    WHERE
        entry_id=:entry_id
    ORDER BY
        download_timestamp DESC`,
        params...,
    )
    if err == sql.ErrNoRows {
        return []picoshare.DownloadRecord{}, nil
    } else if err != nil {
        return []picoshare.DownloadRecord{}, err
    }
    downloads := []picoshare.DownloadRecord{}
    for rows.Next() {
        var downloadTimeRaw string
        var clientIP string
        var userAgent string
        if err := rows.Scan(&downloadTimeRaw, &clientIP, &userAgent); err != nil {
            return []picoshare.DownloadRecord{}, err
        }
        dt, err := parseDatetime(downloadTimeRaw)
        if err != nil {
            return []picoshare.DownloadRecord{}, err
        }
        downloads = append(downloads, picoshare.DownloadRecord{
            Time:      dt,
            ClientIP:  clientIP,
            UserAgent: userAgent,
        })
    }
    return downloads, nil
}
```
