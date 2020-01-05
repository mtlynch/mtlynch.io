---
title: Is It Keto - Month 10
description: Quickly made my first sale, then struggled to make more.
images:
- /retrospectives/2019/11/first-payment.jpg
date: '2019-11-08'
---

## Highlights

* I sold my first meal plan on [Is It Keto](https://isitketo.org).
* I then tried five different experiments for increasing sales.
* Is It Keto's revenue dropped for the month as I redirected resources toward its failing meal plans.

## Goal Grades

At the start of each month, I [declare what I'd like to accomplish](/retrospectives/2019/10/#goals-for-next-month). Here's how I did against those goals:

### Earn $100 in revenue from sales of keto meal plans

* **Result**: Earned only $23.87 from keto meal plan sales.
* **Grade**: D+

It turns out it's really hard to get people to spend money on things that other sites offer for free. Despite my best efforts, I only managed to sell two meal plans, far lower than the volume I expected.

### Add five new articles to Is It Keto

* **Result**: Added four new articles to Is It Keto.
* **Grade**: B-

I was a bit overambitious in how quickly I could ramp up the site's new writer, but we came close to the target.

### Appear on a podcast aimed at freelancers or entrepreneurs to talk about my writing guide

* **Result**: Reached out to four podcasts, got rejections or non-responses from all of them.
* **Grade**: F

It still feels unfortunate that I can't connect my [guide to hiring writers](/hiring-content-writers/) with an audience. Even fairly small, niche podcasts for freelance writers weren't interested in talking to me about my article.

## Stats

### [Is It Keto](https://isitketo.org)

| Metric                    | September 2019 | October 2019 | Change                                      |
| ------------------------- | -------------- | ------------ | ------------------------------------------- |
| Unique Visitors           | 28,768         | 26,315       | <font color="red">-2,453 (-9%)</font>       |
| Total Pageviews           | 75,487         | 66,578       | <font color="red">-8,909 (-12%)</font>      |
| Domain Authority (Moz)    | 10             | 13           | <font color="green">+3 (+30%)</font>        |
| Ranking Keywords (Moz)    | 2,330          | 1,574        | <font color="red">-756 (-32%)</font>        |
| AdSense Earnings          | $178.79        | $75.65       | <font color="red">-$103.14 (-58%)</font>    |
| Amazon Affiliate Earnings | $150.06        | $159.02      | <font color="green">+$8.96 (+6%)</font>     |
| Meal Plan Sales           | N/A            | $23.87       | N/A                                         |
| **Total Earnings**        | **$328.85**    | **$258.54**  | **<font color="red">-$70.31 (-21%)</font>** |

Revenues are way down from my [August peak](/retrospectives/2019/09/#is-it-ketohttpsisitketoorg) of $389. The loss comes from reductions in AdSense earnings, which I believe have two causes:

* I reduced the sizes of my ads, as the previous sizes were overwhelming the page ([before](https://imgur.com/oAeqEDB) vs. [after](https://imgur.com/O3VPlM1)).
* I replaced some of my AdSense ads with [self-ads](#i-added-self-ads) for Is It Keto paid meal plans.

I knew I'd lose AdSense revenue by dialing down its ads, but I hoped to make up the loss in increased revenues from selling meal plans. Unfortunately, meal plan sales failed to offset those losses.

Traffic stats are slumping, too. I think this is partially due to waning interest in diets as we get closer to the end of the year. I might also be losing SEO battles with blogs that produce content that's similar to Is It Keto but put more effort into gaming Google's algorithms.

### [Zestful](https://zestfuldata.com)

| Metric                 | September 2019 | October 2019   | Change |
|------------------------|----------------|----------------|--------|
| Total Earnings         | $4.51          | $4.86          | <font color="green">+$0.35 (+8%)</font> |

Zestful is quietly chugging along in the background. The server costs me $7.50/month, so I'm actually running at a small loss.

Despite the seemingly flat numbers, Zestful is growing. I have more customers making regular API calls than ever before. The stats above are a month behind because my payment processor is bad at showing accrued revenue.

Based on rough data, I expect a 5-10x jump in revenue for November. I've also added better logging, which allows me track my earnings in real time from now on rather than waiting around for my API gateway to report it a month later.

## My many attempts to sell meal plans

As I mentioned [last month](/retrospectives/2019/10/#creating-premium-meal-plans-for-is-it-keto), my big venture for October was to launch paid meal plans on Is It Keto, my website about the keto diet.

The launch came together as expected. I worked with a third-party meal plan author who agreed to let me resell their plans under the Is It Keto brand in exchange for a royalty on every sale.

I managed to make a couple of sales, but it proved to be far harder than I anticipated.

### I ran a smoke test

Before I had any meal plans to sell, I ran a "smoke test." I put up a page that advertised original keto meal plans and put a "Buy Now" button at the bottom of the page:

{{< img src="smoke-test.jpg" alt="Screenshot of Is It Keto smoke test" caption="Meal plan smoke test" maxWidth="600px" hasBorder="True" >}}

It was a very basic page, and it had many obvious weaknesses, but I wanted to put something up quickly to see if readers had any interest in it.

During the smoke test, ~4% of users clicked the button that said "Buy Now $14.99," which was encouraging. I recognized that not every user who clicked "Buy Now" would actually pay, but I felt like if 4% were clicking based on such weak sales copy, then maybe I could achieve 4% true conversion by sharpening the sales copy a bit.

### I offered an actual product

The meal plan author sent me the first plan on the afternoon of Friday, October 4th. The following Monday, I got the easiest possible Stripe payment flow working and listed the meal plan for sale on my site:

{{< img src="tex-mex-v1.jpg" alt="Screenshot of first Tex-Mex sales page" caption="Putting my first meal plan up for sale" maxWidth="416px" hasBorder="True" >}}

Only one customer had signed up for my mailing list, but she purchased a plan within two hours of launch:

{{< img src="first-payment.jpg" alt="Screenshot of Stripe payment receipt" caption="My first Is It Keto meal plan sale" maxWidth="601px" hasBorder="True" >}}

I made my first sale within hours of going live! I felt great. At this rate, I'd be earning hundreds of dollars per week.

And then... silence. After that first sale, nothing else came in for weeks.

### I added self-ads

Maybe the problem was that too few users realized I was selling meal plans. There was an entry for "Meal Plans" in the the site's navigation bar, but I wanted to maximize the visitors to my meal plan sales page.

To drive more users to the sales page, I created self-ads to replace the ads I'd been running for Google AdSense:

{{< img src="self-ads.jpg" alt="Screenshot of self-ad on Gatorade Zero page" caption="I added self-ads for my meal plans to [other Is It Keto pages](https://isitketo.org/gatorade-zero)" maxWidth="800px" hasBorder="True" >}}

I tuned these ads to show 60% of the time at first and increased them to 100% some weeks to maximize visitors. I couldn't tell if it had any because there was so much variance in the traffic:

{{< img src="self-ads-chart.jpg" alt="Chart showing indeterminate effect of self-ads" caption="Self-ads may have brought more visitors to the page, but it's too little data to say for sure" maxWidth="800px" hasBorder="True" >}}

### I slashed prices

After a week, still no sales. I initally listed the meal plan for $14.99, which I worried might be too expensive for a 7-day meal plan. With zero sales, it was difficult to gauge what changes to the site would lead to more sales because a big fat zero in sales made it hard to see what had a positive effect and what had a negative effect.

I decided to reduce my price drastically, from $14.99 to $4.99. This felt too low, but I'd rather get too many sales for too low a price than zero sales and zero information.

{{< img src="tex-mex-v2.jpg" alt="Screenshot of first Tex-Mex sales page" caption="Slashing the price on my meal plan" maxWidth="416px" hasBorder="True" >}}

### I offered discounts for feedback

After two days, there were still no sales even after a 66% price reduction. I felt frustrated; nothing I did seemed to have any effect. I wished there was a way to find out why users weren't buying, but I couldn't just ask them.

Or could I?

While discussing the issue with a friend, she asked why I couldn't survey the users. I pointed out that users had no incentive to fill out my survey. Then, I realized I could incentivize them by offering a discount on meal plans.

I couldn't discount the $4.99 price in a meaningful way, so I raised prices back to $9.99 and told users they'd earn a 30% discount if they filled out a survey.

It felt like a great idea. I'd get feedback from my users, and they'd feel invested in the meal plans and more likely to make a purchase.

<figure class="half">
  {{< img src="survey1.jpg" alt="Meal plan discount link" maxWidth="400px" >}}
  {{< img src="survey2.jpg" alt="Meal plan discount explanation" maxWidth="400px" >}}
  <figcaption>Incentivizing users to provide feedback on the meal plans</figcaption>
</figure>

The link led to this [SurveyMonkey survey](https://www.surveymonkey.com/r/633GTSD).

After about 10 days, only one user filled out a survey. I reached out to them a few hours later to offer discounted meal plans, but they never responded or made a purchase.

### I reached out to users on Reddit one-by-one

It seemed like a good time to, ["do things that don't scale."](http://paulgraham.com/ds.html) I began pitching my meal plans to reddit users one-by-one. The [/r/keto](https://reddit.com/r/keto) subreddit is filled with beginners asking keto questions, so it didn't take me long to find several users who had requested help finding keto meal plans that week.

To these users, I sent private messages letting them know I offered meal plans on my site and was available for questions:

{{< img src="reddit-post.jpg" alt="reddit post asking for meal plan advice" caption="reddit user asking where to find keto meal plans" maxWidth="636px" hasBorder="True" >}}

{{< img src="reddit-invitation.jpg" alt="reddit post asking for meal plan advice" caption="My outreach message to a reddit user seeking meal plans" maxWidth="702px" hasBorder="True" >}}

I tried this with several users. Some responded to say that it "looked perfect" for them, but then they didn't follow through with a purchase.

After a few days, I gave up on this channel. I wasn't gaining traction, and checking reddit constantly became too distracting.

### I went back to square one

At this point, I was mystified. How could 4% of users click the "Buy now" button during my smoke test, but now that they actually *could* buy, they weren't purchasing anything?

I could think of two possibilities:

1. The changes I made to my sales copy after the smoke test made users less interested in purchasing.
1. My original sales copy was so uninformative that users were clicking the "buy" button just to find out more information.

If it was scenario (1), then rolling back to the sales copy I used in my smoke test should result in real sales. I tried doing exactly that:

{{< img src="smoke-test2.jpg" alt="Screenshot of Is It Keto smoke test" caption="Testing the original smoke test to see if 4% of users will still click Buy Now" maxWidth="600px" hasBorder="True" >}}

Less than 24 hours later, I made a second sale! Maybe this sales copy really was much better than my revised version.

But after a week, there was only that one new sale. It was infinitely more than I'd sold with my later copy, but it was also just a single sale, so I couldn't draw any conclusions.

According to my logging, 3.7% of users clicked the "Buy now" button when I brought back the vague copy from the smoke test. This was close enough to the original 4.1% I saw during the smoke test that I feel like the likely conclusion is that users are clicking the "Buy" button only to find out more information.

### I split up my sales pages

After concluding that there was nothing magical about my smoke test page, I continued polishing my sales page. My most recent change has been to split up each meal plan into its own page so that I can include more details:

{{< img src="tex-mex-v3.jpg" alt="Screenshot of latest Tex-Mex sales page" caption="Putting each meal plan into its own [individual, more detailed page](https://isitketo.org/meal-plans/tex-mex/)" maxWidth="800px" hasBorder="True" >}}

I made this change on October 31st, but there have still been no new sales after the first two.

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

## Future ideas

At this point, I'm wondering whether users are willing to pay for meal plans at all. It's possible they are, and I'm just missing something in my strategy.

Here are some additional ideas I have to encourage users to purchase:

* Cook the recipes myself, take photos of the results, and add food photos to the sales pages.
* Let readers view more sample pages in the meal plans to see what they're buying.
* Improve the sales copy and page layouts.

## Wrap up

### What got done?

* Made my first sale of Is It Keto's [meal plan product](https://isitketo.org/meal-plans/).
  * Drafted a licensing agreement with a third-party meal plan provider.
  * Tried several experiments to increase sales.
* Simplified the build process on What Got Done so that anyone can spin up a local instance with [a single command](https://twitter.com/deliberatecoder/status/1189529617947869184).
* Presented ["Why Good Developers Write Bad Tests" at PyGotham](/retrospectives/pygotham-2019-notes/).

### Lessons learned

* View smoke test results with a healthy dose of skepticism.
  * Even if 4% of users click the "buy" button, the percentage who will actually purchase can be significantly lower.

### Goals for next month

* Publish a new blog post about eliminating distractions from email and social media.
* Interview five customers for a potential new business.