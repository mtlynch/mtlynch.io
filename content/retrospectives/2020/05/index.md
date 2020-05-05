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

| Metric | April 2020 |
|--------|------------|
| Unique Visitors | 1,081 |
| Total Pageviews | 2,279 |
| User Signups | 12 |
| Free Trials Initiated | 0 |
| Paid Subscriptions Initiated | 0 |
| New revenue       | $0 |

Portfolio Rebalancer received an exciting number of visitors in its first full month of existence. Unfortunately, its revenue is still $0.

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

## Portfolio Rebalancer has lots of visitors but no sales

At a recent virtual meetup with other indie founders, I asked for suggestions of how to attract visitors to Portfolio Rebalancer. Another founder pointed out that I was successful at attracting readers to my blog posts, so I should write a blog post about the benefits of rebalancing an investment portfolio with a link to my rebalancer.

The problem is that there are tons of articles about rebalancing already, so it would be difficult for me to compete with established personal finance writers. I thought I'd have a better shot at writing about something technical I learned in the process of building Portfolio Rebalancer, and then programmers would find my article and discover the tool. Granted web developers aren't necessarily the same audience as people looking for personal finance tools, but I hoped there'd be enough overlap that I could attract a few users.

So, I kept an eye out during development for anything that would make an interesting blog post. When I noticed the data leak from Stripe's library, I thought people would find that noteworthy. I [wrote up what I discovered](/stripe-recording-its-customers/) and how developers could limit Stripe's tracking behavior on their sites. The post attracted 28k readers over the past two weeks. Portfolio Rebalancer had ~1k visitors in April, and I suspect around 80% of them are the result of my Stripe blog post.



I also tried placing Google Ads, but I've gotten 99 paid clicks (totaling $240) and nearly 100% of them bounced immediately:

{{< img src="rebalancer-bounce-rate.png" alt="High bounce rate for paid traffic in Google Analytics" maxWidth="800px" hasBorder="true" caption="Nearly 100% of users who visit after clicking a paid ad immediately leave the site." >}}

I haven't given up on Portfolio Rebalancer entirely, but I've placed it on the backburner to free up time for Is It Keto. It was meant to be a two- or three-week prototype, but creating the payment flow took longer than I expected.

## Venturing into auto-generated pages

