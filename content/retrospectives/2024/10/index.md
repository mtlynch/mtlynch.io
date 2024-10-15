---
title: "Paternity Leave: Month 2"
date: 2024-10-14T00:00:00-04:00
description: Not working is harder than I expected.
---

## Highlights

- I'm finding it surprisingly difficult not to work.
- Sleep is getting a little better.
- I used Nix to create a slick and reusable fuzz testing workflow.

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Enjoy family time

- **Result**: Spent lots of time with my wife and our newborn son and had frequent visits with friends and family.
- **Grade**: A

## I'll be okay if I don't work for a bit

I never thought of myself as someone who needs to work all the time, but I'm finding it difficult to take time off.

When I look at how little I've gotten done work-wise in the last three months, I have this anxious feeling of, "What if this is my new normal? What if I have to make a living with only a few hours for work each month?"

I know these fears are mostly irrational. Tons of people have kids &mdash; they work regular hours, and it's fine. And on top of that, I have lots of family nearby who are eager to help out with childcare.

It feels even more ridiculous to worry about having too little time to work when I look back at where my time has been going: long visits with family and friends and fun activities as a family.

It would be one thing if the situation were, "Oh no! Between feeding, diaper changes, and catching up on sleep, there's zero time!" But instead, I'm basically reacting like, "Oh no! Between yesterday's three-hour brunch and seven-hour visit with friends, I had no time for blogging!"

Another part of the equation is that I'm spending significantly more time hosting guests and visiting other people than I'm used to, so part of my anxiety is just an introvert's exhaustion from extra social time.

So, I just have to remind myself that I'll be okay if I don't work for a bit, I'll have more time as my son gets older, and I'm still largely in control of how I'm spending my time.

## Refining our newborn sleep strategy

It feels cliché to talk about sleep as a new parent because all new parents seem weirdly obsessed with sleep. But good sleep makes a huge difference in our day-to-day, so I guess that's why everyone talks about it.

Originally, my wife was doing all the feedings, and I was doing all the diaper changes. We quickly realized that meant that at nighttime, we both had to get up every 60-90 minutes, so neither of us was sleeping well.

A few weeks in, we switched to shifts, so one person handles both feeding and diaper changes while the other sleeps. I do the first shift from around 9 PM to 2 AM, and my wife takes over at my son's first post-2 AM wakeup. That's been a major improvement, as it guarantees that we each get 4-5 hours of uninterrupted sleep when we're off-shift, plus a few scattered hours of sleep during our shifts.

We also noticed our son slept better when we took sleep hygiene seriously. We sometimes like to unwind with an hour of TV after dinner, but we noticed that on nights we skipped TV, everyone slept better, especially our son. And I used to read for an hour or two each night in our living room while my son slept, but we've read that having lights on can interfere with infant sleep, so I've stopped doing that, though I miss the quiet reading time with him.

Overall, our sleep strategies are working well, as I feel well-rested most days. We'll keep adjusting as our son's sleeping evolves and as we discover new techniques.

## Nix is a surprisingly good tool for fuzz testing

About ten years ago, when I was working as a security consultant, I used [fuzz testing](https://en.wikipedia.org/wiki/Fuzzing) to [find a serious vulnerability in VLC](https://www.nccgroup.com/us/research-blog/fuzzing-rtsp-to-discover-an-exploitable-vulnerability-in-vlc/), the [open-source video player](https://www.videolan.org/vlc/).

The tooling around fuzz testing has improved substantially in the last decade, so I've been curious to try out the latest state of the art.

I found Antonio Morales' 2021 [fuzz testing tutorial series](https://github.com/antonio-morales/Fuzzing101). It uses [AFL++](https://github.com/AFLplusplus/AFLplusplus), which I sense is no longer the top fuzzing tool, but I started the series. The first tutorial demonstrates how to fuzz [xpdf](https://www.xpdfreader.com/), an open-source PDF processing tool. I modified the steps to target the latest version of xpdf, and I found a new out-of-bounds memory read bug, which was exciting.

It turned out that someone else had [discovered the same vulnerability](https://forum.xpdfreader.com/viewtopic.php?t=44009) in September 2023, and that report was dismissed because it had been reported even earlier to the maintainer via private email. I suspect they found it by following the same tutorial I did. A few weeks after I found the series, it [appeared on the front page of Hacker News](https://news.ycombinator.com/item?id=41747979), so people seem to be randomly discovering that three-year-old tutorial somehow.

One thing that stood out to me in all the fuzzing tutorials was how big a pain it is just setting up the environment. Morales directs readers to compile AFL++ from source with a specific version of Ubuntu, but those instructions are now out of date as all the packages he refers to have all changed since then.

Rather than hunt down all the package versions Morales was talking about, I saw an opportunity to use Nix. It allows me to pin tool versions in my source file and feel confident they won't change out from under me in the future.

I was able to create the entire fuzz testing workflow in a Nix flake, so I just type `nix run`, and Nix downloads the initial corpus, compiles the target program, and starts fuzzing. I plan to publish a blog post later this month explaining how it all works.

## Wrap up

### What got done?

- Enjoyed family time.
- Worried about whether I was taking too much family time.

### Lessons learned

- My fears about taking too much time off from work are mostly irrational.
- Nix is a good tool for creating fuzz testing workflows.

### Goals for next month

- Enjoy family time.
- Publish my tutorial on fuzz testing with Nix.

### Requests for help

- What's the modern equivalent of AFL++? Is it [honggfuzz](https://github.com/google/honggfuzz)?
  - If you work in infosec, let me know what the new, cool fuzz testing tool is.
