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

## Thoughts on finishing my first chapter

- Changing an article after it's published
- Too much bash
- Make examples copy/pasteable
  - Readers won't learn if they copy/paste.
- Revisions
- Feels unwieldy. There are still parts where that I felt flow poorly, but I was tired of editing it. I think 2,000 word chunks are my ideal. This was 5,400 words.
- The rule "Teach one thing" at publication time was called, "Boil it down to the essentials." I realized in participating in discussion that the original heading didn't really fit, and "Teach one thing" more crisply captured what I thihk.
- I got a lot of pushback on "Use computers to evaluate conditional logic"
  - I think they're right, and that was my weakest rule.
  - That was in my head because it was a rule I championed within TinyPilot, but it makes more sense in a troubleshooting context than in tutorials. For example, I would encourage support engineers to avoid things like, "If you're running version 1.9.2, run command `X`. If you're running version 1.9.3, run command `Y`." Instead, I tried as much as possible to give commands snippets that would just figure out the state of the system and do the right thing.

It's interesting getting responses from people who are like, "I think you're wrong about some of your advice. As evidence, look at this spectacular tutorial that I wrote." And then I read their example, and it's offensively bad.

In truth, I'm happy to get that reaction because I feel immensely confident that those authors are wrong, and I'm right. Or not so much that they're "wrong" exactly, but I feel confident that the overwhelming majority of developers prefers a tutorial that allows them to copy paste rather than one where the author has gone out of their way to force the reader to re-type entire files by hand.

### What's my marketing strategy now?

The reception was pretty good, and I thought, "Okay, I need to just keep sharing preview chapters like this to those same channels."

Then, I reviewed my table of contents and realized that this is basically my only chapter that works on Hacker News, Lobsters, and reddit. Like Hacker News is probably not going to be excited to read about why I hate the passive voice.

## My poor experience hiring a book cover designer through Reedsy

I checked for recommendations in the Write Useful Books community, and several people described mentioned Reedsy, a service I'd never heard of before. They common review was that it was pricey but worth it.

