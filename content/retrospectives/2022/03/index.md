---
title: "TinyPilot: Month 20"
date: 2022-03-07T00:00:00-05:00
description: Hiring TinyPilot's first support engineer
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

My profit is atypically high this month, but it's mainly a consequence of timing. I'm waiting to receive a few large invoices, and my business credit card finally increased my line of credit by $20k, so I'm holding more cash.

## Hiring a support engineer: the job posting

I advertised the job description in three places:

| Channel | Cost | Total Candidates | Passed Initial Screen | Trial Hires |
|---------|------|------------------|-----------------------|-------------|
| [Twitter](https://twitter.com/deliberatecoder/status/1488993366666887168) | $0   | 2                | 1                     | 0           |
| [Hacker News](https://news.ycombinator.com/item?id=30184256) | $0 | Didn't track, seemed low | N/A | N/A |
| We Work Remotely | $358 | XX | XX | 1 |

One of the problems with hiring is that, as a small business owner, I want to hire someone who understands what my company is and communicates that to me. But most companies treat candidates like garbage, and so they don't have any incentive to

Here's my [job posting](https://tinypilotkvm.com/jobs/support-engineer/). I'm trying to make it clear that I'm personally reading each and every application. Applications aren't going to a robot or clueless recruiter who's blindly screening on keywords. If you put in effort, I'll put in effort.

Sending that message up front helps me to screen the letters. If I receive low-effort applications or cover letters that begin "Dear Sirs," I can instantly archive those without feeling guilty because they're not putting in any effort.

I wasn't sure what to choose for pay. It's tough to guage the market rate for this kind of role because so few job postings list compoensation, and most of them are for full-time roles rather than 10 hours per week. I chose $40 but other founders I spoke to say they'd expect to find a qualified candidate for $20-30/hr.

## Hiring a support engineer: screening applications

Once the job posting was up, it was time to start screening applications.

At this stage, I'm evaluating:

* Is their writing clear and syntactically correct?
* Did they take the time to learn about TinyPilot?
* Do they have experience with support or writing user-facing documentation?
* Do they meet the technical requirements?

I tried to identify standout candidates and respond to them quickly. I mentioned specifics of what I liked about their application and asked if they'd be interested in proceeding to the sample questions.

For everyone else, I either fast-rejected them or put them in a queue for a response as I had availability.

I quickly found that I needed some sort of organization system for managing candidates at different stages of the process, so I sorted all the ongoing threads into email folders:

### instant-reject

My `instant-reject` folder was for candidates who didn't follow the instructions about how to apply. This included:

* Candidates who didn't include a cover letter
* Candidates whose cover letter didn't mention any specifics of the job or of TinyPilot
* Candidates who didn't match the job requirements, and they didn't acknowledge the gap in their cover letter

For these candidates, I moved their application to the `instant-reject` folder and didn't send a reply.

I put XX% of candidates into the `instant-reject` folder.

### cover-letter-reject

The `cover-letter-reject` folder was for candidates who made a good faith effort in applying, but I could tell from their cover letter or resume that they were a poor match.

For these candidates, I sent an individualized response. Here's an example:

>Hi Joe,
>
>Thanks for reaching out and for taking the time to learn more about TinyPilot.
>
>Unfortunately, I don't think this would be a good match.
>
>It seems like you have a lot of great experience with Linux and Raspberry Pi, but the position requires someone with more experience writing customer-facing content. Your English is pretty strong, but there were several errors in your letter and resume, so I don't think this role would be a good fit.
>
>I'm sorry it didn't work out, but I wish you the best of luck in your search.
>
>Best,<br>
Michael

In the response, I'm trying to emphasize that I'm rejecting their *application* rather than saying "I'm rejecting [**you**](/human-code-reviews-1/#never-say-you)." I avoided getting too specific because I didn't want the candidate to feel like I was picking on them or rejecting them over a single careless error.

Most employers skip sending individualized rejection letters, and I understand why. It's a huge time-suck, and it has no benefit for the employer. Still, I feel like it's disrespectful to ignore people after I've asked them to spend unpaid time applying to my job.

About 65% of candidates never responded to my rejection letter. Roughly 25% responded saying that they appreciated the feedback. Of these, a few asked for clarification, and I gave specific notes about places they can improve and recommended resources for improving their writing. The last 10% tried to convince me that they'd prove themselves if I let them try my screening questions. It was tempting, but giving feedback on screening questions takes an order of magnitude more time than rejecting at the cover letter stage, so I didn't want to waste time for both of us.

Nobody became hostile in their responses. Everyone stayed professional.

I put XX% of candidates into the `cover-letter-reject` folder.

### pending-questions

If a candidate's cover letter had clear, grammatically correct English, and they met the technical requirements, I wrote them a personalized response telling them specifics of what I liked about their application and why I think they might be a good match.

I then invited these candidates to answer three example customer support requests so I could get a sense of how they speak to customers and offer technical solutions.

After I responded, I put them in the `pending-questions` folder until they responded.

XX% of candidates reached this stage. Of those XX% answered the sample questions.

### questions-reject

When the candidate shared their answers to my sample questions, I decided whether to proceed with them to a trial hire.

I sent all candidates who answered the sample questions detailed feedback regardless of whether I was making them an offer. I got this idea from Firebase founder, Andrew Lee:

>It’s critical that candidates don’t feel their time is wasted. At Firebase, we made sure of this by putting a great deal of effort ourselves into the take home test process... [A]fter they submitted their answer, we would provide them with a thorough and detailed code review (usually by the legendary [@mikelehen](https://twitter.com/mikelehen)).

>We treated this code review like a real production code review, and we did it whether or not we planned to move forward with the candidate. This review was very important for two reasons. First, it showed the candidate that we took them seriously and that we were investing a significant amount of our own time in the interview process. Second, it gave the candidate an idea of what working at Firebase might be like; “If they do code reviews this well for their coding challenges, I can’t wait to work with this team on real production code!”
>
>-Andrew Lee, ["How Firebase Interviewed Software Engineers"](https://startupandrew.com/posts/how-firebase-interviewed-software-engineers/)

Andrew's process always stuck with me as the right way to treat people, so I've tried to apply that mentality in hiring for any position.

Most people were appreciative of the detailed feedback. One person

If the candidate's answers to the sample questions were below what I expected, I put them into the `questions-reject` folder.

Of candidates who answered the questions, I put X of Y in the `questions-reject` folder (XX%).

### maybe-trial-hire

In the first week of my search, one candidate answered the screening questions pretty well, but I still had reservations. They were the best I'd seen so far, but I wanted to see more options. I told them that I was going to have a decision for them in a few weeks, and I put them in the `maybe-trial-hire` folder. I ended up finding a candidate who was a better match, so I later told the "maybe" candidate I went with someone else.

I've started a trial hire now, but I'm still keeping this folder in case it doesn't work out. I'm transparent with candidates that I'm already running a trial hire but  they can continue with their application and they'll be in my shortlist if I hire additional support later or they can pause where they are and resume later.

After I hired my first support engineer, I realized it would be too hard to run a trial hire with multiple candidates. With developers, I can run multiple trial hires at once becase I can just give them separate tasks. It felt too dog-eat-dog to have multiple support engineers seeing each other's answers on the help forum and knowing that they're competing for the same job.

### trial-hire

I was only trial hiring one person at a time, so it was pretty easy to track at that stage. But, for completeness, I wanted a folder for the last stage of the hiring funnel.

## Hiring a support engineer: training



## Hiring a support engineer: payment

I currently work with three freelance developers in different countries, and all of them receive payment in a different way. Now that I'm adding a fourth contractor, I thought I should start to standardize with a single platform.

I looked for payment platforms for remote workers that would do the following:

* Minimizes everyone's time dealing with invoicing and payments
* Manages compliance documentation
* Manages contract documents
* Makes it possible for contractors to record expenses
* Makes it easy for contractors to track their billable time without installing spyware

### Deel (winner)

I ended up choosing Deel, as they ticked all of my boxes. I'm only a week in, but we'll see how it goes.

I liked that Deel has time tracking built in, whereas Pilot left that as an exercise for the contractors.

Deel also seems to be a lot more transparent than other providers in that the contractor has control of when to convert their currency and Deel shows the exact amount that will arrive in their bank account in the contractor's local currency. Other providers seem to just promise that they'll do their best in finding good conversion rates, but you only find out the final rate when you receive payment.

Deel is also planning to expand into payroll services for US-based employees. That would be great for me, as I've been disappointed with Justworks and Gusto.

Deel costs $49/mo per contractor, which is pricey, but I'm willing to pay if it frees up more of my time.


### Pilot

Pilot is similar to Deel. They're both backed by Y Combinator, and they have a similarly slick UI.

I signed up for Pilot first, and I was planning to use them, but they took an entire week to activate my account. In the meantime, another founder mentioned Deel, so I switched. Get it together, Pilot.

One other important difference for was that Pilot didn't offer tools to for time tracking. Contractors have to track their time in a separate tool, and then they manually copy their hours into Pilot when they want to create an invoice.

### Remote

This company offers free payments for contractors. Sounds great, right?

Free service was the dealbreaker for me.

If Remote can offer a service for free that others are charging $30-50/mo per employee, something is fishy. It might mean they're making money from me in some unexpected way, like they take a cut on all payments and they bury it in their currency conversion rate. Or it could mean that contractors are a use-case they don't care that much about, and they might suddenly drop it or change it, as we see Google do over and over with their free services.

### Gusto

I'm already using Gusto as a payroll service for my local staff. I'm not crazy about Gusto, but using a single service to pay everyone would be convenient.

Unfortunately, Gusto only supports international contractors if they receive a fixed dollar amount each pay cycle. If your contractors work different hours each week, Gusto won't work.

## Legacy projects

I used to keep a regular section in my retrospectives for updates on my legacy businesses, but the writeups have gotten pretty boring. They're all essentially, "I didn't do anything, but here's how that affected my metrics."

I'm replacing "Legacy projects" with "Side projects," so I can talk about the hobby projects I play with on weekends and evenings.

## Side projects

### Lenny

Lenny is a service I created to waste time of people who send me spam emails.

Spammers are now sending automated message sequences when I don't respond to their first message.

{{<img src="spammer-sequence.png" maxWidth="700px" hasBorder="true" caption="Some spammers continue sending automated pester sequences when I don't respond.">}}

I was inspired by [a YouTube channel](https://www.youtube.com/channel/UCrBZYWrikliO6EPZKM7KxVQ) that wastes telemarketers' time. The channel maintains a VoIP number that takes calls from telemarketers and responds with recordings of a kindly Australian man named Lenny. The recorded responses always express interest in what the telemarketers are selling but with lots of rambly digressions. Lenny has probably cost telemarketing firms tens to hundreds of thousands of dollars on hours their workers wasted talking to a recording.

{{<youtube XSoOrlh5i1k>}}

I've built my own version of Lenny, but for email rather than voice calls. Now, when I get spam emails, I forward them to my own email-based Lenny. Lenny responds enthusiastically to the spammer, but he keeps getting distracted and sending the conversation in circles.

The following are two different spammers responding to the same message sequence I wrote for my tool. Lenny manages to get five responses from each spammer, though they both give up at the same point. In the second example, Lenny's responses stop making sense in context, but the spammer keeps going for a while.

{{<gallery  caption="Lenny is a service I built to send automated responses to spammers that go nowhere.">}}
  {{<img src="lenny-1.png" maxWidth="400px" hasBorder="true">}}
  {{<img src="lenny-2.png" maxWidth="400px" hasBorder="true">}}
{{</gallery>}}

I'm trying to keep the third-party dependencies to a minimum, but in February, I started using the [Bulma CSS framework](https://bulma.io/), and it makes the UI look a lot better.

Outside of that, I've been working on making it easier to define new responses. Currently, all the responses are baked into the code, but I want to make them editable through the web UI.

I'm not sure where Lenny will go as a project. I might release it as a free open-source tool, but I feel like people might be willing to pay for this as a hosted service. For now, I'm just working on it for my own entertainment, but I hope to offer it to others in the next few months.

### PicoShare

PicoShare is a simple tool for sharing files with people.

Although there are a million services that will let you host and share files, they all get in the way in one form or another. For example, if I want to share a video with someone, I can't just upload it to Google Drive and send the link. Google Drive insists on re-encoding the video, so it's a 10-minute wait before the video is even available. And even then, the recipient has to navigate through the Google Drive UI to even play the file. It's the same on Dropbox, imgur, etc.

PicoShare is a no-frills, no-hassle file-sharing service. You upload a file and get a direct link. Anyone with the link can view it or download it directly without signing up for an account or viewing ads.

I used PicoShare recently to share a short clip from *30 Rock* with my family in a group text. Here's what it looks like for me to upload the clip to PicoShare and get a shareable link:

{{<video src="picoshare-demo.mp4" caption="PicoShare lets me share a video instantly without re-encoding it or burying it in another UI.">}}

## Wrap up

### What got done?

*

### Lessons learned

*

### Goals for next month

* Wrap up design overhaul of TinyPilot website
* Complete onboarding for TinyPilot's new support engineer
