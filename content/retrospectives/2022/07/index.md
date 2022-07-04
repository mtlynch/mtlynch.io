---
title: "TinyPilot: Month 24"
date: 2022-07-01T14:09:52-04:00
description: "TODO"
---

## Highlights

- TinyPilot had a record-breaking month of revenue.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Create a self-contained tarball for installing TinyPilot

- **Result**: We now have a working install tarball
- **Grade**: A

TinyPilot's install process has been growing more complex over time. It pulls in code from multiple repositories and third-party dependencies, and it's difficult to trace those relationships and the versioning of each part.

We've overhauling the installer with a single tarball that declares all of its dependencies in a clear location. We have [a script that generates the tarball](https://github.com/tiny-pilot/tinypilot/blob/16434c17e4f5e65bc9f00d8ec61870a62e1bf59a/bundler/create-bundle) on each build, and we're in the process of switching the free version of TinyPilot to this system, and we'll migrate TinyPilot Pro soon after.

### Complete the first draft of a full-length blog post about the TinyPilot website redesign

- **Result**: Completed the first draft
- **Grade**: A

I thought it would be easy to write the blog post because I'd written so much about the process in my retrospectives, but it's still taking a long time. It's 5,200 words, which is about twice as long as my typical article, so I'm trying to trim it down.

### Increase ROAS on paid search ads to 2.0

- **Result**: Increased ROAS from 1.79 to 1.90
- **Grade**: B

The digital marketing freelancer working with TinyPilot increased revenue on ad spend to 1.90. It's below the goal, but the goal was also kind of a guess, as it's difficult to know what's achieveable. I estimate that I'm earning about $0.47 for every dollar I spend on ads.

Unfortunately, I can't just double ad spend and double sales, as the price increases as you try to capture a greater share of search impressions. Still, I'm happy with the performance so far, and I'm continuing to work with a digital marketer to explore new marketing channels.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | May 2022      | June 2022       | Change                                           |
| ------------------------ | ------------- | --------------- | ------------------------------------------------ |
| Unique Visitors          | 14,296        | 10,056          | <font color="red">-4,240 (-30%)</font>           |
| Total Pageviews          | 24,131        | 18,764          | <font color="red">-5,367 (-22%)</font>           |
| Sales Revenue            | $54,844.20    | $72,476.80      | <font color="green">+$17,632.60 (+32%)</font>    |
| Enterprise Subscriptions | $47.75        | $47.75          | 0                                                |
| Royalties                | $3,269.56     | $1,710.27       | <font color="red">-$1,559.29 (-48%)</font>       |
| Total Revenue            | $58,161.51    | $74,234.82      | <font color="green">+$16,073.31 (+28%)</font>    |
| **Profit**               | **$6,445.38** | **$7,716.34**\* | **<font color="green">+$1,270.96 (+20%)</font>** |

\* _Note: Profit is just a naive delta in my cash balance until I do real bookkeeping mid-month._

This was TinyPilot's all-time strongest month of revenue. And the exciting part is that there was otherwise nothing remarkable about June.

All of TinyPilot's previous record-breaking months were related to some one-time event like a new product launch or a positive review.

Site visitors are down relative to May because the previous month, my storage server article reached the front page of Hacker News and mentioned TinyPilot, but our overall visit count is still significantly higher than the first quarter of the year. I credit the increase to our new marketing campaign, which is

## How do TinyPilot Pro users prove their license?

I've always wanted TinyPilot's software to be sustainable on its own regardless of whether we continue selling new hardware. For that to happen, there needs to be a way for users to pay for the software.

I launched a paid version of TinyPilot called TinyPilot Pro back in December of 2020. I initially planned to launch with a

So now I'm left with the problem of how do users prove that they have an active TinyPilot Pro license?

### Background

The install date can't be burned into the software. If a user has version N, they should be able to upgrade to version N + 1 as long as .

We don't have to be backwards compatible back to version 1. We can set some version C that everyone is allowed to upgrade to without a license, but version C contains logic for sending license information to the update server, and the update server won't allow upgrades to version C + 1 without an active license.

The solution should work for about 98% or more users, and customer support can manually generate or transfer licenses for users in weird scenarios (e.g., transferring the license to a new device, buying a used TinyPilot device).

### Device ID

TinyPilot runs on the Raspberry Pi, and every Pi device has a hardware serial number that you can retrieve like this:

```bash
$ cat /proc/cpuinfo | grep Serial | cut -d ' ' -f 2
10000000ecf8821b
```

We could collect the device IDs from each Pi before we sell them to a customer. When the user attempts to upgrade, we check if their device ID is pre-registered.

- Pros
  - Easy for the user - can't lose it or forget their hardware ID
- Cons
  - We still need a solution for users who purchased before we started recording device IDs
  - Requires us to keep track of all the device IDs
  - Adds an extra step to the device building/testing process

### Order details

When a customer wants to download the official TinyPilot disk image, we grant access based on the user supplying the order number and email associated with their order.

{{<img src="download-image.png" alt="Screenshot of image download page on TinyPilot website" hasBorder="true" caption="The TinyPilot website currently grants TinyPilot image downloads based on the user proving they know details of their order.">}}

We could use the same logic within the TinyPilot web app to gate upgrades.

- Pros
  - Minimizes bookkeeping because we don’t have to keep track of keys or device IDs, as we’re already storing order information
  - Works for users who purchased any time in the last year because we have the order information
- Cons
  - Platforms like eBay and Amazon don’t provide the user's real email address, but those order numbers are random enough that we could just use the order number as the credential.
  - If the customer bought through a reseller or IT procurement company, the end-user might not know their order number / email
  - Every time we start selling through a new channel, we’d have to write custom code to query order numbers from that channel

### Activation key

We could generate a set of activation keys, similar to what you have for activating Microsoft Windows or Office (e.g. foo-bar-baz). The keys could be printed out and included with the device, and the user types it in to prove they have a license.

- Pros
  - Works the same regardless of whether the user buys directly from us or through Amazon, eBay, etc.
- Cons
  - Easy for users to lose or throw away the license key
  - We still need a solution for users who purchased before we started handing out activation keys
  - Lets punkt.de and tinypilotkvm.com stay loosely coupled. We wouldn’t need to query your order records or device IDs because we could just hand you a list of valid activation keys to give to your customers.

### Some combination

The route I'm leaning towards is a combination, like device ID or order details. That way, the users who purchased before we started collecting device IDs will still have a really low-friction way of upgrading, and then users who bought pre-registered devices won't even have to be aware of the check at all.

## Abandon all hope, ye who enters the Amazon Sellers Marketplace

TODO

## Side projects

### WanderJest

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-
