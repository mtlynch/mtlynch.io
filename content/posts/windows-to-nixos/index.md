---
title: "Windows to Nixos"
date: 2025-01-03
---

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
