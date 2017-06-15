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

GreenPiThumb is a gardening bot for houseplants.

[![GreenPiThumb full system]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-side-full-sm.jpg)]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-side-full.jpg)

GreenPiThumb features:

* Live monitoring for soil moisture, air temperature, humidity, and light levels
* Cool [graphs]({{ base_path }}/images/2017-06-21-greenpithumb/ambient-light-1.png)
* A web dashboard
* Timed photographs at regular intervals so you can make neat timelapses (TODO: link)

# Powered by Raspberry Pi

GreenPiThumb runs on a [Raspberry Pi](https://www.raspberrypi.org/products/), a small, inexpensive computer built for hobbyists.

[![Raspberry Pi]({{ base_path }}/images/2017-06-21-greenpithumb/pi-in-hand.jpg)]({{ base_path }}/images/2017-06-21-greenpithumb/pi-in-hand.jpg)

For the past few years, I've been playing with Pis and using them as miniature servers. Not so much because they're practical for my needs, but mainly because I find tiny little servers fun.

I'm a software guy, so I never explored the Pi beyond running applications on it. For most of the enthusiast community, the Pi's main draw is how well the it integrates with hobbyist electronics. People have used Pis to [create futuristic smart mirrors](http://michaelteeuw.nl/post/84026273526/and-there-it-is-the-end-result-of-the-magic), [run old video games](https://retropie.org.uk/), and [drive electric skateboards](https://www.youtube.com/watch?v=2WLEur3M8Yk).

# Why GreenPiThumb?

My apartment could use a plant, but I'm lazy and didn't want to take the time to water a plant myself. I decided it would be much easier to spend several hundred hours building a gardening robot to do it for me. If my plant lives to be 80 years old, I come out slightly ahead.

Like many of my software projects, the main motivation was to learn new technologies. My previous app, [ProsperBot]({{ base_url }}/prosperbot/), was an opportunity for me to learn Go, Ansible, and Redis. I saw GreenPiThumb as a chance to learn frontend development, specifically JavaScript and AngularJS. It was also a good way to become familiar with the hardware side of Raspberry Pi and finally figure out what those "GPIO pins" actually do.

{% capture fig_img %}
[![MOSFET melting breadboard]({{ base_path }}/images/2017-06-21-greenpithumb/gpio-wha.png)]({{ base_path }}/images/2017-06-21-greenpithumb/gpio-wha.png)
{% endcapture %}

{% capture fig_caption %}
Raspberry Pi and its mysterious GPIO pins.
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>{{ fig_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>

My friend [Jeet](https://github.com/JeetShetty) had just started learning to program, so I proposed the project to him as a vehicle for learning about effective programming techniques and healthy software engineering practices like code reviews, unit tests, and continuous integration. Jeet was up for it, and we set off on what we *thought* would be a two or three month project.

# Why make another Pi-powered gardening bot?

We were certainly not the first people to think of building a Pi-powered gardening bot. Two cool projects that preceded us were [PiPlanter](http://www.esologic.com/?p=1112) and [Plant Friends](http://dicksonchow.com/plant-friends/), but there have been a handful of others as well.

We decided to build our own because a) it's fun to make our own stuff and b) we wanted to treat the bot's software as a first-class citizen.

The majority of Pi hardware projects are from enthusiasts who are great with electronics, but don't have professional software experience. We wanted to be the opposite - great software, but the hardware barely works and sometimes gets so hot that it melts our breadboard.


{% capture fig_img %}
[![GPIO pins]({{ base_path }}/images/2017-06-21-greenpithumb/melty-breadboard.jpg)]({{ base_path }}/images/2017-06-21-greenpithumb/melty-breadboard.jpg)
{% endcapture %}

{% capture fig_caption %}
An early prototype that likely had a "catching on fire" problem.
{% endcapture %}
 
<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>{{ fig_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>

The code for GreenPiThumb is completely open-source and features:

* Full unit tests
* Code coverage tracking
* Continuous integration
* Debug logging
* Thorough documentation (both READMEs and code comments)
* Consistent adherence to [a defined style guide](https://google.github.io/styleguide/pyguide.html)
* [An installer tool](https://github.com/JeetShetty/ansible-role-greenpithumb)

# Parts list

The tables below show the equipment we used to build GreenPiThumb. We're sharing the exact parts we used so that it's easy for you to follow our model, but many of these are commodity components that you can swap out for something functionally identical if you so choose.

## GreenPiThumb essentials

| Item | Cost |
|------|------|
| [Raspberry Pi 3 Model B](http://amzn.to/2nTReZk) | $35.81 |
| [12V water pump](http://amzn.to/2p90wk8) | $29.99 |
| [Raspberry Pi Camera V2 - 8  MP](http://amzn.to/2oEVomw) | $29.88 |
| [100-240v AC to 12 & 5v DC 4pin Molex 2A Power Adapter](http://amzn.to/2oET4vC) | $15.00 |
| [MicroSD card (32 GB)](http://amzn.to/2rgHcTC) | $12.99 |
| [Silicone tubing](http://amzn.to/2oho2aL) | $10.99 |
| [FQP30N06L  N-channel MOSFET](http://amzn.to/2rpHXZ4) | $10.99 |
| [Pi power supply](http://amzn.to/2rlAMh2) | $9.99 |
| [DHT11 temperature and humidity sensor](http://amzn.to/2rDgFie) | $6.99 |
| [MCP3008 analog-to-digital converter](http://amzn.to/2poV4tn) | $6.22 |
| [Solderable breadboard (400 tie-point)](http://amzn.to/2nTDOfF) | $5.90 |
| [Soil moisture sensor](https://www.sparkfun.com/products/13322) | $4.99 |
| [Rubber glove](http://amzn.to/2rQVES9) (it makes sense; you'll see) | $4.94 |
| [Molex to SATA power cable adapter](http://amzn.to/2ohoJ3O) | $2.75 |
| [Light dependent photoresistor](http://amzn.to/2oCFlUO) | $1.72 |
| 1 gallon platic water jug (for reservoir) | - |
| Safety pin | - |
| Rubber bands | - |

## Common electronics components

The items below are generic electronics tools and components that you can use for many projects. We had to buy them because we had zero electronics equipment, so we include them here for completeness:

| Item | Cost |
|------|------|
| ~~Netflix and chill wire~~ [Hook up wire](http://amzn.to/2rELX8y) | $20.00 |
| [Soldering Iron](http://amzn.to/2qLi3wa) | $16.99 |
| [Assorted resistors](http://amzn.to/2sCUINF) | $12.98 |
| [Wire stripper](http://amzn.to/2sqt5bw) | $8.92 |
| [Soldering stand](http://amzn.to/2qLx2Gc) | $7.04 |
| [Jumper wires](http://amzn.to/2rF93Mc) | $6.95 |
| [Heat shrink tubing](http://amzn.to/2rSdLXV) (to cover solder joints) | $6.38 |
| [Wire cutters](http://amzn.to/2srCW0s) | $4.97 |
| [Solderless breadboard, 830 tie-points](http://amzn.to/2rQH4dh) (for testing) | $2.60 |

## Gardening supplies

| Item | Cost |
|-------|-------|
| [10" planter pot](http://amzn.to/2qMosHd) |  $20.24 |
| [Potting mix](http://amzn.to/2rgOtxX) (soil) | $14.69 |
| [Kentucky Wonder bush bean seeds](http://amzn.to/2srEHuH) | $4.09 |

## Optional Components

The components below are not strictly necessary and have cheaper alternatives, but we found that they made the process of building GreenPiThumb much easier:

| Item | Notes | Cost |
|------|------|-------|
| [Third hand soldering tool](http://amzn.to/2rDucqm) | We started out with [this basic clamp stand](http://amzn.to/2rFZJrx), but it was awkward to position and adjust. The bendy model was several times more expensive, but it made the task of soldering much easier and more pleasant. | $44.95 |
| [Bendy camera mount](http://amzn.to/2oCsaD8) | Great for holding the camera. Long and flexible enough to give you lots of options for finding a good angle and range. | $29.95 |
| [PEX tubing cutter](http://amzn.to/2olsG6N) | Makes nice clean cuts to the water tubing. | $20.99 |
| [Digital multimeter](http://amzn.to/2s4VNkw) | We *highly* recommend you buy a basic multimeter. There's nothing special about this particular one, but it has served us well. |  $12.99 |
| [Pi camera mount](http://amzn.to/2rDwLbY) | Allows you to attach the Pi camera to a standard 1/4" camera mount, such as the bendy mount above. | $8.45 |
| [Pi camera extension cable (1m)](http://amzn.to/2rQMEfR) | Necessary for positioning the Pi camera far away from the Pi device itself. | $8.44 |
| [Zip ties](http://amzn.to/2qMoxe5) | For fastening tubing or wiring in place. | $5.19 |

# Hardware architecture

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

The Raspberry Pi can only read *digital* signals, so it's not capable of reading analog sensors directly. We use the [MCP3008 analog-to-digital converter](http://amzn.to/2poV4tn) to produce digital readings from the analog [soil moisture sensor](https://www.sparkfun.com/products/13322) and [light sensor](http://amzn.to/2oCFlUO).

The [DHT11 sensor](http://amzn.to/2rDgFie) detects temperature and humidity in the air. It produces a digital signal, so it can plug right in to the Pi.

Lastly, we have a [12V water pump](http://amzn.to/2p90wk8), but the Pi can only output 5V, so we connect a [12V power adapter](http://amzn.to/2oET4vC)  to the pump in series with a [MOSFET](http://amzn.to/2rpHXZ4). The Pi uses the MOSFET as a digital switch, breaking or completing the circuit when it wants to turn the pump off or on.

# Software architecture

{% capture fig_img %}
![GreenPiThumb software architecture](https://docs.google.com/drawings/d/1vY9YU9fFoyrKUh8pRe6gN0bLD1JFDq5ngkTh7yOQrOA/export/png)
{% endcapture %}

{% capture fig_caption %}
GreenPiThumb software architecture
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>{{ fig_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>

## GreenPiThumb backend

The [backend](https://github.com/JeetShetty/Greenpithumb) does the real heavy lifting of GreenPiThumb. It's responsible for:

* Managing the physical sensors (soil moisture, temperature, etc.)
* Turning the water pump on and off
* Recording events and sensor readings in the database

## GreenPiThumb web API

The [web API](https://github.com/JeetShetty/GreenPiThumb_Frontend) is an HTTP interface that serves information about GreenPiThumb's state and history. It's a thin wrapper over GreenPiThumb's database. It translates everything into JSON to make it easier for web applications to consume.

The web dashboard (below) uses this API to retrieve GreenPiThumb's state and present the information through the browser in a human-friendly way.

## GreenPiThumb web dashboard

The [web dashboard](https://github.com/JeetShetty/GreenPiThumb_Frontend_static) shows GreenPiThumb's current state and creates graphs of sensor readings over time.

[![GPIO pins]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-dashboard.png)]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-dashboard.png)

Our Pi isn't quite up to the challenge of acting as an internet-facing web server, but here's a [a static mirror](http://greenpithumb.mtlynch.io) of the GreenPiThumb dashboard that's identical to our local one.

## Deployment

To deploy GreenPiThumb to our Pi device, we use an open source IT automation tool called  [Ansible](https://www.ansible.com/how-ansible-works).

We created a custom [GreenPiThumb Ansible configuration](https://github.com/JeetShetty/ansible-role-greenpithumb) (or "role" in Ansible terms) for deploying all of the software GreenPiThumb needs. The Ansible role downloads and installs GreenPiThumb's backend and frontend code, as well as the third-party software components that GreenPiThumb depends on.

With just a few commands, you can use this tool on a fresh Pi device and have all of GreenPiThumb's software up and running within minutes.

# Bumps along the way

This project took over a year to complete. A lot of that time was due to roadblocks we ran into that would grind our progress to a halt for weeks at a time. Below, I've included the major issues we ran into.

## Water distribution

We haven't seen any of the other Pi gardening projects talk about how they spread out the water over the soil. This is a shame because we still haven't really figured it out.

The first time we pumped water into our planter, the tube directed a small jet of water into one spot, completely soaking that area but leaving the rest of the soil dry. We considered coiling the rubber tubing around the inner wall of the planter and poking holes in the tube, but we weren't sure if this would get enough water to the center part of the soil. We also toyed with the idea of using a showerhead, but couldn't figure out how to fasten it to the tubing in a way that was both water-tight and gave us control of the direction.

The solution we finally settled on was "spray and pray." It was a solution borne out of looking around my apartment and randomly picking up items that might solve our problem. We cut a finger off of [a small kitchen glove](http://amzn.to/2rQVES9), fastened it to the water tube with a tightly doubled rubber band, and made lots of holes in the underside of the glove using both a sewing needle and nail clippers.

The first time we tested this,  the severed finger of the glove shot off the water tube, spraying water all over my wall in the process. We reattached everything, but this time, we stuck a safety pin through the water tube just in front of the rubber bands so that they couldn't slide forward.

{% capture fig_img_a %}
[![Water sprayer (front)]({{ base_path }}/images/2017-06-21-greenpithumb/sprayer-front.jpg)]({{ base_path }}/images/2017-06-21-greenpithumb/sprayer-front.jpg)
{% endcapture %}

{% capture fig_img_b %}
[![Water sprayer (side)]({{ base_path }}/images/2017-06-21-greenpithumb/sprayer-side.jpg)]({{ base_path }}/images/2017-06-21-greenpithumb/sprayer-side.jpg)
{% endcapture %}

<figure class="half">
  {{ fig_img_a | markdownify | remove: "<p>" | remove: "</p>" }}
	{{ fig_img_b | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>Kitchen glove turned water distributor.</figcaption>
</figure>

It's not the most *elegant* solution, but it mostly works.

<div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;"><iframe src="https://streamable.com/s/xjqmj/wfilnx" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>

## The gardening part wasn't supposed to be hard

Electronics were supposed to be the big challenge of this project. Gardening didn't seem seem that hard. Green beans, in particular, are frequently described as a hardy plant that require only basic gardening skills to grow.

It turned out that we didn't have basic gardening skills. GreenPiThumb is intended to automate the human part of tending an indoor garden, but to automate anything, a human has to know what "correct" looks like. It was hard to decide whether GreenPiThumb was watering too much or too little when we ourselves had no idea how much water was correct. 

Experienced gardeners probably can draw hints from the plant or the soil to adjust their watering, but we weren't sure what a healthy green bean plant looked like. That's  how we ended up accidentally making this horticultural snuff film:

<figure>
<div style="width:100%;height:0px;position:relative;padding-bottom:75.000%;"><iframe src="https://streamable.com/s/4ds28/hlxbxg" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>
  <figcaption>Green bean plants, batch one: you will be missed.</figcaption>
</figure>

## I think my dirt is broken

Our most vexing problem was dirt.

TODO: Insert image of imagined moisture pattern.

When we set out to build GreenPiThumb, we expected that soil moisture would follow a simple pattern. When we watered the plant, the moisture level would go up. On days we didn't water the plant, the moisture level would go down. The moisture readings would decrease gradually each day as more water evaporated. GreenPiThumb's job would then be to maintain the correct soil moisture by adding water whenever the reading dropped below a certain threshold.

### Bad readings

Soil refused to cooperate with us. In our initial build, the soil moisture reading oscilatted from 95% to 100%, then slowly converged to ~99.5%. We took out the soil sensor and tried testing it against different media: air, water, a wet paper towel, our hands, totally dry soil. All of these things seemed to get sensible readings, but soil with any kind of moisture made the sensor shoot to nearly 100%.

{% capture fig_img %}
[![Soil moisture level]({{ base_path }}/images/2017-06-21-greenpithumb/v1-soil-moisture.png)]({{ base_path }}/images/2017-06-21-greenpithumb/v1-soil-moisture.png)
{% endcapture %}

{% capture fig_caption %}
Soil moisture readings, original moisture sensor.
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>{{ fig_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>

So we tried a new sensor. We were originally using Dickson Chow's [Plant Friends soil probe](http://dickson.bigcartel.com/product/soil-probe-for-plant-friends), so we swapped it out for the [SparkFun soil sensor](https://www.sparkfun.com/products/13322). The new sensor got a reading of 82% for our damp soil, and it would jump up to 85% for a few hours after the soil was freshly watered. Within a few hours, however, it would sink back down to 82% and remain there for days. The sensor seemed unable to distinguish between soil that was watered three hours ago and soil that hadn't been watered for five days.

### Tricky dirt

![Miracle-Gro soil]({{ base_path }}/images/2017-06-21-greenpithumb/miracle-gro.png){: .align-right}

Maybe it was the dirt's fault. Our potting soil was this [pre-packaged mix](http://amzn.to/2rchhfH) from Miracle-Gro that featured an "easy to water formula." A bit suspicious, no? Clearly this was evil, genetically engineered dirt that never dries. That's why our poor soil sensors were so confused.

We needed dirt that wouldn't play games with us, so we purchased this [organic potting mix](http://amzn.to/2sCQwNK). As a test, we filled a plastic cup with the organic soil, added water,  poked holes in the bottom to let it drain, then let it sit for three days to match the conditions of soil in our GreenPiThumb planter. At the end of three days, we tested our sensor in both types of soil.

We got the exact same reading: 82% in each. So we couldn't blame the soil...

### Giving up

Out of ideas, we revisited the projects that inspired GreenPiThumb. How did they solve this problem?

[Plant Friends](http://dicksonchow.com/plant-friends/) doesn't pump water at all. [PiPlanter](http://www.esologic.com/?p=1112) measures the soil moisture, but waters on a fixed schedule, regardless of moisture level. Some Googling turned up a few Pi gardening projects that *claim* that they water solely based on soil moisture, but none of them publish their source code nor share result data. Therefore, we felt it was fair to assume that watering based on moisture level is **impossible** and that **GreenPiThumb is doing the best it possibly can**, given certain inexorable limits of the physical world.

We finally decided to switch to a hybrid system. GreenPiThumb will now water the plant either if the soil gets too dry *or*  if seven days have elapsed since the last watering.

# The final product
Below are some images of our completed GreenPiThumb build:

TODO: Arrange images in a nicer way

{% capture fig_img_a %}
[![GreenPiThumb full system]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-side-full-sm.jpg)]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-side-full.jpg)
{% endcapture %}

{% capture fig_img_b %}
[![GreenPiThumb full system]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-front-sm.jpg)]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-front.jpg)
{% endcapture %}

<figure class="half">
  {{ fig_img_a | markdownify | remove: "<p>" | remove: "</p>" }}
	{{ fig_img_b | markdownify | remove: "<p>" | remove: "</p>" }}
</figure>


{% capture fig_img_a %}
[![GreenPiThumb electronics]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-just-electronics-sm.jpg)]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-just-electronics.jpg)
{% endcapture %}

{% capture fig_img_b %}
[![GreenPiThumb pump]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-pump-sm.jpg)]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-pump.jpg)
{% endcapture %}

{% capture fig_img_c %}
[![GreenPiThumb reservoir]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-reservoir-sm.jpg)]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-reservoir.jpg)
{% endcapture %}

<figure class="third">
  {{ fig_img_a | markdownify | remove: "<p>" | remove: "</p>" }}
	{{ fig_img_b | markdownify | remove: "<p>" | remove: "</p>" }}
	{{ fig_img_c | markdownify | remove: "<p>" | remove: "</p>" }}
</figure>

The timelapses have been the most fun part of this process. This one is from our first batch of green beans (R.I.P.). We didn't realize how quickly the plants would outgrow the [close overhead angle]({{ base_path }}/images/2017-06-21-greenpithumb/greenpithumb-overhead-mount.jpg). We eventually switched to the [larger bendy mount](http://amzn.to/2oCsaD8), which gets a better angle on the plant's full lifecycle, but our original setup caught a great timelapse of the first few days of growth:


<figure>
<div style="width:100%;height:0px;position:relative;padding-bottom:75.000%;"><iframe src="https://streamable.com/s/vq0gt/viuhfk" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>
  <figcaption>Timelapse showing four days of green bean growth.</figcaption>
</figure>

For the second batch, we kept the camera in the exact same position throughout growth. This is the progress of batch two so far:

* TODO: Add timelapse link for batch two.

# Lessons learned

## Nothing is as simple as it seems

I thought this would be a relatively straightforward two to three month project, but it took us over a year to complete because nothing is as simple as it seems.

It's a lesson I learned [long ago](https://www.joelonsoftware.com/2002/03/04/nothing-is-as-simple-as-it-seems/) from Joel Spolsky, software essayist extraordinaire, and it's a lesson that I expect to learn again and again on many software projects to come.

## Electronics: start with the basics

![Arduino starter kit]({{ base_path }}/images/2017-06-21-greenpithumb/arduino-starter-kit.jpg){: .align-left}

At the start of the project, my only knowedge of electronics was based on faint memories of high school physics. I bought the [Arduino starter kit](http://amzn.to/2rpRLCf) and went through the tutorials to build an electronics foundation.

These tutorials turned out to be quite enjoyable and useful. They do a good job of starting off easy and incrementally building to more advanced topics. I recommend this kit to any beginners who are interested in electronics.

## Test hardware in isolation

Some who have worked with me on software projects have described me as "anal retentive" or "overly pedantic" when it comes to writing code. I prefer to think of my coding style as "rigorous." We implemented the software part of this project first, rigorously peer reviewing and testing each software component piece by piece.

When it came to the hardware, we were very un-rigorous. I dare say we were a bit cavalier and laughably naïve. Our original process for testing the hardware components was to write a basic version of GreenPiThumb's software, wire up all the sensors on a test board, run it, and see what it produced.

Nothing. It produced nothing. Because that was a terrible strategy for testing hardware. For each electronics component, there is a possibility of hardware defect or incorrect installation. By connecting everything at once, we had no way of figuring out which piece or pieces were broken.

Over time, we learned to test our sensors in isolation. We created standalone [diagnostic scripts](https://github.com/JeetShetty/ansible-role-greenpithumb/tree/master/files) for each hardware component. Every time we tweak the hardware now, the first thing we do is run through the diagnostic scripts to verify that we're getting sane readings. When a new hardware piece is not working, we use our [multimeter](http://amzn.to/2s4VNkw) to systematically detect the root cause. We should have purchased the multimeter much earlier. It only cost $13, but could have saved us countless hours of frustration and headscratching.

# Source Code

* [GreenPiThumb backend](https://github.com/JeetShetty/GreenPiThumb)
* [GreenPiThumb frontend](https://github.com/JeetShetty/GreenPiThumb_Frontend)
* [GreenPiThumb frontend (static)](https://github.com/JeetShetty/GreenPiThumb_Frontend_static)
* [GreenPiThumb Ansible Role](https://github.com/JeetShetty/ansible-role-greenpithumb)

# Acknowledgments

Big thanks to those who helped us with this project:

* [Devon Bray](https://twitter.com/eso_logic)
  * His project, [PiPlanter 2](http://www.esologic.com/?page_id=1042) heavily inspired the hardware aspects of GreenPiThumb
* [Dickson Chow](http://dicksonchow.com)
  * Dickson's project, [Plant Friends](http://dicksonchow.com/plant-friends-mkii/) was a helpful hardware reference, and Dickson provided lots of encouragement throughout the project.
* The [/r/raspberry_pi](https://www.reddit.com/r/raspberry_pi) reddit community.
  * For [their help](https://www.reddit.com/r/raspberry_pi/comments/5i856z/help_turning_on_a_12v_water_pump_with_a_pi/) when we got stuck with wiring issues.