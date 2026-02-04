---
title: "Refactoring English: Month 14"
date: "2026-02-11"
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

### Publish three chapters of _Refactoring English_

- **Result**: XX
- **Grade**: XX

TODO

### Publish my 2025 [annual review](/tags/annual-review) (year 8)

- **Result**: XX
- **Grade**: XX

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

January was the most popular and highest revenue month since the Kickstarter last year.

## Success by writing about other writers

January was so successful because of the blog post [The Most Popular Blogs of Hacker News in 2025](https://refactoringenglish.com/blog/2025-hn-top-5/). But it's really a continuation of a strategy I've been exploring for about six months that basically boils down to: showcase other writers.

Over the summer, I was at a party and met a professional romance novelist. Even though we wrote about wildly different topics, a lot of our problems were the same. She also self-published.

I asked her how she found readers, and she said, "That's the question!" But she said that one of the best ways that she's found new readers for her book is that she started a newsletter where she reviews other romance novels, primarily by indie authors. And it created a virtuous cycle for everyone involved because:

1. New readers buy her book after discovering her reviews
1. Her subscribers discover other interesting novels through her newsletter
1. Other indie authors are excited about being reviewed, so they direct their own readers to her newsletter, which increases (1)

I love strategies where incentives align for everyone, so I started looking for ways to apply that to my book.

TODO: Visit stats, HN vots, Lobsters votes

- [The Software Essays that Shaped Me](https://refactoringenglish.com/blog/software-essays-that-shaped-me/)
- [What Makes the Intro to Crafting Interpreters so Good?](https://refactoringenglish.com/blog/crafting-interpreters-intro/)
- [The Most Popular Blogs of Hacker News in 2025](https://refactoringenglish.com/blog/2025-hn-top-5/)

## My LLM sandbox

I had a bit of a revelatory moment last year where I first started using an AI agent. At that point, I just let it edit files while I watched, and I thought that was a scary amount of control to give an LLM.

But then my friend okay showed me his LLM workflow where he lets his AI agent edit files and run commands without direct supervision. I still don't trust any AI agent enough to let it run on a real machine, so I set up a sandbox.

I run the command `sb` in any directory, and it spins up a rootless podman container that has locked down permissions and no access to my local network.

I haven't released it because I don't think my particular sandbox is so great, but I think there's a good meta-lesson in how to build your sandbox and understanding what threats it protects you against and what threats you're still vulnerable to.

Suppose I have a VM-based sandbox. I'm safe because a VM is a secure trust boundary. But whoops! The VM has overwritten `.git/hooks/pre-commit` with a script that installs a rootkit on my machine, so when I run `git commit`, I'm pwned. And even if I checked my git diff carefully, I wouldn't be protected.

A lot of people are talking about how the boundary has to be a VM not a container, and I agree, but also, it feels like not really true. I'm assuming the LLM is just dumb not clever enough to find a 0-day in my container. But if we're assuming a really smart, hostile LLM, the LLM can write something sneaky into your

You have to be very defensive and have a pipeline where code only moves through git and you review all LLM output before executing it, which is not what I think most people are doing.

## AI is great at porting code

Maybe I'll write a longer blog post, but I noticed that AI is really good at solving problems where:

1. The definition of success is objective and easy to define.
1.

Some examples of this:

- Refactoring code that has automated tests
- Porting code to match the behavior of the original
- Compile this codebase, installing any necessary dependencies
- Fix this broken test

Porting code falls into this category, especially if you have implementation-independent tests.

- Converted the Zestful website [from Vue/Nuxt2 to vanilla HTML with Hugo](https://github.com/mtlynch/zestful-frontend2/pull/152)
- Ported PicoShare's CSS framework [from Bulma to Bootstrap 5](https://github.com/mtlynch/picoshare/pull/718)
- Converted LogPaste's e2e tests [from Cypress to Playwright](https://github.com/mtlynch/logpaste/pull/235)
- Converted the fusion RSS reader [from Svelte to vanilla HTML + Go templates](https://github.com/mtlynch/fusion/pull/3)
- Converted the MeshCore web app
  - This actually worked poorly because it's somewhat hard for AI to verify the result, as Flutter emits non-standard HTML and the MeshCore app depends heavily on an external hardware device (the LoRa radio).

## Topic 2

## Topic 3

## Side projects

## Wrap up

### What got done?

- Published [My Eighth Year as a Bootstrapped Founder](/bootstrapped-founder-year-8/)
- Published a new chapter of _Refactoring English_
- [Fixed a crash](https://github.com/podofo/podofo/pull/311) in the PoDoFo PDF reader that I discovered using [my PDF fuzzing workflow](/nix-fuzz-testing-1/)

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
