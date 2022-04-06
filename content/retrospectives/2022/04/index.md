---
title: "TinyPilot: Month 21"
date: 2022-04-05T07:38:57-04:00
description: TODO - One-line summary
---

## Highlights

- TinyPilot had its best month of sales ever, at $69k of total revenue.
- How I went five months and $32k over budget on a website redesign.
- PicoShare is now the fastest-growing project I've ever published.

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

My profit was negative, but that's really about odd timing of expenses this month. Profit for the first quarter of 2022 is at a healthy $16k, averaging $5.3k per month.

{{<img src="sales-per-unique-visitor.png" maxWidth="700px" hasBorder="true" caption="Sales Per Unique Visitor reached its highest-ever level in March 2022.">}}

Revenue per visitor was its highest ever, at $10.49 per unique visitor. To put that in context, my average revenue per visitor this time last year was about $4. I'm happy to see this, as my plan was to focus on increasing the conversion rate on my website ("bottom of funnel") before I focus on marketing, and that strategy seems to be working. I think improvements in the product, pricing, and the website have made people more likely to purchase.

## I have free time again!

In February, I brainstormed how I could manage TinyPilot [with 20 hours per week](/retrospectives/2022/02/#how-can-i-manage-tinypilot-with-only-20-hours-per-week).

One of the largest demands on my time was technical support, which took me 8 hours per week. That was the hardest responsibility to delegate because the hiring process took hundreds of hours. Even after I found a qualified engineer, training was time-consuming because I have two years of institutional knowledge trapped in my head.

I'm happy to say that we're now over the hump. Diego, TinyPilot's first support engineer, is now answering all questions in our [support forum](https://forum.tinypilotkvm.com/), so I'm averaging less than 8 hours a week on support. He also published his first tutorial, a guide to [setting up Tailscale on TinyPilot](https://tinypilotkvm.com/blog/tailscale).

I've also been making an effort to let TinyPilot's local staff take on more responsibility. For example, this week, we found out that the specific type of screw we use to assemble the Voyager 2 is now out of stock everywhere. Normally, I would work with our case designer to find a replacement and verify it works, but I caught myself before emailing him. This was a good opportunity for TinyPilot's local staff to take on more responsibility, so I asked them to take the lead.

I noticed a significant difference in my time management throughout March. For the previous six months, I've ended most days feeling like I didn't finish everything I wanted and had to postpone [important but non-urgent tasks](/book-reports/7-habits-of-highly-effective-people/#time-management-matrix). In March, I often completed my urgent tasks by mid-afternoon and had free time to invest in marketing or experimenting with a new tool to eliminate toil for TinyPilot.

I'm resisting the temptation to spend this newfound free time _adding_ things like hiring another person or adding a new feature to TinyPilot. I have to remind myself that those things are always more complicated than they first seem. I spent 2021 scrambling to manage too many growth projects, so now it's time to optimize what we have:

- Automating our release process
- Automating our end-to-end testing
- Talking more with customers outside of support flows
- Establishing escalation paths between TinyPilot's customer service staff and support engineer
- Improving workflows with our manufacturers

## Keep reinvesting or start collecting income?

For all of TinyPilot's existence, I've ignored short-term profits and instead focused on long-term growth. I avoided running at a deficit, but I was happy to run at nearly breakeven, reinvesting all revenue into improving the product.

I thought of reinvestment as building momentum. If my sales were $3k/month and I spent $5k to improve the product or website to reach $4k/month, that $5k is a one-time cost, but then I'm permanently at a higher sales velocity.

But I'm not a venture-backed startup. My goal isn't to grow forever and get an IPO. At some point, I have to stop putting everything into growth and start collecting income. Is that time now?

My main short-term expenses are iterating on the Voyager 2's electrical design ($10-20k/month) and redesigning the [sales website](https://tinypilotkvm.com) ($5-6k/month). In a few months, we'll finalize circuit boards for the Voyager 2, and I'll stop fiddling with the website, so those costs will fall drastically. Instead of averaging $5k/month in profit, I can be making $20k/month by doing nothing but wrapping up short-term projects and not starting new ones.

My initial plan was to work with my electrical engineering partner to begin work on Voyager 3 as soon as we get production stabilized for Voyager 2. Voyager 3 will cost about $15-25k per month for the next six months, which would essentially swallow m profit for the rest of the year. Not only that, it will eat a big chunk out of my time, as releasing a new product changes a lot of TinyPilot's internal workflows.

At this point, I think it's time to start collecting income. I can start new projects later in the year, but I'd like to work on increasing sales so that I can continue making a healthy profit while still investing in meaningful product improvements.

## What I wish I knew about working with a design agency

Back in September, I [hired a design agency](/retrospectives/2021/10/#investing-more-into-design) to improve the TinyPilot website. At the time, I thought the project would take six weeks and cost $7k. Six months later, I've spent $39,577, and the project is still not done.

How did we get here? I can point to mistakes on the agency's side, but the core problem was that I didn't know how to work effectively with an agency. I've only ever hired freelancers, and I didn't realize how different things are with agencies.

So I'm recording the things I wish I knew at the beginning, as a reminder to myself and in the hopes that it might benefit someone else who's planning to hire an agency.

### An agency requires more management, not less

My perception of design and development agencies is that they cater to people who don't have experience managing people or projects. Because of that, I assumed the agency would mostly manage itself and not require much oversight from me.

The fundamental mistake I made when hiring this agency was underestimating the time I'd need to manage them. I think I could have avoided a lot of these problems if I was more on top of the project instead of assuming that the agency would mostly manage itself.

The agency was working 40-60 hours per month, the same hours as my other freelancer, so I thought the agency as a whole would require similar oversight to one freelancer. In retrospect

It's obvious in retrospect why

In theory, the agency could give you a single point of contact, and that person abstracts the rest of the team from you, but then you'd be playing telephone through that person and things would get lost in translation. So working with an agency team necessarily means communicating with more people than if you're working with an individaul freelancer.

### Aggressively protect your scope

The biggest problem with this project has been in scoping.

Initially, the agency and I agreed that the project was just a rebrand. We'd create a new logo, color scheme, and font for the website and then evaluate next steps. But then came scope creep. The designers kept silently expanding the scope until I found myself halfway through [a full redesign of the website](/retrospectives/2022/01/#tinypilots-new-logo-and-learning-to-work-with-designers).

I kept feeling like if I let them go for a little longer, they'd be done but things kept dragging on and on. Looking back, I should have just cut my losses and downscoped the project down to just the rebranding as we had originally planned. But this goes back to underbudgeting my management time. I was scrambling to manage all the changes that came with switching from Voyager 1 to Voyager 2 at the time, so the easiest thing for me to do was let the agency keep going.

Even though I thought I learned my lesson, scope creep bit me again this month. I'm now on a retainer plan with the agency, so I buy a certain number of hours from them up front each month. They asked that I start the month with a list of tasks. I don't get a refund on unused hours, so they recommended I overbook the schedule to prevent them from running out of tasks and leaving hours unused.

I enumerated the design tasks I wanted them to finish, and I wasn't sure how long it would take, so I added some low-priority bugs to the list just in case they sped through all the design work. But you know where this is going. They left all of the design tasks half-finished, but they used 16 out of the 60 hours fixing all the low-priority bugs. Going forward, I need to set better expectations so they know not to work on non-critical tasks until all the critical tasks are complete.

### Beware open loops

If you assigned a freelancer tasks A, B, C, and D, it would be odd if they abruptly stopped working on task A when it was 80% complete and then started working on task B instead. It would be even more bizarre if they stopped at the halfway point on task B and started tasks C and D.

With an agency, it's easy to end up in a situation where several tasks are only 80% complete because multiple people are working in parallel, but not necessarily on the same schedule. Maybe Alice at the agency only has 10 hours free this month, so she gets 80% through task A. Bob starts next, and he also only has 10 hours free. He doesn't want to duplicate effort by finishing off Alice's work, so he starts task B and gets 30% through it. Before you know it, you've spent $39,577 and you can't use any of the work because it's all only 80-90% finished.

In the book _Getting Things Done_, David Allen describes unfinished tasks "open loops." The more open loops, the bigger the drain on your focus because you're managing so many things.

Open loops are also worse value for your money. Suppose you hire someone to complete six tasks over the course of six months. If you're hiring an individual, they'd deliver about one task per month, so you never have to wait more than a few weeks before you start paying for the work and when you start realizing the value of that work. With an agency, they might assign those six tasks to six people who only spend 1/6th of their time on your project, so .

Presumably, you're paying for this work because you expect some sort of return on this investment, such as increased sales from a better design. With the individual, you're realizing these results much earlier. So if you're getting a 3% increase in sales from each task, the serialized tasks would have paid off much earlier.

### Start hourly, then switch to retainer

The agency I'm working with offers both hourly and retainer plans. With hourly, I can buy a block of 30 hours and then work with them until that block is done. With retainer, I commit to a certain number of hours every month, and I have to give 28 days' notice before canceling the agreement. The minimum retainer plan was 40 hours/month, but it's a 20% discount from the hourly rate.

What I didn't realize is that hourly clients are the lowest priority, so the agency can starve their projects of resources indefinitely. That's what happened with TinyPilot. The agency was doing great work in October and November, but then quality and bandwidth took a nosedive in December.

At the time, I thought it was just a holiday slowdown, but when it continued into January, I raised the issue with the owner. He admitted that the agency had lost staff and taken on new retainer clients, so they were finding it difficult to allocate bandwidth for TinyPilot, as I was their only hourly client. He recommended I switch to a retainer agreement to guarantee priority.

I was annoyed. Why should I reward them for deprioritizing my project by making a bigger commitment to them? At the same time, I get it. The agency is a small business too, and they want to prioritize clients who are going to work with them long-term rather than one-and-done clients. The agency told me at the beginning that I'd get priority as a retainer client, but I didn't realize how much of a difference that made.

If I were to do it over again, I'd buy one 30-hour hourly block as a trial hire for the agency and then switch to a retainer agreement for the remainder of the project. Having guaranteed hours on the agency's schedule is a better value for your money because it protects your time on their schedule instead of them just squeezing a few hours in here and there when they have time between their priority clients.

## Side projects

### [PicoShare](https://demo.pico.rocks/)

PicoShare is a project I started in February. It's a minimalist file-sharing tool. I often want to share images, videos, or PDFs with other people. If I'm sending a file for business, I feel silly sending an imgur or mega.nz link, because those don't really say "professional business communication." But I didn't like dealing with Google Drive or Dropbox either because I don't like their UI getting in the way, so I made my own tool.

I officially released PicoShare [v1.0.0](https://github.com/mtlynch/picoshare/releases/tag/1.0.0) on March 20th by [announcing it to the /r/selfhosted](https://old.reddit.com/r/selfhosted/comments/tirbdq/picoshare_a_minimalist_easytohost_service_for/) subreddit. The reception was positive but nothing sensational. But then it seems to have had a slow burn in the next few weeks with people adopting it.

It's the fastest-growing project I've ever created. The [first commit](https://github.com/mtlynch/picoshare/commit/bd4b3c38a680ffc06f95174d0e062cb429e2e4d1) was February 13th, and the project currently has 664 stars on Github. For comparison, [TinyPilot](https://github.com/tiny-pilot/tinypilot) has 1.8k stars after almost two years, and [LogPaste](https://github.com/mtlynch/logpaste) has 201 stars after a year.

Two YouTube creators made videos about it. A self-hosting blogger [wrote a tutorial](https://mariushosting.com/how-to-install-picoshare-on-your-synology-nas/) about installing PicoShare on a Synology NAS. That blog post was fun for me because my first-ever blog post was about [setting up a Docker image on my Synology NAS](/sia-via-docker/).

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
