---
title: Guidelines for Freelance Developers Working with Me
description: TODO
date: '2021-02-25'
hero_image: cover.jpg
custom_css: true
images:
- freelancer-guidelines/og-cover.jpg
---

I've been hiring software developers and other freelancers to work with me for the past seven years. Even though I write most code myself, hiring other developers is a fantastic force multiplier that frees up my time and allows me to focus on other parts of my business.

Freelancers work well if you manage the relationship properly, but there are hundreds of ways to screw it up. Every freelancer-client relationship is different, so it's critical that developers working with you understand what to expect of the partnership.

The document below explains what it's like to work with me as a freelance developer. I share it when advertising developer roles, and I pay contractors to read it closely after we begin working together. It allows candidates to skip applying if they prefer a different working style. For candidates that like my way of doing things, it helps them ramp up quicly and reduces ambiguity in the work.

It's a living document, so I update it when I run into issues that clearer expectations could have prevented.

If you hire freelancers, you're welcome to adapt these guidelines under the [Creative Commons BY-4.0 license](http://creativecommons.org/licenses/by/4.0/) (Markdown version (TODO: link), if that's easier). If you have your own set of guidelines, let me know, as I'd love to see others.

---

## Overview

This document explains processes and conventions I use when working with freelance developers.

If you're reading this document before working with me, feel free to skim it quickly to see if this working style matches yours. If you're reading it while on an active contract with me, read it thoroughly and bill me for the time.

## Golden rule

I want to treat you how I'd like to be treated.

## Communication

I value effective communication above all else.

Err on the side of overcommunication. When sharing a solution, it's helpful to hear why you chose it and what other avenues you've explored.

### Resolve emails quickly

