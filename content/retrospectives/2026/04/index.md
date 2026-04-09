---
title: "Refactoring English: Month 16"
date: "2026-04-08"
description: Close to the finish line
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and founder of small, indie tech businesses. I'm currently working on a book called [_Refactoring English: Effective Writing for Software Developers_](https://refactoringenglish.com).

Every month, I publish a retrospective like this one to share how things are going with my book and my professional life overall.

{{</notice>}}

## Highlights

- I got to [the front page of Hacker News](https://news.ycombinator.com/item?id=47633855) with [an article](/claude-code-found-linux-vulnerability/) that I wrote in one sitting.
- I expect the next few years to be scary for software security.
- I've completed the first milestone of my family photo sharing app.

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Finish _Refactoring English_

- **Result**: Published a new chapter but still am not done
- **Grade**: C

I knew it was an ambitious goal to complete the last three chapters in a single month, but I thought it was deoable. I only finished one of the three, but the book is nearly complete.

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

Visits and sales are down slightly this month, but I'm glad to see that there's still a steady flow of readers and customers even when I don't have a successful promotion.

My only promotion this month was an article called, ["Which Design Doc Did a Human Write?"](https://refactoringenglish.com/blog/ai-vs-human-design-doc/) It did well [on Lobsters](https://lobste.rs/s/yeoe5q/which_design_doc_did_human_write) but [flopped on Hacker News](https://news.ycombinator.com/item?id=47521257). The /r/programming subreddit rejected it for being "AI-generated," even after I messaged the mods clarifying that the article itself was human-written.

I got the idea for the post from the last _Refactoring English_ live class. We discussed whether AI is good enough to write design docs, and I realized how easy it would be to generate alternate AI versions of the design doc I'd just written by hand. It was interesting reading people's guesses about the "tells" they identified in the different design docs about what revealed them as human vs. AI.

## Spotting an opportunity to pull a Simon Willison

Simon Willison has been the most popular blogger on Hacker News for the last three years. I [recently wrote about](https://refactoringenglish.com/blog/2025-hn-top-5/) Willison's underused yet effective strategy for blogging:

> Simon often finds ideas within walled-garden platforms (e.g., TikTok, Twitter) and simply brings them to the open web, where it's easier for HN to discuss. Some of his most popular posts were just short quotes or links with a bit of commentary. ["I’m worried that they put co-pilot in Excel"](https://news.ycombinator.com/item?id=45820872) is just a quote from a video he watched on TikTok. ["A computer can never be held accountable"](https://news.ycombinator.com/item?id=42923870) is Simon summarizing a few tweets.

Simon has [called this approach](https://simonwillison.net/2024/Dec/22/link-blog/), "a low effort, high value way to contribute to internet life at large," and I agree.

The only hard part of Willison's strategy is recognizing when to use it. If you just summarize tweets and TikToks at random, you probably won't gain much traction. You have to notice when some interesting information is trapped in a Web-hostile format and then port it to the web while it's still fresh.

Last week, I watched Nicholas Carlini's ["Black Hat LLMs" talk](https://www.youtube.com/watch?v=1sd26pWhfmg) and realized there was an opportunity to use Willison's technique.

In the talk, Carlini described how he found a remotely-exploitable vulnerability in the Linux kernel that nobody had noticed for 23 years. The surprising part was that anyone could have done what Carlini did. He just pointed Claude Code at each file in the Linux kernel source and asked it to find vulnerabilities.

I looked online for discussion of Carlini's discovery and was surprised to find nobody talking about it. It was published on YouTube and [mentioned in a Hacker News thread](https://news.ycombinator.com/item?id=47581390), but it seemed to be getting far less attention than it deserved. People were making a big deal out of Claude Code [writing an exploit for a FreeBSD bug](https://news.ycombinator.com/item?id=47597119), but this felt like bigger news.

It turned out I was right.

I wrote [the article](/claude-code-found-linux-vulnerability/) in one three-hour sitting, much faster than my usual process of 10-30-hours over several weeks. The article has attracted 41k unique readers so far. It did well on [Hacker News](https://news.ycombinator.com/item?id=47633855) and [Lobsters](https://lobste.rs/s/lh9rmv/claude_code_found_linux_vulnerability). Despite me not even posting it to Twitter, almost half the readers found my article via Twitter.

In the past, when articles become popular on my personal blog, many of the readers dug deeper and discovered _Refactoring English_. That didn't happen this time, I guess because readers interested in AI are less interested in a book about writing without AI.

## Software security will be rough for the next couple of years

Carlini's talk highlights something I've been thinking about for several months: the next few years will be pretty bad for cybersecurity.

It used to be that the average person had _some_ protection from cyberattacks because there's a high cost to finding security vulnerabilities.

For example, imagine six months ago that you wanted to hack users who run [Syncthing](https://syncthing.net/), the open-source file syncing tool. Unless you're a software security expert, you'd have to hire someone who is:

- Good at finding vulnerabilities
- Comfortable being paid to weaponize them
- Willing to work with a stranger

Let's say, you find someone willing to find and exploit a Syncthing vulnerability for $5k. That's still a lot of work and money. And that's assuming the person you hire is genuine and not just scamming people.

And even if you go through all that trouble, you risk "burning" the exploit every time you use it. If someone notices that their system is compromised and traces it back to Syncthing, they might be able to identify your exploit and report the bug, rendering your exploit worthless.

Compare that to the situation today. You can buy a Claude Code subscription for $100/mo and find critical vulnerabilities just like Carlini did. Claude Code's guardrails cause it to refuse requests that weaponize vulnerabilities, but it won't be long before you can secretly develop exploits with open-weight models without any AI vendor telling you that you can't.

So, the cost of developing exploits has drastically dropped, but the value of fixing them is the same or lower. There are so many AI-generated bug reports that vendors are [shutting down their bug bounty programs](https://nodejs.org/en/blog/announcements/discontinuing-security-bug-bounties), eliminating any financial payout to honest researchers.

What Carlini did is not a fluke. I replicated it to find an undiscovered remote code execution vulnerability in a popular codebase without much effort. I could likely find many more, but the financial value to me is negative because the project has no bug bounty, so I'm spending hours to coordinate a fix with the vendor for $0.

There isn't some greedy billion dollar company refusing to pay me for vulnerabilities I found. The maintainer is just some guy who works on the project out of the goodness of his heart. It's basically [the "Dependency" xkcd](https://xkcd.com/2347/). He doesn't have any money to pay for vulnerability reports because he's not getting paid either, though billion-dollar companies are certainly using his code:

{{<img src="dependency_2x.png" max-width="400px" caption="xkcd #2347, [&ldquo;Dependency&rdquo;](https://xkcd.com/2347/)">}}

Eventually, we'll get back to an equilibrium where AI security tools are as cheap and convenient as static analysis tools are today. Vendors will use AI to catch security issues before they hit production.

In the short-run, there are a lot of vulnerabilities that suddenly became low-hanging fruit; there's value for attackers to exploit them and not much value for honest researchers to fix them.

## Reaching the first Little Moments milestone

Back in December, I announced that I was creating a free, open-source app for sharing baby photos because I [hated the existing options](/retrospectives/2025/12/#building-a-free-tinybeans-alternative-out-of-spite).

I expected the app to be something I could easily vibe code, but then I realized it was a good opportunity to practice writing a design doc. I've been writing about [the design doc process](https://refactoringenglish.com/chapters/useful-feedback-on-design-docs/) for _Refactoring English_, but I haven't written a real, full-length design doc in almost a decade.

It was hard for me to write a design doc when [vibe coding is so much more satisfying in the short term](/retrospectives/2026/03/#ai-assisted-coding-is-becoming-a-problem-for-me). That's why it's taken me since December, but I finally focused and wrote the design doc for my app, Little Moments. Once the design doc was done, the rest was easy.

Currently, you can import data that you [exported from TinyBeans](https://codeberg.org/mtlynch/tinybeans-export) and render it locally. I don't want to show actual private family photos, so I created dummy data for testing:

{{<video src="little-moments-m1.mp4" max-width="600px">}}

I find even this minimal implementation so exciting and can't wait to finish.

If you've never used TinyBeans or PhotoCircle, it probably sounds strange that my extremely basic app prototype is exciting, but I can't emphasize to you how terrible the user experience is on those apps.

Even the basic flow of seeing the next and previous photo doesn't work on TinyBeans. If you're viewing a photo, you have to navigate _back_ to the photo index, then find the next photo. And that's if you're on the mobile app. On the web app, you can't even see your photos in a sequence; you have to find them on a calendar. On top of that, there's ads and upsells everywhere, and everything is painfully slow.

Little Moments is super fast, and I added [keyboard shortcuts](https://codeberg.org/mtlynch/little-moments/pulls/44) and [mobile swipe gestures](https://codeberg.org/mtlynch/little-moments/pulls/54) to make navigation even easier. I'm excited to finish the app and stop using TinyBeans.

## Wrap up

### What got done?

- Published ["Claude Code Found a Linux Vulnerability Hidden for 23 Years"](https://mtlynch.io/claude-code-found-linux-vulnerability/)
- Published ["Which Design Doc Did a Human Write?"](https://refactoringenglish.com/blog/ai-vs-human-design-doc/)
- Published "Help the Reacher Reach Their Goal" chapter of _Refactoring English_
- Made my [first contribution to Firefox](https://phabricator.services.mozilla.com/D288636), a small fix to prevent crashes on malformed Ogg files.

### Lessons learned

- The next few years will be rough for cybersecurity
  - It's never been easier for malicious actors to find vulnerabilities, while the rewards are decreasing for honest researchers who want to fix them.

### Goals for next month

- Finish writing _Refactoring English_
