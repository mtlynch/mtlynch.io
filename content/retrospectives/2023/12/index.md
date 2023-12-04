---
title: "TinyPilot: Month 41"
date: 2023-12-04T00:00:00-05:00
description: TODO - One-line summary
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $80-100k/month in revenue and employs six other people.

Every month, I publish a retrospective like this one to share how things are going with my business and my professional life overall.
{{</notice>}}

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Goal 1

- **Result**: XX
- **Grade**: XX

TODO

### Goal 2

- **Result**: XX
- **Grade**: XX

TODO

### Goal 3

- **Result**: XX
- **Grade**: XX

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

## One-day shipping: how hard could it be?

For most of TinyPilot's life, I haven't offered overnight or one-day shipping. When we were fulfilling orders in-house, we staffed our office six days per week for processing orders, but only one person was there per day. I didn't offer one-day shipping because I knew there'd be situations where someone's out sick or on vacation, so a one-day turnaround wouldn't be possible.

When we switched fulfillment to a third-party logistics warehouse (3PL), it changed a lot about how we offer shipping. One of the big changes was that the 3PL has much more worker redundancy than we do, so orders should go out in one business day no matter what.

### The complicated shipping stack

By September, we'd gotten most of the kinks worked out in our transition to the 3PL, so I decided it would be a good time to begin offering overnight shipping options.

1. Shopify offers a list of shipping options they support
1. I pick which shipping options I want to make available to customers
1. Customers pick the shipping option they prefer at checkout

With the 3PL, the process became much more convoluted. The 3PL uses a warehouse management solution called ShipStation. ShipStation integrates with Shopify, so now the stack looks like this:

1. ShipStation offers the 3PL a list of shipping options they support.
1. The 3PL chooses from this list of shipping options they want to offer their clients.
1. Shopify queries the ShipStation to find out which shipping options ShipStation and the 3PL agree on.
1. I pick from Shopify which shipping options I want to make available to customers.
1. Customers pick the shipping option they prefer at checkout.

At step (3), there was a problem because I wasn't seeing any one-day shipping options. And now there are so many players involved, I don't know if the problem is in ShipStation, the 3PL, Shopify, or me. But after some back and forth with my 3PL, we finally got some one-day shipping options to show up in Shopify's admin interface.

### The filtering problem

After a few weeks, I noticed that nobody was choosing one-day shipping. I tried checking out in my store, and I saw that even though I had enabled six different shipping options from Shopify, at checkout, customers were only seeing two options: USPS Ground and USPS Priority.

Again, I spent two months chasing down my 3PL and ShipStation, and I finally got an answer. ShipStation filters what they consider to be "similar" shipping options at checkout. So if USPS charges $9 for two-day shipping and UPS charges $10 for two-day shipping, ShipStation will drop the UPS quote and only show the USPS price. This is by design because they think they're being helpful. Some genius PM at ShipStation probably read about the paradox of choice and feels like they've made an amazing breakthrough in shipping speeds.

I tried to explain to ShipStation that I don't want them to filter and that customers might choose one courier over another for reasons other than price and estimated speed, but they're not changing the behavior.

Still, this didn't explain what I was seeing now. How had they filtered out all one-day shipping options? It turned out that ShipStation considered USPS Priority Mail (two-day shipping) and USPS Priority Mail Express (one-day shipping) to be "similar." So they never showed the one-day option because the two-day option was similar and cheaper.

How can you be a compay with "Ship" in your name, and you don't understand that one-day shipping and two-day shipping are different?

The conversation with them was going nowhere, so I decided to sidestep ShipStation entirely. When a customer chooses a shipping option, that's just to calculate how much they pay at checkout. Actually purchasing the postage for the customer's order is a totally separate process. So I decided to drop ShipStation and just let Shopify get its own estimates

### Do I even want one-day shipping?

The new problem is that Shopify gets much better postage rates than ShipStation. So now customers are paying $40 for overnight shipping, but when it comes time for the 3PL to purchase postage through ShipStation, they pay $90, and I'm on the hook for the difference.

TinyPilot is by design not a high-urgency business. We don't have any critical servers that need to stay online, we don't offer 24/7 support. I designed as much as possible around the idea that responses would take up to three business days, even though we aim for fewer.

## One-day shipping customers have higher expectations

Sometimes, something comes up with an order and it's delayed a day. 98% of the time, customers who chose ground or two-day shipping don't say anything. The Monday after Black Friday, UPS had a strange issue where they

## The return of discretionary time

If I wake up and start working at 7am, I stop working at 4pm, which includes breaks for breakfast, lunch, and exercise.

## Topic 3

## My first Handmade conference

He's

### This is water

I'm so used to the stacks that I deal with every day where it's a . I try to be pretty minimal, but TinyPilot is WebComponents on top of Flask on top of Nginx on top of Linux. And it's been a while since I thought about the fact that our model for building applications is on top of the web browser, a piece of technology that was fundamentally designed for representing documents.

There's an old joke that David Foster Wallace famously tells in his commencement speech. Two young fish are swimming together, and an old fish swims by and says, "Water's great today, eh boys?" One of the young fish turns to the other and says, "What the fuck is water?"

### Relentless indie ambition

The projects that got me interested in Handmade were SerenityOS, an OS that Andreas Kling started from scratch. No third-party libraries or dependencies. Just an OS from the ground up. And Andrew Kelly started Zig, which he wants to replace all the C code in the world.

I like that ambitious spirit. Cameron Riekes is an undergrad, and he presented about building a 2D RPG game. But then he "ended up" coding his own 3D game engine from scratch. And XX is YY years old and is working on Tilde, a ground up replacement for LLVM.

### Extreme skepticism of big tech

My biggest gripe with the conference was that I felt like the tone was critical of big tech to the point of irrationality. The idea was that big tech is basically poison. Everything they produce is buggy, bloated, unreliable, and overpriced.

And the reason more people aren't aware of it is that big tech controls software conferences, and they prevent presenters from speaking honestly about the problems in big tech software. I've spoken at a few mid-level conferences, and nobody's ever told me that I can't criticize big tech, so this rang false to me.

I'm amenable to this viewpoint. I prefer to avoid big tech when there's an indie alternative available. But I also think that big tech does a lot of things very well and does most of the heavy lifting in driving forward technology.

## Side projects

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
