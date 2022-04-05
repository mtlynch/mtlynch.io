---
title: "TinyPilot: Month 21"
date: 2022-04-05T07:38:57-04:00
description: TODO - One-line summary
---

## Highlights

- TinyPilot had its best month of sales ever, at $69k of total revenue.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Publish TinyPilot Pro 2.4.0

- **Result**: XX
- **Grade**: XX

TODO

### Wrap up design overhaul of the TinyPilot website

- **Result**: XX
- **Grade**: XX

TODO

### Complete onboarding for TinyPilot's new support engineer

- **Result**: XX
- **Grade**: XX

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | February 2022  | March 2022                                | Change                                           |
| ------------------------ | -------------- | ----------------------------------------- | ------------------------------------------------ |
| Unique Visitors          | 6,991          | 6,212                                     | <font color="red">-779 (-11%)</font>             |
| Total Pageviews          | 14,916         | 13,375                                    | <font color="red">-1,541 (-10%)</font>           |
| Sales Revenue            | $49,026.99     | $65,171.82                                | <font color="green">+$16,144.83 (+33%)</font>    |
| Enterprise Subscriptions | $47.75         | $47.75                                    | 0                                                |
| Royalties                | $3,552.41      | $4,012.83                                 | <font color="green">+$460.42 (+13%)</font>       |
| Total Revenue            | $52,627.15     | $69,232.40                                | <font color="green">+$16,605.25 (+32%)</font>    |
| **Profit**               | **$27,039.62** | **<font color="red">-$2,551.26</font>**\* | **<font color="red">-$29,590.88 (-inf%)</font>** |

\* Until I do real bookkeeping mid-month, Profit is just an estimate based on my change in cash.

The big change is that we released the Voyager 2 PoE. We sold 14% more devices than February, but almost half of them were our new Voyager 2 PoE, which costs $60 more than our standard model. The new, premium product had a significant impact on our sales.

Profit is down, but TinyPilot's finances are too bursty to evaluate on a month-by-month basis. Profit for the first quarter of 2022 is at a healthy $16k.

## The return of discretionary time

