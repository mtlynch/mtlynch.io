---
title: "Debugging VLANs on my TP-Link Managed Switch"
date: 2023-07-01T11:35:06-04:00
---

I recently bought a TP-Link TL-SG3428X JetStream managed switch. It's my first time owning a managed switch, and I spent several hours figuring out how to configure its VLAN settings for my network.

I didn't found [TP-Link's VLAN documentation](https://www.tp-link.com/us/support/faq/2149/) lacking, so I'm writing my notes in case it helps others.

## My home network, before my managed switch

Before I got the managed switch, I was already using VLANs, but I connected them through an unmanaged switch, so it worked without having to configure anything.

The relevant network devices in this story are:

* My desktop PC, which should have full access to all VLANs
* My Proxmox server (TODO: link), which can tag certain VMs with VLAN tags
* My Ruckus WiFI access point, which hosts three WLAN networks with distinct VLANs
* A solar panel monitoring device, which required Internet access

## Why did the managed switch kill Internet only on WiFi?

A few minutes after installing the new managed switch, my fiance told me she lost Internet access. I checked my phone and saw the same thing.

The WiFi devices could all join the WiFi network, but the network didn't have Internet access. How could that be? I hadn't changed any of my firewall settings. I just added a new switch into my setup.

As a workaround, I reconfigured my network so that the WiFi AP didn't pass through the managed switch.

I only realized days later what the problem was. My managed switch was dropping all tagged packets. So traffic could get from WiFi devices to the AP, but the switch was dropping everything after that point.

## TP-Link's unfortunate VLAN web UI

When I first began configuring the VLANs on my TP-Link switch, I thought I was stupid for not understanding how VLANs work. I've since decided that TP-Link's GUI is terrible and overly complicated.

## My desired setup

### VLANs

* System: Default, no VLAN.
* VMs: For development virtual machines on my Proxmox network.
* Guests: For guests
* Purgatory: For IoT devices that require Internet access, but I don't want them to have anything else on my network.

### Rules

* Guests can access the print server.
* Purgatory can access the Internet but can't access any other internal networks outside of Purgatory.

## Tips for debugging VLAN issues

### Open up Wireshark

I tried a

The most useful tool I used was Wireshark. I'm normally reluctant to pull in Wireshark because it feels so heavyweight. It's dumping so much information, and I always hate having to re-learn the filter query language to get to something sensible.

For debugging VLANs, Wireshark ended up being incredibly helpful.

### Rebooting

I wish this wasn't the most reliable technique I found for resetting network state, but it was. It's a pain because it takes 30-90 seconds depending on what kind of system the host is running, so it's a slow test cycle. But it did, more than any other method, ensure that the system reset its network state in response to changes I made in VLAN configuration.

I'm sure there are better ways, but I didn't find them.

### `ifconfig`


### Other CLI tools

This command sequence is supposed to force the host to release its DHCP lease and request a new one:

```bash
dhclient -r
dhclient
```

These commands never worked for me
