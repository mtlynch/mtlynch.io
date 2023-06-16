---
title: "Building My First Homelab Server Rack"
date: 2023-06-16T09:20:48-04:00
---

## Why build a server rack at home?

### What's a homelab?

"Homelab" is a colloquial term that's grown in popularity in the last few years.

A homelab is a place in your home where you can experiment with IT hardware or software that you'd typically find in an office or data center. It can serve as a practice environment for new professional skills, or it can just be a place to play with interesting technology.

## Why this guide?

## Picking parts

### Rack

- How tall does it need to be?
- Does it need wheels?
- Does it need four posts or would two suffice?
- How deep does it need to be?

### Network switch

The more I read, the more I found people saying that 2.5 Gbps was flaky, and you might as well just go straight to 10 Gbps.

10G switches don't mean everything has 10G.

### UPS (battery backup)

### Power strip

### Pi rack mount

### Rack shelves

### Patch panel

### 10G networking gear

Michael Stapelberg uses Mellanox

### Cage nuts

### Cable ties

## Planning layout

## Thoughts on parts

### Rack

No labels on parts of startech rack
Comes with screwdriver and wrenches
Not sure how to use grounding cables
Smallest setting prevents you from using all screws
Smallest setting blocks screws for casters

### Shelves

Star-Tech shelf extends over into next level.

### Switch

TP-Link won't let you change the admin user from "admin"
Pretty confusing interface.

### Raspberry Pi Rack

Uctronics - draw the fucking owl instructions
don't fit together great
PoE fan is super loud, but you can turn it off

Needed more Ethernet cables because of patchpanel

Patchpanel, certain keys hard to fit through.

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

## Lessons learned

- Check return policy on Newegg: I'd never seen anything on Newegg before that was replacement-only, so I took it for granted that I'd be able to return it if I didn't like it.
- Test UPS before mounting it.
- Look for notes about noise on all parts.
- Get lots of 6", 12", and 3' Ethernet cables 5:2:1.
