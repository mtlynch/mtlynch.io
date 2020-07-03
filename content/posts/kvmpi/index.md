---
title: "KVM Pi: Build your own KVM over IP for under $100"
date: "2020-07-10T00:00:00Z"
tags:
- raspberry pi
- python
- ansible
- homelab
description: The Raspberry Pi 4 has an impressive array of functionality that allow it to capture video output and impersonate a keyboard, effectively making a virtual KVM.
images:
- kvmpi/cover.jpg
---

## Don't tell me your life story; just tell me how to build a KVM over IP

If you want to skip over the backstory, skip to [Build your own KVM Pi](#build-your-own-kvm-pi).

## Headless servers are great until they're not

A few years ago, I built my own home server for hosting my virtual machines. It's been a great investment, and I use it every day.

The problem is that from my desk, it's all the way over there. When everything works, it works great. There's no keyboard or monitor attached, because I can access the server over ssh or through its web interface. The problem is that when something goes wrong, it's a huge pain. Every few months, I'll screw something up that prevents the server from booting or joining the network. When that happens, I'm effectively locked out of the machine, so I have to disconnect everything, drag the server over to my desk, and juggle cables around to disconnect my desktop and hook up the keyboard and monitor to my server.

I'd always told myself that I'd correct this mistake by building my next server with a remote administration in mind. I knew Dell servers have iDRAC and HP servers have iLO, both of which are basically chips that let you get a virtual keyboard and monitor on the device as long as there's a network cable plugged in. Even if the OS itself won't boot. But when I actually looked into it, those chips are super expensive and require $XX license from the manufacturer. I looked into 

Recent versions of the Raspberry Pi support USB on-the-go (USB OTG), which allows them to impersonate USB devices such as keyboards, thumb drives, and microphones. To take advantage of this, I made an open-source web app that turns my Pi into a fake keyboard. I call it [KVM Pi](https://github.com/mtlynch/kvmpi.git).

This post demonstrates how KVM Pi works and how you can build one for yourself.

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

My first attempt was to use the Lenkeng HDMI extender – LKV373A. Daniel Kucera did an excellent job [reverse engineering](https://blog.danman.eu/new-version-of-lenkeng-hdmi-over-ip-extender-lkv373a/) this hardware and even [contributed a patch to ffmpeg](https://ffmpeg.org/pipermail/ffmpeg-devel/2017-May/211607.html) to allow it to capture output from this device.

The device had a few big drawbacks.

The first issue was that the LKV373A's actual purpose is to act as sort of an HDMI extension cord over your network. It pairs with a custom receiver which translates the stream back to HDMI. Kucera found ways to intercept the video stream, but bending the device to perform against its intended purpose adds complexity to every stage of the process.

The other big drawback was that the LKV373A outputs its data through UDP multicast. That means that every device on your network receives an HD video stream while the LKV373A is running. Kucera found a way to switch it to unicast, but it involves flashing the device with mystery firmware from a shared Google Drive folder (legality TBD). I considered avoiding the unicast issue altogether by just connecting the LKV373A directly to the Pi's Ethernet port, but then that uses up the Pi's only Ethernet port.

#### HDMI to USB device

By sheer luck, I happened to see a tweet by [Arsenio Dev](https://twitter.com/Ascii211) talking about a low-cost HDMI to USB

https://twitter.com/Ascii211/status/1268631069051453448

It seemed a little too good to be true, but I ordered one from eBay for only $11, including shipping. Unlike the LKV373A, which are available almost exclusively from sellers in China, plenty of US-based sellers had this device in stock. I don't even know what you call it. It has no brand name, so I'll just call it "the HDMI dongle."

I received the device a few days later and was blown away. It was better for my needs than the LKV373A in every way. Within minutes of connecting it to my Pi, I was able to successfully stream the video output using ffmpeg. Unlike the LKV373A, which was almost double the size of the Pi and required its own power source and Ethernet cable, the HDMI dongle was conveniently small and required nothing more than a USB port.

Surprisingly, this dongle can even capture video protected with HDCP. When I connected the LKV373A to my Roku Premiere, it captured a blank stream, but the HDMI dongle captured it without issue:

{{<img src="roku-capture.jpg" alt="KVM Pi capturing Roku output" maxWidth="600px" caption="The HDMI dongle can capture a video stream from a Roku Premiere, even though Roku encrypts its output stream with HDCP.">}}

The only problem was latency. Using ffmpeg to stream, there was a delay of four to five seconds on the video. I wasn't sure if this delay was coming from the device itself, from ffmpeg, or from ffplay, the video player I was using to receive the stream. Arsenio Dev reported a latency of 20 ms, so I suspected that if I found the magic formula of ffmpeg's arcane flags, I could substantially reduce the latency.

Fortunately, I was blessed with another stroke of luck that saved me tons of work.

#### uStreamer: a super-fast video streamer

When I publised my previous blog post about getting keyboard input working, Maxim Devaev [commented](/key-mime-pi/#comment-4950940807) encouraging me to check out his project, [Pi-KVM](https://github.com/pikvm/pikvm). I had looked at it briefly earlier in my work, but it [required soldering components together](https://github.com/pikvm/pikvm#v2-diagram), which scared me off. I have a [difficult history with breadboards](/greenpithumb/#why-make-another-raspberry-pi-gardening-bot).

At Maxim's suggestion, I gave Pi-KVM a second look, particularly interested in how he solved the video latency issue. I noticed that he captured video through a tool called [uStreamer](https://github.com/pikvm/ustreamer). I'd never heard of it, but it seemed simple enough to compile from source, so I did.

Do you ever have that feeling where you find a solution to a problem that you didn't even realize you had. uStreamer was awesome. 

One of the chores I was dreading with ffmpeg was figuring out how to translate the video stream into something that a standard web browser could consume. The best solution I had found was using ffmpeg to stream XXX to Nginx using the XXX plugin. I'd tinkered with it, but it added lots of complexity and was going to make the latency problem even harder. uStreamer streamed directly to HTTP. It spins up its own web server and gives you an HTTP endpoint that modern browsers can stream natively. It even has a JSON endpoint so you can retrieve metadata about the stream in real time.

I assumed it was a fork, but it's not. This maniac wrote his own video encoder in C just to squeeze the maximum performance he could out of the Pi's hardware. I quickly donated to Maxim, and I invite anyone who tries his software to do the same.

#### What the heck is Motion JPEG?

I mentioned that uStreamer output to a regular URL endpoint. I embedded it in KVM Pi using an `<iframe>`. That worked, so I assumed I solved the problem. Then, I noticed that my browser never stopped loading. Checking the network tab, it seemed to think that the uStreamer stream was just a never-ending download. That was still usable, but I wanted it to display the same way it would display any normal streaming video.

I tried dropping the `<iframe>` and loading the URL in a `<video>` tag. No luck.

From reading uStreamer's documentation, it said that it was streaming video in a format called Motion JPEG (MJPEG), which I'd never heard of before. I Googled how to embed MJPEG in a website. To my surprise, in all the discussions, people were talking about loading MJPEG streams in `<img>` tags. What? Images are for still images. Okay, maybe animated GIFs, but not streaming video.

But sure enough, I tried putting the URL in an `<img>` tag, and it worked perfectly. The infinite reload issue went away. It had the exact behavior I wanted where the user didn't have to hit "play" to start the stream. It was just streaming as soon as the page loaded.

## Using KVM Pi

It's not something I use every day.


## Build your own KVM Pi

### Parts list

* [Raspberry Pi 4](https://amzn.to/3fdarLM) (all variants work)
* [USB-C to USB-A](https://www.amazon.com/AmazonBasics-Type-C-USB-Male-Cable/dp/B01GGKYN0A/) cable (Male/Male)
* [HDMI to USB capture device](https://amzn.to/2YHEvJN)
  * Strangely, these don't have a brand name, but you can recognize them by their appearance.
  * They're generally available on eBay for $11-15.
* [USB to TTL serial cable](https://amzn.to/3cVkuTT)
* [3A USB wall charger](https://amzn.to/3hal8Ax)
* [microSD card](https://amzn.to/2VH0RcL) (Class 10, 8 GB or larger)
* [HDMI to HDMI cable](https://amzn.to/3gnlZwj)
  * Or \[other\] to HDMI, depending on how your target machine displays output.

## Install Raspberry Pi OS Lite

To begin, install [Raspberry Pi OS lite](https://www.raspberrypi.org/downloads/raspberry-pi-os/) (formerly known as Raspbian) on a microSD card.

{{<img src="rufus-install.png" alt="Screenshot of Rufus" caption="I use [Rufus](https://rufus.ie) to write my Pi micro SD cards, but any whole disk imaging tool will work.">}}

Enable SSH access by placing a file called `ssh` on the microSD's boot partition, and insert the microSD card into your Pi device. If you're connecting over wireless, you'll also need to [create a `wpa_supplicant.conf` file](https://www.raspberrypi.org/documentation/configuration/wireless/headless.md) on the boot partition.

## Power your Pi via GPIO

The Pi requires 3 Amps of power, but standard USB ports output less than 1 Amp. To solve this, I  purchased a [3 A USB wall charger](https://amzn.to/2YitxsN) and a [USB to TTL serial cable](https://amzn.to/2Yk1CIX). The USB to TTL cable connects to the Pi's GPIO pins, ensuring the device always receives at least 3 A of electricity.

{{< img src="extra-power.jpg" alt="Pi 4 with USB to TTL cable attached to 3A wall charger" caption="I keep the Pi sufficiently powered with a [3 A USB wall charger](https://amzn.to/2YitxsN) and a [USB to TTL cable](https://amzn.to/2Yk1CIX)." maxWidth="600px" >}}

## Connect your Pi to the target server

Connect the USB cable to your Pi's USB OTG port. On the Pi 4, this is the USB-C port. For the Pi Zero, it's the Micro-USB port labeled "USB."

{{<img src="pi4-connection.jpg" alt="Pi 4 with USB to TTL cable attached to 3A wall charger" maxWidth="500px" caption="Connect the USB-C cable to the Pi's USB-C port, marked 'POWER IN'.">}}

TODO: Show connect

## Install KVM Pi on your device

SSH into your Pi device (default credentials are `pi` / `raspberry`), and run the following commands:

```bash
curl -sS https://raw.githubusercontent.com/mtlynch/kvmpi/master/quick-install \
  | bash -
sudo reboot
```

If you're appropriately suspicious of piping a random web script into your shell, I encourage you to inspect [the source](https://github.com/mtlynch/kvmpi/blob/master/quick-install). It uses Ansible to provision the device with three services:

* Nginx: a popular open source web server
* [ustreamer](https://github.com/pikvm/ustreamer): a video streaming server optimized for Raspberry Pi's hardware.
* [kvmpi](https://github.com/mtlynch/kvmpi): A web interface I created for KVM Pi.

The installation script also configures Pi to emulate a USB keyboard. TODO: link.

## Using KVM Pi

After you run the install script, KVM Pi will be available at:

* [http://raspberrypi/](http://raspberrypi/)

## KVM Pi kits

If you'd like your own KVM Pi. I ship from the US, and turnaround time is about two weeks.

* [kvmpi.com](https://kvmpi.com)

## Source code

KVM Pi's code is fully open source under the permissive [MIT license](https://opensource.org/licenses/MIT):

* [key-mime-pi](https://github.com/mtlynch/key-mime-pi.git): Web server that forwards keystrokes to the Pi's virtual keyboard.
* [ansible-role-key-mime-pi](https://github.com/mtlynch/ansible-role-key-mime-pi): The Ansible role for configuring the Pi's USB gadget functionality and for installing the web server as a systemd service.
