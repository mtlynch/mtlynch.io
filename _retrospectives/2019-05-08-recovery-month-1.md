---
title: Recovery Month
excerpt: How I doubled revenues by doing absolutely nothing.
header:
  og_image: images/retrospectives/2019/05/amazon-earnings.jpg
---

# One-Line Summary

I doubled revenues by doing absolutely nothing.

# Highlights

* Is It Keto's revenue doubled to $82.44 with zero effort on my part.
* My task journaling app is almost ready for publication.
* I've begun setting up meetings with potential customers about my next project ideas.

# Goal Grades

At the start of the month, I [gave up on Is It Keto](/retrospectives/2019/04/#calling-it-quits) and set goals to help me pursue other projects. Here's how I did against those goals.

**Learn Vue.js**

* **Result**: Went through the [Vue guide](https://vuejs.org/v2/guide/) and used Vue to implement a basic site.
* **Grade**: A

I'm definitely not fluent in Vue, but I'm "conversational." I can create a website with the features that I want without getting tripped up by the language itself, which is more than I could say for Angular after ~6 months experience in it.

**Explore ideas for a new project**

* **Result**: Reached out to a few different potential customers to schedule meetings
* **Grade**: B-

I reached out to ~8 publishers and writers. Most ignored me but some of those cold emails turned into meetings scheduled for May. I also called several local stone quarries who have no idea what I'm talking about when I say I want to write custom software for them, so I need to find another angle to pitch to them.

**Get back to posting full-length blog articles**

* **Result**: I published a new [blog post](https://mtlynch.io/painless-web-app-testing/) about end-to-end testing.
* **Grade**: A

I generally try to publish a new blog post each month, but I hadn't published anything since February because I got busy preparing talks for software conferences. My new blog post was about a flexible testing technique that works with almost any web app. It reached ~14,000 readers in its first two days.

# Is It Keto Stats

Now that Is It Keto is on the backburner, I'm not going to dive as deeply into its metrics, but here's a summary of the most interesting ones:

{% include image.html file="amazon-earnings.jpg" alt="Amazon Earnings - April 2019"  max_width="800px" img_link="true" fig_caption="Amazon affiliate earnings - April 2019" %}

{% include image.html file="google-analytics.jpg" alt="Google Analytics screenshot"  max_width="860px" img_link="true" fig_caption="User sessions - May 2018 through April 2019" %}

| Metric                 | March 2019 | April 2019   | Change |
|------------------------|------------|--------------|--------|
| Total Earnings         | $40.84     | $82.44       | <font color="green">+$41.60 (+102%)</font> |
| Unique Visitors        | 4,001      | 7,262        | <font color="green">+3,261 (+82%)</font> |
| Total Pageviews        | 11,431     | 19,732       | <font color="green">+8,301 (+73%)</font> |
| Domain Authority (Moz) | 9          | 9            | 0 |
| Ranking Keywords (Moz) | 448        | 548          | <font color="green">+100 (+22%)</font> |



# Money for nothing

The nice thing about Is It Keto is that it just grows on its own. It's all just content so there are no maintenance tasks to keep it running, and server costs are negligible ($1.48 for April).

How is this happening? Organic search drives the site's growth, but search engines only put Is It Keto in the top spot for a small number of queries. For example, in January, 25% of the site's total traffic came from just three pages: [Propel](https://isitketo.org/propel), [Pure Via Stevia](https://isitketo.org/pure-via-stevia), and [Greek Yogurt](https://isitketo.org/greek-yogurt). For whatever reason, Google ranked Is It Keto in top spots for queries related to those pages even though I had ~60 other pages at the time that rarely came up in search results.

Now, Is It Keto has 174 food articles, but only 25 of them receive >= 500 search impressions per month. Fortunately, that number keeps growing. Last month, it was only 18. Back in February, only two of my articles appeared 500 times or more in search results. As Google decides that more pages on Is It Keto are relevant for its search queries, site traffic grows even though I'm not doing anything.

It would be great if this growth keeps up. If revenue reaches $500/mo, I can hire back my writer so that I can keep adding content instead of relying on my fixed corpus of articles to grow more popular.

# Simplifying the editing workflow

I worked with freelance writers to write several articles for Is It Keto, but we always had a clunky process for drafts -> feedback -> update. We used Google Docs and margin comments, but Docs doesn't do a great job of highlighting what changed between drafts or keeping context of what comment led to which edit.

If you're a professional developer, you're probably familiar with code review tools like [Github reviews](https://github.com/features/code-review/), [Reviewable](https://reviewable.io/), or [Phabricator](https://www.phacility.com/). 
I suspect that content writers could benefit from similar tools, so I've been reaching out to writers and editors to ask them what kind of tool I could create for them to solve this problem.

{% include image.html file="reviewable.jpg" alt="Screenshot of a code review on Reviewable.io"  max_width="800px" img_link="true" class="img-border" fig_caption="I want to make this but for content instead of code" %}

I started by emailing tech publications because I thought they'd have financial incentive to smooth out this process and they'd be familiar with code review tools. None of them were interested, so I started reaching out to individual copywriters. They seem much more excited, so I've been scheduling meetings with them in May.

If you know a writer or copy editor who might be interested, please ask them to [email me](/about/). I'd love to speak with them.
{: .notice--info}

# An app for rocks

One idea I liked from the book [*Start Small, Stay Small*](/book-reports/start-small-stay-small/) was the "market-first approach." Instead of picking a product and trying to sell it to a particular market, you pick a market you want to sell to, find out what they need, then build that.

I [live in Western Massachusetts](/solo-developer-year-1/#so-i-bought-a-house), so I've been looking for business that exist here that don't exist anywhere else. One such business is quarries that mine [Goshen stone](https://en.wikipedia.org/wiki/Goshen_stone), a popular stone for home landscaping. These businesses have millions in revenue but seem to do most of their business through paper orders and phone calls, so I suspect there's opportunity for automation.

{% include image.html file="quarry.jpg" alt="Photo by Mariana Proença on Unsplash" max_width="800px" img_link="true" fig_caption="Maybe what this quarry really needs is a good SaaS app" %}

The challenge is getting quarry owners to talk to me. They're used to their current way of doing business, so they're reluctant to talk to some guy who seems like he's trying to sell something they're not familiar with. I placed calls in April and got some "We're not sure" responses, so I'll continue to try to set up discussions with them in May.

If you know a stone quarry operator, please [email me](/about/) because I'd love an introduction.
{: .notice--info}

# The What Got Done app

I have a ritual to end each week where I write down shortform notes on everything I accomplished. For the past year, I did this in a giant Google Doc, but I always wished that I had a tool that was more purpose-built for the task and more easily shareable.

My April goal was to learn Vue.js, and there's no better way to learn a new technology than to build a real product with it. So, I did! It's called [What Got Done](https://whatgotdone.com):

{% include image.html file="whatgotdone.jpg" alt="What Got Done screenshot"  max_width="800px" img_link="true" fig_caption="A first look at my new task journaling app, What Got Done" %}

Here's my entry for last week:

* [What Got Done - May 3rd, 2019](https://whatgotdone.com/michael/2019-05-03)

New user registration isn't working yet but keep an eye out for a Twitter announcement in the next couple weeks about a working minimum viable product.

If you'd like to be a beta tester for What Got Done, [email me](/about/).
{: .notice--info}

# Wrap Up

## What Got Done?

* [Presented a talk](/retrospectives/pytexas-2019-notes/) at PyTexas
* Published a new [blog post](https://mtlynch.io/painless-web-app-testing/) about end-to-end testing
* Created a [fake podcast](https://twitter.com/deliberatecoder/status/1112688989306318850) for April Fool's Day
* Got a prototype of [What Got Done app](https://whatgotdone.com) almost working

## Lessons Learned

* Vue.js is a better match for me than Angular
  * Angular has complex features that probably benefit large development teams but which impede solo developers and small teams.
* If your project relies on traffic from organic search, it takes months / years for search enginges to bubble up your pages to their appropriate place in search results.
* Even if you're offering someone a no-risk custom solution for their business, you still need to sell them on it.
  * Business owners are busy and don't have time to take pitches from anyone who wants to sell them something, even if the thing they're promised something tailor-made for their use case. You still need to give them a compelling reason to take a 30-minute meeting with you.

## Goals for May

* Publish a minimum viable product version of What Got Done and see if anyone wants to buy premium features.
* Meet with 10 potential customers for my next product.
* Publish a new blog post.