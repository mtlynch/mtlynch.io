---
title: "TinyPilot: Build your own KVM over IP for under $100"
date: "2020-07-10T00:00:00Z"
tags:
- raspberry pi
- python
- ansible
- homelab
- kvm
images:
- tinypilot/cover.jpg
---

TinyPilot is a device that gives you remote access to a computer even if the machine has no network connection or operating system loaded. I use TinyPilot with [my homelab bare metal servers](/building-a-vm-homelab/) to install new operating systems and to debug boot errors. This posts explains my experience building it and how you can build your own for under $100.

## Don't tell me your life story; just tell me how to build it

If you're a grinch and you want to skip over my fascinating and enlightening journey to building TinyPilot, you can skip directly to [build your own TinyPilot](#build-your-own-tinypilot) for the tutorial portion of this post.

## Headless servers are great until they're not

A few years ago, I built my own home server for hosting my virtual machines. It's been a great investment, and I use it every day.

The problem is that from my desk, it's all the way over there. When everything works, it works great. There's no keyboard or monitor attached, because I can access the server over ssh or through its web interface. The problem is that when something goes wrong, it's a huge pain. Every few months, I'll screw something up that prevents the server from booting or joining the network. When that happens, I'm effectively locked out of the machine, so I have to disconnect everything, drag the server over to my desk, and juggle cables around to disconnect my desktop and hook up the keyboard and monitor to my server.

I'd always told myself that I'd correct this mistake by building my next server with a remote administration in mind. I knew Dell servers have iDRAC and HP servers have iLO, both of which are basically chips that let you get a virtual keyboard and monitor on the device as long as there's a network cable plugged in. Even if the OS itself won't boot. But when I actually looked into it, those chips are super expensive and require $XX license from the manufacturer. I looked into 

