# mtlynch.io

[![NixCI](https://nix-ci.com/badge/gh:mtlynch:mtlynch.io)](https://nix-ci.com/gh:mtlynch:mtlynch.io)
[![Creative Commons License CC-BY 4.0](https://i.creativecommons.org/l/by/4.0/80x15.png)](https://creativecommons.org/licenses/by/4.0/)

## Overview

This is the source for https://mtlynch.io/.

## Deployment

NixCI deploys commits on `master` to https://mtlynch.io/ and publishes Surge previews for commits on other branches and pull requests. Preview deployment logs include the preview URL and a revision message identifying the Git ref and commit.

Deployment requires the `SURGE_TOKEN` secret in NixCI. To deploy the current branch locally:

```bash
SURGE_TOKEN='your-token' nix run .#deploy-to-surge
```

Use `-- --preview` to force a preview without deploying to production.

## Code style guides

New code should adhere to the appropriate Google Style guide for the given language:

- [HTML/CSS](https://google.github.io/styleguide/htmlcssguide.html)
- [JavaScript](https://google.github.io/styleguide/jsguide.html)

## Pull requests

### Merge conflicts

If a PR has merge conflicts with the main repo's `master` branch, rebase the PR onto `master`. Do not include merge commits in a PR.

### Pull request style

PRs should have a descriptive one-line summary to explain the change. The PR description should add any additional required context or explanation for the change. For simple or obvious PRs, a PR description is not required.

If the PR fixes an issue, include the text "Fixes #XX" in the PR description, where `XX` is the [repo issue](https://github.com/mtlynch/mtlynch.io/issues) number. This allows GitHub to cross-reference between PRs and issues.

## Build Failures

### Link checks

lychee checks local links, fragments, and assets in the generated HTML with `nix build .#check-html`. External links are extracted from all Markdown files and checked separately with `nix build .#check-external-links`.

The external check uses a network-enabled fixed-output Nix derivation. Its successful output is a manifest of the sorted, unique URLs, the checker identity, the checking script, and the configuration. Prose-only edits rebuild extraction but reuse the successful check when this manifest is unchanged. Extraction happens during Nix evaluation (import from derivation), so evaluating the flake requires building or downloading the extractor and its inputs. NixCI explicitly enables this in `nix-ci.nix`.

Successful checks do not expire automatically. Bump `externalLinks.refresh` in [`flake.nix`](./flake.nix) to revalidate unchanged links. An unsuccessful check publishes no result and will be retried on the next build. This caches the whole URL set, not individual URLs; adding a link checks the entire set again.

If lychee fails on a broken link, either suppress the error, fix the link, or remove the link. Suppress errors only when the link works in a browser but intermittently fails in CI: update `exclude` in [`lychee.toml`](./lychee.toml) with a comment explaining why. Local checks have separate exclusions in [`lychee-local.toml`](./lychee-local.toml), so external asset exclusions do not disable local asset validation. External fragments are not validated, but their target pages are checked.

If the link is just permanently broken and does not load, even in a browser, either replace the link with another that achieves the same effect or remove the link entirely.

Run `nix develop --command python3 dev-scripts/test-link-checks.py` to test extraction, cache reuse/invalidation, failed-check retries, and local HTML validation against fixtures. These tests contact only a local HTTP server, not public websites.

## Compatibility targets

The site should render properly on all of the following operating systems (latest stable releases):

- Android
- iOS
- Windows
- OS X
- Linux (any flavor)

The site should render properly on all the following browsers:

- Chrome
- Firefox
- Safari

### Compatibility testing

Developers need not verify every change on every possible OS/browser combination. Developers should test CSS or layout changes on at least one desktop OS and one mobile OS (preferably not the same browser for both). For more complex changes to CSS or layout, developers should test more than two OS+browser combinations, but it's at the developer's discretion how exhaustively to test.

## Prose style guide

### Headings

- Content headings start at `##` (`<h2>` in HTML).
- Headings use sentence-style capitalization (only first word is capitalized).
- Headings do not have trailing punctuation.

### Point of view

- Author is first-person singular (I).
- Reader is second-person singular (you).

### Readers

- Readers of the blog are collectively referred to as "readers" or "visitors."
  - Readers are not referred to as "users" and should never be described as "traffic."

### Numbers

- For 1-9, spell out the number.
  - _Except_: When the number is a multiplier (2x, 9x).
- For all other numbers, use numerals.
- For numbers 1,000 or over, write commas to separate thousands.
- For number ranges, use a regular hyphen and no space (200-300).

### Time of day

- Use AM/PM, separated by a space (2 AM, 4:30 PM).

### Pronouns

- When referring to non-specific people (e.g. "the user", "the client"), use "they."

### Names

- reddit is written all lowercase.
- GitHub capitalizes the 'H'.
- GitLab capitalizes the 'L'.

### e.g. / i.e.

- Put e.g. or i.e. within parentheses (e.g., like this).

### Oxford comma

- Always use an Oxford comma.

### Spelling conventions

- ebook (not e-book)
