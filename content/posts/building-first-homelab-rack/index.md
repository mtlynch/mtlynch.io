---
title: "Building My First Homelab Server Rack"
date: 2023-11-12T09:20:48-04:00
tags:
  - homelab
---

TODO: Table of contents

Six years ago, I built my [first home server](/building-a-vm-homelab-2017/). In a given week, I generally worked on four or five programming projects, and I was tired of restarting a bunch of services whenever I had to restart my main Windows desktop. I built a second PC running Linux, and I designated that as my home server. Whenever I wanted to do software development, I created a virtual machine on that server and accessed it remotely over SSH.

That first server served me well, so over the years, I've gotten more into the homelab scene and added custom NAS, firewall, and more advanced switches. And I work with Raspberry Pis so I had several Raspberry Pis everywhere.

My wife has expressed frustration at how I never clean certain parts of my office because of all the wires. I felt like, "It's not that many wires." And then I really looked and realized, it's kind of a lot of wires.

TODO: Photo of wires

## I don't want your life story &mdash; just show me the rack

If you want to skip the explanations and jump to my rack, click below.

## But I'm not a server rack guy

I had never considered buying a rack. I didn't think I was that seriously into homelab. I had some components, but there was just a VM server here, a data server there. A few switches scattered around.

People with server racks just felt way more intense than I was. They were building 50 TB backup servers, and I was just a mild homelab person.

But then I realized that if I bought a rack, it would consolidate a lot of the equipment I had around my office into one space. My wife was also happy about the idea of almost all the wires living in one self-contained unit.

## Why build a server rack at home?

### What's a homelab?

"Homelab" is a colloquial term that's grown in popularity in the last few years.

A homelab is a place in your home where you can experiment with IT hardware or software that you'd typically find in an office or data center. It can serve as a practice environment for new professional skills, or it can just be a place to play with interesting technology.

## Why this guide?

I'm a beginner, so I don't have the curse of knowledge.

This is not affiliate spam. Some are honest, but all of them are inherently biased. They have a vested interest in you purchasing more expensive gear because they make more money that way. They also have an interest in directing you to merchants

The first issue with a lot of guides to building any kind of home server equipment is that the author is almost always an affiliate partner. There's nothing inherently wrong with affiliates, but they have a bias. They make money when you buy through their links. That means that they have incentive to push you toward more expensive equipment. That's not to say that they're dishonest or that they only care about money, but they care

I'm writing this out of vanity. I do have financial interest in that I sell a product that's in the homelab space, but I've been writing homelab posts long before that.

They don't explain their thought process or why they rejected alternatives. They just say that they chose X component, and it's a great component, and you should buy it too.

## Choosing a rack

Obviously, if you're going to build a server rack, it seems like the first thing you'd decide is which rack to buy.

It's not that simple.

Choosing a rack is an iterative process. First, you need to understand what the options are, then you need to figure out what you'd like to put in the rack now and in the future, then you need to buy.

### How many rack units?

Racks have capacity measured in rack units (RUs). A rack unit is XX ".

The taller the rack, the more vertical space it takes up.

### How deep does it need to be?

Depth also has a huge impact on how much space it takes up. I have a relatively small office. I didn't want the rack server to dominate the space.

I looked at small rack-mountable chassis for servers, and the smallest ones were about XX" in depth, so I set that as my minimum.

### Does it need four posts or two?

Some racks are smaller

If you buy data center style servers, they're XX" to XX" long, so you definitely need to secure them from the front and back.

I have one of those servers at my office, and it's a huge hassle. It's very heavy and hard to move around. I decided that all the components in this rack would be small and require only front mounts.

Still, four posts feels sturdier, so I figured why not.

### Does it need wheels?

For me, wheels were a critical feature. I wanted to be able to clean behind the rack, so having wheels made it easy to move around for cleaning.

### Candidates

- **StarTech XX 18U rack**

