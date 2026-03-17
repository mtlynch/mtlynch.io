---
title: "Refactoring English: Month 15"
date: "2026-03-17"
description: Where do *Refactoring English* readers come from?
custom_css: true
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and founder of small, indie tech businesses. I'm currently working on a book called [_Refactoring English: Effective Writing for Software Developers_](https://refactoringenglish.com).

Every month, I publish a retrospective like this one to share how things are going with my book and my professional life overall.

{{</notice>}}

## Highlights

- It turns out that most of _Refactoring English_'s readers come from outside the US.
- I'm using AI-assisted coding too much.

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Publish two chapters of _Refactoring English_

- **Result**: Published ["Why Improve Your Writing?"](https://refactoringenglish.com/chapters/why-improve-your-writing/) and "Improve Your Grammar Incrementally"
- **Grade**: A

### Schedule a live event for _Refactoring English_ readers

- **Result**: Scheduled a discussion about design reviews
- **Grade**: A

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

Visits and orders are down, but mainly because January was [such an outlier](/retrospectives/2026/02/#refactoring-english-metrics) due to ["The Most Popular Blogs of Hacker News in 2025."](https://refactoringenglish.com/blog/2025-hn-top-5/) I got another lucky bump from the HN moderators putting ["My Eighth Year as a Bootstrapped Founder"](/bootstrapped-founder-year-8/) on the front page.

## Where do _Refactoring English_ readers come from?

I mentioned [in January](/retrospectives/2026/01/#adding-regional-pricing-for-my-book) that I added regional pricing for my book. I wasn't tracking data carefully, but just based on order notifications, it seemed like most of my orders were coming from countries outside the US, so I took a closer look at the data.

The first question was: is it really true that the majority of orders use regional pricing now?

<div class="sales-chart-group">
  <div class="sales-chart" data-view="orders">
    <canvas id="orders-by-country"></canvas>
  </div>
  <div class="sales-chart" data-view="revenue" hidden>
    <canvas id="revenue-by-country"></canvas>
  </div>
  <div class="sales-chart-toggle">
    <button class="active" data-view="orders">By order count</button>
    <button data-view="revenue">By revenue</button>
  </div>
</div>

It's true. The majority of _Refactoring English_ customers are now outside of the US. The US accounts for only 28% of orders by volume and 40% by revenue.

I was also surprised to see how many customers purchase from countries like India and Brazil, where English is not the primary language, so I checked English vs. non-English primary countries:

<div class="sales-chart-group">
  <div class="sales-chart" data-view="orders">
    <canvas id="orders-english-split"></canvas>
  </div>
  <div class="sales-chart" data-view="revenue" hidden>
    <canvas id="revenue-english-split"></canvas>
  </div>
  <div class="sales-chart-toggle">
    <button class="active" data-view="orders">By order count</button>
    <button data-view="revenue">By revenue</button>
  </div>
</div>

Surprisingly, the majority of orders for _Refactoring English_ come from countries where English is not the primary language, though English-speaking countries are a small majority revenue-wise.

Next question: Do readers from certain countries purchase at a higher rate than others relative to total website visitors?

<div class="sales-chart-group">
  <div class="sales-chart" data-view="orders">
    <canvas id="orders-per-visitor"></canvas>
  </div>
  <div class="sales-chart" data-view="revenue" hidden>
    <canvas id="revenue-per-visitor"></canvas>
  </div>
  <div class="sales-chart-toggle">
    <button class="active" data-view="orders">By order count</button>
    <button data-view="revenue">By revenue</button>
  </div>
</div>

Wow! One out of every six readers in Kazakhstan purchase the book! I need to start advertising in Kazakhstan.

Okay, the extreme Kazakhstan result is based on a single customer, so that's probably an outlier. And I bet my website analytics undercount visitors from Kazakhstan.

What if I focus on the top countries based on website visitors?

<div class="sales-chart-group">
  <div class="sales-chart" data-view="orders">
    <canvas id="orders-vs-visitor-share"></canvas>
  </div>
  <div class="sales-chart" data-view="revenue" hidden>
    <canvas id="revenue-vs-visitor-share"></canvas>
  </div>
  <div class="sales-chart-toggle">
    <button class="active" data-view="orders">By order count</button>
    <button data-view="revenue">By revenue</button>
  </div>
</div>

The US is my top country for website visitors, but a relatively low share (0.5%) purchase the book.

Indian readers purchase at the highest rate, with 2.5% of website visitors purchasing the book. Canadian readers purchase the most by revenue, with every Canadian reader giving me about $0.47 in additional book sales.

Clearly, I need to start pandering more to India and Canada in the book. I could change all the Docker examples to cricket examples and look for more opportunities to praise Shopify.

### Fixing my regional discounts

After the US, most website visitors come from China (5.9% of total), but I've had zero sales in China. At first, I thought buying ebooks was not so popular in China, but I just checked what regional discount I was offering in China and was surprised to find it was zero. I wasn't offering a regional discount in China at all.

I made two mistakes in my price generation scripts that excluded a huge number of countries:

- I only included countries where Stripe supports the local currency.
- Even with this filter, I accidentally omitted a lot of countries where Stripe supports the local currency.

The local currency thing is silly in retrospect because I can still offer a discount and just accept payment in USD. And I'm not sure how I ended up missing so many Stripe-supported countries. I even missed Kazakhstan, my new favorite country!

I was only offering regional discounts in about 39 countries. After my fixes, the list grew to 156. And within 12 hours, I got a new order from Kazakhstan.

## Should I focus on non-native speakers?

With the majority of _Reafactoring English_ readers coming from countries where English is a second language, should I adjust the book to better serve non-native speakers?

A few readers have asked about English tips for non-native speakers. I'd like to tackle the subject, but I have no experience writing as a non-native speaker. I want everything in the book to be techniques I personally use rather than [things I've heard secondhand](/book-reports/traction/).

My best idea is to find editing client who are non-native speakers and look for patterns in their writing to include in the book. But right now, I'd like to get the v1 finished. The beauty of an ebook is that you can keep iterating on it and find ways to improve it even after official release.

## AI-assisted coding is becoming a problem for me

I've been using AI for software development for about a year and a half, but there have been two major inflection points:

- In February 2025, I [started using an integrated AI agent in my code editor](/notes/cline-is-mesmerizing/)
- In December 2025, when I started [running AI agents with full permissions (within isolated environments)](/retrospectives/2026/02/#discovering-the-power-of-ai-sandboxes)

Since December, I've been spending more and more time doing AI-assisted coding. It's become an ever-increasing part of my workday and non-work time.

I used to have a bad habit of checking email and social media excessively. During the past month, I've repeatedly had the experience of noticing that it's 4pm, but I haven't checked email or social media. Except it's because I've fallen into an AI vortex and forgot everything else.

Every month, I think, "Is this a problem?" And in the past few weeks, I've had to face the fact that, yes, it's a problem.

I generally start each workday by writing a schedule on a little notepad on my desk. I break the day into 30-minute blocks and write down how I'll spend that block. Historically, I stick to the schedule when I'm disciplined. When I have less will power, I let fun tasks exceed their budgets by a block or two. With AI-assisted coding, I was getting to the point where I'd make a schedule and then completely ignore it and play with AI all day.

I wouldn't say that I have an "addiction" to AI in the way people develop addictions to drugs or alcohol, but I am letting AI-assisted coding distract me from work that I recognize is more important, like finishing my book.

There are a few factors that make AI especially compelling and easy for me to get sucked into:

### AI coding is exciting

I feel like I can integrate any technology, write in any programming language, install any tool. There used to be an annoying level of friction in using any new software, but now I can mostly just hand it to AI and ask it to figure out how to install it or debug it, and it just works.

In the 90s, Bill Gates published a book called [_Business @ the Speed of Thought_](https://en.wikipedia.org/wiki/Business_@_the_Speed_of_Thought). I've never read it, but I keep thinking back to that book title as I use AI. It's not literally at the speed of thought, but it's closer than anything I ever imagined. I can have an idea for a feature, give a brief explanation to an AI agent, and see the feature materialize in minutes.

### AI coding has no natural limits

Even before AI, I'd often intend to spend an hour coding and instead spent three. But there were natural limits to how long I could code. A few hours of intense dev work fries my brain, and work becomes unpleasant, unproductive, or both.

With AI, you can build for hours without doing any deep thought. And even when something does require thought, AI makes it easier than ever to take on tech debt. When I'm coding myself, I don't want to do something the ugly way because then I'm the one who has to maintain that hack. But if I'm making AI do everything, I don't feel the pain of hacky, ugly code.

### AI coding offers variable rewards

One of the things that makes gambling addictive is [variable rewards](https://www.nirandfar.com/want-to-hook-your-users-drive-them-crazy/). Our brains are more captivated by a system that gives you $10 at random intervals than one that delivers you money on a fixed, predictable schedule.

Whether intentional or not, my experience with AI agents varies wildly. Sometimes, I point it at a 2,000 line log file and diagnose the issue before I've even asked a question. Other times, I give it a simple task, and it spends the next 20 minutes aimlessly roaming my codebase.

Because I don't know if the wait will be 5 seconds or 20 minutes, I sit there staring at the agent for a minute, then compulsively check it every few minutes, then start some other AI task while I'm waiting. And then I'm cycling between multiple agents and don't even remember what they're all doing.

One of the most maddening experiences I have with AI is when I've set up the AI agent to complete a long task, and I come back hours later to find the AI paused its work a few minutes after I left and asked, "Okay, the next step is to try a full build, but that will take 30-60 minutes. Would you like me to continue?" Yes! That's why I left the task to you!

### Get while the gettin's good

It's hard to predict exactly what effect AI will have on the software industry, but I feel confident that it will completely upend the ecosystem. We're in the early stages of a massive shake-up.

Depending on how things turn out, there are paths forward for me as a software developer, but I also think there's at least a 20% chance that we're in the last year or two of "software developer" being a job that requires any special knowledge or skill. It could be like what happened to [elevator operators](https://en.wikipedia.org/wiki/Elevator_operator).

Right now, there are a few factors that make AI-assisted development especially attractive for developers in my position:

- AI is helpful for junior engineers, but senior engineers are the ones who can use it best
- There are multiple AI companies competing heavily on price and using VC money to subsidize costs.
  - I use flat-rate plans, but I consume the equivalent of about $4k/month in API costs, and even those rates are probably VC-subsidized.

The current situation with AI can't last. The AI bubble could burst, and I'll have to start paying the non-subsidized, metered rate. Or AI will continue to improve to the point where I have no advantage over junior engineers or even people with no software experience.

## How to get my AI usage back under control

I've found a few techniques for getting my AI usage back to a manageable place:

- Don't start the day with an AI project
  - If I start with AI and then work on my book, then I'm switching from an exciting, easy task to a hard, unsexy task.
  - If I instead start the day with [an hour of writing](/retrospectives/2025/06/#one-hour-of-good-writing-per-day-works), I've done my hard task for the day and don't have to move uphill.
  - This is challenging because I often set up long AI tasks overnight, and I'm always curious in the morning to see how they turned out.
- Reduce parallel AI-driven projects.
  - Parallel work _feels_ appealing because I can cycle between agents.
  - In practice, I find it sucks me in too much because there's a [spinning plates](https://en.wikipedia.org/wiki/Plate_spinning) mentality of some agent always needing attention.

## Wrap up

### What got done?

- Published two new book chapters
- Published ["Eversource EV Rebate Program Exposed Massachusetts Customer Data"](https://mtlynch.io/eversource-resource-innovations-exposure/) and [complained to the MA Department of Public Utilities](https://eeaonline.eea.state.ma.us/dpu/fileroom/#/dockets/docket/12810)

### Lessons learned

- Don't start the day with an AI coding project.
  - It's too distracting and too hard to switch to something harder but more important.

### Goals for next month

- Finish _Refactoring English_
  - It won't be fully polished and edited, but I want to complete all the chapters.

<script src="script.js"></script>
