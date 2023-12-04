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

### Shift manufacturing to our contract manufacturer as quickly as possible

- **Result**: The shift is now complete. The manufacturer is manufacturing units to the same quality as when we assembled them in-house.
- **Grade**: A

TODO

### Conduct five customer outreach calls

- **Result**: We reached out to three customers and had zero customer calls
- **Grade**: F

In this case, I forgot to prioritize this. I lost almost two full weeks to conference and holiday travel, and the customer service team had lower bandwidth than usual. I should have followed up more with the team to prioritize this, as we need to continue investing here for the business' long-term sustainability.

### Clear the TinyPilot office of all old inventory and spare parts

- **Result**: I decided to pause this process
- **Grade**: N/A

It turns out our landlord is pretty relaxed about when we move out, so there's less urgency to close the office than I thought. It's also turning out to be harder than I expected to clear the office without just throwing everything in the garbage. We have dozens of items that are worth $1-50 apiece, but we generally have only a handful of each.

As an example, we have three used Arduino Uno boards. Each one retails for $28. We could maybe sell our three on eBay for a total of $30 used, but it would take about two hours to handle the process from end-to-end. So it would cost more in employee wages than we'd actually make selling the boards.

My new plan is to just to wait until we're close to moving out and advertise a time when people can just come by and take what they want for free.

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

I left out a step. There's actually step (4.5) ShipStation filters what options _they_ think customers should see at checkout.

Again, I spent two months chasing down my 3PL and ShipStation, and I finally got an answer. ShipStation filters what they consider to be "similar" shipping options at checkout. So if USPS charges $9 for two-day shipping and UPS charges $10 for two-day shipping, ShipStation will drop the UPS quote and only show the USPS price. This is by design because they think they're being helpful. Some genius PM at ShipStation probably read about the [paradox of choice](https://en.wikipedia.org/wiki/The_Paradox_of_Choice) and feels like they've made an amazing breakthrough in eCommerce UX.

I tried to explain to ShipStation that I don't want them to filter and that customers might choose one courier over another for reasons other than price and estimated speed, but they're not changing the behavior.

Still, this didn't explain what I was seeing now. How had they filtered out all one-day shipping options? It turned out that ShipStation considered USPS Priority Mail (two-day shipping) and USPS Priority Mail Express (one-day shipping) to be "similar." So they never showed the one-day option because the two-day option was similar and cheaper.

How can you be a compay with "Ship" in your name, and you don't understand that one-day shipping and two-day shipping are different?

The conversation with them was going nowhere, so I decided to sidestep ShipStation entirely. When a customer chooses a shipping option, that's just to calculate how much they pay at checkout. Actually purchasing the postage for the customer's order is a totally separate process. So I decided to drop ShipStation and just let Shopify get its own estimates

### Do I even want one-day shipping?

The new problem is that Shopify gets much better postage rates than ShipStation. So now customers are paying $40 for overnight shipping, but when it comes time for the 3PL to purchase postage through ShipStation, they pay $90, and I'm on the hook for the difference.

TinyPilot is by design not a high-urgency business. We don't have any critical servers that need to stay online, we don't offer 24/7 support. I designed as much as possible around the idea that responses would take up to three business days, even though we aim for fewer.

Sometimes, something comes up with an order and it's delayed a day. 98% of the time, customers who chose ground or two-day shipping don't say anything. The Monday after Black Friday, UPS had a strange issue where they

## The return of discretionary time

If I wake up and start working at 7am, I stop working at 4pm, which includes breaks for breakfast, lunch, and exercise.

I always jinx it because whenever I celebrate having free time, some new problem pops up or something about our process changes

## My first Handmade conference

He's

### Remembering that there are alternatives to the popular tech stacks

I'm so used to the stacks that I deal with every day where it's a . I try to be pretty minimal, but TinyPilot is WebComponents on top of HTML on top of Flask on top of Nginx on top of Linux. And it's been a while since I thought about the fact that our model for building applications is on top of the web browser, a piece of technology that was fundamentally designed for representing documents.

There's an old joke that David Foster Wallace famously tells in his commencement speech:

> There are these two young fish swimming along and they happen to meet an older fish swimming the other way, who nods at them and says “Morning, boys. How’s the water?” And the two young fish swim on for a bit, and then eventually one of them looks over at the other and goes “What the hell is water?”

### Relentless indie ambition

The reason I first heard about Handmade to begin with is that I follow Andreas Kling, the creator of SerenityOS. He created the initial OS by himself with no third-party libraries or dependencies. He posted about presenting his project at Handmade in XX.

And I looked into it and realized Handmade also tends to attract talks about Zig, an indie programming language I've been interested in for a while. Andrew Kelly, the creator of Zig, apeared on the CoRecursive podcast in XX and talked about how he wants to replace all the C code in the world with Zig. And I think that kind of ambition and enthusiasm for software is so cool and exciting.

I liked the conference's celebration of reinventing the wheel. It's usually a putdown in software to accuse something of reinventing the wheel, but handmade embraces it. Why not reinvent the wheel? Maybe your wheel will be better than the wheel everyone else is using. And just by trying to reinvent the wheel, you'll get a better understanding of how the wheel works.

And Handmade delivered on this expectation. A lot of the presenters and attendees liked the idea of reinventing the wheel. Some of them wanted to reinvent the wheel for fun, some because they thought they could build a better wheel, and some just because.

I like that ambitious spirit. Cameron Riekes is an undergrad, and he presented about building a 2D RPG game. But then he "ended up" coding his own 3D game engine from scratch. And XX is YY years old and is working on Tilde, a ground up replacement for LLVM.

I met Andrew Kelly, the creator of Zig, in person, which inspired me to [finally try writing some Zig code](/notes/zig-call-c-simple/).

### Extreme skepticism of big tech

One complaint I had was that the tone was critical of big tech to a degree that I found irrational.

The idea was that big tech is basically poison. Everything they produce is buggy, bloated, unreliable, and overpriced.

And the reason more people aren't aware of it is that big tech controls software conferences, and they prevent presenters from speaking honestly about the problems in big tech software. I've spoken at a few mid-level conferences, and nobody's ever told me that I can't criticize big tech, so this rang false to me.

I'm sympathetic to this viewpoint. I prefer to avoid big tech when there's an indie alternative available. But I also think that big tech does a lot of things very well and does most of the heavy lifting in driving technology forward. I think it's a mistake to simply turn up our noses at it and assume the indie thing is always better than the big tech equivalent.

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
