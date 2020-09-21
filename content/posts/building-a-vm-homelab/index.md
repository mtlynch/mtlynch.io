---
title: Building a Homelab VM Server (2020 Edition)
tags:
- virtualization
- homelab
- proxmox
- esxi
description: I built a home server to host my development VMs and went a bit overboard.
date: '2020-09-25'
hide_affiliate_warning: true # No affiliate links in this article
images:
- building-a-vm-homelab/build-components.jpg
---
For the past five years, I've done all of my software development in virtual machines (VMs). Every project gets its own dedicated VM. I never have to worry about dependency conflicts or TCP port collisions, as the VMs isolate projects from one another.

Three years ago, I took things to the next level by [building a dedicated homelab server](/building-a-vm-homelab-2017) to host all of my VMs. It's been a fantastic investment and greatly improved my workflows' reliability and speed.

In the past few months, I began hitting the limits of my VM server. My projects have become more resource-hungry, and there were fundamental mistakes in my first build, so I decided to build a brand new homelab VM server for 2020.

{{<img src="build-components.jpg" alt="Photo of my server build components" maxWidth="600px" caption="Components of my new VM server build (most of them, anyway)">}}

## I don't care about the backstory; show me your build!

If you're not interested in the "why" of this project, you can jump [directly to the build](#my-2020-server-build).

## Why build a whole VM server?

Originally, I used VirtualBox to run VMs from my Windows desktop, but reboots became a huge hassle. Between forced reboots from Windows Update, voluntary reboots to complete software installs, and the occasional OS crash, I had to restart my entire suite of development VMs three to five times per month.

A dedicated VM server spares me most reboots. The VM host runs a minimal set of software, so crashes and mandatory reboots are rare.

Cloud servers could serve the same function and save me the trouble (fun!) of maintaining my own hardware, but it's prohibitively expensive. For VM resources similar to my homelab server, AWS EC2 instances would cost $6k per year:

{{<img src="aws-pricing.png" alt="Screenshot showing AWS EC2 instances would cost $6,112.68 per year" maxWidth="600px" hasBorder="true" caption="Using AWS instead of my homelab server would [cost me over $6k per year](https://calculator.aws/#/estimate?id=d61c9cdebdd3b7eac861f4351cdabcbc1c5ac97c).">}}


{{<notice type="info">}}

**What's a "homelab?"**

Homelab is just a colloquial term that's grown in the past few years. Homelab servers are no different from any other servers, except that you build them at home rather than in an office or data center. Many people use them as a low-stakes practice environment before they try using the same tools to manage software for enterprise clients.

{{</notice>}}

## Learning from past mistakes

My 2017 server build served me well, but in three years of using it, I definitely recognized areas for improvement.

### 1. Keep storage local

When I built my first VM server, my Synology NAS had 6 TB of storage available. With all that network disk, I thought, "why buy more storage than the bare minimum to boot the host OS?"

That turned out to be a dumb idea.

First, running VMs on network storage creates a strict dependency on the disk server. Synology publishes OS upgrades every couple of months, and these always require reboots. With my VMs running on top of Synology's storage, I had to shut down each one before I initiated a Synology upgrade. It was the same reboot problem I had when I ran VMs on my Windows desktop.

{{<img src="dsm-upgrade.png" alt="Screenshot of Synology upgrade screen" maxWidth="550px" hasBorder="true" caption="The OS on my storage server requires frequent upgrades">}}

Second, random access is **slow** for network storage. At the time of my first build, most of my development work was on backend Python and Go applications. They didn't hit the disk heavily, but I've since expanded into more frontend web development. Every modern web framework uses Node.js, which means that every project has anywhere from 10k-200k random JavaScript files in its dependency tree. Node.js builds involve tons of random disk access, a worst-case scenario for network storage.

### 2. Pick better VM management software

In my first server, I evaluated two options for VM management: Kimchi and VMWare ESXi. VMWare was far more polished and mature, but Kimchi charmed me with its scrappy spirit and open-source nature.

{{<img src="kimchi-guests.png" alt="Screenshot of Kimchi" maxWidth="600px" hasBorder="true" caption="Early listing of my VMs through Kimchi's web UI">}}

Of course, IBM stopped supporting Kimchi almost immediately after I installed it.