Recent versions of the Raspberry Pi support USB on-the-go (USB OTG), which allows them to impersonate USB devices such as keyboards, thumb drives, and microphones. To take advantage of this, I made an open-source web app that turns my Pi into a fake keyboard. I call it [TinyPilot](https://github.com/mtlynch/tinypilot.git).

This post demonstrates how TinyPilot works and how you can build one for yourself.

## Demo

TODO

## How it works

### Keyboard emulation

In order for the Pi to send keystrokes to the target device, it uses USB OTG functionality to impersonate a USB keyboard. I described this behavior in more detail in [my previous post](/key-mime-pi#how-it-works).

### Video capture

Video capture was the most difficult part of this. It took a while to find hardware that could capture HDMI input while also being:

1. Affordable
1. Performant
1. Hackable

#### First try: Lenkeng HDMI over IP extender

My first attempt was to use the [Lenkeng LKV373A HDMI extender](https://amzn.to/3cxrYfI). Daniel Kucera did an excellent job [reverse engineering](https://blog.danman.eu/new-version-of-lenkeng-hdmi-over-ip-extender-lkv373a/) this device and even [contributed a patch](https://ffmpeg.org/pipermail/ffmpeg-devel/2017-May/211607.html) to allow ffmpeg to capture output from this device. It was available from Chinese merchants on eBay for around $40, so it seemed like my best option.

{{<img src="lkv373a.jpg" alt="Photo of Lenkeng LKV373A HDMI extender" caption="The [Lenkeng LKV373A HDMI extender](https://amzn.to/3cxrYfI) was my first attempt at HDMI video capture." maxWidth="600px">}}

I received the LKV373A within a few weeks and quickly realized that it was tough to build a solution on top of a device designed for a different purpose. The LKV373A is supposed to be sort of an HDMI extension cord over your network. It pairs with a custom receiver, which translates the stream back to HDMI. Kucera found ways to intercept the video stream, but bending the device to perform against its intended purpose adds complexity to every stage of the process.

The other big drawback was that the LKV373A outputs its data through UDP multicast. That means that every device on your network receives an HD video stream while the LKV373A is running. Kucera found a way to switch it to unicast, but it involves flashing the device with mystery firmware from a shared Google Drive folder (legality TBD). I considered avoiding the unicast issue altogether by just connecting the LKV373A directly to the Pi's Ethernet port, but that would occupy the Pi's only Ethernet port.

#### Capturing video with the LKV373A

I was able to capture video, but it was flaky.

It broadcasts to UDP on at URL `udp://239.255.42.42:5004`. Kucera was able to play the stream directly with VLC, a popular video player, but that didn't work for me. I was able to do it with ffplay, an open source video player:

```bash
ffplay -i udp://239.255.42.42:5004
```

{{<img src="ffplay-screenshot.jpg" alt="Screenshot of ffplay rendering video stream from LKV373A" caption="Rendering the video stream from the LKV373A with ffplay" maxWidth="800px">}}

But it was very slow. There was almost a one-second delay between the target computer and the network stream.

{{<img src="lkv373a-latency.jpg" alt="Photo of Lenkeng LKV373A HDMI extender" caption="The LKV373A introduced 838 milliseconds of latency before any re-encoding." maxWidth="600px">}}

I tried playing around with ffplay's many command-line flags to speed up the stream, but I never pushed past 800 milliseconds. And that was a problem because that was the upper-limit since I was capturing the stream and rendering it locally on my desktop. I wanted to capture the stream on the Pi and re-encode over the network in the browser. That was likely to add a lot more latency.

Fortunately, I found a better solution by complete coincidence.

#### HDMI to USB dongle

Amid my mindless Twitter scrolling, I happened to see [a tweet by Arsenio Dev](https://twitter.com/Ascii211/status/1268631069051453448) talking about a low-cost HDMI to USB dongle he had just purchased:

{{<img src="arsenio-dev-tweet.jpg" alt="Screenshot of Rufus" caption="A [tweet from Arsenio Dev](https://twitter.com/Ascii211/status/1268631069051453448) tipped me off to a better video capture solution." linkUrl="https://twitter.com/Ascii211/status/1268631069051453448">}}

It seemed a little too good to be true, but I ordered one from eBay. It was only $11, including shipping. Unlike the LKV373A, which are available almost exclusively from sellers in China, plenty of US-based sellers had this device in stock. I don't even know what you call it. It has no brand name, so I'll just call it "the HDMI dongle."

I received the device a few days later and was blown away. It was better than the LKV373A in every way. Within minutes of connecting it to my Pi, I was able to successfully stream the video output using ffmpeg. The LKV373A was almost as large as a brick and required its own power source and Ethernet cable. The HDMI dongle was the size of a thumbdrive and required nothing more than a USB port.

{{<img src="lkv373a-vs-dongle.jpg" alt="Comparison of Lenkeng LKV373A with HDMI dongle" caption="The [Lenkeng LKV373A HDMI extender](https://amzn.to/3cxrYfI) (left) was larger and required more connections than the HDMI dongle (right)." maxWidth="700px">}}

Surprisingly, this dongle can even capture video protected with HDCP. When I connected the LKV373A to my Roku Premiere, it captured a blank stream, but the HDMI dongle captured it without issue:

TODO: Replace with ffplay

{{<img src="roku-capture.jpg" alt="TinyPilot capturing Roku output" maxWidth="600px" caption="The HDMI dongle can capture a video stream from a Roku Premiere, even though Roku encrypts its output stream with HDCP.">}}

The only problem was latency. Using ffmpeg to stream, there was a delay of four to five seconds on the video. I wasn't sure if this delay was coming from the device itself, from ffmpeg, or from ffplay, the video player I was using to receive the stream. Arsenio Dev reported a latency of 20 ms, so I suspected that if I found the magic formula of ffmpeg's arcane flags, I could substantially reduce the latency.

Fortunately, I was blessed with another stroke of luck that saved me tons of work.

#### Borrowing from a similar project

When I publised my previous blog post about getting keyboard input working, I received [a comment from Maxim Devaev](/key-mime-pi/#comment-4950940807), who encouraged me to check out his project, [Pi-KVM](https://github.com/pikvm/pikvm).

{{<img src="maxim-comment.png" alt="Maxim's comment: Hi:) Take a look at this project: https://github.com/pikvm/pikvm We have already done and debugged many things" hasBorder="true" caption="Maxim Devaev pointed me to his existing [Pi KVM](https://github.com/pikvm/pikvm) project.">}}

{{<img src="melty-breadboard.jpg" align="right" alt="GPIO pins" maxWidth="500px" caption="My previous experience with breadboards involved [accidentally melting them](/greenpithumb/#why-make-another-raspberry-pi-gardening-bot).">}}

I had looked at it briefly earlier in my work, but it [required soldering components together](https://github.com/pikvm/pikvm#v2-diagram), which scared me off, so I continued rolling my own solution with simpler hardware.


At Maxim's suggestion, I gave Pi-KVM a second look, particularly interested in how he solved the video latency issue. I noticed that he captured video through a tool called [uStreamer](https://github.com/pikvm/ustreamer). I'd never heard of it, but it seemed simple enough to compile from source, so I did.

#### uStreamer: a super-fast video streamer

Have you ever found a tool that's so good, it not only solves your problems but also solves adjacent problems you didn't even expect it to address?

Right out of the box, uStreamer reduced my latency from 5 seconds to 600 milliseconds, an incredible speedup. But beyond that, it eliminated a whole chain of extra work I expected to do.

TODO: Side by side

Prior to uStreamer, my intended strategy was to encode the video using ffmpeg. I wasn't sure how exactly I'd get it from ffmpeg into the user's browser, but I knew it was possible somehow. I tested this [mostly-accurate tutorial](https://docs.peer5.com/guides/setting-up-hls-live-streaming-server-using-nginx/) for streaming video from ffmpeg to nginx using HLS. The ffmpeg + nginx solution had worked, but it added even more latency and left a few hairy problems to solve:

* It makes no sense for the user to play or pause the video stream, so could I eliminate those controls and make the video auto-play?
* How do I get ffmpeg to launch automatically when the user connects and HDMI cable?
* Browsers can't play HLS streams natively, so which third-party JavaScript solution should I use to render the stream?
* How do I debug issues now that the stream is going from target computer -> HDMI dongle -> ffmpeg -> nginx -> third-party video player -> browser?

uStreamer simply solved all of this. It ran its own minimal HTTP server that served video in a format browsers could play natively. I didn't have to bother with HLS streams or getting ffmpeg and nginx to talk to each other.

The tool was so fully-featured that I assumed Maxim simply forked it from a more mature tool, but no. This maniac wrote his own video encoder in C just to squeeze the maximum performance he could out of the Pi's hardware. I quickly [donated to Maxim](https://www.paypal.me/mdevaev), and I invite anyone who uses his software to do the same.

### What the heck is Motion JPEG?

I mentioned that uStreamer output to a regular URL endpoint. When I loaded the URL in the browser, it played the video natively.

I embedded uStreamer's video in TinyPilot's web interface using an `<iframe>`. That worked, so I assumed I solved the problem. Then, I noticed that my browser never stopped loading. Checking the network tab, it seemed to think that the uStreamer stream was just a never-ending download. That was still usable, but I wanted it to display the same way it would display any normal streaming video.

I tried dropping the `<iframe>` and loading the URL in a `<video>` tag. No luck.

From reading uStreamer's documentation, it said that it was streaming video in a format called Motion JPEG (MJPEG), which I'd never heard of before. I Googled how to embed MJPEG in a website. To my surprise, in all the discussions, people were talking about loading MJPEG streams in `<img>` tags. What? Images are for still images. Okay, maybe animated GIFs, but not streaming video.

But sure enough, I tried putting the URL in an `<img>` tag, and it worked perfectly. The infinite reload issue went away. It had the exact behavior I wanted where the user didn't have to hit "play" to start the stream. It began streaming as soon as the page loaded.

### Improving video latency

With uStreamer, the only big difference between my solution and the more expensive solutions was latency. uStreamer got me from 5 seconds of latency down to 600 milliseconds, which was a huge leap forward. Still, 600 milliseconds was noticeable delay. I've never used enterprise-grade KVM over IP gear, but I suspected that they did a lot better than 600 milliseconds.

I told Maxim about the possibility of funding performance improvements in uStreamer, so we got to chatting. He was interested in the HDMI dongle I was using since he'd never experimented with it. He invited me to create a tmate session so that he could remotely access my device.

{{<img src="maxim-tmate.png" alt="Screenshot of conversation where Maxim ofers to help me via tmate" caption="Maxim offered to either help improve latency or frame me for a felony. Fortunately, he ended up doing the former.">}}

After a few minutes of testing how uStreamer played with my device, Maxim ran [`v4l2-ctl`](https://www.mankier.com/1/v4l2-ctl) a command I didn't know existed. It outputs information about the video capture devices on the system. The output had a line that fascinated Maxim but totally went over my head at first:

```bash
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

The pixel format was `MJPG`: that meant the device was already encoding the video stream to Motion JPEG. uStreamer's hardware-assisted encoding was fast, but it was totally unnecessary since it was effectively re-encoding a stream that was already in the format we wanted.

We adjusted uStreamer to skip the re-encode and just pass through the video stream as-is.

{{<img src="tinypilot-latency.jpg" maxWidth="700px" alt="Photo showing 200ms of latency after eliminating re-encode step" caption="Skipping the extra re-encode step on the Pi reduced latency from 600 ms down to 200 ms.">}}

Wow! Latency went from 600 milliseconds all the way down to 200 ms. It's not instantaneous, but it's low enough that it's easy to forget the latency after a few minutes.

### Building the TinyPilot web interface

Wanted to try building it without any external libraries.

## Build your own TinyPilot

I have all-in-one kits you can use or you can buy your own parts. The software is all free and open source.

### Parts list

TODO: Self-ad for TinyPilot kits.

* [Raspberry Pi 4](https://amzn.to/3fdarLM) (all variants work)
* [USB-C to USB-A](https://www.amazon.com/AmazonBasics-Type-C-USB-Male-Cable/dp/B01GGKYN0A/) cable (Male/Male)
* [HDMI to USB capture dongle](https://amzn.to/2YHEvJN)
  * Strangely, these don't have a brand name, but you can recognize them by their appearance.
  * They're generally available on eBay for $11-15.
* [USB to TTL serial cable](https://amzn.to/3cVkuTT)
* [3A USB wall charger](https://amzn.to/3hal8Ax)
* [microSD card](https://amzn.to/2VH0RcL) (Class 10, 8 GB or larger)
* [HDMI to HDMI cable](https://amzn.to/3gnlZwj)
  * Or \[other\] to HDMI, depending on how your target machine displays output.
* (Optional) A cooling case or heat sink
  * Ensure that the case provides easy access to the Pi's GPIO pins.
  * I use a minimalist aluminum passively cooling case. (TODO: link)

### Install Raspberry Pi OS Lite

To begin, install [Raspberry Pi OS lite](https://www.raspberrypi.org/downloads/raspberry-pi-os/) (formerly known as Raspbian) on a microSD card.

{{<img src="rufus-install.png" alt="Screenshot of Rufus" caption="I use [Rufus](https://rufus.ie) to write my Pi micro SD cards, but any whole disk imaging tool will work.">}}

Enable SSH access by placing a file called `ssh` on the microSD's boot partition. If you're connecting over wireless, you'll also need to [add a `wpa_supplicant.conf` file](https://www.raspberrypi.org/documentation/configuration/wireless/headless.md).

When you're done preparing the microSD card, insert it into your Pi device.

### Install a case (optional)

The Raspberry Pi 4 famously generates a lot of heat (TODO: link to GeerlingGuy post). You can run it fine as a bare chip, but you'll likely hit stability issues. Fortunately, there's a wide selection of cases that cool either with a fan or by passively spreading the heat from the CPU and GPU across a larger surface area.

I like this minimalist case that provides passive cooling:

TODO: Photos

### Power your Pi via GPIO

People typically power their Pi through its USB-C port. TinyPilot uses this port to connect to the target computer and emulate a USB keyboard. The Pi requires 3 Amps of power, but a computer's standard USB port outputs less than 1 Amp of power. It's enough to boot the Pi, but the Pi will run into stability issues if that's its only power source.

You can solve this with a [3 Amp USB wall charger](https://amzn.to/2YitxsN) and a [USB to TTL serial cable](https://amzn.to/2Yk1CIX). The USB to TTL cable connects to the Pi's GPIO pins, ensuring the device always receives at least 3 Amps of electricity.

The USB to TTL cable plugs into the Pi's outer row of GPIO pins just before the end of the row. See the photos below:

{{<gallery caption="To power the Pi, connect a [USB to TTL cable](https://amzn.to/3cVkuTT) to the power pins on the GPIO.">}}
  {{<img src="power-pins-top.jpg" alt="Top view of USB to TTL connection" maxWidth="400px">}}
  {{<img src="power-pins-side.jpg" alt="Side view of USB to TTL connection" maxWidth="400px">}}
{{</gallery>}}

To power on your Pi, plug the wall charger into an outlet, and connect the USB-A end of the USB to TTL cable:

{{<img src="ac-adaptor.jpg" alt="Photo of USB cable plugged into AC adaptor" maxWidth="600px" caption="Power to Pi by connecting the USB to TTL cable to a 3 Amp AC adaptor.">}}

### Connect to the machine via USB

Connect your USB cable to your Pi's USB-C port and the other end to your target computer:

{{<gallery caption="With a USB-C to USB-A cable, connect the USB-C end to the Pi's USB-C port and the USB-A end to the target computer.">}}
  {{<img src="usb-cable.jpg" alt="USB connection to Raspberry Pi" maxWidth="500px">}}
  {{<img src="usb-server.jpg" alt="USB connection to target computer" maxWidth="500px">}}
{{</gallery>}}

### Attach the HDMI capture dongle

To complete the physical assembly, insert the HDMI dongle into one of the Pi's USB ports. Insert an HDMI cable into the dongle, and connect the other end to the display output of your target computer.

{{<gallery caption="With a USB-C to USB-A cable, connect the USB-C end to the Pi's USB-C port and the USB-A end to the target computer.">}}
  {{<img src="hdmi-insert.jpg" alt="HDMI input connection to Raspberry Pi" maxWidth="500px">}}
  {{<img src="hdmi-server.jpg" alt="HDMI output connection from target computer" maxWidth="500px">}}
{{</gallery>}}

TODO: Test Display Port to HDMI cable.

{{<notice type="info">}}
**Note**: If the computer you're connecting to has no HDMI output, you should be able to use a simple DVI to HDMI adaptor or Display Port to HDMI adaptor, though I haven't tested this personally. (TODO:  link to devices)
{{</notice>}}

### Connect an Ethernet cable (optional)

If you're connecting to your Pi over wired Ethernet, attach an Ethernet cable to your Pi's Ethernet port:

{{<img src="ethernet-cable.jpg" alt="Photo of Ethernet cable connected to Pi device" maxWidth="700px" caption="Connect an Ethernet cable to your Pi.">}}

### Install the TinyPilot software

SSH into your Pi device (default credentials for Raspberry Pi OS are `pi` / `raspberry`), and run the following commands:

```bash
curl -sS https://raw.githubusercontent.com/mtlynch/tinypilot/master/quick-install \
  | bash -
sudo reboot
```

If you're appropriately suspicious of piping a random web script into your shell, I encourage you to inspect [the source](https://github.com/mtlynch/tinypilot/blob/master/quick-install).

The script bootstraps a self-contained Ansible environment on your Pi and uses it to install four services that run on every boot:

* [nginx](https://nginx.org/): a popular open source web server
* [ustreamer](https://github.com/pikvm/ustreamer): a video streaming server optimized for Raspberry Pi hardware
* [usb-gadget](https://github.com/mtlynch/tinypilot/blob/master/enable-usb-hid): enables the Pi's USB "gadget mode" which allows the Pi to impersonate USB devices
* [tinypilot](https://github.com/mtlynch/tinypilot): the web interface I created for TinyPilot

## Using TinyPilot

After you run the install script, TinyPilot will be available at:

* [http://raspberrypi/](http://raspberrypi/)

TODO: Demo

## TinyPilot kits

If you'd like to support further development of this software, consider purchasing a TinyPilot kit. It includes all the hardware you need to build your own, and it includes a pre-formatted microSD card so you don't need to configure anything.

TODO: Show order page

* [tinypilotkvm.com](https://tinypilotkvm.com)

## Source code

All TinyPilot software is open source under the permissive [MIT license](https://opensource.org/licenses/MIT):

* [tinypilot](https://github.com/mtlynch/tinypilot.git): Web server that forwards keystrokes to the Pi's virtual keyboard.
* [ansible-role-tinypilot](https://github.com/mtlynch/ansible-role-tinypilot): The Ansible role for installing TinyPilot and its dependencies as systemd services.

---
*Special thanks to Maxim Devaev for his contributions to TinyPilot and his incredible work on [uStreamer](https://github.com/pikvm/ustreamer).*