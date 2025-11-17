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

TODO: Show photo of T-1000 + phone

"It also works if phone lines are down due to a power outage... or societal collapse." Still nothing.

"If we're not within radio range of each other, we can route our messages through a mesh network of our neighbors' radios. But don't worry! There's end-to-end encryption, so nobody else can snoop on our conversation." She'd left the room by this point.

My wife has many wonderful qualities, but, if I'm being honest, "enthusiasm for encrypted off-grid messaging" has never been one of them

The technology I was pitching so unsuccessfully to my wife was, of course, MeshCore.

## What's MeshCore?

MeshCore is software that runs on inexpensive [long-range (LoRA) radios](https://en.wikipedia.org/wiki/LoRa). LoRa radios can transmit up to XX miles in cities and XX miles in rural environments. Unlike HAM radios, you don't need a license to broadcast over LoRa frequencies in the US, so anyone can pick up a LoRA radio and start chatting.

MeshCore is more than just sending messages over radio. The "mesh" in the name is because MeshCore users form a mesh network. If I want to send a message to my friend Charlie, but he's out of range of my radio, I can route my message through other MeshCore users in my neighborhood, and they'll forward my message on to Bob. It's a simpler form of how routing on the Internet works without centralized control.

## Why off-grid messaging?

I'm not exactly a doomsday prepper, but I try to plan for realistic disaster scenarios like extended power outages, food shortages, and droughts.

When I heard about MeshCore, I thought it would be neat to give some devices to my local friends so we could communicate in an emergency. And if it turned out that we're out of radio range of each other, maybe I could convince some of my neighbors to get involved as well, and we could form a mini messaging network that works even if power and phone lines are down.

## Why not Meshtastic?

MeshCore is a newer implementation of an idea that was popularized by a technology called Meshtastic.

I first heard about Meshtastic from Tyler Cipriani's blog. He wrote about his experience with Meshtastic in 2022. I thought the idea sounded neat, but Tyler's conclusion was that Meshtastic was too buggy and difficult for mainstream adoption.

Some people I follow on Mastodon have been excited about MeshCore, so I thought I'd check it out, but I have no particular allegiance to MeshCore over Meshtastic at this point. Most MeshCore-compatible devices are also compatible with Meshtastic, so I can easily experiment with Meshtastic in the future.

I only have a limited understanding of the differences between Meshtastic and MeshCore, but what I gather is that MeshCore's key differentiator is preserving bandwidth. Apparently, Meshtastic can hit scaling issues when many users are located close to each other. The Meshtastic protocol is chattier than MeshCore, so I've seen complaints that Meshtastic chatter can flood the airwaves and interfere with message delivery. MeshCore attempts to solve that problem by minimizing network chatter.

## I'm not a radio guy

I should say at this point that I'm not a radio guy.

It seems like many people in the LoRa community are radio enthusiasts who have experience with HAM radios or other types of radio broadcasting.

I'm a tech-savvy software developer, but I know almost nothing about radio communication. If you're appalled that terms like "spreading factor" and "coding rate" are meaningless to me, that's why.

## Heltec v3: The cheapest introduction to MeshCore

The MeshCore firmware can run on a couple dozen devices, but the official website lists three devices that they recommend. The cheapest one is the Heltec v3. I bought two for $27/ea from a company called Rokland.

The Heltec v3 comes in a small box with no instructions. It includes XX for plugging it into a breadboard, and wires for connecting it to a battery. I don't have a breadboard or a compatible battery, so I had no use for them.

I plugged the Heltec v3 in to my computer and used the [web flasher](https://flasher.meshcore.co.uk/) to flash MeshCore software onto it. I selected "Heltec v3" as my device, "Companion Bluetooth" as the mode, and "v1.9.0" as the version. I clicked "Erase device" since this was a fresh install.

{{<img src="heltec-web-flasher.webp" max-width="500px" has-border="false">}}

Then, I used the MeshCore web app to pair the Heltec with my phone.

{{<gallery>}}

{{<img src="connect.webp" max-width="250px" has-border="true">}}

{{<img src="wants-to-pair.webp" max-width="250px" has-border="true">}}

{{<img src="pin.webp" max-width="304px"  has-border="true">}}

{{</gallery>}}

## Fumbling around the MeshCore web app

Okay, I've paired my phone with my MeshCore device, but... now what?

{{<img src="paired.webp" max-width="304px"  has-border="true">}}

The app doesn't help you out much in terms of onboarding.

Let's try the Map to see if there are any other MeshCore users nearby.

{{<img src="map-nz.webp" max-width="304px" has-border="true">}}

Okay, that's just a map of New Zealand. I live in the US, so that's a bit surprising. Even if I explore the map, I don't see any MeshCore activity, just a map.

But seeing New Zealand reminded me that different countries use different radio frequencies for LoRa, and if the app defaults to a location in New Zealand, it's probably defaulting to New Zealand broadcast frequencies as well, so I should fix that.

So, I went to settings and saw fields for "Radio Settings" and I clicked them expecting a dropdown, but it's just a field for putting in arbitrary numbers. And then I noticed a subtle "Choose Preset" button, which listed presets for different countries that were "suggested by the community." I had no idea what any of them meant, but who am I to argue with the community? I chose "USA/Canada (Recommended)."

{{<gallery>}}

{{<img src="settings1.webp" max-width="300px" has-border="true">}}

{{<img src="settings2.webp" max-width="300px" has-border="true">}}

{{</gallery>}}

I also noticed that the settings let me change my device name, so that seemed useful:

{{<img src="device-name.webp" max-width="300px" has-border="true">}}

It seemed like there were no other MeshCore users within range of me, which I expected. That's why I bought the second Heltec.

{{<img src="no-contacts.webp" max-width="300px" has-border="true">}}

I repeated the process with an old phone and my second Heltec v3, but they couldn't see each other. I eventually realized that I'd forgotten to configure my second device for the US frequency.

Okay, they can finally see each other! They can both publish messages to the public channel.

## Figuring out direct messaging

If I communicate with friends over MeshCore, I don't want to broadcast our whole conversation over the public channel, so it was time to test out direct messaging.

I was expecting some way to view a contact in the public channel and send them a direct message, but I can't. Clicking their name does nothing. There's a "Participants" view, but the only option is to block, not send a direct message.

{{<img src="participants-view.webp" max-width="300px" has-border="true">}}

This seems like an odd design choice. If device 1 broadcasted its identifier, why can't I talk to it?

I eventually figured out that I have to "Advert." There are three options: "Zero Hop," "Flood Routed," and "To Clipboard." I don't know what any of these mean, but I figure "flood" sounds kind of rude, whereas "Zero Hop" sounds elegant, so I do a "Zero Hop."

{{<gallery>}}

{{<img src="advert-options.webp" max-width="300px" has-border="true">}}
{{<img src="advert-sent.webp" max-width="300px" has-border="true">}}

{{</gallery>}}

Great! Device 2 can now see device 1. Let's say hi to Device 1 from Device 2.

{{<img src="dm-failed.webp" max-width="300px" has-border="true">}}

Whoops, what's wrong? Maybe I need to "Advert" from Device 2 as well?

Okay, I do, and voila! Messages now work.

{{<img src="dm-succeeded.webp" max-width="300px" has-border="true">}}

This is a frustrating user experience. If I have to advert from both ends, why did MeshCore let me send a message on a half-completed handshake?

I'm assuming "Advert" is me announcing my device's public key, but I don't understand why that's an explicit step I have to do ahead of time. Why can't it just happen implicitly when I post to a public channel or attempt to send someone a direct message?

Anyway, I can talk to myself in both public channels and DMs.

## Ordering more MeshCore devices

The Heltec v3 boards were a good way to experiment with MeshCore, but they felt impractical for anything real.The Heltec boards require their own power source and a phone to pair. I hoped I could just power it with my phone with a USB-C to USB-C cable, but the Heltec board wouldn't power up from my phone. In a real emergency, that's too many points of failure.

The MeshCore website recommends two other MeshCore-compatible devices, so I ordered those and got them a few days later: the Seeed SenseCAP T-1000e ($XX) and the Lilygo T-Deck+ ($XX).

{{<img src="t1000-and-lilygo.webp" max-width="600px" caption="I bought the Seeed SenseCAP T-1000e (left) and the Lilygo T-Deck+ (right) to continue experimenting with MeshCore.">}}

## Testing the SenseCAP T-1000e

I liked the SenseCAP a lot. It's nice and light. It's the kind of thing you could toss into a backpack and not notice is there.

The T-1000e is self-contained and has its own battery and antenna, which reduces a lot of complexity relative to the Heltec v3, which is just a bare circuit board that requires external power.

One drawback is that it uses a custom USB cable, so I can't just plug in an off-the-shelf cable.

I'm also not sure what secures the device. There's no screen, so it can't generate a random passcode to authenticate pairing. Does that mean anyone within Bluetooth range can just take over my T-1000e and read all my messages?

{{<img src="t1000-cable.webp" max-width="400px" caption="The Seeed T-10000e uses a custom USB cable for charging and flashing.">}}

I also don't know how to turn it off. There are [some instructions](https://wiki.seeedstudio.com/sensecap_t1000_e/) on the Seeed website, and the way they explain turning it off is to just leave it unplugged for a few days until the battery runs out, so I guess there's no "off" switch, which is somewhen undesirable in a broadcasting device.

```bash
pio run \
  --environment t1000e_companion_radio_ble \
  --target upload \
  --upload-port /dev/ttyACM0
```

## Testing the LilyGo T-Deck

Now it was time to test the LilyGo T-Deck+.

I'll be honest, this was the part I was most looking forward to of this whole experience. It looked like a 2000s era Blackberry. I thought I'd be able to pre-configure these, hand them out to nearby friends to throw into a closet, and then if a disaster ever struck, we'd be able to chat together on our hacker doomsday Blackberries.

I was particularly excited about the LilyGo T-Deck because it looked like a 2000s era Blackberry. What a world! Cutting edge technology of 2005 is now available for $80 and friendly to custom software!

I got it, and my berry was burst. It was not a Blackberry at all.

It's big and clunky. There's an unlabeled button on the left side, and an unlabled toggle on the right side. I powered it up and it loaded up Meshtastic, as the device was pre-loaded with Meshtastic.

That's not to say that LilyGo is opposed to labels. There's a big ugly label on top that looks like my IT department printed it out an provisioned to me.

I had a hard time even finding instructions for how to reflash it. I found this [long Jeff Geerling video](https://www.youtube.com/watch?v=2Ry-ck0fhfw) where he expresses frustration with how long it took him to reflash his, and then he never explains how he did it!

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

Confusing buttons. No on / off label?

Got stuck in Programming Mode (Meshtastic). To get out, had to select the bluetooth icon and hold the trackpad.

Seems to be the wrong thing because can't change frequency.

Sometimes had to hold down trackpad and hit reset. Sometimes had to hold trackpad and turn on power.

## Using the Ripple firmware

## Wait, MeshCore isn't open-source?

I'd seen that they fund development by selling a premium version of the T-Deck software with higher resolution maps. That seemed fine and a reasonable way to fund the project. I like open-core and that's how my previous business worked as well.

But I realized it's actually not open-core because none of the MeshCore T-Deck firmware is open-source. The firmware that I installed by mistake is the "core" firmware, but it doesn't have any client features that support messaging. The actual working firmware for the T-Deck is a whole other piece of software called Ripple, which is closed-source software on top of MeshCore.

I wondered about the license for the web app I was using, and I realized that's closed-source as well. It's a Flutter app, so the web, Android, and iOS apps all share the same closed-source codebase.

In fairness, the mistake was mine. I went back to the MeshCore website and realized that they never advertise the product as open-source. It just felt so much like an open-source project that I assumed, but I was terribly disappointed to discover that every MeshCore client app is closed-source and proprietary.

| Product                              | Open-source? | Free to use?                         |
| ------------------------------------ | ------------ | ------------------------------------ |
| Core MeshCore firmware               | Yes          | Yes                                  |
| Web-based MeshCore firmware flasher  | Yes          | Yes                                  |
| Official Android / iOS MeshCore apps | No           | Yes                                  |
| Official MeshCore web app            | No           | Yes                                  |
| T-Deck MeshCore firmware             | No           | Yes, but some features are paywalled |

## Range testing

First test, I tested it while walking away from my house with the SenseCAP and the Heltec v3 listening at home. It stopped transmitting after two blocks, which was way less than I expected.

I read online that the Heltecs have a particularl weak modem, so I tried again with the SenseCAP at home and the T-Deck with me. After about five blocks, I could no longer send messages back to the SenseCAP.

From exploring more, it seems like what I actually might need is a MeshCore repeater. If I want to communicate with friends more than a few blocks away, I might have to get a beefy device with a big antenna, though I couldn't find documentation on how far I should expect the range of my devices to work.

## Browsing MeshCore's source code

I was a bit disappointed in the source code. There were no automated tests for the codebase, so I [offered a simple unit test](https://github.com/meshcore-dev/MeshCore/pull/925), but nobody from the MeshCore team has replied to it yet.

The code doesn't have consistent format despite a `.clang-format` configuration. The developers closed the issue as, "Everyone should just turn off auto-formatting in their editor." But why? Why in 2025 do I have to think about where to place my curly braces to match the style of this particular file? Just configure a linter and call it a day.

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

## Summary

For it to be viable for me, I want something like the T-Deck where it's an all-in-one device where I can . If I'm relying on these in an emergency, I don't want to worry about keeping both my phone and radio powered and connected over Bluetooth. There are just too many failure points. And especially if I'm giving devices to less tech-savvy friends to use in an emergency where they can't ask me for help, I want it to be dead simple. It's fine if I have to preconfigure it for them, but I don't want them to pull it out in an emergency and realize they uninstalled the companion app from their phone and are now stuck.

### What I like about MeshCore

- The firmware repository is built around Nix, which made it easy to build and flash onto my devices from source.

### What I dislike about MeshCore

- All of the official MeshCore clients are closed source and proprietary.
- It's too difficult to use except by enthusiasts.
- Website pushes you to platforms that have closed-source / paid software.
