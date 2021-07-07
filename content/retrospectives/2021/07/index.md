---
title: "TinyPilot: Month 12"
date: 2021-07-05T11:59:29-04:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Publish a new release of TinyPilot

* **Result**: Published [TinyPilot 1.5.1](https://tinypilotkvm.com/blog/whats-new-in-1-5-1)
* **Grade**: A

TODO

### Earn $35k in TinyPilot revenue

* **Result**: Earned $29k in revenue
* **Grade**: B-

TODO

### Create a prototype of the TinyPilot Voyager 2, with built-in Power over Ethernet

* **Result**: XX
* **Grade**: D

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric          | May 2021      | June 2021  | Change                                     |
| --------------- | ------------- | ---------- | ------------------------------------------ |
| Unique Visitors | 7,283         | 6,339      | <font color="red">-944 (-13%)</font>       |
| Total Pageviews | 13,267        | 11,514     | <font color="red">-1,753 (-13%)</font>     |
| Sales Revenue   | $38,767.77    | $29,446.46 | <font color="red">-$9,321.31 (-24%)</font> |
| Donations       | $0.00         | $0.00      | 0                                          |
| Total Revenue   | $38,767.77    | $29,446.46 | <font color="red">-$9,321.31 (-24%)</font> |
| **Profit**      | **$6,858.72** | <font color="red">**-$11,378.30**</font>\*    | **N/A**                                    |

\* *Provisional until I do real bookkeeping for the month. This number is just the delta in my checking account since June 1st.*

Profits are way down because I had to spend $17k.

## Finding ways to free up time

I'm the bottleneck.
l

## Getting unstuck on the TinyPilot website

There are two freelance developers who work on the TinyPilot product itself. They do fantastic work, and I was fortunate to find them both relatively quickly.

Finding a developer for the sales website has been a different story. I've been trying to find a developer to maintain the site since October. I've hired six different developers to work on the site, and none of them have been a good match. For about half, it's an issue of time. I'm happy with their work, but they're juggling other work. For the other half, it's a skill mismatch. I can identify it pretty early, but it still burns a frustrating amount of time to give someone a paid trial job.

The design of the website has always been a placeholder until I can find someone to come in and make it look more professional. But because of my inability to find a developer, the website has limped along with basically the same design it had when I first launched. To me, it looks much more like a hobby project, and I want to make it look like A Real Product.

TODO: TinyPilot website screenshot

The biggest mistake I made in hiring for the web development job was limiting its scope too much. For the first six months, I advertised it as a freelance job that required three to five hours per week. I don't do much with the website, so I just wanted someone to fix small bugs and add non-urgent features. But I think limiting the hours like this made the job unappealing to most freelance developers, and it attracted people whose schedule was mostly booked.

I've since updated [the job description](https://tinypilotkvm.com/jobs/vue-developer) to say 10-15 hours per week. At this point, there's such a big enough issue backlog to fill several weeks of work. And once I find someone I like, I'll hire a designer to redesign the website and then have a developer spend a few weeks transitioning over to the new design. I can also have them work on web development tasks for the TinyPilot software itself if they're ever in need of hours.

The other hiring mistake for this job was weighing design skill too heavily. I wanted a developer whose design skills are better than mine (a fairly low bar). But I found that to be unrealistic. Maintaining the website requires a lot of grungy work, chasing down weird issues that only show up at certain screen sizes or on certain platforms. There are jack-of-all-trades developers who can design something amazing, write maintainable code, and chase down confusing issues, but it's easier to just look for a good developer and find a specialist designer later.

I started a promising trial hire this week, so here's hoping it works out.

## Getting unstuck on hardware development

The other dimension where I've felt perpetually stuck is in TinyPilot's hardware. For the first few months, I was rapidly iterating on TinyPilot's physical design. I created my first ever custom electrical component in XX days (TODO: link) and designed a 3D-printed case for it in parallel. And then in XX, I launched Voyager, which was a huge step forward for the product and the company as a whole.

For the last XX months, I feel like I've been spinning my wheels. There haven't been any significant improvements to TinyPilot's hardware or physical design since the Voyager.

The first factor is design work. The early work we did on TinyPilot was very small as far as electrical engineering projects go. As I progressed forward, I invested more into up-front design and customer research to verify that we were doing the right thing. So we have a few months with nothing to show for it, but we were doing useful design work.

Based on our design work, I felt like the best next step for TinyPilot would be to support power over Ethernet (PoE). There are off-the-shelf PoE adaptors for TinyPilot, but they don't provide reverse current protection, which TinyPilot needs. A year ago, building a custom PoE HAT would require a few days of PCB design work, $4/unit for PoE components, and a final PCB cost of $15-20.

Then, the [global chip shortage](https://en.wikipedia.org/wiki/2020%E2%80%9321_global_chip_shortage) hit. The widely available $4 components were sold out everywhere. Over a few weeks, I increased the price cap to $40/unit, then $60/unit, and the electrical engineers still couldn't find anything, despire checking vendors every day for weeks.

The last factor is a consequence of working with a small electrical engineering consultancy. The vendor I work with on TinyPilot's EE tasks has been a great partner, but they're a two-person shop that consults on the side on time of other jobs. They've had unexpectedly low availability for the last two months, so progress ground to a halt.

To try to get unstuck, I'm reaching out to larger electrical engineering firms. I had searched in the past but had trouble finding companies that matched my scale. If you just search for "electrical engineering consultant," the results are filled with companies that do multi-million dollar projects, which is obviously not a match for TinyPilot at this point.

By chance, I stumbled upon Raspberry Pi's [list of approved design partners](https://www.raspberrypi.org/for-industry/design-partners/), which turned out to be an excellent resource. The vendors all have experience with Raspberry Pi and cater to clients at my scale. I reached out to the three US-based firms on that list. Of the firms I contacted, Vendor A never responded, Vendor B declined my project after three weeks of back and forth, and Vendor C sent me a proposal.

I'm still debating whether to accept Vendor C's proposal, as I'm worried they don't really understand my project. I gave each vendor a detailed spec. When Vendor B declined, it was after they held several meetings internal meetings and finally concluded that they didn't have the supplier connections to source the components or enough experience with PoE. Vendor C said that neither of those things would be an issue, but I heard that from a sales rep, not from engineers.

Vendor C's proposal was extremely vague and buzzwordy to the point where I couldn't understand what they were offering to do. I asked them to revise it, and the new proposal isn't much better. They want $5k to do a 35-hour preliminary investigation and prepare a presentation outlining my options.

If my original EE firm had access to components they need, they could probably design the PCB and manage manufacture of an initial batch in 10-15 hours. 35 hours just to come up with a plan seems excessive. I asked what happens if their confidence is misplaced and they fail to identify vendors
who can supply the necessary components. They answered that I still have to pay the full amount, but that probably won't happen.

Writing that all out, I'm probably going to decline Vendor C and start over with some of the other vendors on Raspberry Pi's list of design partners.

## Starting EU distribution

I've had a strange relationship with people intersted in acting as overseas distributors for TinyPilot. I get an email every month or so from someone asking if I'll partner with them so that they can distribute TinyPilot in their country. And I always say, "Sure, can you tell me more about how you'd like that partnership to work?" And then I never hear from them again.

So, when I received an email a couple months ago from a German guy offering to distribute TinyPilot in the EU, I was skeptical. But unlike his predecessors, when I asked about his plans, he had lots of practical ideas, and he has experience in this space.

He had an intersting idea for negotiating a profit share. Because you're generally at a disadvantage to name a number first, he proposed the following scheme:

1. He writes a proposal
1. He encrypts the proposal in a password-protected zip file
1. I send him my proposal
1. He sends me the password to the zip file

It turned out that we were actually on opposite sides. His initial proposal gave me a 10% bigger share of the profits than my own initial proposal. So, we met in the middle and both felt like we're getting a good deal.

I'm excited about this partnership because it makes TinyPilot more appealing to users in the EU, who might otherwise be dissuaded by the high tariffs, slow shipping speed, and incompatible power adapter. It also means that marketing effort from either of us benefits both of us.

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                   | May 2021    | June 2021   | Change                                        |
| ------------------------ | ----------- | ----------- | --------------------------------------------- |
| Unique Visitors          | 49,085      | 49,839      | <font color="green">+754 (+2%)</font>         |
| Total Pageviews          | 108,862     | 122,700     | <font color="green">+13,838 (+13%)</font>     |
| Domain Rating (Ahrefs)   | 11.0        | 13.0        | <font color="green">+2.0 (+18%)</font>        |
| AdSense Revenue          | $466.84     | $536.85     | <font color="green">+$70.01 (+15%)</font>     |
| Amazon Affiliate Revenue | $138.99     | $134.59     | <font color="red">-$4.40 (-3%)</font>         |
| **Total Revenue**        | **$605.83** | **$671.44** | **<font color="green">+$65.61 (+11%)</font>** |

Is It Keto still hums along in the background. I'm impressed at how much it continues to earn this late in the year. In 2020, it had a big jump in revenue and then tumbled to 1/4 of that by April. Maybe that was more of a COVID effect than I realized. This year, there's still a noticeable drop after the New Year's dieters fade out, but it continues to generate more than 2/3 of January's revenue.

I did a small bit of work on the site this month to update Amazon affiliate links that had gone stale. Amazon products appear and disappear, so I have to regularly check the links to make sure they still point to available products.

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | May 2021    | June 2021   | Change                                       |
| ------------------------- | ----------- | ----------- | -------------------------------------------- |
| Unique Visitors           | 191         | 248         | <font color="green">+57 (+30%)</font>        |
| Gumroad Revenue           | $417.85     | $123.52     | <font color="red">-$294.33 (-70%)</font>     |
| **Total Revenue**         | **$417.85** | **$123.52** | **<font color="red">-$294.33 (-70%)</font>** |

Sales are dwindling for Hit the Front Page of Hacker news. There was a noticeable jump in visitors because my last retrospective *did* [hit the front page of Hacker News](https://news.ycombinator.com/item?id=27387978), but it didn't translate to many customers.

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | May 2021   | June 2021  | Change                                       |
| ----------------- | ---------- | ---------- | -------------------------------------------- |
| Unique Visitors   | 659        | 594        | <font color="red">-65 (-10%)</font>          |
| Total Pageviews   | 1,784      | 1,470      | <font color="red">-314 (-18%)</font>         |
| RapidAPI Revenue  | $32.85     | $40.20     | <font color="green">+$7.35 (+22%)</font>     |
| **Total Revenue** | **$32.85** | **$40.20** | **<font color="green">+$7.35 (+22%)</font>** |

Zestful continues on in maintenance mode. No news on that front.

## Wrap up

### What got done?

* Pre-sold my first TinyPilot Enterprise subscription.
  * A customer from a large company requested a REST API for TinyPilot. I asked if they'd be willing to pay a monthly fee for a version that included it, and they were happy to do so. I'm hoping to attract more Enterprise customers with features that cater to large-company scenarios.

### Lessons learned

*

### Goals for next month

* Transition EU sales to my partner distributor.
* Define processes that allow TinyPilot's local staff to work independently.
*
