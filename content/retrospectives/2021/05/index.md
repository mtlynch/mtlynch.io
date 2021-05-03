---
title: "TinyPilot: Month 10"
date: 2021-05-03T08:35:13-04:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Increase TinyPilot revenue to $30k

* **Result**: XX
* **Grade**: XX

TODO

### Produce a prototype for a custom TinyPilot PoE HAT

* **Result**: XX
* **Grade**: XX

TODO

### Create an outline for my book, [*Refactoring English*](https://refactoringenglish.com)

* **Result**: XX
* **Grade**: XX

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric           | March 2021 | April 2021    | Change                                       |
| ---------------- | ---------- | ------------- | -------------------------------------------- |
| Unique Visitors  | 5,805      | 5,880         | <font color="green">+75 (+1%)</font>         |
| Total Pageviews  | 9,762      | 10,483        | <font color="green">+721 (+7%)</font>        |
| Sales Revenue    | $19,782.96 | $28,880.65    | <font color="green">+$9,097.69 (+46%)</font> |
| Donations        | $19.92     | $0.00         | <font color="red">-$19.92 (-100%)</font>     |
| Total Revenue    | $19,802.30 | $28,880.65    | <font color="green">+$9,078.35 (+46%)</font> |
| **Total Profit**\* | *not calculated*    | **$2,146.50** | **N/A**                                      |

\* It's hard for me to calculate profit quickly in a meaningful way because I do bookkeeping mid-month when all my bank statements come in. The number above is a naive calculation based on change in cash in my checking account over the month, though it doesn't take into account outstanding debt.

## TinyPilot's new office: the fun stuff

Another part of the new office that I didn't expect to enjoy so much was choosing

* Router: XX with OPNSense
  * I like the EdgeRouter 4 I have at home, but Ubiquiti's been going downhill (TODO: link) and pfSense seems to be lying about being open source (TODO: link)
* Wireless access point: Ruckus R310
* Door lock: Yale XX
* File Server: HP DL380 G7
  * I was going to go with a G8, but I've read that that G7 series is supposed to be quieter
  * I'm mainly buying this so I can try playing with a server rack for the first time
* Paper Printer: Brother
* Shipping Label Printer: XX

To access my machines remotely, I installed Tailscale on an old Raspberry Pi 3 I had lying around. Then, I installed Tailscale on my home desktop, so the two are joined over Tailscale's virtual network whenever both machines have Internet.

So, if I want to manage the office print server (`franklin`, another spare Pi), I just do this:

```bash

```

And voila, I can access `franklin`'s web interface.

If I need to access the router, I do this:

```bash

```

Tada! I can access my router's management dashboard.

Apparently, OPNSense has a plugin that allows Tailscale directly on the router, which allows me to access different office machines easily. For now, I'm sticking with this, because I understand what's happening clearly, whereas I find it hard to reason about what's happening when I combina OPNSense and Tailscale.

## TinyPilot's new office: the annoying stuff

I'm hiring part-time employees.

My landlord also required me to get liability insurance. Industries not as modern. When you fill out their web form, they have business categories like "Retail store - Beverages (cold)" and "Retail store - Beverages (hot)" but for "computers" the only matches are "Computer Repair Consulting."

TinyPilot is in this annoying no-man's land between a manufacturing plant and an office where everyone only uses computers and does no manual labor, so insurers want to treat me as a factory.

JustWorks is pretty annoying.

