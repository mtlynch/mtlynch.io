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

| Metric                   | September 2022                          | October 2022                                | Change                                             |
| ------------------------ | --------------------------------------- | ------------------------------------------- | -------------------------------------------------- |
| Unique Visitors          | 9,040                                   | 7,994                                       | <font color="red">-1,046 (-12%)</font>             |
| Total Pageviews          | 17,608                                  | 17,862                                      | <font color="green">+254 (+1%)</font>              |
| Sales Revenue            | $68,640.50                              | $85,834.20                                  | <font color="green">+$17,193.70 (+25%)</font>      |
| Enterprise Subscriptions | $242.95                                 | $290.70                                     | <font color="green">+$47.75 (+20%)</font>          |
| Royalties                | $3,440.90                               | $5,544.12                                   | <font color="green">+$2,103.22 (+61%)</font>       |
| Total Revenue            | $72,324.35                              | $91,669.02                                  | <font color="green">+$19,344.67 (+27%)</font>      |
| **Profit**               | **<font color="red">-$5,337.82</font>** | **<font color="green">$26,997.39</font>**\* | **<font color="green">+$32,335.21 (+inf%)</font>** |

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

October marked another all-time record for TinyPilot's sales. TinyPilot had $86k in sales, beating its previous record by almost $10k. Our profit is way up, but that's a bit noisy month-to-month, so I'll focus on the $14k trailing average profit from the last three months. October put TinyPilot in the black for the year, and I'm optimistic that we'll end the year in the $20-40k range of profit.

For better or for worse, this is all happening while I put zero effort in marketing. I've been spending all of my time ramping up new hires and scaling production to meet our growing demand. Google Ads are on auto-pilot and are adding about $15k of revenue per month at a cost of $5k.

## Exploring the world of 3PL vendors

"3PL" is the shorthand term for a third-party logistics provider. They act as a warehouse and fulfillment center for other businesses. Basically, they store my products, and when an order comes in, we forward it to our 3PL vendor, they pick it off the shelves, pack it, and send it to the customer.

### My ideal 3PL vendor

There's a wide spectrum of options for 3PL vendors. At one end is the giant corporate machine vendors like Amazon FBA. Those vendors are probably good if you have thousands of products and hundreds of daily orders. They're also faceless and highly automated, so you have to adapt exactly to their process.

I've heard horror stories from other founders who used Amazon FBA and saw Amazon discard huge amounts of their inventory for opaque reasons or freeze $100k+ in funds for months. So, Amazon is the exact opposite of what I want in a 3PL vendor.

At the other end of the spectrum are the "mom and pop" 3PL vendors who have dozens to hundreds of customers and only one or two warehouses. These were the vendors I wanted to find when I started my search, and I'm

### How I found 3PL vendors

I found three vendors by just searching "3PL" on Google Maps near where I live. Of those, one responded, and two ignored me. The one who responded is the one I'll likely work with.

I found another small 3PL vendor in North Carolina by searching "3PL site:reddit.com," which yielded a two-year-old comment from the founder. I reached out, and we had a video call a few days later.

I found the last two vendors on recommendations from a nonprofit that advises manufacturing firms, but both ended up being dead ends. Notably, both the leads advertised themselves as "packaging" companies rather than 3PLs, so I think they're more targeted at businesses that produce in bulk like cereal or candy.

### Working with "mom and pop" 3PLs

Both of the 3PL vendors I met with ended up being very close to what I had in mind at the beginning of the search. The businesses felt personal, where the vendor can work with each client individually by forcing everyone to follow arcane, rigid processes like Amazon FBA.

TinyPilot can give the 3PL vendors special packing instructions if items need to be combined in a certain way (e.g., orders that include at least one product X always include a free product Y).

Both 3PL vendors offer light manufacturing services, so we could theoretically send them our raw materials and have them build TinyPilot devices. I probably won't do this because it's easier to have the Chinese factory that makes TinyPilot's custom hardware also assemble the devices. On the other hand, in case of a disastrous dispute between TinyPilot and its manufacturer, it would be better if we're both in the US as opposed to trying to go to court with a company located in China.

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
1. Pay our vendor a one-time fee to offset the costs of purchasing a new printer (vendor owns new printer)
1. Purchase a 3D printer outright, but the vendor will run it and dedicate it to TinyPilot prints (TinyPilot owns new printer)

I went with option (4). A new Markforged printer costs $5,200 after taxes and shipping. I'm hoping I can sell it for $3-4k once we switch to metal cases in a few months, so I'm paying $2k to proect myself from a potential $20k downside.

I requested quotes from other vendors, but they were all surprisingly expensive. TinyPilot gets an especially good deal from our vendor, at $12.50/case. I was expecting quotes of $75-100/case, but the rates I got were in the $100-180/case range, even for cheaper material. I had quoted backup vendors in early 2021 to prepare for this, but the prices have increased by ~80% since then. A couple of Chinese vendors quoted in the $20-50/case range for a cheaper material, so I requested samples in case I need a plan B.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-
