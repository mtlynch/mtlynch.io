---
title: Building a Homelab VM Server (2020 Edition)
tags:
  - virtualization
  - homelab
  - proxmox
  - esxi
description: I built a home server to host my development VMs and went a bit overboard.
date: "2020-10-06"
lastmod: "2021-12-04"
images:
  - building-a-vm-homelab/build-components.jpg
discuss_urls:
  reddit: https://www.reddit.com/r/homelab/comments/j64za2/building_a_homelab_vm_server/
  hacker_news: https://news.ycombinator.com/item?id=25061823
---

For the past five years, I've done all of my software development in virtual machines (VMs). Each of my projects gets a dedicated VM, sparing me the headache of dependency conflicts and TCP port collisions.

Three years ago, I took things to the next level by [building my own homelab server](/building-a-vm-homelab-2017) to host all of my VMs. It's been a fantastic investment, as it sped up numerous dev tasks and improved reliability.

In the past few months, I began hitting the limits of my VM server. My projects have become more resource-hungry, and mistakes I'd made in my first build were coming back to bite me. I decided to build a brand new homelab VM server for 2020.

{{<img src="build-components.jpg" alt="Photo of my server build components" max-width="600px" caption="Components of my new VM server build (most of them, anyway)">}}

## I don't care about the backstory; show me your build!

If you're not interested in the "why" of this project, you can jump [directly to the build](#my-2020-server-build).

## Why build a whole VM server?

Originally, I used VirtualBox to run VMs from my Windows desktop. That was fine for a while, but reboots became a huge hassle.

Between forced reboots from Windows Update, voluntary restarts to complete software installs, and the occasional OS crash, I had to restart my entire suite of development VMs three to five times per month.

A dedicated VM server spares me most reboots. The VM host runs a minimal set of software, so crashes and mandatory reboots are rare.

{{<notice type="info">}}
**What's a "homelab?"**

Homelab is just a colloquial term that's grown in popularity in the last few years. Homelab servers are no different from any other servers, except that you build them at home rather than in an office or data center. Many people use them as a low-stakes practice environment before using the same tools in a real-world business context.
{{</notice>}}

## Why not use cloud computing?

Cloud servers could serve the same function and save me the trouble (fun!) of maintaining my own hardware, but it's prohibitively expensive. For VM resources similar to my homelab server, AWS EC2 instances [would cost over $6k per year](https://calculator.aws/#/estimate?id=d61c9cdebdd3b7eac861f4351cdabcbc1c5ac97c):

{{<img src="aws-pricing.png" alt="Screenshot showing AWS EC2 instances would cost $6,112.68 per year" max-width="600px" hasBorder="true" caption="Using AWS instead of my homelab server would [cost me over $6k per year](https://calculator.aws/#/estimate?id=d61c9cdebdd3b7eac861f4351cdabcbc1c5ac97c).">}}

I could substantially reduce costs by turning cloud instances on and off as needed, but that would introduce friction into my workflows. With a local VM server, I can keep 10-20 VMs available and ready at all times without worrying about micromanaging my costs.

## Learning from past mistakes

My 2017 build served me well, but in three years of using it, I've come to recognize a few key areas begging for improvement.

### 1. Keep storage local

My Synology NAS has 10.9 TB of storage capacity. With all that network storage space, I thought, "why put more disk space on the server than the bare minimum to boot the host OS?"

{{<img src="synology-pool.png" alt="Screenshot showing 10.9 TB" max-width="600px" hasBorder="true" caption="On my first build, I relied on my 10.9 TB of network storage.">}}

That turned out to be a dumb idea.

First, running VMs on network storage creates a strict dependency on the disk server. Synology publishes OS upgrades every couple of months, and their patches always require reboots. With my VMs running on top of Synology's storage, I had to shut down my entire VM fleet before applying any update from Synology. It was the same reboot problem I had when I ran VMs on my Windows desktop.

{{<img src="dsm-upgrade.png" alt="Screenshot of Synology upgrade screen" max-width="550px" hasBorder="true" caption="The OS on my storage server requires frequent upgrades.">}}

