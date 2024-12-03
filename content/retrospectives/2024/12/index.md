---
title: "Paternity Leave: Month 4"
date: "2024-12-09"
description: TODO - One-line summary
---

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Enjoy family time

- **Result**: Continued to enjoy family time.
- **Grade**: A

TODO

### Complete and publish a chapter of [_Refactoring English_](https://refactoringenglish.com)

- **Result**: XX
- **Grade**: XX

TODO

## I need to stop procrastinating on the book

I found a font for the book.

{{<gallery caption="I switched the *Refactoring English* website's font to [Concourse](https://mbtype.com/fonts/concourse/) and [Heliotrope](https://mbtype.com/fonts/heliotrope/)">}}
{{<img src="before-font.jpg" has-border="true">}}
{{<img src="after-font.jpg" has-border="true">}}
{{</gallery>}}

I wrote [a spec for the cover design](https://docs.google.com/document/d/1SUQ6GTeyL-XWmZYlJdQgyvQHZdHiUvCy0G-dh5nnrQM/edit?usp=sharing) and hired a designer to create it.

I also got an email from a reader asking if they could buy access to the unfinished lessons in _Hit the Front Page of Hacker News_, and they seemed happy with it, so I got to thinking I should just finish the videos.

At this point, I started to notice that I was finding ideas for lots of activities that weren't writing my book.

Because it's a book about writing, my writing has to be perfect.

## Fuzzing is super fun

Notwithstanding the previous section, I had a lot of fun last month with fuzz testing.

My wife and I have since changed sleeping strategies, but for most of November, I had a few hours to myself when I was waiting for my three-month old's first wakeup, which could happen anywhere from 2-4 hours after we put him to bed. In those hours, it's hard to focus on programming because I'm tired from the day and I could be interrupted at any moment, but it's the perfect time to fuzz test stuff. Fuzz testing requires some focus, but it's a lot of trial and error just getting things set up.

Nix [makes it easy](/nix-fuzz-testing-1/) to set up fuzz testing workflows, and I feel like the world hasn't caught on yet.

### Fuzzing openc2e

So, one night, I read this blog post about [fuzzing a random open-source utility that Facebook published](https://blog.fadyothman.com/meta-bug-bounty-fuzzing-netconsd-for-fun-and-profit-part-1-6ffe96eb1419), so I [spent an hour reproducing it with Nix](/notes/fuzz-netconsd/).

A few nights later, I spent a couple of hours [writing a fuzzer](https://gitlab.com/mtlynch/fuzz-openc2e) for the [the open-source reimplementation of the _Creatures_ game series](https://openc2e.github.io/).

The original _Creatures_ game from 1996 included a custom scripting language and corresponding virtual machine. The language is called [Creatures Agent Object Script (CAOS)](https://creatures.fandom.com/wiki/CAOS), and it let players create custom add-ons for the game.

CAOS is a low-level language that looks a bit like assembly:

```
SETS VA00 "he"
ADDS VA00 "llo"
DBG: ASRT VA00 eq "hello"
```

Enthusiasts have reimplemented a CAOS interpreter within openc2e, and I doubted that anyone had ever fuzzed it. But it's a good thing to fuzz because it parses untrusted third-party code if you install add-ons.

I started by fuzzing just the lexer for the CAOS language, and I immediately found a bunch of crashes. One of them is just an unterminated double quote, which confirmed my suspicion that nobody had ever fuzzed the code.

```
* The following line crashes openc2e's CAOS lexer.
"
```

I made a [pull request to fix the simplest crash with a unit test to demonstrate the fix](https://github.com/openc2e/openc2e/pull/215), but the project is semi-abandoned, so it might be awhile before I can get all of my fixes in. I hope they eventually get time to review it because I think my PR is neat.

### Fuzzing means you can do whatever you want

One of the most fun things about fuzzing with Nix is that you can mess around with the underlying project without bothering anyone.

When I was trying to fuzz openc2e, I realized that the code I want to link against is compiled into an object that's not friendly to linking. I was trying to figure out how to link against the code when I realized I can just [patch their Makefile](https://gitlab.com/mtlynch/fuzz-openc2e/-/blob/dc48bfbe62bdc4a99eab2e9662a780c253654558/share-openc2e-lib.patch) in my repo, and nobody would be the wiser.

Adding in my custom patch meant that when I compile that repo, I get a shared library to link against, so I can write a test harness that throws a bunch of crazy data at their code, and I can see what causes crashes.

Usually, when I'm contributing to an open-source project, if I want to make a significant change like changing a library from private to public, I'd have to spend a lot of time understanding why it's private to begin with and then make the case to maintainers for why it makes sense to export the library. But for fuzzing, I'm just playing in my own separate area, and I can futz around with whatever I want.

## Building my new development desktop

I'm planning a dramatic transition to resume doing development like a normal person again.

Starting around 10 years ago, I found it easier to develop software on Linux, but I still preferred Windows as my main OS. I solved this by running Linux VMs in VirtualBox on my Windows desktop. I used per-project VMs to avoid dependency conflicts (e.g., my Python 2 project messing up my Python 3 project).

In 2017, I got tired of having to reboot all of my VMs every time I rebooted my Windows system, so I [built my first homelab server](/building-a-vm-homelab-2017/). And by around 2019, I started doing all development with VS Code and Remote SSH, which mostly works fine but is unusual enough to cause issues occasionally.

At this point, most of what I want is available on Linux. And I'm growing frustrated with Microsoft's increasingly invasive telemetry and ads in Windows, so I'm ready to switch to Linux.

I've also stopped using per-project VMs ever since I discovered [per-project environments in Nix](/notes/nix-dev-environment/).

I realized that now's my chance to ditch Windows, go all in on NixOS, and consolidate my separate VM and desktop machines into one. And because I hadn't upgraded my desktop in nine years, and I somehow convinced myself that I'm making an economically responsible choice by reducing two machines to one, I went overboard on the components:

- CPU: Ryzen 9 7950X
- Motherboard: Gigabyte X870 Aorus Elite
- Disk: Crucial T705 2TB
- RAM: G.Skill Trident Z5 RGB 64 GB
- Case: Fractal Design Define 7
- GPU: MSI RTX 4060 Ventus 2X 8G
- Monitor: Samsung Odyssey OLED G9
- Monitor arm: Ergotron HX HD
- PSU: SilverStone Platinum PS-ST55F-PT 550W

The OS disk is most often the bottleneck in my workflows, so I got the best of the best there.

The CPU is pretty fast but not top of the line. When I'm buying CPUs, I look at benchmarks and try to pick something that's 80-90% as good as the best possible option but at 50% or less of top-end prices.

## Learning to use an ultrawide monitor

My dad said, "Given the amount of time you'll spend looking at your monitor, you might as well invest a lot in a good one." At the time, a "good" monitor was a 17" CRT.

I haven't received most of the components yet, but I already set up the monitor, and it's really nice.

But I quickly realized I needed a new strategy for managing windows. My old monitor was 34", and I mostly just used Win+Left / Win+Right to dock windows to half-width.

I originally tried [Komorebi](https://github.com/LGUG2Z/komorebi), but I found it too complicated to understand.

I found [Fancy Zones](https://learn.microsoft.com/en-us/windows/powertoys/fancyzones), and it does exactly what I want. It lets me define zones, and then I can dock windows to those zones by hotkey or with the mouse.

Here are my four zones:

1. 1000x1440 - Primary VS Code window
1. 1000x1440 - Secondary VS Code window
1. 1560x1440 - Primary web browser window
1. 1560x1440 - Secondary web browser window

I generally only dock web browsers and VS code windows. Everything else is just a floating window that I only use briefly.

It felt like a needless extravagance when I bought it, but I do find it legitimately useful. I've run into several situations where it's been helpful to have three windows side by side all dedicated to the same task.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-
