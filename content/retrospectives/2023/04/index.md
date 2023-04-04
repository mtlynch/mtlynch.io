---
title: "TinyPilot: Month 33"
date: 2023-04-03T00:00:00-04:00
description: TODO - One-line summary
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $60-80k/month in revenue and employs six other people.

Every month, I publish a retrospective like this one to share how things are going with my business and my professional life overall.
{{</notice>}}

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Transition fulfillment of a low-volume product to our new 3PL

- **Result**: XX
- **Grade**: XX

TODO

### Present at [NERD Summit 2023](https://nerdsummit.org/)

- **Result**: XX
- **Grade**: XX

TODO

### Reduce load on fulfillment team so that reactive tasks occupy less than 80% of their time

- **Result**: This was mostly successful but hard to measure.
- **Grade**: B

I took on as many customer support tickets as I could for a week to free up their time.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | February 2023  | March 2023       | Change                                        |
| ------------------------ | -------------- | ---------------- | --------------------------------------------- |
| Unique Visitors          | 12,141         | 7,443            | <font color="red">-4,698 (-39%)</font>        |
| Total Pageviews          | 23,117         | 17,904           | <font color="red">-5,213 (-23%)</font>        |
| Sales Revenue            | $72,585.15     | $86,803.78       | <font color="green">+$14,218.63 (+20%)</font> |
| Enterprise Subscriptions | $290.70        | $290.70          | 0                                             |
| Royalties                | $3,935.73      | $0.00            | <font color="red">-$3,935.73 (-100%)</font>   |
| Total Revenue            | $76,811.58     | $87,094.48       | <font color="green">+$10,282.90 (+13%)</font> |
| **Profit**               | **$33,537.97** | **$32,493.36**\* | **<font color="red">-$1,044.61 (-3%)</font>** |

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

Sales have been strong the past few months. I think switching from a 3D-printed case to a metal case has

My goal for the year was to reach $100k in profit, but it looks like I could exceed that goal by the end of April.

## Interesting edge cases for fulfillment

1. Customer emails us to say they mistyped their shipping address
1. Customer emails us to say they ordered but they're having second thoughts
1. Customer wants to pay with a purchase order
1. Order looks fraudulent

