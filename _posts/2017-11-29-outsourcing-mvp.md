---
title: The Perils of Outsourcing Your MVP
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
---

Over the summer, I had a brilliant idea for a website. Then I had an even better idea on top of that: I'd *outsource* all the work. To keep costs in check, I'd only have the freelancer build the minimum viable product (MVP). This is the most basic version of a website to verify that people actually want to use a product.

The plan was simple:

1. Write a quick design specification for the website.
2. Hire a freelancer who is both phenomenally talented and ridiculously inexpensive.
3. Watch the freelancer build the site into a thriving web property, frequented by thousands of passionate users demanding that I take their money.

You may be surprised to learn that this plan did *not* work. I'm not writing this from my $200 million Silicon Valley two bedroom apartment after getting a front page buyout from Facebook. Instead, I'm writing this from my regular one bedroom apartment after receiving a half-finished product and somehow becoming my freelancer's freelancer.

# The idea

I follow the [keto diet](https://www.dietdoctor.com/low-carb/keto), but I find it exasperating to search for new recipes. There are plenty of good keto recipes online, but they're spread across dozens of blogs, each with a different structure. Most people who run keto blogs specialize in cooking, not running websites, so their sites tend to be slow and hard to navigate.

TODO: Screenshots of different keto blogs

My idea was a website called KetoHub, a keto recipe directory. It would aggregate meals options from all the different blogs so that you could browse them from one easy-to-use website. Like Expedia, but for keto recipes.

{% include image.html file="wireframe-v1.jpg" alt="Mockup of KetoHub v1" fig_caption="Initial sketch of KetoHub concept" max_width="600px" img_link=true %}

# Finding a freelancer

Most of KetoHub's heavy lifting was web scraping — crawling recipe blogs and pulling out the relevant data. That kind of work is relatively inexpensive and straightforward to outsource. I could wait until I had some free time, then use a freelancing site to hire someone to do the scraping.

Oh wait! This would be a perfect job for my friend Ferngully (who agreed to let me write about her under the condition that I assign her a silly pseudonym). She quit her job to travel a few months prior to my genius website idea. She was due back to the US in a few weeks to look for full-time work, but would probably have time to freelance in the meantime. We had worked together in the past, so I knew she was a solid developer and that we work well together. She didn't have experience with web development, but that part was small enough that I could do myself.

I talked to Ferngully, and she was immediately on board. On the team we had worked previously, I had a reputation for my ~~anal retentive~~ thorough reviews, so she said she was excited for the challenge of meeting my tough standards.

I wrote a [design document](/files/outsourcing-mvp/ketohub-v1-design-doc.pdf) that laid out all the components of the website at a high level. Ferngully and I would have the project specified in a central location.

{% include image.html file="ketohub-architecture.png" alt="KetoHub architecture diagram" fig_caption="KetoHub architecture diagram" max_width="800px" img_link=true %}

# Why aren't we live?

When I was initially discussing the project with Ferngully, she asked if I had any deadlines. I told her, "No deadlines. Just focus on writing good code." It's the same thing I tell any developer working with me for a side project. I'd rather get good code on Thursday than have a developer stress and cut corners to get it to me by Monday. I estimated that her portion would take about 30-50 hours to implement, so if she worked something like a normal working week, she'd be done in a week or two.

At the time, I thought it would be months before I had time to build the frontend. I thought certainly I'd be the bottleneck. But after I finished the design document, I thought about how anticlimactic it would be if Ferngully delivered her scraping code only to have it sit in a drawer for months. I spent a few evenings putting together a basic website frontend using data I scraped by hand. Now we were ready to go as soon as Fernanda's data scraping code was ready.

{% include image.html file="ketohub-mvp.png" alt="Basic KetoHub site with dummy data" max_width="700px" fig_caption="Screenshot of KetoHub's MVP, populated with data scraped by hand" img_link=true %}

That's when I started getting anxious.

Before I built the frontend, the project still seemed very abstract and distant.

I could feel my frontend code withering into obsolecence.

# Low bandwidth

People report starting a new job as one of the most stressful events of their lives, so I didn't want to add more stress to my friend's life by pestering her to put more hours into my toy side project.



After she accepted her offer, they wanted her to start in 10 days. Okay, still doable. It forced me to revisit the design document and look for what else I could trim out. Originally I planned for Ferngully to write code that uploads directly to Firebase's database. I could easily cut that out because it's much easier if she just writes to the local disk and then I use Firebase utilities to upload to the the Firebase database.

Okay maybe this was good. It was forcing me to trim down the MVP even more. I wanted it to be as minimal as possible.

# Becoming my freelancer's freelancer

A week went by and I didn't have any code. Ferngully told me that she had family visiting, so she didn't have time to work on KetoHub. She averaged 14 hours per week in the two weeks before her job started, but then in the two weeks after she started, it dropped to just 2 hours per week. We got up to about 5 hours per week, but she estimated that the remaining work would take about 40 hours.

It took me about twice as long to review the code as it normally would because by the time the next round of review began, I had forgotten all of the context of what I wanted her to fix and why.

I realized the normal dynamic had flipped. Normally you outsource work because you're too short on time to do the work. Now I had time, but I was blocked by my freelancer and trying to optimize for her time. Really, I just wanted to get the MVP done ASAP and I thought about what I'd need to do to make that happen. If I have to spend a few weeks working under the dynamic that her time is more limited than mine, so be it.

# This doesn't make sense

Her next PR, I just accepted with no notes. In the time I would have spent writing notes, I just made my own changes.

Ferngully was surprised by this and asked if I could write notes anyway. I explained that I was trying to publish the MVP ASAP so if  I spent the extra time writing notes, it kind of defeats the purpose of hiring a freelancer. Ferngully was disappointed because the main reason she was interested in the work at all was for the technical growth from getting code review feedback.

We agreed that it no longer made sense for her to work on it.

# Implementing it myself

The Saturday night after I wrapped with Ferngully, I started working on KetoHub, and resolved to keep going until the MVP was done. I stayed up until 2am and published the first version. It was ugly, but it was done.

TODO: Show picture of finished product.

# Lessons

## Just build your own MVP

Even though this was a pretty bumpy ride, I learned a lot from it. I got to experience building an MVP both with a freelancer and without. I knew from the beginning that there would be frictional costs to working with a freelancer. It obviously takes longer to communicate with another person and review their work. I found there were more subtle drawbacks that I hadn't anticipated, and these only became clear to me after I took over the work myself.

### Only you know which corners to cut

Web scraping is by its nature inexact and messy. It requires balancing accuracy of data against cost of development. Is it better to spend an extra two hours coding so that I can scrape two more recipes correctly?

It's difficult for me to specify these tradeoffs in advance so that another developer can adhere to them. When I built it myself, I was able to go by feel, because I had my own intuitions about what tradeoffs I want to make.

### Understand what's core to your business

When I implemented KetoHub's web scraping myself, it gave me useful insight into the data. In addition to the data I was scraping for the initial version of KetoHub, I noticed other information I could pull from the site in the future, like prep time or nutritional information.

I also noticed that all of the blogs I'm scraping have RSS feeds. This is an easy, lightweight way for me to detect new recipes without crawling the entire site. I would not have noticed this had I not gotten my hands dirty. My freelancer would not have been looking out for it because she wasn't setting up infrastructure

(TODO: reference the relevant quote in *Rework*)

### Maximize agility

When Ferngully sent me the first changelist to review, I realized that my design was flawed. I wanted one component to download the raw HTML data and a separate component to parse data from the HTML. But my design specified that the downloader had to fetch both HTML and each recipe's primary image. There's no way for the downloader to do this unless it *also* parses the HTML to find the right image, so parsing was happening in two places independently.

By the time I noticed this in code review, it wasn't worth asking Ferngully to re-do with a new architecture. In addition to the time cost of asking a freelancer to do more work, there's also a morale cost of telling someone to throw away something you asked for and start over. When you build it yourself, you recognize architectural flaws earlier and the morale cost of rejecting work is almost negligible because you're the one deciding to re-do work.

## Establish expectations with freelancers

This also gave me some takeaways about working with freelancers in general. It's made me make sure my freelancer and I are on the same page about capacity at the beginning of the project. I apply this when working with freelancers of any type, not just developers.

Establish expectations

* Bandwidth per week
  *  Figure out up front if they expect to work five hours per week or 50.
* Response time
  * None of my projects require 24/7 availability, so I always make that clear, but I generally expect responses within one business day and updates about once per week on a long-term project.

---

*This article was edited by [Samantha Mason](https://www.upwork.com/fl/samanthamason).*

*If you're a keto dieter interested in finding new recipes, check out [KetoHub](https://ketohub.io), the website I've been talking about this whole article.*