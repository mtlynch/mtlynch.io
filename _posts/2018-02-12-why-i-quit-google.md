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

My last day was Feb. 1, 2018.

# The honeymoon period

I'll go back to mid-2016. I had been at Google for about two years, and I still loved the company. 

A question on the annual employee survey read:

>I expect to be working for Google five years from today.

Strongly agree!

Of *course* I'd still be at Google in five years. I was surrounded by some of the best engineers in the world, using the most advanced development tools in the world, and eating the free-est food in the world.

On my last performane review, I was rated "exceeds expectations," so if I just kept going, I'd be promoted to the next level, Senior Software Engineer.

# How promotions work at Google

At Google, promotions don't come from your manager or even your manager's manager. Instead, promotion decisions are made by dozens of small committees. These committees include senior-level software engineers and managers, none of whom have ever heard of you before the day they decide whether to grant you a promotion.

How do these people decide whether to promote you if they know nothing about you? Packets!

When you apply for a promotion, you put together your "promo packet" which contains:

* Mini-essays about your most significant projects
* Reviewable artifacts from these projects (e.g., design documents, changelists, bug histories)
* Feedback from people who have worked with you

The promotion committees are primarily looking for evidence of two things:

* Evidence that you can manage complexity
* Evidence that your work has had a positive impact on Google

Sensible, right? Those sound like fair, objective criteria by which to measure ability.

Except there's some subtlety to these criteria that creates perverse incenvites. It's not long before you realize much of the work you can do to benefit Google doesn't get you promoted.

For example...

# Fixing bugs doesn't get you promoted

It's hard to make bugfixing look sexy to the promotion committee.

There's a small class of bugs that end up being impressive. Some smart person tried unsuccessfully to fix it before you, but you dug deep into the disgusting innards of some legacy code you don't even own and figured out a clever fix. Those can impress promotion committees, especially if you have a few that you can package up together as a "project" in your promo packet.

But most bugs are not sexy.

Imagine a bug that causes a frequent background job to fail 15% of the time. Every time it fails, it generates an email alert to your entire team. The job runs ever six hours, so if it fails once, it probably will suceed sometime soon.

But fixing this bug will never get you promoted.

If you fix an unsexy bug, or even 50 unsexy bugs, promotion committee doesn't care. "So what?" they'll say. "It doesn't require a top-performing engineer to fix some simple bugs." 

Anyone could have fixed it, so nobody does.

Instead of fixing bugs, your team just writes more code until your system has hundreds or even thousands of bugs per developer. One of your teammates gets management's blessing to spend two quarters totally rewriting the system. When they're done, they are promptly promoted and showered with praise for replacing an evil, buggy system with a new, happy one with ZERO (known) bugs.

