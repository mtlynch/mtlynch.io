---
title: How to Do Code Reviews Like a Human
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
excerpt: 'Let''s talk about the interesting part of code reviews. Hint: It''s not
  finding bugs.'
---

I've just written an excellent E-Book to help my blog readers with their romantic relationships. 

{% include image.html file="book-cover.png" alt="EBook cover" fig_caption="Placeholder image, replace with illustration" max_width="260px" class="align-right" %}

Here are just a few things you'll learn from my book:

* Think objectively about your romantic partner so you can **identify all of their flaws**.
*  Use **cutting-edge software tools** so you can track metrics on your partner's shortcomings over time.

The guide **does not** cover:

* Communicating issues to your partner in a gentle and empathetic way.
* Helping your partner address their weaknesses.

Those parts of a relationship are **obvious** and **not worth discussing**!

Does this sound like a good relationship E-Book to you? I'm assuming you just exclaimed, "Sweet jalisco, no!" (exact quote).

So why is that the way we talk about code reviews?

If you Google "code reviews," you'll find article after article describing code reviews focused myopically on **bugs**: 

* Arrange logistics so you can find the most **bugs**!
* Keep checklists so you know what **bugs** to expect on future reviews.
* Judge review effectiveness purely in terms of **bugs** discovered.

I can only assume these articles are from the future, where all developers are robots, and hearing a list of criticisms about code they've worked hard on warms their cold, robot hearts.

Let's assume for a moment that we want to improve code reviews in the present, where our teammates are humans. In this article, I'll discuss some code review techniques that take into account the fact that a code review is not only a technical process, but a social one as well.

* TOC
{:toc}

# Assumptions

The techniques I describe below will apply to code reviews generally, but it will work *best* in an environment where the following conditions are true:

* Your teammates are humans.
  * Their reactions to criticism and their ability to learn from this criticism fall within the range of behavior one would expect of humans.
* Your code reviews are with developers you work with regularly.
  * You can't do an effective code review with someone who hates you, and a code review affords you many opportunities to make your teammate hate you in the future. It's unpleasant to work with people who hate you, so you have a vested interest in avoiding mistakes in code reviews that may lead your teammates to hate you.
  * If you're a maintainer for an open source project and you receive lots of "drive-by" patches from people who submit once and then never contribute again, these techniques will still work, but you may choose to focus less on the tips that improve your long-term working relationships.
* Your team writes unit tests.
  * You can do code reviews without unit tests, but it requires the reviewer to do a lot more mental work. These techniques assume that the reviewer can gain confidence in the code's correctness by reading the unit tests or by suggesting additional test cases.

# What is a code review?

The term "code review" can mean simply reading some code over your teammate's shoulder or it can mean a 20-person meeting to dissect their code line by line. When I say "code review" in this article, I'm talking about a process that's formal and written, but not so heavyweight as a series of in-person code inspection meetings.

{% include image.html file="flowchart.jpg" alt="Code review flow" fig_caption="Placeholder chart, replace with illustration" max_width="600px" img_link=true %}

TODO: Re-create better chart. Text is as follows:

1. Author creates a changelist.
1. Author runs the change through continuous integration
1. Reviewer reviews changelist 
1. Reviewer sends notes to Author
1. Author makes changes based on Reviewer's notes
1. Reviewer grants approval
1. Author makes remaining changes (if any)
1. Author checks in code

The participants in a code review are the **author**, who writes the code and sends it for review, and the **reviewer**, who reads the code and decides when it's ready to be checked in to the team's codebase. A code review can have multiple reviewers, but in this article, I assume for simplicity that you are the sole reviewer.

Before the code review begins, the author must create a **changelist**. A changelist is a set of changes to source code that the author wants to check in.

A code review begins when the author sends their changelist to the reviewer. Code reviews happen in **rounds**.  Each round is one complete round-trip between the author and reviewer: the  author sends changes and the reviewer responds with written feedback on those changes. Every code review has one or more rounds.

