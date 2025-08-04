---
title: "Educational Products: Month 10"
date: "2025-08-08"
description: TODO - One-line summary
---

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Talk to at least 10 readers I haven't spoken to before

- **Result**: XX
- **Grade**: XX

TODO

### Clear the backlog of my marketing ideas.

- **Result**: XX
- **Grade**: XX

TODO

### Publish a new chapter of _Refactoring English_

- **Result**: Published ["Underused Techniques for Effective Emails"](https://refactoringenglish.com/chapters/techniques-for-writing-emails/)
- **Grade**: A

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

## What if everyone just likes the _feeling_ of buying a book?

Concerned that everyone just is buying it to feel like they're investing in writing.

## Topic 2

## Topic 3

## Side projects

### Replacing a 300-hour Vue app with a static site generator in 10 hours

### Sunsetting What Got Done

- [Announced shutdown of What Got Done](https://github.com/mtlynch/whatgotdone/pull/966)
- Added a feature to [let users export their posts in Markdown format](https://github.com/mtlynch/whatgotdone/pull/963)
- Added support to [include externally referenced images in Markdown exports](https://github.com/mtlynch/whatgotdone/pull/964)
  - But then I realized it was pretty resource-intensive and error-prone, so I [reverted the image part](https://github.com/mtlynch/whatgotdone/pull/965) and rely instead on importers to handle that.
- Added a feature that lets users to [set up a forwarding address for post-WhatGotDone shutdown](https://github.com/mtlynch/whatgotdone/pull/970)
  - Example (profile)
    - Original: `whatgotdone.com/michael`
    - Redirects to: `weeks.mtlynch.io`
  - Example (weekly update)
    - Original: `whatgotdone.com/michael/2025-07-04`
    - Redirects to: `weeks.mtlynch.io/2025-07-04`
- Moved the data export feature [to its own page](https://github.com/mtlynch/whatgotdone/pull/968)

### Simplifying my AIM log parser in Gleam

TODO: Talk about throwing out splitting and lexing.

I also got it to parse timestamps, which is a pain in some AIM logs, as the messages themselves are only fragments of a timestamp:

```gleam
pub fn parse_simple_plaintext_log_test() {
  "
Session Start (AIM - DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005
[18:44] Jane: hi
[18:55] Me: hey whats up
Session Close (Jane): Mon Sep 12 18:56:02 2005

"
  |> string.trim_start
  |> plaintext_parser.parse
  |> should.equal([
    plaintext_parser.Message(
      timestamp: must_parse_rfc3339("2005-09-12T18:44:00-04:00"),
      sender: "Jane",
      body: "hi",
    ),
    plaintext_parser.Message(
      timestamp: must_parse_rfc3339("2005-09-12T18:55:00-04:00"),
      sender: "Me",
      body: "hey whats up",
    ),
  ])
}
```

## Wrap up

### What got done?

- Migrated all the web content of _Refactoring English_ to the ebook.
- Published ["Migrating a ZFS pool from RAIDZ1 to RAIDZ2"](https://mtlynch.io/raidz1-to-raidz2/)
- Added [file expiration options for guests on PicoShare](https://github.com/mtlynch/picoshare/pull/694)

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
