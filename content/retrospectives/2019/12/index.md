---
title: I'm Probably Procrastinating
description: I need to spend more time talking to customers.
images:
- /retrospectives/2019/12/revenue-graph.jpg
date: '2019-12-05'
---

## Highlights

* A change to Zestful's website boosted it to the front page of Google results within days.
* I'm going to try to make a better version of a decades' old application for managing machine shops.
* I'm doing lots of coding to avoid talking to customers.

## Goal Grades

At the start of each month, I [declare what I'd like to accomplish](/retrospectives/2019/11/#goals-for-next-month). Here's how I did against those goals:

### Publish a new blog post about eliminating distractions from email and social media

* **Result**: I published ["Eliminating Distractions from Social Media, Email, and StackOverflow"](/eliminate-distractions/)
* **Grade**: A

I published this post as planned but was surprised how little a response it generated. I've had a string of posts that I knew were too narrowly-focused to get widespread attention, but I thought a blog post about focus in the age of social media would attract more interest.

It got a small amount of traction [on Reddit](https://redd.it/dva6b3) and [Twitter](https://twitter.com/deliberatecoder/status/1193942635960029184), but it didn't attract many readers overall (around 800 total to date).

On the positive side, I've heard good feedback from the people who did read it. A couple people told me that they picked up tips from the article that improved their productivity, so that's been rewarding to hear.

### Interview five customers for a potential new business

* **Result**: Interviewed three customers
* **Grade**: C

In a *sense*, I had three customer interviews, but for a very generous definition of "customer interview." Only one was a true customer interview. Another was a general meeting with someone unlikely to become a customer, and the last was a brief in-person discussion and an invitation to follow up in December.

Given that my only real goal for the month was to interview customers, three is very few. It's partially due to my aversion to sales and my tendency toward trying to solve problems with code. There's also a problem in that this requires networking, and it's hard to begin networking from a cold start.

## Stats

### [Is It Keto](https://isitketo.org)

<figure class="half">
  {{< img src="revenue-graph.jpg" alt="Is It Keto revenue graph" maxWidth="600px" hasBorder="True" >}}
  {{< img src="view-graph.jpg" alt="Is It Keto traffic graph" maxWidth="600px" hasBorder="True" >}}
</figure>

| Metric                    | October 2019 | November 2019 | Change                                       |
| ------------------------- | ------------ | ------------- | -------------------------------------------- |
| Unique Visitors           | 26,315       | 27,981        | <font color="green">+1,666 (+6%)</font>      |
| Total Pageviews           | 66,578       | 69,090        | <font color="green">+2,512 (+4%)</font>      |
| Domain Authority (Moz)    | 13           | 14            | <font color="green">+1 (+8%)</font>          |
| Ranking Keywords (Moz)    | 1,574        | 1,654         | <font color="green">+80 (+5%)</font>         |
| AdSense Earnings          | $75.65       | $151.07       | <font color="green">+$75.42 (+100%)</font>   |
| Amazon Affiliate Earnings | $159.02      | $118.00       | <font color="red">-$41.02 (-26%)</font>      |
| Meal Plan Sales           | $23.87       | $0.00         | <font color="red">-$23.87 (-100%)</font>     |
| **Total Earnings**        | **$258.54**  | **$269.07**   | **<font color="green">+$10.53 (+4%)</font>** |

Things are improving a bit, but I think October-December is the worst time of year for diet-related websites. I'm expecting a huge surge in January, as people begin exploring the keto diet as part of New Year's resolutions.

Amazon Affiliate Earnings have dropped to their lowest levels since May, when traffic was half the size it is today. AdSense is up a bit because I fixed a bug in my AdSense integration. The fix went live in mid-November, so I'm expecting an even bigger increase in AdSense revenue next month, which will have the fix in place for the full month. I'm still offering meal plans for sale, but I've virtually ended all efforts to sell them (more on that [below](#giving-up-on-meal-plans)).

### [Zestful](https://zestfuldata.com)

| Metric         | October 2019 | November 2019 | Change                                       |
|-------------------------------|---------------|----------------------------------------------|
| Total Earnings | $3.89        | $65.33        | <font color="green">+$61.44 (+1,580%)</font> |

Zestful has been picking up slowly over the last few months. I've had a few big months in the past, but it was usually from people using it for large, one-off tasks. Over the past few months, I've seen consistent, growing usage from several different users.

## Giving up on meal plans

For the last few months, I've been exploring the possibility of selling meal plans on Is It Keto, but it's been harder than I expected. In October, I [only sold two meal plans](/retrospectives/2019/11/#my-many-attempts-to-sell-meal-plans) for a total of $23.87 after fees. I tried lots of tweaks to the sales page, adjustments in pricing, and changes to the rest of my site to drive visitors to the sales page, but none of it seemed to make a difference.

In November, I tried a few more tweaks to the sales pages:

* I [added a photo](https://isitketo.org/meal-plans/mushroom/) to one of the meal plans
* I added a customer testimonial
* I removed the price from the "Download" button

None of those changes made any difference.

It was particularly discouraging when clicks remained low even after I changed the text on the purchase button to "Download PDF." At that point, a user might assume that it's a free download, and they *still* weren't clicking.

{{< img src="strip-price.jpg" alt="Before and after screenshots of removing price" caption="Removing price from download button" maxWidth="600px" hasBorder="True" >}}

I'm sure there's a way to sell them successfully, but I spent 6+ weeks on it, and it felt like way too long. I had replaced a portion of AdSense ads with my own ads for the meal plans, but I would have made far more money from AdSense, so I got rid of my self-ads. I also took "Meal Plans" out of the site's main navigation bar and removed it from the homepage except for [a mention in the site's blog](https://isitketo.org/blog/announcing-meal-plans/).

## Rewriting the Zestful website out of spite

I wrote the Zestful website last year, and it was [two weeks of misery](/shipping-too-late/#its-okay-because-its-sales-coding). Mostly because I wrote it in Angular, the only frontend framework I knew at the time (...that I ["knew"](/retrospectives/2019/12/dr-evil-air-quotes.gif)). Since then, I've learned [Vue.js](https://vuejs.org/), which I strongly prefer, and I have much more web design under my belt.

Still, the Zestful website has dragged along as an Angular site. I desperately wanted to rewrite it in Vue, but I couldn't justify a from-scratch rewrite of a website I rarely touch.

Then, I looked at Google search results. For the query `parse ingredients`, Zestful came up on page three, which is basically invisible. Even more frustrating, page one featured a Zestful competitor, the only other company that exclusively offers ingredient parsing as a service.

{{< img src="zestful-competitor.jpg" alt="Screenshot of Zestful competitor" caption="Competitor to Zestful that was outperforming it in search results" maxWidth="600px" hasBorder="True" >}}

From testing the competing service, I could tell that they created it the same way that I created Zestful. They [wrapped an old open-source library in a Web UI](/resurrecting-1/). Except they didn't develop it further, fix any of the bugs, or add any of the features that I did.

So, it irritated me that they consistently beat me in search results. I couldn't figure out why! More sites linked to Zestful. I had more content, and I updated my site more frequently. The only explanation I could think of was that Zestful was rendered client-side, and my competitor's site was rendered server-side. That meant that they could populate SEO-relevant HTML tags that need to be populated server-side.

I thought about ways I could achieve server-side rendering on the Zestful site. Angular supports it through [Angular Universal](https://angular.io/guide/universal), but I once tried to move [KetoHub](https://ketohub.io) to Angular Universal and burned over a week with nothing to show for it. Plus, I definitely didn't want to dig myself deeper into the pit of Angular.

Vue has a server-side rendering solution called [Nuxt](https://nuxtjs.org/), but I wasn't too crazy about the idea of running an entire Node server just to render a few pages server-side. Looking closer, I found that Nuxt supports [statically generated pages](https://nuxtjs.org/guide/#static-generated-pre-rendering-). This meant that I could pre-generate a few HTML files and host them with dumb static hosting (the way I host this blog). But I'd get the tooling of Vue and the convenience of a static site.

I couldn't find any good examples of simple static page generation with Nuxt, but I got my own [hello world](https://github.com/mtlynch/hello-world-vue-pre-rendered) working through some trial and error. Then I went on a mad coding marathon for a day and a half where I ported [Zestful's website](https://zestfuldata.com) from [Angular](https://github.com/mtlynch/zestful-frontend) to [Vue + Nuxt](https://github.com/mtlynch/zestful-frontend2). Now, Zestful has all the proper server-side tags like `<link rel="canonical" ...>` and per-page `<title>` tags.

Redesigning the UI was not the goal, but I had to reimplement a lot of the CSS from scratch since I also switched CSS frameworks from [Material Design](https://material.io/design/) to [Bootstrap](https://getbootstrap.com/). I've had a lot more experience with CSS since designing Zestful, so I took the opportunity to fix up a few small things that bothered me in the previous design:

{{< img src="zestful-rewrite.jpg" alt="Screenshot of Zestful competitor" caption="Competitor to Zestful that outperformed it in search results" maxWidth="600px" hasBorder="True" >}}

A few days later, I searched "parse ingredients" in Google and saw this:

{{< img src="first-page.jpg" alt="Zestful on first page of Google results" caption="Zestful climbs to first page in Google results" maxWidth="500px" hasBorder="True" >}}

Whoo, first page! And I'm one position ahead of the competitor that inspired the rewrite.

I'm a bit skeptical because I've never seen any change affect Google rankings so suddenly and drastically. I'm optimistically monitoring my Google Search Console to see how my stats change after this rewrite in the long-term.

## But it's all procrastination

So, tinkering with Zestful and Is It Keto *seems* productive, but it doesn't serve my high-level goal of finding a new, [big swing idea](/retrospectives/2019/10/#thinking-bigger). Looking back at the month, I spent too much time on coding tasks and too little time on prospecting customers.

That said, the outputs do make it seem a little skewed. I did spend time attending events and researching companies, but I ended up eliminating most prospects, so there are fewer tangible outputs from those activities.

## The disconnect problem in finding software business ideas

One of the big lightbulb moments I had in running my own business was reading the book [*Start Small, Stay Small*](https://amzn.to/2HZT8lA) by Rob Walling ([my notes](https://mtlynch.io/book-reports/start-small-stay-small/)). He pointed out that the advantage of solo developers is that they can build solutions for niche audiences and still make money.

Walling gave the example of a company that makes accounting software specifically for freelance web developers. Despite huge competitors like QuickBooks or Xero, the specialty accounting software succeeds because web developers are willing to pay for a product that focuses on their specific needs. Walling's advice, therefore, is to write software for small niche businesses.

The challenge, I'm learning, is connecting with those niches.

Suppose, for example, that you're the owner of a custom auto shop. You have to purchase car parts from many different boutique suppliers all over the country, and each of them has a different payment system and ordering process. To do your accounting properly, you have to comb through your email and file each receipt in your accounting software.

{{< img src="neonbrand-ZSz1m4JPDqU-unsplash.jpg" alt="Zestful on first page of Google results" caption="That iron cabinet would be less dirty if this auto shop had better software." maxWidth="700px" >}}

If you saw this as a developer, there are a few problems you could solve with software. Maybe you could create a service that allows the shop owner to forward their receipts to you. You'd automatically parse them and import the data into the customer's QuickBooks account. Or, if you're ambitious, maybe you develop a marketplace for custom auto parts so that the owner doesn't have to hunt parts across different websites.

But there's the disconnect problem! If you're the owner of the custom auto shop, it probably doesn't even occur to you that someone could write software to solve these problems. You may be so accustomed to your process that you don't even recognize the problems in the first place.

I, as the developer, don't have a way of discovering that the business owner has this problem because I don't know their workflows and pain points. I could ask them, of course, but it's sort of a strange proposition:

>**Me**: I'd like to sell you a software product to automate the expensive or tedious parts of running your business.
>
>**Business owner**: Great! What does your software do?
>
>**Me**: I don't know.
>
>**Business owner**: ...?
>
>**Me**: I don't know what software you need, so in order to find out, you have to spend a few hours teaching me, a stranger, about your business.
>
>**Business owner**: ...
>
>**Me**: Also, there's a good chance I'll decide there isn't a profitable opportunity for me, so I'll end up not making anything that solves any of your problems.
>
>**Business owner**: *[calls security]*

So, that's a bit of what I'm running into right now. There are probably plenty of businesses near me that would pay me to build them a software product, but I'm not aware that they exist. And when I find businesses that I *suspect* could benefit from a new software solution, I don't have a way of demonstrating my value to them until they spend a few hours explaining their work to me.

{{<notice type="info">}}
**Sidenote:** Maybe that auto shop example I made up is actually a good idea!<br><br>**Note to self**: *Research custom auto shops.*
{{< /notice >}}

## Interviewing machine shops

In prospecting local businesses, I noticed that all of the small companies around me had websites by the same web designer, [Montague WebWorks](https://montaguewebworks.com/). I emailed the owner, Mik, asking if he had any advice for someone looking to create software for small, local businesses. He kindly invited me to his office, and during our discussion, he recommended that I check out [Valley Venture Mentors](https://montaguewebworks.com/), an organization that provides funding and mentorship for local startups.

I attended a Valley Venture Mentors event and met the owner of a machine shop. We talked about the available software options for machine shops, and they seem pretty bad. Apparently, one of the most popular products is an application called JobBOSS, which looks like an app that time traveled here from 1994. From watching their [product demos](https://www.youtube.com/watch?v=KlNFb2APQ60), the entire application seems to be just a thin UI over a SQL database.

{{< img src="job-boss-quote.jpg" alt="Screenshot from JobBOSS" caption="Do machine shop workers really like maintaining databases?" maxWidth="800px" hasBorder="True" >}}

It seems fairly bloated and complex, so my hope is that I can find machine shops who would pay for a simpler version of JobBOSS that caters to a more narrow use case.

My goal for December is to approach machine shops that using software like this and interview them about what they like or dislike about their existing processes and software.

## Recommendations

To close out, here are a couple of neat things I discovered this month:

### Whole page screenshots in Firefox

I often take screenshots of websites, but I struggle to capture all of the relevant information into a single screen. This is especially difficult when taking screenshots of mobile websites, where the viewport is tiny. Then, I noticed that Firefox's context menu has a "Take a Screenshot" item.

{{< img src="ff-screenshot.jpg" alt="Take a screenshot feature in Firefox" caption="Firefox's amazing, built-in screenshot feature" maxWidth="600px" hasBorder="True" >}}

It lets you save the entire page in two clicks:

{{< img src="ff-screenshot-select.jpg" alt="Take a screenshot feature in Firefox" caption="Firefox allows you to screenshot an entire page, not just the visible portion" maxWidth="600px" hasBorder="True" >}}

I can take a screenshot of the [entire Is It Keto homepage](/retrospectives/2019/12/isitketo-mobile.jpg) on mobile without stitching together a bunch of separate screenshots. Really handy feature!

### Bruno Simon's 3D Resume

Web developer [Bruno Simon](https://bruno-simon.com/) made his portfolio page into a slick 3D driving game. It's surprisingly performant for a game that runs entirely in the browser plugin-free, and it's delightfully fun to explore for a few minutes.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">After months of hard but fun work, I&#39;m glad to finally show you my new portfolio 🚗<a href="https://t.co/rVPv9oVMud">https://t.co/rVPv9oVMud</a><br><br>Made with <a href="https://twitter.com/hashtag/threeJS?src=hash&amp;ref_src=twsrc%5Etfw">#threeJS</a> and <a href="https://twitter.com/hashtag/canonJS?src=hash&amp;ref_src=twsrc%5Etfw">#canonJS</a> <a href="https://t.co/zrq8rpILq1">pic.twitter.com/zrq8rpILq1</a></p>&mdash; Bruno (@bruno_simon) <a href="https://twitter.com/bruno_simon/status/1187332718088069121?ref_src=twsrc%5Etfw">October 24, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Wrap up

### What got done?

* Rewrote the Zestful website in Nuxt + Vue, so now it's pre-rendered and SEO-friendly.
* Published the blog post ["Eliminating Distractions from Social Media, Email, and StackOverflow"](/eliminate-distractions/)
* Refactored my Jinja templates on Is It Keto, which revealed some bugs and allowed me to clean up [some of the UI](https://imgur.com/sQV6kCq).
* Reviewed and published four new articles on Is It Keto.

### Lessons learned

* Stop procrastinating, and go talk to more customers.
* Server-side rendering seems to make a huge difference in search engine rankings.

### Goals for next month

* Conduct five customer interviews.
* Publish a new blog post explaining the details of my [Hello World using Vue pre-rendering](https://github.com/mtlynch/hello-world-vue-static).
* Publish two new Is It Keto articles.

---
*Auto shop photo by [NeONBRAND](https://unsplash.com/@neonbrand?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/auto-shop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).*