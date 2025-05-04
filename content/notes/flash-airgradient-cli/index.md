---
title: "Flash AirGradient from the Command Line"
date: 2024-01-31T19:57:39-05:00
---

Annoyingly, AirGradient doesn't publish official instructions for flashing software onto your AirGradient ONE. I learned how to do it from these blog posts:

- https://www.jeffgeerling.com/blog/2021/airgradient-diy-air-quality-monitor-co2-pm25
- https://www.cnx-software.com/2023/11/29/airgradient-one-kit-review-an-open-source-indoor-air-quality-monitor/

## Prep

Install arduino-cli

```bash
mkdir -p ./venv && \
  python3 -m venv ./venv && \
  . venv/bin/activate && \
  pip install pyserial
```

```bash
sudo adduser "$(whoami)" dialout && \
  sudo chmod a+rw /dev/ttyACM0
```

## Initialize Arduino CLI

```bash
  arduino-cli config init \
    --additional-urls https://espressif.github.io/arduino-esp32/package_esp32_index.json
```

## Install third-party libraries

```bash
arduino-cli lib install \
  'Adafruit NeoPixel'@1.12.0 \
  'arduino-sht'@1.2.3 \
  'S8_UART'@1.0.1 \
  'Sensirion Core'@0.6.0 \
  'Sensirion Gas Index Algorithm'@3.2.2 \
  'Sensirion I2C SGP41'@1.0.0 \
  'U8g2'@2.34.22 \
  'WiFiManager'@2.0.16-rc.2
```

The official PMS Arduino library is incompatible with the AirGradient ONE, so we need to install a modified version from Github.
https://www.airgradient.com/blog/patching-pms-library-for-plantower-pms5003t/

```bash
arduino-cli config set library.enable_unsafe_install true
arduino-cli lib install \
  --git-url 'https://github.com/Ibuprofen/PMS.git#d972759f47a700b1c091d19b61eefdbfacb8b828'
arduino-cli config set library.enable_unsafe_install false
```

## Flash sotware

```bash
arduino-cli compile \
  --verbose \
  --fqbn esp32:esp32:lolin_c3_mini \
  --upload \
  --port /dev/ttyACM0 \
  --verify \
  ONE_V9.ino
```

## Stream

arduino-cli monitor --port /dev/ttyACM0
