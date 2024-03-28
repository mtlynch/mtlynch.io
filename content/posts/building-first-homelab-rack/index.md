---
title: "Building My First Homelab Server Rack"
date: 2024-04-12T00:00:00-05:00
tags:
  - homelab
---

Seven years ago, I built my [first home server](/building-a-vm-homelab-2017/). It greatly improved my software development workflows, so over the years, I've gotten more into the home server scene. I built [a custom storage server](/budget-nas/), [another development server](/building-a-vm-homelab/), and a dedicated firewall.

Over time, my wife grew concerned that my office was filling with unsightly wires. I thought, "What? This is a normal amount of wires." But then I realized it was kind of a lot of wires...

{{<gallery caption="My office, upon closer inspection, kind of had a lot of wires">}}
{{<img src="office-wires-1.webp" max-width="300px" alt="Photo of lots of wires in my office">}}
{{<img src="office-wires-2.webp" max-width="300px" alt="Photo of lots of wires in my office">}}
{{</gallery>}}

A lot of home server enthusiasts buy server racks, but I never thought of myself as a server rack guy. I wasn't _so_ into servers that I needed a whole rack; I just had a VM server here, a data server there. Maybe a few switches scattered around. Having a server rack felt like an admission that I wasn't just a casual home server guy, but an intense homelab maniac.

One day, I gave in and bought a rack. I'm now embracing being a homelab weirdo, and I'm better off for it. Having a server rack makes everything so much easier to work with, and it eliminated my sprawling mess of wires.

TODO: Photo of finished rack

## I don't want your life story &mdash; just show me the rack

If you want to skip the explanations and jump to my rack, click below.

## Table of contents

