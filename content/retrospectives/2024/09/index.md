---
title: "Paternity Leave: Month 1"
date: 2024-09-03T09:00:43-04:00
description: TODO - One-line summary
---

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Finish recording my course

- **Result**: XX
- **Grade**: N/A

TODO

### Begin selling my course

- **Result**: XX
- **Grade**: N/A

TODO

## We had a baby

In August, my wife and I had a son.

We're trying to be protective of our son's privacy, so I took a photo of the three of us shortly after the birth and ran it through a hand-tuned fast Fourier transform to preserve privacy:

Why do people take such long parental leaves? Do babies really require 24/7 active attention from both parents?

So, they don't. Babies only need things for like a cumulative two hours per day. The problem is that those two hours come in unpredictable spurts throughout the day.

## Making NixOS + Framework 13 AMD 7040 my daily driver

A few months ago, I purchased the Framework 13 AMD 7040 laptop.

I've exclusively used Microsoft Surface tablets for my laptop needs for the past 10+ years, but I've finally gotten fed up enough with the direction Windows is taking that I'm preparing my complete exit from the ecosystem. So, I searched for a while for a laptop that treated Linux as a first-class citizen, and I settled on Framework.

I resisted Framework for a while because the idea of building my own laptop sounded tedious to me, which is strange because I enjoy building desktops and servers. But the experience of building my Framework laptop was surprisingly the best unboxing experience I've ever had with any technology. Building my laptop was incredibly easy. Most of the laptop is pre-assembled, so my part took less than 30 minutes, and the build instructions were outstanding. I experienced an "[IKEA effect"](https://en.wikipedia.org/wiki/IKEA_effect) where I feel more satisfied with my laptop from having assembled it myself.

I installed NixOS on my Framework, which has been working well, but it definitely requires more work to configure everything correctly. It's also slightly hard to understand which things are hard because of Framework and which are hard because of NixOS, as both are pretty niche, especially together.

Getting It's turned out to be a good paternity leave project because I'm on my laptop

## What should I do with my Hacker News course?

Before my baby's birth, I taught [my Hacker News course](https://hitthefrontpage.com) live each week to a pilot group of students. Their feedback was that they liked the material on writing and finding places to share your blog posts, but they didn't care that much about Hacker News in particular.

At the time, I felt like that was reasonable, but I didn't have time to pivot the focus into anything else with mere weeks before my son would be born. But now my son is born, and I've only recorded about 20% of the material for the course, and I'm wondering whether to keep going or take this opportunity to refocus.

The challenge is that it's currently hard for me to record videos for the course. I found it hard to record videos without a baby who might need my attention at any moment.

So, for now, I'm going to pause the material and start working on _Refactoring English_.

For now, here's a teaser from [my Hacker News course](https://hitthefrontpage.com). It's about why I think it's worth investing more effort in each article than most bloggers do.

<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/273218/f04d4f68-e5da-4886-a0f6-a3bedc62c399?autoplay=true&loop=false&muted=false&preload=true&responsive=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>

## Wrap up

### What got done?

- Welcomed the birth of my son.

### Lessons learned

-

### Goals for next month

-

### Requests for help

There are a few NixOS quests I haven't yet been able to complete. If you know how to complete these, let me know:

- TPM+PIN unlock: There are a lot of tutorials for TPM-only unlock, but I'd like to protect the unlock process with a TPM PIN, which is how I run Windows laptops with BitLocker.
- Stop gnome from asking if I have a headset: There's a [longstanding bug](https://gitlab.gnome.org/GNOME/libgnome-volume-control/-/issues/14) in Gnome that it can't distinguish between headphones or a headset, so it asks every time. I'd like to find the right NixOS incantation to tell it to assume headphones.
- Configure Syncthing folders through NixOS
