---
title: "My Fifth Year as a Bootstrapped Founder"
tags:
  - annual review
  - tinypilot
date: 2023-02-01T00:00:00-05:00
hero_image: cover.webp
images:
  - solo-developer-year-5/og-cover.webp
description: Five years ago today, I quit my job as a developer at Google to create my own self-funded software business. This is a review of my last year and what I've learned so far about bootstrapping software businesses.
---

Five years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to create my own bootstrapped software company.

For the first few years, all of my businesses flopped. None of them earned more than a few hundred dollars per month in revenue, and they all had negative profit.

Halfway through my third year, I created a network administration device called [TinyPilot](https://tinypilotkvm.com). It quickly caught on, and it's been my main focus ever since.

In 2022, TinyPilot generated $812k in revenue, a XX% increase from 2021.

In this post, I'll share what I've learned in my fifth year about being a bootstrapped founder.

## Previous updates

- [My First Year as a Solo Developer](/solo-developer-year-1/)
- [My Second Year as a Solo Developer](/solo-developer-year-2/)
- [My Third Year as a Solo Developer](/solo-developer-year-3/)
- [My Fourth Year as a Bootstrapped Founder](/solo-developer-year-4/)

## What went well this year?

### TinyPilot's teams matured

One of the most important lessons I learned in 2021 was to allow TinyPilot's employees to expand their roles as the company grew. Originally, I thought my duty as a manager was to protect employees' jobs from changing at all. An interview with WPEngine founder Jason Cohen was a good wakeup call, as he described good leadership as the opposite of what I was doing:

> The only way for the organization to succeed is if the team is getting better. And that's [the founder's] job: to build great teams.

I had started this process in 2021 by encouraging employees to expand their roles. A member of the fulfillment team started helping out with customer service, and it made a huge difference.

In 2022, I continued this process with a focus on teams rather than individuals.

In August, I traveled to Ohio for a week to attend a wedding. Eric, who handles fulfillment and customer support, got sick the same week. Fortunately, support volume was low that week, and nothing required an urgent response. Still, it was a wakeup call that the customer service team can't just be a single person. The other member of the fulfillment team agreed to expand into customer support, so now it's a team instead of a single person.

I also hired TinyPilot's first support engineer in early 2022. They acted as a second level of support if the customer had technical issues that the customer service team didn't know how to handle. Similar to the experience I had with customer support, I found that one person wasn't enough. When they'd get sick or take vacation, I was spending up to three hours per day on customer support, which was difficult to fit in.

I expanded the support engineering team to two people in XX, and

This process has definitely been difficult. There's a large time investment in training a new person, but there's an even bigger time investment in creating teams and figuring out how they interact with the rest of the organization. The teams are still relatively new, but I'm seeing them take on an increasing share of work that used to be work I did.

### TinyPilot's manufacturing scaled up

We added power over Ethernet (PoE) support to the TinyPilot. It means that users went from needing XX cables for the Voyager 1 to just three cables for the Voyager 2.

Very few KVM over IP devices support PoE, and I also found out why. PoE is hard! Hardware engineering time has been TinyPilot's most scarce and expensive resource, and I'd estimate that about 80% of the hardware engineering hours in 2022 were designing PoE or fixing unforeseen issues that were a consequence of PoE.

## What went poorly this year?

### I derailed development to chase a large customer

Late in 2021, I received an email from a large company that was excited about TinyPilot. They wanted to buy 200 devices over the course of 2022, and they planned to increase that number in 2023. At the time, I was selling XX devices per month, so 200 devices from a single customer would be an enormous boost in our sales.

They said that before we moved forward, they wanted TinyPilot to support H264 video encoding. The video streaming tools we were using already supported H264, so it didn't seem that hard to switch over. Plus, H264 was one of our most commonly-requested features.

I had some other work planned, but I estimated if we prioritized H264, it would be ready by January 2022. To give myself some padding, I told the customer that we expected to launch the feature by early March.

A few weeks later, one of TinyPilot's developers discovered [a security vulnerability](https://tinypilotkvm.com/advisories/2022/03/token-reuse) in our code, so we paused new work to prioritize a fix.

Then, I discovered that offering H264 video was an order of magnitude more difficult than I anticipated. Streaming H264 in a web browser is more complicated than simply adding some HTML to the page and pointing it to a video stream. You also need a WebRTC server, so you need to configure your WebRTC server to talk to your H264 streaming server. And then you need to invoke an undocumented JavaScript incantation to attach the video stream to the `<video>` element. And it turns out that H264 is patented, so I had to go through a multi-month process with lawyers to license the format.

Between the delays due to the security fix and the complexity of H264, it was clear we weren't going to meet the March timeline. I reached out to the customer in XX to say that we were running late. I asked if they'd prefer a later delivery date or a reduced feature set. They were building their own frontend, so they said we could skip implementing a web UI and just show them how to enable H264 from the command-line.

So, we did that. It led to a weird release announcement that was a big departure from TinyPilot. I've tried to keep TinyPilot so that everything's intuitive and user-friendly. If we advertise a feature, you can use it from the web interface. This was a big departure because it was not web-friendly. You had to SSH in and run commands for 20 minutes. But the customer was satisfied.

