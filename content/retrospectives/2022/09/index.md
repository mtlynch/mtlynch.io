---
title: "TinyPilot: Month 26"
date: 2022-09-13T00:00:00-04:00
description: The surprising difficulty of hiring.
images:
  - /retrospectives/2022/09/support-engineer-applicants.png
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer, and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $60-80k/month in revenue and employs six other people.

Every month, I publish a retrospective like this one to share how things are going with my business and in my professional life overall.
{{</notice>}}

## Highlights

- TinyPilot had its all-time best month, reaching nearly $80k in revenue and exceeding its previous record by 15%.
- The response rate to my job posting was 8x higher than when I listed the same job six months ago.
- I have lots of thoughts about hiring people.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Migrate TinyPilot Community and TinyPilot Pro to the next-generation update system

- **Result**: We migrated TinyPilot Community, but TinyPilot Pro is not yet ready.
- **Grade**: C+

We've been working on overhauling TinyPilot's update system since May, and it's taking way longer than any of us expected.

Over the first two years, I accrued a lot of technical debt in TinyPilot's update system. We're paying it down now, but it also means that we keep encountering surprises that eat up a week or more of dev time. I'm pretty confident that we're down to the last few weeks now.

### Finalize plans for managing TinyPilot licenses

- **Result**: Plans are finalized.
- **Grade**: A

We've finalized a plan for managing TinyPilot licenses, and I think everyone involved is happy with the plan. It offers a smooth user experience while not overinvesting engineering effort into a complex system.

### Send TinyPilot Voyager to two YouTube creators or bloggers for review

- **Result**: I was too busy with hiring to get to this.
- **Grade**: F

I didn't make any progress here. I really should have made hiring a new Support Engineer one of my goals instead because that's what I spent most of the month doing.

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

August was a record month in TinyPilot's revenue and profit. I [reduced prices by 11%](/retrospectives/2022/08/#experimenting-more-with-tinypilot-pricing) at the end of August, and it looks like that increased sales by 34%. And again, it was another "boring" month in that no external events drove these numbers, so I'm optimistic about sustaining this level of sales.

The reason I was able to reduce prices was that I finally have a healthy supply of circuit boards. The chip shortage forced us into an eight-month redesign to replace a component that was no longer available, so I had to keep prices higher to avoid selling out our limited stock. Now that we can continue making new chips, I have more flexibility in price and control over how quickly we sell.

## Hiring a second support engineer

