---
title: "Building My First Homelab Server Rack"
date: 2023-10-12T09:20:48-04:00
tags:
  - homelab
---

TODO: Table of contents

Six years ago, I built my [first home server](/building-a-vm-homelab-2017/). I often had several programming projects running at once, and I was tired of

Over the years, I've gotten more into the homelab scene and added custom NAS, firewall, and more advanced switches. And I work with Raspberry Pis so I had several Raspberry Pis everywhere.

My wife has expressed frustration at how we never clean certain parts of my office because of all the wires. I felt like, "It's not that many wires." And then I really looked and realized, it's kind of a lot of wires.

TODO: Photo of wires

## I'm not a server rack guy

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

## Choosing components

### Rack

Obviously, if you're going to buy a server rack, one of the important decisions is which rack to buy. So, that seems like the first thing you'd decide, but it's not that simple.

Choosing a rack is an iterative process. First, you need to understand what the options are, then you need to figure out what you'd like to put in the rack now and in the future, then you need to buy.

The rack was the first thing I decided, but it was also iterative.

There's a bit of a circular dependency. You don't know what kind of rack to buy until you know what components it needs to house, but you'll make different decisions about

#### Considerations

- How many units does it need to support?
- How deep does it need to be?
- How much space can I afford to give up?
- Does it need wheels?
- Does it need four posts or two?

#### Candidates

I have a StarTech rack at my office. It's nothing exciting, but it does what it's supposed to do. It was striaghtforward to assemble, it feels sturdy, and the wheels make it easy to move around. StarTech also has a good reputation and a decent website, so I just chose between different StarTech racks.

- **StarTech XX 18U rack**

#### My choice: StarTech XX 18U rack

No labels on parts of startech rack
Comes with screwdriver and wrenches
Not sure how to use grounding cables
Smallest setting prevents you from using all screws
Smallest setting blocks screws for casters

### Network switch

The hardest choice for me in building my server rack was picking a network switch. Network switches get fairly pricey, so I didn't want to spend $300 on something only to have to supplement it with another component or replace it later on. And rack space is precious, so I don't want to buy a switch and then have to buy another one in a year or two and totally rearrange my rack.

#### Considerations

- What speed do you want?
- Managed or unmanaged?
- How many ports do you need?

For as long as I can remember, I've just had 1 Gbps Ethernet speed, and that's been fine. I do most of my work online, so the bottleneck is almost always my ISP rather than my home network.

But lately, I've been pushing the limits on my home storage server, and I've thought it would be nice to bump up the speeds.

The next steps up are either 2.5 Gbps or 10 Gbps. Given that I've been fairly satisfied with 1 Gbps, I thought 10 Gbps would probably be too big a jump, so I might as well take a smaller step to 2.5 Gbps.

But the more I read about 2.5 Gbps gear, the more complaints I saw that it's flaky and unreliable. The consensus seemed to be that it's just as hard to make the switch to 10 Gbps, but you'll have fewer headaches later. So, I thought, fine! I'll do 10 Gbps.

I did run into headaches, but I'll cover that more below (TOOD: link)

The more I read, the more I found people saying that 2.5 Gbps was flaky, and you might as well just go straight to 10 Gbps.

10G switches don't mean everything has 10G.

#### My choice: TP-Link

TP-Link won't let you change the admin user from "admin"
Pretty confusing interface.

Took forever to [get VLANs right](/notes/debugging-vlans-tp-link/). (TODO: Link to VLAN notes)

### UPS (battery backup)

#### Considerations

- How much time do you need?

#### My choice: CyberPower XX

#### Also ran: Tripp-Lite XX

I originally purchased the Tripp-Lite XX.

I ended up purchasing the Tripp-Lite, but it was noisy. I didn't even realize battery backups could _be_ noisy. I've had an APC battery backup for XX years, and it's completely silent except when it loses power and fails over to battery backup.

### Power strip

### Pi rack mount

Uctronics - draw the fucking owl instructions
don't fit together great
PoE fan is super loud, but you can turn it off
HDMI ports need to be secured better

### Rack shelves

Beware the bottom lip.

#### Also ran: Star-Tech shelves

I originally purchasd

Star-Tech shelf extends over into next level.

### Patch panel

#### What the heck is a patch panel?

My first question was, "What the hell is a patch panel?"

In homelab and IT forums, I constantly see pictures of people posting beautifully organized cables. And I thought one day, I'd understand what leads to that.

And then I looked into patch panels and I was even more confused. It's just a row of empty spaces? Huh? What's the point of that?

From continued reading, it seems like the point of patch panels is just to keep things tidy. If you just allowed every node in your server rack to connect its network cable to the networking switch, then it would be a mess of wires from all different directions. The patch panel hides this mayhem in the back of your rack, and then the front side looks neat and tidy. And then you label everything.

### Cage nuts

You need cage nuts to secure rack components to your rack. Most rack-mountable components come with their own cage nuts, but enough don't that you'll need some extras.

Fortunately, they're small and cheap.

### Cable ties

Cable ties are optional, but if you want to keep everything clean, you either need to cut your own cables or wrap up the excess with cable ties. You can also join groups of wires together with cable ties.

