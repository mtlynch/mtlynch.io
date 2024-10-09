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

## Fuzz is in the air

About ten yars ago, I was a security consultant and [used fuzz testing to find a serious vulnerability in VLC](https://www.nccgroup.com/us/research-blog/fuzzing-rtsp-to-discover-an-exploitable-vulnerability-in-vlc/).

It took me a while to set up the fuzzer, but once I learned how to do that, finding crashes in VLC was easy. The tooling around fuzzing has gotten significantly better in the last decade, so I've been curious to try out the latest state of the art.

I found Antonio Morales' [Fuzzing 101 series](https://github.com/antonio-morales/Fuzzing101). It's from 2021, and I get the sense that AFL++ is no longer the state of the art, but I started the first tutorial for fuzz testing xpdf. I modified the steps to targe the latest version of xpdf, and I found a new out of bounds read, which was cool!

But then I discovered someone else [discovered the same vulnerability](https://forum.xpdfreader.com/viewtopic.php?t=44009) in September 2023, and that report was dismissed because it had been reported even earlier to the maintainer via private email.

But the thing I noticed

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

- Enjoy family time.

### Requests for help

- People that are more up to date on fuzzing, what's the modern equivalent of AFL++?
