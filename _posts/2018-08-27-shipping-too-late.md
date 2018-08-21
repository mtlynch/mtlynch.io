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

I initially solved this with simple rules. For example, "Ignore units of measurement." I soon discovered that recipe ingredients can be formatted in so many different ways that the rules get out of control. The New York Times had written about successfully parsing ingredients using machine learning, so I decided to try that.

I felt like that could be the business. If I wanted this, others would too.

# The justification

Other services existed that did the same thing, and I could see . The difference was that they either weren't very accurate or they had very demanding licensing terms that required API consumers to display the service's branding in all user interfaces associated with the API results. Also, their terms of use forbid clients from storing results for more than two hours. For a site like KetoHub, this restriction was a dealbreaker. I had to parse every ingredient in the KetoHub recipe corpus to build my search index. If I was forced to rebuild my entire search index from scratch every two hours (paying every time), I'd burn thousands of dollars per month just on ingredient parsing. And there's no reason to do it. If I parse "2 cups sugar" on Monday, I'm probably going to get the same result on Wednesday, so it makes no sense for me to keep asking the same question every two hours.

I felt like there must be other sites or apps like mine that would be willing to pay $20 per month to avoid rolling their own ingredient parsers, but didn't want the burdensome licensing terms of the competitors.

If nothing else, I could use it on KetoHub. At the time, every time I added a new site to KetoHub's index, I had to spend a few hours tediously fiddling with the ingredient parsing rules so that it could handle the new site and preserve correct behavior on the old sites.

# The justifications in hindsight

Looking back, I can see several flaws with my reasoning:

**Existing providers do the same thing and have hundreds of thousands of customers**

Existing providers offer a variety of services that *include* ingredient parsing. I have no information about how many users are consuming their ingredient parsing APIs vs. their other services. I also have no information about how many of their users are paid vs. free.

**Even if nobody buys it, it will be useful to me on KetoHub**

This is true, but it ignores the important context that KetoHub was still at zero revenue and had minimal users. It assumed KetoHub was *worth* investing more effort into, and further, that ingredient parsing was the area that required the most investment. Both of these assumptions were probably untrue.

# The MVP that wasn't

The minimum viable product (MVP) is a common.

I hired a freelancer and together we got basic ingredient parsing working with about 80 hours of combined dev time. It looked like this:

TODO: Screenshot of acceptance criteria

https://docs.google.com/document/d/1GJB2whfpdYlWMkZaFeSU6zZHHwdHWKaKE_B41Mdx_TY/edit

I accomplished this on May 17th, 2018. But I didn't officially "launch" (as in, accept payment) for the next six weeks. Instead, I spent the next six weeks writing more code.

# It's okay because it's *sales* coding

I had the API working at a basic level. It looked like this:

But it's so *ugly*! How can I make my customers suffer the indignity of writing `curl` commands? I have to create a simple HTML front end API so that users can just interact with it in the browser.

*5 days later*

Okay, I have a basic HTML form, but now it looks weird that there's nothing else that explains what this is. I need to build a website around this. But it'll be simple, like just a day of work.

*3 days later*

Okay, I have the website. Oh, but I don't have documentation that explains what all the fields mean. I'll add that.

*2 days later*

Now I have so many pages that my navigation bar doesn't display correctly on mobile devices. I need to make my navigation bar responsive. But that's such a basic thing. I'm sure that will only take me about an hour with Angular.

*8 days later*

Oh, wait. If I had a demo server, what stops someone from using my demo server for their production work and never paying me? I need to build a rate limiter so that users can only parse 30 ingredients per day.

*3 days later*

I did define. I wrote out the API interface and I 



So I thought,

# But I'm the exception

Well for a normal web app, that makes sense, but I'm making an API. The API interface is much less flexible than a web app. I'm asking customers to write code that depends on my interface. If I change the interface and break their code, they will be very unhappy.

There were ways around this, but I didn't want to do them. I could have a versioned API. There were alternatives, but I didn't like them. I could add versioning to the API so that if I had to change the API interface, I'd leave the old interface up and run the new interface in parallel.

Part of this was just laziness. I didn't want to maintain two versions of the same thing. Partly this was out of laziness/pickiness because that's a boring thing to do. Partly, this was out of for stability. If I'm running a deprecated version alongside a current version, it increases complexity and increases the chances for me to make a mistake that messes something up.

# If you give a mouse a cookie

I have the API, but I should have an HTML frontend that makes it easier to use
But if I have an HTML frontend, I really need a website around it to explain what it is
And if I have a website, I need to roll my own rate-limiting mechanism to prevent users from using the demo version for production purposes
And then I need to figure out how to make the website responsive
And then I need to figure out how to make a navbar in Angular, because that's surprisingly hard

By the time I got everything done, it was a month later. Looking back at what I would have had if I just started with RapidAPI's tools, I should have done that. It's not as good, but it's also not worth a month of development effort and an extra month of delay.

I didn't like the fact that other APIs required you to submit a credit card to even see how well the API worked. I wanted users to have a low-friction way to test out my API.

It's hard to say whether the frictionless trial eve helps. It is good to give users an opportunity to see how it works instantly, but there's also value in getting.

# Yes is meaningless but no is not

# The virtue of writing

What finally broke my spell was writing about the project on Indie Hackers. I was writing a monthly update and trying to justify why I hadn't launched yet, and I realized I really couldn't justify it. It was clear that I should just stop polishing the website and focus on launching ASAP.

At the time I made the decision, I still felt like it would take me a few days to launch. But once I started working toward shipping ASAP, I realized how many tasks in my head weren't actually critical for launch. From the time of my writing it to launching was only a day.

# Lessons learned

One of the biggest lessons was apparently that I can't learn from other people's mistakes. According to this, you'll read these and think you're learning something, but you'll make the same mistakes. So try to act surprised.

* Talk to potential customers before building. Take "yes" with a grain of salt, but take "no" seriously.
* Explicitly define the MVP up front and 
* Re-evaluate your strategy. Write down what you did and what you'll do next. Show it to someone who is willing to challenge your assumptions and conclusions.