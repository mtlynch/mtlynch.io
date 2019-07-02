---
title: What Got Done - Month 2
excerpt: Struggling to decide where my focus should be.
---

# One-Line Summary

Struggling to decide where my focus should be.

# Highlights

* I launched my [task journaling app](https://whatgotdone.com), but it hasn't attracted many users.
* Interviewing potential customers gave me a good idea for my next project.
* I earned $107 from [Is It Keto](https://isitketo.org) and $123 from [Zestful](https://zestfuldata.com) without working on either.

# Goal Grades

### Publish a new blog post that explains why I built What Got Done

* **Result**: What Got Done is now [live](https://whatgotdone.com).
* **Grade**: A

Last month, I felt that I was scrambling to get the blog post out the door. I questioned whether I was sacrificing quality for the sake of hitting a self-imposed deadline. This time, I felt more confident in the quality.

The post didn't attract a large number of readers, but it did seem to jumpstart signups to What Got Done (more on that [below](#a-jumpstart-for-what-got-done)).

### Interview six email copywriters about their workflow and pain points

* **Result**: Had five customer meetings (<font color="red">50% below target</font>)
* **Grade**: F



### Create a landing page to begin collecting customer emails for my next product

* **Result**: 
* **Grade**: F



# Inactive projects

### Is It Keto

Now that Is It Keto is on the backburner, I'm not going to dive as deeply into its metrics, but here's a summary of the most interesting ones:

| Metric                 | May 2019   | June 2019   | Change |
|------------------------|------------|-------------|--------|
| Total Earnings         | $107.25    | $184.25     | <font color="green">+$77.00 (+72%)</font> |
| Unique Visitors        | 10,984     | 14,419      | <font color="green">+3,435 (+31%)</font> |
| Total Pageviews        | 28,751     | 39,405      | <font color="green">+10,654 (+37%)</font> |
| Domain Authority (Moz) | 6          | 6           | 0 |
| Ranking Keywords (Moz) | 949        | 862         | <font color="red">-87 (-9%)</font> |

After my blog post about Is It Keto last month, I received some good suggestions for small tweaks to the site, so I spent a few days on that, which included adding a [browse by category](https://isitketo.org/category/) feature and making my food cards [a little prettier](https://imgur.com/w11ZWEK).

# Bouncing around too much

My biggest problem this month has been lack of focus. And by that I don't mean, "I wish I could concentrate better." I mean when I sit down to rationally decide where I should focus, I can't decide.

The issue comes down to the fact that I've got several active projects that are all going "okay."

## Suddenly, everyone wants to parse ingredients

I'll start with [Zestful](https://zestfuldata.com). It's the ingredient parsing service I created last year that [failed to attract any customers](/shipping-too-late/). In June, I had calls with four different customers considering Zestful for large projects. Some are more serious than others, but most of them said that it was missing a few small features to match the workflows they want.

I raised prices by 566%. If we're going to have a conversation, it should be about thousands of dollars not tens of dollars.

* **Pros**
  * Service is already built and has paying customers
  * Gaps between existing service and what the potential customers want seems small 
    * I could probably complete them all in six weeks

* **Cons**
  * If I invest in adding the requested features, I have no guarantee that any of the new customers will actually purchase
  * I can't tell if the lifetime value of the new customers is closer to $100 (not worth a month of work) or $10,000 (happily worth a month of work)

I received good advice from [Cory Zue](https://coryzue.com), which was to raise prices. I know underpricing services is a common mistake for founders, but I was reluctant to raise prices when I didn't even have any significant customers at my existing low price. But I realized that raising prices addresses the last item on my Cons list (uncertainty of customer lifetime value).

I originally priced Zestful hoping to make $30-100/month from smaller developers and $1,000-$3,000/month from larger companies. It's been on the market for almost a year, and I've found that very few companies need a service like Zestful. If I'm going to talk to customers about using the service, the conversation needs to be about a service that costs thousands of dollars not tens of dollars.

At the end of the month, I changed my price from 0.3 cents per ingredient to 2 cents per ingredient (an increase of 566%). To avoid price gouging early adopters, my existing customers will continue with their old pricing.

## A jumpstart for What Got Done

Next is [What Got Done](https://whatgotdone.com), the weekly team status app I launched last month. I promoted it on [Twitter](https://twitter.com/deliberatecoder/status/1131998623531700225), [Indie Hackers](https://www.indiehackers.com/product/what-got-done/-LffBEPNwHYU02oXu2vM), and [Hacker News](https://news.ycombinator.com/item?id=20124288), but it didn't achieve much traction. Then, I published [a blog post about it](/status-updates-to-nobody/), and it surprisingly jolted life into What Got Done.

What Got Done had almost zero signups for a month, but ever since publishing the blog post, there have been three to eight new users per day:

TODO: Include graph

## Slowing down on the email tool for copywriters

Lastly, there's the email tool for copywriters. It's [just a concept](/retrospectives/2019/06/#taking-on-google-docs) at this point, but I think it's a promising business idea. I had several exploratory calls with copywriters in May, but progress froze entirely in June as I focused on What Got Done and Zestful.

The problem is that all of these projects are going "okay" and the potential for revenue depends on several factors that are hard to estimate. 

What Got Done has been steadily attracting new users for a month, but I have no firm commitments from anyone to upgrade to a paid plan. How long will the new users stick around? How long will the growth continue? Will investing in free users lead to paid users? Finally, if I build the tool for copywriters, will they actually purchase it?

# Suddenly everyone wants to parse ingredients


# A brief experiment with display ads on Is It Keto

Since [December](/retrospectives/2019/01/), the only way I've monetized Is It Keto has been through Amazon Affiliate ads. This month, Ezoic approached me about putting display ads on Is It Keto. They're a large advertisement partner that I've heard about from content business forums. Is It Keto barely met their minimum audience requirement of 10k unique users per month, so I decided to check it out.

They promised that I wouldn't have to do any work &mdash; just point my DNS servers to their CDN and they'd place the ads for me. I was skeptical because modifying a site layout is nontrivial, so how were they going to do it well for thousands of partner sites?

As soon as I saw the results, I hated it. I've never considered Is It Keto to be the most beautiful site on the web, but Ezoic's ads made it look like cheap, spammy garbage.

TODO: Before/after

Still, Ezoic promised to tune the ads based on bounce rates. In other words, if they found that all the ads were dissuading users from staying on my site, they'd scale them back. I gave them a few weeks to tune everything, but the ads always stayed ugly. Worse, some of the ads tried to fool the user into thinking that they were not ads but features of my site. They added buttons like "Print Recipes."

The final straw was when Ezoic inserted ads that screwed up my site layout on mobile devices. I reported this to Ezoic and they claimed that it was just a bug in Chrome's mobile emulation but wouldn't happen on real devices. A few days later, I saw that Google Search was downranking me because they detected that my layout was broken on mobile:

I immediately turned off Ezoic and have no plans for going back.

For the 11 days it ran, Ezoic added $45.49 based on 5,452 unique visitors. That's equivalent to ~$8 per 1,000 visitors. By comparison, the Amazon Affiliate program pays out ~$9 per 1,000 visitors, so Ezoic almost doubled my revenue. Still, I'd rather have a site that looks okay than make an extra $100/month transforming it into a circus of banner ads.

# Wrap Up

## What Got Done?

* Published ["Staying Motivated by Sending Status Updates to Nobody"](https://mtlynch.io/status-updates-to-nobody/)
* Increased pricing on Zestful by 566%
* Created an internal web app that lets me quickly generate training data for Zestful (and fix the legacy data from my starting dataset)
* Added a "Save Draft" feature to What Got Done

## Lessons Learned

* 

## Goals for May

* 