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

In 2022, TinyPilot generated $XXk in revenue, a XX% increase from 2021.

In this post, I'll share what I've learned in my fifth year about being a bootstrapped founder.

## Previous updates

- [My First Year as a Solo Developer](/solo-developer-year-1/)
- [My Second Year as a Solo Developer](/solo-developer-year-2/)
- [My Third Year as a Solo Developer](/solo-developer-year-3/)
- [My Fourth Year as a Bootstrapped Founder](/solo-developer-year-4/)

## What went well this year?

### TinyPilot's manufacturing scaled up

TinyPilot is the only KVM over IP device I'm aware of that supports PoE.

I also found out _why_ TinyPilot is the only one to do it. PoE is hard! I'm glad to have PoE now, but in retrospect it was a mistake.

I didn't understand at the time how much complexity there is to PoE. Hardware engineering time has been our most scarce resource, and I'd estimate that about 80% of the hardware engineering time in the last year has been related to PoE.

### TinyPilot's teams matured

One of the most important lessons I learned in 2021 was to allow my teammates expand their roles and grow with the company. Originally, I thought my duty as a manager was to protect employees' jobs from changing at all. As the company grew, I filled in the gaps.

In 2022, I focused on cultivating growth and self-directed teams instead of having everyone report directly to me. I tried to

that I had to stop protecting my team from doing work outside their role and instead let my teammates expand their roles as the company grew. It started with having one member of the fulfillment team take over customer service from me.

In 2022, we continued by adding more teams. Eric doesn't have a background in software, so he had to escalate technical issues to me. In April, I hired TinyPilot's support engineer. They filled most of the gaps between me and Eric.

In August, I traveled to Ohio for a week to attend a wedding. Unfortunately, Eric got sick the same week. Fortunately, support volume was low that week, and nothing required an urgent response, but it was a wakeup call that the customer service team can't just be a single person.

Similar to the lesson I learned about customer support, I hired an additional technical support engineer. A month later, I unfortunately had to let the first support engineer go due to issues with their work, but I hired a second new support engineer. At this point, they're

## What went poorly this year?

### I derailed development to chase a large customer

Late in 2021, I received an email from a large company that was excited about TinyPilot. They wanted to buy 200 devices per year and probably more in the future. At the time, I was selling XX devices per month, so 200 devices from a single customer would be an enormous boost in our sales.

They said that one important feature to them was H264 video encoding. The video streaming tools we were using supported already supported H264, so it didn't seem that hard to switch over. Plus, it was one of our most commonly requested features anyway.

I estimated that we'd have H264 ready in January, and I gave myself some padding and told the customer that we expected to launch it by early March.

Then, two things happened. The first was that one of TinyPilot's developers discovered [a security vulnerability](https://tinypilotkvm.com/advisories/2022/03/token-reuse). We paused work on everything else to prioritize a fix. The fix required an architecture change, so it swallowed all of our development resources for two months.

Then, I discovered that offering H264 video was an order of magnitude more difficult than I anticipated. Our previous format, MJPEG, was dead simple to integrate. You pop an `<img>` tag into your page, point the `src` attribute at an MJPEG stream, and you're done! But to stream H264, you need to stand up a WebRTC server, then you need to configure your WebRTC server to talk to your H264 streaming server, then you need to invoke a special JavaScript incantation to attach the video stream to the `<video>` element. And then I found out that H264 is patented, so I had to go through a multi-month process to license the format.

I realized in XX that we weren't going to meet the March timeline. I told the customer that we were running late, and that we could potentially scope down the work to the essentials they care about. They were building their own frontend, so they said we could skip implementing a web UI and just show them how to enable H264 from the command-line.

So, we did that. It led to a weird release announcement that was a big departure from TinyPilot. I've tried to keep TinyPilot so that everything's intuitive and user-friendly. If we advertise a feature, you can use it from the web interface. This was a big departure because it was not web-friendly. You had to SSH in and run commands for 20 minutes. But the customer was satisfied.

