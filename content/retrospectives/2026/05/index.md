---
title: "Refactoring English: Month 17"
date: "2026-05-11"
description: Should I focus on my book or chase bug bounties?
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and founder of small, indie tech businesses. I'm currently working on a book called [_Refactoring English: Effective Writing for Software Developers_](https://refactoringenglish.com).

Every month, I publish a retrospective like this one to share how things are going with my book and my professional life overall.

{{</notice>}}

## Highlights

- I'm torn between focusing on my book and pursuing security bug bounties.

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Finish writing _Refactoring English_

- **Result**: I've got about 1-2 weeks of writing left
- **Grade**: C

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

Revenue dropped for the book, as I haven't done any marketing [since March](https://refactoringenglish.com/blog/ai-vs-human-design-doc/). Instead, I've been getting distracted by [bug bounty hunting](#three-months-of-bug-bounty-programs).

## Three months of bug bounty programs

For the past three months, I've been spending a lot of time using AI to find security vulnerabilities. I haven't talked about it publicly because I didn't want to attract competition to the limited supply of bug bounty programs. I wasn't sure if other people realized just how effective AI is at security research, but I think [the cat is out of the bag](https://red.anthropic.com/2026/mythos-preview/).

If you haven't been following along with AI and security research, Firefox is an astonishing case study. Throughout 2025 (before AI was effective at security research) Mozilla and external researchers collectively found about 10-20 security vulnerabilities in Firefox each month.

In February 2026, Anthropic used Claude Opus to [find 22 Firefox vulnerabilities](https://www.anthropic.com/news/mozilla-firefox-security). In other words, that month, Anthropic alone found more than everyone else combined in any of the previous 13 months. Two months later, Anthropic used Claude Mythos to find a whopping [271 more vulnerabilities](https://blog.mozilla.org/en/privacy-security/ai-security-zero-day-vulnerabilities/) in Firefox.

I _sort of_ spotted this early, but I got it slightly wrong. Back in January, I thought that AI might be able to revolutionize cybersecurity research, but I thought the value was in creating security tools. I was using AI to write fuzz testing tools and was amazed at how much faster I could perform fuzz testing than when I [did it by hand](/nix-fuzz-testing-1/).

Despite the fact that I could fuzz code at 10-20x the speed I could previously, it turned out that my strategy was way more work than was necessary. Instead of asking AI to create a fuzz testing tool and evaluate its output, you can just ask AI, ["Hey, where are the vulnerabilities in this codebase?"](/claude-code-found-linux-vulnerability/#how-claude-code-found-the-bug)

After I saw how good AI was at directly auditing source code, I stopped fuzzing and focused on source auditing. I've now reported 50+ bugs to five different bug bounty programs and earned about $10k in bug bounties.

## The bugs have gotten easier to find, but the bounty programs have gotten harder

While I've successfully used AI to find security vulnerabilities, I've been less successful at finding companies willing to pay me for my findings.

Here are my results so far:

- Vendor 1: Meta
  - I submitted eight reports
  - I received no response for several weeks.
  - I found email addresses for developers that worked on the product and pinged them, and they escalated my reports to get them past triage.
  - There's been no movement on any of my reports for the past two weeks.
- Vendor 2
  - I submitted one report.
  - Vendor triaged it in one business day, but said it would be several weeks before they could investigate thoroughly.
  - I haven't heard anything in over 30 days.
- Vendor 3:
  - I submitted one report.
  - Vendor claimed it was a duplicate, so no bounty.
- Vendor 4
  - I've submitted 40ish reports.
  - Eight were paid after two weeks for a total of $9,700.
  - Two were rejected as duplicates.
  - The remaining are all awaiting triage, though the most valuable were in the first eight that have received payouts.
- Vendor 5: Firedancer (crypto project)
  - Found a few medium-severity issues.
  - When I started the bounty reporting process, I realized they require submitters to upload their passport to a service I've never heard of.
  - Their program rules are also sketchy in that they seem to contradict the rules of the bounty platform they're using.

So, the $10k that vendor 4 paid me only took two weeks of part-time work. That would be a great return on investment if I hadn't also spent 6+ weeks on bounty programs that paid nothing. It would also be great if I could repeatedly find more vendors like vendor 4, but I don't know how to do that.

## Should I focus on the book or bug bounties?

I'm now torn on how to allocate my time between the book and bug bounties.

- Focus on the book
  - Pro: The book is nearly done, so if I focus on finishing, it will be complete and more valuable than a partially-finished book.
  - Pro: Finishing the book means not splitting my focus between the book and something else.
  - Pro: The book is something only I can create, whereas lots of people can participate in bug bounties.
  - Pro: I'm already late on delivering the book, so finishing it makes me feel less guilty about the making readers wait.
  - Pro: I can talk publicly about my book, whereas I have to hide a lot more details about my security research to avoid attracting competition to the same limited number of bug bounty programs.
- Focus on bug bounties
  - Pro: I made more in two weeks of bug bounties than I did in all of 2025 on my book.
  - Pro: There's still a massive amount of undiscovered, bounty-paying bugs that AI tools can find.
  - Pro: I _could_ get lucky and find an angle on a bug bounty that nobody else has pursued and earn $100k+ in a few weeks.
  - Pro: If I pause for a few months, the value of the remaining bugs will be significantly lower, as many other researchers are doing the same thing I am.
  - Pro: Participating in bug bounties is frustrating, as you have no leverage. The vendor can completely lowball or shaft you, and you have no recourse or negotiating power unless you sell the exploit to buyers who want to use it for nefarious purposes.
  - Pro: It's possible that I have an edge over other security researchers, as being better at tooling might make a big difference, but I can't tell because bug bounty hunters don't want to blab about their work and give competitors an edge.
  - Con: Bug bounty hunting is addictive like gambling in that there's [variable rewards](/retrospectives/2026/03/#ai-coding-offers-variable-rewards) that appear semi-randomly.
  - Con: Bug bounties push me back into [bad AI usage habits](/retrospectives/2026/03/#ai-assisted-coding-is-becoming-a-problem-for-me).
  - Con: I'm much more limited in what I can share about my work, both because bounty programs often require it and because I don't want to attract competition to the same places where I'm focusing effort.

## Maybe I should be teaching AI for improving software security

I'm thinking about offering a small, cohort-based course to show what I've learned about using AI to find security vulnerabilities. The format will either be some combination of live or recorded screencasts + a private group chat for 2-4 weeks.

The course is not going to be about making money from bug bounties. Maybe I'll cover that some, but I don't think that won't be the focus because that's not what I've learned most about in the last three months.

The course will be about using AI to find security vulnerabilities in large codebases. I'll show the techniques I've learned for getting AI tools to focus on likely areas of bugs and avoid wasting time and tokens on bad leads. You can apply these lessons internally with closed-source code or use these techniques on open-source projects you want to help secure.

If you're interested, sign up below:

- [Early interest list - Using AI to find security vulnerabilities](https://tally.so/r/jaGvQR)

## Recommendations

### [Timelinize](https://timelinize.com/)

I saw [a question on reddit](https://www.reddit.com/r/DataHoarder/comments/1ssq0xv/i_want_to_delete_my_facebook_but_i_dont_want_to/) from someone who wanted to delete Facebook but capture an archive of their Facebook data in a usable format. That reminded me of a project I'd seen on Hacker News but never explored much called [Timelinize](https://timelinize.com/).

Timelinize lets you import data you exported from Facebook, Google, Twitter, and similar services, and the app creates a unified timeline of all your data.

The creator of Timelinize is [Matt Holt](https://matt.life/), who also created [Caddy](https://caddyserver.com/), the popular reverse web proxy.

Timelinize still feels pretty alpha stage, and I had to add a bunch of local patches to make it usable, but I like where it's going. I plan to upstream [more of my patches](https://github.com/timelinize/timelinize/commits?author=mtlynch) as I use it more.

Whenever I find a local, offline solution for something I previously relied on the cloud for, it feels oddly refreshing. When I stopped using streaming services and just relied on Jellyfin, I was surprised at how different it felt to just watch what I'm watching without a company monitoring my every move and figuring out how to squeeze more money out of me. I had a similar feeling with Timelinize. It's fun to browse my Google and Facebook history on my own computer without feeling studied or manipulated.

### The React2Shell Story and What Happened Next.js

I didn't follow [React2Shell](https://react2shell.com/) at the time, but it was a critical vulnerability in React.js that allowed an attacker to gain code execution on many React.js and Next.js apps.

Last week, the two researchers who discovered React2Shell wrote about what happened behind the scenes:

- ["The React2Shell Story"](https://lachlan.nz/blog/the-react2shell-story) by Lachlan Davidson, the lead researcher on finding the vulnerability.
- ["The React2Shell Story and What Happened Next.js"](https://sylvie.fyi/posts/react2shell/) by Sylvie Mayer, who assisted Lachlan in exploring the vulnerability, notifying vendors, and identifying bug bounties.

Lachlan's post got more attention, but I found Sylvie's more interesting, not the least of which is because she's a college student who was 20 at the time of the discovery. And, as I explore bug bounties, I was interested in her approach to monetizing the bug.

Lachlan and Sylvie both realized they'd found a major issue that likely affected hundreds or thousands of big vendors. After reporting the bug to Meta (who maintains React) and Vercel (who maintains Next.js), they wanted to identify other bug bounty programs that would pay them for their work on this massive bug.

The researchers couldn't disclose the bug to the other vendors until Meta publicly announced the security advisory. The problem was that once React2Shell was public, Lachlan and Sylvie would lose their edge over everyone else rushing to claim the same bounties.

To get a head start on claiming bug bounties for React2Shell, Sylvie scouted bug bounty programs during the bug blackout period and then checked whether those vendors' sites were vulnerable to React2Shell. That way, as soon as Meta announced the vulnerability, Sylvie and Lachlan could claim these other bounties.

The problem was that before React2Shell became public, Vercel created a React2Shell filter in their web application firewall (WAF) that would protect Vercel customers even if the customer sites were running vulnerable versions of React or Next.js. Meta and Vercel also worked with Cloudflare and similar WAF platforms to teach them how to filter React2Shell attacks.

So, after Meta announced React2Shell, Sylvie tried verifying the bug against the sites she scouted ahead of time, but the bug didn't trigger. Almost all of the sites with bug bounties were on Cloudflare or Vercel, so the WAFs blocked Sylvie's exploit.

So, now Lachlan and Sylvie had to figure out how to sneak their exploit past Cloudflare's and Vercel's WAF to trigger React2Shell, but bypassing major WAFs is a massive research project in itself. Fortunately, Sylvie found a bypass for Cloudflare's WAF and five distinct bypasses for Vercel's.

Interestingly, the "vast majority" of the bug bounties for Sylvie came not from React2Shell itself but in finding WAF bypasses, as Vercel paid $50k per reported bypass.

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

If you're interested in learning about using AI to find security vulnerabilities in your team's code, sign up for my interest list. If there's enough interest, I'll put together a course.

- [Early interest list - Using AI to find security vulnerabilities](https://tally.so/r/jaGvQR)
