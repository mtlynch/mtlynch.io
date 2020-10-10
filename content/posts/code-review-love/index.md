---
title: How to Make Your Code Reviewer Fall in Love with You
tags:
- code review
- culture
- code style
description: TODO
date: '2020-10-25'
hero_image: cover.png
images:
- code-review-love/og-cover.jpg
---
Most discussion of code review best practices focuses on what the reviewer should do. But the reviewer is only part of the equation. The author has just as important a role in ensuring a productive review. This post discusses techniques for improving your code reviews when you're the author.

By the end of this article, you're going to be so good at sending your code out for review that **your reviewer will fall in love with you**.

## But I don't want my reviewer to fall in love with me

They're going to fall in love with you. Deal with it.

Nobody ever complained on their deathbed that too many people fell in love with them.

## Why improve your code reviews?

* Learn faster
  * It will be easier for your reviewer to give you good feedback if you demonstrate that you value constructive criticism. You'll also influence how your reviewers spend their time so they can focus on areas for you to learn rather than catching boring mistakes.
* Make others better
  * The way you participate in code reviews as an author sets an example for others. If you follow good practices, it will rub off on your teammates. Your job of reviewing their code becomes easier.
* Minimize team conflicts
  * Code reviews are sensitive and are a common source of conflict. If you follow good practices, you minimize your chances of conflict.

## The golden rule: value your reviewer's time

Reviewing code is difficult. More difficult than writing code. Your teammate arrives at work each day with a finite supply of focus. If they some of it to you by reviewing your code, that's time they can't spend on their own work. You should maximize the value they provide in that time.

It sounds straightforward, but I so often see authors treat their reviewer as their personal quality assurance technician. They rely on their reviewer to catch careless errors, and they make minimal effort to organize their changelist for reviewability.

The authors aren't bad or rude people. They just don't know better. There's an unfortunate lack of cultural awareness among developers about their responsibilities in a successful code review.

## Techniques

1. Review your own code first
1. Write a clear changelist description
1. Automate the easy stuff
1. Answer questions with the code itself
1. Keep changes narrowly scoped
1. Separate functional and non-functional changes
1. Break up large changelists
1. Respond graciously to critiques
1. Be patient when your reviewer is wrong
1. Provide explicit responses to each note
1. Artfully solicit missing information
1. Award all ties to your reviewer
1. Minimize lag between rounds of review

## Review your own code first

Before sending code to your teammate, read it yourself. Don't just check for mistakes &mdash; think like someone reading these changes for the first time. What would help them understand?

I find it helpful to take a break before reviewing my code. People often rush to get their code checked in, so they fire out their changes at the end of the day, but that's when careless errors are most likely to appear. Wait until morning and take a second look with fresh eyes before handing it over to your teammate.

{{<img src="what-idiot.jpg">}}

Adopt your reviewer's environment as much as possible. Use the same interface that they'll use, which will likely be a diff view. It's easier to catch careless errors in a diff than simply reading code in your normal editor.

You won't catch all of your careless errors reviewing your own code. Sometimes you send out a changelist with some debugging code that you forgot to delete. These mistakes aren't the end of the world, but you should take them seriously, because if they happen too frequently, it signals to your reviewer that you don't value their time. Pay attention to your categories of error, and seek opportunities to add automated checks that catch them.

## Write a clear changelist description

When I was a developer at Google, I was assigned a mentor to give me career advice. He asked me to show him a design doc I'd been working on, so when I gave him a copy, I explained what the project was and how my design doc fit in with my team's goals. "Everything you just told me should be on the first page of your design doc," he said, bluntly.

He was right. I wrote the design document imagining how my teammates would read it, but I failed to consider other readers. Partner teams might want to understand it. I definitely wanted Google's [promotion committee](#TODO) to understand it, as they decided my career trajectory.

Ever since that discussion, I always think about how I can package my work to make the context discoverable to readers.

You might have a code reviewer in mind when you write your code, but they don't necessarily have the context that you assume they do. Besides, other developers on your team should understand the change, and developers in the future should be able to understand it if they ever need to review the change history.

A good changelist description explains:

* **what** the change achieves, at a high level
* **why** you're making this change

For an example of an excellent changelist description, see David Thompson's article, ["My favourite Git commit."](https://dhwthompson.com/2019/my-favourite-git-commit)

## Automate the easy stuff

If you rely on your reviewer to tell you that you put the curly braces on the wrong line or that your change broke the automated test suite, you're criminally (TOOD: different word) wasting their time.

{{<notice type="info">}}

Can you verify that my code syntax is correct? I'd ask the compiler, but I don't want to waste its time.

{{</notice>}}

