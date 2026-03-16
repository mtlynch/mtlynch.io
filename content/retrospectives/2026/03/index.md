---
title: "Refactoring English: Month 15"
date: "2026-03-16"
description: TODO - One-line summary
custom_css: true
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and founder of small, indie tech businesses. I'm currently working on a book called [_Refactoring English: Effective Writing for Software Developers_](https://refactoringenglish.com).

Every month, I publish a retrospective like this one to share how things are going with my book and my professional life overall.

{{</notice>}}

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Publish two chapters of _Refactoring English_

- **Result**: Published ["Why Improve Your Writing?"](https://refactoringenglish.com/chapters/why-improve-your-writing/) and "Improve Your Grammar Incrementally"
- **Grade**: A

TODO

### Schedule a live event for _Refactoring English_ readers

- **Result**: Scheduled a discussion about design reviews
- **Grade**: A

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

## Where are _Refactoring English_ customers located?

I mentioned [in January](/retrospectives/2026/01/#adding-regional-pricing-for-my-book) that I added regional pricing for my book. When I receive Stripe notifications about new sales, I'm surprised to see that the majority of purchases seem to be outside the US, so I took a closer look at the data since my regional pricing announcement.

The first question was: is it really true that the majority of orders are with regional pricing now?

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

I was curious how order share compared with visitors to the website. Do readers from certain countries purchase more than others?

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

After the US, most website visitors come from China (5.9% of total), but I've had zero sales in China. At first, I thought buying ebooks was not so popular in China and wrote it off. But I just checked what regional discount I was offering in China and was surprised to find that I wasn't offering regional discount in China at all.

I looked at my script for generating regional prices and discovered I made two mistakes that excluded a huge number of countries:

- I only included countries where Stripe supports the local currency.
- Even with this filter, I accidentally omitted a lot of countries where Stripe supports the local currency.

The local currency thing is silly in retrospect because I can still offer a discount and just accept payment in USD. And I'm not sure how I ended up missing so many Stripe-supported countries. I even missed Kazakhstan, my new favorite country!

I was only offering regional discounts in about 39 countries. After my fixes, the list grew to 156. And within 12 hours, I got a new order from Kazakhstan.

## Should I focus on non-native speakers?

With the majority of _Reafactoring English_ readers coming from countries where English is a second language, should I adjust the book to better serve non-native speakers?

A few readers have asked about English tips for non-native speakers. I'd like to cover them, but I have no experience writing as a non-native speaker. I want everything in the book to be techniques I personally use rather than [describing techniques I've heard about secondhand](/book-reports/traction/).

My best idea is to find editing client who are non-native speakers and then look for patterns in their writing to include in the book. But right now, I'd like to get the v1 finished. The beauty of an ebook is that you can keep iterating on it and find ways to improve it even after official release.

## AI-assisted coding is becoming a problem for me

I've been using AI for software development for about a year and a half, but there have been two major inflection points:

- In February 2025, when I [started using an AI agent integrated in my code editor](/notes/cline-is-mesmerizing/)
- In December 2025, when I started [running AI agents with full permissions (within an isolated environment)](/retrospectives/2026/02/#discovering-the-power-of-ai-sandboxes)

Since December, I've been spending more and more time doing AI-assisted coding. I used to have a bad habit of checking email and social media excessively. During the past month, I've noticed on multiple days that it's 4pm, and I haven't checked email or social media at all that day. Except it's because I've fallen into an AI vortex, and forgot everything else.

Every month, I think, "Is this a problem?" And in the past few weeks, I've had to face the fact that, yes, it's a problem.

I generally start each workday by writing a simple schedule on a little notepad on my desk. I break the day into 30-minute blocks and write down how I'll spend that block. Historically, I stick to the schedule when I'm disciplined, but when I have less will power, I let fun tasks exceed their budgets by a block or two. With AI-assisted coding, I was getting to the point where it was pre-empting my entire schedule even though I recognized that it was less important than everything it was pre-empting.

I wouldn't say that I have an "addiction" to AI in the way people develop addictions to drugs or alcohol. But I am letting AI-assisted coding distract from work that I recognize is more important, like finishing my book.

There are a few factors that make AI especially compelling and easy for me to get sucked in.

### It's exciting

There are a lot of things I dislike about AI development, but I also feel like it offers an exciting amount of power. I feel like I can integrate any technology, write in any programming language, install any tool. There used to be an incredible amount of friction in using any new software, but now I can mostly just hand it to AI and ask it to figure out how to install it or debug it, and it just works.

In the 90s, Microsoft was pushing this idea of "business at the speed of thought." AI still isn't there, but it's about 100x closer than it was then. I can have an idea for a feature and give the AI agent a brief explanation, and within a few minutes, the feature has materialized.

### No natural limits

I sometimes went down a rabbit hole with traditional development where I sat down expecting to spend an hour coding and instead spent three. But without AI, there are natural limits to how long you can code. After a few hours of development, my brain feels fried and the work becomes unpleasant, unproductive, or both.

With AI, you can build a lot of useful software features without doing much deep thought. And even when something does require thought, AI makes it easier than ever to take on tech debt. It's easy to say that this is the wrong way, but I'm going to wait until tomorrow to fix it because AI doesn't mind wading through bad code. Or I just start an entirely new feature or project.

### Variable rewards

One of the things that makes gambling addictive is the variable rewards.

TODO:

I don't think that's an intentional feature of AI agents, but it definitely happens. I often don't know if a task will take 5 seconds or 20 minutes, so I sit there staring at it for a minute, then compulsively check it every few minutes, then start some other AI task while I'm waiting and now I'm cycling between multiple jobs that I don't even remember.

### Underestimating oversight required

One lie I find me telling myself over and over is, "AI will just do this in the background."

One of the most maddening experiences I have with AI is when I've set up the AI agent to complete a long task, and I come back hours later to find the AI paused its work a few minutes after I left and asked, "Okay, the next step is to try a full build, but that will take 30-60 minutes. Would you like me to continue?" Yes! Yes, that's why I left the task to you!

But then whenever I want to set AI to run in the background and forget about it, I rationalize my compulsive checks by saying, "Well, what if it's blocked and I need to unblock it?"

### I have to keep all the context

With AI assisted coding, I have a lot of tasks running in parallel. There's very much a "keep the plates spinning". With traditional software development, I'd file bugs, but that feels like too much friction. I feel like I have to .

If I interrupt and point out the other thing, it will get distracted and not complete task A. Or I have another agent waiting on task A, then I can kick off tasks B and C.

This is something that's definitely solveable. I think 2026 will likely be the year of orchestration where vendors . And we don't have to resort to Steve Yegge's fever dreams.

### Scarcity mindset

It's hard to predict exactly what effect AI will have on the software industry, but I feel confident that it will completely upend the ecosystem. I think we're still in the early stages of a massive shake-up.

Depending on how things turn out, there are paths forward for me as a software developer in an AI-dominated world, but I also think there's at least a 20% chance that we're in the last year or two of software developer being a job that requires any special knowledge or skill. It could be like what happened to [elevator operators](https://en.wikipedia.org/wiki/Elevator_operator).

Right now, there are a few factors that make AI atypically beneficial to developers in my position:

- AI is helpful for junior engineers, but senior engineers are the ones who can use it best
- There are multiple AI companies competing heavily on price, so costs are highly subsidized.
  - I use flat-rate plans, but I consume the equivalent of about $4k/month in API costs, and even those rates are probably VC-subsidized.

I feel like this probably won't last. The AI bubble could burst, and I'll have to start paying the non-subsidized metered rate. Or AI will continue to improve to the point where I have no advantage over junior engineers or even people who have never coded before.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

- Finish _Refactoring English_
  - It won't be fully polished and edited, but I want to complete all the chapters.

<script src="script.js"></script>
