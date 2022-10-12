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

| Metric                   | August 2022    | September 2022                            | Change                                           |
| ------------------------ | -------------- | ----------------------------------------- | ------------------------------------------------ |
| Unique Visitors          | 11,903         | 9,040                                     | <font color="red">-2,863 (-24%)</font>           |
| Total Pageviews          | 23,214         | 17,608                                    | <font color="red">-5,606 (-24%)</font>           |
| Sales Revenue            | $76,082.06     | $68,640.50                                | <font color="red">-$7,441.56 (-10%)</font>       |
| Enterprise Subscriptions | $290.70        | $242.95                                   | <font color="red">-$47.75 (-16%)</font>          |
| Royalties                | $3,264.23      | $3,440.90                                 | <font color="green">+$176.67 (+5%)</font>        |
| Total Revenue            | $79,636.99     | $72,324.35                                | <font color="red">-$7,312.64 (-9%)</font>        |
| **Profit**               | **$21,580.82** | **<font color="red">-$8,764.28</font>**\* | **<font color="red">-$30,345.10 (-inf%)</font>** |

\* This profit figure is just a naive calculation of my change in cash holdings until I do real bookkeeping mid-month.

Profit is down because I had a surprise expense of $11k in raw materials that hadn't been invoiced for six months. Still, I'm a bit surprised that I finished so far in the red. I'm

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

Each TinyPilot requires a microSD that we flash with the OS and TinyPilot software. I currently have high confidence that nobody has tampered with the microSDs because they never leave our possession after we flash them. The only person who can tamper with the microSDs between us and the customer is the courier, and if the USPS wanted to be evil, they probably have more interesting targets than us.

I'm not sure how to outsource the process of flashing microSDs. We use custom branded microSDs, and the company who makes them is perfectly happy to flash a software image onto them. I'm reluctant to do that, as I feel like there's too high a risk that a microSD flashing company is the victim of malware that compromises microSDs that they flash. In theory, I could randomly spot check their output and make sure it matches the image I gave them, but even that doesn't give me complete confidence.

We could potentially keep flashing microSDs ourselves and send them to the manufacturer. That assumes the manufacturer is honest, but it's probably the same risk every company is taking by having computer products manufactured overseas.

## Testing assembled devices

After we build devices, we currently test them by hand to make sure that all the functionality works. Our test setup is pretty slow and complicated. It requires the tester to plug the newly built TinyPilot into a target computer, then control the TinyPilot from the web browser of a second computer. The tester then has to wait for the TinyPilot to boot up, then verify that it successfully

It's been on our list to automate this process, but we're waiting on hardware engineering resources, and that's currently our scarcest resource. Although, writing this out, I'm realizing we could solve this with commodity hardware. We should be able to make a TinyPilot testing machine with a Raspberry Pi. A Raspberry Pi has an HDMI output and USB inputs, so the test runner can make sure the TinyPilot is capturing video and capable of emulating keyboard input, and that will give us confidence that everything is connected and working correctly.

This is a good example of a task where thinking about how to outsource it creates benefits even if we end up not outsourcing it.

## Packing and shipping customer orders

Of all the parts of our workflow, order fulfillment is the one that would be easiest to outsource at this point. We always have a queue of ready-to-ship boxes, so we could hand those to a 3PL vendor instead of keeping them at our office.

The benefit is that our already flexible hours become more flexible. Currently, we staff the TinyPilot office six days per week. If we have a 3PL vendor, nobody needs to be at the office in any particular time window as long as we're assembling enough devices to keep orders flowing.

We'd free up physical space in our office, as boxes and packing material eat up a lot of real estate in our small office.

Another benefit is that customers will have more choice in shipping options. We currently only offer USPS and DHL because there's added complexity in coordinating with each courier. A 3PL provider will already have daily pickups from all the major providers, so it's easy for them to support any major courier.

Shipping speed might increase slightly, although this is less significant as TinyPilot already ships like 90% of orders within one business day.

The downside is that a 3PL will inevitably increase complexity. Right now, our customer service experience is excellent because when a customer emails us, they're speaking directly to a TinyPilot employee who probably assembled, packed, and shipped their particular device. The same employee has the power to check shipping status, cancel orders, and arrange returns.

If there's a problem with an order that a 3PL vendor fulfilled, a TinyPilot customer support rep will have to check with our point of contact at the 3PL vendor. They'll probably have to talk to someone else, who probably has to talk to someone else, etc.

## Processing returns

I don't know how we'd process returns without an office.

I wouldn't trust a 3PL vendor to refurbish a TinyPilot device, but I wouldn't want them just destroying returns either. Perhaps we could have a separate return address that's just a PO box, and employees could go there to pick up returns, refurbish them, and then give them to the 3PL vendor to sell as a refurbished item.

I haven't talked to 3PL vendors yet, so it's possible they have some better solution for this.

## What happens when everything is outsourced?

### We become location-indepdent

Right now, we're tied to our physical office. If we got rid of the office, every TinyPilot employee can theoretically do their jobs from anywhere.

### We reduce red tape

Part-time employees become contractors: I know this one sounds like, "I can't wait to cut pay for my employees!" but my goal isn't to reduce compensation as much as reduce paperwork. Having employees requires a lot of paperwork. There are services that help with compliance and paying the right taxes, but I've never found one that does an especially good job. There are all these little issues, and when I call my "HR as a service" provider, they just tell me that I have to call the government and figure it out myself.

Contractors require much less paperwork. We can adjust pay so that staff gets equivalent or better compensation relative to what they had as employees.

### We reduce costs

Outsourcing will also reduce costs, though this is the least interesting benefit for me.

We no longer have to pay rent ($550/month), Gusto payroll service ($80/month), worker's comp ($30/month), or renter's insurance ($10/month).

The cost of assembling and testing each device theoretically goes down by a few dollars per unit.

### We reduce flexibility and agility

Outsourcing everything optimizes our "happy path" but it makes it harder to manage exceptions or fix mistakes.

In the past, we've identified small problems with our process that result in customer confusion or visual blemishes with the product. Because we control most of our own manufacturing and fulfillment pipeline, we've caught and fixed those issues quickly.

With everything outsourced, the feedback loop is slower. We might not identify issues until several customers report it, and by that point, it's expensive to unwind the process and apply the same fix to devices that are still at the manufacturer or 3PL vendor.

We also forfeit our ability to satisfy special requests. This is less of a sacrifice, as we don't really do special requests often now. The most common is that a customer will ask for a customization with their case (e.g., their own logo or a custom modification). We tell them that we can do it, but it will cost 20% more than our retail price, and then they back out of the deal.

## Side projects

## Wrap up

### What got done?

- Hired a second TinyPilot Support Engineer.

### Lessons learned

-

### Goals for next month

- Ramp up new support engineers.
  - I'm aiming for the first one to be able to answer 80% of questions unassisted and the second 50%.
- Finalize design for a new sheet metal case.
- Reach out to three 3PL vendors to talk about the process of transitioning our fulfillment to them.
