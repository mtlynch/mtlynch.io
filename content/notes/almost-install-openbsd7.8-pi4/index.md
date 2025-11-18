---
title: "I Can Almost Install OpenBSD 7.8 on a Raspberry Pi 4"
date: 2025-11-18
---

I've been curious about trying out OpenBSD, so I thought I'd install it on one of my Raspberry Pi 4 devices. There's a lot of conflicting and outdated information about how to boot.

## What nobody has documented

It used to be true that

The problem is that the OpenBSD installer doesn't output to the

## Where I get stuck

Strangely, the part where my install fails is the place where OpenBSD is supposed to shine: networking.

No matter what I do, I can't get OpenBSD to connect to my LAN over Ethernet. I've tried doing `autoconf`, and I've tried setting a static IP, but OpenBSD is never able to connect to my network over the Pi's Ethernet port.

I tried with a different Pi 4 device and port on my switch just to be sure. Blake Rain [reported a successful install of the OpenBSD 7.5 on the Pi 4](https://blakerain.com/blog/raspberrypi-openbsd-firewall/). Just to be sure, I tried the exact same version as he did, but I got stuck at the same spot.

I can't understand what's going wrong because OpenBSD explicitly supports the Pi 4
