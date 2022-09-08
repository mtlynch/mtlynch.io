---
title: "TinyPilot: Month 26"
date: 2022-09-07T10:34:15-04:00
description: I'm firing on all cylinders.
---

## Highlights

- TinyPilot had its all-time best month in terms of revenue, exceeding its previous record by 15%
-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Migrate TinyPilot Community and TinyPilot Pro to the next-generation update system

- **Result**: XX
- **Grade**: XX

TODO

### Finalize plans for managing TinyPilot licenses

- **Result**: XX
- **Grade**: XX

TODO

### Send TinyPilot Voyager to two YouTube creators or bloggers for review

- **Result**: XX
- **Grade**: XX

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | July 2022                                | August 2022                                 | Change                                             |
| ------------------------ | ---------------------------------------- | ------------------------------------------- | -------------------------------------------------- |
| Unique Visitors          | 21,242                                   | 11,903                                      | <font color="red">-9,339 (-44%)</font>             |
| Total Pageviews          | 33,578                                   | 23,214                                      | <font color="red">-10,364 (-31%)</font>            |
| Sales Revenue            | $56,954.66                               | $76,082.06                                  | <font color="green">+$19,127.40 (+34%)</font>      |
| Enterprise Subscriptions | $290.70                                  | $290.70                                     | 0                                                  |
| Royalties                | $2,513.71                                | $3,264.23                                   | <font color="green">+$750.52 (+30%)</font>         |
| Total Revenue            | $59,759.07                               | $79,636.99                                  | <font color="green">+$19,877.92 (+33%)</font>      |
| **Profit**               | **<font color="red">$-12,349.21</font>** | **<font color="green">$25,146.35</font>**\* | **<font color="green">+$37,495.56 (+inf%)</font>** |

\* Profit is just a naive estimate based on the delta of my cash holdings. I'll update this when I do real bookkeeping mid-month.

August was a record month in TinyPilot's revenue and profit. And again, it was another "boring" month in that nothing out of the ordinary happened, so it's looking promising that this level of sales is sustainable.

