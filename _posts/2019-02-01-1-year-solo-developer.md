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
---

On February 1st, 2018, I [quit my job](/why-i-quit-google) as a software engineer at Google to start my own single-person software company. Today marks my first full year as a solo developer, so I thought it would be a good time to reflect on how the decision has affected my finances, lifestyle, and happiness.

# How I made and spent money
Here's a high-level overview of all my business revenues and expenses for 2018:

{% assign fig_caption = 'Profit and Loss chart via [Bench](http://refer.bench.co/pPrqq).' | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="bench-2018.jpg" alt="Profit and loss for 2018" max_width="793px" class="img-border" img_link="true" fig_caption=fig_caption %}

One way of looking at this chart is that I lost $21k in a single year. Alternate interpretation: I *grew profits* by almost $1k each month!  If this trend continues, I should be fabulously wealthy quite soon.

{% assign fig_caption = 'Profit and loss through 2019, projected' %}

{% include image.html file="2019-projected.jpg" alt="Projected earnings for 2019" max_width="793px" class="img-border" img_link="true" fig_caption=fig_caption %}

Okay, that's a bit of a "fanciful" interpretation. The reason that my profits increased (i.e., remained negative, but decreased in magnitude) was that I reduced spending.

# Costly lessons in outsourcing

When I first started, I had a very *Four Hour Work Week* mentality. My job was not to *do* work but to *manage* work, so I hired freelancers to do everything.

I figured that outsourcing a task would the time I have to spend on it by about 80%. That is, if I expected to spend 20 hours doing something myself, it would take me about 4 hours to manage a freelancer to do it. And that's true, but it takes a few months with that freelancer to reach that point. For the first few weeks, I often spent more time managing the freelancer than it would have taken to do the task myself.

The other issue was task coordination. If I could reduce my workload by 80% with outsourcing, it would only take one day of my week to manage a full week of a freelancer's work. By that logic, I could hire five freelancers and spend one day a week reviewing each of their work. But it doesn't work so cleanly in practice. Freelancers often submitted work at the same time. And you can't just tell them to sit around for a week until you get back to them. They can't have clients that expect them to work two hours one week, then 40 hours the next.

So I trimmed down and became much more conservative about hiring freelancers.

The change in my spending also resulted from a significant change in my personal life, which I'll cover a bit later in this post.

# Project by project

## mtlynch.io *(this blog)*

My biggest source of revenue in 2018 was this blog. I deliberately avoid monetizing it because I don't want ad money to influence what I write. The only exception is that if I'm going to link to a product anyway, I use an affiliate link so that the blog earns referral money.

Despite my best efforts, this blog earned more than any of my other projects. In 2018, this blog received 981k pageviews and earned $1.2k in affiliate revenue, which I think most professional bloggers would consider laughably under-monetized.

