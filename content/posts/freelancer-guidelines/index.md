---
title: Guidelines for Freelance Developers Working with Me
description: TODO
date: '2021-02-25'
hero_image: cover.jpg
custom_css: true
images:
- freelancer-guidelines/og-cover.jpg
---

I've been hiring software developers and other freelancers to work with me for the past seven years. Even though I write most code myself, hiring other developers is a fantastic force multiplier that frees up time to focus on other parts of my business.

Freelancers work well if you manage the relationship properly, but there are hundreds of ways to screw it up. Every freelancer-client relationship is different, so it's critical that developers working with you understand what to expect of the partnership.

The document below explains what it's like to work with me as a freelance developer. I include it in every dev job listing I publish, and I pay contractors to read it closely after we begin working together. It attracts candidates with compatible working styles, and it reduces ramp-up time after I hire them.

I'm publishing my guidelines under the [Creative Commons BY-4.0 license](http://creativecommons.org/licenses/by/4.0/), so anyone is welcome to reuse or adapt them.

---

## Overview

This document explains processes and conventions I use when working with freelance developers.

If you're reading this document before working with me, feel free to skim it quickly to see if this working style matches yours. If you're reading it while on an active contract with me, read it thoroughly and bill me for the time.

## Golden rule

I want to treat you how I'd like to be treated.

## Communication

I value effective communication above all else.

Err on the side of overcommunication. When sharing a solution, it's helpful to hear why you chose it and what other avenues you explored.

### Resolve emails quickly

