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

Started install at 11:16am. Screen went black after 50 mins or so.

Started again at 12:18pm, disappeared at 12:45pm. Probably forgot to do set tty...

## Working

1. Ctrl+C immediately, drops into U-Boot prompt
1. Type: `boot`
1. Ctrl+C as soon as there's new console output
1. Type: `set tty fb0`
1. Type: `bsd.rd`

Takes about 25 mins.

## Installation

Can't go backwards in install if you mess up networking.

Couldn't get a DHCP lease, so I configured 10.0.0.201 as the IP and did 10.0.0.1 as default IPv4 route and DNS server.

Kept getting stuck.

## Tried on my Dell Optiplex 7040

Had to upgrade the BIOS.

Doesn't eject the media at the end, so keeps booting back in.

Had to enable legacy ROM support.

Both static and autoconf worked immediately after the step in install.

Full install worked.

## Tried again on Pi with full

Tried with `install78.img`

Couldn't get it to boot with `bsd.rd`. Might work if I try again.

## Tried on a different Pi 4

```bash
caligula burn -z none --root always --hash skip ~/scratch/miniroot78-arm64.img
```

Same, slow boot. Couldn't get IP from DHCP. Tried static IP of 10.0.0.203 and no ping response from squish.

## Tried downgrading to 7.5

It's what the blog guy said worked.

```bash
caligula burn -z none --root always --hash skip ~/scratch/miniroot75-arm64.img
```

1. Type: `set tty fb0`
1. Type: `boot`

Seemed like slightly faster boot.

Still couldn't get any network connectivity.

## Last idea

Try dd instead of caligula?

use `lsblk`
