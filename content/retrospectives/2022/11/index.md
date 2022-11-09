---
title: "TinyPilot: Month 28"
date: 2022-11-02T11:17:13-04:00
description: TODO - One-line summary
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $60-80k/month in revenue and employs six other people.

Every month, I publish a retrospective like this one to share how things are going with my business and in my professional life overall.
{{</notice>}}

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Ramp up new support engineers

- **Result**: XX
- **Grade**: A

I was aiming for the first engineer to answer 80% of questions unassisted and the second 50%. I haven't measured precisely but we're roughly there.

We had a one-week period of record support requests, and the team managed to answer almost all of them within our target response times. The team also published two new tutorials on the TinyPilot website.

### Start production on a second metal case prototype

- **Result**: We're still designing the second prototype
- **Grade**: D

I underestimated the turnaround time a redesign would take. With our 3D printing vendor, design changes typically take a few days, at most. Iterations on the metal case have taken multiple weeks.

I'm not sure if it's just greater difficulties of designing with metal or if the metal designers have less bandwidth for this project, but it's definitely an adjustment from 3D printing.

### Reach out to three 3PL vendors to talk about the process of transitioning our fulfillment

- **Result**: Reached out to six 3PL vendors
- **Grade**: A

Of the six vendors I approached, two ignored me entirely, one declined explicitly, and one expressed interest and then stopped responding. The last two quickly scheduled meetings with me

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | September 2022                          | October 2022                                  | Change                                             |
| ------------------------ | --------------------------------------- | --------------------------------------------- | -------------------------------------------------- |
| Unique Visitors          | 9,040                                   | 7,994                                         | <font color="red">-1,046 (-12%)</font>             |
| Total Pageviews          | 17,608                                  | 17,862                                        | <font color="green">+254 (+1%)</font>              |
| Sales Revenue            | $68,640.50                              | $85,834.20                                    | <font color="green">+$17,193.70 (+25%)</font>      |
| Enterprise Subscriptions | $242.95                                 | $290.70                                       | <font color="green">+$47.75 (+20%)</font>          |
| Royalties                | $3,440.90                               | $5,544.12                                     | <font color="green">+$2,103.22 (+61%)</font>       |
| Total Revenue            | $72,324.35                              | $91,669.02                                    | <font color="green">+$19,344.67 (+27%)</font>      |
| **Profit**               | **<font color="red">-$5,337.82</font>** | **<font color="green">$26,997.39</font>**\*\* | **<font color="green">+$32,335.21 (+inf%)</font>** |

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

## Exploring the world of 3PL vendors

3PL is the shorthand for a third-party logistics provider. They act as a warehouse for e-commerce businesses and handle storing products and shipping them out when an order arrives.

There's a wide spectrum of options for 3PL vendors. At one end is the giant corporate machine vendors like Amazon FBA. Those vendors are probably good if you have thousands of products and hundreds of daily orders, but they're also faceless and highly automated, so you have to adapt exactly to their process. I've also heard horror stories from other founders who experienced Amazon discarding significant amounts of inventory for opaque reasons or freezing $100k+ in funds for months. So, Amazon is the exact kind of 3PL vendor I don't want to do business with.

At the other end of the spectrum are the "mom and pop" 3PL vendors who have dozens to hundreds of customers and only one or two warehouses. These were the vendors I wanted to find when I started my search, and I'm

I found three vendors by just searching "3PL" on Google Maps near where I live. Of those, one responded, and . I found another by searching "3PL site:reddit.com" and I found a two-year-old comment from the founder of a 3PL vendor. I reached out, and we had a video call a few days later. I found the last two on recommendations from a nonprofit that advises manufacturing firms, but neither of those leads materialized to anything. Notably, both the leads advertised themselves as "packaging" companies rather than 3PLs, so I think they're more targeted at businesses that produce in bulk like cereal or candy.

Both of the 3PL vendors I met with said that they offer a lot of customization for each client. We can give special packing instructions if items need to be combined in a certain way (e.g., orders that include at least one product X always include a free product Y).

Both 3PL vendors offer light manufacturing services, so we could theoretically send them our raw materials and have them build TinyPilot devices. I probably won't do this because it's easier to have the Chinese factory that makes TinyPilot's custom hardware also assemble the devices, but it would also be nice to keep manufacturing close to me and in the same legal jurisdiction in the event of a major issue.

## With metal cases, manufacturing quality makes a difference

I got the first prototype and felt immediately deflated. This looked like something I'd find if I smashed a hole in my wall. It definitely didn't look like something I'd hand to a customer. The spots where metal bent stuck out egregiously because there were visible gaps.

We reached out to four different sheet metal vendors in the US, and three of them ignored us, and this was the last one.

Want to hear the kicker? Guess how much each one cost.

The American prototype cost $XX, while the Chinese prototype was only $XX, a XXx difference.

| Vendor location | Price | Turnaround Time | Quality |
| --------------- | ----- | --------------- | ------- |
| US              | $XX   | XX              | D       |
| China           | $XX   | XX              | A       |

## The race for more cases

I've been worried about 3D-printed cases becoming the bottleneck for TinyPilot since month XX (TODO: link). TinyPilot's 3D printing vendor has bought us more time by adding capacity to meet our demand. At this point, they're not willing to buy more printers, especially given that TinyPilot will stop ordering prints as soon as the metal cases are ready.

At the end of October, we had 190 Voyager 2 cases in stock. TinyPilot's 3D printing vendor typically manufactures 140-160 cases per month, but we sell about ~210 devices per month. Based on this, I expect us to run out of cases by January 2023, which will mean we can only sell 140-160 devices per month:

| Month    | Manufactured | Sold | Cases at end of month |
| -------- | ------------ | ---- | --------------------- |
| October  | 150          | 207  | 190                   |
| November | 150          | 210  | 130                   |
| December | 130\*        | 220  | 30                    |

\* Anticipating lower capacity due to holidays.

If TinyPilot's sales volume drops to 150 devices when the demand exists for 230 devices, we're essentially forfeiting 80 x $250/device = $20k of profit per month. When we switch to metal cases, manufacturing capacity is a non-issue because it's relatively cheap and easy to mass-produce metal.

The case shortage is only a problem until the metal cases are ready, but there's a lot of uncertainty in when the metal cases will arrive. It largely depends on how many design revisions it takes until I'm comfortable going to mass production:

| Scenario                                | ETA for first production batch | Probability |
| --------------------------------------- | ------------------------------ | ----------- |
| Second revision is ready for production | Late December 2022             | 75%         |
| Third revision is ready for production  | Early February 2023            | 20%         |
| We need more than three revisions       | April 2023 or later            | 5%          |

In other words, if we get lucky, I can do nothing, and the first few hundred metal cases will arrive just as we're about to run out of 3D-printed cases. If we get unlucky and it takes three revisions to design the metal case, TinyPilot misses out on ~$20k of profit in January. If we get _very_ unlucky, TinyPilot misses out on ~$60-70k of profit throughout the first quarter of 2023.

My options are:

1. Do nothing
1. Supplement capacity by ordering from additional 3D printing vendors
1. Pay our vendor a one-time fee to offset the costs of purchasing a new printer, but the vendor owns it
1. Purchase a 3D printer outright, but the vendor will run it and dedicate it to TinyPilot prints

I went with option (4). A new Markforged printer costs $5,200 after taxes and shipping. I'm hoping I can sell it for $3-4k once we switch to metal cases in a few months, so I'm paying $2k to proect myself from a potential $20k downside, which I think works.

I requested quotes from other vendors

## Side projects

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-
