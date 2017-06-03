---
title: 'GreenPiThumb: A Pi-Powered Gardening Bot'
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
GreenPiThumb is a gardening bot that waters a houseplant and monitors its growth.

TODO: Photo of system

GreenPiThumb monitors the moisture level of the soil to determine when the plant needs to be watered. GreenPiThumb also monitors the temperature and humidity of the air and the level of light the plant is receiving. As the plant grows, GreenPiThumb takes photos at regular intervals, which you can use to make cool timelapses (TODO: link).

# Powered by Raspberry Pi

The [Raspberry Pi](https://www.raspberrypi.org/products/) is a small, inexpensive computer built for hobbyists. For the past few years, I've been playing with Pis as miniature servers. Not so much because it's actually practical, but more because the idea of tiny servers is fun.

I'm a software guy, so I never explored the Pi beyond using it to run applications. For most of the Pi enthusiast community, the main draw of the Pi is how well it integrates with hobbyist electronics. People use Pis to build (TODO: mention cool stuff people have built).

# Why GreenPiThumb?

My apartment could use a plant, but I'm kind of lazy and didn't want to make the effort of watering a plant myself. I decided it would be much easier to spend several hundred hours building a gardening robot to do it for me. I think if the plant lives to be 80 years old, I come out slightly ahead.

TODO: Insert xkcd should I automate matrix with an arrow showing where GreenPiThumb falls

Like many of my software projects, my main motivation was to learn new technologies. My previous project, ProsperBot, was an opportunity for me to learn Go, Ansible, and Redis. I saw GreenPiThumb as an opportunity for me to learn frontend development, specifically JavaScript and AngularJS. It was also a good way to learn more about the electronics side of Raspberry Pi and finally figure out what all the GPIO pins do (TODO: reword). For Jeet, who had just started learning to program when the project began, it was an opportunity to learn about effective Python programming and software engineering practices like code reviews, unit tests, and continuous integration.

# Why make another Pi-powered gardening bot?

We're certainly not the first people to think of building a Pi-powered gardening bot. Two cool projects that preceded us are [PiPlanter](http://www.esologic.com/?p=1112) and [Plant Friends](http://dicksonchow.com/plant-friends/), but there have been a handful of others as well.

We decided to build our own because a) it's fun to make our own stuff and b) we wanted to make a project that treated the software portion as a first class citizen.

The majority of Pi hardware projects are from enthusiasts who are great with electronics, but don't have professional software development experience. We wanted to be the opposite - the project that's got great software, but the hardware barely works and sometimes gets so hot that it melts our breadboard.

In particular, GreenPiThumb features:

