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

I can only assume these articles are from the future, where all developers are robots, and hearing a list of criticisms about code they've worked hard warms their cold, robot hearts.

Let's assume for a moment that we want to improve code reviews in the present, where our teammates are humans. In this article, I'll discuss some code review techniques that take into account the fact that a code review is not only a technical process, but a social one as well.

* TOC
{:toc}

# Assumptions

The techniques I describe below will apply to code reviews generally, but it will work *best* in an environment where the following conditions are true:

* Your teammates are humans.
  * Their reactions to criticism and their ability to learn from this criticism fall within the range of behavior one would expect of humans.
* Your code reviews are with developers you work with regularly.
  * You can't do an effective code review with someone who hates you, and a code review affords you many opportunities to make your teammate hate you in the future.
  * If you're a maintainer for an open source project and you receive lots of "drive-by" patches from people who submit once and then never contribute again, the relationship-preservation aspects of these techniques will still work, but you may choose to focus less on the tips designed to improve your long-term relationship with your teammate.
* Your team writes unit tests.
  * You can do code reviews without unit tests, but it requires the reviewer to do a lot more mental work. These techniques assume that the reviewer can gain confidence in the code's correctness by reading the unit tests or suggesting additional test cases.

# What is a code review?

The term "code review" is very broad. It can refer to simply having a teammate read some code over your shoulder or to a 20-person meeting to dissect the code line by line. When I say "code review" in this article, I'm describing a process that is asynchronous and written.

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

There are a variety of tools available to help you with code reviews, but the exact tool you use doesn't matter as long as it allows you to perform the essentials of a code review I just described.

# Why is this hard?

Programmers tend to overestimate the quality of the code they write. If a programmer sends you a changelist that they think is awesome, and you write them back with a list of reasons why it's not, that's a sensitive message to get across.

