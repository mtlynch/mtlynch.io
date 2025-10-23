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

## Gotchas

- Must add contacts bidirectionally.

## Bugs

- Lots of times where I'm not actually allowed to do something, but I don't find out until I try, but it could have known in advance.

Nix config, so you can flash with:

```bash
pio run \
  --environment Heltec_v3_companion_radio_ble \
  --target upload \
  --upload-port /dev/ttyUSB0
```

## USB

```bash
pio run \
  --environment Heltec_v3_companion_radio_usb \
  --target upload \
  --upload-port /dev/ttyUSB0
```

## SEEED t1000e_companion_radio_ble

https://wiki.seeedstudio.com/sensecap_t1000_e/

```bash
pio run \
  --environment t1000e_companion_radio_ble \
  --target upload \
  --upload-port /dev/ttyACM0
```

## T-Deck USB

Confusing buttons. No on / off label?

Got stuck in Programming Mode (Meshtastic). To get out, had to select the bluetooth icon and hold the trackpad.

```bash
pio run \
  --environment LilyGo_TDeck_companion_radio_usb \
  --target upload \
  --upload-port /dev/ttyACM0
```

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

## What's open-source

| Product                    | Open-source? | Free to use?                         |
| -------------------------- | ------------ | ------------------------------------ |
| Core community firmware    | Yes          | Yes                                  |
| Web-based firmware flasher | Yes          | Yes                                  |
| Official mobile app        | No           | Yes                                  |
| Official web app           | No           | Yes                                  |
| T-Deck firmware            | No           | Yes, but some features are paywalled |

## What I like

- The firmware repository is built around Nix, which made it easy to build and flash onto my devices from source.

## What I dislike

- All of the official MeshCore clients are closed source and proprietary.
-
- It's too difficult to use except by enthusiasts.
- Website pushes you to platforms that have closed-source / paid software.
