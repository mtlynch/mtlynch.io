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
**CARTOON**: Dog is reading code and says, "What idiot wrote this?" Next frame shows him see his own face on the blame history, which says "Sync garbage collection to the lunar cycle. Dictated but not read." Dog in last face is grimacing.
{{</notice>}}

Inevitably, you'll miss a careless error in your own code. When your reviewer is finding things like commented out lines that you forgot to delete or debug code that you didn't mean to check in, that's a signal that you need to review your code more carefully and potentially add automated checks that catch your common classes of error.

## Write a clear changelist description

Once, when I was at Google, I . Everything you just told me should be in the introduction to your design doc. He was right.

If you have a reviewer in mind, don't just write an explanation for them, write an explanation that makes sense to anyone on your team.

## Catch the easy stuff with automated tools

If your reviewer is telling you that you put the curly braces on the wrong line, you're wasting their time. Similarly, if the reviewer has to tell you that your code broke automated tests, there's a problem with your code review process. It should be understood that the review doesn't start until automated tests pass.

Make the tools part of your normal workflow and not something you have to remember to do because you'll forget. Configure pre-commit hooks, and encourage your team to invest in continuous integration tools that run before every code review.

## Answer questions with the code

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

Similar, keep changes small. Don't submit changelists one line at a time, but think about how you can break your changes into a series of small, self-contained changes.

## Separate functional and non-functional changes

The ugly cousin of mixed changes are mixing functional and non-functional changes. For example, someone changes a few lines in a file, but decides that while they're there, why not reflow all the whitespace?

I'm a big fan of consistent coding conventions. If you use tools that reformat your code to apply consistent conventions, that's a win. I also like refactoring.

Please don't do this! Reviewing a whitespace-only change is generally pretty easy. The reviewer can scan through and double check that whitespace changes didn't break anything.

There's a similar deal with refactoring. Sometimes you need to make a change to a function that's so messy that you can't edit it without doing some cleanup. That's great, but do your cleanup in its own changelist. If you clean up code and show that the tests still pass. What? You don't have tests? Okay, write tests in a first changelist, refactor code in a second, then make changes in a third.

The problem is when people

If you're refactoring or fixing code style, do it in its own change.

Similarly, don't obscure functional changes by adding lots of unnecessary style changes

## Respond graciously to critiques

Say thanks, good point, especially if the author has taken time to write out a lot.

Thank your reviewer for catching something subtle, "nice catch!"

Don't get defensive. Keep the discussion about the code. Even if they're making it personal (TODO: link to other article), focus on the code.

## Be patient when your reviewer is wrong

Angrily explain why the reviewer is wrong. There's no buffer overflow because three layers down in the call stack, we checked the length.

Can you rewrite the code to minimize the chances of someone making that type of mistake?

Sometimes they missed something.
Was it because they made a mistake or can you change the code to make that kind of misunderstanding less likely?

The fact that they misunderstood is still a red flag.

## Provide explicit responses to each note

{{<notice type="info">}}
Dog curses on each note?
{{</notice>}}

Respond explicitly to each note to either confirm that you've fixed it (if it requires action) or to acknowledge the note (if it requires no action). If your review tool allows you to mark notes as resolved, that's good. If not, just follow a simple convention like, "Fixed."

Adjust your response based on the effort of their note. If they wrote you a long detailed note, don't just mark it done. Give a thoughtful response because they wrote something thoughtful to you.

Did you miss the note or just silently reject it? This puts your reviewer in an awkward position. Also, this is a waste of your reviewer's time. When they give you a note, they should trust that you'll assume responsibility of it. If they have to review all of their own notes to make sure you actually acted on them, it's a waste of their time.

## Artfully solicit missing information

Sometimes, your reviewer gives you back vague notes. If they just give you a note like, "This function is confusing," that leaves a lot to interpretation. Is the function confusing because it's too long? Is the function name not clear? Does it require more documentation?

I always struggled with these types of notes because attempts to clarify criticism can easily come across as defensiveness. If someone says, "This is confusing," my first instinct is to say, "What's confusing about it?" but that sounds defensive.

A good way to demonstrate that you're not being defensive is by proactively making changes while you solicit clarification. If they just said, "This is confusing," give your code a second look. Usually there's *something* you can try to improve clarity.

First, try to figure it out. Usually, if someone points to a function, there's *something* you can try to make it less confusing.

Once, after unintentionally giving a teammate a vague note, they responded with the solution:

>What changes would be helpful?

It's non-defensive and conveys acceptance of the note and a desire to be helpful.

Whenever I get a vague note, my responses is always some variation on that, like "What would be helpful to add?" 

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

Remember the golden rule: value your reviewer's time.

## Further Reading

* [How to do Code Reviews Like a Human](/human-code-reviews-1/): My tips for how to handle code review when you're the reviewer instead of the author.