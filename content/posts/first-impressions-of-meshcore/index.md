---
title: "My First Impressions of MeshCore Off-Grid Messaging"
date: 2025-10-11
tags:
  - first-impressions
  - meshcore
---

When my wife saw me playing with my new encrypted radio, she asked what it was for.

"Imagine," I said, "if I could type a message on my phone and send it to you, and the message would appear on your phone. Instantly!"

She wasn't impressed.

"It also works if phone lines are down due to a power outage... or societal collapse." Still nothing.

"If we're not within radio range of each other, we can route our messages through a mesh network of our neighbors' radios. But don't worry! There's end-to-end encryption, so nobody else can snoop on our conversation." She'd left the room by this point.

My wife has many wonderful qualities, but, if I'm being honest, "enthusiasm for encrypted off-grid messaging" has never been one of them

The technology I was pitching so unsuccessfully to my wife was, of course, MeshCore.

## What's MeshCore?

MeshCore is software that runs on inexpensive [long-range (LoRA) radios](https://en.wikipedia.org/wiki/LoRa). LoRa radios can transmit up to XX miles in cities and XX miles in rural environments. Unlike HAM radios, you don't need a license to broadcast over LoRa frequencies in the US, so anyone can pick up a LoRA radio and start communicating.

One neat feature of MeshCore is that you can communicate with other MeshCore users even if you're not directly within line of sight of each other. If other MeshCore users are nearby, they form a mesh network, so I can send my message to an intermediary, and they'll forward it on to my intended recipient. Sort of like how routing on the Internet works.

## Why off-grid messaging?

I'm not exactly a doomsday prepper, but I try to plan for realistic disaster scenarios like extended power outages, food shortages, and droughts.

When I heard about MeshCore, I thought it would be neat to give some devices to my local friends so we could communicate in an emergency. And if it turned out that we're out of radio range of each other, maybe I could convince some of my neighbors to get involved as well, and we could form a mini messaging network that works even if power and phone lines are down.

## Why not Meshtastic?

MeshCore is a newer implementation of an idea that was popularized by a technology called Meshtastic. I don't know anything about Meshtastic, but some of the people I follow on Mastodon felt like

I first heard about Meshtastic from Tyler Cipriani's blog. He wrote a post in 2022 about a similar technology. I thought the idea sounded neat, but Tyler's conclusion was that Meshtastic was too buggy and difficult for mainstream adoption.

Some people I follow on Mastodon have been excited about MeshCore, so I thought I'd check it out, but I have no particular allegiance to MeshCore over Meshtastic at this point. Fortunately, most MeshCore-compatible devices are also compatible with Meshtastic, so I can easily experiment with Meshtastic in the future.

I only have a limited understanding of the differences between Meshtastic and MeshCore, but my understanding is that MeshCore is focused on preserving bandwidth. Apparently, Meshtastic can hit scaling issues when many users are located close to each other. The Meshtastic protocol is chattier than MeshCore, so I've seen complaints that Meshtastic chatter can flood the airwaves and interfere with message delivery.

## I'm not a radio guy

I should say at this point that I'm not a radio guy. It seems like many people in the LoRa community are radio enthusiasts who have experience with HAM radios or other types of radio broadcasting.

I'm a tech-savvy software developer, but I know almost nothing about radio communication. If you're appalled that terms like "spreading factor" are meaningless to me, that's why.

## Heltec v3: The cheapest introduction to MeshCore

The MeshCore firmware can run on a couple dozen devices, but the official website lists three devices that they recommend. The cheapest one is the Heltec v3. I bought two for $27/ea from a company called Rokland.

The Heltec v3 comes in a small box with no instructions. It includes XX for plugging it into a breadboard, and wires for connecting it to a battery. I edned up throwing those away because I had no plans to do that.

I plugged the Heltec v3 in to my computer and used the web flasher to flash MeshCore software onto it. Then, I used the MeshCore web app to pair the Heltec with my phone.

## Fumbling around the MeshCore web app

I found the MeshCore web app particularly confusing and unhelpful. Generally, a user interface has some element that stands out to let you know it's where you should explore. MeshCore's web app is just flat, and there are lots of settings and no indication of what you're supposed to do to get started.

I tried the Map tab, and it showed me a picture of New Zealand. I remembered that different countries use different radio frequencies for LoRa, and seeing New Zealand hinted me that my device was probably defaulting to New Zealand settings, as that's the home of Liam Cottle, the developer of the MeshCore client app.

So, I went to settings and saw confusing settings and wasn't sure what to pick. And then I noticed a "Choose Preset" button, which listed presets for different countries, so I chose "USA/Canada (Recommended)."

Still, no other MeshCore users.

It seemed like there were no other MeshCore users within range of me, which was what I expected. That's why I bought the second Heltec.

I repeated the process with an old phone and my second Heltec v3, but they couldn't see each other. I eventually realized that I'd forgotten to configure my second device for the US frequency.

Okay, they can finally see each other! They can both publish messages to the public channel.

## Talking to myself over MeshCore

But the point is that they're supposed to be encrypted, so let's try direct messaging. I was expecting some way to view a contact in the public channel and send them a direct message, but I can't.

I eventually figured out that I have to "Advert." There are three options: "Zero Hop," "Flood Routed," and "To Clipboard." I don't know what any of these mean, but I figure "flood" sounds kind of rude, whereas "Zero Hop" sounds elegant, so I do a "Zero Hop."

Great! Device 2 can now see device 1. Let's say hi to Device 1 from.

Oh...

This seems like an odd design choice. If device 1 broadcasted its identifier, why can't I talk to it?

This is also a frustrating user experience. You knew I couldn't send the message before I started typing, but you let me do it anyway. And then you threw away my message...

## Flashing custom firmware

This part was easy

```bash
LATEST_COMPANION_RELEASE='1.9.0'
git checkout "companion-${LATEST_COMPANION_RELEASE}"
```

Nix config, so you can flash with:

```bash
pio run \
  --environment Heltec_v3_companion_radio_ble \
  --target upload \
  --upload-port /dev/ttyUSB0
```

### USB

```bash
pio run \
  --environment Heltec_v3_companion_radio_usb \
  --target upload \
  --upload-port /dev/ttyUSB0
```

## Exploring the source code

I was a bit disappointed in the source code. There were no automated tests for the codebase, so I decided to try writing a simple unit test.

The code doesn't have consistent format despite a `.clang-format` configuration. The developers closed the issue as, "Everyone should just turn off auto-formatting in their editor." But why? Why in 2025 do I have to think about where to place my curly braces to match the style of this particular file? Just configure a linter and call it a day.

## Ordering more MeshCore devices

The Heltec v3 boards were a good way to experiment with MeshCore, but they felt impractical. If I wanted to try a realistic test, I'd have to either wire up a battery to the board or carry around my giant USB-C power brick. I hoped I could just power it with my phone with a USB-C to USB-C cable, but the Heltec board wouldn't power up from my phone.

So, I just ordered the other two devices that MeshCore recommends on their website.

## Testing the SenseCAP T-1000e

I liked the SenseCAP a lot. It's nice and light. It's the kind of thing you could toss into a backpack and not notice is there.

The downside is that it uses a custom charging cable, so I can't just plug in an off-the-shelf USB cable.

But I like that it's self-contained and has its own battery and antenna, which reduces a lot of complexity relative to the Heltec v3.

https://wiki.seeedstudio.com/sensecap_t1000_e/

```bash
pio run \
  --environment t1000e_companion_radio_ble \
  --target upload \
  --upload-port /dev/ttyACM0
```

## Testing the LilyGo T-Deck

I was particularly excited about the LilyGo T-Deck because it looked like a 2000s era Blackberry. What a world! Cutting edge technology of 2005 is now available for $80 and friendly to custom software!

I got it, and my berry was burst. It was not a Blackberry at all.

It's big and clunky. There's an unlabeled button on the left side, and an unlabled toggle on the right side. I powered it up and it loaded up Meshtastic, as the device was pre-loaded with Meshtastic.

I had a hard time even finding instructions for how to reflash it. I found this long Jeff Geerling video where he expresses frustration with how long it took him to reflash his, and then he never explains how he did it!

### Putting the LilyGo T-Deck Plus into DFU mode for flashing

This is what worked for me:

1. Disconnect the T-Deck
1. Power off the T-Deck
1. Connect the T-Deck to your computer via the USB-C port
1. Hold down the thumbwheel in the center
1. Power on the device

Confusingly, there's no indication that the device is in DFU mode. I guess the fact that the screen doesn't load is sort of an indication. On my system, I also see `dmesg` logs indicating a connection.

From there, I flashed the MeshCore firmware with this command:

```bash
pio run \
  --environment LilyGo_TDeck_companion_radio_usb \
  --target upload \
  --upload-port /dev/ttyACM0
```

## The firmware doesn't do anything?

## Using the Ripple firmware

## Wait, this isn't open-source?

I'd seen that they fund development by selling a premium version of the T-Deck software with higher resolution maps. That seemed fine and a reasonable way to fund the project. I like open-core and that's how my previous business worked as well.

But I realized it's actually not open-core because none of the MeshCore T-Deck firmware is open-source. The firmware that I installed by mistake is the "core" firmware, but it doesn't have any client features that support messaging. The actual working firmware for the T-Deck is a whole other piece of software called Ripple, which is closed-source software on top of MeshCore.

I wondered about the license for the web app I was using, and I realized that's closed-source as well. It's a Flutter app, so the web, Android, and iOS apps all share the same closed-source codebase.

So, nobody tricked me. I went back to the MeshCore website and realized that they never advertise the product as open-source. It was my mistaken assumption, but it was disappointing.

| Product                     | Open-source? | Free to use?                         |
| --------------------------- | ------------ | ------------------------------------ |
| Core community firmware     | Yes          | Yes                                  |
| Web-based firmware flasher  | Yes          | Yes                                  |
| Official Android / iOS apps | No           | Yes                                  |
| Official web app            | No           | Yes                                  |
| T-Deck firmware             | No           | Yes, but some features are paywalled |

## T-Deck USB

Confusing buttons. No on / off label?

Got stuck in Programming Mode (Meshtastic). To get out, had to select the bluetooth icon and hold the trackpad.

Seems to be the wrong thing because can't change frequency.

Sometimes had to hold down trackpad and hit reset. Sometimes had to hold trackpad and turn on power.

## CLI

```bash
nix run github:meshcore-dev/meshcore-cli#meshcore-cli -- \
  -s /dev/ttyUSB0 \
  infos
```

```bash
nix run github:meshcore-dev/meshcore-cli#meshcore-cli -- \
  -s /dev/ttyUSB0 \
  chat
```

Confusing because it looks like it's a table but it's actually a list.

## Range testing

First test, I tested it while walking away from my house with the SenseCAP and the Heltec v3 listening at home. It stopped transmitting after two blocks, which was way less than I expected.

I read online that the Heltecs have a particularl weak modem, so I tried again with the SenseCAP at home and the T-Deck with me.

## Summary

For it to be viable for me, I want something like the T-Deck where it's an all-in-one device where I can . If I'm relying on these in an emergency, I don't want to worry about keeping both my phone and radio powered and connected over Bluetooth.

### What I like about MeshCore

- The firmware repository is built around Nix, which made it easy to build and flash onto my devices from source.

### What I dislike about MeshCore

- All of the official MeshCore clients are closed source and proprietary.
- It's too difficult to use except by enthusiasts.
- Website pushes you to platforms that have closed-source / paid software.
