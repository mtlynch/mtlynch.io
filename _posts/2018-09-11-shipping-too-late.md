---
title: How I Tricked Myself into Shipping Too Late
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
header:
  og_image: images/shipping-too-late/rejection.jpg
  teaser: images/shipping-too-late/rejection.jpg
tags:
- zestful
- mvp
- startups
excerpt: I've heard dozens of stories of founders failing because they shipped too
  late. It seemed like an easy fate to avoid until I made the same mistake.
---

Many software founders fail for a simple reason: they ship too late. They spend years developing a product in a vacuum only to see it crumble the first time a real customer touches it.

The [Indie Hackers podcast](https://www.indiehackers.com/podcast) features many such stories. The show's stated mission is to help listeners learn from the mistakes of startup founders, but host Courtland Allen frequently expresses existential angst about whether this is even possible:

>...there are things you can tell people over and over again until you’re blue in the face, and they still won’t listen to you or really understand what you’re saying until they go out and discover what you mean the hard way by making their own mistakes.
>
>-Courtland Allen, [*Indie Hackers Podcast*](https://www.indiehackers.com/podcast/049-josh-kaufman-of-the-personal-mba)

I always thought, "No, Courtland. That sounds inefficient. I'll take the free lessons and *not* make the costly mistakes, thank you."

From the title of this post, you probably figured out that my plan didn't work.

# The product idea

My idea was an offshoot from my website, [KetoHub](https://ketohub.io/), which allows users to search keto recipes by ingredient.

To support this functionality, KetoHub simplifies ingredients when it executes a search. For example, an ingredient such as "½ cup mozzarella cheese, shredded" reduces to "mozzarella cheese." That way, if a user begins typing "cup..." they see matches for recipes related to "cupcakes" rather than every recipe that includes a "cup" of some ingredient.

I initially solved this with regular expressions, but that quickly [grew unmanageable](/resurrecting-1/#what-business-was-it-of-mine). I knew machine learning could achieve better results, but it required a substantial up-front investment.

{% assign fig_caption = "[Zestful](https://zestfuldata.com/), a recipe ingredient parsing service" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="zestful-logo.png" alt="Zestful logo" fig_caption=fig_caption max_width="370px" class="align-right img-border" link_url="https://zestfuldata.com/" %}

Maybe other developers struggled with the same problem. If I offered a service that solved this specific issue, ingredient parsing could be its own business. Thus, the idea was born for [Zestful](https://zestfuldata.com/), my ingredient-parsing service.


# The MVP that wasn't

In the lean startup world, people frequently talk about the "MVP," the minimum viable product. The MVP is the simplest version of an idea. You're supposed to build it as soon as possible, put it into potential customers' hands, and judge from their reaction whether your idea is viable.

One of the most familiar stories of failure is of the founder so confident in their idea that they neglect to build an MVP and instead invest years into a full-fledged product that nobody wants.

With Zestful,  I *did* build an MVP. I even defined the acceptance criteria up-front to prevent myself from disappearing down a rabbit hole of endless tweaks and improvements.

{% include image.html file="acceptance-criteria.png" alt="Acceptance criteria document" fig_caption="Ingredient parser acceptance criteria" max_width="300px" img_link=true class="img-border" %}

After about 120 hours of development work, I completed a working prototype that satisfied my acceptance criteria.

I didn't officially launch for another two months. Instead, I spent that time writing more code.

# It's okay because it's *sales* coding

You might be wondering how I ended up spinning my wheels for so long after my MVP was "done." Well, here's a summary of my thought process throughout those two months:

*Day 1: Acceptance criteria is accomplished*

>The service works! But customers can only use it if they write complex expressions on the command line.
>
>How can I subject my customers to the indignity of writing `curl` commands in the age of Web 3.1? I have to create a simple HTML frontend so that customers can test it right from the browser.

*5 days later*

>The basic frontend works, but it's strange to have this orphaned HTML form sitting there without any explanation.
>
>I need to build a website around the form. But it'll be a dead-simple site &mdash;  just a day of work.

*4 days later*

>Okay, great! The service has a website.
>
>...but I don't have documentation to explain what all the fields mean. I'll add that real quick.

*2 days later*

>Now, I have so many pages that my navigation bar overflows on mobile devices.
>
>I'll make my navigation bar responsive. I'm sure that will only take an hour with my web framework, Angular.

[*8 days later...*](https://twitter.com/deliberatecoder/status/1011358706108456960)

And on and on.

It was a hydra. Every time I finished adding "one more simple thing," I discovered two more things that were necessary as a result.

Eventually, two months had gone by since I declared code complete, and I was baffled that I hadn't shipped anything.

# This is critical, but it can wait

I needed to launch.

However, I still had an incomplete list of critical tasks. I estimated that they would take five days to complete.

Then, a funny thing happened. Once I decided that my goal was to ship as soon as possible, I realized there was a difference between "critical to have" and "critical for launch."

One example was my [Terms of Use](https://zestfuldata.com/terms-of-service). What would happen if I launched without it and wrote it a few days later? At worst, I'd have a weak position in the event of a legal dispute, but what were the odds of someone suing me within a few days of launch?

# Shut up and launch

I revisited my task list and treated everything with the same ruthless skepticism as my Terms of Use. For each work item, I asked myself, "What would happen if I launched without this?"

With this strategy, I sped through my "five-day" task list and launched the following day. I [published my service to RapidAPI](https://rapidapi.com/zestfuldata/api/Recipe%20and%20Ingredient%20Analysis), an API marketplace.

{% assign fig_caption = "[Zestful listing](https://rapidapi.com/zestfuldata/api/Recipe%20and%20Ingredient%20Analysis) on the RapidAPI marketplace" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="rapidapi-listing.png" alt="Screenshot of RapidAPI listing" fig_caption=fig_caption max_width="800px" img_link=true class="img-border" %}

 Now was the moment of truth. My service was ready to accept payment from real customers. I just needed to convince them to buy it.

# Did I delay my launch to avoid rejection?

While I was in my two-month limbo between "done" and "launched," a friend asked me if I was afraid to show my product to customers. Were all these tasks I was thinking up just a way to avoid the possibility of rejection?

The thought had occurred to me, but I quickly dismissed it. I used to work in sales, cold calling customers and hearing "no" 40 times a day. I wasn't afraid of rejection.

On launch day, I sat down to write my first cold pitch: an email to a recipe app developer who didn't know me. I had to explain why they should integrate my ingredient service into their app.

For half an hour, I stared at the blank screen, struggling to write anything. I had explained my service to friends dozens of times, but this was different. Each time I began describing the benefits of my service, I imagined the customer's responses:

>Why is that worth what you're charging?

>How does that increase my profits?

>Why do I need you?

Uh oh. I *was* afraid of rejection.

# A different type of rejection

This wasn't at all like when I worked in sales. In that job, I was selling fiber Internet. But I didn't lay the fiber or design the network. It was easy to take rejection in stride.

Now, I was selling something I created. What's more, I was selling *software* that I created.  Writing software is so tightly tied to my identity. It's the skill that I'm most proud of and what I believe I do best.

{% include image.html file="rejection.jpg" alt="Fear of rejection cartoon" max_width="800px" img_link=true %}

If I showed my product to a customer, they might think, "This isn't very good. You're trying to sell it, so you must think it's good. Therefore, **you** are not very good."

# The harsh reality

After dozens of sales attempts and zero purchases, it dawned on me that I had become the developer who invested months into a product that customers didn't want.

Some businesses could use a service like mine, but the ones who needed it most had already rolled their own. The rest agreed that it was a neat service but couldn't justify the expense, even though the service only cost $20/month.

And that's where I discovered the fatal flaw in my strategy. The most significant cost for my customers wasn't my monthly fee, but rather the cost of modifying their app to integrate my service.

On top of that, they had to weigh the cost of an additional external dependency. What happens if my service has an outage? Does their app stop working? Or do they need to build a whole secondary mode of operation for when my service fails?

# I did it backward

Looking back, I realize that I did everything backward. I cold-pitched to customers as the last step, but I should have done it before writing a line of code.

Early on, I rationalized my decision to build the product first. I told myself that customers could say yes to the idea but then never buy the product. I wanted "yes" to be a real sale, where the customer agrees by purchasing the service.

While I stand by that logic, I failed to consider the value of "no." If the customer rejects the product at the concept stage, they're not going to change their mind after I build it. If *everyone* says no, it's probably a dead end.

---

*Edited by [Samantha Mason](https://www.samanthamasonfreelancer.com). Illustrations by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*