In February, I [hired TinyPilot's first Support Engineer](/retrospectives/2022/03/#hiring-a-support-engineer-the-job-posting). Before that, TinyPilot's fulfillment staff were already handling customer support, but I was still the only person responsible for technical questions.

Bringing on a support engineer freed up a lot of my time and resulted in faster responses to customers. But it was also the hardest role I've had to hire for. There's so much institutional knowledge about TinyPilot that I didn't realize was siloed in my head, so it was a lot of work to transfer it to someone else.

Given how much value I got from having a support engineer, I felt the pain acutely when he wasn't available. We also found ourselves with so much short-term work in answering support tickets that TinyPilot's support engineer didn't have time to do proactive work in adding documentation or experimenting with new use cases for TinyPilot.

The dev team has two people, the fulfillment team has two people, and both of those teams work well. When one person is sick or on vacation, there's enough capacity that their counterpart can keep things moving forward. I decided it was time to add a second support engineer.

## Handling 8x the applicant rate

Last time I posted the support engineer job, I [received 221 applicants in 30 days](/retrospectives/2022/03/#hiring-a-support-engineer-the-job-posting). This time, there were 802 applications in only two weeks. There were so many applicants that I had to do things to actively reduce the number of applicants, and I eventually closed applications entirely after two weeks.

I wanted to pause the listings while I caught up, but We Work Remotely, annoyingly, doesn't let you pause posts. You either delete them permanently and forfeit all the time you've paid for, or you leave them running and attract more candidates than you can handle.

As a workaround, I left the job listings up, but I changed the location requirement from "Worldwide" to "US only." There's nothing about the role that strictly requires candidates to live in the US, but it was the best way I could think of to slow the flow of applications without totally taking down the post.

{{<img src="support-engineer-applicants.png" alt="Graph of applications per day" hasBorder="true" maxWidth="700px">}}

Adding a location requirement did slow down the rate of new applications by about half. Still, many applicants ignored the requirement. Before I added a location requirement, 82% of candidates were from outside the US. After I required US residency, only 58% of the candidates said they actually lived in the US.

I closed applications after two weeks, as I'd received 802 applications, and I knew I wouldn't be able to process all of them fast enough to give candidates timely responses.

Why so many more applicants this time? Here are my guesses:

### Structured web forms are less intimidating than email

I think the biggest factor was that candidates applied through a web form. Last time, I told people to just email me a resume and cover letter. I suspect people feel more comfortable filling out a structured form, so it encourages more people to apply.

The downside is that the ease of the web form seems to attract more low-effort applicants. Last time, 18% of We Work Remotely applicants were strong enough to pass the initial resume screen. This time, only 6% passed.

### More hiring channels means more candidates

I posted the job to two additional channels: RemoteOK and Craigslist. Craigslist didn't seem to add many applicants, but RemoteOK added 127 over two weeks.

### A declining economy means more job-seekers

Lastly, the global economy is worse today than it was when I hired six months ago. There are more fears of a recession, and fewer companies are hiring. I'd assume it's more of an employer's market than it was earlier in the year.

## Comparing channels for advertising remote jobs

Through this process, I found that different hiring channels had drastically different returns on investment.

The two metrics I care about are absolute number of qualified candidates and percentage of qualified candidates. I want a platform that can deliver me about 10-20 qualified candidates per role so that I have a decent pool of options to choose from. If the platform's signal-to-noise is so bad that I have to screen 3,000 people to find a handful who are qualified, it's not very valuable.

For the purposes of this evaluation, I consider everyone who passed the resume screening to be a qualified candidate. I'm also only considering the applications for the five days when the job was open worldwide. This is partly because changing the location requirement biases the responses, and partly because I haven't finished processing all the applications from after that date.

| Channel                                                      | Cost     | Total Candidates | Passed Initial Screen | Cost per Qualified Candidate | Trial Hires |
| ------------------------------------------------------------ | -------- | ---------------- | --------------------- | ---------------------------- | ----------- |
| We Work Remotely                                             | $398     | 359              | 20 (6%)               | $20                          | 0           |
| Remote OK                                                    | $448     | 67               | 0 (0%)                | N/A                          | 0           |
| Craigslist                                                   | $25      | 3                | 1 (33%)               | $25                          | 0           |
| [Hacker News](https://news.ycombinator.com/item?id=32418196) | $0       | 2                | 0 (0%)                | N/A                          | 0           |
| Other aggregators                                            | $0       | 53               | 1 (8%)                | $0                           | 0           |
| Unknown / applied directly\*                                 | $0       | 52               | 3 (15%)               | $0                           | 1           |
| **Total**                                                    | **$871** | **464**          | **25 (5%)**           | **$35**                      | **1**       |

\* The "Unknown" category includes candidates who applied through the link on the TinyPilot website, so it includes people who saw me post about it on Twitter or other places. My final hire found the job from [my tweet](https://twitter.com/deliberatecoder/status/1557385358576418817).

We Work Remotely performed pretty well. It has its share of low-effort and spammy applicants, but finding 20 candidates out of 359 is a pretty good ratio.

RemoteOK had no qualified candidates in this time range, and my experience using it was so bad that it deserves its own section.

## RemoteOK is hugely disappointing

I've been a fan of [Pieter Levels](https://levels.io/) for a long time. [His interview on Indie Hackers](https://www.indiehackers.com/podcast/043-pieter-levels-of-nomad-list), is one of the best episodes of the series. Pieter does a great job of highlighting what makes the bootstrapper lifestyle freeing and exciting.

Unfortunately, RemoteOK, Pieter's flagship business, was a huge letdown. I can't recall the last time I've used a product that feels like it's fighting so stubbornly against me.

Right off the bat, when you create the job post, RemoteOK pushes all these little upsells on you. We Work Remotely does something similar, but it doesn't feel as gross. Maybe it's because We Work Remotely isn't charging $134 to create a QR code for you.

{{<img src="remoteok-upsells.png" hasBorder="true" alt="Screenshot of upsells on Remote OK" maxWidth="700px" caption="RemoteOK pushes employers to choose among nine different upsells, including $134 to generate a QR code.">}}

RemoteOK jobs have tags to help applicants search, so I added tags like `linux`, `customer support`, `flexible schedule`. When I came back to the job a few hours later, I saw that RemoteOK had automatically added several inaccurate tags like `microsoft` `windows` `webdev` `development` even though those have nothing to do with my job. I erased RemoteOK's tags, but a few hours later, they were back. The only way I could get rid of them permanently is by adding more tags myself.

The most egregious example of RemoteOK taking control away from the user is the magic keywords feature. RemoteOK adds the instruction, "Please mention the word \[_some random word_\] when applying to show you read the job post completely." RemoteOK doesn't tell you that it's adding these instructions, and you can't remove them.

{{<gallery caption="RemoteOK injects additional instructions to your candidates that are not visible to you. You [can't disable this behavior](https://twitter.com/deliberatecoder/status/1557394573189595137).">}}
{{<img src="employer-view.png" hasBorder="true" alt="Employer view contains instructions I wrote">}}
{{<img src="candidate-view.png" hasBorder="true" alt="Applicant view contains extra text: Please mention the word EMINENCE when applying to show you read the job post completely.">}}
{{</gallery>}}

I hate, hate, HATE this feature. I wouldn't have listed my job on RemoteOK at all if I'd known about this. I find these "magic keyword" requirements insulting to applicants, and I deliberately avoid anything like that when advertising my job. The fact that RemoteOK surreptitiously injects it into my ad is incredibly irritating.

Most damning of all, RemoteOK failed entirely in the main thing it's supposed to do: deliver qualified candidates. None of RemoteOK's candidates passed my initial application screen, while We Work Remotely matched me with 20 qualified applicants during the same time period.

## Homerun is good, not great

Last time I hired, I directed candidates to just email me, and then I organized everything by inbox labels. That ended up being a hassle, so this time around, I [tried several applicant tracking systems](/notes/bootstrapper-ats/), eventually settling on [Homerun](https://homerun.co).

Overall, I liked Homerun. The UI is pretty, and it did everything I needed. Everything felt fairly intuititive, so it was easy to process applications in an organized way.

{{<gallery caption="Last time I organized applicants in my email using inbox labels (left). This time, I used Homerun, which has better organization with a Kanban view of applications (right).">}}
{{<img src="email-labels.png" hasBorder="true" alt="Screenshot of inbox labels in Fastmail">}}
{{<img src="homerun-kanban.png" hasBorder="true" alt="Homerun sorts applications in a kanban view of hiring stages" maxWidth="600px">}}
{{</gallery>}}

I really liked Homerun's templated email feature. I didn't send candidates form letters, but it was helpful having a skeleton structure in place for common responses like:

- You don't have enough Linux experience
- Your English isn't at the level the role requires
- You're a great candidate, let's move to the sample questions

{{<img src="poor-english-rejection.png" hasBorder="true" alt="Hi [first_name], Thanks for applying for the [job_title] opening at [company_name] and for taking the time to learn more about the company. Unfortunately, I don't think this position would be a good match for your skills. This position requires someone more with more experience writing customer-facing content. Your English is pretty strong, but there were several syntax errors in your application, so I don't think this role would be a good fit. I'm sorry it didn't work out, but I wish you the best of luck in your search." maxWidth="700px">}}

Homerun costs $71/mo, which is within the affordable range for most small businesses. And billing is fair in that you don't have to pay for months when you're not hiring. Most [other applicant tracking platforms](/notes/bootstrapper-ats/) delete all of your data if you stop paying the full monthly fee. Homerun allows you to downgrade to the free plan when you're not actively hiring, which preserves all of your data. The only restriction under the free tier is that you can't accept new applicants until you begin paying again.

### Can't filter candidates

With such a high volume of candidates, I wanted a way to reach out early to the most promising candidates. I'd love to filter down to candidates who live in an English-speaking country and rate themselves highly in Linux. Homerun has this information as structured data, but they don't offer a way of filtering the applicant view by any criteria like this. The only way to find these applicants is by scanning each person one-by-one.

### Bad email UX

One of the Homerun's worst UI decisions is how their email works. Like all applicant tracking systems, Homerun lets you email candidates from within the web app. But it does this by popping up a modal window:

{{<img src="modal-email.png" hasBorder="true" alt="Screenshot of modal window in Homerun blocking all relevant information about the candidate" maxWidth="800px" caption="Homerun's in-app email creates a modal window that prevents you from referring to the candidate's application while you email them.">}}

The modal window completely blocks everything the candidate wrote in the application, so you can't refer to any of your notes or their answers. This is a terrible choice, as employers obviously need to refer to information about the candidate to write the email.

I worked around this by keeping Homerun open in two side-by-side windows. This worked okay, but Homerun doesn't sync well across browser windows. If I marked a candidate as rejected in one window, the other window would get confused and reload from the top of the applicant list.

### Poor email deliverability

I sent candidates my sample assignment as a link to a PDF, but several candidates told me they didn't receive it. I suspect that Homerun uses email servers with weak sender reputations, so spam filters are blocking Homerun emails that include links.

### Slow web app

The Homerun web app is very slow. I have a modern desktop with fiber internet, but most Homerun pages take 2-5 seconds to load. Some take as long as 10 seconds.

## Improvements for my next hire

I'm dissatisfied with how I treated candidates this round of hiring. I wasn't prepared for the volume of applications, and I wasted applicants' time by accepting more applications than I could process within a reasonable timeframe.

Here are some changes I plan to make next time to improve the hiring experience for everyone.

### Be more conservative in sending responses

When I first started processing applications with Homerun, I got overeager about its email templates. My last hiring round, if a candidate sent a low-effort application, I just ignored them. With Homerun, the email templates made it easy to respond even to people who put in low effort.

I made an template that basically said, "Thanks for applying, but I'm declining because there's nothing specific to TinyPilot in your answers." I figured it was good to at least give feedback that copy/pasting applications is losing them jobs.

{{<img src="low-effort-rejection.png" hasBorder="true" alt="Hi [first_name], Thanks for applying for the [job_title] opening at TinyPilot. Unfortunately, I've decided not to move forward with your application. I read the answers to the questions you submitted, and it didn't seem like there was anything specific about the company or work that appealed to you, so I don't think this would be a good match. Sorry that it didn't work out, but I wish you luck in your job search." maxWidth="800px" caption="My form-letter response for candidates who applied with copy/pasted application answers.">}}

This strategy worked poorly.

Of the candidates who responded, about 50% were gracious and appreciated the feedback, so that was good. About 20% were rude or hostile, so that was bad.

The last 30% realized an actual human was engaging and their application wasn't going into the void like they'd assumed. At that point, they started researching the company and said they, in fact, were interested in TinyPilot specifically. That put me in a weird position. If I reconsidered their application, it felt unfair to candidates who wrote thoughtful answers up front instead of copy/pasting the same thing to everyone.

After a day or two of burning time on low-effort applications, I just stopped responding to that category of applicants. I changed my strategy to respond if:

- The candidate is qualified for the role at a basic level
  - e.g., if one of the job requirements is "comfort with Linux" and the candidate says they've never used Linux: no response.
- The candidate has invested at least a few minutes into their application
  - e.g., if the responses are clearly copy/pasted or just dashed off: no response.

This had the pleasant side effect of completely eliminating hostile responses. When I rejected the thoughtful-answer candidates and gave my reasons, they didn't always respond, but when they did, they were professional and appreciative of the feedback.

### Hire someone to help me do the initial screening

Screening resumes and applications takes dozens of hours, but it's a task I could easily train an intelligent person to do for me.

I don't want to use dumb automated filters or AI, as I still want to be able to tell candidates a real human is reading their application, but it doesn't strictly have to be me.

### Build redundancy into customer support

One of the factors that delayed my responses to the applicants was that the TinyPilot employee who usually handles customer support was out sick for a week. Customer support _feels_ like it has redundancy because our support engineer can fill in, and I'm the last line of defense. This experience made me realize how fragile our customer support process is.

I forgot how much work customer support is when I'm doing it. On top of that, I was on vacation for a few days, which meant that TinyPilot's support engineer was the only one offering support. But that was rocky because he doesn't have access to Shopify or our local fulfillment office, so he was limited in what kind of support he could offer. And this was all happening on top of the extra load of trying to communicate with 800 job applicants.

Once things are settled with the support engineering team, I'm going to add a second person to handle customer support, too. That will help keep things when one person is sick or on vacation.

### Convert the job application form to a waitlist once I reach some limit

Even if I get other people to help me with hiring, there are limits to how many applications we can review in a reasonable time frame. Once we exceed this limit (say, 400 candidates), I should convert the application to a waitlist so I'm not wasting candidates' time.

### Remember how time-consuming it is

Even though I've hired through a job posting before, I forgot how time-consuming the process is until I was doing it again. In my head, the time commitment looks like this:

So there's a big influx of candidates who all apply on day one. I sort through the candidates until I've narrowed it down to a single person. Finally, I hire that person, they start doing tasks I used to do, and everything is great.

{{<img src="imagined-commitment.png" hasBorder="true" maxWidth="600px">}}

In reality, the time commitment is more like this:

{{<img src="real-commitment.png" hasBorder="true" maxWidth="600px">}}

There's a big burst of applicants, and then while I'm processing them, more applicants keep applying. And then when I finally hire someone, I still have to follow up with everyone I didn't choose while simultaneously onboarding and training the new hire.

So, next time I hire, I just have to revisit these beautiful and informative graphs.

## Wrap up

### What got done?

- Hired a second TinyPilot support engineer
- Deployed the next-generation update system to the Community version of TinyPilot
- Published my notes on [applicant tracking systems for bootstrappers](/notes/bootstrapper-ats/)
- Published my notes on [debugging memory issues in PicoShare](/notes/picoshare-perf/)

### Lessons learned

- Hiring is always harder than I expect

### Goals for next month

- Migrate TinyPilot Pro to the next-generation update system.
- Send TinyPilot Voyager to two YouTube creators or bloggers for review
- Explore new case manufacturing options
