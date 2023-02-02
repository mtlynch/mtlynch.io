---
title: "My Fifth Year as a Bootstrapped Founder"
tags:
  - annual review
  - tinypilot
date: 2023-02-01T00:00:00-05:00
custom_css: true
hero_image: cover.webp
images:
  - solo-developer-year-5/og-cover.webp
description: Five years ago today, I quit my job as a developer at Google to create my own self-funded software business. This is a review of my last year and what I've learned so far about bootstrapping software businesses.
---

Five years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to create my own bootstrapped software company.

For the first few years, all of my businesses flopped. None of them earned more than a few hundred dollars per month in revenue, and they all had negative profit.

Halfway through my third year, I created a network administration device called [TinyPilot](https://tinypilotkvm.com). It quickly caught on, and it's been my main focus ever since.

In 2022, TinyPilot generated $812k in revenue, a XX% increase from 2021.

In this post, I'll share what I've learned in my fifth year about being a bootstrapped founder.

## Previous updates

- [My First Year as a Solo Developer](/solo-developer-year-1/)
- [My Second Year as a Solo Developer](/solo-developer-year-2/)
- [My Third Year as a Solo Developer](/solo-developer-year-3/)
- [My Fourth Year as a Bootstrapped Founder](/solo-developer-year-4/)

## Highlights from the year

### TinyPilot got a new website

The process of working with the agency was an extremely frustrating and expensive process that I wrote about previously, but the results have been great. I never tested it rigorously, but my gut is that the website is responsible for the steady increase in sales we saw in 2022.

### The TinyPilot team grew from five to seven

At the end of 2021, the TinyPilot team was:

- Me, the founder
- Two software developers
- Two local staff who handle assembling devices and fulfilling orders
  - One of the two was also doing customer service

At the end of 2022, we added two support engineers and adjusted responsibilities:

- Me, the founder
- Two support engineers
- Two software developers
- Two local staff who handle assembling devices and fulfilling orders
  - Both now work on customer service

And fortunately, it's the same people. The same team that joined our scrappy project in early 2021 when we were selling only XX devices per month are still with the company and growing their roles as the company evolves.

The two support engineers have been a major improvement. The customer service staff doesn't have a background in web development or Linux, so before we introduced the support engineer role, I was handling all support requests that required technical knowledge. Now,

But there's also complexity in adding roles. Before, when the team was just me and two developers and two local staff, I didn't think much about interdependencies. The local staff and software developers never do work that . With the support engineer, I had to think more about workflows that cross team boundaries and how to keep communication clear.

### PicoShare became my fastest-growing project

## What went well this year?

## Lessons learned

### Let people grow, then let teams grow

### Don't become anyone's smallest client

I thought it sounded great! This agency that normally works for big clients was going to work with me!

I learned many lessons from the whole saga, but I think the core of it was a client-vendor mismatch. Most of the vendor's clients had orders of more money to blow than TinyPilot, and so the agency's processes optimized for those clients. As a result, TinyPilot got dragged into spending much more than I wanted on a slower timeline than I expected.

When I work with new vendors now, I ask them where I fall in the spectrum of their clients. If I'm an oddball client for them in any important dimension, that's a strong sign for me to look elsewhere.

### Run at 50% capacity

If a popular YouTube channel mentions you, your sales can double overnight. If you were already running at near-capacity, you'll fold when demand doubles.

Instead, what I aim for with TinyPilot is to run at around 50% capacity. That is, a balance of 50% reactive work and 50% proactive work.

The clearest example of a 50/50 split is the the technical support team: they spend around half of their time responding to support requests and half of their time finding ways to improve the product and documentation so that customers require less support.

If one person is sick or takes vacation for a week, the other person can pause their proactive work and still do all the time-sensitive tasks their counterpart was doing without it being a strain.

For some roles, the balance isn't quite 50/50, but it's a good rule of thumb.

| Team                | Reactive tasks                                                                             | Proactive tasks                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Founder             | Team management<br>Vendor management<br>Reviewing work<br>Filling gaps in responsibilities | Marketing<br>Public writing<br>Re-evaluating strategy<br>Hiring and training                               |
| Support engineers   | Answering technical support questions                                                      | Writing documentation<br>Writing blog posts<br>Investigating difficult bugs                                |
| Software developers | Releasing new features<br>Fixing urgent bugs                                               | Refactoring code<br>Improving development experience<br>Creating automated tests<br>Fixing non-urgent bugs |
| Fulfillment staff   | Assembling devices<br>Fulfilling orders<br>Customer service                                | Creating customer support playbooks<br>Assisting in marketing                                              |

### Ansible and git are not software distribution tools

### My life is better without frontend frameworks

TinyPilot has no frontend framework, and it's never been a problem.

PicoShare has no frontend framework. No webpack, no chain of dependencies I have

Whenever I tread back into a project I created before I switched to pure vanilla JavaScript, it's so miserable. Some library eight transitive dependencies away from me had a security bug, so I have to upgrade, but I can't upgrade it without upgrading 30 other libraries, and then upgrading those libraries breaks my code, and I have to chase down what changed in those libraries.

No, no. No more of that. Just vanilla JavaScript. PicoShare has a single third-party JavaScript dependency, and it only loads on certain pages. It's fine.

I understand the value of frontend frameworks, and I think there are many contexts where they make sense. I think too many developers have accepted them as reality without realizing the high cost they impose.

I understand that it might get more complicated for larger projects, but for personal projects, plain JavaScript is nice and relaxing.

## Finances

{{<revenue-graph project="tinypilot">}}

| Income/Expense                    | 2020                                 | 2021                                  | Change               |
| --------------------------------- | ------------------------------------ | ------------------------------------- | -------------------- |
| Sales                             | $53,742                              | $459,529                              | {{<delta-cell>}}     |
| Credit card rewards               | $0                                   | $1,139                                | {{<delta-cell>}}     |
| Raw materials                     | -$46,143                             | -$248,273                             | {{<delta-cell>}}     |
| Software development              | -$1,321                              | -$119,015                             | {{<delta-cell>}}     |
| Electrical engineering consulting | -$7,130                              | -$28,662                              | {{<delta-cell>}}     |
| Fulfillment staff                 | -$2,570                              | -$25,893                              | {{<delta-cell>}}     |
| Web design / branding             | -$250                                | -$15,931                              | {{<delta-cell>}}     |
| Cloud services                    | -$64                                 | -$5,554                               | {{<delta-cell>}}     |
| Office space                      | $0                                   | -$4,400                               | {{<delta-cell>}}     |
| Advertising                       | -$675                                | -$3,633                               | {{<delta-cell>}}     |
| Office equipment                  | $0                                   | -$2,083                               | {{<delta-cell>}}     |
| Everything else                   | $0                                   | -$2,738                               | {{<delta-cell>}}     |
| **Net profit**                    | <font color="red">**-$5,681**</font> | <font color="green">**$4,247**</font> | **{{<delta-cell>}}** |

## Grading last year's goals

### Grow TinyPilot to $1M in annual revenue

- **Result**: Grew TinyPilot's revenue by XX% to $812k
- **Grade**: B

I always knew that $1M was an aggressive goal. We fell short, but I'm still impressed how close we came.

### Manage TinyPilot on 20 hours per week

- **Result**: I spent more time managing TinyPilot in 2022 than in 2021.
- **Grade**: D

I'd estimate that I work 40-50 hours per week. I wrote a little more on my blog and participated slightly more in TinyPilot's software development.

I added a new team, and people expanded their roles. It's not just the work of training a new person, it's defining how they fit into other processes. And the more people you have, the more complexity there is in designing workflows that involve multiple people and multiple teams.

### Ship the TinyPilot Voyager 3

- **Result**: We never even completed the design phase
- **Grade**: D

TinyPilot has always used the Raspberry Pi 4B as the core hardware. The 4B is relatively expensive, and it's difficult to engineer extra hardware functionality on top of it.

My plan for 2022 was to create a custom circuit board built around the minimalist Raspberry Pi Compute Module 4. That would reduce our manufacturing costs by 60% and simplify our hardware design.

Instead, all of our hardware engineering time went to chasing down manufacturing issues and supply shortages, so we made no progress on a new product.

## Goals for year six

### Manage TinyPilot on 20 hours per week

I failed miserably at reducing my hours last year, but it's now my top priority.

I'm hopeful that I'll be more successful at reducing my management time this year. Most of my management work in 2022 was growing teams that can independently manage TinyPilot's day-to-day operations. It required a lot of up front investment in hiring, training, and defining processes, but I expect that investment to pay off in 2023.

### Earn $100k in profit

In previous years, I've focused on growth. For a hardware business to work, you need to be at a certain scale. At this point, I'm at the scale where I'd feel happy maintaining this indefinitely.

For most of 2023, TinyPilot's production will be constrained by supply, so I'm going to focus on profit rather than growth.

### Close the TinyPilot office

For most of the company's existence, TinyPilot's cases came from a local vendor who designed and 3D printed them. In the last few weeks, we completed the transition to metal cases.

We switched to metal cases primarily to speed up manufacturing, but the side-effects is that most of our raw materials now originate in China. That means it should be possible to have our devices arrive to the US pre-built rather than assembling and testing each device by hand in TinyPilot's office.

If we don't need to build devices in our office, that eliminates our primary reason for maintaining an office. We can move fulfillment to a third-party logistics provider, and then TinyPilot's staff will no longer be in the critical path for manufacturing and fulfillment. That makes TinyPilot and its employees more time-independent and location-independent.

## Do I still love it?

Every year, when I write these blog posts, I ask myself whether I still love what I'm doing.

2022 was a hard year &mdash; certainly my hardest since going off on my own. I wasn't miserable, but I can't say I _loved_ it.

The things I enjoy doing most are programming and writing, and the past year gave me little time for either. I spent most of my time on TinyPilot scrambling to keep up with demand, filling in gaps as we grew, and putting out small fires.

I grew as a manager. I learned more about hiring and coordinating in an organization with more complexity.

I'm hopeful that this year was hard because I was doing a lot of things that will pay dividends over the next few years.

I still prefer working for myself to working for an employer, and I plan to do it indefinitely.

---

_Cover image by [Loraine Yow](https://www.lolo-ology.com/)._

<script src="/third-party/chart.js/2.9.4/Chart.min.js"></script>
<script src="script.js"></script>