- [What's a homelab?](#)
- [Why build a server rack at home?](#)
- [Why this guide?](#)
- [Choosing a rack](#)
- [Choosing a network switch](#)
- [Choosing 10G NICs](#)
- [Choosing a UPS (battery backup)](#)
- [Choosing a power strip](#)
- [Choosing rack shelves](#)
- [Choosing a patch panel](#)
- [Choosing a Raspberry Pi rack mount](#)
- [Choosing Ethernet cables](#)
- [Choosing fiber cables](#)
- [What I already had](#)
- [How do I arrange components in a rack?](#)
- [My final rack setup](#)
- [Next steps in my rack](#)
- [Avoiding mistakes I made](#)
- [My life with a rack](#)

TODO: Finish table of contents

## What's a homelab?

"Homelab" is a colloquial term that's grown in popularity in the last decade.

A homelab is a place in your home where you can experiment with IT hardware or software that you'd typically find in an office or data center. It can serve as a practice environment for new professional skills, or it can just be a place to play with interesting technology.

## Why build a server rack at home?

If you've never played with servers, you might wonder why anyone would build put a bunch of them in their house, much less build a little shrine to house all of them.

Everyone has their own reasons for getting into homelab, but here's why I enjoy it:

- **Software development**: I use a dedicated server for virtual machines, so rebooting or upgrading my main workstation doesn't affect what's running on my server, and it's easy for me to spin up new experimental VMs.
- **Storage**: It's much more convenient having a huge amount of storage that all of my devices share rather than buying large hard drives for each device and scattering my data everywhere. The storage server uses ZFS, which reduces the risk of data corruption and can survive a hard drive failure without losing data.
- **Networking**: Building my own router with open-source software gives me more control over my network and saves me from running the buggy software that's in most consumer-grade routers.

## Why this guide?

### By a beginner for beginners

Even though I've been experimenting with homelab for the past few years, I still consider myself a beginner, and this is a beginner-level guide.

Most other homelab authors write like they're building their 20th rack. They don't explain their thought process for choosing components or why they rejected alternatives. They've been doing it so long that the decisions have become unconscious.

Because this is my first time building a server rack, I'm free from the [curse of knowledge](https://en.wikipedia.org/wiki/Curse_of_knowledge). I'm walking you through how I approached the process for the first time so that you can follow along.

### No conflict of interest

I'm not getting paid by anyone or receiving free products to write this post.

The uncomfortable truth about most homelab blog posts is that they're funded by affiliate links. That means if a reader purchases something through a link in the article, the author receives a commission.

Authors can still provide valuable information despite using affiliate links, but it creates a clear conflict of interest. If merchants are paying the author to link to their products, it incentivizes recommending expensive products and subpar merchants.

I write my blog out of vanity. My payment is hearing people tell me that they found the article interesting or useful.

My rack does contain a TinyPilot, a hardware device that [I created](/tinypilot/), but it doesn't affect any other hardware choice. I'll disclose my ownership of TinyPilot whenever it's mentioned.

## Choosing a rack

If you're building a server rack, it seems like the first thing you'd choose is the rack itself, but it's not that simple.

Selecting your rack is an iterative process. You can't decide what type of rack to buy until you know what will go into your rack. But knowing what type of racks are available also informs what components to buy.

Here's the process I followed to pick a server rack:

1. Browse racks casually to get a high-level view of pricing, features, and size options.
1. Make a rough list of components I want for my rack.
1. Calculate how much rack height and depth I'll need for those components.
1. Narrow the list of racks that meet my needs.
1. Repeat steps 2-4 until I've made a final selection.

### How many rack units?

Racks have capacity measured in rack units (RUs). A rack unit is 1.75".

TODO: Photo of 1U

Most network switches are 1U, battery backups are usually 2U, servers are typically 2U.

You don't want to buy too short a rack and run out of room for your components, but you also don't want a rack that's too tall and takes up a lot of space for no reason.

As you pick components, add up how many rack units they'll take up. Leave some extra buffer based on how much you might want to expand your rack in the next few years.

### How deep does it need to be?

Server racks vary in depth. Most server racks are designed for enterprise-grade servers, which are up to 50" long.

At work, my office has an HP ProLiant DL380 G7 server, and it's a huge hassle. It's 29" long and 50 lbs. It was a pain to mount, and it will be a pain when I need to sell it.

I have a relatively small home office, and I didn't want the rack server to dominate the space. For my home rack, I decided to limit myself to components that are shallow enough to only need front mounts.

I looked for racks that were at least 19" in depth. That gave me enough depth to mount rack shelves and front-mounted server chassis without taking up a lot of extra space.

### Does it need four posts or two?

Racks come in two different styles: two-post or four-post. On four-post racks, you can mount components to both the front and back.

If you plan to buy long, heavy servers, you definitely need to secure them from the front and back. If you want to minimize space, a two-post rack might be sufficient.

I only wanted front-mounting components, so I could have gotten away with two posts, but four posts felt a bit sturdier, so I figured why not.

### Does it need wheels?

Some server racks have wheels to allow you to move the entire structure around.

For me, wheels were a critical feature. I wanted to be able to clean behind the rack, so having wheels made it easy to move around for cleaning.

### Candidates

StarTech also has a good reputation and a decent website, so I just chose between different StarTech racks.

| Brand        | Model                                                                             | Min Depth | Max Depth | Height | Price    |
| ------------ | --------------------------------------------------------------------------------- | --------- | --------- | ------ | -------- |
| **StarTech** | [**4POSTRACK18U**](https://www.startech.com/en-us/server-management/4postrack18u) | 22"       | 40"       | 18U    | **$316** |

### Review: StarTech 4POSTRACK18U 18U rack

{{<img src="star-tech-rack.webp" max-width="400px">}}

- Grade: A

This rack is working out well. It feels sturdy, and the wheels make it easy to move around.

Assembly was straightforward. From start to finish, it took me about two and a half hours. One minor complaint is that none of the parts are labeled, but I could match them to the instructions based on shape.

The rack is depth-adjustable, and I chose the shallowest depth. The rack does have a design flaw in that the shortest depth makes some screw holes inaccessible. I worked around this by expanding the depth, screwing in the spots that are unreachable at shallow depth, then adjusting the depth back down.

The rack came with a grounding cable, but I can't figure out how to use it.

## Choosing a network switch

The networking switch ended up being the hardest decision of my whole rack.

Network switches get expensive fast, so I didn't want to spend $300 on something only to have to supplement it with another component or replace it later on.

### What speed do you need?

Unless you're buying something very exotic, the speeds available for a rack-mounted switch are:

- 1 Gbps
- 2.5 Gbps
- 10 Gbps

For as long as I can remember, I've had 1 Gbps Ethernet speed in my house, and that's been fine. I do most of my work online, so the bottleneck is almost always my ISP rather than my home network.

Lately, I've been finding that the bottleneck on my home storage server [is my 1 Gbps switch](/budget-nas/#performance-benchmarks), so I've been interested in a network upgrade.

Given that I've been fairly satisfied with 1 Gbps, I thought 10 Gbps would be an unnecessarily large jump. But the more I read about 2.5 Gbps hardware, the more complaints I saw that it's flaky and unreliable. The consensus seemed to be that it's just as hard to level up to 10 Gbps as it is to 2.5 Gbps, so you might as well go for 10 Gbps.

I did run into headaches, but I'll cover that more [below](#choosing-10g-nics).

{{<notice type="info">}}

**Gotcha**: If you see a 10G switch, check how many of the ports support 10G. Often a 10G switch will only offer 10G speeds on a subset of ports, and the rest will be 1 Gbps.

{{</notice>}}

### Managed or unmanaged network switch?

There are two kinds of network switches: managed or unmanaged.

- **Managed switches** allow you to configure rules and settings for your switch. The most common reason you'd want a managed switch is to create virtual networks (VLANs) to increase security on your network.

- **Unmanaged switches** offer no configuration. They're just dumb boxes that route network traffic. Any host connected to the switch can send network traffic to any other port on the switch.

Personally, I wanted a plain old unmanaged switch. I've never used a managed switch, and I didn't want a whole bunch of extra configuration to manage. I just wanted the network to work.

It turned out, none of the network switches that met my criteria were unmanaged, so I went with a managed switch. Once I got my managed switch, I found that it's pretty fun to have VLANs for different devices on my network. Now I want to configure VLANs for everything!

### PoE or standard Ethernet?

Certain low-power devices can run entirely from the power they draw from the Ethernet cable. This is called [power over Ethernet (PoE)](https://en.wikipedia.org/wiki/Power_over_Ethernet).

For example, my home WiFi access point, the [Ruckus R310](https://support.ruckuswireless.com/products/88-ruckus-r310) supports PoE, so it only needs only a single Ethernet cable for both power and network connectivity.

{{<img src="ruckus-r310.webp" max-width="400px" caption="My Ruckus R310 WiFi access point supports PoE, so it only needs a single Ethernet cable for both power and data.">}}

To power PoE devices, you'll either need a PoE-enabled networking switch.

The downside of PoE switches is that they consume more power and they're more expensive. If you buy a PoE switch but have no PoE devices, non-PoE devices will still work, but you're wasting money and power on features you can't use.

### How many ports do you need?

The next question in selecting a networking switch is how many Ethernet ports you need.

Obviously, you need at least as many ports as you have wired networking devices.

The harder question is figuring out how many extra ports to buy beyond your current needs. This is going to vary a lot depending on your needs and your plans for growing your homelab in the next few years.

You can buy additional switches later, but if you're buying an expensive switch, you don't want to have to just replace the entire thing in a couple years. And you don't want to lose another 1U of rack real estate to an additional switch when you could have bought a single switch with more ports.

I searched for switches that had a minimum of 2x my current wired devices. I currently have eight devices with Ethernet ports, so I looked for switches with at least 16 ports.

### Candidates

| Brand       | Model                                                                                                                             | Ports  | Speed                        | Managed | PoE    | Price       |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------- | ------- | ------ | ----------- |
| **TP-Link** | [**TL-SG3428X**](https://www.newegg.com/tp-link-tl-sg3428x-24-x-rj45-4-x-sfp/p/0XP-0054-00091?Item=0XP-0054-00091&SoldByNewegg=1) | **24** | **4x10Gbps 24x1Gbps**        | **Yes** | **No** | **$299.00** |
| Netgear     | [GS108LP](https://www.amazon.com/gp/product/B07G5XBM3V/ref=ppx_yo_dt_b_asin_title_o06_s00?ie=UTF8&th=1)                           | 8      | 1 Gbps                       | No      | Yes    | $91.72      |
| Qnap        | [QSW-1105-5T-US](https://www.newegg.com/qnap-qsw-1105-5t-us-5-x-rj45/p/N82E16833831027)                                           | 5      | 2.5 Gbps                     | No      | No     | $138.27     |
| TP-Link     | [Unnamed Chinese Model](https://www.aliexpress.us/item/3256804686136282.html)                                                     | 18     | 2x10 Gbps SFP+ 16 x 2.5 Gbps | No      | No     | $499.90     |
| Microtik    | [CRS305](https://www.amazon.com/MikroTik-CRS305-1G-4S-Gigabit-Ethernet-RouterOS/dp/B07LFKGP1L)                                    | 5      | 4x10 Gbps SFP+               | Yes     | No     | $157.72     |
| Microtik    | [CRS328-24P-4S+RM](https://mikrotik.com/product/crs328_24p_4s_rm#fndtn-gallery)                                                   | 28     | 4x10 Gbps SFP+ 24x1Gbps      | Yes     | Yes    | $490.50     |
| TP-Link     | [T1600G-28TS](https://www.amazon.com/TP-Link-Jetstream-24-Port-T1600G-28TS-TL-SG2424/dp/B016M1QTS2)                               | 24     | 4x10 Gbps SFP 24x1Gbps       | Yes     | No     | $299.00     |
| TP-Link     | [T1600G-28PS](https://www.amazon.com/TP-Link-JetStream-T1600G-28PS-24-Port-Gigabit/dp/B0196RGV50)                                 | 24     | 4x10 Gbps SFP 24x1Gbps       | Yes     | Yes    | $295.99     |
| TP-Link     | [T1700G-28TQ](https://www.amazon.com/TP-Link-JetStream-24-Port-Ethernet-T1700G-28TQ/dp/B01CHP5IAC)                                | 24     | 4x10 Gbps SFP 24x1Gbps       | Yes     | No     | $958.40     |

I've tried Microtik in the past, and I want to like them. They're a small, independent hardware company. And there are people who love their weird 90s style UI, but I found it confusing and difficult to navigate.

{{<img src="microtik-interface.webp" max-width="700px" has-border="true" caption="I want to like Microtik, but I can't get over their weird 90s-style admin UI">}}

I've had great experience with unmanaged TP-Link switches, so I felt good about the brand.

I almost went with [this 16 x 2.5 Gbps port TP-Link unit](https://www.aliexpress.us/item/3256804686136282.html), but it's only available from China, and it doesn't seem to have any US safety or compliance certification, so I decided not to risk it.

I considered the [TP-Link T1600G-28PS](https://www.amazon.com/TP-Link-JetStream-T1600G-28PS-24-Port-Gigabit/dp/B0196RGV50), which was like everything good about the [TL-SG3428X](https://www.newegg.com/tp-link-tl-sg3428x-24-x-rj45-4-x-sfp/p/0XP-0054-00091?Item=0XP-0054-00091&SoldByNewegg=1), except it _also_ had PoE. But I read several reviews that said the fans are loud, and I didn't want a noisy switch. I went with the TL-SG3428X and figured I could get a cheaper, silent unmanaged PoE switch, as I didn't actually need 24 PoE ports.

### Review: TP-Link TL-SG3428X

- Grade: B-

Overall, I like the TP-Link TL-SG3428X switch pretty well. It's silent, which is a big plus. I haven't had any issues with reliability.

My experience with the TP-Link web admin UI has been poor, but most networking admin interfaces are pretty weak. Some networking concepts are hard to represent in a web UI, but TP-Link has done a particularly bad job of it.

{{<img src="tp-link-web-ui.webp" max-width="650px" has-border="true" caption="This page in the TP-Link web UI shows which ports are members of the `Guest` VLAN, but it always takes me a few minutes to remember how to interpret the screen.">}}

It took me a long time to figure out [how to configure VLANs](/notes/debugging-vlans-tp-link/). I've seen how other [brands like QNAP represent VLAN controls](https://www.youtube.com/watch?v=XdqP14NclZ0), and I think they did a much better job than TP-Link.

### Review: Netgear GS116LP 16-Port unmanaged PoE switch

- Grade: A

I only have a handful of PoE devices, so I originally planned to power them with a small 5-port PoE switch on a shelf. But late last year, I began [prepping my work office for our move-out](/solo-developer-year-6/#close-the-tinypilot-office), and I decided to adopt the Netgear GS116LP switch that was installed there.

As an unmanaged switch, it does what I need. It powers my devices, it was easy to install, and it's silent.

In retrospect, I should have tried harder to find a single managed switch with PoE ports instead of having two separate switches. I'll elaborate more [below](#get-a-poe-enabled-switch-if-you-have-any-poe-components)

## Choosing 10G NICs

If you choose a 10G switch, your work isn't over. In order to achieve 10 Gbps speeds, you need a 10G Network interface controller (NIC) for each device you want to enjoy the 10G speed. A regular 1 Gbps NIC will still work with a 10G switch, but it will be limited to 1 Gbps Ethernet speeds.

I had a lot of trouble finding 10G NICs for my systems. I was able to get 10G working on my Windows desktop after a bit of tinkering, but I tested three different NICs on my TrueNAS storage server, and I couldn't get any of them to work.

- Mellanox ConnextX-3 CX311A
  - On my Windows desktop, the activity lights didn't flash at all, and Windows didn't recognize anything in the PCI slot.
  - I found a forum post where somemeone mentioned that switching to another PCI slot on their motherboard solved the problem. I was skeptical, but that fixed it.
  - My TrueNAS server couldn't recognize it, but it worked on my Windows desktop.
- Chelsio T520-LL-CR
  - Chelsio is one of the most common brands for TrueNAS servers, and [Serve the Home's buyer's guide](https://www.servethehome.com/buyers-guides/top-hardware-components-for-truenas-freenas-nas-servers/top-picks-freenas-nics-networking/) listed it as a recommended option
  - My TrueNAS server [couldn't recognize it](https://www.truenas.com/community/threads/no-success-with-three-different-10-gb-nics.111026/).
- Chelsio Dual Port T520-CR
  - My TrueNAS server [couldn't recognize this one, either](https://www.truenas.com/community/threads/no-success-with-three-different-10-gb-nics.111026/).

My best guess is that the issue is motherboard incompatibility. My TrueNAS server [uses a consumer-grade ASUS Prime A320I-K motherboard](/budget-nas/#motherboard), so it may not support these enterprise-oriented 10G NICs.

I'm planning to build a new storage server in the next few months, so I'll try a fancier motherboard to see if that lets me use one of the three spare 10G NICs I have lying around.

Currently, my Windows desktop can talk to my managed switch at 10 Gbps speeds, but it's limited to 1 Gbps bandwidth for everything else. If I need to click a checkbox on TP-Link's medicore web UI, I can do it at blazing 10 Gbps speeds.

## Choosing a UPS (battery backup)

When I lived in Manhattan, I'd experience around five power outages per year. They were all brief, but they were long enough to power cycle my computer.

To avoid surprise shutdowns, I bought a battery backup system, also known as an uninterruptible power supply (UPS). It was an APC BR1500G, and I've used that same battery backup for six years.

TODO: Photo

For short power outages, the battery saves me from any downtime. For extended outages, the battery gives me enough time to gracefully shutdown my systems to avoid data loss.

The downside of the battery backup is that it added a lot of cabling to my office. My desktop, servers, and router were all in different corners of my office, so big, unsightly power cables had to run all around my office to connect those components to the UPS.

### How much time do you need for a graceful shutdown?

For extended power outages, you'll need enough time to shut down your systems before they exhaust your UPS' battery. The amount of time you need depends on the size of your UPS' battery and the power draw of the systems attached to it.

I theoretically could have used my Kill-A-Watt to measure the wattage of each of my devices during normal operation and then used that to find a battery. I was too lazy for that level of rigor, so I estimated based on metrics from my previous UPS.

My APC UPS had a 865 W battery, and it reported 12 minutes of battery life while powering a desktop computer, a VM server, a storage server, a firewall, and a networking switch.

My old UPS now powers my desktop exclusively, so each UPS has a smaller load to support.

### Does it need to send alerts?

After I set up my rack, a co-worker mentioned that most modern UPS systems can send alerts to devices on the local network to tell them to shut down gracefully.

I actually never looked into that and didn't set that up.

TODO: Does my UPS support it?

For me, automating shutdowns from my UPS isn't worth the trouble, but you might choose differently if your systems are more sensitive to hard power cuts or if you're in an area where power outages are more frequent.

### Candidates

| Brand          | Model                                                                                                                               | Power  | Outlets | Price |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----- |
| **CyberPower** | [**CP1500PFCRM2U**](https://www.bhphotovideo.com/c/product/1709939-REG/cyberpower_cp1500pfcrm2u_cp15_1500va_100w_2u_rackmount.html) | 1000 W | 8       | $335  |
| Tripp Lite     | [SMART1500LCD](https://www.newegg.com/tripp-lite-smart1500lcd-5-15r/p/N82E16842111052)                                              | 900 W  | 8       | $298  |
| CyberPower     | [CPS1500AVR](https://www.newegg.com/cyberpower-cps1500avr/p/N82E16842102006)                                                        | 950 W  | 8       | $460  |
| CyberPower     | [OR700LCDRM1U](https://www.newegg.com/cyberpower-or700lcdrm1u/p/N82E16842102088)                                                    | 400 W  | 4       | $299  |

### Review: CyberPower CP1500PFCRM2U

- Grade: A

The LCD is user-friendly and has useful metrics about power consumption. You can also turns the display off to have fewer flashing lights on your rack.

It reports 30 minutes of battery life while powering a VM server, a storage server, a firewall, and a networking switch. The total power draw of all these systems in a typical workload is 200 W.

It's also completely silent, which I thought was a given for a battery backups, but it turns out it's not...

### Review: Tripp Lite SMART1500LCD

- Grade: D

The first UPS I purchased for my rack was the Tripp Lite SMART1500LCD, but it was incredibly noisy.

I didn't even realize battery backups could _be_ noisy. My APC UPS was completely silent except when it lost power and failed over to battery backup.

Not only was the Tripp Lite UPS the loudest thing in my rack, it was the loudest thing in my whole house. It was like constantly having a hair dryer running in my office. My wife could hear it from her office a floor away.

Did I just get a defective unit? Surely, a UPS can't be designed to be this loud all the time, right?

I reached out to Tripp Lite customer support with a video of the UPS' noise level. They said that it was working as intended, and it's supposed to be that loud.

I tried to get used to the noise, but it was so distracting that I gave up after day two.

To my surprise, I realized Newegg's return policy was "replacement only." I'd always had an easy return experience with Newegg so I didn't even think to check the return policy beforehand, but I guess they're more strict about these 29 lb units.

Fortunately, I asked Newegg customer service nicely for a refund, and they granted it, which is another reason I keep coming back to Newegg.

## Choosing a power strip

Even though my rack has a UPS with many power outlets, I find it useful to have a simple power strip as well.

Some of the components in my rack are non-essential and don't need to stay online during a power outage.

For example, I keep a little IoT device in my rack that [monitors performance of my solar panels](/notes/debugging-vlans-tp-link/#mistake-2-forgetting-to-add-my-router-to-the-vlan). That device is totally extraneous, so I'm fine if it goes offline during a power failure. In fact, I prefer it to go offline because I don't want to squander my limited battery life in an outage on a solar monitor.

### Candidates

Power strips are, frankly, not so exciting, so I didn't shop around very much. I just looked at two.

| Brand          | Model                                                                                                                  | Outlets | Price   |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| **Tripp Lite** | [**RS-1215-RA**](https://www.newegg.com/black-tripp-lite-12-outlets-power-strip/p/N82E16812120265?Item=9SIAFVF75F0869) | **12**  | **$78** |
| CyberPower     | [CPS1215RMS](https://www.newegg.com/cyberpower-cps1215rms-12-outlets-nema-5-15r/p/N82E16842102076)                     | 12      | $60     |

### Review: Tripp Lite RS-1215-RA

- Grade: B+

This power strip has worked well. The rear outlets are spaced apart so that brick-style power plugs still only take up one outlet.

The front outlets are all unused, but I find them useful occasionally if I have a device I want to test for a few hours, and I don't want to route it to the UPS or rear of the rack.

### Review: CyberPower CPS1215RMS

- Grade: C

I bought this power strip a few years ago for the TinyPilot office (TODO: link). My main issue is that the outlets are too close together. A lot of the things I plug in at the office are bricks, so they cover two outlets.

## Choosing rack shelves

Some of my existing office infrastructure has no rack mounting option, so I needed 2U of shelf space for:

- OPNsense firewall server (running on a Qotom mini PC)
- TinyPilot
- Dell Optiplex 7040 mini PC, which I use for testing

### Candidates

| Brand    | Model                                                                          | Price       |
| -------- | ------------------------------------------------------------------------------ | ----------- |
| Pyle     | [PLRSTN62U 19" 2U](https://pyleusa.com/products/plrstn62u)                     | $64 for two |
| StarTech | [CABSHELFV 2U 16"](https://www.startech.com/en-us/server-management/cabshelfv) | $88 for two |

### Review: Pyle PLRSTN62U rack shelves

- Grade: A

I had never heard of Pyle as a brand, but I found the shelves online, and they seemed like a match for what I wanted. They've worked out well.

They were easy to install, they're low in price, and they have a lip that prevents components from sliding off the rack.

### Review: StarTech CABSHELFV 2U rack shelves

- Grade: D

I originally purchased the StarTech shelves because StarTech has such a good reputation in the server world.

When I installed them into my rack, I thought I must be misunderstanding how they work. They have a bottom lip that bends downward into the next rack slot.

{{<img src="star-tech-shelf-lip.webp" max-width="600px" caption="StarTech shelves have a downward facing lip whose sole purpose seems to be messing up your rack layout.">}}

This downward lip forces you to either allocate 3U to each of your 2U shelves or shift everything down by 0.5U.

I couldn't even figure out a purpose for the lip. It would make sense if it curved up because that would protect items on the shelf from slipping off, but why bend down? It didn't look like it provided any structural support to the shelf either.

I scoured reviews of this shelf to see if anyone else was talking about this bizarre design choice. When other reviewers mentioned it, they didn't seem to mind that much. The comments had the tone of, "Oh, yeah, it extends past 2U a bit." I'm baffled that anyone would accept that.

{{<img src="3u-shelf.webp" has-border="true" caption="Reviewer acknowledgeds that StarTech's 2U rack shelf takes up 3U of space, still rates it 4 out of 5.">}}

I'm still trying to figure out if I'm crazy or if there's something I'm missing about why StarTech's downward-facing lips are a good idea. I promptly returned mine and bought the Pyle shelves instead.

## Choosing a patch panel

From reading a lot of homelab blog posts, I noticed a lot of other homelabbers integrating a patch panel into their racks.

When it came time to finally build my server rack, I finally had to ask the question that had been on my mind for years.

### What the heck is a patch panel?

Shopping around for patch panels made me even more confused. It's just a row of empty spaces? What's the point?

The concept didn't click for me until I built my rack. In short, the patch panel keeps the clutter of your networking cables behind your rack rather than in front of it.

TODO: Photo

{{<notice type="info">}}
**Tip**: I recommend having a patch panel adjacent to every switch in your rack.
{{</notice>}}

### Candidates

| Brand          | Model                                                                                                                      | Price |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- | ----- |
| NewYork Cables | [24-Port 1U](https://www.amazon.com/dp/B08LLDCRCV/ref=cm_sw_r_apan_glt_i_2AEKK799CAJQ591DCSWS?_encoding=UTF8&th=1)         | $19   |
| Tripp Lite     | [16-Port 1U](https://tripplite.eaton.com/16-port-1u-rack-mount-unshielded-blank-keystone-multimedia-patch-panel~N062016KJ) | $13   |

### Review: NewYork Cables 24-Port 1U Patch Panel

- Grade: B+

This works fine. At the end of the day, it's basically just a metal and plastic panel, so there's not much to do well or poorly. But it feels sturdy and installs into the rack well.

One of the reasons I chose the NewYork brand patch panel was that I saw in reviews it has a rear bar that helps support Ethernet cables. In my rack, the rear bar doesn't do anything. It's too close to the Ethernet ports to provide support, and they don't seem to need it anyway.

TODO: Show photos of rear

My one complaint is with the port labels. They're slips of paper under plastic, like a landline phone would have for speed dial in the 90s. Other patch panels have little whiteboard strips for easy erasing, and I prefer that style to strips of paper.

TODO: Photo of labels

### Review: Tripp Lite 16-port 1U Patch Panel

- Grade: A

As with the NewYork cables patch panel, it's fine, but there's not much to get excited about with patch panels.

TODO: Photo

I like that the labels are tiny whiteboards. I had whiteboard markers on hand, but they were too big to write in such tiny spaces, so I bought ultra fine-tip whiteboard markers (TODO: link), and those worked well.

TODO: Photo

## Choosing a Raspberry Pi rack mount

I do a lot of professional and hobby projects with the Raspberry Pi, a small, inexpensive single-board computer.

I'd seen rack mounts for the Raspberry Pi, so I thought it would be fun to add one to my rack. I didn't shop around for Pi racks, so I just bought the first one that looked decent.

| Brand     | Model                                                                                                                                                            | Price |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| UCTRONICS | [Ultimate Rack with PoE Functionality](https://www.uctronics.com/raspberry-pi/1u-rack-mount/raspberry-pi-4b-rack-mount-19-inch-1u-with-poe-and-oled-screen.html) | $190  |

### Review: UCTRONICS Ultimate Rack

- Grade: C+

The rack mount is okay, not great.

It's a decent value for the price. PoE HATs for a Raspberry Pi 4 are generally around $20, so getting four PoE HATs is already an $80 value. And then you're also getting the rack mount itself, four microSD extenders, four HDMI extenders, four OLED screens, and four fans.

The craftsmanship on the rack mount itself is mediocre. The pieces don't fit together that well. There are noticeable gaps around the HDMI and microSD ports.

{{<img src="uctronics-gaps.webp" max-width="400px" caption="The UCTRONICS Pi rack mount had significant gaps around the HDMI and microSD ports.">}}

The HDMI ports are also secured poorly to the mount. When I plug in an HDMI cable, the connector bends and strains. I worry they're going to snap off one day.

PoE tends to generate a lot of heat, so it's good that these come with an integrated fan, but they create a constant high-pitch whirring. I keep all the fans powered off. The Pis could overheat without the fans, but it just means the CPU throttles or shuts down, which isn't a big deal for my hobby projects.

The instructions are terrible. Step one is to screw in the OLED. Okay, that's fine. Step two is to screw in the power button. Sure, easy peasy. Step three is to put together the five remaining components simultaneously.

{{<img src="pi-rack-instructions.webp" max-width="700px" caption="The UCTRONICS Pi rack mount instructions rapidly increase in difficulty">}}

## Choosing Ethernet cables

If you're converting an existing setup to a server rack, you'll likely need new Ethernet cables. If you're including a patch panel, remember to buy short (6-12") cables (sometimes called "patch cables") to connect the patch panel to your switch.

You'll likely need a mix of different patch cable lengths. For example, on my rack, port 16 on my switch is just XX" from port 16 on my patchpanel, but port 1 on my switch is XX" from its corresponding patch panel port.

TODO: Photo

I bought 6", 12", and 3' Ethernet cables at a ratio of about 5:2:1.

Some people are creative and buy different colors to represent different functionality. I'm boring and just stuck with blue and black Ethernet cables because they look standard and proper to me.

## Choosing fiber cables

### Ethernet, DAC, or fiber?

If you're building a 1 Gbps network, you can just by regular RJ45 Ethernet cables and call it a day.

If you go above 1 Gbps speeds, you have to choose between Ethernet or fiber cables.

With Ethernet, it's pretty simple. Your Ethernet adapter has an Ethernet port, so you plug in an Ethernet cable. Easy peasy!

With fiber, cabling is more complicated.

A fiber networking device will have an SFP or SFP+ port, but there's no such thing as an SFP or SFP+ cable. You need to convert SFP/SFP+ to something else.

In my case, my network switch and 10G NICs all had SFP+ ports, so I knew the connections had to start and end with SFP+. That meant my connection would look like:

1. SFP+ port on my network swtich
1. SFP+ to _something_ Transceiver
1. _something_ cable
1. SFP+ to _something_ Transceiver
1. SFP+ port on my 10G NIC

I'd need to convert SFP+ to something else to connect the two ends. The options were:

1. RJ45 (Ethernet)
1. LC (Fiber)
1. DAC (Copper)

The connection had to run through my patch panel. I was able to find patch keys for Ethernet and fiber, but nothing for DAC. I still don't understand why DAC fiber keys don't exist or if I just am not seeing how to connect DAC through a patch panel.

That reduced my options to just to just RJ45 or LC.

### Ethernet vs. fiber

I couldn't find many practical differences between RJ45 and LC. LC is thinner, so I find it a bit more visually appealing. But it means a different type of cable than all my other components, which are Ethernet.

I was surprised at the difference in pricing between Ethernet and fiber. For the options I saw, SFP+ to RJ45 transceivers were significantly more expensive than SFP+ to fiber, but Ethernet cables are cheaper than fiber cables.

When I priced everything out, pricing was significantly better for fiber:

| Component                                                       | Ethernet price | Fiber price |
| --------------------------------------------------------------- | -------------- | ----------- |
| Three transceivers (for my switch, desktop, and storage server) | $150           | $60         |
| One 16' cable (desktop to switch)                               | $9             | $15         |
| One 3' cable (storage server to switch)                         | $7             | $10         |
| Two 7" patch cables                                             | $0\*           | $30         |
| Four patch keys                                                 | $0\*           | $19         |
| **Total**                                                       | **$163**       | **$134**    |

\* These effectively would cost no extra money because I had to buy these for the rest of the ports in my switch.

{{<notice type="info">}}

**Gotcha**: If you use fiber, make sure that all your SFP+ cables match in "mode." You [can't mix single-mode fiber with multimode fiber](https://community.fs.com/article/single-mode-cabling-cost-vs-multimode-cabling-cost.html).

{{</notice>}}

Here were the final components I chose:

## What I already had

### Router: Qotom Q355G4 with OPNsense

I built a router a few years ago. I bought a cheap Qotom Q355G4 unit from China and installed OPNsense.

### WiFi access point: Ruckus R310

This doesn't technically live in my rack, but it plugs in to my PoE switch. It's a nice access point, and it allows me to create multiple WiFi networks with different VLAN tags, so my guest WiFi has Internet access but can't reach any of my other devices.

### Out-of-band management: TinyPilot Voyager 2a PoE

{{<notice type="info">}}
**Full disclosure**: This is a product [I created](/tinypilot/) and now [sell](https://tinypilotkvm.com).
{{</notice>}}

I generally connect to components in my rack over SSH or web interfaces. In times where I need to reinstall an OS, change boot settings, or fix network settings, I need a tool that gives me control at a physical level.

Instead of having to drag a keyboard and monitor over to my rack, I can plug in my TinyPilot Voyager 2a when I need hardware-level access:

TODO: Screenshot

### Software testing: Dell Optiplex 7040 mini PC

TODO: Photo

For development work on TinyPilot, I often test changes against a real device, so I use this Dell mini PC as a spare device where I can blow away the OS or restart it frequently without disrupting any other work.

## How do I arrange components in a rack?

Once I selected my rack components, the next step was figuring out how to lay everything out. I tried to find guides for how you're supposed to do it, and I didn't find much guidance. Instead, I just reasoned out what made sense to me.

To plan the layout, I used a spreadsheet and color coded it. This was also helpful in thinking about what size rack to purchase. I wanted the rack to contain everything I wanted now plus a little room to grow.

{{<img src="rack-spreadsheet.webp" max-width="200px" has-border="true" caption="I considered different rack layouts by just swapping elements in a spreadsheet.">}}

### Place heavy components on the bottom of your rack

The one piece of guidance around server rack layouts that everyone seemed to agree on is that heavier components should go on the bottom.

The rack has a lot of expensive equipment. You don't want it to fall over and damage things or, worse, injure someone. So, you want it to have a low center of gravity to maximize stability.

The heaviest component in my rack by far is the UPS, weighing in at a whopping 27 lbs.

I haven't built my rack-mounted storage server yet, but I'm leaving space for it on the bottom, as it will be the next heaviest thing after the UPS, as disks are heavy.

Patch panels weigh almost nothing, and networking switches are fairly light as well. For this reason, most server racks keep these components in the top two slots of the rack.

### Keep components with front-facing connections close together

It wasn't obvious to me until I built my server, but it's important to closely arrange components that connect through front-facing ports. For example, my patch panel and networking switch go in adjacent rack slots because I'd otherwise have Ethernet cables stretched over other components in the rack.

### Rear cables don't matter so much

Some of the guidance I read said to arrange components so that you can minimize the length of your power cables. I didn't see the point.

Maybe minimizing cable length is important in a data center where you're replicating the same setup hundreds of times. In a home environment, I don't see the difference between connecting my server to my UPS with a 2 ft. power cable vs. a 4 ft. power cable.

## My final rack setup

| Component                       | Choice                                                                                                                                                                     | Price  | Satisfaction |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------ |
| Server rack                     | [StarTech 4POSTRACK18U](https://www.startech.com/en-us/server-management/4postrack18u)                                                                                     | $316   | A            |
| Network switch (managed)        | [TP-Link TL-SG3428X](https://www.newegg.com/tp-link-tl-sg3428x-24-x-rj45-4-x-sfp/p/0XP-0054-00091?Item=0XP-0054-00091&SoldByNewegg=1)                                      | $299   | C+           |
| Network switch (PoE, unmanaged) | [Netgear GS116LP](https://www.netgear.com/business/wired/switches/unmanaged/gs116lp/)                                                                                      | $139   | A            |
| UPS                             | [CyberPower CP1500PFCRM2U](https://www.bhphotovideo.com/c/product/1709939-REG/cyberpower_cp1500pfcrm2u_cp15_1500va_100w_2u_rackmount.html)                                 | $335   | A+           |
| Power strip                     | [Tripp Lite RS-1215-RA](https://www.newegg.com/black-tripp-lite-12-outlets-power-strip/p/N82E16812120265?Item=9SIAFVF75F0869)                                              | $78    | B+           |
| Rack shelves                    | [Pyle PLRSTN62U 19" 2U](https://pyleusa.com/products/plrstn62u)                                                                                                            | $64    | A            |
| Patch panel (24-port)           | [NewYork Cables 1U](https://www.amazon.com/dp/B08LLDCRCV/ref=cm_sw_r_apan_glt_i_2AEKK799CAJQ591DCSWS?_encoding=UTF8&th=1)                                                  | $19    | B+           |
| Patch panel (16-port)           | [Tripp Lite 1U](https://tripplite.eaton.com/16-port-1u-rack-mount-unshielded-blank-keystone-multimedia-patch-panel~N062016KJ)                                              | $13    | A            |
| Raspberry Pi rack mount         | [UCTRONICS Ultimate Rack with PoE Functionality](https://www.uctronics.com/raspberry-pi/1u-rack-mount/raspberry-pi-4b-rack-mount-19-inch-1u-with-poe-and-oled-screen.html) | $190   | C+           |
| **Total**                       |                                                                                                                                                                            | $1,453 |              |

And here were the smaller items:

| Component                                                                                               | Price |
| ------------------------------------------------------------------------------------------------------- | ----- |
| [Cable Matters SFP+ to LC Multi Mode Fiber Transceiver](https://www.amazon.com/dp/B07TTKHG6T/) (2-pack) | $40   |
| [Cat6 Keystone Coupler (25-pack)](https://www.amazon.com/dp/B075ZPGV1H)                                 | $23   |
| [Fiber LC coupler (5-pack)](https://www.amazon.com/dp/B01B5AG0TI)                                       | $19   |
| [LC to LC Fiber patch cables (0.2m)](https://www.amazon.com/dp/B08MCPBCFD)                              | $30   |
| [12" Ethernet Cables (10-pack)](https://www.amazon.com/dp/B07MVT1P2P/)                                  | $19   |
| [6" Ethernet Cables (25-pack)](https://www.amazon.com/dp/B00XIFJSEI)                                    | $34   |
| [16' Fiber Cable](https://www.amazon.com/dp/B00U7UP1UM/)                                                | $14   |
| [3' Fiber Cable](https://www.amazon.com/dp/B00T5796DQ/)                                                 | $10   |
| [NavePoint M6 cage nuts](https://www.amazon.com/gp/product/B0060RUVDS/)                                 | $16   |

TODO: Photos

## Next steps in my rack

### Rack-mounted server

You may have noticed that my server rack is conspicuously missing one common component: a server.

I still have my VM server and storage server that I rebuilt in the last few years. I'm planning to migrate them to rack-mounted chassis the next time I do some upgrades, but I've punted that task since building the rack was a significant enough project on its own.

### Are there hats for my rack?

One of the things I've been searching for without success is a "hat" for my rack. The top of my rack is just open space.

I'd love to find some top that fits securely into the open space on top of my rack and lets me put things on top of it. It would be convenient extra storage if I could find something sturdy and easy to remove, but I can't find anything like that.

If you know a solution to this, let me know, and I'll update the post.

## Avoiding mistakes I made

### Test the UPS before mounting it

The UPS was, by far, the hardest component to mount in the rack. I don't understand how people do it. It's about half the size and weight of a window air conditioner, but to install it, you one hand holding it perfectly level and another hand screwing it in. I eventually decided it was a two-person job and called my wife in for reinforcements.

But you don't want to go through all that work and find out, like I did, that the UPS is too loud to earn a permanent place in your rack. Or it could just be a dead device, and you don't want to find that out after you mount it.

So before you mount your UPS, remember to test it for functionality and noise before you go to the trouble of mounting it.

### Check UPS reviews for noise complaints

Some UPS devices are totally silent and some produce constant noise. If it's anywhere near you, take noise into consideration.

### Check return policies

I'd never seen anything on Newegg before that was replacement-only, so I took it for granted that I'd be able to return my UPS if I didn't like it. I was surprised to find it was a replacement-only item

Luckily, Newegg customer service was helpful and accepted the return for a refund.

### Get a PoE-enabled switch if you have any PoE components

Currently, I have 2U of network switches and 2U of patch panels, and I'm only using 11 of the 44 ports.

I regret not looking around more for a managed switch that supported PoE while still offering quiet operation. My ideal would be to have a fanless managed switch where at least eight of the ports have PoE and at least three have 10 Gbps speeds.

### Cage nuts aren't supposed to hurt

When you install components into your rack, you screw special cage screws through the mounting holes of whatever you're installing, and the cage screw goes into a cage nut.

Cage nuts have a clever design in that they clip into the rack. That way, you don't have to hold the nut in place while you're screwing the component into your rack.

TODO: Photo of properly installed cage nut

But... nobody told me about these clips. I thought cage nuts worked like other nuts where you just hold them behind the thing you're screwing into, and then you tighten it by hand.

TODO: Photo of how I was installing cage nuts

After installing about eight cage nuts, I cursed the stupidity of whoever decided to put sharp corners on a thing that required me to squeeze it between my fingertips. And then I realized I might be doing something wrong.

{{<notice type="info">}}
**Tip**: If you find yourself exerting a lot of force or feeling physical pain while building computer hardware, you're probably doing something wrong. Server equipment is designed so that middle-aged, out-of-shape IT people can build them, so you're not expected to be in peak physical condition.
{{</notice>}}

### Don't install patch keys backwards

I'm going to sound like a moron here, but I installed my patch panel keys incorrectly twice before I realized how to do it the correct way.

Now that I've seen the correct way, what I thought was correct before looks absurd, but it's my first rack!

So, my first attempt was like this:

{{<img src="key-wrong.webp" max-width="500px">}}

It fit snugly, and it was easy to plug Ethernet cables into it like that, so I thought that was right. But I quickly noticed it was popping out of the patch panel every time I removed an Ethernet cable.

"I must have done this backwards," I thought. So I plugged the keys in from the rear. It was tougher to get them in, but they stayed in place better.

{{<gallery caption="Embarrassingly, I thought this was how RJ45 patch keys were supposed to work for about six months.">}}
{{<img src="still-wrong1.webp" max-width="420px">}}
{{<img src="still-wrong2.webp" max-width="380px">}}
{{</gallery>}}

I had them like this for six months!

It wasn't until I bought my second patch panel and experimented with the keys that I realized there was a different method.

It turns out that the little ridge on the top isn't for decoration. The patch keys go in from the back and click in. You'll hear a little click when they slot into the correct position. The front face should be roughly flush with the front of the patch panel.

{{<gallery caption="Patch keys should be flush with the face of the patch panel, and their tabs click into place in the rear.">}}
{{<img src="patch-panel-correct-1.webp" max-width="380px">}}
{{<img src="patch-panel-correct-2.webp" max-width="380px">}}
{{</gallery>}}

### If the motherboard doesn't detect a 10G NIC, try a different PCI slot

When I installed my Mellanox 10G NIC into my desktop, Windows didn't detect it at all. I tried re-seating it, and I saw the same results. I tried downloading the latest drivers, but Windows still wasn't seeing the device at all in Device Manager.

Finally, I stumbled across a forum post where someone reported that their Mellanox card worked when they switched it to a different PCI slot. I tried a different PCI slot on my motherboard, and voila! It worked perfectly.

I still don't understand why the PCI slot mattered. According to my motherboard's documentation, the two PCI slots are supposed to be identical, but one worked, and the other didn't.

### Don't mix SFP+ multimode and single mode fiber cables

The first day that I installed my Mellanox NIC on my Windows desktop, everything worked fine.

24 hours of use, my desktop's Ethernet connection suddenly disconnecting and reconnecting every few seconds. I rebooted, and the problem went away.

A day later, the problem came back. I tried instead skipping the patch panel and connecting the cable from my desktop directly to the switch. That fixed the issue, which narrowed the problem to either the patch cable or the patch panel key.

Finally, I spotted it: my patch cables were SFP+ single mode, whereas my long fiber cables were SFP+ multimode. I didn't even know there was a difference in fiber cables, but apparently there is, and they don't get along.

{{<img src="single-mode-multi-mode.webp" max-width="400px" caption="TODO">}}

I bought a new set of SFP+ multimode fiber cables, and the problem went away. Unfortunately, I discovered the problem three days after the return window for my $70 box of SFP+ single mode fiber cables had closed.

## My life with a rack

I'm happy with my new rack, and I have no regrets about the investment. It definitely beats my old setup of having bits and pieces of infrastructure scattered around my office.

Now everything is in one location with clear organization. When people visit my house, I look like a kooky nerd rather than just a messy guy with cables everywhere.

I underestimated how nice it would be to have my TinyPilot physically close to all of my devices. Before the rack, I used to keep my TinyPilot on the floor next to my desk. If I ever needed to debug something on a server or a Raspberry Pi on the other side of my office, I avoided it because it involved shutting down the TinyPilot, disconnecting a lot of wires, then reconnecting them on the other side of the room.

With everything now physically adjacent, it's easy for me to quickly plug TinyPilot in to any misbehaving device for low-level access. It came in handy for things like [exploring NixOS](/notes/nix-first-impressions/) and figuring out [how to install NixOS on a Raspberry Pi](/nixos-pi4/).
