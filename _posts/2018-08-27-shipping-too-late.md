---
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
title: How I Tricked Myself into Shipping Too Late
---

I listen to a lot of the Indie Hackers podcast. Founders repeatedly repeat this mantra of ship something and start charging money for it as soon as possible. Something Courtland frequently says is that you can't teach people not to make mistakes because no matter what you tell them, they just have to make their own mistakes anyway. I had a really good shortcut. I was going to *not* do that. I'd just learn my lessons from other people's mistakes.

# I'm an exception

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

It's hard to say whether the frictionless trial eve helps. It is good to give users an opportunity to see how it works instantly, but there's also value in getting

# The virtue of writing

What finally broke my spell was writing about the project on Indie Hackers. I was writing a monthly update and trying to justify why I hadn't launched yet, and I realized I really couldn't justify it. It was clear that I should just stop polishing the website and focus on launching ASAP.

At the time I made the decision, I still felt like it would take me a few days to launch. But once I started working toward shipping ASAP, I realized how many tasks in my head weren't actually critical for launch. From the time of my writing it to launching was only a day.