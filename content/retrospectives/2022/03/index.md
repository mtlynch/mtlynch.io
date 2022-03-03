---
title: "TinyPilot: Month 20"
date: 2022-03-01T12:22:55-05:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Launch Voyager 2: PoE Edition

* **Result**: I finally [launched this](https://tinypilotkvm.com/blog/voyager-2-poe)
* **Grade**: A

Oh, boy. This took way longer than I expected. I looked back at the design document, and I wrote it in early April 2021, and we estimated that we'd have 200 units ready by May 15, 2021. In other words, I estimated six weeks, and it took 11 months.

### Hire a TinyPilot support engineer

* **Result**: XX
* **Grade**: A

TODO

### Complete design work on TinyPilot website overhaul

* **Result**: Deferred this until March
* **Grade**: N/A

The design firm I'm working with had too few hours to complete the design in February. I've negotiated guaranteed hours with them in March and April, so I expect to complete this by the end of the month.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | January 2022   | February 2022  | Change                                              |
| ------------------------ | -------------- | -------------- | --------------------------------------------------- |
| Unique Visitors          | 7,282          | 6,991          | <font color="red">-291 (-4%)</font>                 |
| Total Pageviews          | 15,477         | 14,916         | <font color="red">-561 (-4%)</font>                 |
| Sales Revenue            | $51,066.78     | $49,026.99     | <font color="red">-$2,039.79 (-4%)</font>           |
| Enterprise Subscriptions | $47.75         | $47.75         | 0                                                   |
| Royalties                | $5,075.00      | $3,552.41      | <font color="red">-$1,522.59 (-30%)</font>          |
| Total Revenue            | $56,189.53     | $52,627.15     | <font color="red">-$3,562.38 (-6%)</font>           |
| **Profit**               | **-$8,425.67** | **$27,039.62**\* | **<font color="green">+$35,465.29 (+inf%)</font>** |

\* Profit is just a rough estimate based on the delta in my cash holdings until I complete real bookkeeping for the month.

My profit is atypically high this month, but it's more a consequence of timing. I owe money to several vendors but it's just not due yet, and my business credit card finally increased my line of credit by $20k, so I'm holding more cash.

## Hiring a support engineer: the job posting

The vast majority of applications came from.

One of the problems with hiring is that, as a small business owner, I want to hire someone who understands what my company is and communicates that to me. But most companies treat candidates like garbage, and so they don't have any incentive to

What I'm trying to convey:

* The founder of the company is going to personally read each and every application. Your application isn't going to a robot or clueless recruiter who's blindly screening on keywords. If you put in effort, I'll put in effort.

I wasn't sure what to choose for pay.

## Hiring a support engineer: screening applications

If the writing was clear, they had relevant skills, and they wrote a unique note, I responded as soon as possible telling them specifics of what I liked about their application and asked if they'd be interested in proceeding to the sample questions.

If I was unsure, I queued the application for later.

If the candidate put in effort to write a unique note, but they didn't have experience or communication skills I wanted, I put them in a "pending rejection" folder. When I had free time, I wrote these candidates notes to thank them for applying but explained politely why they weren't a good fit.

If the candidate was a complete mismatch (e.g., someone who has no experience in IT or customer support and doesn't address the mismatch), I put them in the "instant reject" folder and didn't respond.

If the canddiate sent me a resume without any note or they send a clearly recycled note that has nothing specific about TinyPilot, I put them in the "instant reject" folder and didn't respond.

## Hiring a support engineer: screening applications



## Hiring a support engineer: training



## Hiring a support engineer: payment

I currently work with three freelance developers in different countries, and all of them receive payment in a different way. Adding a fourth, I thought I should start to standardize.

* Minimizes everyone's time dealing with invoicing and payments
* Manages compliance documentation
* Manages contract documents
* Makes it possible for contractors to record expenses
* Makes it easy for contractors to track their billable time without installing spyware

### Deel (winner)

I ended up choosing Deel, as they ticked all of my boxes. I'm only a week in, but we'll see how it goes.

I liked that they have time tracking built in, whereas Pilot left that as an exercise for the contractors. Deel also seems to be a lot more transparent than other providers in that the contractor has control of when to convert their currency and Deel shows the exact amount that will arrive in their bank account in the contractor's local currency. Other providers seem to just promise that they'll do their best in finding good conversion rates, but you only find out the final rate when you receive payment.

They're also planning to expand into payroll services for US-based employees. That would be great for me, as I've been unhappy with other payroll providers I've tried (Justworks and Gusto).

Deel costs $49/mo per contractor, which is pretty pricey, but I'm willing to pay if it frees up more of my time.

### Gusto

I'm already using Gusto as a payroll service for my local staff. It would be easy if I could use the same service to pay international contractors.

Unfortunately, Gusto only supports international contractors if they receive a fixed dollar amount each pay cycle. If your contractors work different hours each week, Gusto won't work.

### Pilot

Pilot is similar to Deel. They're both backed by Y Combinator, and they have a similarly slick UI.

I signed up for Pilot, and I was initially planning to use them, but they took an entire week to activate my account. In the meantime, I started looking at other providers, and another founder mentioned Deel to me, so I signed up for a demo and used Deel instead.

One other important difference for was that Pilot didn't offer tools to for time tracking. Contractors have to track their time in a separate tool, and then they manually copy their hours into Pilot when they want to create an invoice.

### Remote

This company offers free payments for contractors. Sounds great, right?

Free service was the dealbreaker for me.

If Remote can offer a service for free that others are charging $30-50/mo per employee, something is fishy. It might mean they're making money from me in some unexpected way, like they take a cut on all payments and they bury it in their currency conversion rate. Or it could mean that contractors are a use-case they don't care that much about, and they might suddenly drop it or change it, as we see Google do over and over with their free services.

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                   | January 2022 | February 2022 | Change                                       |
| ------------------------ | ------------ | ------------- | -------------------------------------------- |
| Unique Visitors          | 25,948       | 17,573        | <font color="red">-8,375 (-32%)</font>       |
| Total Pageviews          | 59,351       | 40,933        | <font color="red">-18,418 (-31%)</font>      |
| Domain Rating (Ahrefs)   | 14.0         | 15.0          | <font color="green">+1.0 (+7%)</font>        |
| AdSense Revenue          | $291.47      | $184.29       | <font color="red">-$107.18 (-37%)</font>     |
| Amazon Affiliate Revenue | $51.45       | $33.82        | <font color="red">-$17.63 (-34%)</font>      |
| **Total Revenue**        | **$342.92**  | **$218.11**   | **<font color="red">-$124.81 (-36%)</font>** |

Is It Keto continues to languish.

### [Hit the Front Page of Hacker News](https://hitthefrontpage.com/)

{{<revenue-graph project="htfp">}}

| Metric                    | January 2022 | February 2022 | Change                                       |
| ------------------------- | ------------ | ------------- | -------------------------------------------- |
| Unique Visitors           | 140          | 183           | <font color="green">+43 (+31%)</font>        |
| Gumroad Revenue           | $66.59       | $0.00         | <font color="red">-$66.59 (-100%)</font>     |
| Blogging for Devs Revenue | $0.00        | $0.00         | 0                                            |
| **Total Revenue**         | **$66.59**   | **$0.00**     | **<font color="red">-$66.59 (-100%)</font>** |

Oof, my first zero month.

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric            | January 2022 | February 2022 | Change                                       |
| ----------------- | ------------ | ------------- | -------------------------------------------- |
| Unique Visitors   | 564          | 535           | <font color="red">-29 (-5%)</font>           |
| Total Pageviews   | 1,514        | 1,275         | <font color="red">-239 (-16%)</font>         |
| RapidAPI Revenue  | $847.38      | $271.25       | <font color="red">-$576.13 (-68%)</font>     |
| **Total Revenue** | **$847.38**  | **$271.25**   | **<font color="red">-$576.13 (-68%)</font>** |

Zestful was having a nice run of near $1k monthly revenues, but it seems to be tailing off. I haven't been following it closely, but I'd guess that the spike was due to a few customers doing bulk processing around the same time.

## Wrap up

### What got done?

*

### Lessons learned

*

### Goals for next month

* Wrap up design overhaul of TinyPilot website
* Complete onboarding for TinyPilot's new support engineer