* The on-boarding process involved seven different people contacting me who seemed to not be communicating with each other and asking the same questions repeatedly.
* They obscure the fact that they require you to use their provider for Worker's Comp insurance, which is a significant hidden fee.
* Their Worker's Comp insurance provider classified my job as [warehouse worker](https://www.wcribma.org/mass/ToolsAndServices/MACI/Results.aspx?class=8018), so I'm the same risk pool as people who operate forklifts and work with packages weighing hundreds of pounds. When I tried to correct it, they just kept insisting that they assigned me the correct code and refuse to provide details.
* They by default send you a poster of labor laws and then charge you $50. It's opt-out rather than opt-in, and they don't give you an easy way to opt-out except by emailing your request. The government provides these posters [for free](https://www.mass.gov/service-details/massachusetts-workplace-poster-requirements) (albeit not conveniently), and it feels very nickel-and-dimey to charge me extra for this thing that probably costs them $0.50 when I'm already paying them $150/month.
* They've given me PDFs where JustWorks sections are pre-filled and my sections are not, even though they could have easily pre-populated the PDF with information I'd already provided.

I worked with a lawyer for the first time for a business purpose. I was inspired by re-watching XX's famous talk, "F--- you, pay me." His advice is for consultants and contractors, but his message is that you should have a lawyer review all busin contracts because you give up a tremendous amount of power in letting the other party define all terms of a contract. That was slow, but it was actually pretty fun. He was able to tell me

## Being more strategic about promotion

Will Yarborough was one of the first YouTubers to review TinyPilot. He showcased the TinyPilot Voyager on his channel SpaceRex, and I was interested in collaborating with him to make more videos showing interesting use-cases for a TinyPilot.

We did a video call together a few weeks ago to brainstorm ideas. We were having trouble coming up with something that's both a compelling use-case for TinyPilot and would make an entertaining video. Then, Will suggested the idea of DSLRs

When I sat down to implement it, I realized this was more complicated than I expected. First, it's not a matter of adding a button, because half of TinyPilot's functionality makes no sense on a digital camera. You can't forward keystrokes or mouse clicks to a DSLR, so it made no sense to have an app that did both.

All told, it took about six hours. That doesn't sound like a lot, but I don't get very much time to do development work. TinyPilot now has a lot of moving parts, so I'm happy if I get 60-90 minutes per day to write code. In other words, this project was about a week of my coding time.

{{< youtube YUQ9VVuMOZs >}}

And this is nothing against Will's work. The video is what we discussed.

Here are the stats as of this writing:

| Metric       | XX |
|---------------|----|
| YouTube views | XX |
| Mailing list signups | XX |
| Conversion rate | XX% |

After the video came out, I wondered whether anyone else had already done this. I should have asked myself that *before* committing to the video. It turns out that products like this did exist already with several years of head start on me. One company even holds [a patent](https://patents.google.com/patent/US9712688B2/en) claiming they invented the idea of controlling a camera over the network, so they could potentially sue me if I created a competing product.

One decision I'm glad I got right with was keeping all the code in a separate, experimental branch. Initially, I thought it was a small enough change that I could add it as a feature to the official TinyPilot software. Thank goodness I didn't because that would have introduced a ton of complexity to the code and cluttered the UI with a feature that 99% of my current users wouldn't want.

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                   | March 2021  | April 2021  | Change                                       |
| ------------------------ | ----------- | ----------- | -------------------------------------------- |
| Unique Visitors          | 63,493      | 56,094      | <font color="red">-7,399 (-12%)</font>       |
| Total Pageviews          | 141,199     | 123,723     | <font color="red">-17,476 (-12%)</font>      |
| Domain Rating (Ahrefs)   | 11.0        | 11.0        | 0                                            |
| AdSense Revenue          | $611.99     | $560.20     | <font color="red">-$51.79 (-8%)</font>       |
| Amazon Affiliate Revenue | $337.29     | $116.78     | <font color="red">-$220.51 (-65%)</font>     |
| **Total Revenue**        | **$949.28** | **$676.98** | **<font color="red">-$272.30 (-29%)</font>** |

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | March 2021  | April 2021  | Change                                       |
| ------------------------- | ----------- | ----------- | -------------------------------------------- |
| Unique Visitors           | 185         | 114         | <font color="red">-71 (-38%)</font>          |
| Gumroad Revenue           | $313.63     | $341.61     | <font color="green">+$27.98 (+9%)</font>     |
| Blogging for Devs Revenue | $655.20     | $109.20     | <font color="red">-$546.00 (-83%)</font>     |
| **Total Revenue**         | **$968.83** | **$450.81** | **<font color="red">-$518.02 (-53%)</font>** |

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | March 2021 | April 2021 | Change                                        |
| ----------------- | ---------- | ---------- | --------------------------------------------- |
| Unique Visitors   | 480        | 892        | <font color="green">+412 (+86%)</font>        |
| Total Pageviews   | 1,367      | 2,132      | <font color="green">+765 (+56%)</font>        |
| RapidAPI Revenue  | $21.97     | $40.82     | <font color="green">+$18.85 (+86%)</font>     |
| **Total Revenue** | **$21.97** | **$40.82** | **<font color="green">+$18.85 (+86%)</font>** |

## Wrap up

### What got done?

* Published the blog post, ["How Litestream Eliminated My Database Server for $0.03/month"](https://mtlynch.io/litestream/)
* Reached code complete on TinyPilot 1.5.0, adding virtual storage and support for tuning the video stream

### Lessons learned

* Never commit to a feature request during a live discussion
  * Even if it seems small, it's probably more complicated than it seems.
  * I need more time to think over whether the work is worth the effort.

### Goals for next month

* Increase TinyPilot revenue to $33k
