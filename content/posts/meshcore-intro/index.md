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
pio run -e Heltec_v3_companion_radio_ble -t upload --upload-port /dev/ttyUSB0
```
