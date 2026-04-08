---
title: "Giving MeshCore a Second Chance"
date: 2025-12-20
---

Bought the wrong antenna for the repeater, but works on the pocket.

Default antenna for pocket looks identical to heltec v3.

## Why try again?

People told me it's a different experience with the repeater.

Frieder Schrempf made the point that even if the clients are closed right now, the protocol is still documented and open.

They don't have a huge moat. Kind of like IRC. Even if IRC clients were closed-source, we can build open-source alternatives and continue talking to anyone on IRC.

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

WisMesh actually includes instructions.

## Repeater experience

You can actually ping and get diagnostics. Tells you a lot more than succeeded/failed.

```bash
$ nix run .#meshcore-cli -- -s /dev/ttyUSB0 req_telemetry 'WisMesh Repeater Mini' 2> /dev/null | nix-shell -p jq --command 'jq .lpp[0].value'
```

## Range

Got 835m at 910.525 MHz, 500 kHz, 11 SF, 5 CR, 22 dBm
