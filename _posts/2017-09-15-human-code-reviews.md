---
title: How to Do Code Reviews Like a Human
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
excerpt: 'Let''s talk about the interesting part of code reviews. Hint: It''s not
  finding bugs.'
---

If I told you I had a really good book or article for you about how to overcome your fear of flying and I talked about why flying is so great and how to work out the logistics of booking your ticket, but then I didn't say anything about how to 

TODO: It has to be a guide to some practical task where we leave out the hard part

So why is that the way we talk about code reviews?

If you Google "code reviews", you'll find article after article describing code reviews from the perspective of finding bugs.

I can only assume these articles were written in the future, where your teammates are robots. In that world, your teammates send you code that they believe is high quality, and you give them a long list of reasons why it's not. This list warms their cold, robot hearts, as it brings them one step closer to eliminating the need for you as the sole human on the team.

If, however, you work on a development team composed of humans, code reviews are more complicated than simply finding flaws in your co-workers' code and dutifully reporting them. and you want to improve your code review skills when reviewing their code, this article is for you. I'll discuss practical techniques for improving the code review process. Some of these are mechanical, such. Some of these are more touchy-feely, like delivering tough criticism in a way that minimizes tension between you and your teammate.

In this world, you design your code reviews to maximize the number of "defects" you identify through code review. That's A lot of articles appear to be written in the future where your co-workers are robots and pointing out errors warms their cold robot hearts. It would be just as ridiculous to read a guide to a healthy marriage that's all about how to identify your spouse's flaws.

In this article, I'll discuss some techniques for reviewing in a way that takes into account the fact that you're all humans.

* TOC
{:toc}

# Assumptions

The techniques I describe below will apply to code reviews generally, but it will work *best* in an environment where the following conditions are true:

* Your teammates are humans.
  * Their reactions to criticism and their ability to learn from this criticism fall within the range of behavior one would expect of humans.
* You work with your teammates regularly.
  * You can't do an effective code review with someone who hates you, and a code review affords you many opportunities to make your teammate hate you in the future.
  * Many of these techniques optimize for preserving good relationships with your teammates. For a one-off review (e.g. a drive-by patch to an open source project), the relationship-preservation aspects of these techniques will not be as relevant.
* You are on a team that requires code review approval before checking in any code.
  * If code reviews are optional or do not require explicit signoff, these techniques will still work, but you'll want to apply an even lighter touch to ensure that the author doesn't simply skip review or ignore your notes because they find them overwhelming or obstructive.
* Your team writes unit tests.
  * There is a cultural expectation on your team that functional changes to the code be accompanied by corresponding unit tests.
  * You can do code reviews without unit tests, but it requires the reviewer to do a lot more mental work. These techniques assume that the reviewer can gain confidence in the code's correctness by reading the unit tests or suggesting additional test cases.

# What is a code review?

The term "code review" is very broad. It can refer to simply having a teammate read some code over your shoulder or to a 20-person review meeting, so let me clarify the type of review I'm describing in this article.

The participants in a code review are the **author**, who writes the code and sends it for review, and the **reviewer**, who reads the code and decides when it is ready to be checked in to the team's codebase. A code review can have multiple reviewers, but in this article, I assume for simplicity that you are the sole reviewer.

Before the code review begins, the author must create a **changelist**. A changelist is a set of changes to source code that the author wants to check in to the team's shared code repository. In Github terms, a "pull request" is simply a way to represent an author's request to check in a given changelist.

A code review begins when the author sends their changelist to the reviewer. Code reviews happen in **rounds**.  Each round is one complete round-trip between the author and reviewer. The  author sends changes and the reviewer responds with written feedback on those changes. Every code review has one or more rounds.

The code review ends when the reviewer grants **approval** on the changes. This is also known as giving "LGTM", a shorthand for "looks good to me."

1. Author creates a changelist.
1. Author runs the change through continuous integration to verify it builds and passes all tests and linters.
1. Reviewer reviews changelist and sends notes to author. The author may or may not approve the code for check-in.
1. Author makes changes based on reviewer's notes.
   1. If the reviewer gave check-in approval, author checks in their code.
   1. If the author did not give check-in approval, author goes back to step 2. This loop continues until the reviewer gives check-in approval.