[Is It Keto](https://isitketo.org) is a site I created in 2018 that answers simple questions around the keto diet. The site and I have an on-again, off-again relationship. My pattern has been to work on the site every few months, get bored, then return again when another project doesn't work out, so here we are again.

One of the most common questions people ask me about Is It Keto is why I don't simply pull in a nutrition database and auto-generate pages for every possible food. I always explained that I feared the wrath of Google lest I run afoul of their [rules against auto-generated content](https://support.google.com/webmasters/answer/2721306?hl=en). Google drives almost all of Is It Keto's traffic, so if they brought the hammer down on me, the business would basically disappear overnight.

Recently, I had an illuminating conversation with a friend who's had siginficantly more experience in search engine optimization. He suggested that my fears were unfounded. In his experience, Google only brings down harsh penalties on sites that egregiously try to manipulate search results. I might get in trouble if I used machine learning to auto-generate page text, but if I'm simply pulling nutritional data and presenting it in a way that adds value for users on the keto diet, that should be fine by Google.

My friend's prediction was that if Google didn't like my auto-generated content, it's more likely that they'd simply downrank those particular pages rather than applying a penalty to my entire site.

## Chasing the long tail

My discovery about auto-generated content got me excited about Is It Keto again. It's been successful at attracting visitors, but I was never able to find a way to make growth profitable. [Hiring writers](/hiring-content-writers/) costs me $50-100 per article, but articles typically earn less than $1/month in revenue.

Page generation would be a gamechanger because it substantially lowers my costs. The cost would be *so* low that I could produce articles that nobody else would bother creating. For example, if you Google "are pringles keto?" none of the results directly address the question.

{{< gallery caption="Nobody has written articles about whether pringles are keto because the search volume is too low." >}}
  {{< img src="pringles-search.png" alt="Google search result for 'are pringles keto?'" maxWidth="375px" hasBorder="true" >}}
  {{< img src="pringles-planner.png" alt="Google keywords planner results for pringles and keto related searches" maxWidth="450px" hasBorder="true" >}}
{{</ gallery >}}

According to Google's [keyword planner](https://ads.google.com/home/tools/keyword-planner/), there are only ~70 searches per month for searches like "are pringles keto?" Whoever took the #1 spot would only get ~50 clicks per month. Is It Keto earns ~$0.01 per visitor, meaning the Pringles article would bring in about $6 per year. It's hard to justify the time or cost of crafting a dedicated article for so few readers.

The numbers change if I can generate entire batches of articles with roughly the same effort other authors take to generate one article. There are probably 25 different brands and varieties of chips that have similar search traffic. If I make a template that covers them all, that's $150 per year in extra revenue, which is a lot more appealing. I can likely re-use most of the content for chips for 1,000 other snack foods, so maybe that's an extra $6k year in revenue.

Zapier is a successful product that provides plumbing to connect different apps that are not aware of each other. They used a similar SEO strategy to build their business. They generate a dedicated page for every possible combination of their partner apps, so if you search "the gift goose + connectwise manage," the top result is Zapier's [auto-generated page](https://zapier.com/apps/the-gift-goose/integrations/connectwise-manage):

{{< img src="gift-goose-connectwise.png" alt="Screenshot of Zapier's page for The Gift Goose + ConnectWise" maxWidth="500px" hasBorder="true" caption="Zapier ranks highly for thousands of search queries because they auto-generate pages for every pair of applications they support." >}}

According to [Ahrefs' backlink checker](https://ahrefs.com/backlink-checker), there are zero links to that page, yet it's the #1 search result. Why? Because search volume is so low that nobody else would bother to create a page. But Zapier has templates set up so that it costs them next to nothing to generate a page that perfectly matches the query.

## I finally have an unfair advantage

[*Startup*](https://gimletmedia.com/startup/) is one of my favorite podcasts, and I often think back to this moment in one of the early episodes where the podcast's host and founder was seeking investment from Chris Sacca, a well-known venture capital investor. Sacca asks the host:

>I want to invest in companies that have an unfair advantage. What's your unfair advantage?

One of the reasons I keep abandoning Is It Keto is that it's never played to my strengths. I write well, but too many other keto sites have good writing for me to win on that front. I consider myself a good developer, but software has never played a key role in the site. A non-developer could have produced essentially the same thing with WordPress or Squarespace.

Pivoting to auto-generated pages gives me an advantage over other keto sites because none of them seem to have developers on staff. They probably have developers that help them maintain their WordPress setups or to create one-off tools like a keto calculator. Those things are in a different category of software engineering than what I'd be doing, which is creating and maintaining a data pipeline that runs smoothly for years. And that's great because that's the type of development I do best.

Another advantage is that I already have a database of nutritional information. The USDA offers [a free, open database of food data](https://fdc.nal.usda.gov/), but their search is terrible. A query like "apples" [yields 17,000 results](https://fdc.nal.usda.gov/fdc-app.html#/?query=apples), so you have to pick through to find the most appropriate match. I went through this process for [Zestful](https://zestfuldata.com), so I already have coverage for most foods.

## What it will look like

I've already begun auto-generating content for Is It Keto. I've created 13 new articles about different fruits. Fruits are the easiest articles because they require no analysis of artificial ingredients, so the article is usually a straightforward, "No, it's not keto-friendly."

{{< img src="apricots-dates.png" alt="Cover image for Ahrefs' Blogging for Business Course" maxWidth="800px" caption="I've begun auto-generating pages based on each food's nutritional information." hasBorder="true" >}}

One of the most popular pages on Is It Keto is ["Is Russell Stover Sugar-Free Chocolate Candy Keto?"](https://isitketo.org/russell-stover-sugar-free-chocolate-candy) I wrote that article by hand, but re-reading it today, I could largely re-use the content to build a template for other chocolates and candies:

{{< img src="templatizing-articles.png" alt="Cover image for Ahrefs' Blogging for Business Course" maxWidth="850px" caption="How I could recycle content from my [Russell Stover Sugar-Free Chocolate](https://isitketo.org/russell-stover-sugar-free-chocolate-candy) page into dozens of articles about similar foods" hasBorder="true" >}}

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

Its month-over-month sales jumped, but Zestful is historically bursty. Anything from $0 to $100 in monthly revenue is normal.

### [What Got Done](https://whatgotdone.com)

What Got Done is my weekly work journaling app. I tried to build it into a business last year, but relegated it to "hobby project" status after it [failed to gain traction](/retrospectives/2019/08/). I still use it regularly myself, and I sometimes add features on weekends or evenings.

Recently, I was looking at my [user dashboard](https://userkit.io/) and noticed that the site had 370 registered users. On average, the site gets one new user every day:

{{< img src="whatgotdone-april-signups.png" alt="Graph of 2-3 signups per day throughout April" maxWidth="600px" caption="What Got Done averages about one new user signup per day." hasBorder="true" >}}

The problem is that, of these 370 registered users, the total number who actually use the site is about... five.

Users sign up and then immediately abandon the app. Sometimes they'll post updates for a week or two, but they almost always end up fading away within weeks. With so many people interested enough to sign up, I feel like my failure to retain them is a huge missed opportunity to grow the site.

I suspect two main causes:

* Lack of onboarding
* Failure to support habit-building

One of the most valuable pieces of feedback [my friend DK](https://www.dkthehuman.com/) gave me after testing out my app was that the signup process [left him feeling lost](https://youtu.be/JnAAkjS4x6k?t=430). The [first thing](https://youtu.be/JnAAkjS4x6k?t=240) a user sees after signing up is a giant blank textbox and vague instructions about how to fill it. I could certainly do more to let the app help the user create updates in smaller, incremental steps so that it doesn't feel like one massive task.

The other problem is that What Got Done generates the most value for people who use it consistently, but it offers no tools to help people build a habit of using the site. I could fix this by introducing options to get email reminders or calendar events. I could also reward users for consistent participation via points or badges.

## Interesting discoveries

### [Ahrefs Academy: Blogging for Business](https://ahrefs.com/academy/blogging-for-business/)

{{< img src="blogging-for-business.jpg" alt="Cover image for Ahrefs' Blogging for Business Course" maxWidth="600px" caption="In March, Ahrefs released [their premium content marketing course](https://ahrefs.com/academy/blogging-for-business/) for free." linkUrl="https://ahrefs.com/academy/blogging-for-business/" >}}

In response to COVID-19, Ahrefs released their $800 course on content marketing [for free](https://twitter.com/timsoulo/status/1240151594328621056). I generally prefer to learn by reading rather than watching online videos, but I've been impressed with this series.

One lesson from the video that really hit home for me is that [traffic is a vanity metric](https://youtu.be/y5kQXogrLN0?t=53). If you're blogging as part of your business, the number of visitors you attract is only an intermediate goal to something else, like selling products or acquiring new customers.

The series itself is a great example of elegant content marketing. Throughout the course, they're suggesting ways to strategize about writing content that will attract search traffic, and then they always show Ahrefs tools that can help. They build credibility by sharing useful information, then when they show you their tool, you trust that it's helpful.

Companies often get this backwards; they start with their own product and show you all the ways it can help you. That turns people off because the company hasn't yet earned the viewer's trust, so the content just feels like advertising.

Ahrefs [is undecided](https://twitter.com/slagter/status/1240197698525028352) about how long the course will remain free,  so I've archived my copy for future reference.

## Wrap up

### What got done?

* Published two blog post that reached the front page of Hacker News.
  * This continues my lucky streak on Hacker News with [five frontpage articles in the last four months](https://news.ycombinator.com/from?site=mtlynch.io).
* Launched the paid version of [Portfolio Rebalancer](https://assetrebalancer.com).
* Put infrastructure in place to generate new [Is It Keto](https://isitketo.org) articles automatically.

### Lessons learned

* Traffic is a vanity metric.
* Programmatically generated pages are potentially a way for developer-authors to outcompete authors using generic publishing platforms like WordPress.

### Goals for next month

* Add 100 new articles to Is It Keto (a ~50% increase in the current corpus size).
* Publish one new blog post.