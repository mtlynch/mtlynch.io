---
title: "A Survey of Applicant Tracking Systems for Bootstrapped Businesses"
date: 2022-08-12
images:
  - /notes/bootstrapper-ats/ats-cover.png
---

I'm a bootstrapped founder of [a six-person company](https://tinypilotkvm.com), and I spent this week testing different tools for hiring candidates.

This post summarizes my experience with the applicant tracking systems (ATS) I found and how well they serve small, bootstrapped businesses.

{{<notice type="info">}}
**Note**: This isn't affiliate blogspam where I give fake reviews to push you to sign up for whoever gives me a commission. I have no business relationship with any of these companies except as a customer. The links below are not referral or affiliate links, so I earn nothing if you sign up.
{{</notice>}}

## Why use an applicant tracking system (ATS)?

The last time I hired for a role, I posted the job on WeWorkRemotely and directed candidates to email me. I ended up [receiving 221 applications](/retrospectives/2022/03/#hiring-a-support-engineer-the-job-posting), so managing them in email became messy. I came up with a folder labeling system that worked okay, but this time around, I want a purpose-built tool for tracking applications.

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
| [JOIN](https://join.com)                 | Free                | <font color="green">Yes</font> | ???                            | <font color="red">No</font>    | 5         |
| [Hireproof](https://hireproof.io/)       | Not published       | Sort of                        | ???                            | <font color="red">No</font>    | 3         |
| [Eddy](https://eddy.com/)                | $300/mo + ???       | <font color="red">No</font>    | ???                            | <font color="red">No</font>    | N/A       |
| [Greenhouse](https://www.greenhouse.io/) | Not published       | <font color="red">No</font>    | ???                            | <font color="red">No</font>    | N/A       |
| [Lever](https://www.lever.co/)           | Not published       | <font color="red">No</font>    | ???                            | <font color="red">No</font>    | N/A       |

\* For pricing, I'm using the lowest tier plan that would fit my needs, which is to have one job opening and unlimited candidates.<br>
\*\* For companies that bill in Euros, I've converted to USD for convenience of comparing.

## My pick: [Homerun](https://www.homerun.co/)

{{<notice type="info">}}
**Summary**: All-around strong platform with bootstraper-friendly pricing
{{</notice>}}

Homerun was the very last ATS I evaluated, but it ended up being my favorite. I signed up as a paying customer within an hour of using it.

Homerun has a clean UI that simplified the process of creating a job application. They have flexible options for creating application questions with standard UI controls like short answer, long answer, multiple choice:

{{<img src="homerun-3.jpg" max-width="800px" has-border="true" alt="UX for creating job applications in Homerun">}}

Homerun has a nice Kanban-style view of candidates at various stages of the hiring pipeline, and they make it easy to manage communications with each applicant:

{{<gallery>}}
{{<img src="homerun-1.jpg" max-width="400px" has-border="true" alt="Kanban overview of job applicants">}}
{{<img src="homerun-2.jpg" max-width="400px" has-border="true" alt="Detailed view of applicant">}}
{{</gallery>}}

At first, I was overwhelmed by Homerun's job posting UI. By default, they drop you into a full-blown landing page builder with complicated layouts, when all I really wanted was a job description and initial questions.

{{<img src="homerun-builder.png" max-width="500px" alt="Complicated landing page builder on Homerun" caption="At first, I was put off by Homerun's complicated landing page builder.">}}

It turns out that you can opt-out of a "job listing" page and use Homerun exclusively for a "job application." I appreciated that, because it allows me to delegate the job posting to other sites that specialize in it.

I wasn't sure if it supported billing pauses, but Homerun's founder [confirmed on Twitter](https://twitter.com/vvillem/status/1557388615138906112) that if you downgrade to the free tier between job openings, Homerun preserves all of your data at no cost.

I'm a few days into the hiring process with Homerun, and it's been a great experience so far. It does a good job of managing applications, showing analytics about the procss, and eliminating repetitive tasks.

- Pros
  - Best UX of any ATS I tried
  - Flexible tools for creating job application
  - Nice integration of email templates
  - Cool analytics that show high-level stats for your job opening
- Cons
  - Creepy mascot

**Update (2022-09-14)**: See [my notes on using Homerun](/retrospectives/2022/09/#homerun-is-good-not-great) for the full hiring process.

## Runner up: [Polymer](https://www.polymer.co/)

{{<notice type="info">}}
**Summary**: A respectable second-best that covers the basics at low pricing but could use some UX improvement
{{</notice>}}

Bootstrapper extraordinaire Monica Lent [recommended Polymer](https://twitter.com/monicalent/status/1556716598605631489) to me because she had just begun using them. and I came very close to moving forward with Polymer, but then I found Homerun.

Unlike most ATS platforms that charge by the month, Polymer charges by job openings per month, so it's much friendlier to small businesses that only have open positions occasionally.

From the looks of the website and their LinkedIn, Polymer seems to be small company with just a handful of team members, and I feel like small companies generally excel at serving other small companies.

I liked that Polymer focuses on job applications and applicant tracking, whereas most other platforms bloat their scope by trying to be an integrated recruiting, hiring, and general HR platform.

Polymer's UX is okay. It's simpler than a lot of the other platforms, but I found the organization confusing. They have multiple call-to-action buttons on each page, and they use up a huge amount of screen real estate showing me menu options unrelated to my current task:

{{<img src="polymer-ux.png" max-width="600px" has-border="true" alt="Polymer's UI with many nested options" caption="Polymer's UX was a little crowded with nested menu options for unrelated tasks">}}

- Pros
  - Small, focused company
  - [Changelog](https://www.polymer.co/changelog) shows frequent improvements and new features
  - Pricing is friendly to occasional hiring
  - Simple and focused features
- Cons
  - Crowded UI
  - Support documentation is out of date

## [Recruitee](https://recruitee.com)

{{<notice type="info">}}
**Summary**: Nice UX, but the collaboration features are too much if the hiring team is just one or two people
{{</notice>}}

The main problem with Recruitee from a bootstrapper's perspective is that it's designed for collaborative hiring decisions. If you're an indie founder who makes hiring decisions alone or with one other co-founder, the collaboration features are overkill and get in the way.

{{<gallery>}}
{{<img src="recruitee-1.png" max-width="400px" has-border="true" alt="Kanban overview of job applicants">}}
{{<img src="recruitee-2.png" max-width="400px" has-border="true" alt="Detailed view of applicant">}}
{{</gallery>}}

Visually, Recruitee's UI is attractive. The style is nice, but Recruitee has so much functionality that I found myself getting lost while trying to find the tools or views that I wanted.

- Pros

  - Self-serve demo experience is nice
  - UI is visually appealing

- Cons
  - Designed for team-based hiring decisions, so flows aren't ideal for a solo founder / hiring manager
  - Scope is bloated with lots of features beyond applicant tracking such as offer letter signing and recruiting
  - No way to pause billing when you're not hiring, so you have to either pay for unused months or lose all your data

## [Breezy](https://breezy.hr)

{{<notice type="info">}}
**Summary**: Covers the basics, but doesn't seem to have advantages over other ATS platforms
{{</notice>}}

Breezy didn't impress me. I didn't experiment with it much because other platforms strictly dominate it, but it seems like it covers the basics: it lets you manage candidates in a kanban view and helps you manage communication with them.

{{<gallery>}}
{{<img src="breezy-1.png" max-width="400px" has-border="true" alt="Kanban overview of job applicants">}}
{{<img src="breezy-2.png" max-width="400px" has-border="true" alt="Detailed view of applicant">}}
{{</gallery>}}

The UI is disappointingly plain. It's mostly stock [Bootstrap CSS](https://getbootstrap.com/) without much customization.

Breezy's UX suffers from too many options, not enough workflows. One of Homerun's strengths is that it supports you through sequences of common steps, so if you disqualify a candidate, the next step is to notify them. Breezy doesn't seem to have any concept of workflows. All the options are visible all the time, and when you disqualify a candidate, there's no feedback that anything has even changed.

- Pros

  - Free for a single job opening

- Cons

  - UI is primitive relative to other solutions
  - No way to pause billing when you're not hiring, so you have to either pay for unused months or it deletes all of your applicants after 30 days

## [JOIN](https://join.com)

{{<notice type="info">}}
**Summary**: Slows down the hiring process with manual reviews and broken functionality
{{</notice>}}

I was suspicious of JOIN from the get-go because the main feature they advertise is that they're free. That's a red flag for me. It generally means that the company's incentives are not aligned with their users because the money is coming from somewhere else.

Bizarrely, JOIN is set up so that you can't try it out until you publish a real job listing and begin accepting candidate applications. Most platforms have a demo mode where they populate your account with synthetic data or they let you add applicants manually to see how the interface works, but not JOIN.

{{<gallery>}}
{{<img src="join-1.jpg" max-width="400px" has-border="true" alt="Kanban overview of job applicants - empty because JOIN doesn't allow me to enter candidates without manual approval">}}
{{<img src="join-2.jpg" max-width="400px" has-border="true" alt="Applicant view of job listing with a banner saying that JOIN is currently reviewing my account">}}
{{</gallery>}}

I tried creating a test job so that I could apply myself and see what the application experience is like for candidates and how JOIN manages applicants on the hiring side, but no luck. Creating a job requires manual review by the JOIN team, so I gave up.

I tried to log in again today and found that JOIN had disabled my account with an invitation to beg forgiveness from their chatbot. I tried contacting support, and the chat didn't even work:

{{<img src="join-locked.png" max-width="800px" has-border="true" alt="JOIN login screen says 'Your account is currently unavailable. Talk to us' which pops up a live chat interface">}}

- Pros

  - UI seems decent

- Cons

  - JOIN staff has to review your account manually before you can begin accepting job applications
  - Disabled my account with no notice
  - Impossible to evaluate until you start using it for real candidates
  - No way to add free-form questions

## [Hireproof](https://hireproof.io/)

{{<notice type="info">}}
**Summary**: Confusing UX, seems to be targeting rapidly growing companies rather than small bootstrappers
{{</notice>}}

Someone recommended Hireproof to me on Twitter, and I'm not quite sure it even is an applicant tracking system. Their signup page is deceptive in that at the end, you don't get access to the product but just get added to a waitlist.

The next day, I received an email inviting me to try the actual product. And after using it, I'm not sure what the app is, exactly. I think it's less about managing candidates and more about training many people in your company to perform interviews consistently.

{{<img src="hireproof-1.png" max-width="700px" has-border="true" alt="Hireproof screen showing instructions about interviewing a candidate and recording their responses">}}

If you're the founder of a small company, that's not necessary, as you don't need a tool to help you be consistent with yourself.

I don't want to be too critical since they're still in closed beta, but I had a lot of trouble navigating the platform. They show me tons of UI controls with no indication of what I have to do next.

{{<img src="hireproof-2.png" max-width="700px" has-border="true" alt="Hireproof screen showing a wall of UI controls with no clear call to action">}}

I gave up after ten minutes.

- Pros

  - UI is pretty, albeit confusing

- Cons

  - No CTAs, so it's hard to navigate
  - Seems to target large organizations or companies aiming for rapid growth
  - Terrible name &mdash; like naming your platform "Unhireable"

## [Eddy](https://eddy.com/)

They don't allow self-service signups, so I didn't try it.

## [Greenhouse](https://www.greenhouse.io/)

They don't allow self-service signups, so I didn't try it.

## [Lever](https://www.lever.co/)

They don't allow self-service signups, so I didn't try it.
