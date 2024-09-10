---
title: "Paternity Leave: Month 1"
date: 2024-09-11T00:00:00-04:00
description: TODO - One-line summary
images:
  - /retrospectives/2024/09/baby-photo.webp
---

## Highlights

- My wife and I became parents.
- I realized that caring for a newborn takes more time than I expected.

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

But the activity that's baby-friendly is reading. I'm reading more than I ever have in my life. Because I can just read for a few minutes while he's breastfeeding, and most nights, I keep my son downstairs and read with him for a couple of hours so my wife can get some uninterrupted sleep.

## How much time does it take to attend to a newborn?

In preparing for the baby's arrival, I planned to take two months of paternity leave. I wanted to fit in work if I had time free, but I wanted to set things up in my life so that if I ended up having zero time for anything except family care and bonding, I could ignore work for at least three months before it caused problems.

Even though I was prepared to not work, I enjoy my work and hoped I'd find time for it. And I had a hard time imagining that a baby would require _that_ much attention for three months.

I knew that newborns need breastfeeding and changing diapers, but how long could that take? Three, maybe four hours per day split between two parents? And there's also time to just enjoy being together as a new family, but I thought I could balance that with work.

As you may have guessed, caring for a newborn isn't like my normal day minus two hours. So far, it's like normal day minus 6-12 waking hours.

The most obvious change in time is sleep. Our baby sleeps well for a newborn, but that means that on a good night, he'll do four sessions of sleep between 90-180 minutes long, and he'll need nursing or diaper changes in between each session. So, it just takes longer for us to get enough sleep, and we usually need to nap during the day, too. And that's still usually less than our normal amount of sleep, so we're doing everything else more slowly because we're sleep deprived.

I thought breastfeeding would mainly impact my wife,. Until the baby arrived, I didn't realize that breastfeeding is kind of a two-person task. Because my wife is doing the heavy lifting of the breastfeeding itself, but I still need to be involved to bring her the things that she needs while she's pinned to a chair by a hungry baby.

The other thing about baby tasks is that they're unpredictable. Sometimes, our son sometimes seems satiated after a 10-minute breastfeeding session. Other times, he wants to keep nursing for 90 minutes, even when we calmly explain to him that it's 4 AM.

Similarly, an easy diaper change can happen in a few minutes. A chaotic one can take ten minutes, plus another 20 to clean and sanitize collateral damage.

## What should I do with my Hacker News course?

