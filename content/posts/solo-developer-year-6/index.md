---
title: "My Sixth Year as a Bootstrapped Founder"
tags:
  - annual review
  - tinypilot
date: 2024-02-10T00:00:00-05:00
custom_css: true
description: Six years ago today, I quit my job as a developer at Google to create my own self-funded software business. This is a review of my last year and what I've learned so far about bootstrapping software businesses.
---

<!-- Disable linter complaints about duplicate headers -->
<!-- markdownlint-disable MD024 -->

Six years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to create my own bootstrapped software company.

For the first few years, all of my businesses flopped. None of them earned more than a few hundred dollars per month in revenue, and they all had negative profits.

Halfway through my third year, I created a device called [TinyPilot](https://tinypilotkvm.com) that allows users to control their computers remotely. The product quickly caught on, and it's been my main focus ever since.

TODO: Photo of TinyPilot device with screenshot

In 2023, TinyPilot earned $200k in profit, a 10x increase from 2022. The business also generated $997k in revenue, which I'll generously round up to $1M.

In this post, I'll share what I've learned about being a bootstrapped founder from my sixth year doing it.

## Previous updates

- [My First Year as a Solo Developer](/solo-developer-year-1/)
- [My Second Year as a Solo Developer](/solo-developer-year-2/)
- [My Third Year as a Solo Developer](/solo-developer-year-3/)
- [My Fourth Year as a Bootstrapped Founder](/solo-developer-year-4/)
- [My Fifth Year as a Bootstrapped Founder](/solo-developer-year-5/)

## TinyPilot became 10x more profitable

{{<revenue-graph project="tinypilot">}}

| Income/Expense                    | 2022         | 2023         | Change               |
| --------------------------------- | ------------ | ------------ | -------------------- |
| Sales Revenue                     | $807,458     | $992,597     | {{<delta-cell>}}     |
| Credit Card Rewards               | $4,327       | $4,379       | {{<delta-cell>}}     |
| **Total Income**                  | **$811,785** | **$996,976** | **{{<delta-cell>}}** |
| Advertising                       | $51,764      | $39,270      | {{<delta-cell>}}     |
| Cloud Services                    | $9,151       | $16,408      | {{<delta-cell>}}     |
| Design Consulting                 | $30,215      | $950         | {{<delta-cell>}}     |
| Electrical Engineering Consulting | $124,643     | $23,427      | {{<delta-cell>}}     |
| Fulfillment Vendors               | $0           | $28,321      | {{<delta-cell>}}     |
| Office Rent                       | $6,600       | $6,310       | {{<delta-cell>}}     |
| Payroll                           | $205,984     | $255,779     | {{<delta-cell>}}     |
| Postage                           | $28,324      | $16,853      | {{<delta-cell>}}     |
| Raw Materials                     | $324,140     | $358,457     | {{<delta-cell>}}     |
| Everything Else                   | $25,398      | $31,404      | {{<delta-cell>}}     |
| **Total Expenses**                | **$806,219** | **$777,179** | **{{<delta-cell>}}** |
| **Net Profit**                    | **$10,447**  | **$235,568** | **{{<delta-cell>}}** |

I don't draw a salary, so $236k is the full amount I earned from TinyPilot in 2023.

## The most terrifying 10 minutes of 2023

One lazy Saturday afternoon in February, I heard a knock on my door. I opened it in my pajamas to see a guy in his mid-forties on my porch.

"Are you the TinyPilot guy?" he asked me.

"Uh oh," I thought. Did a disgruntled customer find my house?

"Yes..." I said cautiously.

"I'm the handyman at the office. A fire sprinkler burst, and we can't get into your suite. Can you come down?"

During the three-minute drive to the office, I worried this was the end of my business. That office was where we kept all of our inventory, assembled our products, and shipped our orders to customers. A fire sprinkler could easily destroy everything in our office.

TinyPilot had insurance, but I chose coverage a year before when our inventory was lower. And even if insurance paid out, TinyPilot would be dead in the water for months until we could start our whole manufacturing pipeline up again.

I got to the building and saw that, as the handyman said, everything was flooded. I walked up soaked carpeting to TinyPilot's office on the second floor, bracing myself for the worst.

I unlocked TinyPilot's suite. Everything was bone dry. The water hadn't even trickled under our door.

The sight of an untouched office was an incredible relief, but then I found out we wouldn't be able to use our office for a few days due to fire safety rules. A few days later, the landlord told me they might have to repair the wall we shared with the office that flooded. If that happened, we'd have to move to a smaller spare office for "weeks to months."

Normally, being forced to move my entire office on a few days' notice would be disruptive, but it was _especially_ disruptive this week. I was about to take a two-week trip to Europe, my longest trip since starting TinyPilot.

The office IT guy was me &mdash; nobody else knew how to set up our router, desktop, or print server if we were to move. And if the team can't print shipping labels, they can't fulfill orders.

We ended up not having to move, but the experience made me never want to be in that situation again. It illustrated sharply how much risk I was taking on by centralizing so much of TinyPilot's operations in a single, small office.

## A year of outsourcing

In XX, TinyPilot migrated its fulfillment to a third-party logistics (3PL) warehouse. They took over for

Our fulfillment had always been extremely smooth, which was why it took me so long to outsource it. In the past two years, the team had made maybe three total shipping errors out of about 3,500 orders. We advertised three business days of handling time, but 97% of orders went out within one business day.

When we shifted to the 3PL, we saved less time than I hoped, but it was a major reduction in stress. I didn't realize until we did it how stressful it was to make sure that the office was staffed and nothing was blocking us from fulfilling orders like an Internet outage, a disk failure on the office desktop, etc.

I hired a third part-time employee on a temporary basis. And even with three people, it was tough to keep up with orders.

Getting the new manufacturer up and running took XX months. They've worked out even better than we hoped. Our previous manufacturing partners have all been companies based in China. We found a US-based company with facilities overseas. They've been really hands-on in working with to improve aspects of the product, and they designed a retail box for us.

## Making TinyPilot look like a real product

It's been a 3D-printed case. I'd tried to find people to design a nicer box for the product, but it never came together, and it was never my top priority. But it definitely felt a little amateur that we shipped our product in a plain brown box with the device and all the cables just globbed together in a bubble-wrap pouch.

But now, it looks like a real thing. If someone were to do an unboxing video, I'd be happy to see them open it.

Retail box

Metal case

## Lessons learned

### There's a hidden-stress in low-latency responses

Deliberately designed not to be a low-latency business. Nobody carries a pager. Nothing has to happen within minutes.

There's such a big difference between having to make sure the office can run every day to not.

Our responsibility became building enough devicees. And then when we switched over to the manufacturer, the low-latency part became support, and there are fewer single-points of failure. And very few that we manage ourselves.

Two people could be unavailable.

Buffer of about a week's worth of devices.

### As a project matures, more time goes to maintenance

Why does it feel like we're just running in place? In the early days, we'd release huge features every month. Now, it felt like every release, I was struggling to write the release announcement because there was nothing that exciting in it.

So, I looked back at what work we had done, and I didn't regret any of the decisions.

Every line of code takes time to maintain. So if we had two developers three years ago, and we have two developers today, but our codebase is three times larger, then more of our time will go to maintenance. And new feature work is just going to take longer because it's harder to design around existing infrastructure than it is to do pure greenfield development.

We tested rigorously, we . We're not shipping a web app where we control everything server-side. We're shipping updates to software that our customers run locally. We deal with things like filesystem corruption

I felt frustrated that we were making such slow progress on features and we were getting bogged down with maintenance tasks.

We can make this fix, but what's the pattern? On page X, we do it this way, but on page Y, we do it this way.

### Encourage asynchronous escalation

I try to give the team as much autonomy as possible. I want them to feel empowered to make their own decisions. At the same time, I want to make sure they feel comfortable asking for support when they get stuck, so I say that anyone can always escalate issues or questions to me.

But I was finding that escalation was quickly becoming a source of stress for me. For a while, I thought that was just the nature of esclating issues. I'm only seeing the really tough customer questions, so they're going to feel more stressful, but I tried to think of ways to reduce the pressure on me.

The first change I made was to adjust our process for escalation. Instead of presenting a problem and saying, "Okay, now what?" escalation involved proposing a strategy. Like, if I wasn't available and you were the last line of support, what would you tell the customer?

That worked well because it turned out that about 80% of the time, the team came up with the same solution that I would have recommended. And the more they did this, the better they became at tackling hard cases.

But then I realized I still felt stressed out, and part of it was the time pressure. We aim to respond to customers on our support forum within one business day. By the time a question was escalated to me, we were usually 8-12 hours into our response window. There wasn't a lot of time for me to think of a response, my teammate to read the response, then get the answer back to the customer within our target window.

I realized they don't really need to wait on an answer from me to continue helping the customer. If 80% of the time, I'm just saying, "Yes, do that," then they could do that immediately. And in the 20% of cases where I can think of a better approach, the suggested path was never disastrous. Like they're never saying, "My idea is they pop their device in the microwave for two minutes on high." So if they said to try changing setting X and I thought they'd have more luck changing setting Y, that was fixable later.

## Grading last year's goals

Last year, I set [three high-level goals](/solo-developer-year-5/#goals-for-year-four) that I wanted to achieve during the year. Here's how I did against those goals:

### Manage TinyPilot on 20 hours per week

- **Result**: I worked 35-40 hours per week, a reduction from previous years, and traveled more than ever
- **Grade**: B-

It's not 20 hours, but I did work significantly less in 2023 than 2022. I did a lot of personal and work travel, so I was "out of the office" for about five weeks cumulatively, and things still went smoothly.

My workday used to start whenever I woke up, usually 7 or 8am, and end when I ate dinner at 6:30pm, with breaks for breakfast, lunch, and exercise. This year, I moved the end time up to 5:30pm, and that made a big difference in feeling like I had time to unwind and do non-work things in the evening. In 2022, it frequently felt like I was ending the day without getting to everything I wanted, whereas in 2023, I frequently felt like I got to everything I needred to.

In 2023, I found more time for writing wrote four new blog posts but 15 new "notes" posts, which is what I started doing when I wanted to share something but I didn't want to polish it enough for a blog post.

### Earn $100k in profit

- **Result**: Earned $200k in profit
- **Grade**: A+

This caught me by surprise. My first two years running TinyPilot, I was basically at breakeven. Sales were going well, but I was also spending a ton on electrical engineering and software development, and a lot of my cash was tied up in inventory.

One of the major changes was that my electrical engineering costs dropped drastically. In previous years, I had to iterate on our hardware design as the supply chain evolved and as we learned new things from manufacturing. But by 2023, we'd been manufacturing the same hardware for about a year, so we didn't have to do as much redesigning.

I also underestimated how much the metal case would increase the value. I didn't experiment much with price before, but we were selling the 3D-printed version for $XX. When I switched to the metal case, I discovered that customers were willing to buy at higher prices (TODO: link).

### Close the TinyPilot office

- **Result**: We still have the office for non-critical workflows
- **Grade**: B

I felt like we were past the point where it made sense to do a lot of our tasks in-house. Even though it went smoothly, there were lots of risks that could seriously disrupt business, such as pipes exploding.

It is awfully convenient. The team likes having a quiet place to work rather than working from home. And rent is only $600/month, so it's not a huge expense.

So, if a pipe burst in our office tomorrow and destroyed everything, it would be inconvenient, but we'd be fine. The most important thing we do there now is process returns, but we're in the process of handing that job over to our manufacturer.

I didn't think our landlord would let us go month-to-month, but he ended up being fine with it. So if there's no long-term commitment, and we're using it out of convenience rather than necessity, I'm happy to keep it.

## Goals for year seven

### Manage TinyPilot on 20 hours per week

I know I set this as a goal in 2022 and 2023, but third time's the charm! My management time is definitely trending downward, so I think this year I can get to 20 hours per week.

### Publish a course or book

I created a course about blogging, and I'm proud of the material. I wish I'd done more of that.

When I look around at technology that I find exciting like Zig or Nix, I see such a dearth of long-form educational materials. Something I've realized over the years is that I enjoy teaching much more than most developers do. I also write so much publicly that I feel more comfortable writing material than most people do. Looking back on a lot of the blog posts I wrote this year.

Also, in 2021, I said I'd write a book, and I still want to write it.

### Write software for ten working hours per week

Writing code is still one of my favorite ways to spend time. For the past few years of TinyPilot, I've enjoyed coding, but it's never been a sensible way to spend my limited working hours. With a team of six people, several critical vendors, and many moving pieces, the most pressing parts of TinyPilot have always been management.

I hope that by outsourcing and delegating more of TinyPilot's operational side, I can free up enough of my time that coding is, if not the optimal use of my time, at least a positive use of my time.

## Do I still love it?

Every year, when I write these blog posts, I ask myself whether I still love what I'm doing.

2022 was the roughest year I've had running my own business. I still preferred it to working for an employer, but it was stressful adjusting to a lot of TinyPilot's growth.

2023 was a restructuring year. I deliberately shifted focus away from sales growth, product redesigns, and new features so that TinyPilot could focus on the long-term. So, in that way, 2023 was a major improvement over 2022. Still, I find myself having a hard time getting excited about it.

So, I'll say that 2023 was fine. I enjoyed lots of it, I didn't _love_ it. It's kind of hard to love. I spent a lot of time designing new processes. I think I'm good at it, but it's not something I love doing.

It's interesting being a bootstrapped founder after a year of tech layoffs. When I quit my job, my safety net was to just go get another big tech job. And now it's seeming like my safety net is gone.

But I'm grateful that for the past six years, I've been practicing how to make money without an employer. And so at this point, I feel like what I'm doing now maybe is the safer choice.

I always felt like, "Worse comes to worst, I just go back to working at a big tech company." But now I feel grateful that I'm more protected from layoffs and I've spent the last six years building skills around making money without an employer.

---

_Cover image by [Loraine Yow](https://www.lolo-ology.com/)._

<script src="/third-party/chart.js/2.9.4/Chart.min.js"></script>
<script src="script.js"></script>
