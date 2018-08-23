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

A common mantra in software is to ship as soon as possible.

I'm a big fan of the Indie Hackers podcast. One thing the host, Courtland Allen, has lamented frequently is that you can't teach people things. No matter how much you tell them the right thing to do, they won't learn until they make their own mistakes.

I always thought, "Well, that's silly. I just *won't* do that." How hard could it be to learn from other people's mistakes?

Turns out, harder than I thought.

# The idea

The idea for this project was a spinoff from an earlier project, KetoHub. KetoHub allows users to search for recipes for the keto diet by their ingredients. It does this by scraping keto cooking blogs.

I initially solved this with simple rules. For example, "Ignore units of measurement." I soon discovered that recipe ingredients can be formatted in so many different ways that the rules get out of control. *The New York Times* had written about successfully parsing ingredients using machine learning, so I decided to try that.

I felt like that could be the business. If I wanted this, others would too.

# The MVP that wasn't

The minimum viable product (MVP) is a common thing in the lean startup world. Build the smallest possible product that you can show to customers, then continue building based on feedback from customers willing to pay. One of the most common stories of shipping too late is *not* building an MVP and instead investing months or years of effort into.

But I *did* build an MVP. I hired a freelancer and together we got basic ingredient parsing working with about 80 hours of combined development time. I defined an acceptance criteria, which said the point that we'd be done and ready to show the product to customers.

{% include image.html file="acceptance-criteria.png" alt="Acceptance criteria document" fig_caption="Ingredient parser acceptance criteria" max_width="250px" img_link=true class="img-border align-right" %}

We accomplished all of the goals of the acceptance criteria in early May. But I didn't officially "launch" (as in, begin accepting payments) until July. Instead, I spent the next six weeks writing more code.

# It's okay because it's *sales* coding

To understand why I kept on writing, I'll walk you through my thought process for those six weeks.

>The service works, but customers can only interact with it by writing complex expressions on the command line? How can I subject my customers to the indignity of writing `curl` commands in the age of Web 3.1? I have to create a simple HTML frontend so that users can just interact with it in the browser.

*5 days later*

>The basic HTML form works, but it looks weird because there's nothing else on the page that explains what this is. I need to build a website around this. But it'll be simple, like just a day of work.

*4 days later*

>Okay, I have the website. Oh, but I don't have documentation to explain what all the fields mean. I'll add that.

*2 days later*

>Now I have so many pages that my navigation bar doesn't display correctly on mobile devices. I need to make my navigation bar responsive. But that's such a basic thing. I'm sure that will only take me about an hour with Angular. (TODO: link to twitter thread)

*8 days later*

>Oh, wait. If I show people this demo, what stops everyone from using my demo server for their production work and never paying me? I need to build a rate limiter so that users can only parse 30 ingredients per day.

And it just continued like that.

Every time I thought I just needed "one more simple thing" before I launched, that simple thing added complexity, forcing me to add another thing. And then whatever I added to support the original thing led to its own extra things.

And then I was baffled at how I hadn't shipped anything when I had declared code complete two months earlier.

# Shut up and launch

I used to write monthly updates

What finally broke my spell was writing about the project on Indie Hackers, a forum for founders bootstrapped software startups. I used to write monthly updates about my projects, but I'd fallen out of the habit. I decided to write a summary of my progress on Zestful and I realized .

Part of the benefit of writing, especially on the Internet where people can be eager to find fault, is that it forces you to provide justification and explanations for what you say (TODO: link to sinofsky thing on writing). When I wrote this update explaining why I hadn't yet launched, I realized that I couldn't provide reasonable justifications for it. I was trying to pre-answer the obvious question, "Why haven't you launched yet?" and I realized that I couldn't. All signs were telling me it was time to launch, but until I sat down to write out my thinking, I never had to confront it.

I ended the update by saying that I would launch ASAP. At the time I made the decision, I still felt like it would take me a few days to launch. But once I started working toward shipping ASAP, I realized how many tasks in my head weren't actually critical for launch.

Within a day of realizing that shipping was my top priority, I had shipped. I published my service to RapidAPI, an API marketplace and began accepting payment for using it.

# This is critical, but it can wait

When I recognized my goal was "ship ASAP," many of the tasks that seemed necessary turned out to be things I could do post-launch.

One example was my [terms of use](https://zestfuldata.com/terms-of-service) document. I knew I needed to have one, but what would happen if I launched without it? In the event of a legal dispute, perhaps I'd be in poor position, but how likely was it for a customer to take legal action against me within days of launch? I launched my service with no explicit terms of service, then added them a few days later. It worked out fine; I garnered no lawsuits before or after.

# The difference between "no" and rejection

While I was in my six months of limbo between being "done" and being "launched," a friend asked me if I was perhaps finding excuses to delay the launch because subconsciously I feared rejection. The thought had occurred to me, but I wrote it off. I worked for six months as a salesman, where I heard "no" 50 times per day. I became numb to it, so why would I fear it now?

When I sat down to write my first cold email to a potential customer, I realized I *was* scared. It wasn't at all like when I was a salesman. I was selling my own product rather than something I was hired by someone else to sell. I wasn't afraid of hearing "no," but I was afraid of the customer thinking, "Is that the best you can do?" Because I want to say, "If you think the website looks stupid, it's just because it's a prototype and it will look better once you give me money and justify the product's existence!" But that's not something I imagine customers are excited to read.

TODO(mtlynch): insert cartoon about rejection.

When I explained what my product did to friends, it was easy to be hand wavey about the details. "It's useful for cooking apps because it makes search better. If users enter a search query, they don't want to ever match on 'tablespoon.'" Writing an email to a recipe app developer, I had to come up with a compelling reason why using my product is going to be worth not only the cost I'm charging them, but the nontrivial dev time. My tablespoon example, but what could a customer possibly type where they'd get an incorrect match on tablespoon?

# When *should* I have launched?

Looking back, I think I should have launched once the service met my acceptance criteria.

The Zestful website is nice in that it offers a low-friction way for users to test out the functionality, but RapidAPI already kind of has that functionality. RapidAPI's version is not as user-friendly because it just shows the user a tree of data they have to click through, but my target customers are developers, and they understand how to do this, even if they'd recognize that it's inconvenient.

The other big difference is the amount of friction to test it out. On the Zestful website, users can test out ingredients with no sign-up whatsoever. With RapidAPI, customers have to create an account and enter a credit card to even test out my service. I think the low-friction path is better overall, but RapidAPI's solution does have the benefit of filtering out users who aren't serious about becoming paying customers.

# Lessons learned

One of the biggest lessons was apparently that I can't learn from other people's mistakes. According to this, you'll read these and think you're learning something, but you'll make the same mistakes. So when you make the same mistakes, try to act surprised.

I think I did, in fact, learn from people's mistakes. I just didn't learn how to apply it perfectly to my situation, but I also did successfully avoid pitfalls.

**What I did right**

* Using an API marketplace instead of rolling my own billing solution
  * It was tempting to build a system for accepting payments
* Defining acceptance criteria up front
  * Without this, it would have been easy to spin my wheels forever trying to increase accuracy or handle more edge cases.

**What I learned**

* When you define the MVP, define up front all the steps needed to begin accepting payment from customers.
  * Otherwise, it creates a loophole where pre-launch tasks can continue forever as long as they're not really part of "the product."
* Rejection is scarier when you're selling your own creation.
* Re-evaluate your strategy regularly, in writing.
  * Write down what you did and what you'll do next.
  * Show it to someone who is willing to challenge your assumptions and conclusions.