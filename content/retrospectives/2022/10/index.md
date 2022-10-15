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

The numbers are all scary red, but I think it's was actually a strong month. I'm thrilled to see another month where we exceed $70k in revenue.

Profit is down because I had a surprise expense of $11k in raw materials that hadn't been invoiced for six months. Still, I'm a bit surprised that I finished so far in the red. I suspect that it's mainly just a function of how invoices were timed, and it will average out positively over the next few months.

## What do metal cases mean for TinyPilot?

One of our remaining bottlenecks for production is our cases. We 3D print our cases, and we use a premium material that's slow to print, so we're limited to manufacturing about 160 cases per month.

We've been selling 200+ devices per month, so the cases will soon become the limiting factor. We can keep shipping at our current rates for a few more months because we stockpiled cases when we were selling below our manufacturing capacity. Adding another 3D printing vendor isn't feasible, because we're receiving a government subsidy on 3D printing that's available exclusively through our current vendor.

Our hardware partner suggested metal cases, similar to what you'd find on consumer networking hardware:

{{<img src="tp-link-switch.png" maxWidth="500px" alt="Photo of metal TP-Link TL-SG1005P 5-port switch" caption="What if we switched TinyPilot to use a metal case like this?">}}

A metal case would reduce costs and eliminate the 160/month production constraint, as we could manufacture thousands of metal cases each month.

Our hardware partner also offhandedly mentioned something that set off a sequence of thoughts that's been on my mind for months: if we manufactured the cases in China, we could also assemble the devices in China.

At first, assembling in China didn't appeal to me. We have an assembly process in Massachusetts that works, so why mess with it?

Assuming that each device costs $10 to assemble in the US, maybe a Chinese vendor can do it for $1-2. A $9/unit savings doesn't justify all the risks associated with changing a process that works smoothly.

But then thinking about manufacturing in China got me wondering about how that would change TinyPilot's office. Our shelves wouldn't be stocked with hundreds of cases, USB cables, and tiny rubber feet because those would all live at the manufacturer. And if our raw materials lived at the manufacturer, the manufacturer could also managing our inventory and reordering supplies to keep up with production.

Then, I began to ask myself whether we need a TinyPilot office at all.

## What happens in the TinyPilot office?

Today, we use the TinyPilot office for six main functions:

1. Storing inventory
1. Assembling devices
1. Flashing microSDs
1. Testing assembled devices (quality assurance)
1. Packing and shipping customer orders
1. Processing returned orders

Can TinyPilot still perform these functions without its own office? Let's find out!

## Storing inventory and assembling devices

It means we have to do less management of inventory. My understanding is that I can delegate that to the manufacturer and they take responsibility for

They can lose parts, and I can't really do anything about it. I can hire third-party auditors.

Long delay between finding out about issues.

## Flashing microSDs

Each TinyPilot requires a microSD that we flash with TinyPilot software. I currently have high confidence that nobody has tampered with the microSDs because they never leave our possession after we flash them. The only person who can tamper with the microSDs between us and the customer is the courier, and if the USPS wanted to be evil, they probably have more interesting targets than us.

I'm not sure how to outsource the process of flashing microSDs. We use custom, branded microSDs, and the company who makes them is perfectly happy to flash a software image onto them. I'm reluctant to do that, as I feel like there's too high a risk of malware. In theory, I could randomly spot check their output and make sure it matches the image I gave them, but even that wouldn't give me complete confidence.

{{<img src="tinypilot-microsds.jpg" maxWidth="400px" alt="Photo of TinyPilot branded microSDs" caption="We currently use a vendor that can flash images onto microSDs for us, but I have reservations.">}}

We could potentially keep flashing microSDs ourselves and send them to the manufacturer. That assumes the manufacturer is honest, but it's probably the same risk every company is taking by having computer products manufactured overseas.

## Testing assembled devices

After we build devices, we currently test them by hand to make sure that all the functionality works. Our test setup is pretty slow and complicated. It requires the tester to plug the newly built TinyPilot into a target computer, then control the TinyPilot from the web browser of a second computer. The tester then has to wait for the TinyPilot to boot up, then verify that it's capturing the target computer's display and accurately forwarding keyboard and mouse input.

