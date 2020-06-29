---
title: "KVM Pi: Build a KVM over IP device for under $100"
date: "2020-07-10T00:00:00Z"
tags:
- raspberry pi
- python
- ansible
description: The Raspberry Pi 4 has an impressive array of functionality that allow it to capture video output and impersonate a keyboard, effectively making a virtual KVM.
images:
- kvmpi/cover.jpg
---
Recent versions of the Raspberry Pi support USB on-the-go (USB OTG), which allows them to impersonate USB devices such as keyboards, thumb drives, and microphones. To take advantage of this, I made an open-source web app that turns my Pi into a fake keyboard. I call it [KVM Pi](https://github.com/mtlynch/kvmpi.git).

This post demonstrates how KVM Pi works and how you can build one for yourself.

## Demo

TODO

## What you'll need

* [Raspberry Pi 4](https://amzn.to/3fdarLM) (all variants work)
* [Raspberry Pi OS](https://www.raspberrypi.org/downloads/raspberry-pi-os/) (aka Raspbian)
  * Stretch or later
* [USB-C to USB-A](https://www.amazon.com/AmazonBasics-Type-C-USB-Male-Cable/dp/B01GGKYN0A/) cable (Male/Male)
* [HDMI to USB capture device](https://amzn.to/2YHEvJN)
  * Strangely, these don't have a brand name, but you can recognize them by their appearance.
  * They're generally available on eBay for $11-15.
* HDMI cable
* [USB to TTL serial cable](https://amzn.to/3cVkuTT)
* [3A USB wall charger](https://amzn.to/3hal8Ax)

## Install Raspberry Pi OS Lite

To begin, install [Raspberry Pi OS lite](https://www.raspberrypi.org/downloads/raspberry-pi-os/) (formerly known as Raspbian) on a microSD card.

{{<img src="rufus-install.png" alt="Screenshot of Rufus" caption="I use [Rufus](https://rufus.ie) to write my Pi micro SD cards, but any whole disk imaging tool will work.">}}

Enable SSH access by placing a file called `ssh` on the microSD's boot partition, and insert the microSD card into your Pi device. If you're connecting over wireless, you'll also need to [create a `wpa_supplicant.conf` file](https://www.raspberrypi.org/documentation/configuration/wireless/headless.md) on the boot partition.

## Powering your Pi via GPIO

## Connecting your Pi

Connect the USB cable to your Pi's USB OTG port. On the Pi 4, this is the USB-C port. For the Pi Zero, it's the Micro-USB port labeled "USB."

{{<gallery caption="For the Raspberry Pi 4 (left), connect to the USB-C port. For the Raspberry Pi Zero W (right), connect to the data Micro-USB port.">}}
  {{< img src="pi4-connection.jpg" alt="Pi 4 with USB to TTL cable attached to 3A wall charger" maxWidth="400px" >}}
{{</gallery>}}

## Install KVM Pi

You have two options for installing KVM Pi. You can do it using plain old bash, which requires no external tools. Or, for a touch of class, install it via [Ansible](https://docs.ansible.com/ansible/latest/index.html), my favorite open source configuration management tool.

### Option 1: The pure bash way

From a bash shell, enter the following commands to connect to your Pi and configure it for USB device emulation:

```bash
# SSH into your Pi
PI_HOSTNAME="raspberrypi" # Change to your pi's hostname
PI_SSH_USERNAME="pi"      # Change to your Pi username

# Connect to the Pi (default password is "raspberry")
ssh "${PI_SSH_USERNAME}@${PI_HOSTNAME}"

# Install pre-requisites
sudo apt-get update && \
  sudo apt-get install -y \
    git \
    python-pip \
    python3-venv

# Install KVM Pi
git clone https://github.com/mtlynch/key-mime-pi.git
cd key-mime-pi
sudo ./enable-usb-hid
sudo reboot
```

Allow the Pi to reboot, then SSH in again and start the KVM Pi web server:

```bash
ssh "${PI_SSH_USERNAME}@${PI_HOSTNAME}"
cd key-mime-pi
python3 -m venv venv
. venv/bin/activate
pip install --requirement requirements.txt
PORT=8000 ./app/main.py
```

### Option 2: The Ansible way

If you're an Ansible user, you can use my [KVM Pi Ansible role](https://galaxy.ansible.com/mtlynch/keymimepi) for better automation. The following commands install KVM Pi on your device as a [systemd service](https://wiki.archlinux.org/index.php/systemd):

```bash
PI_HOSTNAME="raspberrypi" # Change to your pi's hostname
PI_SSH_USERNAME="pi"      # Change to your Pi username

# Install the KVM Pi Ansible role
ansible-galaxy install mtlynch.keymimepi

# Create a minimal Ansible playbook to configure your Pi
echo "- hosts: $PI_HOSTNAME
  roles:
    - role: mtlynch.keymimepi" > install.yml

# Install all software (default password is "raspberry")
ansible-playbook \
  --inventory "$PI_HOSTNAME", \
  --user "$PI_SSH_USERNAME" \
  --become \
  --become-method sudo \
  --ask-pass \
  install.yml

# Reboot the Pi
ansible \
  "$PI_HOSTNAME" \
  -m reboot \
  --inventory "$PI_HOSTNAME", \
  --user "$PI_SSH_USERNAME" \
  --ask-pass \
  --become \
  --become-method sudo
```

## Using KVM Pi

After you run the install script, KVM Pi will be available at:

* [http://raspberrypi:8000/](http://raspberrypi:8000/)

Its interface looks like this:

{{<img src="key-mime-pi-interface.png" alt="Screenshot of KVM Pi web interface" caption="KVM Pi web interface awaiting input" maxWidth="650px">}}

And like, magic, when you type into your browser, the keys will appear on the machine connected to the Pi.

{{<img src="key-mime-pi-usage.jpg" alt="KVM Pi transmitting keystrokes from the browser" caption="KVM Pi allows you to send keystrokes through the browser to a remote computer.">}}

## How it works

### USB device emulation

The real magic here comes from [Linux's USB Human Interface Device (HID) gadget driver](https://www.kernel.org/doc/html/latest/usb/gadget_hid.html). It allows user-mode applications to interact with the operating system as if they were USB devices.

The [key-mime-pi configuration script](https://github.com/mtlynch/ansible-role-key-mime-pi/blob/master/files/enable-rpi-hid) creates a file path at `/dev/hidg0`. Any program can read or write to this path, and the OS translates the data to keyboard signals.

To mimic a keyboard, the Pi has to communicate with the OS according to the [USB HID spec](https://www.usb.org/sites/default/files/documents/hid1_11.pdf). At 97 pages of keycodes and tables, that document is a bit of a slog, but it turns out that the protocol for keyboards is dead simple.

Upon each keystroke, the keyboard sends an 8-byte message called a "report."

| Byte Index | Purpose |
|------------|---------|
| 0          | Modifier keys (Ctrl, Alt, Shift) |
| 1          | Reserved for manufacturers |
| 2          | Key #1   |
| 3          | Key #2   |
| 4          | Key #3   |
| 5          | Key #4   |
| 6          | Key #5   |
| 7          | Key #6   |

Sending the keys for "Hi" looks like this:

```bash
# H (Right shift + h)
echo -ne "\x20\0\xb\0\0\0\0\0" > /dev/hidg0
# i
echo -ne "\0\0\xc\0\0\0\0\0" > /dev/hidg0
# Release all keys
echo -ne "\0\0\0\0\0\0\0\0" > /dev/hidg0
```

In addition to signalling key presses, keyboards must also indicate key releases. An 8-byte block of zeroes indicates that no keys are active.

The above example sent one keystroke at a time, but HID reports have space for six keys. This means you can send up to six keystrokes in a single message as long as they're distinct keys:

```bash
echo -ne "\0\0\x1a\x0b\x04\x17\x18\x13" > /dev/hidg0 && \
  echo -ne "\0\0\0\0\0\0\0\0" > /dev/hidg0
```

```
whatup
```

### Translating from JavaScript to HID

When you type into a browser window, JavaScript generates events for each keystroke. The website [keycode.info](https://keycode.info) provides an excellent demonstration of this functionality in action.

JavaScript key events include keycodes, but they're distinct from HID keycodes. Fortunately, there's a mostly 1:1 mapping between the two. To translate from JavaScript to HID, I created a [lookup table](https://github.com/mtlynch/key-mime-pi/blob/904e56b6bf1f76da1abb85f654637da0e3c35fa3/app/js_to_hid.py#L32) like this:

```python
_JS_TO_HID_KEYCODES = {
    3: 0x48,  # Pause / Break
    8: 0x2a,  # Backspace / Delete
    9: 0x2b,  # Tab
    ...
    65: 0x04,  # a
    66: 0x05,  # b
    67: 0x06,  # c
    68: 0x07,  # d
```

The KVM Pi server listens for JavaScript keycode events from the browser, translates them into HID codes, then sends them to the Pi's HID interface at `/dev/hidg0`.

Here's how it works from end to end:

1. A user hits a key in the browser.
1. JavaScript on the page sends the JavaScript keycode to the KVM Pi server on the Pi.
1. The KVM Pi server translates the JavaScript keycode to its equivalent HID code.
1. The KVM Pi server sends the HID code to the USB gadget interface at `/dev/hidg0`.
1. The computer connected to the Pi's USB cable receives this as keyboard input, causing a character to appear on the screen.

## Solving the power problem

In my tests, USB ports from computers produced enough electricity to power the Pi, but under-voltage warnings appeared frequently in the system log:

```bash
 $ sudo journalctl -xe | grep "Under-voltage"
Jun 05 03:46:05 pikvm kernel: Under-voltage detected! (0x00050005)
Jun 05 03:48:29 pikvm kernel: Under-voltage detected! (0x00050005)
Jun 05 03:54:22 pikvm kernel: Under-voltage detected! (0x00050005)
```

The Pi was correctly detecting that standard USB 2.0 and USB 3.0 ports provide insufficient power to meet the Pi's requirements.

| Raspberry Pi Model | Power requirements |
| ------------------ | ------------------ |
| Pi Zero W          | 5 V / 1.2 A        |
| Pi 4               | 5 V / 3.0 A        |

Standard USB ports come up short:

| USB Port Type      | Power output       |
|--------------------|--------------------|
| USB 2.0            | 5 V / 0.5 A        |
| USB 3.0            | 5 V / 0.9 A        |

The Pi runs even when it's underpowered, but running an underpowered computer is bound to create issues sooner or later.

I solved this by purchasing a [3 A USB wall charger](https://amzn.to/2YitxsN) and a [USB to TTL serial cable](https://amzn.to/2Yk1CIX). The USB to TTL cable connects to the Pi's GPIO pins, ensuring the device always receives at least 3 A of electricity.

{{< img src="extra-power.jpg" alt="Pi 4 with USB to TTL cable attached to 3A wall charger" caption="I keep the Pi sufficiently powered with a [3 A USB wall charger](https://amzn.to/2YitxsN) and a [USB to TTL cable](https://amzn.to/2Yk1CIX)." maxWidth="600px" >}}

## Want a pre-configured kit?

When I get in-browser display working, I'm considering selling pre-configured kits for around $170. I'll publish a follow-up post explaining how to construct your own, but if you'd like a pre-made kit, sign up for my notification list here:

* [KVM Pi](https://tinyletter.com/kvmpi-interest)

## Source code

KVM Pi's code is fully open source under the permissive [MIT license](https://opensource.org/licenses/MIT):

* [key-mime-pi](https://github.com/mtlynch/key-mime-pi.git): Web server that forwards keystrokes to the Pi's virtual keyboard.
* [ansible-role-key-mime-pi](https://github.com/mtlynch/ansible-role-key-mime-pi): The Ansible role for configuring the Pi's USB gadget functionality and for installing the web server as a systemd service.

## Acknowledgments

* [raspberrypisig/pizero-usb-hid-keyboard](https://github.com/raspberrypisig/pizero-usb-hid-keyboard) was the first sample code I found that successfully installed the virtual USB HID device on my Pi.
* [Fmstrat/diy-ipmi](https://github.com/Fmstrat/diy-ipmi) was an inspiration for this project and proved that it was possible to make a Pi function as a KVM over IP.
* [Rafael Medina](https://www.rmedgar.com/blog/using-rpi-zero-as-keyboard-send-reports) provided the most readable explanation of the HID protocol I found.
* Thanks to the Linux and Raspberry Pi OS developers who made USB gadget functionality possible.