---
title: "A Survey of Applicant Tracking Systems for Bootstrapped Businesses"
date: 2022-08-09T16:56:09-04:00
---

I'm a bootstrapped founder of [a small company](https://tinypilotkvm.com). I'm hiring for an open position soon, and I'm in the market for a tool to track job applications.

The last time I hired for a role, I posted the job on WeWorkRemotely and directed candidates to email me. I ended up [receiving 221 applications](/retrospectives/2022/03/#hiring-a-support-engineer-the-job-posting), so managing them in email became messy. I came up with a folder labeling system that worked okay, but this time around, I want a purpose-built tool for tracking applications.

These are my notes to summarize what applicant tracking systems (ATS) I found and how well they serve small, bootstrapped businesses.

{{<notice type="info">}}
**Note**: This isn't affiliate blogspam where I give fake reviews to push you to sign up for whoever gives me a commission. I have no business relationship with any of these companies except as a customer. The links below are not referral or affiliate links. I earn nothing if you sign up for any of them.
{{</notice>}}

## Criteria

When I started my search, I created the following criteria for what I wanted in an applicant tracking system:

### Requirements

- Shows me a view of candidates at each hiring stage
- Treats candidates respectfully
  - Doesn't force them to fill out the same information redundantly or jump through unnecessary hoops to apply
- Costs <= $300/month
- Publishes clear pricing
- Allows me to sign up without scheduling a demo

### Nice-to-haves

- Optimized for small businesses
  - I don't need features for group decisions and approvals that large businesses need
- Focuses on the applicant tracking part rather than trying to be an overall HR tool
- Allows me to pause billing between job openings
  - I typically only have one open position every few months, so I don't want to pay the standard monthly fee, but I don't want to have to start from scratch if I come back a few months later.

### Dealbreakers

- Mentions "AI-powered"

## Overview

| Platform                                 | Pricing             | Self-service signup?           | Pause billing?                 | Focused on applicant tracking? | UX Rating |
| ---------------------------------------- | ------------------- | ------------------------------ | ------------------------------ | ------------------------------ | --------- |
| [Homerun](https://www.homerun.co/)       | $71/mo              | <font color="green">Yes</font> | <font color="green">Yes</font> | <font color="green">Yes</font> | 8         |
| [Polymer](https://www.polymer.co/)       | $10/mo per open job | <font color="green">Yes</font> | <font color="green">Yes</font> | <font color="green">Yes</font> | 6         |
| [Recruitee](https://recruitee.com)       | $109/mo             | <font color="green">Yes</font> | <font color="red">No</font>    | <font color="green">Yes</font> | 7         |
| [Breezy](https://breezy.hr)              | Free                | <font color="green">Yes</font> | <font color="red">No</font>    | <font color="green">Yes</font> | 5         |
| [JOIN](https://join.com)                 | Free                | Yes                            | ???                            | <font color="red">No</font>    | 5         |
| [Hireproof](https://hireproof.io/)       | Not published       | Sort of                        | ???                            | <font color="red">No</font>    | 3         |
| [Eddy](https://eddy.com/)                | $300/mo + ???       | <font color="red">No</font>    | ???                            | <font color="red">No</font>    | N/A       |
| [Greenhouse](https://www.greenhouse.io/) | Not published       | <font color="red">No</font>    | ???                            | <font color="red">No</font>    | N/A       |
| [Lever](https://www.lever.co/)           | Not published       | <font color="red">No</font>    | ???                            | <font color="red">No</font>    | N/A       |

For pricing, I'm using the lowest tier plan that would fit my needs, which is to have one job opening and unlimited candidates. For companies that bill in Euros, I've converted to USD for convenience of comparing.

## My pick: [Homerun](https://www.homerun.co/)

Homerun was the last ATS I tried, but it ended up being my favorite.

It had a clean UI that simplified the process of creating a job application. They have flexible options for what questions the candidate can enter with different style UI controls like short answer, long answer, multiple choice:

{{<img src="homerun-3.jpg" maxWidth="600px" hasBorder="true" alt="UX for creating job applications in Homerun">}}

They have a nice Kanban-style view of candidates at various stages of the hiring pipeline, and they make it easy to manage communications with each applicant:

{{<gallery>}}
{{<img src="homerun-1.jpg" maxWidth="400px" hasBorder="true" alt="Kanban overview of job applicants">}}
{{<img src="homerun-2.jpg" maxWidth="400px" hasBorder="true" alt="Detailed view of applicant">}}
{{</gallery>}}

At first, I was overwhelmed by Homerun's job posting UI. By default, they drop you into a full-blown landing page builder with complicated layouts, when all I really wanted was a job description and initial questions.

{{<img src="homerun-builder.png" maxWidth="500px" alt="Complicated landing page builder on Homerun" caption="At first, I was put off by Homerun's complicated landing page builder.">}}

It turns out that you can opt-out of a "job listing" page and use Homerun exclusively for a "job application." I appreciated that, because it allows me to delegate the job posting to other sites that specialize in it.

I wasn't sure if it supported billing pauses, but Homerun's founder [confirmed on Twitter](https://twitter.com/vvillem/status/1557388615138906112) that if you downgrade to the free tier between job openings, Homerun preserves all of your data at no cost.

- Pros
  - Best UX of any ATS I tried
  - Flexible tools for creating job application
  - Nice integration of email templates
  - Cool analytics that show high-level stats for your job opening
- Cons
  - Creepy mascot

## Runner up: [Polymer](https://www.polymer.co/)

Monica Lent [recommended Polymer](https://twitter.com/monicalent/status/1556716598605631489) to me, and I came very close to moving forward with them.

Unlike most ATS platforms that charge by the month, Polymer charges by job openings per month, so it's much friendlier to small businesses that only have open positions occasionally.

From the looks of the website and their LinkedIn, Polymer seems to be small company with just a handful of team members, and I feel like small companies generally excel at serving other small companies.

I liked that Polymer focuses on job applications and applicant tracking, whereas most other platforms bloat their scope by trying to be an integrated recruiting, hiring, and general HR platform.

Polymer's UX is okay. It's simpler than a lot of the other platforms, but I found the organization confusing. They have multiple call-to-action buttons on each page, and they use up a huge amount of screen real estate showing me menu options unrelated to my current task:

{{<img src="polymer-ux.png" maxWidth="600px" hasBorder="true" alt="Polymer's UI with many nested options" caption="Polymer's UX was a little crowded with nested menu options for unrelated tasks">}}

- Pros
  - Small, focused company
  - [Changelog](https://www.polymer.co/changelog) shows frequent development activity
  - Pricing is friendly to occasional hiring
  - Simple and focused features
- Cons
  - Crowded UI
  - Support documentation is out of date

## [Recruitee](https://recruitee.com)

It's designed for collaborative hiring decisions, so it's not a great match for most indie companies where only one or two people are making the hiring decision.

- Pros

  - Self-serve demo experience is nice

- Cons
  - Designed for team-based hiring decisions, so flows aren't ideal for a solo founder / hiring manager

## [Breezy](https://breezy.hr)

## [JOIN](https://join.com)

Seems fine. I'm suspicious of how they're making money since the platform doesn't charge employers.

It's not possible to test the applicant tracking functionality without publishing a real job posting, and the job postings require manual approval, so I didn't get to test out the applicant management functionality.

No way to add free-form questions.

## [Hireproof](https://hireproof.io/)

Someone recommended Hireproof to me on Twitter, and I'm not quite sure it even is an applicant tracking system. Their signup page is deceptive in that at the end, you don't get access to the product but just get added to a waitlist.

The next day, I received an email inviting me to try the actual product. And after using it, I'm not sure what the app is, exactly. I don't want to be too critical since they're still in beta, but I had a lot of trouble navigating their application. They show me tons of UI controls with no indication of what I have to do next.

I gave up after ten minutes.

## [Eddy](https://eddy.com/)

They don't allow self-service signups, so I didn't try it.

## [Greenhouse](https://www.greenhouse.io/)

They don't allow self-service signups, so I didn't try it.

## [Lever](https://www.lever.co/)

They don't allow self-service signups, so I didn't try it.
