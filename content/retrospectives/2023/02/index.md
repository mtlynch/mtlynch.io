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

I'm finishing the month with a net $8k negative in cash, but I'm not too worried about that. A lot of

## Getting metal cases in the nick of time

In late January or early February, China celebrates Chinese New Year. Chinese vendors completely shut down for anywhere between one and four weeks to celebrate Chinese New Year. If you rely on Chinese vendors, you need to plan carefully around.

We placed an order in December, so it put us right up against Chinese New Year. They weren't communicating much with us except to say they thought they'd make it on time. And fortunately they did. It seems like in one of the last few days before everyone left for Chinese New Year, they shipped out the order.

And for the most part, everything worked out fine. The defect rate was about 5% for me and about 20% for cases shipped to my EU distributor, but at least we got them. They've also agreed to replace the damaged ones for free, which is unusual.

## The difficult scenarios for transitioning to a 3PL vendor

### Scenario 1: Customer emails after their order to make changes

**Desired outcome**: If the order hasn't been fulfilled, make changes in Shopify, and the 3PL receives the changes.

### Scenario 3: Customer needs a custom invoice

Most of our customers purchase through the TinyPilot website without any manual work on our side, but cusotmers occasionally need to customize their order with something the website doesn't support. Maybe they want to order in quantities the website doesn't offer, or maybe we're offering them a special discount.

**Desired outcome**: Fulfill the order when the customer pays.

### Scenario 3: Customer pays with purchase order

Purchase orders are basically IOUs for big businesses. They're not willing to give us cash up front, but they're agreeing to pay us after they receive their order, usually within 30 days.

**Desired outcome**: Fulfill the order when we receive the purchase order.

### Discussion

Scenario 1 should be easy. If we have a shared view of the orders, TinyPilot's customer service can tell when an order has been fulfilled or not. If it's not fulfilled, we make the change, and the 3PL vendor fulfills it using the new information.

There's a bit of a race condition because if the 3PL prints the shipping label, then we change the address, then the 3PL marks it as fulfilled, the order is going to the wrong address, but everyone thinks things are fine. So we need to verify with the 3PL that printing the order label marks the order as fulfilled.

Scenarios 2 and 3 clash with each other. If you make a rule that says, "Don't fulfill any order until they're marked as paid," then the purchase order one will never go out because we don't mark it paid until we receive actual payment. If the rule is, "Fulfill any order as soon as you see it," we'd send out orders before the customer paid in scenario 2.

Writing this out now, maybe the easiest thing is to just mark the order as "paid" when we receive the purchase order. We still need a way to track when we receive actual payment for the order, because customer service needs to know whether to ~~send goons~~ keep politely asking for payment. but we could do that with some kind of TinyPilot-internal

### How our first 3PL handled these scenarios

They couldn't handle scenario 1. Their order management system (Veracore) didn't sync continuously with our eCommerce platform (Shopify). Instead, they polled our orders every 15 minutes. At the end of the day, they'd mark which orders they fullfilled. If we added a note to the order like, "Actually, hold on. The customer says they entered the wrong shipping address," the 3PL probably wouldn't see that because they only pull in order information once per order. And we have no way of telling if the order has gone out already because they don't tell us until the end of the day.

The 3PL's process for handling scenario 1 was that we email the woman who handles our orders and tell her what's going on. I disliked this solution for a few reasons. First, I want to manage as much as possible through Shopify so we have a single source of truth for the order. Second, if there are exceptions, I should be emailing a team not an individual. I don't want my staff to email someone saying that we need to change an address before an order goes out, and it turns out our point of contact is out sick or on vacation.

## Side projects

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-