This problem is not unique to Google. Famed Netscape developer jwz refers to this as the ["Cascade of Attention-Deficit Teenagers" model](https://www.jwz.org/doc/cadt.html) style of development.

# Maintenance doesn't get you promoted

Given Google's incentives for from-scratch rewrites, it shouldn't surprise you to hear that Google does a lot of from-scratch rewrites.

Every few months, you'll receive an email like this:

>Good news! We're shutting down CruftyLogs so that all of its clients can move to ShinyLogs.
>
> You'll be much happier on ShinyLogs! It does 80% of what CruftyLogs does, but *better*.

You're instantly responsible for migrating your team to ShinyLogs because eight months ago, you fixed a typo in a comment near the CrufyLogs call, making you the de facto team expert on CruftyLogs.

Okay, that's not so bad
Unfortunately, while CruftyLogs automatically generated graphs of the number of errors logged each day, ShinyLogs doesn't support this. But my team *needs* this feature because all the directors love these graphs. So I 

And because nobody has been incentivized to fix bugs or write documentation, you run into a litany of issues just trying to use a new tool for its exact purpose.

When it comes time to write your case for promotion, none of this work is admissable as evidence of your career growth. Hundreds of people did the same migration, so it doesn't look hard. There's no measurable impact because all you did was keep things running the same as they were before. To the promotion committee, this is about as impressive to them as a six week vacation.

# Improving team efficiency doesn't get you promoted

I joined a new team in mid-2016. Within a few months, I noticed something strange about our design review process.

It went like this:

1. Write design document
2. Send design document out for review
3. Write code

We were a missing a step between (2) and (3) where the developer resolves the issues that arose during the design review. There was nothing stopping a developer from just saying, "Thanks for your notes. I'll take them into consideration," and then ignoring the feedback completely.

This is also not surprising, as it follows from Google's incentives. If you want a promotion, you don't want to answer design questions like, "How are we going to support monitoring and alerts for this new system?" You just want to launch ASAP, get your promotion, and worry about setting up outage alerts later.

I felt like this strategy was too wasteful. If we treated all design review feedback as optional, we were wasting everyone's time and squandering the benefits of review. So I defined a process we could follow to reach "design approval." Changelists at Google can't be merged in until someone explicitly reviews and approves it. We were holding design documents to the same standard.

This was a nontrivial amount of work. I wrote the process, got people's feedback, addressed their concerns. We eventually reached consensus that this was a good idea. We followed that process after, and in my performance reviews, my teammates consistently gave feedback that they were pleased with how the process was designed and the positive impact it had on the team's product quality.

I included this work when I applied for promotion last fall. The promotion committee specifically called it out to say that while they think it's nice that I did that, it didn't demonstrate an ability to handle technical complexity and thus was not useful to my case for promotion.

# The holiday gift wake up call

Google [made headlines](http://fortune.com/2016/12/09/alphabet-donated-its-employees-holiday-gifts-to-charity/) in 2016 for their holiday gifts. They announced that instead of their long-standing tradition of giving employees lavish gifts, they would instead spend that money on ~~advertising disguised as charity~~ Chromebooks for underprivileged schoolchildren.

This created controversy within Google. Some were upset to lose their gift, others were upset that people felt entitled to a gift. Some felt that gift or not, it represented a cut of ~$500-1000 in annual benefits.

At this time, I witnessed a conversation between two employees that was eye-opening for me:

>**Employee A**: You effectively are still getting the gift. You still receive compensation in stock awards. Cuts like this increase the value of Google's stock. You can sell your shares and buy any present you choose.
>
>**Employee B**: If I told my wife that I wasn't buying her a Christmas gift, but she could use the money in our shared bank account to buy whatever she wanted, that wouldn't go over well.
>
>**Employee A**: You're in a *business relationship* with Google. If you're disappointed that Google isn't "romancing" you with gifts akin to those you buy your wife, you have a misguided notion of the relationship.

Google does a lot to build a sense of community in employees. To make us feel that we're not just employees, but that we *are* Google.

That conversation made me realize that I'm *not* Google. I provide Google a service for which I am paid money.

If Google and I have a business relationship that exists to serve each side's interests, why was I spending time on all these tasks that served Google's interests but couldn't get me promoted?

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

I always envisioned myself starting my own software company at some point. I wasn't sure how to get there though. It seemed to involve pitching to venture capitalists, which I wasn't excited to do. And it seemed to involve constant ambitious bets for growth, which I also wasn't that interested in.

In late 2016, I discovered Indie Hackers. It's a podcast and community for people who are interested in starting small software businesses, so they just... start them. No VCs or funding. Generally using savings or as a side project.



# Prospects

My coworkers keep asking me if I'm scared, but I'm not really sure why. I selected a few names at random of people who have left jobs at Google, and I looked up what they're doing now:

* [Marissa Mayer](https://en.wikipedia.org/wiki/Marissa_Mayer): CEO of Yahoo
* [Dick Costolo](https://en.wikipedia.org/wiki/Dick_Costolo): CEO of Twitter
* [Sheryl Sandberg](https://en.wikipedia.org/wiki/Sheryl_Sandberg): COO of Facebook

Wow, it looks like they're all doing great! The least successful person on the list still earns over $20M per year, which is more than double what I was earning at Google.