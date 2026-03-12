---
title: "Refactoring English: Month 15"
date: "2026-03-11"
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

Okay, the extreme Kazakhstan result is based on a single customer, so that's probably an outlier. I suspect most of the outliers are my analytics undercounting visitors from certain regions.

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

Most of my readers are in the US, but a relatively low share of website visitors (0.5%) purchase the book.

Indian readers purchase at the highest rate, with 2.5% of website visitors purchasing the book. Canadian readers purchase the most by revenue, as every additional 100 Canadian readers lead to about $47 in additional book sales.

Clearly, I need to start pandering more to India and Canada. I could change all the Docker examples to cricket examples and look for more opportunities to praise Shopify.

### Fixing my regional discounts

After the US, most website visitors come from China (5.9% of total), but I've had zero sales in China. At first, I thought buying ebooks was not so popular in China and wrote it off. But I just checked what regional discount I was offering in China and was surprised to find that I wasn't offering regional discount in China at all.

I looked at my script for generating regional prices and discovered I made two mistakes that excluded tons of countries:

- I only included countries where Stripe supports the local currency.
- Even with this filter, I accidentally omitted a lot of countries where Stripe supports the local currency.

The local currency thing is silly in retrospect because I can still offer a discount and just accept payment in USD. And I'm not sure how I ended up missing so many Stripe-supported countries. I even missed Kazakhstan, my new favorite country!

I was only offering regional discounts in about 39 countries. After my fixes, the list grew to 156. Within 12 hours, I got a new order from Kazakhstan.

## Should I focus on non-native speakers?

The more serious takeaway is how much I should focus on readers who speak English as a second language.

I've heard from a few readers that they'd like more advice for non-native speakers. I'd like to do that, but the problem is that I've never learned English as a non-native speaker.

I want all the advice in the book to be based on real personal experience and not me just [repackaging things I've heard are true](/book-reports/traction/).

## Getting sucked into AI

I feel like it's about to make a huge amount of progress

### Unpredictable timing

- Tasks can take 5 seconds or 5 minutes, so I'm stuck watching.
- Sometimes I think I can leave it for an hour and it turned out that it stopped. Or it stopped because the next step would take a long time.

### Exciting

Feels like setting up a rocket

### Underestimating oversight required

- I feel like I'm going to forget context, so I have to watch.
- Especially with bug bounty, a vulnerability can be just around the corner worth $5k-$20k.

### Scarcity mindset

- Feel like I'm in the last year or two of software developer being a job.

## Bug bounty hunting

I feel like what I'm doing is obvious, but at the same time, I don't want to reveal too much because if I'm wrong and I'm the first to think of it, I don't want to give up my advantage in getting bug bounties.

I read about stories where people descend into madness because the AI agents keep praising them, and I didn't relate at all because I felt like I don't have that relationship with AI, but now I'm like, "I spent four weeks building vulnerability discovery tools because AI told me it thought it would find valuable vulnerabilities and I found only simple crashes."

## Side projects

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

- Finish _Refactoring English_
  - It won't be fully polished and edited, but I want to complete all the chapters.

### Requests for help

If you have experience with bug bounties, what should I be doing? What should I be reading? Are bug bounties just a sucker's route and there's some other path?

<script src="script.js"></script>
