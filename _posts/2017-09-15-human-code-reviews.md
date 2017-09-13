---
title: How to Do Code Reviews Like a Human
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
---

I love code reviews. They are my favorite part of working on a team with other developers.


A lot of articles appear to be written in the future where your co-workers are robots and pointing out errors warms their cold robot hearts. Or they assume that your co-workers are idiots and you have to constantly be on them to prevent their next idiot mistake. It's like reading a guide to a healthy marriage that's all about how to identify your spouse's flaws.

I think most articles about code reviews miss the point because **code reviews are not about finding bugs**. If you approach a code review trying to catch the most bugs, you will lose out on most of the value and fun of code reviews.

At its heart, source code is a way of expressing ideas to other developers. When you review code, you are assessing how well it expresses its ideas to you.

You're not there to catch them out on errors. You're there to make the code excellent and help them.

I don't start thinking about correctness until I feel the code is easy to reason about


* TOC
{:toc}

# Assumptions

Before we go any further, let's make some assumptions explicit. This advice applies to code reviews generally, but it will work best in an environment where the following conditions hold true:

* Your co-workers are humans
  * Their reactions to criticism and their ability to learn from this criticism fall within the range of behavior one would expect of humans.
* You are reviewing code for people you will work with regularly
  * A lot of these suggestions are based on the assumption that you're working with your teammates on a regular basis. If you work on a project with a lot of drive-by submissions, this might not work the same.
* You are in an organization that agrees code reviews are a good idea.
  * These suggestions will work best on a team where no code is checked in until a reviewer approves it, but they should still work in any code review.
* Code reviews are written and asynchronous.
* Code reviews are not complete until a reviewer explicitly grants approval.
* You have a non-bad relationship with the author
  * These techniques will work with teammates you have no history with and will work especially well with teammates whom you get along with well. If you're reviewing code for someone who hates you, you have team dynamics problems that code review techniques can't fix.
  * If the reviewer doesn't respect the author, it will probably come across in the tone of review notes and they'll be too quick to assume that the author made a coding decision because they're a bad programmer. If the author doesn't respect the reviewer, they'll want to fight against all of their notes.
 * Your team has unit tests and a cultural expectation that functional changes to the code be accompanied by corresponding unit tests.

## Terms

* Diff
* Changelist. Github has popularized the idea of a "pull request" or which is a proposal for a series of changelists to be merged into a source repository.
* A "round" of review is the sequence of the reviewer giving the author notes and the reviewer responding with changes based on those notes. Every code review has one or more rounds. The final round occurs when the reviewer gives their approval on the changes.

## Goals

* Teammates like each other
* Team produces high quality code
* Minimize dev cost


# Why is this hard?

Programmers tend to overestimate the quality of the code they write. If a programmer sends you a changelist that they think is awesome, and you write them back with list of reasons why it's not, that's a sensitive message to get across.

>That's one reason I don't miss IT, because programmers are very unlikable people... In aviation, for example, people who greatly overestimate their level of skill are all dead.<br>-Philip Greenspun, co-founder of ArsDigita

# Techniques

## Let robots do the boring parts

Developer time is limited and developer mental stamina even moreso. Don't squander these precious resources on code review tasks that you can automate.

