---
title: "Educational Products: Month 1"
date: "2025-01-09"
description: TODO - One-line summary
---

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Finish two chapters of _Refactoring English_

- **Result**: Finished one chapter and got 75% through the next.
- **Grade**: XX

TODO

### Work with a designer to complete the cover design for _Refactoring English_

- **Result**: Decided to do the cover design on my own.
- **Grade**: XX

TODO

## Topic 1

## Giving up on a book cover designer

## From Windows to NixOS

I hope to write a longer article in a few months, but I just want to capture some thoughts while they're still fresh.

### Good: I can launch applications with my keyboard

### Good: My system configuration is in source control

### Good: My OS is no longer actively working against me

### Good: Rebuilding my system is (mostly) easy

### Good: Trying new applications is low-friction

### Good: SSH just works

### Bad: Linux file explorers all suck

### Bad: It's harder to configure most applications through Nix

### Bad: I can't figure out how to customize my mouse buttons

### The rest in brief

- Good
  - It's easy to create new keyboard shortcuts.
  - I can install most apps by just guessing the package name (e.g., `nix-shell -p bitwarden`).
  - Logging is more accessible and standardized.
  - There's no Windows Registry, so data is more accessible through normal filesystem tools.
  - It's easier to manage always-on services.
  - It's easier to manage scheduled tasks.
- Bad
  - It's a pain to install apps that haven't been packaged for Nix.
  - To install with disk encryption enabled using the GUI installer, there's a lot of stuff you have to "just know" about partitioning the disk manually in the right way.
  - The separation between binaries and user data on the filesystem is less clear to me.
    - Like on Windows, it's obvious that everything in `C:\Program Files` is not supposed to be user data, and mostly everything under `C:\Users` is user data.
  - I couldn't figure out how to get my motherboard's onboard network card to work.
    - Fortunately, my PCI-based 10G NIC worked out of the box.
  - I find the NFS experience terrible, so I just keep using CIFS despite no longer having Windows systems on my network.

## NixOS encourages me to make mini-utilities

One of my favorite things about using NixOS is that it rewards me for creating personal utilities.

I create a lot of personal utilities anyway, but

### Streamabilizer: Make videos web-streamable

A utility I've wanted for years but never bothered to make is a tool for making videos web-streamable. Modern browsers can play MP4 videos natively, but the video has to be encoded specifically to support web streaming.

Sometimes, I'll want to throw a video onto PicoShare to send someone, but the video isn't web-streamable. So, I find the [SuperUser answer](https://superuser.com/a/438471) I've found 100x times before, copy the ffmpeg incantation, modify it for my filename and the path to ffmpeg on my system, then run the command.

I always knew I should automate more of that. The easiest would be to create my own wrapper script so that I didn't have to look up ffmpeg's semantics. But then it would break if I installed a new version of ffmpeg. And then I'd have to remember where on my filesystem that wrapper script was. And then do I have to replicate the script between my laptop and desktop?

I could make a web interface, but Windows isn't so friendly to hosting web services in the background. And if I host it in the cloud, it's expensive because I need to run ffmpeg on the backend, so I need a whole server. And I'd have to put in abuse protection.

But if I'm already running NixOS, creating a utility to make web-streamable videos is so much less friction.

### Basic Go Web App: A basic Go web app

### Pointer Brother: Point to things in screenshots

## Side projects

### Making PicoShare work with large files

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
