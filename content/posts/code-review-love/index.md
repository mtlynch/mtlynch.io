---
title: How to Make Your Code Reviewer Fall in Love with You
tags:
- code review
- culture
- code style
description: Best practices for code review when you're the author.
date: '2020-12-01'
hero_image: cover.png
images:
- code-review-love/og-cover.jpg
hide_affiliate_warning: true # No affiliate links in this post
---

{{<notice type="danger">}}
**This article is a work in progress. Please do not distribute.**
{{</notice>}}

When people talk about code reviews, they focus on rules the reviewer should follow. What about the author? The person who writes the code is just as important to the review as the developer who reads it. There's scarcely any guidance on preparing your code for this process, so authors often sabotage their own reviews out of sheer ignorance.

This article describes best practices for participating in a code review when you're the author. In fact, by the end of this post, you're going to be so good at sending out your code for review that **your reviewer will literally fall in love with you**.

## But I don't want my reviewer to fall in love with me

They're going to fall in love with you. Deal with it.

Nobody ever complained on their deathbed that too many people fell in love with them.

## Why improve your code reviews?

Improving code review technique helps your reviewer, your team, and, most importantly: you.

* **Learn faster**: If you prepare your changelist properly, it directs your reviewer's attention to areas that support your growth rather than boring issues like style violations. Additionally, your reviewer provides better feedback when you demonstrate an appreciation for constructive criticism.

* **Make others better**: The way you participate in code reviews sets an example for your colleagues. Effective author practices rub off on your teammates, which makes your job easier when they send code to you.

* **Minimize team conflicts**: Code reviews are a common source of friction. Approaching them deliberately and conscientiously minimizes arguments.

## The golden rule: value your reviewer's time

This advice sounds obvious, but I often see authors treat reviewers like their personal quality assurance technicians. These authors make zero effort to catch their own errors or to organize their changelist for reviewability.

Your teammate arrives at work each day with a finite supply of focus. If they allocate some of it to reviewing your code, that's time they can't spend on their own work. It's only fair that you maximize the value of their time.

Reviews drastically improve when participants trust each other. Your reviewer puts in more effort when they can count on you to take their feedback seriously. If you treat your reviewer as an obstacle you have to overcome, you miss out on a valuable perspective.

## Techniques