I have a StarTech rack at my office. It's nothing exciting, but it does what it's supposed to do. It was striaghtforward to assemble, it feels sturdy, and the wheels make it easy to move around. StarTech also has a good reputation and a decent website, so I just chose between different StarTech racks.

### Review: StarTech XX 18U rack

I'm happy with the choice.

Assembling the rack was pretty straightforward. From start to finish, it took me about two and a half hours. One minor complaint is that none of the parts are labeled. The parts are distinctively shaped enough that you can match the part in the instructions to the part sitting in front of you.

The rack is depth-adjustable, and I chose the shallowest depth. But one design flaw is that when the rack is adjusted to that depth, the adjustable bridge between the back and front blocks some screw holes for the casters and other parts of the rack. The workaround was that I expanded the depth, finished screwing the casters and the base, then adjusted the depth back down. Not a huge deal, but it was an annoying design flaw.

The rack came with a grounding cable, but I can't figure out how to use it.

## Choosing a network switch

The hardest choice for me in building my server rack was picking a network switch. Network switches get fairly pricey, so I didn't want to spend $300 on something only to have to supplement it with another component or replace it later on. And rack space is precious, so I don't want to buy a switch and then have to buy another one in a year or two and totally rearrange my rack.

### What speed do you need?

Every rack-mountable switch you can find on the market is going to support gigabit Ethernet (1 Gbps bandwidth). But there's also 2.5 Gbps, 10 Gbps, and even higher.

For as long as I can remember, I've just had 1 Gbps Ethernet speed, and that's been fine. I do most of my work online, so the bottleneck is almost always my ISP rather than my home network.

But lately, I've been pushing the limits on my home storage server, and I've thought it would be nice to bump up the speeds.

The next steps up are either 2.5 Gbps or 10 Gbps. Given that I've been fairly satisfied with 1 Gbps, I thought 10 Gbps would probably be too big a jump, so I might as well take a smaller step to 2.5 Gbps.

But the more I read about 2.5 Gbps gear, the more complaints I saw that it's flaky and unreliable. The consensus seemed to be that it's just as hard to make the switch to 10 Gbps, but you'll have fewer headaches later. So, I thought, fine! I'll do 10 Gbps.

I did run into headaches, but I'll cover that more below (TOOD: link)

{{<notice type="info">}}

**Gotcha**: If you see a 10G switch, check how many of the ports support 10G. Often a 10G switch will only offer 10G speeds on a subset of ports, and the rest will be 1 Gbps.

{{</notice>}}

### Managed or unmanaged network switch?

There are two kinds of network switches you can purchase: managed or unmanaged.

**Unmanaged switches** offer no configuration. They're just dumb boxes that route network traffic. Any host connected to the switch can send network traffic to any other port on the switch.

**Managed switches** allow you to add advanced configuration. The most common use for a managed port is to create virtual networks (VLANs)

Personally, I wanted a plain old unmanaged switch. I've never used a managed switch, and I didn't expect to have a use for it. I have an opnsense firewall with four Ethernet ports, and I could have been using that device at any point to create VLANs, and I never did. So why would I start now?

But I actually couldn't find any unmanaged network switches that met my criteria, so I went with a managed switch. I planned to just leave all the basic options and not configure VLANs, but once I got it, I found that it's pretty fun to configure VLANs, and now I want to configure VLANs for everything.

### PoE or standard Ethernet?

The other major choice in networking switchies is whether you want power over Ethernet (PoE) or just plain old Ethernet.

Certain low-power devices can run entirely from power they draw from the Ethernet cable. For example, my home WiFi access point, the Ruckus RXX (TODO: link) supports PoE, so my access point conveniently needs only a single cable for both power and network connectivity. And I have PoE HATs for my Raspberry Pis, which enables them to run without a dedicated USB-C power cable.

So if you have PoE devices or you may purchase some in the future, you may want a PoE switch. And then the other question is how many PoE devices do you need to support? Most PoE switches only support PoE on a subset of their ports (TODO: is this true), so make sure your switch has enough PoE ports for your devices now and in to the future.