| Income/Expense | Amount |
|---------|----------------------|
| Affiliate revenue | $1,244 |
| [Editing](/editor/) | -$XX |
| [Illustrations](/how-to-hire-a-cartoonist/) | -$XX |
| Development | -$XX |
| [Grammarly](https://www.grammarly.com/?affiliateNetwork=cj&affiliateID=8329872) (Grammar and style checking service) | -$140 | 
| Hosting | -$XX |
| Domain | -$60 |
| **Net profit** | **-$XX** |

## [Is It Keto](https://isitketo.org)

Is It Keto is my current focus. It gives readers clear, simple answers about which foods are compatible with the keto diet. If the food is keto-approved, the site displays links where the reader can purchase it online, and the site receives affiliate revenue for the sale.

I only began monetizing it at the end of November, so revenues are small, but I'm hopeful that I can grow them quickly.

| Income/Expense | Amount |
|---------|----------------------|
| Affiliate revenue | $1.20 |
| Development | -$1,660 |
| Hosting | -$0\* |
| Logo Design | -$211 |
| Domain | -$12 |
| **Net profit** | **-$1,882** |

\* Is It Keto runs on AppEngine, and traffic is currently low enough to fit into their free tier.

## [Space Duck](https://spaceduck.io)

Space Duck was a project for me to build something on top of Sia, a decentralized storage technology. After running some experiments, I decided that Sia [was not yet ready](/since-quitting/#failed-project-space-duck) to support anything I had in mind, so I moved on.

| Income/Expense | Amount |
|---------|----------------------|
| Logo design | -$250 |
| Website development | -$1,373 |
| Hosting | -$25 |
| Domain | -$60 |
| **Net profit** | -**$1,708** |

## [Zestful](https://zestfuldata.com)

Zestful was my first attempt at software-as-a-service (SaaS). It allowed developers to programmatically infer structure from text representing a recipe ingredient. So, given an ingredient like `"1.5 cups finely chopped red onions"`, Zestful tells the application that `1.5` is the quantity, `cups` is the unit of measure, etc. I put the project in maintenance mode in September after several months of [unsuccessful sales attempts](/shipping-too-late/).

Interestingly, several people have reached out to me in the past few months with plans for using it on new projects, so maybe it will come back to life in 2019.

| Income/Expense | Amount |
|---------|----------------------|
| Client payments | $0\* |
| Development | -$7,440 |
| Logo design | -$200 |
| Hosting | -$164 |
| Domains | -$50 |
| **Net profit** | **-$7,854** |

\* It *technically* earned about $1 but my payment processor won't pay out balances under $2.

## [KetoHub](https://ketohub.io)

KetoHub is a project I started last year. It's aggregates keto recipes from different sites and makes them searchable by ingredient. I couldn't find any ways to monetize or grow it without investing a large amount of time, so it's in maintenance mode for now. I occasionally add new features or recipe sources for fun.

| Income/Expense | Amount |
|---------|----------------------|
| Development | -$1,502 |
| User research| -$220 |
| Logo Design | -$211 |
| Hosting | $XX |
| Domain | -$60 |
| **Net profit** | **$XX** |

## Everything Else

| Expense | Purpose | Amount | Note |
|------------|-----------|-----------|-------|
| [Bench](http://refer.bench.co/pPrqq) | Bookkeeping | -$1,610 | Pricy, but I've been it's one of the few services I've used that just solves a problem so thoroughly that I don't have to think about it for more than a few hours per year. |
| [Travis CI](https://travis-ci.com) | Continuous integration | -$1,419 | I wish this were cheaper, but I absolutely need continuous integration. I've heard that [CircleCI](https://circleci.com/) is now the better offering and costs less, so I'll likely switch when my subscription expires. |
| [Coveralls](https://coveralls.io) | Test coverage tracking | -$270 | Another one I wish were cheaper, but I love testing. |
| [GitHub Pro](https://github.com/) | Source code storage | -$91 | Bought this just for the private repos, but [now they're free](https://techcrunch.com/2019/01/07/github-free-users-now-get-unlimited-private-repositories/), so I can stop paying this in 2019. |
| Dev tooling | Misc | -$1,400 | I paid freelance developers to add general-purpose tooling during development. |
| Travel, conferences, events, books | | -$634 | |

# Bleeding dry from personal expenses

There was one enormous hidden expense that my profit and loss chart didn't show: me.

I'm my own largest expense. I paid my living costs by drawing from my personal savings. But my cost of living was quite high after I quit Google. My Manhattan apartment, located walking distance from Google, cost $3,300 per month. After private health insurance, food, and utilities, it cost $6-7k per month just to sustain myself.

Those costs had a dramatic impact on my business decisions. If I expected a task to take me two weeks, that translated to an implicit cost of ~$3k. If I could hire a freelancer to perform the task for less than $3k, I'd be saving money overall. Paying a freelancer was even more attractive because I can deduct it from my taxable income.

I'm a huge fan of outsourcing, and I think that people underuse it, but I was basically in a mindset of *frantic outsourcing*. At one point, I was working with four different freelance developer simultaneously on three different projects.

My living expenses also made me constantly feel like my time was metered. When I imagined starting a business, I did have this romantic idea about starting it from a small seedling earning only $50 a month and slowly growing it to $100 then $175. But it felt ridiculous and foolhardy to do that while burning $7k a month in expenses.

# So, I bought a house

One day in June, I texted my sister joking that I should cut my spending by moving into a cheap house near her in Western Massachussetts. She immediately called me. "Were you kidding? Because you should do that for real."

The more I thought about it, the more sense it made. It was close to my family, I liked the area, and the cost of living was tiny compared to New York.

So in August, I bought a modest two bedroom house in South Hadley, Massachusetts, population 17,500.

<figure class="half">
  {% include image.html file="house-front.jpg" alt="My house, front view" img_link=true %}
  {% include image.html file="house-angle.jpg" alt="My house, side view" img_link=true %}
  <figcaption>My first house, purchased, in part, to slow down expenses</figcaption>
</figure>

My living expenses here are ~$2k per month, which is low enough that I don't have to stress about them too much. It gives me the freedom to try projects like Is It Keto, which has made $1 so far. It will be a long time before it makes enough to cover my expenses, but it's cheap enough to sustain myself that I can basically eliminate my own expenses from the equation and think about whether I'm meeting my goals in terms of growing revenues and users.

# I want to do this forever

As someone who's always been independent, I love being a solo developer. It makes a world of difference when I can wake up whenever I want and make my own choices about how to spend every hour of the day. I want this to be how I spend the rest of my life.

When I was still an employee, I read books about startups, and the part that seemed most exciting was how many different knobs and levers there are when you run a small business. At any given point, you can think about high-level questions like whether you want to increase revenues or decrease costs. Or you can think about very low-level things like whether to use your engineering resources to add a new feature or to automate a manual task.

Now that I'm making those decisions, it's exactly as fun as I imagined. I love it when I can make a change and see tangible results in user growth or search engine rankings. I like weighing different options for 

It is! For Is It Keto, there are so many possible ways to grow it. Should I try to find users through Facebook? Twitter? Should I focus on improving my search rankings? Should I figure out a way to partner with keto bloggers?

# Doubts

* The things you're best at are [code reviews](/human-code-reviews-1/), [unit tests](/good-developers-bad-tests/), and generally refining processes for a team of developers. You can't afford to hire a team of full-time developers, so aren't you wasting your best skills?
* One of your fatal flaws with Zestful was you were [too afraid of sales](/shipping-too-late/#a-different-type-of-rejection). Does your new project, Is It Keto, really have good potential? Or are you just choosing to believe that because it doesn't involve sales?
* Your job at Google used to impress people. Now when people ask you what your job is, you tell them, "Um... it's a website where you type a food and it tells you whether it's keto." Shouldn't you be doing something that sounds more impressive?
* What if this doesn't work out and you have to go back and get a job, but it'll be so much worse because you know how great your life could have been as a successful entrpreneur *and* you'll feel like you wasted several years of career growth as an employee?

# Lessons learned

**Limit focus**

When I first started, I thought that I had so much free time that I could talk to people about consulting opportunities, oversee developers on multiple projects, do coding of my own, and write consistent blog posts. I've been more productive when I reduced it to just my blog and one project.

**Regularly reflect**

I find it very easy to forget . In a given week or month, it's easy for me to forget what I've accomplished. And I'll get so far down into the rabbit hole of some task that I forget to question why I'm doing it or whether it's still worth doing.

My way of combating these traps is to regularly reflect. To close out every work week, I write a shortform bulleted list of everything I accomplished that week. It's a nice way to close out the week, and I'm almost always surprised at how much I accomplished even in weeks I thought were slow. Every month, I post a retrospective on the Indie Hackers forums (e.g., Is It Keto [Month 3](https://www.indiehackers.com/forum/isitketo-returning-to-a-site-that-grew-without-me-0a0fe3ef52) and [Month 4](https://www.indiehackers.com/forum/isitketo-month-4-my-first-dollar-of-revenue-03e572f661)). And, starting with this post, every year I write a riveting blog post about my reflections on the year.

**Set goals**

Setting specific, objective goals for the month has kept me focused. Before I decided to do this, I would just do what I thought was important, but it was very undirected. It was easy for me to waste time on something and then invent rationalizations for why I did it.

If I set a specific goal like, "Achieve $50 in revenue for the month," it becomes easier to choose tasks because I can ask myself more straightforward questions: Will this task help me achieve that goal? Are there alternative ways I could spend my time that would achieve it more effectively?

# Goals for year two

Speaking of goals, I should set some for the current year. Here are my goals for year two of being a solo developer:

* Earn $500/month in revenue from my businesses, collectively (averaged over the fourth quarter).
* Present talks at three software conferences.
* Publish 12 blog posts.
* Gain comfort with a JavaScript framework (e.g., [Vue](https://vuejs.org/), [Angular](https://angular.io/), [React](https://reactjs.org/)).