---
title: "TinyPilot: Month 1"
date: 2020-08-03T08:47:05-04:00
description: "I finally created a business that gained immediate traction."
---

## Highlights

* This is my highest revenue month ever, at $9.8k across all of my projects.
* [Tiny Pilot](https://tinypilotkvm.com) had the biggest first month of anything I've ever launched, at 52 sales and $8.7k in revenue.
* The sudden surge in customers also made it one of my highest-stress months of working for myself.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Publish a blog post about TinyPilot

* **Result**: Published ["TinyPilot: Build a KVM Over IP for Under $100,"](/tinypilot/) which attracted 48k readers in its first week
* **Grade**: A

This post took a long time to write, as it involved lots of screenshots, photos, and a video demo. I'm happy with the way it turned out. The surge in sales definitely make the extra effort feel justified.

### Sell 10 TinyPilot units

* **Result**: Sold 52 TinyPilot units
* **Grade**: A+

Prior to my blog post, I had only sold one TinyPilot kit in July. Then, the blog post came out and led to a huge burst of orders, far exceedig my goal.

### Write up the interviews I promised to my keto interviewees

* **Result**: Published the interviews to [Keto Cornerstone](https://ketocornerstone.com/)
* **Grade**: A

Keto Cornerstone was a [project idea I had in June](/retrospectives/2020/07/#validating-keto-product-ideas). Even though it seemed like a dead end, I had interviewed people with the promise of publishing their stories, so I still had to finish that. I [put up their interviews](https://ketocornerstone.com/stories) and tried to make the website look decent, but it's safe to say that project is now dead.

## TinyPilot stats

| Metric             | June 2020   | July 2020     | Change                                             |
| ------------------ | ----------- | ------------- | -------------------------------------------------- |
| Unique Visitors    | 51          | 4,930         | <font color="green">+4,879 (+9567%)</font>         |
| Total Pageviews    | 220         | 10,427        | <font color="green">+10,207 (+4640%)</font>        |
| **Total Earnings** | **$173.94** | **$8,741.37** | **<font color="green">+$8,567.43 (+4926%)</font>** |

Obviously, this was a huge launch month and was better than I expected.

It's a bit difficult to calculate exact profits because I'm buying a lot of inventory in advance, so it would be tedious to dissect my receipts to isolate the costs associated purely with the units I've already sold. Instead, I'll say that my margins are around 40-50%, so the profit for the month was around $4k.

## Aligning my blog with my business (finally)

In the past few years, I've had several blog posts that have been minor hits, attracting 30k-200k readers the week I publish them. They've also been relatively successful on tech social media like Reddit, Twitter, and Hacker News.

For most indie developers, it would be a huge boon to their business if an article they wrote reached the #1 spot on Hacker News or a popular subreddit. My problem is that the businesses I've created cater to a different market than my blog audience. Nobody says, "I really like Michael's [opinions on code reviews](/human-code-reviews-1/). Now, I'm going to  visit [his keto website](https://isitketo.org/) and purchase a lot of food through his affiliate links."

Before publishing it, I knew my [TinyPilot blog post](/tinypilot/) was different. The audience for that article obviously had a strong overlap with likely customers of [TinyPilot kits](https://tinypilotkvm.com/) that I began selling in July.

Fortunately, the blog post got a positive response. It reached the #1 spot on Hacker News and stayed there for most of the day. It attracted

{{< gallery caption="My TinyPilot blog post received a positive reception on Hacker News and several popular subreddits." >}}
  {{<img src="hn-no-1.png" alt="Screenshot of TinyPilot blog post at #1 slot" hasBorder="true">}}
  {{<img src="reddit-submissions.png" alt="Screenshot of TinyPilot submissions on reddit" hasBorder="true">}}
{{</gallery>}}

The response was actually much better than I expected. I only had enough inventory on hand to ship nine kits, so I was sold out by midday. It's a shame I wasn't able to capitalize better on the surge in interest, but I was nervous about buying thousands of dollars of inventory in the event that nobody was interested. Looking back, I should have been more strategic in keeping my inventory. The HDMI dongles ship the slowest but they're also one of the cheapest pieces. I could have simply ordered 100 of those and some of the other low-cost parts. Then, I could have handled a surge by rush-ordering the rest and be back in business within 2-3 days.

## Managing inventory is hard

Ever since the blog post, managing inventory has taken up 30% of my time and occupied 80% of my thoughts. I keep obsessively checking delivery status on all of my orders and worrying that I'm going to fall behind on inventory. As of this writing, I could clear my 22-order backlog right now, but I'm blocked on [one missing part](https://amzn.to/2DtQse5). That was a part I never worried that much about sourcing because it consistently arrived within two days of my order. Now turnaround has ballooned to one week.

Here are some other scaling issues I've discovered in managing inventory for physical goods:

* When you have 10-20 orders in transit at once across different merchants, it becomes difficult to keep track of what you need more of and when all parts of a set will be available.
* Delivery estimates become less accurate and consistent when you order in larger quantities.
* Certain suppliers cap orders on their website to 10 units and only take larger orders through purchase orders that take extra 2-3 business days to arrange.
* When you order thousands of dollars in inventory, your credit card maxes out.
* When you order items from Chinese merchants, your credit card gets flagged for fraud.

I wish there was inventory management software that matched my use case. I tried a few different options but they were either too complex or too simple. The simple ones don't understand the concept of raw materials and assume that everything in your inventory is an item you'd sell as-is. The complex solutions do support my use-case, which they call "kitting," but they also come with an assumption that I have multiple warehouses, shipping clerks, and purchase orders. They also tend to cost $80-500/month, which feels pretty steep at this point.

My current solution is a dopey spreadsheet where I track all the parts I need along with what I have in stock. It's an inelegant solution, but it's mostly working in the short term.

{{<img src="tinypilot-inventory.png" alt="Screenshot of a spreadsheet tracking all of my in transit orders" hasBorder="true" caption="My TinyPilot inventory spreadsheet" maxWidth="800px">}}

I'm hoping that once I get through this backlog, inventory won't be so complicated. For each part, I can set a range of units I want to keep in stock and resupply when I fall below that range. Hopefully, I can pick numbers that are high enough to absorb spikes in purchases and have enough left over to sustain me until delivery of new parts.

## Managing stress is harder

Stress has been one of the unexpected side effects of selling TinyPilots quickly. I generally do a good job of turning off my work brain at dinnertime and pick things up the following morning. The first week after the blog post, I was worrying about TinyPilot constantly, day and night. I was only sleeping 3-4 hours per night. I wasn't up late doing anything useful, just ruminating.

At the time the surge of orders came in, only two people had ever used TinyPilot, and one of them was me. I successfully tested it on two of my servers, but what if there were huge classes of hardware that were incomptible for some reason? Was Raspberry Pi even the right hardware for TinyPilot or should I 

It was scary. Outside of me, only one other person had tested TinyPilot. Only one person had tested .

## How can I make TinyPilot sustainable?

Currently, customers can build TinyPilot without paying me for anything. That was, of course, what drew people to my blog post. But customers do still order TinyPilot kits from me, and I believe there are two reasons:

1. They prefer to receive an all-in-one kit rather than ordering their parts piecemeal.
1. They're essentially donating money to me to show appreciation for the project.

The problem is that neither of these is a particularly strong incentive. The majority of customers would prefer to reduce their costs by 50% by building their own TinyPilot.

When my blog post drove $4k in sales the day it was published, my girlfriend said, "Oh, great! You should do that every day." But the problem is obviously that I can't hit the front page of Hacker News every day. I need a way to give people their money's worth when TinyPilot stops being a shiny new project.

I'm looking for ways to make what I offer to customers more valuable than what they can build on their own.

1. Offer custom hardware
1. Offer custom enclosures
1. Switch to paid software.

Moving to less mainstream hardware naturally pushes people to purchase from me.

Because I'm a software developer, I'm leaning toward (3). I'm sort of bracing myself for a backlash of people who praised me for going FOSS at the beginning now feeling betrayed, but I haven't gotten any pushback yet.

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

| Metric                    | June 2020   | July 2020   | Change                                          |
| ------------------------- | ----------- | ----------- | ----------------------------------------------- |
| Unique Visitors           | 46,386      | 48,231      | <font color="green">+1,845 (+4%)</font>         |
| Total Pageviews           | 109,721     | 118,980     | <font color="green">+9,259 (+8%)</font>         |
| Domain Rating (Ahrefs)    | 8.0         | 8.0         | 0                                               |
| AdSense Earnings          | $85.81      | $208.86     | <font color="green">+$123.05 (+143%)</font>     |
| Amazon Affiliate Earnings | $94.85      | $134.45     | <font color="green">+$39.60 (+42%)</font>       |
| Other Affiliate Earnings  | N/A         | $26.60      | N/A                                             |
| **Total Earnings**        | **$180.66** | **$369.91** | **<font color="green">+$189.25 (+105%)</font>** |

Over the past two months, I tried shifting my ads to [direct affiliate partnerships](/retrospectives/2020/07/#being-an-affiliate-sucks) and [landing pages for my sister products](/retrospectives/2020/07/#validating-keto-product-ideas). I ended up making almost nothing through direct deals and even caught one company [cheating their affiliates](https://www.reddit.com/r/juststart/comments/hsfaq7/how_to_deal_with_merchant_who_is_defrauding/). I've switched the ads back to 100% boring AdSense and Amazon ads, which is why ad revenue is back up.

It's now been two months since I used [programmatic page generation](/retrospectives/2020/05/#venturing-into-auto-generated-pages) to [grow my site's content by 50%](/retrospectives/2020/06/#add-100-new-articles-to-is-it-keto). It's still unclear if that's working. The new pages account for only 7.6k clicks from Google Search in the last 3 months out of 122k total, but it's possible that they're still growing and leading to more pageviews once visitors are on Is It Keto.

### [Zestful](https://zestfuldata.com)

| Metric                   | June 2020   | July 2020  | Change                                       |
| ------------------------ | ----------- | ---------- | -------------------------------------------- |
| Unique Visitors          | 369         | 440        | <font color="green">+71 (+19%)</font>        |
| Total Pageviews          | 995         | 1,247      | <font color="green">+252 (+25%)</font>       |
| RapidAPI Earnings        | $5.86       | $18.05     | <font color="green">+$12.19 (+208%)</font>   |
| Enterprise Plan Earnings | $679.40     | $0.00      | <font color="red">-$679.40 (-100%)</font>    |
| **Total Earnings**       | **$685.26** | **$18.05** | **<font color="red">-$667.21 (-97%)</font>** |

Zestful had a quiet month. No new inbound inquiries. The small customer who signed up for an enterprise plan last month chose not to renew, as expected. Earnings on RapidAPI remained in the sub-$100 range.

### mtlynch.io (this blog)

| Metric                   | June 2020   | July 2020  | Change                                       |
| ------------------------ | ----------- | ---------- | -------------------------------------------- |
| Unique Visitors          | 12,518      | 49,957     | <font color="green">+37,439 (+299%)</font>        |
| Total Pageviews          | 25,042      | 79,921     | <font color="green">+54,879 (+219%)</font>       |
| **Amazon Affiliate Earnings**       | **$39.02** | **$649.45** | **<font color="green">$610.43 (+1564%)</font>** |

I generally don't track stats for this blog, but I'm including them this month exclusively for a brag I want to make in the following section.

Revenue-wise, July was an outlier month for the blog because many readers purchased equipment to make their own TinyPilots through the [affiliate links in my tutorial](/tinypilot/#parts-list).

### Revenue summary

| Metric     | June 2020     | July 2020     | Change                                            |
| ---------- | ------------- | ------------- | ------------------------------------------------- |
| TinyPilot  | $173.94       | $8,741.37     | <font color="green">+$8,567.43 (+4926%)</font>    |
| Is It Keto | $180.66       | $369.91       | <font color="green">+$189.25 (+105%)</font>       |
| Zestful    | $685.26       | $18.05        | <font color="red">-$667.21 (-97%)</font>          |
| mtlynch.io | $39.02        | $649.45       | <font color="green">$610.43 (+1564%)</font>       |
| **Total**  | **$1,078.88** | **$9,778.78** | **<font color="green">+$8,699.90 (+806%)</font>** |

July was the strongest revenue month I've ever had. In fact, it's $200 higher than all of [my revenue from 2018 and 2019, combined](/solo-developer-year-2/#how-i-made-and-spent-money). It brings me to $13.1k for 2020, and makes my [2020 goal of $20k](/solo-developer-year-2/#goals-for-year-three) seem very possible.

## Wrap up

### What got done?

* Published ["TinyPilot: Build a KVM Over IP for Under $100,"](/tinypilot/), which led to a spike in TinyPilot sales.
* Commissioned a [logo for TinyPilot](https://tinypilotkvm.com/images/og-logo.png).

### Lessons learned

* When ordering inventory, allocate larger buffers for items that have longer delivery turnarounds and/or are cheaper to hold.
* [Don't use Stripe to sell physical items](https://twitter.com/deliberatecoder/status/1288271098262544385).
  * Shopify is superior in every way.
* When ordering raw materials, use at least two suppliers for each item.
  * Split/rotate your orders between them so you're not at the mercy of a single vendor.
* Be skeptical of merchant-supplied delivery dates.
  * There's infinitely more accuracy in the delivery date from USPS/UPS/FedEx once it's in their possession.
  * On Amazon, eBay, and AliExpress, many of the merchants claim to be shipping from the US, but I suspect that they're ordering from China when you order and re-shipping the item to you.

### Goals for next month

* Sell 30 TinyPilot kits
* Implement TinyPilot support for mouse integration.
  * I'll finally be able to make an honest abbreviation out of the M in TinyPilot [KVM](https://en.wikipedia.org/wiki/KVM_switch).