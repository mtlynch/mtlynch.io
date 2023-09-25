---
title: "Building My First Homelab Server Rack"
date: 2023-10-12T09:20:48-04:00
---

TODO: Table of contents

## Why build a server rack at home?

### What's a homelab?

"Homelab" is a colloquial term that's grown in popularity in the last few years.

A homelab is a place in your home where you can experiment with IT hardware or software that you'd typically find in an office or data center. It can serve as a practice environment for new professional skills, or it can just be a place to play with interesting technology.

## Why this guide?

I'm a beginner, so I don't have the curse of knowledge.

This is not affiliate spam. Some are honest, but all of them are inherently biased. They have a vested interest in you purchasing more expensive gear because they make more money that way. They also have an interest in directing you to merchants

## Choosing components

### Rack

The rack was the first thing I decided, but it was also iterative.

There's a bit of a circular dependency. You don't know what kind of rack to buy until you know what components it needs to house, but you'll make different decisions about

#### Considerations

- How tall does it need to be?
- Does it need wheels?
- Does it need four posts or would two suffice?
- How deep does it need to be?

#### My choice: StarTech XX 18U rack

I have a StarTech rack at my office, and I haven't had any issues with it.

No labels on parts of startech rack
Comes with screwdriver and wrenches
Not sure how to use grounding cables
Smallest setting prevents you from using all screws
Smallest setting blocks screws for casters

### Network switch

The next big decision

#### Considerations

- What speed do you want?
- Managed or unmanaged?
- How many ports do you need?

The more I read, the more I found people saying that 2.5 Gbps was flaky, and you might as well just go straight to 10 Gbps.

10G switches don't mean everything has 10G.

#### My choice: TP-Link

TP-Link won't let you change the admin user from "admin"
Pretty confusing interface.

Took forever to get VLANs right. (TODO: Link to VLAN notes)

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

### Cage nuts

### Cable ties

## Network bandwidth: 1G, 2.5G, or 10G?

Michael Stapelberg uses Mellanox

## Planning layout

I tried to find

### Heavier components go on the bottom

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
- Test UPS before mounting it.
- Look for notes about noise on all parts.
- Get lots of 6", 12", and 3' Ethernet cables 5:2:1.