This should happen at the level of your team. There should be a cultural understanding that a review starts after [all automated checks pass in a continuous integration environment](/human-code-reviews-1/#let-computers-do-the-boring-parts).

If your team is woefully misguided and refuses to invest in continuous integration, you can still perform these checks yourself by adding git pre-commit hooks, linters, and formatters to your development environment. This ensures that your code doesn't go out for review until it matches your team's style and passes your automated checks.

## Answer questions with the code itself

What's wrong with this picture?

>**Me, reviewer**: I'm having trouble understanding the purpose of this function.
>
>**Author**: Oh, it's in case the caller passes a Frombobulator that's missing a frombobulate implementation.

TODO: Make this a screenshot

The author helped me understand the function, but what about the next person who reads it? Should they dive into the change history and read every code review discussion to figure out why it's there? Worse is when the author comes over to my desk to give me an in-person explanation, which both interrupts my focus and ensures that nobody else ever has access to the information.

When your reviewer expresses confusion about how the code works, the solution isn't to explain it to that one person. You need to provide an explanation that's accessible to *every* reader.

{{<img src="late-night-question.jpg" maxWidth="550px">}}

The best solution is to refactor your code to eliminate the confusion. Can you change variable names or restructure the logic to make it more clear?

Sometimes an algorithm is inherently confusing or the code is messy due to non-obvious constraints. In those cases, code comments are an acceptable way to resolve the confusion, but they're inferior to code that's naturally self-documenting.

## Keep changes narrowly scoped

The easiest changelists to review are those that do Just One Thing (TODO: Curly's rule). The smaller and simpler the code review, the faster you can drive it through review, and the easier it is for the reviewer to keep it all in their head.

It's common for developers to violate this with the thought, "I'll just fix this other thing real quick." You're fixing a logic bug, but you notice a UI bug, so you figure you'll just change that, too. But now you've muddled things because your reviewer has to do extra work to figure out which lines are associated with the logic change and which are associated with the UI change. 

If one change turns out to be more complex, the simple change gets dragged along through multiple rounds of review.

## Separate functional and non-functional changes

The corollary to tightly scoping your changes is to separate functional and non-functional changes.

A distressingly common scenario I see, especially on open source projects, is someone makes a two-line change to a file, but their editor automatically reformats the entire file. They either don't realize what they did or decide their formatting is better, so they send out the two-line functional change buried in hundreds of lines of non-functional whitespace changes.

This is a huge insult to your reviewer. Whitespace-only changes are easy to review. Two-line changes are easy to review. If you mix them together, it becomes difficult and tedious to review.

This also applies to refactoring. I love it when my teammates refactor code so that it's easier to understand and maintain. But I don't like it when they refactor it *while* changing its behavior.

TODO: Screenshot of a function changing behavior and being refactored at the same time. First screenshot shows everything changing at once, second screenshot shows refactoring in one step followed by behavior change in second.

If a piece of code requires refactoring *and* behavioral changes, this should happen in two to three changelists:

1. Add tests to exercise the existing behavior (if they're not already there).
1. Refactor the production code while holding the test code constant.
1. Change behavior in the production code and update the tests to match.

By leaving the automated tests untouched in step 2, you prove to your reviewer that your refactoring preserves behavior. When you get to step 3, your reviewer doesn't have to suss out what's a refactoring change and what's a behavioral change because you've properly isolated them ahead of time.

## Break up large changelists

If your changelist includes more than ~500 lines of production code, look for opportunities to break it up.

Too often, developers find that to add feature A, they need modify a parameter to functions B and C. If it's a small set of changes, that's fine, but it can also make a change enormous. Instead of changing everything at once, can you change the dependencies first and add the new feature in a subsequent changelist?

It's probably tedious to break up the code and find a subset that makes a working, intelligible change, but you'll get better feedback and put less strain on your reviewer.

## Respond graciously to critiques

One of the fastest ways to ruin a code review is taking feedback personally. If you take pride in your work, it's easy to feel like criticism of your code is a criticism of you.

Sometimes your reviewer contributes to this by [framing their feedback tactlessly](/human-code-reviews-1/#never-say-you). As the author, [you ultimately control](/book-reports/7-habits-of-highly-effective-people/#habit-1-be-proactive) what to take personally. As much as possible, treat your reviewer's feedback as an objective discussion about the code and not a personal attack. Getting defensive will only make things worse.

I find it helpful to interpret all feedback as helpful lessons. If they catch a subtle bug in my code, my instinct is to explain why I overlooked it. Instead, I focus on how conscientious they were in spotting it, and I'll say something like, "Wow, nice catch!"

When your reviewer catches subtle errors in your code, it's usually a sign that you're packaging your changelists well. You cleared out all the obvious stuff like bad formatting and confusing names so that they could focus deeply on the logic.

## Be patient when your reviewer is wrong

From time time time, your reviewer will give you feedback that's just plain wrong. Maybe they misunderstood your code or a feature of the language. Maybe they were just tired when they read your changelist.

In this situation, many authors fall into defensiveness. They take it as an affront that someone would insult their code with criticisms that *aren't even true*.

Even when your reviewer sees a bug in your code that isn't there, their misunderstanding is still a red flag.

TODO: Screenshot of two people arguing in a code review.

>A: There's a buffer overflow here if the buffer is too short.
>
>B: In **my** code? Impossible! The constructor calls which calls `CheckWeather`, which would have returned an error if the buffer length was incorrect.

If your reviewer got it wrong, will other readers think the same thing? Will they have to do extra work to reassure themselves that a particular bug *isn't* there?

Look for ways to rewrite the code that limit future misunderstandings. Refactor the code or add comments that stave off potential misreadings. If the misunderstanding stems from obscure features or your language or framework, consider replacing them with simpler features.

## Provide explicit responses to each note

For every note you receive from your reviewer that requires action, respond explicitly to confirm that you've addressed the note. The easiest way to do this is if you use a code review tool that supports marking comments as "resolved." If not, follow a simple convention, like commenting, "Fixed."

TODO: Screenshot of Reviewable mark as resolved.

When your reviewer gives you a note, they should trust that you've assumed responsibility of it. If the reviewer has to review all of their own notes to make sure you actually acted on them, it's a waste of their time.

If you ever miss a note, it puts your reviewer in an awkward position. Did you overlook it or just silently reject it? Now they have to chase you down and ask you what happened. If you accidentally marked it as "Fixed" but forgot to fix it, it's at least obvious to your reviewer what happened.

Some notes merit a longer response than, "Fixed." Adjust your response based on your reviewer's effort. If they write you a long, detailed note to help you learn, don't just mark it done. Give a thoughtful response to recognize their thoughtful note to you.

## Artfully solicit missing information

Sometimes your reviewer gives you a note that leaves a lot to interpretation:

>This function is confusing.

Is it too long? Is the function name not clear? Does it require more documentation?

For a long time, I struggled with these notes because it's hard to clarify them without sounding defensive. "What's confusing about it?" can be a sincere question, but it reads as aggressive.

Once, I unintentionally gave a teammate a vague note, and they responded in a way that I found fantastically disarming:

>What changes would be helpful?

I love this response and use variations of it anytime I receive vague feedback in a code review. It doesn't sound defensive at all and makes it clear that you're amenable to changes.

In addition to clarifying the note, try proactively changing your code based on an educated guess of what they mean. If they just said, "This is confusing," give your code a second look. Usually there's *something* you can try to improve clarity. Offering a change signals to your reviewer that you want to accept their feedback, but you just aren't sure how.

## Award all ties to your reviewer

In tennis, when you're unsure whether a serve landed out of bounds, you give your opponent the benefit of the doubt. There should be a similar expectation for code reviews.

>A player in attempting to be scrupulously honest on line calls frequently will keep a ball in play
that might have been out or that the player discovers too late was out. Even so, the game is
much better played this way.
>
>-[*THE CODE: The Players' Guide to Fair Play and the Unwritten Rules of Tennis*](https://www.usta.com/content/dam/usta/pdfs/2015_Code.pdfhttps://www.usta.com/content/dam/usta/pdfs/2015_Code.pdf) by the US Tennis Association


Some decisions about code are a matter of personal taste. If your reviewer says that the code will crash, that's either true or false. If your reviewer thinks a function would be simpler broken into pieces but you feel it's simpler without additional indirection, neither of you is objectively "right." It's a matter of taste.

When your reviewer makes a suggestion and you both have about equal evidence to support your claim, defer to them. Between the two of you, the reviewer has better perspective on what it's like to read this code fresh.

## Minimize lag between rounds of review

Here's a scenario that's not too uncommon on open source projects. A new contributor submits a changelist for review. I review it within a few hours, and then nothing. A month later, they come back to follow up on the notes. Of course, by that point, I've forgotten almost everything about their changelist and have to load it all into context again.

That's an extreme example, but I see it frequently with teams of full-time developers. Someone will send out a changelist for review, get feedback, and then put it on the backburner for a week because they got distracted by another task. The result is that when they do finally resume the review, their reviewer has to once again load all the context of the changelist *and* the state of the discussion, which they've probably forgotten.

TODO: Diagram of total time for a three-round review. Maybe a graph of someone's memory slowly decaying over time?

If a code review goes through three rounds of review, it's far more expensive if those rounds stretch out over two weeks as opposed to two days. In a two-day code review, both the author and the reviewer have the code and discussion in short-term memory, so they don't have to do much work in re-loading context. When it stretches over two weeks, every time the review resumes, both people have to do a lot of work to remember what's happening in the code *and* what's happening in the discussion.

Lastly, complexity increases with the number of changelists in flight. There's more work in remembering the state of the codebase and in resolving merge conflicts.

## Conclusion

Remember the golden rule: value your reviewer's time. If you demonstrate that you care about their experience as a reviewer, they'll return the favor.

Helping your reviewer focus on the interesting parts of your code allows them to give you feedback that helps you grow as a developer rather than superficial stuff like finding out that your whitespace is wrong.

Congratulations! Your reviewer is now in love with you.

TODO: Add alt text

## Further Reading

* [How to do Code Reviews Like a Human](/human-code-reviews-1/): Learn to make your code reviews more effective when you're the reviewer.

---

*Illustrations by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*