I've tried two styles of cable ties: velcro and rubber.

The velcro ones are secure, but they're a bit too secure. They take me about 5 seconds to attach or detach, whereas the rubber ones I can detach almost instantly, and I can attach them in a second or two.

### Ethernet cables

If you're converting an existing setup to a server rack, you'll likely need new Ethernet cables.

I bought 6", 12", and 3' Ethernet cables at a ratio of about 5:2:1.

Some people are creative and buy different colors to represent different functionality. I'm boring and just stuck with blue and black Ethernet cables because they look standard and proper to me.

## Network bandwidth: 1G, 2.5G, or 10G?

Michael Stapelberg uses Mellanox

## How do I arrange components in a rack?

Once I selected my rack components, the next step was figuring out how to lay everything out. I tried to find guides for how you're supposed to do it, and I didn't find much guidance.

I just used a Google Sheets document and color coded it.

### Heavier components go on the bottom

The one piece of guidance around server rack layouts that everyone seemed to agree on is that heavier components should go on the bottom.

The rack has a lot of expensive equipment. You don't want it to fall over and damage things or injure someone.

Things with

### Components with front-facing connections should be close together

An obvious example is your patch panel and your network switch. They should be in adjacent rack slots

Or, more generally, components that have front-facing ports should be close together. Otherwise, you have Ethernet cables stretching all across your rack and blocking stuff.

### Rear cables don't matter so much

Some of the guidance I read said to minimize power cable length. Maybe this matters in a data center where you're replicating the setup 100x. In a home environment, I don't see the point. If I connect a server to the UPS with a 2 ft. power cable instead of a 6 ft. power cable, there's no real difference.

### Ethernet cables

Needed more Ethernet cables because of patchpanel

### Patchpanel

certain keys hard to fit through. Actually, they're fine

### Cage nuts

Cage nuts, not so good
Can't twist with your fingers like the ones that came with the startech rack
Screw heads strip easily

## Mistakes I made

### Cage nuts aren't supposed to hurt

Didn't understand

### Flash Mellanox cards to latest firmware on a Windows system

Didn't flash Mellanox card before installing it in TrueNAS.

### Why do these fiber keys keep popping out?

Fiber keys don't stay in place well

### Incorrect length Ethernet cables

Patch cables

### Mixing SFP+ multimode with single mode

### Test the UPS before mounting it

The UPS was, by far, the hardest component to mount in the rack. I don't understand how people do it. It's a XX lb device, and you need at least one hand holding it in place and one hand securing the screws. I eventually decided it was a two-person job and called my wife in for reinforcement.

But you don't want to go through all that work and find out, like I did, that the UPS is too loud to earn a permanent place in your rack. Or it could just be a dead device, and you don't want to find that out after you mount it.

So before you mount your UPS, remember to test it for functionality and noise before you go to the trouble of mounting it.

### 10G

Mellanox - No flashing lights when I connected my main pc
tried installing drivers
https://network.nvidia.com/products/adapter-software/ethernet/windows/winof-2/
Switched PCI slots and it worked

Fiber connection suddenly dropped on day 2
Disconnected+reconnected cable: Same result. Activity light stopped flashing on card after I reconnected.
Disabled/re-enabled card: Same result (said network cable disconnected)
Disconnected/reconnected patch cable: Started working again.
Next day - would keep flashing between connected/disconnected. swapped patch cables and it fixed it. Five mins later, happened again and skipped the patch cable, directly connected to switch.

#### TrueNas Mellanox

```text
mlx4_core0: Unable to determine PCI device chain minimum BW
mlx4_en mlx4_core0: Activating port:1
mlxen0: Ethernet address: 24:8a:07:ea:22:10
mlx4_en: mlx4_core0: Port 1: Using 4 TX rings
mlx4_en: mlx4_core0: Port 1: Using 4 RX rings
mlxen0: link state changed to DOWN
mlx4_en: mlxen0: Using 4 TX rings
mlx4_en: mlxen0: Using 4 RX rings
mlx4_en: mlxen0: Initializing port
```

#### TrueNAS Chelsio 520 1

https://www.servethehome.com/buyers-guides/top-hardware-components-for-truenas-freenas-nas-servers/top-picks-freenas-nics-networking/

Upgraded BIOS, no change.

Added to `/boot/loader.conf`

https://man.freebsd.org/cgi/man.cgi?query=cxgbe&sektion=4

```text
t4fw_cfg_load="YES"
t5fw_cfg_load="YES"
t6fw_cfg_load="YES"
if_cxgbe_load="YES"
```

Tried setting them as tunables. No dice.

```text
# pciconf -lv | grep -i Chelsio

```

```text
# dmesg | grep -i Chelsio

```

https://www.reddit.com/r/truenas/comments/vzbial/chelsio_nic_not_appearing/

Overheating?

## Lessons learned

- Check return policy on Newegg: I'd never seen anything on Newegg before that was replacement-only, so I took it for granted that I'd be able to return it if I didn't like it.
- Look for notes about noise on all parts.
