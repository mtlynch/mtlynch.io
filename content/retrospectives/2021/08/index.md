---
title: "08"
date: 2021-08-03T08:16:01-04:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Get my EU partner ready to begin sales by the end of August

* **Result**: XX
* **Grade**: XX

TODO

### Define processes that allow TinyPilot's local staff to share and alternate on all tasks

* **Result**: XX
* **Grade**: XX

TODO

### Find a designer for the TinyPilot sales site

* **Result**: XX
* **Grade**: XX

TODO

### Find an electrical engineering firm that can create a PoE adaptor for TinyPilot Voyager

* **Result**: XX
* **Grade**: A

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric          | June 2021  | July 2021  | Change                                     |
| --------------- | ---------- | ---------- | ------------------------------------------ |
| Unique Visitors | 6,339      | 5,234      | <font color="red">-1,105 (-17%)</font>     |
| Total Pageviews | 11,514     | 9,730      | <font color="red">-1,784 (-15%)</font>     |
| Total Revenue   | $29,446.46 | $23,954.64 | <font color="red">-$5,491.82 (-19%)</font> |
| **Profit**      | **<font color="red">-$9,452.32</font>**    | **<font color="red">-$8,854.07</font>**\*    | **N/A**                                    |

\* *July profit is provisional until I do real bookkeeping for the month. This number is just the delta in my checking account since June 1st.*

## Starting EU distribution

## Moving to a managed inventory service

From the beginning of TinyPilot, I've been looking for a managed service to let me track inventory. The problem is that I could never find a solution that matched my scale. The solutions I found were either too simple and meant for people who don't build from raw materials. Or they were overly complicated, designed for Enterprise-grade customers with thousands of products and multiple warehouses.

By chance, I stumbled across [Craftybase](https://craftybase.com), which finally seemed like a solution that matched TinyPilot. And it *sort of* does, but it's been a rough transition.

Some things about Craftybase are well-designed and fit perfectly in my workflow. My favorite feature is "recipes." I

The worst feature about Craftybase is how it handles incoming shipments. It allows you to set a "low stock limit" for each item so that when your inventory falls below that threshold, Craftybase highlights it for you. The problem is that it continues flagging the item even after you've ordered more, as the flag ignores pending shipments.

That means that when TinyPilot staff want to figure out which items to reorder, they have to go through every flagged item individually and check whether it's *actually* low in stock after taking into account pending orders. At first, I thought this would be easy because Craftybase shows a "purchased" quantity, which I assumed was pending shipments. It turns out that it's actually just the total ordered ever, an irrelevant metric so I don't know why Craftybase gives it such prominent screen real estate.

Nothing quite works the way I want.

## Freeing up more time with delegation

* Got off spreadsheet management duty
* Local staff can reorder raw materials
* Developers can review each other's pull requests
* Other developers can perform image builds

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                   | June 2021   | July 2021   | Change                                       |
| ------------------------ | ----------- | ----------- | -------------------------------------------- |
| Unique Visitors          | 49,839      | 39,568      | <font color="red">-10,271 (-21%)</font>      |
| Total Pageviews          | 122,700     | 96,494      | <font color="red">-26,206 (-21%)</font>      |
| Domain Rating (Ahrefs)   | 13.0        | 13.0        | 0                                            |
| AdSense Revenue          | $536.85     | $438.07     | <font color="red">-$98.78 (-18%)</font>      |
| Amazon Affiliate Revenue | $134.59     | $59.65      | <font color="red">-$74.94 (-56%)</font>      |
| **Total Revenue**        | **$671.44** | **$497.72** | **<font color="red">-$173.72 (-26%)</font>** |

Last month, I was celebrating how well the site's traffic has held up this late in the year, and now I'm seeing the biggest traffic drop of the year. I've heard recommendations to switch from Google AdSense to MediaVine, as the latter pays much more. I applied for MediaVine in July, so we'll see what happens in light of the traffic drop. MediaVine has a minimum requirement of 100k pageviews per month, which Is It Keto had when I applied, but just barely.

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | June 2021   | July 2021   | Change                                         |
| ------------------------- | ----------- | ----------- | ---------------------------------------------- |
| Unique Visitors           | 248         | 109         | <font color="red">-139 (-56%)</font>           |
| Gumroad Revenue           | $123.52     | $218.09     | <font color="green">+$94.57 (+77%)</font>      |
| Blogging for Devs Revenue | $0.00       | $27.30      | <font color="green">+$27.30 (+inf%)</font>     |
| **Total Revenue**         | **$123.52** | **$245.39** | **<font color="green">+$121.87 (+99%)</font>** |

Martin Schleiss gave a favorable mention to the course in a [recent blog post](https://schleiss.io/retrospectives/mid-june-2021).

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | June 2021  | July 2021   | Change                                           |
| ----------------- | ---------- | ----------- | ------------------------------------------------ |
| Unique Visitors   | 594        | 547         | <font color="red">-47 (-8%)</font>               |
| Total Pageviews   | 1,470      | 1,300       | <font color="red">-170 (-12%)</font>             |
| RapidAPI Revenue  | $40.20     | $620.67     | <font color="green">+$580.47 (+1444%)</font>     |
| **Total Revenue** | **$40.20** | **$620.67** | **<font color="green">+$580.47 (+1444%)</font>** |

There was a big jump in Zestful usage this month, but I'm pretty sure it's fraudulent. There were several users that signed up within days of each other with usersnames like `joe-84ad853`, and the bulk of this month's earnings came from one of those accounts. RapidAPI claims I'll receive the money on August 30th, but I'll be shocked if that actually happens.

## Wrap up

### What got done?

* Published a [new TinyPilot release](https://tinypilotkvm.com/blog/whats-new-in-2021-07)
* Found a developer to manage the TinyPilot website

### Lessons learned

*

### Goals for next month

*
