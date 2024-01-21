---
title: "AirGradient Review"
date: 2024-01-20T21:03:19-05:00
---

Stitched together from

- https://www.jeffgeerling.com/blog/2021/airgradient-diy-air-quality-monitor-co2-pm25
- https://www.cnx-software.com/2023/11/29/airgradient-one-kit-review-an-open-source-indoor-air-quality-monitor/
- https://www.airgradient.com/blog/install-arduino-c3-mini/

File > Preferences

Additional boards manager URLS: https://espressif.github.io/arduino-esp32/package_esp32_index.json

From: https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html#installing-using-arduino-ide

Search esp and install "esp32 by Espressif Systems" (2.0.14)

Tools > Board > esp32 > LOLIN C3 Mini

Install libraries. Arduino library search is terrible. `Sensirion` matches everything but Sensirion first.

```bash
cd ~/Arduino/libraries/ && \
  git clone https://github.com/Ibuprofen/PMS.git
```

https://github.com/airgradienthq/arduino/blob/31c51cc4ee55f2e66db547e97db0173bcf1044e1/examples/ONE_V9/ONE_V9.ino

```bash
python3 -m pip install pyserial
```

Avoid permissions error on USB:

```bash
sudo adduser "$(whoami)" dialout && \
  sudo chmod a+rw /dev/ttyACM0
```

Where are WiFi settings stored?

Compilation v. slow. Meassure this..

Arduino silently casts floats to ints.
