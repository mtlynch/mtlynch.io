---
title: "Refactoring English: Month XX"
date: "2026-08-17"
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

### Pitch to 5 podcasts to talk about _Refactoring English_.

- **Result**: Pitched only to one podcast
- **Grade**: D

I was [a guest on _The TMPDIR Podcast_](https://tmpdir.org/053/), though they invited me even before I pitched to them, so I can't count that one.

### Attract 30k unique readers to the _Refactoring English_ website.

- **Result**: XX
- **Grade**: B

TODO

### Wrap up early access, and declare the 1.0 release of my book.

- **Result**: Still not at 1.0 release
- **Grade**: D

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

## Topic 1

{{<img src="stripe-2026-07.webp">}}

## Topic 2

## Topic 3

## Mikeville: My partially-working multiplayer browser game

I've deployed web apps to the Internet for years, but I always use a platform where I'm deploying a single Docker container or app rather than managing a whole server. I recently started experimenting with self-hosting some services on a VPS, which has been fun, but they're tiny services, so the server sits mostly idle.

And I got to thinking, if I have a server sitting around, what would be a fun thing to host on it that my friends can use?

I thought it would be fun to have the server host a game. I've seen games that you can self-host like Valheim and ARK: Survival Evolved, but it seems like for those, you need other players on at the same time, or it's no fun.

As someone who only plays computer games every few months, I want something where I can pop in and it's fun if other people are there at the same time, but it's also fun to see what's changed, like a beach house where your friends can stay and leave you notes in the guestbook.

I tried vibecoding something a few weeks ago, and I got a single-player game working in JavaScript, but when I added multiplayer, the AI agents couldn't make progress. Every feature I asked for, the AI agent would get it wrong, and I'd have to

But then I had lunch with a friend who told me that OpenAI's GPT 5.6 models and Claude Fable had solved problems for him that previous models hadn't been able to crack, so I gave it another try with GPT 5.6 Sol xhigh, and it worked. The first step was having the AI agents figure out a way to verify feature behavior themselves with Playwright tests. Once that worked, they were able to consistently make progress.

I've been playing around with it, and the game is now available here:

TODO: Link

You can't do much in the game yet, but I've had fun testing it with friends. I'll be online a little today if you'd like to visit.

## Stuff I enjoyed this month

- [Stripe Just Wants a Number](https://blog.exe.dev/billable-facts) - I enjoy the exe.dev blog, and I find that they have an interesting way of thinking about problems, especially software problems that affect small software vendors. I don't have any billing logic that's complicated enough to benefit from this, but I think it sounds neat in principle.
- [99% of My Website Traffic Is Bots](https://patronview.com/news/99-percent-of-my-website-traffic-is-bots/)
- [I Regret Migrating to Codeberg](https://マリウス.com/i-regret-migrating-to-codeberg/)
- [Super Mario Derivations](https://fzakaria.com/2026/08/05/super-mario-derivations)

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
