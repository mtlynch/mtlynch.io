---
title: Why I Quit Google to Work For Myself
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
---

I started working at Google in early 2014. For the first two years, I loved the job. Then I applied for a promotion.

My last day was February 1.

# The first two years

I'll go back to mid-2016. I had been at Google for about two years, and I still loved the company. 

A question on the annual employee survey read:

>I expect to be working at Google five years from today.

Strongly agree!

Of *course* I'd still be at Google in five years. I was surrounded by some of the best engineers in the world, using the most advanced development tools in the world, and eating the free-est food in the world.

On my last performane review, I was rated "exceeds expectations," so if I just kept going, I'd be promoted to the next level, Senior Software Engineer. What a great title! If I got that, forever after in my career, I'd be able to say, "Yes, I was a *Senior* Software Engineer. At *Google*." People would be so impressed with me.

# Promotion by committee

Before I go further, I'll explain how promotions work at Google, because it's an unusual system.

At Google, promotions don't come from your manager or even your manager's manager. Instead, promotion decisions are made by dozens of small committees. They're made up of senior-level software engineers and managers, none of whom have ever heard of you until the day they decide whether to grant you a promotion.

How do these people decide whether to promote you if they know nothing about you? Packets!

# Promotion by packet

When you apply for a promotion, you put together your "promo packet" which contains:

* Mini-essays about your most significant projects
* Artifacts from these projects (e.g., design documents, changelists, bug histories)
* Feedback from people who have worked with you

The promotion committees are primarily looking for evidence that:

* You can manage complexity
* Your work has had a positive impact on Google

Sensible, right? On its face, these are fair, objective criteria by which to decide whether someone is capable of performing at the next level.

Except there's some subtlety to these criteria that creates perverse incenvites. It's not long before you realize much of the work you can do to benefit Google doesn't get you promoted.

For example...

# Fixing bugs doesn't get you promoted

It's hard to make bugfixing look sexy to the promotion committee.

Imagine a bug that causes a frequent background job to fail 15% of the time. Every time it fails, it generates an email alert to your entire team. The job runs every six hours, so if it fails once, it probably will suceed sometime soon.

Everyone can live with this bug, but it chips away at your team's time. It generates four or five email alerts per week, which means that seven people get distracted by a false alarm four or five times per week. This contributes to "alarm fatigue," which reduces people's ability to distinguish between false alarms and actual problems.

It sounds like a bug worth fixing, but fixing this bug will never get you promoted.

The promotion committee doesn't care that you fixed this bug. The promotion committee doesn't care if you fixed *fifty* of these bugs. "So what?" they'll say. "It doesn't require a top-performing engineer to fix some simple bugs." 

Anyone could have fixed it, so nobody does.

This continues until your system has hundreds or even thousands of bugs per developer. One of your teammates gets management's blessing to spend two quarters totally rewriting the system. When they're done, they are promptly promoted and showered with praise for replacing an evil, buggy system with a new, happy one with ZERO (known) bugs.