| Task | Automated solution |
|-------|--------------------------|
| Verify the code builds | Continuous integration solution such as [Travis](https://travis-ci.com) or [CircleCI](https://circleci.com/). |
| Verify automated tests pass | Continuous integration solution such as [Travis](https://travis-ci.com) or [CircleCI](https://circleci.com/). |
| Verify code whitespace matches team style | Code formatter, such as [YAPF](https://github.com/google/yapf) (Python formatter) or [gofmt](https://golang.org/cmd/gofmt/) (golang formatter) |
| Identify unused imports or unused variables | Code linters, such as [pyflakes](https://pypi.python.org/pypi/pyflakes) (Python linter) or [JSLint](http://jslint.com/help.html) (JavaScript linter)

Structure your code reviews so that the requests for review don't even go out until all the build checks pass. Code reviews are mentally taxing. Don't squander the limited mental stamina you have with mechanical checks like whether the line breaks are in the right place.

This saves time because the author can identify simple issues before they even involve a second person for review. It also leads to better reviews because it narrows the universe of possibilities of issues that the reviewer is looking for.

It's obviously not possible to build a comprehensive "checklist" of every possible issue the reviewer is checking for, but if you hypothetically had one, you could probably eliminate 30% of the potential issues.

## Focus on readability, not correctness

Your job as code reviewer is to ensure that the code is easy to read and reason about. When I review code, the following quote often comes to mind:

>There are two ways of constructing a software design: One way is to make it so simple that there are *obviously* no deficiencies, and the other way is to make it so complicated that there are no *obvious* deficiencies. <br>-Tony Hoare

If you focus on helping the author make their code easy to understand, correctness will naturally follow. Instead of trying to think of edge cases that would break their code, read their unit tests. If you can think of edge cases that are not covered in the author's unit tests, don't waste mental energy testing the code in your head to see if your edge case would break their code. Just ask them to write the unit test. Did the *author* think of all the edge cases? If it's hard to write unit tests for the edge cases, that's an indication that they need to refactor their code to make their changes easier to test. My code reviews often expose bugs, but I am generally not the one to find them. I'll push the author to either write additional test cases or break up their code to make it easier to test and then they find the bugs themselves.

**Don't be embarrassed to admit you have trouble understanding the code.**

If you find yourself struggling to understand the code you're reviewing, that's a big red flag. Develeopers, especially junior developers, can be reluctant to admit they don't understand the code. Don't just think to yourself, "It's my fault for not understanding this because I'm not a very strong programmer." All source code should be intelligible to the most junior developer responsible for maintaining it. If the code breaks and the original author has left your team or they're on vacation that day, you, as the code reviewer, are first in line to fix the issue.  Never just give the benefit of the doubt and sign off on unintelligible code with the assumption that they know what they were doing.

The exception is if the struggle is from a lack of familiarity with the language or the underlying libraries. In this case, you should take the time to understand the libraries. You can also consider asking the author to pull in an additional co-reviewer more familiar with the technologies involved, but make sure to keep learning about these technologies so that you can eventually handle these reviews on your own.

## Give code reviews high priority

If a teammate sends you a code review, it likely means that they are blocked on other work until your review is done. Sometimes  If they know to expect turnaround times of a few hours from you, they'll plan their work differently.

I aim to start a code review within minutes of receiving it. One business day is the absolute longest turnaround time I will give a code review. If I expect it to take longer than that, I email the author letting them know and give them the option to reassign to a different reviewer.

When you start code reviews immediately, you create a virtuous cycle, because the length of time the author has to wait for comments is purely a function of the size and complexity of the changes. This incentivizes authors to send small, narrowly scoped changelists. These types of changelists are easier and more pleasant for you to review, so you complete your reviews more quickly and the cycle continues.

In contrast, if you sit on code review for a day or two regardless of review size or complexity, you incentivize the author to send you larger, more complex code reviews because otherwise it's going to take them forever to get all of their code through review.

## Never use the word 'you'

This one is going to sound weird, but hear me out.

Give  feedback about the code, not the coder.

Don't address feedback to the author using the word "you" (it is, however, okay to do this in blog posts).

Good developers take pride in their work. It's great to find teammates who can detach their feelings from their work and graciously accept criticism as opportunity for growth, but it's rare to find developers who truly behave like that. Because the natural human reaction when someone criticises something you're proud of is to be protective and defensive.

Even if you make a harmless comment like this can be interpreted in two ways:

>You misspelled successfully

"[Hey, good buddy,] you misspelled successfully [but I think you're still smart and it was probably just a typo.]"

Of it could be:

"You misspelled successfully, dumbass!"

Think about an actor in a play. They get a lot of choice in how they interpret lines in a script. An actor could read the line, "You misspelled successfully," in a casual, non-judgmental way or they can read it in a harsh, accusatory way, where they all but punctuate the sentence with "dumbass." There's an actor in the author's head reading your feedback and if the author feels defensive, every line will be read in the meanest way the actor can muster.

This sounds very accusatory.

>Can you change this variable name to something more descriptive, like `seconds_remaining`?

One way I get around this is by using a shorthand that omits a specific subject from the sentence:

>Suggest renaming to something more descriptive, like `seconds_remaining`.

Another way around "you" is to replace it with "we"

>Can **we** change this variable name to something more descriptive, like `seconds_remaining`?

When you say, "we" you reinforce the idea of a collective responsibility for the code. The author may move on to a different team or organization, but code sticks around for years and needs maintainers. I admit that in some cases, it sounds ridiculous.

| With "you" | Without "you" |
|---|----|
| You didn't test for when the database is empty. | We should add tests for the case where the database is empty. |
| You misspelled 'successfully'. | Misspelling on "successfully" (missing an 's') |

TODO: Cartoon of one person doing hard labor (e.g. digging a hole) and the other person saying something like "**we** should do X" (e.g. "**we** should dig a hole").

## Frame feedback as requests, not commands

People tend to reduce politeness in code reviews, whereas you actually want to increase it. Err on the side of being annoyingly gentle. Most people would never say out loud to a co-worker, "You have to bring me that stapler," but a lot of code reviewers don't think twice about saying, "You have to move this class to a separate file."

Instead, frame your feedback as requests. Compare this comment framed in two different ways:

| Command | Request |
|----|---|
| You have to move the `Foo` class to a separate file. | Can we move the `Foo` class to a separate file? |

It gives the author a sense of autonomy. People like to feel in control of their own work. It also makes discussion easier if they need to push back. Maybe they have a good reason for making the choice they made. If you framed your feedback as a command, pushing back requires them to disobey your order. If you frame your feedback as a request or a question, they can push back by simply answering your question.

If the author has to push back, compare how combative the conversation seems depending on how the reviewer frames their initial note:

| Command | Request |
|---|---|
| **Reviewer**: You have to move the `Foo` class to a separate file.<br>**Author**: I don't want to do that because then it's far away from the `Bar` class. Clients will almost always use the two together.  | **Reviewer**: Can we move the `Foo` class to a separate file?<br>**Author**: We could, but then it's far away from the `Bar` class, and clients will generally use these two classes together. What do you think? |

See how ~~easy it is to validate your argument with imaginary scenarios~~ much more civil the conversation becomes when code review notes are framed as requests?

## Use a style guide

You should have arguments about where to put the braces exactly once. If your team or organization doesn't have . Religious arguments about tabs vs. spaces or where to put curly braces are unpleasant time wasters. You should have these arguments exactly once, then codify the decision in your style guide.

If your team or organization doesn't have a style guide, just start one. Google has some excellent [style guides](https://google.github.io/styleguide/) that are public and freely licensed. You can either create your style guide using a published style guide as the base, then defining team-specific deviations on top of it. Or you can just start from scratch in a wiki or Google Doc. I like to define my style guides as a Markdown file under source control. When I make changes, I designate an individual person to review, but I send the review as an FYI to my whole team so that they're aware of the style decision and they have an opportunity to object if they don't like the new rule.

It saves time for both authors and reviewers if there's a defined style. It minimizes unpleasant style fights.

## Start high level and work your way down

In most reviews, you'll generally have a mix of notes that are high level (e.g. "can we break this class into two classes?") and notes that are low level (e.g. "'success' is misspelled here"). If you have broad, high level notes, start with those and defer your lower-level notes to a later review round.

The first reason is that there's a cost to every note. There's a time cost of you writing it, especially if you are giving extra care to your words to avoid ambiguity or insult. For the author, there is both a time cost to reading and understanding your note and a psychological cost for each note. In theory, if the author writes a 100-line change and gets back 100 separate notes, they should be happy to receive 100 different ways to improve their writing. But we agreed previously that your co-workers are humans with normal human emotions and egos of varying degrees of fragility. Most human developers get sadder as the number of code review notes they receive approaches the number of lines they wrote.

Low level notes might become moot once they 

## Limit feedback on repeated patterns

If there's a repeated pattern, don't flag it every single time. As discussed in the [previous section](#start-high-level and-work-your-way-down), there is a cost

## Give notes based on principles, not opinion

Try to give objective notes. If you say, "Refactor, this is ugly," you can't really have a discussion about this. If you say, "I found this hard to understand," that's objective. Things like "we can avoid duplicating logic if X"

## Respect the scope of the review

Generally, if the auhor hasn't touched the line, it's out of bounds. Even if the author is the same person who wrote the code outside the diff, 

## Aim to bring the code up a letter grade or two

Early in my career, the bar I set for adding my approval to a code review was that I could say, "This code is as good as if I had written it myself." It only seemed sensible. My name was forever forged in the source history as the person who approved the change, so I wanted to make sure it was the best that I could possibly make it.

This worked fine because early in my career, most of the people around me were better developers than I was. As a junior developer, my view of what could be improved in the code was limited to straightforward and uncontroversial things like, "The function naming is inconsistent across these two classes."

As I gained more experience, I began to see opportunities for deeper improvements in code I was reviewing. It's a very different experience for a senior dev to get simple, easily addressable notes from a junior dev. I realized it's much more unpleasant for a junior dev to get deep notes from a more senior dev.

If a code review comes to you as a D, the only way you're getting it up to an A+ is if you go eight rounds of review. By the end of it, the author will hate you and will hate doing code reviews with you.

If I get a D code review now, I try to help the author get it to a C or a B-. Usually, I find that the next code review they send me will start at a C.

An F is for code that is either functionlly incorrect or so convoluted that you don't have confidence of its correctness. The only reason you should withhold approval is if you can't raise the code above an F (see the section on stalemates, below).

## Look for opportunities to split up large reviews

If you receive a changelist that's more than 300-400 lines of code, push back and ask the author to split up the changelist. You should push back exponentially harder as the size increases from 400 lines of code. I personally will refuse to review changelists that are over 1,000 lines.

Depending on the author, they may gripe about being asked to split a changelist because it's often tedious work. Try to help them out by suggesting logical boundaries where they can split the code. The easiest case is if the changelist has changes to multiple modules. If this is the case. In harder cases, look for the lowest layer of the changelist - functions or classes that are at a lower abstraction layer than the rest of the changes and ask to split those changes into their own changelist, then circle back to the changes on top of those later.

You should especially try to find ways to split up the changelist if the code is bad, like what you'd grade a D or F.
If you can pick a self-contained 75-line piece out of a 400, start out by asking the author if they'd mind splitting that out. This is good for two reasons. It lets you divide and conquer. You'd much rather review two 250-line code reviews than a 500 line CL, especially if the code is bad. Second, it gives the author positive momentum

Ideally you should request a split at the beginning of the code review, but if you find yourself arguing endlessly about part of the code review, asking the author to split off an uncontroversial part of the changelist can be a way to ease tensions. Part of what's frustrating from the author's perspective if you're going back and forth about code review notes is that they feel like you're obstructing their progress. They probably have deadlines they're trying to hit and they might see you as obstructing those goals. If you split off a piece they can check in, you're making them feel good by showing that you can make tangible progress together.

## Be extremely tolerant in pure housekeeping reviews

One of the kindest things your teammates can do is a pure housekeeping code change. By "pure housekeeping," I mean a change that does not affect the software's production functionality, but makes the code easier to maintain. This includes:

* Refactoring code (pure refactoring that does not change behavior)
* Deleting dead code
* Adding test cases
* Improving documentation

When my teammates send me these types of reviews, I am SOOOO happy. These types of changes are a big gift. They help everyone on the team by making the code easier to maintain.

Correspondingly, one of my biggest pet peeves is when I send out a pure refactoring change that clearly simplifies the code and my reviewer refuses to sign off until I improve it *more*.

You know the expression, "Don't look a gift horse in the mouth?" This is worse than looking a gift horse in the mouth. This is receiving a gift horse, looking it in the mouth for *an hour*, then refusing to accept it until you receive a gift saddle as well.

When you receive a pure housekeeping change to review, ask yourself, "Does this change make the code better than it was before?" If the answer is yes, give immediate approval. Add some notes, but make it clear that they are optional. If you really care about further improvements, you can write them yourself after your teammate has checked in their code. If you are nitpicky or demanding in your review for pure housekeeping changes, you will leave your teammate feeling like no good deed goes unpunished and it will discourage them from making these types of contributions in the future.

## Give approval when remaining fixes are trivial

Some reviewers have the misconception that they should not approve a code review until they've witnessed fixes for every last issue they've raised. This is poor practice and wastes time for both the reviewer and the author. Giving approval means that you trust them to fix the remaining issues. Withholding LGTM wastes time for both the author and the reviewer. If your only remaining note is that they're missing a period at the end of a comment, you're a jerk if you withold your LGTM over that.

* The note  is optional and your approval stands whether or not they act on your note
* The change is so trivial that it's not worth the cost of an additional round of review

This doesn't always go perfectly. I'd say that 5% of the time, the author either misinterprets or completely misses a note I gave alongside my approval. To defend against this, I simply look at the changes the author makes after my approval notes. In the rare case that something needs fixing, I either follow up with them and let them know they missed the note or I just fix it myself and send it to them for review.

## When you feel a stalemate coming, eject

Some indications that you're headed for a stalemate:

* The tone of discussion is becoming hostile
* Your notes per review are not trending downward
  * In a normal review, the 

It may mean that you need  a design review.

This should be exceedingly rare. In my entire software development career, I've only ever had one code review reach stalemate.