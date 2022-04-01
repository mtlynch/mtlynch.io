---
title: "TinyPilot: Month 21"
date: 2022-04-01T07:38:57-04:00
description: TODO - One-line summary
---

## Highlights

-

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

## What I wish I knew about working with a development agency

### Agree on hours per month

I'd love to agree on deadlines, but that's harder to wring out of them. And it's reasonable because if you like the first thing they show you, then a task can take only 10 hours, but if you keep rejecting everything, then the time can grow unbounded.

Even though I signed a retainer agreement for 60 hours of work in March, the agency isn't obligated to deliver 60 hours. The contract says that if they can't reach 60 hours, they either refund me the hours or roll them over to the next month.

### Beware of latency

The designer I've been working with isn't available for several weeks, so the design sits half done. By the time we circle around, we've lost a lot of momentum. And at that point, I'm much less interested in polishing the design because who knows if it's going to be another three weeks before I hear back, so I have to drop my standards more than what I'd necessarily want.

### Aggressively protect your scope

They quickly wrapped up the design work.

So much latency. There were times where it was weeks .

There was no development work until

## Side projects

### [PicoShare](https://demo.pico.rocks/)

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
