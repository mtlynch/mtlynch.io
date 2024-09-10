---
title: "Paternity Leave: Month 1"
date: 2024-09-11T00:00:00-04:00
description: TODO - One-line summary
images:
  - /retrospectives/2024/09/baby-photo.webp
---

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Finish recording my course

- **Result**: Baby arrived too early, and I didn't finish.
- **Grade**: N/A

TODO

### Begin selling my course

- **Result**: Baby arrived too early, and I didn't get to this.
- **Grade**: N/A

TODO

## We had a baby

In August, my wife and I became parents with the birth of our son.

I took a photo of the three of us shortly after the birth. We're trying to be protective of our son's privacy, so I ran the photo through a hand-tuned Fast Fourier transform to remove identifying biometric details:

{{<img src="baby-photo.webp" has-border="true" max-width="450px" caption="Photo of me, my wife, and our child soon after birth, post-processed with a privacy-preserving photo filter">}}

One of the things I wondered about before the baby arrived was how much time it takes to care for a newborn. People take family leave for six months, and that seemed so long to me. I understood wanting to spend time with your baby, but before the baby can really talk or interact with you, doesn't that get old?

In terms of caring for your baby's needs, there's breastfeeding and changing diapers, so how long could that take? Three, maybe four hours per day?

I thought we'd need a few days to adjust, and then we'd be back to most of our usual activities.

But, it turns out that it actually does take a lot of time to care for a newborn in ways I didn't understand.

Like breastfeeding was something I knew would be time-consuming. We also spend a lot of time figuring out what he needs. It's very unpredictable. Diaper changes can be two minutes, or things can get out of hand and require 20 minutes of cleaning things that have been sprayed or projectile-blasted with baby-related . Sometimes he's done breastfeeding in five minutes, and sometimes he's eating for 90 minutes.

I knew breastfeeding would be time-consuming, but I also knew I was biologically exempt from that responsibility. But I didn't consider that while my wife is occupied breastfeeding, she also needs things and can't get up, so it ends up being something we both spend time on, though my responsibilities are admittedly much smaller.

We're also frequently just down a person.

But the activity that's baby-friendly is reading. I'm reading more than I ever have in my life. Because I can just read for a few minutes while he's breastfeeding, and most nights, I keep my son downstairs and read with him for a couple of hours so my wife can get some uninterrupted sleep.

## Making NixOS + Framework 13 AMD 7040 my daily driver

I've exclusively used Microsoft Surface tablets for my laptop needs for the past 10+ years, but I've finally gotten fed up enough with the direction Windows is taking that I'm preparing my complete exit from the ecosystem. So, I searched for a while for a laptop that treated Linux as a first-class citizen, and I settled on [Framework](https://frame.work).

I resisted Framework for a while because the idea of building my own laptop sounded tedious, which is strange because I enjoy building desktops and servers. But I don't enjoy working in tiny spaces or with tiny tools, and building a laptop seemed like it would be a lot of that.

The experience of building my Framework laptop was surprisingly the best unboxing experience I've ever had with anything.

Assembling my Framework was incredibly easy. I was expecting it to be like building a desktop from scratch where you're assembling the chassis, the motherboard, etc., but most of the Framework is actually pre-assembled. The user portion of the assembly only took me 30 minutes, and I was going very slowly. The build instructions were outstanding. I definitely experienced an "[IKEA effect"](https://en.wikipedia.org/wiki/IKEA_effect) where I feel more satisfied with my laptop from having assembled it myself.

{{<gallery caption="The Framework 13 surprised me in having one of the best unboxing experiences I've had with any technology.">}}
{{<img src="framework-unboxing-1.webp" max-width="550px">}}
{{<img src="framework-unboxing-2.webp" max-width="210px">}}
{{</gallery>}}

I installed NixOS on my Framework, which has been working well, but it's also a challenge. I'm still a NixOS beginner, so it takes me a long time to make simple changes, like figuring out how to get the clock to display in AM/PM instead of 24-hour time.

Setting up the laptop has become an unexpectedly nice paternity leave project. First, instead of spending most of my time in my office, I'm in my living room with my family most of the day. When I use my computer, it's my laptop, so I have extra motivation to get NixOS working well.

I also just keep a list of things I want to get working on NixOS that I haven't yet figured out. And those quests are usually things that are friendly to interruptions, because it's a lot of searching for answers and trial and error.

## What should I do with my Hacker News course?

Before my baby's birth, I taught [my Hacker News course](https://hitthefrontpage.com) live each week to a pilot group of students. The students liked the material on writing and finding places to share your blog posts, but they [didn't care that much about Hacker News in particular](/retrospectives/2024/07/#should-i-pivot-away-from-hacker-news).

At the time, I felt like it was a sign to focus less on Hacker News, but I didn't have time to make such a large change with mere weeks left to complete the course before paternity leave. But now my son is born, and I've only recorded about 20% of the material for the course, and I'm wondering whether to keep going or take this opportunity to restructure the course.

One other red flag I've noticed is that I put self-ads to my course all over my blog, and nobody is clicking them. I get about 500 visitors per day, and the ads have brought no significant change in visitors to the course website. And I have other ways of marketing the course, but I'd really like there to be large overlap between the kind of people who read my blog and the kind of people who would be interested in taking one of my courses.

Logistically, it's hard for me to record videos. I found it hard before, but now I have a baby who might need my attention at any moment. But my wife and I are still finding our grooves as parents, and our routines are continuing to evolve. We might end up in a place where each of us have a few hours a day of solo time, and I'd be able to record then.

In the meantime, the thing that's feeling more appealing is to try circling back to [_Refactoring English_](https://refactoringenglish.com). Longtime readers may recognize that as the title of a developer-oriented ebook about effective writing that I [promised to write in 2021](/solo-developer-year-3/#publish-six-blog-posts-and-one-book). But then my business swallowed all of my time, and the book has been sitting on hold since then.

My plan next month is to change my blog self-ad to be about _Refactoring English_ and see if more people visit.

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
