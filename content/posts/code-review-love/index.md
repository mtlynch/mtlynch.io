---
title: How to Make Your Code Reviewer Fall in Love with You
tags:
- code review
- culture
- code style
description: TODO
date: '2020-10-07'
---

How to make your code reviewer fall in love with you

The reviewer is only part of the equation. The author has a larger role in ensuring a productive review.

By the end of this article, you're going to be so good at sending your code out for review that **your reviewer will literally fall in love with you**.

## But I don't want my reviewer to fall in love with me

They're going to fall in love with you.

Deal with it.

Besides, nobody ever complained on their deathbed that too many people fell in love with them.

## Why improve your code reviews?

* Learn faster
  * It will be easier for your reviewer to give you good feedback if you demonstrate that you value constructive criticism. You'll also influence how your reviewers spend their time so they can focus on areas for you to learn rather than catching boring mistakes.
* Make others better
  * The way you participate in code reviews as an author sets an example for others. If you follow good practices, it will rub off on your teammates. Your job of reviewing their code becomes easier.
* Minimize team conflicts
  * Code reviews are sensitive and are a common source of conflict. If you follow good practices, you minimize your chances of conflict.

## The golden rule: value your reviewer's time

Reviewing code is difficult. More difficult than writing code. Your teammate arrives at work each day with a finite supply of focus. If they give focused attention to giving you a code review, that's time they can't spend on their own work. You should maximize the value they provide in that time.

It sounds straightforward, but I so often see code authors violate the golden rule. They treat their reviewer as their personal quality assurance technician, relying on the reviewer to catch bugs. Or they fail to organize their code to make it sensible for a reviewer.

When I see this happen, the authors aren't bad or rude people. They just don't know not to do these things. There isn't widespread cultural awareness among developers about good code review practices or even understanding on most teams on who is responsible for what in a code review.

If you do it well, code reviews are a fantastic way to exchange knowledge and skill, for both the reviewer and reviewee. Your team also benefits from having clear, maintainable code whose providence (provenance?) is inspectable.

## Review your own code first

Use the same interface that they'll use to read your changes. Don't just read it in your editor. Look at it through the same diff view that your teammate will see.

When you're reviewing your own code, try to come to it with fresh eyes. If I'm wrapping up a change at the end of the day, I wait until morning to review it myself before firing it off.

{{<notice type="info">}}
**CARTOON**

Frame 1

* Dog is reading code and says, "What idiot wrote this?"

Frame 2

* Dog sees his own face on the blame history, which says "Sync garbage collection to the lunar cycle. Dictated but not read."

Frame 3

* Dog is grimacing.
{{</notice>}}

Inevitably, you'll miss a careless error in your own code. When your reviewer is finding things like commented out lines that you forgot to delete or debug code that you didn't mean to check in, that's a signal that you need to review your code more carefully and potentially add automated checks that catch your common classes of error.

## Write a clear changelist description

Once, when I was at Google, my manager arranged for me to meet with an. "Everything you just told me should be in the introduction to your design doc. If the [promotion committee](#TODO) reads your doc, they won't have the proper context." He was right, and, ever since, that discussion has informed how I package my work with the context that explains it.

You might have a code reviewer in mind when you write your code. It's tempting to skimp on the changelist description because you know your intended reviewer doesn't need an explanation. Resist that temptation. The teammate might not have the context that you expect. Besides, others on your team should understand the change, and developers in the future should be able to understand it when they look back on it.

A good changelist description explains:

* **what** the change achieves, at a high level
* **why** you're making this change

For an example of an excellent changelist description, see David Thompson's ["My favourite Git commit."](https://dhwthompson.com/2019/my-favourite-git-commit)

## Catch the easy stuff with automated tools

If you're relying on your reviewer to tell you that you put the curly braces on the wrong line or that your change broke the automated test suite, you're squandering their time.

This should happen at the team level. There should be a cultural understanding that the review doesn't begin until all automated checks pass in continuous integration. If your team is crazy and won't invest in continuous integration, you can still perform these checks yourself by adding scripts like git pre-commit hooks, linters, and formatters to your developer environment. These will ensure that your code doesn't go out for review until it matches your team's style and passes automated tests.

