---
title: Building a Homelab VM Server
date: '2017-05-07 00:00:00 -04:00'
header:
  teaser: images/resized/2017-05-07-building-a-vm-homelab/480/vm-server-parts.jpg
tags:
- virtualization
- homelab
- kimchi
- kvm
excerpt: Taking my development VMs to the next level
---

{% include base_path %}

# Overview

I do the bulk of my home development work in virtual machines (VMs). My main desktop PC is a Windows 10 machine, so I had always run my VMs from within VirtualBox.

This setup worked fine, but I was starting to become aware of the increasing pain points. I searched and found [a post](https://blog.brianmoses.net/2016/07/building-a-homelab-server.html) by Brian Moses where he describes building a dedicated "homelab" server for running VMs. I really liked this idea and was inspired to do the same.

# Why VMs?

## Clean Environments

All the software I write depends on a particular software environment. For example, development on my project [ProsperBot]({{ base_path }}/prosperbot/) depends on the Go toolchain, nginx, and Redis. If I keep installing dependencies for each of my projects all on my main desktop PC, it becomes a mess of different web servers, database servers, and competing versions of the same libraries.

## Security: VM Isolation

VMs also provide security by keeping software isolated from my main system. I like to experiment with new tools and apps, but it's always possible that an app could be malicious (maybe the developer made a malicious app, maybe it's a legitimate app but an attacker compromised it to spread malware). If I install an app directly to my Windows machine and it infects it with malware, it's game over. Very basic malware running on my machine could record everything on my screen, control my Gmail, Facebook, Github, or hold all my files [for ransom](https://en.wikipedia.org/wiki/Ransomware).

