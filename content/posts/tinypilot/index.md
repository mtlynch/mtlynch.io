---
title: "TinyPilot: Build a KVM Over IP for Under $100"
date: "2020-07-23T00:00:00Z"
tags:
- raspberry pi
- python
- ansible
- homelab
- kvm
- tinypilot
images:
  - tinypilot/opengraph.jpg
description: Using only a Raspberry Pi and some inexpensive video capture equipment, you can create your own KVM over IP device, allowing you to capture video and send keyboard input to a remote computer.
custom_css: true
---
TinyPilot is a low-cost, open source device I created to provide remote access to computers even before their operating system boots. I use TinyPilot to perform OS installs and to debug boot failures on my [bare metal homelab servers](/building-a-vm-homelab/).

This post details my experience creating TinyPilot and shows how you can build your own for under $100 using a Raspberry Pi.

{{<img src="win-ubuntu.jpg" alt="Photo of TinyPilot connecting two computers" maxWidth="800px" caption="Using TinyPilot to control my Ubuntu laptop from Chrome on my Windows machine">}}

## I don't want your life story; just tell me how to build it

If you're a grinch who wants to skip my fascinating tale of triumph and despair in developing TinyPilot, jump directly to the section ["How to Build Your Own TinyPilot."](#how-to-build-your-own-tinypilot)

## Demo

{{<youtube IF-AyHJ8DOI>}}

## Why TinyPilot?

A few years ago, I built my own home server for testing software. It's been a great investment, and I use it every day.

{{<img src="homelab-server.jpg" alt="Photo of my homelab VM server" caption="The homelab server I built in 2017 to host my virtual machines" maxWidth="650px">}}

The server has no keyboard or monitor attached because I access it over ssh or a web interface. This is a convenient setup, but it also makes small issues a huge pain.

Every few months, I'll screw something up and prevent the server from booting or joining the network, effectively locking me out of the machine. To get things running again, I have to disconnect everything, drag the server over to my desk, and juggle cables around to connect the server to the keyboard and monitor for my desktop.

## Commercial solutions

Friends have raved to me about their experience with iDRAC. It's a chip in Dell servers that provide a virtual console from the moment the system powers on. I briefly considered an iDRAC for my next home server, but the price tag put an end to that. The license alone costs $300, and it requires custom hardware.

{{<img src="idrac-price.png" alt="Screenshot of $300 price for iDRAC 9 Enterprise license" caption="A license for Dell's iDRAC technology costs $300 per machine plus the cost of hardware" maxWidth="700px" hasBorder="true">}}

Next, I looked at commercial KVM over IP solutions. They provide similar functionality to Dell's iDRAC, but they're external devices that connect to a computer's keyboard, video, and mouse ports (hence the name KVM). Sadly, they're even more expensive, ranging in price from $500 to $1000 per unit. 

{{<img src="raritan-kvm.png" alt="Screenshot of purchsase page for Raritan Dominion KVM over IP" caption="Commercial KVM over IP devices cost between $500 and $1,000." maxWidth="800px" hasBorder="true">}}

As lazy as I am about dragging servers around, I couldn't justify spending $500 to save myself the trouble of swapping cables around a few times per year.

So, I did what any appropriately irrational programmer would do: spend several hundred hours building my own KVM over IP.

## Building a KVM over IP with Raspberry Pi