## Answer questions with the code itself

One of my biggest pet peeves in a code review is when I give someone a note saying that I can't understand a piece of code, and they react by just leaving the code as-is and explaining their choices in a code review note. The worst is when they walk over to my desk to give me an in-person explanation, ensuring that nobody else ever has access to the information.

This of course drives me crazy because I wasn't so much asking the question as pointing out that everyone who reads the code will probably wonder the same thing I did. It's great that I have an answer now, but what about the next 50 people who read this code?

{{<notice type="info">}}
Cartoon of dog being awakened by a late night phone call.

Frame 1
* B: Hello?
* A: When you wrote foo.py six years ago, why did you multiply totalCost by 0.0625?

Frame 2
* B: I'm glad you called! It's because the tax rate in MA is 6.25%.
* A: Of course!

Frame 3:
* A: This is a good system for understanding implementation choices.

Both are nodding and smiling.
{{</notice>}}

When someone asks you a question about your code or indicates that they had trouble understanding it, refactor it to eliminate the confusion. Can you change variable names or restructure the logic to answer their question? Adding inline comments is alright, but it's less ideal than code that's self-documenting.

## Keep changes narrowly scoped

The easiest changelists to review are those that do Just One Thing (TODO: Curly's rule). The smaller and simpler the code review, the faster you can bring it through review, the easier it is for the reviewer to keep it all in their head.

The first is, "I'll just fix this other thing real quick." You're fixing a logic bug, but you notice a UI bug, so you figure you'll just change that, too. But now you've muddled things because your reviewer has to do extra work to figure out which lines are associated with the logic change and which are associated with the UI change. It also means that if one change turns out to be more complex, the simple change gets dragged along through multiple rounds of review

The second common scenario where developers pollute their changelist is when a change touches many separate components. For example, a new feature in component A might require 400 lines of changes to libraries B and C.

## Separate functional and non-functional changes

The corollary to tightly scoping your changes is to separate functional and non-functional changes?

A distressingly common scenario I see, especially on open source projects, is someone makes a two-line change to a file, but their editor automatically reformats all the code. They figure, "." This is a huge insult to your reviewer. Whitespace-only changes are easy to review. A two-line change is easy to review. but if you force your reviewer to scan through a bunch of whitespace changes to find the lines that actually matter, you're wasting their time tremendously.

This also applies to refactoring. I love it when my teammates refactor code so that it's easier to understand and maintain. But I don't like it when they refactor it *while* changing its behavior.

TODO: Screenshot of a function changing behavior and being refactored at the same time. First screenshot shows everything changing at once, second screenshot shows refactoring in one step followed by behavior change in second.

If a piece of code requires refactoring *and* behavioral changes, this should happen in two to three changelists:

1. Add tests to exercise the existing behavior (if they're not already there).
1. Refactor the code without touching any tests.
1. Change the behavior and update the tests to match.

By leaving the automated tests untouched in changelist (2), you prove to your reviewer that your refactoring preserves behavior. When you get to changelist (3), your reviewer doesn't have to suss out what's a refactoring change and what's a behavioral change.

## Break up large changelists

If your changelist includes more than ~500 lines of production code, look for opportunities to break it up. It's probably tedious to break up the code and find a subset that makes a working, intelligible change, but you'll get better feedback and put less strain on your reviewer.

Too often, developers find that to change A, they need to fix B, C, and D, but they often. You need to adjust an existing API so that change A works. Can you do that first?

I don't know if it's laziness or a misguided idea that a commit history has to match the exact order that they wrote the code, but that's silly.

## Respond graciously to critiques

One of the fastest ways to ruin a code review is taking it personally. This is an easy pitfall to fall into. If you take pride in your work, it's easy to feel like criticism of your code is a criticism of you.

Sometimes your reviewer contributes to this by framing their feedback tactlessly (TODO: link to other code review article). As the author, you ultimately control what to take personally (TODO: link to 7 havits). As much as possible, treat your reviewer's feedback as an objective discussion about the code and not a personal attack. Don't get defensive.

I feel a twinge of embarrassment when my reviewer catches a subtle bug in my changelist, but I try to frame it as . I'll say, "Wow, nice catch!" It's not about how dumb you are, it's how much you appreciate your reviewer being focused enough during your code review to spot that bug. When your reviewer catches subtle errors in your code, it can be a good sign because your code is organized well enough for them to do that.

## Be patient when your reviewer is wrong

Angrily explain why the reviewer is wrong. There's no buffer overflow because three layers down in the call stack, we checked the length.

Can you rewrite the code to minimize the chances of someone making that type of mistake?

Sometimes they missed something.
Was it because they made a mistake or can you change the code to make that kind of misunderstanding less likely?

The fact that they misunderstood is still a red flag.

{{<notice type="info">}}
No there **can't** be an integer overflow here.

If you had bothered to read the compiled assembly, you'd know that rax is equal to -7 at this point.

And everyone who has read the Sacred IA-32 limited edition manual knows, setting RAX to -7 tells the CPU to automatically fix your integer overflows.
{{</notice>}}

## Provide explicit responses to each note

Respond explicitly to each note to either confirm that you've fixed it (if it requires action) or to acknowledge the note (if it requires no action). If your review tool allows you to mark notes as resolved, that's good. If not, just follow a simple convention like, "Fixed."

Adjust your response based on the effort of their note. If they wrote you a long detailed note, don't just mark it done. Give a thoughtful response because they wrote something thoughtful to you.

Did you miss the note or just silently reject it? This puts your reviewer in an awkward position. Also, this is a waste of your reviewer's time. When they give you a note, they should trust that you'll assume responsibility of it. If they have to review all of their own notes to make sure you actually acted on them, it's a waste of their time.

## When you receive vague notes, artfully solicit missing information

If your reviewer gives you a note like, "This function is confusing," that leaves a lot to interpretation. Is it too long? Is the function name not clear? Does it require more documentation?

I always struggled with these types of notes because attempts to clarify criticism can easily come across as defensiveness. "What's confusing about it?" sounds defensive.

Once, after I unintentionally gave a teammate a vague note, they responded with the solution:

>What changes would be helpful?

I loved it. It doesn't sound defensive at all and makes it clear that the author is amenable to changes. I immediately stole the line and encourage you to do the same.

An additional step is to proactively make changes while you solicit clarification. If they just said, "This is confusing," give your code a second look. Usually there's *something* you can try to improve clarity. 

## Award ties to your reviewer

In tennis, when the ball lands on the line, you give the point to your opponent.

Sometimes it's just a matter of personal opinion. If your reviewer says, "This function feels a little too complex. Can we refactor out a helper function?" If you think the function is too simple to merit a helper function, you should just make a helper function.

Between the author and the reader, the reader has better perspective on what it's like to read this code fresh.

If they make a suggestion and you both have about equal evidence to support your claim (or the strength of your opinion is about equal), defer to them. They're telling you what makes sense to another person, so because they're not you, they have more authority on what readers will think.

## Minimize lag between rounds of review

This is one I think is widely underappreciated, but it's important to keep a review moving forward swiftly.

I maintain some open source projects, and sometimes I'll review code within a few hours of someone submitting it, and then they come back a month later to follow up on the notes. Of course, by that point, I've forgotten almost everything about their changelist and have to load it all into context again.

That's an extreme example, but I see it frequently with teams of full-time developers. Someone will send out a changelist for review, get feedback, then get distracted by another task and wait a week to continue their original code review. People don't consider the cost of the reviewer loading everything into context again.

The more open changelists in flight, the more confusing it is for everyone. A code review that takes six hours of work feels way worse if it's spread out over two weeks than one that you complete in a day or two.

## Conclusion

Remember the golden rule: value your reviewer's time. If you demonstrate that you care about their experience as a reviewer, they'll return the favor.

Helping your reviewer focus on the interesting parts of your code allows them to give you feedback that helps you grow as a developer rather than superficial stuff like finding out that your whitespace is wrong.

## Further Reading

* [How to do Code Reviews Like a Human](/human-code-reviews-1/): My tips for how to handle code review when you're the reviewer.