Finally, it was time for them to place their first order. They wanted XX TinyPilot devices. Except they had some special requests there, too. The India office had a smaller budget, so they wanted to know if I could ship offer a discount. They assured me that this was just the first step, and that the higher-budget US office would be purchasing my full devices at a much higher price. if I gave them the free, open source version of the software instead of the normally bundled Pro version. Okay, fine. I'll take $XX off.

Whoa, whoa, whoa, they said. $XX off? You sell the Pro version standalone for $80, so shouldn't it be a discount of $80 per device?

I told them no because .

Okay, in that case, they said. What if you take out the Raspberry Pi and they buy their own? And then what if

Then, they wanted to know if we could print their logo on the case. Okay, fine.

And then they had lots of other requests, but where we finally ended up was that they _only_ wanted TinyPilot's proprietary circuit boards, and they'd buy the other components themselves. This went from a $XX deal to a $XX deal.

The day after I shipped their first box, they asked for 3D models of our circuit boards. This wasn't part of the agreement, but I just wanted to wrap this up, so I sent them. They were confused and asked why the models didn't include a video capture port. I explained that our devices use a third-party chip for that, which they would have received if they ordered a pre-made device, but that was one of the things they agreed to buy on their own.

They said our circuit boards were of no use to them without built-in video capture, and they wanted a full refund. I told them that we'd already shipped the first box to India and had no way of recalling it, so they'd have to

In the end, it just became a mess where nobody was happy. We put in months of dev time to satisfy the big customer, and we delivered what they wanted a month late. I'm not sure if it was because of our lateness or that they were never that serious in the first place, but they ultimately only ordered two devices from us, for a total of $700 in revenue.

We're a small company, and we only have about 35 hours of dev time per week between the two part-time developers and me.

The day after I shipped their order, they told me they decided to cancel the order and use different hardware. I told them that I'd refund them minus a 15% restocking fee, and they moaned and moaned about how it was unfair.

That was a painful lesson in demanding skin in the game. I had spent tens of thousands of dollars in dev time to prioritize the features they wanted, and they'd spent $700 on two devices.

Every step of the way, they wanted to have a meeting that fit India's business hours. If they wanted to know what shipping options were available, they wouldn't ask me in an email &mdash; they'd schedule a meeting to discuss it.

I've been trying to think of the takeaway from this story, and I've struggled to find the lesson.

At first, I thought it was a lesson in limiting how much I promise customers, but I already knew that. I always gave them caveats that we're a small team so our estimates are approximate. And I even padded my estimate to give us two extra months of buffer. But I never committed to a date, and the estimate I gave them was twice as long as I thought it would take us. We just caught bad luck twice. It's reasonable for customers to know our roadmap, so I can't just refuse to give dates for anything.

Then I thought this was a lesson not to invest too much in customers with no skin in the game. This customer had only purchased two devices for a total of around $700, but they'd asked for us to prioritize a lot of features for them before they bought more. But they did have skin in the game. They were working on their own custom frontend for TinyPilot. So it theoretically cost them something to drop TinyPilot. And it's not like they were asking for niche, oddball features. The things that they wanted were the same features that most of our customers wanted.

I'm not really sure if there is a lesson. If I had to go back with the same information, I'd do the same thing. So maybe the lesson is just that sometimes you make a big bet and accept when it doesn't pay off.

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

At first, I thought it was a lesson in making unreasonable promises to customers. But I didn't really. I told the customer that our timeline was an estimate, and the estimate I gave them was 40% longer than I thought it would take us. I did that specifically to avoid feeling rushed to account for unknown unknowns. We ran into unexpected delays, and even though I budgeted for them, they were more severe than I guessed.

Then, perhaps because I'm reading a lot of Nassim Taleb lately, I thought the experience was a lesson in avoiding business relationships where I have much more skin in the game than my counterparty. At the end, I felt like I invested thousands into development and dozens of hours of time personally, and the customer had invested almost nothing.

Re-reading my correspondence, I remembered that the customer had been writing custom software to integrate with TinyPilot. As a percentage of overall resources, I was certainly investing a lot more of TinyPilot's resources, but that's the nature of