Malware running in a VM is much more limited in the damage it can cause. If I install software in a VM and it covertly installs a keylogger, it can only record my keystrokes in that VM, not my main desktop machine. VMs are not a complete defense, as advanced malware could [escape the VM](https://arstechnica.com/security/2017/03/hack-that-escapes-vm-by-exploiting-edge-browser-fetches-105000-at-pwn2own/), but they still provide a large degree of protection.

# Why a Whole VM Server?

I've been running virtual machines within my main Windows desktop with VirtualBox, there a few issues:

* When I restart my main PC, I also have to laboriously shut down or suspend every VM I'm running, then start each up again after the reboot.
* My main PC crashes about once a month and VirtualBox is really bad at recovering from crashes. On reboot, thinks that the VM image files are locked and I have to futz around with the filesystem to fix it.

With a dedicated VM server, I can run a barebones Linux server OS on it. The less software running on a machine, the less frequently it requires reboots and the less likely it is to crash.

There are also some peer-to-peer projects I think are neat (e.g. [OpenBazaar](https://openbazaar.org), [BitSquare](https://bitsquare.io/)), but they require running a server all the time. I've tried doing this through VirtualBox, but the hassles I mention above tend to make me lose interest in keeping these VMs running. If I could just spin up a VM once and leave it running, experimenting with these projects becomes a lot more attractive.

# Choosing the Parts

## CPU

[![AMD Ryzen 7 1700](//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B06WP5YCX6&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=mtlynch-20){: .align-right}](https://www.amazon.com/dp/B06WP5YCX6/ref=as_li_ss_il?&linkCode=li3&tag=mtlynch-20&linkId=54dcc577d5c28eef7c3514b05b53b8be)

In Brian's blog post, he was excited to take advantage of the [low price of used Intel Xeon CPUs](http://www.techspot.com/review/1155-affordable-dual-xeon-pc/). This was a neat idea, but I was afraid of the risk of hardware failure from used server hardware, so I preferred a new, retail CPU.

I overclock the CPU on my main PC, but this also leads to occasional crashes. Because I want to keep my VM server as stable as possible, I decided not to overclock this system. The happy consequence of this is that choosing parts easier and less expensive because I don't need to pay a premium for an unlocked CPU, a motherboard that supports overclocking, or a premium CPU cooler.

I ended up going with the [AMD Ryzen 7 1700](http://amzn.to/2o1lDVI). It's 8 cores, 16 threads, so it should be a good fit for running many VMs and it has been getting a lot of good reviews lately.

## Motherboard

{% include image.html file="motherboard.png" alt="ASRock AB350M-HDV" max_width="250px" class="align-left" link_url="https://www.newegg.com/Product/Product.aspx?Item=N82E16813157765" %}

I live in a pretty small 1 BR apartment in Manhattan, so physical space is at a premium. My requirements also obviated a lot of components that typically requires a lot of physical space in a PC, such as disk drives, GPUs, or premium CPU fans.

These requirements led me towards MicroATX motherboards and I ultimately chose the [ASRock AB350M-HDV](https://www.newegg.com/Product/Product.aspx?Item=N82E16813157765). I've had good success with ASRock boards in the past and this seemed to be a solid option. I was hesitant about its memory support, as it only has two RAM slots, which means I could install 2x16 GB sticks with no room for expansion. I figured if I ever run out of RAM, 2x32 GB sticks would probably be available by then and I'll just bite the bullet and replace both sticks.

In retrospect, I wish I'd gotten a motherboard with integrated graphics (see the [parts review](#review-motherboard) below).

## Memory

{% include image.html file="gskill-ram.png" alt="G.SKILL Flare X Series 32GB" max_width="250px" class="align-right" link_url="http://www.tkqlhce.com/38102iqzwqyDMHGNMLGDFFMNGHKK?url=http%3A%2F%2Fwww.newegg.com%2FProduct%2FProduct.aspx%3FItem%3DN82E16820232536%26nm_mc%3DAFC-C8Junction-Storage%26cm_mmc%3DAFC-C8Junction-Storage-_-Memory%2B%28Desktop%2BMemory%29-_-G.SKILL-_-20232536&cjsku=N82E16820232536" %}

My main PC has 32 GB of RAM and tends to use around 15 GB during daily usage (even with Windows 10 and multiple VMs running). I figured I could probably get by with 16 GB, but 32 GB will probably be a safe upper limit for the next 2-3 years. I chose the [G.SKILL Flare X Series 32GB (2 x 16GB)](http://www.tkqlhce.com/38102iqzwqyDMHGNMLGDFFMNGHKK?url=http%3A%2F%2Fwww.newegg.com%2FProduct%2FProduct.aspx%3FItem%3DN82E16820232536%26nm_mc%3DAFC-C8Junction-Storage%26cm_mmc%3DAFC-C8Junction-Storage-_-Memory%2B%28Desktop%2BMemory%29-_-G.SKILL-_-20232536&cjsku=N82E16820232536) because these were the fastest RAM sticks tested compatible with my motherboard.

## Disk

[![Samsung 850 EVO](//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00TGIVZTW&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=mtlynch-20){: .align-left}](https://www.amazon.com/gp/product/B00TGIVZTW/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li2&tag=mtlynch-20&linkId=5406b1b2957a1e42f41c407ba8fd6559)

Like Brian, [I have a NAS]({{ base_path }}/sia-via-docker/) with plenty of space available, so all I needed as far as local storage was a small disk to hold the host / hypervisor OS. I went with a 250 GB [Samsung 850 EVO](http://amzn.to/2pyfArr) mainly because I find the M.2 interface very clean. It's just a chip you screw into your motherboard and you're done. No need to deal with mounts or SATA cables. 250 GB is way more than I need, but for an M.2 SSD, that seems to be about the entry level.

## Case

[![Rosewill Micro ATX SRM-01](//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00ZPWOA6I&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=mtlynch-20){: .align-right}](https://www.amazon.com/gp/product/B00ZPWOA6I/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li3&tag=mtlynch-20&linkId=341a186e437bfbe9700d3298042dc564)

For the case, I was primarily looking for something very small. I plan to tuck the server out of sight, so it didn't need to be pretty or have fancy aesthetics. The [Rosewill Micro ATX SRM-01](http://amzn.to/2oYTvP6) is a nice, small, inexpensive, and functional.

## Graphics

I'm mainly going to run this system headless and just manage it over SSH/Ansible, but I need a display occasionally (e.g. during initial install or when I accidentally break the network configuration). I initially *thought* I could use the motherboard's integrated graphics support, but I could not (see the [parts review](#review-motherboard) below).

Because my requirements for the GPU were flexible, I just wanted something inexpensive and positively reviewed, so I chose the [EVGA GeForce 8400 GS](http://amzn.to/2qmwmHO).

It didn't make sense to buy a dedicated monitor for this system because 99.99% of the time, I'd be managing it headless. The remaining .01% of the time, I can just crawl under my desk and move my main monitor's HDMI cable from my primary desktop to my VM server.

## Network Adapter

I planned to just use the motherboard's onboard 1 Gbps NIC because I only have a 1 Gbps network. It did work out of the box with Ubuntu 16.04, but I soon noticed that my network speeds were limited to about 10 Mbps. After a bit of research, I discovered that Ubuntu 16.04 does not include the correct drivers, so I had to add a separate `apt-get` repo to install the `r8168-dkms` package. I did this, but on reboot, Ubuntu would fail to detect the NIC...

At this point, I was tired of tinkering with the onboard NIC and just bought a PCI NIC that I'd read was supported out of the box on Ubuntu: [Broadcom BCM5751 Netxtreme](http://amzn.to/2pxVLjH). It got 1 Gbps speeds with zero tinkering, so for $23, I decided it wasn't worth the time to keep trying to investigate the problems with the onboard NIC.

Also of note: the onboard NIC was *not* compatible with ESXi 6.5, but the Broadcom NIC *was* compatible.

## Final Parts List

| Category | Component |  Price |
|------|-------|
| CPU | [AMD Ryzen 7 1700](http://amzn.to/2o1lDVI) | $323.66 |
| Motherboard | [ASRock AB350M-HDV](https://www.newegg.com/Product/Product.aspx?Item=N82E16813157765) | $69.99 |
| Disk | [Samsung 850 EVO - 250GB](http://amzn.to/2pyfArr) | $99.99 |
| Memory | [G.SKILL Flare X Series 32GB (2 x 16GB) F4-2400C15D-32GFXR](http://www.tkqlhce.com/38102iqzwqyDMHGNMLGDFFMNGHKK?url=http%3A%2F%2Fwww.newegg.com%2FProduct%2FProduct.aspx%3FItem%3DN82E16820232536%26nm_mc%3DAFC-C8Junction-Storage%26cm_mmc%3DAFC-C8Junction-Storage-_-Memory%2B%28Desktop%2BMemory%29-_-G.SKILL-_-20232536&cjsku=N82E16820232536) | $224.99 |
| Power | [EVGA 430 W1, 80+ WHITE 430W  100-W1-0430-KR](http://amzn.to/2oVMo9u) | $29.99 |
| Graphics | [EVGA 512-P3-1300-LR GeForce 8400 GS](http://amzn.to/2qmwmHO) | $29.99 |
| Network | [Broadcom BCM5751 Netxtreme](http://amzn.to/2pxVLjH) | $22.95 |
| Case | [Rosewill Micro ATX SRM-01](http://amzn.to/2oYTvP6) | $21.99 |
| **Total** | | **$823.55** |

# Build

With all my parts, it was time to start the build!

{% include image.html file="vm-server-parts.jpg" alt="Server PC parts" img_link="true" %}

These are all the components pre-assembly. The NIC and GPU are missing from this picture because I didn't realize I needed them until I actually tried running the system.

{% include image.html file="vm-server-assembled.jpg" alt="Server after assembly" img_link="true" %}

This is the server with all the parts assembled. There's not much to it because there aren't many components. It was particularly nice to not have to deal with power or SATA cables for disk drives because the only disk is the M.2 SSD connected directly to the motherboard.

Because of my apartment's limited space, I wanted a server I could hide out of sight. I decided to place it behind my desk drawers, adjacent to my desk. It's still as physically reachable as my main desktop, but it's mostly out of view:

<figure class="half">
  {% include image.html file="vm-server-front.jpg" alt="Assembled server - front view" img_link="true" %}
  {% include image.html file="vm-server-above.jpg" alt="Assembled server - overhead view" img_link="true" %}
  <figcaption>Completed build</figcaption>
</figure>

# Installing a Host OS

The VM server's host OS should be as lightweight as possible. It needs to host a hypervisor and not much else. The more software we add to the host, the more packages we need to keep up to date to have a stable server.

I tried a few different Linux distros, but Ubuntu server was the only one that worked out of the box on my hardware (successfully tested both 16.04 and 17.04) . I think [Ryzen's SMT functionality](https://www.phoronix.com/scan.php?page=news_item&px=AMD-Ryzen-Newer-Kernel) is what causes the installations to fail on other distros. I suspect I could work around this by disabling SMT in the BIOS, installing another distro, then upgrading the kernel to >= 4.10, then re-enabling SMT, but I decided to just stick with **Ubuntu 16.04 server** since it's the distro I'm most familiar with anyway.

# Running Virtual Machines

## KVM

For the hypervisor, I used [KVM](https://www.linux-kvm.org/page/Main_Page). It's a fairly mature product with wide usage, which is useful if I run into situations where I need to Google support answers. Some of the more enterprise-focused hypervisors require a license key (even when the software is free), but KVM doesn't have this problem, as it's free and open source.

## Kimchi

I enjoy being able to manage my infrastructure through a web UI, so I installed [Kimchi](https://github.com/kimchi-project/kimchi), KVM's management UI implemented with HTML5.

I'd describe Kimchi as "okay." Some of the dashboards are pretty slick:

<figure class="half">
  {% include image.html file="kimchi-host-utilization.png" alt="Kimchi host utilization dashboard" img_link="true" %}
  {% include image.html file="kimchi-guests.png" alt="Kimchi guest view" img_link="true" %}
  <figcaption>Kimchi web UI screenshots</figcaption>
</figure>

It also does certain things really well, like creating a bridged network adapter (which is kind of a pain to figure out on the command line).

The weaknesses are mainly in the UX. It requires a lot of clicks to do simple things and I frequently run into situation where the page will update (e.g. a guest VM finishes turning off), which causes context menus to disappear and forces the user to start the flow over. The weaknesses aren't too bad, and as I used it more, it became easier to adjust my behavior to avoid these UX bugs.

## Also ran: ESXi 6.5

I actually went into this project planning to use [VMware vSphere Hypervisor](https://www.vmware.com/products/vsphere-hypervisor.html), VMware's free hypervisor offering. It seemed like a much more mature product with a larger user base (so presumably easier to find support). However, it ended up being incompatible with both my motherboard's NIC and the Ryzen CPU. I was finally able to run it after I installed the Broadcom NIC and disabled my CPU's SMT in BIOS, but by that point, I'd been using Kimchi for a few days and gotten used to it.

vSphere didn't seem to offer a significantly better experience than Kimchi. The UI is much more polished, but it also had very klunky flows where one mistake would force you to completely restart a whole multi-stage process from scratch. It also wasn't obvious how to access the shell to just do what I want on the command-line (I'm sure it's possible, but I didn't investigate long enough for the answer).

The dealbreaker for me was that on login, vSphere prominently displayed a warning saying that the software would stop working in 60 days unless I entered a VMware registration key. VMware provides a license key for free, but I didn't want to bother with registration keys when Kimchi isn't tied to any kind of licensing checks and provides an experience that's about equal to vSphere.

# Automating Server Provisioning

I'm a big fan of Ansible, so I wrote an  [Ansible playbook]({{ base_path }}/files/provision-vm-host.yml) to automatically provision my VM server. It does the following:

* Updates the kernel to a version compatible with Ryzen's SMT functionality
* Installs KVM and Kimchi
* Mounts an NFS share for storing VM images

You can use the same playbook to provision your server by [installing Ansible](https://docs.ansible.com/ansible/intro_installation.html) and running the commands below:

```bash
VM_SERVER=vmaster # Replace with your VM server's hostname
echo "${VM_SERVER}" > hosts
wget {{ base_path }}/files/provision-vm-host.yml

# Replace the extra-vars with the values for your NFS share
ansible-playbook provision-vm-host.yml \
  --extra-vars "cifs_share=/nas-hostname/VMs" \
  --extra-vars "cifs_username=foo" \
  --extra-vars "cifs_password=bar"
```

# Reviewing My Choices

## Review: CPU

My most questionable choice is the CPU. It does run very fast, but it may have also been overkill, as I haven't seen total CPU usage rise above 35%, even when I've got five VMs running with  CPU-intensive jobs running on several of them.

The downside to the Ryzen is that it's very bleeding edge right now and compatibility is shaky. I tried installing Fedora 25 server, Debian 8.7, Centos 7, and ESXi 6.5 and they all died during the installation because they weren't compatible with the Ryzen. I was able to install some of these successfully if I disabled SMT (multithreading) for the CPU in BIOS, but that reduces it to an from a 16-core to an 8-core CPU, which felt sad. The only OS that installed successfully was Ubuntu (successfully installed both 16.04 and 17.04).

The Ryzen also limited what RAM sticks I could buy. The motherboard supports DDR4 RAM up to 3200 MHz, but Corsair has no memory [tested compatible](http://www.corsair.com/en-us/memory-finder) with it. [G.SKILL does](https://www.gskill.com/en/configurator?manu=52&chip=2952&model=2990), but nothing faster than DDR4 2400 MHz.

## Review: Motherboard

I'm *mostly* happy with my motherboard choice. It's nice and compact without sacrificing adequate space for all the components.

My one regret is that I didn't read the onboard video support carefully enough. Its specs under "Onboard Video Chipset" read:

>Integrated AMD Radeon R7/R5 Series Graphics in A-series APU
>Supports HDMI with max. resolution up to 4K x 2K (4096x2160) @ 24Hz / (3840x2160) @ 30Hz

So I thought, "Great! It's got its own graphics card. One less thing to install." What I didn't understand was that this meant, "Supports graphics *only if* you have an AMD A-Series APU." APUs are AMD's combined CPU/GPU chips, and the Ryzen is not one of them, so no onboard graphics for me.

If I did this again, I'd go with the [GIGABYTE GA-AB350M-Gaming 3](http://www.dpbolvw.net/click-8329872-11892368?url=http%3A%2F%2Fwww.newegg.com%2FProduct%2FProduct.aspx%3FItem%3DN82E16813145002%26nm_mc%3DAFC-C8Junction-Components%26cm_mmc%3DAFC-C8Junction-Components-_-Motherboards%2B-%2BAMD-_-GIGABYTE-_-13145002&cjsku=N82E16813145002) just for the simplicity of having an onboard GPU.

## Review: RAM

32 GB seemed overkill at first, but as I add more VMs for various tasks, I'm reaching > 18 GB RAM usage, so I'm glad I went with 32 GB instead of 16 GB.

## Review: Power Supply

The power supply has sufficient wattage for the system, and it's pretty quiet. It's also a good value for $30.

The one downside is that it uses non-modular cabling. My system is so bare bones that I only need the 24-pin motherboard cable and 8-pin CPU cable. All the rest are clutter, but they hide away pretty cleanly in my case's 5.25" bay for an optical disc reader (obviously empty in my case).

If I were to do it over, I'd consider a semi-modular or full-modular PSU so I could get rid of the extraneous PSU cables.

# Conclusion

This homelab VM server is working very well. It's very convenient to be able to know that my VMs are running all the time, so I can just SSH in or view them in the browser without having to spin anything up in VirtualBox.

One unexpected benefit is that I no longer have to be conservative about provisioning CPU/RAM resources to guest OSes. My main desktop is an 8-core i7 with 32 GB of RAM. I didn't want my VMs to starve my main OS for resources, so I'd typically provision guest OSes with 1 CPU + 1 GB RAM and only increase when I saw it hitting resource constraints. With the homelab VM server, there are enough resources for everyone! My standard guest OS template uses 4 cores and 4 GB CPU, a sufficient upper limit for most of my environments. This means that I waste less of my time managing guest OS resources manually.

If you work on software projects that require a variety of development or staging environments, I highly recommend working in VMs and using a dedicated VM server machine.

