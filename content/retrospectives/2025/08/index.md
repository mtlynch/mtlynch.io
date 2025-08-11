---
title: "Educational Products: Month 10"
date: "2025-08-08"
description: TODO - One-line summary
tags:
  - refactoring-english
  - gleam
  - what-got-done
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

### "I haven't started reading it yet."

As I reach out to readers and meet them on video calls, there's one piece of feedback I'm hearing over and over: "I haven't started reading it yet."

I hear this from people who purchased a few days prior and from people who had access to the book for months.

One of my biggest fears for this book is that it's a "vitamin rather than a painkiller." People see good writing as something that's [important but not urgent](/book-reports/7-habits-of-highly-effective-people/#time-management-matrix). In contrast, they might read a book called, "How to Double Your Instagram Followers Every Week," because they have an immediate need to grow their Instagram following.

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

[Every](/retrospectives/2022/02/#how-can-i-manage-tinypilot-with-only-20-hours-per-week) [year](/retrospectives/2023/07/) [or so](/retrospectives/2024/09/), I'll look back at what I accomplished in the past month and think, "Wait, why is that all I did last month? What was I doing instead?"

July was that kind of month. I worked my regular, full-time hours, but I'm looking back at the month thinking, "How did I only finish one new chapter?

### Overinvesting in chapters

A few months ago, I realized I was [spending too much time wordsmithing my writing](/retrospectives/2025/06/#becoming-less-precious-about-my-writing) rather than just getting 90% good chapters to readers. My solution was to set time limits up front on each chapter and write whatever I could complete within my time budget.

For the emails chapter I wrote in July, my budget was five hours, but I actually spent 17.5 hours on it. Part of that was intentional because I realized after I set the target that it would work well as a standalone excerpt on the website. It takes longer to write a standalone version and then fold it back into the book.

But I'm also doing the same thing on the first chapter. I'm 6.5 hours into my 6-hour budget, and I probably have at least 3 hours of writing left before I'm comfortable sharing it with readers.

### Extracurricular blog posts

Because I have so much unstructured time, it's tempting to just

I also knew that writing my RAIDZ post wouldn't help with my book. It's not the kind of thing likely to make a big splash on Hacker News or reddit, and readers who care about ZFS don't have much overlap with readers who care about improving their writing. I told myself it would be quick. In reality, it took 7 hours.

### Bad social media habits

I spent almost an entire day responding to feedback about it. It turns out some people feel very strongly about storage safety and found my post offensive. But the upside was that the feedback led to a legitimately better solution than what I came up with.

### Recovering from sleep disruptions

My toddler is sleeping poorly, which means my wife and I are sleeping poorly. That alone isn't such a big deal, but I also use it to justify bad habits, like skipping writing sessions or checking social media when I'm not feeling focused.

### Editing work

I also did some editing work this month, so that accounts for a few hours. I only spent about six hours writng the actual notes for the client, but I also procrastinated a lot because I find critiquing other people's writing even harder than writing. Because it's easy for me to say that I don't like something, but it's much harder to articulate what my issue is, and extremely hard for me to propose a solution that addresses my issue.

## Side projects

### Replacing a 300-hour Vue app with a static site generator in 10 hours

In 2019, I [tried to build a business called What Got Done](/retrospectives/2019/06/#what-got-done-business-or-hobby). It was an app that allowed teammates to write weekly summaries of their work and share them with each other. When I was at Google, they had an internal tool called Snippets that did the same thing. I loved it, and [kept writing weekly updates after leaving Google](/status-updates-to-nobody/), even when I was working by myself.

I never could find customers for What Got Done, so I maintained it as a hobby project for the last six years. I initially built What Got Done with Vue, Firestore, and AppEngine, and I've come to strongly dislike all of those technologies. I spent a long time [replacing Firestore with SQLite and AppEngine with fly.io](/retrospectives/2021/12/#migrating-my-side-projects-away-from-google-cloud-platform), but Vue stuck around, and it made development unpleasant.

Every week when I'd post my updates to What Got Done, I'd think about how I actually prefer the authoring workflow of writing my blog posts in VS Code and publishing them with Hugo. So, one weekend, I just reimplemented What Got Done as a simple static site with Hugo, which I now host at [weeks.mtlynch.io](https://weeks.mtlynch.io).

So, in six years, I probably spent about 300 hours implementing and maintaining What Got Done as a Go + Vue + SQLite + fly.io app, and it took me 10 hours to reimplement it as a static site with simple Markdown files and Hugo. And because it's now a just-for-me app, I can add hyper-personal features like [pre-populating my weekly updates from my git commits](https://github.com/mtlynch/weeks.mtlynch.io/blob/b7a79b5f7d8b6ed8d1ed93e19b221c2f889efc4b/dev-scripts/new-week). And of course, it's orders of magnitude simpler and cheaper to host, maintain, and back up because it's just a static site with source control instead of a full-blown web app with separate tech stacks for the frontend, backend, and database.

### Sunsetting What Got Done

Even though What Got Done only has a handful of active users, I hate abandoning people who started using something I offered, so I tried to make the offboarding experience on What Got Done nice:

- I [announced on the website](https://www.whatgotdone.com/shutdown-notice) that What Got Done would stop running at the end of the year.
- I added a feature to [let users export their posts in Markdown format](https://github.com/mtlynch/whatgotdone/pull/963).
  - I needed to do this anyway to port my data to Hugo, so I figured it would be nice to build this feature into the web app itself so that any user could do it.
- I added a feature that lets users to [set up a forwarding address for post-WhatGotDone shutdown](https://github.com/mtlynch/whatgotdone/pull/970).
  - For example, I've configured my profile page [whatgotdone.com/michael](https://whatgotdone.com/michael) to permanently redirect to [weeks.mtlynch.io](https://weeks.mtlynch.io).

### Progress on my AIM log parser in Gleam

I'm still learning the [Gleam programming language](https://gleam.run) by tinkering with a parser for my old AIM logs from high school and college. The most basic logs look like this:

```text
Session Start (AIM - DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005
[18:44] Jane: hi
[18:55] Me: hey whats up
Session Close (Jane): Mon Sep 12 18:56:02 2005
```

#### Parsing timestamps

In June, I had my parser working at a basic level in that it could take the log above and extract the sender and messages like this:

```gleam
[
  Message(sender: "Jane", body: "hi"),
  Message(sender: "Me", body: "hey whats up"),
]
```

I made progress in July, so the parser can now understand the timestamps, which are a little tricky because it has to combine the date from the session metadata with the simple `HH:MM` information from the message. So, my log parser can convert the above log to this:

```gleam
[
  Message(
    timestamp: must_parse_rfc3339("2005-09-12T18:44:00-04:00"),
    sender: "Jane",
    body: "hi",
  ),
  Message(
    timestamp: must_parse_rfc3339("2005-09-12T18:55:00-04:00"),
    sender: "Me",
    body: "hey whats up",
  ),
]
```

#### Collapsing lexing and parsing to a single step

I also simplified the parser to basically a single pass instead of separate lexing and parsing.

I initially thought it was more proper and elegant to split the logs into a list of tokens then parse those tokens. So instead of the parser seeing a line like `Session Start (AIM - DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005` and parsing it, I wanted the lexer to first change it to [a series of tokens](https://codeberg.org/mtlynch/gleam-chat-log-parser/src/commit/480c45c9e76117635ff7b0509f500799297eaa94/test/plaintext_tokenizer_test.gleam#L84) like this:

```gleam
[
    SessionStart,
    Word("(DumbAIMScreenName:Jane)"),
    ColonSpace,
    Word("Mon"),
    Word("Sep"),
    ...
]
```

But that meant I needed a secret first pass to split the string into substrings that the tokenizer could recognize like `["Session", " ", "Start"]`, and I had to implement my own string split logic because Gleam's built in libraries have no way of splitting a string by substring and then keeping the substring, too.

It felt like I was actually parsing the input three times: once for the string splitting, once for the lexing, and once for the actual parser. I initially assumed it was because I don't know enough about functional languages or text parsers, and I'd find a more elegant way to lex and parse.

I used my confusion to justify finally purchasing a print copy of [_Crafting Interpreters_](https://craftinginterpreters.com/), the most well-designed software book I've ever seen. And after reading the lexing chapter of the book, I concluded that my AIM logs weren't structured enough for lexing.

I tried [collapsing everything down to a parser](https://codeberg.org/mtlynch/gleam-chat-log-parser/pulls/20) that reads the input character by character, and that felt simpler.

The bummer of parsing character by character is that Gleam's pattern matching looks much uglier. In the old implementation, I could look for string patterns [like this](https://codeberg.org/mtlynch/gleam-chat-log-parser/src/commit/480c45c9e76117635ff7b0509f500799297eaa94/src/plaintext_tokenizer.gleam#L76-L79):

```gleam
  case contents {
    ["Session", "Start", ..rest] -> tokenize_list(rest, [SessionStart, ..acc])
    ["Session", "Close", ..rest] -> tokenize_list(rest, [SessionClose, ..acc])
```

And now it's [a longer, messier pattern match](https://codeberg.org/mtlynch/gleam-chat-log-parser/src/commit/926124b4a660adeea0795e10a2979f73cfa6dcb5/src/plaintext_parser.gleam#L218-L242):

```gleam
  case state.remaining_graphemes {
    [
      "S",
      "e",
      "s",
      "s",
      "i",
      "o",
      "n",
      " ",
      "S",
      "t",
      "a",
      "r",
      "t",
      ...
```

#### Am I forcing classes into Gleam?

As I progressed with my parser, I found that I was writing functions that had the same signature:

```gleam
fn parse_tokens_with_messages(
  tokens: List(Token),
  messages: List(Message),
) -> List(Message) {
```

A bunch of my functions took the same parameters and had the same return value, and as I added more code, the list of parameters and return values grew larger.

So, I created a `ParseState` type and passed that around instead:

```gleam
type ParseState {
  ParseState(
    last_timestamp: timestamp.Timestamp,
    messages: List(Message),
    remaining_graphemes: List(String),
  )
}

fn parse_graphemes(state: ParseState) -> ParseState {
```

But I knew as I was doing it that I was essentially just writing object-oriented classes in Gleam. Because if this was Go, the code would look like this:

```go
type Parser struct {
  LastTimestamp       time.Time
  Messages            []Message
  RemainingGraphemes  []rune
}

func (p Parser) Parse() {
```

Functional programming nerds: am I cheating? Or is this the right way to pass around state in functional languages?

## Wrap up

### What got done?

- Published ["Underused Techniques for Effective Emails"](https://refactoringenglish.com/chapters/techniques-for-writing-emails/) and sent early access readers an expanded version.
- Migrated the last of the web-only content of _Refactoring English_ into the ebook.
  <<<<<<< Updated upstream
- # Published ["Migrating a ZFS pool from RAIDZ1 to RAIDZ2."](https://mtlynch.io/raidz1-to-raidz2/)
- Published ["Migrating a ZFS pool from RAIDZ1 to RAIDZ2"](https://mtlynch.io/raidz1-to-raidz2/)
  > > > > > > > Stashed changes
- Created a better [password reset flow for ScreenJournal](https://github.com/mtlynch/screenjournal/pull/429).
- Added [file expiration options for guests on PicoShare](https://github.com/mtlynch/picoshare/pull/694).
- Did unpaid editing on an upcoming blog post in exchange for publishing the feedback as marketing for my editing services.
- Created a [sunsetting plan for What Got Done](https://www.whatgotdone.com/shutdown-notice) and migrated my data to [weeks.mtlynch.io](https://weeks.mtlynch.io).

### Lessons learned

-

### Goals for next month

- Write personalized emails to 20 readers I haven't spoken to before.
- Publish a new chapter of _Refactoring English_.
- Complete [my remaining marketing tasks](/retrospectives/2025/07/#how-can-i-improve-marketing-for-the-book).

### Requests for help

If you're a developer who's interested in improving your writing, or you know someone who is, [reach out](/about/).
