---
title: "Refactoring English: Month 16"
date: "2026-04-13"
description: TODO - One-line summary
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and founder of small, indie tech businesses. I'm currently working on a book called [_Refactoring English: Effective Writing for Software Developers_](https://refactoringenglish.com).

Every month, I publish a retrospective like this one to share how things are going with my book and my professional life overall.

{{</notice>}}

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Finish _Refactoring English_

- **Result**: Published a new chapter but still am not done
- **Grade**: C

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

I had a live call with _Refactoring English_ readers about design docs, and we discussed whether AI is good enough to write design docs for us now. I realized how easy it would be to use AI to generate alternate versions of the design doc I'd just written, so I did it and surveyed readers about which they thought was human-written.

I published the results of this experiment in ["Which Design Doc Did a Human Write?"](https://refactoringenglish.com/blog/ai-vs-human-design-doc/). Lobsters received it positively, but it flopped on Hacker News. The /r/programming subreddit rejected it for being "AI-generated," even after I messaged the mods to clarify that the article itself was human-written.

## Topic 1

## Reaching the first Little Moments milestone

## Willison blog arbitrage

In ["The Most Popular Blogs of Hacker News in 2025"](https://refactoringenglish.com/blog/2025-hn-top-5/), I wrote about Simon Willison, the #1 most popular blogger on Hacker News for the last three years. I explained that he has a blogging strategy that's underused yet effective:

> Simon often finds ideas within walled-garden platforms (e.g., TikTok, Twitter) and simply brings them to the open web, where it's easier for HN to discuss. Some of his most popular posts were just short quotes or links with a bit of commentary. ["I’m worried that they put co-pilot in Excel"](https://news.ycombinator.com/item?id=45820872) is just a quote from a video he watched on TikTok. ["A computer can never be held accountable"](https://news.ycombinator.com/item?id=42923870) is Simon summarizing a few tweets.

Simon has [called this approach](https://simonwillison.net/2024/Dec/22/link-blog/), "a low effort, high value way to contribute to internet life at large," and I agree.

The only hard part of Willison's strategy is recognizing when to employ it. If you spend your time summarizing tweets and TikToks at random, you probably won't gain much traction.

But last week, I watched [a talk by Nicholas Carlini](https://www.youtube.com/watch?v=1sd26pWhfmg) and thought it was incredibly surprising that there hadn't been more discussion of this topic. People were making a big deal out of Claude Code [writing an exploit for a FreeBSD bug](https://news.ycombinator.com/item?id=47597119), but it seemed way more surprising to me that Claude Code found a vulnerability in Linux that everyone else had missed for 23 years.

And it turned out I was right. The article did well on [Hacker News](https://news.ycombinator.com/item?id=47633855) and [Lobsters](https://lobste.rs/s/lh9rmv/claude_code_found_linux_vulnerability). Despite me not even posting it to Twitter, almost half of readers found my article via Twitter.

## Software security will be rough for the next couple of years

I found a remote code execution bug in a popular piece of software. I can probably find more, but there's no bug bounty, so it's not worth it to me. But how much software do we depend on where the value of exploitation is .

DuckDuckGo ships a full web browser. If you find a vulnerability that lets you take over the computer of every single user who has the DuckDuckGo browser, they won't pay you anything, but they'll [consider sending you a t-shirt](https://hackerone.com/duckduckgo).

> **Rewards**
>
> We are not offering monetary bounties at this time, however, we would love to send you some swag for valid submissions.
>
> &mdash;DuckDuckGo's [bug bounty program](https://hackerone.com/duckduckgo)

## Wrap up

### What got done?

- Published ["Claude Code Found a Linux Vulnerability Hidden for 23 Years"](https://mtlynch.io/claude-code-found-linux-vulnerability/)
- Published ["Which Design Doc Did a Human Write?"](https://refactoringenglish.com/blog/ai-vs-human-design-doc/)
- Published chapter "Help the Reacher Reach Their Goal" of _Refactoring English_
- Made my [first contribution to Firefox](https://phabricator.services.mozilla.com/D288636)
- Submitted [a bugfix to kivaloo](https://github.com/Tarsnap/kivaloo/pull/306)

### Lessons learned

-

### Goals for next month

- Finish _Refactoring English_

### Requests for help

TODO
