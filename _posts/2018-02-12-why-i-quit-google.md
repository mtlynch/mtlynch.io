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

My last day was February 1. I worked at Google for just under four years.

# The first two years

At the end of my second year at Google, I loved working there.

The annual employee survey asked me how much I agreed with the statement, "I expect to be at Google in five years." I enthusiastically clicked, "Strongly Agree." 

Of *course* I'd still be at Google in five years. I was surrounded by the best engineers in the world, using the most advanced development tools in the world, and eating the free-est food in the world.

My most recent performance review rated me as "Exceeds Expectations." If I just kept going, I'd soon be promoted to the next level, Senior Software Engineer. What a great title! Forever after in my career, I'd be able to say, "Yes, I was a *Senior* Software Engineer. At *Google*." People would be so impressed.

My manager assured me that I was close. He felt that I was already capable of senior-level work. I just needed the right project to prove it to the promotion committee.

# Your manager doesn't promote you?

No, managers at Google can't promote their direct reports. They don't even get a vote.

Instead, promotion decisions come from small committees. They're made up of upper-level software engineers and other managers, none of whom have ever heard of you until the day they decide whether or not to promote you.

You apply for promotion by assembling a "promo packet": a collection of mini-essays you write about why you deserve a promotion, links to your design documents, and written recommendations from your teammates.

The promotion committee reads your packet looking for evidence that:

* You can manage complexity
* Your work has had a positive impact on Google

Sensible, right? On its face, these are fair, objective criteria for promotion.

Except it creates some perverse incenvites. It's not long before you realize much of the work you can do to benefit Google doesn't get you promoted.

For example...

# Fixing bugs is irrelevant for promotion

Imagine a bug that causes a frequent background job to fail and generate an email alert 15% of the time. The job runs every six hours, so everyone has learned to ignore these alerts because they know the job will suceed if they let it run a few more times.

Everyone can live with this bug, but it chips away at your team's time. It means that a false alarm distracts your seven teammates four or five times per week. That's a time loss in itself, but the frequent false alarms cause "alarm fatigue." It degrade's everyone's ability to distinguish between false alarms and actual problems.

So why not just fix the bug and save everyone from the false alarms? Because fixing this bug won't help your case for promotion. Fixing *fifty* of these bugs won't help your case for promotion. "So what?" the promotion committee will say. "It doesn't require a top-performing engineer to fix some simple bugs." 

Anyone could have fixed it, so nobody does.

# Maintenance work is irrelevant for promotion

Given its lack of incentives for fixing bugs, it shouldn't surprise you to hear that Google does a lot of from-scratch rewrites.

Every few months, you'll receive an email like this:

>Good news! We're shutting down the CruftyLogs logging system so that everyone can enjoy the honor of migrating to its replacement, ShinyLogs.
>
> You'll be much happier on ShinyLogs! It does 80% of what CruftyLogs does, but *better*.

You draw the short straw and you're now responsible for migrating your team to ShinyLogs. And because there was no incentive for the ShinyLogs team to fix bugs or write documentation, you spend weeks on a litany of issues even though you're using ShinyLogs for its exact purpose.

When it comes time to write your case for promotion, none of this work looks impressive. Hundreds of people did the same migration, so it obviously isn't hard. There's no measurable impact because all you did was keep things running the same as they were before. To the promotion committee, this is about as impressive to them as a six week vacation.

# But I love work that's irrelevant for promotion

TODO: Rewrite this section

After a few years at Google, it began to dawn on me that the work I find most fulfilling has zero value to the promotion committee.

TODO: Cartoon:

**Frame 1**<br />
Me: I documented this component nobody understood.<br />
Promotion committee: Anyone can write documentation. Where are the metrics proving this helped Google?

**Frame 2**<br />
 Me: This unnecessary pipeline stage kept breaking our build. I spent two weeks removing it.<br />
Promotion committee: Anyone can delete code. Only those truly worthy of promotion can write it.

**Frame 3**<br />
Me: Everyone was afraid to touch that new feature Dave launched because it didn't have any end-to-end tests, so I wrote some.<br />
Promotion committee: That sounds promotion-worthy!

**Frame 4**<br />
Promo packet labeled: Dave. "I boldly launched a new feature without any end-to-end tests." It's stamped "PROMOTED"

One of my proudest accomplishments at Google was convincing my team to adopt a design review process.

We had a very strict process for code reviews, but our design review policy was "do whatever you feel like." People wrote design documents because they heard promotion committees were impressed by design documents. And they sent them out for review because they heard that the promotion committees were impressed by comments in the document from senior people. But there was no incentive to *act* on their review feedback.

TODO: Add design doc titled "Machine learning system for  launching nuclear missiles" where all the commenters are saying "You'll kill us all!", "This design must be stopped!" and speech bubble from the side saying, "Wow, look at all the passionate discussion from senior people. This must be a very good design."