{{<img src="i-use-kimchi.png" alt="Graph of commits to Kimchi repository showing commits ending right after I started using it" maxWidth="600px" hasBorder="true" caption="Code commits to Kimchi, which stop almost immediately after I started using it">}}

After a few months, Kimchi revealed itself to be extremely flaky. I often had to click a VM's "clone" or "shutdown" button multiple times before it would obey me. And there were infuriating UI bugs where menus would disappear or shift position right before I clicked them.

### 3. Plan for remote administration

{{<img src="vm-server-front.jpg" alt="Photo of my old VM server" maxWidth="250px" align="right" caption="My VM server is tucked away in the corner, which is convenient except for the occasional instance where I need physical access.">}}

If you read the above and thought, "Kimchi is just software. Why did he have to build a whole new server to install a different VM manager?" It's because I failed to anticipate the importance of remote administration.

My VM server is just a headless server that sits in the corner of my office. And that's fine 99% of the time when I can just SSH in or use the web interface. But for the 1% of the time where the server fails to boot or I want to install a new host OS, it's a huge pain. I have to drag the server over to my desk, disconnect my desktop keyboard and monitor, fix whatever needs fixing, and then put everything back to how it was.


For my next build, I wanted a virtual console with physical-level access to the machine as soon as it powered on. I was thinking something like Dell's iDRAC or HP's iLO.

{{<img src="idrac.png" alt="Screenshot of Dell iDRAC interface" maxWidth="600px" caption="Dell iDRAC was one option I considered for remote server management.">}}

## Choosing components

### CPU

The first component I selected for my new server was the CPU.

