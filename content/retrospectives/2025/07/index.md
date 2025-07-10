---
title: "Educational Products: Month 9"
date: "2025-07-09"
description: TODO - One-line summary
---

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Offer a lower-friction way for users to pre-order my book

- **Result**: Switched to Stripe payment links
- **Grade**: XX

7 customers in May via Kickstarter vs. 21 (ending in tdmack on Jul 2)

### Publish a new sample chapter on the book website

- **Result**: XX
- **Grade**: XX

TODO

### - Meet at least 10 readers on video calls

- **Result**: Met three readers on video calls.
- **Grade**: D

TODO

## Business metrics

Metrics are back! I used to [publish my finances every month](/retrospectives/2024/04/#tinypilot-stats), but I stopped after I sold TinyPilot, as there weren't really finances to report. Now, that I have income coming in more regularly from the book, I can share numbers again.

{{<project-metrics project="refactoring_english">}}

## How can I juggle fewer drafts at once?

One of the strategies that's been successful for this book is committing to at least an hour per day of "difficult" writing. That means that I can't use the hour to do formatting, grammar checking, or proofreading.

My strategy has worked well. In June, I thin I published more than in any other month of my career. I added three new chapters to the _Refactoring English_ ebook, published [one new sample chapter](https://refactoringenglish.com/chapters/release-announcements/), and I wrote [three](/goharddrive-leak/) [new](/notes/gleam-first-impressions/) [posts](/notes/gleam-call-elixir/) on this blog.

The problem with my strategy is that forbidding myself from non-hard writing tasks means I keep deferring the "fit and finish" tasks for a week. I end up accruing a bunch of partially finished posts. Particularly last month, I had a lot of partially-finished writing, and I felt like I was wasting mental cycles keeping track of what was published and what still needed final edits.

I guess the underlying problem was that I kept starting new blog posts, so maybe that's the real thing I have to cut back on rather than adjusting my writing habit.

## How can I offer value to early access readers?

TODO

## What do I want to do with the website?

- Improve the website.
  - Add a favicon.
  - Tweak the UI so that the call-to-action is to buy early access rather than sign up for the mailing list.
  - Improve the early access page.
    - I've already rebranded it from "pre-order" to "early access."
    - Show prospective readers which chapters are complete and available.
- Offer custom presentations - book me for your team.
- Publish the interview with a blogger I recorded a year ago.
- Identify people who keep unsuccessfully submitting to Hacker News.
- Port web versions of excerpts to ebook.

## Programming in Gleam and missing the humble `for` loop

In an effort to learn a new programming language this year, I've been experimenting with [Gleam](https://gleam.run). I'm using it to parse my old AOL Instant Messenger chat logs, which look like this:

```text
Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005
[18:44] Jane: hi
[18:55] Me: hey whats up
Session Close (Jane): Mon Sep 12 18:56:02 2005
```

I wrote a longer post about [my initial impressions of Gleam](/notes/gleam-first-impressions/), and I've spent several more hours programming in it since then.

One of the hardest adjustments in Gleam is working without loops. Gleam deliberately has no loops. Instead, you're supposed to use recursive functions or call a mapping function for each element in the loop.

<!-- markdownlint-disable no-space-in-code -->

The lack of loops is giving me the most trouble when I'm trying to split my chat logs into tokens for parsing. The delimiters I care about are `[' ', '\n', '[', ']', ]`. I also care about colon, but only if a single space follows it, like this: `': '`.

In a language like Go, I'd iterate through the string in a `for` loop and if I hit a space, I'd check if the previous character was a `:` so that I could handle the `: ` case.

To achieve this in Gleam and work around the lack of loops, I end up building this odd decision tree where a lot of the leaves [end up repeating code](https://codeberg.org/mtlynch/gleam-chat-log-parser/src/commit/0988084b633d8382261276b2979d4f06508999a2/src/string_manipulation.gleam#L5-L63).

I find a lot of Gleam's design choices interesting in that when I do something "the Gleam way," it feels elegant, but with loops, it just feels like I'm working without the right tools.

I want to keep experimenting with Gleam, but I'm also feeling like I might end up switching to Elixir or OCaml, as they have a lot of the features I like in Gleam while addressing some of my pain points.

## Wrap up

### What got done?

- Published ["How to Write Compelling Software Release Announcements"](https://refactoringenglish.com/chapters/release-announcements/)
- Published ["goHardDrive Leaked Personal Data for Thousands of Customers"](/goharddrive-leak/)
- Published ["My First Impressions of Gleam"](/notes/gleam-first-impressions/)
- Published ["A Simple Example of Calling an Elixir Library from Gleam"](/notes/gleam-call-elixir/)
- Wrote three new chapters in the ebook version of _Refactoring English_
- Integrated into the ebook three previous chapters I'd published as [excerpts on the web](https://refactoringenglish.com/chapters/)

### Lessons learned

-

### Goals for next month

- Publish a video interview I've been sitting on for a year.
- Invest at least 10 hours into [_Refactoring English_ website](https://refactoringenglish.com) improvements aimed at increasing sales.
- Publish a new chapter of _Refactoring English_.

### Requests for help

TODO
