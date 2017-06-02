---
title: GreenPiThumb
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
excerpt: Using Raspberry Pi to water plants automatically
tags:
- raspberry pi
- greenpithumb
- gardening
---

{% include base_path %}

# Introducing GreenPiThumb
GreenPiThumb is a self-watering plant. It's a 

My friend Jeet and I built a self-watering plant. There are many self-watering plants already out there, but this one is ours.

# Background

The [Raspberry Pi](https://www.raspberrypi.org/products/) is a small, inexpensive computer built for hobbyists. I've been using them as miniature servers, less because it's actually practical and more because it's fun to have a bunch of tiny servers doing stuff.

I'm a software guy, so I never explored the Pi as anything except a little server to run software. For most of the Pi enthusiast community, one of its primary functions is that it integrates well with hobbyist electronics. People use Pis to build (TODO: mention cool stuff people have built).

My apartment could use a plant, but I'm kind of lazy and didn't want to make the effort of watering it myself. I decided it would be much easier to spend several hundred hours to automate the process. I think if the plant lives to be 80 years old, I come out ahead.

# Why make another Pi-powered gardening bot?

We're certainly not the first people to think of building a Pi-powered gardening bot. Two cool projects that preceded us are [PiPlanter](http://www.esologic.com/?p=1112) and [Plant Friends](http://dicksonchow.com/plant-friends/), but there have been a handful of others as well.

We decided to build our own because a) it's fun to make your own stuff and b) we wanted to make a project that treated the software portion as a first class citizen. The majority of Pi hardware projects are from enthusiasts who are great with electronics, but don't have professional software development experience. We wanted to be the opposite - the project that's got great software, but the hardware barely works and sometimes gets so hot that it melts the breadboard.

In particular, GreenPiThumb features:

