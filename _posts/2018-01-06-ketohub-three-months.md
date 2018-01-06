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

In early October, I launched KetoHub. Here's the update for the third month.

# Improvements in December

## New logo

The most visible change to KetoHub is that it now has a logo. Behold!

{% include image.html file="ketohub-logo.png" alt="KetoHub logo" fig_caption="KetoHub logo" max_width="400px" img_link=true %}

I primarily market KetoHub via Facebook groups (more on that [below](#finding-users-on-facebook)), and I was embarrassed by how ugly the sharing link looks with no logo:

{% include image.html file="ugly-fb-links.png" alt="Facebook sharing with no logo" fig_caption="Sharing KetoHub on Facebook with no site logo" max_width="493px" img_link=true %}

I figured I'd need a logo eventually, so I commissioned. Then as soon as I paid for the contest, I got buyer's remorse because I realized I probably could have spent $75 to commission an inexpensive freelance illustrator to make a logo instead of splurging on a $400 design contest just so I could see lots of different options. Even a mediocre logo would have mostly solved the problem of having ugly Facebook links.

Oh well! Now I have a logo and I like it. I probably would have liked having $325 more, but let's account it as a $325 lesson in building a new website.

## Site redesign

{% include image.html file="hwd-books.jpg" alt="Stack of Hello Web Design books" max_width="300px" class="align-right" link_url="http://amzn.to/2CXrlfq" %}

I'm not a web developer, and I don't have a very good eye for design. I read the book [*Hello Web Design*](http://amzn.to/2CXrlfq) by Tracy Osborn and found it very helpful. It's written for people in exactly my situation. It doesn't get bogged down in design theory, but instead provides simple, practical tips.

Here's the before and after:

TODO: Insert before and after.

## 50% increase in recipes

Low Carb Yum gave me permission to index her site so that links to Low Carb Yum recipes appear on KetoHub. This added over 500 recipes to KetoHub's corpus, bringing the total to almost 1,500.

# Finding users on Facebook

The largest source of new users has been Facebook. In December, KetoHub had 1,372 new users; 717 (52%) came from Facebook.

## Sharing in small groups

Facebook has hundreds of different keto groups. Some have over hundreds of thousands of members, others have just a handful.

The most efficient way I found of attracting users was to join groups that had fewer than 1,000 members. I made a post like the following, being up front that it was my website and I'm looking for feedback:

{% include image.html file="ketohub-fb-response.png" alt="Existing keto sites" max_width="442px" img_link=true %}

The post above brought over 100 new users to KetoHub and continued to get positive responses for days after.

This unfortunately doesn't seem to work in larger Facebook groups. The larger the group, the more spam posts it attracts. As a result, group administrators have even less time to evaluate whether a post is truly spammy, so they err on the side of caution and just ban anything that looks like you're shilling your own product (which, admittedly, I am). I've tried making similar posts to larger groups and found myself banned from the group within minutes.

## KetoHub as the answer to your question

Another strategy I found successful for sharing on Facebook was to link to KetoHub as the answer to someone's question. People frequently post on these groups looking for recipes that meet particular criteria. For example, when someone asked for keto breakfasts that exclude egg, I shared a link to [a KetoHub search](https://ketohub.io/?category=breakfast&q=-egg) for all breakfasts that don't use eggs in their ingredients:

{% include image.html file="ketohub-fb-response2.png" alt="Existing keto sites" max_width="415px" img_link=true %}

Only 10-20 people will click links like this, but it scales a bit better. On any given day, I can find between two and six opportunities for these types of posts if I spend an hour scrolling through messages from different keto Facebook groups.

# Biggest challenge: Retention

Trading an hour on Facebook for 100 new users sounds great! Especially since I could probably outsource the task for about $20 per day, which would mean I'm paying roughly $0.20 per click. The problem is that I'm losing users as quickly as I gain them.

The chart below is a cohort analysis from Google Analytics. Each row is a group of users that first visited the site in a particular week. Each column  shows the percentage that returned to KetoHub in the subsequent week.

TODO: Insert cohort analysis chart.

The numbers are abysmal. A small percentage of users will stick around the week after they discover the site, but . From what I've heard, healthy retention after the first week should be above 10%, so this is my biggest challenge right now.

# Next steps

* Conduct more user interviews
  * When I initially launched, I had keto-dieting friends speak to me on the phone as they tried the site for the first time. I used their feedback to improve the site, but now I want to focus on retention. I'll be conducting interviews with strangers who follow keto, then doing a follow up interview a week later to find out why they did or did not continue using KetoHub after the first day.
* Read [*Hooked: How to Build Habit-Forming Products*](http://amzn.to/2EZLzFZ) by Nir Eyal
  * I listened to [his interview](https://www.indiehackers.com/podcast/023-nir-eyal-of-hooked) on the Indie Hackers podcast last year and found him insightful. I'm hoping the book will give me ideas for improving retention.
* Set up better event tracking analytics
  * I'd like to build a better understanding of how visitors use KetoHub. I'm currently using Google Analytics, which is nice, but not very powerful. I'd like to ask questions like, "Of users who return every week, how often do they filter by category? How often do they search?" I've heard good things about [Amplitude](https://amplitude.com/), and I fit in their free tier, so I'll check them out.