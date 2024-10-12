---
title: "Paternity Leave: Month 2"
date: 2024-10-08T09:59:39-04:00
description: Doing nothing is hard
---

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Enjoy family time

- **Result**: XX
- **Grade**: XX

TODO

## It's okay not to work

I have to keep reminding myself that it's okay to take a break from work. And it's surprising because I never thought of myself as a workaholic or someone who needs to work all the time.

I find myself getting anxious when how little I've gotten done work-wise in the last three months. I keep feeling like, "What if this is the new normal? What if I have to make a living on this schedule?"

But those feelings are irrational. Tons of people have kids and manage to work regular hours, so I think I'll be able to comfortably move back to that in the next few months.

The feelings are even more irrational because most of the time I'm not working is still just time I'm choosing to spend on other things. It'd be one thing if I was like, "Oh no! Just feeding and diaper changes take all day!" But most of the time I'm not working, it's because we decided to walk to a restaurant 30 minutes away and have a leisurely meal or we're spending the afternoon taking our son to visit his grandmother.

## Refining our newborn sleep strategy

Originally, my wife was in charge of feedings and I was in charge of diaper changes. But it meant that we both had to get up every 60-90 minutes.

We've switched to a strategy of shifts, so I do the first shift from around 9 PM to 2 AM, and then my wife takes over at his first post-2 AM wakeup.

We also got better results when we took sleep hygiene seriously. So all the things that they tell adults to do normally - dim lights, avoid screens, no loud sound. We noticed a big difference in our son's sleep when we skipped TV and just read instead before bedtime, so we're trying to do that.

## Nix is a surprisingly good tool for fuzz testing

About ten yars ago, I was a security consultant and used fuzz testing (TODO: link) to [find a serious vulnerability in VLC](https://www.nccgroup.com/us/research-blog/fuzzing-rtsp-to-discover-an-exploitable-vulnerability-in-vlc/).

The tooling around fuzz testing has gotten significantly better in the last decade, so I've been curious to try out the latest state of the art.

I found Antonio Morales' [Fuzzing 101 series](https://github.com/antonio-morales/Fuzzing101). It's from 2021, and I get the sense that AFL++ is no longer the top fuzzing tool, but I started the first tutorial for fuzz testing xpdf. I modified the steps to targe the latest version of xpdf, and I found a new out of bounds memory read bug, which was cool!

It turned out that someone else had [discovered the same vulnerability](https://forum.xpdfreader.com/viewtopic.php?t=44009) in September 2023, and that report was dismissed because it had been reported even earlier to the maintainer via private email. I suspect they found it by following the same tutorial I did. And then a few weeks later, someone submitted that tutorial series to Hacker News, the first time a fuzzing article reached the front page of Hacker News (TODO: link), so people seem to be randomly discovering that tutorial somehow.

But one thing that stood out to me in Morales' tutorial and all the fuzzing tutorials was how big a pain it is just setting up the environment. Morales directs readers to compile AFL++ from source with a specific version of Ubuntu and a bunch of other packages that have changed since the time writing.

I realized that rather than try to hunt down all the package versions Morales was talking about, the tutorial would be a good opportunity to use Nix. It allows me to pin tool versions in my source file and feel confident they won't change out from under me in the future.

I was able to create the entire fuzz testing workflow in a Nix flake so I just type `nix run` and Nix downloads the initial corpus, compiles the target program, and starts fuzzing. I plan to publish a blog post later this month explaining how to do it.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

- Enjoy family time.
- Publish my tutorial on fuzz testing with Nix.

### Requests for help

- People that are more up to date on fuzzing, what's the modern equivalent of AFL++?
