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

{{<img src="off-grid-messaging.webp" max-width="700px">}}

"If we're not within radio range of each other, we can route our messages through a mesh network of our neighbors' radios. But don't worry! There's end-to-end encryption, so nobody else can snoop on our conversation." By this point, she'd left the room.

My wife has many wonderful qualities, but, if I'm being honest, "enthusiasm for encrypted off-grid messaging" has never been one of them

The technology I was pitching so unsuccessfully to my wife was, of course, MeshCore.

{{<img src="meshcore-logo-black.webp" max-width="350px">}}

## What's MeshCore?

MeshCore is software that runs on inexpensive [long-range (LoRA) radios](https://en.wikipedia.org/wiki/LoRa). LoRa radios can transmit up to XX miles in cities and XX miles in rural environments. Unlike HAM radios, you don't need a license to broadcast over LoRa frequencies in the US, so anyone can pick up a LoRA radio and start chatting.

MeshCore is more than just sending messages over radio. The "mesh" in the name is because MeshCore users form a mesh network. If I want to send a message to my friend Charlie, but he's out of range of my radio, I can route my message through other MeshCore users in my neighborhood, and they'll forward my message on to Bob. It's a simpler form of how routing on the Internet works without centralized control.

## My dream for off-grid communication

I'm not exactly a doomsday prepper, but I try to plan for realistic disaster scenarios like extended power outages, food shortages, and droughts.

When I heard about MeshCore, I thought it would be neat to give some devices to my local friends so we could communicate in an emergency. And if it turned out that we're out of radio range of each other, maybe I could convince some of my neighbors to get involved as well, and we could form a mini messaging network that's robust against power failures.

## Why not Meshtastic?

MeshCore is a newer implementation of an idea that was popularized by a technology called [Meshtastic](https://meshtastic.org/).

I first heard about Meshtastic from [Tyler Cipriani's 2022 review of the technology](https://tylercipriani.com/blog/2022/07/31/meshtastic-a-review/). I thought the idea sounded neat, but Tyler's conclusion was that Meshtastic was too buggy and difficult for mainstream adoption at the time.

Some people I follow on Mastodon have been excited about MeshCore, so I thought I'd check it out, but I have no particular allegiance to MeshCore or Meshtastic. Most MeshCore-compatible devices are also compatible with Meshtastic, so I can easily experiment with Meshtastic in the future.

I only have a limited understanding of the differences between Meshtastic and MeshCore, but what I gather is that MeshCore's key differentiator is preserving bandwidth. Apparently, Meshtastic can hit scaling issues when many users are located close to each other. The Meshtastic protocol is chattier than MeshCore, so I've seen complaints that Meshtastic chatter can flood the airwaves and interfere with message delivery. MeshCore attempts to solve that problem by minimizing network chatter.

## I'm not a radio guy

I should say at this point that I'm not a radio guy.

It seems like many people in the LoRa community are radio enthusiasts who have experience with HAM radios or other types of radio broadcasting.

I'm a tech-savvy software developer, but I know nothing about radio communication. If you're appalled that terms like "spreading factor" and "coding rate" are meaningless to me, that's why.

## Heltec v3: The cheapest introduction to MeshCore

The MeshCore firmware can run on a couple dozen devices, but the official website lists three devices that they recommend. The cheapest one is the Heltec v3. I bought two for $27/ea from a company called Rokland.

{{<img src="heltecv3.webp" max-width="600px" caption="At $27, the Heltec v3 is the cheapest MeshCore-compatible device I could find.">}}

I plugged the Heltec v3 in to my computer via USB-C and used the [web flasher](https://flasher.meshcore.co.uk/) to flash MeshCore software onto it. I selected "Heltec v3" as my device, "Companion Bluetooth" as the mode, and "v1.9.0" as the version. I clicked "Erase device" since this was a fresh install.

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

{{<img src="public-channel.webp" max-width="280px" caption="My devices could finally talk to each other over a public channel.">}}

## Figuring out direct messaging

If I communicate with friends over MeshCore, I don't want to broadcast our whole conversation over the public channel, so it was time to test out direct messaging.

I was expecting some way to view a contact in the public channel and send them a direct message, but I can't. Clicking their name does nothing. There's a "Participants" view, but the only option is to block, not send a direct message.

{{<img src="participants-view.webp" max-width="300px" has-border="true">}}

This seems like an odd design choice. If a MeshCore user to the public channel, why can't I talk to them?

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

Anyway, I can talk to myself in both public channels and DMs. Onward!

## Ordering more MeshCore devices

The Heltec v3 boards were a good way to experiment with MeshCore, but they felt impractical for real-world scenarios. They require their own power source, and a phone to pair. I hoped I could just power it with my phone with a USB-C to USB-C cable, but the Heltec board wouldn't power up from my phone. In a real emergency, that's too many points of failure.

The MeshCore website recommends two other MeshCore-compatible devices, so I ordered those and got them a few days later: the Seeed SenseCAP T-1000e ($XX) and the Lilygo T-Deck+ ($XX).

{{<img src="t1000-and-lilygo.webp" max-width="600px" caption="I bought the Seeed SenseCAP T-1000e (left) and the Lilygo T-Deck+ (right) to continue experimenting with MeshCore.">}}

## Testing the SenseCAP T-1000e

Compared to the Heltec v3, I liked the T-1000e a lot. It's self-contained and has its own battery and antenna, which feels simpler and more robust. It's also nice and light. You could toss it into a backpack and not notice it's there.

{{<img src="t1000-hand.webp" max-width="600px" caption="The T-1000e feels like a more user-friendly product compared to the bare circuit board of the Heltec v3.">}}

I used the web flasher for the Heltec, but I decided to try flashing

```bash
git checkout https://github.com/meshcore-dev/MeshCore.git

# Latest firmware version at the time I tested.
FIRMWARE_VERSION='companion-v1.9.0'
git checkout $FIRMWARE_VERSION
```

I use Nix, and the repo conveniently has a `default.nix`, so the dependencies installed automatically with `direnv`. I then flashed the firmware for the T-1000 like this:

```bash
# Specify the device settings, from variants/t1000-e/platformio.ini.
DEVICE_SETTINGS='t1000e_companion_radio_ble'
pio run \
  --environment $DEVICE_SETTINGS \
  --target upload \
  --upload-port /dev/ttyACM0
```

One drawback is that it uses a custom USB cable, so I can't just plug in an off-the-shelf cable.

{{<img src="t1000-cable.webp" max-width="400px" caption="The Seeed T-10000e uses a custom USB cable for charging and flashing.">}}

From there, I paired it with my phone the same way I did with the Heltec. The only difference was that the Heltec displayed a random password that secured the Bluetooth pairing, but the T-1000e has no screen, so it defaults to the password of `123456`. Does that mean anyone within Bluetooth range can just take over my T-1000e and read all my messages?

It also seems impossible to turn off the T-1000e, which is undesirable for a broadcasting device. The [instructions on the Seeed website](https://wiki.seeedstudio.com/sensecap_t1000_e/) advise users to power off the device by just leaving it unplugged for several days until the battery runs out.

## Testing the LilyGo T-Deck

Now it was time to test the LilyGo T-Deck+.

I'll be honest, this was the part of MeshCore I'd been excited about since the beginning. If I handed my non-techy friends a device like the T-1000e, there were too many things that could go wrong in an actual emergency. "Oh, you uninstalled the app? Oh, you're having trouble pairing it with your phone? Oh, your phone battery is dead?"

The T-Deck looked like a 2000s era Blackberry! It seemed dead simple to use because it was an all-in-one device. No phone pairing, no app to download, built-in antenna. I wanted to buy a bunch, hand them out to nearby friends to throw into a closet. If disaster struck, we'd be able to chat together on our doomsday hacker Blackberries.

### This is not a Blackberry

As soon as I turned on my T-Deck, my berry was burst. This was not a Blackberry at all.

{{<img src="tdeck-first-screen-cropped.webp" max-width="600px">}}

As a reminder, _this_ is what a Blackberry looked like in 2003:

{{<gallery caption="A Blackberry in 2003 (left) vs. a LilyGo T-Deck+ in 2025">}}

{{<img src="blackberry-2003.webp" max-width="290px">}}

{{<img src="tdeck-hand.webp" max-width="600px">}}

{{</gallery>}}

Before I even get to the UI, the device itself is so big and clunky. We can't match the quality of a hardware product that we produced _23 years ago_?

Right off the bat, the T-Deck was a pain to use. You navigate the UI by clicking a flimsy little thumbwheel in the center of the device, but it's temperamental and ignores half of my scrolls.

{{<video src="flaky-scroll.mp4">}}

And the touchscreen misses half my taps:

{{<video src="flaky-taps.mp4">}}

There are three ways to "click" a UI element. You can click the trackball, push Enter, or tap the screen. Which one does a particular UI element expect? You just have to try each one to find out!

{{<video src="how-to-interact.mp4">}}

### Sidenote: Putting the LilyGo T-Deck+ into DFU mode for flashing

I had a hard time even finding instructions for how to reflash the T-Deck+. I found this [long Jeff Geerling video](https://www.youtube.com/watch?v=2Ry-ck0fhfw) where he expresses frustration with how long it took him to reflash his, and then he never explains how he did it!

This is what worked for me:

1. Disconnect the T-Deck
1. Power off the T-Deck
1. Connect the T-Deck to your computer via the USB-C port
1. Hold down the thumbwheel in the center
1. Power on the device

Confusingly, there's no indication that the device is in DFU mode. I guess the fact that the screen doesn't load is sort of an indication. On my system, I also see `dmesg` logs indicating a connection.

## Testing MeshCore in the field

First test, I tested it while riding in a car away from my house with the SenseCAP and the Heltec v3 listening in my office at home. Communication back to the Heltec v3 in my office failed after three blocks, which was much lower than I expected.

I read that the Heltecs have a particularly weak antenna, so I tried again by leaving my T-1000e at home and taking the T-Deck out with me. After about five blocks, I could no longer send messages back to the T-1000e.

From exploring more, it seems like what I actually might need is a MeshCore repeater. If I want to communicate with friends more than a few blocks away, I might have to get a beefy device with a big antenna, though I couldn't find documentation on how far I should expect the range of my devices to work.

## Browsing MeshCore's source code

I was a bit disappointed in the source code. There were no automated tests for the codebase, so I [offered a simple unit test](https://github.com/meshcore-dev/MeshCore/pull/925) over a month ago, but nobody from the MeshCore team has replied to it yet.

The code doesn't have consistent format despite a `.clang-format` configuration. The lead developer [closed the issue](https://github.com/meshcore-dev/MeshCore/issues/276#issuecomment-3295460688) with the guidance, "Just make sure your own IDE isn't making unnecessary changes when you do a commit."

Why? Why in 2025 do I have to think about where to place my curly braces to match the style of this particular file? Just [set up a linter](/human-code-reviews-1/#let-computers-do-the-boring-parts) so I don't have to think about mundane style issues anymore.

## Wait, MeshCore isn't open-source?

I wanted to look at the source code for the mobile app or the T-Deck client, and I couldn't find it.

I'd seen that they fund development by selling a premium version of the T-Deck software with higher resolution maps. That seemed fine and a reasonable way to fund the project. I like open-core and that's how my previous business worked as well.

But I realized it's actually not open-core because none of the MeshCore T-Deck firmware is open-source. The firmware that I installed by mistake is the "core" firmware, but it doesn't have any client features that support messaging. The actual working firmware for the T-Deck is a whole other piece of software called Ripple, which is closed-source software on top of MeshCore.

I wondered about the license for the web app I was using, and I realized that's closed-source as well. It's a Flutter app, so the web, Android, and iOS apps all share the same closed-source codebase.

In fairness, the mistake was mine. I went back to the MeshCore website and realized that they never advertise the product as open-source. It just felt so much like an open-source project that I assumed, but I was terribly disappointed to discover that every MeshCore client app is closed-source and proprietary except the command-line tool.

| Product                                                    | Open-source? | Free to use?                         |
| ---------------------------------------------------------- | ------------ | ------------------------------------ |
| Core MeshCore firmware                                     | Yes          | Yes                                  |
| Web-based MeshCore firmware flasher                        | Yes          | Yes                                  |
| [CLI client](https://github.com/meshcore-dev/meshcore-cli) | Yes          | Yes                                  |
| Official Android / iOS MeshCore apps                       | No           | Yes                                  |
| Official MeshCore web app                                  | No           | Yes                                  |
| T-Deck MeshCore firmware                                   | No           | Yes, but some features are paywalled |

## Summary

For it to be viable for me, I want something like the T-Deck where it's an all-in-one device where I can . If I'm relying on these in an emergency, I don't want to worry about keeping both my phone and radio powered and connected over Bluetooth. There are just too many failure points. And especially if I'm giving devices to less tech-savvy friends to use in an emergency where they can't ask me for help, I want it to be dead simple. It's fine if I have to preconfigure it for them, but I don't want them to pull it out in an emergency and realize they uninstalled the companion app from their phone and are now stuck.

### What I like about MeshCore

- The firmware repository is built around Nix, which made it easy to build and flash onto my devices from source.

### What I dislike about MeshCore

- All of the official MeshCore clients are closed source and proprietary.
- It's too difficult to use except by enthusiasts.
- Website pushes you to platforms that have closed-source / paid software.
