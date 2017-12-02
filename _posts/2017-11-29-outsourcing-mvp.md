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

Over the summer, I had a brilliant idea for a website. Then I had an even *brillianter* idea: make the website, but outsource all the work.

To keep costs in check, I'd only have the freelancer build the minimum viable product (MVP). An MVP is the most basic version of a website, built to test whether anyone actually wants to use it.

The plan was simple:

1. Write a quick design specification for the website.
2. Hire a freelance developer who is phenomenally talented and ridiculously inexpensive.
3. Watch the freelancer build the site into a thriving web property, frequented by thousands of passionate users demanding that I take their money.

You may be surprised to learn that this plan did *not* work. I'm not writing this from my $200 million Silicon Valley two bedroom apartment after getting a front page buyout from Facebook. Instead, I'm writing this from my regular one bedroom apartment after receiving a half-finished product and somehow becoming my freelancer's freelancer.

# The idea

I follow the [keto diet](https://www.dietdoctor.com/low-carb/keto), but I find it exasperating to search for new recipes. There are plenty of good keto recipes online, but they're spread across dozens of blogs, each with a different structure. Most people who run keto blogs specialize in cooking, not running websites, so their sites tend to be slow and hard to navigate.

{% include image.html file="keto-sites.png" alt="Existing keto sites" max_width="700px" img_link=true %}

My idea was a website called KetoHub, a keto recipe directory. It would aggregate meals options from all the different blogs so that you could browse them from one easy-to-use website.

It would be like Expedia, but for keto recipes.

{% include image.html file="wireframe-v1.jpg" alt="Mockup of KetoHub v1" fig_caption="Initial sketch of KetoHub concept" max_width="600px" img_link=true %}

# Finding a freelancer

Most of KetoHub's heavy lifting was web scraping — crawling recipe blogs and pulling out the relevant data. That kind of work is relatively inexpensive and straightforward to outsource. I could wait until I had some free time, then use a freelancing site to hire someone to do the scraping.

Oh wait! This would be a perfect job for my friend Ferngully (who agreed to let me write about her under the condition that I assign her a silly pseudonym). She had quit her job to travel a few months prior, but was due back to the US in a few weeks to look for full-time work. She would probably have time to freelance in the meantime. We had worked together in the past, so I knew she was a solid developer and that we work well together. She didn't have experience with web development, but that was small enough for me to do myself.

I talked to Ferngully, and she was immediately on board. On the team we had worked previously, I had a reputation for my ~~anal retentive~~ thorough reviews, so she said she was excited for the challenge of meeting my tough standards.

I wrote a [design document](/files/outsourcing-mvp/ketohub-v1-design-doc.pdf) that laid out all the components of the website at a high level. Ferngully and I would have the project specified in a central location.

{% include image.html file="ketohub-architecture.png" alt="KetoHub architecture diagram" fig_caption="KetoHub architecture diagram" max_width="800px" img_link=true %}

# Why aren't we live?

When I was initially discussing the project with Ferngully, she asked if I had any deadlines. I told her, "No deadlines. Just focus on writing good code." It's the same thing I tell any developer working with me for a side project. I'd rather get good code on Thursday than have a developer stress and cut corners to get it to me by Monday. I estimated that her portion would take about 30-50 hours to implement, so if she worked something like a normal working week, she'd be done in a week or two.

At the time, I was in a busy period with my day job. It seemed like it would be months before I'd have time to build the frontend. Certainly, I'd be the bottleneck. But after I finished the design document, I thought about how anticlimactic it would be if Ferngully delivered her scraping code only to have it sit in a drawer for months. I spent a few evenings putting together a basic website frontend using data I scraped by hand. Now we were ready to go as soon as Ferngully's code was ready.

{% include image.html file="ketohub-mvp.png" alt="Basic KetoHub site with dummy data" max_width="700px" fig_caption="Screenshot of KetoHub's MVP, populated with data scraped by hand" img_link=true %}

That's when I started getting anxious.

In the week it had taken me to complete the frontend, I hadn't received any backend code from Ferngully. What was she doing?

Before I built the frontend, the project still seemed very abstract and distant. Now, it felt like every day I my frontend code was withering into obsolecence. I just wanted to show KetoHub to the world so that Mark Zuckerberg could buy me out and take me on his demographic surveiilance yacht.

# Working under low bandwidth

During the second week of the project, Ferngully sent me the first code review. It was the first part of the first backend component (of three components total). She had put in 29 hours total in the first two weeks, but she was starting her first time job on Monday, so I expected her availability to go down.

I revisited the design document to see if I could trim anything out. Originally I planned for Ferngully to write code that makes API calls to upload data to cloud storage. I realized I could reduce her work if I asked her to just write data to local disk and I'd use command-line utilities to upload it to the cloud.

Maybe this was a good thing. Anything I can trim out of the MVP means it wasn't really in its most minimal form, so that simplification was a win.

We still didn't actually have any backend code actually checked in yet because the code review was still in progress. Nevertheless, I was optimistic that if Ferngully could spare 10 hours per week after her job started, we could wrap this up in a few more weeks.

# Becoming my freelancer's freelancer

Unfortunately, Ferngully didn't have much time after her job started. For the next four weeks, she was averaging less than five hours per week on KetoHub. At this rate, it would take us months to finish.

If this was a freelancer I didn't know, I'd have ended the job here. But Ferngully was my friend, so I wanted to figure out a way to make this work. Besides, I did say no deadlines and we never talked about how many hours she'd have per week.

I revisited the design document. Was there anything more I could cut out? No, everything left was essential.

I thought about our development process. Could I adjust it so that we shift some time expenses from her to me?

Wait a second. What just happened? The dynamic had flipped. I outsource work to save myself time, but now I was restructuring the project to optimize for Ferngully's time. How did I become my freelancer's freelancer?

Nevermind, I just wanted us to complete the project as soon as possible. We could do that if I just stopped being picky in my code reviews.

Every time Ferngully sent me code, I'd give notes on ways to simplify the logic or document parts that needed explanation. This took a lot of time for both of us. I put [a lot of effort into my code reviews](/human-code-reviews-1/), and with days or weeks of latency between review rounds, we were burning a lot of time remembering context for where we were in the review.

# This doesn't make sense

I decided to save time, I'd stop giving Ferngully notes. Instead, I'd simply accept her code immediately, then make any changes I want after the code is merged in. She sent me her next code review, and I gave it an instant thumbs-up and merged it in. I tweaked it to match the design I had in mind, and boom - we had our first complete backend component. Only two left!

Ferngully was not as excited about this. She told me that the tough code review comments were the main draw to the project. She didn't care so much about making extra money as much as she cared about becoming a stronger developer by having her code critiqued.

This was difficult. I felt like between the natural time cost of communicating with another developer and making my own tweaks, I wasn't sure I was actually saving much time relative to doing this project solo. It takes me a long time to write code review notes that I feel express my thinking in a clear way. If I continued doing that, I'd definitely be in the negative time-wise. So I'd be paying a freelancer a nontrivial hourly rate, only to ultimately *lose* my own time.

We talked it over and decided it no longer made sense for her to work on it, so Ferngully wrapped up her work there.

# Implementing it myself

The Saturday night after I wrapped with Ferngully, I started working on KetoHub, and resolved to keep going until the MVP was done. I stayed up until 2am and published the first version. It was ugly, but it was done.

{% include image.html file="ketohub-v1-done.png" alt="Completed first version of KetoHub" fig_caption="KetoHub, when the MVP was finally complete" max_width="800px" img_link=true %}

As soon as I started working on it myself, I realized I should have done the project solo from the start. The web scraping logic was too core to KetoHub -- I'd have to learn it eventually anyway.

There are so many little decisions about tradeoffs to make in a minimal first version. Do I spend an extra hour to fix a bug that only affects 10% of recipes? Does I need to write an automated test for this module? It would be impossible to specify these ahead of time to a freelancer, but working solo, I can just go by intuition.

Building it myself also made it so much easier to fix flaws in the design. Even on a team of two, fixing design flaws involves so much friction. Ferngully had to ask me if it was indeed a flaw, I'd update the design document, she'd throw away some work and reimplement it according to the new design. When I'm working solo, all of that is basically instant.

# Takeaways

Despite the issues, I learned a lot from this process about creating new websites and working with freelancers.

* **Build your own MVP**.
  * It gives you an understanding of your core business that you may not learn otherwise.
  *  Only you know which corners to cut.
  *  Working solo maximizes your agility.

If you do work with a freelancer:

* **Discuss target completion dates**.
  * You don't have to set rigid deadlines, but figure out up front if you're thinking days and they're thinking months.
* **Agree on weekly bandwidth**.
  * Your freelancer may have other clients or priorities. Find out how much time they'll be able to dedicate to your project.

---

*This article was edited by [Samantha Mason](https://www.upwork.com/fl/samanthamason).*

*If you're a keto dieter interested in finding new recipes, check out [KetoHub](https://ketohub.io), the website I've been talking about this whole article.*