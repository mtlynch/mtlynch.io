---
title: "Paternity Leave: Month 1"
date: 2024-09-03T09:00:43-04:00
description: TODO - One-line summary
images:
  - /retrospectives/2024/09/baby-photo.webp
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

In August, my wife and I became parents with the birth of our son.

I took a photo of the three of us shortly after the birth. We're trying to be protective of our son's privacy, so I ran the photo through a hand-tuned Fast Fourier transform to remove identifying biometric details:

{{<img src="baby-photo.webp" has-border="true" max-width="450px" caption="Photo of me, my wife, and our child soon after birth, post-processed with a privacy-preserving photo filter">}}

Why do people take such long parental leaves? Do babies really require 24/7 active attention from both parents?

So, they don't. Babies only need things for like a cumulative two hours per day. The problem is that those two hours come in unpredictable spurts throughout the day.

## Making NixOS + Framework 13 AMD 7040 my daily driver

A few months ago, I purchased the Framework 13 AMD 7040 laptop.

I've exclusively used Microsoft Surface tablets for my laptop needs for the past 10+ years, but I've finally gotten fed up enough with the direction Windows is taking that I'm preparing my complete exit from the ecosystem. So, I searched for a while for a laptop that treated Linux as a first-class citizen, and I settled on Framework.

I resisted Framework for a while because the idea of building my own laptop sounded tedious to me, which is strange because I enjoy building desktops and servers. But the experience of building my Framework laptop was surprisingly the best unboxing experience I've ever had with any technology. Building my laptop was incredibly easy. Most of the laptop is pre-assembled, so my part took less than 30 minutes, and the build instructions were outstanding. I experienced an "[IKEA effect"](https://en.wikipedia.org/wiki/IKEA_effect) where I feel more satisfied with my laptop from having assembled it myself.

{{<gallery caption="The Framework 13 surprised me in having one of the best unboxing experiences I've had with any technology.">}}
{{<img src="framework-unboxing-1.webp" max-width="550px">}}
{{<img src="framework-unboxing-2.webp" max-width="210px">}}
{{</gallery>}}

I installed NixOS on my Framework, which has been working well, but it's also a challenge. I'm still a NixOS beginner, so it takes me a long time to make simple changes, like figuring out how to get the clock to display in AM/PM instead of 24-hour time.

Setting up the laptop has become an unexpectedly nice paternity leave project. First, instead of spending most of my time in my office, I'm in my living room with my family most of the day. When I use my computer, it's my laptop, so I have extra motivation to get NixOS working well.

I also just keep a list of things I want to get working on NixOS that I haven't yet figured out. And those quests are usually things that are friendly to interruptions, because it's a lot of searching for answers and trial and error.

## What should I do with my Hacker News course?

Before my baby's birth, I taught [my Hacker News course](https://hitthefrontpage.com) live each week to a pilot group of students. The students liked the material on writing and finding places to share your blog posts, but they [didn't care that much about Hacker News in particular](/retrospectives/2024/07/#should-i-pivot-away-from-hacker-news).

At the time, I felt like it was a sign to focus less on Hacker News, but I didn't have time to make such a large change with mere weeks before my son would be born. But now my son is born, and I've only recorded about 20% of the material for the course, and I'm wondering whether to keep going or take this opportunity to restructure the course.

The short-term problem is that it's hard for me to record videos right now. I found it hard before, but now I have a baby who might need my attention at any moment. But my wife and I are still finding our grooves as parents, and our routines are continuing to evolve. We might end up in a place where each of us have a few hours a day of solo time, and I'd be able to record then.

In the meantime, I might try circling back to _Refactoring English_. Longtime readers may recognize that as the title of a developer-oriented ebook about effective writing that I [promised to write in 2021](/solo-developer-year-3/#publish-six-blog-posts-and-one-book). But then my business swallowed all of my time, and the book has been sitting on hold since then.

For now, here's a teaser from [my Hacker News course](https://hitthefrontpage.com). It's about why I think it's worth investing more effort in each article than most bloggers do.

<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/273218/f04d4f68-e5da-4886-a0f6-a3bedc62c399?autoplay=true&loop=false&muted=false&preload=true&responsive=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>

## Wrap up

### What got done?

- Welcomed the birth of my son.
- Recorded 10 chapters of my course and edited 9 of them.

### Lessons learned

-

### Goals for next month

- Enjoy family time.

### Requests for help

There are a few NixOS quests I haven't yet been able to complete. If you know how to complete these, let me know:

- TPM+PIN unlock: There are a lot of tutorials for TPM-only unlock, but I'd like to protect the unlock process with a TPM PIN, which is how I run Windows laptops with BitLocker.
- Stop gnome from asking if I have a headset: There's a [longstanding bug](https://gitlab.gnome.org/GNOME/libgnome-volume-control/-/issues/14) in Gnome that it can't distinguish between headphones or a headset, so it asks every time. I'd like to find the right NixOS incantation to tell it to assume headphones.
- Configure Syncthing remote folders through NixOS: The [NixOS wiki for Syncthing](https://nixos.wiki/wiki/Syncthing) is pretty good, but one thing I can't figure out is how to programmatically accept folders from peer devices. I can do it through the web GUI
