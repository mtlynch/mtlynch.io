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
* A USB cable
  * For the Pi 4: USB-C to USB-A (Male/Male)
  * For the Pi Zero W: microUSB to USB-A (Male/Male)
* An Ethernet cable or a USB WiFi adapter
* A MicroSD card with Raspbian OS (TODO version) or later and SSH enabled

## Connecting your Pi

Connect the USB-A end of your USB cable into the device that will receive keyboard input. Plug the other end into your Pi's power port.

TODO: Photos

Your Pi Zero should run without any issues, but some USB outlets output too little energy to support a Raspberry Pi 4. See the troubleshooting steps below. TODO: link

## Preparing your Pi

You have two options for installing it. You can do it using plain old bash, which requires no external

### Option 1: The pure bash way

```bash
# SSH into your Pi
PI_HOSTNAME="raspberrypi" # Change to your pi's hostname
PI_SSH_USERNAME="pi"      # Change to your Pi username
ssh "${PI_SSH_USERNAME}@${PI_HOSTNAME}"

# Install Key Mime Pi
INSTALL_SCRIPT="TODO"
curl -sSL "$INSTALL_SCRIPT" | sudo bash -
```

TODO: Do they have to restart?

### Option 2: The Ansible way

If you're an Ansible user, you can use my [Key Mime Pi Ansible role](https://galaxy.ansible.com/mtlynch/keymimepi):

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

Rafael Medina did an excellent job of [explaining this interface](https://www.rmedgar.com/blog/using-rpi-zero-as-keyboard-send-reports).

### Translating from JavaScript to HID

When you type in the browser, JavaScript generates key events for each keystroke. To emulate keystrokes in the Pi, you need to generate HID codes in the browser. HID codes are distinct from JavaScript's codes, but there's essentially a 1:1 mapping between the two, so translating between the two is simply a matter of mapping 200 key codes from JavaScript to USB HID.

## Next step: embedding display output

Remote typing is fun, but it's a bit impractical. Generally when you're typing into a system, you want to see what appears in the monitor.

My next step is to add hardware that can capture HDMI output so I can embed it in the page. That way, I'll be able to plug my Pi and a capture device into a headless server and have a virtual console in the browser. It will essentially be a low-cost, hackable [KVM over IP device](https://amzn.to/2ZVT51k).

I have a working prototype using [ffplay](https://ffmpeg.org/ffplay.html) and an [HDMI extender device](https://amzn.to/3cxrYfI), but seamless browser integration needs a bit more work.

TODO: Demo of ffplay version

## Pre-configured kits

When I get in-browser display working, I'm considering selling pre-configured kits for around $180. I'll publish instructions here for constructing your own, but you're interested in a pre-made kit, sign up for my notification list here:

* [Raspberry Pi KVM Interest List](https://tinyletter.com/kvmpi-interest)

## Troubleshooting

### The USB port doesn't sufficiently power my Pi

You can buy the [Zero2Go Omini – Multi-Channel Power Supply](https://www.adafruit.com/product/4114).

{{<notice type="info">}}
**Note**: This feels like overkill, but I haven't found a better solution. If anyone knows of a cheaper device that allows you to power the Pi through the GPIO pins, please let me know in the comments.
{{</notice>}}

## Source code

Key Mime Pi's code is fully open source under the permissive [MIT license](https://opensource.org/licenses/MIT):

* [key-mime-pi](https://github.com/mtlynch/key-mime-pi.git): Web server that forwards keystrokes to the Pi's virtual keyboard.
* [ansible-role-key-mime-pi](https://github.com/mtlynch/ansible-role-key-mime-pi): The Ansible role for configuring the Pi's USB gadget functionality and for installing the web server as a systemd service.

## Acknowledgements

* [raspberrypisig/pizero-usb-hid-keyboard](https://github.com/raspberrypisig/pizero-usb-hid-keyboard): This was the first sample code I found that successfully installed the virtual USB HID device on my Pi.
* [Fmstrat/diy-ipmi](https://github.com/Fmstrat/diy-ipmi) was an inspiration for this project and proved that it was possible to make a Pi function as a KVM over IP device.
* [Rafael Medina](https://www.rmedgar.com/blog/using-rpi-zero-as-keyboard-send-reports) for providing the most readable explanation of the HID protocol I found.
* The Linux developers who added USB HID functionality