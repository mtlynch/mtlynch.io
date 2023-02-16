---
title: "TinyPilot: Month 31"
date: 2023-02-12T08:40:09-05:00
description: Tricky transitions.
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $60-80k/month in revenue and employs six other people.

Every month, I publish a retrospective like this one to share how things are going with my business and my professional life overall.
{{</notice>}}

## Highlights

- TinyPilot began shipping a new product, the [Voyager 2a](https://tinypilotkvm.com/product/tinypilot-voyager2a).
- We had to cancel our contract with our new 3PL vendor a few weeks into the relationship.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Ship the first Voyager 2a device

- **Result**: We began shipping the [Voyager 2a](https://tinypilotkvm.com/product/tinypilot-voyager2a)
- **Grade**: A

The Voyager 2a ended up being TinyPilot's smoothest release ever. For previous releases, we've always forgotten a few small things and had to scramble to complete them days before launch. For the 2a, we'd been preparing since December for everything that needed to happen, and they all happened.

### Prepare to transition fulfillment to our 3PL vendor in February

- **Result**: We canceled our contract with the 3PL vendor
- **Grade**: N/A

Sadly, once we started working with our new 3PL on real orders, we realized that their workflows wouldn't work for us. More details on that [below](##hiccups-in-transitioning-to-a-3pl-vendor).

### Write my fifth [annual retrospective](/tags/annual-review/)

- **Result**: [Published it](/solo-developer-year-5/) 10 days late, but I'm happy with the result
- **Grade**: A-

I had a tough time writing my annual review this year. The final post was 2.5k words, but I probably threw out 5-8k words in rejected drafts. I kept finding myself writing long sections about some project that was a big part of what I thought about in 2022 but was nevertheless boring to read about.

I felt like the version I published did a good job of covering the major areas I worked on for the year without boring readers by going too far down the rabbit hole on anything.

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

Sales are down from our peak at the end of last year, but that's intentional. I'm scaling back advertising and keeping prices high on Amazon to compensate for our supply shortage and to reduce load on TinyPilot's fulfillment staff while we transition to our new product.

I'm finishing the month with a net $8k loss in cash, but I'm not too worried about that. That's largely due to disproportionate spending on materials in December to prepare for suppliers closing during Chinese New Year. It will balance out in the next few months.

## Increasing production from 140 to 200 devices per month

At the end of last year, I was told that TinyPilot [would not receive any new allocation](/retrospectives/2023/01/#losing-450k-in-a-single-email) of Raspberry Pis until September 2023. This limited our production capacity to about 140 devices per month from January to August.

Fortunately, we received word in January that we'd receive a small amount of new allocation, which increases our production capacity to 200/month. We have to purchase 8 GB Pis for nearly double the price, but I'll happily pay a premium there so we can continue selling devices.

I'm happy with 200/month. I think we can comfortably sell at that rate while also having enough time and profit left over to invest in processes that will allow us to scale faster when supply is less limited.

## Getting metal cases in the nick of time

Every year, in late January or early February, China celebrates Chinese New Year. China takes its new year celebration seriously, so Chinese vendors shut down entirely for weeks. Some close for just a couple of weeks, but others are unavailable for up to four weeks.

TinyPilot purchases most of its raw materials from China, so I have to plan carefully around Chinese New Year. I have to place orders early enough that they'll complete before things begin shutting down. I also need to order higher quantities so that I can survive the four weeks they'll be closed to new orders.

In December, we were still finalizing the design for TinyPilot's new metal cases. The manufacturer estimated that it would take 30 business days to complete the order, so we were bumping right up against the Chinese New Year danger zone.

TinyPilot has ordered several custom products before, so I have a standard process I follow. The first order is always as small as possible, because there's a high risk something will be wrong with it. I try to order just enough to tide me over until the second batch. And then the second batch, I order a little larger, and then a little more after that.

For the metal cases, I couldn't follow my usual plan because Chinese New Year meant there'd be a gap of about three months between the first and second batches. If I ran out, I was dead in the water because I didn't want to roll back to my previous model.

So, I bet big and ordered 1000 cases in the first run.

The manufacturer said they could get it done by Chinese New Year, and then there weren't many updates about timeline. They sent us samples of the first batch, and they looked great. Whenever we'd ask about timelines, they'd just say that they expected to get it out the door by Chinese New Year.

One aspect that made me anxious was that they told me they'd bill me for shipping before they shipped, but they weren't sending me the bill. I would be crushed if we did all that work and then the thing that prevented the order from shipping was that they were waiting on my shipping payment.

Finally, the Saturday after I thought they closed for the new year, I got an email asking me to send payment immediately. I did, and then a few days later, I received tracking numbers for the cases.

And they arrived! It was so many boxes of cases, they didn't fit in our office. But we got the cases, which meant we were able to ship the Voyager 2a as planned, which was an enormous relief.

## Hiccups in transitioning to a 3PL vendor

When we started working with our 3PL vendor, things seemed like they were off to a good start. They were a small business, all of their customers were small businesses. The contract was straightforward. It seemed like we were well-matched.

Then, they gave me the instructions for integrating with their warehouse management software, Veracore. The instructions were a PDF, which was the first red flag. When I logged into the system, I found an ASP app that looked like it hadn't been updated in 15 years.

{{<img src="veracore-instructions.png" caption="Veracore's onboarding instructions PDF with screenshots of its web interface" max-width="600px" has-border="true">}}

I was willing to overlook Veracore. It was the system they'd be using, while we'd continue working in Shopify.

We decided to start by shifting only our low-volume product over to the 3PL: the TinyPilot Power Connector. It's for hobbyists who build their own devices, so we only sell 30-40 per month. It felt like a low-cost, low-risk product to work through the process end-to-end.

our main product to shift that over to the 3PL, so we started by having them process orders for our

And then we received our first order. It came in at 5pm on Christmas, so I knew it wouldn't go out that day. I checked the order the following afternoon, and it still hadn't gone out. Okay, maybe they were closed the day after Christmas too?

By the 27th, the order still hadn't shipped, so I emailed the 3PL to verify it was showing up on their end. They said that everything was working. It's just that Veracore only syncs its order status back to Shopify once per day, so we'd see Shopify update with fulfillment status and tracking numbers by 8pm.

Sync once per day? Why wouldn't it just immediately mark orders as shipped so that we have the information in real-time?

I thought we could still work with it, and then we got to a few scenarios that wouldn't work.

### What if a customer changes their order?

Every 30 orders or so, the customer emails us a few minutes after to make a change. Sometimes they realize they mistyped their shipping address. Sometimes they've changed their mind entirely and want to cancel the order.

In TinyPilot's current system, these requests are easy to handle. As long as we haven't shipped out their order already, we just make the change in Shopify, our eCommerce platform. When it's time to fulfill the order

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

The 3PL's solution was, again, that we email the person who handles our order and explain the special case orders.

Writing this out now, I'm realizing I missed an obvious solution. We could have just made the rule, "Ship out orders when they're marked as paid." And then for (2), we just manually mark the order as "paid" when we receive the purchase order. We'd need a separate system to track unpaid purchase orders, but that's easier than complicating our interface with the 3PL.

### Switching 3PLs

Overall, it felt like our first 3PL's system for managing changes was brittle and pushed a lot of work onto us in order to prevent expensive errors.

We moved on, and it was amicable. Our contract required two months notice, so they technically could have demanded two more payments of their monthly minimum ($350/month), but they didn't.

Before going with my chosen 3PL, I had interviewed another one farther away. I liked them about equal, but I went with the one that was within driving distance. When I started running into issues with my first 3PL, the backup explained how their system (Shipstation) would handle my special-case scenarios and it sounded significantly smoother than Veracore. Shipstation syncs continuously with Shopify, so we shouldn't run into these weird problems that come from having information on a 24-hour delay.

## Wrap up

### What got done?

- Launched [TinyPilot Voyager 2a](https://tinypilotkvm.com/product/tinypilot-voyager2a)
- Published my [fifth annual retrospective](/solo-developer-year-5/)

### Lessons learned

- Figure out how your 3PL will handle non-standard orders.
- Keep interfaces between your eCommerce platform and your 3PL's order management system.
  - In my case, there were easy changes to TinyPilot's internal process I overlooked, but they would have simplified our 3PL integration.
- Don't transition to a 3PL all at once.
  - Start with a low-volume or low-cost product so you can work out the kinks before moving onto something higher risk.

### Goals for next month

- Get back to our normal level of ready-to-ship TinyPilot devices.
- Start the process of transitioning to a new 3PL vendor.
- Begin direct cross-team collaboration between the developers and support engineers.
