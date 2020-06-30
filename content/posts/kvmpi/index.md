---
title: "KVM Pi: Build your own KVM over IP for under $100"
date: "2020-07-10T00:00:00Z"
tags:
- raspberry pi
- python
- ansible
description: The Raspberry Pi 4 has an impressive array of functionality that allow it to capture video output and impersonate a keyboard, effectively making a virtual KVM.
images:
- kvmpi/cover.jpg
---
Recent versions of the Raspberry Pi support USB on-the-go (USB OTG), which allows them to impersonate USB devices such as keyboards, thumb drives, and microphones. To take advantage of this, I made an open-source web app that turns my Pi into a fake keyboard. I call it [KVM Pi](https://github.com/mtlynch/kvmpi.git).

This post demonstrates how KVM Pi works and how you can build one for yourself.

## Demo

TODO

## What you'll need

* [Raspberry Pi 4](https://amzn.to/3fdarLM) (all variants work)
* [Raspberry Pi OS](https://www.raspberrypi.org/downloads/raspberry-pi-os/) (aka Raspbian)
  * Stretch or later
* [USB-C to USB-A](https://www.amazon.com/AmazonBasics-Type-C-USB-Male-Cable/dp/B01GGKYN0A/) cable (Male/Male)
* [HDMI to USB capture device](https://amzn.to/2YHEvJN)
  * Strangely, these don't have a brand name, but you can recognize them by their appearance.
  * They're generally available on eBay for $11-15.
* [USB to TTL serial cable](https://amzn.to/3cVkuTT)
* [3A USB wall charger](https://amzn.to/3hal8Ax)
* microSD card (8 GB or larger)
* HDMI to HDMI cable

## Install Raspberry Pi OS Lite

To begin, install [Raspberry Pi OS lite](https://www.raspberrypi.org/downloads/raspberry-pi-os/) (formerly known as Raspbian) on a microSD card.

{{<img src="rufus-install.png" alt="Screenshot of Rufus" caption="I use [Rufus](https://rufus.ie) to write my Pi micro SD cards, but any whole disk imaging tool will work.">}}

Enable SSH access by placing a file called `ssh` on the microSD's boot partition, and insert the microSD card into your Pi device. If you're connecting over wireless, you'll also need to [create a `wpa_supplicant.conf` file](https://www.raspberrypi.org/documentation/configuration/wireless/headless.md) on the boot partition.

## Powering your Pi via GPIO

The Pi requires 3 Amps of power, but standard USB ports output less than 1 Amp. To solve this, I  purchased a [3 A USB wall charger](https://amzn.to/2YitxsN) and a [USB to TTL serial cable](https://amzn.to/2Yk1CIX). The USB to TTL cable connects to the Pi's GPIO pins, ensuring the device always receives at least 3 A of electricity.

{{< img src="extra-power.jpg" alt="Pi 4 with USB to TTL cable attached to 3A wall charger" caption="I keep the Pi sufficiently powered with a [3 A USB wall charger](https://amzn.to/2YitxsN) and a [USB to TTL cable](https://amzn.to/2Yk1CIX)." maxWidth="600px" >}}

## Connecting your Pi

Connect the USB cable to your Pi's USB OTG port. On the Pi 4, this is the USB-C port. For the Pi Zero, it's the Micro-USB port labeled "USB."

{{<img src="pi4-connection.jpg" alt="Pi 4 with USB to TTL cable attached to 3A wall charger" maxWidth="500px" caption="Connect the USB-C cable to the Pi's USB-C port, marked 'POWER IN'.">}}

## Install KVM Pi on your device

SSH into your Pi device (default credentials are `pi` / `raspberry`), and run the following commands:

```bash
curl -sS https://raw.githubusercontent.com/mtlynch/kvmpi/master/quick-install \
  | bash -
sudo reboot
```

If you're appropriately suspicious of piping a random web script into your shell, read [the source](https://github.com/mtlynch/kvmpi/blob/master/quick-install). It uses Ansible to provision

* nginx
* ustreamer (which I explain below)
* kvmpi

## Using KVM Pi

After you run the install script, KVM Pi will be available at:

* [http://raspberrypi/](http://raspberrypi/)

## How it works

### Keyboard emulation

I describe that in more detail in [my previous post](/key-mime-pi#how-it-works).

### Video capture

Video capture was the most difficult part of this. It took a while to find hardware that could capture HDMI input while also being:

1. Affordable
1. Performant
1. Hackable

#### First try: Lenkeng HDMI over IP extender

My first attempt was to use the Lenkeng HDMI extender – LKV373A. Daniel Kucera did an excellent job [reverse engineering](https://blog.danman.eu/new-version-of-lenkeng-hdmi-over-ip-extender-lkv373a/) this hardware and even [contributed a patch to ffmpeg](https://ffmpeg.org/pipermail/ffmpeg-devel/2017-May/211607.html) to allow it to capture output from this device.

The device had a few big drawbacks.

The first was that it's not designed to capture HDMI streams. Its actual purpose is to pair with a custom receiver which translates the stream back to HDMI. It just allows you to extend an HDMI cable over your network rather than with physical HDMI wires. So using it as an HDMI capture device, you're sort of fighting with the device to achieve functionality it doesn't want to provide.

As an extension of that, the device sends video in a non-standard format that confuses standard tools like ffmpeg or VLC. Daniel Kucera [contributed a patch to ffmpeg](https://ffmpeg.org/pipermail/ffmpeg-devel/2017-May/211607.html). I tried using ffmpeg

Lastly, the LKV373A outputs its data through UDP multicast. That means that every device on your network receives an HD video stream while the LKV373A is running. Kucera found a way to switch it to unicast, but it involves installing a flashing the device with mystery firmware from a shared Google Drive folder (legality TBD). I considered avoiding the unicast issue altogether by just connecting the LKV373A directly to the Pi's Ethernet port, but then that uses up the Pi's only Ethernet port.

#### HDMI to USB device

By sheer luck, I saw a tweet by [Arsenio Dev](https://twitter.com/Ascii211) talking about a low-cost HDMI to USB

https://twitter.com/Ascii211/status/1268631069051453448

. It outputs UVC, which is widely compatible. It seemed a little too good to be true. I ordered one from eBay. Unlike the LKV373A, which seem to only be available from sellers in China, plenty of US-based sellers had this device in stock. I don't even know what you call it. It has no brand name except for just "HDMI to USB capture device."

That was a big improvement over the LKV373A because it plugged right into the Pi's USB port and output video in a widely compatible format. I was able to stream it from my Pi with ffmpeg and then view it with ffplay or VLC.

It had a delay of 4 seconds, which was usable but obviously annoying. Arsenio Dev reported a latency of 20 ms, so I assumed I either hadn't yet found the magical formula of ffmpeg flags or the combination of the Pi's network and the work of a network round trip was pushing it to 4 seconds.

#### uStreamer: a super-fast video streamer

When I publised my previous blog post about getting keyboard input working, Maxim Devaev [commented](/key-mime-pi/#comment-4950940807) encouraging me to check out his project, [Pi-KVM](https://github.com/pikvm/pikvm). I had looked at it briefly earlier in my work, but it [required soldering components together](https://github.com/pikvm/pikvm#v2-diagram), which scared me off. Breadboards and I [have a difficult history](/greenpithumb/#why-make-another-raspberry-pi-gardening-bot).

## KVM Pi kits

If you'd like your own KVM Pi. I ship from the US, and turnaround time is about two weeks.

* [kvmpi.com](https://kvmpi.com)

## Source code

KVM Pi's code is fully open source under the permissive [MIT license](https://opensource.org/licenses/MIT):

* [key-mime-pi](https://github.com/mtlynch/key-mime-pi.git): Web server that forwards keystrokes to the Pi's virtual keyboard.
* [ansible-role-key-mime-pi](https://github.com/mtlynch/ansible-role-key-mime-pi): The Ansible role for configuring the Pi's USB gadget functionality and for installing the web server as a systemd service.