In the end, I think the lesson might be kind of boring and obvious: some bets don't pay off. As the founder, I have to roll with the punches. If I'd do the same thing with the same information, it's not a mistake.

## Finances

## Grading last year's goals

### Grow TinyPilot to $1M in annual revenue

- **Result**: Grew TinyPilot's revenue by XX% to $XXk
- **Grade**: B

I knew that $1M was an aggressive goal, and I'm still impressed how close we came. I think revenue is kind of a vanity metric, especially given that profit was negative, but to suspend rigor for a moment, not a lot of bootstrapped businesses reach $XXk in annual revenue.

### Manage TinyPilot on 20 hours per week

- **Result**: I spent more time managing TinyPilot in 2022 than in 2021.
- **Grade**: D

I'd estimate that I work 40-50 hours per week. I wrote a little more on my blog and participated slightly more in TinyPilot's software development.

I added a new team, and people expanded their roles. It's not just the work of training a new person, it's defining how they fit into other processes. And the more people you have, the more complexity there is in designing workflows that involve multiple people and multiple teams.

### Ship a new TinyPilot hardware product

- **Result**: I never even started work on the Voyager 3
- **Grade**: D

TinyPilot has always used the Raspberry Pi 4B as the core hardware. My plan for 2022 was to get rid of the Pi 4B and all the other third-party boards and consolidate all the functionality into a custom TinyPilot board.

Instead, all of our hardware engineering time went to chasing down manufacturing issues and supply shortages, so we made no progress on this.

## Goals for year six

### Manage TinyPilot on 20 hours per week

I failed miserably at this last year, but it's now my top priority. I'm hopeful that this is more achievable this year. In 2022, TinyPilot expanded customer support from one person to two and created a new support engineering team. Those steps required a lot of management between hiring, training, and defining new workflows. But all of that is done now, so I expect management time to continue trending downward.

### Earn $100k in profit

In previous years, I've focused on growth. For a hardware business to work, you need to be at a certain scale. At this point, I'm at the scale where I'd feel happy maintaining this indefinitely.

For most of 2023, TinyPilot's production will be constrained by supply, so I'm going to focus on profit rather than growth.

### Eliminate the need for a physical office

Until a few weeks ago, TinyPilot had been working with a local vendor to 3D print all of TinyPilot's cases. In the last few days, we completed the transition from 3D printed cases to metal cases. The main goal of the transition was to increase our scale. 3D printing limited us to about 140 cases per month, and then we'd have to purchase a new $5k for every 40 case/month beyond that.

One unexpected side effect is that it makes it easier to move assembly to China. And if we don't need our office for assembling devices, we can outsource other things and get rid of the office. We can outsource fulfillment to a third-party logistics provider.

It eliminates a lot of complexity we've been dealing with in-house. We don't have to manage inventory or staff the office every weekday.

One unexpected consequence
But now that we're making cases in China, it opened an opportunity I hadn't thought of. We always manufactured the devices in-house because I couldn't find a vendor willing to do this at my scale. But now almost all of our parts were coming from China, so we could outsource manufacturing to China.

The main reason TinyPilot has a physical office is to manufacture devices. We fulfill from the office too because it's easy enough to do both together, but if we stopped manufacturing, we could eliminate the office and eliminate a lot of complexity in terms of making sure the office is staffed, doing regular inventory counts, reordering parts, etc.

## Do I still love it?

Every year, when I write these blog posts, I ask myself whether I still love what I'm doing.

2022 was a hard year &mdash; certainly my hardest since going off on my own. I wasn't miserable, but I can't say I _loved_ it.

The things I enjoy doing most are programming and writing, and the past year gave me little time for either. I spent most of my time on TinyPilot scrambling to keep up with demand, filling in gaps as we grew, and putting out small fires.

I grew as a manager. I learned more about hiring and coordinating in an organization with more complexity.

I'm hopeful that this year was hard because I was doing a lot of things that will pay dividends over the next few years.

I still prefer working for myself to working for an employer, and I plan to do it indefinitely.

---

_Cover image by [Loraine Yow](https://www.lolo-ology.com/)._
