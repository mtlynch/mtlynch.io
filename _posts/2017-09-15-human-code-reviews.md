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
header:
  teaser: images/resized/2017-09-15-human-code-reviews/book-cover.png
excerpt: 'Let''s talk about the interesting part of code reviews. Hint: It''s not
  finding bugs.'
---

Recently, I've been reading up on best practices for code reviews. I noticed that the articles online focus pretty heavily on bug-finding and don't really talk about the communication aspects of a code review.

I realized all the best practices for code reviews apply equally well to managing romantic relationships, so I'm announcing my new ebook on the subject:

<div align="center">
{% include image.html file="book-cover.png" alt="EBook cover" max_width="350px"  img_link=true %}
</div>

My revolutionary ebook will teach you proven techniques for maximizing the number of deficiencies you find in your partner. The ebook does **not** cover:

* Communicating issues to your partner in a gentle and empathetic way.
* Helping your partner address their weaknesses.

Based on my reading of code review literature, those parts of a relationship are *obvious* and **not** worth discussing.

Does this sound like a good ebook to you? I'm assuming you just yipped "Nonononono!"

So why is that the way we talk about code reviews?

# Bug obsession

If you Google "code reviews," you'll find article after article describing code reviews focused myopically on bugs: 

* Get a full night's rest before a code review so you can find the most **bugs**.
* Never stare directly at the code otherwise it may strain your eyes before you find all the **bugs**.
* If you eat 17 apples before every code review, the additional fructose will help you find 6% more **bugs**.

I can only assume these articles are from the future, where all developers are robots, and hearing a list of criticisms about code they've worked hard on warms their cold, robot hearts.

# What if we review code for humans?

Let's assume for a moment that we want to improve code reviews in the present, where our teammates are humans. Let's assume that a positive relationship with your colleagues is an end in itself and not simply an incidental component in minimizing the cost per bug discovery.

