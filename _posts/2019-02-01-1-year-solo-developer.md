---
title: My First Year as a Solo Developer
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
classes: wide
tags:
- retrospectives
- blogging
- google
- zestful
- space duck
- sia
- is it keto
- ketohub
- money
---

On February 1st, 2018, I [quit my job](/why-i-quit-google) as a software engineer at Google to start my own single-person software company. Today marks my first full year as a solo developer, so I thought it would be a good time to reflect on how the decision has affected my finances, lifestyle, and happiness.

# How I made and spent money
Here's a high-level overview of all my business revenues and expenses for 2018:

{% assign fig_caption = 'Profit and loss chart via [Bench](http://refer.bench.co/pPrqq).' | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="bench-2018.jpg" alt="Profit and loss for 2018" max_width="793px" class="img-border" img_link="true" fig_caption=fig_caption %}

One way of looking at this chart is that I lost $21k in a single year. Alternate interpretation: I *grew profits* by almost $1k each month!  If this trend continues, I should be fabulously wealthy quite soon.

{% assign fig_caption = 'Profit and loss through 2019, projected' %}

{% include image.html file="2019-projected.jpg" alt="Projected earnings for 2019" max_width="793px" class="img-border" img_link="true" fig_caption=fig_caption %}

Okay, that's a bit of a "fanciful" interpretation. The reason that my profits increased (i.e., remained negative, but decreased in magnitude) was that I reduced spending.

# Costly lessons in outsourcing

