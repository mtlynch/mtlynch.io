---
title: "TinyPilot: Month 26"
date: 2022-09-07T10:34:15-04:00
description: I'm firing on all cylinders.
---

## Highlights

- TinyPilot had its all-time best month, reaching nearly $80k in revenue and exceeding its previous record by 15%.
- The response rate to my job posting was 8x higher than when I listed the same job six months ago.
- I have lots of thoughts about hiring people.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Migrate TinyPilot Community and TinyPilot Pro to the next-generation update system

- **Result**: We migrated TinyPilot Community, but TinyPilot Pro is not yet ready.
- **Grade**: C+

We've been working on overhauling TinyPilot's update system since May, and it's taking way longer than any of us expected. I had let a lot of technical debt accrue in our update system, and we're reducing that debt by untangling it, but it also means that we keep encountering surprises that eat up a week or more of dev time. I am pretty confident that we're down to the last few weeks now.

### Finalize plans for managing TinyPilot licenses

- **Result**: Plans are finalized.
- **Grade**: A

We've finalized a plan for managing TinyPilot licenses, and I think everyone involved is happy with the balance of making it a good user experience while not overinvesting engineering effort into a complex system.

### Send TinyPilot Voyager to two YouTube creators or bloggers for review

- **Result**: I was too busy with hiring to get to this.
- **Grade**: F

I really should have made hiring a new Support Engineer one of my goals instead because that's what I spent most of the month doing.

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

## Hiring a second support engineer

