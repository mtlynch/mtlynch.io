---
title: Building a Budget Homelab NAS Server (2022 Edition)
tags:
  - virtualization
  - homelab
  - truenas
description: TODO
date: "2022-04-15"
---

This year, I decided to build my first ever home storage server. It's a 32 TB server that stores all of my personal and business data using all open-source software.

The server itself cost $531, and I bought four disk drives for $732, bringing the total cost to $1,263. It's similar in price to off-the shelf storage servers, but it offers significantly more power and customizability.

In this post, I'll walk through how I chose the parts, what issues I ran into in the build, and my recommendations for anyone interested in building their own.

- [Background](#background)
- [Storage planning](#storage-planning)
- [How I chose parts](#how-i-chose-parts)
- [Build photos](#build-photos)
- [Benchmarking performance](#performance-benchmarks)
- [Final thoughts](#final-thoughts)

{{<gallery caption="Before and after of my 2022 homelab TrueNAS server build">}}
{{<img src="all-parts.jpg" alt="TODO" maxWidth="450px">}}
{{<img src="completed-build.jpg" alt="TODO" maxWidth="450px">}}
{{</gallery>}}

If you'd prefer a video explanation instead, I recorded one on YouTube.

## Background

### What's a NAS server?

NAS stands for network-attached storage. A NAS server is just a server you can keep whose purpose is to store data and make it available to computers within your home network.

But every computer stores data. Why have a whole dedicated server for data?

I like decoupling data storage from my computers. I upgrade my main workstation every two to three years, and moving my data was always a pain. Solid state drives continue to get faster, and that's usually one of the biggest bottlenecks, but it was a pain to move all of my data from

I also have a _lot_ of data. I'm a data hoarder, so I have every digital photo I've ever taken, all of my notes from college, and the source code for every personal project.

The biggest data source is my my DVD and Blu-Ray collection. I don't like relying on streaming services to keep good content available, so I still buy physical copies of movies and TV shows. As soon as I get a new disc, I rip it so that I have it available on my computer and can stream it to my TV. Between the raw ISO copy and the streamable MP4s, a single disc can take up around 60 GB of disk space.

TODO: Photo of DVDs

### What's a homelab?

"Homelab" is a colloquial term that's grown in popularity in the last few years. A homelab is a place in your home where you can experiment with hardware or software that people typically use in professional environments.

Many people use homelab servers as low-stakes practice environments before they use the technologies in their day jobs. I use my homelab for software development, as I keep [each project in its own virtual machine](/building-a-vm-homelab-2017/#why-vms).

### Why build your own NAS?

If you're new to the homelab world or you have no experience building PCs, I recommend that you **don't build your own NAS**.

There are off-the-shelf solutions that offer most of the same functionality and with a substantially better user experience.

Before building my own homelab NAS, I used a Synology DSXX that I used for XX years. Honestly, I loved my Synology. It was one of the best purchases I ever made. It was a gentle introduction into the world of NAS servers, and it's where I'd recommend you start if you're not sure about the whole NAS thing.

As much as I love my Synology, I detest platform lock-in. I had configured my Synology using Synology Hybrid RAID, a proprietary storage format that allows you to mix disks of different sizes.

A few months ago, my Synology started to make a clicking noise. I started to worry that XX years in, it didn't have much time left. Synology devices are not user-repairable. If a part breaks and you're past warranty, you have to replace the whole server. And if you've short-sightedly used a Synology-proprietary storage format, you can't access the data on your disks unless you buy another Synology sytem.

Fortunately, my Synology's clicking went away, but it was a wake up call how dependent I'd let myself become on that NAS. I decided to switch to something open source and open standards, so I decided on TrueNAS.

### TrueNAS and ZFS

TrueNAS (formerly known as FreeNAS) is one of the most popular storage servers. I also see a lot of people talk about Unraid, and it looked nice, but I wanted something open-source.

TrueNAS uses [ZFS](https://docs.freebsd.org/en/books/handbook/zfs/), a filesystem designed specifically for storage servers. Most filesystems like NTFS on Windows or ext4 run on top of a separate disk volume system that manages low-level disk I/O. ZFS manages everything in the stack from the filesystem down to the disk I/O, which gives it more power and performance than other filesystems.

Some neat features of ZFS include:

- Aggregating multiple physical disks into a single filesystem
- Automatically repairing data corruption
- Creating point-in-time snapshots of data on disk (similar to OS X's Time Machine feature)
- Optionally encrypting or compressing data on disk

Before building this system, I had zero experience with ZFS, so I was excited to experiment with it.

## Storage planning

When building a storage server, the big question is storage, so before I began, I asked myself a few questions:

- How much disk space do I need?
- How will my storage needs grow over the lifetime of the server?
- How worried am I about disk failures and data loss?
- What am I willing to spend?

Here is how I thought about these concerns.

### How I planned disk capacity

When I bought my Synology NAS, I initially installed three 4 TB drives and left the fourth drive bay empty. That gave me a total of XX space with Synology Hybrid Raid. Three years later, I was running out of space, so I added a fourth drive, bringing my total usable space to about 10 TB.

I decided to apply the same strategy for my new build. I wanted to build a system that met my current needs and still offered room to grow. My rough target was to start with 20 TB of usable storage and capacity for up to 30 TB if I add disks later.

### Many small disks or fewer large disks?

ZFS is designed to survive disk failures, so it stores each block of data redundantly. Because of this redundancy, it's complicated to think about storage capacity. Naively, you'd expect that five 4 TB drives would give you 20 TB of space, but if you take into account the space needed for redundancy, your actual usable capacity is only 15.4 TB.

I found this [raidz calculator](https://wintelguy.com/zfs-calc.pl) that tells you how much space different disk configurations give you.

ZFS creates filesystems out of "pools" of disks. The more disks in the pool, the more efficiently ZFS can use their storage capacity. For example, if you give ZFS two 10 TB drives, you only get to use 10 TB out of your 20 TB capacity. If you instead use five 4 TB drives, ZFS could give you 14 TB of usable storage.

When you're building a NAS server, you need to decide whether to use a smaller quantity . Smaller drives are usually cheaper in terms of $/TB, but they're more expensive to operate. It takes twice as much electricity to run two 4 TB drives than a single 8 TB drive.

Since you can't mix drive sizes in a ZFS pool, you have to replace all disks in a drive pool if you want to expand storage. ZFS doesn't support adding a new drive to an existing pool, but that feature is [under active development](https://github.com/openzfs/zfs/pull/12225). Hopefully by the time I need to exand storage, the feature is complete and available in TrueNAS.

I wanted to keep my server on the smaller side, so I opted for fewer, larger drives.

### raidz 1, 2, or 3?

There are a few different ZFS modes: raidz1, raidz2, and raidz3. The main difference is in robustness. raidz1 can survive one disk failure, but you'll suffer data loss if two disks fail at the same time. raidz2 can survive two disk failures without data loss. raidz3 can survive three.

Why wouldn't everyone simply choose raidz3? What you gain in robustness, you pay for in disk space.

Given five 4 TB hard drives, here's how much usable storage you'd get from each ZFS mode:

| ZFS type | Usable storage | % of total capacity |
| -------- | -------------- | ------------------- |
| raidz1   | 15.4 TB        | 77.2%               |
| raidz2   | 11.4 TB        | 57.2%               |
| raidz3   | 7.7 TB         | 38.6%               |

I chose raidz1. I think the odds of two drives failing simultaneously in my NAS is fairly low, and I use [restic](https://restic.net) to back everything up to the cloud anyway.

When choosing which ZFS mode to use, don't think "how willing am I to lose data?" but rather, "how willing am I to spend several hours recovering my data?" [ZFS is not a backup strategy](https://www.raidisnotabackup.com/). ZFS can protect you against disk failure, but there are many threats to your data that ZFS won't mitigate, such as accidental deletion, malware, or physical theft of your server.

To me, the value of ZFS is that I don't have to resort to my cloud backups if one drive dies. With raidz1, I'll have to recover from backups if two drives fail, which is a pain but not the end of the world. To me, it's not worth giving up 26% of my server's usable storage for raidz2.

The more physical drives you have, the more defensive you should be about disk failure. If I had a pool of 20 disks, I'd probably use raidz2 or raidz3.

### Preventing concurrent disk failures

raidz1 protects me if one disk fails. If two or more drives fail at once, I'll suffer data loss.

Based on [Backblaze's stats](https://www.backblaze.com/blog/backblaze-hard-drive-stats-for-2020/), the average failure rate of each disk is only 0.5-4% per year. Naively, the probability of two disks failing at once would seem vanishingly small. But disks aren't statistically independent. If one disk fails, the odds of another disk failing are much higher if it's the same model, from the same manufacturing batch, and it spent its life in the same environment processing a similar workload. Given this, I did what I could to reduce the risk of concurrent disk failures.

I chose two different models of disk from two different manufacturers. To reduce the chances of getting disks in the same manufacturing batch, I bought the disks from different vendors. I can't say how much this matters, but it didn't increase costs significantly, so why not?

## How I chose parts

### Motherboard

The first decision was motherboard size. My Synology DS412+ was nice and compact, and I liked that form factor. I've never built a computer with a mini-ITX motherboard before, and this seemed like a good opportunity.

I chose the [ASUS Prime A320I-K](https://www.newegg.com/asus-prime-a320i-k/p/N82E16813119200) for a few reasons:

- It has four SATA ports, which would allow me to connect four disks directly to the motherboard.
- It supports Radeon graphics, which would spare me from buying a separate graphics card

I also looked at the B450, which was very similar, but it was almost twice the price, and the main advantage seemed to be better overclocking support, which I didn't need.

{{<notice type="danger">}}

**Warning**: I regret this choice of motherboard. See more discussion below (TODO: link).

{{</notice>}}

### CPU

From what I've read, ZFS is not very CPU-intensive. I ran a basic test by installing TrueNAS on a cheap Dell OptiPlex 7040 mini PC. It barely used the CPU, so it seemed safe to go with a low-powered CPU.

The important thing to me was to find a CPU that supported Radeon graphics so that I could use my motherboard's onboard HDMI output.

My main concern with the CPU was finding a CPU and motherboard combination that supported video without requiring a dedicated GPU.

{{<img src="amd-3000g.jpg" alt="TODO" maxWidth="500px" hasBorder="true" caption="The AMD Athlon 3000G is inexpensive and has native graphics support.">}}

I settled on the AMD Athlon 3000G. It's inexpensive at only $105, and it has decent CPU benchmarks.

Normally, I'd buy a third-party CPU fan for more efficient cooling, but for this build, I just used the Athlon's stock fan. I wasn't worried about the CPU absorbing heavy workloads, and I didn't want to worry about verifying that a larger fan would fit in a mini-ITX case.

### Case

When I built my last VM server, I [used a Fractal Design case](/building-a-vm-homelab/#case). It's my favorite computer case ever, so stuck with Fractal Design on this build.

{{<img src="fractal-design-304.jpg" alt="TODO" maxWidth="500px" hasBorder="true" caption="The [Fractal Design Node 304 Black](https://www.newegg.com/black-fractal-design-node-304-mini-itx-tower/p/N82E16811352027) is a mini-ITX case with space for six disks.">}}

I went with the [Fractal Design Node 304 Black](https://www.newegg.com/black-fractal-design-node-304-mini-itx-tower/p/N82E16811352027), a compact mini-ITX case. I liked the design because it's closer to a cube than a tower. It has six drive bays, which was the number I wanted.

### Disk (Data)

The biggest decision was the disk. I wanted to. Things I wanted to avoid:

- Noise
- High failure rate
- Shingled magnetic recording (SMR) disks
  - ZFS performs poorly on SMR drives.
  - Look for drives with conventional magnetic recording (CMR).
  - Check this list of [known SMR drives](https://www.truenas.com/community/resources/list-of-known-smr-drives.141/).

To limit failure rate, I checked average failure rate (AFR) [on Backblaze](https://www.backblaze.com/blog/backblaze-hard-drive-stats-for-2020/), to avoid especially failure-prone disks, but I didn't hyper-optimize for low failure rate. It's irrational to pay twice as much for a drive that has a failure rate of 0.5% rather than 1%. You're spending twice the money to reduce failure rate by only 0.5%.

7200 vs 1000 RPM

The Fractal Design Node 304 has six drive bays, so I decided to start with four 8 TB disks to give myself room for expansion later. With raidz1, that would give me 22.5 TB of usable storage to start. A fifth disk would bring me to 30.9 TB, and a sixth would get me 37 TB, so this should last me a while.

Price. For a 8 TB drive, you can pay anywhere from $130 to $400 per disk. For a server with four disks, that's a difference of $1k, so those price differences matter.

I cho

### Disk (OS)

I need a dedicated disk to install the TrueNAS OS, but from what I'd read, TrueNAS doesn't demand much of its OS disk. The OS needs at least XX of space, but it otherwise doesn't read or write much to the OS disk.

{{<img src="kingston-a400.jpg" alt="TODO" maxWidth="300px" hasBorder="true" caption="The Kingston A400 is a fantastic value as a 120 GB M.2 SSD for only $32.">}}

I went with the Kingston A400 because it was incredibly inexpensive &mdash; $32 for a 120 GB M.2 disk. And I love M.2 disks. They don't require any cabling. They just tuck away into the motherboard, take up nearly zero space, and you never have to touch them again.

### Memory

I find memory extremely boring to shop for. I perhaps should have looked more into benchmarks since ZFS is so RAM-intensive, but honestly I didn't. I went with a brand name I trust and looked for sticks below $150 that were listed as compatible with the ASUS A320I-K motherboard I chose.

### Power supply unit (PSU)

There are different ratings for PSUs like bronze, silver, gold, platinum that reflect the power efficiency. The differences are fairly small, so I didn't optimize for that.

The main choices are case modularity and power capacity. You want to have enough wattage to support your components plus any that you might add in the future. For a system like this, basically any PSU would have more than enough capacity. According to PCPartPicker, the total power consumption of all my components is only 218 W, so 500 W gives me plenty of breathing room.

I specifically chose a semi-modular PSU because I wanted to minimize clutter. Having a single cable supply power to multiple disks allowed. I didn't want full modular because I didn't want a separate cable for each disk. And I didn't want to go non-modular because then I'd have a bunch of unused power cables in my case.

### 90-degree SATA cables

{{<img src="holding-sata.jpg" alt="Me holding 90-degree SATA cable" maxWidth="400px" caption="I needed 90-degree SATA cables to work within the case's space constraints">}}

One item I've never purchased before was these 90-degree SATA cables. I didn't realize I needed them until I tried connecting all the disks and realized there wasn't enough space to plug in a standard SATA cable. These slim 90-degree cables solved the problem.

{{<img src="sata-just-barely.jpg" alt="TODO" maxWidth="500px">}}

## What's missing?

There are a few components that I intentionally excluded from my build due to price, complexity, or physical space.

### Graphics card (GPU)

With scarce physical space and motherboard ports, I didn't want a dedicated graphics card. I chose a motherboard and CPU combination that supported graphics rendering without an external card.

### Host bus adaptor (HBA)

Many NAS builds include a [host bus adaptor](https://www.truenas.com/community/threads/whats-all-the-noise-about-hbas-and-why-cant-i-use-a-raid-controller.81931/). An HBA is a chip that goes into the PCI slot of a motherboard and increases the number of disks the motherboard can support.

One of the popular HBAs I see is the IBM ServeRAID M1015, which you can find for under $100. The ServeRAID M1015 has two SAS ports, and each SAS port can accept four SATA drives via a [SAS to SATA cable], so the HBA can add capacity for eight additional disks. To use the M1015 with ZFS, you need to [cross-flash it to IT mode](https://www.servethehome.com/ibm-serveraid-m1015-part-4/).

Honestly, the whole process of cross-flashing sounds tedious and frustrating, so I decided to punt on it until I need an HBA. My motherboard had four SATA ports, so I could start with four disks just by using the available SATA ports. When I need more disks, I'll buy an HBA. I made sure to leave a PCI slot available for that purpose.

### ECC RAM

In researching different TrueNAS builds, I saw several recommendations that said error correct code (ECC) RAM was a must-have. I ultimately decided against ECC RAM and just used standard, consumer-grade RAM.

In non-ECC RAM, it's possible for the RAM to accidentally flip a bit and corrupt your data in memory. For a system like ZFS that sends a lot of data through RAM, this is a scary thought. ECC RAM reduces this risk, as it stores a checksum of the data.

The two main downsides of ECC RAM are the expense and performance. ECC RAM is significantly more expensive than non-ECC RAM. And beyond the RAM sticks themselves, you also have to buy an ECC-compatible motherboard and CPU. If you're using server-grade components anyway, but you're not going to find ECC support on low-end consumer grade hardware. ECC RAM is also slower, as it has to do the additional work of validating the checksum on all RAM operations.

While I obviously don't want my server to corrupt my data in RAM, I've also been using computers for the past 30 years without ECC RAM, and I've never noticed data corruption. If I was building a server that was going to be under heavy load from multiple users all day, then I'd spring for a build with ECC RAM. But for home needs, I think simple consumer-grade RAM should be fine.

### SLOG disk

Many ZFS builds include a separate, dedicated disk called the [SLOG (separate intent log)](https://www.truenas.com/docs/references/slog/). The SLOG [improves write speeds](https://www.servethehome.com/exploring-best-zfs-zil-slog-ssd-intel-optane-nand/) significantly.

People generally use a high-performance SSD as their SLOG. The idea is that writing to an SSD is orders of magnitude faster than writing to multiple spinning disks. When an application writes data, ZFS can quickly write it to the fast SSD, tell the application that the write succeeded, then asynchronously move the data from the SSD to the storage pool.

I decided against the SLOG disk because I'm limited by ports and drive bays. Adding a SLOG disk meant either forfeiting my only PCI slot or one of my six drive bays. I'd rather leave myself room to expand capacity later. If I were building a rack-mounted server with 16 drive bays, I definitely would have reserved one for a SLOG disk, but it didn't seem worth it in my build.

Most of my disk operations on this server will be over the network. I suspected that my network would be the bottleneck rather than disk write speed.

## Parts list

| Category                    | Component                                                                                                                            | I paid        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| CPU                         | [AMD Athlon 3000G](https://www.newegg.com/amd-athlon-3000g/p/274-000M-001B8)                                                         | $105.13       |
| Motherboard                 | [ASUS Prime A320I-K](https://www.newegg.com/asus-prime-a320i-k/p/N82E16813119200)\*                                                  | $97.99        |
| Graphics                    | None needed &mdash; motherboard has native graphics support                                                                          | $0            |
| Disk (OS)                   | [Kingston A400 120GB](https://www.newegg.com/kingston-a400-120gb/p/N82E16820242474)                                                  | $31.90        |
| Memory                      | [CORSAIR Vengeance LPX 32GB CMK32GX4M2A2400C14 (2 x 16GB)](https://www.newegg.com/corsair-32gb-288-pin-ddr4-sdram/p/N82E16820233854) | $127.99       |
| Power                       | [EVGA 110-BQ-0500-K1 500W 80+ Bronze Semi-Modular](https://www.newegg.com/evga-500-bq-110-bq-0500-k1-500w/p/N82E16817438101)         | $44.99        |
| Case                        | [Fractal Design Node 304 Black](hhttps://www.newegg.com/black-fractal-design-node-304-mini-itx-tower/p/N82E16811352027)              | $99.99        |
| SATA cables                 | [Silverstone Tek Ultra Thin Lateral 90 Degree SATA Cables](https://www.newegg.com/p/N82E16812162042) (x2)                            | $22.30        |
| **_Total (without disks)_** |                                                                                                                                      | **_$530.29_** |
| Disk (Storage)              | [Toshiba N300 HDWG480XZSTA 8TB 7200 RPM](https://www.newegg.com/toshiba-n300-hdwg480xzsta-8tb/p/N82E16822149793) (x2)                | $372.79       |
| Disk (Storage)              | [Seagate IronWolf 8TB NAS Hard Drive 7200 RPM](https://www.newegg.com/seagate-ironwolf-st8000vn004-8tb/p/N82E16822184796) (x2)       | $359.98       |
| **Total**                   |                                                                                                                                      | **$1,263.06** |

\* Caveat: This motherboard won't work out of the box with the AMD Athlon 3000G CPU. See details below.

## Compared to off-the-shelf products

For comparison, here are some off-the-shelf solutions at similar price points.

| Product       | 2022 Budget NAS                                                           | Synology DS920+                                                                          | QNAP TS-473A-8G-US                                                                 |
| ------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Disk bays     | 6                                                                         | 4                                                                                        | 4                                                                                  |
| RAM           | 32 GB                                                                     | 4 GB                                                                                     | 4 GB                                                                               |
| Max RAM       | 32 GB                                                                     | 8 GB                                                                                     | 8 GB                                                                               |
| CPU benchmark | [4479](https://www.cpubenchmark.net/cpu.php?cpu=AMD+Athlon+3000G&id=3614) | [3002](https://www.cpubenchmark.net/cpu.php?cpu=Intel+Celeron+J4125+%40+2.00GHz&id=3667) | [4588](https://www.cpubenchmark.net/cpu.php?cpu=AMD+Ryzen+Embedded+V1500B&id=4304) |
| Price         | $530.29                                                                   | $549.99                                                                                  | $549                                                                               |

The total cost of my build is similar to off-the-shelf solutions, but I get more value for my money. I have 8x as much RAM, and I'm not locked in to any closed-source, vendor-specific OS platform.

## Build photos

{{<img src="all-parts.jpg" alt="Photo of parts in retail packages" caption="All the parts in their retail boxes" maxWidth="600px">}}

{{<img src="motherboard-installed.jpg" alt="Photo of motherboard in the case" caption="It was straightforward to install the ASUS Prime A320-I-K motherboard in the Fractal Design Node 304 case." maxWidth="600px">}}

{{<img src="ssd-installed.jpg" alt="Photo of motherboard with M.2 SSD installed" caption="I love installing M.2 SSDs. No wires or rails &mdash; one screw and you're done." maxWidth="600px">}}

{{<img src="psu-installed.jpg" alt="Photo of PSU installed" caption="This is the first case I've ever seen that doesn't expose the back face of the PSU outside of the case. Instead, the case has a short NEMA extension cable that routes the internal PSU to the case's own external power input." maxWidth="600px">}}

{{<gallery caption="It was such a tight squeeze between the motherboard's SATA ports and the PSU that I had to buy special 90-degree slim SATA cables.">}}
{{<img src="90-degree-sata-installed.jpg" alt="Photo of SATA cables before PSU is installed" maxWidth="500px">}}
{{<img src="sata-just-barely.jpg" alt="Photo of SATA cables with just barely enough space next to the PSU" maxWidth="280px">}}
{{</gallery>}}

{{<img src="cpu-ram-pwr.jpg" alt="Photo of motherboard with everything connected" caption="After connecting everything to the motherboard (except for the CPU fan)" maxWidth="600px">}}

{{<img src="completed-build.jpg" alt="Photo of NAS server on my desk" caption="The completed build" maxWidth="800px">}}

## Building the server with TinyPilot

Longtime readers of this blog will recall that I built a device on top of the Raspberry Pi specifically for building and managing headless servers. It's called [TinyPilot](/tinypilot/). This was the third server I've built with TinyPilot and the first I built with the new TinyPilot Voyager 2.

I'm obviously biased, but building this server with the Voyager 2 was a great experience. I never had to connect a keyboard or monitor to the server. I could monitor video output, boot to BIOS, and mount the TrueNAS installer image from the TinyPilot browser window.

The one place where TinyPilot fell down was in upgrading the BIOS. TinyPilot can mount disk images like `.img` and `.iso` files, but it doesn't yet know how to share raw files with the target computer. When I needed to load the XX files for the ASUS BIOS upgrade, I shamefully put them on a USB thumbdrive instead of keeping it a pure TinyPilot build. But I hope to add that feature soon so that my next BIOS upgrade can be all TinyPilot.

## Build issues

### My first PSU was dead

I got everything hooked up, and nothing. I've built several computers, and this is one of the worst feelings. You just have no feedback, and you have to go on a long hunt to find the defective part or the bad connection.

I disconnected everything except for the PSU's cables to the motherboard and the power button. Still, no luck. I tried removing the RAM. Same thing. I tried re-seating the CPU. Same thing.

Finally, I took apart my 2017 homelab VM server and connected its PSU to the NAS motherboard. It powered on! So, I successfully identified the problem as a defective PSU. I ordered a replacement of the same model, and it powered on

Success! But there was no video output. This led to the next issue...

### Is this BIOS version incompatible? Or am I an idiot?

I got the system to power on, but there was no video display. Oh no! Did I misunderstand what was required for the motherboard's on-board video to work?

After some research, I saw some comments that the ASUS Prime A320I-K requires a BIOS upgrade before it can work with the Athlon 3000G. I remember seeing that during parts selection, and I breezed by it. I've done BIOS updates in the past, and they're no big deal. I didn't think about how I'd do a BIOS when I _don't have a CPU_.

I caught a lucky break when I realized the Ryzen 7 CPU from my [2017 homelab VM server](/building-a-vm-homelab-2017/) was compatible with the ASUS Prime A320 [from BIOS version 0212](https://www.asus.com/us/Motherboards-Components/Motherboards/PRIME/PRIME-A320I-K/HelpDesk_CPU/). I borrowed the CPU and GPU from that server, and I got my new NAS server to boot!

{{<img src="boot-2203.jpg" alt="Screenshot of ASUS BIOS at version 2203" caption="I was able to use parts from my old [2017 homelab VM server](/building-a-vm-homelab-2017/) to upgrade the BIOS." maxWidth="800px" hasBorder="true">}}

Strangely, even after I got the system to boot with borrowed parts, the motherboard reported that it was running BIOS version 2203, which ASUS claims _is_ compatible with the AMD Athlon 3000G CPU.

{{<img src="a320i-k-compat.png" alt="Screenshot of ASUS support page saying ASUS Prime A320I-K supports Athlon 3000G at version 2203" caption="The ASUS Prime A320I-K [CPU compatibility page](https://www.asus.com/Motherboards-Components/Motherboards/PRIME/PRIME-A320I-K/HelpDesk_CPU/) claims it's compatible with the Athlon 3000G starting at BIOS version 2203." hasBorder="true">}}

After upgrading to 5862, I _still_ couldn't get a boot. Then, I realized that I was plugging in the HDMI cable into the DisplayPort port by mistake. So it's possible that this whole thing was just me being an idiot and not realizing I had the wrong port. Was I doing that the whole time? Was this whole parts-borrowing fiasco even necessary?

I can't remember if I 100% confirmed I had the right video port when I was testing pre-BIOS upgrade. I _think_ I did, but it's possible I had it wrong the whole time.

Normally, I'd accept the blame, but there was a lot of flakiness in the ASUS BIOS, so I'm still not sure whether the compatibility isn't what ASUS says or if I just was plugging an HDMI cable into a DisplayPort hole the entire time.

{{<img src="3000g-boot.png" alt="Screenshot of point in video when I get first boot" caption="The moment I finally got a boot screen with the Athlon 3000G installed" maxWidth="800px" hasBorder="true">}}

## Performance benchmarks

One of the surprises to me in writing this up is that I couldn't find any good benchmarking tools for measuring NAS performance. There are tools that can benchmark local disk writes, but those will miss bottlenecks in the Samba network sharing stack or in the networking equipment.

To benchmark my system, I just used robocopy with lots of files.

Large file write, encrypted volume

Large file write, unencrypted volume

```ps
robocopy /s `
  C:\tmp\nas-benchmark-files\small-files\ `
  \\truenas\vids\scratch\small-files
```

```ps
robocopy /s `
  C:\tmp\nas-benchmark-files\large-files\ `
  \\truenas\vids\scratch\large-files
```

```ps
robocopy /s `
  \\truenas\vids\scratch\large-files `
  C:\tmp\nas-benchmark-files\read-scratch
```

## Power usage

TODO:

## Final thoughts

### CPU

The Athlon 3000G has worked well. I perhaps could have even gone with an even slower CPU because my TrueNAS dashboard reports that CPU load has been 99% idle for the past month of usage:

{{<img src="truenas-cpu.png" alt="Graph of CPU usage in March showing almost entirely <10% usage" maxWidth="800px" caption="TrueNAS barely uses any CPU capacity.">}}

The most important thing about the CPU was that it supported AMD's Radeon video technology, which meant that I didn't need a separate GPU, and it served that purposed.

### Motherboard

The biggest flaw with the motherboard was its limited compatibility. The AMD 3000G came out in XX and the XX motherboard came out in XX, so it should have been compatible. It even advertised the BIOS revision it shipped with as compatible with my CPU, but it didn't work until I upgraded to BIOS revision XX.

The other weakness with the motherboard was how poorly the BIOS update worked. It's supposed to support native updating, but it didn't work. I had to do the update myself.

But aside from that, it's been fine as far as BIOS goes.

I'm happy with it, and the BIOS UI is fine, but the BIOS itself is flaky. It didn't work with the Athlon 3000G CPU even though it claims that revision XX was compatible. It worked better after I upgraded to revision XX.

Its BIOS upgrade utility was completely broken. It claimed that I had the latest BIOS when I didn't, so I had to upgrade manually by downloading the files and loading them on a thumbdirve.

{{<gallery caption="The ASUS EZ Flash utility claimed I had the latest BIOS at version 2203. The ASUS website offered BIOS version 5862, so I had to update manually.">}}
{{<img src="ez-bios-1.png" alt="TODO" maxWidth="450px">}}
{{<img src="ez-bios-2.png" alt="TODO" maxWidth="450px">}}
{{</gallery>}}

I also missed that the A320I-K supports a maximum of 32 GB of RAM. If I want to expand storage, the server might become RAM-bound because ZFS is so memory intensive.

If I were doing it again, I'd go with the Gigabyte B550I. It's $50 more, but it supports 64 GB of RAM, and it has an extra M.2 slot, so I could add a SLOG disk if I ever wanted one.

### Case

I was disappointed in the case. When I built my VM server with the Fractal Design Meshify C, I kept discovering features that delighted me. On this build, it was the opposite. I kept thinking, "Why is this a problem in this case when this has never been a problem for me before?"

It looks nice on the outside, but I found it awkward to work in. There was barely any documentation, and some of the case mechanisms weren't obvious.

It's my first mini-ITX build, and I know the case designers have to make sacrifices in the name of minimizing size, so maybe I'm judging too harshly, but I was definitely disappointed.

### Disk (Data)

It's a bit too early to judge disks, so check back in about five years to see how I'm liking them, but so far, so good.

My biggest worry was that they'd be too noisy, but I can't hear them at all.

### Disk (OS)

The Kingston A400 is working fine. TrueNAS puts such a minimal load on the OS disk that there isn't much for it to do, but it's been fine. It has 90 GB free, so I could have used an even smaller drive.

There's almost zero disk activity in TrueNAS' reporting. There's a tiny I/O read every week as part of some scheduled task, but that's it.

{{<img src="truenas-io.png" alt="Graph of disk I/O on OS disk showing minimal activity" maxWidth="800px" caption="TrueNAS rarely touches its OS disk after booting.">}}

### TrueNAS

I've been using the TrueNAS system for a few months

User experience is miles better on the Synology. Synology feels like they're trying hard to make their system usable to people who don't need to understand the underlying technologies, whereas TrueNAS's UI feels like an afterthought designed by people who prefer to do everything from the command-line.

It took me several tries to even figure out how to create a new volume and share it on my network with correct permissions. You have to jump between several different menus to just set up a drive and share it. With Synology, it's hard to get it wrong because there's a complete UI flow when you set up a volume where Synology helps you configure it on the network and give users permissions.

I found third-party apps _much_ harder to install on TrueNAS. I use Plex Media Server to stream my movie and TV collection. Plex is a pre-configured plugin on TrueNAS, so this should be one of the easiest apps to install. TrueNAS required an hour of fiddling and searching through documentation. For Plex to access my storage, I had to:

1. Create a BSD jail
1. SSH into that jail
1. Find the UID of the user under the jail system
1. Create a matching user with a matching UID on the TrueNAS host system
1. Edit permissions on the TrueNAS host system to give the jail user access to my media files

By comparison, installing Plex on Synology takes about two minutes. You breeze through a user-friendly wizard, and you're done.

I'm sticking with TrueNAS because I care more about platform lock-in than almost anything else. I like supporting open-source software. If I were to recommend an OS to a friend who wasn't as ideologically driven, I'd definitely recommend Synology.

### ZFS

ZFS is cool, but I actually haven't found a need for the features people are excited about. I see people talking about snapshotting, but I don't create snapshots and I haven't found a need for them. I have offsite backup snapshots with restic, and they're not especially convenient, but it takes me about 15 minutes to recover it. I've been using restic for two years, and I only recall needing to find a snapshot once.

I do like how easy it is to create new filesystems with different properties. And it's nice that it just does its job and I don't have to think about it much.

TODO: Link to YouTube video
