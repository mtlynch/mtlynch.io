---
title: "TinyPilot: Month 35"
date: 2023-05-31T08:11:32-04:00
description: How do I come up with $250k in cash?
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $60-80k/month in revenue and employs seven other people.

Every month, I publish a retrospective like this one to share how things are going with my business and my professional life overall.
{{</notice>}}

## Highlights

- I tried to find a way to get $250k in cash to cover a large expense.
- I evaluate how a contract manufacturer will change my finances.
- Outsourcing to a 3PL vendor is less expensive than I expected.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Onboard the newest TinyPilot employee

- **Result**: Newest employee is fully spun up.
- **Grade**: A

TinyPilot's newest employee is fully trained and can build Voyager 2a devices. The additional capacity is helping us get back to feeling ahead on inventory instead of scrambling to keep up with orders.

One thing I didn't consider was that the office becomes a bottleneck with three people. With two people working 20 hours per week, they can share a single office easily without overlapping. With a third person, it's not exactly a problem, but we do have to plan more to avoid shifts colliding.

### Reach $90k in revenue

- **Result**: Reached $92k in revenue.
- **Grade**: A+

Now that we're no longer constrained by manufacturing capacity. I've increased ad spending and [fixed our Amazon listing](/retrospectives/2023/01/#adapting-to-the-shortage).

The problem with Amazon is that the only way to get them to show a "Buy" button on TinyPilot listings again was to lower our Amazon price to match our website price. Now, customers are much more incentivized to choose Amazon over purchasing from us, so we're seeing a greater share of Amazon purchases and losing a higher fee to Amazon.

### Find three homelab bloggers or YouTubers interested in reviewing TinyPilot Voyager 2a

- **Result**: Found 2.5 people interested in reviewing TinyPilot.
- **Grade**: B+

I reached out to three YouTubers. Two of them are interested and plan to feature TinyPilot in a video. The third doesn't do reviews but is open to giving TinyPilot a cameo if they can find a use for it.

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

## How do I come up with $250k in cash?

It would cost around $110 to build each unit, including everything except the Raspberry Pi. Raspberry Pis cost $45/unit, so it would be about $155/unit total.

My prices now are around $110/unit in materials and then another $5/unit in labor. So it would be a $40 (35%) jump in cost, but the contract manufacturer should simplify a lot about my business. We wouldn't have to maintain a physical office anymore, we wouldn't need to manage inventory for all of our raw materials, and we could easiy scale up production without hiring more people.

So I was feeling fine with $110/unit until I did the math on the total. The contract manufacturer needed me to commit to 2,000 units at minimum. That's $220k! Including the Raspberry Pis for the first batch, I'd need to come up with about $250k in cash to pay for this order.

To be clear, this is money I'd be spending anyway. Last year, I spent [$334k](/solo-developer-year-5/#tinypilot-grew-annual-revenue-to-812k) on raw materials, but I paid for everything in small chunks throughout the year. With the shift to the contract manufacturer, I'd be consolidating most of my materials and manufacturing costs, but I'd be paying six to eight months of it at once.

Where was I going to get $250k in cash?

Shopify, Amazon, and Mercury are always bombarding me with offers for eCommerce loans, so I finally tried exploring those. They'll loan you some multiple of your monthly revenue, charge an origination fee of 5-15%, and then they take an ongoing 10-20% of your revenue until you pay off the loan.

{{<img src="shopify-loan.webp" has-border="true" max-width="600px" caption="Shopify offered me a $100k loan for a $13k origination fee.">}}

If I took a $100k loan from Shopify, it would cost me $13k, and I'd pay off the loan in about 7 months. But that's longer than I'd need the loan. My monthly revenue is about $90k. If all of my materials and manufacturing bills were already paid, I'd only have about $25k/month in expenses, which would leave $65k/month in cash profits. I'd only need the loan for a month or two, so paying $14k to borrow $100k for a month is a bit steep.

I think I could take out a loan from a bank, but I suspect that's a pretty long, paperwork-intensive process. I suspect it would cost me a few thousand dollars there, and they're probably not designed for such short loan terms either.

The situation reminded me of an event from my adolescence. Real estate developers were trying to tear down my beloved local community center to build a shopping mall. My breakdancing crew put on such a phenomenal dance show that attendees donated a total of $200k, exactly the amount we needed to protect the community center.

I called Al, a friend from my old dance crew, to see if he'd participate in another breakdancing performance for TinyPilot. Irritatingly, he pointed out that neither of us know anything about breakdancing and that I seemed to be describing the plot of the 80s movie, [_Breakin' 2: Electric Boogaloo_](https://www.imdb.com/title/tt0086999/).

{{<img src="breakin2.jpg" max-width="600px" alt="Movie poster for Breakin' 2: Electric Boogaloo" caption="Could I raise the money I needed by putting on a breakdancing show?">}}

So, that plan was out.

At the next meeting with the contract manufacturer, I asked if there were other ways of structuring the order so that I'm not paying $250k up front, adding that it's almost a year of expenses for me up front.

The CEO of the contract manufacturing firm chuckled and clarified that he wasn't expecting me to pay the full $250k up front. He was willing to absorb the up-front costs. If I signed a purchase order agreeing to purchase the full 2,000 units over the course of the year then the deal worked for him.

So, I'm likely going to start with an order of about 500 Voyager 2a units. That means I'd owe the contract manufacturer roughly $55k. I'd still owe $34k for the Raspberry Pis, but the total would be roughly $90k up front, which is much easier to swallow.

## How does a contract manufacturer change finances?

When I calculated the $250k, I had a bit of a panic about how such bursty costs would mess with TinyPilot's finances. Now that I understand we don't owe the full amount up front, I'm realizing this the contract manufacturer will be incredibly beneficial for our finances.

### Cash flow

Under TinyPilot's current system, materials and manufacturing costs are spread out over months or sometimes even years. For example, in February 2022, I spent $20k stockpiling critical electronic components, and we're still working our way through that batch. That's $20k tied up for 14 months and counting.

Stockpiling electronic components is our most extreme time-intensive cost, but we have lots of expenses with a long payback period. We have to pay a 30% deposit on metal cases three months before we receive them, and then 70% when they're ready to ship to us. Once we receive them, we have to assemble them into devices, and it can be up to four months between when we receive a case and sell it to a customer in a finished device.

With the contract manufacturer, payment is due 30 days after the contract manufacturer ships the order. That's a much tighter turnaround between the time I pay for materials and the time I turn a profit by selling the finished product. If the order arrives at the warehouse in a week, then I have almost three full weeks of selling the finished units before I even have to pay for them.

### Cost tracking

Our current system also makes it difficult to track costs associated with individual unit.

For example, the $20k batch of electronic components I mentioned above had lots of additional costs along the way just to be available at our various stages of production:

| Expense                                                                         | Cost (from memory) |
| ------------------------------------------------------------------------------- | ------------------ |
| Tariff on importing the components to the US                                    | $5,000             |
| Shipping the components to our hardware consultants for initial production runs | $300               |
| Inventorying the components to ship to the manufacturer                         | $750               |
| Shipping the components to our manufacturer in China and paying tariffs again   | $1,200             |

And then once it reached our manufacturer in China, we pay to have them assembled into PCBs. The manufacturer ships the PCBs to the US, we pay another tariff, then there's a labor cost on our side to assemble the PCBs and other components into a Voyager 2a device.

So how much did it cost to produce that Voyager 2a device? I'm sure I could figure it out if I had a way of attributing every cost along the way to a particular batch of components, but we don't have tooling that supports anything close to that.

Moving to a contract manufacturer will make our costs immensely simple. The manufacturing costs boil down to just three variables:

1. The price I pay per unit to the contract manufacturer.
1. The price I pay per unit for Raspberry Pis.
1. The shipping cost from my manufacturer to the 3PL warehouse.

The contract manufacturer's factory is in Vietnam, and from what I understand, the US has no import tariffs on electronics from Vietnam, so that cuts out another big expense and simplifies tracking further.

## How much does a 3PL vendor cost?

| Charge                          | Cost    |
| ------------------------------- | ------- |
| Shipments from TinyPilot to 3PL | $XX     |
| Warehouse storage               | $XX     |
| Software license fee            | $XX     |
| Warehouse labor                 | $XX     |
| Packing materials               | $XX     |
| **Total (without postage)**     | **$XX** |
| Postage                         | $XX     |
| **Total (including postage)**   | **$XX** |

They add a 15% margin on postage, So if we were paying our own postage, it would be about 13% cheaper. Postage is also a passthrough cost to the customer, so we don't really feel it that acutely. So let's say 13% of the postage cost is the 3PL's overhead.

So it effectively works out to about $XX per order, which is lower than I expected.

## Side projects

### Poster generators in WanderJest

In early 2020, I [created a site called WanderJest](/retrospectives/2020/01/) that was supposed to help comedy fans find live comedy. I shuttered it when COVID hit, but I've been tinkering with it on weekends for the past few months.

The problem with listing live shows was that I had to do a lot of manual work of copying show information into WanderJest when I saw show listings elsewhere like Facebook or Eventbrite. I wanted a way of making it attractive to comedians to enter show information themselves.

I frequently see comedians do this thing on social media where they'll post an image with a list of their upcoming shows:

{{<img src="comedy-dates.webp">}}

From the looks of it, the comedians seem to be creating these images by hand using general-purpose image editing tools. As show details changed, the comedians would sometimes clunkily edit on top of their previous image, presumably because they didn't have a way of going back and editing the original.

My idea was to create a specialized tool for creating these images. It would save your data so you could edit it later, and it would make it easy to generate new images as dates passed.

If my tool was easier to use and produces better output than general-purpose tools, comedians would use mine. It would drive people to WanderJest, and it would be a way for WanderJest to get information about shows.

I spent a Saturday learning about the `<canvas>` element in browser APIs and threw together this prototype:

{{<video src="schedule-image.mp4" caption="Demo of ">}}

So far, I pitched it to one comedian who I'd seen create images like this. She said it looked great! And then the next day she posted another image of her upcoming shows using a general-purpose image editing tool...

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
- Reach $95k in revenue.
