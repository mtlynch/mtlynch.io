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

My manager assured me that I was close to a promotion. He felt that I was already capable of senior-level work. I just needed a good project that would make the promotion committee see how capable I was.

# Your manager doesn't promote you?

No, managers at Google can't promote their direct reports. They don't even get a vote.

Instead, promotion decisions come from small committees. They're made up of senior-level software engineers and other managers, none of whom have ever heard of you until the day they decide whether or not to promote you.

As the promotion candidate, you're responsible for putting together your "promo packet." A collection of mini-essays you write, links to your design documents, and recommendations from teammates.

The promotion committees are primarily looking for evidence that:

* You can manage complexity
* Your work has had a positive impact on Google

Sensible, right? On its face, these are fair, objective criteria by which to decide whether someone is capable of performing at the next level.

Except there's some subtlety to these criteria that creates perverse incenvites. It's not long before you realize much of the work you can do to benefit Google doesn't get you promoted.

For example...

# Fixing bugs doesn't get you promoted

It's hard to make bugfixing look sexy to the promotion committee.

Imagine a bug that causes a frequent background job to fail 15% of the time. Every time it fails, it generates an email alert to your entire team. The job runs every six hours, so if it fails once, it probably will suceed sometime soon.

Everyone can live with this bug, but it chips away at your team's time. It means that your seven teammates get distracted by a false alarm four or five times per week. That's a time loss in itself, but the frequent false alarms cause "alarm fatigue," which reduces the team's ability to distinguish between false alarms and actual problems.

It sounds like a bug worth fixing, but fixing this bug will never get you promoted. Fixing *fifty* of these bugs will never get you promoted. "So what?" the promotion committee will say. "It doesn't require a top-performing engineer to fix some simple bugs." 

Anyone could have fixed it, so nobody does.

# Maintenance doesn't get you promoted

Given Google's lack of incentives for fixing bugs, it shouldn't surprise you to hear that Google does a lot of from-scratch rewrites.

Every few months, you'll receive an email like this:

>Good news! We're shutting down the CruftyLogs logging system so that all of its clients can have the distinct privilege of migrating to ShinyLogs.
>
> You'll be much happier on ShinyLogs! It does 80% of what CruftyLogs does, but *better*.

You draw the short straw and you're now responsible for migrating your team to ShinyLogs. And because nobody has been incentivized to fix bugs or write documentation, you run into a litany of issues just trying to use this new system for its exact purpose.

When it comes time to write your case for promotion, none of this work looks impressive. Hundreds of people did the same migration, so it obviously isn't hard. There's no measurable impact because all you did was keep things running the same as they were before. To the promotion committee, this is about as impressive to them as a six week vacation.

# But I love work that doesn't get me promoted

After a few years at Google, it slowly began to dawn on me that the work I find most fulfilling has zero value to the promotion committee.

TODO: Cartoon:

Frame 1
**Me**: I documented this component nobody understood.<br />
**Promotion committee**: Anyone can write documentation. Where are the metrics proving this helped Google?

Frame 2
 **Me**: This unnecessary pipeline stage kept breaking our build. I spent two weeks removing it.<br />
**Promotion committee**: Anyone can delete code. Only those truly worthy of promotion can write it.

Frame 3
**Me**: Everyone was afraid to touch that new feature Dave launched because it didn't have any end-to-end tests, so I wrote some.<br />
**Promotion committee**: That sounds promotion-worthy!

Frame 4
Dave
Stamped: Promoted!
For boldly launching a new feature without any end-to-end tests.

One of the projects I was most proud of was convincing my team to adopt a defined process for design reviews. We had a very strict process for code reviews, but our design review policy was very haphazard. People wrote design documents because they heard promotion committees were impressed by design documents. And they sent their design documents out for review, mainly because they've heard that the promotion committees are impressed when they see comments on the document from senior people. But there was nothing incentivizing anyone to actually *act* on feedback they receive about their design document.

TODO: Add design doc titled "Machine learning system for  launching nuclear missiles" where all the commenters are saying "You'll kill us all!", "This design must be stopped!" and speech bubble from the side saying, "Wow, look at all the passionate discussion from senior people. This must be a very good design."



This always felt strange to me, so I led an effort within my team to define a process for reviewing design documents. We agreed that the author shouldn't begin sending out code for review until their design document was explicitly approved. I defined what that approval process looked like.

It was difficult work because I was new to the team. Developers in general don't love writing design documents or additional process. In the end, I came up with a process that everyone agreed to. I held a check-in meeting six months after we adopted this process to gather feedback and course correct.

