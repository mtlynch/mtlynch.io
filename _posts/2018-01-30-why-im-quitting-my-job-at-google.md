---
title: Why I'm Quitting My Job at Google
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
---

I started working at Google in 2014. For two years, I loved the job

# The honeymoon period

If you had asked me 18 months ago how long I planned to work for Google, I'd have said I'd be there at least another five years. Two years is the longest I've loved any job. There was a lot to love.

I'll skip the usual stuff like free food and massages.

# The promo process

Before I go any further, I have to explain the Google promotion process. Promotions are decided by committees. There's a lot of complexity to how these committees operate, but for the sake of brevity, I'll say that these committees award promotions to software engineers based on:

* Evidence that you can manage complexity
* Evidence that your work has had a positive impact on Google

# That's great, except...

On its face, these criteria sound very sensible.

# Work that won't get you promoted

## Fixing a bug

You can get promoted by *closing* bugs. Find some component that's old and has hundreds of bugs assigned to it, then totally rewrite a new, shiny version with *zero* known bugs. Then you can show it to the promotion committee and say, "Look! I closed *hundreds* of bugs!"

This is not unique to Google. Famed Netscape developer jwz refers to this as the ["Cascade of Attention-Deficit Teenagers" model](https://www.jwz.org/doc/cadt.html) of bug hygiene.

## Maintenance

Given Google's incentives for from-scratch rewrites, it probably isn't surprising that Google does a lot of from scratch rewrites.

Some variation on the following happened to me several times at Google.

I received an email like this one:

>Good news! We're shutting down CruftyLogs so that all of its clients can move to ShinyLogs.
>
> You'll be much happier on ShinySystem! It does 80% of what CruftySystem does, but *better*.

Unfortunately, while CruftyLogs automatically generated graphs of the number of errors logged each day, ShinyLogs doesn't support this. But my team *needs* this feature because all the directors love these graphs. So I 

And because nobody has been incentivized to fix bugs or write documentation, you run into a litany of issues just trying to use a new tool for its exact purpose.

When it comes time to write your case for promotion, none of this work is admissable as evidence of your career growth. Hundreds of people did the same migration, so it doesn't look hard. There's no measurable impact because all you did was keep things running the same as they were before. To the promotion committee, this is about as impressive to them as a six week vacation.

## Improving team efficiency

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

Google [made headlines](http://fortune.com/2016/12/09/alphabet-donated-its-employees-holiday-gifts-to-charity/) in 2016 for their holiday gifts. They had a long-running tradition of giving their employees lavish holiday gifts, such as premium Android phones or $1000 cash. In 2016, they announced that instead of giving us gifts, they were instead giving the equivalent value in Chromebooks to underprivileged schoolchildren.

This created controversy within Google. Some were upset to lose their gift, others were upset that people felt entitled to a gift. Some felt that gift or not, it represented a cut of ~$500-1000 in annual benefits.

At this time, I witnessed a conversation between two employees that was eye-opening for me:

>**Employee A**: You effectively are still getting the gift. You still receive compensation in stock awards. Cuts like this increase the value of Google's stock. You can sell your shares and buy any present you choose.
>
>**Employee B**: If I told my wift that I wasn't buying her a Christmas gift, but it was okay because the money was available in our bank account to buy whatever present she wanted, that wouldn't go over well.
>
>**Employee A**: You're in a *business relationship* with Google. If you're disappointed that Google isn't "romancing" you enough as an employee, you have a misguided notion of the relationship.

Google does a lot to build a sense of community in employees. To make us feel that we're not just employees, but that we *are* Google.

This conversation made me realize that I'm *not* Google. I provide Google a service for which I am paid money.

I know it sounds really obvious, but it was a huge realization for me. There were all these things I did because I thought, "This isn't good for me, but it's the right thing for Google."

I imagined that instead of drawing a salary from Google, I was paid by the hour. And they said to me, "We won't pay you for the time you spend fixing bugs, but it's good for Google if you fix bugs, so can you please fix bugs?"

# Optimizing for promotion

# Prospects

My coworkers keep asking me if I'm scared, but I'm not really sure why. Let me just think of a few people at random who I know left Google for other jobs:

Marissa Mayer

On average, these people now earn 120M per year. That's almost double what I make now!

# Indie Hackers