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

- **Result**: Worked on the chapter but didn't publish anything.
- **Grade**: D

I underestimated this goal when I wrote it. I had started one chapter years ago and kept returning to it, so in my mind, it was like 80% complete, but when I returned to it this time, it felt more like 20% complete.

## I need to stop procrastinating on the book

I started working on the first chapter of my book, and I felt increasingly distracted by my site's style. It's the first time I've published a website without using a third-party theme. It's just Bootstrap's default CSS with some custom styling that I've added.

So, I experimented with different fonts and found that I enjoyed working on the chapter more when I had nice-looking fonts. So, for the first time ever, I purchased fonts instead of using a free font from Google Fonts. I used [Concourse](https://mbtype.com/fonts/concourse/) and [Heliotrope](https://mbtype.com/fonts/heliotrope/), both designed by Matthew Butterick.

{{<gallery caption="I switched the *Refactoring English* website's font to [Concourse](https://mbtype.com/fonts/concourse/) and [Heliotrope](https://mbtype.com/fonts/heliotrope/)">}}
{{<img src="before-font.jpg" has-border="true">}}
{{<img src="after-font.jpg" has-border="true">}}
{{</gallery>}}

After I had my spiffy fonts, I got to thinking about the cover for my book. I plan to have one before I publish, so I might as well get it now. More people will probably be interested if I can show a nice cover. So, I wrote [a spec for the cover design](https://docs.google.com/document/d/1SUQ6GTeyL-XWmZYlJdQgyvQHZdHiUvCy0G-dh5nnrQM/edit?usp=sharing) and hired a designer to create it.

A few days later, I got an email from a reader asking if they could buy access to the unfinished lessons in _Hit the Front Page of Hacker News_. I sent the two new unreleased sections and a link to the old course, and the reader seemed happy with the material. I got to thinking I should pause _Refactoring English_ and finish _Hit the Front Page of Hacker News_.

At this point, I noticed that I was finding an awful lot of activities that weren't writing my book.

It's easy to get distracted because finishing the book feels so far away. And because it's a book about writing, I feel like my writing has to be perfect, so I get hung up on whether every sentence is phrased as well as it could be.

I think I'll have a better sense of what the work is like once I publish my first sample chapter and see reader feedback, so I'm going to just push on until that's done.

## Fuzzing is super fun

Notwithstanding the previous section, I had a lot of fun last month with fuzz testing.

For most of November, I had a few hours to myself when I was waiting for my three-month old's first wakeup of the night, which could happen anywhere from 1-4 hours after we put him to bed. In those hours, it's hard to focus on programming because I'm tired from the day and could be interrupted at any moment, but it's the perfect time to fuzz test stuff. Fuzz testing requires some focus, but it's a lot of trial and error just getting things set up.

Nix [makes it easy](/nix-fuzz-testing-1/) to set up fuzz testing workflows, and I feel like the world hasn't caught on yet.

### Fuzzing openc2e

One night, I read a blog post about [fuzzing a random open-source utility that Facebook published](https://blog.fadyothman.com/meta-bug-bounty-fuzzing-netconsd-for-fun-and-profit-part-1-6ffe96eb1419), so I [spent an hour reproducing it with Nix](/notes/fuzz-netconsd/).

A few nights later, I spent a couple of hours [writing a fuzzer](https://gitlab.com/mtlynch/fuzz-openc2e) for [openc2e](https://openc2e.github.io/), the the open-source reimplementation of the _Creatures_ game series.

The original _Creatures_ game from 1996 included a custom scripting language and corresponding virtual machine. The language is called [Creatures Agent Object Script (CAOS)](https://creatures.fandom.com/wiki/CAOS), and it let players create custom add-ons for the game.

CAOS is a low-level language that looks a bit like assembly:

```
SETS VA00 "he"
ADDS VA00 "llo"
DBG: ASRT VA00 eq "hello"
```

Enthusiasts have reimplemented a CAOS interpreter within openc2e, and I doubted that anyone had ever fuzzed it. But it's a good thing to fuzz because it parses untrusted third-party code if you install add-ons.

I started by fuzzing the lexer for the CAOS language, and I immediately found a bunch of crashes.

{{<img src="fuzz-openc2e.webp" caption="Within a minute of fuzzing, I found 20 unique crashes in openc2e." max-width="800px">}}

One of the crashes is just an unterminated double quote, which confirmed my suspicion that nobody had ever fuzzed the code.

```
* The following line crashes openc2e's CAOS lexer.
"
```

I made a [pull request to fix the simplest crash with a unit test to demonstrate the fix](https://github.com/openc2e/openc2e/pull/215), but the project is semi-abandoned, so it might be awhile before I can get all of my fixes in. I hope they eventually get time to review it because I think my PR is neat.

### Fuzzing means you can do whatever you want

One of the most fun things about fuzzing with Nix is that you can mess around with the underlying project without bothering anyone.

When I was trying to fuzz openc2e, I realized that the code I want to link against is compiled into an object that's not friendly to linking. I was trying to figure out how to link against the code when I realized I can just [patch their Makefile](https://gitlab.com/mtlynch/fuzz-openc2e/-/blob/dc48bfbe62bdc4a99eab2e9662a780c253654558/share-openc2e-lib.patch) in my repo, and nobody can stop me!

Adding in my custom patch meant that when I compile that repo, I get a shared library to link against, so I can write a test harness that throws a bunch of crazy data at their code, and I can see what causes crashes.

Usually, when I'm contributing to an open-source project, if I want to make a significant change like changing a library from private to public, I'd have to spend a lot of time understanding why it's private to begin with and then make the case to maintainers for why it makes sense to export the library. But for fuzzing, I'm just playing in my own separate area, and I can futz around with whatever I want.

## Building my new development desktop

I'm planning a dramatic transition in my software development habits: I'm going to write code like a normal person again.

Starting around 10 years ago, I found it easier to develop software on Linux, but I still preferred Windows as my main OS. I solved this by running Linux VMs in VirtualBox on my Windows desktop. I used per-project VMs to avoid dependency conflicts (e.g., my Python 2 project messing up my Python 3 project).

In 2017, I got tired of having to reboot all of my VMs every time I rebooted my Windows system, so I [built my first homelab server](/building-a-vm-homelab-2017/).

By 2019, I started doing all development with VS Code and Remote SSH, which mostly works fine but is unusual enough to cause issues occasionally.

At this point, most of the software I want is available on Linux, and I'm growing frustrated with Microsoft's increasingly invasive telemetry and ads in Windows, so I'm ready to switch to Linux.

Ever since I discovered [per-project environments in Nix](/notes/nix-dev-environment/), I've stopped using per-project VMs, and I just do all of my development in a single Debian VM with Nix installed.

I realized that these two changes mean I no longer need a VM server or a Windows desktop. I'm going to try to go all-in on NixOS with a single desktop, as I've been enjoying NixOS on my Framework 13 laptop for the past few months.

Because I hadn't upgraded my desktop in nine years, I convinced myself that I'm making an economically responsible choice by reducing two machines to one. That was helpful justification for somewhat overspending on my new system:

| Component   | Old Desktop                    | New Desktop                           |
| ----------- | ------------------------------ | ------------------------------------- |
| CPU         | Intel Core i7-4790K            | Ryzen 9 7950X                         |
| Motherboard | ASRock X99 Extreme4            | Gigabyte X870 Aorus Elite             |
| GPU         | ASUS GeForce GTX 970 STRIX 4GB | MSI RTX 4060 Ventus 2X 8GB            |
| RAM         | G.SKILL Ripjaws 4 32GB DDR4    | G.Skill Trident Z5 RGB 64GB DDR5      |
| Storage     | Samsung 980 PRO 2 TB           | Crucial T705 2TB                      |
| Case        | Cooler Master HAF 912          | Fractal Design Define 7               |
| PSU         | Corsair HX750i 750W            | SilverStone Platinum PS-ST55F-PT 550W |
| CPU Cooler  | Noctua NH-U9DXi4               | Noctua NH-U12S redux                  |
| Monitor     | LG 34UMP95 34"                 | Samsung Odyssey OLED G9 49" Ultrawide |
| Monitor Arm | AmazonBasics Monitor Arm       | Ergotron HX HD                        |

The disk is most often the bottleneck in my workflows, so I got the best of the best there, even though it feels inudulgent. I only need a single OS disk, as most of my data is on my [storage server](/budget-nas/).

The CPU is pretty fast but not top of the line. When I'm buying CPUs, I look at benchmarks and try to pick something that's 80-90% as good as the best possible option but at 50% or less of top-end prices.

The biggest indulgence is the monitor. It's a ridiculous 49" ultrawide OLED:

When I was 11 and the way I got new computers was by begging my parents for one, my dad surprised me with the biggest monitor I wanted. My dad said, "Given the amount of time you'll spend looking at your monitor, you might as well invest a lot in a good one." At the time, a "good" monitor was a 17" CRT.

## Learning to use an ultrawide monitor

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

- Finish two chapters of _Refactoring English_
