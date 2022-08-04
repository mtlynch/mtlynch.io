---
title: "TinyPilot: Month 25"
date: 2022-08-01T10:11:46-04:00
description: TODO - One-line summary
---

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Finalize plans for managing TinyPilot licenses

- **Result**: Made no progress on plans for managing TinyPilot licenses
- **Grade**: F

TODO

### Migrate TinyPilot Community to the next-generation update system

- **Result**: We're close but we haven't pulled the trigger yet
- **Grade**: C

TODO

### Publish the blog post about the TinyPilot website redesign

- **Result**: Published ["I Regret My $46k Website Redesign"](/tinypilot-redesign/), which became my second most popular blog post
- **Grade**: A

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | June 2022      | July 2022        | Change                                        |
| ------------------------ | -------------- | ---------------- | --------------------------------------------- |
| Unique Visitors          | 10,056         | 21,242           | <font color="green">+11,186 (+111%)</font>    |
| Total Pageviews          | 18,764         | 33,578           | <font color="green">+14,814 (+79%)</font>     |
| Sales Revenue            | $65,597.73     | $56,954.66       | <font color="red">-$8,643.07 (-13%)</font>    |
| Enterprise Subscriptions | $47.75         | $290.70          | <font color="green">+$242.95 (+509%)</font>   |
| Royalties                | $1,710.27      | $2,513.71        | <font color="green">+$803.44 (+47%)</font>    |
| Total Revenue            | $67,355.75     | $59,759.07       | <font color="red">-$7,596.68 (-11%)</font>    |
| **Profit**               | **-$4,230.17** | **-$7,485.91**\* | **<font color="red">-$3,255.74 (77%)</font>** |

\* July profit is just a naive estimate based on change in cash holdings until I do real bookkeeping mid-month.

Every month, I feel like my one-time costs are coming to a close, and then a large new one-time cost pops up.

## My redesign regret blog post

I had been writing about the TinyPilot website redesign in my [retrospectives](/retrospectives/), so I thought it would be fast to write, but it still took me a long time. It ended up taking 23.8 hours over two months.

I was honestly surprised that it got such a strong reception. The post had 157k unique readers in its first week. It was the second most upvoted post [on Hacker News](https://news.ycombinator.com/item?id=32179563) for the full month of July, and it reached the top spot of the [/r/web_design](https://www.reddit.com/r/web_design/comments/w4ir7r/i_regret_my_46k_website_redesign/) and [/r/programming](https://www.reddit.com/r/programming/comments/w5egi7/i_regret_my_46k_website_redesign/) subreddits. The only article I've ever written that's attracted more attention was, ["Why I Quit Google to Work for Myself,"](/why-i-quit-google/) which had 389k readers.

{{<img src="redesign-analytics.png" alt="Graph of visitors to blog post on Plausible showing 157k unique visitors, 197k total pageviews, 87% bounce rate, 34m19s time on page" hasBorder="true" maxWidth="600px" caption="[&rdquo;I Regret My $46k Website Redesign&ldquo;](/tinypilot-redesign/) became my second most popular blog post of all time, with 157k unique readers in its first week.">}}

I appeared as [a guest on the _Ditching Hourly_ podcast](https://podcast.ditchinghourly.com/episodes/michael-lynch-i-regret-my-46k-website-redesign) to talk about my experience with the website redesign

### Why didn't you name and shame the agency?

I'm fine doing that, but it's a higher bar. And it's not so much that I want to protect the agency but because naming them risks costing me a lot more time. If I name the agency and then that starts a big public fight where they blame me, then that eats up a lot of my time.

I wrote publicly about misbehavior by [Stripe](/stripe-recording-its-customers/) and a [shady keto bread company](/collect-debt/), but in those cases, it was more unambiguously bad behavior. And the Stripe post did eat up a lot of extra time after I published it. I let myself get dragged into hours of online arguments with people who supported Stripe's right to collect any data they want in the name of fraud protection.

I also think focusing on the agency as the villain makes the experience less useful. If the takeaway is just "don't work with this agency," that's not very helpful. It's more useful for people to learn techniques that protect themselves from a bad agency relationship, even if the agency is trying to do a good job.

### Is it worth writing blog posts like this?

One of the things I struggle with is whether I can justify time I spend blogging when TinyPilot is still struggling. I don't think people directly buy it

Visits to TinyPilot

There wasn't a noticeable jump in sales. Sales were high for a few days after, but they were still within the noise of TinyPilot's usual sales.

I think it's good for TinyPilot long-term, though, as most of the readers had probably never heard of TinyPilot and maybe weren't even aware that products like it exist.

## Less tweeting, more blogging

Last month on Twitter, Josh Pitzalis asked me about something I'd written about programmatic SEO for local content.

{{<tweet user="joshpitzalis" id="1543083914071519232">}}

I knew I'd used programmatic SEO to generate pages for my local comedy site, but I couldn't figure out what writing he was talking about. I vaguely remembered writing something, but I couldn't find anything in my blog.

But then Josh ended up finding the thing he'd remembered reading: a Twitter thread I'd completely forgotten:

{{<tweet user="deliberatecoder" id="1411709346845650944">}}

Ever since that exchange, I've been thinking about how I can write more on my blog and less on other platforms. Twitter is an especially bad medium for preserving knowledge because it's ephemeral by design. I forget what I post there, and searching my post history is slow and tedious.

When I started blogging, it was because I'd run into situations that took me a long time to figure out, so I wanted to save other people the trouble. My early posts are almost all tutorials. Over time, I found that readers responded more to the story of me figuring something out than the solution itself. For example, [GreenPiThumb](/greenpithumb/) was one of my first popular posts, and it was because I told it as a story rather than a tutorial.

As I've started focusing on the story behind the solution, I'm once again left with the problem of not having a good place to share solutions to things I found challenging. So I'm experimenting with posts that aren't meant to attract wide readership but are just a place for me to share useful knowledge. My first try was an article I published last week called, ["Back Up Encrypted ZFS Data without Unlocking It."](/zfs-encrypted-backups/)

{{<img src="back-up-zfs.png" alt="Screenshot of my article at #1 for Google search of 'back up encrypted zfs data'" hasBorder="true" maxWidth="600px">}}

Though I'm trying to keep more content on my blog, I think some things are a better fit for Twitter. For the past two weeks, I've been trying to figure out why PicoShare keeps crashing on systems with low RAW, and I've been tweeting my progress.

{{<tweet user="deliberatecoder" id="1552438652537835521">}}

People seem to enjoy the thread, and I received lots of great advice that helped me identify issues much more quickly than if I'd been doing it by myself. And I think that's the ideal kind of content for Twitter because I'm sharing live progress and not a finished result. I'd still like to do a writeup of the thread on my blog summarizing what I've learned in a more concise format.

## Will reducing price increase volume?

The non-PoE version outsells the PoE version 2:1. We'll see what effect this has on sales.

## Side projects

## Wrap up

### What got done?

- Published two new blog posts: ["I Regret My $46k Website Redesign"](/tinypilot-redesign/) and ["Back Up Encrypted ZFS Data without Unlocking It"](/zfs-encrypted-backups/)

### Lessons learned

-

### Goals for next month

- Migrate TinyPilot Community and TinyPilot Pro to the next-generation update system
- Finalize plans for managing TinyPilot licenses
