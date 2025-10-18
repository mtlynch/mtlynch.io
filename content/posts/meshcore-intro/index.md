---
title: "Meshcore Intro"
date: 2025-10-11
---

# Gotchas

- Must change both to same frequency.
- Must add contacts bidirectionally.

# Bugs

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

# USB

```bash
pio run \
  --environment Heltec_v3_companion_radio_usb \
  --target upload \
  --upload-port /dev/ttyUSB0
```

## SEEED t1000e_companion_radio_ble

```bash
pio run \
  --environment t1000e_companion_radio_ble \
  --target upload \
  --upload-port /dev/ttyACM0
```

# T-Deck USB

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
