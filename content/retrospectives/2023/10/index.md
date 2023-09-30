---
title: "TinyPilot: Month 39"
date: 2023-09-30T14:51:42-04:00
description: Working around manufacturing delays
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

## Issues with our first article sample

## How do I handle the manufacturing schedule slip?

The last time we stopped sales was for four days in Jan. 2022. Before that, it was one day in Jan. 2021.

### Choices

- Do we skip the sample?
- How big a production batch do we request?
- Do we make more devices in-house?

### Assumptions

- TinyPilot sells 200 devices per month or about 50 devices per week.
- Every day that TinyPilot is out of stock costs about $3k in revenue and $650 in profit.
  - A week being sold out is a sacrifice of about $4.5k in profit.

### Do we skip the sample?

In the first sample, two of the devices had quality issues on the case that would prevent us from shipping them to customers. One of them was all fine, and one of them required us to make repairs but was fine after the repairs.

The manufacturer was confident in the cause of the case issues, and the fix was simple: use gloves to avoid leaving fingerprints, and don't wipe them with alcohol. If that gets rid of the issue, then all four of the devices would have been shippable.

It feels

- Best case: Sample wouldn't have revealed any issues, so we're ready with a production batch 7-10 days sooner.
- Worst case: 50+ devices need to be shipped back to Vietnam.

**Decision**: Skip the sample. It seems highly likely that any outstanding issues will be things that we can repair on our end if needed, and a 7-10 day delay is quite expensive.

### Do we make more devices in-house?

A few things we need to build devices are things that we can't buy quickly.

The hardest one is Raspberry Pi devices. We're down to zero because we've built every Raspberry Pi we have into a device and shipped it to the warehouse for fulfillment.

We have an upcoming delivery schedules, so we could re-route a shipment from Raspberry Pi to our US address. That's not very appealing because it was a lot of work to get the Raspberry Pi Foundation set up to ship to Vietnam and have all the customs forms in place, so asking them to change an order has the potential to create other issues. It also means we have to order in multiples of 150 Pis, as that's the box that Raspberry Pi ships.

We own the Raspberry Pi devices waiting to be built into Voyager 2a devices at the factory in Vietnam. We could ask our manufacturer to send us some of those. That allows us to request an arbitrary number, but there are likely also customs headaches in getting a UK-built product from Vietnam to the US.

And even if we got our Pis, we're still missing other components. We'd have to get some of our custom PCBs manufactured from our old PCB vendor in China. That should be okay, as they can usually turn around delivery in about a month. And the PCBs we need are about $2/unit, so that's not so expensive.

Cases are the next hardest item. Our old case vendor always claimed that their turnaround time was six weeks, but their _actual_ turnaround time was generally about three months. So, it's possible that even if we asked for new cases, they wouldn't be ready in time anyway. We still have 80 cases sitting at the factory in China that are ready to ship, but I'd asked them to hold off, as it didn't make sense for us to have more cases than we had Raspberry Pis.

- Best case: There are more manufacturing delays, so making our own devices allows us to sell for two more weeks than we otherwise could have.
- Worst case: We waste a lot of time and money building devices that the new factory could have made for us.

**Decision**:

### Should I slow down sales?

- Best case: There are more manufacturing delays, so reducing sales gives
- Worst case: There's no manufacturing delay, and I forfeit $3-5k in profit for no reason.

In addition to stretching out our buffer by making more devices in-house, I have a couple of levers.

First, I could increase prices. We sell fewer TinyPilot devices when prices are higher, but customers still buy when our prices are $100 higher than they currently are.

Second, I can reduce marketing spend. There's no use paying for ads if I'm going to receive more orders than I can fill without ads.

### How big a first batch do we order?

Before we make the full 400-ish unit batch, I want to get a smaller batch that we can inspect by hand.

Next is cases. We have about 80 lying around in our

### Option 1: Small sample + small production batch

### Option 2: Skip the sample, straight to small production batch

## Topic 2

## Topic 3

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