>That's one reason I don't miss IT, because programmers are very unlikable people... In aviation, for example, people who greatly overestimate their level of skill are all dead.<br><br>Philip Greenspun, co-founder of ArsDigita, excerpted from [*Founders at Work*](http://amzn.to/2wzrjpa).

It's very easy for an author to interpret criticism of their code as criticism of them as a person. Code reviews are an opportunity to share knowledge and make informed engineering decisions, but that can't happen if the author perceives the discussion as a personal attack.

This is doubly hard because you're communicating in writing. The author has no voice tone or body language to add context to your comments. A note meant to be innocuous note like, "You forgot to close the file handle," can be read as, "I can't *believe* you forgot to close the file handle! You're such an idiot."

# tl;dr: Show Empathy

I was only able to find one author who recognized the importance of social and cultural elements of code reviews, Karl E. Wiegers. One passage from his book, [*Peer Reviews in Software: A Practical Guide*](http://amzn.to/2xw6AWV), puts this eloquently:

>The dynamics between the work product's author and its reviewers are critical. The author must trust and respect the reviewers enough to be receptive to their comments. Similarly, the reviewers must show respect for the author's talent and hard work.

The overarching theme behind all the techniques I describe below is to empathize with the author. If you were in their position, how would you like to receive feedback? What sort of review process would help you do your best work?

# Techniques

## Let computers do the boring parts

Your time as a developer is scarce. Your mental stamina is scarcer still. Reading code someone else wrote is mentally taxing and requires a high degree of focus. Don't waste any of your mental energy in a code review doing things a computer can do instead, especially when a computer can do it better.

A simple example is a review note about a whitepsace error, such as, "This line should be indented two more spaces." Compare the steps required for a human to find this error as opposed to using an automatic formatting tool:

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
| Verify code whitespace matches team style | Code formatter, such as [ClangFormat](https://clang.llvm.org/docs/ClangFormat.html) (C/C++ formatter) or [gofmt](https://golang.org/cmd/gofmt/) (Go formatter) |
| Identify unused imports or unused variables | Code linters, such as [pyflakes](https://pypi.python.org/pypi/pyflakes) (Python linter) or [JSLint](http://jslint.com/help.html) (JavaScript linter)

Automation helps the reviewer make more meaningful contributions to the review. When you can ignore a whole class of issues, such as the ordering of `imports` or naming conventions for source filenames, it frees up mental capacity to focus on more interesting things like weaknesses in readability or flaws in functionality.

This also benefits the code author. Automation means instant feedback for large classes of errors instead of waiting minutes to hours for feedback from a human reviewer. The instant feedback makes it easier to learn (TODO: link to study) and cheaper to fix because the author still has all the context of the code in their head.

## Settle style arguments with a style guide

Arguments about style are a waste of time in code reviews, so you should minimize these as much as possible. The best way to do this is by keeping a style guide.

Some of what a style guide defines is superficial, such as naming conventions or whitespace formatting rules. A good style guide also specifies how you use a given language. Languages like JavaScript or Perl are packed with functionality, offering many different ways of implementing the same logic. A style guide can define The One True Way of doing things so that you don't end up in a situation where half of your team uses one set of language features while the other half uses a totally different set of features and your code looks like a mess.

There are a few ways to create a style guide for your team:

***Option 1: Adopt an existing style guide***

If you search online, you can find published style guides. [Google's style guides](https://google.github.io/styleguide/) are the most well-known, but you can find others if Google's style doesn't suit you.

Creating a good style guide requires substantial effort. The benefit of adopting an existing guide is that you inherit the benefits of this effort without any work. The downside is that organizations optimize style guides for their particular needs.  For example, Google's style guides are conservative about [using new language features](https://google.github.io/styleguide/cppguide.html#C++11) because they have an enormous codebase with code that has to run on anything from a home router to an iPhone. If you're a four-person startup with a single product, you can afford to be more aggressive about using cutting-edge language features or extensions.

***Option 2: Create your own style guide incrementally***

If you don't want to adopt an existing guide, you can create your own. Every time a style argument arises during a code review, raise the question to your whole team to decide what the official convention should be, then codify that decision in your style guide. If the issue ever comes up in the future, use your style guide to settle the argument.

I prefer to keep my team's style guide as Markdown under source control (e.g. [GitHub pages](https://pages.github.com/)). That way, any changes to the style guide go through the normal code review process - someone has to explicitly approve the change, and everyone on the team has a chance to raise concerns. Wikis and Google Docs are acceptable options as well.

***Option 3: The hybrid approach***

Combining options 1 and 2, you can adopt an existing style guide as your base, then maintain a local copy to extend or override the base. A good example of this is the [Chromium C++ style guide](https://chromium.googlesource.com/chromium/src/+/master/styleguide/c++/c++.md). It uses the [Google's C++ style guide](https://google.github.io/styleguide/cppguide.html) as its base, but makes its own changes and additions on top of the base guide.

## Start reviewing immediately

Treat code reviews as very high priority. Don't rush through the review itself, but start it immediately— within minutes.

If a teammate sends you a code review, it likely means that they are blocked on other work until your review is done. In theory, there are tools that let them branch, continue working, then merge back together at the end of the review, but there are like four people total who know how to do that without wasting a lot of time fighting with conflicts from three-way diffs.

When you start code reviews immediately, you create a virtuous cycle with your teammates. The length of time the author has to wait for comments becomes is purely a function of the size and complexity of their changelist. This incentivizes authors to send small, narrowly-scoped changelists. These are easier and more pleasant for you to review, so you can turn them around quicker and the cycle continues.

Imagine that the author implemented a new feature in 1000 lines of code. If they know you can review a 200-line changelist in about 2 hours, they can break their feature into changelists of about 200 lines and get the whole feature checked in within a day or two. If, however, you take a day to review your code regardless of size, now it takes a week to get that feature checked in. Your teammate doesn't want to sit around for a week, so they're incentivized to send code reviews closer to 500-600 lines so they can have a turnaround of around a day or two.

The absolute maximum turnaround on a code review should be one business day. If you're struggling with a higher priority issue and can't complete a round of review in under a day, let your teammate know and give them the opportunity to reassign to someone else. You should flip reviews sparingly. If you're forced to do this more than about once per month, it likely means that your team needs to reduce its pace or scope so that you can maintain sane working conditions.

## Start high level and work your way down

There's a nontrivial cost to every note. You have to spend time writing it, then re-writing it to avoid ambiguity or insult. Then the author has to spend time reading and understanding your note. There's also a psychological cost to every note. Even if you word your notes kindly and objectively, if the author is going to be bummed out if every round of review yields 50 notes.

You can avoid overwhelming the author with notes by using the first round our two to hash out high level notes (e.g. "can we break this into two classes"), then defer your lower level notes (e.g. "can we choose a more descriptive name for this variable?") to later rounds.

Your low level notes might become moot once the author integrates your high level notes, so by deferring, you're potentially avoiding the nontrivial costs of each note. Beyond this, keeping the review to at one layer of abstraction at a time helps you and the author work through the changelist in a clear, systematic way.

## Be generous with code examples

With every note, you are essentially assigning the author work. A slew of code review notes can help the author grow in the long term, but it's easy for an author to grow resentful of you piling on lots more tasks for them to do. To combat these feelings, look for opportunities to show the author that you're helping them.

An excellent way to help the developer is by shouldering some of the load of writing code. This shows them that you are generous with your time as a reviewer.

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

* **Interpretation 1**: "[Hey, good buddy,] you misspelled successfully [but I think you're still smart and it was probably just a typo.]"
* **Interpretation 2**: "You misspelled successfully[, dumbass]"

There are a few easy ways to avoid using the word "you" in your code review notes.

***Option 1: Replace 'you' with 'we'***

For example:

>Can** you** change this variable name to something more descriptive, like `seconds_remaining`?

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

## Limit feedback on repeated patterns

If there's a repeated pattern, don't flag it every single time. As discussed in a [previous section](#start-high-level and-work-your-way-down), there is a cost to every note you give. You don't want to spend your time writing the same note 25 times, and the author certainly doesn't want to read 25 duplicate notes.

If you see a pattern repeat two or three times, it's fine to call out each instance. Anything more than that, just ask the author to fix the pattern rather than flagging each individual instance.

For exmple:

>Style guide forbids abbreviations in names, so we should change `net_name` to `network_name`
>(ditto for `ip_addr` -> `ip_address` and `client_af` -> `client_address_family`)

>Function names should have a an underscore if they're not part of the module's public interface.
>(ditto throughout)

## Tie notes to principles, not opinions

For example, instead of saying, "We should split this class into two," it's much better to say, "We should split this class into two so that we're in line with the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)."

Grounding your notes in principles frames the discussion in a constructive way. If you cited a specific reason, like "We should make this function private to minimize the class's public interface," the author can't simply respond, "No, I prefer it my way," because you've provided a specific reason and they haven't.

Try to give objective notes. If you say, "Refactor, this is ugly," you can't really have a discussion about this.  Things like "we can avoid duplicating logic if we refactor these lines into a shared function," that frames the discussion in terms of tangible goals.

Software development is both a science and an art, so it's not always possible to articulate exactly what's wrong with a piece of code in terms of established principles. Sometimes things are just ugly or unintuitive and it's hard to pin down exactly why. In these cases, try to keep it as objective as possible.  If you say, "**I** found this hard to understand," that's at least an objective statement, as opposed to "**this is** confusing," which is a value judgment and varies by person.

Provide supporting evidence where possible in the form of links.  The best thing to link to is your style guide. You can also link to documentation for the language or library. Highly-upvoted [StackOverflow](https://stackoverflow.com) answers can work as well, but the farther you get from authoritative documentation, the shakier your evidence becomes.

## Respect the scope of the review

I occasionally run into an, "If you give a mouse a cookie" problem on code reviews, where my reviewer will see something *near* the code I'm modifying and ask me to fix that too. Then, I'll fix that, and they'll notice something nearby the line I just fixed and ask me to fix that too. And on and on until a narrowly scoped changelist has expanded to include lots of unrelated changes.

The rule of thumb is: if the changelist doesn't touch it, it's out of scope.

For example, in the code snippet below:

```python
 eight = 9
-SaveFile()
+SaveFileByHandle(handle)
```

TODO: find a better example

Even if you're going to stay up all night haunted by the knowledge of a [magic number](https://en.wikipedia.org/wiki/Magic_number_(programming)) in your code base, assigned to a ridiculous variable name, it's still out of scope. Even if the author is the same person who wrote the code outside the diff,  it's still out of scope. If it's really bad, file a bug or submit your own fix, but it's not part of this code review.

The exception to this is when the changelist affects the surrounding code, even if it doesn't actually touch it.

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

In this case, you should point out that the function name `ValidateAndSerialize` needs to change even though they're not actually touching that line. This is especially common for things like naming or code comments where the change causes it to go out of date.

I'll also softly break this rule if the the changelist is already pretty solid and I have very few notes, but I notice something nearby that would be an easy fix. In these cases, I make it clear that they can ignore the note.

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

Code reviews don't need to be all negative. They are an opportunity for positive reinforcement as well. If you sent someone a changelist to review, wouldn't you like to hear comments like these in response?

* "I never knew about this API. That's really useful!"
* "This is a really elegant solution. I never would have thought of this."
* "Breaking up this function was a really good idea. It's so much simpler now."

If you gave the author a tough note that required them to rewrite a lot of their code, show appreciation that they put in the work. I'll sometimes say things like, "This looks much better!"

If you've given them feedback on previous reviews about bad coding habits and you see in a new review that they've made an effort to correct those habits, call this out as well. For example, if I've given notes in the past about documentation that's hard to read, then in a subsequent changelist, they send me documentation that's very clear, I'll usually say something like, "I like this function comment. It's very clear and thorough."

If you're reviewing code for a junior developer or someone who is new to the team, be especially cognizant of opportunities to offer praise. These are the people for whom a code review is the most stressful, so offering positive reinforcement is a good way of showing you value them as a teammate.

## Grant approval when remaining fixes are trivial

Some reviewers have the misconception that they should not approve a code review until they've witnessed fixes for every last issue. This is poor practice and wastes time for both the reviewer and the author.

Granting approval when the following are true of your remaining notes:

* You have no more notes worth discussing.
* The remaining changes you're suggesting are so trivial that it's not worth the cost of an additional round of review (e.g. renaming a variable, fixing a typo).
* Your final round of notes consist of minor suggestions that you don't mind if the author rejects, so your approval stands whether or not they act on them.
  * Explicitly mark optional notes as optional so that your teammate doesn't assume the approval is contingent on accepting the notes.

If your only remaining note is that the author missed a period at the end of a comment and you *don't* grant approval, you're either a control freak or you have such a low opinion of your teammate that you can't trust them to add punctuation without screwing something else up.

This doesn't always go perfectly. I'd say that 5% of the time, the author either misinterprets or completely misses a note I gave alongside my approval. To mitigate this, I simply look at the changes the author makes after my approval. In the rare case of miscommunication, I either follow up with them to let them know or just fix it myself and send it to them for review. Doing a small amount of work in the 5% case is much better than adding unnecessary effort and delay in the 95% case.

## Handle stalemates proactively

The worst possible outcome of a code review is a stalemate: you refuse to sign off on the changelist without further changes and the author refuses to accept your notes and make the requested changes.

In my entire software development career, I've only had one code review reach stalemate. It was not fun.  It was unpleasant to experience and it was difficult afterward just due to the strain on my relationship with my teammate and my reputation as a reviewer. It's kind of like being involved in a fistfight at the office. Even if you weren't the aggressor, it looks bad that you were involved at all.

Some indications that you're headed for a stalemate:

* The tone of discussion is becoming hostile.
* Your notes per review are not trending downward.
  * In a normal review, you number of notes should be strictly decreasing after about two or three rounds as you and the author converge on a shared vision of the code.
* You're getting pushback on a very high number of your notes.

By the time you observe symptoms, things are already in an unhealthy state. It's important that you be proactive in getting out of that state as quickly as possible.

***Option 1: Talk it out***

Meet in person or over video chat to work through the issues you're stuck on. Something about text communication makes it really easy to hate your teammate and assume they're coming from a place of stubbornness or incompetence. Talking in person will break that for both you and your teammate.

***Option 2: Evaluate whether you need a design review***

A contentious code review may mean that the design itself is flawed. Are you arguing about things that should really have been covered during the design review? *Was* there a design review?

If this is really a high-level design issue that affects your whole team, talk to the author about opening up the discussion to other members of your team so that you're not put in a position of preventing a bad design decision all by yourself.

***Option 3: Escalate***

You don't want to just sit on it or keep circling around. The longer you sit in stalemate, the more damaging it is to your relationship with your teammate. Talk to the author about escalating the discussion to your team's manager or tech lead. Offer to allow the author to reassign to a different reviewer. Whether the escalation goes in your favor or the new reviewer agrees with your notes, it's critical that you accept the decisions and move on. Continuing to fight it will drag out a bad situation and make you look unprofessional.

***Recovering from a stalemate***

Arguments in code review tend to be less about the code and more about the relationship between the author and reviewer. If you reached stalemate or near-stalemate, it's probably going to happen again in the future if you don't address the underlying issues in your relationship with that teammate.

* Discuss the situation with your team's manager
  * If there's conflict on the team, your manager should know about it. Maybe the author is difficult to work with and others have run into issues as well and your manager has specific suggestions. Maybe your manager can observe things you yourself are doing that might be contributing to the situation.
* Take a break from each other
  * Don't send each other code reviews until things have cooled off.
* Read [*Crucial Conversations*](http://amzn.to/2hvUbsP)
  * After my stalemate review, my manager suggested I read this book. It's a good resource for structuring difficult professional discussions so that they remain productive and avoid fighting.

# Conclusion

TODO: Say something conclusive and profound