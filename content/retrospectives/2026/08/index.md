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

### Pitch to 5 podcasts to talk about _Refactoring English_

- **Result**: Pitched only to one podcast
- **Grade**: D

I was [a guest on _The TMPDIR Podcast_](https://tmpdir.org/053/), though they invited me even before I pitched to them, so I can't count that one.

### Attract 30k unique readers to the _Refactoring English_ website

- **Result**: The site had 23.8k unique readers
- **Grade**: B

I was secretly thinking of this goal as "get one post on the front page of Hacker News," but I did, and it had an unexpectedly long run on the front page, but it still brought 30k readers.

### Wrap up early access, and declare the 1.0 release of my book

- **Result**: Still not at 1.0 release
- **Grade**: D

I ended up spending more time than I expected responding to user feedback. My [feedback app](/retrospectives/2026/07/#readers-are-leaving-useful-feedback-in-my-books-app) is working, but it also generates new work on the book that's hard to predict.

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

June had been my second best month of sales for my book since the Kickstarter, but then July's sales tripled June's.

The main reason for the jump in sales was that I ended the early access discount. I announced that on

On the last day of the sale, I published a blog post called, ["Why I Stopped 'Creating Content'"](https://refactoringenglish.com/blog/why-i-stopped-creating-content/), and that reached the front page of Hacker News. And then I don't think this has happened to me before, but after it fell off the front page naturally after about six hours, the moderators put it back on the front page and gave it a second wind. And then it was [one of the top posts on bubbles.town](https://bubbles.town/entry/44752223), a Hacker News style site that's more indie and less tech-centric.

## How do I find the right price for my book?

{{<img src="stripe-2026-07.webp">}}

I

## I'm fighting the world's dumbest scraper bot

I published my blog post on Monday and got a big jump in visitors. Then, Tuesdays, there was another huge surge:

{{<img src="plausible-2026-07-21.webp" max-width="700px">}}

All the visitors were going to the [Hacker News Popularity Contest](https://refactoringenglish.com/tools/hn-popularity/). It's happened before where a blogger talks about their rank in the contest and links to my tool, and I see a big jump in visitors, but never like this, and never such a sustained wave of visitors.

I just thought, "Wow, I'm really on a roll this week!"

That afternoon, I told my wife, "I got another fifty thousand visitors today! I'm not even sure where they're coming from. My guess is someone tweeted it. But... if someone tweeted it, I'd see Twitter as the referrer. Oh, wait. It's bots."

And I checked analytics and saw that all of the requests had the exact same browser user agent, which claimed to be running Chrome XX from XX on a MacOS.

I almost ignored it. It's a static site, so it's not going to go down because of 80k requests per day. But it was going to be a hassle to read my analytics with so much bot traffic, and I didn't want to go above my bandwidth limit on Netlify.

Netlify allows me to block by IP, but it doesn't tell me what my visitors' IP addresses are, so how am I supposed to know what to block? Fortunately, I host the data for the HN Popularity Contest on Bunny, and they do reveal the IP.

I vibecoded a solution that scraped my Bunny logs for the specific user agent and collected all the IPs associated with the attack. It was an old enough browser that I wasn't worried about legitimate users getting caught as false positives.

I was able to generate a list of several thousand malicious IPs, but Netlify only lets me block 50 IPs per input field. So I modified the app to aggregate the IP addresses into CIDR blocks based on ISP registration, and that reduced the blocks down to about 70 distinct IP blocks. I checked the owners of the IPs, and they were all data centers or weird ISPs I'd never heard of like `fxtrading.net`.

I reached out to Netlify support the day the attack began, but Netlify was completely useless. I think the first response was AI-generated because it told me to modify settings that didn't exist. And then the second response seemed more human, but it was basically like, "Well, looks like you solved this problem in the two weeks it took for me to respond, so nothing left for me to do!"

## Where can I host a static site?

I host all my static sites with Netlify, and they've been getting progressively worse, but their complete indifference to the scraper bot attack has inspired me to switch vendors.

The obvious answer is "Cloudflare," but I'm alarmed at how much of the Internet's infrastructure has centralized to Cloudflare, so I want to be somewhere else.

I also considered just hosting on a VPS or a VPS + Bunny as a CDN, but I don't want my site to crash the day I'm on the front page of Hacker News because my VPS crashes or I misconfigure caching on Bunny. I want a solution where someone else keeps my site online and worries about caching and CDNs.

- [statichost](https://www.statichost.eu/)
  - Pros
    - Run by a single person, so customer service is responsive and comprehensive
    - Focused mainly on static hosting without extra complexity
  - Cons
    - Run by a single person, so increased outage risks
    - The upload process unconditionally uploads every file rather than an rsync-like sync of only the changed files, which is a pain for my large sites that only change incrementally
    - Bot scraper protection is not included
    - Bundles together site builds and hosting, but I only want hosting
    - A big selling point is being EU-centric, but I'm in the US
- [Surge](https://surge.sh/)
  - Pros
    - Focused exclusively on static hosting and not building, which is exactly what I want
    - Unlimited bandwidth, so good alignment of incentives to prevent
  - Cons
    - Run by a single person, so increased outage risks
    - Limits sites to 450 MB of disk space, which my blog exceeds by about 50%, and I don't want to care about this
    - The upload process unconditionally uploads every file rather than an rsync-like sync of only the changed files, which is a pain for my large sites that only change incrementally
    - I reached out last week and haven't heard back
    - They have live chat support, but it's broken
- [Vercel](https://vercel.com)
  - Pros
    - Claims to prevent DDoS / scraper bots
    - I think they support rsync-style uploads
  - Cons
    - Giant, complicated service
    - I don't have a reason to expect better treatment than I get from Netlify
- Roll my own on solution on top of Bunny CDN
  - I considered this, but rolling my own solution for incremental uploads and atomic deploys gets too complicated

## Mikeville: My early draft of a multiplayer browser game

I've deployed web apps to the Internet for years, but I always use a platform where I'm deploying a single Docker container or app rather than managing a whole server. I recently started experimenting with self-hosting some services on a VPS, which has been fun, but they're tiny services, so the server mostly sits idle all day.

If I have a server sitting around, what would be a fun thing to host for my friends?

What about a game? I've seen games that you can self-host like Valheim and ARK: Survival Evolved, but it seems like for those, you need other players on at the same time, or it's no fun.

As someone who only plays computer games every few months, I want something where I can pop in and it's fun if other people are there at the same time, but it's also fun to see what's changed, like a beach house where your friends can stay and leave you notes in the guestbook.

The problem is that I can't think of how to translate those ideas into a game. So, for now, I'm just exploring and seeing what feels fun. The two games I had in mind designing this prototype were Stardew Valley and Ultima Online, two games I've spent many hours playing.

The game is now available here, if you'd like to try it:

TODO: Link

You can't do much in the game yet, but I've had fun testing it with friends. I'll be online a little today if you'd like to visit.

## Stuff I enjoyed this month

- [Stripe Just Wants a Number](https://blog.exe.dev/billable-facts)
  - I enjoy the exe.dev blog, and I find that they have an interesting way of thinking about problems, especially software problems that affect small software vendors. I don't have any billing logic that's complicated enough to benefit from this, but I think it sounds neat in principle.
- [99% of My Website Traffic Is Bots](https://patronview.com/news/99-percent-of-my-website-traffic-is-bots/)
  - Because I've been dealing with
- [I Regret Migrating to Codeberg](https://マリウス.com/i-regret-migrating-to-codeberg/)
  - I've been moving my projects from GitHub to Codeberg for the past year, and I've been a paying member, but I now regret investing in that platform. There are so many outages and days where the servers are overloaded. The final straw was Codeberg's decision to ban projects that use AI. I'm probably below the threshold where I'm violating or they'd care, but I'm still planning to move elsewhere.
- [Super Mario Derivations](https://fzakaria.com/2026/08/05/super-mario-derivations)
  - This was a neat Nix trick where the author encoded the play state of Super Mario 3 in an emulator using Nix attributes, like `nix build '.#level1.rightb.rightb.rightab.rightb'` means to start level 1 and press Right + B (run right) twice, Right + A + B (run and jump), and Right + B again (run right). And Nix caches all the game states so you can change a button press and only recalculate what was unique from previous runs.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

- If you have recommendations for static site hosting, let me know.
