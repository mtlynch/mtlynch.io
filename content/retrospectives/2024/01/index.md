---
title: "TinyPilot: Month 42"
date: 2024-01-01T00:00:00-05:00
description: TODO - One-line summary
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $80-100k/month in revenue and employs six other people.

Every month, I publish a retrospective like this one to share how things are going with my business and my professional life overall.
{{</notice>}}

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Complete design work for TinyPilot license checking

- **Result**: XX
- **Grade**: XX

TODO

### Create a process for spot-checking each manufacturing batch of new devices

- **Result**: XX
- **Grade**: XX

TODO

### Handle TinyPilot's end-of-year tax chores

- **Result**: XX
- **Grade**: XX

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

## Topic 1

## Can I outsource more?

Documentation

Vision

## Learing Nix vs. learning Zig

They're not at all competitors. The only similarity is that they're new open-source technologies, and they're both small underdogs trying to compete with larger entrenched competitors.

### Nix is decentralized, Zig has a BDFL

Andrew is [effectively Zig's BDFL](https://kristoff.it/blog/interfacing-with-zig/). In a lot of discussions, I'd encounter Andrew or someone official from the project giving an authoritative answer.

Nix feels rudderless. When I can't figure something out, I visit the Nix Discourse forum, and it's like people are discussing an alien technology that humans have discovered. I never see someone from the Nix core team weigh in, and I don't even know if there is a core team. Whenever I see people describe the direction of Nix, the description I most often see is "there are discussions around &lt;topic&gt;."

I'd expect Eelco Dolstra to be Nix's BDFL, but he doesn't seem to be, at least not publicly. He works for Determinate Systems, a third-party consulting firm that promotes Nix. But they're decidedly third-party and not core to Nix. They release things that sometimes [clash](https://discourse.nixos.org/t/introducing-flakehub/32044/3?u=mtlynch) [controversially](https://discourse.nixos.org/t/parting-from-the-documentation-team/24900?u=mtlynch) with work from internal Nix teams . He's [president of the Nix Foundation](https://discourse.nixos.org/t/expanding-the-nixos-foundation/19929),

https://discourse.nixos.org/t/expanding-the-nixos-foundation/19929

### I learn Zig by reasoning &mdash; I learn Nix through copy/paste

One of the complaints I've heard about Zig is that it has poor documentation. And I understand that criticism. I've found the documentation to be pretty terse and written more from the perspective of a compiler designer than a developer. But I'm still able to scour discussions and experiment until I have an accurate mental model of how Zig works.

After XX months of using Nix, I still have a terrible mental model of how Nix works. I've read explanations of Nix, but it still hasn't clicked for me. When I create Nix files, I can only do it by copying an existing example and adjusting it to match what I want. Most of the file is just cargo-cult copy/paste, and I don't understand why it is the way it is.

### Developer experience on Zig feels narrow but deep,

Zig doesn't seem to have code coverage or package management. One of my disappointments with Zig so far has been that its support for microcrontrollers seems mostly absent.

Nix feels broader but shallower. Nix offers to manage your entire OS, a monumental task. But it feels like there are tons of gaps. Like I want to use Nix in my continuous integration, and so far, it seems like there's no way to do it without adding a 50-second initialization to all of my CI jobs. There are Nix-specific CI providers, but I don't want to switch my entire CI just to use one dev tool.

One of the most surprising gaps in Nix is that [there's no official way to specify a package version](https://github.com/NixOS/nixpkgs/issues/9682) you want to install. There have been eight years of discussion,

### Older Nix solutions still work, older Zig solutions don't

If it's more than six months old, Zig code examples don't compile. They haven't declared the stable 1.0 yet, so that's understandable, but it is some extra work.

With Nix, I've generally found that old solutions work, but they often don't apply to me. I do Flake-centric development, even though Nix doesn't officially support it, but it seems so much easier than the officla Nix ways.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

- Publish annual retrospective.
- Blog invitations?
- Create workflow for double checking batches

### Requests for help

- If you've had good experience with a 3PL that serves small order volumes (100-200 shipments per month).