The code review ends when the reviewer grants **approval** on the changes. This is also known as giving "LGTM", a shorthand for "looks good to me."

In this article, I don't assume any particular developer tools. You can apply these techniques in any development environment as long as your tools support the general style of code reviews that I described above.

# Why is this hard?

Programmers tend to overestimate the quality of the code they write. If a programmer sends you a changelist that they think is awesome, and you write them back with an extensive list of reasons why it's not, that's a sensitive message to get across.

>That's one reason I don't miss IT, because programmers are very unlikable people... In aviation, for example, people who greatly overestimate their level of skill are all dead.<br><br>Philip Greenspun, co-founder of ArsDigita, excerpted from [*Founders at Work*](http://amzn.to/2g6oTsV).

It's very easy for an author to interpret criticism of their code as criticism of them personally. Code reviews are an opportunity to share knowledge and make informed engineering decisions, but that can't happen if the author perceives the discussion as a personal attack.

As if this wasn't hard enough, you also have the challenge of communicating your criticism in writing, where there are myriad opportunities for miscommunication. The author can't hear your voice or see your body language, so it's even more important to be careful and purposeful in how you articulate your feedback. To an author who's feeling defensive, an innocuous note like, "You forgot to close the file handle," can be read as, "I can't *believe* you forgot to close the file handle! You're such an idiot."

# tl;dr: Show Empathy

I was only able to find one author who recognized how important social and cultural factors are in code reviews. In his book, [*Peer Reviews in Software: A Practical Guide*](http://amzn.to/2xw6AWV), author Karl E. Wiegers illustrates this factor eloquently:

>The dynamics between the work product's author and its reviewers are critical. The author must trust and respect the reviewers enough to be receptive to their comments. Similarly, the reviewers must show respect for the author's talent and hard work.

The overarching theme behind all the techniques I describe below is: empathize with the author. If you were in their position, how would you like to receive feedback? What sort of review process would help you do your best work?

# Techniques

## Let computers do the boring parts

As a developer, the time you can spend focused on code is scarce. Your mental stamina is scarcer still. Reading a teammate's code someone is cognitively taxing and requires a high level of concentration. Don't squander these resources on tasks a computer can do, especially when a computer can do it better.

Whitespace errors are an obvious example. Compare how much effort it takes for a human reviewer to find an indenting mistake and work with the author to correct it as opposed to just using an automated formatting tool:

<table>
<thead>
<tr>
  <th>Effort required with a human reviewer</th>
	<th>Effort required with a formatting tool</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<ol>
<li>Reviewer searches for whitespace issues and finds incorrect indenting.</li>
<li>Reviewer writes a note calling out the incorrect indentation.</li>
<li>Reviewer re-reads their note to make sure that it's worded in a clear, non-accusatory way.</li>
<li>Author reads the note.</li>
<li>Author corrects the code indentation.</li>
</ol>
</td>
<td>Nothing!</td>
</tr>
</tbody>
</table>

The right side is empty because the author uses a code editor that automatically formats their whitespace every time they hit "Save." At worst, the author sends their code out for review and the continuous integration solution reports that the whitespace is incorrect, so the author fixes the issue without the reviewer ever having to care.

Look for mechanical tasks in your code reviews that you can automate away. Here are the common ones:

| Task | Automated solution |
|-------|--------------------------|
| Verify the code builds | Continuous integration solution such as [Travis](https://travis-ci.com) or [CircleCI](https://circleci.com/). |
| Verify automated tests pass | Continuous integration solution such as [Travis](https://travis-ci.com) or [CircleCI](https://circleci.com/). |
| Verify code whitespace matches team style | Code formatter, such as [ClangFormat](https://clang.llvm.org/docs/ClangFormat.html) (C/C++ formatter) or [gofmt](https://golang.org/cmd/gofmt/) (Go formatter) |
| Identify unused imports or unused variables | Code linters, such as [pyflakes](https://pypi.python.org/pypi/pyflakes) (Python linter) or [JSLint](http://jslint.com/help.html) (JavaScript linter)

Automation helps you make more meaningful contributions as a reviewer. When you can ignore a whole class of issues, such as the ordering of `imports` or naming conventions for source filenames, it frees your focus for more interesting things like weaknesses in readability or functional errors.

Automation benefits the author as well. It allows them to discover careless mistakes in seconds instead of hours. The instant feedback makes it easier to learn from (TODO: link to study) and cheaper to fix because the author still has the relevant context in their head. Plus, if someone's going to tell you about a dumb mistake you made, wouldn't you rather hear it from an automated tool than your human teammate?

## Settle style arguments with a style guide

Arguments about style are a waste of time in code reviews. If you're not careful, you can waste hours clashing over months about whether to use tabs or spaces. The best way to minimize style debates is by keeping a style guide.

A good style guide defines not only superficial elements like naming conventions or whitespace rules, but also specifies how you use the features of your programming language. Languages like JavaScript and Perl are packed with functionality, offering many different ways of implementing the same logic. A style guide can define The One True Way of doing things so that you don't end up in a situation where half of your team uses one set of language features while the other half uses a totally different set of features, turning your code into a collective mess.

There are a few ways to create a style guide for your team:

***Option 1: Adopt an existing style guide***

If you search online, you can find published style guides. [Google's style guides](https://google.github.io/styleguide/) are the most well-known, but you can find others if Google's style doesn't suit you. By adopting an existing guide, you inherit the benefits of a ready-made style guide, but you skip the substantial effort it takes to create one.

The downside is that organizations optimize their style guides for their own particular needs.  Google's style guides, for example, are conservative about [using new language features](https://google.github.io/styleguide/cppguide.html#C++11) because they have an enormous codebase with code that has to run on anything from a home router to the latest iPhone. If you're a four-person startup with a single product, you can afford to be more aggressive about using cutting-edge language features or extensions.

***Option 2: Create your own style guide incrementally***

If you don't want to adopt an existing guide, you can create your own. Every time a style argument arises during a code review, raise the question to your whole team to decide what the official convention should be, then codify that decision in your style guide. If the issue ever comes up in the future, use your style guide to settle the argument.

I prefer to keep my team's style guide as Markdown under source control (e.g. [GitHub pages](https://pages.github.com/)). That way, any changes to the style guide go through the normal code review process - someone has to explicitly approve the change, and everyone on the team has a chance to raise concerns. Wikis and Google Docs are acceptable options as well.

***Option 3: The hybrid approach***

Combining options 1 and 2, you can adopt an existing style guide as your base, then maintain a local copy to extend or override the base. A good example of this is the [Chromium C++ style guide](https://chromium.googlesource.com/chromium/src/+/master/styleguide/c++/c++.md). It uses [Google's C++ style guide](https://google.github.io/styleguide/cppguide.html) as a base, but makes its own changes and additions on top of the base guide.

## Start reviewing immediately

Treat code reviews as a high priority task. When you're actually reading the code and giving feedback, take your time, but *start* your review immediately — ideally, within minutes.

If a teammate sends you a code review, it likely means that they are blocked on other work until your review is done. In theory, most source control systems allow the author to branch, continue working, then forward-merge changes from the review to their new branch. In reality, there are like four people total who know how to do that without wasting a lot of time fighting with conflicts from three-way diffs.

When you start code reviews immediately, you create a virtuous cycle. Your review turnaround becomes purely a function of the size and complexity of the author's changelist. This incentivizes authors to send small, narrowly-scoped changelists. These are easier and more pleasant for you to review, which allows you to review faster, and the cycle continues.

Imagine that your teammate implemented a new feature that required 1000 lines of code changes. If they know you can review a 200-line changelist in about 2 hours, they can break their feature into changelists of about 200 lines each and get the whole feature checked in within a day or two. If, however, you take a day to do your code reviews, regardless of size, now it takes a week to get that feature checked in. Your teammate doesn't want to sit around for a week, so they're incentivized to send much larger code reviews, like 500-600 lines each.

The absolute maximum turnaround on a code review should be one business day. If you're struggling with a higher priority issue and can't complete a round of review in under a day, let your teammate know and give them the opportunity to reassign to someone else. If you're forced to decline reviews more than about once per month, it likely means that your team needs to reduce its pace or scope so that you can maintain sane development practices.

## Start high level and work your way down

TODO: Continue editing from here.

There's a nontrivial cost to every note. You have to spend time writing it, then re-writing it to avoid ambiguity or insult. Then the author has to spend time reading and understanding your note. There's also a psychological cost to every note. Even if you word your notes kindly and objectively, if the author is going to be bummed out if every round of review yields 50 notes.

You can avoid overwhelming the author with notes by using the first round our two to hash out high level notes (e.g. "can we break this into two classes"), then defer your lower level notes (e.g. "can we choose a more descriptive name for this variable?") to later rounds.

Your low level notes might become moot once the author integrates your high level notes, so by deferring, you're potentially avoiding the nontrivial costs of each note. Beyond this, keeping the review to at one layer of abstraction at a time helps you and the author work through the changelist in a clear, systematic way.

## Be generous with code examples

With every note, you are essentially assigning the author work. A slew of code review notes can help the author grow in the long term, but it's easy for an author to grow resentful of you piling on lots of tasks for them in the short term.

To combat this resentment, look for opportunities to show the author that you're helping them. An excellent way to help the developer is by shouldering some of the load of writing code. This shows them that you are generous with your time as a reviewer.

Volunteering code is especially useful if you and the author haven't reviewed code for each other much or if the author is not accustomed to having their code reviewed at all. Even if you and the author have built trust reviewing each other's code, sometimes just writing code is easier than describing the code you'd like them to write.

For example, imagine that you have a colleague who is not familiar with the [list comprehensions](http://treyhunner.com/2015/12/python-list-comprehensions-now-in-color/) feature of Python. They send you a code review that includes these lines:

```python
urls = []
for path in paths:
  url = 'https://'
  url += domain
  url += path
  urls.append(url)
```

If your note is simply, "Can we simplify this with a list comprehension?" now they're annoyed because they have to spend 20 minutes researching something they've never used before.

They'd be much happier to receive a note like the following:

> Consider simplifying with a list comprehension like this:
>```python
urls = ['https://' + domain + path for path in paths]
```

This technique is not limited to one-liners. I'll often create my own branch of the code to demonstrate a large proof of concept to the author, such as breaking up a large function or adding a unit test to cover an additional edge case.

Reserve this technique for clear, uncontroversial improvements. In the list comprehension example above, few Python developers would object to an 83% reduction in lines of code. In contrast, if you write a lengthy code example to demonstrate a change that is "better" based on your own personal taste (e.g. style changes), code examples can make you look pushy instead of generous.

Limit yourself to two or three code examples per review round. If you start writing their whole changelist for them, it can signal that you don't think they're capable of writing their own code.

## Never use the word 'you'

This one is going to sound weird, but hear me out.

Good developers take pride in their work. It's great to find teammates who can completely detach emotion from their work and accept criticism graciously, but it's rare to find people who are going to be consistently excited about hearing their work criticized. The natural human reaction to criticism is to be protective and defensive.

As the reviewer, you want to avoid triggering these defenses. Be clear that you're giving feedback about the code, not the coder. One way to do this is to avoid ever using the word "you" in your code review notes.

Even if you make a harmless comment like, "You misspelled 'successfully'," the author might interpret that note in two very different ways:

* **Interpretation 1**: "Hey, good buddy! You misspelled 'successfully,' but I still think you're smart, and it was probably just a typo."
* **Interpretation 2**: "You misspelled 'successfully,' dumbass."

There are a few easy ways to avoid using the word "you" in your code review notes.

***Option 1: Replace 'you' with 'we'***

For example:

>Can **you** change this variable name to something more descriptive, like `seconds_remaining`?

becomes:

>Can **we** change this variable name to something more descriptive, like `seconds_remaining`?

When you say, "we," you reinforce the idea of a collective responsibility for the code. The author may move on to a different team or organization, but code sticks around for years and needs maintainers. In some cases, it does sound silly to say "we" when you're clearly referring to the author, but I'd rather my notes sound silly than accusatory.

TODO: Cartoon of one person doing hard labor (e.g. digging a hole) and the other person saying something like "**we** should do X" (e.g. "**we** should dig a hole").

***Option 2: Remove the subject from the sentence***

Another way to get around this is to use a shorthand that omits the subject from the sentence:

>Suggest renaming to something more descriptive, like `seconds_remaining`.

## Frame feedback as requests, not commands

Bizarrely, I find that reviewers tend to be less polite in code reviews than they are in real life. You actually want to be *more* polite. Err on the side of being annoyingly gentle. Most people would never say out loud to a co-worker, "Hand me that stapler then fetch me a soda," but I've seen numerous code reviewers frame feedback as similarly pushy commands during code reviews, "Move this class to a separate file."

Instead, frame your feedback as requests. Compare this comment framed in two different ways:

| Command | Request |
|----|---|
| Move the `Foo` class to a separate file. | Can we move the `Foo` class to a separate file? |

It gives the author a sense of autonomy. People like to feel in control of their own work. It also makes discussion easier if the author needs to push back. Maybe they have a good reason for their choice. If you frame your feedback as a command, pushing back requires them to disobey your order. If you frame your feedback as a request or a question, they can simply answer your question.

If the author has to push back, compare how combative the conversation seems depending on how the reviewer frames their initial note:

| Command | Request |
|---|---|
| **Reviewer**: Move the `Foo` class to a separate file.<br>**Author**: I don't want to do that because then it's far away from the `Bar` class. Clients will almost always use the two together.  | **Reviewer**: Can we move the `Foo` class to a separate file?<br>**Author**: We could, but then it's far away from the `Bar` class, and clients will generally use these two classes together. What do you think? |

See how much more civil the conversation becomes when ~~you validate your argument with imaginary scenarios~~ code review notes are framed as requests?

## Tie notes to principles, not opinions

For example, instead of saying, "We should split this class into two," it's much better to say, "We should split this class into two so that we're in line with the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)."

Grounding your notes in principles frames the discussion in a constructive way. If you cited a specific reason, like "We should make this function private to minimize the class's public interface," the author can't simply respond, "No, I prefer it my way," because you've provided a specific reason and they haven't.

Try to give objective notes. If you say, "Refactor, this is ugly," you can't really have a discussion about this.  Things like "we can avoid duplicating logic if we refactor these lines into a shared function," that frames the discussion in terms of tangible goals.

Software development is both a science and an art, so it's not always possible to articulate exactly what's wrong with a piece of code in terms of established principles. Sometimes things are just ugly or unintuitive and it's hard to pin down exactly why. In these cases, try to keep it as objective as possible.  If you say, "**I** found this hard to understand," that's at least an objective statement, as opposed to "**this is** confusing," which is a value judgment and varies by person.

Provide supporting evidence where possible in the form of links.  The best thing to link to is your style guide. You can also link to documentation for the language or library. Highly-upvoted [StackOverflow](https://stackoverflow.com) answers can work as well, but the farther you get from authoritative documentation, the shakier your evidence becomes.

# More tips

I'll be publishing the second half of this article in a week or two. Stay tuned for additional tips including:

* Handling excessively large code reviews
* Recognizing the scope of a review and staying within it
* Mitigating stalemates

*Thanks to [@global4g](https://twitter.com/global4g) for providing valuable feedback on an early draft of this post.*