At my next attempt at promotion, the committee specifically called it out to say that while they think it sure was swell that I did that, it didn't demonstrate technical complexity and thus was not relevant to my case for promotion.

# The holiday gift wake up call

Google [made headlines](http://fortune.com/2016/12/09/alphabet-donated-its-employees-holiday-gifts-to-charity/) in 2016 for their holiday gifts. Breaking their long-standing tradition of giving employees lavish gifts, they instead spent the money on ~~advertising disguised as charity~~ Chromebooks for underprivileged schoolchildren.

Shortly after this, I witnessed the following conversation between two employees:

>**Employee A**: You effectively are still getting the gift. Cuts like this increase the value of Google's stock. You can sell your stock grants and buy any present you choose.
>
>**Employee B**: If I told my wife that I wasn't buying her a Christmas gift, but she could use the money in our shared bank account to buy whatever she wanted, that wouldn't go over well.
>
>**Employee A**: You're in a **business** relationship with Google. If you're disappointed that Google isn't "romancing" you with gifts akin to those you buy your wife, you have a misguided notion of the relationship.

Google does a lot to build a sense of community in employees. To make us feel that we're not just employees, but that we *are* Google. That conversation made me realize that I'm *not* Google. I provide a service for Google in exchange for money.

If Google and I have a business relationship that exists to serve each side's interests, why was I spending time on all these tasks that served Google's interests instead of my own?

# Optimizing for promotion

If Google was offering incentives to do work that was measurable and visible, then that's what I'd do.

Shortly after the holiday gift discussion, I was assigned to take over a legacy component from our sister team in India. It was a maintenance nightmare because it was largely undocumented and tightly coupled with a bunch of other systems that the other team still owned.

The path to promotion was clear: I needed to do a from-scratch rewrite.

The system originally took a team of three a year to write. I was leading two other developers, but we only had six months until the next performance review, so I stopped doing anything except for trying to get this rewrite launched before the next promotion cycle.

My quality bar for code dropped from, "Will we be able to maintain this for the next 5 years?" to, "Can I prevent this from blowing up until performance reviews are finalized?"

I stopped helping with hiring and recruiting, both of which were time-consuming activities that had zero value for promotion. I went from conducting one or two interviews a week to zero. I deleted all emails from the Google recruiter for my alma mater.

In fact, I stopped reading all emails unless I was explicitly on the To or CC line.

There were two bright interns on my team who thought their summer project might improve the efficiency of the system we were launching. But I knew we could hit our the minimum accuracy requirements for launch without their help, so I refused to work with them. No, absolutely not.

Halfway through my project, management decided to do a big handoff of our legacy components to another team. It was tedious, unsexy work, and I didn't help with any of it.

I didn't like doing this. I've worked with teammates that I could tell were optimizing for their promotion and I thought they were terrible. But I felt like I had spent three years making decisions that put my team or the company first, so it was my turn.

We delivered the project on schedule, just before performance reviews began. Time to receive my promotion!

# Moment of truth

"I'm afraid it's bad news," my manager told me.

During every performance cycle, the managers within each division have to get together to agree on "calibration ratings" for their direct reports. Mine was "Superb," the highest possible rating, given to only ~5% of employees each cycle.

The promotion committee agreed that my past six months demonstrated that I could do work at the caliber of a Google Senior Software Engineer. But it was the *only* time in my Google career that I showed this, so they didn't think it was enough of a track record to merit a promotion. This was despite ratings of "Exceeds Expectations" or "Strongly Exceeds Expectations" for the past two years straight.

# Time to leave

Before I found out my promotion decision, I had already decided to leave.  People say that every promotion level becomes exponentially harder. I wasn't looking forward to 

Everyone was telling me that I did great work, but I wasn't proud of any of it. I didn't consider it good engineering and I don't think it best served Google.

# Working for myself

I always liked the idea of starting my own software company at some point, but I didn't know how to do it. I didn't like the idea of pitching to venture capital firms. I really didn't like the thought of constantly being under pressure from my investors to constantly pump out new features to drive growth.

In late 2016, I discovered Indie Hackers. It's a podcast and community for people who are interested in starting small software businesses, so they just... start them. No VCs or funding. Generally using savings or as a side project.

# So what am I going to work on?

When I tell people I left Google, they assume that because Google's so cushy, I *must* have some brilliant idea or I'd be an idiot to leave. But I'm an idiot with no plan.

My rough plan is to try different projects for a few months each to see if any of them catch on. Here are some of my ideas:

* Continue working on KetoHub (TODO: link) and see if I can make it profitable
* I've been writing about Sia, a distributed storage network  for several years. I can build some business on top of that technology.
* I can put more energy into blogging and look for ways to earn money from that