TODO: Replace this with a diagram showing back and forth between author and reviewer.

There are a variety of tools available to help you with code reviews: Reviewable, Github's code review feature, Gerrit (TODO: links), etc. The exact tool you use doesn't matter. When I worked at Microsoft in the late 2000s, authors just sent their changelists via email and reviewers emailed back with a list of line numbers and corresponding notes. It was *inconvenient*, but it still covered all the essentials of a code review.

# Why is this hard?

Programmers tend to overestimate the quality of the code they write. If a programmer sends you a changelist that they think is awesome, and you write them back with list of reasons why it's not, that's a sensitive message to get across.

>That's one reason I don't miss IT, because programmers are very unlikable people... In aviation, for example, people who greatly overestimate their level of skill are all dead.<br><br>Philip Greenspun, co-founder of ArsDigita, excerpted from [*Founders at Work*](http://amzn.to/2wzrjpa).

It's very easy for an author to interpret criticism of their code as criticism of their skill as a developer. Code reviews are an opportunity for sharing knowledge and making informed engineering decisions, but that can't happen if the author perceives the discussion as a personal attack.

You also have to deal with the perils of communicating over text. The author has no voice tone or body language to add context to your comments. An innocuous note like, "You forgot to close the file handle," can be read as, "I can't believe you forgot to close the file handle. You're such an idiot."

Because we agreed your teammates are humans, it's impossible to have a perfectly emotionless, objective discussion about any changelists. Similarly, all human communication is vulnerable to miscommunication or misinterpretation. But the techniques I describe below will help minimize these effects so that you can keep code reviews as objective and free of personal attacks.

# tl;dr: Show Empathy

The only article I could find that I think gets code reviews right was, ["Humanizing Peer Reviews"](http://www.processimpact.com/articles/humanizing_reviews.html) by Karl Wiegers. The "reviewer should have compassion and sensitivity for [their] colleagues." I completely agree with Dr. Wiegers.

In his book, Peer Reviews in Software:

>critical to have respect for each other

The overarching theme behind all the techniques I describe below is about empathizing with the author. If you were in their position, how would you like to receive feedback? What sort of review process would help you do your best work?

# Techniques

## Let robots do the boring parts

Your time as a developer is scarce. Your mental stamina is scarcer still. Reading code someone else wrote is mentally taxing and requires a high degree of focus. Don't waste any of your mental energy in a code review doing things that you can automate, especially when the automation generally outperforms humans. A code review comment like, "This should be indented two more spaces," is a huge waste of time and mental effort.

Let's compare the steps required for a human to point out a whitespace errors as opposed to using a formatting tool:

<table>
<thead>
<tr>
  <th>With a human reviewer</th>
	<th>With a formatting tool</th>
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

The right side is empty because the author uses a code editor that automatically formats the whitespace in their code every time they save the file. At worst, the author sends their code out for review and the continuous integration solution reports that the whitespace is incorrect, so the author fixes the issue without the reviewer ever having to care.

Look for elements in your code reviews that you can automate away. Here are the common ones:

| Task | Automated solution |
|-------|--------------------------|
| Verify the code builds | Continuous integration solution such as [Travis](https://travis-ci.com) or [CircleCI](https://circleci.com/). |
| Verify automated tests pass | Continuous integration solution such as [Travis](https://travis-ci.com) or [CircleCI](https://circleci.com/). |
| Verify code whitespace matches team style | Code formatter, such as [YAPF](https://github.com/google/yapf) (Python formatter) or [ClangFormat](https://clang.llvm.org/docs/ClangFormat.html) (C/C++ formatter) |
| Identify unused imports or unused variables | Code linters, such as [pyflakes](https://pypi.python.org/pypi/pyflakes) (Python linter) or [JSLint](http://jslint.com/help.html) (JavaScript linter)

Automation helps the reviewer make more meaningful contributions to the review. When you can ignore a whole class of issues, such as the ordering of `imports` or correct naming of variables, it frees up mental capacity to focus on more interesting things like weaknesses in readability or flaws in functionality.

This also benefits the code author. Automation means instant feedback for large classes of errors instead of waiting minutes to hours for feedback from a human reviewer. The instant feedback makes it easier to learn (TODO: link to study) and cheaper to fix because the author still has all the context of the code in their head.

## Settle style arguments with a style guide

Arguments about style are a waste of time in code reviews, so you should minimize these as much as possible. The best way to do this is by using a style guide.

A style guide defines superficial conventions such as naming conventions or whitespace formatting rules, but it also specifies how you use a given language. Languages like JavaScript or Perl are packed with functionality, offering many different ways of implementing the same logic. A style guide can define The One True Way of doing things so that you don't end up in a situation where half of your team uses one set of language features while the other half uses a totally different set of features and your code looks like a mess.

There are a few ways to create a style guide for your team:

**Option 1: Adopt an existing style guide**

If you search online, you can find published style guides. [Google's style guides](https://google.github.io/styleguide/) are the most well-known, but you can find others if Google's style doesn't suit you.

Creating a good style guide requires substantial effort. The benefit of adopting an existing guide is that you inherit the benefits of this effort without any work. The downside is that organizations optimize style guides for their particular needs.  For example, Google's style guides are conservative about [using new language features](https://google.github.io/styleguide/cppguide.html#C++11) because they have an enormous codebase with code that has to run on anything from a home router to an iPhone. If you're a four-person startup with a single product, you can afford to be more aggressive about using cutting-edge language features or extensions.

**Option 2: Create your own style guide incrementally**

If you don't want to adopt an existing guide, you can create your own. Every time a style argument arises during a code review, raise the question to your whole team to decide what the official convention should be, then codify that decision in your style guide. If the issue ever comes up in the future, use your style guide to settle the argument.

I prefer to keep my team's style guide as Markdown under source control (e.g. [GitHub pages](https://pages.github.com/)). That way, any changes to the style guide go through the normal code review process - someone has to explicitly approve the change, and everyone on the team has a chance to raise concerns. Wikis and Google Docs are valid alternatives as well.

**Option 3: The hybrid approach**

Combining options 1 and 2, you can adopt an existing style guide as your base, then maintain a local copy to extend or override the base. A good example of this is the [Chromium C++ style guide](https://chromium.googlesource.com/chromium/src/+/master/styleguide/c++/c++.md). It uses the [Google's C++ style guide](https://google.github.io/styleguide/cppguide.html) as its base, but makes its own changes and additions on top of the base guide.

## Start reviewing immediately

If a teammate sends you a code review, it likely means that they are blocked on other work until your review is done. Sometimes  If they know to expect turnaround times of a few hours from you, they'll plan their work differently.

I aim to start a code review within minutes of receiving it. One business day is the absolute longest turnaround time I will give a code review. If I expect it to take longer than that, I email the author letting them know and give them the option to reassign to a different reviewer.

When you start code reviews immediately, you create a virtuous cycle, because the length of time the author has to wait for comments is purely a function of the size and complexity of the changes. This incentivizes authors to send small, narrowly scoped changelists. These types of changelists are easier and more pleasant for you to review, so you complete your reviews more quickly and the cycle continues.

Imagine if you implemented a new feature in 1000 lines of code. If your your reviewer can review a 200 line changelist in about 2 hours, you can break your feature into changelists of about 200 lines and get the whole feature checked in within a day or two. If, however, your teammate takes a day to review your code regardless of size, now it takes a week to get that feature checked in. You don't have a week to sit around, so you're incentivized to send code reviews closer to 500-600 lines so you can have a turnaround of around a day or two.

In contrast, if you sit on code review for a day or two regardless of review size or complexity, you incentivize the author to send you larger, more complex code reviews because otherwise it's going to take them forever to get all of their code through review.

The absolute maximum turnaround on a code review should be 24 hours. If you're struggling with a higher priority issue and can't review it in under 24 hours, let your teammate know and give them the opportunity to reassign to someone else. You should flip reviews sparingly. If you're forced to do this more than about once per month, reassess your team's pace so that you have time to sustain quality.

## Start high level and work your way down

In most reviews, you'll generally have a mix of notes that are high level (e.g. "can we break this class into two classes?") and notes that are low level (e.g. "'success' is misspelled here"). If you have broad, high level notes, start with those and defer your lower-level notes to a later review round.

There's a cost to every note. First, there's the time cost of you writing it, especially if you are giving extra care to your words to avoid ambiguity or insult. Then for the author, there is both a time cost to reading and understanding your note and a psychological cost for each note. In theory, if the author writes a 100-line change and gets back 100 separate notes, they should be happy to receive 100 different ways to improve their skills as a developer. We agreed previously that your co-workers are humans with normal human emotions and egos of varying degrees of fragility. Most human developers get sadder as the number of code review notes they receive increases.

As a reviewer, you want to minimize the cost you impose with your notes.

Low level notes might become moot once the author makes revisions based on your high-level notes.

## Be generous with code examples

One source of tension in a code review is that every note is essentially assigning the author more work to do. If the author sent you code for review, they presumably thought they were about ready to check it in and make progress on whatever feature they're working on. A slew of code review notes can help the author grow in the long term, but in the short term, they have a feature to ship and rigorous code review notes can make you seem like an impediment to that goal.

To combat this, look for opportunities to show the author that you're helping them. One gift that many developers like to receive is code.

Contributing code during the review shows that you are generous with your time as a reviewer.

Especially as you develop a relationship with a teammate, you need to offer something to make them happy they used you for a code review.

Volunteering code is especially useful if you and the author haven't reviewed code for each other much or if the author is not accustomed to having their code reviewed at all. Even if you and the author have built trust reviewing each other's code, sometimes just writing code is easier than describing the code you'd like them to write. The idea has to go from your brain to their brain to the code and it can be mistranslated at any step. A code example is unambiguous and easy to copy/paste.

For example, imagine that you have a colleague who is not familiar with the [list comprehensions](http://treyhunner.com/2015/12/python-list-comprehensions-now-in-color/) feature of Python. They send you a code review that includes these lines:

```python
urls = []
for path in paths:
  url = 'https://'
  url += domain
  url += path
  urls.append(url)
```

If your note is simply, "Can we simplify this with a list comprehension?" now they're annoyed because they have to spend 20 minutes looking up list comprehensions figuring out how to apply them to their code.

They'd likely be much happier to receive a note like the following:

> Consider simplifying with a list comprehension like this:
>```python
urls = ['https://' + domain + path for path in paths]
```

Reserve this technique for clear, uncontroversial improvements. In the list comprehension example above, few Python developers would object to an 83% reduction in lines of code. In contrast, if you write a lengthy code example to demonstrate a change that is "better" based on your own personal taste (e.g. style changes), code examples can make you look pushy instead of generous.

Limit yourself to two or three code examples per review round. If you start writing their whole changelist for them, it can signal that you don't think they're capable of writing their own code.

Code gifts can include:

* Using a language or library feature to reduce code compelxity
  * This only works for libraries that are already included in the project. If your note is, "We can save 25 lines of code if we add a dependency on this library I found," that's not a gift, but an argument about reducing dependencies vs. reducing lines of code.
* Adding a unit test case the author neglected to cover
* Refactoring a class or function to make it simpler
  * Use caution here, as simplicity can be subjective.

## Never use the word 'you'

This one is going to sound weird, but hear me out.

Give  feedback about the code, not the coder.

Don't address feedback to the author using the word "you."

Good developers take pride in their work. It's great to find teammates who can detach their feelings from their work and graciously accept criticism as opportunity for growth, but it's rare to find developers who truly behave like that. Because the natural human reaction when someone criticises something you're proud of is to be protective and defensive.

Even if you make a harmless comment like, "You misspelled 'successfully'," the author might interpret that note in two very different ways:

* **Interpretation 1**: "[Hey, good buddy,] you misspelled successfully [but I think you're still smart and it was probably just a typo.]"
* **Interpretation 2**: "You misspelled successfully[, dumbass]"

This sounds very accusatory.

>Can you change this variable name to something more descriptive, like `seconds_remaining`?

Another way around "you" is to replace it with "we"

>Can **we** change this variable name to something more descriptive, like `seconds_remaining`?

When you say, "we" you reinforce the idea of a collective responsibility for the code. The author may move on to a different team or organization, but code sticks around for years and needs maintainers. I admit that in some cases, it sounds ridiculous.

One way I get around this is by using a shorthand that drops pronouns from the sentence:

>Suggest renaming to something more descriptive, like `seconds_remaining`.


| With "you" | Without "you" |
|---|----|
| You didn't test for correctness when the database is empty. | We should add tests for the case where the database is empty. |
| You misspelled 'successfully'. | Misspelling on "successfully" (missing an 's') |

TODO: Cartoon of one person doing hard labor (e.g. digging a hole) and the other person saying something like "**we** should do X" (e.g. "**we** should dig a hole").

## Frame feedback as requests, not commands

People tend to reduce politeness in code reviews, whereas you actually want to increase it. Err on the side of being annoyingly gentle. Most people would never say out loud to a co-worker, "Hand me that stapler then fetch me a soda," but I've seen numerous code reviewers frame feedback as similarly pushy commands during code reviews, "Move this class to a separate file."

Instead, frame your feedback as requests. Compare this comment framed in two different ways:

| Command | Request |
|----|---|
| Move the `Foo` class to a separate file. | Can we move the `Foo` class to a separate file? |

It gives the author a sense of autonomy. People like to feel in control of their own work. It also makes discussion easier if they need to push back. Maybe they have a good reason for making the choice they made. If you framed your feedback as a command, pushing back requires them to disobey your order. If you frame your feedback as a request or a question, they can push back by simply answering your question.

If the author has to push back, compare how combative the conversation seems depending on how the reviewer frames their initial note:

| Command | Request |
|---|---|
| **Reviewer**: Move the `Foo` class to a separate file.<br>**Author**: I don't want to do that because then it's far away from the `Bar` class. Clients will almost always use the two together.  | **Reviewer**: Can we move the `Foo` class to a separate file?<br>**Author**: We could, but then it's far away from the `Bar` class, and clients will generally use these two classes together. What do you think? |

See how much more civil the conversation becomes when ~~you validate your argument with imaginary scenarios~~ code review notes are framed as requests?

## Limit feedback on repeated patterns

If there's a repeated pattern, don't flag it every single time. As discussed in a [previous section](#start-high-level and-work-your-way-down), there is a cost to every note you give. You don't want to spend your time writing the same note 25 times, and the author certainly doesn't want to read 25 duplicate notes.

If you see a pattern repeat two or three times, it's fine to call out each instance. Anything more than that, just ask the author to fix the pattern rather than flagging each individual instance.

For exmple:

>Style guide forbids abbreviations in names, so we should change `net_name` to `network_name`
>(ditto for `ip_addr` -> `ip_address` and `client_af` -> `client_address_family`)

>Function names should have a an underscore if they're not part of the module's public interface.
>(ditto throughout)

## Give notes based on principles, not opinion

For example, instead of saying, "We should split this class into two," it is much better to say, "We should split this class into two so that we're in line with the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)."

Grounding your notes in principles frames the discussion in a constructive way. If you cited a specific reason, like "We should make this function private to minimize the class' public interface," the author can't simply respond, "No, I prefer it my way," because you've provided a specific reason and they haven't.

Try to give objective notes. If you say, "Refactor, this is ugly," you can't really have a discussion about this.  Things like "we can avoid duplicating logic if X."

Software development is both a science and an art, so it's not always possible to articulate exactly what's wrong with a piece of code in terms of established principles. Sometimes things are just ugly or unintuitive and it's hard to pin down exactly why. In these cases, try to keep it as objective as possible.  If you say, "**I** found this hard to understand," that's at least an objective statement, as opposed to "**this is** confusing," which is a value judgment and varies by person.

Provide supporting evidence where possible in the form of links.  The best thing to link to is your style guide. You can also link to documentation for the language or library. Highly-upvoted [StackOverflow](https://stackoverflow.com) answers can work as well, but the farther you get from authoritative documentation, the shakier your evidence becomes.

## Respect the scope of the review

Generally, if the auhor hasn't touched the line, it's out of bounds. Even if the author is the same person who wrote the code outside the diff, 

TODO: show a diff of this

The exception to this is when the change

```c++
bool Document::ValidateAndSerialize(Handle* output_handle) {
  ValidationResult validation_result = validator_->Validate(&contents_);
  if (ValidationResult == ValidationResult::Failure) {
    return false;
  }
  return serializer_->Serialize(&contents_);
}
```

TODO: show a diff of this

If the change also changed assumptions about surrounding code, even if they didn't touch the surrounding code.

In this case, you should point out that the function name `ValidateAndSerialize` needs to be changed because the author's changes even though they haven't touched that line. This is especially common for things like naming or code comments where the change causes it to go out of date.

But sometimes, you've taken the time to notice something and if the review is pretty light anyway, I throw in a request to make the change, but make it clear that it's optional and I'm respecting the scope.

>(out of scope, optional) We can avoid an additional copy by using a constant reference as the loop iterator.

TODO: show a diff of this

## Aim to bring the code up a letter grade or two

Early in my career, the bar I set for adding my approval to a code review was that I could say, "This code is as good as if I had written it myself." It only seemed sensible. My name was forever forged in the source history as the person who approved the change, so I wanted to make sure it was the best that I could possibly make it.

This worked fine because early in my career, most of the people around me were better developers than I was. As a junior developer, my view of what could be improved in the code was limited to straightforward and uncontroversial things like, "The function naming is inconsistent across these two classes."

As I gained more experience, I began to see opportunities for deeper improvements in code I was reviewing. It's a very different experience for a senior dev to get simple, easily addressable notes from a junior dev. I realized it's much more unpleasant for a junior dev to get deep notes from a more senior dev.

If a code review comes to you as a D, the only way you're getting it up to an A+ is if you go eight rounds of review. By the end of it, the author will hate you and will never want to send you a code review ever again.

If I get a D code review now, I try to help the author get it to a C or a B-. Usually, I find that the next code review they send me will start at a C.

An F is for code that is either functionlly incorrect or so convoluted that you don't have confidence of its correctness. The only reason you should withhold approval is if you can't raise the code above an F (see the section on stalemates, below).

## Look for opportunities to split up large reviews

If you receive a changelist that's more than 300-400 lines of code, push back and ask the author to split up the changelist. You should push back exponentially harder as the size increases above 400 lines of code. I personally refuse to review changelists that are over 1,000 lines.

Depending on the author, they may gripe about being asked to split a changelist because it's a very tedious task. Try to help them out by suggesting logical boundaries where they can split the code. The easiest case is if the changelist has changes to multiple modules. If this is the case. In harder cases, look for the lowest layer of the changelist - functions or classes that are at a lower abstraction layer than the rest of the changes and ask to split those changes into their own changelist, then circle back to the changes on top of those later.

You should especially try to find ways to split up the changelist if the code is bad, like what you'd grade a D or F.
If you can pick a self-contained 75-line piece out of a 400, start out by asking the author if they'd mind splitting that out. This is good for two reasons. It lets you divide and conquer. Bad code gets exponentially harder as its size increases, so you're much better off reviewing two bad 250-line changelists than a single 500-line changelist. Second, it gives the author positive momentum

Ideally you should request a split at the beginning of the code review, but if you find yourself arguing endlessly about part of the code review, asking the author to split off an uncontroversial part of the changelist can be a way to ease tensions. Part of what's frustrating from the author's perspective if you're going back and forth about code review notes is that they feel like you're obstructing their progress. They probably have deadlines they're trying to hit and they might see you as obstructing those goals. If you split off a piece they can check in, you're making them feel good by showing that you can make tangible progress together.

## Be extremely tolerant in pure housekeeping reviews

One of the kindest things your teammates can do is a pure housekeeping code change. By "pure housekeeping," I mean a change that does not affect the software's production functionality, but makes the code easier to maintain. This includes:

* Refactoring code (*pure* refactoring that does not change behavior)
* Deleting dead code
* Adding test cases
* Improving documentation

When my teammates send me these types of reviews, I am SOOOO happy. These types of changes are a big gift. They help everyone on the team by making the code easier to maintain.

Correspondingly, one of my biggest pet peeves is when I send out a pure refactoring change that clearly simplifies the code and my reviewer refuses to sign off until I improve it *more*.

You know the expression, "Don't look a gift horse in the mouth?" This is worse than looking a gift horse in the mouth. This is receiving a gift horse, looking it in the mouth for *an hour*, then refusing to accept it until you receive a gift saddle as well.

When a teammate asks you to review a pure housekeeping change, ask yourself, "Does this change make the code better than it was before?" If the answer is yes, give immediate approval. Add some notes, but make it clear that they are optional. If you really care about further improvements, you can write them yourself after your teammate has checked in their code. If you are nitpicky or demanding when reviewing pure housekeeping changes, you will leave your teammate feeling like no good deed goes unpunished, and it will discourage them from making these types of contributions in the future.

## Offer sincere praise

Remember that code review doesn't have to be all negative. Code reviews are an opportunity for positive reinforcement as well. If you sent someone a changelist to review, wouldn't you like to hear comments like these in response?

* "I never knew about this API. That's really useful!"
* "This is a really elegant solution. I never would have thought of this."
* "Breaking up this function was a really good idea. It's so much simpler now."

If you gave the author a tough note that required them to rewrite a lot of their code, show appreciation that they put in the work. I'll sometimes say things like, "This looks much better!"

If you've given them feedback on previous reviews about bad coding habits and you see in a new review that they've made an effort to correct those habits, call this out as well. For example, if I've given notes in the past about documentation that's hard to read, then in a subsequent changelist, they send me documentation that's very clear, I'll usually say something like, "I like this function comment. It's very clear and thorough."

If you're reviewing code for a junior developer or someone who is new to the team, be especially cognizant of opportunities to offer praise. These are the people for whom a code review is the most stressful, so offering positive reinforcement is a good way of showing you value them as a teammate.

## Give approval when remaining fixes are trivial

Some reviewers have the misconception that they should not approve a code review until they've witnessed fixes for every last issue they've raised. This is poor practice and wastes time for both the reviewer and the author.

Granting approval when the following are true of your remaining notes:

* You have no more notes worth discussing.
* The remaining changes you're suggesting are so trivial that it's not worth the cost of an additional round of review.
* Your final round of notes consist of minor suggestions that you don't mind if the author rejects, so your approval stands whether or not they act on them.
  * Explicitly mark optional notes as optional so that your teammate doesn't assume the approval is contingent on taking the notes.

If your only remaining note is that the author missed a period at the end of a comment, you're either a control freak or you have such a low opinion of your teammate that you can't trust them to add punctuation without screwing something else up.

This doesn't always go perfectly. I'd say that 5% of the time, the author either misinterprets or completely misses a note I gave alongside my approval. To mitigate this, I simply look at the changes the author makes after my approval. In the rare case of miscommunication, I either follow up with them to let them know or I just fix it myself and send it to them for review. Doing a small amount of work in the 5% case is much better than making my teammate needlessly wait a whole extra review round trip before they can check in their code in the 95% case.

## Handle stalemates proactively

The worst possible outcome of a code review is a stalemate: you refuse to sign off on the changelist without further changes and the author refuses to make those changes.

In my entire software development career, I've only had one code review reach stalemate. It was not fun.  It was unpleasnt to participate in and my reputation took a hit for a while afterwards. It's kind of like being involved in a fistfight at the office. Even if you weren't the aggressor, it looks bad that you were involved at all.

Some indications that you're headed for a stalemate:

* The tone of discussion is becoming hostile.
* Your notes per review are not trending downward.
  * In a normal review, the 
* You're getting pushback on a very high number of your notes.

What you can do:

* Talk it out
  *  Meet in person or over video chat to work through the issues you're stuck on. Something about text communication makes it really easy to hate your teammate and assume they're coming from a place of stubbornness or incompetence. Talking in person will break that for both you and your teammate.
* Evaluate whether you need a design review
It may mean that you need  a design review.
* Escalate

You don't want to just sit on it or keep circling around. The longer you sit in stalemate, the more damaging it is to your relationship with your teammate

Arguments in code review tend to be less about the code and more about the relationship between the author and reviewer. If you reached stalemate or near-stalemate, it's probably going to happen again in the future if you don't address it.

* Take a break from each other
* Read *Crucial Conversations*
* Discuss the situation with your manager

# Conclusion