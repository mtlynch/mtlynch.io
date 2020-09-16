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

By the end of this article, you're going to be so good at code reviews that any teammate who reviews your code will literally fall in love with you.

## But I don't want my reviewer to fall in love with me

They're going to fall in love with you. Deal with it.

Nobody ever goes to their deathbed lamenting that too many people fell in love with them.

## Why get good at receiving code reviews?

* You'll learn faster because it will be easier for your reviewer to give you good feedback.
* You'll make others around you better at receiving code reviews, so your job reviewing their code is easier.

## The golden rule: maximize your reviewer's value

Reviewing code is difficult. More difficult than writing code. Your teammate arrives at work each day with a finite supply of focus. If they give focused attention to giving you a code review, they're giving some of their limited supply of focus to you, so you should maximize the benefit you get from it.

There are many ways to squander the time they give to you:

* Treat them like your personal quality assurance person.
* Send them changelists that are unnecessarily complicated.
* Allow the review to devolve into petty arguments.

If you do it well, code reviews are a fantastic way to exchange knowledge and skill, for both the reviewer and reviewee. Your team also benefits from having clear, maintainable code whose providence (provenance) is inspectable.

## Review your own code first

Use the same interface that they'll use to read your changes. Don't just read it in your editor. Look at it through the same diff view that your teammate will see.

When you're reviewing your own code, try to come to it with fresh eyes. If I'm wrapping up a change at the end of the day, I wait until morning to review it myself before firing it off.

Careless errors are inevitable, but you should take them seriously. If you send code off for review and it has some debug code you forgot to delete, that's a screwup and you should take steps to prevent similar errors in the future. For example, you can always annotate your debug code with a "DEBUG" comment and then add a pre-commit hook to ensure that you never commit code with the comment still there.

Keep track of your mistakes. Look for patterns in past reviews.

## Catch simple errors with automated tools

If your reviewer is telling you that you put the curly braces on the wrong line, you're wasting their time. Similarly, if the reviewer has to tell you that your code broke automated tests

Make the tools part of your normal workflow and not something you have to remember to do because you'll forget. Configure pre-commit hooks, and encourage your team to invest in continuous integration tools that run before every code review.

## Answer questions with the code

One of my biggest pet peeves in a code review is when I ask someone why the code is doing something seemingly nonsensical. They respond by simply leaving me a comment explaining why it is the way it is.

This of course drives me crazy because I wasn't so much asking the question as pointing out that everyone who reads the code will probably wonder the same thing I did. It's great that I have an answer now, but what about the next 50 people who read this code?

TODO: Cartoon of dog being awakened by a late night phone call about variable.
* A: Is this dog?
* B: Yes...
* A: When you wrote foo.py six years ago, why did you multiply totalCost by 0.0625?
* B: I'm glad you called! It's because the tax rate in MA is 6.25%.
* A: This is a good system for understanding implementation choices.

When someone asks you a question about your code, the best way to answer them is by rewriting your code to eliminate the question. Can you change variable names or restructure the logic to answer the question? Adding a comment works, but it's less ideal than code that's self-documenting.

## Capture context in the review itself

Everything you said in this email should be in the design doc itself. If the design doc is self-describing, anyone in the company can read it and understand it.

Figure out why code is the way that it is, the order of preference should be:

1. Code
1. Commit message
1. Review discussion

Write a description that covers everything happening in the change
  Don't explain anything outside of the written review

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

## Give explicit responses

Respond explicitly to each note to either confirm that you've fixed it (if it requires action) or to acknowledge the note (if it requires no action). If your review tool allows you to mark notes as resolved, that's good. If not, just follow a simple convention like, "Fixed."

Adjust your response based on the effort of their note. If they wrote you a long detailed note, don't just mark it done. Give a thoughtful response because they wrote something thoughtful to you.

## Artfully solicit missing information

Sometimes, your reviewer gives you back vague notes. If they just give you a note like, "This function is confusing," that leaves a lot to interpretation. Is the function confusing because it's too long? Is the function name not clear? Does it require more documentation?

I always struggled with these types of notes because I didn't know how to clarify without coming across defensive. If I say, "What's confusing about it?"

First, try to figure it out. Usually, if someone points to a function, there's *something* you can try to make it less confusing.

Once, after unintentionally giving a teammate a vague note, they responded with the solution:

>What changes would be helpful?

It's non-defensive and conveys acceptance of the note and a desire to be helpful.

Whenever I get a vague note, my responses is always some variation on that, like "What would be helpful to add?" 

## Award all ties to your reviewer

Sometimes it's just a matter of personal opinion. If your reviewer says, "This function feels a little too complex. Can we refactor out a helper function?" If you think the function is too simple to merit a helper function, you should just make a helper function.

Between the author and the reader, the reader has better perspective on what it's like to read this code fresh.

If they make a suggestion and you both have about equal evidence to support your claim (or the strength of your opinion is about equal), defer to them. They're telling you what makes sense to another person, so because they're not you, they have more authority on what readers will think.

## Be patient when your reviewer is wrong

Angrily explain why the reviewer is wrong. There's no buffer overflow because three layers down in the call stack, we checked the length.

Can you rewrite the code to minimize the chances of someone making that type of mistake?

Sometimes they missed something.
Was it because they made a mistake or can you change the code to make that kind of misunderstanding less likely?

The fact that they misunderstood is still a red flag.

## Minimize lag between rounds of review

Avoid long gaps between rounds of review. Follow up on notes quickly so that the reviewer can keep context in their head.

## Preserve links to external references

If you're referring to anything external, link to it in the commit message or code comments.

Don't just say "based on the Foo design doc." Link to the design doc.

https://www.conventionalcommits.org/en/v1.0.0-beta.2/