---
title: "Key Mime Pi: Turn Your Raspberry Pi into a Remote Keyboard"
date: "2020-06-21T00:00:00Z"
tags:
- raspberry pi
- python
description: TODO
---
One of the interesting features of recent Raspberry Pi models is that they support USB on-the-go (USB OTG). That means that things that used to only be accessible to the kernel are now possible in user mode. It's supported on Raspberry Pi 4 and later as well as Pi Zero W and later. This means that the Pi can impersonate USB devices such as keyboards, thumbdrives, and microphones.

## Demo

TODO: Show video demo

## What you'll need

* A Raspberry Pi that supports USB OTG:
  * Raspberry Pi 4 (all variants)
  * Raspberry Pi Zero W
  * Raspberry Pi A and A+ *(verification needed)*
    * [This source](https://raspberrypi.stackexchange.com/a/73911) claims that early Pis support USB OTG, but I have not tested these devices personally.
* Raspbian OS 10 (Buster) with SSH enabled
* A USB cable
  * For the Pi 4: USB-C to USB-A (Male/Male)
  * For the Pi Zero W: microUSB to USB-A (Male/Male)
* Alternate power source (optional)
  * You can omit it for this tutorial, but your Pi will be more stable with proper power.
  * TODO

## Connecting your Pi

Connect the USB-A end of your USB cable into the device that will receive keyboard input. If you don't have a separate power source, USB 3.0 provides more power, but USB 2.0 ports work in my tests as well.

TODO: Photos

If the USB port can't sufficiently power your Pi, jump to [Solving the power problem](#solving-the-power-problem).

## Preparing your Pi

You have two options for installing it. You can do it using plain old bash, which requires no external

### Option 1: The pure bash way

```bash
# SSH into your Pi
PI_HOSTNAME="raspberrypi" # Change to your pi's hostname
PI_SSH_USERNAME="pi"      # Change to your Pi username
ssh "${PI_SSH_USERNAME}@${PI_HOSTNAME}"

# Install Key Mime Pi
git clone https://github.com/mtlynch/key-mime-pi.git
cd key-mime-pi
sudo ./enable-usb-hid
python3 -m venv venv
. venv/bin/activate
pip install --requirement requirements.txt
PORT=8000 ./app/main.py
```

This starts a Key Mime Pi web server at:

* [http://raspberrypi:8000/](http://raspberrypi:8000/)

TODO: Do they have to restart?

### Option 2: The Ansible way

If you're an Ansible user, you can use my [Key Mime Pi Ansible role](https://galaxy.ansible.com/mtlynch/keymimepi) for a bit more of an elegant installation.

```bash
PI_HOSTNAME="raspberrypi" # Change to your pi's hostname

# Install the Key Mime Pi Ansible role
ansible-galaxy install mtlynch.keymimepi

# Create a minimal Ansible playbook to configure your Pi
echo "- hosts: $PI_HOSTNAME
  roles:
    - role: mtlynch.keymimepi" > install.yml

ansible-playbook --inventory "$PI_HOSTNAME", install.yml
```

This installs Key Mime Pi on your device as a service. When the playbook is complete, Key Mime Pi will appear at:

* [http://raspberrypi:8000/](http://raspberrypi:8000/)

## Verifying the driver is working

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

## Using Key Mime Pi

After you run the install script, you should be able to access the Key Mime Pi web interface from your browser:

* [http://raspberrypi:8000](http://raspberrypi:8000)

Of course, change the URL based on whatever your Pi's hostname is.

## How it works

### USB device emulation

The real magic here comes from [Linux's USB Human Interface Device (HID) gadget driver](https://www.kernel.org/doc/html/latest/usb/gadget_hid.html). It allows regular, user-mode software applications to interact with the operating system as if they were real USB devices.

The [key-mime-pi configuration script](https://github.com/mtlynch/ansible-role-key-mime-pi/blob/master/files/enable-rpi-hid) creates a file path at `/dev/hidg0`, which any application can read or write to and the OS treats it the same way it would signals to and from a physical keyboard.

There are other projects that use the Raspberry Pi to emulate a keyboard, but most of them build on top of Linux's [USB HID sample application](https://www.kernel.org/doc/html/latest/usb/gadget_hid.html). It's 250 lines of C++ and not very extensible. But that application is unnecessary if you understand how to read and write from `/dev/hidg0`.

>TODO: Quote from *Coders at Work* where the guy talks about skipping the library and looking at the interfaces

The reads and writes to the interface are based on the [USB HID spec](https://www.usb.org/sites/default/files/documents/hid1_11.pdf), but that's a 97-page document, and it's quite dry and convoluted. Rafael Medina did an excellent job of [summarizing this protocol](https://www.rmedgar.com/blog/using-rpi-zero-as-keyboard-send-reports) in human-readable terms.

The keyboard part of the spec is extremely simple. Keyboards send 8 byte messages called "reports" upon each keystroke.

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

This means you can send up to 6 keystrokes in a single message as long as they're distinct keys:

```bash
echo -ne "\0\0\x1a\x0b\x04\x17\x18\x13" > /dev/hidg0 && \
  echo -ne "\0\0\0\0\0\0\0\0" > /dev/hidg0
```

```
whatup
```

These messages indicate you've pressed the keys, but you also have to indicate when you release the keys. You do that by sending a message where all the key bytes are zero.

For Key Mime Pi, I only emulate one keystroke at a time, so it's as simple as zeroing an 8-byte block and setting bytes 0 and 2.

### Translating from JavaScript to HID

When you type in the browser, JavaScript generates key events for each keystroke. To emulate keystrokes in the Pi, you need to generate HID codes in the browser. HID codes are distinct from JavaScript's codes, but there's essentially a 1:1 mapping between the two, so translating between the two is simply a matter of mapping 200 key codes from JavaScript to USB HID.

I just have a [lookup table](https://github.com/mtlynch/key-mime-pi/blob/904e56b6bf1f76da1abb85f654637da0e3c35fa3/app/js_to_hid.py#L32) like this:

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

## Solving the power problem

The only port on the Pi that supports USB OTG is the power port, but standard USB 2.0 and USB 3.0 ports don't provide enough power to meet the Pi's requirements.

| Raspberry Pi Model | Power requirements |
| ------------------ | ------------------ |
| Pi Zero W          | 5 V / 1.2 A        |
| Pi 4               | 5 V / 3.0 A        |

Regular USB ports produce less energy than that:

| PC output port     | Power output       |
|--------------------|--------------------|
| USB 2.0            | 5 V / 0.5 A        |
| USB 3.0            | 5 V / 0.9 A        |

In my tests, the Pi works even when underpowered, but the system log included under-voltage warnings:

```bash
 $ sudo journalctl -xe | grep "Under-voltage"
Jun 05 03:46:05 pikvm kernel: Under-voltage detected! (0x00050005)
Jun 05 03:48:29 pikvm kernel: Under-voltage detected! (0x00050005)
Jun 05 03:54:22 pikvm kernel: Under-voltage detected! (0x00050005)
Jun 05 04:06:16 pikvm kernel: Under-voltage detected! (0x00050005)
```

TODO: Explain solution

I solved this by purchasing the [Zero2Go Omini – Multi-Channel Power Supply](https://www.adafruit.com/product/4114). Pis also accept power through their GPIO pins, and the Zero2Go Omini connects to GPIO and accepts power from a microUSB cable. It's essentially a microUSB to  . This is a bummer because at $20

{{<notice type="info">}}
**Note**: This feels like overkill, but I haven't found a better solution. If anyone knows of a cheaper device that allows you to power the Pi through the GPIO pins, please let me know in the comments.
{{</notice>}}

## Next step: embedding display output

Remote typing is fun, but it's a bit impractical. Generally when you're typing into a system, you want to see what appears in the monitor.

My next step is to add hardware that can capture HDMI output so I can embed it in the page. That way, I'll be able to plug my Pi and a capture device into a headless server and have a virtual console in the browser. It will essentially be a low-cost, hackable [KVM over IP device](https://amzn.to/2ZVT51k).

I have a working prototype using [ffplay](https://ffmpeg.org/ffplay.html) and an [HDMI extender device](https://amzn.to/3cxrYfI), but I'm still working on a solution that puts everything in a single browser window.

TODO: Demo of ffplay version

## Want a pre-configured kit?

When I get in-browser display working, I'm considering selling pre-configured kits for around $180. I'll publish instructions here for constructing your own, but if you'd like a pre-made kit, sign up for my notification list here:

* [Raspberry Pi KVM Interest List](https://tinyletter.com/kvmpi-interest)

## Source code

Key Mime Pi's code is fully open source under the permissive [MIT license](https://opensource.org/licenses/MIT):

* [key-mime-pi](https://github.com/mtlynch/key-mime-pi.git): Web server that forwards keystrokes to the Pi's virtual keyboard.
* [ansible-role-key-mime-pi](https://github.com/mtlynch/ansible-role-key-mime-pi): The Ansible role for configuring the Pi's USB gadget functionality and for installing the web server as a systemd service.

## Acknowledgements

* [raspberrypisig/pizero-usb-hid-keyboard](https://github.com/raspberrypisig/pizero-usb-hid-keyboard) was the first sample code I found that successfully installed the virtual USB HID device on my Pi.
* [Fmstrat/diy-ipmi](https://github.com/Fmstrat/diy-ipmi) was an inspiration for this project and proved that it was possible to make a Pi function as a KVM over IP device.
* [Rafael Medina](https://www.rmedgar.com/blog/using-rpi-zero-as-keyboard-send-reports) provided the most readable explanation of the HID protocol I found.
* The Linux developers who added USB HID functionality