The [Raspberry Pi](https://www.raspberrypi.org/) is a small, inexpensive single board computer. They're powerful enough to run a full desktop operating system, so their $30-60 price point makes them a popular tool among hobbyists and programmers.

{{<img src="pi-in-hand.jpg" alt="Raspberry Pi in the palm of my hand" caption="The Raspberry Pi is a fully-functional computer that fits on a single chip and costs only $30-60." maxWidth="600px">}}

Recent versions of the Pi [support USB on-the-go (USB OTG)](https://www.raspberrypi.org/documentation/hardware/raspberrypi/usb/README.md#overview_pi4), a feature that allows the Pi to impersonate USB devices such as keyboards, thumb drives, and microphones.

As a proof of concept, I created a simple web app called [Key Mime Pi](/key-mime-pi).

{{<img src="key-mime-pi-interface.png" alt="Screenshot of Key Mime Pi web interface" caption="[Key Mime Pi](/key-mime-pi), my early precursor to TinyPilot that only supported keyboard forwarding." maxWidth="700px" hasBorder="true">}}

 Key Mime Pi connects via USB to another computer and registers itself as a USB keyboard. It also presents a web page and listens for JavaScript key events. As the user types, Key Mime Pi captures the key events and translates them into keystrokes through its fake USB keyboard. I described this behavior in depth in [my previous post](/key-mime-pi#how-it-works).

## The challenge of capturing video

Keyboard forwarding isn't so useful if you can't see the what's happening on the screen. My obvious next step was to find a way to capture my server's display output in the Pi and render it in the browser.

My first attempt at video capture was to use the [Lenkeng LKV373A HDMI extender](https://amzn.to/3cxrYfI). Daniel Kučera (aka [danman](https://blog.danman.eu/)) did an excellent job [reverse engineering](https://blog.danman.eu/new-version-of-lenkeng-hdmi-over-ip-extender-lkv373a/) this device. It was available from Chinese merchants on eBay for around $40, so it seemed like my best option.

{{<img src="lkv373a.jpg" alt="Photo of Lenkeng LKV373A HDMI extender" caption="The [Lenkeng LKV373A HDMI extender](https://amzn.to/3cxrYfI) was my first attempt at HDMI video capture." maxWidth="600px">}}

Capturing video was tricky because the LKV373A transmitter isn't a video capture device. Its intended purpose is to pair with LKV373A receiver that converts the network video stream back to an HDMI signal and plugs into a TV or monitor. In danman's investigation, he discovered a way to intercept and capture the video stream, but the LKV373A speaks a non-standard protocol that few video tools understand.

Fortunately, danman [contributed a patch to ffmpeg](https://ffmpeg.org/pipermail/ffmpeg-devel/2017-May/211607.html) that handles the LKV377A's goofy behavior, so I was able to render the stream using ffmpeg's video player:

```bash
ffplay -i udp://239.255.42.42:5004
```

{{<img src="ffplay-screenshot.jpg" alt="Screenshot of ffplay rendering video stream from LKV373A" caption="Rendering the video stream from the LKV373A with ffplay" maxWidth="800px">}}

This was the first taste of a problem that dogged me throughout the project: latency. There was almost a one-second delay between the target computer and the the video playback on my desktop.

{{<img src="lkv373a-latency.jpg" alt="Photo of Lenkeng LKV373A HDMI extender" caption="The LKV373A introduced 838 milliseconds of latency before any re-encoding." maxWidth="600px">}}

I tried playing around with ffplay's many command-line flags to speed up the stream, but I never pushed past 800 milliseconds. And that was on my desktop with its high-end GPU and CPU. It didn't bode well for performance-wise for my scrappy little Raspberry Pi.

Fortunately, I found a better solution by complete coincidence.

### HDMI to USB dongle

While mindlessly scrolling through Twitter, I happened to see [a tweet by Arsenio Dev](https://twitter.com/Ascii211/status/1268631069051453448) talking about a low-cost HDMI to USB dongle he had just purchased:

{{<img src="arsenio-dev-tweet.jpg" alt="Screenshot of Rufus" caption="A [tweet from Arsenio Dev](https://twitter.com/Ascii211/status/1268631069051453448) tipped me off to a better video capture solution." linkUrl="https://twitter.com/Ascii211/status/1268631069051453448">}}

Capturing video at 1080p resolution and 30 frames per second seemed a little too good to be true, so I ordered one from eBay. It was only $11, including shipping. I don't even know what you call it &mdash; it has no brand name, so I'll just call it "the HDMI dongle."

{{<img src="hdmi-ebay.png" alt="Screenshot of HDMI for sale on eBay for $11.20" caption="HDMI to USB dongle available on eBay for $11.20 with free shipping" maxWidth="750px" hasBorder="true">}}

When the device arrived a few days later, it blew me away. Without any tinkering, it showed up as a UVC video capture device as soon as I plugged it in to the Raspberry Pi.

```bash {hl_lines=[7,8,9]}
$ sudo v4l2-ctl --list-devices
bcm2835-codec-decode (platform:bcm2835-codec):
        /dev/video10
        /dev/video11
        /dev/video12

UVC Camera (534d:2109): USB Vid (usb-0000:01:00.0-1.4): <<< HDMI capture dongle
        /dev/video0
        /dev/video1
```

Within minutes of connecting it to my Pi, I was able to successfully capture and restream HDMI video:

```bash
# On the Pi
ffmpeg \
  -re \
  -f v4l2 \
  -i /dev/video0 \
  -vcodec libx264 \
  -f mpegts udp://10.0.0.100:1234/stream

# On my Windows desktop
ffplay.exe -i udp://@10.0.0.100:1234/stream
```

It was so darn convenient, too. The LKV373A was nearly brick-sized and required its own power source and Ethernet cable. The HDMI dongle was as small as a thumbdrive and required nothing more than a USB port.

{{<img src="lkv373a-vs-dongle.jpg" alt="Comparison of Lenkeng LKV373A with HDMI dongle" caption="The [Lenkeng LKV373A HDMI extender](https://amzn.to/3cxrYfI) (left) was larger and required more connections than the HDMI dongle (right)." maxWidth="700px">}}

The only problem was, again, latency. The Pi's rebroadcast of the video stream lagged the source computer by 7-10 seconds.

{{<img src="dongle-ffmpeg.jpg" alt="Comparison of Lenkeng LKV373A with HDMI dongle" caption="Using ffmpeg to stream video from my Pi, there was a delay on the video of up to 10 seconds." maxWidth="700px">}}

I wasn't sure if this delay came from dongle itself, from ffmpeg on the Pi, or from ffplay on my desktop. Arsenio Dev reported a latency of 20 ms, so it seemed like faster performance was possible if I delved into [ffmpeg's arcane and mysterious command-line flags](https://ffmpeg.org/ffmpeg.html).

Fortunately, another stroke of luck spared me from that task.

### Borrowing from a similar project

When I publised [my previous blog post](/key-mime-pi/) about Key Mime Pi, I received [a comment from Max Devaev](/key-mime-pi/#comment-4950940807), who encouraged me to check out his project, [Pi-KVM](https://github.com/pikvm/pikvm).

{{<img src="maxim-comment.png" alt="Max's comment: Hi:) Take a look at this project: https://github.com/pikvm/pikvm We have already done and debugged many things" hasBorder="true" caption="Max Devaev pointed me to his existing [Pi-KVM](https://github.com/pikvm/pikvm) project.">}}

{{<img src="melty-breadboard.jpg" align="right" alt="GPIO pins" maxWidth="500px" caption="My previous experience with breadboards involved [accidentally melting them](/greenpithumb/#why-make-another-raspberry-pi-gardening-bot).">}}

I had looked at Pi-KVM briefly, but its [requirements of breadboards and soldering](https://github.com/pikvm/pikvm#v2-diagram) scared me off.

At Max's suggestion, I gave Pi-KVM a second look, particularly interested in how he solved the video latency issue. I noticed that he captured video through a tool called [uStreamer](https://github.com/pikvm/ustreamer).

{{<notice type="info">}}
**Note**: From further discussions with Max, I've learned that Pi-KVM does support builds without soldering or breadboards.
{{</notice>}}

### uStreamer: a super-fast video streamer

Have you ever found a tool that's so good, it solves problems you hadn't even anticipated?

Right out of the box, uStreamer reduced my latency from 8 seconds to 500-600 milliseconds. But it also eliminated a whole chain of extra work I expected to do.

{{<img src="ustreamer-1.jpg" alt="500 ms latency with uStreamer and the HDMI dongle" caption="uStreamer reduced my latency by a factor of 15." maxWidth="700px">}}

Prior to uStreamer, I wasn't sure how I'd get video from ffmpeg into the user's browser, but I knew it was possible somehow. I tested this [mostly-accurate tutorial](https://docs.peer5.com/guides/setting-up-hls-live-streaming-server-using-nginx/) for piping video from ffmpeg to nginx using HLS, but it added even more latency. And it still left open problems like how to start and stop streaming on HDMI cable connects and disconnects or and how to translate the video to a browser-friendly format.

uStreamer solved all of this. It ran its own minimal HTTP server that served video in a format browsers play natively. I didn't have to bother with HLS streams or getting ffmpeg and nginx to talk to each other.

The tool was so fully-featured that I assumed Max simply forked it from a more mature tool, but I was mistaken. This maniac [wrote his own video encoder](https://github.com/pikvm/ustreamer) in C just to squeeze the maximum performance out of Pi hardware. I quickly [donated to Max](https://www.paypal.me/mdevaev) and invite anyone who uses his software to do the same.

## Improving video latency

uStreamer reduced my latency from 10 seconds down to ~600 milliseconds. That was a huge leap forward but still a noticeable delay. I told Max I was interested in funding uStreamer further if he could find ways to improve performance, so we got to chatting.

Max was interested in the HDMI dongle I was using since he'd never seen that particular device. He invited me to create a shared shell session using [tmate](https://tmate.io/) so that he could access my Pi remotely.

{{<img src="maxim-tmate.png" alt="Screenshot of conversation where Max ofers to help me via tmate" caption="Max offered to either help improve latency or frame me for a federal crime. Fortunately, he ended up doing the former.">}}

After a few minutes of testing how uStreamer ran on my hardware, Max ran the [`v4l2-ctl` utility](https://www.mankier.com/1/v4l2-ctl) and saw a line that fascinated him but totally went over my head:

```bash {hl_lines=[8]}
$ sudo v4l2-ctl --all
Driver Info:
        Driver name      : uvcvideo
        Card type        : UVC Camera (534d:2109): USB Vid
...
Format Video Capture:
        Width/Height      : 1280/720
        Pixel Format      : 'MJPG' (Motion-JPEG)
...
Streaming Parameters Video Capture:
        Capabilities     : timeperframe
        Frames per second: 30.000 (30/1)
```

The HDMI dongle was delivering the video stream in `MJPG` format! uStreamer's hardware-assisted encoding was fast, but it was totally unnecessary since modern browsers play Motion JPEG natively.

We adjusted uStreamer to skip re-encoding and just pass through the video stream as-is.

{{<img src="tinypilot-latency.jpg" maxWidth="700px" alt="Photo showing 200ms of latency after eliminating re-encode step" caption="Skipping the extra re-encode step on the Pi reduced latency from 600 ms down to 200 ms.">}}

Latency went from 600 milliseconds all the way down to 200 ms. It's not instantaneous, but it's low enough to forget the latency after using it for a few minutes.

## TinyPilot in action

Remember way back at the beginning of this post when I said I wanted TinyPilot so that I could access my headless VM server before it boots? Well, it works! I iterated on Key Mime Pi to make a new video-integrated web interface called TinyPilot:

<img src="tinypilot-bios.gif">

I built a new headless VM server this year and used TinyPilot to install [Proxmox](https://www.proxmox.com/en/), an open source hypervisor and web interface for managing VMs.

TinyPilot allowed me to manage the entire install from my browser. It was definitely more pleasant than my old process of dragging computers around and swapping cables back and forth.

## How to build your own TinyPilot

### Parts list

{{<notice type="info">}}
**Want an all-in-one TinyPilot kit?**

Support TinyPilot's development by purchasing [an official TinyPilot kit](https://tinypilotkvm.com). It includes all the parts you need to build TinyPilot and guarantees access to premium versions of TinyPilot software I may release in the future.

<div class="btn-wrapper">
  <a href="https://tinypilotkvm.com" class="btn order-now-btn">Order now</a>
</div>
{{</notice>}}

* [Raspberry Pi 4](https://amzn.to/3fdarLM) (all variants work)
* [USB-C to USB-A cable](https://www.amazon.com/AmazonBasics-Type-C-USB-Male-Cable/dp/B01GGKYN0A/) (Male/Male)
* [HDMI to USB capture dongle](https://amzn.to/2YHEvJN)
  * Strangely, these don't have a brand name, but you can recognize them [by their appearance](hdmi-dongle.jpg).
  * They're generally available on eBay for $11-15.
* [microSD card](https://amzn.to/2VH0RcL) (Class 10, 8 GB or larger)
* [HDMI to HDMI cable](https://amzn.to/3gnlZwj)
  * Or \[other\] to HDMI, depending on how your target machine displays output.
* (Optional) [USB to TTL serial cable](https://amzn.to/3cVkuTT)
* (Optional) [3 Amp USB wall charger](https://amzn.to/3hal8Ax)
* (Optional) A cooling case, heat sink, or fan
  * Choose a case that provides easy access to the Pi's GPIO pins.
  * I use a minimalist [passive cooling case](https://amzn.to/3fG1fAa).

### Install Raspberry Pi OS Lite

To begin, install [Raspberry Pi OS lite](https://www.raspberrypi.org/downloads/raspberry-pi-os/) (formerly known as Raspbian) on a microSD card.

{{<img src="rufus-install.png" alt="Screenshot of Rufus" caption="I use [Rufus](https://rufus.ie) to write my Pi micro SD cards, but any whole disk imaging tool will work.">}}

Enable SSH access by placing a file called `ssh` on the microSD's boot partition. If you're connecting over wireless, you need a [`wpa_supplicant.conf` file](https://www.raspberrypi.org/documentation/configuration/wireless/headless.md).

When you're done preparing the microSD card, insert it into your Pi device.

### Install a case (optional)

The Raspberry Pi 4 famously [generates a lot of heat](https://www.jeffgeerling.com/blog/2019/best-way-keep-your-cool-running-raspberry-pi-4). You can run it fine without cooling, but you'll likely hit stability issues over time.

I like [this minimalist case](https://amzn.to/3fG1fAa) because it's inexpensive and passively cools the Pi without the complexity of connecting a powered fan:

{{<img src="minimal-case.jpg" alt="Minimal aluminum case for Raspberry Pi" caption="This [minimalist aluminum case](https://amzn.to/3fG1fAa) is a good way to cool your Pi without the complexity of a fan." maxWidth="600px">}}

### Power your Pi via GPIO (optional)

The Pi draws enough power from the  target computer's USB port to boot and run, but it needs 3 Amps of power for stable operation. A computer's USB port outputs [less than 1 Amp](/key-mime-pi/#solving-the-power-problem).

To give the Pi enough power, use a [3 Amp USB wall charger](https://amzn.to/2YitxsN) and a [USB to TTL serial cable](https://amzn.to/2Yk1CIX). The USB to TTL cable plugs into the Pi's outer row of GPIO pins just before the end of the row:

{{<gallery caption="To power the Pi, connect a [USB to TTL cable](https://amzn.to/3cVkuTT) to the power pins on the GPIO.">}}
  {{<img src="power-pins-top.jpg" alt="Top view of USB to TTL connection" maxWidth="400px">}}
  {{<img src="power-pins-side.jpg" alt="Side view of USB to TTL connection" maxWidth="400px">}}
{{</gallery>}}

To power on your Pi, plug the wall charger into an outlet, and connect the USB-A end of your power cable to the AC adaptor:

{{<img src="ac-adaptor.jpg" alt="Photo of USB cable plugged into AC adaptor" maxWidth="600px" caption="Power to Pi by connecting the USB to TTL cable to a 3 Amp AC adaptor.">}}

### Connect to the machine via USB

To enable TinyPilot to function as a virtual keyboard, connect your Pi's USB-C port to a USB-A port on the target machine:

{{<gallery caption="With a USB-C to USB-A cable, connect the USB-C end to the Pi's USB-C port and the USB-A end to the target computer.">}}
  {{<img src="usb-cable.jpg" alt="USB connection to Raspberry Pi" maxWidth="500px">}}
  {{<img src="usb-server.jpg" alt="USB connection to target computer" maxWidth="500px">}}
{{</gallery>}}

### Attach the HDMI capture dongle

To complete the physical assembly, insert the HDMI dongle into one of the Pi's USB ports. Insert an HDMI cable into the dongle, and connect the other end to the display output of your target computer.

{{<gallery caption="Connect the display output of the target computer to the HDMI dongle and insert it into the Pi's USB port.">}}
  {{<img src="hdmi-insert.jpg" alt="HDMI input connection to Raspberry Pi" maxWidth="500px">}}
  {{<img src="hdmi-server.jpg" alt="HDMI output connection from target computer" maxWidth="500px">}}
{{</gallery>}}

{{<notice type="info">}}
**Note**: If the computer you're connecting to has no HDMI output, you should be able to use a [DisplayPort to HDMI cable](https://amzn.to/2Oy2Con) or a [DVI to HDMI cable](https://amzn.to/2WyWrFg), though I haven't tested these personally.
{{</notice>}}

### Connect an Ethernet cable (optional)

If you're connecting to your Pi over wired LAN, attach a network cable to your Pi's Ethernet port:

{{<img src="ethernet-cable.jpg" alt="Photo of Ethernet cable connected to Pi device" maxWidth="700px" caption="Connect an Ethernet cable to your Pi.">}}

### Install the TinyPilot software

SSH into your Pi device (default credentials for Raspberry Pi OS are `pi` / `raspberry`), and run the following commands:

```bash
curl -sS https://raw.githubusercontent.com/mtlynch/tinypilot/master/quick-install \
  | bash -
sudo reboot
```

If you're appropriately suspicious of piping a random web script into your shell, I encourage you to inspect [the source](https://github.com/mtlynch/tinypilot/blob/master/quick-install).

The script bootstraps a self-contained Ansible environment with my [TinyPilot Ansible role](https://github.com/mtlynch/ansible-role-tinypilot). It installs four services that run on every boot:

* [nginx](https://nginx.org/): a popular open source web server
* [ustreamer](https://github.com/pikvm/ustreamer): a lightweight HTTP video streaming server
* [usb-gadget](https://github.com/mtlynch/tinypilot/blob/master/enable-usb-hid): a script enabling Pi's "USB gadget mode" which allows the Pi to impersonate USB devices
* [tinypilot](https://github.com/mtlynch/tinypilot): the web interface I created for TinyPilot

## Using TinyPilot

After you run the install script, TinyPilot will be available at:

* [http://raspberrypi/](http://raspberrypi/)

{{<img src="tinypilot-hello-world.png" alt="Screenshot of TinyPilot web interface" maxWidth="700px" caption="When setup is complete, you can access TinyPilot's web interface at [http://raspberrypi/](http://raspberrypi/) on your local network.">}}

## TinyPilot kits

If you'd like to support further development of this software, consider [donating](https://paypal.me/mtlynchio) or [purchasing a TinyPilot kit](https://tinypilotkvm.com). Kits include all the equipment you need to build your own TinyPilot, and it includes a pre-formatted microSD card so you don't need to configure any software.

{{<img src="tinypilot-order.png" alt="Screenshot of TinyPilot order page" linkUrl="https://tinypilotkvm.com/order" hasBorder="true" caption="Purchasing a [TinyPilot kit](https://tinypilotkvm.com/order) supports future development of TinyPilot and guarantees you access to premium features I may add in the future.">}}

## Source code

All TinyPilot software is open source under the permissive [MIT license](https://opensource.org/licenses/MIT):

* [tinypilot](https://github.com/mtlynch/tinypilot.git): The TinyPilot web interface and backend.
* [ansible-role-tinypilot](https://github.com/mtlynch/ansible-role-tinypilot): The Ansible role for installing TinyPilot and its dependencies as systemd services.

---
*Special thanks to Max Devaev for his incredible work on [uStreamer](https://github.com/pikvm/ustreamer) and his contributions to TinyPilot.*