With my first VM server, I used a [Ryzen 7 1700](https://www.amd.com/en/products/cpu/amd-ryzen-7-1700). It had 8 cores, 16 threads and was [the hot new CPU at the time](https://www.tomshardware.com/reviews/amd-ryzen-7-1700-cpu-review,5009.html).

But when I showed off my build on [/r/homelab](https://www.reddit.com/r/homelab/), reddit's homelab subcommunity, they mocked me as a filthy amateur because I used *consumer* parts. The cool kids used *enterprise* parts.

{{<img src="do-u-even.png" alt="redditor /u/pylori asks 'Bro, do you even homelab? Seriously you're worried about hardware failure on enterprise gear that's built to outlast newer consumer stuff?'" caption="[/r/homelab was unimpressed](https://www.reddit.com/r/homelab/comments/69sk2v/building_a_homelab_vm_server/dh93sur/) with my first build.">}}

Resolved to never let /r/homelab make fun of me again, I ventured into enterprise server hardware. I even got a little fancy and decided to build a system with dual CPUs.

I wanted the best CPU performance for my dollar, but it's difficult to find that. There are sites that track this, but they base it on the retail price for a brand new CPU. Used server CPUs sell for a fraction of the price and are just as good.

My process for finding the best value was as follows:

1. Browse recent builds on [/r/homelab](https://www.reddit.com/r/homelab/).
1. Look up benchmarks for their CPUs on [cpubenchmark.net](https://www.cpubenchmark.net).
1. Check prices for buying the CPU used on eBay.



The most cost-efficient performance seemed to be in the [Intel Xeon E5 v3](https://ark.intel.com/content/www/us/en/ark/products/series/78583/intel-xeon-processor-e5-v3-family.html) family, especially the 2600 models. I settled on the [E5-2680 v3](https://ark.intel.com/content/www/us/en/ark/products/81908/intel-xeon-processor-e5-2680-v3-30m-cache-2-50-ghz.html).  They had benchmarks of 15618 and cost ~$130 used on eBay.

{{<gallery  caption="The Intel Xeon E5-2680 v3 [scores 15618 on cpubenchmark.net](https://www.cpubenchmark.net/cpu.php?cpu=Intel+Xeon+E5-2680+v3+%40+2.50GHz&id=2390).">}}
  {{<img src="xeon-e5-2680v3.jpg" alt="Photo of Intel Xeon E5-2680 v3 CPU" maxWidth="420px" linkUrl="https://www.newegg.com/supermicro-mbd-x10drl-i-o-intel-xeon-processor-e5-2600-v3-family-motherboard-supports-this-maxi/p/N82E16813182944?&quicklink=true">}}
  {{<img src="xeon-benchmark.png" alt="Screenshot of Xeon E5-2680 v3's 15618 score on cpubenchmark.net" maxWidth="490px" hasBorder="true">}}
{{</gallery>}}

 For context, my previous build's Ryzen 7 had a benchmark of 14611. So with dual-E5-2680s, I'd more than double the processing power from my previous server.

### Motherboard

{{<img src="supermicro-mbd-x10dal.jpg" alt="Photo of SuperMicro MBD-X10DAL-I-O motherboard" maxWidth="280px" align="left" linkUrl="https://www.newegg.com/supermicro-mbd-x10drl-i-o-intel-xeon-processor-e5-2600-v3-family-motherboard-supports-this-maxi/p/N82E16813182944?&quicklink=true">}}

The downside of dual-CPU was that it limited my options for motherboards. Only a handful support dual Intel 2011-v3 CPUs, and the prices ranged from $300-850, which was WAY more than I expected to spend on the motherboard.

I chose the [SuperMicro MBD-X10DAL-I-O](https://www.newegg.com/supermicro-mbd-x10drl-i-o-intel-xeon-processor-e5-2600-v3-family-motherboard-supports-this-maxi/p/N82E16813182944?&quicklink=true), which at $320 was at the low end of similar motherboards, but it was still **five times** what I paid for [my last one](/building-a-vm-homelab-2017/#motherboard).

### Memory

{{<img src="crucial-ct4k16g4rfd4213.jpg" alt="Photo of Crucial RAM sticks" maxWidth="200px" align="right" linkUrl="https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278">}}

There seems to be a lot less choice in memory for server hardware. With consumer hardware, you find lots of reviews and benchmarks online, but server RAM all looked the same to me.

I just went with [Crucial CT4K16G4RFD4213 64 GB (4 x 16 GB)](https://www.newegg.com/crucial-64gb-288-pin-ddr4-sdram/p/N82E16820148843?Item=9SIAHZUB514397) because I trusted the brand and wanted 64 GB of RAM.

### Storage

{{<img src="ssd.jpg" alt="Photo of Samsung 860 EVO" maxWidth="200px" align="right" linkUrl="https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278">}}

I love M.2 SSDs, as they're small, have great performance, and tuck away in the motherboard so neatly. Sadly, the MBD-X10DAL-I-O doesn't support M.2.

Instead, I stuck with traditional old SATA. I bought a [1 TB Samsung 860 EVO](https://www.newegg.com/samsung-860-evo-series-1tb/p/N82E16820147673?Item=N82E16820147673). I typically allocate 40 GB of space to each VM, so 1 TB would give me plenty of room. If I need to upgrade later, I can always buy more disks.

### Power

{{<img src="psu.jpg" alt="Photo of Corsair CX550M 550W 80 Plus Bronze" maxWidth="200px" align="left" linkUrl="https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278">}}

Choosing a power supply unit (PSU) isn't that interesting, so I again chose mainly by trusted brand, the [Corsair CX550M 550W 80 Plus Bronze](https://www.newegg.com/corsair-cx-series-cx550m-550w/p/N82E16817139147?Item=N82E16817139147)

The wattage on all of my components added up to 400 W, so 450 W would have been sufficient. But the 550 W version was only $10 more, which seemed like a good price for an extra 100 W of breathing room.

The one important feature was semi-modular cabling. In my last build, I made the mistake of using non-modular cabling, which means that the PSU's cables are always attached, whether you're using them or not. My VM servers have very few internal components so the extraneous power cables created clutter. With semi-modular cabling, I can keep things tidy by removing unused cables from the PSU.

### Fans

{{<img src="hyper-212.jpg" alt="Photo of Hyper 212 CPU fan" maxWidth="200px" align="right" linkUrl="https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278">}}

The dual-CPU build unexpectedly made cooling a challenge. Most fans are humungous! The motherboard doesn't leave much space between the two CPU sockets, so I looked carefully for fans thin enough to work side-by-side. A pair of [Cooler Master Hyper 212s](https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278) fit the bill.

### Case

{{<img src="fractal-meshify.jpg" alt="Photo of Fractal Meshify C case" maxWidth="200px" align="left" linkUrl="https://www.newegg.com/black-fractal-design-meshify-c-atx-mid-tower/p/N82E16811352085?Item=N82E16811352085">}}

My server just hides in the corner, so I didn't want any clear panels or flashy lights. The [Fractal Design Meshify C Black](https://www.newegg.com/black-fractal-design-meshify-c-atx-mid-tower/p/N82E16811352085?Item=N82E16811352085) had positive reviews and seemed like a simple, quiet case.

### Graphics

{{<img src="msi-geforce-gt-710.jpg" alt="MSI GeForce GT170 GPU" maxWidth="200px" align="right" linkUrl="https://www.newegg.com/black-fractal-design-meshify-c-atx-mid-tower/p/N82E16811352085?Item=N82E16811352085">}}

For a headless server, the graphics card is of little importance. It's still necessary so I can see the screen during the initial install and the occasional debugging session, so I went with the [MSI GeForce GT 710](https://www.newegg.com/black-fractal-design-meshify-c-atx-mid-tower/p/N82E16811352085?Item=N82E16811352085), as an easy, cheap option.

### Remote administration

I looked into remote administration solutions and was blown away by how expensive they were. At first, I thought I'd use Dell iDRAC, but the remote console requires a $600 enterprise license. I looked at KVM over IP solutions, but those cost $600-1000 as well.

{{<img src="raritan-kvm.png" alt="Screenshot of purchsase page for Raritan Dominion KVM over IP" caption="Commercial KVM over IP devices cost between $500 and $1,000." maxWidth="600px" hasBorder="true">}}

I took the unusual approach of building my own KVM over IP device using a Raspberry Pi. I call it [TinyPilot](https://tinypilotkvm.com).

{{<gallery caption="Using [TinyPilot](https://tinypilotkvm.com) to install an OS on my server">}}
  {{<img src="tinypilot-server.jpg" alt="Photo of TinyPilot plugged into server" maxWidth="260px">}}

  <a href="bios-mouse.gif"><img src="bios-mouse.gif" alt="Screen capture of Proxmox install through TinyPilot" style="max-width: 500px; object-fit: contain;"></a>

{{</gallery>}}

 It captures HDMI output and simulates keyboard and mouse input from its USB port, so it provides the same access you'd have if you physically connected a real keyboard, mouse, and monitor. The software is all open source, and [my recent article](/tinypilot) explains how I built it.

{{<tinypilot-ad headline="Install a new server OS right from your browser" copy="TinyPilot provides a remote console for your headless server. Starting at just $169.99.">}}

## My 2020 server build

| Category    | Component                               | I paid        |
|-------------|-----------------------------------------|---------------|
| CPU         | [Intel Xeon E5-2680 v3](https://ark.intel.com/content/www/us/en/ark/products/81908/intel-xeon-processor-e5-2680-v3-30m-cache-2-50-ghz.html) (x2, used)        | $264.82       |
| Motherboard | [SuperMicro MBD-X10DAL-I-O](https://www.newegg.com/supermicro-mbd-x10drl-i-o-intel-xeon-processor-e5-2600-v3-family-motherboard-supports-this-maxi/p/N82E16813182944?&quicklink=true)               | $319.99       |
| Disk        | [Samsung 860 EVO (1TB)](https://www.newegg.com/samsung-860-evo-series-1tb/p/N82E16820147673?Item=N82E16820147673)                   | $149.99       |
| Memory      | [Crucial CT4K16G4RFD4213 64GB (4 x 16GB)](https://www.newegg.com/crucial-64gb-288-pin-ddr4-sdram/p/N82E16820148843?Item=9SIAHZUB514397) | $285.99       |
| Power       | [Corsair CX550M 550W 80 Plus Bronze](https://www.newegg.com/corsair-cx-series-cx550m-550w/p/N82E16817139147?Item=N82E16817139147)      | $79.99        |
| Graphics    | [MSI GeForce GT 710](https://www.newegg.com/msi-geforce-gt-710-gt-710-1gd3h-lp/p/N82E16814127931?Item=N82E16814127931)                      | $44.99        |
| Case        | [Fractal Design Meshify C Black](https://www.newegg.com/black-fractal-design-meshify-c-atx-mid-tower/p/N82E16811352085?Item=N82E16811352085)          | $84.99        |
| CPU Fans    | [Cooler Master Hyper 212](https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278) (x2)            | $72.98        |
| **Total**   |                                         | **$1,303.74** |

&nbsp;

{{<gallery caption="The Meshify C has been my favorite case for cable management. It includes built-in velcro straps to organize the cables and little rubber gates to hide them away.">}}
  {{<img src="cable-management-1.jpg" alt="Photo of outer side of empty case">}}
  {{<img src="cable-management-2.jpg" alt="Photo of empty case interior">}}
{{</gallery>}}

&nbsp;

{{<gallery caption="Installing the motherboard, CPU, RAM, and fans">}}
  {{<img src="installing-cpu.jpg" alt="Photo of motherboard with CPUs installed">}}
  {{<img src="install-everything.jpg" alt="Photo of motherboard with all components installed">}}
{{</gallery>}}

{{<img src="build-completed.jpg" alt="My completed homelab VM server build" maxWidth="600px" caption="The completed build, in its new home between my battery backup and cable modem">}}

## VM Management: Proxmox

As I mentioned above, I needed to find a new VM Management platform after Kimchi left me out in the cold. The solution I landed on was [Proxmox VE](https://www.proxmox.com/en/).

{{<img src="proxmox-summary.png" maxWidth="600px" hasBorder="true" alt="Screenshot of Proxmox dashboard" caption="Proxmox's dashboard of all my VMs">}}

After Kimchi burned me, I was reluctant to try another open source solution, but [Proxmox](https://www.proxmox.com/en/) has been going strong for 12 years, so I felt like they were a safe enough bet. I've been using it for about three months, and I'm enjoying it. Graphics-wise, it's a huge step up from Kimchi, but it definitely lags behind ESXi in slickness. But I had no trouble scripting everything I wanted.

My biggest complaint is that Proxmox is fairly unintuitive. I couldn't even figure out how to install it until I found [Craft Computing's installation tutorial](https://www.youtube.com/watch?v=azORbxrItOo). But once you learn your way around, it's easy to use.

Before settling on Proxmox, I gave [VMWare ESXi](https://www.vmware.com/products/esxi-and-esx.html) another shot. It has a slick interface, but it doesn't support scripting tasks as well as Proxmox. With Proxmox, I created shell scripts that create new VMs and provision them with the software I need non-interactively. ESXi seems to rely more heavily on the web UI. I couldn't find a way to automate most tasks.

## Benchmarks

Before I decommissioned my old VM server, I collected simple benchmarks of my common workflows to compare performance improvements on my new server.

Most of my old VMs ran on NAS storage because it had only 256 GB of local disk. A few of my VMs that had disk-heavy workflows ran on local SSD. In the benchmarks below, I compare performance in three different scenarios:

* 2017 Server (NAS): The typical VM I kept on network storage
* 2017 Server (SSD): For the few VMs I kept on local storage
* 2020 Server: All VMs run on local SSD, so there's no NAS vs. SSD

{{<notice type="info">}}

**Caveat**: These are not rigorous tests. I collected one sample for each test case and did nothing to normalize conditions across tests.

{{</notice>}}

### Provision a new VM

The first benchmark I took was provisioning a new VM. I have a standard VM template I use that runs Ubuntu 18.04 server. Every time I need a new VM, I have a shell script that performs the following steps:

1. Clone the VM from the base template.
1. Boot the VM.
1. Change the hostname from `ubuntu` to whatever the VM's name is.
1. Reboot the VM to pick up the new hostname.
1. Pick up the latest software with `apt update && apt upgrade`.

{{<img src="provision-vm.png" alt="Graph showing 2020 server outperforms my 2017 server on both NAS and SSD">}}

My new server brought a huge speedup to this workflow. Cloning a VM went from 15 minutes on my old server to less than four minutes on the new one. Comparing SSD to SSD is less impresive, as 

On my old system, I typically provisioning a new VM using network storage since I had so little local disk. Including system updates, that process took 15 minutes! With my new server, it's under four minutes.

If I skip the package upgrade step, the speedup is a little less impressive. The new server still blows away performance on NAS storage dropping from eight minutes to just under two and a half. SSD to SSD, it underperforms my previous server. It's likely that cloning a VM is primarily disk-bound, and my old M.2 SSD was faster than my new SATA SSD.

### Boot a VM

Another common workflow is turning on a VM. From the moment I power on a VM, how long until I see the login prompt?

{{<img src="boot-vm.png" alt="Graph showing 2017 server completed in 48.5 seconds on NAS, 32.4 seconds on SSD vs. my 2020 server completed in 18.5 seconds">}}

My old VMs booted in 48 seconds. The few SSD-based VMs on my old system did a little better, showing the login prompt in 32 seconds. My new server blows both away, booting up in only 18 seconds.

### Run What Got Done end-to-end tests

My weekly journaling app, [What Got Done](https://whatgotdone.com) has automated tests that exercise the app's functionality end-to-end. This is one of my most diverse workflows, as it involves compiling a Go backend, compiling a Vue frontend, building a series of Docker containers, and automating Chrome to exercise my app. This was one of the workflows that exhausted resources on my old VM, so I expected big gains here.

{{<video src="wgt-test.mp4" maxWidth="600px">}}

{{<img src="build-wgt.png" alt="Graph showing 2017 SSD server completed in 5.4 minutes vs. 2020 server completed in 5.6 minutes">}}

Surprisingly, there was no significant performance difference between the two. For a cold start (downloading all of the Docker base images), the new server is 2% slower than the old one. When the base Docker images are already available locally, my new server beats my old, but only by 6%. It looks like the bottleneck is largely the disk and browser interaction, so the new server doesn't make much difference.

### Build Is It Keto

One frequent workflow I have is building [Is It Keto](https://isitketo.org), my resource for keto dieters. I generate the site using [Gridsome](https://gridsome.org/), a static site generator for [Vue](https://vuejs.org/).

{{<img src="build-isitketo.png" alt="Graph showing 2017 SSD server completed in 3.7 minutes vs. 2020 server completed in 4 minutes">}}

I expected a big speedup here, so I was surprised when my build got slower. The build seemed to be mostly CPU-bound on my old build, but adding more CPU resources did nothing. My next guess was that it was disk-bound, but I tried moving the files to a RAMdisk and saw no change.

My hypothesis is that it's CPU-bound but parallelizes poorly. My old server has fewer CPU cores, but the cores are individually faster. If the build is limited to five or six threads, it can't take advantage of my new server's 48 cores.

### Train a new Zestful model

[Zestful](https://zestfuldata.com) is my API for parsing recipe ingredients with machine learning. Every few months, I train it on new data that I've labeled and corrected. This is my most CPU-intensive workflow, so I was interested to see how the new system would handle it.

{{<img src="train-zestful.png" alt="Graph showing 2017 SSD server completed in 18.3 minutes vs. 2020 server completed in 8 minutes">}}

Finally, a case where my new 48 CPU cores shine! The new server blows the old one away, training the model in less than half the time. Unfortunately it's a workflow I only run a few times per year.

## Reflections

### There's no shame in consumer hardware

Even though /r/homelab may never respect me, on my next build, I'm planning to return to consumer hardware.

The biggest advantage I see with server components is that they have [better compatibility with server software](/building-a-vm-homelab-2017/#installing-a-host-os). Back in 2017, I [couldn't install ESXi until I disabled multithreading](/building-a-vm-homelab-2017/#also-ran-esxi-65), degrading performance substantially. But that was a limitation with the Linux kernel, and later updates [fixed that](https://www.pcworld.com/article/3176323/kernel-410-gives-linux-support-for-zen-multithreading.html).

Server hardware commands a premium because of their increased reliability. For production workflows, this premium is often worthwhile, but it doesn't make sense for a development server. An occasional crash or bit flip on a dev server shouldn't ruin your day.

### Consider the full cost of dual-CPU

This was the first time I've ever built a dual-CPU computer. It was an interesting experience, but I don't think it's worth the trouble.

Based on my benchmarks, the CPU was so rarely the limiting factor in my workflows. The most damning evidence is Proxmox's graph of my CPU usage over time. In the past few months, I've never pushed CPU load above 11%, so I'm crazy overprovisioned.

{{<img src="max-cpu.png" alt="Graph of showing I never used more than 11% of my CPU" hasBorder="true" caption="My max CPU usage in the last few months never went above 11% of my server's capacity.">}}

The requirement for dual CPUs drove up the cost of motherboard substantially and limited my options. I only found a handful of options for Xeon E5 v3 compatible motherboards, and the only one I found didn't support M.2 disk interface or built-in remote administration tools like some other SuperMicro motherboards do.

### Remote administration makes a huge difference

It's impressive. I was reluctant to install a new VM server because I didn't want the hassle of dragging servers back and forth and swapping cables around. With TinyPilot, I didn't mind testing out different VM management software because  I could wipe and re-provision my server's whole OS right from a browser window on my main desktop. It freed me up to experiment more with operating systems, BIOS settings, and networking options.

## Previous version

* [Building a Homelab VM Server (2017 Edition)](/building-a-vm-homelab-2017)