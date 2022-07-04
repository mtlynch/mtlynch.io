---
title: "TinyPilot: Month 24"
date: 2022-07-01T14:09:52-04:00
description: "TODO"
---

## Highlights

- TinyPilot had a record-breaking month of revenue.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Create a self-contained tarball for installing TinyPilot

- **Result**: We now have a working install tarball
- **Grade**: A

TinyPilot's install process has been growing more complex over time. It pulls in code from multiple repositories and third-party dependencies, and it's difficult to trace those relationships and the versioning of each part.

We've overhauling the installer with a single tarball that declares all of its dependencies in a clear location. We have [a script that generates the tarball](https://github.com/tiny-pilot/tinypilot/blob/16434c17e4f5e65bc9f00d8ec61870a62e1bf59a/bundler/create-bundle) on each build, and we're in the process of switching the free version of TinyPilot to this system, and we'll migrate TinyPilot Pro soon after.

### Complete the first draft of a full-length blog post about the TinyPilot website redesign

- **Result**: Completed the first draft
- **Grade**: A

I thought it would be easy to write the blog post because I'd written so much about the process in my retrospectives, but it's still taking a long time. It's 5,200 words, which is about twice as long as my typical article, so I'm trying to trim it down.

### Increase ROAS on paid search ads to 2.0

- **Result**: Increased ROAS from 1.79 to 1.90
- **Grade**: B

The digital marketing freelancer working with TinyPilot increased revenue on ad spend to 1.90. It's below the goal, but the goal was also kind of a guess, as it's difficult to know what's achieveable. I estimate that I'm earning about $0.47 for every dollar I spend on ads.

Unfortunately, I can't just double ad spend and double sales, as the price increases as you try to capture a greater share of search impressions. Still, I'm happy with the performance so far, and I'm continuing to work with a digital marketer to explore new marketing channels.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | May 2022      | June 2022       | Change                                           |
| ------------------------ | ------------- | --------------- | ------------------------------------------------ |
| Unique Visitors          | 14,296        | 10,056          | <font color="red">-4,240 (-30%)</font>           |
| Total Pageviews          | 24,131        | 18,764          | <font color="red">-5,367 (-22%)</font>           |
| Sales Revenue            | $54,844.20    | $72,476.80      | <font color="green">+$17,632.60 (+32%)</font>    |
| Enterprise Subscriptions | $47.75        | $47.75          | 0                                                |
| Royalties                | $3,269.56     | $1,710.27       | <font color="red">-$1,559.29 (-48%)</font>       |
| Total Revenue            | $58,161.51    | $74,234.82      | <font color="green">+$16,073.31 (+28%)</font>    |
| **Profit**               | **$6,445.38** | **$7,716.34**\* | **<font color="green">+$1,270.96 (+20%)</font>** |

\* _Note: Profit is just a naive delta in my cash balance until I do real bookkeeping mid-month._

This was TinyPilot's all-time strongest month of revenue. And the exciting part is that there was otherwise nothing remarkable about June.

All of TinyPilot's previous record-breaking months were related to some one-time event like a new product launch or a positive review.

Site visitors are down relative to May because the previous month, my storage server article reached the front page of Hacker News and mentioned TinyPilot, but our overall visit count is still significantly higher than the first quarter of the year. I credit the increase to our new marketing campaign, which is

## How do TinyPilot Pro users prove their license?

## Topic 2

## Topic 3

## Side projects

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-
