---
title: "TinyPilot: Month 31"
date: 2023-02-12T08:40:09-05:00
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

### Ship the first Voyager 2a device

- **Result**: XX
- **Grade**: XX

TODO

### Prepare to transition fulfillment to our 3PL vendor in February

- **Result**: XX
- **Grade**: XX

TODO

### Write my fifth [annual retrospective](/tags/annual-review/)

- **Result**: Published it late
- **Grade**: A-

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | December 2022                           | January 2023                            | Change                                         |
| ------------------------ | --------------------------------------- | --------------------------------------- | ---------------------------------------------- |
| Unique Visitors          | 7,308                                   | 8,092                                   | <font color="green">+784 (+11%)</font>         |
| Total Pageviews          | 15,549                                  | 16,665                                  | <font color="green">+1,116 (+7%)</font>        |
| Sales Revenue            | $66,092.24                              | $68,619.55                              | <font color="green">+$2,527.31 (+4%)</font>    |
| Enterprise Subscriptions | $290.70                                 | $290.70                                 | 0                                              |
| Royalties                | $2,798.97                               | $5,689.93                               | <font color="green">+$2,890.96 (+103%)</font>  |
| Total Revenue            | $69,181.91                              | $74,600.18                              | <font color="green">+$5,418.27 (+8%)</font>    |
| **Profit**               | **<font color="red">-$4,806.26</font>** | **<font color="red">-$8,122.10</font>** | **<font color="red">-$3,315.84 (-69%)</font>** |

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

Sales are down from our peak at the end of last year, but that's intentional. I'm deliberately throttling sales to compensate for our supply shortage and to reduce load on TinyPilot's fulfillment staff while we transition to our new product.

I'm finishing the month with a net $8k negative in cash, but I'm not too worried about that. That's mainly carryover from expenses I had in 2022 before I found out about the supply shortage, so it represents somewhat excessive inventory, but it means my costs will be lower for the next three months.

## Getting metal cases in the nick of time

In late January or early February, China celebrates Chinese New Year. Chinese vendors completely shut down for anywhere between one and four weeks to celebrate Chinese New Year. If you rely on Chinese vendors, you need to plan carefully around.

We placed an order in December, so it put us right up against Chinese New Year. They weren't communicating much with us except to say they thought they'd make it on time. And fortunately they did. It seems like in one of the last few days before everyone left for Chinese New Year, they shipped out the order.

And for the most part, everything worked out fine. The defect rate was about 5% for me and about 20% for cases shipped to my EU distributor, but at least we got them. They've also agreed to replace the damaged ones for free, which is unusual.

We usually have a buffer of pre-built devices, but switching over meant we had to start from zero. The new model takes longer to assemble.

## Hiccups in transitioning to a 3PL vendor

When we started working with our 3PL vendor, things seemed like they were off to a good start. They were a small business, all of their customers were small businesses. The contract was straightforward. It seemed like we were well-matched.

Then, they gave me the instructions for integrating with their warehouse management software, Veracore. The instructions were a PDF, which was the first red flag. When I logged into the system, I found an ASP app that looked like it hadn't been updated in 15 years.

TODO: Photo of PDF

But I was willing to overlook Veracore. It was their system, not mine. We'd continue working in Shopify, and Veracore would just sync with us.

And then we received our first order. It was XX, so maybe they were closed for the holidays. Then the next day by XX pm, the order was still in our system as unfulfilled. I emailed our 3PL to verify that the order was showing up on their end. They said that everything was working. It's just that Veracore only syncs its order status back to Shopify once per day, so we'd see Shopify update with fulfillment status and tracking numbers by around 7pm ET.

Sync once per day? Why wouldn't it just immediately mark orders as shipped so that we have the information in real-time?

I thought we could still work with it, and then we got to a few scenarios that wouldn't work.

### What if a customer changes their order?

Every 30 orders or so, the customer emails us a few minutes after to make a change. Sometimes they realize they mistyped their shipping address. Sometimes they've changed their mind entirely and want to cancel the order.

In TinyPilot's current system, these requests are easy to handle. As long as we haven't shipped out their order already, we always honor the customer's request by making the necessary changes in Shopify, our eCommerce platform.

When we transitioned to the 3PL, this is where that "sync once per day" issue came back to bite us. If a customer emailed us requesting changes, now we don't know if the order has been fulfilled or not. The information we're seeing in Shopify is up to 24 hours out of date.

The 3PL's solution was that we email the employee at the 3PL who handles our orders and let them know about any order changes. That felt like a terrible system.

Currently, Shopify is our "source of truth." We can rely on Shopify being the authoritative location where everyone related to an order shares information. The 3PL's solution would mean that we no longer have a single, shared source of truth because there could be extra information hiding in someone's email.

I also wasn't crazy about emailing an individual rather than a team. I asked what happens if that person was out sick or on vacation, and they said that usually someone else checks their email. Usually?

### What if the customer pays in a non-standard way?

There are two common ways that customers can purchase from us outside of the normal checkout process on our website:

1. They need a custom order that our website doesn't support (e.g., volume discount)
1. They want to pay with a purchase order (basically, how big companies write IOUs)

For (1), we create a custom order for them and then give them a link to pay with a credit card. When the customer pays, Shopify automatically marks the order as "paid" and we ship it out.

For (2), we create a custom order for the customer and then wait for them to send us a signed purchase order. When we receive the purchase order, Shopify still sees the order as "unpaid" because we don't have the actual cash yet, but we ship it out based on the purchase order.

As you can see, these two situations are at odds with each other. If we told the 3PL to wait to ship out orders until they're marked as "paid," then they can't ship out orders paid by purchase order (2). If we tell them to ship out orders even if they're unpaid, they'd ship out orders for (1) immediately even though the customer might not end up paying.

Before the 3PL, we added notes to an order to make the intent explicit in the case of purchase orders. But the 3PL can't see our note because they only import each order once, so if we add notes later, they don't receive them.

The 3PL's solution was, again, to email the person who handles our order and explain the special case orders.

Writing this out now, I'm realizing I missed an obvious solution. We could have just made the rule, "Ship out orders when they're marked as paid." And then for (2), we just manually mark the order as "paid" when we receive the purchase order. We'd need a separate system to track unpaid purchase orders, but that's easier than complicating our interface with the 3PL.

### Switching 3PLs

Overall, it felt like our first 3PL's system for managing changes was brittle and pushed a lot of work onto us in order to prevent expensive errors.

We moved on, and it was amicable. Our contract required two months notice, so they technically could have demanded two more payments of their monthly minimum ($350/month), but they didn't.

Before going with my chosen 3PL, I had interviewed another one farther away. I liked them about equal, but I went with the one that was within driving distance. When I started running into issues with my first 3PL, the backup explained how their system (Shipstation) would handle my special-case scenarios and it sounded significantly smoother than Veracore. Shipstation syncs continuously with Shopify, so we shouldn't run into these weird problems that come from having information on a 24-hour delay.

## Wrap up

### What got done?

-

### Lessons learned

- Figure out how your 3PL will handle non-standard orders.
- Keep interfaces between your eCommerce platform and your 3PL's order management system.
  - In my case, there were easy changes to TinyPilot's internal process I overlooked, but they would have simplified our 3PL integration.

### Goals for next month

- Build up a buffer of pre-assembled Voyager 2a devices.
