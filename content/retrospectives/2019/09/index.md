---
title: Is It Keto - Month 8
description: Perhaps I should pay more attention to my only successful project.
images:
- /retrospectives/2019/09/amazon-affiliates.jpg
date: '2019-09-06'
---

## Highlights

* [Is It Keto](https://isitketo.org) continued its streak of growth, with a 72% jump in revenue to an all-time high of $389 for August.
* Given that Is It Keto is doing better than any of my other projects, I decided to stop ignoring it.
* I finally got a high-ranking domain to link to Is It Keto, but the experience soured me on guest posts.
* [Zestful](https://zestfuldata.com/) had its best month ever, earning $728 in revenue.

## Goal Grades

At the start of each month, I [declare what I'd like to accomplish](/retrospectives/2019/08/#goals-for-next-month). Here's how I did against those goals:

### Publish a new blog post on [mtlynch.io](https://mtlynch.io)

* **Result**: I published ["The Dumbest Task I Ever Outsourced."](/dumbest-task-i-ever-outsourced/)
* **Grade**: A

The article was a mostly-for-fun story about one of my early blunders with outsourcing. I like the way it came out, but it didn't attract many readers.

I find myself "chasing the high" in wanting another hit article, as none of my blog posts have garnered much of a response since, ["My First Year as a Solo Developer,"](https://mtlynch.io/solo-developer-year-1/) published 7 months ago. My next article will be about hiring a content writer, which I imagine will be fairly niche. After that, I plan to write about how developers can improve their writing, and that may have broader appeal.

### Publish an MVP for my [email copywriter tool idea](/retrospectives/2019/07/#slowing-down-on-the-email-tool-for-copywriters)

* **Result**: I abandoned this goal and focused instead on expanding Is It Keto.
* **Grade**: F

As I was writing my July retrospective, I [questioned my decision](/retrospectives/2019/08/#is-it-ketohttpsisitketoorg) to keep ignoring Is It Keto, given that it's my only successful project. I ended up thinking that thought more and decided to postpone the new product in favor of returning my focus to Is It Keto for a while.

I'm still interested in pursuing the email tool idea, but I've deferred it to October at the earliest.

### Prep What Got Done for the backburner

* **Result**: I've wrapped up the loose ends so it can run with minimal maintenance, but I still want to open source it.
* **Grade**: B

This took significantly longer than I expected. I underestimated how difficult it would be to implement CSRF mitigation given that What Got Done runs on a strange mix of Golang and Vue2, but that's finally complete. I also forgot how many little hacks I put in to facilitate development on my main machine, so it took some effort to get everything working again from a clean VM.

## Stats

### [Is It Keto](https://isitketo.org)

{{< img src="amazon-affiliates.jpg" alt="Screenshot of Amazon Affiliate earnings" caption="Amazon Affiliate Earnings - August 2019" maxWidth="950px" >}}

| Metric                    | July 2019   | August 2019 | Change                                         |
| ------------------------- | ----------- | ----------- | ---------------------------------------------- |
| Unique Visitors           | 19,526      | 28,921      | <font color="green">+9,395 (+48%)</font>       |
| Total Pageviews           | 53,467      | 73,469      | <font color="green">+20,002 (+37%)</font>      |
| Domain Authority (Moz)    | 6           | 7           | <font color="green">+1 (+17%)</font>           |
| Ranking Keywords (Moz)    | 1,442       | 2,205       | <font color="green">+763 (+53%)</font>         |
| AdSense Earnings          | $71.49      | $227.25     | <font color="green">+$155.76 (+218%)</font>    |
| Amazon Affiliate Earnings | $153.98     | $152.55     | <font color="red">-$1.43 (-1%)</font>          |
| **Total Earnings**        | **$225.47** | **$379.80** | **<font color="green">+$154.33 (+68%)</font>** |

Is It Keto continued to grow at a rapid rate. Amazon Affiliate earnings stayed flat, which is a bit worrying given that pageviews increased so rapidly, but Google AdSense bolstered revenues, as August was the first full month I ran AdSense ads.

### [Zestful](https://zestfuldata.com)

| Metric                 | July 2019 | August 2019 | Change |
|------------------------|-----------|-------------|--------|
| Total Earnings         | $59.57    | $728.49     | <font color="green">+$668.92 (+1123%)</font> |

August was Zestful's best month, though literally 99% of the revenue from a single customer who needed to bulk convert a huge dataset of ingredients, so I can't expect similar revenue in the future.

## Taking affiliate revenue advice from reddit

I recently discovered [/r/juststart](https://www.reddit.com/r/juststart/), a subreddit dedicated to affiliate revenue businesses. The challenge of taking advice from reddit is that it attracts both helpful experts and random lunatics who have no idea what they're talking about, so it can be tricky for non-experts to figure out which is which.

I [posted a thread](https://redd.it/cmslmx) about Is It Keto, and here were my key takeaways:

* I should focus on getting other sites to link to Is It Keto.
  * This is something I had heard before. I [tried for a month](/retrospectives/2019/04/#biggest-challenge-link-building) to get links from other keto sites, but they weren't interested. The reddit commenters suggested instead approaching non-keto sites that have some connection to health or lifestyle.
  * **Result**: I got one new site to link to me (more on that [below](#finally-a-backlink-for-is-it-keto)).
* Is It Keto's page titles should better match common search terms.
  * **Result**: I changed my page titles from the format of "\[Food\] - Is It Keto" to "Is \[Food\] Keto? - Is It Keto"

{{< img src="page-titles.jpg" alt="Before and after comparison of Is It Keto in Google search results" caption="Changing Is It Keto page titles to better match search queries" maxWidth="800px" hasBorder="True" >}}

* Is It Keto should have dropdowns navigation menus so that it's easier for users to browse different food categories.
  * **Result**: I added dropdown menus to the navigation bar.

{{< img src="navbar.jpg" alt="Before and after screenshots of Is It Keto navbar" caption="Redesigned navbar on Is It Keto" maxWidth="600px" hasBorder="True" >}}

* I should promote Is It Keto on Pinterest.
  * **Result**: I created a [Pinterest page](https://pinterest.com/isitketo/) and added 14 pins, but it's time-consuming to create the graphics, and my referrals from Pinterest remain at nearly zero. I need help from someone who understands Pinterest, but I can't afford a Pinterest consultant at the moment.

{{< img src="pinterest.jpg" alt="Screenshot of Is It Keto's Pinterest page" caption="Is It Keto's unsuccessful Pinterest page" maxWidth="500px" >}}

## Finally a backlink for Is It Keto

I've known for a long time that Is It Keto would be much stronger if other sites linked to it. I spent most of [March](/retrospectives/2019/04/#biggest-challenge-link-building) unsuccessfully trying to get other keto blogs to link to me. In the [/r/juststart thread](#taking-affiliate-revenue-advice-from-reddit), someone suggested approaching keto-adjacent sites like motherhood blogs or general fitness blogs and offering to write a post for them.

This seemed sensible, but I had a tough time approaching it. The well-known sites like Men's Health probably wouldn't be interested in guest posts from an unknown author. I needed to find sites that were big enough that they'd improve Is It Keto's search ranking but small enough that they accept guest posts. But how do you find sites that are "middle-tier?"

With the assumption that local fitness bloggers might be more friendly to a nearby blogger, I used search terms like "fitness western massachusetts." One of the sites I found was the local blog for a gym chain called [Fitness Together](https://fitnesstogether.com), with a 55/100 score from [Ahrefs](https://ahrefs.com/backlink-checker). Coincidentally, my sister had a contact there, so I reached out about writing a guest post for them. They agreed to the idea, I wrote a new article for them, and they published it a couple weeks later: ["Five Benefits of Strength Training."](https://fitnesstogether.com/northampton/blog/five-benefits-of-health-training)

{{< img src="guest-post.jpg" alt="Screenshot of my blog post on Fitness Together's blog" caption="My guest post on the Fitness Together Northampton blog" maxWidth="600px" linkUrl="https://fitnesstogether.com/northampton/blog/five-benefits-of-health-training" >}}

It's unclear if that new link makes any difference. The Fitness Together root domain is valuable, but Google may recognize that the [blog for a city-specific location](https://fitnesstogether.com/northampton/blog) is not as significant as Fitness Together's [main blog](https://fitnesstogether.com/blog).

My main takeaway is that I find it unpleasant to write guest posts. Obviously, I write frequently on this site, but that feels different because I'm writing about topics about which I feel especially passionate or able to contribute something unique. With guests posts about health and fitness, I don't have a passion for the writing, even though the Fitness Together folks were very friendly and cooperative.

The other motivation-killer is the immense challenge of writing honestly about health and fitness amid a sea of clickbait. While researching my article, almost every similar blog post I found made health claims about strength training that were either unsourced entirely or sourced from meaningless studies on tiny groups of people. Writers are stuck in the position of either making sensational claims about health to drive clicks or doing five times as much research to discuss health in an informed way. Sadly, most bloggers choose the former, and readers can't seem to tell the difference.

My plan now is to stop writing guest posts. Instead, I'll hire a writer who can seek out opportunities for guest posts on external sites while also adding content to Is It Keto.

## College job boards might be a treasure trove

When I was hiring writers for Is It Keto earlier this year, I tried posting printed flyers around a local college. I only received one inquiry, and it quickly became clear that the candidate was not a good match. I didn't invest much more into recruiting at colleges, though I did always feel like I *should* be able to find a talented writer by recruiting a student.

In August, I posted to online job boards for two local colleges. It's only been about a week, and I've already received 22 inquiries from students. The quality seems to be on par with the candidate pool on freelance sites like Upwork. The difference is that the typical pay for a college student in my area is $11-15/hr, whereas similarly skilled Upwork freelancers charge $20-80/hr.

I've hired a few students on a trial basis, so I'll see how it plays out.

## Cool discoveries this month

One of my favorite bloggers recently added [recommendations](https://www.coryzue.com/writing/jul-2019/#recommendations) to his monthly retrospectives, so I'm trying it as well. Here are the cool things I discovered this month:

### [Victor Zhou's Software and Machine Learning Blog](https://victorzhou.com/)

Victor Zhou is a Facebook engineer who only began blogging in 2019 and already writes better than 90% of tech bloggers. He writes with clarity, conciseness, and a keen ability to explain his thought process.

My favorite of his posts is ["Minify Your SVGs"](https://victorzhou.com/blog/minify-svgs/). It does a great job of explaining the context of the problem and the tradeoffs of different solutions he considered.

{{< img src="victor-zhou.jpg" alt="Screenshot of Victor Zhou's blog" caption="Victor is a talented software blogger with an emphasis on machine learning" maxWidth="450px" linkUrl="https://victorzhou.com/blog/minify-svgs/" >}}

### [Cory Zue's Solopreneur Side Project Dashboard](http://www.coryzue.com/open/)

Cory Zue is a solo developer who writes publicly and transparently about his business projects. In August, he unveiled a dashboard that shows earnings and time investment for his different projects.

{{< img src="solopreneur-dashboard.jpg" alt="Screenshot of Solopreneur Dashboard" caption="Cory Zue created a public dashboard to track his time investment and financial returns for each of his side businesses" maxWidth="450px" linkUrl="http://www.coryzue.com/open/" >}}

Particularly interesting is his effective wage for each project. It shows how his businesses required substantial up-front investment but, over time, generated increasing amounts of revenue and demanded decreasing levels of maintenance.

### [Jimmy Lipham's Website Teardown Video](https://youtu.be/J_jGnGH3YsU)

As an exercise, Jimmy Lipham made a [live demo](https://youtu.be/J_jGnGH3YsU) of UI tweaks he made to [a website that needed design help](https://www.indiehackers.com/post/01a9c08e6b).

{{< youtube J_jGnGH3YsU >}}

 It's useful because there are so many little techniques in the video that anyone can reuse on their own sites (I applied several of them to Is It Keto):

* He adds [box shadows](https://css-tricks.com/snippets/css/css-box-shadow/) to draw attention to certain elements on the page
* He changes the site's backgrounds to a slightly off-white color to create contrast with page elements that have a pure white background.
* He changes the navbar background from a fixed color to a color gradient for a more pleasing visual.
* He adds a bottom border to the navbar so that it transitions more gently into the main page.
* He shows how to use the [Google Fonts browser](https://fonts.google.com/) to pick out new fonts.

I highly recommend watching this video because I can't convey the full experience in writing. So much of the value is just watching Jimmy work on the page in real time and hearing him explain his rationale for each change.

## Wrap up

### What got done?

* Published ["The Dumbest Task I Ever Outsourced"](/dumbest-task-i-ever-outsourced/) on [mtlynch.io](https://mtlynch.io).
* Earned a backlink for Is It Keto from a website with a high domain ranking.
* Added 10 new articles to Is It Keto.
* Made various tweaks to Is It Keto's UI to improve usability and SEO.
* Mostly completed prep for an open source release of [What Got Done](https://whatgotdone.com):
  * Added [CSRF](https://portswigger.net/web-security/csrf) mitigation
  * Added automated daily backups
  * Pulled project secrets and hardcoded IDs out of source control
  * Documented lots of the codebase
  * Reorganized folder and file structure
* I created (and then abandoned) a [Pinterest page for Is It Keto](https://www.pinterest.com/isitketo/).

### Lessons learned

* Earning backlinks for Is It Keto is more viable than I previously thought, but I hate the process.
* Don't try to tinker with Bootstrap components too much.
  * I realized that many of the CSS headaches I've had with Is It Keto resulted from trying to add my custom CSS tweaks instead of learning to use Bootstrap's native classes.
* College job boards potentially yield a similar caliber of writers to freelance marketplaces but with significantly lower costs.

### Goals for next month

* Hire a writer for Is It Keto.
* Earn revenue through a new channel for Is It Keto (e.g., a new affiliate partnership).
* Publish a guide to hiring freelance content writers.
* Finish open sourcing What Got Done.