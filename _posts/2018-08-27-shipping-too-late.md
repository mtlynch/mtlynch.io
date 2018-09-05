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

I've heard dozens of stories of software founders failing for a single reason: they shipped too late. They spent months or years developing a product in a vacuum only to watch it crumble miserably the first time a real customer touches it.

The [Indie Hackers podcast](https://www.indiehackers.com/podcast) features many such stories. The show's stated mission is to help listeners learn from the mistakes of startup founders, but host Courtland Allen frequently expresses existential angst about whether this is even possible:

>...there are things you can tell people over and over again until you’re blue in the face, and they still won’t listen to you or really understand what you’re saying until they go out and discover what you mean the hard way by making their own mistakes
>
>-Courtland Allen, [*Indie Hackers Podcast*](https://www.indiehackers.com/podcast/049-josh-kaufman-of-the-personal-mba)

I always thought, "No, Courtland. That sounds inefficient. I'll take the free lessons and not make the costly mistakes, thank you."

From the title of this post, you've probably figured out that my plan didn't work.

# The idea

The idea for this project was a spinoff from one of my earlier projects, a recipe aggregator called [KetoHub](https://ketohub.io/). It allows users to search recipes by ingredient.

To make this possible, KetoHub had to reduce ingredients to their essential words for search matching. For example, KetoHub reduced an ingredient such as "½ cup shredded mozzarella cheese" to simply "mozzarella cheese." My thinking was that if a user typed "cup," they expect to see results like "cupcakes" or "pudding cups" instead of every recipe that contains a "cup" of any ingredient.

I initially solved this with regular expressions, but that quickly [grew unmanageable](/resurrecting-1/#what-business-was-it-of-mine). I realized I could instead solve this with machine learning. If I needed something like this, others probably did too, so maybe that could be a business.

Thus, the idea for [Zestful](https://zestfuldata.com/), my ingredient-parsing service, was born.

# The MVP that wasn't

In the lean startup world, people frequently talk about the "MVP," the minimum viable product. The MVP is the smallest possible product that you can show to customers to demonstrate your idea. You're supposed to build it as soon as possible, get it into potential customers' hands, and judge from their reaction whether your idea is viable.

One of the most common stories of failure is of the founder so confident in their idea that they neglect to build an MVP and instead invest years into a full-fledged product that nobody wants.

But I *did* build an MVP. I even defined the acceptance criteria up front to prevent myself from trying to improve the service's accuracy forever. I decided that my MVP would be ready to show customers once it gave correct answers for a few common ingredient formats and achieved at least 80% accuracy on a random set of 200 ingredients from the web.

{% include image.html file="acceptance-criteria.png" alt="Acceptance criteria document" fig_caption="Ingredient parser acceptance criteria" max_width="300px" img_link=true class="img-border" %}

After about 80 hours of development work, Zestful satisfied the acceptance criteria. But I didn't officially "launch" (as in, begin accepting payments) for another two months. Instead, I spent that time writing more code.

# It's okay because it's *sales* coding

The best way for me to explain how I continued writing code for two months after I was "done" is to share my thought process:

*Day 1: Acceptance criteria is accomplished*

>The service works! But customers can only use it if they write complex expressions on the command line...
>
>How can I subject my customers to the indignity of writing `curl` commands in the age of Web 3.1? I have to create a simple HTML frontend so that customers can test it right from the browser.

*5 days later*

>The basic frontend works, but it's strange to have this orphaned HTML form sitting there without any explanation.
>
>I need to build a website around the form that explains what it is. But it'll be a dead-simple site, like just a day of work.

*4 days later*

>Okay, great! The service has its own website.
>
>...but I don't have documentation to explain what all the fields mean. I'll add that real quick.

*2 days later*

>Now I have so many pages that my navigation bar doesn't display correctly on mobile devices.
>
>I need to make my navigation bar responsive. I'm sure that will only take me about an hour with my web framework, Angular.

[*8 days later*](https://twitter.com/deliberatecoder/status/1011358706108456960)

>The site looks weird without a logo. I'd better hire someone to make a simple logo.

And on and on.

Every time I thought I just needed one more simple thing, it increased complexity and forced me to add something else to support it.

Finally, it was two months later, and I was baffled that I hadn't shipped anything despite declaring code complete so long ago.

# Breaking the cycle

I decided to write a summary of my progress on Zestful and I realized

Part of the benefit of writing, especially on the Internet, where people can be eager to find fault, is that it forces you to [justify what you say](https://medium.learningbyshipping.com/writing-is-thinking-an-annotated-twitter-thread-2a75fe07fade). This defensive writing also forces you to organize your thoughts.

>Writing is thinking. To write well is to think clearly. That's why it's so hard.
>
>-David McCullough

When I wrote the forum post, I tried to pre-emptively answer the obvious question, "Why haven't you launched yet?" I couldn't answer it.

All signs were telling me it was time to launch, but until I sat down to write out my thinking, I never had to confront it.

# This is critical, but it can wait

I knew that launching was my top priority, and I had a list of tasks I needed to complete in order to ship. I estimated that I could launch in five days at the earliest.

Then, a funny thing happened. Once I decided that my goal was "ship ASAP," many of the tasks that seemed necessary turned out to be things I could do post-launch. For each task, I asked myself whether it was absolutely critical for launch. I realized that I had several items that were "critical," but would be okay if I completed them a day or two after launch.

One example was my [terms of use](https://zestfuldata.com/terms-of-service) document. I knew I needed to have one, but what would happen if I launched without it? I'd perhaps be in poor position in the event of a legal dispute, but what were the odds of someone suing me within a few days of launch? Nobody would die or lose millions of dollars if my service misbehaved. I couldn't imagine a situation where the stakes would be high enough for someone to bother suing me.

# Shut up and launch

I revisited my task list and treated everything with the same ruthless skepticism as my terms of use document. For each task, I asked myself, "What would happen if I launched without this?"

With this strategy, my five-day task shrunk to a single day. The next day, I officially launched. I published my service to RapidAPI, the web's largest API marketplace and began accepting payment from customers.

{% assign fig_caption = "[Zestful listing](https://rapidapi.com/zestfuldata/api/Recipe%20and%20Ingredient%20Analysis) on the RapidAPI marketplace" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="rapidapi-listing.png" alt="Screenshot of RapidAPI listing" fig_caption=fig_caption max_width="800px" img_link=true class="img-border" %}

# Stalling to avoid rejection

While I was in my two months of limbo between "done" and "launched," a friend asked me if I was stalling subconsciously. "Do you think you're putting off the launch because it's scary to show the product to people?"

The thought had occurred to me, but I quickly dismissed it. I used to work in sales, cold calling customers and hearing "no" 40 times per day. I wasn't afraid of rejection. If I learned anything from that job, it was to not take "no" personally and remain persistent.

The day I launched, I sat down to write my first cold pitch: an email to a recipe app developer I'd never spoken with before. I had to explain in a short email to a stranger how it would benefit their app to integrate with my ingredient parsing service.

For half an hour, I stared at the blank email struggling to write anything. I had explained my service dozens of times in casual conversaions, but none of those explanations seemed appropriate in this case. Every time I thought of a line to write, I imagined the customer replying, "Why is that worth what you're charging? How would my business make more money if I used this?" I froze up.

Uh oh. I *was* afraid of rejection.

# A different type of rejection

This wasn't at all like when I worked in sales. In that job, I was selling fiber internet to businesses. It was very easy to let rejection roll off my back because I wasn't at all responsible for the product.

Now, I was selling something I created. What's more, I was selling *software* that I created.  Writing software is so tied up with my identity. It's the skill that I'm most proud of and that I do best.

{% include image.html file="rejection.jpg" alt="Fear of rejection cartoon" max_width="800px" img_link=true %}

If I sent my product to a customer, then they might think, "This isn't very good. You're trying to sell it, so you must think it's good. Therefore, you are not very good."

# I did it backwards

Looking back, I realized that I did the whole thing backwards. I cold pitched to customers as a last step, but it really should have been my first step before writing a line of code.

There are certain products where you do need something to show customers. If I was building my own accounting software, I'd need something to show customers to explain why my accounting software is better. But an ingredient parser is pretty easy to explain. "It takes a raw string that looks like X and turns it into structured data that looks like Y."

I had considered this but talked myself out of it by rationalizing that customers could say yes to the idea but then never buy the product. And that's true. The sale isn't real until the customer hands over their credit card. But I didn't consider the useful information I'd gain from the opposite case.

It's easy for a customer to agree to the idea in theory, but then never buy the product. The reverse is unlikely. If the customer said no at the concept stage, they're probably not going to change their mind and buy it once it's been built.

# Lessons learned

**Define the full path to launch**

I made the mistake of defining only a piece of my initial product, then continuing to spin my wheels for months on tasks on top of it because I didn't consider them "officially" part of the MVP.

The MVP should include all tasks until the point where customers can pay for the product, including sales and marketing tasks.

**Selling your own product is scarier than selling someone else's**

Sales experience isn't a substitute for the experience of selling something you created.

**Writing is thinking**

I stopped spinning my wheels after I wrote out my thoughts and showed it to an audience that I expected to challenge my thinking. Writing is difficult but is immensely valuable at organizing thoughts.

**Be skeptical of a theoretical yes, but give heed to a theoretical no**

If customers say they'd buy your product before you create it, it's a weakly positive sign, but don't bank on it until they've actually given you money. If customers say they *wouldn't* buy your product, it's likely they will continue being disinterested after you create it.