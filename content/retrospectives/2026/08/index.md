---
title: "Refactoring English: Month XX"
date: "2026-08-12"
description: Tripling book sales while fighting scraper bots.
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and founder of small, indie tech businesses. I'm currently working on a book called [_Refactoring English: Effective Writing for Software Developers_](https://refactoringenglish.com).

Every month, I publish a retrospective like this one to share how things are going with my book and my professional life overall.

{{</notice>}}

## Highlights

- July's book sales tripled the already-strong sales I saw in June.
- I'm fighting the world's dumbest scraper bot.
- I'm experimenting with using AI to make a multiplayer computer game.

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Pitch to 5 podcasts to talk about _Refactoring English_

- **Result**: Pitched only to one podcast
- **Grade**: D

I spent a lot of time working on a pitch to _Talking Postgres_, but then I realized the host has no contact information except for LinkedIn. So, I sent her a LinkedIn message but never heard back. I was [a guest on _The TMPDIR Podcast_](https://tmpdir.org/053/), though they invited me even before I pitched to them, so I can't count that one.

### Attract 30k unique readers to the _Refactoring English_ website

- **Result**: The site had 23.8k unique readers
- **Grade**: B

I was secretly thinking of this goal as "get one post on the front page of Hacker News," but I did, and it had an unexpectedly long run on the front page, but it still didn't reach 30k readers.

### Wrap up early access, and declare the 1.0 release of my book

- **Result**: Still not at 1.0 release
- **Grade**: D

I ended up spending more time than I expected responding to user feedback. My [feedback app](/retrospectives/2026/07/#readers-are-leaving-useful-feedback-in-my-books-app) is working, but it also generates new work on the book that's hard to predict.

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

June was the second best month of sales for my book since the Kickstarter, but then July's sales tripled June's.

The main reason for the jump in sales was that I ended the early access discount. I announced that on July 13th that early access pricing would end on July 20th, so the price would increase from $30 to $49.

{{<img src="stripe-2026-07.webp" alt="Graph of sales showing a spike on July 20th and slow sales after">}}

On the last day of the sale, I published a blog post called, ["Why I Stopped 'Creating Content,'"](https://refactoringenglish.com/blog/why-i-stopped-creating-content/), which reached the front page of Hacker News. And then I don't think this has happened to me before, but after it fell off the front page naturally, the moderators put it back on the front page the next day and gave it a second wind. And then it was [the top post of the day on bubbles.town](https://bubbles.town/entry/44752223), a Hacker News-style site that's more indie and less tech-centric.

There was a huge spike in sales on the last day of the sale, with over $1k in sales on that day alone:

When I bumped the price to $49, sales quickly plummeted, which I expected. It's hard to say what the right price is because a time-limited sale motivates people to buy, but a 60% price jump naturally thins the market.

I plan to experiment more with pricing after I get to the book's official 1.0 release.

## I'm fighting the world's dumbest scraper bot

I published my blog post on Monday and got a big jump in visitors. Then, Tuesday, there was another huge surge:

{{<img src="plausible-2026-07-21.webp" max-width="700px" caption="I saw the big jump in visitors and thought some popular blogger linked to me, and then I realized it had to be bots.">}}

All the visitors were going to the [Hacker News Popularity Contest](https://refactoringenglish.com/tools/hn-popularity/). It's happened before where a blogger talks about their rank in the contest and links to my tool, and I see a big jump in visitors, but never like this, and never such a sustained wave of visitors.

When I saw the second spike, I just thought, "Wow, I'm really on a roll this week!"

That afternoon, I was excitedly telling my wife but had a troubling revelation in the middle of explaining it:

> I got another fifty thousand visitors today! I'm not even sure where they're coming from. My guess is someone tweeted it.
>
> Hmm, actually, if someone tweeted it, I'd see Twitter as the referrer.
>
> Oh... It's bots.

And I checked analytics and saw that all of the requests had the exact same browser user agent:

```text
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
```

That's Chrome 125, a browser version that's over two years old. That was good news, as it was unlikely that any legitimate users were using that browser, so it would be easy to identify the malicious requests.

The scraper seemed to just repeatedly load the [root contest page](https://refactoringenglish.com/tools/hn-popularity/) and then click every link over and over again.

I first tried to get sneaky with the scraper. I put a rewrite script on Bunny that checked the user agent and returned a fake response if it was the scraper. So instead of generating a page with 3,000+ links, it would generate a page with only three links.

For whatever reason, my fake responses didn't work. I suspect the scraper had already added the full set of URLs to a database, and so hiding them from the homepage didn't do anything.

I tried rate-limiting based on the user agent on Bunny's side, but that didn't do much either. The lowest rate limit Bunny allows is 1 KB/s, which is too fast to dissuade the bots, as most of the data is split across files that are only a few KB each. And Bunny only holds the data, whereas I host the JS and HTML on Netlify, so by the time the attacker hits Bunny, they've already messed up my analytics and cost me expensive Netlify bandwidth.

Next, I tried to block the malicious IPs. Netlify allows me to block by IP, but it doesn't tell me what my visitors' IP addresses are, so how am I supposed to know what to block? Fortunately, Bunny does reveal the IP, so I got the IPs that way, but if this was a pure Netlify site, I'd be totally stuck.

I vibecoded a simple tool that scraped my Bunny logs for the specific user agent and collected all the IPs associated with the attack. It was an old enough browser that I wasn't worried about legitimate users getting caught as false positives.

I was able to generate a list of several thousand malicious IPs, but Netlify only lets me block 50 IPs per input field. I modified my log scraper app to aggregate IP addresses into CIDR ranges based on ISP registration (like `1.2.3.0/24`), and that condensed my blocklist down to about 70 distinct IP ranges. I checked the owners of the IPs, and they were all data centers or weird ISPs I'd never heard of like `FXCAPTIAL`, the proud owners of `94.154.176.0/24`.

That worked, but then the attack started up again a week later from new IPs and a new, slightly more recent user agent, so I just re-ran my script and updated my list of IP ranges to block,, and that seems to be working.

The weirdest thing about the attack is that the bots don't care about being blocked. They just keep hammering the server anyway. I'd expect them to be like, "Oh, well no use wasting compute and bandwidth on requests that have 100% been blocked for the past two weeks," but they don't mind apparently.

{{<img src="netlify-attacks.webp" max-width="800px" caption="Even after I block the attackers' IPs, they just keep hammering away.">}}

I reached out to Netlify support the day the attack began, but they were useless. I think the first response was AI-generated because it told me to modify settings that didn't exist. And then the second response seemed more human, but it basically said, "It looks like you solved this problem in the two weeks it took for me to respond, so nothing left for me to do!" Fortunately, they did refund me the $55 in overage fees the attack caused.

## Where can I host a static site?

I host all my static sites with Netlify, and they've been getting progressively worse, but their complete indifference to the scraper bot attack has inspired me to switch vendors.

The obvious answer is "Cloudflare," but I'm alarmed at how much of the Internet's infrastructure has centralized to Cloudflare, and I don't want to add on to that.

I also considered just hosting on a VPS or a VPS + Bunny as a CDN, but I don't want my site to go offline the day I'm on the front page of Hacker News because my VPS crashes or I misconfigure caching on Bunny. I want a solution where I pay someone else to keep my site online and worry about caching, CDNs, etc.

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
    - All management is through their terminal app. There's no web app
    - It doesn't look like they support multi-factor authentication
    - The upload process unconditionally uploads every file rather than an rsync-like sync of only the changed files, which is a pain for my large sites that only change incrementally
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

## Mikeville: My unfinished multiplayer browser game

I've deployed web apps to the Internet for years, but I always use a platform where I'm deploying a single Docker container or app rather than managing a whole server. I recently started experimenting with self-hosting some services on a VPS, which has been fun, but they're tiny services, so the server mostly sits idle all day.

If I have a server sitting around, what would be a fun thing to host for my friends?

What about a game? I've seen games that you can self-host like Valheim and ARK: Survival Evolved, but it seems like for those, you need other players on at the same time, or it's no fun.

As someone who only plays computer games every few months, I want something where I can pop in and it's fun if other people are there at the same time, but it's also fun to see what's changed. It would be like if I co-owned a beach house with my friends, and we left notes for each other in the guestbook when we stayed there, and sometimes we're there at the same time.

The problem is that I can't think of how to translate my abstract aspirations into a concrete game.

For now, I'm exploring what vibecoded game development looks like and figuring out what feels fun. The two games I had in mind designing this prototype were Stardew Valley and Ultima Online, two games I've spent many hours playing.

{{<video src="mikeville-gameplay.mp4" max-width="600px">}}

The game is now available here, if you'd like to play it in your browser:

- [Mikeville Public Demo](https://mville.mtlynch.io/#password=i%20love%20unit%20tests)

I'll be online a little today if you'd like to visit.

## Stuff I enjoyed this month

- [Stripe Just Wants a Number](https://blog.exe.dev/billable-facts)
  - I enjoy the exe.dev blog, and I find that they have an interesting way of thinking about problems, especially software problems that affect small software vendors. I don't have any billing logic that's complicated enough to benefit from this, but I think it sounds neat in principle.
- [99% of My Website Traffic Is Bots](https://patronview.com/news/99-percent-of-my-website-traffic-is-bots/)
  - Given my experience with scraper bots this week, I found this relatable and helpful. I also appreciated the custom illustrations.
- [I Regret Migrating to Codeberg](https://マリウス.com/i-regret-migrating-to-codeberg/)
  - I've been moving my projects from GitHub to Codeberg for the past year, and I've been a paying member, but I now regret investing in that platform. There are so many outages and days where the servers are overloaded. The final straw was Codeberg's decision to ban projects that use AI. I'm probably below the threshold where I'm violating or they'd care, but I'm still planning to move elsewhere.
- [Super Mario Derivations](https://fzakaria.com/2026/08/05/super-mario-derivations)
  - This was a neat Nix trick where the author encoded the play state of Super Mario 3 in an emulator using Nix attributes, like `nix build '.#level1.rightb.rightb.rightab.rightb'` means to start level 1 and press Right + B (run right) twice, Right + A + B (run and jump), and Right + B again (run right). And Nix caches all the game states so you can change a button press and only recalculate what was unique from previous runs.

## Wrap up

### What got done?

- I expanded some chapters of my book based on user feedback and moved the section on design reviews [to the blog](https://refactoringenglish.com/blog/useful-feedback-on-design-docs/).

### Lessons learned

- Customers respond much more strongly than I expected to a limited-time sale.
- It's fun and relatively easy to vibecode computer games.

### Goals for next month

- Pitch to 5 podcasts to talk about _Refactoring English_.
- Attract 30k unique readers to the _Refactoring English_ website.
- Declare the 1.0 release of my book.

### Requests for help

- If you have recommendations for static site hosting, let me know.
- If you know [Claire Giordano](https://talkingpostgres.com/people/claire-giordano), tell her I'd be a good guest on _Talking Postgres_ (to talk about technical writing, not Postgres).
