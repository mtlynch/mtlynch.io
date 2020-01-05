# mtlynch.io

[![CircleCI](https://circleci.com/gh/mtlynch/mtlynch.io.svg?style=svg)](https://circleci.com/gh/mtlynch/mtlynch.io)

## Overview

This is the source for https://mtlynch.io/.

## Code style guides

New code should adhere to the appropriate Google Style guide for the given language:

* [HTML/CSS](https://google.github.io/styleguide/htmlcssguide.html)
* [JavaScript](https://google.github.io/styleguide/jsguide.html)

## Pull requests

### Merge conflicts

If a PR has merge conflicts with the main repo's `master` branch, rebase the PR onto `master`. Do not include merge commits in a PR.

### Pull request style

PRs should have a descriptive one-line summary to explain the change. The PR description should add any additional required context or explanation for the change. For simple or obvious PRs, a PR description is not required.

If the PR fixes an issue, include the text "Fixes #XX" in the PR description, where `XX` is the [repo issue](https://github.com/mtlynch/mtlynch.io/issues) number. This allows Github to cross-reference between PRs and issues.

## Build Failures

### HTMLProofer

If HTMLProofer fails on a broken link, we have three options: suppress the error, fix the link, or remove the link.

You should suppress the error if the link works fine in a browser, but fails in Travis occasionally. To do this, open `_tests/build`, update the `--url-ignore` flag for the `htmlproofer` command. Add a comment above the command to explain why we're adding this suppression. Be especially conservative about suppressing warnings on affiliate links (links to products that can be purchased) because we care when these die.

If the link is just permanently broken and does not load, even in a browser, either replace the link with another that achieves the same effect or remove the link entirely.

## Compatibility targets

The site should render properly on all of the following operating systems (latest stable releases):

* Android
* iOS
* Windows
* OS X
* Linux (any flavor)

The site should render properly on all the following browsers:

* Chrome
* Firefox
* Safari

### Compatibility testing

Developers need not verify every change on every possible OS/browser combination. Developers should test CSS or layout changes on at least one desktop OS and one mobile OS (preferably not the same browser for both). For more complex changes to CSS or layout, developers should test more than two OS+browser combinations, but it's at the developer's discretion how exhaustively to test.

## Prose style guide

### Headings

* Content headings start at `##` (`<h2>` in HTML).
* Headings use sentence-style capitalization (only first word is capitalized).
* Headings do not have trailing punctuation.

### Point of view

* Author is first-person singular (I).
* Reader is second-person singular (you).

### Readers

* Readers of the blog are collectively referred ot as "readers" or "visitors."
  * Readers are not referred to as "users" and should never be described as "traffic."

### Numbers

* For 1-9, spell out the number.
  * *Except*: When the number is a multiplier (2x, 9x).
* For all other numbers, use numerals.
* For numbers 1,000 or over, write commas to separate thousands.
* For number ranges, use a regular hyphen and no space (200-300).

### Time of day

* Use AM/PM, separated by a space (2 AM, 4:30 PM).

### Pronouns

* When referring to non-specific people (e.g. "the user", "the client"), use "they."

### Names

* reddit is written all lowercase.

### e.g. / i.e.

* Put e.g. or i.e. within parentheses (e.g. like this).

### Oxford comma

* Always use an Oxford comma.

### Spelling conventions

* ebook (not e-book)

## Encoding video for posts

Use ffmpeg with these settings:

```bash
ffmpeg \
  -i input.avi \
  -shortest \
  -vcodec libx264 \
  -movflags +faststart \
  -vf "format=yuv420p" \
  output.mp4
```