---
title: "06"
date: 2023-05-31T08:11:32-04:00
description: TODO - One-line summary
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $60-80k/month in revenue and employs seven other people.

Every month, I publish a retrospective like this one to share how things are going with my business and my professional life overall.
{{</notice>}}

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Onboard the newest TinyPilot employee

- **Result**: XX
- **Grade**: XX

TODO

### Reach $90k in revenue

- **Result**: Reached $92k in revenue.
- **Grade**: A+

TODO

### Find three homelab bloggers or YouTubers interested in reviewing TinyPilot Voyager 2a

- **Result**: Found 2.5 people interested in reviewing TinyPilot.
- **Grade**: B+

Two are interested and plan to feature it in a video. The third doesn't do reviews but is open to giving TinyPilot a cameo if they can find a use for it.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | April 2023     | May 2023         | Change                                             |
| ------------------------ | -------------- | ---------------- | -------------------------------------------------- |
| Unique Visitors          | 6,560          | 7,773            | <font color="green">+1,213 (+18%)</font>           |
| Total Pageviews          | 15,034         | 17,220           | <font color="green">+2,186 (+15%)</font>           |
| Sales Revenue            | $82,060.84     | $89,569.49       | <font color="green">+$7,508.65 (+9%)</font>        |
| Enterprise Subscriptions | $290.70        | $290.70          | 0                                                  |
| Royalties                | $2,369.08      | $2,597.71        | <font color="green">+$228.63 (+10%)</font>         |
| Total Revenue            | $84,720.62     | $92,457.90       | <font color="green">+$7,737.28 (+9%)</font>        |
| **Profit**               | **$10,295.55** | **$23,923.76**\* | **<font color="green">+$13,628.21 (+132%)</font>** |

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

## How do I come up with $250k?

And then Raspberry Pis are another $45/each, and I'd need to supply 750 Raspberry Pis for the first batch of Voyager 2a devices, so that's another $34k. In total, that's about $250k!

TinyPilot has never had more than $100k in cash. And now I was going to have to more than double that. I could make up the difference from personal savings.

I looked at eCommerce loans. They charge an origination fee, so if I wanted to borrow $180k, they'd take between $4k and $14k. Oof! My other costs would go down significantly because that would become my only spending on raw materials and manufacturing for the next four to eight months, so I should be able to pay off the loan quickly, but that would mean I'm paying a potentially $14k fee to bridge me for only a few months.

I think I could take out a loan from a bank, but I suspect that's a pretty long, paperwork-intensive process. I suspect it would cost me a few thousand dollars there, and they're probably not designed for such short loan terms.

I thought back to a similar situation I was in years ago. When I was growing up, land developers were planning to tear down my beloved local community center to build a shopping mall. In order to save the community center, I raised $200k by getting my breakdancing crew together and putting on a phenomenal show.

I called my friend Al from the old dance crew to see if he'd participate in another breakdancing performance to raise money for TinyPilot. Irritatingly, he pointed out that neither of us know anything about breakdancing and that I seemed to be describing the plot of the 1984 film, [_Breakin' 2: Electric Boogaloo_](https://www.imdb.com/title/tt0086999/).

So, that plan was out.

When we met, I asked about payment plan and he laughed and said the risk was actually on his side. I don't have to pay for devices until they're manufactured and shipped. If I wanted to order only 500 Voyager 2a devices for my first batch, I'd owe $34k for the Raspberry Pis and $55k for a total of roughly $90k. That was much easier to swallow.

So the CM was actually taking on more risk because they were buying the parts

## How much does a 3PL vendor cost?

| Charge                          | Cost    |
| ------------------------------- | ------- |
| Shipments from TinyPilot to 3PL | $XX     |
| Warehouse storage               | $XX     |
| Software license fee            | $XX     |
| **Total (without postage)**     | **$XX** |
| Postage                         | $XX     |
| **Total (including postage)**   | **$XX** |

They have a 15% margin on postage, but that's a passthrough cost to the customer. We'd be paying roughly the same amount even if we were doing our own fulfillment.

So it effectively works out to about $XX per order, which is lower than I expected.

## Topic 3

## Side projects

### Poster generators in WanderJest

Pre-pandemic, I created a site called WanderJest that was supposed to help comedy fans find live comedy. I shuttered it when COVID hit, but I've been tinkering with it on weekends.

One idea I had for it is to automate a process I see comedians doing a lot. They'll make images with their upcoming show dates and post them to social media:

{{<img src="comedy-dates.webp">}}

From the looks of it, they seem to be creating these images by hand using general-purpose image editing tools.

So, my idea was to automate that process. You'd put your upcoming show dates in WanderJest, and then it would automatically generate an image advertising your next few shows. As the shows happen or your schedule updates, WanderJest would automatically bump old shows from the list. And I can do easy things like auto-size the text so that everything fits on a single line, etc.

{{<video src="schedule-image.mp4" caption="Demo of ">}}

So far, I pitched it to one comedian, and she said it looked great, and then the next day she posted a list of shows she created using a different tool.

## Wrap up

### What got done?

- Onboarded a new TinyPilot employee
- Reached out to three YouTube creators about TinyPilot
- Published [a tutorial about deploying Syncthing on Fly.io](/syncthing-on-fly.io/)

### Lessons learned

-

### Goals for next month

- Start a manufacturing batch with a new contract manufacturer.
- Publish TinyPilot Pro 2.6.0.
