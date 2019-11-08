---
title: Is It Keto - Month 10
---

## One-Line Summary

Selling meal plans is harder than I expected.

## Highlights

* I sold my first meal plan on Is It Keto.

## Goal Grades

At the start of each month, I [declare what I'd like to accomplish](/retrospectives/2019/10/#goals-for-next-month). Here's how I did against those goals:

### Earn $100 in revenue from sales of keto meal plans

* **Result**: Earned only $23.87 from keto meal plan sales.
* **Grade**: D+

### Add five new articles to Is It Keto

* **Result**: Added four new articles to Is It Keto.
* **Grade**: B-



### Appear on a podcast aimed at freelancers or entrepreneurs to talk about my writing guide

* **Result**: Reached out to four podcasts, got rejections or non-responses from all of them.
* **Grade**: F

## Stats

### [Is It Keto](https://isitketo.org)

| Metric                 | September 2019 | October 2019 | Change |
|------------------------|-------------|----------------|--------|
| Unique Visitors        | 28,768      | 26,315    | <font color="red">-2,453 (-9%)</font> |
| Total Pageviews        | 75,487      | 66,578    | <font color="red">-8,909 (-12%)</font> |
| Domain Authority (Moz) | 10          | 13       | <font color="green">+3 (+33%)</font> |
| Ranking Keywords (Moz) | 2,330       | 1,574    | <font color="red">-756 (-32%)</font> |
| AdSense Earnings       | $178.79     | $75.65        | <font color="red">-$103.14 (-58%)</font> |
| Amazon Affiliate Earnings | $150.06  | $159.02        | <font color="green">+$8.96 (+6%)</font> |
| Meal Plan Sales        | N/A         | $23.87   | N/A |
| **Total Earnings**         | **$328.85**     | **$258.54**   | **<font color="red">-$90.31 (-27%)</font>** |

Revenues are way down from my [August peak](/retrospectives/2019/09/#is-it-keto) of $389. Specifically, the loss comes from reductions in AdSense earnings, which I believe have two causes:

* I reduced the sizes of my ads, as the previous sizes were overwhelming the page ([before](https://imgur.com/oAeqEDB) vs. [after](https://imgur.com/O3VPlM1)).
* I replaced some of my AdSense ads with self-ads for Is It Keto paid meal plans.

I knew I'd lose AdSense revenue by dialing down its ads, but I hoped to make up the loss in increased revenues from selling meal plans. Unfortunately, meal plan sales failed to offset those losses.

Traffic stats are slumping, too. I think this is partially due to waning interest in diets as we get closer to the end of the year and partially due to splitting readers with blogs that produce content that's similar to Is It Keto.

### [Zestful](https://zestfuldata.com)

| Metric                 | September 2019 | October 2019   | Change |
|------------------------|----------------|----------------|--------|
| Total Earnings         | $4.51          | $4.86          | <font color="green">+$0.35 (+8%)</font> |

Zestful is quietly chugging along in the background. The server costs me $7.50/month, so I'm actually running at a small loss.

Despite the seemingly flat numbers, Zestful is growing. I have more customers making regular API calls than ever before. The stats above are a month behind because my payment processor is bad at showing accrued revenue. Based on rough data, I expect a 5-10x jump in revenue for November. I've also added better logging so that, in the future, I can track my earnings in real time rather than waiting around for my API gateway to report it a month later.

## My many attempts to sell meal plans

### The boring stuff

About half of the effort in putting up the meal plans for sale was just a matter of the boring adminstrative work to make it happen:

* Drafting a royalty agreement and collecting e-signatures from my meal plan author partner
* Setting up payment processing on Stripe
* Proofreading, reformatting, and branding the meal plans to match Is It Keto's existing style conventions

### Smoke test

Before I had any meal plans to sell, I ran a "smoke test." I put up a page that advertised original keto meal plans and put a "Buy Now" button at the bottom of the page:

{% include image.html file="smoke-test.jpg" alt="Screenshot of Is It Keto smoke test" max_width="800px" img_link="true" class="img-border" fig_caption="Meal plan smoke test" %}

It was a very basic page, and it had many obvious weaknesses. I wanted to quickly put something up to see if readers had any interest in it.

During the smoke test, ~4% of users clicked the button that said "Buy Now $14.99," which was encouraging. I recognized that not every user who clicked "Buy Now" would actually pay, but I felt like if 4% were clicking based on such weak sales copy, then maybe I could get to 4% actual sales by sharpening the sales copy a bit.

### Offer actual products

The meal plan author sent me the first plan on the afternoon of Friday, October 4th. The following Monday, I got the easiest possible Stripe payment flow working and listed the 

{% include image.html file="tex-mex-v1.jpg" alt="Screenshot of first Tex-Mex sales page" max_width="416px" img_link="true" class="img-border" fig_caption="Meal plan smoke test" %}

Only one customer had signed up for my mailing list.

{% include image.html file="first-payment.jpg" alt="Screenshot of Stripe payment receipt" max_width="601px" img_link="true" class="img-border" fig_caption="My first Is It Keto meal plan sale" %}

### Self-ads

### Drop prices

10/15 to 10/15

### Reach out to users on Reddit one-by-one


{% include image.html file="reddit-post.jpg" alt="reddit post asking for meal plan advice" max_width="853px" img_link="true" class="img-border" fig_caption="reddit user asking where to find keto meal plans" %}


### Offer discounts for feedback

10/17 to 10/20

### Go back to square one

10/22 to 10/28

### Split up sales pages

10/30 to 11/6

### Experiment summary

| Experiment                        | Unique visitors | Clicked "buy" button | Completed checkout |
|-----------------------------------|-----------------|----------------------|--------------------|
| Smoke test                        | 340             | 14 (4.1%)            | 1* (0.3%)          |
| List the first meal plan for sale | 218             | 1 (0.5%)             | -                  |
| Drop prices to $4.99              | 26              | 1 (3.8%)             | -                  |
| Offer discounts via a survey      | 112             | 1 (0.9%)             | -                  |
| Re-try the smoke test             | 191             | 7 (3.7%)             | 1 (0.5%)           |
| Split up sales pages              | 288             | 2 (0.7%)             | -                  |

\* Customer signed up for mailing list and purchased the meal plan when it became available.

## Wrap up

### What got done?

* Made my first sale of Is It Keto's [meal plan product](https://isitketo.org/meal-plans/).
  * Drafted a licensing agreement with a third-party meal plan provider.
* Simplified the build process on What Got Done so that anyone can spin up a local instance with [a single command](https://twitter.com/deliberatecoder/status/1189529617947869184).
* Presented ["Why Good Developers Write Bad Tests" at PyGotham](/retrospectives/pygotham-2019-notes/).

### Lessons learned

* 

### Goals for next month

* Publish a new blog post about eliminating distractions from email and social media.
* Interview five customers for a potential new business.