At this point, we've dedicated several months of development to H264 and other smaller feature they requested. They haven't spent any money with us, but they promised they'd place a large order once we delivered H264. It was a slog to get H264 out the door, but it was finally going to pay off.

They asked for a quote for 25 devices. I told them we could give it to them for $8.3k, a 5% discount from our retail price.

They said that this was for their India office, who had a smaller budget, so could we cut things out of the product to reduce the price? They didn't need any of the Pro software features, so could we cut that? And what if I just gave them the source files for my 3D-printed case so they could print the cases themselves with their own logo?

I wasn't willing to hand over the design files, so I told them that printing cases with their logo would increase the cost to $11k.

I finally agreed to sell them TinyPilot's custom circuit board and they'd source the rest of the parts themselves and build their own case. The total was $4.4k. Not nothing, but it's about a day's worth of sales on a good day. At this point, I'd spent at least $10k in developer hours on the H264 feature.

The day after they placed the order, they requested 3D models for the circuit board. This wasn't part of the agreement, but I just wanted to wrap this up, so I sent them. They were confused and asked why the models didn't include a video capture port. I explained that our devices use a third-party chip for that, which they would have received if they ordered a pre-made device, but that was one of the things they decided to buy on their own.

They said our circuit boards were of no use to them without built-in video capture. They wanted a full refund. We'd already shipped their order to India and couldn't re-route it, so they'd have to send it back to us. They were upset that I charged them a restocking fee of 15% ($665), which barely covered our costs of shipping and tariffs.

In the end, it just became a mess where nobody was happy. I felt exhausted that after so much custom work, they simply backed out of the deal. They were upset that I charged them a restocking fee and felt that it suggested I didn't trust them for a longer-term partnership. I felt like they were taking advantage of a much smaller company, and I was exhausted from doing so much high-touch sales with them. TinyPilot's dev team had two months of high-priority work to fix a security issue, and then another three months of high-priority work to deliver. Customers saw five months with essentially no new features except for this half-feature they had to manage from the command-line.

The customer said they'd order from us for their US orders, but they never did.

### I let a website redesign go awry

Late last year, I started the process of a rebrand for TinyPilot.

I wrote a longer blog post about the experience, and it became popular in a way I didn't expect. It attracted XX readers in the first week and XX by the end of the year, making it my XXnd most popular blog post of all time.

When I say the results were unexpected, it's not false humility. I didn't think many people would find the story relatable. How many people have spent $46k on a website redesign?

I found afterwards was that people related to the experience of feeling mistreated by a business and struggling with how to fix the situation. That was also a good lesson in my writing that even with experiences that aren't widely shared, the emotions are what resonate with people.

Even though I spent more than I meant to, I believe the results paid for themselves. After we switched to the new design, website sales went from $XX-$XXk/month to $XX-$XXk/month, and I wasn't making other changes that would explain the increase. It could be that our product spreads through word of mouth, so those customers would have purchased anyway, but I feel a little better about blowing the $46k if I feel like I got a positive return.

## Lessons learned

### Run at 50% capacity

If a popular YouTube channel mentions you, your sales can double overnight. If you were already running at near-capacity, you'll fold when demand doubles.

Instead, what I aim for with TinyPilot is to run at around 50% capacity. That is, a balance of 50% reactive work and 50% proactive work.

The clearest example of a 50/50 split is the the technical support team: they spend around half of their time responding to support requests and half of their time proactively reducing support workload. Proactive measures include things like writing tutorials, adding diagnostics to the product to make troubleshooting easier, and improving the product to prevent issues in the first place.

| Team                | Reactive tasks                                                                             | Proactive tasks                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Founder             | Team management<br>Vendor management<br>Reviewing work<br>Filling gaps in responsibilities | Marketing<br>Public writing<br>Re-evaluating strategy<br>Hiring and training                               |
| Fulfillment staff   | Assembling devices<br>Fulfilling orders<br>Customer service                                | Creating customer support playbooks<br>Assisting in marketing                                              |
| Support engineers   | Answering technical support questions                                                      | Writing documentation<br>Writing blog posts<br>Investigating difficult bugs                                |
| Software developers | Releasing new features<br>Fixing urgent bugs                                               | Refactoring code<br>Improving development experience<br>Creating automated tests<br>Fixing non-urgent bugs |

If one person is sick or takes vacation for a week, the other person can pause their proactive work and still do all the time-sensitive tasks their counterpart was doing without it being a strain.

For some roles, the balance isn't quite 50/50, but it's a good rule of thumb.

### Worry when proactive work stops

One of the more subtle downsides

A lot of the work batches efficiently. If you're shipping one order, maybe it takes five minutes, but if you're shipping three orders, it maybe only takes eight minutes. You can print all the order slips at once and just drop them into three boxes, then tape them all up.

So when orders went from 130/month to 200/month, I thought we were fine. It turned out that we had been running at near 100% capacity, and I never realized.

