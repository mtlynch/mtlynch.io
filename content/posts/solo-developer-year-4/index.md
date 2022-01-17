---
title: My Fourth Year as a Solo Developer
tags:
- annual review
- blogging
- tinypilot
- is it keto
- zestful
description: TODO
date: '2022-02-01'
hero_image: cover.jpg
---
Four years ago to the day, I [quit my job as a developer at Google](/why-i-quit-google/) to experiment with bootstrapping a software business. I attempted several businesses for the first few years, and one finally caught on in 2020.

Previous updates:

* My First Year as a Solo Developer
* My Second Year as a Solo Developer
* My Third Year as a Solo Developer



## The high-level view


{{<notice type="info">}}

**How can you afford to keep losing money?**

I went into more detail [in my year two retrospective](/solo-developer-year-2/#how-can-you-afford-to-keep-losing-money), but the short answer is: low cost of living, significant savings from my Google days, and passive investment income.

{{</notice>}}

## TinyPilot's second year

In 2021, I focused mainly on TinyPilot, a company I created in mid-2020 (TODO: link). TinyPilot is an open-source KVM over IP device built on the Raspberry Pi. It allows you to control your computers from your browser without installing any software, even when the computer is in BIOS or has no network connectivity.

At the start of 2021, I was TinyPilot's sole developer. I was also the sole customer support person, salesperson, and marketer. My girlfriend managed fulfillment and inventory. We ran TinyPilot out of our house, where it was slowly occupying more and more territory.

Today, TinyPilot has a real office, a two-person fulfillment staff, a team of three developers, and even a [European distributor](https://kvm-ip.de).

The software has changed a lot in the last year, too. For fun, I installed the TinyPilot image from last January, and compared it to the latest release:

TODO: GIF comparison

We've added several major features in the last year including:

* Mounting virtual USB drives and CD-ROMs
* Wake on LAN
* Password-based authentication
* System updates from the browser
* Video bandwidth tuning

Several of my favorite YouTubers reviewed TinyPilot, which was exciting. One of my favorite moments of the year was when we got our first-ever review from Craft Computing. We sat on the couch and watched it on our TV, so the experience was fairly surreal.

That video led to the biggest sales jump we had ever seen at that point. And it was still just my girlfriend and I, so we were running around for two weeks trying to ship orders out fast enough and replenish our inventory even though sales were twice as large as any sales spike we planned for.

## Other projects

### Refactoring English

My great shame of the year is that I made almost no progress on this book. I got about 80% done with the first chapter, and then

I've had a morning ritual for the past three years of writing for an hour every morning. That generally translates into about ten blog posts per year, so I thought that if I spent that time on a book instead, I'd be done within a year.

The problem is that TinyPilot now has its own pace that I don't fully control. For the first few months of 2021, I stuck to writing for an hour a day, but I'd end every day with a list of important, unfinished TinyPilot tasks. I decided to [suspend my writing](/retrospectives/2021/09/#can-i-afford-to-keep-writing) until TinyPilot slowed down, and then that never happened.

I'm still excited to write this book, and I hope I have more time for it this year.

### mtlynch.io (this blog)

As with my lack of book-writing time, I had very little blog-writing time. I published three new blog posts.

I stuck with my habit of writing monthly retrospectives. I find it easier to budget time for retrospectives because they almost always help me run my business. The act of sitting down and explaining my strategy has helped me countless times recognize a flaw in my thinking that I otherwise wouldn't have noticed.

More and more people are telling me that they find them helpful, which always surprises me a bit because they feel like me just thinking aloud.

### Hit the Front Page of Hacker News

{{<img src="htfp-cover.png" maxWidth="550px" caption="[*Hit the Front Page of Hacker News*](https://hitthefrontpage.com) is my course about my blogging.">}}

At the beginning of the year, I released my blogging course. I'm glad I did it, but I wouldn't have done it had I known how hard it would be.

I've heard positive feedback about the course, and a few people credited it with helping them write successful blog posts.

I wish I had more time to market it. It earned $XX in its first year, and I was hoping for something closer to $20k. Had TinyPilot not been so busy, I think I could have spent more time marketing it and gotten closer to my goal, but I still learned a lot about creating an educational product, and I'd like to do more of it in the future.

### Is It Keto

{{<img src="isitketo-screenshot.png" alt="Screenshot of Is It Keto website" hasBorder="True" maxWidth="550px" caption="[Is It Keto](https://isitketo.org) tells readers which foods fit the keto diet.">}}

I started [Is It Keto](https://isitketo.org) in 2018. It's a simple site that tells you whether or not particular foods fit the keto diet. It earns money from Amazon Affiliate links and Google AdSense.

I put the site on the backburner when I started TinyPilot, but it continued to grow on its own in 2021. But by June or so, another site popped up that did the same thing, and they started overtaking me in search engine results.

I did briefly explore the idea of moving to MediaVine, which is one of the higher-end ad networks. I've heard they pay 3-8x as much as AdSense. MediaVine accepted Is It Keto into their program, but then I discovered [how bad their contract terms are](/retrospectives/2021/09/#is-it-ketohttpsisitketoorg), so I bailed on them and stuck with AdSense.

{{<notice type="info">}}

#### Why don't you just sell the site?

I'd guess that market price for the site is $8-15k, but it would probably take 30-60 hours to go through the whole sales process. I think I'm better off spending that time on TinyPilot.

{{</notice>}}

### Zestful

2021 was a nice comeback year for Zestful. The only work I did on it was to publish a Python SDK for it. I don't think that had anything to do with the growth.

### LogPaste

I created LogPaste because I wanted an easy way for TinyPilot users to share their diagnostic logs with me. Every other solution I found was too heavyweight, so

```bash
$ echo "hello, world!" | curl -F '_=<-' https://logpaste.com
http://logpaste.com/BQGczWYC
```

LogPaste has worked out great. It works as I expected it to. It eliminates the hurdles users would normally face in sharing log files with me. Nobody has ever failed to figure it out or run into errors.

### What Got Done

I've given up on making money from What Got Done, but I continue working on it as a way to sharpen my development skills and because it's valuable to me as a tool.

My major 2021 achievement for What Got Done was migrating it from Google Cloud Platform to fly.io, SQLite, and Litestream for an XXx speedup on most requests. That change was a lot of fun, and I love the switch from

## Lessons learned

### Sell just one thing

### Plan to fail for four years

### Good management attracts good employees

I think that's also good management...

### Organizations succeed when the team improves

I quoted Jason Cohen last year, and I'll quote him again from a more recent interview.

https://www.youtube.com/watch?v=Sjs5gEUlZyU&t=3608s

Handling rush orders.

Letting developers peer review.

## Favorite discoveries

* beancount
* Litestream
* TalkYard

## Grading last year's goals

At the start of last year, I [set three high-level goals](/solo-developer-year-3/#goals-for-year-four).

### Grow TinyPilot to $600k in annual revenue

* **Result**:
* **Grade**:

### Publish six blog posts and one book

* **Result**: Published two blog posts and zero books
* **Grade**: D

I got

I have more topics I want to write about than ever before but no time to write.

### Automate TinyPilot management

* **Result**:
* **Grade**: C

This time last year, I was still running TinyPilot out of my house, and my girlfriend and I were the only employees.

I've made a lot of progress in getting myself out of the critical path. I took a one-week vacation over the holidays, and that mostly worked fine, although I did have to do about 30 minutes of emergency work to prevent thousands of dollars of equipment from being sent back to China.

## Goals for year four

### Grow TinyPilot to $1M in annual revenue

There hasn't been any time for marketing. I think I should be able to explore more marketing channels. I've reached out to YouTube reviewers offering them review units, and that's been successful, but there are tons of paid marketing channels I haven't tested at all. I think there's a lot of room to grow.

 double revenue

### Reduce TinyPilot to 30 hours per week

This is a continuation of my goal from last time. I'd like to manage TinyPilot on 30 hours per week so that I have time left over to write and develop new skills.

I feel like I get stuck in what XX calls the urgent but unimportant quadrant. The time I enjoy TinyPilot the most are when I feel like I've gotten through all of my emails and I have time to think about new things to add. The times when I enjoy it least are when it feels like there are a thousand little things that need to get done, and I'm the only one in a position to do them.

## Do I still love it?

This has definitely been my most stressful year as a bootstrapped founder.

I love writing and programming, and the past year didn't leave me much time to do either. The nature of the business requires . My team is growing

I still prefer it to working for any employer I've had, but it's not a happy-go-lucky. I'd like to find ways back to the parts that I loved.

---

*Cover image by [Loraine Yow](https://www.lolo-ology.com/).*