In February, I hired [TinyPilot's first Support Engineer](/retrospectives/2022/03/#hiring-a-support-engineer-the-job-posting). Before that, TinyPilot's fulfillment staff were already handling customer support, but I was still the only person responsible for technical questions.

Bringing on a support engineer was a huge help and made a big difference in freeing up my time and getting faster responses to customers. But it was also the hardest role I've had to hire for. There's so much institutional knowledge about TinyPilot that I didn't realize was siloed in my head, so it was a lot of work to transfer it to someone else.

Given how much value I got from having a support engineer, I felt the pain more acutely when he wasn't available and tech support fell back to me. And often, there was so much short-term work in answering support tickets that TinyPilot's support engineer didn't have time to do proactive work in adding documentation or experimenting with new use-cases for TinyPilot.

The dev team has two people, the fulfillment team has two people, and both of those teams work well. When one person is sick or on vacation, there's enough capacity that their counterpart can keep things moving forward. I decided it was time to add a second support engineer.

## Handling 8x the applicant pool

Last time I posted the support engineer job, I got 221 applicants in 30 days. This time, there were 802 applications in only two weeks. There were so many applicants that I had to do things to actively reduce the number of applicants, and I eventually closed applications entirely after two weeks.

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

## Comparing channels for advertising remote jobs

The two metrics I care about are absolute number of qualified candidates and percentage of qualified candidates. I want a platform that can deliver me about 10-20 qualified candidates per role, but if their signal-to-noise is so bad that I have to screen 3,000 people to find the ones who are qualified, it's not very valuable.

For the purposes of this evaluation, I consider everyone who passed the resume screening to be a qualified candidate. I'm also only considering the applications for the five days when the job was open worldwide. This is partly because changing the location requirement biases the responses, and partly because I haven't finished processing all the applications from after that date.

| Channel                                                      | Cost     | Total Candidates | Passed Initial Screen | Cost per Qualified Candidate | Trial Hires |
| ------------------------------------------------------------ | -------- | ---------------- | --------------------- | ---------------------------- | ----------- |
| We Work Remotely                                             | $398     | 560              | XX (XX%)              | $XX                          | 0           |
| Remote OK                                                    | $448     | 127              | XX (XX%)              | $XX                          | 0           |
| Craigslist                                                   | $25      | 5                | XX (XX%)              | $XX                          | 0           |
| [Hacker News](https://news.ycombinator.com/item?id=32418196) | $0       | 5                | XX (XX%)              | $0                           | 0           |
| Other aggregators                                            | $0       | 53               | XX (XX%)              | $0                           | 0           |
| Unknown / applied directly\*                                 | $0       | 52               | XX (XX%)              | $0                           | 1           |
| **Total**                                                    | **$871** | **XX**           | **XX (XX%)**          | **$XX**                      | **1**       |

\* The "Unknown" category includes candidates who applied through the link on the TinyPilot website, so it includes people who saw me post about it on Twitter or other places. My final hire found the job from [my tweet](https://twitter.com/deliberatecoder/status/1557385358576418817).

## RemoteOK is hugely disappointing

RemoteOK is a business started by Pieter Levels. I've been a fan of Pieter's for a long time from interviews he's given. If you've never heard [his interview on Indie Hackers](https://www.indiehackers.com/podcast/043-pieter-levels-of-nomad-list), it's one of the best episodes of the series and offers a fantastic insights into the SaaS bootstrapper lifestyle.

Unfortunately, RemoteOK was a huge letdown.

Right off the bat, when you create the job post, RemoteOK pushes all these little upsells onto you. We Work Remotely does something similar, but it doesn't feel as gross. Maybe it's because We Work Remotely isn't charging you $134 to create a QR code for you.

but I'd never tried any of his products.

RemoteOK was, sadly, a huge letdown.

I can't recall the last time I've used a product where I feel like it's working against me. The most egregious example is that it adds text to your job listing without notifying you, and you can't turn it off.

{{<gallery caption="RemoteOK injects additional instructions to your candidates that are not visible to you. You [can't disable this behavior](https://twitter.com/deliberatecoder/status/1557394573189595137).">}}
{{<img src="employer-view.png" hasBorder="true" alt="Employer view contains instructions I wrote">}}
{{<img src="candidate-view.png" hasBorder="true" alt="Applicant view contains extra text: Please mention the word EMINENCE when applying to show you read the job post completely.">}}
{{</gallery>}}

I hate, hate, HATE this feature. I wouldn't have listed my job on RemoteOK at all if I'd known about this. I hate seeing this kind of thing in job postings, and I definitely don't want it in mine. The fact that RemoteOK surreptitiously injects it into my ad is incredibly irritating.

Including the key word didn't correlate with quality, and the most noticeable effect was just that I kept getting duplicate applications from people who said they forgot to include the key word.

## Homerun is good, not great

Overall, I liked Homerun. They had a nice UI, and it did everything I needed. It was a huge step up from my previous system of just having candidates email me, and then I tried to organize everything with inbox labels.

The UX is overall very intuititive. It made it easy to process applications in an organized way.

I really liked their email template feature. I didn't send candidates form letters, but it was helpful having a skeleton structure in place for common responses like:

- You don't have enough Linux experience
- Your English isn't at the level the role requires
- You're a great candidate, let's move to the sample questions

The price is $71/mo, which I feel like is well within the affordable range for most small businesses. And billing is fair in that you don't have to pay for months when you're not hiring. Most [other applicant tracking platforms](/notes/bootstrapper-ats/) require you to keep paying a monthly fee or they delete all of your data. Homerun allows you to downgrade to the free plan when you're not actively hiring, and they hold all of your data for you. The only restriction is that you can't accept new applicants until you begin paying again.

You can't include attachments in templates.

- Templated responses

I usually don't just send out templated messages, but it's good to have a few basic structures I can reuse.

Doesn't let you filter the candidate list based on their responses. For example, I'd love to filter for candidates who rate themselves as comfortable with Linux and reach out to them first, but there's no way to do that. You'd have to look at each candidate individually or dump the data to a spreadsheet, filter it there, then go back and forth between the spreadsheet and Homerun.

Email is a little wonky. The email view takes up the whole screen, so you can't refer to other details about the candidate when you email them. I worked around this by opening up Homerun in two side by side windows, but this is kind of silly for the user to have to do.

Poor email deliverability. I had several candidates tell me that they didn't receive emails I sent through Homerun when the emails included links.

It's very slow. Every page takes 2-10 seconds to load on my modern desktop with fiber Internet.

## Pausing hiring on various platforms

One thing I disliked about We Work Remotely is that you can't suspend a job posting. XX weeks in, I tried to suspend my listing, so I clicked "Remove ad." I was expecting a prompt that would give me options to restore it during the time period I paid for, but nope. The ad disappeared immediately. No confirmation prompt, no undo button: gone. I emailed support and they restored it for me within a few hours, but it's still a pain.

Instead, I decided to just limit the applications to the United States. I can hire outside the US, but hiring within the US means that payments are a little easier, and the candidates are more likely to write well in English. But candidates can simply ignore the requirement, so many of the applicants I got after requiring US location were still outside the US.

## Trying to make the hiring ecosystem less adversarial

The problem is that there are perverse incentives all around.

Employers have no incentive to treat rejected candidates well, so they ignore most candidates or reject them with an opaque form letter. Candidates don't want to invest a lot of time into an application that has a 95% chance of disappearing into the void, so they put less effort into each application. The employers see that most of the applications they receive are from candidates that put in minimal effort, so they put more mechanisms in place to automatically filter applications, and the cycle continues.

Employers also have no incentive to take down a job listing that they've paid for. You pay a price per month, so if you find a

When I post job applications, I try to break the race-to-the-bottom cycle by including this note:

> Michael Lynch, TinyPilot's founder reads every application personally.

> If you take the time to write thoughtful answers in your application, I'll send you an individualized note back, even if I decide not to move forward with your application.

## Hiring takes longer than you think

When I think about hiring someone, my naive mental is always kind of like this:

That is, I get a bunch of applicants, spend a lot of time up front screening and interviewing them, then I filter down to the top candidates, hire one, and then they take over some of my responsibilities.

You have to hire when you find someone, but then you still have other applicants.

The platform I use for internaional payments changed out from under me, so I could no longer use their built-in contract.

## Improvements for my next hire

### Hire someone to help me do the initial screening

Processing the applications takes dozens of hours, but it's a task I could train an intelligent person to do in about an hour. I don't want to use dumb automated filters or AI, as I still want to be able to tell candidates a real human is reading their application, but it doesn't strictly have to be me.

### Convert the application to a waitlist once I reach some limit

(e.g., 400 candidates)

### Remember how time-consuming it is

### Be more conservative in sending responses

I'll respond if:

- The candidate is qualified for the role at a basic level
  - e.g., if one of the requirements is comfort with Linux and the candidate says they've never used Linux, no response
- The candidate has invested at least a few minutes into their application
  - e.g., if the responses are clearly copy/pasted or just dashed off: no response

At the beginning of the process, I was responding to candidates to tell them that . Some were appreciative of the feedback, but some of the candidates got rude or snippy. Some candidates saw that a human is actually engaging and then decided to invest time into their application, which left me in an awkward position.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

- Migrate TinyPilot Pro to the next-generation update system.