If you're running at near-capacity, get stuck in an undesirable position of focusing only on short-term problems. As TinyPilot's sales grew, we realized it was time to switch to an external vendor to handle our order fulfillment. Except that by the time I realized it, we [didn't have time to make the switch](/retrospectives/2022/12/#we-dont-have-enough-time-to-save-ourselves-time). Researching improvements and implementing them takes time, so if you only have a small amount of spare capacity, you'll get stuck doing what you're doing.

I had recently started thinking about transitioning fulfillment to a third-party logistics (3PL) vendor, and I was hoping the fulfillment team would do a lot of the legwork in figuring out how to translate our workflows to a 3PL. It turned out that

Shipping two orders is only about 20% more time-consuming than shipping a single order.

### Accept that some bets fail

In writing this post, I struggled to come up with a meaningful lesson from my unsuccessful pursuit of the large customer.

Certainly, it was a negative outcome, and I'd like to avoid it in the future, but I couldn't pinpoint what, exactly, I got wrong.

At first, I thought it was a lesson in making unreasonable promises to customers. But I didn't really make any. I told the customer that our timeline was an estimate, and I padded the estimate by 40% to account for unknown unknowns. We ultimately ran into unexpected delays, and even though I budgeted for them, they were more severe than I guessed.

Then, perhaps because I'm reading a lot of Nassim Taleb lately, I thought the experience was a lesson in avoiding customers that demand a lot of skin in the game from without offering much of their own. At the end, I felt like I invested thousands into development and dozens of hours answering their requests, and the customer had invested almost nothing.

Or had they? They were writing their own custom frontend for TinyPilot, so that's a serious investment. As a percentage of overall resources, I was certainly investing a lot more of TinyPilot's resources, but that's the nature of

In the end, I think the lesson might be kind of boring and obvious: some bets don't pay off. As the founder, I have to roll with the punches. If I'd do the same thing with the same information, it's not a mistake.

## Finances

## Grading last year's goals

### Grow TinyPilot to $1M in annual revenue

- **Result**: Grew TinyPilot's revenue by XX% to $812k
- **Grade**: B

I knew that $1M was an aggressive goal, and I'm still impressed how close we came. Revenue is a vanity metric, especially given that profit was negative, but to suspend rigor for a moment, not a lot of bootstrapped businesses reach $812k in annual revenue.

### Manage TinyPilot on 20 hours per week

- **Result**: I spent more time managing TinyPilot in 2022 than in 2021.
- **Grade**: D

I'd estimate that I work 40-50 hours per week. I wrote a little more on my blog and participated slightly more in TinyPilot's software development.

I added a new team, and people expanded their roles. It's not just the work of training a new person, it's defining how they fit into other processes. And the more people you have, the more complexity there is in designing workflows that involve multiple people and multiple teams.

### Ship the TinyPilot Voyager 3

- **Result**: We never even completed the design phase
- **Grade**: D

TinyPilot has always used the Raspberry Pi 4B as the core hardware. My plan for 2022 was to consolidate all the functionality into a custom TinyPilot board, eliminating many of the expensive third-party components we currently use.

Instead, all of our hardware engineering time went to chasing down manufacturing issues and supply shortages, so we made no progress on a new product.

## Goals for year six

### Manage TinyPilot on 20 hours per week

I failed miserably at reducing my hours last year, but it's now my top priority.

I'm hopeful that I'll be more successful at reducing my management time this year. Most of my management work in 2022 was growing teams that can independently manage TinyPilot's day-to-day operations. It required a lot of up front investment in hiring, training, and defining processes, but I expect that investment to pay off in 2023.

### Earn $100k in profit

In previous years, I've focused on growth. For a hardware business to work, you need to be at a certain scale. At this point, I'm at the scale where I'd feel happy maintaining this indefinitely.

For most of 2023, TinyPilot's production will be constrained by supply, so I'm going to focus on profit rather than growth.

### Close the TinyPilot office

For most of the company's existence, TinyPilot's cases came from a local vendor who designed and 3D printed them. In the last few weeks, we completed the transition to metal cases.

We switched to metal cases primarily to speed up manufacturing, but the side-effects is that most of our raw materials now originate in China. That means it should be possible to have our devices arrive to the US pre-built rather than assembling and testing each device by hand in TinyPilot's office.

If we don't need to build devices in our office, we don't strictly need to maintain an office. We can move fulfillment to a third-party logistics provider, and then TinyPilot's employees become more time-independent and location-independent since we'll be out of the critical path for manufacturing and fulfillment.

## Do I still love it?

Every year, when I write these blog posts, I ask myself whether I still love what I'm doing.

2022 was a hard year &mdash; certainly my hardest since going off on my own. I wasn't miserable, but I can't say I _loved_ it.

The things I enjoy doing most are programming and writing, and the past year gave me little time for either. I spent most of my time on TinyPilot scrambling to keep up with demand, filling in gaps as we grew, and putting out small fires.

I grew as a manager. I learned more about hiring and coordinating in an organization with more complexity.

I'm hopeful that this year was hard because I was doing a lot of things that will pay dividends over the next few years.

I still prefer working for myself to working for an employer, and I plan to do it indefinitely.

---

_Cover image by [Loraine Yow](https://www.lolo-ology.com/)._