The downside of PoE switches is that they consume more power and they're more expensive (TODO: check). If you buy a PoE switch but have no PoE devices, you're wasting money and power on features you can't use.

I've also seen reviews that claim PoE switches are noisier. I haven't experienced this, but it's something to look out for, as all my switches have been silent and fanless.

### How many ports do you need?

The next question in selecting a networking switch is how many Ethernet ports you need.

Obviously, you need at least as many ports as you have wired networking devices.

The harder question is figuring out how many extra ports to buy beyond your current needs. This is going to vary a lot depending on your needs and your plans for growing your homelab in the next few years.

You can buy additional switches later, but if you're buying an expensive switch, you want it to cover you for the next few years.

I set my minimum to be 2x my current networking hosts. I currently have eight wired networking devices, so I looked for switches with at least 16 ports.

### Ethernet, DAC, or fiber?

If you're just getting 1 Gbps speeds, you can just move forward

### Candidates

| Brand       | Model                                                                                                                             | Ports  | Speed                        | Managed | Rackmount | PoE    | Price       | Notes                       |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------- | ------- | --------- | ------ | ----------- | --------------------------- |
| **TP-Link** | [**TL-SG3428X**](https://www.newegg.com/tp-link-tl-sg3428x-24-x-rj45-4-x-sfp/p/0XP-0054-00091?Item=0XP-0054-00091&SoldByNewegg=1) | **24** | **4x10Gbps 24x1Gbps**        | **Yes** | **Yes**   | **No** | **$299.00** |                             |
| Netgear     | [GS108LP](https://www.amazon.com/gp/product/B07G5XBM3V/ref=ppx_yo_dt_b_asin_title_o06_s00?ie=UTF8&th=1)                           | 8      | 1 Gbps                       | No      | Yes       | Yes    | $91.72      |                             |
| Qnap        | [QSW-1105-5T-US](https://www.newegg.com/qnap-qsw-1105-5t-us-5-x-rj45/p/N82E16833831027)                                           | 5      | 2.5 Gbps                     | No      | Yes       | No     | $138.27     |                             |
| TP-Link     | [no model name](https://www.aliexpress.us/item/3256804686136282.html)                                                             | 16     | 2x10 Gbps SFP+ 16 x 2.5 Gbps | No      | Yes       | No     | $499.90     | Chinese, no warranty for US |
| Microtik    | [CRS305](https://www.amazon.com/MikroTik-CRS305-1G-4S-Gigabit-Ethernet-RouterOS/dp/B07LFKGP1L)                                    | 5      | 4x10 Gbps SFP+               | Yes     | No        | No     | $157.72     |                             |
| Microtik    | [CRS328-24P-4S+RM](https://mikrotik.com/product/crs328_24p_4s_rm#fndtn-gallery)                                                   | 28     | 4x10 Gbps SFP+ 24x1Gbps      | Yes     | Yes       | Yes    | $490.50     | Hate Microtik UI            |
| TP-Link     | [T1600G-28TS](https://www.amazon.com/TP-Link-Jetstream-24-Port-T1600G-28TS-TL-SG2424/dp/B016M1QTS2)                               | 24     | 4x10 Gbps SFP 24x1Gbps       | Yes     | Yes       | No     | $299.00     | Old?                        |
| TP-Link     | [T1600G-28PS](https://www.amazon.com/TP-Link-JetStream-T1600G-28PS-24-Port-Gigabit/dp/B0196RGV50)                                 | 24     | 4x10 Gbps SFP 24x1Gbps       | Yes     | Yes       | Yes    | $295.99     | Reviews say fans are loud   |
| TP-Link     | [T1700G-28TQ](https://www.amazon.com/TP-Link-JetStream-24-Port-Ethernet-T1700G-28TQ/dp/B01CHP5IAC)                                | 24     | 4x10 Gbps SFP 24x1Gbps       | Yes     | Yes       | No     | $958.40     |                             |

### Review: TP-Link

TP-Link won't let you change the admin user from "admin"
Pretty confusing interface.

Took forever to [get VLANs right](/notes/debugging-vlans-tp-link/).

I wish I had chosen PoE support.

## Choosing 10G NICs

If you choose to get a 10G switch, your work isn't over. Because now you have to buy 10G networking adapters for all the systems you want to enjoy 10G speeds.

Michael Stapelberg is an excellent blogger, and he's my idol in terms of maximizing network speed in his house. He was homelab blogger I saw who explained how he upgraded his entire house to 10G and got a 10G link to the Internet too.

Michael Stapelberg uses Mellanox (TODO: link), so I figured that it would be good enough for me.

## Choosing a UPS (battery backup)

When I lived in Manhattan, I'd experience around five power outages per year. They were all brief, but they were long enough to reboot my computer, so I bought a battery backup system.

### Does it need to send alerts?

After I set up my rack, I was talking to a co-worker who mentioned that most modern UPS systems can send alerts to devices on the local network to tell them to shut down gracefully.

I actually never looked into that and didn't set that up.

TODO: Does my UPS support it?

In my experience over the past five years, extended power outages are rare. There have only been three that lasted longer a minute, and in all but one case, I was at home and able to just walk over to my desk and manually shut down my machines.

For me personally, automating shutdowns from my UPS isn't worth the trouble, but you might choose differently if your systems are more sensitive to hard power cuts or if you're in an area where power outages are more frequent.

### How much time do you need for a graceful shutdown?

If your power outage lasts longer than the UPS' battery, then you'll need to gracefully shut down all your systems to avoid losing unsaved data and to limit the risk of filesystem corruption.

I theoretically could have used my Kill-A-Watt to measure the wattage of each of my devices during normal operation and then used that to find a battery, but I was too lazy for that level of rigor. Instead, I estimated based on my previous UPS.

My previous UPS had a XX battery and it reported 12 minutes of battery life while powering a desktop computer, a VM server, a storage server, a firewall, and a networking switch.

The UPS I ended up buying has a XX battery, and it reports 30 minutes of battery life while powering a VM server, a storage server, a firewall, and a networking switch (my old UPS now powers my desktop exclusively).

### Candidates

| Brand          | Model                                                                                                                               | Power   | Outlets | Price   |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | ------- |
| **CyberPower** | [**CP1500PFCRM2U**](https://www.bhphotovideo.com/c/product/1709939-REG/cyberpower_cp1500pfcrm2u_cp15_1500va_100w_2u_rackmount.html) | 1500 VA | 8       | $334.95 |
| Tripp Lite     | [SMART1500LCD](https://www.newegg.com/tripp-lite-smart1500lcd-5-15r/p/N82E16842111052)                                              | 1500 VA | 8       | $298.00 |
| CyberPower     | [CPS1500AVR](https://www.newegg.com/cyberpower-cps1500avr/p/N82E16842102006)                                                        | 1500 VA | 8       | $459.95 |
| CyberPower     | [OR700LCDRM1U](https://www.newegg.com/cyberpower-or700lcdrm1u/p/N82E16842102088)                                                    | 700 VA  | 4       | $299.00 |

### Review: Tripp Lite SMART1500LCD

I originally purchased the Tripp Lite SMART1500LCD, but it was incredibly noisy.

I didn't even realize battery backups could _be_ noisy. I had my previous APC battery backup for XX years, and it's completely silent except when it loses power and fails over to battery backup.

The Tripp Lite UPS was instantly the loudest thing in my rack, maybe the loudest thing in my whole house. It was like a hair dryer running on low. My wife could hear it in my office from our bedroom upstairs.

I thought maybe it was defective, so I reached out to Tripp Lite and sent them a video, and they said that it was working as intended.

I considered just dealing with it, but it was so painfully loud that I decided I couldn't keep it.

To my surprise, I realized Newegg's return policy was "replacement only." I'd always had an easy return policy with Newegg so I didn't even think to check. Fortunately, I begged them, and they refunded me.

### Review: CyberPower CP1500PFCRM2U

When I realized the Tripp Lite UPS was a no-go, I ordered the other UPS I considered: the CyberPower CP1500PFCRM2U.

The first thing I did was turn it on and listen for noise. Nothing! It was completely silent. It makes a noise when there's a power outage and it cuts over to battery, but that's fine.

I really like the CyberPower UPS. It has a nice display, user-friendly.

## Choosing a power strip

TODO: Why power strip? Need it for components that don't need battery backup.

For example, I keep a little IoT device in my rack that [monitors performance of my solar panels](/notes/debugging-vlans-tp-link/#mistake-2-forgetting-to-add-my-router-to-the-vlan). That device is not at all critical, so I'm fine if it goes offline during a power failure. In fact, I prefer it to go offline because I don't want it eating up my scarce battery life in an outage.

### Candidates

| Brand          | Model                                                                                                                  | Outlets | Price      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- | ------- | ---------- |
| **Tripp Lite** | [**RS-1215-RA**](https://www.newegg.com/black-tripp-lite-12-outlets-power-strip/p/N82E16812120265?Item=9SIAFVF75F0869) | **12**  | **$78.11** |
| CyberPower     | [CPS1215RMS](https://www.newegg.com/cyberpower-cps1215rms-12-outlets-nema-5-15r/p/N82E16842102076)                     | 12      | $59.84     |

Power strips are, frankly, not so exciting, so I didn't shop around very much. I just looked at two.

### Review: Tripp Lite RS-1215-RA

More important to have more rear outlets. I occasionally use the front outlets, but I've only ever used two at a time at maximum. If I were doing it again, I'd choose a strip that has more rear outlets and fewer front outlets.

### Review: CyberPower CPS1215RMS

I bought this strip a few years ago for the TinyPilot office (TODO: link). I decided not to buy it again because the outlets are too close together. A lot of the things I plug in at the office are bricks, so they cover two outlets.

## Choosing a Raspberry Pi rack mount

I do a lot of professional and hobby projects with Raspberry Pis. I thought it would be fun to have a Raspberry Pi rack in my server. I didn't choose a PoE switch, but I had a 5-port PoE switch from my previous setup that I could chain together.

### Review: UCTRONICS Ultimate Rack with PoE Functionality

[UCTRONICS Ultimate Rack with PoE Functionality](https://www.uctronics.com/raspberry-pi/1u-rack-mount/raspberry-pi-4b-rack-mount-19-inch-1u-with-poe-and-oled-screen.html) - $189.99

It's fine. PoE HATs for a Raspberry Pi 4 are generally around $XX, so the fact that you're getting four included means there's not a ton of money left over.

The pieces don't fit together that well. There are gaps around the HDMI ports. The HDMI ports are also secured poorly, so they strain and bend when you actually plug in an HDMI cable, so I worry they're going to snap off.

PoE fan is super loud, but you can turn it off

The instructions were pretty bad. Step one is to screw in the OLED. Okay, that's fine.

Step two is to screw in the power button. Sure, easy peasy.

TODO: Photo

Step three is: okay, put together five other things!

TODO: Photo

## Choosing rack shelves

I have a few components in my rack that are small and don't have rack-mounting options:

- My OPNsense firewall server (running on a XX mini PC)
- My TinyPilot
- Dell XX mini PC (I use it for testing)

It's about two 2U shelves of stuff, though I could theoretically cram it into one shelf if I really wanted.

### Candidates

### Review: Star-Tech shelves

I originally purchased the Star-Tech shelves because Star-Tech has such a good reputation in the server world.

When I installed them into my rack, I thought I was making a mistake. They have a bottom lip that bends downward into the next rack slot. So it either means that you have to allocate 3U to each of your 2U shelves or you have to shift everything down by 0.5U. Or maybe you conveniently have something in your rack that takes up 0.8 U, but that would be weird.

It was so bizarre that I thought I must be doing something wrong.

I couldn't even figure out a purpose for the lip. It would make sense if it curved up because that would protect items on the shelf from slipping off, but why bend down? It didn't look like it provided any structural support to the shelf either.

I scoured reviews of this shelf to see if anyone mentioned it, and people did, but nobody seemed to mind that much. They were just like, "Oh, yeah, it extends to the bottom a bit." Huh? Why would anyone accept that?

### Review: XX shelves

I found these no-name shelves on Amazon, and they worked great. They have a lip, but it bends _upward_ to be _useful_.

I like these shelves. They were easy to install, they're low in price, and they keep themselves within the 2U space they promise.

## Choosing a patch panel

### What the hell is a patch panel?

From reading a lot of homelab blog posts, I noticed a lot of other homelabbers building a patch panel.

When it came time to finally build my server rack, I finally had to ask the question, "What the hell is a patch panel?"

Shopping around for patch panels made me even more confused. It's just a row of empty spaces? Huh? What's the point of that?

From continued reading, it seems like the point of patch panels is just to keep things tidy. If you just allowed every node in your server rack to connect its network cable to the networking switch, then it would be a mess of wires from all different directions. The patch panel hides this mayhem in the back of your rack, and then the front side looks neat and tidy. And then you label everything.

## Choosing cage nuts

You need cage nuts to secure rack components to your rack. Most rack-mountable components come with their own cage nuts, but enough don't that you'll need some extras.

Fortunately, they're small and cheap.

### Review: XX Cage nuts

Cage nuts, not so good
Can't twist with your fingers like the ones that came with the startech rack
Screw heads strip easily

## Choosing Ethernet and fiber cables

If you're converting an existing setup to a server rack, you'll likely need new Ethernet cables. If you're including a patch panel, remember to buy short (6-12") cables (sometimes called "patch cables") to connect the patch panel to your switch.

Depending on your patch panel and switch layout, you may need a mix of different cable lengths. For example, on my rack, port 16 on my switch is just XX" from port 16 on my patchpanel, but port 1 on my switch is XX" from its corresponding patch panel port.

I bought 6", 12", and 3' Ethernet cables at a ratio of about 5:2:1.

Some people are creative and buy different colors to represent different functionality. I'm boring and just stuck with blue and black Ethernet cables because they look standard and proper to me.

{{<notice type="info">}}

**Gotcha**: If you use fiber, make sure that all your SFP+ cables match in "mode." You can't mix single-mode fiber with multimode fiber.

{{</notice>}}

## Choosing cable ties

Cable ties are optional, but if you want to keep everything clean, you either need to cut your own cables or wrap up the excess with cable ties. You can also join groups of wires together with cable ties.

I've tried two styles of cable ties: velcro and rubber.

The velcro ones are secure, but they're a bit too secure. They take me about 5 seconds to attach or detach, whereas the rubber ones I can detach almost instantly, and I can attach them in a second or two.

## How do I arrange components in a rack?

Once I selected my rack components, the next step was figuring out how to lay everything out. I tried to find guides for how you're supposed to do it, and I didn't find much guidance.

Surprisingly, I couldn't find reliable guidance on how to arrange the components in a server rack, so I just reasoned out what made sense to me.

To plan the layout, I used a Google Sheets document and color coded it. This was also helpful in thinking about what size rack to purchase. I wanted the rack to contain everything I wanted now plus a little room to grow.

### Place heavy components on the bottom of your rack

The one piece of guidance around server rack layouts that everyone seemed to agree on is that heavier components should go on the bottom.

The rack has a lot of expensive equipment. You don't want it to fall over and damage things or, worse, injure someone. So, you want it to have a low center of gravity to maximize stability.

The heaviest component in my rack by far is the UPS, weighing in at a whopping XX lbs (XX kg).

The rest of the components are relatively light. I don't yet have a rack-mount chassis for my TrueNAS server, but that will be the next heaviest thing, as hard disk drives are heavy.

Patch panels weigh almost nothing, and networking switches are fairly light as well. For this reason, most server racks keep these components in the top two slots of the rack.

### Keep components with front-facing connections close together

It wasn't obvious to me until I built my server, but it's important to closely arrange components that connect through front-facing ports. For example, my patch panel and networking switch go in adjacent rack slots because I'd otherwise have Ethernet cables stretched over other components in the rack.

### Rear cables don't matter so much

Some of the guidance I read said to arrange components so that you can minimize the length of your power cables. I didn't see the point of this guidance.

It might be important to minimize the length of power cables in a data center where you're replicating the same setup hundreds of times. In a home environment, I don't see the difference between connect connecting my server to my UPS with a 2 ft. power cable instead of a 6 ft. power cable.

## My final rack setup

TODO: List of components and prices

| Component      | Choice        | Price | Satisfaction |
| -------------- | ------------- | ----- | ------------ |
| Server rack    | XX            | XX    | B+           |
| Network switch | XX            | XX    | C+           |
| UPS            | CyberPower XX | XX    | A+           |
| Power strip    | XX            | XX    | A            |

TODO: Photos

## Thoughts on my life with a rack

Nice to have everything close together.

I'm very happy with my new rack. No regrets. It definitely beats my old setup of having bits and pieces of infrastructure scattered around my office. Now everything is in in one location that's organized decently.

I underestimated how nice it would be to have my TinyPilot physically close to all of my devices. Before the rack, I used to keep my TinyPilot on the floor next to my desk. If I ever needed to debug something on a server or a Raspberry Pi on the other side of my office, I avoided it because it involved shutting down the TinyPilot, disconnecting a lot of wires, then reconnecting them on the other side of the room.

With everything now physically adjacent, it's easy for me to quickly plug TinyPilot in to any misbehaving device for low-level access. It came in handy for things like exploring NixOS and figuring out how to install NixOS on a Raspberry Pi.

## Next steps in my rack

You may have noticed that my server rack is missing one common feature: servers.

I still have my VM server and storage server that I rebuilty in the last few years. I'm planning to migrate them to rack-mounted chassis the next time I do some upgrades, but I've punted that task since building the rack was a significant enough project on its own.

## Mistakes I made

### Test the UPS before mounting it

The UPS was, by far, the hardest component to mount in the rack. I don't understand how people do it. It's a XX lb device, and you need at least one hand holding it in place and one hand securing the screws. I eventually decided it was a two-person job and called my wife in for reinforcement.

But you don't want to go through all that work and find out, like I did, that the UPS is too loud to earn a permanent place in your rack. Or it could just be a dead device, and you don't want to find that out after you mount it.

So before you mount your UPS, remember to test it for functionality and noise before you go to the trouble of mounting it.

### Check return policies

on Newegg: I'd never seen anything on Newegg before that was replacement-only, so I took it for granted that I'd be able to return it if I didn't like it.

### Check UPS reviews for noise complaints

Some UPS devices are totally silent and some produce constant noise. If it's anywhere near you, take noise into consideration.

### Cage nuts aren't supposed to hurt

Didn't understand

If something requires a lot of physical force or pain, you're probably doing something wrong. In building computers or homelab components, every time I've thought, "Wow, this design requires so much force!" I've quickly realized that I misunderstood the design and I'm applying force to something that shouldn't have to be forced.

### Some PCI slots don't like 10G NICs

When I installed the first 10G NIC into my desktop, Windows didn't detect the card installed. I tried re-seating it, and I saw the same results. I tried downloading drivers, but Windows wasn't seeing the device at all in Device Manager.

Finally, I stumbled across a forum post where someone reported that their XX card worked when they switched it to a different PCI slot. I tried a different PCI slot on my motherboard, and voila! It worked perfectly.

### Flash Mellanox cards to latest firmware on a Windows system

Didn't flash Mellanox card before installing it in TrueNAS.

https://network.nvidia.com/products/adapter-software/ethernet/windows/winof-2/

### Why do these fiber keys keep popping out?

Fiber keys don't stay in place well

### Incorrect length Ethernet cables

Patch cables

### Mixing SFP+ multimode with single mode
