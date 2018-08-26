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

I've heard dozens of stories of software founders paying the price for shipping too late. They spend months or years developing a product in a vacuum only to watch it crumble miserably the first time a real customer touches it.

The [Indie Hackers podcast](https://www.indiehackers.com/podcast) features many such stories. The show's stated mission is to learn from the mistakes of small startup founders, but host Courtland Allen frequently expresses existential angst about whether this is even possible:

>...there are things you can tell people over and over again until you’re blue in the face, and they still won’t listen to you or really understand what you’re saying until they go out and discover what you mean the hard way by making their own mistakes
>
>-Courtland Allen, [*Indie Hackers Podcast*](https://www.indiehackers.com/podcast/049-josh-kaufman-of-the-personal-mba)

I always thought, "No, Courtland. That sounds inefficient. I'll take the free lessons and not make the costly mistakes, thank you."

From the title of this post, you've probably figured out that my plan didn't work.

# The idea

The idea for this project was a spinoff from one of my earlier projects, a recipe aggregator called [KetoHub](https://ketohub.io/). It allows users to search recipes by ingredient.

To make this possible, KetoHub had to reduce ingredients to their essential words for search matching. For example, KetoHub reduced an ingredient such as "½ cup shredded mozzarella cheese" to simply "mozzarella cheese." My thinking was that if a user typed "cup," they expect to see results like "cupcakes" or "pudding cups" instead of every recipe that contains a "cup" of any ingredient.

I initially solved this with regular expressions, but that quickly [grew unsustainable](/resurrecting-1/#what-business-was-it-of-mine). I realized I could instead solve this with machine learning. If I needed something like this, others probably did too, so maybe that could be a business.

Thus, the idea for [Zestful](https://zestfuldata.com/), the ingredient-parsing service, was born.

# The MVP that wasn't

In the lean startup world, people frequently talk about the "MVP," the minimum viable product. The MVP is the smallest possible product that you can show to customers to demonstrate your idea. You're supposed to build it as soon as possible, get it into potential customers' hands, and their reaction should tell you if your idea is viable.

One of the most common stories of failure is of the founder so confident in their idea that they neglect to build an MVP and instead invest years into a fully-featured product that nobody wants.

But I *did* build an MVP. I even defined the acceptance criteria up front to prevent myself from trying to improve the service's accuracy forever. I decided that my MVP would be ready to show customers once it gave correct answers for a few common ingredient formats and achieved at least 80% accuracy on a set of 200 ingredients from the web that it had never seen before.

{% include image.html file="acceptance-criteria.png" alt="Acceptance criteria document" fig_caption="Ingredient parser acceptance criteria" max_width="300px" img_link=true class="img-border" %}

I got Zestful to satisfy the acceptance criteria in early May, after about 80 hours of development work. But I didn't officially "launch" (as in, begin accepting payments) until July. Instead, I spent another two months writing code.

# It's okay because it's *sales* coding

The best way for me to explain how I continued writing code for two months after I was "done" is to share my thought process:

*Day 1: Acceptance criteria is accomplished*

>The service works! But customers can only use it if they write complex expressions on the command line...
>
>How can I subject my customers to the indignity of writing `curl` commands in the age of Web 3.1? I have to create a simple HTML frontend so that customers can test it right from the browser.

*5 days later*

>The basic frontend works, but it's strange to have this orphaned HTML form sitting there without any explanation. I need to build a website around the form that explains what it is. But it'll be a dead-simple site, like just a day of work.

*4 days later*

>Okay, great! The service has its own website.
>
>...but I don't have documentation to explain what all the fields mean. I'll add that real quick.

*2 days later*

>Now I have so many pages that my navigation bar doesn't display correctly on mobile devices.
>
>I need to make my navigation bar responsive. I'm sure that will only take me about an hour with Angular, my web framework.

[*8 days later*](https://twitter.com/deliberatecoder/status/1011358706108456960)

>The site looks weird without a logo. I'll hire someone to make a simple logo.

And on and on.

Every time I thought I just needed one more simple thing, it added new complexity and forced me to add something else to support it.

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

Then, a funny thing happened. Once I decided that my goal was "ship ASAP," many of the tasks that seemed necessary turned out to be things I could do post-launch.

When I made the decision to launch, I estimated that those tasks would take five days. But then I revisited them with the mindset of "ship ASAP." For each task, I asked myself whether it was absolutely critical for launch. I realized that I had several items that were "critical," but would be okay if I completed them a day or two after launch.

One example was my [terms of use](https://zestfuldata.com/terms-of-service) document. I knew I needed to have one, but what would happen if I launched without it? I'd perhaps be in poor position in the event of a legal dispute, what were the odds of me being sued within a few days of launch? The service handled recipe ingredients, so I couldn't imagine a situation where the stakes would be high enough that it would be worth someone's time to sue me.

# Shut up and launch

When I decided to launch, I estimated that I had about five days of critical tasks left to complete. Then, I revisited my task list and treated everything with the same ruthless skepticism as I had with my terms of use document. For each task, I asked myself, "What would happen if I launched without this?"

With this strategy, I completed my five-day task list in just a day. The next day, I published my service to RapidAPI, the web's largest API marketplace and began accepting payment from customers.

{% assign fig_caption = "[Zestful listing](https://rapidapi.com/zestfuldata/api/Recipe%20and%20Ingredient%20Analysis) on the RapidAPI marketplace" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="rapidapi-listing.png" alt="Screenshot of RapidAPI listing" fig_caption=fig_caption max_width="800px" img_link=true class="img-border" %}

# Stalling to avoid rejection

While I was in my two months of limbo between "done" and "launched," a friend asked me if I was stalling subconsciously. "Do you think you're putting off the launch because it's scary to show the product to people?"

The thought had occurred to me, but I quickly dismissed it. I used to work in sales, cold calling customers and hearing "no" 40 times per day. I wasn't afraid of rejection. If I learned anything from that job, it was to not take "no" personally and remain persistent.

Besides, I was already talking to customers. Prior to launch, I wrote about the project [on this blog](/since-quitting/#new-project-ingredient-parsing-as-a-service) and on Twitter. Why would I do that if I was afraid of showing off my work?

The day I launched, I sat down to write my first cold pitch: an email to a recipe app developer I'd never spoken with before telling them about my service and making the case that they should integrate it into their app.

I sat staring at a blank email for half an hour struggling to think of what to write. I had explained what my service did dozens of times at this point, but none of those explanations seemed appropriate in this case. Every time I thought of a line to write, I imagined the customer replying, "Why is that worth what you're charging?" and froze up.

Uh oh. This *was* scary.

# A different type of rejection

I thought I was already talking to customers, but everyone I was talking to were people who were already warm to me. They were people who were already interested in my work from the blog or Twitter and were interested enough to reach out to me.

Reaching out to customers was really where the rubber met the road. If my service doesn't clearly increase their profits, it's not useful.


When I sat down to write my first cold email to a potential customer, I realized I *was* scared. It wasn't at all like when I was a salesman. I was selling my own product rather than something I was hired by someone else to sell. I wasn't afraid of hearing "no," but I was afraid of the customer thinking, "Is that the best you can do?" Because I want to say, "If you think the website looks stupid, it's just because it's a prototype and it will look better once you give me money and justify the product's existence!" But that's not something I imagine customers are excited to read.

{% include image.html file="rejection.jpg" alt="Fear of rejection cartoon" max_width="800px" img_link=true %}

Writing software is so tied up with my identity. It's the skill that I'm most proud of and that I do best.


# When *should* I have launched?

Looking back, I think I should have launched once the service met my acceptance criteria.

The Zestful website is nice in that it offers a low-friction way for users to test out the functionality, but RapidAPI already kind of has that functionality. RapidAPI's version is not as user-friendly because it just shows the user a tree of data they have to click through, but my target customers are developers, and they understand how to do this, even if they'd recognize that it's inconvenient.


{% assign fig_caption = "[Zestful's custom demo](https://zestfuldata.com/demo) (left) vs. [RapidAPI's generic demo interface](https://rapidapi.com/zestfuldata/api/Recipe%20and%20Ingredient%20Analysis) (right)" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="zestful-vs-rapidapi.png" alt="Comparison of Zestful website vs. RapidAPI interface" fig_caption=fig_caption max_width="800px" img_link=true class="img-border" %}

The other big difference is the amount of friction to test it out. On the Zestful website, users can test out ingredients with no sign-up whatsoever. With RapidAPI, customers have to register an account and enter a credit card before they can even even test out my service. I think the low-friction path is better, but I can't discount the fact that RapidAPI's solution filters out users who aren't serious about becoming paying customers.

# Lessons learned

One of the biggest lessons was apparently that I can't learn from other people's mistakes. According to this, you'll read these and think you're learning something, but you'll make the same mistakes. So when you make the same mistakes, try to act surprised.

* When you define the MVP, define up front all the steps needed to begin accepting payment from customers.
  * Otherwise, it creates a loophole where pre-launch tasks can continue forever as long as they're not really part of "the product."
* Rejection is scarier when you're selling your own creation.
* A task can simultaneously be critical and permissable to defer to post-launch.
* Re-evaluate your strategy regularly, in writing.
  * Write down what you did and what you'll do next.
  * Show it to someone who is willing to challenge your assumptions and conclusions.