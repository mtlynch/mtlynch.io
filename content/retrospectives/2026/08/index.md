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

- **Result**: XX
- **Grade**: B

TODO

### Wrap up early access, and declare the 1.0 release of my book

- **Result**: Still not at 1.0 release
- **Grade**: D

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

## How do I find the right price for my book?

{{<img src="stripe-2026-07.webp">}}

I

## I'm fighting the world's dumbest scraper bot

I saw another big jump in visitors and thought, wow, I'm really on a roll this week. That afternoon, I was telling my wife about it, and I said, "I got another fifty thousand visitors today! I'm not even sure where they're coming from because it doesn't show which website they're coming from. My guess is someone tweeted it. But... if someone tweeted it, I'd see Twitter as the referrer. The only way that 50k visitors would go directly to the website is... it's bots."

## Where can I host a static site?

I host all my static sites with Netlify, and they've been getting progressively worse, but the last month has accelerated my desire to get away from them. I'm looking for a new vendor for static site hosting.

This should be easy!

The obvious answer is "Cloudflare," but I'm alarmed at how much of the Internet's infrastructure has centralized to Cloudflare, so I want to be somewhere else.

I also considered just hosting on a VPS or a VPS + Bunny as a CDN, but I don't want my VPS to be a single point of failure.

- [statichost](https://www.statichost.eu/)
  - Pros
    - Run by a single person, so responsive customer service
    - Focused mainly on static hosting without extra complexity
  - Cons
    - Run by a single person, so increased outage risks
    - The upload process unconditionally uploads every file rather than an rsync-like sync of only the changed files, which is a pain for my large sites that only change incrementally
    - Bot scraper protection is not included
    - Bundles together site builds and hosting, but I only want hosting
    - A big selling point is being EU-centric, but I'm in the US
- [surge](https://surge.sh/)
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
