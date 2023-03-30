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

- **Result**: This was mostly successful
- **Grade**: B

I took on as many customer support tickets as I could for a week to free up their time.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

## Getting over the 3PL hump

My top priority right now is to transition TinyPilot's fulfillment to a third-party logistics (3PL) vendor. The 3PL's job is to keep finished products in a warehouse and then, pick, pack, and ship products when orders arrive.

Transitioning to a 3PL is a challenge because TinyPilot's fulfillment staff is working at nearly 100% capacity to build devices and fulfill orders as quickly as they come in.

## "Everyone just gives us their admin password"

It's turning out to be harder than I thought to integrate with 3PLs. Our eCommerce platform is Shopify, one of the most popular platforms in the US. I thought surely that every 3PL would have an easy

Shipstation seems like the more modern solution.

The person who does it has to have special privileges on both the Shipstation account and the Shopify account. I couldn't link the accounts because I didn't have credentials to the 3PL's Shipstation account. They couldn't do it because they didn't have admin rights on my Shopify account.

## Interesting edge cases for fulfillment

1. Customer emails us to say they mistyped their shipping address
1. Customer emails us to say they ordered but they're having second thoughts
1. Customer wants to pay with a purchase order
1. Order looks fraudulent

These edge cases are what caused me to terminate my contract with [my first 3PL vendor](/retrospectives/2023/02/#hiccups-in-transitioning-to-a-3pl-vendor). It turned out that their integration with Shopify was on a delay of up to 24 hours, so

I try to avoid manual steps as much as possible in TinyPilot's workflows. Any time a TinyPilot employee has to send an email about an order, it's splitting information about the order into multiple channels, and we're relying on human discipline to keep them in sync. I want to rely on tooling as much as possible.

(1) was trivial with the new vendor. We can see in real-time whether they've fulfilled the order already, so that part was easy. And when we update the shipping address, it updates on their end within seconds.

(2) was a little trickier. Currently, we just add a comment in Shopify on the order, like, "Hold while I work through an issue with this customer." The extra note stands out and. The problem was that Shipstation doesn't import comments from Shopify. I first tried adding a tag to the order called `paused` and asked if Shipstation could see that. It could, but our 3PL partner couldn't build an automation around it. And then, poking around Shopify, I noticed a "hold fulfillment" button.

## Should we pay $150 to ship this $50 order?

The customer was in Australia, where shipping is very expensive. TinyPilot receives DHL shipping discounts through Shopify that reduced the postage to $50. But our 3PL has a separate deal with DHL, so DHL was charging them $150 for the same shipment. The customer only paid $50 in postage and $50 for the product, so our profit on the sale would be -$50 without even considering parts and labor.

Taking a $100 hit on shipping obviously wasn't something I want to do regularly, so we had to figure out a solution. Again, I asked, "What do your other customers do?"

They said their other customers either offer free shipping or set flat pricing per country that's independent of the size of the order. I was open to that, but I wasn't looking forward to going country by country figuring out. With flat pricing, we also lose out if someone orders 10 items because they'd still be paying the shipping fee for a single item, but if they're spending $3-4k on an order, I'm fine losing $100 on postage.

They said I had to upgrade my account. I had to go from my $105/month Shopify plan to a whopping $399/month plan, making Shopify TinyPilot's most expensive cloud service. I make some of my money back because the high-tier plan reduces credit card fees by 0.2%. Using TinyPilot's revenue from last year, the fee discounts would have translated to about $2k less in credit card processing fees, so I'm at least getting back some of the $4,800/year I'm spending on this ridiculous plan.

## Why do I feel like the first Shopify client?

For the integration, I was surprised it was so complicated. I asked why they didn't have a process for integrating Shipstation, and they said that everyone else just hands over their admin password. She said most of their clients don't consider themselves highly technical, so they're not as concerned with password sharing.

Another issue we ran into was real-time shipping costs. Currently, if you purchase a TinyPilot product, the Shopify checkout flow shows you

## How elastic is the demand for TinyPilot?

One of the things I did to free up time for the push to 3PL was to increase prices.

| Time Period        | Voyager 2a USB-C Price | Voyager 2a USB-C Sales Per Day | Voyager 2a PoE Price | Voyager 2a PoE Sales Per Day |
| ------------------ | ---------------------- | ------------------------------ | -------------------- | ---------------------------- |
| March 1 - March 10 | $XX                    | X.Y                            | $XX                  | X.Y                          |

## Were trade-ins a dumb idea?

Every time we release a new hardware version, I get requests from customers asking if they can trade in their old devices for the new one. In the past, I've told them we don't have a process for that, but I can offer them a big discount on the new version.

This year, TinyPilot's primary constraint is the availibility of Raspberry Pis (TODO: link). Because of that, I'm trying to maximize the amount we can earn from our scarce supply of Raspberry Pis.

Instead of offering customers a discount on new devices, I had the brilliant idea of offering trade-ins.

I thought they'd be pretty easy. In some cases, customers had up to four TinyPilots, and they didn't want any of them offline, so we had to send a refurbished device to them, get one of their devices back in exchange, swap in parts needed to make it a Voyager 2a, and repeat this back-and-forth three times.

At a certain point, I asked the support team to defer all trade-in requests until after we completed the transition to the 3PL vendor. Of course, we haven't received a single trade-in request since I said that, so it didn't win us anything.

If I had to do it over, I would:

- Offer trade-ins to customers who asked but don't advertise it broadly.
- Use a separate support queue for trade-in requests, and set expectations that there might be a wait of a few weeks before we start the process with each customer.

Don't advertise trade-ins, but offer them to users who inquire.

## Side projects

### Reimplementing a Zestful microservice in Go

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

TODO
