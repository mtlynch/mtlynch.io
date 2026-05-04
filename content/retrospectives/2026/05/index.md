---
title: "Refactoring English: Month 17"
date: "2026-05-11"
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

### Finish writing _Refactoring English_

- **Result**: I've got about 1-2 weeks of writing left
- **Grade**: C

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

## Topic 1

## Bounty hunting for fun and negative profit

At this point, it's clear that AI is extremely useful at finding security issues.

Firefox is a good example. Throughout 2025, there were 10-20 vulnerabilities discovered each month in Firefox from Mozilla employees or external researchers. In February 2026, Anthropic used Claude Opus to [find 22 vulnerabilities](https://www.anthropic.com/news/mozilla-firefox-security). And that was on top of the 30 other issues discovered that month, likely by other researchers using AI tools.

Two months later, Anthropic used Claude Mythos to find a whopping [271 more vulnerabilities](https://blog.mozilla.org/en/privacy-security/ai-security-zero-day-vulnerabilities/) in Firefox.

I was _almost_ spotted this trend early, but I got it slightly wrong. Back in January, I noticed that AI could revolutionize cybersecurity research, but I thought the value was in creating specialized security tools. I was using AI to write fuzz testing tools and found a lot of vulnerabilities.

It turns out that what I was doing was way more work than necessary. It turns out that instead of asking AI to create a fuzz testing tool and evaluate the output, you can basically just ask AI, ["Hey, where are the vulnerabilities in this codebase?"](/claude-code-found-linux-vulnerability/#how-claude-code-found-the-bug)

After I saw how good AI was at directly auditing source code, I switched from source auditing to fuzzing and found more bugs. I've now reported 10-20 bugs to five different bug bounty programs, and I have dozens more that I haven't reported yet. The problem is that I think everyone had the same idea, so all the bugs are sitting in a queue waiting for the vendor to investigate.

Back in January, I had a hypothesis that AI tools would be disproportionately valuable for software security. Cybersecurity research involves a mix of mechanical, boring work and highly creative work, and AI seemed like it would do well at the boring parts.

I started using AI to write fuzz test automation for the VLC media player. Within a week, I found a critical vulnerability. I spent several hours writing a proof of concept and a clear bug report for the maintainers. I've spent several more hours coordinating with them on rolling out a fix, as the problem affects several other open-source projects.

It was exciting to find such an exciting bug in VLC, but then it quickly became clear why the bug is there. The cost of finding bugs is high, and there's no reward other than bragging rights. VLC has no bug bounty program, and when the European Commission briefly funded one on their behalf, [the VLC maintainers were annoyed](https://www.zdnet.com/article/bug-bounty-drives-vlcs-biggest-patch-but-attracts-a-holes-scriptkiddies-scammers/).

Next, I focused on Firefox

Then, Anthropic and Mozilla publicly disclosed that they were working together directly to . And then Carlini of

- VLC
  - I reported a critical issue in January. The maintainers said that they plan to fix it in VLC's 3.0.24 release.
- Meta (Facebook)
  - I reported eight issues in early April. They dismissed one as out of scope, but the rest are in some stage of triage or investigation.
- SaaS app
  - I reported 15 issues, including two critical issues.
  - They were quick to investigate the first and confirm it qualifies for a bounty, but they haven't said how much. Since the first report, they've gotten slower, though the CTO responded to me directly to say they're investigating and taking it seriously.
  - Sadly, I reported the first critical issue on a Monday, and they said they'd found it internally the preceding Friday.
- Firedancer (cryptocurrency project)
  - This was neat to look at because they have a unique architecture I've never seen before. The app is made up of loosely-coupled components that live in sandboxes that drop all but the component's necessary OS-level permissions.
  - I only found a handful of medium- and low-severity issues, but their reporting process felt sketchy in that it required uploading a photo of my passport, and they had what felt like [intentionally confusing terms](https://immunefi.com/bug-bounty/firedancer/scope/) about what bugs they'd pay for, so I didn't bother reporting.
- Cryptocurrency project A
  - I reported one issue that I think is Critical/High.
  - They triaged it and accepted it for further investigation but said they're behind on reports, so it will be several weeks before they can investigate.
- Cryptocurrency project B
  - I reported one issue, and they claimed they were aware of it, so they aren't paying anything.
  - I found a few more medium-severity issues, but their bounty reporting process was so bad that I'm not bothering to report any more.
- Google
  - I tried to find something a vulnerability in Tensorflow but came up empty.

The recurring theme is that vendors process bug bounty reports slowly. I'm not sure how to proceed because with Meta or the SaaS app.

For example, with Meta, I'm confident I could find many more bugs with the same techniques, but I don't want to waste my time if they're ultimately going to dismiss them all and pay me nothing. But if I wait, maybe someone else swoops in and finds issues I could have found, and Facebook pays them $100k per finding. Or Meta just uses the same techniques themselves and finds the rest internally.

With the SaaS app, I have about 40 more medium-severity findings I haven't reported to them yet, as it's not worth the time to report. That could change a lot depending on what they're willing to pay.

The downside to bug bounty hunting is that I can't write about my work. If I say, "Wow, I'm having a lot of success finding sandbox escapes in the WebGL renderer for Chromium!" then a bunch of people will instantly start searching for the same thing and drastically reduce my chances of finding more.

For now, I'm putting the bug bounty hunting on hold and focusing on my regular work until there's some movement on the reports I've already submitted.

## Timelinize is neat

## Wrap up

### What got done?

- Published new chapters: "Improve Your Writing with AI" and "Meet the Reader Where They Are"
- Held a live session with readers on using AI to improve writing
- Reported a bunch of security bugs through bug bounty programs

### Lessons learned

-

### Goals for next month

- Create a tool that allows _Refactoring English_ readers to give feedback as they read the book.

### Requests for help

I'm thinking about making a course to teach the stuff I've learned about using AI to find security vulnerabilities. The format will either be some combination of live or recorded screencasts + a private group chat for 2-4 weeks.

I'm not an AI security expert, and I haven't even gotten paid for any of my security findings, but I have successfully found critical issues in open-source projects using a process anyone can follow.

If you're interested, sign up for my interest list. If there's enough interest, I'll put something together.
