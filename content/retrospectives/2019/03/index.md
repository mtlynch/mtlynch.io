---
title: 'Is It Keto: Month 6'
description: Do or die time
date: '2019-03-05'
---

## Highlights

* [Is It Keto](https://isitketo.org)'s user visits plateaued in February, but that still represents progress.
* Revenues fell substantially and missed targets for the month.
* I'm going to shelve the project unless I achieve my targets for March.

## Goal Grades

At the start of the month, I laid out some high-level goals. Here's how I did against those goals.

**Achieve $60 in revenue**

* **Result**: Earned ~$11 in revenue (<font color="red">82% below target</font>)
* **Grade**: D

Amazon Affiliate revenue continues to be bursty. A single purchase through one of my affiliate links can yield anywhere from $0.50 to $20. Revenues did not grow the way I hoped, and so I finished the month with a meager $11.

**Add 30 new food pages**

* **Result**: Added 30 new food pages (<font color="green">on target</font>)
* **Grade**: B+

I hit the target, but just barely, and I didn't keep quality as high as I wanted. I expected to ramp up a second writer, but they didn't work out, so I had to scramble in the last few days of the month to fill the gap.

**Reduce average cost per article**

* **Result**: Still working on it.
* **Grade**: B-

It's hard to say because I wasn't collecting fine-grained metrics in January, but I estimated that I was spending about $65/article. In February, I got costs down to $46/article for one of my writers but spent $300 trying to train another writer who only produced one article.

## Stats and Metrics

### Amazon Affiliate Stats

{{< img src="amazon-earnings-2019-02.jpg" alt="Amazon Earnings - Feb. 2019" caption="Amazon affiliate earnings - February 2019" maxWidth="800px" >}}

| Metric         | January 2019| February 2019 |  Change |
|----------------|---------------|--------------|--------|
| Total Earnings| $23.37  | ~$11               | <font color="red">-$12.37 (-47%)</font> |
| Clicks         | 73 | 371                      | <font color="green">+298 (+408%)</font>        |
| Conversion              | 23.29% | ???      | ???    |

Things looked good at the start of the month. I mentioned Is It Keto in [an article on my personal blog](/solo-developer-year-1/), and that post [reached the front page of Hacker News](https://news.ycombinator.com/item?id=19054150). It was a one-time bump, but it was a nice boost for affiliate revenue for the week. Then, I realized I mixed up my tracking IDs.

I use a single Amazon account for all of my projects, but each of my websites has its own unique tracking ID so that I can see revenue on a per-site basis. When you create an Amazon Affiliate link, it auto-populates the tracking ID with whatever you used last. I had been generating lots of links for Is It Keto, so I didn't notice that when I generated a link for [*Four Hour Work Week*](https://amzn.to/2t8r2Ks) on my blog, I forgot to change the tracking ID.

{{< img src="amazon-affiliate-screwup.jpg" alt="Generating an Amazon Affiliate link" caption="I forgot to change my tracking ID, leading to accounting confusion for Is It Keto" maxWidth="800px" hasBorder="True" >}}

This meant that ~50 affiliate clicks through my blog were accidentally mixed in with Is It Keto before I [fixed the issue](https://github.com/mtlynch/mtlynch.io/pull/362) on Feb. 6th. I can't track which link generated what revenue, but I know $28.68 in revenue for the month came from that one-week period. My true revenue might be as little as $2.78 or as high as $31.46. I'm going to take an educated guess and say that the mistake bumped Is It Keto's earnings by about $20, so the real revenue was probably about $11.

I've since added a [build check](https://github.com/mtlynch/mtlynch.io/pull/368) to my blog to prevent a screwup like this in the future.

In any case, even an optimistic revenue of $30 is still far below my target of $60. Is It Keto needs more revenue quickly if it's going to be a viable business.

### Visitor Stats

{{< img src="ga-2019-02-trailing-12.jpg" alt="Google Analytics screenshot" caption="User sessions - March 2018 through February 2019" maxWidth="800px" >}}

| Metric         | January 2019 | February 2019 | Change |
|----------------|---------------|--------------|--------|
| Unique Visitors               | 2,608 | 2,687          | <font color="green">+79 (+3%)</font> |
| Total Pageviews               | 7,614  | 8,500         | <font color="green">+886 (+12%)</font> |
| Referrals from organic search | 2,054 | 1,998             | <font color="red">-56 (-3%)</font> |
| Referrals from Facebook       | 210    | 18            | <font color="red">-192 (-91%)</font> |
| Referrals from Twitter       | 374 | 307                | <font color="red">-67 (-18%)</font>   |

Visitor growth flattened out in February, although it's not as flat as it seems.

Many people begin diets as part of their new year's resolution but then lose interest a few weeks later. According to Google Trends, search interest for "keto" dropped by 25% between January and February:

{{< img src="gtrends-keto.jpg" alt="Google Analytics screenshot" caption="Search interest over for keyword 'keto' between January and February 2018" maxWidth="563px" >}}

In addition, February is just a shorter month than January by about 10%.

I consider it a win that February's traffic roughly matched the previous month despite all of January's unfair advantages.

Referrals from Facebook shrank to almost nothing, as I stopped promoting the site there in January. Referrals from Twitter shrank as well, which is surprising given that I increased investment there (more on that [below](#twitter-on-auto-pilot-but-its-not-scaling)).

### SEO Stats

{{< img src="google-search-console.jpg" alt="Google Search Console screenshot" caption="Google Search Console - Dec. 2018 to Feb. 2019" maxWidth="800px" >}}

| Metric         | January 2019 | February 2019 | Change |
|----------------|---------------|--------------|--------|
| Google-indexed pages               | 49 | 93          | <font color="green">+44 (+90%)</font> |
| Google indexed vs. excluded pages               | 72.1% | 65.0%          | <font color="red">-7.1 (-9.8%)</font>|
| Domain Authority (Moz)               | 9         | 10  | <font color="green">+1</font> |
| Linking Domains (Moz)               | 10         | 10  | 0 |
| Ranking Keywords (Moz)               | 17         | 99  | <font color="green">+82 (+482%)</font>  |

The growth in indexed pages and ranking keywords are encouraging. The big problems are in my domain authority and linking domains. 10 is a pathetically low domain authority, which means that Google will deprioritize me in search results until I can get other sites to link to me.

### Finances

| Income/Expense | January 2019 | February 2019 |
|----------|----------|--------------|
| Amazon Affiliate revenue | $23 | $11 |
| Content writers | <font color="red">-$1,072</font> | <font color="red">-$893</font> |
| Twitter manager | <font color="red">-$65</font> | <font color="red">-$144</font> |
| **Net Profit** | **<font color="red">-$1,114</font>** | **<font color="red">-$1,026</font>** |

I'm still losing a lot of money, but I'm losing slightly less than I did in January, so... yay?

### Diving into my content costs

Content is still my biggest cost. I recognized the same thing in January, so in February, I put more effort into tracking costs at a more granular level:

|         | Writer A| Writer B |
|-----|------------|------------|
| Rate | $20/hr | $60/hr |
| Hours worked | 27.5 | 5 |
| Total cost | $550 | $300 |
| Articles produced | 12 | 1 |
| $/article | $46 | $300 |
| Total amount of my time spent editing/communicating | 7.5 hours | *didn't track* |
| My time per article | 37.5 minutes/article | *didn't track* |

I've been working with Writer A since January. They produce good work, but I still spend a few hours per week editing their writing to get quality to the level I want.

Writer B was a new writer I hired on a trial basis. They were much more expensive but claimed they could produce articles faster and without the need for editing. Their [first article](https://isitketo.org/spinach) was especially good, but it took them three hours ($180) to write. That was slower than I expected, but I figured that it took a few hours to ramp up on keto and learn my style guide. I assigned them a second article, which took two hours for the first draft and was much lower in quality. I dismissed them at that point and never published the second article.

It's interesting looking at this breakdown because I felt like writer A was at least saving me time, but now I'm not so sure. I estimate that writing the articles myself would cost me 45-60 minutes per article.

On the other hand, I find writing the articles mentally draining. 1-2 hours of writing per day is about all I can handle, so if I wrote one Is It Keto article per day, that would be the bulk of my cognitive capacity for the month.

Editing is easier than writing original articles, so I'm saving mental energy by hiring writers, but I'm also paying mental energy in the complexities of managing a writer. It's tough to say whether outsourcing is the right move here. I'm going to scale down investment in content in March so that I can focus on building backlinks.

### Twitter on auto-pilot, but it's not scaling

In January, I [hired a low-cost social media manager](/retrospectives/2019/02/#outsourcing-twitter) to reply with stock responses from the [Is It Keto Twitter](https://twitter.com/HeyIsItKeto) when other Twitter users use the \#keto hashtag. That continues to attract new followers, but it didn't scale the way that I expected. The site had 217 Twitter followers at the start of the month and ended with 368: a 70% increase in followers. However, my visits from Twitter dropped by 18% in the same period. I was hoping for visitors to grow linearly with my number of followers, but that seems not to be the case.

In January, I was still writing original tweets to promote different articles from the Is It Keto account:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Not all nuts and seeds are <a href="https://twitter.com/hashtag/keto?src=hash&amp;ref_src=twsrc%5Etfw">#keto</a> friendly. Do David Sunflower Seeds (<a href="https://twitter.com/EatSpitHappy?ref_src=twsrc%5Etfw">@EatSpitHappy</a>) make the cut? <a href="https://t.co/g45gvXNL9X">https://t.co/g45gvXNL9X</a> <a href="https://t.co/TOXKaAIBY0">pic.twitter.com/TOXKaAIBY0</a></p>&mdash; Is It Keto? (@HeyIsItKeto) <a href="https://twitter.com/HeyIsItKeto/status/1091046712381239296?ref_src=twsrc%5Etfw">January 31, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

In February, I asked my main writer to take over the task of writing per-article tweets. She produces 16-18 tweets per hour, and hers perform about the same as the ones I write myself. I was happy to outsource this, as it was creatively draining to come up with short, snappy tweets. My quality bar for tweets is much lower than for permanent articles on the site, so I don't have to spend time editing my writer's output the same way I do with my website content.

Now, I've delegated away all of my Twitter work, but it doesn't seem to be the right channel to invest in. I paid $144 to my Twitter manager, $40 to my writer, and received 307 clicks, so I'm running at $1.67 per click. This doesn't seem worth it, given that I'm earning far less than that per visit. In March, I'm going to scale down my Twitter investment by 50% and see how it affects follower growth and referrals.

### Increasing pages per session (maybe)

Is It Keto doesn't make it easy for users to browse around the full list of articles. Initially, this was by design. When I launched the site, I wanted to hide how small the food database was.

Now that the site has over 160 foods, I'm thinking about how to make the pages more discoverable. The obvious option is to allow users to browse by category (e.g., "vegetables," "desserts"). But it would take a week or more of dev time to implement a category system and associated pages for displaying them. As a quicker solution, I added a small box at the end of each article labeled "Other Keto Foods You May Enjoy":

{{< img src="other-foods.jpg" alt="Screenshot of Other Foods widget on Is It Keto" caption="Other Foods section of Is It Keto" maxWidth="800px" hasBorder="True" >}}

The box displays three random keto foods. Well, not completely random. It randomly samples the foods from among the keto foods where I have a link to buy the product on Amazon.

I can't tell if this made any real difference. I implemented the change on Feb. 11th, but any change that occurred is still within the noise of my metrics:

{{< img src="pages-per-session.jpg" alt="Google Analytics pages per session" caption="Pages per session before and after 'Other Foods' section" maxWidth="783px" >}}

### My hail mary: data visualizations

Is It Keto's biggest limiting factor is its domain authority, which continues to hover at a paltry score of 10 (out of a log scale of 100). With so much of the site's traffic depending on search engine rank, I need more high-ranking sites linking to Is It Keto. The problem now is that none of the content appeals to other sites. A popular nutrition or keto website would never link to [IsItKeto's apples](https://isitketo.org/apples) page, for example, because it's nothing sensational or surprising.

My plan is to write blog posts on Is It Keto using recipe data from [KetoHub](https://ketohub.io) to make interesting visualizations about trends in keto. For example, here's a rough draft of a bubble cloud I made showing the most popular ingredients in over 4,500 different keto recipes:

{{< img src="ingredients-rough.jpg" alt="Bubble cloud  of ingredient frequency" caption="Ingredient frequency in 4,500 keto recipes from the most popular keto websites" maxWidth="600px" >}}

It's a longshot because keto websites don't often link to other keto sites, but it's the best idea I can come up with that I can complete in under one month. If I can produce interesting visualizations and get other high-ranking sites to link to my blog posts, then I'll increase the site's domain authority and drastically increase site traffic.

## Wrap up

### What got done?

* Added an "Other Foods" section to the article pages so that users can easily discover new articles
* Added an admin tool that lets me add redirects for alternative spellings of foods (e.g., [mayo](https://isitketo.org/mayo) -> [mayonnaise](https://isitketo.org/mayonnaise))
  * Previously I was doing this in a hacky way that required me to change the source code and re-deploy the entire site
* Wrote tools to collect keto recipe data for upcoming data visualization blog posts
* Published 30 new food pages

### Lessons learned

* After taking into account the time I spend editing and communicating with writers, I'm not saving time by outsourcing content writing.
  * I likely still am saving mental energy, which is always a precious resource.

* I can outsource Twitter promotion tasks cleanly and efficiently.
  * Still, Twitter's not earning me a return on investment, so I'm going to scale down.

### Goals for next month

February was my third month of monetizing Is It Keto and giving it my full-time focus. It wasn't earning big money out of the gate, but its growth in December and January gave me hope that it was on the path to a viable business. The slowdown in February was a big red flag and might be an indication that I should shelve this project so that I can focus on something new.

My goals for March are **critical goals**. If I don't achieve them, I'll put the project on the backburner:

* Achieve $100 in revenue
* Receive links from two websites with a Moz Domain Authority of at least 40
* Add 10 new pages for different foods