* Full unit tests
* Code coverage tracking
* Continuous integration
* Diagnostic logging
* Thorough documentation (both READMEs and code comments)
* Consistent adherence to [a defined style guide](https://google.github.io/styleguide/pyguide.html)
* [An installer tool](https://github.com/JeetShetty/ansible-role-greenpithumb)

# Equipment

Many of these are commodity parts, so you can swap in a different item that does the same thing, but these are components that we used.

## GreenPiThumb Essentials

| Item | Cost |
|------|------|
| [Raspberry PI 3 Model B A1.2GHz 64-bit quad-core ARMv8 CPU, 1GB RAM](http://amzn.to/2nTReZk) | $38.00 |
| [Kingston 16 GB Class 4 MicroSDHC Flash Card with SD Adapter SDC4/16GB](http://amzn.to/2nTHVZs) | $5.99 |
| [Raspberry Pi Camera Module V2 - 8 Megapixel,1080p](http://amzn.to/2oEVomw) | $28.89 |
| [Adafruit MCP3008 8-Channel 10-Bit ADC With SPI Interface for Raspberry Pi](http://amzn.to/2poV4tn) | $6.22 |
| [Busboard Protot SB400 Solderable PC Breadboard 1 Sided PCB Matches 400 Tie-Point Breadboards with Power Rails](http://amzn.to/2nTDOfF) | $5.90 |
| [Coolerguys 100-240v AC to 12 & 5v DC 4pin Molex 2A Power Adapter](http://amzn.to/2oET4vC) | $15.00 |
| [SODIAL(R)20PCS Photoresistor GL5528 LDR Photo Resistors Light-Dependent](http://amzn.to/2oCFlUO) | $1.72 |
| [StarTech 6in 4 Pin Molex to SATA Power Cable Adapter](http://amzn.to/2ohoJ3O) | $2.75 |
| [Seaflo 12v Water Pressure Diaphragm Pump 3.8 LPM 1.0 GPM 40 PSI - Caravan/rv/boat/marine](http://amzn.to/2p90wk8) | $29.99 |
| [uxcell Sensitivity Control Temperature Humidity Sensor 20-90%RH](http://amzn.to/2p9iHXa) | $2.13 |
| [Soil Moisture Sensor](https://www.sparkfun.com/products/13322) | $4.99 |
| [White SiliconeTubing, 3/8"ID, 1/2"OD, 1/16" Wall, 10' Length](http://amzn.to/2oho2aL) | $10.99 |

## Plant stuff

* Planter
* Rubber glove (for water spray)
* Soil
* Seeds

## Electronics Components

These are electronics components that we purchased to build the Pi, but these are common components one would use

* Soldering Iron
* Wiring
* Pack of Resistors
* Wire strippers
* Solder sealant things (TODO: look up real name)
* Solder
* Jumper wires (male-male, male-female, female-female)
* Solderless breadboard (for prototyping)
* Long wire (TODO: Look up real name of this)
* Multimeter

## Optional Components

| Item | Cost | Notes |
|------|------|-------|
| [SharkBite U701 PEX Tubing Cutter, 1/4-Inch, 3/8-Inch, 1/2-Inch, 3/4-Inch and 1-Inch](http://amzn.to/2olsG6N) | $20.99 | Makes it far easier to make clean cuts to the tubing. |
| [Tree Stand or Rail Hunting Bendy Mount for Camera, VideoCam, Camcorder](http://amzn.to/2oCsaD8) | $29.95 | Useful |
| Pi Camera Mount | - | - |
| Pi Camera Extension Cable | - | - |
| Soldering third arm | - | - |


# The nuts 'n bolts
## Hardware

{% capture fig_img %}
[![GreenPiThumb wiring diagram](https://raw.githubusercontent.com/JeetShetty/GreenPiThumb/master/doc/greenpithumb_wiring.png)](https://raw.githubusercontent.com/JeetShetty/GreenPiThumb/master/doc/greenpithumb_wiring.png)
{% endcapture %}

{% capture fig_caption %}
GreenPiThumb wiring diagram ([downloadable file](https://github.com/JeetShetty/GreenPiThumb/tree/master/doc)).
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>{{ fig_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>

## Software

![GreenPiThumb Software Architecture](https://docs.google.com/drawings/d/1vY9YU9fFoyrKUh8pRe6gN0bLD1JFDq5ngkTh7yOQrOA/export/png)

### GreenPiThumb backend

The [backend](https://github.com/JeetShetty/Greenpithumb) does the real heavy lifting. It's responsible for:

* Managing the physical sensors (soil moisture level, temperature, etc.)
* Turning the water pump on and off
* Recording events and sensor readings in the database

### GreenPiThumb web API

The [web API](https://github.com/JeetShetty/GreenPiThumb_Frontend) is a thin HTTP API for retrieving information about GreenPiThumb's state. The web dashboard (below) uses this API to retrieve sensor readings and camera image information.

### GreenPiThumb web dashboard

The [web dashboard](https://github.com/JeetShetty/GreenPiThumb_Frontend_static) is a client-side AngularJS web application that shows GreenPiThumb's state and history.

Our Pi isn't quite up to the challenge of acting as an internet-facing web server, but here's a [a static mirror](http://greenpithumb.mtlynch.io) of the GreenPiThumb dashboard.

TODO: Add picture of dashboard

### Deployment

To provision GreenPiThumb on our Pi device, we created a [custom configuration](https://github.com/JeetShetty/ansible-role-greenpithumb) for [Ansible](https://www.ansible.com/how-ansible-works), an excellent IT automation tool. It lets us take a Pi device with a bare OS and install all of our components and all of the software dependencies we need.

# Bumps along the way

## Electronics: how do they work?


## Distributing water

One thing the other Pi plant build tutorials don't discuss is how to actually distribute the water to all of your soil. The first time I pumped water, 

## I think my dirt is broken

## The gardening part wasn't supposed to be hard

Oh no our plants died

# The final product

* TODO: Add pictures
* TODO: Add timelapse links

The timelapses have been the most fun part of this process.

<div style="width:100%;height:0px;position:relative;padding-bottom:75.000%;"><iframe src="https://streamable.com/s/vq0gt/viuhfk" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>

# Lessons learned

## Nothing is as simple as it seems

I thought this would be a relatively straightforward 2-3 month project, but it took over a year to complete.

## Hardware testing needs as much rigor as software testing

Many of the stalls in this project were due to problems in the physical hardware.

This was in large part due to our inexperience with electronics, but also because we didn't approach the hardware with the same rigor we approached the software.

### Test in isolation

Our initial strategy for finding out if our physical sensors were working was to code up a basic version of the backend software that took readings from all sensors, then wire up all the sensors on a breadboard, then run the software and see what it produces.

Nothing. It produces nothing because that is a terrible strategy. It introduced way too many variables into the experiment. Was the problem hardware or software? Which sensor had the problem? Over time, we learned to test our sensors in isolation. We created standalone [diagnostic scripts](https://github.com/JeetShetty/ansible-role-greenpithumb/tree/master/files) for each component. Every time we tweak the hardware now, the first thing we do is run through the diagnostic scripts to verify that we're getting sane readings.

### A multimeter is worth its weight in gold

An inexpensive multimeter (todo: link) proved to be a very valuable tool in testing assumptions about the wiring when components failed.

## Invest in good electronics tools

We mentioned the multimeter, but our experience got significantly better as we invested in better tooling.

For long time, we were very resistant to buy electronics equipment that we might not use beyond this project.

# Acknowledgments

Big thanks to those who helped us with this project:

* [Devon Bray](https://twitter.com/eso_logic)
  * His project, [PiPlanter 2](http://www.esologic.com/?page_id=1042) heavily inspired the hardware aspects of GreenPiThumb
* [Dickson Chow](http://dicksonchow.com)
  * His project, [Plant Friends](http://dicksonchow.com/plant-friends-mkii/) was a helpful hardware reference as well, and he provided lots of encouragement throughout the project.
* The [/r/raspberry_pi](https://www.reddit.com/r/raspberry_pi) reddit community
  * For [their help](https://www.reddit.com/r/raspberry_pi/comments/5i856z/help_turning_on_a_12v_water_pump_with_a_pi/) when we got stuck with wiring issues