---
title: "Refactoring English: Month 18"
date: "2026-06-09"
description: TODO - One-line summary
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and founder of small, indie tech businesses. I'm currently working on a book called [_Refactoring English: Effective Writing for Software Developers_](https://refactoringenglish.com).

Every month, I publish a retrospective like this one to share how things are going with my book and my professional life overall.

{{</notice>}}

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Goal 1

- **Result**: XX
- **Grade**: XX

TODO

### Goal 2

- **Result**: XX
- **Grade**: XX

TODO

### Goal 3

- **Result**: XX
- **Grade**: XX

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

## When is the book "done?"

I've completed all the chapters of the book, but I don't consider it officially "done."

I wrote the book over the past year and a half, usually focusing on a single chapter at a time, mostly out of order. I haven't ever read the book cover to cover to make sure it's all consistent. So, I want to do a few readthroughs at least before I call it done.

### Why didn't I reach out to readers more?

I also originally planned for the book to be more continuously edited based on reader feedback. That way, when I got to the last chapter, the book would be pretty much done because the rest of the book would have had many revisions based on comments from readers.

In reality, I integrated reader feedback far less than I expected.

The first reason is that I found it hard to split my focus between revising and writing new chapters. If revising old chapters and didn't add any chapters, it felt like I wasn't making forward progress. I also felt like I was less productive when splitting my time between new chapters and old chapters.

The other reason I didn't continuously revise is that I didn't reach out to readers as much as I planned. Part of that is that I constantly felt behind on the book, so there was always a sense of, "I want to get this chapter out, and _then_ I'll invest more into reader outreach."

But even when I did reach out to readers, it didn't often impact the book. The most common responses I'd get were, "I like the book" or, "I haven't started it yet." And when I did get feedback, I wasn't always sure how to act on it. In some cases, the reader would flag some issue, and I'd agree and. But a lot of the times, the reader would suggest adding something that I didn't think was necessary. And that's not to say the reader was wrong, but I'd want to see a pattern in reader feedback before I make a change that doesn't match my intuitions.

### My reader feedback tool

Now that I've completed all the chapters, I feel like I have more space to reach out to readers.

I've seen [_Help this Book_](https://helpthisbook.com/), but I didn't like the idea of a third-party holding all of my reader feedback in a silo that I have to pay monthly to access. I saw that Julia Evans [made her own reader feedback tool](https://jvns.ca/blog/2023/03/31/zine-feedback-site/), customized to her products, and I thought that was neat, so I'm working on that.

{{<video src="feedback-app.mp4" max-width="700px" caption="I'm working on a web app to make it easier for readers to give me inline feedback about my book.">}}

##

## AI projects and the great blockade

Overall, I've found that AI makes me more productive when programming. There are certain tasks like merge conflicts or debugging gruntwork where AI is a clear win.

The place where I'm less

Back in December, I declared that I was going to replace a commercial family photo sharing app with an open-source version I planned to write myself. I thought implementation should be pretty straightforward:

> How hard could that be? 20 hours of dev work?
>
> - [Me, six months and 80 hours of work ago](/retrospectives/2025/12/#building-a-free-tinybeans-alternative-out-of-spite)

My first delay was that I wanted to write a design doc for it that I could use as a model for what design docs should look like. So, that took me a while.

Once the design doc was done, I was able to move quickly on implementation. I quickly reached the point where I got a minimum version running on my local system. But that didn't feel fun because I couldn't share it with any of my family members, so I realized the most important next feature was authentication.

I wanted to use email based magic login links. I didn't think this would be hard. I have another app that uses username/password authentication and allows users to reset their password via email, so Little Moments should essentially be a simpler version of code I already have.

But when I started porting it to Little Moments, I realized the code was pretty confusing. I was using one library, jeff for session management. I was using another library, [simpleauth](https://codeberg.org/mtlynch/simpleauth) for authentication, and simpleauth depended on jeff in confusing ways.

I don't like having coe in the main branch that's inert, dead code. I don't like having broken features. And it's like, "How do you have half an email-based auth login?"

And right now, I'm realizing I can split it into two parts. I can do a first-pass implementation where it doesn't actually send the email but instead just forwards the user to the link they'd click in their email. It's not something I can deploy to the Internet yet, but it exercises the plumbing I need to add real emails. But I'm not sure I'd have realized that if I wasn't writing about it.

If you start with AI, it's easy to generate a lot of code quickly.

Problem is that the low cost makes you miss opportunities to simplify. I definitely would not have made comments and reactions separate representations if I'd been coding by hand.

## Topic 2

## Topic 3

## Side projects

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
