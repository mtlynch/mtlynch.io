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

- **Result**: Emailed seven readers, got three replies, had one live conversation
- **Grade**: C

Until I sat down to count, I thought I had a much worse response rate, but a lot of readers are responding. The issue is that I'm just not reaching out enough. I'm probably spending too long on each email trying to say something obviously not automated that I go down a rabbit hole of reading the person's blog for an hour.

### Clear the backlog of my marketing ideas.

- **Result**: Completed about 60% of what I intended to do
- **Grade**: XX

TODO

### Publish a new chapter of _Refactoring English_

- **Result**: Published ["Underused Techniques for Effective Emails"](https://refactoringenglish.com/chapters/techniques-for-writing-emails/)
- **Grade**: A

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

Visits to the website are up, which is good because I didn't have any popular new posts. I see it as a positive sign that visits stay healthy just from people reading the existing sample excerpts.

Total revenue is down slightly, but it's just because I went from one paid consulting job to zero, so not much change there. I'm more excited to see that pre-orders are up by 34% compared to June.

## What if everyone just likes the _feeling_ of buying a book?

As I reach out to readers and meet them on video calls, there's one piece of feedback I'm hearing over and over: "I haven't started reading it yet."

I hear this from people who purchased a few days prior and from people who had access to the book for months.

One of my biggest fears for this book is that it's a "vitamin rather than a painkiller." People see good writing as something that's good for them long-term, but it's not the kind of thing that's going to make a big difference in their life next week. Whereas a book called, "How to Double Your Twitter Followers Every Week," there's a faster payoff.

Part of my motivation in [pre-selling the book](/my-6k-advance/) before writing it was to see if there were enough people willing to pay for the book. There were, and people continue to buy it, but I'm worried that might not be as predictive a signal as I thought.

What if my book is the kind of thing people buy because it's a way to feel like they're investing in their writing without actually putting in time to do anything. What if it's like Planet Fitness, the popular gym franchise that supposedly makes its money by attracting memberships from people who are least likely to ever use their facilities.

Because even if I can be the Planet Fitness of books, that's not sustainable. For writing books to be financially viable, I'm banking on word of mouth recommendations where popular bloggers cite my book as a resource that helped them, and when a developer says they want to improve their writing, my book is the thing people recommend.

### Maybe customers just want to read the book

Another reason I pre-sold the book was that I predicted that readers who pre-ordered would be especially enthusiastic about the book and want to be actively involved in giving feedback.

From talking to friends who are also customers, most of them say that they pre-purchased to support the project and want to read the book when it's done, but they don't necessarily want to be part of a focus group or beta testing cohort for a rough draft. They just want to read it when I have a good version, and that's totally fair.

### I should just keep reaching out to people one by one

What I've found from reaching out to customers one by one and arranging live calls is that _some_ readers are extremely enthusiastic and want to actively give feedback. I've only found a handful, but they've given me excellent feedback.

The most effective way I've found enthusiastic readers is to email them one by one, so I'll keep doing that.

## Where does my time go?

Every few years, I'll look back at what I accomplished in the past month and think, "Wait, why is that all I did last month? What was I doing instead?"

July was that kind of month. I only took off a weekday or two, but I'm looking back at the month thinking, "How did I only finish one new chapter?

### Overinvesting in chapters

My target for the emails chapter was five hours but I actually spent 17.5 hours on it.

### Extracurricular blog posts

I also knew that writing my RAIDZ post wouldn't help with my book. It's not the kind of thing likely to make a big splash on Hacker News or reddit, and readers who care about ZFS don't have much overlap with readers who care about improving their writing. I told myself it would be quick. In reality, it took 7 hours, plus I spent almost an entire day responding to feedback about it. It turns out some people feel very strongly about storage safety and found my post offensive. But the upside was that the feedback led to a legitimately better solution than what I came up with.

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

- Published ["Underused Techniques for Effective Emails"](https://refactoringenglish.com/chapters/techniques-for-writing-emails/) and sent early access readers an expanded version.
- Migrated the last of the web-only content of _Refactoring English_ into the ebook.
- Published ["Migrating a ZFS pool from RAIDZ1 to RAIDZ2"](https://mtlynch.io/raidz1-to-raidz2/)
- Added [file expiration options for guests on PicoShare](https://github.com/mtlynch/picoshare/pull/694)
- Did unpaid editing on an upcoming blog post in exchange for publishing the feedback as marketing for my editing services.

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