{{<img src="current-test-setup.png" maxWidth="600px" alt="Hand-drawn sketch of our current test setup" caption="TinyPilot's current QA process requires two laptops and nontrivial cable connections." hasBorder="true">}}

It's been on our list to automate this process, but automating it requires hardware engineering resources, and that's currently our scarcest resource.

Writing this out, I'm realizing we could solve this with commodity hardware. We should be able to make a TinyPilot testing machine with a Raspberry Pi.

A Raspberry Pi has HDMI output and USB input. Test runner can make sure the TinyPilot is capturing video from the test Raspberry Pi and verify that when it tells the TinyPilot to send a keystroke, the Pi receives the same keystroke through its USB input from the TinyPilot. This test would give us confidence that everything is connected and working correctly in the newly-built Voyager 2.

{{<img src="proposed-test-setup.png" maxWidth="600px" alt="Hand-drawn sketch of a potential simplified test setup" caption="We could likely automate our Voyager 2 QA process by connecting it to a Raspberry Pi with some custom scripts." hasBorder="true">}}

This is a good example of a task where thinking about how to outsource it creates benefits even if we end up not outsourcing it.

## Packing and shipping customer orders

Of all the parts of our workflow, order fulfillment is the one that would be easiest to outsource at this point. We always have a queue of ready-to-ship boxes, so we could hand those to a 3PL vendor instead of keeping them at our office.

{{<img src="ready-to-ship.jpg" caption="We keep pre-assembled Voyager 2 devices in ready-to-ship boxes at our office." alt="Photo of Voyager 2 in cardboard shipping box" maxWidth="500px">}}

The benefit is that our already flexible hours become more flexible. Currently, we staff the TinyPilot office six days per week. If we have a 3PL vendor, nobody needs to be at the office in any particular time window as long as we're assembling enough devices to keep orders flowing.

We'd free up physical space in our office, as boxes and packing material eat up a lot of real estate in our small office.

Another benefit is that customers will have more choice in shipping options. We currently only offer USPS and DHL because there's added complexity in coordinating with each courier. A 3PL provider will already have daily pickups from all the major providers, so it's easy for them to support any major courier.

Shipping speed might increase slightly, although this is less significant as TinyPilot already ships 90% of orders within one business day.

The downside is that a 3PL vendor increases complexity. Right now, our customer service experience is excellent because when a customer emails us, they're speaking directly to a knoweldgeable TinyPilot employee. Chances are, the same employee assembled, packed, or shipped their particular device. They also have the power to check shipping status, cancel orders, and arrange returns.

If there's a problem with an order that a 3PL vendor fulfilled, a TinyPilot customer support rep will sometimes have to check with our point of contact at the 3PL vendor, who might have to check with someone else, etc.

## Processing returns

I don't know how we'd process returns without an office.

I wouldn't trust a 3PL vendor to refurbish a TinyPilot device, but I wouldn't want them just destroying returns either.

Perhaps we could have a separate return address that's just a PO box. Employees could pick up returns from the post office, refurbish them, and then ship them to the 3PL vendor to sell as a refurbished item.

I haven't talked to 3PL vendors yet, so it's possible they have some better solution for this.

## What happens when everything is outsourced?

Assuming that we can successfully extract all of the office functions to third-party vendors or location-independent alternatives, what does that mean for me and the company?

### We become location-indepdent

Right now, we're tied to our physical office. If we got rid of the office, every TinyPilot employee can theoretically do their jobs from anywhere.

### We become less time-dependent

Without fulfillment or manufacturing, the only time-sensitive responsibility we have is customer support.

### We become more robust to employee absence

A few times in the last few months, a member of TinyPilot's local staff has been out of work for several days at a time. Some were planned vacations; others were due to illness. TinyPilot has enough redundancy that we were able to keep going without affecting customers, but it did [strain other parts of our systems](/retrospectives/2022/09/#build-redundancy-into-customer-support).

If we outsourced manufacturing and fulfillment, it will become far easier for TinyPilot to handle employee absence. We wouldn't have to scramble to keep orders shipping, as we're out of that critical path.

### Our local staff's jobs would change

