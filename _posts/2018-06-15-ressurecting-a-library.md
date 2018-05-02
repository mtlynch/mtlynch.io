---
title: Resurrecting a dead library
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
---

* Getting it to run under Docker
* Getting it to run in CI
* Reducing CI time by pre-building pandas
* Getting it under e2e tests
* Getting it under unit tests
* Can't remove pandas because matchUp expects to iterate keys in a particular order.

{% include image.html file="slow-build.png" alt="Screenshot of Travis build time" max_width="750px" img_link=true %}
