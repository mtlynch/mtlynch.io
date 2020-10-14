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
Most advice around code reviews focuses on what the reviewer should do. But the author is just as important to a successful code review as the reviewer. Sadly, there is little guidance for authors, so people make big mistakes simply because they don't know an alternative.

This article describes best practices for participating in a code review when you're the author. In fact, by the end of this post, you're going to be so good at sending your code out for review that **your reviewer will fall in love with you**.

## But I don't want my reviewer to fall in love with me

They're going to fall in love with you. Deal with it.

Nobody ever complained on their deathbed that too many people fell in love with them.

## Why improve your code reviews?

Improving your technique in code reviews helps your reviewer, your team, and most importantly you.

* Learn faster
  * If you properly prepare changelists for review, it directs your reviewer's attention to areas where you can grow as a developer rather than boring mistakes you made.
  * Your reviewer will provide better feedback when you demonstrate that you value constructive criticism.
* Make others better
  * The way you participate in code reviews as an author sets an example for others. If you follow good practices, it will rub off on your teammates. This makes your job easier when you're reviewing their code.
* Minimize team conflicts
  * Code reviews are sensitive and are a common source of conflict. Approaching code reviews deliberately and conscientiously minimizes conflict.

## The golden rule: value your reviewer's time

Reviewing code is difficult. It's harder than writing the code in the first place.

Your teammate arrives at work each day with a finite supply of focus. If they allocate some of it to you by reviewing your code, that's time they can't spend on their own work. You should maximize the value they provide in that time.

It sounds straightforward, but I so often see authors treat their reviewer as their personal quality assurance technician. They rely on their reviewer to catch careless errors, and they make minimal effort to organize their changelist for reviewability.

Reviews improve drastically when participants trust each another. If you think your reviewer is out to find fault in your code as a way of feeling superior, you're not going to learn from their feedback. Similarly, if your reviewer feels that you're dismissive of their notes, they won't put effort into helping you. Demonstrating respect for your reviewer's time builds trust in the review process.

## Techniques

TODO(mtlynch): Add links for all of these.

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

If you rely on your reviewer to tell you that you put the curly braces on the wrong line or that your change broke the automated test suite, you're wasting their time tremendously.

{{<img src="verify-syntax.jpg">}}

Automated checks should be part of your entire team's normal workflow. There should be a cultural understanding that a review starts after [all automated checks pass in a continuous integration environment](/human-code-reviews-1/#let-computers-do-the-boring-parts).

If your team is woefully misguided and refuses to invest in continuous integration, perform these checks yourself by adding git pre-commit hooks, linters, and formatters to your development environment. This ensures that your code doesn't go out for review until it matches your team's style and passes your automated checks.

## Answer questions with the code itself

What's wrong with this picture?

>**Me, reviewer**: I'm having trouble understanding the purpose of this function.
>
>**Author**: Oh, it's in case the caller passes a Frombobulator that's missing a frombobulate implementation.

TODO: Make this a screenshot

The author helped me understand the function, but what about the next person who reads it? Should they dive into the change history and read every code review discussion to figure out why it's there? Worse is when the author comes over to my desk to give me an in-person explanation, which both interrupts my focus and ensures that nobody else ever has access to the information.

When your reviewer expresses confusion about how the code works, the solution isn't to explain it to that one person. You need a way to allow *every* reader to understand it.

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

One of the fastest ways to ruin a code review is taking feedback personally. This is difficult for many developers. If you take pride in your work, it's easy to feel like criticism of your code is a criticism of you. Sometimes your reviewer contributes to this by [framing their feedback as a personal critique](/human-code-reviews-1/#never-say-you).