One challenge of outsourcing is the impact it has on our existing local staff's jobs. If we were to get rid of the TinyPilot office and outsource manufacturing and fulfillment, that eliminates about 75% of work our local team currently does.

The local team does great work, and I want to make sure they still have roles within the company if we get rid of our office.

They'll continue to have customer service work

Proactive outreach to customers.

Outreach to reviewers

### We reduce red tape

Part-time employees become contractors: I know this one sounds like, "I can't wait to cut pay for my employees!" but my goal isn't to reduce compensation as much as reduce stress and paperwork.

On an almost monthly basis, some Massachusetts government office sends me an inscrutable letter telling me something about withholdings or compliance requirements, but it's never clear what action is required on my part, if any.

There are services that help with compliance and paying the right taxes, but I've never found one that does an especially good job. When I forward the notices to Gusto, my "HR as a service" provider, they just tell me that I have to call the government and figure it out myself. And then when I call the state agency, I get routed around a phone tree to people who don't know anything about the notice I received, so I'm left to just ignore it and hope that's the right thing to do.

Contractors require much less paperwork. We can adjust pay so that staff gets equivalent or better compensation relative to what they had as employees.

### We reduce costs

Outsourcing will also reduce costs, though this is the least interesting benefit for me.

We no longer have to pay rent ($550/month), Gusto payroll service ($80/month), inventory tracking ($59/month), worker's comp ($30/month), or renter's insurance ($10/month).

The labor costs theoretically go down by a few dollars per unit because Chinese manufacturers can build devices at a fraction of our labor costs, and 3PL vendors have economies of scale that allow them to fulfill orders at lower costs.

### We reduce flexibility and agility

Outsourcing everything optimizes our "happy path" but it makes it harder to manage exceptions or fix mistakes.

In the past, we've identified small problems with our process that result in customer confusion or visual blemishes with the product. Because we control most of our own manufacturing and fulfillment pipeline, we've caught and fixed those issues quickly.

With everything outsourced, the feedback loop is slower. We might not identify issues until several customers report it. By that point, we might have hundreds of devices that have passed the problem point in our pipeline and are on the way to customers or warehouses.

We also forfeit our ability to satisfy special requests. This is less of a sacrifice, as we don't really do special requests often now. The most common is that a customer will ask for a customization with their case (e.g., their own logo or a custom modification). We tell them that we can do it, but it will cost 20% more than our retail price, and then they back out of the deal.

### We increase our error rate

We would almost certainly increase our error rate.

## Side projects

### Hello, Playwright - goodbye, Cypress

I've been [a fan of the Cypress end-to-end testing tool](https://mtlynch.io/painless-web-app-testing/) ever since I saw Gleb Bahmutov demo it at [a 2018 web dev meetup](https://youtu.be/wApmbgPGmqQ). I've been hearing more chatter over the years about [Playwright](https://playwright.dev/), Microsoft's competitor to Cypress.

I tried Playwright a year ago and [wasn't that impressed](https://whatgotdone.com/michael/2021-08-06), but I was recently reading [a Hacker News thread](https://news.ycombinator.com/item?id=33047136) where everyone seemed to agreem that Playwright had surpassed Cypress.

I gave Playwright another try, and I now must admit I agree with Hacker News. I ended up [rewriting PicoShare's end-to-end tests in Playwright](https://github.com/mtlynch/picoshare/pull/340). I found Playwright easier to work with than Cypress in almost every dimension.

I'm working on a longer post about the process of porting from Cypress to Playwright, but the summary is that I'd now recommend Playwright over Cypress for end-to-end testing web apps.

## Wrap up

### What got done?

- Published TinyPilot Pro 2.5.0
- Gave personal responses to everyone who applied for the Support Engineer job in August.
- Hired a second TinyPilot Support Engineer.

### Lessons learned

- Just thinking about how to outsource tasks can uncover opportunities in your existing workflows.

### Goals for next month

- Ramp up new support engineers.
  - I'm aiming for the first one to be able to answer 80% of questions unassisted and the second 50%.
- Start production on a second metal case prototype.
- Reach out to three 3PL vendors to talk about the process of transitioning our fulfillment to them.
