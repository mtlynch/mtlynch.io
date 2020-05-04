---
title: "Is It Keto: Month 11"
date: 2020-05-03T22:01:20-04:00
description: My pivot to long-tail SEO.
---

## Highlights

* Two of my blog posts reached the front page of Hacker News

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Conduct five customer interviews for the portfolio rebalancer

* **Result**: Conducted zero customer interviews.
* **Grade**: F

I deprioritized the portfolio rebalancer in favor of Is It Keto. I'll explain why below.

### Implement customer payments for the portfolio rebalancer and either hide or limit the free version

* **Result**: Implemented a Stripe payment flow.
* **Grade**: A

I successfully implemented a subscription payment workflow for the first time ever. I expected a simple two-day process, but it took me about three weeks to get everything working.

### Publish one new blog post

* **Result**: Published two new blog posts, both of which reached the front page of Hacker News.
* **Grade**: A

While integrating with Stripe, I noticed that their JavaScript library [collected user data from my site](/stripe-recording-its-customers/). My blog post about the issue [reached #1 on Hacker News](https://news.ycombinator.com/item?id=22936818) and prompted [a response from Stripe's CEO](https://news.ycombinator.com/item?id=22937303). *The Register* also [interviewed me](https://www.theregister.co.uk/2020/04/22/stripe_defends_mouse_measuring_javascript/) about the story.

Stripe made several changes the week following my post, and I published [a follow-up ](/stripe-update/) with my thoughts on Stripe's changes. This post also reached [the front page of Hacker News](https://news.ycombinator.com/item?id=23034924), though it generated [a more measured response](http://hnrankings.info/23034924/).

The response was overall positive, but it is the most hostility I've seen in response to anything I've published. Partly, I think Stripe is so beloved in the tech community that people feel protective against anyone criticizing the company. Also, my post is about the correct way to weigh fraud protection against user privacy, and people have strong opinions about what balance is correct.

## Stats

### Portfolio Rebalancer

TODO

### Is It Keto

| Metric                    | March 2020  | April 2020  | Change                                       |
| ------------------------- | ----------- | ----------- | -------------------------------------------- |
| Unique Visitors           | 33,007      | 35,451      | <font color="green">+2,444 (+7%)</font>      |
| Total Pageviews           | 80,368      | 72,894      | <font color="red">-7,474 (-9%)</font>        |
| Domain Rating (Ahrefs)    | 26.0        | 27.0        | <font color="green">+1.0 (+4%)</font>        |
| AdSense Earnings          | $195.85     | $92.09      | <font color="red">-$103.76 (-53%)</font>     |
| Amazon Affiliate Earnings | $166.43     | $128.39     | <font color="red">-$38.04 (-23%)</font>      |
| **Total Earnings**        | **$362.28** | **$220.48** | **<font color="red">-$141.80 (-39%)</font>** |

Is It Keto took a big hit in March amid COVID-19 panic, but it's been growing consistently every week since then.

## Attracting visitors to Portfolio Rebalancer but no sales

## Is It Keto and the long tail

Portfolio Rebalancer's lack of traction has sent me back to [Is It Keto](https://isitketo.org), my on-again, off-again dieting site from 2018. My pattern has been to work on the site every few months, get bored, then return again when another project doesn't work out, so here we are again.

One of the most common questions people ask me about Is It Keto is why I don't simply pull in a nutrition database and auto-generate pages for every possible food. I always told people that I considered doing it but feared the wrath of Google lest I run afoul of their [rules against auto-generated content](https://support.google.com/webmasters/answer/2721306?hl=en). Google drives almost all of Is It Keto's traffic, so if they brought the hammer down on me, the business would basically disappear overnight.

This fear went away after a conversation with my friend Thenuka. He was explaining to me how he had attracted search traffic by building thousands of little mini-pages that answer a specific search query. If you Google "can I watch *Knives Out* on Roku?" Flixed has [a dedicated page](https://flixed.io/finder/movies/2019/Knives_Out/roku/) that answers that exact question:

I asked Thenuka if he was afraid of Google penalizing him from auto-generated content. He said that in his experience, if Google thinks you're remixing content in a low-quality way, they'll simply ignore your page. The really scary penalty from Google is a [manual action](https://support.google.com/webmasters/answer/9044175?hl=en), but Thenuka said that he's only seen Google do that to sites that actively deceive search engines. An example is something like using machine learning to generate English-sounding text that's just nonsense containing key words you're hoping Google notices.

I asked Thenuka about auto-generating content for Is It Keto, and he said that sounded fine to him. Google doesn't mind remixing data from other sources as long as you're adding value. He expected that taking nutrition data from the USDA and presenting it in a specialized way that applies to the keto diet would be adding value in Google's eyes.

In fact, this is a technique Thenuka likes. It's called "long tail SEO"

{{< img src="apricots-dates.png" alt="Cover image for Ahrefs' Blogging for Business Course" maxWidth="800px" caption="I've begun auto-generating pages based on each food's nutritional information." hasBorder="true" >}}

I started with fruits because they're straightforward &mdash; no artificial ingredients to explain and for most fruits, the answer is that they're not keto-friendly, so a quick blurb and a pointer to alternatives is sufficient.

One of the most popular pages on Is It Keto is [Is Russell Stover Sugar-Free Chocolate Candy Keto?](https://isitketo.org/russell-stover-sugar-free-chocolate-candy). I wrote that article by hand, but re-reading it today, a lot of the content works for similar foods if I just replace the specific names and numbers.

{{< img src="templatizing-articles.png" alt="Cover image for Ahrefs' Blogging for Business Course" maxWidth="850px" caption="How I could recycle content from my [Russell Stover Sugar-Free Chocolate](https://isitketo.org/russell-stover-sugar-free-chocolate-candy) page into dozens of articles about similar foods" hasBorder="true" >}}

## The long tail lets me flex my development skills

One of the reasons I keep abandoning Is It Keto is that it never feels like it plays to my strengths. I think I'm good at writing, but there are too many other good writers running keto websites for me to win on writing alone. I consider myself a good developer, but Is It Keto has never needed much software. I wrote the site from scratch, but a non-developer could have produced essentially the same site using WordPress.

What excites me about this long tail strategy is that it makes Is It Keto unique among keto sites.

## Rewriting Is It Keto from scratch

I wrote Is It Keto in early 2018, back when I had about 10% of the experience with web development that I have today. I've become [more conservative about when to use databases](/retrospectives/2020/02/#ill-never-launch-with-a-database-again) and more drawn to static site generators like Hugo and Gatsby.

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Zestful](https://zestfuldata.com)

| Metric             | March 2020 | April 2020 | Change                                         |
| ------------------ | ---------- | ---------- | ---------------------------------------------- |
| Unique Visitors    | 291        | 1,142      | <font color="green">+851 (+292%)</font>        |
| Total Pageviews    | 843        | 2,960      | <font color="green">+2,117 (+251%)</font>      |
| RapidAPI Earnings  | $3.67      | $32.19     | <font color="green">+$28.52 (+777%)</font>     |
| **Total Earnings** | **$3.67**  | **$32.19** | **<font color="green">+$28.52 (+777%)</font>** |

Zestful had an odd jump in traffic because a Chinese blog published an unauthorized translation of my [Second Year as a Solo Developer post](/solo-developer-year-2/), and I guess it gained enough traction that people clicked through to Zestful. It didn't seem to translate into any sales, though.

### [What Got Done](https://whatgotdone.com)

What Got Done is my weekly work journaling app. I tried to build it into a business last year, but relegated it to "hobby project" status after a few months of [failing to gain traction](/retrospectives/2019/08/). I still use it myself, and I add features on the weekends.

Recently, I was looking at my [user dashboard](https://userkit.io/) and noticed that the site had 370 registered users. On average, the site gets one new user per day:

{{< img src="whatgotdone-april-signups.png" alt="Graph of 2-3 signups per day throughout April" maxWidth="600px" caption="What Got Done averages about one new user signup per day." hasBorder="true" >}}

The problem is that, of these 370 registered users, the total number who participate in the site is about... five.

Users sign up and then immediately abandon the site. Sometimes they'll post updates for a week or two, but they almost always end up fading away within a few weeks. With so many people interested enough to sign up, I feel like my failure to retain them is a huge missed opportunity to grow the site.

I suspect two main causes:

* Lack of onboarding
* Failure to support habit building

One of the most valuable pieces of feedback my friend DK gave me after testing out my app was that the signup process left him feeling lost. The first thing a user sees after signing up is a giant blank textbox and vague instructions about how to fill it. I could certainly do more to let the app help the user create updates in smaller, incremental steps so that it doesn't feel like one massive task.

The other problem is that What Got Done generates the most value for people who use it consistently, but it offers no tools to help people build the site into their habits. I could fix this by introducing options to get email reminders or calendar events. I could also reward users for consistent participation via points or badges.

## Interesting discoveries

### [Ahrefs Academy: Blogging for Business](https://ahrefs.com/academy/blogging-for-business/)

{{< img src="blogging-for-business.jpg" alt="Cover image for Ahrefs' Blogging for Business Course" maxWidth="600px" caption="In March, Ahrefs released [their premium content marketing course](https://ahrefs.com/academy/blogging-for-business/) for free." linkUrl="https://ahrefs.com/academy/blogging-for-business/" >}}

In response to COVID-19, Ahrefs released their $800 course on content marketing [for free](https://twitter.com/timsoulo/status/1240151594328621056). I generally prefer to learn by reading rather than watching online videos, but I've been impressed with this series.

One lesson from the video that really hit home for me is that [traffic is a vanity metric](https://youtu.be/y5kQXogrLN0?t=53). If you're blogging as part of your business, the number of visitors you attract is only an intermediate goal to something else, like selling products or acquiring new customers.

The series itself is a great example of elegant content marketing. Throughout the course, they're suggesting ways to strategize about writing content that will attract search traffic, and then they always show Ahrefs tools that can help. They build credibility by sharing useful information, then when they show you their tool, you trust that it's helpful. Companies often get this backwards; they start with their own product and show you all the ways it can help you, but that turns people off because the company comes across as self-serving.

Ahrefs [is undecided](https://twitter.com/slagter/status/1240197698525028352) about how long the course will remain free,  so I've archived my copy for future reference.

## Wrap up

### What got done?

* Published two blog post that reached the front page of Hacker News.
 * This continues my lucky streak on Hacker News with [five frontpage articles in the last four months](https://news.ycombinator.com/from?site=mtlynch.io).
* Launched the paid version of [Portfolio Rebalancer](https://assetrebalancer.com)
* Reimplemnted [Is It Keto](https://isitketo.org) as a flat-file, static site.

### Lessons learned

* Traffic is a vanity metric
* Long-tail pages are potentially a way for developers to outcompete content authors

### Goals for next month

* Add 100 new articles to Is It Keto (a ~50% increase in the current corpus size)