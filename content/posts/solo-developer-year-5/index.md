---
title: "My Fifth Year as a Bootstrapped Founder"
tags:
  - annual review
  - tinypilot
date: 2023-02-01T00:00:00-05:00
description: Five years ago today, I quit my job as a developer at Google to create my own self-funded software business. This is a review of my last year and what I've learned so far about bootstrapping software businesses.
---

Five years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to create my own bootstrapped software company.

For the first few years, all of my businesses flopped. They all operated at a loss, and none of them earned more than a few hundred dollars per month in revenue.

Halfway through my third year, I created a network administration device called [TinyPilot](https://tinypilotkvm.com). It quickly caught on, and it's been my main focus ever since.

In 2022, TinyPilot generated $XXk in revenue, a XX% increase from 2021.

In this post, I'll share what I've learned in my fifth year about being a bootstrapped founder.

## Previous updates

- [My First Year as a Solo Developer](/solo-developer-year-1/)
- [My Second Year as a Solo Developer](/solo-developer-year-2/)
- [My Third Year as a Solo Developer](/solo-developer-year-3/)
- [My Fourth Year as a Bootstrapped Founder](/solo-developer-year-4/)

## What happened this year?

### Launched a new product

In retrospect, PoE was a mistake. I didn't understand at the time how much complexity there is to PoE. Hardware engineering time has been our most scarce resource, and I'd estimate that about 80% of the hardware engineering time in the last year has been related to PoE.

### I overspent on a website redesign, but the results paid for themselves

### TinyPilot's teams matured

Last year, one of my lessons was that I had to stop protecting my team from doing work outside their role and instead let my teammates expand their roles as the company grew. It started with having one member of the fulfillment team take over customer service from me.

In 2022, we continued by adding more teams. Eric doesn't have a background in software, so he had to escalate technical issues to me. In April, I hired TinyPilot's support engineer. They filled most of the gaps between Eric and I.

In August, I went out of town for a wedding, but Eric was sick. I realized that the customer service team can't just be a single person.

Similar to the lesson I learned about customer support, I hired an additional technical support engineer. A month later, I unfortunately had to let the first support engineer go due to issues with their work, but I hired a second new support engineer. At this point, they're

### I wrestled with manufacturing issues

TinyPilot's electrical engineering partner likes to tell me that I'm in the "valley of despair." They say that the problems I'm dealing with shipping 200 units per month are similar to problems I'd have if I were shipping 1000, but I don't get the benefit of scale.

TinyPilot has been using custom PCBs

It took me a long time to untangle what issues were because of the global supply chain crisis, what issues came from mistakes my original hardware design partner made, and what were just normal issues you run into manufacturing PCBs.

## Lessons learned

### Run at 50% capacity

If a popular YouTube channel mentions you, your sales can double overnight. If you were already running at near-capacity, you'll fold when demand doubles.

Instead, what I aim for with TinyPilot is to run at around 50% capacity. That is, a balance of 50% reactive work and 50% proactive work. For the technical support team, they spend around half of their time responding to support requests and half of their time proactively preventing support requests. That includes things like writing tutorials and troubleshooting guides, adding diagnostics to the product to make troubleshooting easier, or making fixes to the code to prevent issues in the first place.

For some roles, the balance isn't quite 50/50, but it's a good rule of thumb.

### Worry when proactive work stops

A lot of the work batches efficiently. If you're shipping one order, maybe it takes five minutes, but if you're shipping three orders, it maybe only takes eight minutes. You can print all the order slips at once and just drop them into three boxes, then tape them all up.

So when orders went from 130/month to 200/month, I thought we were fine. It turned out that we had been running at near 100% capacity, and I never realized.

I had recently started thinking about transitioning fulfillment to a third-party logistics (3PL) vendor, and I was hoping the fulfillment team would do a lot of the legwork in figuring out how to translate our workflows to a 3PL. It turned out that

Shipping two orders is only about 20% more time-consuming than shipping a single order.

| Team                | Reactive tasks                                                                             | Proactive tasks                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Founder             | Team management<br>Vendor management<br>Reviewing work<br>Filling gaps in responsibilities | Marketing<br>Public writing<br>Re-evaluating strategy<br>Hiring and training                               |
| Fulfillment staff   | Assembling devices<br>Fulfilling orders<br>Customer service                                | Creating customer support playbooks<br>Assisting in marketing                                              |
| Support engineers   | Answering technical support questions                                                      | Writing documentation<br>Writing blog posts<br>Investigating difficult bugs                                |
| Software developers | Releasing new features<br>Fixing urgent bugs                                               | Refactoring code<br>Improving development experience<br>Creating automated tests<br>Fixing non-urgent bugs |

### Be more conservative in promising feature timelines

Late in 2021, I received an email from a large company that was excited about TinyPilot and wanted to buy 200 units per year and probably more in the future. At the time, I was selling XX units per month, so 200 units from a single customer would be huge.

They said that one important feature to them was H264 video encoding. TinyPilot had been streaming video using MJPEG, a protocol that's old but simple. The video streaming tools we were using supported already supported H264, so it didn't seem that hard to switch over. Plus, it was top of our list anyway. H264 uses about 1/10th of the bandwidth as MJPEG, so many other customers had been asking for this feature.

I estimated that we'd have H264 ready in January, so I gave myself some padding and told the customer that we expected to expect it by early March.

Then, two things happened. The first was that one of TinyPilot's developers discovered [a security vulnerability](https://tinypilotkvm.com/advisories/2022/03/token-reuse) that we prioritized. The fix required an architecture change, so it swallowed all of our development resources for two months.

Then, it turned out that supporting H264 video actually wasn't so easy.

The second issue was that H264 is harder to integrate than I expected. For all of its faults, MJPEG is dead simple to integrate with. You just create an `img` tag, point the `src` attribute at the MJPEG stream, and boom! Streaming video. To consume H264 video, you need to stand up a separate WebRTC server and use JavaScript to orchestrate the connection in unintuitive ways.

By the time I realized all the work we'd have to put in, H264 was no longer the best choice for our next feature. There were other things we could have done that would have gotten us a bigger bang for our buck. And even though I was careful never to promise this feature to the customer, I didn't want to lose this very large customer.

In the end, it just became a mess where nobody was happy. We put in months of dev time to satisfy the big customer, and we delivered what they wanted a month late. I'm not sure if it was because of our lateness or that they were never that serious in the first place, but they ultimately only ordered two devices from us, for a total of $700 in revenue.

We're a small company, and we only have about 35 hours of dev time per week between the two part-time developers and me.

Finally, in XX, they placed their first order. Except they had some special requests there, too. The India office had a smaller budget, so they wanted to know if I could ship with the free, open source version of the software instead of the normally bundled Pro version. Okay, fine.

Then, they wanted to know if we could print their logo on the case. Okay, fine.

And then they had lots of other requests, but where we finally ended up was that they _only_ wanted TinyPilot's proprietary PCB, and they'd buy the other components themselves. This went from a $XX deal to a $XX deal.

They assured me that this was just the first step, and that the higher-budget US office would be purchasing my full devices at a much higher price.

The day after I shipped their order, they told me they decided to cancel the order and use different hardware. I told them that I'd refund them minus a 15% restocking fee, and they moaned and moaned about how it was unfair.

That was a painful lesson in demanding skin in the game. I had spent tens of thousands of dollars in dev time to prioritize the features they wanted, and they'd spent $700 on two devices.

Every step of the way, they wanted to have a meeting that fit India's business hours. If they wanted to know what shipping options were available, they wouldn't ask me in an email &mdash; they'd schedule a meeting to discuss it.

## Finances

## Grading last year's goals

### Grow TinyPilot to $1M in annual revenue

- **Result**:
- **Grade**: B-

### Manage TinyPilot on 20 hours per week

- **Result**:
- **Grade**: F

### Ship a new TinyPilot hardware product

- **Result**:
- **Grade**: D

## Goals for year six

### Manage TinyPilot on 20 hours per week

I failed miserably at this last year, but it's now my top priority.

### Earn $100k in profit

In previous years, I've focused on growth. For a hardware business to work, you need to be at a certain scale. At this point, I'm at the scale where I'd feel happy maintaining this indefinitely.

### Eliminate the need for a physical office

For TinyPilot's first few years, we 3D printed all of TinyPilot's cases through the ADDFAB lab at the University of Massachusetts. We qualified for a state grant for small businesses, so we got great rates. The problem was that 3D printing scales poorly. Each 3D printer costs $5,000, and it can only print 40-60 cases per month.

We switched to metal cases, as sheet metal manufacturers can crank out thousands of cases per month. But now that we're making cases in China, it opened an opportunity I hadn't thought of. We always manufactured the devices in-house because I couldn't find a vendor willing to do this at my scale. But now almost all of our parts were coming from China, so we could outsource manufacturing to China.

The main reason TinyPilot has a physical office is to manufacture devices. We fulfill from the office too because it's easy enough to do both together, but if we stopped manufacturing, we could eliminate the office and eliminate a lot of complexity in terms of making sure the office is staffed, doing regular inventory counts, reordering parts, etc.

## Do I still love it?

Every year, when I write these blog posts, I ask myself whether I still love what I'm doing.

2022 was a hard year &mdash; certainly my hardest since going off on my own. I wasn't miserable, but I didn't love it either.

The things I enjoy doing most are programming and writing, and the past year gave me little time for either. I spent most of my time on TinyPilot scrambling to keep up with demand, filling in gaps as we grew, and putting out small fires.

I spent most of my time putting out small fires

Hardest year. No time for writing, little time for writing software.
