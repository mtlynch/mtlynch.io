---
title: How I Tricked Myself into Shipping Too Late
tags:
- zestful
- mvp
- startups
description: I've heard dozens of stories of founders failing because they shipped
  too late. It seemed like an easy fate to avoid until I made the same mistake.
discuss_urls:
  reddit: https://redd.it/9eyaq1
  hacker_news: https://news.ycombinator.com/item?id=17960274
  indie_hackers: https://www.indiehackers.com/forum/how-i-tricked-myself-into-shipping-too-late-ae24d5e356
date: '2018-09-11'
images:
- shipping-too-late/rejection.jpg
---

Many software founders fail for a simple reason: they ship too late. They spend years developing a product in a vacuum only to see it crumble the first time a real customer touches it.

The [Indie Hackers podcast](https://www.indiehackers.com/podcast) features many such stories. The show's stated mission is to help listeners learn from the mistakes of startup founders, but host Courtland Allen frequently expresses existential angst about whether this is even possible:

>...there are things you can tell people over and over again until you’re blue in the face, and they still won’t listen to you or really understand what you’re saying until they go out and discover what you mean the hard way by making their own mistakes.
>
>-Courtland Allen, [*Indie Hackers Podcast*](https://www.indiehackers.com/podcast/049-josh-kaufman-of-the-personal-mba)

I always thought, "No, Courtland. That sounds inefficient. I'll take the free lessons and *not* make the costly mistakes, thank you."

From the title of this post, you probably figured out that my plan didn't work.

## The product idea

The idea came to me while I was staring at the ugliest code I had ever written. It was in a [recipe search tool](https://ketohub.io) I created last year. That app never took off but was fun to work on occasionally. There was one corner of the codebase that always plagued me: ingredient parsing.

Given a string such as `"2 cups finely chopped red onions"`, the app had to figure out that `2` was the quantity, `cups` was the unit of measure, and so on:

{{< img src="parse-example.png" alt="Visualization of ingredient parse result" caption="Breaking an ingredient into its component parts" maxWidth="600px" hasBorder="True" >}}

Parsing was simple at first but grew more fragile and complex as new edge cases arose. Over time, the logic eroded into a maddening labyrinth of regular expressions &mdash; instructions for processing text that are both powerful and famously difficult to read.

{{< img src="regex.png" alt="Screenshot of regex implementation" caption="Excerpt from my regular expression code" maxWidth="450px" hasBorder="True" >}}

It was tempting to scrap everything in favor of a machine learning solution, but that would be an enormous undertaking. I couldn't invest months of development into a minor feature on a website that made no money.

Then, it struck me: what if ingredient parsing *was* the business? If this was a problem for me, then surely other developers struggled with it as well. Hopefully, some of them made money and would give some of said money to me if I solved their problem. Thus, the idea was born for [Zestful](https://zestfuldata.com/), my ingredient-parsing service.

{{< img src="zestful-logo.png" alt="Zestful logo" caption="[Zestful](https://zestfuldata.com/), a recipe ingredient parsing service" maxWidth="500px" hasBorder="True" linkUrl="https://zestfuldata.com/" >}}

## The MVP that wasn't

In the lean startup world, people frequently talk about the "MVP," the minimum viable product. The MVP is the simplest version of an idea. You're supposed to build it as soon as possible, put it into potential customers' hands, and judge from their reaction whether it solves a real problem.

One of the most familiar stories of failure is of the founder so confident in their idea that they neglect to build an MVP. Instead, they invest months or years into a full-fledged product that nobody wants.

With Zestful,  I *did* build an MVP. I even defined the acceptance criteria up-front to prevent myself from disappearing down a rabbit hole of endless tweaks and improvements.

{{< img src="acceptance-criteria.png" alt="Acceptance criteria document" caption="Ingredient parser acceptance criteria" maxWidth="300px" hasBorder="True" >}}

After about 120 hours of development work, my working prototype satisfied the acceptance criteria.

However, I didn't officially launch for another two months. Instead, I spent that time writing more code.

## It's okay because it's *sales* coding

You might be wondering how I ended up spinning my wheels for so long after my MVP was "done." Well, here's a summary of my thought process throughout those two months:

*Day 1: Acceptance criteria is accomplished*

>The service works! But customers can only use it if they write complex expressions on the command line.
>
>How can I subject my customers to the indignity of writing `curl` commands in the age of Web 3.1? Adding a simple HTML frontend would allow my customers to test the service directly from the browser.

*5 days later*

>The basic frontend works, but it's strange to have this orphaned HTML form sitting there without any explanation.
>
>I need to build a website around the form. But it'll be a dead-simple site &mdash;  just a day of work.

*4 days later*

>Okay, great! The service has a website.
>
>...but the site doesn't have a documentation page explaining each field. I can knock that out this afternoon.

*2 days later*

>Now, there are so many pages that my navigation bar overflows on mobile devices.
>
>I'll make my navigation bar responsive. Surely, that will only take an hour with my web framework, Angular.

[*8 days later...*](https://twitter.com/deliberatecoder/status/1011358706108456960)

It was a hydra. Every time I finished adding "one more simple thing," two more things popped up that were necessary as a result. Eventually, two months had passed since declaring code complete, and I was baffled that I hadn't shipped anything.

## This is critical, but it can wait

I **needed** to launch. However, my list of critical tasks was still incomplete. I estimated that they would take five days to finish.

Then, a funny thing happened. After committing to ship as soon as possible, I realized there was a difference between "critical to have" and "critical for launch."

One example was my [Terms of Use](https://zestfuldata.com/terms-of-service). What would happen if I launched without it and wrote it a few days later? At worst, I'd have a weak position if a legal dispute arose, but what were the odds of someone suing me within a few days of launch?

## Shut up and launch

For each item on my task list, I asked myself, "What happens if I launch without this?" After treating each task with the same ruthless skepticism as my Terms of Use, my true launch checklist emerged. Less than 24 hours later, I [published Zestful to RapidAPI](https://rapidapi.com/zestfuldata/api/recipe-and-ingredient-analysis), an API marketplace. My service was live!

{{< img src="rapidapi-listing.png" alt="Screenshot of RapidAPI listing" caption="[Zestful listing](https://rapidapi.com/zestfuldata/api/recipe-and-ingredient-analysis) on the RapidAPI marketplace" maxWidth="800px" hasBorder="True" >}}

 Now was the moment of truth. My service was ready to accept payment from real customers. I just needed to convince them to buy it.

## Did I delay my launch to avoid rejection?

During my two-month limbo between "done" and "launched," a friend asked if I was afraid to show my product to customers. Were all these tasks delaying my launch just a way of avoiding rejection?

The thought had occurred to me, but I quickly dismissed it. I used to work in sales, cold-calling customers and hearing "no" 40 times a day. Rejection didn't scare me.

On launch day, I sat down to write my first cold pitch: an email to a recipe app developer who didn't know me. I had to explain why they should integrate my ingredient service into their app.

For half an hour, I stared at the blank screen, struggling to write anything. I had explained my service to friends dozens of times, but this was different. Each time a potential selling point occurred to me, I imagined the customer's harsh rebuttals:

>Why is that worth the price you're charging?
>
>How does that increase my profits?
>
>Why do I need you?

Uh oh. I *was* afraid of rejection.

## A different type of rejection

This wasn't at all like working in sales. That job required me to sell fiber Internet to businesses, but I didn't lay the fiber or design the network. It was easy to take that rejection in stride.

Now, I was selling something I created. What's more, it was *software* I created. Writing software is such a strong part of my identity. There's nothing else I do better or take more pride in. If I showed my product to a customer, they might think, “This isn’t very good. You’re trying to sell it, so you must think it’s good. Therefore, **you** are not very good.”

{{< img src="rejection.jpg" alt="Fear of rejection cartoon" maxWidth="800px" >}}

## The harsh reality

After dozens of pitches, a few conversations, and zero purchases, it dawned on me that I had become the developer who invested months into a product that customers didn't want.

Some businesses could use a service like mine, but the ones who needed it most had already rolled their own. The rest agreed that it was a neat service but couldn't justify the expense, even though the service only cost $20/month.

And that's where I discovered the fatal flaw in my strategy. The most significant cost for my customers wasn't my monthly fee, but rather the cost of modifying their app to integrate my service.

On top of that, they had to weigh the cost of an additional external dependency. What happens if my service has an outage? Does their app stop working? Or, do they need to build an entire secondary mode of operation for when my service fails?

## I did it backward

Looking back, my process was backward. Cold-pitching to customers was my last step, but I should have done it before writing a line of code.

Early on, I rationalized my decision to build the product first. Customers could say yes to the idea but then never buy the product. I wanted "yes" to be a real sale, where the customer agreed by purchasing the service.

While that logic still feels valid, I failed to consider the value of "no." If the customer rejects the product at the concept stage, they're not going to change their mind after I build it. If *everyone* says no, it's probably a dead end.

---

*Edited by [Samantha Mason](https://www.samanthamasonfreelancer.com). Illustrations by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*
