---
title: "08"
date: 2023-07-31T09:04:46-04:00
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

## How can TinyPilot increase recurring revenue?

When TinyPilot's sales slump, I start to think more about recurring revenue. In the bootstrapper community, most successful businesses have recurring revenue. TinyPilot is an oddity in that

I keep waiting for the day that everyone who wants a TinyPilot has one, and then what am I going to do?

## How TinyPilot Pro licenses work today

In 2020, I was working on a licensing scheme for TinyPilot, and I realized that if TinyPilot licenses lasted for a year, I didn't really need to figure it out for a year.

But now it's three years later, and I still haven't figured it out. The secret of TinyPilot Pro is that once you have a TinyPilot Pro installation, you can keep upgrading forever. There are users who purchased in August 2020 that got free upgrades for two years after their licenses expired. The vast majority of users probably don't even realize that their license expired at all because they (reasonably) assume that if TinyPilot continues delivering them updates, they still have a valid license.

The main reason customers discover that their license is expired is when their device's filesystem becomes corrupted and they need to reflash their microSD storage disk. In those cases, they go to our factory reset flow, but when they enter their order information, they find

When this happens, customers are mad. Not only did we sell them a device whose filesystem went bad, but now we're leaving them with a dead device until they pay us $80 to renew their license?

## What would ideal TinyPilot Pro subscriptions look like?

When I started TinyPilot, I thought the value would be in the software. I thought I'd provide instructions for DIY builds, and then people would purchase the software from me.

## What's the ideal version of TinyPilot Pro's paid licenses work?

When the customer checks out, there's a little checkbox that says, "Auto-renew my TinyPilot Pro license annually." It's off by default, but if the user checks it, they get $50 off their purchase.

At any time, the user can manage their license and buy another year.

Would I do a monthly price? It seems like a bad idea because users can just subscribe for one month every six months and then they're getting all the same software for 1/5 the price.

## Challenges of the ideal flow

### Subscriptions are a new system

My first instinct is to use a tool for software subscriptions like Stripe or Paddle. But then that's a whole new system to integrate. Our license checking system would have to also integrate with Stripe/Paddle APIs to see if users have active licenses. Our support staff would need to

There's also Shopify subscriptions. Those have the benefit of being integrated with our existing systems. Our support staff already knows how to use Shopify. Our license checking system is already integrated into Shopify.

The downside of Shopify subscriptions is that I've had a terrible time with Shopify add-on apps. They're typically low quality. The way that Shopify is designed means that Shopify apps all have excessive permissions, so to plug an app into my Shopify store and allow it to manage recurring subscriptions, I have to give that app access to _all_ orders in my system. So there's a risk that a nefarious or insecure app leaks customer data.

## How can I test customers' willingness to renew their licenses?

All the work in creating license renewals doens't make sense if nobody is willing to renew their license. If it turns out that even in the most perfect execution of license renewals, I can still only sell 30 license renewals per year, that would be a bad deal. It's way too much work to earn $2,400 in additional revenue per year.

How many would I need for it to be worth it?

## Side projects

## Wrap up

### What got done?

- Published ["Installing NixOS on Raspberry Pi 4"](https://mtlynch.io/nixos-pi4/)
- Learned to use [hurl](https://hurl.dev/) to replace curl-based integration tests for HTTP APIs.

### Lessons learned

-

### Goals for next month

-

### Requests for help

{{<notice type="info">}}

I'm trying a new idea this month where I announce ways readers can help me. If you're a fan of this blog and can connect me with people that are a match for what I'm looking for, [email me](/about/).

{{</notice>}}

TODO
