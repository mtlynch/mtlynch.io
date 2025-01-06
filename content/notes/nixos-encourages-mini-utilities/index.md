---
title: "NixOS encourages me to make mini-utilities"
date: 2025-01-06
---

I've been using Windows as my main desktop since I was seven years old, so it's been my main OS for over 30 years.

After increasing frustrations with Microsoft and Windows in particular for the last decade, I finally made the switch last week to NixOS, a Linux distribution that's distinctive in that you largely configure it through a central folder of config files.

I have mixed feelings about switching from Windows to NixOS, but one excellent benefit I didn't anticipate was how much NixOS rewards me for creating personal mini-utilities.

I create a lot of personal utilities anyway, but

## Streamabilizer: Make videos web-streamable

A utility I've wanted for years but never bothered to make is a tool for making videos web-streamable. Modern browsers can play MP4 videos natively, but the video has to be encoded specifically to support web streaming.

Sometimes, I'll want to throw a short video onto [my file sharing server](https://github.com/mtlynch/picoshare), but the video isn't web-streamable. So, I find the [SuperUser answer](https://superuser.com/a/438471) I've found 100x times before, copy the ffmpeg incantation, modify it for my filename and the path to ffmpeg on my system, then run the command.

I always wanted to automate my process for converting videos for web streaming, but I immediately ran into obstacles.

I could create a convenience script so that I didn't have to look up ffmpeg's semantics. But I never write scripts for Windows, so I'd have to look up how to do it in PowerShell, a language I dislike. And then my script would break if I installed a new version of ffmpeg. And then I'd have to remember where on my filesystem that wrapper script was. And then how do I maintain the same copy between my laptop and desktop?

I could create a simple web app to convert my videos, but Windows isn't so friendly to hosting web services in the background. And if I host it in the cloud, it's expensive because I need to run ffmpeg on the backend, so I need a whole server. And I'd have to put in abuse protection.

But if I'm already running NixOS, creating a utility to make web-streamable videos is so much less friction.

## Basic Go Web App: A basic Go web app

This was my first NixOS mini-utility. It doesn't do anything useful, but it helped me understand the simplest version of

## Pointer Brother: Point to things in screenshots

Named in honor of [The Pointer Brothers](https://www.youtube.com/watch?v=0OwgTEB51Os)