This turned design reviews into a sort of dog and pony show. As a reviewer, it wasn't worth your time to "good at design reviews"

I led an effort within my team to define a design review process. We agreed that the author shouldn't begin sending out code for review until their design document was explicitly approved. I defined what that approval process and how the whole review flow would work.

It was difficult work because developers don't love additional process, especially if it causes them to spend more time writing design documents. But after we adopted the process, everyone was happy it. My teammates agreed that it helped us catch design flaws earlier and increased the quality of our code.

The promotion committee was not impressed. At my next attempt at promotion, they specifically called out this work to say that while they think it sure was swell that I did it, they didn't see any technical complexity in it, so it did not add to my case for promotion.

# The holiday gift wake up call

Google [made headlines](http://fortune.com/2016/12/09/alphabet-donated-its-employees-holiday-gifts-to-charity/) in 2016 for their holiday gifts. Breaking their tradition of buying lavish gifts for employees, they spent the money on ~~advertising disguised as charity~~ Chromebooks for underprivileged schoolchildren.

Shortly after this, I witnessed the following conversation between two employees:

>**Employee A**: You effectively **are** still getting the gift. Cost cuts like this increase the value of Google's stock. You can sell your stock grants and buy any present you choose.
>
>**Employee B**: If I told my wife that I wasn't buying her a Christmas gift, but she could use the money in our shared bank account to buy whatever she wanted, that wouldn't go over well.
>
>**Employee A**: You're in a **business** relationship with Google. If you're disappointed that Google isn't "romancing" you with gifts like the ones you buy your wife, you have a misguided notion of the relationship.

Oh yeah! I was in a business relationship with Google.

It may sound strange that it took me two and a half years to realize it, but Google goes to great lengths to build a sense of community among its employees. To make us feel that we're not just employees, but that we *are* Google.

That conversation made me realize that I'm *not* Google. I provide a service for Google in exchange for money.

So if Google and I have a business relationship that exists to serve each side's interests, why was I spending time on all these tasks that served Google's interests instead of my own?

# I'm not in control of my career

The more I thought about the situation, the weirder it seemed. My career advancement was dictated by an anonymous committee who thought about me for maybe an hour or so.

Managers, directors, and VPs above me had their own incentives for picking projects and team priorities. They're optimizing for their own careers, not mine.

There had been several times in my first few years at Google where I was partway through

TODO: cartoon

**Frame 1**<br />
...and they use the DNA to bring these dinosaurs back to life!

**Frame 2**<br />
Then the velociraptor opens the kitchen door!
Oh no! I dropped my pens. Can you pick them up for me?

**Frame 3**<br />
Crichton: As I was saying
Publisher: No, you need to start a new story. Because that one was interrupted, I unfortunately have no idea how good a novelist you are.

**Frame 4**<br />
Crichton is frowning. Publisher seems oblivious.


# One Last Shot

Performance reviews only happen every six months, so I made one final attempt at promotion. I took on a new project and did the opposite of everything my engineering instincts told me. My quality bar dropped from, "Will we be able to maintain this for the next 5 years?" to, "Can I prevent this from blowing up until performance reviews are finalized?" I didn't fix any bugs unless they risked my project's launch. I wriggled out of all responsibilities for maintenance work.

My performance rating was "Superb," the highest possible rating, given to only ~5% of employees each cycle.  The promotion committee agreed that my past six months demonstrated that I could do work at the caliber of a Google Senior Software Engineer. But it was the *only* time in my Google career that I showed this, so they didn't think it was enough of a track record to merit a promotion. This was despite ratings of "Exceeds Expectations" or "Strongly Exceeds Expectations" for the past two years straight.

I wish I could say I didn't care because I knew I was leaving, but I would have really loved to get that title.

# Working for myself

I always liked the idea of starting my own software company at some point, but I didn't know how to do it. I didn't like the idea of pitching to venture capital firms. I really didn't like the thought of constantly being under pressure from my investors to constantly pump out new features to drive growth.

In late 2016, I discovered Indie Hackers. It's a podcast and community for people who are interested in starting small software businesses, so they just... start them. No venture capitalists or investors. Generally using savings or as a side project.

The money had always worried me.

# What's next

When I tell people I left Google, they assume I *must* have some brilliant idea or I'd be an idiot to leave such a cushy job. But I am indeed an idiot with no real plan.

My rough strategy is to try different projects for a few months each to see if any of them catch on. Here are some of my ideas:

* Continue working on KetoHub (TODO: link) to see if I can make it profitable
* I've been writing about Sia (TODO: link), a distributed storage network  for several years. Maybe I can build some business on top of that technology.
* Put more energy into blogging, and look for ways to earn money from it