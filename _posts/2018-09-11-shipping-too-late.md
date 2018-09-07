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
---

Many software founders fail for a simple reason: they ship too late. They spend years developing a product in a vacuum only to watch it crumble miserably the first time a real customer touches it.

The [Indie Hackers podcast](https://www.indiehackers.com/podcast) features many such stories. The show's stated mission is to help listeners learn from the mistakes of startup founders, but host Courtland Allen frequently expresses existential angst about whether this is even possible:

>...there are things you can tell people over and over again until you’re blue in the face, and they still won’t listen to you or really understand what you’re saying until they go out and discover what you mean the hard way by making their own mistakes.
>
>-Courtland Allen, [*Indie Hackers Podcast*](https://www.indiehackers.com/podcast/049-josh-kaufman-of-the-personal-mba)

I always thought, "No, Courtland. That sounds inefficient. I'll take the free lessons and *not* make the costly mistakes, thank you."

From the title of this post, you've probably figured out that my plan didn't work.

# The product idea

My product idea came from my earlier project, [KetoHub](https://ketohub.io/), which allows users to search keto recipes by ingredient.

To support this functionality, KetoHub reduces ingredients to their essential words for search matching. For example, an ingredient such as "½ cup mozzarella cheese, shredded" simplifies to "mozzarella cheese." That way, if a user begins typing "cup..." they see matches for recipes related to "cupcakes" rather than any recipe that includes a "cup" of some ingredient.

I initially solved this with regular expressions, but that quickly [grew unmanageable](/resurrecting-1/#what-business-was-it-of-mine). I discovered a way to achieve better results with machine learning, but it would require a substantial up-front investment.

If I needed something like this, others probably did too. Maybe ingredient parsing could be its own business. Thus, the idea for [Zestful](https://zestfuldata.com/), my ingredient-parsing service, was born.

TODO: Logo for Zestful

# The MVP that wasn't

In the lean startup world, people frequently talk about the "MVP," the minimum viable product. The MVP is the smallest possible product that demonstrates your idea. You're supposed to build it as soon as possible, get it into potential customers' hands, and judge from their reaction whether your idea is viable.

One of the most common stories of failure is of the founder so confident in their idea that they neglect to build an MVP and instead invest years into a full-fledged product that nobody wants.

With Zestful,  I *did* build an MVP. I even defined the acceptance criteria up-front to prevent myself from disappearing down a rabbit hole after I got the product working. I committed to show my service to customers once it gave correct results for a few common ingredient formats and achieved at least 80% accuracy on a random set of 200 ingredients from the web.

{% include image.html file="acceptance-criteria.png" alt="Acceptance criteria document" fig_caption="Ingredient parser acceptance criteria" max_width="300px" img_link=true class="img-border" %}

After about 120 hours of development work, Zestful satisfied my acceptance criteria.

Nevertheless, I didn't officially launch for another two months. Instead, I spent that time writing more code.

# It's okay because it's *sales* coding

You might be wondering how I ended up writing code for so long after my MVP was "done." Well, here's a summary of my thought process throughout those two months:

*Day 1: Acceptance criteria is accomplished*

>The service works! But customers can only use it if they write complex expressions on the command line...
>
>How can I subject my customers to the indignity of writing `curl` commands in the age of Web 3.1? I have to create a simple HTML frontend so that customers can test it right from the browser.

*5 days later*

>The basic frontend works, but it's strange to have this orphaned HTML form sitting there without any explanation.
>
>I need to build a website around the form to explain it. But it'll be a dead-simple site, like just a day of work.

*4 days later*

>Okay, great! The service has its own website.
>
>...but I don't have documentation to explain what all the fields mean. I'll add that real quick.

*2 days later*

>Now I have so many pages that my navigation bar doesn't display correctly on mobile devices.
>
>I'll make my navigation bar responsive. I'm sure that will only take an hour with my web framework, Angular.

[*8 days later...*](https://twitter.com/deliberatecoder/status/1011358706108456960)

And on and on.

It was a hydra. Every time I finished adding "one more simple thing," I realized I needed three more things to support it.

Eventually, two months had gone by since I declared code complete, and I was baffled that I hadn't shipped anything.

# This is critical, but it can wait

I needed to launch.

But I still had a list of critical tasks to complete. I estimated that they would take a minimum of five days to complete.

Then, a funny thing happened. Once I decided that my goal was to ship as soon as possible, I realized that I had several items that were "critical," but would be okay if I completed them a day or two after launch.

One example was my [terms of use](https://zestfuldata.com/terms-of-service) document. What would happen if I launched without it? I'd be in poor position in the event of a legal dispute, but what were the odds of someone suing me within a few days of launch?

# Shut up and launch

I revisited my task list and treated everything with the same ruthless skepticism as my terms of use document. For each task, I asked myself, "What would happen if I launched without this?"

With this strategy, I sped through my "five-day" task list and launched the following day. I [published my service to RapidAPI](https://rapidapi.com/zestfuldata/api/Recipe%20and%20Ingredient%20Analysis), an API marketplace. My service was ready to accept payment from real customers.

{% assign fig_caption = "[Zestful listing](https://rapidapi.com/zestfuldata/api/Recipe%20and%20Ingredient%20Analysis) on the RapidAPI marketplace" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="rapidapi-listing.png" alt="Screenshot of RapidAPI listing" fig_caption=fig_caption max_width="800px" img_link=true class="img-border" %}

# Did I delay launch to avoid rejection?

While I was in my two-month limbo between "done" and "launched," a friend asked me if I was stalling subconsciously because I was afraid to show my product to customers.

The thought had occurred to me, but I quickly dismissed it. I used to work in sales, cold calling customers and hearing "no" 40 times a day. I wasn't afraid of rejection. If I learned anything from that job, it was to let "no" roll off my back.

The day I launched, I sat down to write my first cold pitch: an email to a recipe app developer who didn't know me. I had to explain why their app should integrate with my ingredient service.

For half an hour, I stared at the blank screen struggling to write anything. I had explained my service to friends dozens of times, but this was different. Every time I wrote down a benefit of my service, I imagined the customer's responses:

>Why is that worth what you're charging?

>How does that increase my profits?

>Why do I need you?

Uh oh. I *was* afraid of rejection.

# A different type of rejection

This wasn't at all like when I worked in sales. In that job, I was selling fiber Internet, but I didn't lay the fiber or design the network. It was easy to take rejection in stride.

Now, I was selling something I created. What's more, I was selling *software* that I created.  Writing software is so tightly tied to my identity. It's the skill that I'm most proud of and what I believe I do best.

{% include image.html file="rejection.jpg" alt="Fear of rejection cartoon" max_width="800px" img_link=true %}

If I showed my product to a customer, they might think, "This isn't very good. You're trying to sell it, so you must think it's good. Therefore, **you** are not very good."

# The harsh reality

After dozens of sales attempts and zero purchases, it began to dawn on me that I was the developer who invested months into a product that customers didn't really want.

There were businesses that could use a service like mine. The ones who really needed it had already rolled their own solution. The rest agreed that it was a neat service but couldn't justify the cost, even though I only charged $20/month.

And that's where I discovered the fatal flaw in my strategy. The largest cost for my customers wasn't my monthly fee, but rather the cost of modifying their app to integrate my service.

On top of that, they have to weigh the cost of an additional external dependency. What happens if my service has an outage? Does their app simply stop working? Or do they need to build a whole secondary mode of operation for when my service fails?

# I did it backwards

Looking back, I realize that I did the whole thing backwards. I cold-pitched to customers as a last step, but I should have done it before writing a line of code.

Early on, I rationalized my decision to build the product first. I told myself that customers could say yes to the idea but then never buy the product. I wanted "yes" to be a real sale, where the customer agrees by purchasing the service.

While I still agree with that logic, I failed to consider the value of hearing "no." If the customer rejects the product at the concept stage, they're not going to change their mind after I build it. If everyone says no, it's not worth building.

# Lessons learned

**Define the full path to launch**

The MVP should include everything needed for customers to buy the product, including sales and marketing tasks.

**Selling your own product is scarier than selling someone else's**

Experience as a sales employee isn't a substitute for the experience of selling something you created.

**Be skeptical of a theoretical yes. Pay heed to a theoretical no**

If customers say they'd buy your product before you create it, it's a weakly positive sign, but don't bank on it until they've actually given you money. If customers say they *wouldn't* buy your product, that's a strong negative sign.

*Edited by [Samantha Mason](https://www.samanthamasonfreelancer.com). Illustrations by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*