I was only able to find one author who recognized how important social and cultural factors are in code reviews. In his book, [*Peer Reviews in Software: A Practical Guide*](http://amzn.to/2xw6AWV), author Karl E. Wiegers illustrates this factor eloquently:

>The dynamics between the work product's author and its reviewers are critical. The author must trust and respect the reviewers enough to be receptive to their comments. Similarly, the reviewers must show respect for the author's talent and hard work.

In this article, I'll discuss some code review techniques that take into account the fact that a code review is not only a technical process, but a social one as well.

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

A code review begins when the author sends their changelist to the reviewer. Code reviews happen in **rounds**.  Each round is one complete round-trip between the author and reviewer: the  author sends changes, and the reviewer responds with written feedback on those changes. Every code review has one or more rounds.

The code review ends when the reviewer grants **approval** on the changes. This is also known as giving "LGTM," a shorthand for "looks good to me."

In this article, I don't assume any particular tools to support the code review. You can apply these techniques in any development environment as long as your process follows the general style of code reviews that I just described.

# Why is this hard?

Programmers tend to overestimate the quality of the code they write. If a programmer sends you a changelist that they think is awesome, and you write them back with an extensive list of reasons why it's not, that's a sensitive message to get across.

>That's one reason I don't miss IT, because programmers are very unlikable people... In aviation, for example, people who greatly overestimate their level of skill are all dead.<br><br>Philip Greenspun, co-founder of ArsDigita, excerpted from [*Founders at Work*](http://amzn.to/2g6oTsV).

It's very easy for an author to interpret criticism of their code as criticism of them personally. Code reviews are an opportunity to share knowledge and make informed engineering decisions, but that can't happen if the author perceives the discussion as a personal attack.

As if this wasn't hard enough, you also have the challenge of communicating your criticism in writing, where there are myriad opportunities for miscommunication. The author can't hear your voice or see your body language, so it's even more important to be careful and purposeful in how you articulate your feedback. To an author who's feeling defensive, an innocuous note like, "You forgot to close the file handle," can be read as, "I can't *believe* you forgot to close the file handle! You're such an idiot."

# Techniques

1. [Let computers do the boring parts](#let-computers-do-the-boring-parts)
1. [Settle style arguments with a style guide](#settle-style-arguments-with-a-style-guide)
1.  [Start reviewing immediately](#start-reviewing-immediately)
1. [Start high level and work your way down](#start-high-level-and-work-your-way-down)
1. [Be generous with code examples](#be-generous-with-code-examples)
1. [Never say “you”](#never-say-you)
1. [Frame feedback as requests, not commands](#frame-feedback-as-requests-not-commands)
1. [Tie notes to principles, not opinions](#tie-notes-to-principles-not-opinions)

Techniques 9-16 are coming soon in part two of this post.

## Let computers do the boring parts

As a developer, the time you can spend focused on code is scarce. Your mental stamina is scarcer still. Reading a teammate's code is cognitively taxing and requires a high level of concentration. Don't squander these resources on tasks a computer can do, especially when a computer can do it better.

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

{% include image.html file="style-argument.jpg" alt="A typical style argument" max_width="700px" img_link=true %}

A good style guide defines not only superficial elements like naming conventions or whitespace rules, but also specifies how you use the features of your programming language. Languages like JavaScript and Perl are packed with functionality, offering many different ways of implementing the same logic. A style guide can define The One True Way of doing things so that you don't end up in a situation where half of your team uses one set of language features while the other half uses a totally different set of features, turning your code into a collective mess.

***Option 1: Adopt an existing style guide***

If you search online, you can find published style guides. [Google's style guides](https://google.github.io/styleguide/) are the most well-known, but you can find others if Google's style doesn't suit you. By adopting an existing guide, you inherit the benefits of a ready-made style guide, but you skip the substantial effort it takes to create one.

The downside is that organizations optimize their style guides for their own particular needs.  Google's style guides, for example, are conservative about [using new language features](https://google.github.io/styleguide/cppguide.html#C++11) because they have an enormous codebase with code that has to run on anything from a home router to the latest iPhone. If you're a four-person startup with a single product, you can afford to be more aggressive about using cutting-edge language features or extensions.

***Option 2: Create your own style guide incrementally***

If you don't want to adopt an existing guide, you can create your own. Every time a style argument arises during a code review, raise the question to your whole team to decide what the official convention should be, then codify that decision in your style guide. If the issue ever comes up in the future, use your style guide to settle the argument.

I prefer to keep my team's style guide as Markdown under source control (e.g. [GitHub pages](https://pages.github.com/)). That way, any changes to the style guide go through the normal code review process - someone has to explicitly approve the change, and everyone on the team has a chance to raise concerns. Wikis and Google Docs are acceptable options as well.

***Option 3: The hybrid approach***

Combining options 1 and 2, you can adopt an existing style guide as your base, then maintain a local copy to extend or override the base. A good example of this is the [Chromium C++ style guide](https://chromium.googlesource.com/chromium/src/+/master/styleguide/c++/c++.md). It uses [Google's C++ style guide](https://google.github.io/styleguide/cppguide.html) as a base, but makes its own changes and additions on top of the base guide.

## Start reviewing immediately

**Note to Loraine**: Here I'd like to do an illustration of the dog passing a baton to the cat in a relay race, kind of like [this](http://c8.alamy.com/comp/E094XJ/athletics-runners-passing-baton-in-women%60s-4x400m-relay-race-at-club-E094XJ.jpg). But instead of a baton, it's the changelist, represented as a document like in the flow chart above. Maybe some kind of track outfits for the dog and cat, like shorts/running shoes/headband?

Treat code reviews as a high priority task. When you're actually reading the code and giving feedback, take your time, but *start* your review immediately — ideally, within minutes.

If a teammate sends you a code review, it likely means that they are blocked on other work until your review is done. In theory, most source control systems allow the author to branch, continue working, then forward-merge changes from the review to their new branch. In reality, there are like four people total who know how to do that without wasting a lot of time fighting with conflicts from three-way diffs.

When you start code reviews immediately, you create a virtuous cycle. Your review turnaround becomes purely a function of the size and complexity of the author's changelist. This incentivizes authors to send small, narrowly-scoped changelists. These are easier and more pleasant for you to review, which allows you to review faster, and the cycle continues.

Imagine that your teammate implemented a new feature that required 1000 lines of code changes. If they know you can review a 200-line changelist in about 2 hours, they can break their feature into changelists of about 200 lines each and get the whole feature checked in within a day or two. If, however, you take a day to do your code reviews, regardless of size, now it takes a week to get that feature checked in. Your teammate doesn't want to sit around for a week, so they're incentivized to send much larger code reviews, like 500-600 lines each. These are more costly to review and lead to worse feedback because it's much more difficult to keep context on a 600-line change than a 200-line change.

The absolute maximum turnaround on a code review round should be one business day. If you're struggling with a higher priority issue and can't complete a round of review in under a day, let your teammate know and give them the opportunity to reassign to someone else. If you're forced to decline reviews more than about once per month, it likely means that your team needs to reduce its pace or scope so that you can maintain sane development practices.

## Start high level and work your way down

The more notes  you give in a given review round, the higher your risk of making the author feel overwhelmed. Most developers will begin feeling overwhelmed somewhere in the range of 20-50 notes in a single round of review.

If you're worried about drowning the author in a sea of notes, restrict yourself to high level feedback in early rounds. Focus on issues like redesigning a class interface or splitting up complex functions. Wait until those issues are resolved before tackling lower level issues, such as variable naming or clarity of code comments.

Your low level notes might become moot once the author integrates your high level notes. By deferring them to a later round, you save yourself the nontrivial work of writing carefully worded comments calling out the issues, and you save the author from reading processing unnecessary notes. This technique also segments the layers of abstraction you focus on during the review, helping you and the author work through the changelist in a clear, systematic way.

## Be generous with code examples

It's very easy for an author to become resentful of their reviewer during a code review. Maybe they're under deadline pressure, so anything other than your instant, rubber-stamp approval feels like you're standing in the way of their goals. Maybe you haven't worked together much, so they don't trust that your feedback is meant to be helpful.

A great way to prevent this is by giving them the gift all developers love to receive: code examples. If you lighten their load by actually writing some of the code changes you're suggesting, this demonstrates to the author that you are generous with your time as a reviewer.

**Note to Loraine**: Here, I'd like the cat to be giving the dog code with a bow on it. The dog is delighted. I'd like the code to be floating text in either Consolas or Courier New font.

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

Reserve this technique for clear, uncontroversial improvements. In the list comprehension example above, few Python developers would object to an 83% reduction in lines of code. In contrast, if you write a lengthy code example to demonstrate a change that is "better" based on your own personal taste (e.g. style changes), code examples make you look pushy instead of generous.

Limit yourself to two or three code examples per review round. If you start writing their whole changelist for them, it signals that you don't think the author is capable of writing their own code.

## Never say "you"

This one is going to sound weird, but hear me out: never use the word "you" in a code review.

It would be great if code reviews were completely objective — just emotionless discussions of different strategies and their engineering tradeoffs. But since you and your teammates are humans, you must always keep the human factors of code review in mind.  When people hear criticism of something they did, their natural reaction is to feel protective and defensive, which is not conducive to a productive discussion about what coding decisions would be best.

Word your feedback in a way that minimizes the risk of raising your teammate's defenses. Be clear that you're giving feedback about the code, not the coder. If you write "you" in a comment, it brings the author's focus away from the code and back to themselves, and increases the risk that they'll take your criticism personally.

Consider a harmless comment like, "You misspelled 'successfully'." The author can interpret that note in two very different ways:

* **Interpretation 1**: "Hey, good buddy! You misspelled 'successfully,' but I still think you're smart, and it was probably just a typo."
* **Interpretation 2**: "You misspelled 'successfully,' dumbass."

Fortunately, it's easy to rewrite your feedback to avoid the word "you."

***Option 1: Replace 'you' with 'we'***

>Can **you** rename this variable to something more descriptive, like `seconds_remaining`?

becomes:

>Can **we** rename this variable to something more descriptive, like `seconds_remaining`?

"We" reinforces the team's collective responsibility for the code. The author may leave the team and so might you, but the team will stick around in one form or another.

In some cases, it sounds silly to say "we" when it's clearly something you expect the author to do themselves, but I'd rather my notes sound silly than accusatory.

{% include image.html file="move-couch.png" alt="Moving couch cartoon" max_width="500px" img_link=true %}

***Option 2: Remove the subject from the sentence***

Another way to get around "you" is to use a shorthand that omits the subject from the sentence:

>**Suggest renaming** to something more descriptive, like `seconds_remaining`.

I generally avoid [passive voice](https://en.wikipedia.org/wiki/English_passive_voice) like the plague in my technical writing, but it can be a helpful way of writing around "you":

>This variable **should be renamed** to something more descriptive, like `seconds_remaining`.

## Frame feedback as requests, not commands

As I've discussed, code review requires more tact and care than usual communication because the risk of a fight is much higher. Bizarrely, I find that reviewers tend to be less polite in code reviews than they are in real life.

Err on the side of being annoyingly gentle. Most people would never say out loud to a co-worker, "Hand me that stapler then fetch me a soda," but I've seen numerous code reviewers frame feedback with similarly pushy commands, such as, "Move this class to a separate file."

Instead, frame your feedback as requests. Compare the same note framed in two different ways:

| Feedback framed as command | Feedback framed as request |
|----|---|
| Move the `Foo` class to a separate file. | Can we move the `Foo` class to a separate file? |

Making a request of the author gives them a sense of autonomy. People like to feel in control of their own work.

Requests also makes discussion easier if the author needs to push back. Maybe they have a good reason for their choice. If you frame your feedback as a command, pushing back requires them to disobey your order. If you frame your feedback as a request or a question, they can simply answer your question.

Compare how combative the conversation seems depending on how the reviewer frames their initial note:

| Feedback framed as command | Feedback framed as request |
|---|---|
| **Reviewer**: Move the `Foo` class to a separate file.<br>**Author**: I don't want to do that because then it's far away from the `Bar` class. Clients will almost always use the two together.  | **Reviewer**: Can we move the `Foo` class to a separate file?<br>**Author**: We could, but then it's far away from the `Bar` class, and clients will generally use these two classes together. What do you think? |

See how much more civil the conversation becomes when ~~you validate your argument with imaginary scenarios~~ code review notes are framed as requests?

## Tie notes to principles, not opinions

When you suggest a change, you should not only suggest the change, but the reason for the change. For example, instead of saying, "We should split this class into two," it's much better to say, "We should split this class into two so that we're in line with the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)."

Grounding your notes in principles frames the discussion in a constructive way. When you cite a specific reason, like "We should make this function private to minimize the class's public interface," the author can't simply respond, "No, I prefer it my way." Or rather, then *can*, but it would look silly because you provided a reason that the change satisfies a goal of the software and they just stated a preference.

Software development is both a science and an art. In some cases, you can't articulate what's exactly is wrong with a piece of code in terms of established principles. Sometimes things are just ugly or unintuitive and it's hard to pin down why. In these cases, you can still give feedback, but keep it objective.  If you say, "**I** found this hard to understand," that's at least an objective statement, as opposed to "**this is** confusing," which is a value judgment and varies by person.

Provide supporting evidence where possible in the form of links.  The best thing to link to is the relevant section of your style guide. You can also link to documentation for the language or library. Highly-upvoted [StackOverflow](https://stackoverflow.com) answers can work as well, but the farther you get from authoritative documentation, the shakier your evidence becomes.

# More tips

I'll be publishing the second half of this article in a few weeks or two. Stay tuned for additional tips including:

* Handling excessively large code reviews
* Respecting the scope of a review
* Mitigating stalemates

*Illustrations by Loraine Yow. Thanks to [@global4g](https://twitter.com/global4g) for providing valuable feedback on an early draft of this post.*
