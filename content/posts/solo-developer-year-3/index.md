---
title: My Third Year as a Solo Developer
tags:
- annual review
- blogging
- tinypilot
- is it keto
- wanderjest
hero_image: cover.jpg
date: '2021-02-01'
---

Today is the third anniversary of me [quitting my developer job at Google](/why-i-quit-google/) to build my own software business. I posted updates at the end of my [first](/solo-developer-year-1/) and [second](/solo-developer-year-2/) years on my own, so I figured I'd keep up the tradition.

## The big picture

This is the year that things finally began clicking into place for me. I [set a goal](/solo-developer-year-2/#goals-for-year-three) to earn $20k in revenue by the end of the year.

For the first six months, it didn't look like I was going to make it. I was eking out $300/month from my various projects, and I was looking for some 10x improvement to help me meet my goal.

Starting in July, I started a new project that was obviously a winner right out of the gate. I ended the year with $XXk in revenue.

TODO: Graph

Okay, I'm still not making a profit, but there's a good explanation. Because I'm selling a physical product, my costs are more front-loaded. Sales continue to grow rapidly, which means I have to keep an even larger inventory.

{{<notice type="info">}}

**Wait, how can you afford to keep losing money?**

I went into more detail about this in last year's retrospective (TODO: link), but the short version is that my living expenses are lower than interest (TODO: reword) I earn on my savings.

{{</notice>}}

## Project by project

### WanderJest

I started the year with an ambitious new project called WanderJest. I described it as "Bandsintown, but for comedy." I love live comedy, but I find it hard to discover shows because there's no unified place to find out about shows. It's spread across comedians' Twitter feeds, crappy theater websites, Ticketmaster, Stubhub, etc.

I planned to monetize it with affiliate deals. Comedians struggle desperately to get people to their shows. If I could bring them audiences, surely they'd find that valuable.

The problem was that I couldn't bring them audiences. I started by covering shows in my local area. I attracted a few thousand people to the site each month, but when I offered discount codes to shows, zero people used them.

All that was sure to change with my big, brilliant marketing push. I spent [a thousand dollars](/retrospectives/2020/03/#100-in-revenue-but-at-what-cost) marketing a "Comedy Scavenger Hunt" that would award cash prizes to fans for attending local comedy shows. The month of the big event? March 2020. You can probably guess how that turned out.

With a heavy heart, I announced on March 18th that the site was [gone until further notice](/retrospectives/2020/04/#putting-wanderjest-on-hold). It's a shame because even though I hadn't found a way to earn money, it was the most fun I've ever had building a product.

### Portfolio Rebalancer

By April, COVID had turned the world upside down. I didn't know what new business would make sense. So, I just did something I could test quickly: a portfolio rebalancer.

My investments are a mix of US stocks, international stocks, and bonds. I have percentage targets for each asset class, and every quarter, I rebalance the investments so that they match my targets. I've always done this in a spreadsheet, but I always dread it because my process is just plugging in trades and fiddling with numbers until it comes out right.

I made a web app to automate the process. It turned out to be hard to find customers. There are plenty of investment communities that discuss rebalancing, but those communities constantly get bad pitches from people selling snake oil, so they generally don't allow any kind of product promotion. Of the few users I could find, nobody was even willing to start a paid trial.

It was kind of a desperate stab at an idea, and I wasn't passionate about it anyway, so I just dropped it after two months. I removed the paywall. It works, but it's limited to Vanguard funds, and it's not very sophisticated.

### Is It Keto

After Portfolio Rebalancer, I came back to Is It Keto, a site I started in 2018. I've managed it off and on since then. I always get bored because I'm not passionate about keto, but then I keep getting drawn back in because it was my only project that consistently earned money.

My new idea for the site was to move to "templatized" content. For all of Is It Keto's life, I wrote artisenal, hand-crafted articles for each food. People asked why I wasn't generating the articles automatically, and I said I couldn't do that or Google would 

This year, I talked to a friend who knows way more than I do about SEO, and he told me I had misunderstood Google's rules and penalties. Google doesn't like it if you just generate garbage content to fill the page, but they don't mind if you programmatically generate content to add value around data. He also said that it's rare for Google to just completely deindex a site unless you're doing something egregiously shady.

 content, and I always  But I only earned about $0.01 per visitor in ads and affiliate money, and the average article only received about XX unique visitors per month. Meanwhile, it generally cost me ~$100 in content writer salary and 30-60 minutes of editing time.

This wasn't sustainable, so I thought about templatizing content. I had a friend who had successfully built several content businesses by purchasing databases and building friendly websites around them. He mixed hand-written articles with templatized content.

### TinyPilot

While I was working on Is It Keto, I was thinking about building a new VM server. I was beginning to hit the limits of my old one, and I wanted to correct some mistakes I made in building it.

The biggest mistake I made in building my first server was not considering remote management. If I ever ran into issues booting the server, I had to drag it over to my desk, swap all my keyboard and monitor cables, fix the issue, then put everything back.

I had read that the Raspberry Pi could emulate a keyboard. I was pretty sure it could capture video, too. So if I could get that working, I could build my own KVM over IP device. I started tinkering with it around May.

I wrote a blog post about it thinking that it could be a neat side project. My hope was that I could make an extra $100 per week selling little kits to reproduce my project. But I posted it to Hacker News, and I sold out within hours.

I realized there was a real business here that was way bigger than any other project I was working on.

### mtlynch.io (this blog)

One of my the changes I made to the blog this year was thinking more strategically about topics.

Before 2020, I wrote with an attitude of, "This topic is on my mind right now, so I'm going to write about it and see what happens." Sometimes the post would find an audience, but more often it wouldn't.

Now, I think about sharing the article before I write it. Would this do well on reddit? Would Hacker News find this interesting? Is this a topic people ever Google?

That change made a huge difference in my readership. Looking at the number of readers each article attracts the first week after publication, the median went from XX in 2019 to XX in 2020. All but one of my blog posts reached the front page of Hacker News, and four of them reached the #1 slot.

### Hit the Front Page of Hacker News

In XX, I gave a talk to my peer mentorship group called "How to be a Sort of Successful Software Blogger." The talk covered the best tips I'd learned about blogging in the past few years.

 I liked writing it, but as I mentioned above, I didn't have anywhere to share it.

## Lessons learned

### Success in one area leads to success elsewhere

People are more interested in what I post on Twitter and . And then because of that, when I send people cold emails, they're more interested in talking to me because

I was always a little resentful of other indie developers who get attention by boasting about revenue without doing any real introspection or sharing anything useful. Time and again, I'd see people cheer on a post that was basically, "Wow, I spent two hours putting up a landing page, went to sleep, and woke up to find $20k in pre-orders! Go me!" It felt like 

Now that I'm earning more money, I feel like my suspicions are confirmed. It's so much easier to attract people to content about your business when you're making money. My retrospectives, which people were never that excited about before, suddenly get a lot of attention on Twitter and reddit even though nothing has changed except for the numbers.


I noticed that once I started talking about earning money, people became more interested in following me on Facebook. I write monthly retrospectives, and I used to post them occasionally to the /r/SideProject subreddit, but once my revenue reached $10k, people would get excited about them. Even when the retrospective was me saying how I did a bad job that month and neglected my business, people were still excited that my revenues grew.

### The first $1,000 is harder than the next $9,000

The first two and a half years of working on my own, I was grinding away to grow my little businesses. Last year, Cory Zue inspired me to take bigger swings and go for something that earned serious money from the start rather than try to monetize my businesses $0.01 per unique visitor at a time.

I thought earning $10,000 per month would be an order of magnitude harder than earning $1,000, but it's significantly easier. TinyPilot feels like it just grows on its own. Maybe that's an illusion because I am thinking strategically about how to develop the product, but it feels like it has this momentum of its own.

### There's no shame in seeking product-founder fit

One of the considerations I've had in all the businesses I've ever started is that I wanted to be able to tune out on evenings and weekends. One of the things I hated most at Google was being "on call" where a page could wake me up at 3 AM, and I'd have to get up and fix the issue, then go to work like normal the next day.

None of my projects require me to carry a pager. Is It Keto could have a complete outage over the weekend, and it wouldn't matter much.  I'd lose a little bit of ad revenue, but that's it.

Imagine instead that I had built a web service called Is It Lethal, and it allowed pharmacies to automatically check whether prescription drug combinations could kill their patients. That's the kind of thing that needs to be online all the time, and if it's down at 4 AM, someone should page me. An outage there would be A Big Deal.

I was always a little embarrassed that I had this restriction. I felt like I wasn't a *real* entrepreneur by limiting myself in this way. I wondered if the reason none of my products had taken off was because I was being too prissy about carrying a pager.

After my last year-in-review, Patrick McKenzie recommended I watch a Jason Cohen video. Jason Cohen has launched several successful startups. In the video, he recommends that solo founders avoid businesses where an outage is A Big Deal.

### Success is more stressful than failure

I didn't make money, but people were supportive. I was the scrappy little developer who kept on going.

## Grading last year's goals

At the start of last year, I [set three high-level goals](/solo-developer-year-2/#goals-for-year-three). Here's how I performed against them.

### Earn $20,000 in revenue across my businesses

* **Result**: Earned $XX in revenue
* **Grade**: A+

For the first half of the year, I didn't think I'd make it. Fortunately, I landed on a winner with TinyPilot that put me way above my goal.

### Publish 10 blog posts

* **Result**: Published 9 blog posts
* **Grade**: A-

Depending on how you count, Instead of a tenth blog post, I published 

### Learn one new technology

* **Result**: Learned more JavaScript
* **Grade**: B-

I was hoping to find an excuse to learn Rust, but I never found a good match.

Instead, I ended up gaining more breadth and depth in JavaScript. I already knew Vue, but this year I learned to use Gridsome, a Vue-based static site generator. I used it to rewrite Is It Keto and to build [my TinyPilot sales site](https://tinypilotkvm.com). I also learned to use pure JavaScript more effectively. TinyPilot's web app is pure JavaScript (TODO: link) with no Webpack or compilation step, and I love the simplicity of it.

## Goals for year four

### Earn $250,000 in revenue across my businesses

This is an aggressive goal. It's certainly a big jump from my previous goal of $20,000. Based on TinyPilot's rate of growth, it feels achievable.

### Publish six blog posts and one ebook

I enjoy writing more than recording video lessons. I'd like to write a book that teaches software developers to write effectively. It's tentatively titled *Refactoring English: Effective Writing for Software Developers*.

### Automate TinyPilot management

My girlfriend works with me on TinyPilot part-time. She manages inventory and packs orders, but this is fragile and doesn't scale well. I'd like to systematize and outsource enough of our processes that we can take a two-week vacation and let the business run on its own.