I wrote [a design brief](https://docs.google.com/document/d/1SUQ6GTeyL-XWmZYlJdQgyvQHZdHiUvCy0G-dh5nnrQM/edit?usp=sharing) explaining what I wanted and sent it to three designers. One of them bid

Gary had a portfolio with dozens of book covers and a perfect 5.0-star rating. He proposed a one-month timeline, with the fee split into three payments, which seemed fine to me.

Gary wasn't awful, but he was just kind of mediocre and slow. A week went by, and I hadn't heard anything. After my first payment was auto-billed, I asked for an ETA on when I could see some drafts, and he said he'd send concepts the next day, which he did.

{{<img src="cover-ideas.webp" max-width="800px" caption="Initial book cover ideas from the designer I hired through Reedsy">}}

Sample 01 looked good, but it was a direct ripoff of [_Beautiful Code_](https://www.oreilly.com/library/view/beautiful-code/9780596510046/), which I had cited in my brief.
I found the rest underwhelming, but I felt like it was my fault for not spending more time on my brief.

As I reviewed the concepts, I realized what I cared about conveying was the idea of careful, deliberate work. I felt like Sample 06 of the zen garden and Sample 05 of the clay mold were on the right track, so I asked to explore those.

Another week went by, and Gary sent a minor variation on the zen garden idea, and a cover where someone was starting to

The next week was the holidays, and I started to worry that the project wouldn't complete by the December 30th finish date. Gary emailed me the Monday before Christmas to say he was returning to work on December 27th.

I found [a royalty-free image on Unsplash](https://unsplash.com/photos/shallow-focus-photo-gray-balance-stone-HWRAHxoBlpU) that I felt captured the spirit of quiet, careful work, and added I some text.

{{<img src="refactoring-english-cover-800px.webp" max-width="350px" has-border="true">}}

I know it looks amateurish, but I'm about 80% as satisfied as I expected to be with Gary's work. But this was free and took me an hour. I'm treating it as a placeholder, and I can always hire someone or invest more time later.

The experience also put me off Reedsy. Reedsy wouldn't allow me to cancel my final payment. I tried to delete my credit card, but they prevent you from removing your card without replacing it with another one.

I gave Gary a 3-star review across the board, and my review is public, but Reedsy still claims that Gary has a perfect 5.0-star rating even though he only has five reviews.

Takeaways:

- Tie payments to project milestones.
- Be explicit about whether you're okay with the designer using AI-generated images or AI-assisted image compositing.
- Be explicit that you want to see license information for third-party assets like photos or fonts.
  - I had said in the brief that all the assets needed to have compatible licenses, but it would have been better to say they had to deliver the license information and not just pinky promise that it's okay.
- Reedsy sides heavily with its platform vendors rather than its clients.

## From Windows to NixOS

I hope to write a longer article in a few months, but I just want to capture some thoughts while they're still fresh.

### Good: My system configuration is in source control

If I spend time configuring something hard, I keep that work. It's not like Windows where I'm so exhausted from doing whatever I did, and then a few months later when something breaks or I reinstall the OS, I have to figure everything out again.

### Good: I can navigate more with my keyboard

For the past few years, I've had a goal of maintaining better keyboard discipline (i.e., preferring the keyboard to the mouse), but I've been bad at practicing.

When I started using NixOS, I realized how much Windows pulls me back to the mouse. One of the biggest things I noticed in NixOS was that I can launch applications quickly using the keyboard. I just hit Super+A and then start typing the name of the application I want to launch. On NixOS it works.

It felt magical even though you can launch applications with the keyboard on Windows, too. But Windows had trained me out of it because:

1. Windows somehow managed to make the Start menu slow, so when I hit the Windows key, there was a delay of sometimes seconds before the Start menu rendered.
1. When I search, the Start menu doesn't just search applications. It also searches file contents and remote content on the Internet, which is thousands of times slower than searching a few dozen local applications.

### Good: My OS is no longer actively working against me

One of the main reasons I left Windows was that the OS feels increasingly user-hostile. It keeps adding in telemetry and user tracking, then when I disable it, a new version will come out and introduce even more tracking that's on by default.

As I was migrating my data from Windows to NixOS, I got a full-screen modal pop up on my Windows system telling me that Windows 10 was deprecated so I absolutely had to upgrade to Windows 11. I had to look closely to find the subtle button at the bottom of the modal that let me decline and continue using my own computer.

With NixOS, there's none of that. Nothing's bothering me about forced upgrades or opt-out telemetry.

### Good: Rebuilding my system is easy, mostly

I originally installed NixOS on a blazing-fast Crucial T705. But then after a few weeks, I realized the disk was defective, so I had to send it back.

If this had been a Windows or Ubuntu system, it would have been a huge drag to

### Good: SSH just works

OpenSSH is available for Windows, and it usually worked, but it always felt brittle. Every few months, I'd run into some situation where it couldn't connect to a particular host, or it would refuse to forward my keys, or it would complain about a bad host key. And I was never sure if it was my fault or just bugs in the Windows port of OpenSSH, but it was such a pain to have to tinker with SSH, a utility you expect to just work reliably.

On NixOS, SSH just works. It never breaks unexpectedly. I manage my SSH configuration and host keys using Home Manager under source control, so all of my machines have consistent behavior.

### Bad: Linux file explorers all suck

I never thought of Windows Explorer as having an especially brilliant or innovative UX, but for whatever reason, every other option feels terrible by comparison.

Nautilus is the best I've found, but it's still missing a lot of basic features:

- There's no tree view of folders.
- I can't drag a file from one Nautilus window to another.
- There's no "Copy file path" option.

### Bad: It's harder to configure most applications through Nix

For example, I use Firefox heavily. There might be some way to configure it through Nix, but

### Bad: I can't run Photoshop

I [dislike Adobe as a company](https://www.ftc.gov/news-events/news/press-releases/2024/06/ftc-takes-action-against-adobe-executives-hiding-fees-preventing-consumers-easily-cancelling), but Photoshop is good software. I'm not even that good at it, but I've been using it on a daily basis for 14 years for quick screenshotting and editing.

I probably could if I tried hard enough with Wine to run Photoshop under NixOS, but I'd rather figure something out in the Linux world, especially something that's open-source.

I've been trying to learn GIMP, but it's a major step down in UX and it's going to take me a while to learn to do what I used to do in Photoshop.

### The rest in brief

- The good
  - It's easy to create new keyboard shortcuts.
  - Trying new applications is super low-friction.
    - I can install most apps by just guessing the package name (e.g., `nix-shell -p bitwarden`).
    - Installing one app never breaks another.
    - It's trivial to uninstall apps.
  - Logging is more accessible and standardized than on Windows.
  - There's no Windows Registry, so data is more accessible through normal filesystem tools.
  - It's easier to manage always-on services.
  - It's easier to manage scheduled tasks.
- The bad
  - It's a pain to install apps that haven't been packaged for Nix.
  - To install NixOS with disk encryption enabled using the GUI installer, there's a lot of stuff you have to "just know" about partitioning the disk manually in the right way.
  - Some NixOS settings take effect immediately, while others require a new login, and others require a reboot, and it's hard to tell which is which.
  - The separation between binaries and user data on the filesystem is less clear to me.
    - Windows doesn't do this perfectly, but it's obvious that everything in `C:\Program Files` is not supposed to be user data, and mostly everything under `C:\Users` is user data.
  - I can't figure out how to customize my mouse buttons
  - I couldn't figure out how to get my motherboard's onboard network card to work.
    - Fortunately, my PCI-based 10G NIC worked out of the box, so I didn't have to bother.
  - I find the NFS experience terrible, so I just keep using CIFS despite no longer having Windows systems on my network.
  - Nix is still an order of magnitude faster than anything else but it still feels like it's an order of magnitude slower than it needs to be.
  - I can't figure out how to change my desktop background.
  - I can't figure out how to switch to i3 or anything except Gnome.
  - I can't figure out a way to type emojis.
- The so-so
  - Documentation is okay. I know it's one of the biggest complaints, but I can usually get by between the [NixOS wiki](https://wiki.nixos.org/wiki/NixOS_Wiki) and searching for package options.
  - The error messages are fine. A common complaint I hear about Nix is that the error messages are opaque and point to the wrong thing, but I've found the error messages to be fine. Not amazing, but on par with other programming languages.

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

Named in honor of [The Pointer Brothers](https://www.youtube.com/watch?v=0OwgTEB51Os)

## Side projects

### Making PicoShare work with large files

## Wrap up

### What got done?

- Set up my new NixOS system.
- Set up offlineimap to keep a local copy of my email, and I back it up with daily snapshots.

### Lessons learned

-

### Goals for next month

-

### Requests for help

- TODO