Second, random disk access over the network is **slow**. At the time of my first build, most of my development work was on backend Python and Go applications, and they didn't perform significant disk I/O. Since then, I've expanded into frontend web development. Modern web frameworks all use Node.js, so every project has anywhere from 10k-200k random JavaScript files in its dependency tree. Node.js builds involve tons of random disk access, a worst-case scenario for network storage.

### 2. Pick better VM management software

For my first server, I evaluated two options for VM management: [Kimchi](https://github.com/kimchi-project/kimchi) and [VMWare ESXi](https://www.vmware.com/products/esxi-and-esx.html). VMWare was far more polished and mature, but Kimchi charmed me with its scrappy spirit and open-source nature.

{{<img src="kimchi-guests.png" alt="Screenshot of Kimchi" max-width="600px" hasBorder="true" caption="Early listing of my VMs through Kimchi's web UI">}}

Almost immediately after I installed it, development on Kimchi stopped.

{{<img src="i-use-kimchi.png" alt="Graph of commits to Kimchi repository showing commits ending right after I started using it" max-width="600px" hasBorder="true" caption="Code commits to Kimchi, which stop almost immediately after I started using it">}}

Over time, Kimchi's shortcomings became more and more apparent. I often had to click a VM's "clone" or "shutdown" button multiple times before it cooperated. And there were infuriating UI bugs where buttons disappeared or shifted position right before I clicked on them.

### 3. Plan for remote administration

{{<img src="vm-server-front.jpg" alt="Photo of my old VM server" max-width="250px" align="right" caption="My VM server is tucked away in the corner, which is convenient except for the occasional instance where I need physical access.">}}

If you read the above and thought, "Kimchi is just software. Why did Michael have to build a whole new server just to install a different VM manager?" It's because I failed to anticipate the importance of remote administration.

My VM server is just a PC that sits in the corner of my office with no monitor or keyboard attached. That's fine 99% of the time when I can SSH in or use the web interface. But for the 1% of the time when the server fails to boot or I want to install a new host OS, it's a huge pain. I have to drag the server over to my desk, disconnect my desktop keyboard and monitor, fix whatever needs fixing, then restore everything in my office to its original configuration.

For my next build, I wanted a virtual console with physical-level access to the machine as soon as it powered on. I was thinking something like [Dell's iDRAC](https://en.wikipedia.org/wiki/Dell_DRAC) or [HP's iLO](https://en.wikipedia.org/wiki/HP_Integrated_Lights-Out).

{{<img src="idrac.png" alt="Screenshot of Dell iDRAC interface" max-width="600px" caption="Dell iDRAC was one option I considered for remote server management.">}}

## Choosing components

### CPU

My first VM server's CPU was a [Ryzen 7 1700](https://www.amd.com/en/products/cpu/amd-ryzen-7-1700). At eight cores and 16 threads, it was [the hot new CPU at the time](https://www.tomshardware.com/reviews/amd-ryzen-7-1700-cpu-review,5009.html). But when I showed off my build on [/r/homelab](https://www.reddit.com/r/homelab/), reddit's homelab subcommunity, they mocked me as a filthy casual because I used _consumer_ parts. The cool kids used enterprise gear.

{{<img src="do-u-even.png" alt="redditor /u/pylori asks 'Bro, do you even homelab? Seriously you're worried about hardware failure on enterprise gear that's built to outlast newer consumer stuff?'" caption="[/r/homelab was unimpressed](https://www.reddit.com/r/homelab/comments/69sk2v/building_a_homelab_vm_server/dh93sur/) with my first build.">}}

Resolved never to let /r/homelab make fun of me again, I ventured into the world of enterprise server hardware. I even got fancy and chose to build a system with two physical CPUs.

To get the best performance for my dollar, I restricted my search to used CPUs, released four to eight years ago. For each candidate, I [looked up benchmark scores on PassMark](https://www.cpubenchmark.net) and then checked eBay for recent sales of that CPU model in used condition.

The most cost-efficient performance seemed to be in the [Intel Xeon E5 v3](https://ark.intel.com/content/www/us/en/ark/products/series/78583/intel-xeon-processor-e5-v3-family.html) family, especially the 2600 models. I settled on the [E5-2680 v3](https://ark.intel.com/content/www/us/en/ark/products/81908/intel-xeon-processor-e5-2680-v3-30m-cache-2-50-ghz.html). It had an average benchmark of 15,618 and cost ~$130 used on eBay.

{{<gallery  caption="The Intel Xeon E5-2680 v3 [scores 15,618 on cpubenchmark.net](https://www.cpubenchmark.net/cpu.php?cpu=Intel+Xeon+E5-2680+v3+%40+2.50GHz&id=2390).">}}
{{<img src="xeon-e5-2680v3.jpg" alt="Photo of Intel Xeon E5-2680 v3 CPU" max-width="420px" linkUrl="https://www.newegg.com/supermicro-mbd-x10dal-i-o-intel-xeon-processor-e5-2600-v4-v3-family/p/N82E16813182967">}}
{{<img src="xeon-benchmark.png" alt="Screenshot of Xeon E5-2680 v3's 15618 score on cpubenchmark.net" max-width="490px" hasBorder="true">}}
{{</gallery>}}

For context, my previous build's Ryzen 7 had a benchmark of 14,611. So with dual-E5-2680s, I'd more than double the processing power from my old server.

### Motherboard

{{<img src="supermicro-mbd-x10dal.jpg" alt="Photo of SuperMicro MBD-X10DAL-I-O motherboard" max-width="280px" align="left" linkUrl="https://www.newegg.com/supermicro-mbd-x10dal-i-o-intel-xeon-processor-e5-2600-v4-v3-family/p/N82E16813182967">}}

The downside of a dual-CPU system was that it limited my options for motherboards. Only a handful of motherboards support dual Intel 2011-v3 CPUs. Their prices ranged from $300 to $850, which was far more than I expected to spend on a motherboard.

I chose the [SuperMicro MBD-X10DAL-I-O](https://www.newegg.com/supermicro-mbd-x10dal-i-o-intel-xeon-processor-e5-2600-v4-v3-family/p/N82E16813182967), which at $320 was lower in price than similar motherboards, but it was still **five times** what I paid for [my last one](/building-a-vm-homelab-2017/#motherboard).

### Memory

{{<img src="crucial-ct4k16g4rfd4213.jpg" alt="Photo of Crucial RAM sticks" max-width="200px" align="right" linkUrl="https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278">}}

There seems to be a lot less informed choice for server memory. With consumer hardware, plenty of websites publish reviews and benchmarks of different RAM sticks, but I didn't see anything like that for server RAM.

I went with [Crucial CT4K16G4RFD4213 64 GB (4 x 16 GB)](https://www.newegg.com/crucial-64gb-288-pin-ddr4-sdram/p/N82E16820148843?Item=9SIAHZUB514397) because I trusted the brand. I chose 64 GB because [my previous build had 32 GB](/building-a-vm-homelab-2017/#memory), and some of my workflows were approaching that limit, so I figured doubling RAM would cover me for the next few years.

### Storage

{{<img src="ssd.jpg" alt="Photo of Samsung 860 EVO" max-width="200px" align="right" linkUrl="https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278">}}

I love M.2 SSDs, as they're small, perform outstandingly, and neatly tuck away in the motherboard without any cabling. Sadly, the MBD-X10DAL doesn't support the M.2 interface.

Instead, I stuck with traditional old SATA. I bought a [1 TB Samsung 860 EVO](https://www.newegg.com/samsung-860-evo-series-1tb/p/N82E16820147673?Item=N82E16820147673). I typically allocate 40 GB of space to each VM, so 1 TB would give me plenty of room. If I need to upgrade later, I can always buy more disks.

### Power

{{<img src="psu.jpg" alt="Photo of Corsair CX550M 550W 80 Plus Bronze" max-width="200px" align="left" linkUrl="https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278">}}

Choosing a power supply unit (PSU) isn't that interesting, so I again chose mainly by trusted brand, the [Corsair CX550M 550W 80 Plus Bronze](https://www.newegg.com/corsair-cx-series-cx550m-550w/p/N82E16817139147?Item=N82E16817139147).

The wattage on all of my components added up to 400 W, so 450 W would have been sufficient. But the 550 W version was only $10 more, which seemed like a fair price for an extra 100 W of breathing room.

The only other important feature to me was semi-modular cabling. In my last build, I made the mistake of using non-modular cabling, which meant that all of the PSU cables stay attached permanently. My server barely has any internal components, so the extraneous power cables created clutter. With semi-modular cabling, I can keep things tidy by removing unused cables from the PSU.

### Fans

{{<img src="hyper-212.jpg" alt="Photo of Hyper 212 CPU fan" max-width="200px" align="right" linkUrl="https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278">}}

The dual-CPU build made cooling an unexpected challenge. The MBD-X10DAL doesn't leave much space between the two CPU sockets, so I looked carefully for fans thin enough to work side-by-side. A pair of [Cooler Master Hyper 212s](https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278) fit the bill.

### Case

{{<img src="fractal-meshify.jpg" alt="Photo of Fractal Meshify C case" max-width="200px" align="left" linkUrl="https://www.newegg.com/black-fractal-design-meshify-c-atx-mid-tower/p/N82E16811352085?Item=N82E16811352085">}}

My server sits inconspicuously in the corner of my office, so I didn't want a case with clear panels or flashy lights.

The [Fractal Design Meshify C Black](https://www.newegg.com/black-fractal-design-meshify-c-atx-mid-tower/p/N82E16811352085?Item=N82E16811352085) had positive reviews and seemed like a simple, quiet case.

### Graphics

{{<img src="msi-geforce-gt-710.jpg" alt="Photo of MSI GeForce GT170 GPU" max-width="200px" align="right" linkUrl="https://www.newegg.com/black-fractal-design-meshify-c-atx-mid-tower/p/N82E16811352085?Item=N82E16811352085">}}

For a headless server, the graphics card doesn't matter much. It's still necessary so I can see the screen during the initial install and the occasional debugging session, so I went with the [MSI GeForce GT 710](https://www.newegg.com/msi-geforce-gt-710-gt-710-1gd3h-lp/p/N82E16814127931?Item=N82E16814127931) as a cheap, easy option.

### Remote administration

I looked into remote administration solutions and was blown away by how expensive they were. At first, I thought I'd use a Dell iDRAC, but the remote console requires a [$300 enterprise license](/tinypilot/idrac-price.png) and constrains my build to Dell components. I looked at KVM over IP solutions, but those were even more expensive, ranging from $600 to $1,000.

{{<img src="raritan-kvm.png" alt="Screenshot of purchsase page for Raritan Dominion KVM over IP" caption="Commercial KVM over IP devices cost between $500 and $1,000." max-width="600px" hasBorder="true">}}

To achieve remote administration, I took the unusual approach of [building my own KVM over IP device](/tinypilot) out of a Raspberry Pi. I call it [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io).

{{<gallery caption="Using [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) to install an OS on my server">}}
{{<img src="tinypilot-server.jpg" alt="Photo of TinyPilot plugged into server" max-width="260px">}}

<a href="bios-mouse.gif"><img src="bios-mouse.gif" alt="Screen capture of Proxmox install through TinyPilot" class="img" style="width: 500px; max-width: 100%; object-fit: contain;"></a>

{{</gallery>}}

TinyPilot captures HDMI output and forwards keyboard and mouse input from the browser. It provides the same access you'd have if you physically connected a real keyboard, mouse, and monitor. The software is [open-source](https://github.com/tiny-pilot/tinypilot), and I offer pre-made versions for purchase.

{{<tinypilot-ad headline="Install a new server OS right from your browser" copy="TinyPilot is an affordable, open-source solution that provides a remote console for your headless server.">}}

## My 2020 server build

| Category              | Component                                                                                                                                              | I paid        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| CPU                   | [Intel Xeon E5-2680 v3](https://ark.intel.com/content/www/us/en/ark/products/81908/intel-xeon-processor-e5-2680-v3-30m-cache-2-50-ghz.html) (x2, used) | $264.82       |
| Motherboard           | [SuperMicro MBD-X10DAL-I-O](https://www.newegg.com/supermicro-mbd-x10dal-i-o-intel-xeon-processor-e5-2600-v4-v3-family/p/N82E16813182967)              | $319.99       |
| Disk                  | [Samsung 860 EVO (1TB)](https://www.newegg.com/samsung-860-evo-series-1tb/p/N82E16820147673?Item=N82E16820147673)                                      | $149.99       |
| Memory                | [Crucial CT4K16G4RFD4213 64GB (4 x 16GB)](https://www.newegg.com/crucial-64gb-288-pin-ddr4-sdram/p/N82E16820148843?Item=9SIAHZUB514397)                | $285.99       |
| Power                 | [Corsair CX550M 550W 80 Plus Bronze](https://www.newegg.com/corsair-cx-series-cx550m-550w/p/N82E16817139147?Item=N82E16817139147)                      | $79.99        |
| Graphics              | [MSI GeForce GT 710](https://www.newegg.com/msi-geforce-gt-710-gt-710-1gd3h-lp/p/N82E16814127931?Item=N82E16814127931)                                 | $44.99        |
| Case                  | [Fractal Design Meshify C Black](https://www.newegg.com/black-fractal-design-meshify-c-atx-mid-tower/p/N82E16811352085?Item=N82E16811352085)           | $84.99        |
| CPU Fans              | [Cooler Master Hyper 212](https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278) (x2)    | $72.98        |
| Remote administration | [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) (KVM over IP)                                                                                    | $65.00        |
| **Total**             |                                                                                                                                                        | **$1,368.74** |

&nbsp;

{{<gallery caption="The Meshify C has been my all-time favorite case for cable management. Its built-in velcro straps organize the cables, and little rubber dividers hide them in the far side of the case.">}}
{{<img src="cable-management-1.jpg" alt="Photo of outer side of empty case">}}
{{<img src="cable-management-2.jpg" alt="Photo of empty case interior">}}
{{</gallery>}}

&nbsp;

{{<gallery caption="Installing the motherboard, CPU, RAM, and fans">}}
{{<img src="installing-cpu.jpg" alt="Photo of motherboard with CPUs installed">}}
{{<img src="install-everything.jpg" alt="Photo of motherboard with all components installed">}}
{{</gallery>}}

{{<img src="build-completed.jpg" alt="My completed homelab VM server build" max-width="600px" caption="My completed build in its new home">}}

## VM Management: Proxmox

To manage my VMs, I'm using [Proxmox VE](https://www.proxmox.com/en/).

{{<img src="proxmox-summary.png" max-width="600px" hasBorder="true" alt="Screenshot of Proxmox dashboard" caption="Proxmox's dashboard of all my VMs">}}

After [Kimchi burned me](#2-pick-better-vm-management-software) on my last build, I was reluctant to try another free solution. [Proxmox](https://www.proxmox.com/en/) has been around for 12 years, so I felt like they were a safe enough bet. Graphics-wise, it's a huge step up from Kimchi, but it lags behind ESXi in slickness.

The part of Proxmox that I most appreciate is its scriptability. One of my frequent tasks is creating a new VM from a template and then using [Ansible](https://docs.ansible.com/ansible/latest/index.html) to install additional software. With ESXi, I couldn't find a way to do this without manually clicking buttons in the web UI every time. With Proxmox, [their CLI](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#_managing_virtual_machines_with_span_class_monospaced_qm_span) is powerful enough that I can script it down to just `./create-vm whatgotdone-dev` and my scripts create a fresh [What Got Done](https://whatgotdone.com) development VM.

My biggest complaint is that Proxmox is unintuitive. I couldn't even figure out how to install it until I found [Craft Computing's installation tutorial](https://www.youtube.com/watch?v=azORbxrItOo). But once you learn your way around, it's easy to use.

## Benchmarks

Before I decommissioned my old VM server, I collected simple benchmarks of my common workflows to measure performance improvements.

Most of my old VMs ran on network storage because its local SSD only had room for a couple of VMs. In the benchmarks below, I compare performance in three different scenarios:

- 2017 Server (NAS): The typical VM I kept on network storage
- 2017 Server (SSD): For the few VMs I kept on local storage
- 2020 Server: All VMs run on local SSD, so there's no NAS vs. SSD

{{<notice type="info">}}

**Caveat**: These are not rigorous tests. I collected one sample for each workflow and did nothing to normalize conditions across tests.

{{</notice>}}

### Provision a new VM

The first benchmark I took was provisioning a new VM. I have a standard Ubuntu 18.04 VM template I use for almost all of my VMs. Every time I need a new VM, I run a shell script that performs the following steps:

1. Clone the VM from the base template.
1. Boot the VM.
1. Change the hostname from `ubuntu` to whatever the VM's name is.
1. Reboot the VM to pick up the new hostname.
1. Pick up the latest software with `apt update && apt upgrade`.

{{<img src="provision-vm.png" alt="Graph showing 2020 server outperforms my 2017 server on both NAS and SSD">}}

My new server brought a huge speedup to this workflow. Cloning a VM went from 15 minutes on my old server to less than four minutes on the new one.

If I skip the package upgrade step, the speedup is a little less impressive. The new server still blows away performance on NAS storage, dropping from eight minutes to just under two and a half. SSD to SSD, it underperforms my previous server. Cloning a VM is likely disk-bound, and my old M.2 SSD was faster than my new SATA SSD.

### Boot a VM

From the moment I power on a VM, how long does it take for me to see the login prompt?

{{<img src="boot-vm.png" alt="Graph showing 2017 server completed in 48.5 seconds on NAS, 32.4 seconds on SSD vs. my 2020 server completed in 18.5 seconds">}}

My old VMs booted in 48 seconds. The few SSD VMs on my old system did a little better, showing the login prompt in 32 seconds. My new server blows both away, booting up a VM in only 18 seconds.

### Run What Got Done end-to-end tests

My weekly journaling app, [What Got Done](https://whatgotdone.com), has automated tests that exercise its functionality end-to-end. This is one of my most diverse workflows &mdash; it involves compiling a Go backend, compiling a Vue frontend, building a series of Docker containers, and automating Chrome to exercise my app. This was one of the workflows that exhausted resources on my old VM, so I expected substantial gains here.

{{<video src="wgt-test.mp4" max-width="600px">}}

{{<img src="build-wgt.png" alt="Graph showing 2017 SSD server completed in 5.4 minutes vs. 2020 server completed in 5.6 minutes">}}

Surprisingly, there was no significant performance difference between the two servers. For a cold start (downloading all of the Docker base images), the new server is 2% slower than the old one. When the base Docker images are available locally, my new server beats my old, but only by 6%. It looks like the bottleneck is mainly the disk and browser interaction, so the new server doesn't make much of a difference.

### Build Is It Keto

One frequent workflow I have is building [Is It Keto](https://isitketo.org), my resource for keto dieters. I generate the site using [Gridsome](https://gridsome.org/), a static site generator for [Vue](https://vuejs.org/).

{{<img src="build-isitketo.png" alt="Graph showing 2017 SSD server completed in 3.7 minutes vs. 2020 server completed in 4 minutes">}}

I expected a significant speedup here, so I was surprised when my build got slower. The build seemed to be mostly CPU-bound on my old server, but doubling CPU resources on my new server did nothing. My next guess was that it was disk-bound, so I tried moving the files to a RAMdisk, but build speeds remained the same.

My hypothesis is that the workflow is CPU-bound but parallelizes poorly. My old server has fewer CPU cores, but each core is faster. If the build is limited to five or six threads, it can't take advantage of my new server's 48 cores.

### Train a new Zestful model

[Zestful](https://zestfuldata.com) is my machine-learning-based API for parsing recipe ingredients. Every few months, I train it on new data. This is my most CPU-intensive workflow, so I was interested to see how the new system would handle it.

{{<img src="train-zestful.png" alt="Graph showing 2017 SSD server completed in 18.3 minutes vs. 2020 server completed in 8 minutes">}}

Finally, a case where my 48 CPU cores shine! The new server blows the old one away, training the model in less than half the time. Unfortunately, it's a workflow I only run a few times per year.

## Reflections

### There's no shame in consumer hardware

Even though /r/homelab may never respect me, on my next build, I'm planning to return to consumer hardware.

The biggest advantage I see with server components is that they have [better compatibility with server software](/building-a-vm-homelab-2017/#installing-a-host-os). Back in 2017, I [couldn't install ESXi until I disabled multithreading on my CPU](/building-a-vm-homelab-2017/#also-ran-esxi-65), degrading performance substantially. But that was a limitation in the Linux kernel, and later updates [fixed it](https://www.pcworld.com/article/3176323/kernel-410-gives-linux-support-for-zen-multithreading.html).

Server hardware commands a premium because of its greater reliability. For user-facing services, this characteristic is meaningful, but it matters much less on a development server. An occasional crash or bit flip on a dev server shouldn't ruin your day.

### Consider the full cost of dual-CPU

This was the first time I'd ever built a dual-CPU computer. It was an interesting experience, but I don't think it was worth the trouble.

Based on my benchmarks, the CPU was so rarely the limiting factor in my workflows. The most damning evidence is Proxmox's graph of my CPU usage over time. In the past few months, I've never pushed CPU load above 11%, so I'm crazy overprovisioned.

{{<img src="max-cpu.png" alt="Graph of showing I never used more than 11% of my CPU" hasBorder="true" caption="My max CPU usage in the last few months never went above 11% of my server's capacity.">}}

The requirement for dual CPUs drove up the cost of a motherboard substantially and limited my options. Only a scant few mobos support dual Intel 2011-v3 CPUs, so I didn't have many choices in terms of other motherboard features.

### Remote administration provides flexibility

Before I used TinyPilot to manage my server, I didn't realize how change-averse I was. Changing any BIOS or network settings brought a risk of losing the next few hours of my life physically moving around machines and reconnecting peripherals to debug and fix the problem. Knowing that, I never wanted to modify any of those settings.

Having a virtual console gives me the freedom to fail and makes me more open to experimenting with different operating systems. It's always going to be a substantial effort to install and learn a new OS, but knowing that I don't have to drag machines back and forth makes me much more open to it. Had I not built TinyPilot, I might have stuck with ESXi as "good enough" rather than taking a chance on Proxmox.

## A Year Later

{{<notice type="info">}}

**Updated 2021-12-05**

{{</notice>}}

A reader asked me if there's anything I'd change about this build in retrospect, so I thought I'd share an update as it's been a little over a year with this server.

### CPU - Too much

I definitely went overboard on the dual E5-2680 v3 CPUs.

{{<img src="cpu-usage.png" alt="Graph showing I rarely used more than 50% of my CPU" hasBorder="true" caption="In a year of usage, I've rarely exceeded 50% CPU usage, meaning one CPU would have been sufficient.">}}

In a year of usage, I've never reached 100% CPU usage, and I've only ever exceeded 50% capacity a handful of times, so I would have been fine with just a single CPU.

### SSD - Not enough

My 1 TB Samsung SSD is just about full, so I just purchased another a [2 TB Samsung 870 Evo](https://www.newegg.com/samsung-2tb-870-evo-series/p/N82E16820147794?Item=N82E16820147794) for a total of 3 TB of SSD. There's plenty of space in the case for more SSDs.

{{<img src="disk-usage.png" alt="Screenshot showing my disk is 85% full" max-width="800px" hasBorder="true" caption="My server has only 15% of disk still free.">}}

By default, I provision each VM with 40 GB of disk, which is sometimes limiting. When I'm doing work with Docker, container images can eat up disk quickly. Every few weeks, I find that I've filled up my VM's disk, and I have to run `docker system prune --all`, so the additional disk will spare me those interruptions.

### RAM - Slightly too little

The 64 GB of RAM has mostly been sufficient, but there have been a few instances where I have to turn off VMs to give myself more memory. I prefer not to interrupt my workflow managing resources, so I just ordered another 64 GB of the same RAM sticks.

{{<img src="ram-usage.png" alt="Graph showing RAM frequently reaching 64 GB of capacity" hasBorder="true" caption="I'm reaching the limits of 64 GB of RAM.">}}

### Proxmox - Still great

I still love Proxmox as a VM manager. I purchased a license, which I'm not sure adds any new features that I use, but I'm happy to support the project.

Annoyingly, the licenses are priced per CPU, so in addition the shame of buying too much CPU, I have to pay double for Proxmox.

### Parts list (as of 2021-12-05)

| Category              | Component                                                                                                                                              | I paid        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| CPU                   | [Intel Xeon E5-2680 v3](https://ark.intel.com/content/www/us/en/ark/products/81908/intel-xeon-processor-e5-2680-v3-30m-cache-2-50-ghz.html) (x2, used) | $264.82       |
| Motherboard           | [SuperMicro MBD-X10DAL-I-O](https://www.newegg.com/supermicro-mbd-x10dal-i-o-intel-xeon-processor-e5-2600-v4-v3-family/p/N82E16813182967)              | $319.99       |
| Disk                  | [Samsung 860 EVO (1TB)](https://www.newegg.com/samsung-860-evo-series-1tb/p/N82E16820147673?Item=N82E16820147673)                                      | $149.99       |
| Disk                  | [Samsung 870 EVO (2TB)](https://www.newegg.com/samsung-2tb-870-evo-series/p/N82E16820147794?Item=N82E16820147794)                                      | $239.99\*     |
| Memory                | [Crucial CT4K16G4RFD4213 64GB (4 x 16GB)](https://www.newegg.com/crucial-64gb-288-pin-ddr4-sdram/p/N82E16820148843?Item=9SIAHZUB514397)                | $285.99       |
| Memory                | [Crucial CT4K16G4RFD4213 64GB (4 x 16GB)](https://www.newegg.com/crucial-64gb-288-pin-ddr4-sdram/p/N82E16820148843?Item=9SIAHZUB514397)                | $164.11\*     |
| Power                 | [Corsair CX550M 550W 80 Plus Bronze](https://www.newegg.com/corsair-cx-series-cx550m-550w/p/N82E16817139147?Item=N82E16817139147)                      | $79.99        |
| Graphics              | [MSI GeForce GT 710](https://www.newegg.com/msi-geforce-gt-710-gt-710-1gd3h-lp/p/N82E16814127931?Item=N82E16814127931)                                 | $44.99        |
| Case                  | [Fractal Design Meshify C Black](https://www.newegg.com/black-fractal-design-meshify-c-atx-mid-tower/p/N82E16811352085?Item=N82E16811352085)           | $84.99        |
| CPU Fans              | [Cooler Master Hyper 212](https://www.newegg.com/cooler-master-hyper-212-black-edition-rr-212s-20pk-r1/p/N82E16835103278?Item=N82E16835103278) (x2)    | $72.98        |
| Remote administration | [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) (KVM over IP)                                                                                    | $65.00        |
| **Total**             |                                                                                                                                                        | **$1,772.84** |

\* Purchased a year after the original build.

## Related posts

- [TinyPilot: Build a KVM Over IP for Under $100](/tinypilot) - The open-source tool I created to provision my server.
- [Building a Homelab VM Server (2017 Edition)](/building-a-vm-homelab-2017) - My first homelab server build.
