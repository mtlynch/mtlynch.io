---
title: "TinyPilot: Month 18"
date: 2022-01-03T09:22:29-05:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Launch the Voyager 2

* **Result**: Launched the Voyager 2
* **Grade**: A

TODO

### Launch TinyPilot's rebrand

* **Result**: Debuted TinyPilot's new logo
* **Grade**: A-

TODO

### Build up enough inventory that TinyPilot isn't scrambling to meet demand

* **Result**: XX
* **Grade**: XX

I raised prices slightly to slow down sales.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | November 2021  | December 2021   | Change                                           |
| ------------------------ | -------------- | --------------- | ------------------------------------------------ |
| Unique Visitors          | 7,983          | 6,156           | <font color="red">-1,827 (-23%)</font>           |
| Total Pageviews          | 14,596         | 12,840          | <font color="red">-1,756 (-12%)</font>           |
| Sales Revenue            | $56,626.33     | $52,224.65      | <font color="red">-$4,401.68 (-8%)</font>        |
| Enterprise Subscriptions | $47.75         | $47.75          | 0                                                |
| Royalties                | $8,185.78      | $3,000.00       | <font color="red">-$5,185.78 (-63%)</font>       |
| Total Revenue            | $64,859.86     | $55,272.40      | <font color="red">-$9,587.46 (-15%)</font>       |
| **Profit**               | **$12,758.39** | **$-16,609.43** | **<font color="red">-$29,367.82 (-230%)</font>** |

Sales are down slightly from November, but December was still my second-highest revenue month of all time. I'm continuing to enjoy the revenue boost from [selling just one product](/retrospectives/2021/12/#reducing-to-a-single-product-nearly-doubled-sales).

My cash profit is down because I'm investing heavily in inventory for 2022. With the chip shortage continuing, I want to secure as many electronic components as possible. Otherwise, I'll constantly have to redesign TinyPilot's circuit board to swap in components as certain items become unavailable.

## Releasing the Voyager 2

Honestly, it felt a little anticlimactic. I'm excited for the PoE version. Even though that's still just a difference of fewer cables, it's so much more convenient to skip the step of plugging in to a power outlet.

## TinyPilot's new logo

{{<gallery caption="TinyPilot's old logo (left) vs. the new logo (right)">}}
  {{<img src="old-tinypilot-logo.png" alt="TinyPilot's new logo" maxWidth="350px" hasBorder="true" >}}
  {{<img src="tinypilot-logo.png" alt="TinyPilot's new logo" maxWidth="350px" hasBorder="true" >}}
{{</gallery>}}



## The last unfilled role: tech support

One of my goals for 2021 was to systematize enough of TinyPilot that [I can take a two-week vacation](/solo-developer-year-3/#automate-tinypilot-management). I took a week-long vacation for the holidays, and everything went smoothly. Though it took me several days to get through technical support requests when I got back.

A member of my fulfillment staff has stepped up and taken over for most customer support requests, but he doesn't have a background in software or IT. There are still 1-2 support requests per day that need to be escalated to a support engineer. And right now, the only support engineer is me.

The next role I need for TinyPilot is a support engineer. I've never hired for that before, but I know that [Jon Yongfook](https://twitter.com/yongfook) of [Bannerbear](https://www.bannerbear.com/) recently [hired his first support engineer](https://twitter.com/yongfook/status/1444836336364523520), so maybe I can piggyback on the things he shared.

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                   | November 2021 | December 2021 | Change                                      |
| ------------------------ | ------------- | ------------- | ------------------------------------------- |
| Unique Visitors          | 17,790        | 15,781        | <font color="red">-2,009 (-11%)</font>      |
| Total Pageviews          | 40,722        | 35,740        | <font color="red">-4,982 (-12%)</font>      |
| Domain Rating (Ahrefs)   | 15.0          | 11.0          | <font color="red">-4.0 (-27%)</font>        |
| AdSense Revenue          | $235.36       | $171.00       | <font color="red">-$64.36 (-27%)</font>     |
| Amazon Affiliate Revenue | $26.25        | $30.21        | <font color="green">+$3.96 (+15%)</font>    |
| **Total Revenue**        | **$261.61**   | **$201.21**   | **<font color="red">-$60.40 (-23%)</font>** |

December is typically a slow month for Is It Keto, but I usually see traffic double in January, as people begin thinking about diet-related New Year's resolutions. I've let the site languish in 2021, but I'm hoping to see a bump back up to ~$400/month for the first few months of 2022.

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | November 2021 | December 2021 | Change                                      |
| ------------------------- | ------------- | ------------- | ------------------------------------------- |
| Unique Visitors           | 159           | 106           | <font color="red">-53 (-33%)</font>         |
| Gumroad Revenue           | $94.57        | $19.30        | <font color="red">-$75.27 (-80%)</font>     |
| Blogging for Devs Revenue | $0.00         | $27.30        | <font color="green">+$27.30 (+inf%)</font>  |
| **Total Revenue**         | **$94.57**    | **$46.60**    | **<font color="red">-$47.97 (-51%)</font>** |

It was a slow month for Hit the Front Page of Hacker News, with just one sale. Not a lot of technical blogging around the holidays, I guess.

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | November 2021 | December 2021 | Change                                         |
| ----------------- | ------------- | ------------- | ---------------------------------------------- |
| Unique Visitors   | 576           | 461           | <font color="red">-115 (-20%)</font>           |
| Total Pageviews   | 1,489         | 1,176         | <font color="red">-313 (-21%)</font>           |
| RapidAPI Revenue  | $727.17       | $1,252.31     | <font color="green">+$525.14 (+72%)</font>     |
| **Total Revenue** | **$727.17**   | **$1,252.31** | **<font color="green">+$525.14 (+72%)</font>** |

2021 has been a nice, quiet comeback story for Zestful. I haven't done much to find customers, but there's been consistent growth in paid usage. These are all pay-as-you-go customers, and I'm skeptical that monthly revenue will remain this high, but I'm enjoying it while it lasts.

## Wrap up

### What got done?

* Launched [TinyPilot Voyager 2](https://tinypilotkvm.com/blog/introducing-voyager-2).
* Debuted TinyPilot's new logo.
* Migrated employee payroll from Justworks to Gusto.

### Lessons learned

*

### Goals for next month

* Launch Voyager 2: PoE Edition
* Write a job description for TinyPilot support engineer and begin interviewing candidates.
* Publish my fourth [annual retrospective](/tags/annual-review/)
