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

I've heard dozens of stories of software founders paying the price for shipping too late. They spend months or years developing a product in a vacuum only to see it crumble miserably the first time a real user touches it.

The [Indie Hackers podcast](https://www.indiehackers.com/podcast) features many such stories. The show's stated mission is to learn from the mistakes of small startup founders, but host Courtland Allen frequently expresses existential angst about whether this is even possible:

>...there are things you can tell people over and over again until you’re blue in the face, and they still won’t listen to you or really understand what you’re saying until they go out and discover what you mean the hard way by making their own mistakes
>
>-Courtland Allen, [*Indie Hackers Podcast*](https://www.indiehackers.com/podcast/049-josh-kaufman-of-the-personal-mba)

I always thought, "No, Courtland. That sounds inefficient. I'll take the free lessons and not make the costly mistakes, thank you."

From the title of this post, you've probably figured out that my plan didn't quite work.

# The idea

The idea for this project was a spinoff from an earlier project, KetoHub. KetoHub allows users to search for recipes for the keto diet by their ingredients. It does this by scraping keto cooking blogs.

I initially solved this with simple rules. For example, "Ignore units of measurement." I soon discovered that recipe ingredients can be formatted in so many different ways that the rules get out of control. *The New York Times* had written about successfully parsing ingredients using machine learning, so I decided to try that.

I felt like that could be the business. If I wanted this, others would too.

# The MVP that wasn't

The minimum viable product (MVP) is a common thing in the lean startup world. Build the smallest possible product that you can show to customers, then continue building based on feedback from customers willing to pay. One of the most common stories of shipping too late is *not* building an MVP and instead investing months or years of effort into.

But I *did* build an MVP. I hired a freelancer and together we got basic ingredient parsing working with about 80 hours of combined development time. I defined an acceptance criteria, which said the point that we'd be done and ready to show the product to customers.

{% include image.html file="acceptance-criteria.png" alt="Acceptance criteria document" fig_caption="Ingredient parser acceptance criteria" max_width="300px" img_link=true class="img-border" %}

We accomplished all of the goals of the acceptance criteria in early May. But I didn't officially "launch" (as in, begin accepting payments) until July. Instead, I spent the next six weeks writing more code.

# It's okay because it's *sales* coding

The best way to understand how I wrote code for two months after I was "done" is to peek inside my thought process during that time:

*Day 1: Acceptance criteria is accomplished*

>The service works, but customers can only try it out by writing complex expressions on the command line. How can I subject my customers to the indignity of writing `curl` commands in the age of Web 3.1?
>
>I have to create a simple HTML frontend so that users can just interact with it in the browser.

*5 days later*

>The basic HTML form works, but it's strange to have this orphaned HTML form without any surrounding context to explain what it is. I need to build a website around this. But it'll be simple, like just a day of work.

*4 days later*

>Okay, great! The service has its own website.
>
>Oh, but I don't have documentation to explain what all the fields mean. I'll add that real quick.

*2 days later*

>Now I have so many pages that my navigation bar doesn't display correctly on mobile devices. I need to make my navigation bar responsive. But that's such a basic thing. I'm sure that will only take me about an hour with Angular.

[*8 days later*](https://twitter.com/deliberatecoder/status/1011358706108456960)

>Uh oh! What if everyone just uses my free demo server instead of paying me? I need to add logic to limit each user to 30 requests per day.

And on and on.

Every time I thought I just needed one more simple thing, it added new complexity and forced me to add something else to support it.

And then it was two months later and I was baffled at how I hadn't shipped anything so long after I had declared code complete.

# Breaking the cycle

I used to write monthly updates

I decided to write a summary of my progress on Zestful and I realized

Part of the benefit of writing, especially on the Internet where people can be eager to find fault, is that it forces you to [justify what you say](https://medium.learningbyshipping.com/writing-is-thinking-an-annotated-twitter-thread-2a75fe07fade).

>Writing is thinking. To write well is to think clearly. That's why it's so hard.
>
>-David McCullough

When I wrote the forum post, I tried to pre-emptively answer the obvious question, "Why haven't you launched yet?" I couldn't answer it.

All signs were telling me it was time to launch, but until I sat down to write out my thinking, I never had to confront it.

# Shut up and launch

A strange thing happened once I decided that launching was my top priority.

I estimated that it would take me about five days to complete all the tasks necessary for launch. The next day, I launched.

I published my service to RapidAPI, the web's largest API marketplace, and I was ready to accept payments from customers.

{% assign fig_caption = "[Zestful listing](https://rapidapi.com/zestfuldata/api/Recipe%20and%20Ingredient%20Analysis) on the RapidAPI marketplace" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="rapidapi-listing.png" alt="Screenshot of RapidAPI listing" fig_caption=fig_caption max_width="800px" img_link=true class="img-border" %}

# This is critical, but it can wait

When I recognized my goal was "ship ASAP," many of the tasks that seemed necessary turned out to be things I could do post-launch.

One example was my [terms of use](https://zestfuldata.com/terms-of-service) document. I knew I needed to have one, but what would happen if I launched without it? I'd perhaps be in poor position in the event of a legal dispute, what were the odds of me being sued within a few days of launch? The service handled recipe ingredients, so it wasn't a domain where I'd expect high-stakes lawsuits.

I launched my service with no explicit terms of service, then added them a few days later. It worked out fine; I garnered no lawsuits before or after.

# The difference between "no" and rejection

While I was in my two months of limbo between being "done" and being "launched," a friend asked me if I was perhaps finding excuses to delay the launch because subconsciously I feared rejection. The thought had occurred to me, but I wrote it off. I worked for six months as a salesman, where I heard "no" 50 times per day. I became numb to it, so why would I fear it now?

When I sat down to write my first cold email to a potential customer, I realized I *was* scared. It wasn't at all like when I was a salesman. I was selling my own product rather than something I was hired by someone else to sell. I wasn't afraid of hearing "no," but I was afraid of the customer thinking, "Is that the best you can do?" Because I want to say, "If you think the website looks stupid, it's just because it's a prototype and it will look better once you give me money and justify the product's existence!" But that's not something I imagine customers are excited to read.

Writing software is so tied up with my identity. It's the skill that I'm most proud of and that I do best.

TODO(mtlynch): insert cartoon about rejection.

# When *should* I have launched?

Looking back, I think I should have launched once the service met my acceptance criteria.

The Zestful website is nice in that it offers a low-friction way for users to test out the functionality, but RapidAPI already kind of has that functionality. RapidAPI's version is not as user-friendly because it just shows the user a tree of data they have to click through, but my target customers are developers, and they understand how to do this, even if they'd recognize that it's inconvenient.


{% assign fig_caption = "[Zestful's custom demo](https://zestfuldata.com/demo) (left) vs. [RapidAPI's generic demo interface](https://rapidapi.com/zestfuldata/api/Recipe%20and%20Ingredient%20Analysis) (right)" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="zestful-vs-rapidapi.png" alt="Comparison of Zestful website vs. RapidAPI interface" fig_caption=fig_caption max_width="800px" img_link=true class="img-border" %}

The other big difference is the amount of friction to test it out. On the Zestful website, users can test out ingredients with no sign-up whatsoever. With RapidAPI, customers have to register an account and enter a credit card before they can even even test out my service. I think the low-friction path is better, but I can't discount the fact that RapidAPI's solution filters out users who aren't serious about becoming paying customers.

# Lessons learned

One of the biggest lessons was apparently that I can't learn from other people's mistakes. According to this, you'll read these and think you're learning something, but you'll make the same mistakes. So when you make the same mistakes, try to act surprised.

**What I learned**

* When you define the MVP, define up front all the steps needed to begin accepting payment from customers.
  * Otherwise, it creates a loophole where pre-launch tasks can continue forever as long as they're not really part of "the product."
* Rejection is scarier when you're selling your own creation.
* A task can simultaneously be critical and permissable to defer to post-launch.
* Re-evaluate your strategy regularly, in writing.
  * Write down what you did and what you'll do next.
  * Show it to someone who is willing to challenge your assumptions and conclusions.