This problem is not unique to Google. Famed Netscape developer jwz refers to this as the ["Cascade of Attention-Deficit Teenagers" model](https://www.jwz.org/doc/cadt.html) style of development.

# Maintenance doesn't get you promoted

Given Google's incentives to encourage from-scratch rewrites, it shouldn't surprise you to hear that Google does a lot of from-scratch rewrites.

Every few months, you'll receive an email like this:

>Good news! We're shutting down the CruftyLogs logging system so that all of its clients can have the distinct privilege of migrating to ShinyLogs.
>
> You'll be much happier on ShinyLogs! It does 80% of what CruftyLogs does, but *better*.

You're instantly responsible for migrating your team to ShinyLogs because eight months ago, you fixed a typo in a comment near the CrufyLogs call, making you the de facto team expert on CruftyLogs.

Okay, that's not so bad
Unfortunately, while CruftyLogs automatically generated graphs of the number of errors logged each day, ShinyLogs doesn't support this. But my team *needs* this feature because all the directors love these graphs. So I 

And because nobody has been incentivized to fix bugs or write documentation, you run into a litany of issues just trying to use a new tool for its exact purpose.

When it comes time to write your case for promotion, none of this work is admissable as evidence of your career growth. Hundreds of people did the same migration, so it doesn't look hard. There's no measurable impact because all you did was keep things running the same as they were before. To the promotion committee, this is about as impressive to them as a six week vacation.

# I love work that doesn't get me promoted

After a few years at Google, it slowly began to dawn on me that the work I find most fulfilling has zero value to the promotion committee.

>**Me**: We depend on this undocumented legacy system. When my work forces me to learn part of it, I should document what I learned and add tests to enforce it.<br />
>**Promotion committee**: Anyone can write documentation. Where are the metrics proving this documentation helped Google?
>
> **Me**: Ugh, I just made a change that caused a buld break in a system we don't even use anymore. I'm going to spend a couple days turning that system down and deleting the dead code.<br />
>**Promotion committee**: Why? Anyone can delete code. Only the promotion-worthy can write it.
>
>**Me**: I spend 2-3x as long as my teammates on code reviews because I like thinking deeply about opportunities to simplify the design. When Dave was building his new system, I found several opportunities to reduce its dependencies and make it cheaper to maintain.<br />
>**Promotion committee**: Did you say Dave launched a new system? Let's give him a promotion!

The most glaring example of the divide between what I value and what the promotion committees value was in my quest for better design reviews.

# My crusade for design reviews

Google has very formal processes for code reviews, but is oddly silent about design reviews. There's nothing that says you have to write a design document at all, and certainly no company-wide rules about how teams should review designs.

People write design documents because they've heard promotion committees are impressed by design documents. And they send their design documents out for review, mainly because they've heard that the promotion committees are impressed when they see comments on the document from senior people. But there's nothing incentivizing anyone to actually *act* on feedback they receive about their design document.

TODO: Add design doc titled "Machine learning system for  launching nuclear missiles" where all the commenters are saying "You'll kill us all!", "This design must be stopped!" and speech bubble from the side saying, "Wow, look at all the passionate discussion from senior people. This must be a very good design."

This always felt strange to me, so I led an effort within my team to define a process for reviewing design documents. We agreed that the author shouldn't begin sending out code for review until their design document was explicitly approved. I defined what that approval process looked like.

It was difficult work because I was new to the team. Developers in general don't love writing design documents or additional process. In the end, I came up with a process that everyone agreed to. I held a check-in meeting six months after we adopted this process to gather feedback and course correct.

At my next attempt at promotion, the committee specifically called it out to say that while they think it's nice that I did that, it didn't demonstrate an ability to handle technical complexity and thus was not relevant to my case for promotion.

# The holiday gift wake up call

Google [made headlines](http://fortune.com/2016/12/09/alphabet-donated-its-employees-holiday-gifts-to-charity/) in 2016 for their holiday gifts. Breaking their long-standing tradition of giving employees lavish gifts, they instead spent the money on ~~advertising disguised as charity~~ Chromebooks for underprivileged schoolchildren.

Shortly after this, I witnessed the following conversation between two employees:

>**Employee A**: You effectively are still getting the gift. You still receive compensation in stock awards. Cuts like this increase the value of Google's stock. You can sell your shares and buy any present you choose.
>
>**Employee B**: If I told my wife that I wasn't buying her a Christmas gift, but she could use the money in our shared bank account to buy whatever she wanted, that wouldn't go over well.
>
>**Employee A**: You're in a *business relationship* with Google. If you're disappointed that Google isn't "romancing" you with gifts akin to those you buy your wife, you have a misguided notion of the relationship.

Google does a lot to build a sense of community in employees. To make us feel that we're not just employees, but that we *are* Google.

That conversation made me realize that I'm *not* Google. I provide Google a service for which I am paid money.

If Google and I have a business relationship that exists to serve each side's interests, why was I spending time on all these tasks that served Google's interests instead of my own?

# Optimizing for promotion

The timing was also right. Through some weird horse-trading, my team ended up with some . I know, I'll do a from-scratch rewrite!

Conducting interviews? Helping with recruiting? I went from 1-2 interviews a week and recruiting visits to my alma mater to 0 interviews a week and deleting all emails from the Google recruiter for my college.

There were two bright interns on my team who wanted to integrate their summer project with my my work. No, absolutely not.

I ignored all team emails that weren't directly related to my project. Halfway through my project, they decided to do a big handoff of our legacy components to another team. It was tedious, unsexy work, and I didn't help with any of it.

Normally I would document how I did this because dozens of teams will come by. But documenting other teams' work wouldn't get me promoted. It would only take away time I could spend on launch-critical things.

# Moment of truth

"I'm afraid it's bad news," my manager told me at our meeting for revealing the promotion committee's decision.

My calibration rating was "Superb," the highest possible rating. Only ~5% of employees get this rating. The promotion committee agreed that my past six months demonstrated an ability to perform at the level of a senior software engineer. But the past six months was the *only* time they thought I showed this, so it wasn't long enough to get promoted. This was despite performance ratings of "Exceeds Expectations" or "Strongly Exceeds Expectations" for the past two years straight.

I had decided to leave before I found out the decision. People say that every promotion level becomes exponentially harder. I wasn't looking forward to 

Everyone was telling me that I did great work, but I wasn't proud of any of it. I didn't consider it good engineering and I don't think it best served Google.

# Getting promoted eventually

I don't mean to imply that the only people who get promoted at Google are conniving ladder climbers. 

After my first failed attempt at promotion, my manager told me that, "eventually, people get the promotions they deserve." I think that's true, but it depends on your tolerance for "eventually." 

You can get promoted by just chugging along and doing good work, but you'll probably get promoted 1-5 years later than you would have if you had optimized your work to further your own career. The exact delay can be extended by a variety of events outside of your control:

* You get assigned a project that's time-consuming, but whose benefits are not measurable (e.g., taking ownership of legacy code)
* Management cancels your project due to changes in priority
* Your senior teammate leaves the company, leaving you with fewer supporters whose word carries weight with promotion committees

# Working for myself

I always liked the idea of starting my own software company at some point, but I didn't know how to do it. I didn't like the idea of pitching to venture capital firms. I really didn't like the thought of constantly being under pressure from my investors to constantly pump out new features to drive growth.

In late 2016, I discovered Indie Hackers. It's a podcast and community for people who are interested in starting small software businesses, so they just... start them. No VCs or funding. Generally using savings or as a side project.



# So what am I going to work on?

When I tell people I left Google, they assume that because Google's so cushy, I *must* have some brilliant idea or I'd be an idiot to leave. But I'm an idiot with no plan.

My rough plan is to try different projects for a few months each to see if any of them catch on. Here are some of my ideas:

* Continue working on KetoHub (TODO: link) and see if I can make it profitable
* I've been writing about Sia, a distributed storage network  for several years. I can build some business on top of that technology.
* I can put more energy into blogging and look for ways to earn money from that


# Prospects

My coworkers keep asking me if I'm scared, but I'm not really sure why. I selected a few names at random of people who have left jobs at Google, and I looked up what they're doing now:

* [Marissa Mayer](https://en.wikipedia.org/wiki/Marissa_Mayer): CEO of Yahoo
* [Dick Costolo](https://en.wikipedia.org/wiki/Dick_Costolo): CEO of Twitter
* [Sheryl Sandberg](https://en.wikipedia.org/wiki/Sheryl_Sandberg): COO of Facebook

Wow, it looks like they're all doing great! The least successful person on the list still earns over $20M per year, which is more than double what I was earning at Google.