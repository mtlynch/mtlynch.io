---
title: "Educational Products: Month 9"
date: "2025-07-11"
description: Juggling too many half-finished tasks.
tags:
  - writing
  - gleam
  - refactoring-english
---

## Highlights

- I look for ways to limit the number of half-complete tasks I'm juggling.
- I brainstorm ways to talk with more of my early readers.
- I have trouble accepting a design decision in the Gleam language.

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Offer a lower-friction way for users to pre-order my book

- **Result**: Switched from Kickstarter pre-orders to Stripe payment links.
- **Grade**: A

I ran the initial pre-sale through Kickstarter, so I decided to just stick with it for subsequent pre-orders. After a couple of months, I realized Kickstarter requires customers to create an account to buy the book, which adds a lot of friction and discourages people from buying.

Switching to Stripe seemed to impact sales, as there were 22 pre-orders on Stripe in 30 days vs. just 7 pre-orders when it was Kickstarter-only. It's not a perfect apples-to-apples comparison because I also published a new sample chapter after switching to Stripe.

### Publish a new sample chapter on the book website

- **Result**: Published ["How to Write Compelling Software Release Announcements"](https://refactoringenglish.com/chapters/release-announcements/)
- **Grade**: A

This got a positive reception on [Lobsters](https://lobste.rs/s/ntl2iw/how_write_compelling_release) and was doing well on [Hacker News](https://news.ycombinator.com/item?id=44377666), but it got moderated off the front page. I suspect users on Hacker News disliked the emphasis on marketing and flagged it.

I got more useful feedback on this chapter than on any previous chapter. A lot of it was negative feedback, but that was legitimately helpful because I found the criticism fair. I revised the post based on the feedback, and the discussions gave me ideas for two new sections (["Briefly introduce your product"](https://refactoringenglish.com/chapters/release-announcements/#briefly-introduce-your-product) and ["Turn your numbers into graphs"](https://refactoringenglish.com/chapters/release-announcements/#turn-your-numbers-into-graphs)).

### Meet at least 10 readers on video calls

- **Result**: Met three readers on video calls.
- **Grade**: D

I fell way below my goal on this. Part of the problem was that I only scheduled two calls for the whole month, but another issue is that I'm failing to draw attendance from early readers on the calls I have.

## _Refactoring English_ metrics

Metrics are back!

I used to [publish my finances every month](/retrospectives/2024/04/#tinypilot-stats), but I stopped after I sold TinyPilot, as there weren't any interesting numbers to report. Now, that the pre-sale is going, I have relevant numbers to share again.

{{<project-metrics project="refactoring_english">}}

I'm glad to see an increase in visitors lead to an increase in sales, and I'm especially glad to see sales grow disproportionately to visits. I'm not sure if I'll be able to sustain it, but it will be a good indicator that people are enjoying the book enough to recommend to others.

## How can I juggle fewer drafts at once?

One of the strategies that's been successful for this book is committing to at least an hour per day of "difficult" writing. That means that I can't use the hour to do formatting, grammar checking, or proofreading.

My strategy has worked well. In June, I think I published more than in any other month of my career. I added three new chapters to the _Refactoring English_ ebook, published [one new sample chapter](https://refactoringenglish.com/chapters/release-announcements/), and I wrote [three](/goharddrive-leak/) [new](/notes/gleam-first-impressions/) [posts](/notes/gleam-call-elixir/) on this blog.

The problem with my strategy is that abstaining from easier writing tasks means I accrue posts that are almost done but need some grammar checking and proofreading. Particularly last month, I had a lot of partially-finished writing, and I felt like I was wasting mental cycles keeping track of what was published and what still needed final edits.

I guess the underlying problem was that I kept starting new blog posts. Maybe the simple answer is that I have to avoid starting new posts when I have incomplete pending posts.

## How can I talk more with early access readers?

One of the benefits of selling _Refactoring English_ as I write it is that people willing to pre-order an incomplete book are probably especially enthusiastic relative to the average reader. My plan was to talk frequently to early readers to make sure the book answers their questions and feels accessible.

In practice, I've had a hard time connecting with readers. I've sent short surveys about sample chapters or invited people to reply with feedback, but I've only received a couple of responses from \~1,400 mailing list subscribers and \~250 pre-order customers.

I started doing live video sessions, and I've tried different things in those sessions including lectures, writing workshops, office hours, and book club-style discussions of popular software blog posts. The live sessions have been fun and the attendees have given me excellent feedback, but only a couple of readers attend each call, so it feels like I'm still only reaching a tiny sliver of readers.

The other successful source of feedback has been clients who purchase [1:1 editing feedback](https://refactoringenglish.com/consulting/). I've only had three paying clients, but working with them helps me see what writing issues people in my target audience want help with.

Based on this, here are my ideas for talking more with readers:

- Reach out to readers individually after they purchase to ask about what they want to learn from the book and whether it meets their expectations so far.
- Polish [my writing consulting page](https://refactoringenglish.com/consulting/) a bit to make it more appealing.
- Offer a discounted consulting option for people who are motivated to learn but can't afford the price.
- Reach out to users on Hacker News who keep submitting articles but fail to gain traction to see if they're interested in hiring me for feedback.
- Offer a "book me for your team" option so I can present a writing topic to someone's work team and answer their questions.

## How can I improve marketing for the book?

Along with half-finished blog posts, there are a lot of simple things I want to do to market my book, but I haven't allocated time for them, so they just keep taking up space in my mind.

Here's my braindump of all the low-hanging fruit tasks I'd like to complete:

- Improve the website.
  - Add a favicon.
  - Tweak the UI so that the call-to-action is to buy early access rather than sign up for the mailing list.
  - Improve the [early access page](https://refactoringenglish.com/early-access/).
    - I've already rebranded it from "pre-order" to "early access."
  - Show on the website which chapters are available rather than just the count.
- Publish the interview with a blogger that I recorded a year ago.
  - I recorded this for my planned reboot of _Hit the Front Page of Hacker News_, but I ended up shelving that product, and it's been bothering me that I asked someone to do an interview and have just been sitting on it forever.
- Port web versions of excerpts to the ebook and mark those chapters as complete on the website.
  - I've done most of these, but it's so boring that I put it off, and there are still three chapters that exist in the web excerpts that I haven't yet integrated into the ebook.

## Programming in Gleam and missing the humble `for` loop

In an effort to learn a new programming language this year, I've been experimenting with [Gleam](https://gleam.run). I'm using it to parse my old AOL Instant Messenger chat logs, which look like this:

```text
Session Start (DumbAIMScreenName:Jane): Mon Sep 12 18:44:17 2005
[18:44] Jane: hi
[18:55] Me: hey whats up
Session Close (Jane): Mon Sep 12 18:56:02 2005
```

I wrote a longer post about [my initial impressions of Gleam](/notes/gleam-first-impressions/), and I've spent several more hours programming in it since then.

One of the hardest adjustments in Gleam is working without loops. Gleam deliberately has no loops. Instead, you're supposed to use recursive functions or call a mapping function for each element in a list.

<!-- markdownlint-disable no-space-in-code -->

The lack of loops is giving me the most trouble when I'm trying to split my chat logs into tokens for parsing. The delimiters I care about are `[' ', '\n', '[', ']']`. I also care about colon, but only if a single space follows it, like this: `': '`.

In a language like Go, I'd iterate through the string in a `for` loop. When I found a space character, I'd check if the previous character was a `:` so that I could handle the `: ` case.

Without loops in Gleam, I end up building this odd decision tree where a lot of the leaves [duplicate the same complicated function code](https://codeberg.org/mtlynch/gleam-chat-log-parser/src/commit/0988084b633d8382261276b2979d4f06508999a2/src/string_manipulation.gleam#L5-L63).

I find a lot of Gleam's design choices interesting in that when I do something "the Gleam way," it feels elegant, but with loops, it just feels like I'm working without the right tools.

I'm going to keep experimenting with Gleam, but I'm also going to give Elixir or OCaml a shot, as they have a lot of the features I like in Gleam while addressing some of my pain points.

## Wrap up

### What got done?

- Published ["How to Write Compelling Software Release Announcements"](https://refactoringenglish.com/chapters/release-announcements/)
- Published ["goHardDrive Leaked Personal Data for Thousands of Customers"](/goharddrive-leak/)
- Published ["My First Impressions of Gleam"](/notes/gleam-first-impressions/)
- Published ["A Simple Example of Calling an Elixir Library from Gleam"](/notes/gleam-call-elixir/)
- Wrote three new chapters in the ebook version of _Refactoring English_
- Integrated into the ebook three previous chapters I'd published as [excerpts on the web](https://refactoringenglish.com/chapters/)

### Lessons learned

- Resist the temptation to start new blog posts when I already have partially-finished posts.
- I should seek more conversations with readers by doubling down on what's working.

### Goals for next month

- Talk to at least 10 readers I haven't spoken to before.
- Clear the backlog of my marketing ideas.
- Publish a new chapter of _Refactoring English_.
