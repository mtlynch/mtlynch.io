---
title: 'KetoHub: Three Month Progress Update'
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
---

In early October, I launched a new website, KetoHub, a recipe aggregator for keto meals. Each month, I've evaluated the site's progress to decide how it's doing and what parts of it to focus on improving.

Others might be interested in this monthly exercise, so I've included my evaluation of December below. Here's what was good, bad, and learnable about KetoHub last month.

# Improvements in December

## New logo

The most visible change to KetoHub is that it now has a logo. Behold!

{% include image.html file="ketohub-logo.png" alt="KetoHub logo" fig_caption="KetoHub logo" max_width="400px" img_link=true %}

I primarily market KetoHub via Facebook groups (more on that [below](#finding-users-on-facebook)). I was embarrassed by how ugly the sharing link looked without a site logo:

{% include image.html file="ugly-fb-links.png" alt="Facebook sharing with no logo" fig_caption="Sharing KetoHub on Facebook with no site logo" max_width="493px" img_link=true %}

I'd need a logo eventually, so it was a good opportunity to try [99designs](https://ninetyninedesigns.7eer.net/c/1189252/185967/3172) for the first time. They run "design contests," so you describe a design you want, assign a prize value, then dozens or hundreds of designers submit designs hoping to be selected.

99design's lowest tier design contest cost $400. I justified the cost to myself in various ways, but then I woke up the next morning and realized I could have commissioned a freelance illustrator to make a logo for about $75. The problem I was trying to solve was ugly Facebook links, but even a mediocre logo would have been sufficient. A $400 design contest was overkill.

Oh well! Now I have a logo, and I like it. I probably would have preferred having an extra $325, but let's consider it a $325 lesson in website building.

## Site redesign

{% include image.html file="hwd-books.jpg" alt="Stack of Hello Web Design books" max_width="300px" class="align-right" link_url="http://amzn.to/2CXrlfq" %}

I'm not a web developer, and I don't have a very good eye for design. I read the book [*Hello Web Design*](http://amzn.to/2CXrlfq) by Tracy Osborn and found it very helpful. It's written for people in exactly my situation. It doesn't get bogged down in design theory, but instead provides simple, practical tips.

Here's the before and after:

TODO: Insert before and after.

## 50% increase in recipes

I added the popular recipe site [Low Carb Yum]( https://lowcarbyum.com/) to KetoHub's recipe index, which adds over 500 new recipes to the site, for a new total of 1,500. This was the largest increase in KetoHub recipes from any single keto site.

# Visitor growth

KetoHub's visit stats are still small, but it saw exciting growth in December. Compared to November, it received almost 8x as many unique users and 4.5x as many pageviews.

{% include image.html file="ketohub-ga-dec.png" alt="Existing keto sites" max_width="700px" img_link=true %}

## Finding users on Facebook

The largest source of new users has been Facebook. Of 1,372 new users that discovered the site in December, 717 of them came from Facebook. I promoted the site on Facebook in two distinct ways.

### Sharing in small groups

Facebook has hundreds of different keto groups. Some have hundreds of thousands of members, others have only 20-30.

The most efficient way I found of attracting users was to join groups that had fewer than 1,000 members. I made posts like the following, being up front that it was my website and I'm looking for feedback:

{% include image.html file="ketohub-fb-response.png" alt="Existing keto sites" max_width="442px" img_link=true %}

The post above brought over 100 new users to KetoHub the day it was posted and continued to receive positive responses for days after.

This unfortunately doesn't seem to work in larger Facebook groups. The larger the community, the more sensitive group administrators are to self-promotion. I tried making similar posts to larger groups and found myself booted within minutes.

### KetoHub as the answer to your question

Another strategy I found successful for sharing on Facebook was to link to KetoHub as the answer to someone's question.

People frequently post on these groups looking for recipes that meet particular criteria. For example, when someone asked for keto breakfasts that exclude egg, I shared a link to [a KetoHub search](https://ketohub.io/?category=breakfast&q=-egg) for all breakfasts that don't include egg as an ingredient:

{% include image.html file="ketohub-fb-response2.png" alt="Existing keto sites" max_width="415px" img_link=true %}

Only 10-20 people will click links like this, but it scales a bit better. On any given day, I can find between two and six opportunities for these types of posts if I spend an hour scrolling through messages from different keto Facebook groups.

# Biggest challenge: Retention

Trading an hour on Facebook for 100 new users sounds great! I could outsource the task for about $20 per day. The problem is that I'm losing users as quickly as I gain them.

The chart below is a cohort analysis from Google Analytics. Each row is a group of users that first visited the site in a particular week. Each column  shows the percentage that returned to KetoHub in the subsequent week.

{% include image.html file="cohort-analysis-dec.png" alt="KetoHub cohort analysis" max_width="700px" img_link=true %}

The numbers are abysmal.

A small percentage of users will stick around the week after they discover the site, but the percentage gets smaller each week. After four weeks, the percentage shrinks to zero.

From what I've heard, a good website will bring back at least 10% of its users the week after they discover the site. I'm far below 10%, so my focus in January will be increasing retention.

# Next steps

* Conduct more user interviews
  * When I initially launched, I had keto-dieting friends speak to me on the phone as they tried the site for the first time. I used their feedback to improve the site, but now I want to focus on retention.
  * I'll be conducting interviews with strangers who follow keto, then doing a follow up interview a week later to find out why they did or did not continue using KetoHub after the first day.
* Read [*Hooked: How to Build Habit-Forming Products*](http://amzn.to/2EZLzFZ) by Nir Eyal
  * I listened to [his interview](https://www.indiehackers.com/podcast/023-nir-eyal-of-hooked) on the Indie Hackers podcast last year and found him insightful. I'm hoping the book will give me ideas for improving retention.
* Set up better event tracking analytics
  * I'd like to build a better understanding of how visitors use KetoHub. I'm currently using Google Analytics, which is nice, but not very powerful. I'd like to ask questions such as, "Of users who return every week, how often do they filter by category? How often do they search?"
  * I've heard good things about [Amplitude](https://amplitude.com/), and I fit in their free tier, so I'll check them out.

# All KetoHub posts

1. [The Perils of Outsourcing Your MVP](/outsourcing-mvp/)
2. **KetoHub: Three Month Progress Update**


---
*If you're a keto dieter interested in finding new recipes, check out [KetoHub](https://ketohub.io), the website I've been talking about this whole article.*