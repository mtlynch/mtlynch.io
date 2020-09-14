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

Reviewing code is difficult. More difficult than writing code.

Presumably, your teammate is an intelligent developer who complements gaps in your skillset. They have a finite amount of focus. They're hopefully dedicating some of their daily focus to help you with your code. For both of your sakes, it's optimal to maximize the value of their focus.

If you treat them like your personal quality assurance person, you're wasting their focus and making them annoyed. If you force them to review changelists that are unnecessarily complicated, you're squandering their focus. If you let the review derail into petty arguments, you're wasting their focus. 

If you value their focus, your reviewer is more likely to identify bugs in your code, more able to think about ways to improve your code's clarity and maintainability, and more likely to share their knowledge with you.

## Review your own code first

Use the same interface that they'll use to read your changes. Don't just read it in your editor. Look at it through the same diff view that your teammate will see.

When you're reviewing your own code, try to come to it with fresh eyes. If I'm wrapping up a change at the end of the day, I wait until morning to review it myself before firing it off.

Careless errors are inevitable, but you should take them seriously. If you send code off for review and it has some debug code you forgot to delete, that's a screwup and you should take steps to prevent similar errors in the future. For example, you can always annotate your debug code with a "DEBUG" comment and then add a pre-commit hook to ensure that you never commit code with the comment still there.

Keep track of your mistakes. Look for patterns in past reviews.

## Answer questions with the code

When I ask code authors why they made a certain choice, what I'm *really* saying is, "This code caused me to ask the following question..."

If your reviewer asks you why you made a choice, add a comment in the code or rewrite your code to make the answer obvious.

## Capture context in the review itself

Figure out why code is the way that it is, the order of preference should be:

1. Code
1. Commit message
1. Review discussion

Write a description that covers everything happening in the change
  Don't explain anything outside of the written review

## Separate functional and non-functional changes

If you're refactoring or fixing code style, do it in its own change.

Similarly, don't obscure functional changes by adding lots of unnecessary style changes

## Keep changes narrowly scoped

Similar, keep changes small. Don't submit changelists one line at a time, but think about how you can break your changes into a series of small, self-contained changes.

## Respond graciously to critiques

Say thanks, good point, especially if the author has taken time to write out a lot.

Thank your reviewer for catching something subtle, "nice catch!"

Don't get defensive. Keep the discussion about the code. Even if they're making it personal (TODO: link to other article), focus on the code.

## Give explicit responses

Respond explicitly to each note to either confirm that you've fixed it (if it requires action) or to acknowledge the note (if it requires no action). If your review tool allows you to mark notes as resolved, that's good. If not, just follow a simple convention like, "Fixed."

Adjust your response based on the effort of their note. If they wrote you a long detailed note, don't just mark it done. Give a thoughtful response because they wrote something thoughtful to you.

## Use tools to catch simple errors

Make the tools part of your normal workflow and not something you have to remember to do because you'll forget. Configure pre-commit hooks, and encourage your team to invest in continuous integration tools that run before every code review.

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