I communicate primarily over email. I write emails in a style Cal Newport describes as ["process-centric."](https://www.calnewport.com/blog/2016/04/19/write-longer-emails/)

Emails usually represent a task or a question, and we're aiming to resolve it with as few back-and-forths as possible. This requires us both to compose emails thoughtfully rather than firing off the quickest response to get the thread out of our inbox.

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

This is a poor email sequence because the freelancer dribbled out questions little by little instead of investing time up front to think about everything they need to move forward with their work.

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

This is a good sequence because the freelancer planned carefully to minimize our back-and-forths.

### Email response time

If we're in the middle of ongoing work, I expect responses to emails within one business day. In other words, if I email you at 3pm on a Tuesday, I expect a response by 3pm Wednesday.

If you don't have a complete answer, respond to acknowledge the message and provide an ETA for the full response.

It's okay if turnaround time is occasionally longer than one working day, but it should be the exception and not the rule. Expect the same from me.

### Meetings

Meetings have value, but they impose significant cost on focus and schedule. Meetings are useful for topics that are inefficient or impossible to communicate in writing.

I use emails to communicate facts and meetings to discuss opinions. For example, if we review a design document, we don't need to read it together live. Instead, we can read the document beforehand and reserve the meeting time for interactive discussion.

I'll also schedule meetings once or twice a month as a casual check-in for face-time together. Email-only communication can make things feel [impersonal and tense](/human-code-reviews-2/#talk-it-out).

| Discussion Topic | Notes |
|------------------|-------|
| "Can we schedule a meeting to discuss the deadline for this project?" | <span class="bad-prefix">BAD</span>: This is a simple question that doesn't require a meeting. |
| "It's going to be hard for you to review my next pull request. Can we meet so I can explain it to you?" | <span class="bad-prefix">BAD</span>: If the code is too complicated to understand, a [meeting is not the answer](/code-review-love/#4-answer-questions-with-the-code-itself). |
| "I have an idea for a new architecture. Can we hop on a call to go over it?" | <span class="bad-prefix">BAD</span>: I'd rather start with a written explanation and then discuss after I've read it. |
| "The design document calls for us to use [Postgres](https://www.postgresql.org/), but I'd like to understand the constraints and talk about other options." | <span class="good-prefix">GOOD</span>: This is a complicated decision that likely requires many small back-and-forths, so a live discussion will be more efficient than email. |
| "You've given me feedback about 'cohesion' in my code, but I feel like we're still not quite on the same page. Can we meet to discuss it?." | <span class="good-prefix">GOOD</span>: If we've tried to communicate something in writing, and it's not working, a meeting is a good way to hash it out. |

## Interviews

I never conduct formal interviews to make a hiring decision.

I'll ask to see examples of previous work, or I may ask a few questions over email, but I'm most interested in how well we work together. If you're a good candidate, I'll set up a narrowly-scoped job at your normal pay rate.

If I ask you to begin a paid trial assignment, I'll pay for your time even if we decide not to work together afterwards. The only exception is if you fail to make a good-faith effort on the assignment (e.g., you bill ten hours on a programming task and deliver zero code).

## Due Diligence

Freelancers provide the most value when they minimize my time overseeing their work. A large part of this is exercising due diligence before reaching out with questions.

You should feel comfortable asking for help, but I expect you to answer questions on your own where possible. If you're unable to solve the problem, let me know how you've tried.

<div class="example bad-example">

**Bad Questions**

* How do I install Flask on my computer?
* How do I link to specific sections of a Google Doc?
* What significance does the number 443 have in our server configuration?

</div>

<div class="example good-example">

**Good Questions**

* I'm having trouble understanding section 3 of the spec. Does "bat" refer to sports equipment or the animal?
* When I try to install your software, I get the error message <code>FooBarBaz</code>. I've re-read the installation guide and searched the open issues, but I can't figure out what's going wrong. Do you know what the problem is?

</div>

## Availability

I don't expect anyone to be available more than five days per week. Unless you tell me otherwise, I'll assume you don't work on weekends.

I don't work weekends or major US holidays. You're welcome to email me on the weekend, but I won't respond until the next business day. I try to avoid email before noon in US Eastern Time.

You're free to work whichever hours you like, but I'd like you to have at least some overlap with my working hours, which are 10am-6:30pm ET.

I don't expect you to work a specific schedule each week, but the more I can predict your hours, the easier it is for me to ensure tasks and feedback are ready for you when you next have availability.

## Feedback

It's common for me to ask for feedback during or after a project. I do this because freelancers often have useful ideas for improving processes or work dynamics, but they don't feel comfortable sharing until they're asked directly.

My questions are generally:

*   Are there things I can improve to make the work smoother or more enjoyable?
*   Are there types of work you want to do more of? Less of?

## Deadlines

It's rare that I need work urgently, so I generally allow you to set your own deadlines. Once you set a deadline, you're responsible for meeting it.

Don't allow deadlines to sail by without an update. If you tell me to expect work by 3 PM ET Tuesday, and I don't see anything from you by Tuesday night, it causes me stress. I'll wonder if you completely forgot the task and you're starting from scratch or you're almost done and will deliver results in a few hours.

If you're going to miss a deadline, let me know. The earlier you can warn me about a deadline slip, the better. The absolute latest you should be telling me about a delay is the deadline itself.

In general, delays are not a big deal as long as I can plan around them. If a deadline is important to me, I'll let you know.

When specifying deadlines, use precise, unambiguous time conventions:

* <span class="good-prefix">Pretty Good</span>: I'll send it to you by EOD Friday
* <span class="good-prefix">Better</span>: I'll send it to you by 5pm ET on Dec. 8th.
* <span class="bad-prefix">Bad</span>: I'll have it ready in the next few days.
  * Too vague.
* <span class="bad-prefix">Terrible</span>: I'll let you know when it's ready.
  * Extremely vague

## Timeboxing

Early in our work together, I'll ask you to limit billable hours per week or per milestone. I do this to control billing as I get a sense of your development velocity and whether we work well together.

If you're approaching the end of the hours limit and won't finish, reserve time to organize the work you've done. Include it in an email with an explanation of what's complete, what's incomplete, and how many hours you expect for the remaining work.

I won't pay for any time beyond the agreed hours cap.

As we work together more, I'll increase or eliminate the time cap to give you more autonomy.

## Documentation

I value documentation highly.

If a project has documented processes or Github templates, please follow them. If the documentation tells you to do something that seems incorrect, let me know. Don't assume that instructions are out of date or not meant for you.

When you begin working with me on a project, you become the new owner of its ramp-up documents. If you got stuck because something was documented poorly or not at all, please submit edits to fill the gaps.

Thoughtfully document the code that you write. Aim to make the code self-documenting, but include source comments for things you can't express in code. Comment new code with roughly the same thoroughness as nearby code.

```python
# Number of days per week (seven)   <-- BAD comment
DAYS_PER_WEEK = 7

# This is a workaround for a bug in FooComponent, which crashes the process
# if we call it immediately after writing to disk. <-- GOOD comment
time.sleep(5)
```

## Code quality

I value quality and maintainability over turnaround time.

Once you have working code, review your changes to see if you can simplify or refactor the logic to make it more intuitive.

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

I use Git for source control. You don't need to be a Git expert as long as you understand basic functionality:

* Clone a repo
* Create a branch
* Make a commit
* Push and pull changes
* Rebase a commit (occasionally)

### Repo access

I assign repo access on a [least-privilege basis](https://en.wikipedia.org/wiki/Principle_of_least_privilege). If you're working on one of my public repositories, you can clone the repo and begin making pull requests with no additional permissions.

### Commit hygiene

Some developers believe that every commit is beautiful and sacred. I'm not one of them.

It's important to me that the *main* branch has a sane commit history. In all other branches, you can commit however you like. You can make one commit per code review note or address all notes in a single commit. Whatever workflow you prefer is fine with me. I use Github's [squash and merge functionality](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-merges#squash-and-merge-your-pull-request-commits), so all the commits in a pull request collapse down to a single commit when I merge.

Write sensible pull request titles and explanations. The article, ["How to Write a Git Commit Message,"](https://chris.beams.io/posts/git-commit/) describes the style I prefer, except applied to the pull request not the individual commits.

### A few Git rules

* Don't squash a commit after you've pushed it (especially after I've reviewed it).
  * This makes it hard to track edits during the review
* If you need new changes from the main branch, **[rebase](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)** the changes, never *merge*.
  * Merging clutters the pull request and makes it hard to review.

## Testing

When you create a pull request, you're responsible for ensuring all tests pass in continuous integration. Fix any build breaks before sending me code to review.

If you've added a feature or otherwise changed behavior, update the automated tests to exercise the new behavior.

If you've modified a feature that's difficult to test with automation, manually test the functionality to exercise the new code. If you can't find a way to do that, warn me that it's untested when you send it for review (this should be extremely rare).

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

I expect you to provide the basic tools you need to operate as a freelance developer (e.g., computer, Internet access, electricity).

I'm happy to pay the cost of any software, services, or equipment that make your work more efficient or pleasant. Just run it by me first.

If I ask you to purchase something related to the job, I'll reimburse you for it on your next invoice.

## Monitoring

I trust you to report your hours honestly. I'll never ask you to "prove" your hours to me or install any surveillance software on your system.

If we're on a platform such as Upwork where monitoring is built-in, I'll always make the monitoring features optional. I won't review the logs unless there's an egregious discrepancy in hours. Even in that case, I'll speak to you before inspecting your logs.

## Payment

Please send me invoices for your hours every two weeks. You can expect payment within five business days of the invoice, usually sooner.

I don't pay bonuses or tips. This is so that your compensation is transparent, and you don't have to wonder about undefined parts left to my discretion.

I pay via PayPal, Payoneer, ACH transfer, or (in the US) a mailed check.

## Post-contract work

I'll never contact you after a job with questions about your work or requests for free changes. It's my responsibility to determine that you delivered everything I requested within your time under contract.

If I discover an issue in your work after I send you payment, I'm responsible for fixing it myself or offering you additional billable hours.

## Taxes

If I pay you more than $600 per calendar year, I need some forms for tax purposes.

* US citizens and residents
  * You'll need to provide a [W-9 form](https://www.irs.gov/pub/irs-pdf/fw9.pdf). At the end of the year, I'll send you a [1099-MISC](https://www.irs.gov/forms-pubs/about-form-1099-misc).
* Non-US freelancers
  * I'll need a [W-8BEN](https://www.irs.gov/pub/irs-pdf/fw8ben.pdf) form that declares you don't owe US taxes.

## Intellectual property

If we're working together on a project where I want to retain intellectual property rights, I'll send you [a contract](https://www.docracy.com/0wceme3njsd/sample-freelance-developer-agreement) to e-sign. It declares that I'm purchasing the copyright for the code you write for me.

The contract relates specifically to work I pay you to produce, not anything you create outside of your paid hours for me.

---
*Cover art by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*

Are you a client or freelancer? I'd love to see similar documents or hear how others approach this problem, so feel free to share in the comments.
