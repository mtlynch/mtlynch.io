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

# The idea

The idea for this project was a spinoff from an earlier project, KetoHub. KetoHub allows users to search for recipes for the keto diet by their ingredients. It does this by scraping keto cooking blogs.

I initially solved this with simple rules. For example, "Ignore units of measurement." I soon discovered that recipe ingredients can be formatted in so many different ways that the rules get out of control. *The New York Times* had written about successfully parsing ingredients using machine learning, so I decided to try that.

I felt like that could be the business. If I wanted this, others would too.

# The MVP that wasn't

The minimum viable product (MVP) is a common thing in the lean startup world. Build the smallest possible product that you can show to customers, then continue building based on feedback from customers willing to pay. One of the most common stories of shipping too late is *not* building an MVP and instead investing months or years of effort into.

But I *did* build an MVP. I hired a freelancer and together we got basic ingredient parsing working with about 80 hours of combined dev time. I defined an acceptance criteria, which said the point that we'd be done and ready to show the product to customers:

TODO: Screenshot of acceptance criteria

https://docs.google.com/document/d/1GJB2whfpdYlWMkZaFeSU6zZHHwdHWKaKE_B41Mdx_TY/edit

We accomplished all of the goals of the acceptance criteria on May 17th, 2018. But I didn't officially "launch" (as in, accept payment) for the next six weeks. Instead, I spent the next six weeks writing more code.

# It's okay because it's *sales* coding

To understand why I kept on writing, I'll walk you through my thought process for those six weeks.

I had the API working at a basic level. It looked like this:

>How can I subject my customers to the indignity of writing `curl` commands? I have to create a simple HTML front end API so that users can just interact with it in the browser.

*5 days later*

>The basic HTML form works, but it looks weird because there's nothing else on the page that explains what this is. I need to build a website around this. But it'll be simple, like just a day of work.

*4 days later*

>Okay, I have the website. Oh, but I don't have documentation to explain what all the fields mean. I'll add that.

*2 days later*

>Now I have so many pages that my navigation bar doesn't display correctly on mobile devices. I need to make my navigation bar responsive. But that's such a basic thing. I'm sure that will only take me about an hour with Angular.

*8 days later*

>Oh, wait. If I show people this demo, what stops everyone from using my demo server for their production work and never paying me? I need to build a rate limiter so that users can only parse 30 ingredients per day.

And it just continued like that for six weeks. Every time I thought I just needed one more simple thing before I launched, that simple thing added complexity, forcing me to add another thing. And then whatever I added to support the original thing led to its own extra things. Until it was six weeks later and I was baffled at how I hadn't shipped anything when I had declared code complete a month and a half ago.

# But I'm the exception

The other thing that delayed my launch was my belief that what I was building was somewhat special, so the normal rules didn't apply. The mantra of "launch and iterate" makes sense for a web app or mobile app, but my product was an API (application programming interface), not an app.

In other words, I was selling customers the ability to send me an ingredient, formatted like this:

```javascript
{
  "ingredients": [
    "2 tablespoons butter"
  ]
}
```

Then my API would respond with a result, formatted like this:

```javascript
{
  "results": [
    {
      "ingredientRaw": "2 tablespoons butter",
      "ingredientParsed": {
        "quantity": 2.0,
        "unit": "tablespoon",
        "product": "butter",
        "preparationNotes": null
      },
      "error": null
    }
}
```

Well for a normal web app, that makes sense, but I'm making an API. The API interface is much less flexible than a web app. I'm asking customers to write code that depends on my interface. If I change the interface and break their code, they will be very unhappy.

There were ways around this, but I didn't want to do them. I could have a versioned API. There were alternatives, but I didn't like them. I could add versioning to the API so that if I had to change the API interface, I'd leave the old interface up and run the new interface in parallel.

Part of this was just laziness. I didn't want to maintain two versions of the same thing. Partly this was out of laziness/pickiness because that's a boring thing to do. Partly, this was out of for stability. If I'm running a deprecated version alongside a current version, it increases complexity and increases the chances for me to make a mistake that messes something up.

# How writing broke the spell

What finally broke my spell was writing about the project on Indie Hackers, a forum for founders bootstrapped software startups. I used to write monthly updates about my projects, but I'd fallen out of the habit. I decided to write a summary of my progress on Zestful and I realized .

Part of the benefit of writing, especially on the Internet where people can be eager to find fault, is that it forces you to provide justification and explanations for what you say. When I wrote this update explaining why I hadn't yet launched, I realized that I couldn't provide reasonable justifications for it. I was trying to pre-answer the obvious question, "Why haven't you launched yet?" and I realized that I couldn't. All signs were telling me it was time to launch, but until I sat down to write out my thinking, I never had to confront it.

I ended the update by saying that I would launch ASAP. At the time I made the decision, I still felt like it would take me a few days to launch. But once I started working toward shipping ASAP, I realized how many tasks in my head weren't actually critical for launch. From the time of my writing it to launching was only a day.

It turned out that when I defined my goal as "ship ASAP" a lot of tasks that seemed necessary then fell away.

# I'm not scared of rejection, just of people saying no

While I was in my six months of limbo between being "done" and being "launched," a friend asked me if I was perhaps finding excuses to delay the launch because subconsciously I feared rejection. The thought had occurred to me, but I wrote it off. I worked for six months as a salesman, where I heard "no" 50 times per day. I became numb to it, so why would I fear it now?

When I sat down to write my first cold email to a potential customer, I realized I *was* scared. It wasn't at all like when I was a salesman. I was selling my own product rather than something I was hired by someone else to sell. I wasn't afraid of hearing "no," but I was afraid of the customer thinking, "Is that the best you can do?" Because I want to say, "If you think the website looks stupid, it's just because it's a prototype and it will look better once you give me money and justify the product's existence!" But that's not something I imagine customers are excited to read.

# When should I have launched?

Looking back, I think I should have launched once I had a working MVP. My website is nice in that it offers a low-friction way for users to test out the functionality, but RapidAPI already kind of has that functionality. With RapidAPI, customers have to enter a credit card to even test out my service, but it's possible that's actually a positive. It filters out people who had no interest in ever paying for the service.

# Lessons learned

One of the biggest lessons was apparently that I can't learn from other people's mistakes. According to this, you'll read these and think you're learning something, but you'll make the same mistakes. So when you make the same mistakes, try to act surprised.

* When you define the MVP, include everything you'll need to get to the point of asking for customers to pay
* Blogging about a product is not the same as cold approaching potential customers. The former is useful, but the latter is necessary.
* Re-evaluate your strategy. Write down what you did and what you'll do next. Show it to someone who is willing to challenge your assumptions and conclusions.