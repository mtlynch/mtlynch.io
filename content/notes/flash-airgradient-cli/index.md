---
title: "Flash an AirGradient ONE from the Command Line"
date: 2025-08-24
tags:
  - home-automation
  - homelab
  - airgradient
---

I've purchased two AirGradient ONE indoor quality monitors to measure air quality in my home. AirGradient devices are open-source, so you can flash your own custom firmware onto your devices. The problem is that all the existing documentation for flashing firmware require you to use the Arduino IDE, a clunky GUI program.

You can flash AirGradient devices using the command-line, except nobody has documented how to do it, so I've included the steps below.

## Aside: I don't get the hype about AirGradient

Every time I see AirGradient come up on forum discussions, everyone sounds excited about their products. I've found them to be mediocre, but they're the only company I've found that sells pre-made air quality monitors that are open-source.

My biggest gripe is that the documentation is pretty bad. AirGradient advertises themselves as open-source and hackable, but they didn't bother to document the process of compiling the

document how to reflash them.

AirGradient by default pushes you to buy their paid dashboard product, but I don't want to buy a subscription to see my air quality, and I don't want to share with a third party detailed logs that effectively show when I'm in my house and when I leave.

Annoyingly, AirGradient doesn't publish official instructions for flashing software onto your AirGradient ONE. I learned how to do it from these blog posts:

- https://www.jeffgeerling.com/blog/2021/airgradient-diy-air-quality-monitor-co2-pm25
- https://www.cnx-software.com/2023/11/29/airgradient-one-kit-review-an-open-source-indoor-air-quality-monitor/

And finally, AirGradient [published official instructions](https://github.com/airgradienthq/arduino/blob/eb8378adfa1faaf18fa04738ae460bcf542fef85/docs/howto-compile.md), but they're [a bit hidden](https://github.com/airgradienthq/arduino/issues/335).

But all the instructions I've found require you to compile through the Arduino IDE. If you run servers without a GUI or you prefer the command-line, the Arduino IDE is a big pain.

## Requirements

I tested these steps on Debian 13.0, but they should work on any Linux system.

First, I install the base packages I need:

```bash
sudo apt update && \
  sudo apt install -y
    git
    curl
    python3
    python3-serial
```

## Install arduino-cli

Next, I install the Arduino CLI tool:

```bash
ARDUINO_CLI_VERSION='1.2.2'
ARDUINO_BIN_DIR="${HOME}/.local/arduino-cli"

mkdir -p "${ARDUINO_BIN_DIR}" && \
  curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh \
  | BINDIR="${ARDUINO_BIN_DIR}" sh -s "${ARDUINO_CLI_VERSION}"
export PATH="${PATH}:${ARDUINO_BIN_DIR}"
```

To verify the install was successful, I print out the version string for `arduino-cli`:

```bash
$ arduino-cli version
arduino-cli  Version: 1.2.2 Commit: c11b9dd5 Date: 2025-04-22T13:51:01Z
```

## Download ESP32 libraries

AirGradient ONE depends on the ESP32 Arduino libraries. As of this writing, AirGradient is not yet compatible with the 3.x versions of Arduino, so I have to use the latest stable 2.x version.

```bash
ARDUINO_ESP32_VERSION='2.0.17'

arduino-cli config init \
  --additional-urls https://espressif.github.io/arduino-esp32/package_esp32_index.json && \
  arduino-cli core install "esp32:esp32@${ARDUINO_ESP32_VERSION}"
```

## Find the path to my device

Next, I need the device path to my AirGradient ONE. The simplest way to find the device path is:

1. Run `dmesg --follow`
1. Plug my AirGradient ONE into my system via USB
1. Look for the device path to appear in the `dmesg` output

Here's what it looks like on my system:

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

Next, I ensure that I can write to the AirGradient file path:

```bash
sudo chmod a+rw "${AIRGRADIENT_PATH}"
```

The AirGradient path should now have these permissions:

```bash
$ ls -l "${AIRGRADIENT_PATH}"
crw-rw-rw- 1 root dialout 166, 0 Aug 10 10:34 /dev/ttyACM0
 ^^^^^^^^
```

I also add myself to the `dialout` group so I can write to the path:

```bash
sudo adduser "$(whoami)" dialout
```

## Get AirGradient source

Finally, it's time to get the AirGradient source code:

```bash
# Current production release, as of this writing.
AIRGRADIENT_RELEASE='3.3.8'

git clone --recurse-submodules \
  --branch "${AIRGRADIENT_RELEASE}" \
  --depth 1 \
  https://github.com/airgradienthq/arduino.git \
  ~/airgradient-one
```

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
