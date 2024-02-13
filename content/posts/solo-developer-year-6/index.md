---
title: "My Sixth Year as a Bootstrapped Founder"
tags:
  - annual review
  - tinypilot
date: 2024-02-13T00:00:00-05:00
custom_css: true
hero_image: cover.webp
images:
  - solo-developer-year-5/og-cover.webp
description: Six years ago today, I quit my job as a developer at Google to create my own self-funded software business. This is a review of my last year and what I've learned so far about bootstrapping software businesses.
---

<!-- Disable linter complaints about duplicate headers -->
<!-- markdownlint-disable MD024 -->

Six years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to create my own bootstrapped software company.

For the first few years, all of my businesses flopped. The best of them earned a few hundred dollars per month in revenue, but none of them were profitable.

Halfway through my third year, I created a device called [TinyPilot](https://tinypilotkvm.com). It allows users to control their computers remotely. The product quickly caught on, and it's been my main focus ever since.

{{<gallery caption="TinyPilot is a small device that allows users to control their computers remotely.">}}
{{<img src="2a-front.webp" max-width="400px">}}
{{<img src="tinypilot-bios-menu-2.webp" max-width="500px">}}
{{</gallery>}}

In 2023, TinyPilot generated $997k in revenue, which I'll generously round up to a cool million. More importantly, the business earned $236k in profit, a 20x increase from 2022.

In this post, I'll share what I've learned about being a bootstrapped founder from my sixth year doing it.

## Previous updates

- [My First Year as a Solo Developer](/solo-developer-year-1/)
- [My Second Year as a Solo Developer](/solo-developer-year-2/)
- [My Third Year as a Solo Developer](/solo-developer-year-3/)
- [My Fourth Year as a Bootstrapped Founder](/solo-developer-year-4/)
- [My Fifth Year as a Bootstrapped Founder](/solo-developer-year-5/)

## TinyPilot became 20x more profitable

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

After two years of basically breaking even, TinyPilot finally earned a meaningful profit.

Most of the change is due to stronger sales. We switched to metal cases this year, which both increased the price customers were willing to pay and increased manufacturing speed.

Expenses shifted around but stayed roughly the same overall. Design costs shrunk to nearly zero, as I [stopped paying a design agency $6k/mo to tweak my logo](/tinypilot-redesign/). And I focused on scaling my existing product rather than iterating on the hardware design, which saved $100k in electrical engineering.

I don't draw a salary from TinyPilot, so the full amount I earned from TinyPilot in 2023 was $236k. This often surprises people as they can't understand how I survived for so long on the meager earnings of my first five bootstrapper years. The answer is that I live in Western Massachusetts, where the cost of living is low. From years in big tech, I had index fund investments, which generated enough dividend income to sustain me.

## The most terrifying 10 minutes of 2023

One lazy Saturday afternoon in February, I heard a knock on my door. Standing on my porch was a mid-forties guy in jeans and a windbreaker. I opened the door, still in my pajamas.

"Are you the TinyPilot guy?" he asked me.

"Uh oh," I thought. Did a disgruntled customer find my house?

"Yes..." I said cautiously.

"I'm the handyman at the office. A sprinkler burst, and we can't get into your suite. Can you come down?"

That didn't sound good.

During the five-minute drive to the office, I wondered if this was the end of my business. We we kept all of our inventory in TinyPilot's office. Would circuit boards still work after being drenched? Probably not.

TinyPilot had insurance, but I chose coverage a year before when we kept half as much inventory. And even if insurance paid out, TinyPilot would be dead in the water for months until we could start our whole manufacturing pipeline up again.

I arrived at our office building and walked up to TinyPilot's office on the second floor, the carpet squishing damply with every step I took.

When I reached my floor, I saw that the sprinkler had burst in the conference room, not TinyPilot's office. I unlocked TinyPilot's suite and found everything was bone dry. The water hadn't even trickled under our door.

My relief was short lived, as the landlord told me he might have to kick us out of our office for "weeks to months" to repair the wall we shared with the room that flooded.

{{<img src="office-damage.webp" max-width="450px" caption="A sprinkler burst in the office adjacent to TinyPilot's, destroying everything inside." alt="Photo of a room with ceiling, carpets, and furniture all removed">}}

Normally, being forced to move my entire office on a few days' notice would be disruptive, but it was _especially_ disruptive this week. I was about to take a two-week trip to Europe, my longest trip since starting TinyPilot.

If the team had to move while I was away, no one would be able to set up the computers or printers &mdash; the office IT guy was me. And if the team couldn't print shipping labels, they couldn't fulfill orders.

Long story short, we ended up not having to move, but the experience made me never want to be in that situation again. Our near-miss illustrated just how much we risked by centralizing so much of TinyPilot's operations in a single, small office.

## Outsourcing order fulfillment and reducing stress

TinyPilot's order fulfillment had always been extremely smooth, which was why I resisted outsourcing. Out of 3,500+ orders in the past two years, there were only about five total where we made an error.

In March 2023, TinyPilot switched from fulfilling orders in house to [using a third-party logistics (3PL) warehouse](/retrospectives/2023/04/). We were still assembling devices at our office, but we'd ship customer-ready packages to the warehouse, and the 3PL shipped packages to customers on-demand as orders arrived.

At the time of the shift to the 3PL, we were in ["urgent mode."](/retrospectives/2023/05/#getting-out-of-ldquourgent-moderdquo) Our team of two part-time employees could assemble about fifty devices per week, but customers were buying at the same rate. It was a stressful situation because any interruption in the week would put us at risk of pausing sales.

I had hoped that outsourcing fulfillment would free up enough of the team's time to produce about 100 devices per week. It turned out that our full capacity was still only about 70 devices per week, which would mean we'd still be scrambling for months to build up a healthy inventory at the warehouse. I ended up hiring a third employee temporarily to get us through the summer.

So, outsourcing fulfillment didn't free up a ton of time, but it did win us a lot more flexibility.

I had thought the local team already had flexibility because they could come in whenever they wanted. As long as orders were packed and ready for USPS pickup the next day, they could take their shifts at 3 AM if they felt like it.

Switching to the 3PL eliminated the daily deadline of USPS pickup. Instead, we had a weekly deadline to ship assembled products to our warehouse. That later relaxed further to a biweekly task.

The reduction in flexibility reduced a lot of stress. If an employee wanted to take a four-day weekend, they could shift their schedule around and still do all your work that week. Or you could not, and you'd know it wasn't adding work for the rest of the team because we [had spare capacity again](/solo-developer-year-5/#run-at-50-capacity).

## Making TinyPilot look like a real product

One of the most obvious changes to TinyPilot this year has been how we improved the product's physical appearance.

At the end of last year, we were still making TinyPilot's cases with a fleet of seven high-end 3D printers running nonstop. As far as 3D-printing goes, our cases were especially nice, but they still had the "just a prototype" feel of a 3D printed product.

{{<img src="voyager2-angled.webp" max-width="500px" caption="Before: TinyPilot's 3D-printed case">}}

In February 2023, we [switched to a metal case](https://tinypilotkvm.com/blog/introducing-voyager-2a).

TODO: Photo of metal case

I was surprised at how much the metal case impacted sales. Not only did it increase the absolute number of sales, it increased the price customers were willing to pay. After [experimenting with pricing](/retrospectives/2023/05/#what-price-maximizes-profits), I ended up increasing our price by 10%, and our monthly sales were still higher than when we had a 3D-printed case.

We also updated TinyPilot's packaging. Until late last year, we were still shipping TinyPilot in a plain brown box with the device and all the cables bunched together in a bubble-wrap pouch.

{{<gallery caption="Our previous packaging for TinyPilot was just neatly wrapping the device, cables, and instructions in a bubble pouch.">}}
{{<img src="labeled-blob.webp" max-width="500px">}}
{{<img src="bundle-stacked.webp" max-width="370px">}}
{{</gallery>}}

Every time someone reviewed TinyPilot, I crossed my fingers for them to skip over the unboxing process because of how much our packaging embarrassed me.

{{<img src="unboxing.webp" max-width="700px" caption="A [homelab reviewer](https://noted.lol/tinypilot-voyager-2a-2/) shows TinyPilot's old, embarassing packaging in a review" >}}

I'd had a few conversations with designers about making a nice retail box for the product, but it never came together, and it was never my top priority. After we switched to metal cases, TinyPilot's packaging stood out as particularly immature.

In the second half of 2023, we worked with a contract manufacturer to take over our full prodution process. As part of that work, they offered to make a retail box for us.

TODO: Photo of Retail box, open, closed

Our contract manufacturer did a great job on the box. It's not going to grab your eye if you saw it on the shelf at Best Buy, but it matches customer expectations of professional networking hardware they ordered online.

If someone were to make a TinyPilot unboxing video now, I'd be happy to see them open it.

## Lessons learned

### There's hidden-stress in low-latency responsibility

Switching TinyPilot's order fulfillment to a 3PL [reduced stress and increased flexibility](#outsourcing-order-fulfillment-and-reducing-stress) for TinyPilot's local team. The side-effect that surprised me most was how much stress it relieved for me.

I had been carrying around so much "what if?" stress, and I didn't even realize it.

Until we switched to the 3PL, I didn't realize how much my mind was occupied by worried like, "What

I anticipated that. I knew we were getting more flexibility. The thing that caught me by surprise was how much "what if?" stress it freed up for me.

I didn't realize until it went away, but there was always a worry in the back of my mind about all the things that could go wrong that would block fulfillment and require me to react urgently. What if the router crashes and breaks Internet for the office? What if the office desktop suddenly can't talk to the printer?

Shifting to the 3PL did significantly reduce stress, much more strongly than I anticipated. I knew that there was stress in keeping the office staffed six days a week, but I didn't realize how much more stress I carried about all the things that could block us from fulfilling orders. The office Internet could go down, a disk on the office desktop could fail. These were all things that I'd have to deal with immediately. A 3PL is subject to all of the same issues, but it's their problem. If their printer suddenly dies, it's them who has to furiously drive to Best Buy, not me.

Those worries are now all things the 3PL has to deal with quickly rather than me.

Now that we've switched to the contract manufacturer, there are even fewer things we need to worry about. The thing we're responsible for reacting to quickly is support requests, but we have five people available to do that across four cities. There are very few things that prevent all of us from responding to support requests.

### As a project matures, more time goes to maintenance

In June, I sat down to write [the changelog](https://tinypilotkvm.com/pro/changes#260) for the latest TinyPilot software update. It was surprisingly difficult to explain how any of the work we did benefitted our users. I figured I just went a little too heavy on internal refactoring work that cycle, so the next release, I'd make sure more of our work directly impacted end-users.

The [next release](https://tinypilotkvm.com/pro/changes#261), I had the same problem. After two and a half months of development, all we had to show for it were small, cosmetic improvements.

What happened to the early days when we were releasing major features every couple of months? Was I prioritizing tasks poorly? Had the team lost their enthusiasm? Had we taken on too much technical debt?

I reviewed the full list of tasks for the release, including all the work that wasn't visible to end-users. Even with the benefit of hindsight, I felt like I had chosen the right tasks. And the time we invested in each task felt reasonable as well.

{{<img src="three-category-2.6.1.webp" max-width="350px" has-border="true" caption="The tasks in TinyPilot's [2.6.1 release](https://tinypilotkvm.com/pro/changes#261), colored according to improving the product (green), automation and reducing complexity (blue), and regular maintenance (red)">}}

So, how could our progress be so much slower when we were prioritizing well and working efficiently?

I realized that the dominant factor was [the size of our codebase](/retrospectives/2023/09/#how-do-we-reduce-accidental-difficulty). We have three times as much code as we did three years ago. And every line of code requires time to maintain. So, if I keep the number of developers fixed but increase the size of the codebase, then a higher proportion of our time must go to maintaining old code.

And even beyond maintenance, more code means that new features are more expensive to build. If your app has zero features, it's very easy to build the first one. If your app already has 20 features, you have to put a lot more thought into how your 21st feature integrates with everything else.

So, I haven't figured out a way for us to go significantly faster, but I've learned to adjust my expecations about feature pace. And I've learned to adjust my planning to take into account that a new feature is going to take longer today than it did three years ago.

### Most support escalation can happpen asynchronously

Aside from me, six people work at TinyPilot in part-time roles. I try to give the team as much autonomy as possible, as I want them to feel [empowered to make their own decisions](/solo-developer-year-4/#good-leadership-means-helping-teammates-grow). At the same time, I want to make sure everyone feels comfortable asking me for help when they get stuck.

I found that one of my main sources of stress was support tickets that had escalated to me.

For a while, I thought that was just the nature of escalated support issues. I'm only seeing the toughest customer questions, so of course they're going to feel stressful. But thinking about it more, I realized there were ways for me to reduce the stress.

First, I adjusted our process for escalation. The style of escalation had been, "Michael, here's a problem we've never seen before. How do you want us to handle it?" I encouraged the team to propose a solution as part of escalating to me. If I wasn't available, and they were the last line of support, what would they tell the customer?

That worked well because 80% of the time, the team came up with the same solution that I would have recommended. And the more they did this, the better they became at tackling hard cases.

That change helped a lot, but I realized another source of stress in escalations was the time pressure. We aim to respond to customers within one business day. By the time a question was escalated to me, we had generally burned half the response window, and we risked burning the other half due to variations in the team's daily work schedules. Whenever a question escalated to me, I felt like I had to respond NOW NOW NOW to avoid being the bottleneck.

I realized they don't really need to wait on an answer from me to continue helping the customer. If 80% of the time, I'm just saying, "Yes, do that," then they could do that immediately.

In the minority of cases where I had a better idea for solving a support issue, it was almost always something the customer could try in addition to my team's suggestion. We never ran into a situation where my team said, "Oh, we wish you'd said that earlier because we suggested putting their device in the microwave, and now both are broken."

When an issue escalates to me, it usually indicates that there's knowledge trapped in my head that the whole team should have. When I'm thinking clearly, I respond to escalations by updating our internal documentation with the answer so that it's reusable in the future. When I'm feeling rushed, I skip that step and just answer in the email, where the information is more likely to be lost and forgotten.

Asynchronous support escalations helped the team develop their skills faster, reduced stress for me, and improved our documentation.

## Grading last year's goals

Last year, I set [three high-level goals](/solo-developer-year-5/#goals-for-year-four) that I wanted to achieve during the year. Here's how I did against those goals:

### Manage TinyPilot on 20 hours per week

- **Result**: I worked 35-40 hours per week, a reduction from previous years, and traveled more than any previous year.
- **Grade**: B-

It's not 20 hours, but I did work significantly less in 2023 than 2022. I did a lot of travel for both personal and work reasons, so I was "out of the office" for about five weeks cumulatively, and everything was fine.

In 2022, it frequently felt like I was ending every day with lots of loose ends. In 2023, when I signed off in the evenings, my work day usually felt complete.

### Earn $100k in profit

- **Result**: I earned $236k in profit.
- **Grade**: A+

I expected this year to be profitable, as I knew I'd be spending less on hardware engineering, but I underestimated how much additional revenue TinyPilot would earn from the switch to metal cases.

I was pleasantly surprised to exceed my goal here.

### Close the TinyPilot office

- **Result**: We still have the office for non-critical workflows.
- **Grade**: B

When I made this goal, I didn't expect our landlord to agree to a month-to-month lease, but he did. Without a long-term commitment, there's less pressure to move out by a certain deadline.

We've successfully moved the critical operations of manufacturing and fulfillment out of our office. So, we don't strictly need the office, but it's still convenient to have a home base.

If the handyman knocked on my door tomorrow to report some disaster destroyed all of our office property and made the space unusable, it would be, at worst, annoying but not catastrophic.

## Goals for year seven

### Manage TinyPilot on 20 hours per week

I know I set this as a goal in [2022](/solo-developer-year-4/#manage-tinypilot-on-20-hours-per-week) and again in [2023](/solo-developer-year-5/#manage-tinypilot-on-20-hours-per-week), but third time's the charm! My management time is definitely trending downward, so this could be my year.

### Publish a course or book

In 2021, I [said](/solo-developer-year-3/#publish-six-blog-posts-and-one-book) I'd [write a book](https://refactoringenglish.com/) to help developers improve their writing. I got 80% through the first chapter, and then TinyPilot absorbed all of my free time that year.

I still want to write that book, so if I can reduce my management time, hopefully I can use the free time to write more.

I've also been experimenting with [Nix](/tags/nix/) and [Zig](/tags/zig), two technologies that I find exciting but lacking in educational resources. Creating a course for one of those technologies could be a fun way to build my own expertise while also making them more accessible to others.

### Write software for ten working hours per week

Writing code is still one of my favorite activities.

For the past few years of TinyPilot, I've enjoyed coding, but it's never been a sensible way to spend my limited working hours. With a team of six people, several critical vendors, and many moving pieces, the most pressing parts of TinyPilot have always been management.

I hope that by outsourcing and delegating more of TinyPilot's operational side, I can free up enough of my time that coding is, if not the optimal use of my time, at least a reasonable use of my time.

## Do I still love it?

Every year, when I write these blog posts, I ask myself whether I still love what I'm doing.

2022 remains my toughest year. I still preferred it to working for an employer, but it was a massive challenge to onboard new people while also navigating around the chip shortage.

Relative to 2022, 2023 was a major improvement. There were fewer fires to put out, and it felt good to shift critical workflows to specialized vendors.

The downside to 2023 is that I find myself having a hard time getting excited about it. It was a restructuring year, and I spent a lot of time redefining TinyPilot's processes and shifting around team responsibities. TinyPilot has shown me that I'm better than the average developer at designing team processes, but I still find it painfully boring to spend so much time thinking about process.

While I can't say that I loved the year, I still prefer it to working for an employer. I'm still grateful to be in a position where I can make a living working for myself and making a product I'm proud of.

## Is it riskier to be a bootstrapped founder or a big tech employee?

I always felt like the entrepreneurial path was highly risky, but, if all else failed, I could go get another job at another Google or Microsoft. After seeing layoffs for the last year at most tech companies, I feel like my safety net disappeared.

Instead of feeling panicked to be without a fallback plan, I feel like I actually took the lower-risk path.

If I continued as an employee and got laid off in the middle of a down economy, what's my fallback? Spending months on job applications and phone screens where I'm competing with thousands of other desperate candidates with similar skills?

If TinyPilot were to go bankrupt tomorrow, my fallback is to start another company. There's always risk in starting a new company, but I'd feel good about my odds because I've had the last six years to practice.

---

_Cover image by [Loraine Yow](https://www.loraineyow.com/)._

<script src="/third-party/chart.js/2.9.4/Chart.min.js"></script>
<script src="script.js"></script>
