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

I shifted effort from marketing to [bug bounty hunting](http://squish:1313/retrospectives/2026/05/#bounty-hunting-for-fun-and-negative-profit), but going forward, I'm back to focusing on the book.

## Topic 1

## Should I keep dabbling in security research?

For the past three months, I've been spending a lot of time using AI to find security vulnerabilities. I haven't talked about it publicly because I didn't want to attract competition to the limited supply of bug bounty programs. I wasn't sure if other people realized just how effective AI is at security research. At this point, I think [the cat is out of the bag](https://red.anthropic.com/2026/mythos-preview/).

If you haven't been following along with AI and security research, Firefox is an astonishing case study. Throughout 2025 (before AI was effective at security research) Mozilla and external researchers collectively found about 10-20 security vulnerabilities in Firefox each month.

In February 2026, Anthropic used Claude Opus to [find 22 vulnerabilities](https://www.anthropic.com/news/mozilla-firefox-security). In other words, Anthropic alone found more than everyone combined in any month of 2025. Two months later, Anthropic used Claude Mythos to find a whopping [271 more vulnerabilities](https://blog.mozilla.org/en/privacy-security/ai-security-zero-day-vulnerabilities/) in Firefox.

I sort of spotted this early, but I got it slightly wrong. Back in January, I thought that AI might be able to revolutionize cybersecurity research, but I thought the value was in creating security tools. I was using AI to write fuzz testing tools and was amazed at how much faster I could perform fuzz testing than when I [did it by hand](/nix-fuzz-testing-1/).

Despite the fact that I could fuzz code at 10-20x the speed I could previously, it turned out that my strategy was too complicated. Instead of asking AI to create a fuzz testing tool and evaluate its output, you can just ask AI, ["Hey, where are the vulnerabilities in this codebase?"](/claude-code-found-linux-vulnerability/#how-claude-code-found-the-bug)

After I saw how good AI was at directly auditing source code, I stopped fuzzing and focused on source auditing. I've now reported 10-20 bugs to five different bug bounty programs and earned about $10k in bug bounties.

## The bugs have gotten easier to find, but the bounty programs have gotten harder

The problem is that while I've become good at using AI to find security vulnerabilities, I've not been as successful at finding companies willing to pay me to report them.

Of the five programs I've submitted to in the last month, only two have reviewed my findings beyond a first-stage triage. And even among those, I'm sure there are dozens to hundreds of people doing the same thing I am, which reduces my chances of being first to report and qualifying for a payment.

There are bug bounty programs with good reputations and attractive payouts, but that means lots of other people are submitting, and some of those programs are backed up for weeks triaging the flood of bugs. I'd heard that cryptocurrency projects had high payouts, but when I looked into it, a lot of them seem to have pretty sketchy rules, and it's easy for them to say, "No, we knew about that already." The check against that is that you say, "Okay, then I'll use the other one I found to exploit your cryptocurrency for profit," but you have to be a different kind of person than I am for that to work.

## Maybe this is what I should be teaching?

I'm considering a course. I'm not going to spend a year writing a book about it because by the time I'm done, the landscape will have

---

So, given that I made more in two weeks finding bugs that qualified for the one program that paid than I did with my book in 2025, I'm torn on how to allocate my time.

Do I ignore the security stuff as a distraction and focus on the book. Nobody but me can write my book.

But what if I can create a repeatable process that yields $10k/week from bug bounties?

Because the shelf life on the security research is pretty short. Mythos already exists and can probably effortlessly do everything I've learned. Mythos is still not available to the general public, but I expect it to either be release publicly or someone else will create something equivalent in the next 12 months.

$10k for a couple weeks of part-time work sounds good, but I also spent two months focused on fuzzing with nothing to show for my efforts except for some bugs that were too minor to qualify for any bug bounty program.

The problem is that moonlighting as a security researcher definitely splits focus from my book, which I'm eager to complete.

So far, I've earned about $10k in bug bounties. The problem is that thousands of people are now flooding these bug bounty programs with AI-generated submissions, so of the five vendors I've submitted reports to, only one has actually responded, and it took them almost three weeks to process my reports.

had the same idea that I did, so all the bug bounty programs that pay researchers for their findings are overwhelmed with an avalanche of reports.

and I have dozens more that I haven't reported yet. Only one program confirmed that a bug I reported three weeks ago.

I think everyone had the same idea, so all the bugs are sitting in a queue waiting for the vendor to investigate.

It's fun to use AI to find security vulnerabilities, but it's also a time suck. I so easily get sucked in when an agent is running because it's exciting to see what it finds, so I keep wanting to check in or micromanage the agent. I've spent entire workdays just playing with AI security research even though there's no guarantee it will pay anything because there are potentially 100 people all using the same tools on the same targets generating the same reports.

So, I've made $0 but I've spent about $350 on cloud services from renting bare metal machines to do fuzzing and compilation of some larger projects, so I've earned -$350 so far. I guess I've also spent $100/month on an Anthropic subscription, but I would have had that anyway.

If you're interested in learning about using AI to find security issues, I'm considering a small cohort-based course. See [below](#requests-for-help).

---

Back in January, I had a hypothesis that AI tools would be disproportionately valuable for software security. Cybersecurity research involves a mix of mechanical, boring work and highly creative work, and AI seemed like it would do well at the boring parts.

I started using AI to write fuzz test automation for the VLC media player. Within a week, I found a critical vulnerability. I spent several hours writing a proof of concept and a clear bug report for the maintainers. I've spent several more hours coordinating with them on rolling out a fix, as the problem affects several other open-source projects.

It was exciting to find such an exciting bug in VLC, but then it quickly became clear why the bug is there. The cost of finding bugs is high, and there's no reward other than bragging rights. VLC has no bug bounty program, and when the European Commission briefly funded one on their behalf, [the VLC maintainers were annoyed](https://www.zdnet.com/article/bug-bounty-drives-vlcs-biggest-patch-but-attracts-a-holes-scriptkiddies-scammers/).

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

- Get _Refactoring English_ to "content complete."
- Create a tool that allows _Refactoring English_ readers to give feedback as they read the book.

### Requests for help

I'm thinking about making a course to teach the stuff I've learned about using AI to find security vulnerabilities. The format will either be some combination of live or recorded screencasts + a private group chat for 2-4 weeks.

I'm not an AI security expert, and I haven't even gotten paid for any of my security findings, but I have successfully found critical issues in open-source projects using a process anyone can follow.

If you're interested, sign up for my interest list. If there's enough interest, I'll put something together.

- [Early interest list - Using AI to find security vulnerabilities](https://tally.so/r/jaGvQR)
