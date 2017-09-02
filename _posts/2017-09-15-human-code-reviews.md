---
title: How to Do Code Reviews Like a Human
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
---

I love code reviews. They are my favorite part of writing software with others.


A lot of articles appear to be written in the future where your co-workers are robots and pointing out errors warms their cold robot hearts. Or they assume that your co-workers are idiots and you have to constantly be on them to prevent their next idiot mistake. It's like reading a guide to a healthy marriage that's all about how to identify your spouse's flaws.

I think most articles about code reviews miss the point because **code reviews are not about finding bugs**. If you approach a code review trying to catch the most bugs, you will lose out on most of the value and fun of code reviews.

Source code is a way of expressing an idea to your teammates. When you review code, you assess how well it expresses the ideas to you.

You're not there to catch them out on errors. You're there to make the code excellent and help them.

I don't start thinking about correctness until I feel the code is easy to reason about

I'm a good code reviewer because I'm bad at reading code. Can't keep that much context in my head.

Before we go any further, here are some assumptions:

* You are in an organization that agrees code reviews are a good idea.
* Code reviews are not complete until a reviewer signs off.
* You have a non-bad relationship
  * These techniques will work with teammates you have no history with and will work especially well with teammates whom you get along with well. If you're reviewing code for someone who hates you, you have team dynamics problems that code review techniques can't fix.

## Let robots do the boring parts

As a human, you want to eliminate parts of the code review that don't actually require a human.

| Task | Automated solution |
|-------|--------------------------|
| Verify the code builds | Continuous integration solution such as Travis or CircleCI. |
| Verify automated tests pass | Continuous integration solution such as Travis or CircleCI. |
| Verify code whitespace matches team style | Code formatter, such as YAPF (Python formatter) or gofmt (golang formatter) |
| Identify unused imports or unused variables | Code linters, such as pyflakes (Python linter) or [JSLint](http://jslint.com/help.html) (JavaScript linter)

Structure your code reviews so that the requests for review don't even go out until all the build checks pass. Code reviews are mentally taxing. Don't squander the limited mental stamina you have with mechanical checks like whether the line breaks are in the right place.

## Focus on readability, not correctness

Your job as code reviewer is to ensure that the code is easy to read and reason about.

>There are two ways of constructing a software design: One way is to make it so simple that there are *obviously* no deficiencies, and the other way is to make it so complicated that there are no *obvious* deficiencies. <br>-Tony Hoare



## Never use the word 'you'

Give  feedback about the code, not the coder.

{% capture fig_img %}
![deadlifter and coach](https://thumbs.dreamstime.com/b/gym-personal-trainer-man-weight-lifting-bar-woman-28359020.jpg)
{% endcapture %}

{% capture fig_caption %}
"*We* should deadlift this barbell."
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>{{ fig_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>


## Frame feedback as requests, not commands

People tend to reduce politeness in code reviews, whereas you actually want to increase it. Err on the side of being annoyingly gentle. Most people would never say out loud to a co-worker, "You have to bring me that stapler," but a lot of code reviewers don't think twice about saying, "You have to move this class to a separate file."

Instead, frame your feedback as requests. Compare these two commands:

| Command | Request |
|:----:|:--:|
| You have to move this class to a separate file. | Can we move this class to a separate file? |

It gives the author a sense of autonomy. People like to feel in control of their own work. It also makes discussion easier if they need to push back. Maybe they have a good reason for making the choice they made. If you framed your feedback as a command, pushing back requires them to disobey your order. If you frame your feedback as a request or a question, they can push back by simply answering your question.

## Look for opportunities to split up large reviews

Push back on code reviews that are more than 300-400 lines of code.

## Aim to bring the code up a letter grade or two

Early in my career, the bar I set for adding my approval to a code review was that I could say, "This code is as good as if I had written it myself." It only seemed sensible. My name was forever forged in the source history as the person who approved the change, so I wanted to make sure it was the best that I could possibly make it.

This worked fine because early in my career, most of the people around me were better developers than I was. As a junior developer, my view of what could be improved in the code was limited to straightforward and uncontroversial things like, "The function naming is inconsistent across these two classes."

As I gained more experience, I began to see opportunities for deeper improvements in code I was reviewing. It's a very different experience for a senior dev to get simple, easily addressable notes from a junior dev. I realized it's much more unpleasant for a junior dev to get deep notes from a more senior dev.

If a code review comes to you as a D, the only way you're getting it up to an A+ is if you go eight rounds of review. By the end of it, the author will hate you and will hate doing code reviews with you.

If I get a D code review now, I try to help the author get it to a C or a B-. Usually, I find that the next code review they send me will start at a C.

You do have to maintain some minimum bar. You *really* don't want to accept an F.

## Lower the bar on pure housekeeping reviews

This is worse than looking a gift horse in the mouth. This is receiving a gift horse, but refusing to accept it until the generous horse gifter agrees to throw in a gift saddle as well.

{% capture fig_img %}
![woman accepting flowers](https://thumbs.dreamstime.com/z/man-giving-flowers-gift-to-woman-handsome-men-women-home-40251122.jpg)
{% endcapture %}

{% capture fig_caption %}
"I refuse to accept these flowers unless you also give me a teddy bear."
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>{{ fig_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>

99% of the time, I give instant approval with maybe a handful of notes that I make clear are optional. If it's important to you that the

## Give LGTM when remaining fixes are trivial

LGTM means that you trust them to fix the remaining issues. Withholding LGTM wastes time for both the author and the reviewer. If your only remaining note is that they're missing a period at the end of a comment, you're a jerk if you withold your LGTM over that.

## When you feel a stalemate coming, eject

This should be exceedingly rare. In my entire software career, I've only ever had one reach stalemate.