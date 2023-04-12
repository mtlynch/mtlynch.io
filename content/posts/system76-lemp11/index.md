---
title: "Review of the System76 Lemur Pro Laptop"
date: 2023-04-11T06:44:59-04:00
---

For the past

## Use cases

My main uses are:

- Doing video calls
- Watching streaming TV shows while I eat lunch
- Light emailing and development when I travel
- Presenting talks at conferences

## Why upgrade?

Recent trip, Surface Pro 6 couldn't handle running two small Docker containers. Limited by 8 GB of RAM and 128 GB of SSD.

## I'm tired of Windows

I grew up on Windows. I've been using it since Windows 3.1. All of my personal computers have been Windows. My first job out of college was as a developer at Microsoft working on Windows.

Windows is going down a dark path. I'm seeing a trend more and more the past few years to take control away from the user. I don't like seeing pre-installed apps that I can't get rid of. The start menu is getting worse. I don't like having to constantly fight to turn off telemetry.

https://gizmodo.com/microsoft-windows-11-onedrive-notifications-start-menu-1850327990

## Why System76?

I like that System76 has open-source firmware. I like that they're building a profitable company around Linux for consumers. I've played around with Pop_OS and I think it's cool.

I've seen other bloggers recompile their firmware, and that seems really neat.

## Options I considered

### Surface Pro 7+

There's a high cost of switching. I'm comfortable with the Surface Pro, and I know Windows.

I came extremely close to giving in and sticking with Microsoft. I got to the point of going through the checkout process on an eBay listing and then deciding to sleep on it another night before I completed the purchase.

### System76 Pangolin

For $100 more, I could get a CPU that's XX% faster, 33% more RAM, and a 15.6" screen instead of 14.1". It would cost me $100 extra and 1.4 lbs (XX%) of extra weight. I felt like it wasn't worth it.

### Framework

- Didn't want to build it myself
- And then I have to pay for a Windows license I don't want.

I don't really want to build my own laptop. I enjoy building my own PCs, but for some reason, the prospect of building a laptop feels unappealing. I think it's the idea of everything having to fit in tight spaces.

### Starlabs Starbook

UK based

Checkout experience was bad

### Tuxedo Infinitybook

I only briefly looked at it and stopped when I couldn't find USD pricing anywhere and several parts of the site were available exclusively in German.

## Unboxing

## First impressions

Very light

Relatively small power brick. It's weird to see an off-brand AC adapter, and I say this as someone who sells a hardware product where we use an off-brand AC adapter. It made me want to prioritize getting one with my own logo because seeing another company's logo on one of the accessories really does degrade the experience.

Missed the magnetic attachment

I tried to test the camera and found that there was no camera software included.

The OS does natively support capturing screencasts, so that was neat.

The first time I tried putting in headphones, I couldn't hear anything. It turned out that they need to be pushed in extra hard.

Boot is fast.

## I can't securely hibernate?

I use full disk encryption

Granted, most laptop theifs aren't going to bother trying to pull my RAM sticks out and recover the keys or do a DMA attack.

The only practical thing I can think of is if border patrol stops me for a random check and asks to search my laptop, I can say no and refuse to decrypt the keys. In practice, I don't know how practical that really is given that they could detain me for

## The defective microphone

The worst issue I ran into with my Lemur Pro was the built-in microphone. When I popped open my first video call on the new laptop, my teammate winced and said it sounded like I was shouting through a noisy car exhaust. I switched back to my Surface Pro 6.

I tried recording myself in OBS, and the audio was indeed atrocious and unintelligible. I reached out to System76 support, and they arranged for a replacement.

## What kind of headphones are these?

I use headphones a lot, and now every time I plug in the headphones, Pop_OS prompts me to ask whether they're headphones or a headset. And there's no "never ask me again," so I have to click the dialog every time I plug in the headphones.

## Software support

When I follow the official instructions for installing Docker, I get this error:

```text
W: GPG error: https://download.docker.com/linux/ubuntu jammy InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 7EA0A9C3F273FCD8
E: The repository 'https://download.docker.com/linux/ubuntu jammy InRelease' is not signed.
N: Updating from such a repository can't be done securely, and is therefore disabled by default.
```

## Not much to the BIOS

I was excited to play around with the BIOS.

System76 refuses to output to its external display port during boot. I was curious to see if there was an option in BIOS to change this, but there's not. BIOS seems to expose only one option: the boot order.

So, kind of underwhelming. I was hoping I could fully control my Lemur from my TinyPilot, but if it refuses to use its external HDMI port during boot, that limits the fun of the TinyPilot.

## Other nits

The fan is extremely loud. My Surface Pro 6 was fanless, and I got spoiled never having to hear a fan. The Lemur sounds like a small airplane getting ready to take off if I do something as mundane as open a Firefox window.

Power light is on the opposite side of the power button. I frequently think I pushed the power button, and then nothing happens.

At one point on my first laptop, when I booted, I found it in airplane mode, even though I'd never put it into airplane mode. I disabled airplane mode, and it still couldn't see any WiFi networks. I rebooted, and it hung on some kernel error.

Fingerprints show up on the case conspicuously. I don't have particularly oily fingers, but my laptop somehow always looks like detectives have been dusting it for prints.

## System76 support

I had two experiences with System76 customer support, and I'd describe them both as "fine." Not great, not bad, fine.

A System76 engineer called me to let me know that my order would be shipped in the next few days. It was nice to have that kind of personal attention after I spent $1,400 on a new laptop, but I was confused by the timing. He asked if I had any questions, but what questions am I going to have before I've even received the laptop? The call would make a lot more sense a few days _after_ it was delivered so I could talk about what my experience had been. But still, he was pleasant and friendly, so the call made me happy with my purchase.

The next experience was emailing support about the defective microphone. It took a little longer than I was hoping to resolve, but it was still decently fast.

- 2023-03-28: I report issue to System76 support and include a recording of the audio.
- 2023-03-30: (2 business days later) System76 requests a screenshot of the Settings -> Sound dialog, so I provide it.
- 2023-03-31: (1 business day later) System76 suggests I check the gain using PulseAudio to make sure it's below 100%. I confirm that gain is 100%, and that the issue persists even when I reduce it to lower levels.
- 2023-04-03: (1 business day later) System76 says it's probably a hardware issue and starts the RMA process.
- 2023-04-07: (XX business days later) System76 ships a replacement laptop. They forgot to notify me, but I noticed the tracking number appear in my support dashboard.
- 2023-04-13: (XX business days later) System76 replacement arrives.

So, okay. It took three weeks to fix the issue. Not super fast, but not super slow, given that each laptop is made to order. I liked that they provided a replacement first rather than make me ship in my existing laptop first.
