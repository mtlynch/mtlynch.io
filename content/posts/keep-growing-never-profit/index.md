---
title: How to Grow Quickly and Never Turn a Profit
description: A eulogy for my failed online business.
tags:
- is it keto
- startups
discuss_urls:
  hacker_news: https://news.ycombinator.com/item?id=20062264
  indie_hackers: https://www.indiehackers.com/post/37ea42382d
  reddit: https://redd.it/bvap1u
date: '2019-05-31'
images:
- keep-growing-never-profit/cover.jpg
---

{{< img src="cover.jpg" alt="How to Keep Growing and Never Turn a Profit (cover image)" maxWidth="1000px" >}}

Early last year, I launched a nutrition site called [Is It Keto](https://isitketo.org). From November 2018 until March 2019, the site was my full-time focus. Every month, visitors increased by 50% to 150%, an exhilarating growth rate that far outpaced any of my previous projects.

There was only one pesky detail standing between me and tremendous profits: money. For every dollar I spent on the site, I earned back ten cents. For my non-business-savvy readers, a -90% return on investment is considered less-than-stellar. At the end of March, the site's financial future seemed bleak, so I shelved the project.

This is my postmortem for Is It Keto. I'll talk about where I succeeded, how I could have done better, and what I wish I knew from the start.

## How I made money

Is It Keto had a simple business model. Every article explained why a food did or did not fit [the keto diet](https://www.ruled.me/guide-keto-diet/). If a food was keto-friendly, the site displayed an affiliate link for the reader to purchase it from Amazon. I received a commission on every order.

{{< img src="isitketo-affiliate-links.jpg" alt="Is It Keto screenshot showing affiliate links" caption="Amazon Affiliate links on Is It Keto" maxWidth="500px" >}}

{{< img src="revenues.jpg" alt="Google Analytics screenshot" caption="Is It Keto monthly revenue" maxWidth="763px" hasBorder="True" >}}

## How I lost money

My most significant ongoing cost was content. Early on, I wrote every article myself, but I hired writers to help scale the site. It got complicated, but I'll say more about that [below](#good-writing-is-expensive).

The only other cost worth mentioning is development. I wrote almost all the code, but a friend briefly freelanced for me while she had time between projects.

{{< img src="costs.jpg" alt="Donut chart of expenses" caption="Is It Keto expenses" maxWidth="600px" >}}

## What went well

### I chose "done" over "perfect"

Design is not my strong suit. I've wasted hours moving buttons five pixels back and forth, wondering which version looks better.

To avoid this with Is It Keto, I budgeted fixed-time blocks for design polish. For example, when a page looked ugly, I set aside exactly 90 minutes to improve it. At the end of the 90 minutes, I published the changes as long as they were an improvement over the original. Rarely did the result feel satisfying in the moment, but when I revisited it the next day with fresh eyes, it usually looked fine.

The same logic applied to code. It pains me to ship code that's likely to create maintenance headaches later, but for an experimental project, there might not be a "later." Code sins were forgivable, so I committed many of them. When they came back to bite me, I paused development to clean things up, but that was seldom necessary and never catastrophic.

### I worked with familiar tools

My project before Is It Keto was a recipe search tool called [KetoHub](https://ketohub.io). Envious of the cool kids with their hip frontend frameworks, I built the site using [Angular](https://angular.io) and [Firebase](https://firebase.google.com). At first, this was fun because those technologies do seemingly magical things. My progress slowed to a crawl, however, when I ventured beyond basic examples. The magicalness of the tech stack prevented me from understanding how my app worked.

Reeling from this pain, I wrote Is It Keto using Python 2.7, App Engine Standard, and Cloud Datastore. These are relatively old and unsexy technologies, but it's the same setup as a site I maintained for several years. Is It Keto keeps all of its logic on the server, which makes it uncool but trivial to reason about.

This wasn't a pure win, as many of the web libraries that I wanted weren't available for my environment. Nevertheless, I understood my tech stack, so there was always a way forward, even if it was inefficient or hacky. Contrast this with Angular, which routinely blocked me for days as I struggled to achieve something simple through its countless layers of abstraction.

### I published monthly goals and stuck to them

At the end of each month, I wrote a [retrospective](/retrospectives/) detailing the work I did on Is It Keto. I also declared concrete, measurable goals for the following month and graded myself on my goals from the previous month. This practice was tremendously valuable for both course-correction and maintaining focus.

{{<notice type="info">}}
My inspiration for assigning letter grades to my goals came from [Cory Zue](http://www.coryzue.com/writing/), whose blog posts and retrospectives I recommend highly.
{{< /notice >}}

When you're launching a new project, it's easy to go down a rabbit hole and forget to revisit your strategy or assumptions. Writing a retrospective forces you to take a step back and reassess what you're doing.

A good example of this was when I outsourced all of Is It Keto's Twitter promotion to a low-cost virtual assistant. It saved me so much time that I couldn't wait to brag about it in my retrospective. But in trying to explain to my readers why it was such a win, [I realized it wasn't](/retrospectives/2019/03/#twitter-on-auto-pilot-but-its-not-scaling).

My virtual assistant saved me time, but Twitter generated less than a penny for every dollar I invested in it. Without the retrospective, I would have continued happily paying my virtual assistant and never examined whether Twitter merited investment in the first place.

Declaring my goals publicly also protected me from wandering off into the weeds. Here's a conversation I had with myself about a feature I was excited to build:

>**Me (Feature-happy)**: I should integrate with the USDA's public database! That way, every Is It Keto page can display the food's nutritional information.
>
>**Me (Goal-oriented)**: This month's top goal is to earn $50 in revenue. Would integrating with the USDA database help achieve that?
>
>**Me (Feature-happy)**: Maybe! It would improve the site experience and attract more users.
>
>**Me (Goal-oriented)**: But it would take three weeks of development time. Given the same timeframe, are there other tasks that have a higher probability of yielding $50 in revenue?
>
>**Me (Feature-happy)**: (deflated) Yes...

Without explicit goals, the feature-happy version of me would have run rampant, building features that were fun but irrelevant to the bottom line.

## What needed improvement

### I obsessed over metrics

It was easy for me to rationalize the many daily visits I paid to my traffic and revenue dashboards. "Of *course* I have to check my metrics. They're critical to understanding the health of my site." Many founders fall into the same trap.

Checking metrics is ["shallow work"](/book-reports/deep-work/#key-takeaways): it doesn't require deep focus or critical thinking, but it *feels* productive. It is, of course, useful for a site owner to know their traffic and revenue numbers, but not at the frequency that I was checking.

{{< img src="google-analytics.jpg" alt="Google Analytics screenshot" caption="Is It Keto page views - March 2018 through April 2019" maxWidth="800px" hasBorder="True" >}}

There's something enticing about these dashboards beyond the graphs and stats. They hold the promise of little mental reward pellets.

As I toiled away on the site in solitude, a spike in visitors or a jump in revenue made my day. The problem was that for every "good" day where I made $3-4 in revenue, there were five days where I earned nothing and felt miserable.

{{< img src="amazon-affiliate.jpg" alt="Screenshot of Amazon Affiliate Dashboard" caption="Amazon Affiliate earnings - March 2019" maxWidth="800px" >}}

Starting in February, I limited my metric checking to one thirty-minute session per week. I do it Friday afternoons as something to look forward to before the weekend.

Until I broke the habit of constant stat-checking, I never realized how much space it occupied in my brain. Without it, I'm far more focused and less dependent on short-term results.

### I forgot that food is cheap

My first experiment with affiliate links was on this blog. I don't write to make money, but many of my articles already linked to Amazon, so I figured Jeff Bezos might as well throw some money my way.

In good months, the blog earned up to $150 from affiliate links. Naturally, I thought, "If I earn $150/month without even trying, imagine what I could make with a site that focused on affiliate links!"

My fatal flaw was in neglecting prices. The affiliate links on my blog were for things like [PC hardware](/building-a-vm-homelab/) and [hobby electronics](/greenpithumb/), where customers easily spend hundreds to thousands of dollars per order.

Is It Keto linked to food products. One of the top affiliate clicks is [Propel Fitness Water](https://isitketo.org/propel), which sells for as little as $6 per case, so it requires far more users to match the revenues from my blog.

### I didn't think through my monetization strategy

To help prioritize future articles, Is It Keto tracks the most commonly-requested foods that lack a dedicated page. Here are the top five:

>
1. Mushrooms
1. Beef
1. Sausages
1. Peppers
1. Beer

See the problem?

People don't order any of those things from Amazon. The issue extends far beyond those five. Among the top 100 requests, only a handful are products people might buy through Amazon. This means that there's a massive, revenue-draining disconnect between the foods that readers seek out on Is It Keto and the items they purchase online.

In evaluating business ideas now, I think about revenue from start to finish. For me to receive a dollar of revenue, what sequence of events must occur? Had this been part of my evaluation process for Is It Keto, hopefully I would have spotted the red flag when I got to, "And then the customer asks Amazon to mail them [a head of lettuce](https://amzn.to/2WgKYLD) so that I can collect my affiliate fee."

{{< img src="amazon-lettuce.jpg" alt="Google Analytics screenshot" caption="For only about 10x what you'd pay at the supermarket, Amazon will mail you [a single head of lettuce](https://amzn.to/2WgKYLD)." maxWidth="800px" hasBorder="True" >}}

## What I wish I had known

### Search engines have a substantial lag

Today, if you ask Google ["are cheese whisps keto?"](http://www.google.com/search?q=are%20cheese%20whisps%20keto%3F)  it responds with a list of results that all fail to answer the question.

{{< img src="cheese-whisps.jpg" alt="Google Analytics screenshot" caption="Google results for [\"are cheese whisps keto?\"](http://www.google.com/search?q=are%20cheese%20whisps%20keto%3F)" maxWidth="450px" hasBorder="True" >}}

Is It Keto [has the answer](https://isitketo/whisps), but Google ignores it. For products like [Metamucil](http://www.google.com/search?q=is%20Metamucil%20keto%3F) or [Lily's Chocolate](http://www.google.com/search?q=is%20Lily%27s%20Chocolate%20keto%3F), Google places Is It Keto among the top results, so why no love for the Whisps page?

For new sites, Google ranks you low in results and then bumps you up or down depending on how often users click through to your page. That process is painfully slow. The pages on Is It Keto that currently enjoy top placement took months to get there, and 90% of my articles remain buried too far in Google results for anyone to see.

Having this knowledge up front would have made me more cautious about pursuing a content site. Most online businesses flop, so I pursue projects that let me fail fast and avoid sinking years into a dud. The sluggish settling pace of search engine rankings stretches out this feedback loop inconveniently far.

One way to accelerate this process is to earn links from other highly-ranked pages. If [*Men's Health Magazine*](https://www.menshealth.com/) linked to Is It Keto, search engines would consider my site more relevant and deserving of higher search rankings. In a strategic misstep on my part, I never created content that incentivized other sites to link to Is It Keto, save for a few [desperate blog posts](https://isitketo.org/blog) near the end that failed to win any attention.

### Good writing is expensive

The typical Is It Keto article took me 15-30 minutes to write. However, writing is mentally taxing, so it burned me out quickly.

I estimated that outsourcing the content would cost about $5-15 per article. A recent liberal arts grad would probably work for $15-25/hr and produce two or three articles per hour.

Boy, was I off.

I received applications from over 30 writers, did paid trials with about 10 of them, and never managed to bring costs [below $46 per article](/retrospectives/2019/03/#diving-into-my-content-costs). There certainly are writers who work for $15 per article, but they churned out barely-intelligible garbage. There's a hefty premium for people who produce the kind of clear, concise writing I wanted for the site.

There was a *ton* I didn't know about hiring writers. Expect a full-length post in the next few months that goes into more detail about what I learned.

## Going forward

Fortunately, Is It Keto costs almost nothing to run in the background. It fits in App Engine's free tier and requires no maintenance. Its only ongoing cost is $12 per year for the domain name.

It produced $82 in revenue last month and $103 this month, so it generates profit on a monthly basis, provided I don't tinker with it. Overall the site's still $4.7k in the red.

While I'm disappointed that Is It Keto never produced positive returns, it was an excellent opportunity to learn from failure. Going forward, I'll be sure to avoid these missteps so that I can make new, exciting mistakes on my future projects.

---

*Cover art by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*