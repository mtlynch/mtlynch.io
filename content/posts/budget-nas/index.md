---
title: Building a Budget Homelab NAS Server (2022 Edition)
tags:
- virtualization
- homelab
- truenas
description: TODO
date: '2021-01-01'
---

TODO: Link to skip to the parts list

{{<notice type="info">}}
**What's a "homelab?"**

Homelab is just a colloquial term that's grown in popularity in the last few years. Homelab servers are no different from any other servers, except that you build them at home rather than in an office or data center. Many people use them as a low-stakes practice environment before using the same tools in a real-world business context.
{{</notice>}}

## How I chose parts

### CPU

From what I've read, ZFS is not very CPU-intensive. I did a basic TrueNAS test by installing

My main concern with the CPU was finding a CPU and motherboard combination that supported video without requiring a dedicated GPU.

### Motherboard

### Case

I chose

### OS disk

I love the M.2 form factor as it requires no cabling, and it takes up essentially zero space.

### Data storage disks

## Parts list

| Category    | Component                               | I paid        |
|-------------|-----------------------------------------|---------------|
| CPU         | [AMD Athlon 3000G](https://www.newegg.com/amd-athlon-3000g/p/274-000M-001B8)        | $264.82       |
| Motherboard | [SuperMicro MBD-X10DAL-I-O](https://www.newegg.com/supermicro-mbd-x10dal-i-o-intel-xeon-processor-e5-2600-v4-v3-family/p/N82E16813182967)               | $319.99       |
| Graphics         | None! | $0 |
| Disk (OS)        | [Samsung 860 EVO (1TB)](https://www.newegg.com/samsung-860-evo-series-1tb/p/N82E16820147673?Item=N82E16820147673)                   | $149.99       |
| Disk Storage
| Memory      | [Crucial CT4K16G4RFD4213 64GB (4 x 16GB)](https://www.newegg.com/crucial-64gb-288-pin-ddr4-sdram/p/N82E16820148843?Item=9SIAHZUB514397) | $285.99       |
| Power       | [Corsair CX550M 550W 80 Plus Bronze](https://www.newegg.com/corsair-cx-series-cx550m-550w/p/N82E16817139147?Item=N82E16817139147)      | $79.99        |
| Case        | [Fractal Design Meshify C Black](https://www.newegg.com/black-fractal-design-meshify-c-atx-mid-tower/p/N82E16811352085?Item=N82E16811352085)          | $84.99        |
| CPU Fans    | [Cooler Master Hyper 212](https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278) (x2)            | $72.98        |
| Remote administration | [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) (KVM over IP) | $65.00 |
| **Total**   |                                         | **$1,368.74** |

\* Caveat: This won't work out of the box with the Asus Prime A320I-K motherboard. See details below.

## CPU

## The build

### My first PSU was dead

### The CPU BIOS incompatibility fiasco

I borrowed the PSU from my old 2017 homelab VM server, and I got the system to power on, but there was no video display. Oh no! Did I misunderstand what was required for the motherboard's on-board video to work?

After some research, I saw some comments that the Asus Prime A320I-K requires a BIOS upgrade before it can work with the Athlon 3000G. I remember seeing that during parts selection, and I breezed by it. I've done BIOS updates in the past, and they're no big deal. I didn't think about how I'd do a BIOS when I *don't have a CPU*.

I caught an extremely lucky break in realizing that the CPU from my 2017 homelab server build was compatible going back to BIOS version XX. So I borrowed it, and I got it to boot!

## Benchmarks

## Final thoughts

### CPU

Works well. Supports onboard motherboard video as desired.

### Motherboard

Not crazy about the CPU compatibility.

### Case

Didn't love it. Very little documentation and the set of screws wasn't obvious.
