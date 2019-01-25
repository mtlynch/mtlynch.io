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

On February 1st, 2018, I [quit my job](/why-i-quit-google) as a software engineer at Google to start my own single-person software company. Today marks my first full year as a solo developer, so I thought it would be a good time to reflect on how the decision has affected my money, lifestyle, and happiness.

# How I made and spent money

I'll start with money. It's the thing most people are interested in because it's one the strongest motivators to starting a business and the largest obstacle to doing so.

Here is a high-level overview of all my business revenues and expenses for 2018:

{% assign fig_caption = 'Profit and Loss chart via [Bench](http://refer.bench.co/pPrqq).' | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="bench-2018.jpg" alt="Profit and loss for 2018" max_width="793px" class="img-border" img_link="true" fig_caption=fig_caption %}

One way of looking at this chart is that I lost $21k in a single year. Alternate interpretation: I grew profits by almost $1k each month!  If this trend continues, I should be fabulously wealthy quite soon.

{% assign fig_caption = 'Profit and loss through 2019, projected' %}

{% include image.html file="2019-projected.jpg" alt="Projected earnings for 2019" max_width="793px" class="img-border" img_link="true" fig_caption=fig_caption %}

Okay, that's a bit of a "fanciful" interpretation. The reason that my profits increased (i.e., remained negative, but decreased in magnitude) was that I reduced spending. In April, I had four different part-time developers working for me simultaneously, which was way too much.

The change in my spending also resulted from a significant change in my personal life, which I'll cover a bit later in the post.

# Project by project

## mtlynch.io *(this blog)*

My biggest source of revenue in 2018 was this blog. I deliberately avoid monetizing this blog because I want readers to feel like they're getting high-quality information about topics I care about. I don't want people to wonder if I'm just baiting them to my site so that they can click ads and earn me money. Despite my best efforts, this blog earned more than any of my other projects.

In 2018, this blog receied 981k pageviews and earned $1.2k in affiliate revenue, which I think is on the low side.

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

Is It Keto is my current focus. It gives readers clear, simple answers about which foods are compatible with the keto diet. If the food is keto-approved, the site displays links where the reader can purchase it online, and the site receives affiliate revenue for the sale. I only began monetizing it at the end of November, so revenues are small, but I'm hopeful that I can grow them quickly.

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

Space Duck was a project for me to build something on top of Sia. After running some experiments, I decided that Sia was not yet ready to support anything I had in mind, so I moved on. I never got to the point of monetizing it.

| Income/Expense | Amount |
|---------|----------------------|
| Logo design | -$250 |
| Website development | -$1,373 |
| Hosting | -$25 |
| Domain | -$60 |
| **Net profit** | -**$1,708** |

## [Zestful](https://zestfuldata.com)

Zestful was my foray into machine learning. It allows app developers to take an ingredients like, "1.5 cups finely chopped red onions," and interpret it as structured data: quantity is, "1.5," unit is, "cups," etc. I put the project in maintenance mode in September after several months of [failing to convince any app developers to use it](/shipping-too-late/).

Interestingly, several people have reached out to me in the past few months with plans for using it on new projects, so maybe it will come back to life in 2019.

This was, by far, my most expensive project

| Income/Expense | Amount |
|---------|----------------------|
| Client payments | $0\* |
| Development | -$7,440 |
| Logo design | -$200 |
| Hosting | -$164 |
| Domains | -$50 |
| **Net profit** | **-$7,854** |

\* It *technically* earned about $1 but my payment processor won't pay out amounts less than $2.

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

Many of my expenses are for general development or running my business, so they don't fit into a single project.

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
  <figcaption>My first house.</figcaption>
</figure>

My living expenses here are ~$2k per month, which is low enough that I don't have to stress about them too much. It gives me the freedom to try projects like Is It Keto, which has made $1 so far. It will be a long time before it makes enough to cover my expenses, but it's cheap enough to sustain myself that I can basically eliminate my own expenses from the equation and think about whether I'm meeting my goals in terms of growing revenues and users.

# Why I'm not consulting

People are often surprised to learn that I'm not doing any freelance or consulting work.

The main reason is that I don't need to. Because I purchased a house in an area with a low cost of living, I can sustain myself for several more years just from my savings.

One of my biggest mistakes after quitting was [saying yes too much](/since-quitting/#managing-stress). It was hard to make progress on anything when I had several projects running simultaneously. I know consultants that comfortably support themselves working only a couple months per year, but they had to do much more work to get to that point. Instead, I'd rather put all my focus into building a sustainable business.

# Day to day routines



# What's it like?

Before quitting, I could tell people that my job was to endlessly move bits from one database to another, and they'd be impressed because it was Google (sidenote: that was my job). I love working on Is It Keto. It's exactly what I imagined in that I can make changes and see tangible results in things like user visits, revenue, and search engine rank. It's fun to work on something where I have such control and there are so many different possibilities for growth. But I must admit that I can't help but feel embarrassed when people ask me what exciting app I quit Google to work on and my response is, "Um... It's a website where you put in a food and it tells you whether or not it's keto..."

Zestful was fun to work on. It was interesting learning more about machine learning, but it felt like there was no payoff. Probably because I lieterally did not get paid, since I never found customers.

# I want this to be forever

I dread going back

People ask me if I regret quitting and I definitely do not. Even when I do stress about money, I'd gladly take that over the stress of having to spend my day according to other people's schedules, carrying out tasks that other people choose for me. I really want this to be how I spend the rest of my life.

I remember reading books about startups and thinking how fun it would be to make decisions about what part to focus on. Do I focus on user growth or new features? Do I focus on social media or search engine optimization? Now, I'm doing that and it's exactly as fun as I hoped.

I love waking up whenever I want. I love that some days I can spontaneously decide it's a vacation day. It's how I want to spend the rest of my life.

# What I've learned

**Limit focus**

When I first started, I thought that I had so much free time that I could talk to people about consulting opportunities, oversee developers on multiple projects, do coding of my own, and write consistent blog posts. I've been more productive when I reduced it to just my blog and one project.

**Regularly reflect**

I reflect on my progress weekly, monthly, and, as of this blog post, annually. To close out every work week, I write a shortform bulleted list of everything I accomplished that week. It's a nice way to close out the week, and I'm almost always surprised at how much I accomplished even in weeks I thought were slow. Every month, I post a retrospective on the Indie Hackers forums (e.g., Is It Keto [Month 3](https://www.indiehackers.com/forum/isitketo-returning-to-a-site-that-grew-without-me-0a0fe3ef52) and [Month 4](https://www.indiehackers.com/forum/isitketo-month-4-my-first-dollar-of-revenue-03e572f661)). It helps me take a step back and reassess my strategy at a high level and set goals for the next month. And starting with this post, every year I write a riveting blog post about my reflections on the year.

**Set goals**

Setting specific, objective goals for the month has helped keep me focused and is a check on my natural tendency to clean up code forever. If my goal is to reach $50 in revenue for the month, and I'm not there yet, then I know that I don't have time to clean up some ugly code that's bothering me because it won't help me achieve my goal.

# Goals for year two

I've been following another solo developer named Cory Zue. He's fun to watch because he's doing something very similar to what I want. His business is also. But something he did which I'll steal is setting yearly goals.

My goals for 2019:

* Earn $500/month in revenue from my businesses (averaged over the fourth quarter).
* Present talks at three software conferences.
* Publish 12 blog posts.
* Gain comfort with a JavaScript framework (e.g., Vue, Angular, React).