At first, I had a very [*Four Hour Work Week*](https://amzn.to/2WrjMXD) mentality. My job was not to *do* work but to *manage* work, so I hired freelancers to do everything.

Two major problems quickly arose:

* It takes weeks or months until outsourcing saves time.
  * There are upfront costs: specifying the task, hiring a freelancer, training them. These costs are higher the more complex the task.
* Outsourcing requires careful coordination.
  * If managing work requires only 20% as much time as doing work directly, I should be able to manage five freelancers in a full work week, right? But, what if all five freelancers submit their work on the same day? It's impossible to review everything at the same time, and the freelancers don't want to just sit idle for a week until I catch up.

Quality of work declined noticeably because I couldn't review everything thoroughly. Sometimes I had to discard work entirely because I planned poorly.

To address this, I outsourced more conservatively. This change reduced my spending and made my business feel less chaotic. There was also a significant change in my personal life that affected my finances, but I'll cover that a bit later in this post.

# Project by project

{% include image.html file="project-finances-2018.png" alt="Graph of income and expenses on a per-project basis" max_width="800px" class="img-border" img_link="true" fig_caption="Income and expenses for each of my projects in 2018" %}

## mtlynch.io *(this blog)*

My biggest source of revenue in 2018 was this blog. I deliberately avoid monetizing it because I don't want ad money to influence my writing. The only exception is that if the blog links to a product, I use an affiliate link so that the site earns referral money.

Despite my best efforts, this blog earned more than any of my other projects. It had its biggest revenue year, earning $1.2k in affiliate payments. That was the result of 981k pageviews, which most professional bloggers would probably consider laughably under-monetized.

| Income/Expense | Amount |
|---------|----------------------|
| Affiliate revenue | $1,244 |
| Development\* | -$3,896 |
| [Illustrations](/how-to-hire-a-cartoonist/) | -$599 |
| [Editing](/editor/) | -$75 |
| [Grammarly](https://www.grammarly.com/?affiliateNetwork=cj&affiliateID=8329872) (Grammar and style checking service) | -$140 | 
| Hosting | -$309 |
| Domain | -$60 |
| **Net profit** | **-$3,835** |

\* I work with an [excellent developer](https://www.andrewwnewhouse.com/) who handles all the coding and web design so that I can just write.

## [Is It Keto](https://isitketo.org)

{% include image.html file="isitketo-screenshot.jpg" alt="Screenshot of Is It Keto website" max_width="600px" class="img-border" img_link="true" %}

Is It Keto is my current focus. It gives readers clear, simple answers about which foods are compatible with the keto diet. If the food is keto-approved, the site displays links where the reader can purchase it online, and the site receives affiliate revenue for the sale.

Revenues are small because I only added monetization at the end of November, but I'm hopeful that they will grow quickly.

| Income/Expense | Amount |
|---------|----------------------|
| Affiliate revenue | $1.20 |
| Development | -$1,660 |
| Logo Design | -$211 |
| Hosting | -$0\* |
| Domain | -$12 |
| **Net profit** | **-$1,882** |

\* Is It Keto runs on AppEngine, and traffic is currently low enough to fit into their free tier.

## [Zestful](https://zestfuldata.com)

{% include image.html file="zestful-screenshot.jpg" alt="Screenshot of Zestful website" max_width="800px" class="img-border" img_link="true" %}

Zestful was my first attempt at software-as-a-service (SaaS). It allows developers to programmatically infer structure from recipe ingredients. Given an ingredient like `"1.5 cups finely chopped red onions"`, Zestful tells the application that `1.5` is the quantity, `cups` is the unit of measure, `red onions` are the product, and `finely chopped` is a preparation step.

I put the project in maintenance mode in September after several months of [unsuccessful sales attempts](/shipping-too-late/). Interestingly, several people have reached out to me in the past few months with plans for using it on new projects, so maybe it will come back to life in 2019.

| Income/Expense | Amount |
|---------|----------------------|
| Client payments | $0\* |
| Development | -$7,440 |
| Logo design | -$200 |
| Hosting | -$164 |
| Domains | -$50 |
| **Net profit** | **-$7,854** |

\* It *technically* earned about $1 but my payment processor won't pay out balances under $2.

## [Space Duck](https://spaceduck.io)

{% include image.html file="spaceduck-screenshot.jpg" alt="Screenshot of Space Duck website" max_width="600px" class="img-border" img_link="true" %}

Space Duck was my exploratory quest to build something on top of Sia, a decentralized storage technology I've [written about frequently](/tags/#ketohub).

After my [series of public experiments](https://blog.spaceduck.io/load-test-wrapup/), it was clear that Sia [was not yet ready](/since-quitting/#failed-project-space-duck) to support any of my business ideas, so I moved on.

| Income/Expense | Amount |
|---------|----------------------|
| Logo design | -$250 |
| Website development | -$1,373 |
| Hosting | -$196 |
| Domain | -$60 |
| **Net profit** | -**$1,879** |

## [KetoHub](https://ketohub.io)

{% include image.html file="ketohub-screenshot.jpg" alt="Screenshot of KetoHub website" max_width="700px" class="img-border" img_link="true" %}

KetoHub is a project I [started last year](/tags/#ketohub). It aggregates keto recipes from various blogs and makes them searchable by ingredient.

All of my ideas to monetize it require a huge time investment and have low probability of success, so it's in maintenance mode for now.

| Income/Expense | Amount |
|---------|----------------------|
| Development | -$1,502 |
| User interviews | -$220 |
| Logo Design | -$211 |
| Hosting | -$46 |
| Domain | -$60 |
| **Net profit** | **-$2,039** |

## Everything Else

| Expense | Purpose | Amount | Note |
|------------|-----------|-----------|-------|
| [Bench](http://refer.bench.co/pPrqq) | Bookkeeping | -$1,610 | Pricey, but it's one of the few services I've used that just solves a problem so thoroughly that I only have to think about it for a few hours per year. |
| [Travis CI](https://travis-ci.com) | Continuous integration | -$1,419 | I wish this were cheaper, but I absolutely need continuous integration. I've heard that [CircleCI](https://circleci.com/) is now the better offering and costs less, so I'll likely switch when my subscription expires. |
| [Coveralls](https://coveralls.io) | Test coverage tracking | -$270 | Another one I wish was cheaper, but I love testing, so I'm willing to pay for anything that improves my tests. |
| [GitHub Pro](https://github.com/) | Source code storage | -$91 | I bought this just for the private repos, but [now they're free](https://techcrunch.com/2019/01/07/github-free-users-now-get-unlimited-private-repositories/), so I can stop paying this in 2019. |
| Dev tooling | Misc | -$1,400 | I paid freelance developers to add general-purpose tooling during development. |
| Travel, conferences, events, books | | -$634 | |
| Banking and credit card rewards | | ~$1,000 | Embarrassingly, my second largest source of income for the year was in cash rewards for opening new business checking and credit accounts. |

# Bleeding dry from personal expenses

There was one enormous hidden expense that my profit and loss chart didn't show: me.

My living expenses were rapidly eating away at my personal savings. Between my $3.3k/month apartment, private health insurance, food, and utilities, it cost $6-7k per month just to sustain myself.

Those costs had a dramatic impact on my business decisions. If I had an idea for a business that would take me three months to get off the ground, that was the equivalent of investing about $20k into the concept. A two week task had an implicit cost of $3k. This led me to frantically over-outsource my work and contributed to the [contractor pains](#costly-lessons-in-outsourcing) I described above.

My living costs also made me feel discouraged about almost any project idea. When I originally imagined starting a business, I was charmed by the idea of growing something from a small seedling that made $50 a month and slowly nurturing it to $100 then $175. Working at such small scales of revenue felt ridiculous when I was burning $7k a month in expenses.

# So, I bought a house

One day in June, I texted my sister joking that I should cut my spending by moving into a cheap house near her in Western Massachussetts. She immediately called me. "Were you kidding? Because you should do that for real."

The more I thought about it, the more sense it made. It was close to my family, close to my family, laid-back area, and the cost of living was tiny compared to New York.

So in August, I bought a modest two bedroom house in South Hadley, Massachusetts. Population: 17,500.

<figure class="half">
  {% include image.html file="house-front.jpg" alt="My house, front view" img_link=true %}
  {% include image.html file="house-angle.jpg" alt="My house, side view" img_link=true %}
  <figcaption>If you're worried about money, just buy a house.</figcaption>
</figure>

My living expenses here are ~$2k per month, which is low enough that I don't have to stress about them too much. It gives me the freedom to try projects like Is It Keto, which has made $1 so far. It will be a long time before it makes enough to cover my expenses, but my costs are low enough that I don't have to worry about them as much. Instead, I can think about whether I'm meeting my goals in terms of growing revenues and users.

# I want to do this forever

People have asked me if I'm still happy with my decision to quit and start my own company. The answer is definitely yes.

As someone who has always valued independence, I love being a solo developer. It makes a world of difference to wake up whenever I want and make my own choices about how to spend the entire day. I want this to be how I live the rest of my life.

***Sidenote**: My friends with children tell me that kids won't complicate this at all.*
{: .notice--info}

# Doubts

Despite this, I do still have some doubts about my work. Here are some of the questions I frequently ask myself:

* The things you're best at are [code reviews](/human-code-reviews-1/), [unit tests](/good-developers-bad-tests/), and refining processes for a team of developers. Aren't you wasting your best skills working by yourself?
* One of your fatal flaws with Zestful was that you were [too afraid of sales](/shipping-too-late/#a-different-type-of-rejection). Does your new project, Is It Keto, really have potential? Or did you just pick a project where you don't have to do sales?
* Your job at Google used to impress people. Now when people ask about your work, you awkwardly tell them, "Um, it's a website where you type a food and it tells you whether it's keto..." Shouldn't you be doing something that sounds more impressive?

# Lessons learned

**Limit focus**

When I first started, I thought that I had so much free time that I could do several projects in parallel. It turned out that [I didn't have as much time as I thought](/since-quitting/#managing-stress). Attempting to do everything prevented me from making meaningful progress on anything.

Now, I limit my focus to one business venture at a time and one blog post per month. The change has helped me stress less and accomplish more.

**Regularly reflect**

I spend 30-60 minutes at the end of each week writing an explicit list of everything I did, and it always makes me realized I accomplished more than I thought.

Often, I'll sit down Friday feeling that I burned an entire week on a single bug only to realize that, in reality, the bugfix only took two days. And then I'll remember that on Tuesday, I shipped a new feature even though that felt like ages ago.

This works on a monthly level as well. At the beginning of each month, I publish retrospectives so that I can reasses my strategy and set goals (e.g., Is It Keto [Month 3](https://www.indiehackers.com/forum/isitketo-returning-to-a-site-that-grew-without-me-0a0fe3ef52) and [Month 4](https://www.indiehackers.com/forum/isitketo-month-4-my-first-dollar-of-revenue-03e572f661)).

And, starting with this post, every year I write a riveting, wildly popular blog post about my reflections on the year (***Note**: wild popularity still pending*).

**Set goals**

Specific, measurable goals have kept me focused. Before I developed a habit of declaring explicit goals, it was too easy for me to waste time on something and then invent post-hoc rationalizations for it.

A clear objective like, "Achieve $50 in revenue for the month," forces me to prioritize ruthlessly. When deciding which task to start, I ask myself whether it's the best way to achieve my monthly goal.

# Goals for year two

Speaking of goals, I should set some for the current year. Here are my goals for year two of being a solo developer:

* Achieve $500/month in revenue across my businesses.
* Present talks at three software conferences.
* Publish 12 blog posts.
* Gain comfort with a JavaScript framework (e.g., [Vue](https://vuejs.org/), [Angular](https://angular.io/), [React](https://reactjs.org/)).