These edge cases are what caused me to terminate my contract with [my first 3PL vendor](/retrospectives/2023/02/#hiccups-in-transitioning-to-a-3pl-vendor). It turned out that their integration with Shopify was on a delay of up to 24 hours, so

I try to avoid manual steps as much as possible in TinyPilot's workflows. Any time a TinyPilot employee has to send an email about an order, it's splitting information about the order into multiple channels, and we're relying on human discipline to keep them in sync. I want to rely on tooling as much as possible.

(1) was trivial with the new vendor. We can see in real-time whether they've fulfilled the order already, so that part was easy. And when we update the shipping address, it updates on their end within seconds.

(2) was a little trickier. Currently, we just add a comment in Shopify on the order, like, "Hold while I work through an issue with this customer." The extra note stands out and. The problem was that Shipstation doesn't import comments from Shopify. I first tried adding a tag to the order called `paused` and asked if Shipstation could see that. It could, but our 3PL partner couldn't build an automation around it. And then, poking around Shopify, I noticed a "hold fulfillment" button.

### "Everyone just gives us their admin password"

It's turning out to be harder than I thought to integrate with 3PLs. Our eCommerce platform is Shopify, one of the most popular platforms in the US. I thought surely that every 3PL would have an easy

Shipstation seems like the more modern solution.

The person who does it has to have special privileges on both the Shipstation account and the Shopify account. I couldn't link the accounts because I didn't have credentials to the 3PL's Shipstation account. They couldn't do it because they didn't have admin rights on my Shopify account.

### Should we pay $150 to ship this $50 order?

The customer was in Australia, where shipping is very expensive. TinyPilot receives DHL shipping discounts through Shopify that reduced the postage to $50. But our 3PL has a separate deal with DHL, so DHL was charging them $150 for the same shipment. The customer only paid $50 in postage and $50 for the product, so our profit on the sale would be -$50 without even considering parts and labor.

Taking a $100 hit on shipping obviously wasn't something I want to do regularly, so we had to figure out a solution. Again, I asked, "What do your other customers do?"

They said their other customers either offer free shipping or set flat pricing per country that's independent of the size of the order. I was open to that, but I wasn't looking forward to going country by country figuring out. With flat pricing, we also lose out if someone orders 10 items because they'd still be paying the shipping fee for a single item, but if they're spending $3-4k on an order, I'm fine losing $100 on postage.

They said I had to upgrade my account. I had to go from my $105/month Shopify plan to a whopping $399/month plan, making Shopify TinyPilot's most expensive cloud service. I make some of my money back because the high-tier plan reduces credit card fees by 0.2%. Using TinyPilot's revenue from last year, the fee discounts would have translated to about $2k less in credit card processing fees, so I'm at least getting back some of the $4,800/year I'm spending on this ridiculous plan.

### Why do I feel like the first Shopify client?

For the integration, I was surprised it was so complicated. I asked why they didn't have a process for integrating Shipstation, and they said that everyone else just hands over their admin password. She said most of their clients don't consider themselves highly technical, so they're not as concerned with password sharing.

Another issue we ran into was real-time shipping costs. Currently, if you purchase a TinyPilot product, the Shopify checkout flow shows you

## How elastic is the demand for TinyPilot?

One of the things I did to free up time for the push to 3PL was to increase prices.

In economics, the "elasticity" of a product is how sensitive consumers are to its price. Uber rides are a good example of an elastic product. If rides are cheap, you'll pay for the convenience, but if prices go up 10x, you'll probably take public transportation instead.

When I increased TinyPilot's price to slow down sales volume, it accidentally yielded interesting data about the elasticity of TinyPilot's demand:

| Time Period       | Voyager 2a USB-C Price | Voyager 2a USB-C Sales | Voyager 2a PoE Price | Voyager 2a PoE Sales |
| ----------------- | ---------------------- | ---------------------- | -------------------- | -------------------- |
| Feb. 13 - Mar. 6  | $379                   | 110 (5.0/day)          | $478                 | 29 (1.3/day)         |
| Mar. 7 - Mar. 12  | $399                   | 34 (5.7/day)           | $498                 | 15 (2.5/day)         |
| Mar. 13 - Mar. 19 | $429                   | 16 (2.3/day)           | $528                 | 9 (1.3/day)          |
| Mar. 20 - Mar. 30 | $429                   | 49 (4.5/day)           | $558                 | 13 (1.2/day)         |

It's too small a sample to make any big claims, but it suggests that TinyPilot's customers are less sensitive to price than I expected. Especially for the PoE model, customers bought at roughly the same rate even when I raised the price by $80 (17%).

The capitalist in me wants to keep raising prices to maximize profits, but another part of me has this irrational feeling that the "correct" price should be $350 for the base model.

I was recently re-reading the blog post I wrote about [creating the first TinyPilot prototype](/tinypilot/#commercial-solutions) and I balked at the $500 price tag for existing KVM over IP products:

> Next, I looked at commercial KVM over IP solutions. They provide similar functionality to Dell’s iDRAC, but they’re external devices that connect to a computer’s keyboard, video, and mouse ports (hence the name KVM). Sadly, they’re even more expensive, ranging in price from $500 to $1000 per unit.

I still would like to have a TinyPilot offering that would appeal to the version of me from 2020 who just wants an easy way to manage his home VM server without spending a fortune.

I think the higher price makes sense now while TinyPilot is constrained in both [supply](/retrospectives/2023/01/#losing-450k-in-a-single-email) and [production speed](#getting-over-the-3pl-hump), but I'm hoping I can eventually reduce prices again and make it up in volume.

## Were trade-ins a dumb idea?

Every time TinyPilot releases a new hardware version, I get requests from customers asking if they can trade in their old devices for the new one. In the past, I've told them we don't have a process for that, but I can offer them a big discount on the new version.

This year, TinyPilot's primary constraint is the [availibility of Raspberry Pis](/retrospectives/2023/01/#losing-450k-in-a-single-email). Because of that, I'm trying to maximize the amount we can earn from our scarce supply of Raspberry Pis.

Instead of offering customers a discount on new devices, I had the brilliant idea of offering trade-ins. I thought trade-ins would be easy: the customer would send ther device to us, we'd recycled as many parts as possible to convert it to a Voyager 2a, then send it back.

In reality, the process was more complicated and labor-intensive. A lot of customers rely on their TinyPilots for day-to-day work, so they didn't want to be without it while we upgraded it. In those cases, we sold them a Voyager 2a made from refurbished parts, then gave them a partial refund when we received their trade-in.

And then there were customers who had multiple TinyPilot devices and needed all of them online. So we did the refurbished device thing, but one or two at a time for up to four devices.

All the trade-ins went smoothly, but they were a lot more work than I expected.

It's hard to weigh the tradeoffs of this decision because the upside is intangible &mdash; we're rewarding customers who stick with us and want to support the product. The downside of the trade-ins are very tangible, however. Trade-ins took, on average, 2-3x longer to process than normal sales, and we did them basically at-cost.

If TinyPilot makdes a profit of $300-400 on each standard sale and each trade-in prevented us from making \~2.5 sales, each trade-in cost us $600-700. We did 22 trade-ins in total, so the trade-in program cost around $13k.

If I had to do it over, I would have still offered the trade-ins but with these adjustments:

- Offer trade-ins to customers who asked but not advertise the offer broadly.
- Use a separate support queue for trade-in requests, and set expectations that there might be a wait of a few weeks before we start the process with each customer.

## Side projects

### Reimplementing a Zestful microservice in Go

Back in 2018, when I was launching Zestful, my ingredient parsing service, I had a way for users to pay for access, but I wanted a low-friction way for them to try out the service.

At the time, I liked AppEngine and hated the idea of maintaining my own database. I've since fallen out of love with AppEngine and GCP in general, so now I design things in a platform-agnostic way.

Because AppEngine doesn't have a persistent in-memory state, the proxy stored quota data in Google Cloud Datastore.

I realized I don't need a persistent store at all. I can just store everything in memory. I can run it in a small virtual on Fly.io for free. The downside is that every time I deploy a new version or the server restarts, the quota resets and everyone gets another 30 free requests for the day. But that's not a big deal, so it's not worth the dev effort.

## Wrap up

### What got done?

- Presented at [NERD Summit](https://nerdsummit.org/).
- Found a new accountant.
- Did most of the legwork for 2022 tax prep.

### Lessons learned

-

### Goals for next month

-

### Requests for help

{{<notice type="info">}}

I'm trying a new idea this month where I announce ways readers can help me. If you're a fan of this blog and can connect me with people that are a match for what I'm looking for, [email me](/about/).

{{</notice>}}

If you or someone you can convince to talk to me has worked with contract manufacturers on a hardware product, I'd love to talk about the experience. I'm especially interested in people who have worked on an electronics product at low volumes, like 2,000-5,000 units per year.