1. [Review your own code first](#1-review-your-own-code-first)
1. [Write a clear changelist description](#2-write-a-clear-changelist-description)
1. [Automate the easy stuff](#3-automate-the-easy-stuff)
1. [Answer questions with the code itself](#4-answer-questions-with-the-code-itself)
1. [Narrowly scope changes](#5-narrowly-scope-changes)
1. [Separate functional and non-functional changes](#6-separate-functional-and-non-functional-changes)
1. [Break up large changelists](#7-break-up-large-changelists)
1. [Respond graciously to critiques](#8-respond-graciously-to-critiques)
1. [Be patient when your reviewer is wrong](#9-be-patient-when-your-reviewer-is-wrong)
1. [Communicate your responses explicitly](#10-communicate-your-responses-explicitly)
1. [Artfully solicit missing information](#11-artfully-solicit-missing-information)
1. [Award all ties to your reviewer](#12-award-all-ties-to-your-reviewer)
1. [Minimize lag between rounds of review](#13-minimize-lag-between-rounds-of-review)

## 1. Review your own code first

Before sending code to your teammate, read it yourself. Don't just check for mistakes &mdash; imagine reading the code for the first time. What might confuse you?

I find it helpful to take a break between writing my code and reviewing it. People often fire off their changes at the end of the day, but that's when you're least likely to spot your mistakes. Wait until morning, and look at it with fresh eyes before handing a changelist over to your teammate.

{{<img src="what-idiot.jpg">}}

Adopt your reviewer's environment as much as possible. Use the same diff view that they'll see. It's easier to catch careless errors in a diff view than in your regular source editor.

Don't expect yourself to be perfect. Inevitably, you'll send out a changelist with debugging code that you forgot to delete or a stray file you meant to exclude. These mistakes aren't the end of the world, but they're worth tracking. Pay attention to your patterns of error, and think about creating systems to prevent them. If they happen too frequently, it signals to your reviewer that you don't value their time.

## 2. Write a clear changelist description

At my last job, I met regularly with a senior engineer as part of a developer mentorship program. Before our first meeting, he asked me to bring a design document I'd written. As I handed it to him, I explained what the project was and how it aligned with my team's goals. My mentor frowned. "Everything you just told me should be on the first page of your design doc," he said, bluntly.

He was right. I wrote the design document imagining how my teammates would read it, but I failed to consider other readers. There was a broader audience beyond my immediate teammates that included partner teams, mentors, and [promotion committees](/why-i-quit-google/). They should all be able to understand the document as well. Since that discussion, I always think about how to frame my work in a way that explains its context.

Your changelist description should summarize any background knowledge the reader needs. You might have a code reviewer in mind when you write the description, but they don't necessarily have the context you imagine. Besides, your other teammates might need to read this changelist as well, and readers in the future should understand your intentions when they look back on the change history.

A good changelist description explains:

* **what** the change achieves, at a high level
* **why** you're making this change

For an example of an excellent changelist description, see David Thompson's article, ["My favourite Git commit."](https://dhwthompson.com/2019/my-favourite-git-commit)

## 3. Automate the easy stuff

If you rely on your reviewer to notice when your curly braces are on the wrong line or that your change broke the automated test suite, you're egregiously wasting their time.

{{<img src="verify-syntax.jpg">}}

Automated checks should be part of your team's standard workflow. The review begins after [all automated checks pass in a continuous integration environment](/human-code-reviews-1/#let-computers-do-the-boring-parts).

If your team is woefully misguided and refuses to invest in continuous integration, automate these checks yourself. Add [git pre-commit hooks](https://www.atlassian.com/git/tutorials/git-hooks), linters, and formatters to your development environment to ensure that your code observes proper conventions and preserves correct behavior.

## 4. Answer questions with the code itself

What's wrong with this picture?

{{<img src="having-trouble.png" hasBorder="true">}}

The author helped me understand the function, but what about the next person who reads it? Should they dive into the change history and read every code review discussion ever? Worse is when the author comes over to my desk to give me an in-person explanation, which both interrupts my focus and ensures that nobody else ever has access to the information.

When your reviewer expresses confusion about how the code works, the solution isn't to explain it to that one person. You need to explain it to *everyone*.

{{<img src="late-night-question.jpg" maxWidth="600px">}}

The best way to answer someone's question is to refactor the code and eliminate the confusion. Can you rename things or restructure logic to make it more clear? Code comments are an acceptable solution, but they're strictly inferior to code that documents itself naturally.

## 5. Narrowly scope changes

Scope creep is a common anti-pattern in code reviews. A developer starts to fix a logic bug, but they notice a UI blemish in the process. "While I'm here," they think, "I'll just fix this other thing." But now they've muddled things. Their reviewer has to figure out which changes serve goal A and which serve goal B 

The best changelists just [Do One Thing](https://blog.codinghorror.com/curlys-law-do-one-thing/). The smaller and simpler the change, the easier it is for the reviewer to keep all the context in their head. Decoupling unrelated changes also allows you to parallelize your reviews across separate reviewers, reducing turnaround time for your changes.

## 6. Separate functional and non-functional changes

The corollary to scoping changes tightly is separating functional and non-functional changes.

Developers inexperienced with code reviews often violate this rule. They'll make two lines of actual code changes, and then their code editor automatically reformats the entire file. The developer either fails to recognize what they did or decides that the new formatting is better. They send out a two-line functional change buried in hundreds of lines of non-functional whitespace changes.

{{<img src="buried-change.png" hasBorder="true" caption="Can you spot the functional change buried in this changelist's whitespace noise?">}}

Jumbled changelists are a massive insult to your reviewer. Whitespace-only changes are easy to review. Two-line changes are easy to review. Two-line functional changes lost in a sea of whitespace changes are tedious and maddening.

Developers also tend to mix changes inappropriately while refactoring. I love it when my teammates refactor code, but I hate it when they refactor while changing the code's behavior.

{{<gallery caption="The changelist above makes a single change to behavior, but it's hard to find through all the refactoring changes.">}}
  {{<img src="mixed-refactoring.png" maxWidth="550px" hasBorder="true">}}
{{</gallery>}}

If a piece of code requires refactoring *and* behavioral changes, it should happen in two to three changelists:

1. Add tests to exercise the existing behavior (if they're not already there).
1. Refactor the production code while holding the test code constant.
1. Change behavior in the production code and update the tests to match.

By leaving the automated tests untouched in step 2, you prove to your reviewer that your refactoring preserves behavior. When you reach step 3, your reviewer doesn't have to disentangle the behavioral changes from the refactoring changes, as you've decoupled them ahead of time.

## 7. Break up large changelists

Overly large changelists are the ugly cousins of scope creep. A developer finds that they must modify semantics of libraries A and B in order to introduce feature X. If it's a small set of changes, that's fine, but too many of these sprawling modifications can make the changelist enormous.

A changelist's complexity grows exponentially with its size. When my changes exceed 400 lines of production code, I look for opportunities to break it up before requesting a review.

 Instead of changing everything at once, can you change the dependencies first and add the new feature in a subsequent changelist? Can you keep the codebase in a sane state if you add half of the feature now and the other half in the next changelist?

It's tedious to break up your code to find a subset that makes a working, intelligible change, but it yields better feedback and puts less strain on your reviewer.

## 8. Respond graciously to critiques

The fastest way to ruin a code review is to take feedback personally. This is challenging, as many developers take pride in their work and see it as an extension of themselves. If your reviewer tactlessly frames their feedback [in terms of you personally instead of your work](/human-code-reviews-1/#never-say-you), it's even harder.

As the author, [you ultimately control your reaction to feedback](/book-reports/7-habits-of-highly-effective-people/#habit-1-be-proactive). Treat your reviewer's notes as an objective discussion about the code, not your personal worth as a human. Responding defensively will only make things worse.

I try to interpret all notes as helpful lessons. When a reviewer catches an embarrassing bug in my code, my first instinct is to make excuses. Instead, I catch myself and praise my reviewer for their scrupulousness.

{{<notice type="info">}}
TODO(mtlynch): Make this a screenshot.

>`ConvertExcelDateToBasicDate(int32 timestamp) {`
>
>A: This actually won't work for January and February 1900.
>
>B: Wow, nice catch!

{{</notice>}}

Surprisingly, it's a **good** sign when your reviewer spots subtle flaws in your code. It indicates that you're packaging your changelists well. Without all the obvious issues like bad formatting and confusing names, your reviewer can focus deeply on logic and design, yielding more valuable feedback.

## 9. Be patient when your reviewer is wrong

From time to time, reviewers are flat out wrong. Just as you can accidentally write buggy code, your reviewer can misunderstand correct code.

Many developers react to reviewer mistakes with defensiveness. They take it as an affront that someone would insult their code with criticisms that *aren't even true*.

Even when your reviewer is mistaken, that's still a red flag. If they misread it, will others make the same mistake? Does the reader have to exercise an abnormal level of scrutiny to reassure themselves that a particular bug *isn't* there?

{{<notice type="info">}}
TODO(mtlynch): Screenshot of two people arguing in a code review.

>A: There's a buffer overflow vulnerability here since we never verify that `sourceLength <= destinationLength`.
>
>B: In **my** code? Impossible! The constructor calls `PurchaseHats`, which calls `CheckWeather`, which would have returned an error if the buffer length was incorrect. Try actually **reading** the entire 200k line codebase before you even **begin** to entertain the notion that I'm capable of a mistake.
{{</notice>}}

Look for ways to refactor the code, or add comments that make the code more obviously correct. If the confusion stems from obscure language features, rewrite your code using mechanisms that are intelligible to non-experts.

## 10. Communicate your responses explicitly

I frequently run into a scenario where I give someone notes, they update their code to address *some* of my feedback, but they don't write any replies. Now, we're in an ambiguous state. Did they miss my other notes, or are they still working? If I begin a new round of review, I'm potentially wasting my time on a half-finished changelist. If I wait, I might create a deadlock where both of us are expecting the other to continue.

Establish conventions on your team that make it clear who's "holding the baton" at any point. Either the author is working on edits, or the reviewer is writing feedback. There should never be a situation where the process stalls because nobody knows who's doing what. You can accomplish this easily with changelist-level comments that indicate when you're handing control back and forth.

{{<img src="ptal.png" hasBorder="true" caption="Comment on the changelist to communicate explicitly when you hand control back to your reviewer.">}}

For every note that requires action, respond explicitly to confirm that you've addressed it. Some code review tools allow you to mark comments as "resolved." Otherwise, follow a simple convention, like, "Fixed," for each note. If you disagree with the note, politely explain why you declined to take action.

{{<notice type="info">}}
TODO(mtlynch): Screenshot of Reviewable mark as resolved.
{{</notice>}}

Adjust your response based on your reviewer's effort. If they write a detailed note to help you learn something new, don't just mark it done. Respond thoughtfully to show gratitude for their effort.

## 11. Artfully solicit missing information

Sometimes code review notes leave too much to interpretation. When you receive a comment like, "This function is confusing," you probably wonder what "confusing" means, exactly. Is the function too long? Is the name unclear? Does it require more documentation?

For a long time, I struggled with notes like these because it was hard to clarify them without sounding defensive. My instinct was to ask, "What's confusing about it?" but that comes across as grouchy.

Once, I unintentionally sent a vague note to my teammate, and he responded in a way that I found fantastically disarming:

>What changes would be helpful?

I love this response because it signals a lack of defensiveness and openness to criticism. Whenever a reviewer gives me unclear feedback, I always respond with some variation of, "What would be helpful?"

Another useful technique is to guess your reviewer's intent and proactively edit your code based on that assumption. For a note like, "this is confusing," give your code a second look. Usually, there's *something* you can do to improve clarity. A revision communicates to your reviewer that you're amenable to change, even if it's not the one they had in mind.

## 12. Award all ties to your reviewer

In tennis, when you're unsure if your opponent's serve landed out of bounds, you give them the benefit of the doubt. There should be a similar expectation for code reviews.

{{<img src="usta.png" hasBorder="true" alt="A player in attempting to be scrupulously honest on line calls frequently will keep a ball in play that might have been out or that the player discovers too late was out. Even so, the game is much better played this way." caption="The US Tennis Association requires players to [give their opponents the benefit of the doubt when making line calls](https://www.usta.com/content/dam/usta/pdfs/2015_Code.pdf).">}}

Some decisions about code are a matter of personal taste. If your reviewer thinks your 8-line function would be better as two 5-line functions, neither of you is objectively "right." It's a matter of opinion which version is better.

When your reviewer makes a suggestion, and you each have roughly equal evidence to support your position, defer to your reviewer. Between the two of you, they have a better perspective on what it's like to read this code fresh.

## 13. Minimize lag between rounds of review

A few months ago, a user contributed a small change to an open-source project I maintain. I gave them feedback within hours, but they promptly disappeared. I checked again a few days later, and there was still no response.

Six weeks later, the mysterious developer reappeared to submit their revisions. While I appreciated their effort, the lag between rounds of review had doubled my workload. Not only did I have to re-read their code, but I also had to re-read my feedback to bring back to mind the state of the discussion. Had they followed up within a day or two, I wouldn't have had to do all that extra work.

{{<img src="effort-graph.jpg">}}

A six-week pause is extreme, but I frequently see long, unnecessary delays among teammates. Someone sends out a changelist for review, receives feedback, then puts it on the back burner for a week because another task distracted them.

In addition to the time lost in restoring context, half-finished changelists increase complexity. They make it harder for everyone to keep track of what's already merged and what's in-flight. With more partially-complete changelists, there are more merge conflicts, and nobody likes fixing those.

Once you send your code out, driving the review to completion should be your highest priority. Delays on your end waste time for your reviewer and increase complexity for your whole team.

## Conclusion

When preparing your changelists for review, remember the golden rule: value your reviewer's time. If you demonstrate that you care about their experience, they'll return the favor. A reviewer who focuses on the interesting parts of your code generates quality feedback. When they have to untangle your code or police simple mistakes you could have caught yourself, you both suffer.

Congratulations! If you've read to this point and integrated these ideas, you're now an expert reviewee. Your reviewer is likely in love with you, so treat them well.

{{<notice type="info">}}
TODO(mtlynch): Add alt text
{{</notice>}}

{{<htfp-ad>}}

## Further Reading

* [How to do Code Reviews Like a Human](/human-code-reviews-1/): Now that you've learned effective practices from the author side, learn to improve your code reviews when you're the reviewer.

---

*Illustrations by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). Edited by [Samantha Mason](https://www.samanthamasonfreelancer.com).*