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

# The idea

I follow the [keto diet](https://www.dietdoctor.com/low-carb/keto), but I've always found it a pain to find new recipes. There are plenty of good keto recipes online, but they're split across many different blogs, each with a different structure. Most keto blogs are just WordPress blogs being run by people without technical expertise, so they're really slow and hard to navigate or search.

I could build a keto recipe directory. It would put everything into a common format so that the user can browse all the ingredients at once. Expedia does it with hotels. I could do it for keto recipes. The site would be called KetoHub.

It would need to scrape other web sites to get information about the recipes.

The minimum viable product (MVP) is the most basic version of an application meant to prove that there's actual demand for what you're building.

I accidentally ended up becoming my freelancer's freelancer.

# Finding a freelancer

 At the time of the idea, I was in a busy period at work with little free time for a side project. But I love [outsourcing things](https://mtlynch.io/taskrabbit-cooking/), so why not outsource this? 
 
Most of KetoHub's heavy lifting was just web scraping - writing software to load web sites and pull out the relevant data. That kind of work is relatively inexpensive and straightforward to outsource. I planned to wait until I had some free time, then use a freelancing site to hire someone to implement the scraping.

Oh wait! This would be a perfect job for my friend Ferngully (who agreed to let me write about her under the condition that I assign her a silly pseudonym). She quit her job a few months prior to travel but was due back to the US in a few weeks to look for full-time work. We had worked together in the past, so I knew she was a solid developer and that we work well together.

Ferngully was into the idea. She was much further along with her job search than I expected. She had already started interviewing and almost had some offers in-hand, but I figured the job would only take a few weeks. She didn't have experience with web development, but the web app portion wasn't that complicated. I could do it with my limited AngularJS knowledge.

# Work begins

I wrote a mockup and a [design document](/files/outsourcing-mvp/ketohub-v1-design-doc.pdf).

{% include image.html file="wireframe-v1.jpg" alt="Mockup of KetoHub v1" max_width="600px" img_link=true %}

I felt like it would be discouraging if she delivered the backend only to sit for months waiting for me to do anything with it, so I rushed to put together a frontend using data I scraped by hand.

{% include image.html file="ketohub-mvp.png" alt="Basic KetoHub site with dummy data" max_width="600px" img_link=true %}

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

I realized the normal dynamic had flipped. Normally you outsource work because you're too short on time to do the work. Now I had time, but I was waiting on my freelancer. Really, I just wanted to get the MVP done ASAP and I thought about what I'd need to do to make that happen. If I have to spend a few weeks working under the dynamic that her time is more limited than mine, so be it.

Her next PR, I just accepted with no notes. In the time I would have spent writing notes, I just made my own changes.

Ferngully was surprised by this and asked if I could write notes anyway. I explained that I was trying to publish the MVP ASAP so if  I spent the extra time writing notes, it kind of defeats the purpose of hiring a freelancer. Ferngully was disappointed because the main reason she was interested in the work at all was for the technical growth from getting code review feedback.

We agreed that it no longer made sense for her to work on it. A few days later, I resolved to just work on KetoHub until it was done. I stayed up until 2am and published the first version. It was ugly, but it was done. And I learned that I would never outsource my MVP again.

# Reasons to implement your own MVP

## Only you know which corners to cut

The reason I was able to do it so much faster is because I know which corners I want to cut. Web scraping is by its nature inexact and messy. Implementing it requires decisions about the tradeoffs between cost and correctness. Is it better to spend an extra two hours coding so that I can scrape two more recipes correctly? It's difficult for me to specify these tradeoffs in advance so that another developer can adhere to them. When I'm implementing it myself, I can kind of just go by feel.

## Understand what's core to your business

The web scraping was too core to KetoHub. When I implemented it myself, it gave me a much better idea of what's difficult to scrape vs. what's easy. I'm currently only scraping title, ingredients, publication date, category, and image. What if I want to scrape something else like prep time or nutritional information? I have a much better sense of how expensive that would be and what's possible.

(TODO: link to Signal v. Noise)

## Maximize agility

I realized part of the architecture was wrong, so I can just change it. When I'm outsourcing, I have to rewrite the design doc, interrupt her work, she reads the design doc, she continues working.

There's a cost to interrupting someone and redirecting them. It's annoying to have someone continually stopping you and redirecting you. If it's my own work, that cost isn't there at all because it doesn't bother me to realize I'm doing something wrong and quickly fix it.

# Free your critical path

I couldn't make any useful progress until her work was complete. I could iterate on the UI with more dummy data, but I thought it was very likely that seeing the actual data would make me reevaluate a lot of my UI decisions. I was right.

# Lessons about working with freelancers

## Establish expectations about bandwidth per week

For projects that will take more than a few days to complete, discuss their available working hours per week.

Note that I don't suggest asking for an estimate of the calendar date when the work will be complete. I don't want someone racing so that they can deliver work to me by Wednesday just because it's the day they declared a few weeks ago. It's going to add stress to the freelancer's life and/or degrade the quality of the work, so why do that?

## Establish expectations around response time

When I hire freelancers now, I have a conversation in the beginning about expected response times. I don't expect freelancers to be available 24/7, but I'd like to have resposes to questions within one business day. And I'd like them to check in with me every 20 hours of work or one week, whichever comes first on a long-term project.