Published his first tutorial, a guide to [setting up Tailscale on TinyPilot](https://tinypilotkvm.com/blog/tailscale).

One of the things I'm happy to do again is write. I've been working for the past few weeks on a blog post in my [homelab](/tags/homelab/) series. I enjoy writing them, and they bring a lot of new customers to TinyPilot. I've always wanted to write more of them, but it's hard to outsource because I have to find someone knowledgeable about building computers, good at writing, and interested in freelance work.

I'm trying to resist the temptation to fill my free time with new projects and instead focus on

## Keep reinvesting or start collecting income?

I want to keep iterating on the software, as that's the part I enjoy most.

My big expenses now are redesigning the website ($5-6k/month) and iterating on the Voyager 2's electrical design ($5-6k/month). In a few months, I expect those costs to drop drastically, as I stop fiddling with the website and we have final circuit boards.

At that point, do I continue investing in either category? I could have the designers start working on the TinyPilot app itself to make it look more professional.

And I can begin working on

One thing that could shift things is that I applied for a grant for manufacturers affected by the supply shortage. I could win up to $25k toward the Voyager 3, and then that slightly shifts things, but it's still.

Do I start on Voyager 3? Voyager 3 will probably cost $100-150k, which will essentially swallow my profit for the next year. But it would allow me to add features that make Voyager competitive with similar products in the $1,500-$3k range while not significantly increasing my manufacturing costs. So we'd be making $1-2k on every sale rather than $250-350.

## What I wish I knew about working with a design agency

Back in September, I [hired a design agency](/retrospectives/2021/10/#investing-more-into-design) to improve the TinyPilot website. At the time, I thought the project would take six weeks and cost $7k. Six months later, I've spent $39,577, and the project is still not done.

A lot of problems led me to this point. Some were the agency's fault, but many of these issues were my fault for not knowing how to work effectively with an agency. Aside from this, I've always hired individual freelancers. I don't think the agency was trying to trick me or do anything malicious. I think they're doing their best.

This is the only agency I've ever worked with, so I don't know how many of these pitfalls are specific to this particular agency.

### Aggressively protect your scope

The biggest problem with this problem has been in scoping. Initially, we agreed that the project was just a rebrand, so we'd create a new logo, color scheme, and font for the website, and then the designers kept expanding the scope to include [a full redesign of the website](/retrospectives/2022/01/#tinypilots-new-logo-and-learning-to-work-with-designers). I kept feeling like if I let them go for a little longer, they'd be done but . And this wasn't a purposeful decision on my part. I was juggling several other projects and didn't have time to get this under control. Looking back, I should have just cut my losses and downscoped the project down to just the rebranding as we had originally planned.

Scope creep happened again this past month. We're now on a retainer plan, where I buy a certain number of hours from them up front. They asked that I start the month with a list of tasks for them to work on, and they recommended that I overbook the schedule to ensure that they don't run out of things to do and sit idle. I don't get a refund on unused hours, so they recommended I overbook the schedule to prevent them from running out of tasks and leaving hours unused.

I created a list of tasks for them using Github Projects. But the problem was that they . They used 16 out of the 60 hours for non-critical tasks that I meant for. Going forward, I need to set better expectations so they know not to work on non-critical tasks until all the critical tasks are complete.

### Agree on hours per month

Even though I signed a retainer agreement for 60 hours of work in March, the agency isn't obligated to deliver 60 hours. The contract says that if they can't reach 60 hours, they either refund me the hours or roll them over to the next month.

I'd love to agree on _deadlines_, but designers don't want to agree to that. And that's reasonable because the deadlines aren't completely within their control. A job can be done in 15 hours if you love the first thing they show you, but if you keep rejecting things, the project timeline grows unbounded.

### Beward open loops

With an individual freelancer, you give them tasks A, B, C, and D. It'd be unusual if they got 80% through task A and then started working on task B, then started task C before finishing.

With an agency, you're dealing with multiple people. Maybe Alice at the agency only has 10 hours free this month, so she gets 80% through task A. Bob starts next, and he also only has 10 hours free. He doesn't want to duplicate effort by finishing off Alice's work, so he starts task B and gets 30% through it. Before you know it, you've spent $39,577 and you can't use any of the work because it's all only 80-90% finished.

### Beware of latency

Even with a retainer agreement, I don't have any guarantees around latency. For this past month, there was no design work at all for the first

The designer I've been working with isn't available for several weeks, so the design sits half done. By the time we circle around, we've lost a lot of momentum. And at that point, I'm much less interested in polishing the design because who knows if it's going to be another three weeks before I hear back, so I have to drop my standards more than what I'd necessarily want.

### An agency requires more management, not less

I thought since they have their own PMs, they'd kind of do their thing.

## Side projects

### [PicoShare](https://demo.pico.rocks/)

Two YouTube creators made videos about it.

David Burgess made [a video about it](https://www.youtube.com/watch?v=9eJeA8If0dY).

Got contributions for copying links to clipboard.

Store files in chunks rather than in single blobs.

I added support for multiarch Docker images, so now you can run the Docker image on ARM-based systems like the Raspberry Pi. The process of creating multiarch builds is [surprisingly simple](https://github.com/mtlynch/picoshare/pull/164/files), but it was so hard to find instructions for it because the process keeps changing.

I added a live demo. I was trying to figure out a way to prevent abuse, and I realized I could cut out a lot if I make it so that you can only download your own files.

Added a CLA.

## Wrap up

### What got done?

- Released TinyPilot Pro 2.4.0
- Released the v1 of PicoShare

### Lessons learned

-

### Goals for next month

- Publish a blog post about building a homelab NAS server with TinyPilot