* Full unit tests
* Code coverage tracking
* Continuous integration
* Diagnostic logging
* Thorough documentation (both READMEs and code comments)
* Consistent adherence to [a defined style guide](https://google.github.io/styleguide/pyguide.html)
* [An installer tool](https://github.com/JeetShetty/ansible-role-greenpithumb)

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

TODO: Describe the important compoents

## Software

![GreenPiThumb Software Architecture](https://docs.google.com/drawings/d/1vY9YU9fFoyrKUh8pRe6gN0bLD1JFDq5ngkTh7yOQrOA/export/png)

### GreenPiThumb backend

The [backend](https://github.com/JeetShetty/Greenpithumb) does the real heavy lifting. It's responsible for:

* Managing the physical sensors (soil moisture level, temperature, etc.)
* Turning the water pump on and off
* Recording events and sensor readings in the database

### GreenPiThumb web API

The [web API](https://github.com/JeetShetty/GreenPiThumb_Frontend) is a thin HTTP API for retrieving information about GreenPiThumb's state. It is essentially a thin wrapper over the database that translates everything into JSON. The web dashboard (below) uses this API to retrieve all the information about GreenPiThumb's state so that it can present it to the user in a human-friendly way.

### GreenPiThumb web dashboard

The [web dashboard](https://github.com/JeetShetty/GreenPiThumb_Frontend_static) is a client-side AngularJS web application that shows GreenPiThumb's current state and creates graphs of sensor readings over time.

TODO: Add picture of dashboard

Our Pi isn't quite up to the challenge of acting as an internet-facing web server, but here's a [a static mirror](http://greenpithumb.mtlynch.io) of the GreenPiThumb dashboard that you can play with.

### Deployment

To provision GreenPiThumb on our Pi device, we created a [custom configuration](https://github.com/JeetShetty/ansible-role-greenpithumb) for [Ansible](https://www.ansible.com/how-ansible-works), an IT automation tool. This provisioning tool downloads and installs GreenPiThumb's backend and frontend components, as well as all of its dependencies. With just a few commands, you can use this tool on a Pi device with a bare OS and have GreenPiThumb up and running.

# Parts list

The tables below show the equipment we used to build GreenPiThumb. Many of these are commodity parts, so you can swap in a different item that does the same thing.

## GreenPiThumb Essentials

| Item | Cost |
|------|------|
| [Raspberry Pi 3 Model B](http://amzn.to/2nTReZk) | $36.00 |
| [Seaflo 12V Water Pump](http://amzn.to/2p90wk8) | $29.99 |
| [Raspberry Pi Camera V2 - 8  MP](http://amzn.to/2oEVomw) | $28.89 |
| [Coolerguys 100-240v AC to 12 & 5v DC 4pin Molex 2A Power Adapter](http://amzn.to/2oET4vC) | $15.00 |
| [Silicone Tubing](http://amzn.to/2oho2aL) | $10.99 |
| [DHT11 Temperature and Humidity Sensor](http://amzn.to/2rDgFie) | $6.99 |
| [Adafruit MCP3008 ADC](http://amzn.to/2poV4tn) | $6.22 |
| [MicroSD Card (16 GB)](http://amzn.to/2nTHVZs) | $5.99 |
| [Solderable PC Breadboard (400 Tie-Point)](http://amzn.to/2nTDOfF) | $5.90 |
| [Soil Moisture Sensor](https://www.sparkfun.com/products/13322) | $4.99 |
| [Molex to SATA Power Cable Adapter](http://amzn.to/2ohoJ3O) | $2.75 |
| [Light Dependent Photoresistor](http://amzn.to/2oCFlUO) | $1.72 |

## Plant stuff

* Planter
* Rubber glove (for water spray)
* Soil
* Seeds

## Common electronics components

The items below are generic electronics tools and components that last multiple projects, but we had to buy them because we had zero electronics equipment, so we're including them here for completeness:

| Item | Cost |
|------|------|
| [Soldering stand](http://amzn.to/2qLx2Gc) | $7.04 |
| [Soldering Iron](http://amzn.to/2qLi3wa) | $16.99 |

* Wiring
* Pack of Resistors
* Wire strippers
* Solder sealant things (TODO: look up real name)
* Solder
* Jumper wires (male-male, male-female, female-female)
* [Solderless breadboard, 830 tie-points](http://amzn.to/2rQH4dh) (for prototyping)
* Long wire (TODO: Look up real name of this)

## Optional Components

The components below are not strictly necessary and have cheaper alternatives, but we found they made the process much easier, so they were worth their cost to us.

| Item | Cost | Notes |
|------|------|-------|
| [AstroAI Digital Multimeter](http://amzn.to/2s4VNkw) |  $12.99 | We *highly* recommend you buy a basic multimeter (there's nothing special about this particular one). We waited far too long to purchase a multimeter. Once we got one, we could debug electronics issues much more quickly and systematically. |
| [SharkBite U701 PEX Tubing Cutter](http://amzn.to/2olsG6N) | $20.99 | Makes it far easier to make clean cuts to the water tubing. |
| [MFX2 Bendy Camera Mount](http://amzn.to/2oCsaD8) | $29.95 | Great for holding the camera. Long and flexible enough to give you lots of options for finding a good angle and distance. |
| [Pi Camera Mount](http://amzn.to/2rDwLbY) | $8.45 | Allows you to attach the Pi camera to a standard 1/4" camera mount, such as the MFX2 mount above. |
| [Pi Camera Extension Cable (1m)](http://amzn.to/2rQMEfR) | $8.44 | Necessary for attaching the Pi camera to larger mounts, such as the MFX 2 mount above. |
| [Helping Hands Third Hand Soldering Tool](http://amzn.to/2rDucqm) | $44.95 | - |


# Bumps along the way

This project took over a year to complete because we ran into a lot of roadblocks that would get us stuck for weeks at a time.

## Electronics: how do they work?

My only knowledge of electronics is based on faint memories of physics in high school. Jeet studied electrical engineering, so I figured he would just know everything, but his focus of study wasn't quite hobbyist electronics and his memory is hazy as well.

I bought the Arduino starter kit.

## Distributing water

I haven't seen any of the other Pi plant build tutorials discuss distributing the water to all of your soil. The first time we pumped water, it just dumped into one spot, completely soaking that area but leaving the rest of the soil dry. We considered coiling the rubber tubing around the circumference of the pot and poking holes distributed along the tubing, but we thought that would fail to reach the center. We also toyed with the idea of using a showerhead, but the we couldn't think of a way to fasten it to the tubing in a way that is both water-tight and gives us control of the direction.

The solution we finally settled on is "spray and pray." It is a solution borne out of looking around my apartment for items that might solve this problem. We cut a finger off of [a small kitchen glove](http://amzn.to/2rQVES9), fastened it to the water tube with a tightly doubled rubber band, and made lots of holes in the underside of the glove rubber using both a sewing needle and fingernail clippers. We turned the pump on and the severed finger of the glove immediately launched off the water tube, spraying my wall in the process. We reattached everything, but this time, we drove a safety pin through the water tube just in front of the rubber bands so that they can't slide forward.

It's not the most *elegant* solution, but it works.

<div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;"><iframe src="https://streamable.com/s/xjqmj/wfilnx" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>

## I think my dirt is broken



## The gardening part wasn't supposed to be hard

We accidentally made this plant snuff film.

<div style="width:100%;height:0px;position:relative;padding-bottom:75.000%;"><iframe src="https://streamable.com/s/4ds28/hlxbxg" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>

# The final product

* TODO: Add pictures
* TODO: Add timelapse links

The timelapses have been the most fun part of this process.

<div style="width:100%;height:0px;position:relative;padding-bottom:75.000%;"><iframe src="https://streamable.com/s/vq0gt/viuhfk" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>

# Lessons learned

## Nothing is as simple as it seems

I thought this would be a relatively straightforward 2-3 month project, but it took over a year to complete. It's a lesson I learned [long ago](https://www.joelonsoftware.com/2002/03/04/nothing-is-as-simple-as-it-seems/) from software essayist extraordinaire Joel Spolsky, and it's a lesson I expect that I'll learn again on many software projects to come.

## Hardware testing needs as much rigor as software testing

Many of the stalls in this project were due to problems in the physical hardware.

This was in large part due to our inexperience with electronics, but also because we didn't approach the hardware with the same rigor we approached the software.

### Test in isolation

Our initial strategy for finding out if our physical sensors were working was to code up a basic version of the backend software that took readings from all sensors, then wire up all the sensors on a breadboard, then run the software and see what it produces.

Nothing. It produces nothing because that is a terrible strategy. It introduced way too many variables into the experiment. Was the problem hardware or software? Which sensor had the problem? Over time, we learned to test our sensors in isolation. We created standalone [diagnostic scripts](https://github.com/JeetShetty/ansible-role-greenpithumb/tree/master/files) for each component. Every time we tweak the hardware now, the first thing we do is run through the diagnostic scripts to verify that we're getting sane readings.

## Invest in good tools

We mentioned the multimeter, but our experience got significantly better as we invested in better tooling.

For long time, we were very resistant to buy electronics equipment that we might not use beyond this project.

An inexpensive multimeter (todo: link) proved to be a very valuable tool in testing assumptions about the wiring when components failed.

# Acknowledgments

Big thanks to those who helped us with this project:

* [Devon Bray](https://twitter.com/eso_logic)
  * His project, [PiPlanter 2](http://www.esologic.com/?page_id=1042) heavily inspired the hardware aspects of GreenPiThumb
* [Dickson Chow](http://dicksonchow.com)
  * His project, [Plant Friends](http://dicksonchow.com/plant-friends-mkii/) was a helpful hardware reference as well, and he provided lots of encouragement throughout the project.
* The [/r/raspberry_pi](https://www.reddit.com/r/raspberry_pi) reddit community
  * For [their help](https://www.reddit.com/r/raspberry_pi/comments/5i856z/help_turning_on_a_12v_water_pump_with_a_pi/) when we got stuck with wiring issues