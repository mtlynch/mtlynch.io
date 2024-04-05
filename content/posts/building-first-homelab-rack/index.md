---
title: "Building My First Homelab Server Rack"
date: 2024-04-05T00:00:00-05:00
description: What I learned building a rack for my home server infrastructure.
tags:
  - homelab
images:
  - building-first-homelab-rack/og-cover.webp
---

Seven years ago, I built my [first home server](/building-a-vm-homelab-2017/). It made my software development work faster and more enjoyable, so I've gotten more into the home server scene. I built [a custom storage server](/budget-nas/), [another development server](/building-a-vm-homelab/), and a dedicated firewall.

At some point, my wife gently observed that my office was filling with unsightly wires. "What?" I asked. "This is a _normal_ amount of wires." But then I looked around and realized it was kind of a lot of wires...

{{<gallery caption="My office, upon closer inspection, kind of had a lot of wires">}}
{{<img src="office-wires-1.webp" max-width="350px" alt="Photo of lots of wires in my office">}}
{{<img src="office-wires-2.webp" max-width="350px" alt="Photo of lots of wires in my office">}}
{{</gallery>}}

A lot of home server enthusiasts buy server racks, but I never thought of myself as a rack guy. I wasn't _so_ into servers that I needed a whole rack; I just had a VM server here, a data server there. Maybe a few switches scattered around. Buying a rack meant admitting that I wasn't just a casual home server guy but an intense homelab weirdo.

One day, I gave in and bought a rack, and I'm better for it. It makes my servers more pleasant to work with and eliminates my sprawling mess of wires.

{{<img src="full-rack.webp" max-width="400px">}}

## I don't want your life story &mdash; just show me the rack

