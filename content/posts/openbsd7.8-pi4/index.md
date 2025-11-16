---
title: "Openbsd7.8 Pi4"
date: 2025-11-16
---

Attempt 1: Tried install78.img but couldn't figure out where to enter `set tty fb0` on boot prompt. I was able to Ctrl+C once and type but then it said it didn't recognize `set`. And then I wasn't able to get Ctrl+C working after.

Attempt 2: Tried to modify the .img file but Linux apparently can only mount OpenBSD UFS format as read-only

Attempt 3: Tried miniroot78.img

was able to get to bootAA64 by Ctrl+C immediately, then `boot`, then Ctrl+C again, then `set tty fb0` then `boot` but goes super slow after that. Got bored and quit after 10 mins

After tried `bsd.rd` still really slow

https://blakerain.com/blog/raspberrypi-openbsd-firewall/

Good but he glosses over a lot of details.

Eventually got it working after 20ish minutes with bsd.rd

Not sure about default IPv4 gateway

Unable to get list from openbsd.org

Started install at 11:16am
