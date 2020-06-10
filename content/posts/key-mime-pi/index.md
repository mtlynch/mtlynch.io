---
title: "Key Mime Pi: Turn Your Raspberry Pi into a Remote Keyboard"
date: "2020-06-11T00:00:00Z"
tags:
- raspberry pi
- python
- ansible
description: TODO
images:
- key-mime-pi/cover.jpg
---
The Raspberry Pi is a small, inexpensive computer, popular with hobbyists. A few years ago, my friend Jeet and I used one to build [a plant watering robot](https://mtlynch.io/greenpithumb/) that *kind of* worked.

Recent versions of Raspberry Pi support USB on-the-go (USB OTG), which allows them to impersonate USB devices such as keyboards, thumbdrives, and microphones. To take advantage of this, I made a small web app that turns my Pi into a fake keyboard that I control through my web browser. I call it Key Mime Pi.

This post demonstrates how Key Mime Pi works and how you can build one for yourself.

## Demo

{{< youtube EYMGQxiu-kI >}}

## What you'll need

* A Raspberry Pi that supports USB OTG:
  * [Raspberry Pi 4](https://amzn.to/3fdarLM) (all variants)
  * [Raspberry Pi Zero W](https://amzn.to/2BMgOXN)
  * Raspberry Pi A and A+ *(verification needed)*
    * [This source](https://raspberrypi.stackexchange.com/a/73911) claims that early Pis support USB OTG, but I have not tested these devices personally.
* [Raspberry Pi OS](https://www.raspberrypi.org/downloads/raspberry-pi-os/) (aka Raspbian)
  * Stretch or later
* A USB cable
  * For the Pi 4: [USB-C to USB-A](https://www.amazon.com/AmazonBasics-Type-C-USB-Male-Cable/dp/B01GGKYN0A/) (Male/Male)
  * For the Pi Zero W: [microUSB to USB-A](https://amzn.to/2B08iE5) (Male/Male)
* Alternate power source (optional)
  * [USB to TTL serial cable](https://amzn.to/3cVkuTT)
  * [3A USB wall charger](https://amzn.to/3hal8Ax)

## Install Raspberry Pi OS Lite

To begin, install [Raspberry Pi OS lite](https://www.raspberrypi.org/downloads/raspberry-pi-os/) on a microSD card.

{{<img src="rufus-install.png" alt="Screenshot of Rufus" caption="I use [Rufus](https://rufus.ie) to write my Pi micro SD cards, but any whole disk imaging tool will work.">}}

Enable SSH access by placing a file called `ssh` on the microSD's boot partition, and insert the microSD card into your Pi device.

## Connecting your Pi

Connect the USB cable to your Pi's USB OTG port. On the Pi 4, this is the USB-C port. For the Pi Zero, it's the microUSB port labeled "USB."

{{<gallery caption="For the Raspberry Pi 4 (left), connect to the USB-C port. For the Raspberry Pi Zero W (right), connect to the data microUSB port.">}}
  {{< img src="pi4-connection.jpg" alt="Pi 4 with USB to TTL cable attached to 3A wall charger" maxWidth="400px" >}}
  {{< img src="pi-zero-connection.jpg" alt="Pi 4 with USB to TTL cable attached to 3A wall charger" maxWidth="445px" >}}
{{</gallery>}}

Connect the other end of the USB cable to the computer that you want to connect to as a keyboard. USB 3.0 ports work better because they output more power, but all the USB 2.0 ports I tested worked fine as well.

Your Pi should draw power from the computer's USB port and power up. If the USB port can't sufficiently power your Pi, jump to "[Solving the power problem](#solving-the-power-problem)."

## Install Key Mime Pi

You have two options for installing Key Mime Pi. You can do it using plain old bash, which requires no external tools. Or, for a touch of class, you can install it using [Ansible](https://docs.ansible.com/ansible/latest/index.html), my favorite open source configuration management tool.

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

# Install Key Mime Pi
git clone https://github.com/mtlynch/key-mime-pi.git
cd key-mime-pi
sudo ./enable-usb-hid
sudo reboot
```

Allow the Pi to reboot, then SSH in again and run the Key Mime Pi server:

```bash
ssh "${PI_SSH_USERNAME}@${PI_HOSTNAME}"
cd key-mime-pi
python3 -m venv venv
. venv/bin/activate
pip install --requirement requirements.txt
PORT=8000 ./app/main.py
```

This starts a Key Mime Pi web server at:

* [http://raspberrypi:8000/](http://raspberrypi:8000/)

### Option 2: The Ansible way

If you're an Ansible user, you can use my [Key Mime Pi Ansible role](https://galaxy.ansible.com/mtlynch/keymimepi) for better automation. The following commands install Key Mime Pi on your device as a [systemd service](https://wiki.archlinux.org/index.php/systemd):

```bash
PI_HOSTNAME="raspberrypi" # Change to your pi's hostname
PI_SSH_USERNAME="pi"      # Change to your Pi username

# Install the Key Mime Pi Ansible role
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


## Using Key Mime Pi

After you run the install script, Key Mime Pi will be available at:

* [http://raspberrypi:8000/](http://raspberrypi:8000/)

{{<img src="key-mime-pi-interface.png" alt="Screenshot of Key Mime Pi web interface" caption="Key Mime Pi web interface awaiting input" maxWidth="650px">}}

If you type into your browser, the keys you type will appear on the machine connected to the Pi.

{{<img src="key-mime-pi-usage.jpg" alt="Key Mime Pi transmitting keystrokes from the browser" caption="Key Mime Pi allows you to send keystrokes through the browser to a remote computer.">}}

## How it works

### USB device emulation

The real magic here comes from [Linux's USB Human Interface Device (HID) gadget driver](https://www.kernel.org/doc/html/latest/usb/gadget_hid.html). It allows regular, user-mode software applications to interact with the operating system as if they were real USB devices.

The [key-mime-pi configuration script](https://github.com/mtlynch/ansible-role-key-mime-pi/blob/master/files/enable-rpi-hid) creates a file path at `/dev/hidg0`, which any application can read or write to and the OS treats it the same way it would signals to and from a physical keyboard.

To mimic a keyboard, the Pi has to communicate according to the [USB HID spec](https://www.usb.org/sites/default/files/documents/hid1_11.pdf). At 97 pages of keycodes and tables, that document is a bit of a slog, but it turns out that the protocol for keyboards is dead simple.

Upon each keystroke, the keyboard sends an 8-byte message called a "report."

| Byte Index | Purpose |
|------------|---------|
| 0          | Modifier keys (Ctrl, Alt, Shift) |
| 1          | Reserved for manufacturers |
| 2          | Key 1   |
| 3          | Key 2   |
| 4          | Key 3   |
| 5          | Key 4   |
| 6          | Key 5   |
| 7          | Key 6   |

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

When you type in the browser, JavaScript generates key events for each keystroke. The website [keycode.info](https://keycode.info) provides a simple demonstration of how this works.

JavaScript key events include keycodes, but they're distinct from HID keycodes. Fortunately, there's a mostly 1:1 mapping between the two. To translate the two, I just created a [lookup table](https://github.com/mtlynch/key-mime-pi/blob/904e56b6bf1f76da1abb85f654637da0e3c35fa3/app/js_to_hid.py#L32) like this:

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

The Key Mime Pi server listens to JavaScript keycode events from the browser, translates them into HID codes, then sends them to the Pi's HID interface at `/dev/hidg0`.

Here's how it works from end to end:

1. User hits a key in the browser.
1. JavaScript on the page sends the JavaScript keycode to the Key Mime Pi server on the Pi.
1. The Key Mime Pi server translates the JavaScript keycode to its equivalent HID code.
1. The Key Mime Pi server sends the HID code to the HID interface at `/dev/hidg0`.
1. The computer connected to the Pi's USB cable receives this as a USB signal from a keyboard and accepts the keystroke, causing a character to appear on screen.

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

The Pi still runs even when it's underpowered, but running an underpowered Pi is bound to create issues sooner or later.

I solved this by purchasing a [3A USB wall charger](https://amzn.to/2YitxsN) and a [USB to TTL serial cable](https://amzn.to/2Yk1CIX). The USB to TTL cable connects to the Pi's GPIO pins, ensuring the device always receives at least 3 A of electricity.

{{< img src="extra-power.jpg" alt="Pi 4 with USB to TTL cable attached to 3A wall charger" caption="I keep the Pi sufficiently powered with a [3A USB wall charger](https://amzn.to/2YitxsN) and a [USB to TTL cable](https://amzn.to/2Yk1CIX)." maxWidth="600px" >}}

## Troubleshooting

### Verifying the driver is working

This creates a device path at `/dev/hidg0`. To verify that it's installed correctly, try the following command:

```bash
echo -ne "\0\0\xb\0\0\0\0\0" > /dev/hidg0 && \
  echo -ne "\0\0\xc\0\0\0\0\0" > /dev/hidg0 && \
  echo -ne "\0\0\0\0\0\0\0\0" > /dev/hidg0
```

If everything is working, you should see the following output on the machine the Pi is connected to via USB:

```
hi
```

If that fails, the problem is with the USB HID interface. If you can successfully generate keystrokes from the command line but not in the browser, that suggests a bug in the Key Mime Pi web app. [File a bug on Github](https://github.com/mtlynch/key-mime-pi/issues/new), so that I can help you diagnose it.

### Writes to HID interface hang

One of the issues I ran into when testing this on a Pi Zero was a bad microUSB to USB-A cable. I'm not sure what was wrong with it, but when I used one of my cables, it just hung when I tried to write keystrokes. I tried switching to another microUSB to USB-A cable I had lying around, and that solved the problem.

## Next step: embedding display output

Remote typing is fun, but it's a bit impractical. Generally when you're typing into a system, you want to see what appears in the monitor.

My next step is to add hardware that can capture HDMI output so I can embed it in the page. That way, I'll be able to plug my Pi into a headless server to create a virtual console in the browser. It will essentially be a low-cost, hackable [KVM over IP device](https://amzn.to/2ZVT51k).

I have a working prototype using [ffplay](https://ffmpeg.org/ffplay.html) and an [HDMI extender device](https://amzn.to/3cxrYfI), but I'm still working on a solution that puts everything in a single browser window.

{{<img src="ffplay-key-mime-pi.jpg" alt="Screenshot of Key Mime Pi showing the remote machine's screen" caption="I can view the remote machine's monitor output using an [HDMI extender device](https://amzn.to/3cxrYfI), but I'm still working on integrating everything into the browser.">}}

## Want a pre-configured kit?

When I get in-browser display working, I'm considering selling pre-configured kits for around $170. I'll publish instructions here for constructing your own, but if you'd like a pre-made kit, sign up for my notification list here:

* [Raspberry Pi KVM Interest List](https://tinyletter.com/kvmpi-interest)

## Source code

Key Mime Pi's code is fully open source under the permissive [MIT license](https://opensource.org/licenses/MIT):

* [key-mime-pi](https://github.com/mtlynch/key-mime-pi.git): Web server that forwards keystrokes to the Pi's virtual keyboard.
* [ansible-role-key-mime-pi](https://github.com/mtlynch/ansible-role-key-mime-pi): The Ansible role for configuring the Pi's USB gadget functionality and for installing the web server as a systemd service.

## Acknowledgements

* [raspberrypisig/pizero-usb-hid-keyboard](https://github.com/raspberrypisig/pizero-usb-hid-keyboard) was the first sample code I found that successfully installed the virtual USB HID device on my Pi.
* [Fmstrat/diy-ipmi](https://github.com/Fmstrat/diy-ipmi) was an inspiration for this project and proved that it was possible to make a Pi function as a KVM over IP device.
* [Rafael Medina](https://www.rmedgar.com/blog/using-rpi-zero-as-keyboard-send-reports) provided the most readable explanation of the HID protocol I found.
* Thanks, of course, to the Linux and Raspberry Pi OS developers who made USB gadget functionality possible.