I primarily communicate over email. I write emails in a style Cal Newport describes as ["process-centric."](https://www.calnewport.com/blog/2016/04/19/write-longer-emails/)

Emails usually represent a task or a question, and we're aiming to resolve it with as few back-and-forths as possible.

#### Bad Email Sequence

<div class="email-exchange">
  <div class="email freelancer-email">

**Freelancer**: What format do you prefer for the image? PNG or JPEG?

  </div>

  <div class="email manager-email">

**Me**: PNG

  </div>
</div>

<div class="email-exchange">
  <div class="email freelancer-email">

**Freelancer**: What size should it be?

  </div>

  <div class="email manager-email">

**Me**: 800x600px

  </div>
</div>

<div class="email-exchange">
  <div class="email freelancer-email">

**Freelancer**: Should it rescale on smaller devices?

  </div>

  <div class="email manager-email">

**Me**: Yes, it should be 400x300px on viewports smaller than 768px.

  </div>
</div>

This is a poor email sequence because the freelancer meted out questions over time instead of thinking through

#### Good Email Sequence

<div class="email freelancer-email">

**Freelancer**: I'd love your input on the image. Can you let me know your preferences on the following?

* Format (PNG or JPEG)?
* Size (in pixels)?
* Should it rescale on smaller devices?

</div>

<div class="email manager-email">

**Me**: Thanks for the well-thought out questions!
  * The format should be PNG.
  * The size should be 800x600px on desktop and 400x300px on viewports smaller than 768px.

</div>

This is a good sequence because the freelancer did up-front planning to minimize the amount of back and forth in answering the questions.

### Email response time

If we're in the middle of ongoing work, I expect responses to emails within one business day. In other words, if I email you at 3pm on a Tuesday, I expect a response back by 3pm Wednesday.

If you don't have a complete answer, respond to acknowledge the message and provide an ETA for the full response.

It's okay if turnaround time is occasionally longer than one working day, but it should be the exception and not the norm. You can expect the same from me.

### Meetings

I consider meeting time to be precious. I try to minimize.

* Reading a document together
* One person speaks for more than five minutes without interactive discussion

I use meetings to discuss topics that require low-latency back-and-forths. I use emails for everything else. Avoid scheduling a meeting to ask questions that could have been an email.

A good meeting has an agenda. We should have a . If the meeting involves one person talking uninterrupted for

The exception is social meetings. I'll schedule meetings once or twice a month just as a casual check-in so we have some face time together. I've found that email-only communication can make things feel [impersonal and tense](/human-code-reviews-2/#talk-it-out). These meetings are casual and don't necessarily have a written agenda.

| Discussion Topic | Notes |
|------------------|-------|
| "Can we schedule a meeting to discuss the deadline for this project?" | <font color="red">BAD</font>: This is a simple question that doesn't require a live meeting. |
| "It's going to be hard for you to review my next pull request. Can we meet so I can explain it to you?" | <font color="red">BAD</font>: Context for the code [should be part of the source itself](/code-review-love/#4-answer-questions-with-the-code-itself). |
| "I have an idea for us to " | <font color="red">BAD</font>: This is a simple question that doesn't require a live meeting. |
| "The design document calls for us to use [Postgres](https://www.postgresql.org/), but I'd like to discuss other options." | <font color="green">GOOD</font>: This is a complicated decision that likely requires many small back-and-forths, so a live discussion will be more efficient than email. |

## Interviews

I never conduct formal interviews in deciding whether to hire someone.

I'll ask to see examples of previous work, or I may ask a few questions over email, but I'm most interested in how well we work together. If you're a good candidate, I'll set up a narrowly-scoped job at your normal pay rate.

If I ask you to begin a paid trial assignment, I'll pay for your time even if we decide not to work together afterwards. The only exception is if you fail to make a good-faith effort on the assignment (e.g., you bill five hours on a programming task and deliver zero code).

## Due Diligence

Freelancers provide the most value when they minimize the time I spend on tasks I've delegated to them. This requires due diligence before reaching out to me with questions.

You should feel comfortable asking questions, but I also expect you to answer questions on your own where possible. If you're unable to answer the question, let me know how you've tried.

<div class="example bad-example">

**Bad Questions**

* How do I install Flask on my computer?
* Who's Elon Musk?
* How do I link to specific sections of a Google Doc?

</div>

<div class="example good-example">

**Good Questions**

* I'm having trouble understanding section 3 of the spec. Does "bat" refer to sports equipment or the animal?
* When I try to install your software, I get the error message <code>FooBarBaz</code>. I've re-read the installation guide and searched the open issues, but I can't figure out what's going wrong. Do you know what the problem is?

</div>

## Availability

I don't expect anyone to be available more than five days per week. Unless you tell me otherwise, I'll assume you don't work on weekends.

Schedule predictability is helpful. If you keep a regular working schedule, it helps me ensure tasks and feedback are ready for you when you next have availability.

I don't work weekends or major US holidays. You're welcome to email me on the weekend, but I won't respond until the next business day. I try to avoid email before noon in US Eastern Time.

You're free to work whichever hours you like, but I'd like you to have at least some overlap with my working hours, which are 10am-6:30pm ET.

## Feedback

It's common for me to ask for feedback during or after a project. I do this because freelancers often have useful ideas for improving processes or work dynamics, but they don't feel comfortable sharing until they're asked directly.

My questions are generally:

*   Are there things I can improve to make the work smoother or more enjoyable?
*   Are there types of work you want to do more of? Less of?

## Deadlines

It's rare that I need work urgently, so I generally allow you to set your deadlines. That said, you're responsible for meeting your deadlines and managing expectations when there are delays.

Don't allow deadlines to sail by without an update. If you tell me to expect work by 3 PM ET Tuesday, and I don't see anything from you by Tuesday night, it creates stress for me because I don't know if you've completely forgotten the task or you're running slightly late.

If you're going to miss a deadline, let me know. The earlier you can let me know about a deadline slip, the better. The absolute latest you should be telling me about a delay is the deadline itself.

In general, delays are not a big deal as long as I can plan around them. If a deadline is important to me, I'll let you know.

When specifying deadlines, use precise, unambiguous time conventions:

* <font color="green"> **Pretty Good** </font>: I'll send it to you by EOD Friday
* <font color="green"> **Better** </font>: I'll send it to you by 5pm ET on Dec. 8th.
* <font color="red"> **Bad** </font>: I'll have it ready in the next few days.
  * Too vague.
* <font color="red"> **Terrible** </font>: I'll let you know when it's ready.
  * Extremely vague

## Timeboxing

Early in our work together, I'll ask you to limit billable hours per week or per milestone. I do this to control billing as I get a sense of your development velocity and whether we work well together.

If you're approaching the end of the hours limit and won't finish, reserve time to organize what you have and present it with an explanation of what's complete and what's incomplete.

I won't pay for any work performed beyond the agreed hours cap.

As we work together more, I'll increase or eliminate this limit to give you more autonomy.

## Documentation

I value documentation highly.

If a project has documented processes or Github templates, please follow them. If the documentation tells you to do something that seems incorrect, let me know. Don't assume that instructions are out of date or not meant for you.

When you begin working with me on a project, you become the new owner of its ramp-up documents. If you got stuck because something was documented poorly or not at all, please submit edits to fill the gaps.

Thoughtfully document the code that you write. Aim to make the code self-documenting, but include source comments for things you can't express in code. Aim to document new code to roughly the same degree as nearby existing code.

```python
# Number of days per week (seven)   <-- BAD comment
DAYS_PER_WEEK = 7

# This is a workaround for a bug in FooComponent, which crashes the process
# if we call it immediately after writing to disk. <-- GOOD comment
time.sleep(5)
```

## Code quality

I value quality and maintainability over turnaround time.

Once you have working code, take a second pass to see if you can simplify it or refactor the logic to make it more intuitive.

If it takes you twice as long to make your code 30% simpler, that's a net positive for me.

## Code reviews

I thoroughly review all code changes and provide detailed feedback.

My comments are not meant to criticize you or make you feel bad. I review rigorously to help me understand the code and get it to a state where I feel comfortable maintaining it long-term.

These articles explain my code review process:

* [How I review code](https://mtlynch.io/human-code-reviews-1/)
* [How you should submit code for review](https://mtlynch.io/code-review-love/)

## Code style

My projects adhere to Google's code style guidelines:

* [Python](https://google.github.io/styleguide/pyguide.html)
* [HTML/CSS](https://google.github.io/styleguide/htmlcssguide.html)
* [Shell](https://google.github.io/styleguide/shellguide.html)

As much as possible, I [use automated tools to enforce style conventions](https://mtlynch.io/human-code-reviews-1/#let-computers-do-the-boring-parts).

## Git

I use Git for source control.

### Git features

You don't need to be a Git expert to work with me as long as you understand basic functionality:

* Clone a repo
* Push and pull changes to a repo
* Create a branch
* Make a commit
* Rebase a commit (occasionally)

### Repo access

I assign repo access on a [least-privilege basis](https://en.wikipedia.org/wiki/Principle_of_least_privilege). If you're working on a public repository, you can clone the repo and begin making pull requests with no additional permissions.

### Commit hygiene

Some developers believe that every commit is sacred and beautiful. I'm not one of them.

It's important to me that the *main* branch has a sane commit history. In all other branches, you can commit however you like. I use Github's [squash and merge functionality](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-merges#squash-and-merge-your-pull-request-commits), so all the commits in a pull request collapse down to a single commit when I merge.

Write sensible pull requests. ["How to Write a Git Commit Message"](https://chris.beams.io/posts/git-commit/) is a good explanation, but I only care about the pull request title and message. Commit messages within the pull request are not important to me.

### A few Git rules

* Don't squash a commit after you've pushed it (especially after I've reviewed it).
  * This makes it hard to track edits during the review
* If you need new changes from the main branch, **[rebase](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)** the changes, never *merge*.
  * Merging clutters the pull request and makes it hard to review.

## Testing

When you create a pull request, you're responsible for ensuring all tests passing in continuous integration. Fix any build breaks before sending me code to review.

If you've added a feature or otherwise changed behavior, update the automated tests to exercise the new behavior.

If it's a feature that's difficult to test with automation, you should run manual tests to exercise the new code. If you can't find a way to do that, warn me that it's untested when you send it for review (this should be extremely rare).

## Billable hours

I consider almost everything you do in service of working with me to be billable work.

<div class="example good-example">

**Examples of billable work**

* Communicating with me (including emails, video calls, and in-person meetings)
* Reading documents I ask you to read (including this one)
* Researching a technique or technology relevant to your work
* Going for a walk to think about a difficult problem

</div>

<div class="example bad-example">

**Examples of non-billable work**

* Reading a book cover-to-cover because it's related to your work
  * Reading a chapter is fine.
* Fixing your work computer because your hard drive died
* Shopping for a new desk chair

</div>

## Expenses

I expect you to provide the basic tools you need to operate as a freelance developer (e.g., computer, internet connection, electricity).

I'm happy to pay the cost of any software, services, or equipment that make your work more efficient or pleasant. Just run it by me first.

If I ask you to purchase something, I'll reimburse you for it on your next invoice.

## Monitoring

I trust you to report your hours honestly. I'll never ask you to "prove" your hours to me or install any surveillance software on your system.

If we're on a platform such as Upwork where monitoring is built-in, I'll always make the monitoring features optional. I won't review the logs unless there's an egregious discrepancy in hours. Even in that case, I'll speak to you before reviewing logs.

## Payment

Please send me invoices for your hours every two weeks. You can expect payment within five business days of the invoice, usually sooner.

I don't pay bonuses or tips. Your compensation is as transparent and objective as possible.

I pay via PayPal, Payoneer, ACH transfer, or (in the US) a mailed check.

## Post-contract work

I'll never contact you after a job with questions about your work or requests for free changes. It's my responsibility to determine that you delivered everything I requested within the time we work together under contract.

If I discover an issue in your work after I send you payment, I am responsible for fixing it myself or offering you additional billable hours.

## Taxes

If I pay you more than $600 per calendar year, I need some forms for tax purposes.

### US citizens and residents

You'll need to provide a [W-9 form](https://www.irs.gov/pub/irs-pdf/fw9.pdf). At the end of the year, I'll send you a [1099-MISC](https://www.irs.gov/forms-pubs/about-form-1099-misc).

### Non-US freelancers

I'll need a [W-8BEN](https://www.irs.gov/pub/irs-pdf/fw8ben.pdf) form that declares you don't owe US taxes.

## Intellectual property

If we're working together on a project where I want to retain intellectual property rights, I'll send you [a contract](https://www.docracy.com/0wceme3njsd/sample-freelance-developer-agreement) to e-sign. It declares that I'm purchasing the copyright for the code you write for me.

The contract relates specifically to work I pay you to produce. You retain the rights to all work you create outside of your paid hours for me.