As the author, [you ultimately control how you react to feedback](/book-reports/7-habits-of-highly-effective-people/#habit-1-be-proactive). As much as possible, treat your reviewer's feedback as an objective discussion about the code and not a personal attack. Getting defensive will only make things worse.

I find it helpful to interpret all feedback as helpful lessons. My instinct is often to explain why I overlooked a subtle bug that my reviewer found. Instead, I focus on how conscientious my reviewer was in spotting the issue for me. Rather than make excuses for myself, I praise my reviewer for the find, like, "Wow, nice catch!"

Surprisingly, a reviewer catching subtle bugs in your code is generally a sign that you're packaging your changelists well. When you clear out all the obvious stuff like bad formatting and confusing names, your reviewer can focus deeply on the logic and generate more interesting feedback.

## Be patient when your reviewer is wrong

From time time time, reviewers are just plain wrong. Just as the author can make mistakes in writing code, the reviewer can screw up reading it.

Many developers react to reviewer mistakes with defensiveness. They take it as an affront that someone would insult their code with criticisms that *aren't even true*.

Even when your reviewer sees a flaw in your code that isn't there, that's still a red flag. If your reviewer got it wrong, will other readers make the same mistake? Will they have to do extra work to reassure themselves that a particular bug *isn't* there?

TODO: Screenshot of two people arguing in a code review.

>A: There's a buffer overflow vulnerability here since we never verify that `sourceLength <= destinationLength`.
>
>B: In **my** code? Impossible! The constructor calls which calls `CheckWeather`, which would have returned an error if the buffer length was incorrect. Try actually **reading** the entire 200k line codebase before you even begin to entertain the notion that I'm capable of a mistake.

Look for ways to rewrite the code that limit future misunderstandings. Refactor the code or add comments that stave off potential misreadings. If the misunderstanding stems from obscure features of your language or framework, switch to mechanisms that make your choices obvious to non-experts.

## Provide explicit responses to each note

For every note you receive from your reviewer that requires action, respond explicitly to confirm that you've addressed the note. If your code review tool supports it, mark comments as "resolved." If not, follow a simple convention, like a comment of, "Fixed," for each note.

TODO: Screenshot of Reviewable mark as resolved.

When your reviewer gives you a note, they should trust that you've assumed responsibility of it. If the reviewer has to review all of their own notes to verify that you've handled them, it's a waste of the reviewer's time.

Adjust your response based on your reviewer's effort. If they write you a detailed note to help you learn something new, don't just mark it done. Respond thoughtfully to recognize their helpful note to you.

## Artfully solicit missing information

Sometimes code review notes leave too much to interpretation. If you receive a note like, "This function is confusing," you'd probably wonder what "confusing" means, exactly. Is the function too long? Is the function name not clear? Does it require more documentation?

For a long time, I struggled with these notes because it's hard to clarify them without sounding defensive. "What's confusing about it?" sounds grouchy, even if I write it sincerely.

Once, I unintentionally gave a teammate a vague note, and they responded in a way that I found fantastically disarming:

>What changes would be helpful?

I love this response, and I use variations of it whenever I receive unclear feedback in a code review. It lacks defensiveness and signals openness to feedback.

You can also proactively edit your code based on your best guess of your reviewer's intent. For a note like, "this is confusing," give your code a second look. Usually there's *something* you can do to improve clarity. Proactively offering a change communicates to your reviewer that you're open to change, even if it's not the change they intended.

## Award all ties to your reviewer

In tennis, when you're unsure if your opponent's serve landed out of bounds, you give them the benefit of the doubt. There should be a similar expectation for code reviews.

>A player in attempting to be scrupulously honest on line calls frequently will keep a ball in play
that might have been out or that the player discovers too late was out. Even so, the game is
much better played this way.
>
>-[*THE CODE: The Players' Guide to Fair Play and the Unwritten Rules of Tennis*](https://www.usta.com/content/dam/usta/pdfs/2015_Code.pdfhttps://www.usta.com/content/dam/usta/pdfs/2015_Code.pdf) by the US Tennis Association


Some decisions about code are a matter of personal taste. If your reviewer thinks your 8-line function would be better as two 5-line functions, neither of you is objectively "right." It's a matter of opinion which version is better.

When your reviewer makes a suggestion, and you both have about equal evidence to support your position, defer to your reviewer. Between the two of you, the reviewer has better perspective on what it's like to read this code fresh.

## Minimize lag between rounds of review

A few months ago, a reviewer contributed a small change to an open source project I maintain. I gave them feedback within a few hours, and then they disappeared. After a few days, I checked back to make sure I didn't overlook a notification, but there was still no response from the author.

A month later, the author finally popped up again to submit their revisions. While I appreciated their effort, the lag between review rounds doubled my work. Not only did I have to re-read their code, I had to re-read my feedback as well to recall the full context. Had they followed up within a day or two, I wouldn't have to do all that extra work.

That's an extreme example, but I see it frequently with teams of full-time developers. Someone will send out a changelist for review, get feedback, and then put it on the backburner for a week because they got distracted by another task.

TODO: Diagram of total time for a three-round review. Maybe a graph of someone's memory slowly decaying over time?

In addition to the time lost in restoring context, half-finished changelists increase complexity. It's harder for everyone to keep track of what's already merged and what's pending, and it leads to more merge conflicts.

Once you send your code out for review, driving the review to completion should be one of your highest priorities. Delays on your end waste your reviewer time and increase complexity for your teammates.

## Conclusion

Remember the golden rule: value your reviewer's time. If you demonstrate that you care about their experience as a reviewer, they'll return the favor.

Helping your reviewer focus on the interesting parts of your code allows them to give you feedback that helps you grow as a developer rather than superficial stuff like finding out that your whitespace is wrong.

Congratulations! Your reviewer is now in love with you.

TODO: Add alt text

## Further Reading

* [How to do Code Reviews Like a Human](/human-code-reviews-1/): Now that you're an expert reviewee, learn to make your code reviews more effective when you're the reviewer.

---

*Illustrations by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*