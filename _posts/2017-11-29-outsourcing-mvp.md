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

1. Write a quick design specification for the webiste.
2. Hire a freelancer who is both phenomenally talented and ridiculously inexpensive
3. Let the freelancer build the site into a thriving web property, frequented by thousands of passionate users demanding that I take their money.

You may be surprised to learn that this plan did *not* work. I'm not writing this from my $200 million Silicon Valley 2 BR apartment after getting a front page buyout from Facebook. Instead, I'm writing this from my regular 1 BR apartment after receiving a half-finished product and somehow becoming my freelancer's freelancer.

# The idea

I follow the [keto diet](https://www.dietdoctor.com/low-carb/keto), but I find it exasperating searching for new recipes. There are plenty of good keto recipes online, but they're spread across dozens of blogs, each with a different structure. Most people who run keto blogs specialize in cooking, not running websites, so their sites tend to be slow and hard to navigate.

TODO: Screenshots of different keto blogs

My idea was KetoHub, a keto recipe directory. It would aggregate meals options from all the different blogs so that you could browse them from one easy-to-use website. Like Expedia, but for keto recipes.

{% include image.html file="wireframe-v1.jpg" alt="Mockup of KetoHub v1" fig_caption="Initial sketch of KetoHub concept" max_width="600px" img_link=true %}

# Finding a freelancer

Most of KetoHub's heavy lifting was web scraping — crawling recipe blogs and pulling out the relevant data. That kind of work is relatively inexpensive and straightforward to outsource. I could wait until I had some free time, then use a freelancing site to hire someone to do the scraping.

Oh wait! This would be a perfect job for my friend Ferngully (who agreed to let me write about her under the condition that I assign her a silly pseudonym). She quit her job to travel a few months prior to my genius website idea. She was due back to the US in a few weeks to look for full-time work, but would probably have time to freelance in the meantime. We had worked together in the past, so I knew she was a solid developer and that we work well together. She didn't have experience with web development, but that part was small enough that I could do myself.

I talked to Ferngully, and she was immediately on board. On the team we had worked previously, I had a reputation for my ~~anal retentive~~ thorough reviews, so she said she was excited for the challenge of meeting my tough standards.

# Up and running

The first blip in the process was that Ferngully was much further along with her job search than I expected. She had already started interviewing and almost had some offers in-hand. Still, I told myself it was only a 1-2 week project, so she'd be done before she started working full-time. 

I wrote a [design document](/files/outsourcing-mvp/ketohub-v1-design-doc.pdf) that laid out all the components of the website at a high level. Ferngully and I would have the project specified in a central location.

{% include image.html file="ketohub-architecture.png" alt="KetoHub architecture diagram" fig_caption="KetoHub architecture diagram" max_width="800px" img_link=true %}

I wasn't planning to work on the website more until Ferngully had the data collection part done, but I already had momentum from writing the design document. Plus, I felt like it would be so anticlimactic for Ferngully if she finished the backend, and then I made her wait around until I wrote the frontend.

I felt like it would be discouraging if she delivered the backend only to sit for months waiting for me to do anything with it, so I spent a week of evenings putting together a basic website frontend using data I scraped by hand.

{% include image.html file="ketohub-mvp.png" alt="Basic KetoHub site with dummy data" max_width="700px" fig_caption="Screenshot of KetoHub's MVP, populated with data scraped by hand" img_link=true %}

Now, KetoHub was ready to go as soon as Ferngully delivered the pieces I needed for generating data.

# Why aren't we live?

When I was initially discussing the project with Ferngully, she asked if I had any deadlines. I said no deadlines, just focus on writing good code. It's the same thing I tell any developer working with me for a side project. I'd rather get good code on Thursday than have a developer stress and cut corners to get it to me by Monday. Besides, I was still in work crunch mode and thought it would be months before I had time to my part of the KetoHub work to get it live.

I estimated that her portion would take about 30-50 hours to implement, so if she worked something like a normal working week, she'd be done in a week or two.

After she accepted her offer, they wanted her to start in 10 days. Okay, still doable. It forced me to revisit the design document and look for what else I could trim out. Originally I planned for Ferngully to write code that uploads directly to Firebase's database. I could easily cut that out because it's much easier if she just writes to the local disk and then I use Firebase utilities to upload to the the Firebase database.

Okay maybe this was good. It was forcing me to trim down the MVP even more. I wanted it to be as minimal as possible.

# I am my freelancer's freelancer

A week went by and I didn't have any code. Ferngully told me that she had family visiting, so she didn't have time to work on KetoHub. She averaged 14 hours per week in the two weeks before her job started, but then in the two weeks after she started, it dropped to just 2 hours per week. We got up to about 5 hours per week, but she estimated that the remaining work would take about 40 hours.

I had some code!

It took me about twice as long to review the code as it normally would because by the time the next round of review began, I had forgotten all of the context of what I wanted her to fix and why.

The problem was that I had made a big deal about how little time pressure there was because I didn't expect to have any bandwidth until October.

I realized the normal dynamic had flipped. Normally you outsource work because you're too short on time to do the work. Now I had time, but I was blocked by my freelancer and trying to optimize for her time. Really, I just wanted to get the MVP done ASAP and I thought about what I'd need to do to make that happen. If I have to spend a few weeks working under the dynamic that her time is more limited than mine, so be it.

Her next PR, I just accepted with no notes. In the time I would have spent writing notes, I just made my own changes.

Ferngully was surprised by this and asked if I could write notes anyway. I explained that I was trying to publish the MVP ASAP so if  I spent the extra time writing notes, it kind of defeats the purpose of hiring a freelancer. Ferngully was disappointed because the main reason she was interested in the work at all was for the technical growth from getting code review feedback.

# Implementing it myself

We agreed that it no longer made sense for her to work on it.

A few days later, I started working on KetoHub and resolved to keep going until the MVP was done. I stayed up until 2am and published the first version. It was ugly, but it was done.

TODO: Show picture of finished product.

# Just build your own MVP

Even though this was a pretty bumpy ride, I learned a lot from it. I got to experience building an MVP both with a freelancer and without. I knew from the beginning that there would be frictional costs to working with a freelancer. It obviously takes longer to communicate with another person and review their work. I found there were more subtle drawbacks that I hadn't anticipated, and these only became clear to me after I took over the work myself.

## Only you know which corners to cut

Web scraping is by its nature inexact and messy. It requires balancing accuracy of data against cost of development. Is it better to spend an extra two hours coding so that I can scrape two more recipes correctly?

It's difficult for me to specify these tradeoffs in advance so that another developer can adhere to them. When I built it myself, I could just go by feel, because I can sense when it's good enough for a first version.

## Understand what's core to your business

When I implemented KetoHub's web scraping myself, it gave me useful insight into the data. In addition to the data I was scraping for the initial version of KetoHub, I noticed other information I could pull from the site in the future, like prep time or nutritional information.

I also noticed that all of the blogs I'm scraping have RSS feeds. This is an easy, lightweight way for me to detect new recipes without crawling the entire site. I would not have noticed this had I not gotten my hands dirty. My freelancer would not have been looking out for it because she wasn't setting up infrastructure

(TODO: reference the relevant quote in *Rework*)

## Maximize agility

When Ferngully sent me the first changelist to review, I realized that my design was flawed. I wanted one component to download the raw HTML data and a separate component to parse data from the HTML. But my design specified that the downloader had to download both HTML and images. There's no way for the downloader to do this unless it *also* parses the HTML to find the images, so parsing was happening in two places independently.

I would have realized this had I started coding it myself, but I didn't to have to ask Ferngully. Plus, by the time the code is done, I'm better off going forward with the flawed

You're never going to be as flexible and adaptible as when you're working by yourself. 


I realized part of the architecture was wrong, so I can just change it. When I'm outsourcing, I have to rewrite the design doc, interrupt her work, she reads the design doc, she continues working.

Nobody likes to receive an assignment, start it, then find out halfway through that we're throwing away the work to do something else.

There's a cost to interrupting someone and redirecting them. It's annoying to have someone continually stopping you and redirecting you. If it's my own work, that cost isn't there at all because it doesn't bother me to realize I'm doing something wrong and quickly fix it.

# Lessons about working with freelancers

## Establish expectations about bandwidth per week

For projects that will take more than a few days to complete, discuss their available working hours per week.

Note that I don't suggest asking for an estimate of the calendar date when the work will be complete. I don't want someone racing so that they can deliver work to me by Wednesday just because it's the day they declared a few weeks ago. It's going to add stress to the freelancer's life and/or degrade the quality of the work, so why do that?

## Establish expectations around response time

When I hire freelancers now, I have a conversation in the beginning about expected response times. I don't expect freelancers to be available 24/7, but I'd like to have resposes to questions within one business day. And I'd like them to check in with me every 20 hours of work or one week, whichever comes first on a long-term project.