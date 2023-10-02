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

## Correcting issues in the first article sample

Unfortunately, the first article sample didn't go so well. Paint was chipping on two out of the four samples, and the rubber feet had fallen off three out of the four samples. One of the devices couldn't stream audio because all four audio cables were disconnected. When I held the device sideways, the fan started scraping the case.

The sample worried me.

First, it was worrying that on a sample of four where they're supposed to focus a lot of attention on getting everything right, so many things went wrong.

Second, it suggested not only a problem with the assembly process but with the QA process as well, which is supposed to be separate. What was going on with the QA process that things like chipped paint and non-functional audio passed inspection?

The manager overseeing the work wiped the cases with alcohol swabs to remove the fingerprints.

The sent us videos of how they do the QA process, and it matched ours.

- No opening the device after functional testing.
- No wiping the device with alcohol swabs.
- Manufacturing team will handle the device with gloves to avoid leaving fingerprints.

The day after I saw the sample, I called our building manager and asked to extend our lease. We were on track to be out of the office by the end of October, but seeing the issues with these samples, I wanted the security of continuing to have an office where we can inspect inventory and make repairs if necessary.

## How do I handle the manufacturing schedule slip?

The last time we stopped sales was for four days in Jan. 2022. Before that, it was one day in Jan. 2021.

### Assumptions

- TinyPilot sells 200 devices per month or about 50 devices per week.
- Every day that TinyPilot is out of stock costs about $3k in revenue and $650 in profit.
  - Being sold out for a week is a sacrifice of about $4.5k in profit.

### What does the current schedule look like?

As of October 2nd, we have 243 devices on-hand, so we're due to run out of inventory by about November 8th. We also have 25 refurbished devices, so that maybe buys us a few extra days, so let's call November 10th the day we sell out completely.

Here's a schedule of how our supply looks based on our manufacturer's current estimates:

| Date    | Activity                                                                     | Duration |
| ------- | ---------------------------------------------------------------------------- | -------- |
| Oct. 14 | Ship second sample from Vietnam to Massachusetts                             | 7 days   |
| Oct. 21 | Inspect second sample                                                        | 1 day    |
| Oct. 22 | Manufacture small production batch                                           | 4 days   |
| Oct. 26 | Ship small production batch from Vietnam to Massachusetts (TinyPilot office) | 7 days   |
| Nov. 2  | Inspect small production batch                                               | 2 days   |
| Nov. 4  | Manufacture large production batch                                           | 4 days   |
| Nov. 8  | Ship large production batch from Vietnam to North Carolina (warehouse)       | 7 days   |
| Nov. 15 | Large production batch is ready for fulfillment                              | 1 day    |

Based on these estimates, we'd avoid running out of inventory but just barely.

We'd run out of the inventory we manufactured in-house, but if the small production batch is good quality, we can ship that to our warehouse to keep our inventory above zero until November 17th. By that point, the large production batch should arrive to the warehouse, putting us back on solid footing.

### Do we skip the second sample?

In the first sample, two of the devices had quality issues on the case that would prevent us from shipping them to customers. One of them was all fine, and one of them required us to make repairs but was fine after the repairs.

The manufacturer was confident in the cause of the case issues, and the fix was simple: use gloves to avoid leaving fingerprints, and don't wipe them with alcohol. If that gets rid of the issue, then all four of the devices would have been shippable.

If we cut out the second sample, the schedule looks like this:

| Date    | Activity                                                                     | Duration |
| ------- | ---------------------------------------------------------------------------- | -------- |
| Oct. 14 | Ship small production batch from Vietnam to Massachusetts (TinyPilot office) | 7 days   |
| Oct. 21 | Inspect production batch                                                     | 1 day    |
| Oct. 22 | Manufacture large production batch                                           | 4 days   |
| Oct. 26 | Ship large production batch from Vietnam to North Carolina (warehouse)       | 7 days   |
| Nov. 2  | Large production batch is ready for fulfillment                              | 1 day    |

- Optimistic case (85% likely): Sample wouldn't have revealed any issues, so we're ready with a production batch two weeks sooner.
- Pessimistic case (15% likely): 50+ devices need to be shipped back to Vietnam.

**Decision**: Skip the sample. Request photos and videos showing that the previous issues are fixed. It seems highly likely that any outstanding issues will be things that we can repair on our end if needed, and a two-week day delay is quite expensive.

### Do we make more devices in-house?

A few things we need to build devices are things that we can't buy quickly.

The hardest one is Raspberry Pi devices. We're down to zero because we've built every Raspberry Pi we have into a device and shipped it to the warehouse for fulfillment.

We have an upcoming delivery schedules, so we could re-route a shipment from Raspberry Pi to our US address. That's not very appealing because it was a lot of work to get the Raspberry Pi Foundation set up to ship to Vietnam and have all the customs forms in place, so asking them to change an order has the potential to create other issues. It also means we have to order in multiples of 150 Pis, as that's the box that Raspberry Pi ships.

We own the Raspberry Pi devices waiting to be built into Voyager 2a devices at the factory in Vietnam. We could ask our manufacturer to send us some of those. That allows us to request an arbitrary number, but there are likely also customs headaches in getting a UK-built product from Vietnam to the US.

And even if we got our Pis, we're still missing other components. We'd have to get some of our custom PCBs manufactured from our old PCB vendor in China. That should be okay, as they can usually turn around delivery in about a month. And the PCBs we need are about $2/unit, so that's not so expensive.

Cases are the next hardest item. Our old case vendor always claimed that their turnaround time was six weeks, but their _actual_ turnaround time was generally about three months. So, it's possible that even if we asked for new cases, they wouldn't be ready in time anyway. We still have 80 cases sitting at the factory in China that are ready to ship, but I'd asked them to hold off, as it didn't make sense for us to have more cases than we had Raspberry Pis.

- Best case: There are more manufacturing delays, so making our own devices allows us to sell for 10 more days than we otherwise could have.
- Worst case: We waste a lot of time and money building devices that the new factory could have made for us.

**Decision**: Don't build more devices in-house. It's a lot of time and money for something that, at best, gets us only 10 more days of having inventory.

### Should I slow down sales?

- Best case: There are more manufacturing delays, so reducing sales gives
- Worst case: There's no manufacturing delay, and I forfeit $3-5k in profit for no reason.

In addition to stretching out our buffer by making more devices in-house, I have a couple of levers.

First, I could increase prices. We sell fewer TinyPilot devices when prices are higher, but customers still buy when our prices are $100 higher than they currently are.

Second, I can reduce marketing spend. There's no use paying for ads if I'm going to receive more orders than I can fill without ads.

**Decision**: Don't slow down yet, but revisit the decision if there are more delays or there are issues with the next inspection.

### How big a first batch do we order?

Before we make the full 400-ish unit batch, I want to get a smaller batch that we can inspect by hand.

We want enough that it creates enough buffer for a subsequent batch to arrive. Let's say it will take 10 days for a second batch to ship from Vietnam to our warehouse in North Carolina and be ready for fulfillment. 10 days means we need about 66 devices. The devices ship in boxes of 18, so let's say we need 72 devices.

**Decision**: Order 72 devices for the small sample batch.

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
