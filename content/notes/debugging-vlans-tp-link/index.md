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

It's in terms of VLANs rather than ports. QNAP gives you a view of each port and you specify which VLANs the port is a member of. TP-Link shows you all your VLANs, and then you decide which ports should be a member of each VLAN.

To add confusion, there's also a "Port Config" tab that defines settings per port, but I'll get to that later.

## My desired setup

### VLANs

* System: Default, no VLAN.
* VMs: For development virtual machines on my Proxmox network.
* Guests: For guests
* Purgatory: For IoT devices that require Internet access, but I don't want them to have anything else on my network.

### Rules

* Guests can access the print server.
* Purgatory can access the Internet but can't access any other internal networks outside of Purgatory.

## How to apply VLAN settings on a TP-Link managed switch

There are two types of devices on your network, and you configure them for your VLAN differently.

1. VLAN-aware: Devices that send traffic with VLAN tags attached
    * Examples: Managed switches, high-end WiFi access points, VM servers
1. Non-VLAN-aware: Devices that just use basic networking and don't attach VLAN tags
    * Examples: Desktop computers, phones, printers

For devices in category (1)


## Tagged ports, untagged ports, and PVIDs

When you add a port to a VLAN as a **tagged port**, it tells the switch to allow packets into that port if the packet's VLAN tag matches the VLAN.

When you add a port to a VLAN as an **untagged port**, it tells the switch to **add** a

**PVID** means port VLAN identifier. The PVID is the VLAN tag that the switch adds to packets coming into the switch from that port..

### Examples

* Port 1 is in VLAN 10 as a tagged port.
  * The switch allows packets with a VLAN tag of 10 into port 1.
  * The switch does not deliver any packets with a VLAN tag of 10 are allowed into port 1.
* Port 2 is in VLAN 10 as an untagged port.
  * The switch allows packets with a VLAN tag of 10 into port 2.
  * The switch does not deliver any packets with a VLAN tag of 10 are allowed into port 2.

## What are PVIDs?



Annoyingly, TP-Link makes the untagged port and the PVID separate values, even though you'd 99% of the time want them to be equal. It makes no sense for

The PVID is the VLAN tag that the switch adds to incoming

https://mccollester.com/2022/05/25/the-difference-between-pvid-vs-untagged-vlans/
https://www.megajason.com/2018/04/30/what-is-pvid/

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

## Gotchas

* You specified an untagged port for a VLAN, but you forgot to also set the PVID for that port.

---


Router needs to be a member of every VLAN.

VLAN must contain:

* Tagged ports: Router, any VLAN-aware devices
* Untagged ports: Non-VLAN-aware devices

Port config: Any port that contains a non-VLAN-aware device

Port that contains tagged and untagged traffic from a VLAN aware device (e.g., wireless AP, another managed switch)

Untagged ports
Tagged ports
PVID
