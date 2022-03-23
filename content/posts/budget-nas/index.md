---
title: Building a Budget Homelab NAS Server (2022 Edition)
tags:
  - virtualization
  - homelab
  - truenas
description: TODO
date: "2022-04-15"
---

TODO: Link to skip to the parts list

{{<notice type="info">}}
**What's a "homelab?"**

Homelab is a colloquial term that's grown in popularity in the last few years.

Homelab servers are no different from any other servers, except that you build them at home rather than in an office or data center. Many people use them as a low-stakes practice environment before using the same tools in a real-world business context.
{{</notice>}}

## Why build a NAS?

I've had a NAS since 2010. In fact, the first blog post I ever wrote was about using my NAS.

I love my Synology. It's honestly one of the best products I've ever purchased. A few months ago, it started clicking, and I started to worry. I've built all the other computers in my home, so if some component breaks, I can just replace that part. The Synology is a packaged deal. If some part broke, I'd have to replace the whole thing. It's well past its warranty, and it's not a system you can repair on your own.

But as much as I love Synology, I hate platform lock-in. I had set up my Synology using Synology Hybrid RAID. Its advantage is that it can use disks of mismatched size, which is handy for growing your storage incrementally. But it's a proprietary technology, so only Synology NAS appliances can ready SHR volumes.

So I decided to switch to something open source and open standards, and I settled on ZFS.

## How I chose parts

### CPU

From what I've read, ZFS is not very CPU-intensive. I did a basic TrueNAS test by installing

My main concern with the CPU was finding a CPU and motherboard combination that supported video without requiring a dedicated GPU.

I looked at a few. I settled on it. It's the same one that Brian Moses used in his theoretical [EconoNAS](https://blog.briancmoses.com/2020/12/diy-nas-econonas-2020.html) build.

### Motherboard

{{<notice type="danger">}}

I don't recommend the combination of CPU and motherboard I used unless you have a spare CPU to bootstrap the BIOS. See more discussion below.

{{</notice>}}

### Case

I chose

### OS disk

I love the M.2 form factor as it requires no cabling, and it takes up essentially zero space.

### Data storage disks

## Parts list

| Category                    | Component                                                                                                                            | I paid        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| CPU                         | [AMD Athlon 3000G](https://www.newegg.com/amd-athlon-3000g/p/274-000M-001B8)\*                                                       | $105.13       |
| Motherboard                 | [ASUS Prime A320I-K AM4 AMD A320](https://www.newegg.com/asus-prime-a320i-k/p/N82E16813119200)                                       | $97.99        |
| Graphics                    | None needed &mdash; built in to CPU                                                                                                  | $0            |
| Disk (OS)                   | [Kingston A400 120GB](https://www.newegg.com/kingston-a400-120gb/p/N82E16820242474)                                                  | $31.90        |
| Disk (Storage)              | [Toshiba N300 HDWG480XZSTA 8TB 7200 RPM](https://www.newegg.com/toshiba-n300-hdwg480xzsta-8tb/p/N82E16822149793) (x2)                | $372.79       |
| Disk (Storage)              | [Seagate IronWolf 8TB NAS Hard Drive 7200 RPM](https://www.newegg.com/seagate-ironwolf-st8000vn004-8tb/p/N82E16822184796) (x2)       | $359.98       |
| Memory                      | [CORSAIR Vengeance LPX 32GB CMK32GX4M2A2400C14 (2 x 16GB)](https://www.newegg.com/corsair-32gb-288-pin-ddr4-sdram/p/N82E16820233854) | $127.99       |
| Power                       | [EVGA 110-BQ-0500-K1 500W 80 Plus Bronze Semi Modular](https://www.newegg.com/evga-500-bq-110-bq-0500-k1-500w/p/N82E16817438101)     | $44.99        |
| Case                        | [Fractal Design Node 304 Black](hhttps://www.newegg.com/black-fractal-design-node-304-mini-itx-tower/p/N82E16811352027)              | $99.99        |
| SATA cables                 | [Silverstone Tek Ultra Thin Lateral 90 Degree SATA Cables](https://www.newegg.com/p/N82E16812162042) (x2)                            | $22.30        |
| Remote administration       | [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) (KVM over IP)                                                                  | $65.00        |
| **_Total (without disks)_** |                                                                                                                                      | **_$595.29_** |
| **Total**                   |                                                                                                                                      | **$1,328.06** |

\* Caveat: This won't work out of the box with the Asus Prime A320I-K motherboard. See details below.

Pretty good on price. For comparison, here are

A Synology DS920+ is $549.99, but it's limited to four disks (mine can expand to six). It has 4 GB, expandable to 8 GB (75% less than mine).

A four-disk QNAP TS-473A-8G-US has a slightly faster CPU, but half as much RAM.

## Building the server with TinyPilot

I created TinyPilot specifically for the task of building custom PCs and servers. It was great in this instance because I could monitor video output, boot to BIOS, and mount the TrueNAS system entirely from the TinyPilot browser window.

## CPU

## The build

### My first PSU was dead

I got everything hooked up, and nothing. I've built several computers, and this is one of the worst feelings. You just have no feedback, and you're potentially going to .

I disconnected everything except for the PSU's cables to the motherboard and the power button. Still, no luck. I tried removing the RAM. Same thing. I tried re-seating the CPU. Same thing.

Finally, I took apart my 2017 homelab VM server and connected its PSU to the NAS motherboard. It powered on! So, I successfully identified the problem as a defective PSU. I ordered a replacement of the same model, and it powered on, but there was no video output. This led me to the next issue...

### The CPU BIOS incompatibility fiasco

I got the system to power on, but there was no video display. Oh no! Did I misunderstand what was required for the motherboard's on-board video to work?

After some research, I saw some comments that the Asus Prime A320I-K requires a BIOS upgrade before it can work with the Athlon 3000G. I remember seeing that during parts selection, and I breezed by it. I've done BIOS updates in the past, and they're no big deal. I didn't think about how I'd do a BIOS when I _don't have a CPU_.

I caught an extremely lucky break in realizing that the CPU from my 2017 homelab server build was compatible going back to BIOS version XX. So I borrowed it, and I got it to boot!

## Benchmarks

## Final thoughts

### CPU

Works well. Supports onboard motherboard video as desired.

### Motherboard

Not crazy about the CPU compatibility.

### Case

Didn't love it. Very little documentation and the set of screws wasn't obvious.

### TrueNAS

No built-in Recycle Bin. There's some sort of Recycle Bin capability but it has a bunch of caveats about not storing large files, and it doesn't seem to empty automatically.

Jails are much harder to configure. To access storage, you have to create the jail, check the uid of the user running within the jail, then create a matching user on the host system, then edit permissions to give that user access to the shared dataset.
