---
title: "Add a VLAN in OPNsense in Just 26 Clicks Across 6 Screens"
date: 2025-11-13
---

How many clicks does it take to add a new VLAN to your OPNsense firewall?

Nothing fancy. Just your regular, basic VLAN with its own IPv4 range. How many clicks should that take? Maybe five or six? Seven if we're wild?

Every time I add a new VLAN to OPNsense, I feel like the process is strangely tedious, so today, I decided to measure how many clicks it takes to do it.

The result was:

- 26 clicks
- 71 keystrokes
- 6 distinct screens / dialogs
- 3 distinct workflows

And that's before I even try to assign firewall rules!

I could have traded some of those clicks for keystrokes with the tab key, but I tried to go through the flow how I naturally complete it.

## Why is this so tedious?

There are so many steps in the process where I just want to tell OPNsense, "Why couldn't you have figured this out on your own?"

I recorded the video in a VM, but on my real OPNsense router, I have to specify every time that I'm creating a VLAN on my LAN port, not on the disconnected Ethernet interface whose device name happens to be first alphabetically:

{{<img src="default-parent.webp" max-width="500px">}}

Also, if I dare enter an arbitrary device name, OPNsense insists I have to prefix it with `vlan`:

{{<img src="vlan-prefix.webp" max-width="500px">}}

You're giving me an arbitrary input field so I can type out `vlan` for you? As the server, why couldn't _you_ do that, OPNsense?

## How should it look?

My dream interface is for OPNsense to make a simple VLAN easy.

{{<img src="ideal-vlan-dialog.webp" max-width="550px">}}

- Assume I want to enable the VLAN I just created.
- Assume that the VLAN is for my LAN port.
- Assume I want to create a static IP range for it where the tag number is the third octet (e.g. 192.168.**10**.0/24).
- Assume that I want to enable DHCP and use all available IPs in the /24.

I'm happy for all the other options to be under an "Advanced" section, but why not just use sensible defaults? Every guide I can find for setting up VLANs in OPNsense uses these settings, so why not just default to them?
