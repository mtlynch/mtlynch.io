---
title: "Mini-Utilities I Created Because of NixOS"
date: 2025-03-06
---

I recently switched from Windows to NixOS as my primary operating system, and it's been a major adjustment. There are some things I miss about Windows, but overall

One of my favorite things about NixOS is how friendly it is to creating tiny software utilities. If I write a simple web app, NixOS makes it easy to run that web app forever. If I make a command-line utility, it's easy to add it to my shell. If my computer's disk dies or I get a new computer, it's trivial to take all those utilities with me to my next computer.

On Windows, creating my own apps was possible, but it was frictiony. The only way I knew how to make an app that always ran in the background was to add it to Task Scheduler. And then it popped a big ugly window on my screen.

NixOS, there's systemd, there's journald. It's easy to manage all my startup tasks and view their logs.

My primary desktop has been Windows since I was seven years old, so it's been my main OS for over 30 years.

After increasing frustrations with Microsoft and Windows in particular for the last decade, I finally made the switch to NixOS, a Linux distribution that's distinctive in that you largely configure it through a central folder of config files.

There are certainly things from Windows that I miss, but one unexpected benefit of NixOS is how friendly it is to mini-utilities.

https://simonwillison.net/2024/Oct/21/claude-artifacts/

## Why

- I don't have to deal with creating domain names
- I don't have to do anything to prevent abuse if there's a server-side component
- I don't have to create an app anywhere

## Streamabilize: Make videos web-streamable

A utility I've wanted for years but never bothered to make is a tool for making videos web-streamable.

Modern web browsers can play videos natively, but the video has to be encoded to support web streaming.

Sometimes, I'll want to throw a short video onto [my file sharing server](https://github.com/mtlynch/picoshare), but the video isn't web-streamable. So, I search for the [SuperUser answer](https://superuser.com/a/438471) I've found a hundred times before, copy the command, modify it to match the paths on my system, then run the command.

I always wanted to automate my process for converting videos for web streaming, but I immediately ran into obstacles.

I could create a convenience script so that I didn't have to look up ffmpeg's semantics. But I dislike writing Powershell, and I'd have to look up how to do everything. And then anytime I downloaded a new version of ffmpeg, I'd have to remember to update my script with the new path. And then I'd have to remember where on my filesystem that wrapper script was. And then how do I maintain the same copy between my laptop and desktop?

These problems were all solvable, but they created enough friction that I just kept converting videos the manual way.

NixOS drastically reduces the friction in creating a utility like a video converter. I told an AI chatbot what I wanted, and it spit out

https://codeberg.org/mtlynch/streamablize

## Basic Go Web App: A basic Go web app

This was my first NixOS mini-utility. It doesn't do anything useful, but it helped me understand the simplest version of

## Pointer Brother: Point to things in screenshots

Named in honor of famed corporate entertainment act, [The Pointer Brothers](https://www.youtube.com/watch?v=0OwgTEB51Os)

- <https://codeberg.org/mtlynch/pointer-brother>

## Exploding Servers: Auto-deleting cloud VMs

This one I might turn into a real product. [Reach out](/about/) if it sounds like something you'd pay for.

## Babycam: A simple babycam viewer

I recently bought a babycam to check on how my son is doing when he naps. It's a handy way of checking on if he's awake without disturbing his sleep by checking.

It's a Reolink E1 Zoom Pro, and overall, I'm happy with it. I run it on a dedicated VLAN with firewall rules to prevent it from connecting to the Internet.

Reolink has a built-in web app, but it kind of sucks. It prompts you to log in every time you visit, and it doesn't render well on mobile, which is primarily how my wife and his other caretakers want to check.

So I just made my own simple web app. The camera exposes an RTSP stream, so I spent two hours iterating with Claude 3.5 Sonnet to make a Go app that wraps

## Couldn't you do this in Docker?

I've been using Docker for years. I know Docker solves a lot of the same problems, so I was trying to figure out why NixOS makes these appealing, but Docker doesn't.

### Nix has more official packages

They're not official as in from the developers, but they're not just random packages published to Docker Hub, either. They're at least vetted by the nixpkgs maintainers.

There's an official NixOS package for ffmpeg, and I can drop it into my app's dependencies, and now ffmpeg is available to my app.

On Docker, there's no official ffmpeg Docker image, so I first have to search for which third-party packaged one looks most trustworthy and up to date.

### Docker images compose poorly

Once I solve the problem of finding a Docker image for ffmpeg, it actually doesn't help me much.

I find it, how do I call ffmpeg from my app? I can't just. I could write my own Docker image that inherits from an ffmpeg image, but then I'm inheriting all their OS and package choices. I could copy the ffmpeg binary out of a Docker image and into my app's Docker image, but there's no guarantee that my app's environment will offer ffmpeg the right libraries it needs.

With Nix packages, I can drop the ffmpeg Nix package into my app's dependencies, and now ffmpeg is available to my app. And I don't need to worry that one of ffmpeg's dependencies will be missing or will conflict with my app's other dependencies. Nix takes care of all of that for me. ffmpeg is just there, ready for my app to call it.

### I can't manage Docker services via source code

With NixOS, if I want to add a new service, I just add it to my configuration and run `nixos-rebuild switch`. Nix then rebuilds my system with the new configuration. If it fails, Nix atomically rolls back to my previous working configuration.

Docker doesn't have an equivalent workflow. There's Docker Compose, but that's for creating a single application with multiple containers. There's no layer on top of Compose to let you manage multiple distinct services. To achieve that, I'd need Kubernetes, but that's a big jump in complexity.

## Conclusion

NixOS is nice.