Before my baby's birth, I taught [my Hacker News course](https://hitthefrontpage.com) live each week to a pilot group of students. The students liked the material on writing and finding places to share your blog posts, but they [didn't care that much about Hacker News in particular](/retrospectives/2024/07/#should-i-pivot-away-from-hacker-news).

At the time, I felt like it was a sign to focus less on Hacker News, but I didn't have time to make such a large change with mere weeks left to complete the course before paternity leave. But now my son is born, and I've only recorded about 20% of the material for the course, and I'm wondering whether to keep going or take this opportunity to restructure the course.

One other red flag I've noticed is that I put self-ads to my course all over my blog, and nobody is clicking them. I get about 500 visitors per day, and the ads have brought no significant change in visitors to the course website. And I have other ways of marketing the course, but I'd really like there to be large overlap between the kind of people who read my blog and the kind of people who would be interested in taking one of my courses.

Logistically, it's hard for me to record videos. I found it hard before, but now I have a baby who might need my attention at any moment. But my wife and I are still finding our grooves as parents, and our routines are continuing to evolve. We might end up in a place where each of us have a few hours a day of solo time, and I'd be able to record then.

In the meantime, the thing that's feeling more appealing is to try circling back to [_Refactoring English_](https://refactoringenglish.com). Longtime readers may recognize that as the title of a developer-oriented ebook about effective writing that I [promised to write in 2021](/solo-developer-year-3/#publish-six-blog-posts-and-one-book). But then my business swallowed all of my time, and the book has been sitting on hold since then.

My plan next month is to change my blog self-ad to be about _Refactoring English_ and see if more people visit.

For now, here's a teaser from [my Hacker News course](https://hitthefrontpage.com). It's about why I think it's worth investing more effort in each article than most bloggers do.

<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/273218/f04d4f68-e5da-4886-a0f6-a3bedc62c399?autoplay=true&loop=false&muted=false&preload=true&responsive=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>

## Making NixOS + Framework 13 AMD 7040 my daily driver

I've exclusively used Microsoft Surface tablets for my laptop needs for the past 10+ years, but I've finally gotten fed up enough with the direction Windows is taking that I'm preparing my complete exit from the ecosystem. So, I searched for a while for a laptop that treated Linux as a first-class citizen, and I settled on [Framework](https://frame.work).

I resisted Framework for a while because the idea of building my own laptop sounded tedious, which is strange because I enjoy building desktops and servers. But I don't enjoy working in tiny spaces or with tiny tools, and building a laptop seemed like it would be a lot of that.

The experience of building my Framework laptop was surprisingly the best unboxing experience I've ever had with anything.

Assembling my Framework was incredibly easy. I was expecting it to be like building a desktop from scratch where you're assembling the chassis, the motherboard, etc., but most of the Framework is actually pre-assembled. The user portion of the assembly only took me 30 minutes, and I was going very slowly. The build instructions were outstanding. I definitely experienced an "[IKEA effect"](https://en.wikipedia.org/wiki/IKEA_effect) where I feel more satisfied with my laptop from having assembled it myself.

{{<gallery caption="The Framework 13 surprised me in having one of the best unboxing experiences I've had with any technology.">}}
{{<img src="framework-unboxing-1.webp" max-width="550px">}}
{{<img src="framework-unboxing-2.webp" max-width="210px">}}
{{</gallery>}}

I installed NixOS on my Framework, which has been satisfying but challenging.

In NixOS, all configuration happens through plaintext files. This is amazing when I want to install a program, and all I have to do is add a line to a file and run `nixos rebuild`. It's less amazing when I just want to make the system clock display in AM/PM instead of 24-hour format, and I can't find the magic incantation that controls that in NixOS.

Setting up the laptop has become an unexpectedly nice paternity leave project. First, instead of spending most of my time in my office, I'm in my living room with my family most of the day. When I use my computer, it's my laptop, so I have extra motivation to get NixOS working well.

I also just keep a list of things I want to get working on NixOS that I haven't yet figured out. And those quests are usually things that are friendly to interruptions, because it's a lot of searching for answers and trial and error.

## Wrap up

### What got done?

- Welcomed the birth of my son.
- Recorded 10 chapters of my course and edited 9 of them.
- Published [notes about a blockchain project](/notes/noah-bragg-stokefire-1/) and [why I'm confused about that particular blockchain](/notes/im-still-confused-about-base/).

### Lessons learned

-

### Goals for next month

- Enjoy family time.

### Requests for help

There are a few NixOS quests I haven't yet been able to complete. If you know how to complete these, let me know:

- TPM+PIN unlock: There are a lot of tutorials for TPM-only unlock, but I'd like to protect the unlock process with a TPM PIN, which is how I run Windows laptops with BitLocker.
- Stop gnome from asking if I have a headset: There's a [longstanding bug](https://gitlab.gnome.org/GNOME/libgnome-volume-control/-/issues/14) in Gnome that it can't distinguish between headphones or a headset, so it asks every time. I'd like to find the right NixOS incantation to tell it to assume headphones.
- Configure Syncthing remote folders through NixOS: The [NixOS wiki for Syncthing](https://nixos.wiki/wiki/Syncthing) is pretty good, but one thing I can't figure out is how to programmatically accept folders from peer devices. I can do it through the web GUI, but if I ever wipe the system, I'd have to re-do this step manually, which feels very un-Nix.
