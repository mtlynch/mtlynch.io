---
title: "My First Impressions of Meshcore (Off-Grid Messaging)"
date: 2025-10-11
tags:
  - meshcore
---

When my wife saw me playing with my new encrypted radio, she asked what it was for.

"Imagine," I said, "if I could type a message on my phone and send it to you, and the message would appear on your phone. Instantly!"

She wasn't impressed.

"It also works if cell phone service is down due to a power outage... or societal collapse." Still nothing.

"If we're not within radio range of each other, we can route our messages through a mesh network of our neighbors' radios. But don't worry! There's end-to-end encryption, so nobody else can snoop on our conversation." She'd left the room by this point.

My wife has many wonderful qualities, but, if I'm being honest, "enthusiasm for encrypted off-grid messaging" has never been one of them

The technology I was unsuccessfully pitching my wife is called MeshCore.

## What's MeshCore?

MeshCore is software that runs on inexpensive long-range radios. LoRa radios can reach up to XX in cities and XX in rural environments. Unlike HAM radios, you don't need a license to broadcast over LoRa frequencies in the US.

The "mesh" part of it is that you can communicate with people even if you're not directly within.

I first heard about this technology from Tyler Cipriani's blog. He experimented with them three years ago using a similar technology called Meshtastic. Meshtastic is the more popular and more established technology, but all the people I follow on Mastodon seem excited about MeshCore and dismissive of Meshtastic. I'm more drawn to MeshCore if for no other reason than it's the scrappier upstart, and it's small enough that I find it less intimidating.

## Why MeshCore?

I'm not at the level of a doomsday prepper, but I do think about disaster planning more than the average person. I try to ensure my family can survive common disaster scenarios like extended power outages, food shortages, and droughts.

I had a fantasy vision of convincing neighbors throughout my town to install MeshCore solar devices so I could continue communicating with nearby friends in a scenario where cell phone and Internet communications went down.

## Heltec v3: The cheapest introduction to MeshCore

The MeshCore website lists a few different types of LoRa hardware that they support well. The cheapest was the Heltec v3, which is only $XX/unit. I decided to order two just to get a sense of how MeshCore worked.

The Heltec v3 comes in a small box with no instructions. It includes XX for plugging it into a breadboard, and wires for connecting it to a battery. I edned up throwing those away because I had no plans to do that.

I plugged it in to my computer and used the web flasher to flash MeshCore software onto it. Then, I used the MeshCore web app to pair the Heltec with my phone. I eventually got tired of accidentally closing the page in the web app, so I switched to the Android app, but it's exactly the same thing.

## Gotchas

- Must change both to same frequency.
- Must add contacts bidirectionally.

## Bugs

- Add QR code doesn't work
  - If I scan, nothing happens.
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

## What I dislike

- It's too difficult to use except by enthusiasts.
- Website pushes you to platforms that have closed-source / paid software.
