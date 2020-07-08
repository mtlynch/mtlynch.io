---
title: "Tiny Pilot: Build your own KVM over IP for under $100"
date: "2020-07-10T00:00:00Z"
tags:
- raspberry pi
- python
- ansible
- homelab
description: The Raspberry Pi 4 has an impressive array of functionality that allow it to capture video output and impersonate a keyboard, effectively making a virtual KVM.
images:
- tinypilot/cover.jpg
---

Tiny Pilot is a device that gives you remote access to a computer even if the machine has no network connection or operating system loaded. I use Tiny Pilot with [my homelab bare metal servers](/building-a-vm-homelab/) to install new operating systems and to debug boot errors. This posts explains my experience building it and how you can build your own for under $100.

## Don't tell me your life story; just tell me how to build it

If you want to skip over the backstory, skip to [Build your own Tiny Pilot](#build-your-own-tiny-pilot).

## Headless servers are great until they're not

A few years ago, I built my own home server for hosting my virtual machines. It's been a great investment, and I use it every day.

The problem is that from my desk, it's all the way over there. When everything works, it works great. There's no keyboard or monitor attached, because I can access the server over ssh or through its web interface. The problem is that when something goes wrong, it's a huge pain. Every few months, I'll screw something up that prevents the server from booting or joining the network. When that happens, I'm effectively locked out of the machine, so I have to disconnect everything, drag the server over to my desk, and juggle cables around to disconnect my desktop and hook up the keyboard and monitor to my server.

I'd always told myself that I'd correct this mistake by building my next server with a remote administration in mind. I knew Dell servers have iDRAC and HP servers have iLO, both of which are basically chips that let you get a virtual keyboard and monitor on the device as long as there's a network cable plugged in. Even if the OS itself won't boot. But when I actually looked into it, those chips are super expensive and require $XX license from the manufacturer. I looked into 

Recent versions of the Raspberry Pi support USB on-the-go (USB OTG), which allows them to impersonate USB devices such as keyboards, thumb drives, and microphones. To take advantage of this, I made an open-source web app that turns my Pi into a fake keyboard. I call it [Tiny Pilot](https://github.com/mtlynch/tinypilot.git).

This post demonstrates how Tiny Pilot works and how you can build one for yourself.

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

My first attempt was to use the Lenkeng LKV373A HDMI extender. Daniel Kucera did an excellent job [reverse engineering](https://blog.danman.eu/new-version-of-lenkeng-hdmi-over-ip-extender-lkv373a/) this device and even [contributed a patch](https://ffmpeg.org/pipermail/ffmpeg-devel/2017-May/211607.html) to allow ffmpeg to capture output from this device. It was available from Chinese merchants on eBay for around $40, so it seemed like my best option.

TODO: Photos

I received the LKV373A within a few weeks and quickly realized that it was tough to build a solution on top of a device designed for a different purpose. The LKV373A is supposed to be sort of an HDMI extension cord over your network. It pairs with a custom receiver, which translates the stream back to HDMI. Kucera found ways to intercept the video stream, but bending the device to perform against its intended purpose adds complexity to every stage of the process.

The other big drawback was that the LKV373A outputs its data through UDP multicast. That means that every device on your network receives an HD video stream while the LKV373A is running. Kucera found a way to switch it to unicast, but it involves flashing the device with mystery firmware from a shared Google Drive folder (legality TBD). I considered avoiding the unicast issue altogether by just connecting the LKV373A directly to the Pi's Ethernet port, but then that uses up the Pi's only Ethernet port.

#### Capturing video with the LKV373A

I was able to capture video, but it was flaky.

It broadcasts to UDP on XX

```bash
ffplay -i udp://239.255.42.42:5004
```

I was able to reduce the latency a bit more with this command, which I cobbled together haphazardly from different forum posts and StackOverflow answers:

```bash
ffplay \
  -i udp://239.255.42.42:5004 \
  -fflags \
  -nobuffer \
  -analyzeduration 1 \
  -sync ext \
  -probesize 32
```

Daniel Kucera was able to play his stream directly in VLC, but it didn't work for me. The only way I could get it to work was when I re-streamed it with ffmpeg:

```bash
ffmpeg -i udp://@239.255.42.42:5004 -vcodec copy -f mpegts udp://127.0.0.1:1234
```

```bash
vlc.exe udp://@:1234
```

But even with that solution, VLC would sometimes fail to play the stream.

Even if I got it to play consistently in VLC, I still needed to figure out a way to get it to play in the browser. Peer 5 had a [mostly-working tutorial](https://docs.peer5.com/guides/setting-up-hls-live-streaming-server-using-nginx/) for streaming video from ffmpeg to nginx using HLS. I was able to reproduce it with some tweaks. I was worried about that, because it added tons of other complexity to the mix:

* I'd have to get ffmpeg to automatically run whenever the device received
* Needs a video player that can play HLS streams, as browsers can't play it natively.
* I'd have to automate the process of compiling nginx with an open source rtmp module and installing it as a service.

It was hard enough to debug problems when there was just a network video stream and a desktop video player. Adding in nginx, ffmpeg, and video.js into the mix would make things a lot more complicated.

Fortunately, I found a better solution by complete coincidence.

#### HDMI to USB device

Amid my mindless Twitter scrolling, I happened to see a tweet by Arsenio Dev talking about a low-cost HDMI to USB dongle he had just purchased:

{{<img src="arsenio-dev-tweet.jpg" alt="Screenshot of Rufus" caption="A [tweet from Arsenio Dev](https://twitter.com/Ascii211/status/1268631069051453448) tipped me off to a better video capture solution." linkUrl="https://twitter.com/Ascii211/status/1268631069051453448">}}

It seemed a little too good to be true, but I ordered one from eBay for only $11, including shipping. Unlike the LKV373A, which are available almost exclusively from sellers in China, plenty of US-based sellers had this device in stock. I don't even know what you call it. It has no brand name, so I'll just call it "the HDMI dongle."

I received the device a few days later and was blown away. It was better for my needs than the LKV373A in every way. Within minutes of connecting it to my Pi, I was able to successfully stream the video output using ffmpeg. Unlike the LKV373A, which was almost double the size of the Pi and required its own power source and Ethernet cable, the HDMI dongle was conveniently small and required nothing more than a USB port.

Surprisingly, this dongle can even capture video protected with HDCP. When I connected the LKV373A to my Roku Premiere, it captured a blank stream, but the HDMI dongle captured it without issue:

{{<img src="roku-capture.jpg" alt="Tiny Pilot capturing Roku output" maxWidth="600px" caption="The HDMI dongle can capture a video stream from a Roku Premiere, even though Roku encrypts its output stream with HDCP.">}}

The only problem was latency. Using ffmpeg to stream, there was a delay of four to five seconds on the video. I wasn't sure if this delay was coming from the device itself, from ffmpeg, or from ffplay, the video player I was using to receive the stream. Arsenio Dev reported a latency of 20 ms, so I suspected that if I found the magic formula of ffmpeg's arcane flags, I could substantially reduce the latency.

Fortunately, I was blessed with another stroke of luck that saved me tons of work.

#### uStreamer: a super-fast video streamer

When I publised my previous blog post about getting keyboard input working, Maxim Devaev [encouraged me](/key-mime-pi/#comment-4950940807) to check out his project, [Pi-KVM](https://github.com/pikvm/pikvm).

{{<img src="maxim-comment.png" alt="Maxim's comment: Hi:) Take a look at this project: https://github.com/pikvm/pikvm We have already done and debugged many things" hasBorder="true" caption="Maxim Devaev pointed me to his existing [Pi KVM](https://github.com/pikvm/pikvm) project.">}}

I had looked at it briefly earlier in my work, but it [required soldering components together](https://github.com/pikvm/pikvm#v2-diagram), which scared me off. I have a [difficult history with breadboards](/greenpithumb/#why-make-another-raspberry-pi-gardening-bot).

{{<img src="melty-breadboard.jpg" alt="GPIO pins" maxWidth="500px" caption="My previous experience with breadboards involved accidentally melting them.">}}

I gave Pi-KVM a second look, particularly interested in how he solved the video latency issue. I noticed that he captured video through a tool called [uStreamer](https://github.com/pikvm/ustreamer). I'd never heard of it, but it seemed simple enough to compile from source, so I did.

Wow!

Do you ever have that feeling where you find a solution to a problem that you didn't even realize you had. uStreamer was awesome. 

Not only did it improve video latency by an order of magnitude, it handled all the complexity of translating the video stream to a browser-friendly format. Until I found uStreamer, I thought my solution would still depend on klunkily chaining together ffmpeg, nginx, and the XX plugin. 

uStreamer streamed directly to HTTP. It spins up its own web server and gives you an HTTP endpoint that modern browsers can stream natively. It even has a JSON endpoint so you can retrieve metadata about the stream in real time.

The tool was so fully-featured that I assumed Maxim simply forked it from a more mature tool, but no. This maniac wrote his own video encoder in C just to squeeze the maximum performance he could out of the Pi's hardware. I quickly [donated to Maxim](https://www.paypal.me/mdevaev), and I invite anyone who tries his software to do the same.

### What the heck is Motion JPEG?

I mentioned that uStreamer output to a regular URL endpoint. I embedded it in Tiny Pilot using an `<iframe>`. That worked, so I assumed I solved the problem. Then, I noticed that my browser never stopped loading. Checking the network tab, it seemed to think that the uStreamer stream was just a never-ending download. That was still usable, but I wanted it to display the same way it would display any normal streaming video.

I tried dropping the `<iframe>` and loading the URL in a `<video>` tag. No luck.

From reading uStreamer's documentation, it said that it was streaming video in a format called Motion JPEG (MJPEG), which I'd never heard of before. I Googled how to embed MJPEG in a website. To my surprise, in all the discussions, people were talking about loading MJPEG streams in `<img>` tags. What? Images are for still images. Okay, maybe animated GIFs, but not streaming video.

But sure enough, I tried putting the URL in an `<img>` tag, and it worked perfectly. The infinite reload issue went away. It had the exact behavior I wanted where the user didn't have to hit "play" to start the stream. It was just streaming as soon as the page loaded.

### Improving latency

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

D'oh, it was already in motion JPEG.

### Building the Tiny Pilot web interface

Wanted to try building it without any external libraries.

## Build your own Tiny Pilot

I have all-in-one kits you can use or you can buy your own parts. The software is all free and open source.

### Parts list

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

Enable SSH access by placing a file called `ssh` on the microSD's boot partition. If you're connecting over wireless, you'll also need to [create a `wpa_supplicant.conf` file](https://www.raspberrypi.org/documentation/configuration/wireless/headless.md) on the boot partition.

When you're done preparing the microSD card, insert it into your Pi device.

### Install a case (optional)

The Raspberry Pi 4 famously generates a lot of heat (TODO: link to GeerlingGuy post). You can run it fine as a bare chip, but you'll likely run

TODO: Photos

I use this chip

### Power your Pi via GPIO

People typically power their Pi through its USB-C port. Tiny Pilot uses this port to connect to the target computer and emulate a USB keyboard. The Pi requires 3 Amps of power, but a computer's standard USB port outputs less than 1 Amp of power. It's enough to boot the Pi, but the Pi will run into stability issues if that's its only power source.

You can solve this with a [3 Amp USB wall charger](https://amzn.to/2YitxsN) and a [USB to TTL serial cable](https://amzn.to/2Yk1CIX). The USB to TTL cable connects to the Pi's GPIO pins, ensuring the device always receives at least 3 Amps of electricity.

The USB to TTL cable plugs into the Pi's outer row of GPIO pins just before the end of the row. See the photos below:

{{<gallery caption="To power the Pi, connect a USB to TTL">}}
  {{< img src="power-pins-top.jpg" alt="Top view of USB to TTL connection" maxWidth="400px" >}}
  {{< img src="power-pins-side.jpg" alt="Side view of USB to TTL connection" maxWidth="400px" >}}
{{</gallery>}}

To power on your Pi, plug the wall charger into an outlet and connect the USB-A end of the USB to TTL cable:

TODO: Show photo

### Connect to the machine via USB

Connect your USB cable to your Pi's USB-C port:

{{<img src="usb-cable.jpg" alt="USB connection to Raspberry Pi" maxWidth="500px" caption="Connect the USB-C cable to the Pi's USB-C port, marked 'POWER IN'.">}}

Connect the other end to a USB port on the target computer:

TODO: Show photo

### Attach the HDMI capture dongle

The last part of the physical installation involves capturing the target computer's display output.

{{<notice type="info">}}
**Note**: If the computer you're connecting to has no HDMI output, you should be able to use a simple DVI to HDMI adaptor or Display Port to HDMI adaptor, though I haven't tested this personally. (TODO:  link to devices)
{{</notice>}}

### Install Tiny Pilot

SSH into your Pi device (default credentials for Raspberry Pi OS are `pi` / `raspberry`), and run the following commands:

```bash
curl -sS https://raw.githubusercontent.com/mtlynch/tinypilot/master/quick-install \
  | bash -
sudo reboot
```

If you're appropriately suspicious of piping a random web script into your shell, I encourage you to inspect [the source](https://github.com/mtlynch/tinypilot/blob/master/quick-install).

The script installs four services that run on every boot:

* [nginx](https://nginx.org/): a popular open source web server
* [ustreamer](https://github.com/pikvm/ustreamer): a video streaming server optimized for Raspberry Pi hardware
* [usb-gadget](https://github.com/mtlynch/tinypilot/blob/master/enable-usb-hid): enables the Pi's USB "gadget mode" which allows the Pi to impersonate USB devices
* [tinypilot](https://github.com/mtlynch/tinypilot): the web interface I created for Tiny Pilot

## Using Tiny Pilot

After you run the install script, Tiny Pilot will be available at:

* [http://raspberrypi/](http://raspberrypi/)

TODO: Demo

## Tiny Pilot kits

If you'd like to support further development of Tiny Pilot, you can buy a Tiny Pilot kit. It includes all the hardware you need to build your own, and it includes a pre-formatted microSD card so you don't need to configure anything.

TODO: Show order page

I ship from the US, and turnaround time is about two weeks.

* [tinypilotkvm.com](https://tinypilotkvm.com)

## Source code

Tiny Pilot's code is fully open source under the permissive [MIT license](https://opensource.org/licenses/MIT):

* [tinypilot](https://github.com/mtlynch/tinypilot.git): Web server that forwards keystrokes to the Pi's virtual keyboard.
* [ansible-role-tinypilot](https://github.com/mtlynch/ansible-role-tinypilot): The Ansible role for installing Tiny Pilot and its dependencies as systemd services.

---
*Thanks to Maxim Devaev for his incredible work on uStreamer.*