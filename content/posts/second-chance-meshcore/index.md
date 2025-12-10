---
title: "Giving MeshCore a Second Chance"
date: 2025-12-20
---

Bought the wrong antenna for the repeater, but works on the pocket.

Default antenna for pocket looks identical to heltec v3.

## WisMesh pocket

```bash
DEVICE_SETTINGS='RAK_4631_companion_radio_ble'
pio run \
  --environment "${DEVICE_SETTINGS}" \
  --target upload \
  --upload-port /dev/ttyACM0
```

## Repeater

Had issues flashing with web flasher. Did DFU mode, then erasing kept failing, then stuck at 3%. Meshtastic couldn't auto-detect either even though it showed up in USB listh.

Thought I had to attach the battery based on the WisMesh instructions, but the battery was already attached.

Eventually reflashed with this command:

```bash
DEVICE_SETTINGS='RAK_4631_repeater'
pio run \
  --environment "${DEVICE_SETTINGS}" \
  --target upload \
  --upload-port /dev/ttyACM0
```