One factor that I think increased sales was lowering prices. I [reduced prices by 11%](/retrospectives/2022/08/#experimenting-more-with-tinypilot-pricing) at the end of August, and it looks like that increased sales by 34%.

## Handling a flood of applicants

I got _way_ more applications this time than [the last time I hired for a support engineer](/retrospectives/2022/03/#hiring-a-support-engineer-the-job-posting). Last time, I got 221 applicants in 30 days. This time, there were 577 applications in the first week.

I wanted to pause the listings while I caught up, but We Work Remotely annoyingly doesn't let you pause posts. You either delete them permanently and forfeit all the time you've paid for or you leave them running and attract more candidates than you can handle.

As a workaround, I left the job listings up, but I changed the location requirement from "Worldwide" to "US only." There's nothing about the role that strictly requires candidates to live in the US, but it was the best way I could think of to slow the flow of applications without totally taking down the post.

{{<img src="support-engineer-applicants.png" alt="Graph of applications per day" hasBorder="true" maxWidth="700px">}}

Adding a location requirement did slow down the rate of new applications by about half. Still, many applicants ignored the requirement. Before I added a location requirement, 82% of candidates were from outside the US. After I required US residency, only 58% of the candidates said they actually lived in the US.

I closed applications after two weeks, as I'd received 802 applications, and I knew I wouldn't be able to process all of them fast enough to give candidates timely responses.

There were a few factors that might explain the increase.

I think the biggest factor was that this time, candidates applied through **a structured web form**, whereas last time, I told people to just email me a resume and cover letter. I suspect people feel more comfortable filling out a structured form, so it encourages more people to apply.

I was curious whether the web form attracts more low-effort applications. Last time, 18% of candidates from We Work Remotely passed the resume screen, whereas this time it was XX%.

Another factor was that I posted the job to **two additional channels**: RemoteOK and Craigslist. Craigslist didn't seem to add many applicants, but RemoteOK added 127.

Lastly, **the global economy is worse** today than it was when I hired six months ago. There are more fears of a recession, and fewer companies are hiring, so I'd assume it's more of an employer's market than it was earlier in the year.

## Comparing remote work platforms for hiring

The two metrics I care about are absolute number of qualified candidates and percentage of qualified candidates. I want a platform that can deliver me about 10-20 qualified candidates per role, but if their signal-to-noise is so bad that I have to screen 3,000 people to find the ones who are qualified, it's not very valuable.

For the purposes of this evaluation, I consider everyone who passed the resume screening to be a qualified candidate. I'm also only considering the applications for the five days when the job was open worldwide. This is partly because changing the location requirement biases the responses, and partly because I haven't finished processing all the applications from after that date.

| Channel                                                      | Cost     | Total Candidates | Passed Initial Screen | Trial Hires |
| ------------------------------------------------------------ | -------- | ---------------- | --------------------- | ----------- |
| We Work Remotely                                             | $398     | 560              | XX (XX%)              | 0           |
| Remote OK                                                    | $448     | 127              | XX (XX%)              | 0           |
| Craigslist                                                   | $25      | 5                | XX (XX%)              | 0           |
| [Hacker News](https://news.ycombinator.com/item?id=32418196) | $0       | 5                | XX (XX%)              | 0           |
| Other aggregators                                            | $0       | 53               | XX (XX%)              | 0           |
| Unknown / applied directly\*                                 | $0       | 52               | XX (XX%)              | 1           |
| **Total**                                                    | **$871** | **XX**           | **XX (XX%)**          | **1**       |

\* The "Unknown" category includes candidates who applied through the link on the TinyPilot website, so it includes people who saw me post about it on Twitter or other places. The candidate who I hired found the post because he follows me on Twitter.

### We Work Remotely

One thing I disliked about We Work Remotely is that you can't suspend a job posting. XX weeks in, I tried to suspend my listing, so I clicked "Remove ad." I was expecting a prompt that would give me options to restore it during the time period I paid for, but nope. The ad disappeared immediately. No confirmation prompt, no undo button: gone. I emailed support and they restored it for me within a few hours, but it's still a pain.

Instead, I decided to just limit the applications to the United States. I can hire outside the US, but hiring within the US means that payments are a little easier, and the candidates are more likely to write well in English. But candidates can simply ignore the requirement, so many of the applicants I got after requiring US location were still outside the US.

### RemoteOK

RemoteOK is a one-person project started by Pieter Levels. I've been a fan of Pieter's for a long time from interviews he's given, but I'd never tried any of his products.

RemoteOK was, sadly, a huge letdown.

I can't recall the last time I've used a product where I feel like it's working against me. The most egregious example is that it adds text to your job listing without notifying you, and you can't turn it off.

### Hacker News

### Craigslist

## Reflections on Homerun

- Templated responses

I usually don't just send out templated messages, but it's good to have a few basic structures I can reuse.

Doesn't let you filter the candidate list based on their responses. For example, I'd love to filter for candidates who rate themselves as comfortable with Linux and reach out to them first, but there's no way to do that. You'd have to look at each candidate individually or dump the data to a spreadsheet, filter it there, then go back and forth between the spreadsheet and Homerun.

Email is a little wonky. The email view takes up the whole screen, so you can't refer to other details about the candidate when you email them. I worked around this by opening up Homerun in two side by side windows, but this is kind of silly for the user to have to do.

## How can I improve my hiring workflow?

### The hiring ecosystem is adversarial

The problem is that there are perverse incentives all around.

Employers have no incentive to treat rejected candidates well, so they ignore most candidates or reject them with an opaque form letter. Candidates don't want to invest a lot of time into an application that has a 95% chance of disappearing into the void, so they put less effort into each application. The employers see that most of the applications they receive are from candidates that put in minimal effort, so they put more mechanisms in place to automatically filter applications, and the cycle continues.

Employers also have no incentive to take down a job listing that they've paid for. You pay a price per month, so if you find a

When I post job applications, I try to break the race-to-the-bottom cycle by including this note:

> Michael Lynch, TinyPilot's founder reads every application personally.

> If you take the time to write thoughtful answers in your application, I'll send you an individualized note back, even if I decide not to move forward with your application.

### It takes longer than you think

You have to hire when you find someone, but then you still have other applicants.

The platform I use for internaional payments changed out from under me, so I could no longer use their built-in contract.

### Improvements for next time

- Hire someone to help me do the initial screening
  - I'll review my note to say a human reviews all applications rather than say it's me personally.
- Convert the application to a waitlist once I reach some reasonable limit of candidates (e.g., 400 candidates)
- Remember just how time-consuming it is to hire a new person.

Be more conservative in my responses. I'll respond if:

- The candidate is qualified for the role at a basic level
  - e.g., if one of the requirements is comfort with Linux and the candidate says they've never used Linux, no response
- The candidate has invested at least a few minutes into their application
  - e.g., if the responses are clearly copy/pasted or just dashed off: no response

At the beginning of the process, I was responding to candidates to tell them that . Some were appreciative of the feedback, but some of the candidates got rude or snippy. Some candidates saw that a human is actually engaging and then decided to invest time into their application, which left me in an awkward position.

## Side projects

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-
