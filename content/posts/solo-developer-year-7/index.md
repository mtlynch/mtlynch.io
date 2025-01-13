---
title: "My Seventh Year as a Bootstrapped Founder"
date: 2025-02-01
tags:
  - annual review
---

Six years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to create my own bootstrapped software company.

Every year, I post an update about how life is going as a bootstrapped software founder and what went well and poorly in the past year.

## I sold my company

The defining feature of my professional life last year was that I sold TinyPilot, the company I founded in 2020.

TinyPilot was the first profitable business I started after quitting my job in 2018. It followed a lot of flops.

The product was a device that let users control their computers remotely. I built the prototype with a $35 Raspberry Pi mini computer and blogged about it, then suddenly dozens of people were willing to pay $100-200 on kits to build their own.

For the next four years, I continued improving the product. I moved from kits to pre-made devices. I hired a team to help me with development, support

For the first few years, all of my products flopped. I couldn't figure out how to build something customers wanted to pay for.

Halfway through my third year, I created a device called [TinyPilot](https://tinypilotkvm.com) that let users to control their computers remotely. Suddenly, customers were excited to buy what I had built, so I focused on that for the next four years. I built a company around it that I grew to seven people and $1M in annual revenue.

Last year, I sold the company this past year for $598k.

Selling my company was the defining feature of my professional life for the last year, but it was only two months in.

In this post, I'll share what I've learned about being a bootstrapped founder from my seventh year doing it.

I kind of milked the story for all it's worth. I wrote about everything leading up to it as well as all the lessons I learned. And I went on some podcasts to talk about it more.

I'm still incredibly grateful for how it worked out. Five of the six employees are still there. I've been happy with the direction of the company.

## I became a new parent

In August, my wife and I welcomed our first child. It's been the happiest time of my life.

## I worked on educational products

Hour for hour, it's the highest return on investment thing I've done since leaving Google

## I learned cool technologies

### Nix

The technology that's had the biggest impact on my work the last year is Nix. I like it so much that I started using NixOS as my only OS for both personal and work computing. This is after 30 years of mainly working from a Windows desktop. It has completely replaced Ansible, which I used heavily for six years.

The main feature of Nix I love is [dev shells](/notes/nix-dev-environment/). They allow you to create a custom environment for each of your projects.

I create dev shells for all of my projects now. Whenever I'm contributing to an open-source project I don't maintain, I create [my own private dev shell](/notes/use-nix-flake-without-git/) with all the project's dependencies.

A lot of people shy away from Nix because it's so complicated and difficult to learn, but what too few people realize is that you can use a lot of powerful features even if you're a dummy like me and understand about 2% of Nix. Once you see how to create a dev shell, you can mainly just tweak it without understanding much.

But also, this year, I finally abandoned my Windows desktop after 30 years of Windows being my primary desktop OS, and I'm now running NixOS. I love it, and I only miss a few things about Windows.

The community is a mess. I wish there was a more centralized leadership board that could unite the community, but there isn't.

### htmx

I'd seen people talking about htmx for the past several years, and I never got it.

### Zig

I'd been interested in Zig ever since I listened to Andrew Kelly on the XX podcast XX years ago.

The thing that kept me from learning Zig was that my fun coding is mainly around projects I want to use, and most of the project ideas I have are web apps.

I still have fun coding in Zig. If I was sent to live on a desert island for a year with a laptop but no Internet, the project I'd want to work on is taking an open-source rebuild of some computer game I played in the 90s (e.g. open AoE, open command and conquer) and porting all the disgusting C++ code to elegant Zig.

### hongfuzz

I wish I had time to do more fuzzing tutorials with Nix because I feel like the world is sleeping on Nix as a fuzzing tool.

## Grading last year's goals

Last year, I set [three high-level goals](/solo-developer-year-6/#goals-for-year-seven) that I wanted to achieve during the year. Here's how I did against those goals:

### Manage TinyPilot on 20 hours per week

- **Result**: Reduced management to 20 hours per week
- **Grade**: A

I sold the company in April, so I only managed TinyPilot for a small amount of the year, but I finally did achieve my goal of managing on just 20 hours per week. That had been a repeated goal for the previous XX years.

The thing that finally made it work was that I had no choice. Due dilligence and managing the sale of the company took up 15-20 hours per week by itself, so I just didn't have the spare hours to do what I had been doing before.

The other unexpected consequence of selling was that the new CEO didn't have a programming background, so a lot of my focus in my last few months as CEO was identifying workflows that depended on the CEO making technical decisions and finding ways to empower the employees to do the heavy technical lifting. For example, I felt like I was just doing a few bits of our release process, but when I finally wrote it all out for the new CEO, I realized most of the steps were still on me.

### Publish a course or book

### Write software for ten working hours per week

## Goals for next year

### Learn a new programming language

A lot of the people who I like are excited about Elixir and Phoenix, so I'm curious to try those.
