---
title: How to Make Your Code Reviewer Fall in Love with You
tags:
- code review
- culture
- code style
description: TODO
date: '2020-10-07'
---

The reviewer is only part of the equation. The author has a larger role in ensuring a productive review.

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

It sounds straightforward, but I so often see code authors violate the golden rule. They treat their reviewer as their personal quality assurance technician, relying on the reviewer to catch bugs. Or they fail to organize their code to make it sensible for a reviewer.

When I see this happen, the authors aren't bad or rude people. They just don't know not to do these things. There isn't widespread cultural awareness among developers about good code review practices or even understanding on most teams on who is responsible for what in a code review.

If you do it well, code reviews are a fantastic way to exchange knowledge and skill, for both the reviewer and reviewee. Your team also benefits from having clear, maintainable code whose providence (provenance?) is inspectable.

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

{{<notice type="info">}}
**CARTOON**

Frame 1

* Dog is reading code and says, "What idiot wrote this?"

Frame 2

* Dog sees his own face on the blame history, which says "Sync garbage collection to the lunar cycle. Dictated but not read."

Frame 3

* Dog is grimacing.
{{</notice>}}

Adopt your reviewer's environment as much as possible. Use the same interface that they'll use, which will likely be a diff view. It's easier to catch careless errors in a diff than simply reading code in your normal editor.

You won't catch all of your careless errors reviewing your own code. Sometimes you send out a changelist with some debugging code that you forgot to delete. These mistakes aren't the end of the world, but you should take them seriously, because if they happen too frequently, it signals to your reviewer that you don't value their time. Pay attention to your categories of error, and seek opportunities to add automated checks that catch them.

## Write a clear changelist description

When I was working as a developer at Google, I met with a senior engineer through a mentorship program. He had agreed to review a design document I wrote, and as I was handing it to him, I started explaining what the project was and how my design doc fit in.

"Everything you just told me should be on the first page of your design doc," my mentor said, bluntly.

He was right. I wrote the design document imagining how my teammates would read it, but I failed to consider other likely readers. Partner teams might want to understand it. I definitely wanted Google's [promotion committee](#TODO) to understand it, as they decided my career trajectory.

Ever since that discussion, I always think about how I can package my work to make the context discoverable to readers.

You might have a code reviewer in mind when you write your code. It's tempting to skimp on the changelist description because you know your intended reviewer doesn't need an explanation. Resist that temptation. The teammate might not have the context that you think they do.

Besides, others on your team should understand the change, and developers in the future should be able to understand it when they look back on it.

A good changelist description explains:

* **what** the change achieves, at a high level
* **why** you're making this change

For an example of an excellent changelist description, see David Thompson's ["My favourite Git commit."](https://dhwthompson.com/2019/my-favourite-git-commit)

## Automate the easy stuff

If you rely on your reviewer to tell you that you put the curly braces on the wrong line or that your change broke the automated test suite, you're criminally (TOOD: different word) wasting their time.

Unlike most other advice in this article, this is something that should happen at the level of your team. There should be a cultural understanding that a review only starts *after* all automated checks pass in a continuous integration environment.

If your team is woefully misguided and refuses to invest in continuous integration tools, you can still perform these checks yourself. Adding git pre-commit hooks, linters, and formatters to your developer environment. This ensures that your code doesn't go out for review until it matches your team's style and passes your automated checks.

## Answer questions with the code itself

What's wrong with this picture?

>**Me, reviewer**: I'm having trouble understanding the purpose of this function.
>
>**Author**: Oh, it's in case the caller passes a Frombobulator that's missing a frombobulate implementation.

TODO: Make this a screenshot

This happes frequently and drives me nuts. Even worse is when the author comes over to my desk to give me an in-person explanation, ensuring that nobody else ever has access to the information.

{{<notice type="info">}}
Cartoon of dog being awakened by a late night phone call.

Frame 1
* B: Hello?
* A: When you wrote foo.py six years ago, why'd you make t=6?

Frame 2
* B: I'm glad you called! It's a 6% sales tax.
* A: Of course!

Frame 3:
* A: This is a good way to communicate implementation choices.

Both are nodding and smiling.
{{</notice>}}

When your reviewer expresses confusion about how the code works, your job isn't to explain it to that one person &mdash; the code needs to make sense to anyone who reads the code.

The best solution is to refactor your code to eliminate the confusion. Can you change variable names or restructure the logic to make it more clear? Sometimes an algorithm is inherently confusing or the code is messy due to non-obvious constraints. In those cases, code comments are an acceptable way to resolve the confusion, but they're inferior to code that's self-documenting.

## Keep changes narrowly scoped

The easiest changelists to review are those that do Just One Thing (TODO: Curly's rule). The smaller and simpler the code review, the faster you can bring it through review, the easier it is for the reviewer to keep it all in their head.

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
1. Refactor the code without touching any tests.
1. Change the behavior and update the tests to match.

By leaving the automated tests untouched in step 2, you prove to your reviewer that your refactoring preserves behavior. When you get to step 3, your reviewer doesn't have to suss out what's a refactoring change and what's a behavioral change.

## Break up large changelists

If your changelist includes more than ~500 lines of production code, look for opportunities to break it up. It's probably tedious to break up the code and find a subset that makes a working, intelligible change, but you'll get better feedback and put less strain on your reviewer.

Too often, developers find that to change A, they need to fix B, C, and D, but they often. You need to adjust an existing API so that change A works. Can you do that first?

I don't know if it's laziness or a misguided idea that a commit history has to match the exact order that they wrote the code, but that's silly.

## Respond graciously to critiques

One of the fastest ways to ruin a code review is taking feedback personally. This is, nevertheless, a common pitfall. If you take pride in your work, it's easy to feel like criticism of your code is a criticism of you.

Sometimes your reviewer contributes to this by framing their feedback tactlessly (TODO: link to other code review article). As the author, you ultimately control what to take personally (TODO: link to 7 havits). As much as possible, treat your reviewer's feedback as an objective discussion about the code and not a personal attack. Getting defensive will only make things worse.

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

In tennis, when the ball lands on the line, you give the point to your opponent.

Some decisions about code are a matter of personal taste. If your reviewer says that the code will crash, that's either true or false. If they say, "This function feels a little too complex. Can we refactor out a helper function?" you might disagree and feel that there's more complexity in having another function. Neither of you are objectively right because it's a matter of taste.

When your reviewer makes a suggestion and you both have about equal evidence to support your claim, defer to them. Between the author and the reviewer, the reviewer has better perspective on what it's like to read this code fresh.

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

## Further Reading

* [How to do Code Reviews Like a Human](/human-code-reviews-1/): Learn to make your code reviews more effective when you're the reviewer.