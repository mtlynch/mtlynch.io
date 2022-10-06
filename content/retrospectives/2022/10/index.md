---
title: "TinyPilot: Month 27"
date: 2022-10-03T10:46:10-04:00
description: What would a fully remote TinyPilot look like?
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer, and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $60-80k/month in revenue and employs six other people.

Every month, I publish a retrospective like this one to share how things are going with my business and in my professional life overall.
{{</notice>}}

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Migrate TinyPilot Pro to the next-generation update system

- **Result**: XX
- **Grade**: XX

TODO

### Send TinyPilot Voyager to two YouTube creators or bloggers for review

- **Result**: XX
- **Grade**: XX

TODO

### Explore new case manufacturing options

- **Result**: A
- **Grade**: XX

This is kind of a squishy goal.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | August 2022    | September 2022                          | Change                                           |
| ------------------------ | -------------- | --------------------------------------- | ------------------------------------------------ |
| Unique Visitors          | 11,903         | 9,040                                   | <font color="red">-2,863 (-24%)</font>           |
| Total Pageviews          | 23,214         | 17,608                                  | <font color="red">-5,606 (-24%)</font>           |
| Sales Revenue            | $76,082.06     | $68,640.50                              | <font color="red">-$7,441.56 (-10%)</font>       |
| Enterprise Subscriptions | $290.70        | $242.95                                 | <font color="red">-$47.75 (-16%)</font>          |
| Royalties                | $3,264.23      | $3,440.90                               | <font color="green">+$176.67 (+5%)</font>        |
| Total Revenue            | $79,636.99     | $72,324.35                              | <font color="red">-$7,312.64 (-9%)</font>        |
| **Profit**               | **$21,580.82** | **<font color="red">-$8,764.28</font>** | **<font color="red">-$30,345.10 (-inf%)</font>** |

Profit is down because I had a surprise expense of $XXk that in hardware that hadn't been invoiced for six months.

## What do metal cases mean for TinyPilot?

1. Storing inventory
1. Assembling devices
1. Flashing microSDs
1. Testing assembled devices (QA)
1. Packing and shipping customer orders
1. Processing returned orders

## Storing inventory and assembling devices

It means we have to do less management of inventory. My understanding is that I can delegate that to the manufacturer and they take responsibility for

They can lose parts, and I can't really do anything about it. I can hire third-party auditors.

Long delay between finding out about issues.

## Flashing microSDs

This one I'm not sure how to solve. The naive answer is to just let the company that supplies my microSDs flash the image. I'm not crazy about that because a microSD company is an attractive target for malware, so I don't want to be in the same boat. In theory, I could randomly spot check their output and make sure it matches the image I gave them, but even that doesn't give me complete confidence.

## Testing assembled devices

This would be something that the manufacturer could do.

Pretty hard because currently it's not hard, but it's hard to set up. You need a client computer, the TinyPilot device under test, and a target computer.

I think in theory we could build a device that automates this. It could feed input into TinyPilot's HDMI port and verify that the TinyPilot is getting video input. It could receive USB output from the TinyPilot and verify that it receives output. The problem is that hardware engineering time is currently our scarcest resource, and that seems like it would require a lot of hardware engineering.

## Packing and shipping customer orders

This is actually almost trivial. We probably have everything we need to do this today. The only obstacle is that I could imagine that 3PL vendors want individual boxes for each of our products, whereas we're currently just wrapping them in a bubble sleeve.

The other thing that I image

The benefit is that our already flexible hours become more flexible. Currently, somebody has to go into the office every day. If we have a 3PL vendor, the 20 hours can happen in whatever time works. We can assemble devices for 20 hours.

## Processing returns

I'm not sure how we solve this problem.

In theory we could just have a PO box so that staff can pick them up

## What happens when everything is outsourced?

No office
No worker's comp
No renter's insurance

Part-time employees become contractors: I know this one sounds like, "I can't wait to cut pay for my employees!" but my goal isn't to reduce compensation as much as reduce paperwork. Contractors require much less paperwork. We can adjust pay so that staff gets equivalent or better compensation relative to what they had as employees.

## Side projects

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

- Ramp up new support engineers
  - Aiming for the first one to be able to answer 80% of questions unassisted and the second 50%