If you want to skip the explanations and jump to my rack, see [my final setup](#my-final-rack-setup) below.

## Table of contents

- [What's a homelab?](#whats-a-homelab)
- [Why build a server rack at home?](#why-build-a-server-rack-at-home)
- [Why this guide?](#why-this-guide)
- [Choosing a rack](#choosing-a-rack)
- [Choosing a network switch](#choosing-a-network-switch)
- [Choosing 10G NICs](#choosing-10g-nics)
- [Choosing a UPS (battery backup)](#choosing-a-ups-battery-backup)
- [Choosing a power strip](#choosing-a-power-strip)
- [Choosing rack shelves](#choosing-rack-shelves)
- [Choosing a patch panel](#choosing-a-patch-panel)
- [Choosing a Raspberry Pi rack mount](#choosing-a-raspberry-pi-rack-mount)
- [Choosing Ethernet cables](#choosing-ethernet-cables)
- [Choosing fiber cables](#choosing-fiber-cables)
- [What I already had](#what-i-already-had)
- [How do I arrange components in a rack?](#how-do-i-arrange-components-in-a-rack)
- [My final rack setup](#my-final-rack-setup)
- [Next steps in my rack](#next-steps-in-my-rack)
- [Avoiding mistakes I made](#avoiding-mistakes-i-made)
- [My life with a rack](#my-life-with-a-rack)

## What's a homelab?

"Homelab" is a colloquial term that's grown in popularity over the last decade.

A homelab is a place in your home where you can experiment with IT hardware and software that you'd typically find in an office or a data center. You can use it as a practice environment for new professional skills or as a place to play with cool technology.

## Why build a server rack at home?

If you've never worked with servers, you might wonder why anyone would keep a bunch of them in their house, much less build a little shrine for them.

Everyone has their own reasons for getting into homelab, but here are mine:

- **Software development**: I use a dedicated server for virtual machines, so rebooting or upgrading my main workstation doesn't affect what's running on my server. It's easy for me to spin up new experimental VMs that don't affect my other projects.
- **Storage**: It's more convenient to have a huge amount of storage that all of my devices share rather than buying large hard drives for each device and scattering my data everywhere. The storage server uses [ZFS](https://en.wikipedia.org/wiki/ZFS), which reduces the risk of data loss, even when a hard drive dies.
- **Networking**: Building my own router with open-source software gives me more control over my network and saves me from the buggy software that lives on most consumer-grade routers.

## Why this guide?

### By a beginner for beginners

Even though I've been experimenting with homelab for the past few years, this was my first time building a server rack, so this is a beginner-level guide.

Every other article I've read about server racks reads like someone explaining their 20th rack. They don't explain how they chose components or why they rejected alternatives. They've been doing it for so long that their decisions are unconscious.

Because this is my first time building a server rack, I'm free from the [curse of knowledge](https://en.wikipedia.org/wiki/Curse_of_knowledge). I'm walking you through how I approached this process for the first time.

### No conflict of interest

I'm not getting paid by anyone or receiving free products to write this post. I have no advertisers to satisfy or partnerships to maintain.

The uncomfortable truth about most homelab blogs is that they're funded by affiliate links. This means the author receives a commission when their readers purchase products through links in the article.

Authors can still provide valuable information while using affiliate links, and some of the best homelab bloggers fund their work that way. Nevertheless, affiliate links create a conflict of interest between the author and their readers. If merchants pay the author a percentage commission to link to their products, it incentivizes the author to recommend expensive products and subpar merchants.

I'm not claiming to be pure of heart or denouncing anyone who writes for money, but my incentives are more aligned with my readers'. I write my blog out of vanity &mdash; I like when people tell me that they find my posts interesting or useful. Writing out my thought process also helps me improve my approach and elicits useful feedback from readers.

My rack does contain a TinyPilot, a hardware device that [I created](/tinypilot/), but it doesn't affect my other choices. I'll disclose my relationship with TinyPilot whenever I mention it.

## Choosing a rack

If you're building a server rack, it seems like the first thing you'd choose is the rack itself. It's not that simple.

Selecting your rack is an iterative process. You can't decide what type of rack to buy until you know what components your rack will hold. But knowing what type of racks are available also informs what components to buy.

Here's the process I followed to pick a server rack:

1. Browse racks casually to get a high-level view of pricing, features, and size options.
1. Make a rough list of components I want for my rack.
1. Calculate how much rack height and depth I'll need for those components.
1. Narrow the list of racks that meet my needs.
1. Repeat steps 2-4 until I've made a final decision.

### How many rack units?

Racks have capacity measured in rack units (RUs). 1 rack unit is 1.75". You typically see racks sized as a number followed by a U, so an 8U rack would have eight RUs or 8 x 1.75" = 14" of height for components.

{{<img src="1ru.webp" max-width="600px">}}

If a component is designed to mount in a rack, its height will be some multiple of a rack unit. Most network switches are 1U, battery backups are usually 2U, and servers are typically 2U.

You don't want to buy too short a rack and run out of room for your components, but you also don't want an enormous rack that occupies more vertical space than you'd ever use.

As you pick components, add up how many rack units they'll need. Leave some extra buffer based on how much you want to expand your rack in the next few years.

### How deep does it need to be?

Server racks vary in depth. Most server racks are designed for enterprise-grade servers, which are up to 50" long.

At work, my office has an HP ProLiant DL380 G7 server, and it's a huge hassle. It's 29" long and weighs 50 lbs. It was a pain to mount and will be a pain when I sell it.

I have a relatively small home office, and I didn't want the rack server to dominate the space. For my home rack, I decided to limit myself to components that are shallow enough to only need front mounts.

I looked for racks that were at least 19" in depth. That gave me enough depth to mount rack shelves and front-mounted server chassis without taking up a lot of extra space.

### Does it need four posts or two?

Racks come in two different styles: two-post or four-post. On four-post racks, you can mount components to both the front and the back.

If you plan to buy long, heavy servers, you definitely need to secure them from both ends. If you want to minimize space, a two-post rack might be sufficient.

I only wanted front-mounting components, so I could have gotten away with two posts, but four posts felt a bit sturdier, so I figured why not.

### Does it need wheels?

Some server racks have wheels that move the entire structure around. Wheels were a critical feature for me, as I wanted to clean behind the rack easily.

### Candidates

StarTech is a popular brand for server racks. They have a good reputation and a decent website, so I chose between different StarTech racks.

| Brand        | Model                                                                             | Min Depth | Posts | Wheels | Height | Price    |
| ------------ | --------------------------------------------------------------------------------- | --------- | ----- | ------ | ------ | -------- |
| **StarTech** | [**4POSTRACK18U**](https://www.startech.com/en-us/server-management/4postrack18u) | 22"       | 4     | Yes    | 18U    | **$316** |
| StarTech     | [4POSTRACK15U](https://www.startech.com/en-us/server-management/4postrack15u)     | 22"       | 4     | Yes    | 15U    | $301     |
| StarTech     | [2POSTRACK16](https://www.startech.com/en-us/server-management/2postrack16)       | 12"       | 2     | No     | 16U    | $165     |

15U seemed like it would be enough, but the cost of 18U was so close that I figured I might as well get the extra 3U of space.

### Review: StarTech 4POSTRACK18U 18U rack

{{<img src="star-tech-rack.webp" max-width="400px">}}

- Grade: A

This rack is working out well. It feels sturdy, and the wheels make it easy to move around.

Assembly was straightforward. From start to finish, it took me about two and a half hours. One minor complaint is that none of the parts are labeled, but I could match them to the instructions based on shape.

The rack is depth-adjustable, and I chose the shallowest depth: 22". The rack does have a design flaw in that the shortest depth makes some screw holes inaccessible. I worked around this by expanding the depth, screwing in the spots that are unreachable at shallow depth, then adjusting the depth back down.

## Choosing a network switch

The networking switch ended up being the hardest decision of my whole rack.

Network switches get expensive fast, so I didn't want to spend $300 on something only to have to supplement it with another component or replace it later on.

### What speed do you need?

Unless you're buying something very exotic, the speeds available for a rack-mounted switch are:

- 1 Gbps
- 2.5 Gbps
- 10 Gbps

I've had 1 Gbps Ethernet speed in my house for the past 10+ years, and that's been fine. I do most of my work online, so the bottleneck was almost always my ISP rather than my home network.

Lately, I've been finding that the bottleneck on my home storage server [is my 1 Gbps switch](/budget-nas/#performance-benchmarks), so I've been interested in a network upgrade.

Given that I've been satisfied with 1 Gbps, I thought 10 Gbps would be an unnecessarily large jump. But the more I read about 2.5 Gbps hardware, the more complaints I saw that it's flaky and unreliable. The consensus seems to be that it's just as hard to level up to 10 Gbps as 2.5 Gbps, so you might as well go for 10 Gbps.

I did run into headaches, but I'll cover that more [below](#choosing-10g-nics).

{{<notice type="info">}}

**Gotcha**: If you see a 10 Gbps switch, check how many ports support 10 Gbps. Often, a 10 Gbps switch will only offer 10 Gbps speeds on a subset of ports, and the rest will be 1 Gbps.

{{</notice>}}

### Managed or unmanaged network switch?

There are two kinds of network switches: managed and unmanaged.

- **Managed switches** allow you to configure rules and settings for your switch. The most common reason you'd want a managed switch is to create virtual networks (VLANs) to increase security on your network.

- **Unmanaged switches** offer no configuration. They're just dumb boxes that route network traffic. Any host connected to the switch can send network traffic to any other port on the switch.

I wanted a plain old unmanaged switch. I've never used a managed switch, and I didn't want extra configuration to manage.

It turned out that none of the network switches that met my criteria were unmanaged, so I went with a managed switch. Once I got my managed switch, I found that it was pretty fun to have VLANs for different devices on my network. Now, I want to configure VLANs for everything!

### PoE or standard Ethernet?

Certain low-power devices can run entirely from the power they draw from the Ethernet cable. This is called [power over Ethernet (PoE)](https://en.wikipedia.org/wiki/Power_over_Ethernet).

For example, my home WiFi access point, the [Ruckus R310](https://support.ruckuswireless.com/products/88-ruckus-r310), supports PoE, so it only needs a single Ethernet cable for power and network connectivity.

{{<img src="ruckus-r310.webp" max-width="400px" caption="My Ruckus R310 WiFi access point supports PoE, so it only needs a single Ethernet cable for  power and data.">}}

To use PoE devices, you need a PoE-enabled networking switch.

The downside of PoE switches is that they consume more power and are more expensive. If you buy a PoE switch but have no PoE devices, non-PoE devices will still work, but you're wasting money and power on unnecessary features.

### How many ports do you need?

Obviously, your switch needs at least as many ports as you have wired networking devices.

The harder question is figuring out how many extra ports to buy beyond your current needs. The answer depends on your plans for growing your homelab in the next few years.

You can buy additional switches later, but if you're buying an expensive switch, you don't want to replace the entire thing in a couple of years. And you don't want to lose another 1U of rack real estate to an additional switch when you could have bought a single switch with more ports.

I currently have eight devices with Ethernet ports, so I looked for switches with at least 16 ports.

### Candidates

| Brand       | Model                                                                                                                             | Ports  | Speed                        | Managed | PoE    | Price       |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------- | ------- | ------ | ----------- |
| **TP-Link** | [**TL-SG3428X**](https://www.newegg.com/tp-link-tl-sg3428x-24-x-rj45-4-x-sfp/p/0XP-0054-00091?Item=0XP-0054-00091&SoldByNewegg=1) | **24** | **4x10Gbps 24x1Gbps**        | **Yes** | **No** | **$299.00** |
| Microtik    | [CRS328-24P-4S+RM](https://mikrotik.com/product/crs328_24p_4s_rm#fndtn-gallery)                                                   | 28     | 4x10 Gbps SFP+ 24x1Gbps      | Yes     | Yes    | $490.50     |
| TP-Link     | [Unnamed Chinese Model](https://www.aliexpress.us/item/3256804686136282.html)                                                     | 18     | 2x10 Gbps SFP+ 16 x 2.5 Gbps | No      | No     | $499.90     |
| TP-Link     | [T1600G-28TS](https://www.amazon.com/TP-Link-Jetstream-24-Port-T1600G-28TS-TL-SG2424/dp/B016M1QTS2)                               | 24     | 4x10 Gbps SFP 24x1Gbps       | Yes     | No     | $299.00     |
| TP-Link     | [T1600G-28PS](https://www.amazon.com/TP-Link-JetStream-T1600G-28PS-24-Port-Gigabit/dp/B0196RGV50)                                 | 24     | 4x10 Gbps SFP 24x1Gbps       | Yes     | Yes    | $295.99     |
| TP-Link     | [T1700G-28TQ](https://www.amazon.com/TP-Link-JetStream-24-Port-Ethernet-T1700G-28TQ/dp/B01CHP5IAC)                                | 24     | 4x10 Gbps SFP 24x1Gbps       | Yes     | No     | $958.40     |

I've tried Microtik in the past, and I want to like them. They're a small, independent hardware company. Some people love their weird 90s-style UI, but I found it confusing and difficult to navigate.

{{<img src="microtik-interface.webp" max-width="800px" has-border="true" caption="I want to like Microtik, but I can't get over their weird 90s-style admin UI">}}

I've had great experience with unmanaged TP-Link switches, so I felt good about the brand.

I almost went with [a 16 x 2.5 Gbps port TP-Link unit](https://www.aliexpress.us/item/3256804686136282.html), but it's only available from China, and it doesn't seem to have any US safety or compliance certification. I decided not to risk it.

I considered the [TP-Link T1600G-28PS](https://www.amazon.com/TP-Link-JetStream-T1600G-28PS-24-Port-Gigabit/dp/B0196RGV50), which had everything I liked about the [TL-SG3428X](https://www.newegg.com/tp-link-tl-sg3428x-24-x-rj45-4-x-sfp/p/0XP-0054-00091?Item=0XP-0054-00091&SoldByNewegg=1), except it _also_ had PoE. But I read several reviews that said the fans are loud, and I didn't want a noisy switch. I went with the TL-SG3428X and figured I could get a cheaper, silent unmanaged PoE switch, as I didn't need 24 PoE ports.

### Review: TP-Link TL-SG3428X

{{<img src="switch-patch-panel.webp" max-width="600px">}}

- Grade: B-

Overall, I like the TP-Link TL-SG3428X switch pretty well. It's silent, which is a big plus. I haven't had any issues with reliability. My experience with the TP-Link web admin UI has been poor, but that's about standard for networking hardware.

It took me a long time to figure out [how to configure VLANs](/notes/debugging-vlans-tp-link/). I've seen how other [brands like QNAP represent VLAN controls](https://www.youtube.com/watch?v=XdqP14NclZ0), and I think they did a much better job than TP-Link.

{{<img src="tp-link-web-ui.webp" max-width="650px" has-border="true" caption="This page in the TP-Link web UI shows which ports are members of the `Guest` VLAN, but it always takes me a few minutes to remember how to interpret the screen.">}}

### Review: Netgear GS116LP 16-Port unmanaged PoE switch

{{<img src="poe-switch.webp" max-width="600px">}}

- Grade: A

I only have a handful of PoE devices, so I originally planned to power them with a small 5-port PoE switch on a shelf. Late last year, I began [prepping my work office for our move-out](/solo-developer-year-6/#close-the-tinypilot-office), and I decided to adopt the Netgear GS116LP switch from there.

As an unmanaged switch, it does what I need. It powers my devices, it was easy to install, and it's silent.

In retrospect, I should have tried harder to find one managed switch with PoE ports instead of having two separate switches. I'll elaborate more [below](#get-a-poe-enabled-switch-if-you-have-any-poe-components).

## Choosing 10G NICs

If you choose a 10 Gbps switch, your work isn't over. To achieve 10 Gbps speeds, you need a 10G network interface controller (NIC) for each device you want to run at 10 Gbps speeds. A regular 1 Gbps NIC will still work with a 10 Gbps switch, but it will be limited to 1 Gbps Ethernet.

I had a lot of trouble finding 10G NICs for my systems. First, the market for 10G NICs is almost entirely enterprise-grade data centers, so they cost nearly $1k each. I was able to find used NICs for under $100, but I had to scour forum posts for reports of buying different NICs used.

I got a 10G NIC working on my Windows desktop after a bit of tinkering, but I tested three different NICs on my TrueNAS storage server, and I couldn't get any of them to work.

- Mellanox ConnextX-3 CX311A
  - On my Windows desktop, the activity lights didn't flash, and Windows didn't recognize anything in the PCI slot.
  - I found a forum post where someone mentioned that switching to another PCI slot on their motherboard solved the problem. I was skeptical, but that fixed it.
  - My TrueNAS server couldn't recognize it at all.
- Chelsio T520-LL-CR
  - Chelsio is one of the most common brands for TrueNAS servers, and [Serve the Home](https://www.servethehome.com/buyers-guides/top-hardware-components-for-truenas-freenas-nas-servers/top-picks-freenas-nics-networking/) listed it as a recommended option.
  - My TrueNAS server [couldn't recognize it](https://www.truenas.com/community/threads/no-success-with-three-different-10-gb-nics.111026/).
- Chelsio Dual Port T520-CR
  - My TrueNAS server [couldn't recognize this one, either](https://www.truenas.com/community/threads/no-success-with-three-different-10-gb-nics.111026/).

My best guess is that the motherbord on my TrueNAS server has limited compatibility. It's [a consumer-grade ASUS motherboard](/budget-nas/#motherboard), so it may not support these enterprise-oriented 10G NICs.

I plan to build a new storage server in the next few months, so I'll try a fancier motherboard to see if that lets me use one of the three spare 10G NICs I've now accrued.

Currently, the only 10 Gbps link in my network is between my Windows desktop and my managed switch. If I need to click a checkbox on TP-Link's crummy web UI, I can do it at blazing 10 Gbps speeds.

## Choosing a UPS (battery backup)

When I lived in Manhattan, I'd experience around five power outages per year. They were all brief, but they were long enough to power cycle my computer and lose my work.

To avoid surprise shutdowns, I bought a battery backup system, also known as an uninterruptible power supply (UPS). It was an [APC BR1500G](https://www.apc.com/us/en/product/BR1500G/apc-backups-pro-1500va-865w-tower-120v-10x-nema-515r-outlets-avr-lcd-user-replaceable-battery/), and I've used that same battery backup for six years.

{{<img src="apc-ups.webp" max-width="350px">}}

For short power outages, the battery saves me from any downtime. For extended outages, the battery gives me enough time to shut down my systems to avoid data loss.

The downside of the battery backup is that it added a lot of cabling to my office. My desktop, servers, and router were all in different corners of my office, so I had to run bulky, unsightly power cables everywhere.

### How much time do you need for a graceful shutdown?

For extended power outages, you'll need enough time to shut down your systems before they exhaust your UPS' battery. The amount of time you need depends on the size of your UPS' battery and the power draw of the systems attached to it.

I theoretically could have used my [Kill A Watt power meter](http://www.p3international.com/products/p4460.html) to measure the wattage of each of my devices during typical operation and then used that to find a battery. I was too lazy for that level of rigor, so I estimated based on metrics from my previous UPS.

My APC UPS had an 865 W battery, and it reported 12 minutes of battery life while powering a desktop computer, a VM server, a storage server, a firewall, and a networking switch, so I thought 800 W would be a good minimum for the battery.

### Does it need to send alerts?

After I set up my rack, a co-worker mentioned that most modern UPS systems can send alerts to devices on the local network to tell them to shut down gracefully.

For me, automating shutdowns from my UPS isn't worth the trouble, but you might choose differently if your systems are more sensitive to hard power cuts or if you're in an area where power outages are more frequent.

### Candidates

| Brand          | Model                                                                                                                               | Power  | Outlets | Price |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ----- |
| **CyberPower** | [**CP1500PFCRM2U**](https://www.bhphotovideo.com/c/product/1709939-REG/cyberpower_cp1500pfcrm2u_cp15_1500va_100w_2u_rackmount.html) | 1000 W | 8       | $335  |
| Tripp Lite     | [SMART1500LCD](https://www.newegg.com/tripp-lite-smart1500lcd-5-15r/p/N82E16842111052)                                              | 900 W  | 8       | $298  |
| CyberPower     | [CPS1500AVR](https://www.newegg.com/cyberpower-cps1500avr/p/N82E16842102006)                                                        | 950 W  | 8       | $460  |

### Review: CyberPower CP1500PFCRM2U

{{<img src="cyberpower-ups.webp" max-width="800px">}}

- Grade: A

The CyberPower LCD is user-friendly and has useful metrics about power consumption. You can also turn the display off to have fewer flashing lights on your rack.

The UPS reports 30 minutes of battery life while powering a VM server, a storage server, a firewall, and a networking switch. The total power draw of all these systems in a typical workload is 200 W.

CyberPower offers [PowerPanel Business](https://www.cyberpowersystems.com/products/software/power-panel-business/), a free management tool for controlling the UPS. To use it, you need to connect a computer to the UPS via a USB cable. It's the kind of thing a Raspberry Pi would be great for, but CyberPower sadly doesn't offer a way to install PowerPanel on ARM systems.

{{<img src="powerpanel-webui.webp" max-width="600px" has-border="true" caption="I rate CyberPower's UPS management software as &quot;okay.&quot;">}}

I played with PowerPanel for a few minutes, and I thought it was okay but unnecessary. The quality is what you'd expect from closed-source, vendor-specific hardware management software. The physical controls on the UPS are good enough for me.

PowerPanel can run custom scripts when the UPS loses power, so I could theoretically automate shutdowns of the devices in my rack, but it's not worth the trouble in my environment.

Another plus is that the UPS is silent, which I thought was a given for battery backups, but it turns out it's not...

### Review: Tripp Lite SMART1500LCD

{{<img src="tripp-lite-ups.webp" max-width="800px">}}

- Grade: D

The first UPS I purchased for my rack was the Tripp Lite SMART1500LCD, but it was incredibly noisy.

I didn't even realize battery backups could _be_ noisy. My APC UPS is silent except when it loses power and fails over to the battery.

Not only was the Tripp Lite UPS the loudest thing in my rack, it was the loudest thing in my whole house. It was like constantly having a hair dryer running in my office. My wife could hear it from her office a floor away.

Did I just get a defective unit? Surely, a UPS can't be designed to be this loud all the time, right?

I reached out to Tripp Lite customer support with a video of the UPS making noise. They said that it was working as intended.

I tried to get used to the noise, but it was so distracting that I gave up after day two.

To my surprise, Newegg's return policy for the UPS was "replacement only." I'd always had an easy return experience with Newegg so I didn't even think to check the return policy beforehand, but I guess they're more strict about these 29 lb units.

Fortunately, I asked Newegg customer service nicely for a refund, and they granted it, which is another reason I keep coming back to Newegg.

## Choosing a power strip

Even though my rack has a UPS with many power outlets, I find it useful to have a simple power strip as well.

Some of the components in my rack are non-essential and don't need to stay online during a power outage.

For example, I keep a little IoT device in my rack that [monitors the performance of my solar panels](/notes/debugging-vlans-tp-link/#mistake-2-forgetting-to-add-my-router-to-the-vlan). That device is totally extraneous, so I'm fine if it goes offline during a power failure. In fact, I prefer it to go offline because I don't want to squander limited battery capacity on a solar monitor.

### Candidates

Power strips are, frankly, not so exciting, so I didn't shop around very much. I just looked at two.

| Brand          | Model                                                                                                                  | Outlets | Price   |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| **Tripp Lite** | [**RS-1215-RA**](https://www.newegg.com/black-tripp-lite-12-outlets-power-strip/p/N82E16812120265?Item=9SIAFVF75F0869) | **12**  | **$78** |
| CyberPower     | [CPS1215RMS](https://www.newegg.com/cyberpower-cps1215rms-12-outlets-nema-5-15r/p/N82E16842102076)                     | 12      | $60     |

### Review: Tripp Lite RS-1215-RA

{{<img src="tripp-lite-strip.webp" max-width="800px" caption="Tripp Lite power strip">}}

- Grade: B+

This power strip has worked well. The rear outlets have wide enough spacing that brick-style power plugs don't block adjacent outlets.

Nothing in my rack plugs into the front outlets, but I occasionally find them useful when I have a device I want to test for a few hours.

### Review: CyberPower CPS1215RMS

- Grade: C

I bought this power strip a few years ago [for the rack at my work office](/retrospectives/2021/05/). My main issue is that the outlets are too close together. A lot of the things I plug in at the office have wide power bricks, so they cover two outlets.

## Choosing rack shelves

I already had a few [existing components](#what-i-already-had) from my pre-rack life that I planned to bring into my rack, so I needed at least 2U of rack shelves for those components.

### Candidates

| Brand    | Model                                                                          | Price       |
| -------- | ------------------------------------------------------------------------------ | ----------- |
| Pyle     | [PLRSTN62U 19" 2U](https://pyleusa.com/products/plrstn62u)                     | $64 for two |
| StarTech | [CABSHELFV 2U 16"](https://www.startech.com/en-us/server-management/cabshelfv) | $88 for two |

### Review: Pyle PLRSTN62U rack shelves

- Grade: A

I had never heard of Pyle as a brand, but I found these shelves online, and they've worked out well.

{{<img src="rack-shelves.webp" max-width="600px" caption="I keep non-mountable components on two 2U Pyle rack shelves.">}}

They're easy to install, decently priced, and they have a lip that prevents components from sliding off the shelf.

### Review: StarTech CABSHELFV 2U rack shelves

- Grade: D

I originally purchased the StarTech shelves because StarTech has such a good reputation in the server world.

When I installed them into my rack, I thought I must be misunderstanding how they work. They have a bottom lip that bends downward into the next rack slot.

{{<img src="star-tech-shelf-lip.webp" max-width="600px" caption="StarTech shelves have a downward-facing lip whose sole purpose seems to be messing up your rack layout.">}}

This downward lip forces you to either allocate 3U to each of your 2U shelves or shift everything down by 0.5U.

I couldn't even figure out a purpose for the lip. It would make sense if it curved up because that would protect items on the shelf from slipping off, but why bend down? It didn't look like it provided any structural support to the shelf, either.

I scoured reviews to see if anyone else was talking about this shelf's bizarre design choice. When other reviewers mentioned it, they didn't seem to mind. The comments had the tone of, "Oh, yeah, it extends past 2U a bit. Whatevs."

{{<img src="3u-shelf.webp" has-border="true" caption="Reviewer acknowledges that StarTech's 2U rack shelf takes up 3U of space, still rates it 4 out of 5.">}}

I'm baffled that anyone would accept a 2U shelf that takes up 3U of space. I promptly returned mine and bought the Pyle shelves instead.

## Choosing a patch panel

From reading homelab blogs over the years, I noticed a lot of other homelabbers integrating a patch panel into their racks.

When it finally came time to build my server rack, I had to ask the question that had been on my mind for ages.

### What the heck is a patch panel?

Shopping around for patch panels made me even more confused. It's just a row of empty spaces? What's the point?

The concept didn't click for me until I built my rack. In short, the patch panel keeps the clutter of your networking cables behind your rack rather than in front of it.

{{<img src="switch-patch-panel.webp" max-width="600px">}}

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

At the end of the day, a patch panel is just some metal and plastic, so there's not much to do well or poorly. But the NewYork model feels sturdy and installs into the rack well.

One of the reasons I chose the NewYork brand patch panel was that I saw reviews mention a rear bar that helps support Ethernet cables. In my rack, the rear bar doesn't do anything. It's too close to the Ethernet ports to provide support, and they don't seem to need it anyway.

{{<img src="panel-rear.webp" max-width="600px">}}

My one complaint is with the port labels. They're slips of paper under plastic, like a landline phone would have for speed dial in the 90s. Other patch panels have little whiteboard strips for easy erasing, and I prefer that style to strips of paper.

{{<img src="patch-panel-labels.webp" max-width="550px" caption="The labels on the NewYork patch panel are like the little speed dial labels that landline phones had in the 90s.">}}

### Review: Tripp Lite 16-port 1U Patch Panel

- Grade: A

As with the NewYork cables patch panel, the Tripp Lite model is fine, but there's not much to get excited about with patch panels.

{{<img src="tripp-lite-patch-panel.webp" max-width="600px">}}

I like that the labels are tiny whiteboards. I had whiteboard markers on hand, but they were too big to write in such tight spaces, so I bought [ultra fine-tip whiteboard markers](https://www.amazon.com/gp/product/B0C9WH9LPV/), and those worked well.

{{<img src="tripp-lite-labels.webp" max-width="600px" caption="The Tripp Lite patch panel features tiny labels you can write on with ultra fine-tip whiteboard markers.">}}

## Choosing a Raspberry Pi rack mount

I do a lot of professional and hobby projects with the Raspberry Pi, a small, inexpensive single-board computer.

I'd seen rack mounts for the Raspberry Pi, so I thought it would be fun to add one to my rack. I didn't feel like shopping around for Pi racks, so I just bought the first one that looked decent.

| Brand     | Model                                                                                                                                                            | Price |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| UCTRONICS | [Ultimate Rack with PoE Functionality](https://www.uctronics.com/raspberry-pi/1u-rack-mount/raspberry-pi-4b-rack-mount-19-inch-1u-with-poe-and-oled-screen.html) | $190  |

### Review: UCTRONICS Ultimate Rack

- Grade: C+

The rack mount is okay, not great.

It's a decent value for the price. PoE HATs for a Raspberry Pi 4 are generally around $20, so getting four PoE HATs is already an $80 value. And then you're also getting the rack mount itself, four microSD extenders, four HDMI extenders, four OLED screens, and four fans.

The craftsmanship on the rack mount itself is mediocre. The pieces don't fit together that well. There are noticeable gaps around the HDMI and microSD ports.

{{<img src="uctronics-gaps.webp" max-width="500px" caption="The UCTRONICS Pi rack mount had significant gaps around the HDMI and microSD ports.">}}

The HDMI ports are also secured poorly to the mount. When I plug in an HDMI cable, the connector bends and strains. I worry they're going to snap off one day.

PoE generates extra heat, so it's good that these come with an integrated fan, but they create a constant high-pitch whirring. I keep all the fans powered off. The Pi could overheat without the fan, but it just means the CPU throttles or shuts down, which isn't a big deal for my hobby projects.

The instructions are terrible. Step one is to screw in the OLED. Okay, that's fine. Step two is to screw in the power button. Sure, easy peasy. Step three is to put together the five remaining components simultaneously.

{{<img src="pi-rack-instructions.webp" max-width="700px" caption="The UCTRONICS Pi rack mount instructions rapidly increase in difficulty.">}}

## Choosing Ethernet cables

If you're converting an existing setup to a server rack, you'll likely need new Ethernet cables. For a patch panel, remember to buy short (6-12") cables (sometimes called "patch cables") to connect the patch panel to your switch.

You'll likely need a mix of different patch cable lengths. For example, on my rack, port 16 on my switch is just 1.5" from port 16 on my patch panel, but port 1 on my switch is 6" from its corresponding patch panel port.

{{<img src="switch-patch-panel-gap.webp" max-width="600px" caption="Consider that the distance between ports on your switch and patch panel may vary depending on the port layout of each component.">}}

I bought 6", 12", and 3' Ethernet cables at a ratio of about 5:2:1.

Some people are creative and buy different colors to represent different functionality. I'm boring and just stuck with blue and black Ethernet cables because they look standard and proper to me.

## Choosing fiber cables

### Ethernet, DAC, or fiber?

If you're building a 1 Gbps network, you can buy regular RJ45 Ethernet cables and call it a day.

If you go above 1 Gbps speeds, you have to choose between Ethernet and fiber cables.

With Ethernet, it's simple. Your Ethernet adapter has an Ethernet port, so you plug in an Ethernet cable. Easy peasy!

With fiber, cabling is more complicated.

A fiber networking device will have an SFP or SFP+ port, but there's no such thing as an SFP or SFP+ cable. You need to convert SFP/SFP+ to something else.

My network switch and 10G NICs all had SFP+ ports, so I knew the connections had to start and end with SFP+. That meant my connection would look like:

1. SFP+ port on my network switch
1. SFP+ to _something_ transceiver
1. _something_ cable
1. SFP+ to _something_ transceiver
1. SFP+ port on my 10G NIC

I'd need to convert SFP+ to something else to connect the two ends. The options were:

1. RJ45 (Ethernet)
1. LC (Fiber)
1. DAC (Copper)

The connection had to run through my patch panel. I found patch keys for Ethernet and fiber but nothing for DAC. I'm still unsure if DAC fiber keys don't exist or if there's some other way I'm missing to run them through a patch panel.

That reduced my options to just to just RJ45 or LC.

### Ethernet vs. fiber

I couldn't find many practical differences between RJ45 and LC. LC is thinner, so I find it a bit more visually appealing, but it means a different type of cable than all my other components, which are Ethernet.

I was surprised at the difference in pricing between Ethernet and fiber. SFP+ to RJ45 transceivers were significantly more expensive than SFP+ to fiber, but Ethernet cables are cheaper than fiber cables.

When I priced everything out, cost was significantly lower for fiber:

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

**Gotcha**: If you use fiber, make sure that your cables and transceivers match in "mode." You [can't mix single-mode fiber with multimode fiber](https://community.fs.com/article/single-mode-cabling-cost-vs-multimode-cabling-cost.html).

{{</notice>}}

I've included all the cables I purchased [below](#my-final-rack-setup).

## What I already had

### Router: Qotom Q355G4 with OPNsense

My home router is a cheap Qotom Q355G4 unit running OPNsense. It doesn't have rack mounts, so now it lives on its own dedicated rack shelf.

{{<gallery caption="My OPNsense firewall running on Qotom Q355G4 mini PC">}}
{{<img src="qotom-router.webp" max-width="520px">}}
{{<img src="opnsense-dashboard.webp" max-width="350px" has-border="true">}}
{{</gallery>}}

### WiFi access point: Ruckus R310

My access point doesn't technically live in my rack, but it plugs in to my PoE switch. It's a nice access point, and it allows me to create multiple WiFi networks with different VLAN tags, so my guest WiFi has Internet access but can't reach any of my other devices.

{{<gallery caption="My Ruckus R310 WiFi access point">}}
{{<img max-width="300px" src="ruckus-r310.webp">}}
{{<img max-width="315px" src="ruckus-dashboard.webp">}}
{{</gallery>}}

### Out-of-band management: TinyPilot Voyager 2a PoE

{{<notice type="info">}}
**Full disclosure**: TinyPilot is a product [I created](/tinypilot/) and now [sell](https://tinypilotkvm.com).
{{</notice>}}

I generally connect to components in my rack over SSH or web interfaces. When I reinstall an OS, change boot settings, or fix network settings, I need control at the physical level.

Instead of having to drag a keyboard and monitor over to my rack, I can plug in my TinyPilot Voyager 2a when I need hardware-level access:

{{<gallery caption="I use TinyPilot to get physical-level access to my homelab servers through the  browser.">}}
{{<img src="tinypilot-rack.webp" max-width="364px">}}
{{<img src="tinypilot-dell-bios.webp" max-width="400px">}}
{{</gallery>}}

### Software testing: Dell Optiplex 7040 mini PC

{{<img src="dell-mini-pc.webp" max-width="400px">}}

For development work on TinyPilot, I often test new software features by remotely controlling a real device. This Dell mini PC is a handy test device because I can frequently reboot it or blow away the OS without disrupting any other work.

## How do I arrange components in a rack?

Once I selected my rack components, the next step was figuring out how to lay everything out. I couldn't find established best practices for arranging components, so I just reasoned out what made sense to me.

To plan the layout, I used a spreadsheet and color-coded it. This was also helpful in thinking about what size rack to purchase.

{{<img src="rack-spreadsheet.webp" max-width="200px" has-border="true" caption="I considered different rack layouts by just swapping elements in a spreadsheet.">}}

### Place heavy components on the bottom of your rack

There was one rule everyone seemed to agree on: mount the heaviest components on the bottom.

The rack has a lot of expensive equipment. You don't want it to fall over and damage things or, worse, injure someone. So, you want it to have a low center of gravity to maximize stability.

The heaviest component in my rack, by far, is the UPS, weighing in at a whopping 27 lbs.

Patch panels weigh almost nothing, and networking switches are fairly light as well. For this reason, most server racks keep these components in the top two slots of the rack.

### Keep components with front-facing connections close together

It wasn't obvious until I built my server, but it's important to cluster components that connect through front-facing ports. For example, my patch panel and networking switch go in adjacent rack slots, because I'd otherwise have Ethernet cables stretched over other components in the rack.

### Rear cables don't matter so much

Some of the guidance I read said to arrange components so that you can minimize the length of your power cables. I didn't see the point.

Maybe minimizing cable length is important in a data center where you're replicating the same setup hundreds of times. In a home environment, I don't see the difference between connecting my server to my UPS with a 2 ft. power cable vs. a 4 ft. power cable.

## My final rack setup

{{<img src="full-rack.webp" max-width="800px">}}

{{<img src="rack-side.webp" max-width="800px">}}

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

And here are the smaller items:

| Component                                                                                              | Price |
| ------------------------------------------------------------------------------------------------------ | ----- |
| [Cable Matters SFP+ to LC multimode fiber transceiver (2-pack)](https://www.amazon.com/dp/B07TTKHG6T/) | $40   |
| [Cat6 keystone coupler (25-pack)](https://www.amazon.com/dp/B075ZPGV1H)                                | $23   |
| [Fiber LC coupler (5-pack)](https://www.amazon.com/dp/B01B5AG0TI)                                      | $19   |
| [12" Ethernet cables (10-pack)](https://www.amazon.com/dp/B07MVT1P2P/)                                 | $19   |
| [6" Ethernet cables (25-pack)](https://www.amazon.com/dp/B00XIFJSEI)                                   | $34   |
| [16' fiber LC mulitmode cable](https://www.amazon.com/dp/B00U7UP1UM/)                                  | $14   |
| [3' fiber LC multimode cable](https://www.amazon.com/dp/B00T5796DQ/)                                   | $10   |
| [8" fiber LC mulitmode patch cables (5-pack)](https://www.amazon.com/dp/B08MCPBCFD)                    | $30   |
| [NavePoint M6 cage nuts](https://www.amazon.com/gp/product/B0060RUVDS/)                                | $16   |

## Next steps in my rack

### Rack-mounted server

You may have noticed that my server rack is conspicuously missing one common component: a server.

I still have my pre-rack VM and storage servers. I'll migrate them to rack-mounted chassis the next time I do some upgrades, but I've punted that task since building the rack was a significant enough project on its own.

### Are there hats for my rack?

One of the things I've been searching for without success is a "hat" for my rack. The top of my rack is just open space.

I'd love to find a top that fits securely into the open space on top of my rack and lets me store things on it.

If you know a solution to this, let me know.

## Avoiding mistakes I made

### Test the UPS before mounting it

The UPS was, by far, the most difficult component to mount in the rack. I don't understand how people do it. It's about half the size of a window air conditioner, but to install it, you need one hand holding it perfectly level and another hand screwing it in. I eventually decided it was a two-person job and called my wife in for reinforcements.

You don't want to go through all the work of mounting a heavy UPS only to discover that it's unbearably loud. Or it could just be a dead device, and you don't want to find that out after you mount it.

### Check UPS reviews for noise complaints

Some UPS devices are totally silent, and some produce constant noise. If the UPS will be anywhere near you, take noise into consideration.

### Check return policies

I'd never seen anything on Newegg before that was replacement-only, so I took it for granted that I'd be able to return my UPS if I didn't like it.

Luckily, Newegg customer service was helpful and accepted the return for a refund, but I'll check proactively in the future.

### Get a PoE-enabled switch if you have any PoE components

Currently, I have 2U of network switches and 2U of patch panels, and I'm only using 11 of the 44 ports.

I regret not looking around more for a managed switch that supported PoE while still offering quiet operation. My ideal would be to have a fanless managed switch where at least eight of the ports have PoE and at least three have 10 Gbps speeds.

### Cage nuts aren't supposed to hurt

When you install components into your rack, you secure it to your rack using a cage screw and cage nut.

I thought cage nuts worked like all other nuts I've ever encountered &mdash; I hold them behind the thing I'm screwing into and then tighten the screw into the nut.

{{<img src="cage-nuts-wrong.webp" max-width="600px" caption="How I was incorrectly installing cage nuts">}}

After installing about eight cage nuts, I cursed the stupidity of whoever decided to put sharp corners on a thing that required me to squeeze it between my fingertips. And then I realized I might be doing something wrong.

{{<notice type="info">}}
**Tip**: If you find yourself exerting a lot of force or feeling physical pain while building computer hardware, you're probably doing something wrong. Server equipment is designed so that middle-aged, out-of-shape IT people can use it, so you don't need peak physical fitness.
{{</notice>}}

Cage nuts have a clever design in that they clip into the rack. That way, you don't have to hold the nut in place when screwing the component into your rack.

{{<img src="cage-nuts-right.webp" max-width="600px" caption="The correct way to install cage nuts is to let them clip in from behind the hole in the rack post.">}}

### Don't install patch keys backward

I'm going to sound like a moron here, but I installed my patch panel keys incorrectly twice before I realized how to do it correctly.

Now that I've seen the right way, what I thought was correct before looks absurd, but it's my first rack!

So, my first attempt was like this:

{{<img src="key-wrong.webp" max-width="400px">}}

It fit snugly, and it was easy to plug Ethernet cables into it, so I thought that was right. But almost every time I removed an Ethernet cable, the patch key popped out with it.

"I must have done this backward," I thought. So I plugged the keys in from the rear. It was tougher to get them in, but they stayed in place better.

{{<gallery caption="Embarrassingly, I thought this was how RJ45 patch keys were supposed to work for about six months.">}}
{{<img src="still-wrong1.webp" max-width="398px">}}
{{<img src="still-wrong2.webp" max-width="360px">}}
{{</gallery>}}

I had them like this for six months!

It wasn't until I bought my second patch panel and experimented with the keys that I realized there was a different method.

It turns out that the little notch on the top isn't for decoration. You'll hear a little click when the notch clicks into the correct position. The front face should be roughly flush with the front of the patch panel.

{{<gallery caption="Patch keys should be flush with the face of the patch panel, and their tabs click into place in the rear.">}}
{{<img src="patch-panel-correct-1.webp" max-width="380px">}}
{{<img src="patch-panel-correct-2.webp" max-width="380px">}}
{{</gallery>}}

### If the motherboard doesn't detect a 10G NIC, try a different PCI slot

When I installed my Mellanox 10G NIC into my desktop, Windows didn't detect it at all. I tried re-seating it, and I saw the same results. I tried downloading the latest drivers, but Windows didn't show the NIC in Device Manager.

Finally, I stumbled across a forum post where someone reported that their Mellanox card worked when they switched it to a different PCI slot. I tried a different PCI slot on my motherboard, and voila! It worked perfectly.

I still don't understand why the PCI slot mattered. According to my motherboard's documentation, the two PCI slots are supposed to be identical, but one worked, and the other didn't.

### Don't mix SFP+ multimode and single mode fiber cables

The first day that I installed my Mellanox NIC on my Windows desktop, everything worked fine.

After about 24 hours, my desktop's Ethernet connection suddenly began disconnecting and reconnecting every few seconds. I rebooted, and the problem went away.

A day later, the problem came back. I tried connecting the cable from my desktop directly to the switch, skipping the patch panel. That fixed the issue, which narrowed the problem to either the patch cable or the patch panel key.

Finally, I spotted it: my patch cables were single mode, whereas the rest of my system was multimode. I didn't even know there were different "modes" of fiber cables, but [apparently there are](https://community.fs.com/article/single-mode-cabling-cost-vs-multimode-cabling-cost.html), and they don't get along.

{{<img src="single-mode-multi-mode.webp" max-width="400px" caption="My network connection went into a reset loop every 24 hours because I accidentally used multimode patch cables in a single mode fiber system.">}}

I bought a new set of multimode fiber cables, and the problem went away. Unfortunately, I discovered the problem three days after the return window for my $70 box of single mode fiber cables had closed.

### Consider used equipment

One blind spot in this guide is that I didn't explore used equipment aside from the 10G NICs.

It's not exactly a mistake to buy new equipment, as I did it consciously and am happy with the choice. I optimized for time over money, and it's faster for me to search for components at retailers like Newegg rather than on marketplaces for used equipment like eBay, Facebook, or craigslist.

If you're willing to invest a bit more time, you can dramatically reduce the cost of your rack by finding used equipment.

## My life with a rack

I'm happy with my new rack and have no regrets about the investment. It definitely beats my old setup of having bits and pieces of infrastructure scattered around my office.

Now, everything lives in one efficient, organized location. When people visit my house, I look like a quirky nerd rather than a weird slob with cables everywhere.

I underestimated how nice it would be to have my TinyPilot physically close to all of my devices (disclosure again: TinyPilot is a product I created). Before the rack, I used to keep my TinyPilot on the floor next to my desk. There was a lot of friction in using it to fix server issues: I had to shut down the TinyPilot, disconnect a bunch of wires, reconnect it on the other side of the room, then undo everything after I was done.

With everything now physically adjacent, it's easy for me to quickly plug TinyPilot in to any misbehaving device for low-level access. It came in handy for things like figuring out [how to install NixOS on a Raspberry Pi](/nixos-pi4/) and upgrading my VM server to the latest version of Proxmox.
