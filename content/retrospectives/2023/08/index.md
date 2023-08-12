---
title: "TinyPilot: Month 37"
date: 2023-08-15T00:00:00-04:00
description: How can TinyPilot increase recurring revenue?
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

### Start a manufacturing batch with a new contract manufacturer

- **Result**: XX
- **Grade**: XX

TODO

### Publish TinyPilot Pro 2.6.0

- **Result**: XX
- **Grade**: XX

TODO

### Reach $95k in revenue

- **Result**: Revenue dropped 10% to $84k
- **Grade**: C

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | June 2023      | July 2023        | Change                                         |
| ------------------------ | -------------- | ---------------- | ---------------------------------------------- |
| Unique Visitors          | 8,300          | 7,800            | <font color="red">-500 (-6%)</font>            |
| Sales Revenue            | $88,378.45     | $79,635.02       | <font color="red">-$8,743.43 (-10%)</font>     |
| Enterprise Subscriptions | $290.70        | $290.70          | 0                                              |
| Royalties                | $4,399.66      | $3,777.52        | <font color="red">-$622.14 (-14%)</font>       |
| Total Revenue            | $93,068.81     | $83,703.24       | <font color="red">-$9,365.57 (-10%)</font>     |
| **Profit**               | **$30,907.55** | **$25,357.82**\* | **<font color="red">-$5,549.73 (-18%)</font>** |

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

## How can TinyPilot increase recurring revenue?

When TinyPilot's sales slump, I start to think more about recurring revenue. In the bootstrapper community, most successful businesses have recurring revenue. TinyPilot is an oddity in that

I keep waiting for the day that everyone who wants a TinyPilot has one, and then what am I going to do?

## How TinyPilot Pro licenses work today

I first began work work on a premium version of TinyPilot's software a few weeks after I released the original DIY TinyPilot kits in 2020. I was a few days into working on a system for checking license keys when I remembered the famous DHH post about billing. (TODO: link) I was working on a licensing scheme for TinyPilot, and I realized that if TinyPilot licenses lasted for a year, I didn't really need to figure it out for a year.

But now it's three years later, and I still haven't figured out license enforcement for TinyPilot Pro.

We advertise to customers that TinyPilot devices come with 12 months of free updates, but our dirty secret is that once you have a TinyPilot Pro installation, you can keep updating forever. The device doesn't have any way of tracking whether it's associated with a valid license. There are users who purchased in August 2020 that got free upgrades for two years after their licenses expired.

The vast majority of users probably don't even realize that their license expired at all. They assume, understandably so, that if TinyPilot continues delivering updates to their device, their license is still valid.

The main way that customers currently discover an expired license is when they try to factory reset their device, usually after their TinyPilot's disk goes bad from filesystem corruption. To download a TinyPilot Pro image they can flash to their microSD disk, the customer needs to enter their order details. If they ordered more than a year prior, we tell them that their license expired.

From the customer's perspective, this is a terrible way to find out that their license expired. Their filesystem got corrupted, so now their work is interrupted as they have to physically remove the TinyPilot's microSD and reflash it, and now we're shaking them down for more money?

The "license is expired" notice tells the customer that they can contact support, and we'll give them a copy of the latest version of TinyPilot Pro they qualify for under their license. But that's not great for the customer because they have to wait up to one business day for a response from us, and it's not great for us because now that the customer is back on the "free updates forever" train because they have a valid TinyPilot Pro image.

## What's the ideal version of TinyPilot Pro's licenses?

When I think about TinyPilot Pro licenses, I often get stuck thinking about all the challenges of changing parts of the system. As an exercise, I'm going to just pretend we have no constraints on implementation time or integrating different systems together.

If I had a magic wand, what would the ideal customer experience be for managing paid TinyPilot Pro licenses so that customers are happy and TinyPilot makes enough money to sustain continued support and development.

### Purchase experience

When the customer checks out, there's a little checkbox that says, "Auto-renew my TinyPilot Pro license annually." It's off by default, but if the user checks it, they get $50 off their purchase.

At any time, the customer can manage their license from a web dashboard. They can cancel their subscription, purchase an auto-renewing subscription, or purchase a one-time 12-month license.

### Updates

When the user receives their device, they can use it normally without being prompted for a license key. They only get prompted to enter a license key after a year of usage.

### Renewing

When the user's license expires, they can continue using TinyPilot Pro software. If they

We send them a friendly email saying that their license is expiring. Depending on how they're set up, we either tell them that they're enrolled in auto-renew or that their access to updates will stop in two weeks.

If they choose not to renew, they can continue using all of TinyPilot Pro's features, but they won't be able to download updates, and they won't be eligible for private customer support.

## Challenges of the ideal flow

### Notifications

Don't have the user's email address. Either bought through a distributor like Amazon, sometimes through a procurement company, sometimes a buyer at a large organization who's not the same as the end-user.

### Associating devices with purchases

One obvious flaw is that it's hard to associate a device with a purchase without prompting the user to manually input their order information. Each device has unique hardware identifiers, but it would be extremely difficult to

A simpler approximation is that we could keep track of hardware identifiers on our update server. If we get a request from a hardware identifier we've never seen before, we assume it's a new purchase and auto-provision a one-year key. The downside is that it's trivial to crack. A user can patch the file that requests updates.

Or we could just have the user enter their license key on their first update. It's kind of annoying, but it's what basically all other software like this does.

### Time measurement

One challenge of the 12 months of updates is that when does the 12 months begin? Currently, we're measuring from the time of the order, but that's not really fair. If it takes six weeks to ship a device internationally, the user just lost 11% of their license lifetime.

The naive approach to measuring a year of use is to record a timestamp of TinyPilot's first boot. And then we know exactly when the customer's license should expire.

But TinyPilot doesn't have a real-time clock. It doesn't know the time until it contacts an NTP server.

We make a request to our own server on first boot, but I don't want to add in a phone-home that exists only to work against the user.

But really, this is kind of overengineering. If users care that the clock started ticking as soon as they placed the order, maybe we silently make the license last an extra six weeks for everyone to cover the 99th percentile of shipping time.

### Integrating recurring subscriptions into license checking

### Integrating recurring subscriptions into support workflows

My first instinct is to use a tool for software subscriptions like Stripe or Paddle. But then that's a whole new system to integrate. Our license checking system would have to also integrate with Stripe/Paddle APIs to see if users have active licenses. Our support staff would need to

There's also Shopify subscriptions. Those have the benefit of being integrated with our existing systems. Our support staff already knows how to use Shopify. Our license checking system is already integrated into Shopify.

The downside of Shopify subscriptions is that I've had a terrible time with Shopify add-on apps. They're typically low quality. The way that Shopify is designed means that Shopify apps all have excessive permissions, so to plug an app into my Shopify store and allow it to manage recurring subscriptions, I have to give that app access to _all_ orders in my system. So there's a risk that a nefarious or insecure app leaks customer data.

## What would make recurring subscriptions worth the effort?

For license renewals to be worthwhile, they'd need to generate at least $30k/yr in additional profit. At $80/yr per renewal, that means that 375 customers per year renew. Actually, I did say profit, so let's assume I lose 3% in fees, so let's say I need at least 387 subscribers.

Since we launched in 2020, TinyPilot has sold around 5,000 devices total. We sell around 2,700 new devices per year. Reaching 387 subscribers means convincing just 7.5% of our existing users to pay for continued updates, which seems doable.

## How can I test customers' willingness to renew their licenses?

How do we do low-cost tests?

### Forced factory resets

TODO

### Manual expiration notices

TODO: Show emails I've sent.

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

If you have experience with any
