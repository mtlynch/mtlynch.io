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

The TinyPilot product was a device that let users control their computers remotely. I built the prototype with a $35 Raspberry Pi mini computer and blogged about it, then suddenly dozens of people were willing to pay me $100-200 for kits to build their own.

For the next four years, I continued improving the product. I moved from kits to pre-made devices. I hired a team to help me with hardware, software, support, and logistics, eventually growing to $1M/year in revenue.

In 2024, I sold the company for $598k. My wife and I wanted to start a family, and I knew that being the sole manager at a seven-person company wasn't how I wanted my work to be when we had a baby. I found a buyer whose vision for the company aligned with what I wanted it to be, and we completed the sale in April 2024.

I already wrote and podcasted a lot about the sale and the lessons I learned, so I won't rehash it, but in short, I'm still very grateful for how everything worked out.

## I became a new parent

In August, my wife and I welcomed our first child. It's been the happiest time of my life.

It confirmed my belief that I wanted to move on from TinyPilot before the baby arrived.

As an indie founder, my schedule is incredibly flexible. Especially now that I work by myself. So having a baby is one of those things where I think, "How do people with regular jobs manage this?"

I had no professional responsibilities, tons of friends and family support nearby, and

It's also one of those things

## I worked on educational products

After TinyPilot, I had to decide what to do next.

In 2021, I released a short video course about blogging for technial audiences. It only made $XXk that year, but it's made $XXk total, making it the highest return on investment project I've ever done.

Educational products also work well with a young baby because I can work on it at my own pace. There are no servers to keep online or users waiting on me for support issues.

So, over the summer, I taught a live version of my blogging course. The course went okay, but the dominant feedback from students was that they wanted to learn more about writing technique and less about platforms to share your writing.

After my son was born, it became harder to record videos in my office, so I switched to writing a book. My plan is to publish it chapter by chapter and iterate on the material based on reader feedback.

## I learned cool technologies

When I was running TinyPilot, I didn't have a lot of time for technical work, which was a bummer because I still love writing software.

I've always loved programming, but I've never found it as exciting as I have in the last year. I'm awed by the amazing software that's available now for free, and I'm only able to experiment with a tiny fraction of it.

### Nix

The technology that's had the biggest impact on my work the last year is Nix and NixOS.

I like Nix so much that I use it in every programming project, and now all of my personal and work computers run NixOS after

If you're curious about Nix, a low-risk, high-reward way to use it is to manage dev shells.

You probably switch between multiple projects that have different dependencies. Maybe you have a project A that depends on Node.js XX and Python 2.7. And you have another project B that depends on Node.js XX and Python 3.XX. You don't want to do anything to the Node and Python installations in Project A that will mess up Project B, and vice-versa. There are version managers and virtual environments, but they're tech specific. Nix dev shells let you manage all the dependencies for a project so that when you're working in project A, the environment only sees Python 2.7 and Node.js XX no matter what happens in project B.

Read that post. Hopefully, you see that you don't have to understand much about Nix to get a working setup. And even if you're working in a repository you share with other people, you can still privately use Nix dev shells without commiting anything Nix-related to the project's source repo.

The main feature of Nix I love is [dev shells](/notes/nix-dev-environment/). They allow you to create a custom environment for each of your projects.

I create dev shells for all of my projects now. Whenever I'm contributing to an open-source project I don't maintain, I create [my own private dev shell](/notes/use-nix-flake-without-git/) with all the project's dependencies.

A lot of people shy away from Nix because it's so complicated and difficult to learn, but what too few people realize is that you can use a lot of powerful features even if you're a dummy like me and understand about 2% of Nix. Once you see how to create a dev shell, you can mainly just tweak it without understanding much.

But also, this year, I finally abandoned my Windows desktop after 30 years of Windows being my primary desktop OS, and I'm now running NixOS. I love it, and I only miss a few things about Windows.

The community is a mess. I wish there was a more centralized leadership board that could unite the community, but there isn't.

### htmx

I'd seen people talking about htmx for the past several years, and I never got it. I finally had a long plane ride, so I started reading the free ebook _Hypermedia Systems_, written by the authors of htmx.

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

- **Result**: Taught a live course, but didn't publish a course or book.
- **Grade**: C

### Write software for ten working hours per week

- **Result**: I write software for 10-20 hours per week.
- **Grade**: A

This goal was more about freeing up time as a manager at TinyPilot, but this has worked out. I'm writing code a lot and enjoying it.

## Goals for next year

### Earn $50k in profit

### Learn a new programming language

A lot of the people who I like are excited about Elixir and Phoenix, so I'm curious to try those.

### Goal 3
