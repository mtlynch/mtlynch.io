---
title: 'KetoHub Update: Month 3'
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
header:
  teaser: images/resized/2018-01-09-ketohub-month-3/768/ketohub-ga-dec.png
  og_image: ""
tags:
- ketohub
- keto
- retention
- growth
excerpt: I'm building a website. Here’s what was good, bad, and learnable about it
  last month.
---

In early October, I launched a new website, KetoHub, a recipe aggregator for keto meals. Each month, I've evaluated the site's progress to decide how it's doing and what areas need improvement.

I'm doing my evaluation of December publicly. Here's what was good, bad, and learnable about KetoHub last month.

# Improvements in December

## New logo

The most visible change is that KetoHub now has a logo. Behold!

{% include image.html file="ketohub-logo.png" alt="KetoHub logo" fig_caption="KetoHub logo" max_width="400px" img_link=true %}

I primarily market KetoHub via Facebook groups (more on that [below](#finding-users-on-facebook)). I was embarrassed by how ugly the sharing link looked without a site logo:

{% include image.html file="ugly-fb-links.png" alt="Facebook sharing with no logo" fig_caption="Sharing KetoHub on Facebook with no site logo" max_width="493px" img_link=true %}

I'd need a logo eventually, so I decided to try [99designs](https://ninetyninedesigns.7eer.net/c/1189252/185967/3172) for the first time. It's a "design contest" site, so you describe a design you want, assign a prize value, then dozens or hundreds of designers submit options. The full prize money goes to the designer whose logo you select.

99design's lowest tier design contest cost $400. I justified the cost to myself in various ways, but then I woke up the next morning and realized I could have commissioned a freelance illustrator to make a logo for about $75. I was trying to de-ugly my Facebook links, but even a mediocre logo would have been sufficient. A $400 design contest was a bit overkill.

Oh well! Now I have a logo, and I like it. I probably would have preferred having an extra $325, but let's consider it a $325 lesson in website building.

## Site redesign

I'm not a web developer, and I don't have a good eye for design. When I built the first version of KetoHub, the design was utilitarian with little attention to aesthetics.

{% include image.html file="hwd-books.jpg" alt="Stack of Hello Web Design books" max_width="300px" link_url="http://amzn.to/2CXrlfq" %}

In December, I read the book [*Hello Web Design*](http://amzn.to/2CXrlfq) by Tracy Osborn. It's a quick read, written for people in exactly my situation. It doesn't get bogged down in design theory but instead provides simple, practical tips for achieving a successful web design.

The book gave me good ideas for improving KetoHub's look. Here's the before and after on desktop:

<figure class="half">
  {% include image.html file="ketohub-screenshot-before.png" alt="KetoHub before redesign (desktop)" img_link=true %}
  {% include image.html file="ketohub-screenshot-after.png" alt="KetoHub after redesign (desktop)" img_link=true %}
  <figcaption>KetoHub redesign on desktop: before (left) and after (right)</figcaption>
</figure>

And here's comparison on mobile:

<figure class="half">
  {% include image.html file="ketohub-screenshot-mobile-before.png" alt="KetoHub before redesign (mobile)" max_width="344px" img_link=true %}
  {% include image.html file="ketohub-screenshot-mobile-after.png" alt="KetoHub after redesign (mobile)" max_width="352px" img_link=true %}
  <figcaption>KetoHub redesign on mobile: before (left) and after (right)</figcaption>
</figure>

Actually, as I write this and look at the mobile screenshot, the "after" shot looks worse. The logo and category buttons take up more than half of the screen's vertical space to the point where you can't even see even one recipe card.

Looks like I've got a bit more work to do...

## 50% increase in recipes

I added the popular recipe site [Low Carb Yum]( https://lowcarbyum.com/) to KetoHub's recipe index. This added over 500 new recipes to the site, bringing the total to 1,500. This was the largest increase in KetoHub recipes from any single keto site.

# Visitor growth

KetoHub's visit stats are still small, but it saw exciting growth in December.

Compared to November, it received almost 8x as many unique users and 4.5x as many pageviews:

{% include image.html file="ketohub-ga-dec.png" alt="Existing keto sites" max_width="700px" img_link=true %}

## Finding users on Facebook

Facebook was, by far, the largest single source of new users. Of 1,372 visitors that discovered the site in December, 717 of them came from Facebook. I promoted the site on Facebook in two distinct ways.

### Sharing in medium-sized groups

Facebook has hundreds of different keto groups. Some have close to a million members; others have as few as 20-30.

I saw the most efficient results in groups of between 200 and 1,000 members. I made posts like the following, being up front that it was my website and I'm looking for feedback:

{% include image.html file="ketohub-fb-response.png" alt="Existing keto sites" max_width="442px" img_link=true %}

The post above brought over 100 new users to KetoHub the day it was posted and continued to receive positive responses for days after.

Unfortunately, this doesn't seem to work in bigger groups. The larger the community, the more sensitive their administrators are to self-promotion. I tried making similar posts to groups with 100k+ members and found myself booted within minutes.

### KetoHub as the answer to your question

I also found success in using KetoHub as the answer to people's questions.

People frequently posted in these groups searching for recipes that met particular criteria. For example, when someone asked for keto breakfasts that exclude egg, I shared a link to [a KetoHub search](https://ketohub.io/?category=breakfast&q=-egg) for all breakfasts that don't include egg as an ingredient:

{% include image.html file="ketohub-fb-response2.png" alt="Existing keto sites" max_width="415px" img_link=true %}

For each post I responded to like this, only 10-20 people clicked the link. However, it's easier to find these types of posts than to constantly find new medium-sized keto groups to join. When I spent an hour scrolling through posts from different keto groups, I usually found between two and six opportunities to answer someone's question by linking to KetoHub. This translated to a total of 60-100 new clicks.

# Biggest challenge: Retention

If the cost of 100 new users is an hour of ~~shilling~~ promoting on Facebook, that's a great deal. Well, at least to someone like me who has yet to break 200 daily visitors. I'd gladly do that every day except for one problem: I'm losing users as quickly as I gain them.

The chart below is a cohort analysis from Google Analytics. Each row is a group of users that first visited the site in a particular week. Each column  shows the percentage that returned to KetoHub in the subsequent week.

{% include image.html file="cohort-analysis-dec.png" alt="KetoHub cohort analysis" max_width="700px" img_link=true %}

The numbers are abysmal.

A small percentage of users will stick around the week after they discover the site, but the percentage decreases each week. After four weeks, the percentage shrinks to zero.

From what I've heard, a good website will bring back at least 10% of its users the week after they discover it. I'm far below 10%, so my focus in January will be increasing retention.

# Next steps

* Conduct more user interviews
  * When I initially launched, I had keto-dieting friends speak to me on the phone as they tried the site for the first time. I used their feedback to improve the site, but now I want to focus less on first impressions and more on sustained usage.
  * I'll be conducting interviews with strangers who follow keto, then doing a follow-up interview a week later to find out why they did or did not continue using KetoHub after the first day.
* Read [*Hooked: How to Build Habit-Forming Products*](http://amzn.to/2EZLzFZ) by Nir Eyal
  * I listened to [his interview](https://www.indiehackers.com/podcast/023-nir-eyal-of-hooked) on the Indie Hackers podcast last year and found him insightful. I'm hoping the book will give me ideas for incentivizing my users to return to KetoHub regularly.
* Set up better event tracking analytics
  * I'd like to build a better understanding of how visitors use KetoHub. I'm currently using Google Analytics, which is nice, but not very powerful. I'd like to ask questions such as, "Of users who return every week, how often do they filter by category? How often do they search?"
  * I've heard good things about [Amplitude](https://amplitude.com/), and I fit in their free tier, so I'll check them out.

---
*If you're a keto dieter interested in finding new recipes, check out [KetoHub](https://ketohub.io), the website I've been talking about this whole article.*
