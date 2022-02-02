---
title: "TinyPilot - Month 19"
date: 2022-02-02T10:15:05-05:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Launch Voyager 2: PoE Edition

* **Result**: Delayed the launch a few weeks due to a hardware issue
* **Grade**: D

It's not a safety concern because the chip gracefully shuts itself off when it overheats, but users don't want their devices randomly losing power.

### Write a job description for TinyPilot support engineer and begin interviewing candidates

* **Result**: XX
* **Grade**: XX

TODO

### Publish my fourth [annual retrospective](/tags/annual-review/)

* **Result**: XX
* **Grade**: XX

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | December 2021   | January 2022   | Change                                            |
| ------------------------ | --------------- | -------------- | ------------------------------------------------- |
| Unique Visitors          | 6,156           | 7,282          | <font color="green">+1,126 (+18%)</font>          |
| Total Pageviews          | 12,840          | 15,477         | <font color="green">+2,637 (+21%)</font>          |
| Sales Revenue            | $52,224.65      | $51,066.78     | <font color="red">-$1,157.87 (-2%)</font>         |
| Enterprise Subscriptions | $47.75          | $47.75         | 0                                                 |
| Royalties                | $1,100.47       | $5,075.00      | <font color="green">+$3,974.53 (+361%)</font>     |
| Total Revenue            | $53,372.87      | $56,189.53     | <font color="green">+$2,816.66 (+5%)</font>       |
| **Profit**               | <font color="red">**$-15,207.05**</font> | <font color="red">**$-8,425.67**</font> | **<font color="green">+$6,781.38 (+45%)</font>** |

## How can I get management to 20 hours per week?

One of my goals for this year is to manage TinyPilot with only 20 hours per week. I'm currently spending about 45 hours per week on TinyPilot.

| Task                                                 | Current hours/wk | Ideal hours/wk |
|------------------------------------------------------|------------------|----------------|
| Overseeing dev work                                  | 4                | 0.5            |
| Making design decisions about the website or web app | 4                | 0.5            |
| Making architectural decisions about the web app     | 4                | 1              |
| Preparing TinyPilot releases                         | 2                | 0.25           |
| Answering technical support questions                | 8                | 0.5            |
| Answering non-technical support questions            | 0.5              | 0.5            |
| Communicating with employees                         | 2.5              | 2.5            |
| Communicating with major vendors                     | 6                | 4              |
| Communicating with distributors                      | 2                | 0.5            |
| Administration/taxes                                 | 2                | 0.25           |
| Total                                                |

## Back to scaling

Around this time last year, I was in a panic looking for a way to scale up TinyPilot. The bottleneck at the time was the Voyager's 3D printed case. My 3D printing vendor could only produce around 100 per month, and we were quickly approaching that limit.

I was scrambling to figure out if I could switch to a different manufacturing method that scaled better, such as injection molding. The quotes I got at the time were $20-30k up front to create the mold, but then after that, they'd be able to crank out as many cases as I wanted for about $7/case.

The issue became moot because sales dropped after that. We were able to stockpile enough cases in the slow months to carry us through the busy months.

Now, we're back. Since I got rid of our other products and focused on the TinyPilot Voyager 2, we're consuming Voyager 2 cases faster than before. And because the Voyager 2 case is larger, it takes 50% longer to produce each case. TinyPilot's 3D printing partner can produce a maximum of 200 cases per month, and we're selling 130-150 units per month. We don't have much room to grow until demand outpaces our manufacturing capacity.

## The long search for an electrical engineering partner

I found my original electrical engineering vendor through sheer luck. For a few weeks, I was in a mentorship group for founders, and I decided it wasn't a good match for me. But one of the other participants started following my blog, and he mentioned that he knew someone who did electronics work around the Raspberry Pi. And I contacted them, and they ended up as my electrical engineering partner for the next year and a half.

The problem was that my first vendor was a two-person operation, and they did consulting work on top of other full-time commitments.

I spent a lot of time looking for other vendors. It's difficult to interview electrical engineers because I'm not knowledgeable enough to assess skill level. I mainly went by how

One of them wrote me a proposal that was nonsense. It read something like, "We will assist TinyPilot in realizing its achievement of delivering a remarkable new product that meets the needs of TinyPilot customers." And this was an American vendor!

I finally found a vendor that's based in the US, and they're the right match.

It's still expensive to migrate. Well, we have to sit and wait a week until that arrives.

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                   | December 2021 | January 2022 | Change                                         |
| ------------------------ | ------------- | ------------ | ---------------------------------------------- |
| Unique Visitors          | 15,781        | 25,948       | <font color="green">+10,167 (+64%)</font>      |
| Total Pageviews          | 35,740        | 59,351       | <font color="green">+23,611 (+66%)</font>      |
| Domain Rating (Ahrefs)   | 11.0          | 14.0         | <font color="green">+3.0 (+27%)</font>         |
| AdSense Revenue          | $171.00       | $291.47      | <font color="green">+$120.47 (+70%)</font>     |
| Amazon Affiliate Revenue | $30.21        | $51.45       | <font color="green">+$21.24 (+70%)</font>      |
| **Total Revenue**        | **$201.21**   | **$342.92**  | **<font color="green">+$141.71 (+70%)</font>** |

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | December 2021 | January 2022 | Change                                        |
| ------------------------- | ------------- | ------------ | --------------------------------------------- |
| Unique Visitors           | 106           | 140          | <font color="green">+34 (+32%)</font>         |
| Gumroad Revenue           | $19.30        | $66.59       | <font color="green">+$47.29 (+245%)</font>    |
| Blogging for Devs Revenue | $27.30        | $0.00        | <font color="red">-$27.30 (-100%)</font>      |
| **Total Revenue**         | **$46.60**    | **$66.59**   | **<font color="green">+$19.99 (+43%)</font>** |

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | December 2021 | January 2022 | Change                                       |
| ----------------- | ------------- | ------------ | -------------------------------------------- |
| Unique Visitors   | 461           | 564          | <font color="green">+103 (+22%)</font>       |
| Total Pageviews   | 1,176         | 1,514        | <font color="green">+338 (+29%)</font>       |
| RapidAPI Revenue  | $1,252.31     | $847.38      | <font color="red">-$404.93 (-32%)</font>     |
| **Total Revenue** | **$1,252.31** | **$847.38**  | **<font color="red">-$404.93 (-32%)</font>** |

## Wrap up

### What got done?

*

### Lessons learned

*

### Goals for next month

* Launch Voyager 2: PoE Edition
  * For real this time.
* Hire a TinyPilot support engineer
