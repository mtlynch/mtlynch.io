---
title: "Flash an AirGradient ONE from the Command Line"
date: 2025-08-24
---

I've purchased two AirGradient ONE indoor quality monitors. Everyone is pretty excited about them. I think they're kinda okay.

My biggest gripe is that they advertise themselves as open-source and hackable, but they don't document how to reflash them.

AirGradient by default pushes you to buy their paid dashboard product, but I don't want to buy a subscription to see my air quality, and I don't want to share with a third party detailed logs that effectively show when I'm in my house and when I leave.

Annoyingly, AirGradient doesn't publish official instructions for flashing software onto your AirGradient ONE. I learned how to do it from these blog posts:

- https://www.jeffgeerling.com/blog/2021/airgradient-diy-air-quality-monitor-co2-pm25
- https://www.cnx-software.com/2023/11/29/airgradient-one-kit-review-an-open-source-indoor-air-quality-monitor/

## Requirements

- git
- Python 3
- Python 3 venv

```bash
sudo apt update && \
  sudo apt install -y
    git
    curl
    python3
    python3-serial
```

## Install arduino-cli

```bash
ARDUINO_CLI_VERSION='1.2.2'
ARDUINO_BIN_DIR="${HOME}/.local/arduino-cli"

mkdir -p "${ARDUINO_BIN_DIR}" && \
  curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh \
  | BINDIR="${ARDUINO_BIN_DIR}" sh -s "${ARDUINO_CLI_VERSION}"
export PATH="${PATH}:${ARDUINO_BIN_DIR}"
```

If the install was successful, you should be able to print out the version string for arduino-cli:

```bash
$ arduino-cli version
arduino-cli  Version: 1.2.2 Commit: c11b9dd5 Date: 2025-04-22T13:51:01Z
```

## Find the path to your device

Next, I need the device path to my AirGradient ONE. The simplest way to find this is to run `dmesg --follow`, plug in my AirGradient, and look for the

```bash
$ sudo dmesg --follow
[517021.978880] usb 1-4: New USB device found, idVendor=303a, idProduct=1001, bcdDevice= 1.01
[517021.978884] usb 1-4: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[517021.978894] usb 1-4: Product: USB JTAG/serial debug unit
[517021.978896] usb 1-4: Manufacturer: Espressif
[517021.978898] usb 1-4: SerialNumber: D8:3B:DA:1A:EE:C4
[517022.017678] cdc_acm 1-4:1.0: ttyACM0: USB ACM device
                                 ^^^^^^^
                                 Path name
```

Given this output, the path on my system to my AirGradient ONE is `/dev/ttyACM0`:

```bash
AIRGRADIENT_PATH='/dev/ttyACM0'
```

## Make device path writeable

```bash
sudo chmod a+rw "${AIRGRADIENT_PATH}"
```

The AirGradient path should now have these permissions:

```bash
$ ls -l "${AIRGRADIENT_PATH}"
crw-rw-rw- 1 root dialout 166, 0 Aug 10 10:34 /dev/ttyACM0
 ^^^^^^^^
```

Add myself to the `dialout` group so I can write to the path:

```bash
sudo adduser "$(whoami)" dialout
```

## Get AirGradient source

```bash
# Current production release, as of this writing.
AIRGRADIENT_RELEASE='3.3.8'

cd ~ && \
  mkdir -p airgradient-one && \
  cd airgradient-one && \
  git clone --recurse-submodules \
    https://github.com/airgradienthq/arduino.git . && \
  git checkout "${AIRGRADIENT_RELEASE}" && \
  git submodule update --recursive
```

## Initialize Arduino CLI

```bash
ARDUINO_ESP32_VERSION='2.0.17'

arduino-cli config init \
  --additional-urls https://espressif.github.io/arduino-esp32/package_esp32_index.json && \
  arduino-cli core install "esp32:esp32@${ARDUINO_ESP32_VERSION}"
```

## Fix paths

## Flash sotware

```bash
cd ~/airgradient-one && \
  arduino-cli compile \
    --verbose \
    --fqbn esp32:esp32:esp32c3:CDCOnBoot=cdc,PartitionScheme=min_spiffs,DebugLevel=info \
    --library . \
    --port "${AIRGRADIENT_PATH}" \
    --verify \
    --upload \
    examples/OneOpenAir/OneOpenAir.ino
```

## Stream

arduino-cli monitor --port "${AIRGRADIENT_PATH}"
