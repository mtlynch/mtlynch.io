---
title: "My Seventh Year as a Bootstrapped Founder"
date: 2025-02-01
tags:
  - annual review
---

On this date seven years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to create my own bootstrapped software company.

Every year, I post an update about how life is going as a bootstrapped software founder and what went well and poorly in the past year.

## I sold my company

The defining feature of my professional year was that I sold TinyPilot, the company I founded in 2020.

The TinyPilot product is a device that lets users control their computers remotely. I built a rudimentary prototype with a $35 Raspberry Pi mini computer and a $15 HDMI capture dongle.

TODO: Photo of prototype

I wrote [a blog post](/tinypilot/) about how I got the initial version of TinyPilot to work, and dozens of readers materialized who were willing to pay me $100-200 for kits to build their own. After two years of desperately searching for any paying customers for my previous ventures, I suddenly had so many customers that I could barely keep up with inventory.

For the next four years, I improved on the TinyPilot product and built it into a real company. I graduated from unassembled kits to pre-made devices. I hired a team to help me with hardware, software, support, and logistics, eventually growing the company to $1M/year in revenue.

In 2024, I sold the company for $598k. My wife and I wanted to start a family, and I knew that my life as sole manager of a seven-person company wasn't what I wanted for a new family. I found a buyer whose vision for the company aligned with what I wanted it to be, and we completed the sale in April 2024.

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

After TinyPilot, I basically only had time for learning cool technologies.

I've always loved programming, but I've never found it as exciting as I have in the last year. I'm awed by the amazing software that's available now for free, and I'm only able to experiment with a tiny fraction of it.

### Nix

The technology that's had the biggest impact on my work the last year is Nix and NixOS.

I've been adopting Nix little by little, but I like it so much that I use it in every programming project, and now all of my personal and work computers run NixOS.

If you're curious about Nix, a low-risk, high-reward way to use it is to manage dev shells.

You probably switch between multiple projects that have different dependencies. Maybe you have a project A that depends on Node.js XX and Python 2.7. And you have another project B that depends on Node.js XX and Python 3.XX. You don't want to do anything to the Node and Python installations in Project A that will mess up Project B, and vice-versa. There are version managers and virtual environments, but they're tech specific. Nix dev shells let you manage all the dependencies for a project so that when you're working in project A, the environment only sees Python 2.7 and Node.js XX no matter what happens in project B.

Read that post. Hopefully, you see that you don't have to understand much about Nix to get a working setup. And even if you're working in a repository you share with other people, you can still privately use Nix dev shells without commiting anything Nix-related to the project's source repo.

The main feature of Nix I love is [dev shells](/notes/nix-dev-environment/). They allow you to create a custom environment for each of your projects.

I create dev shells for all of my projects now. Whenever I'm contributing to an open-source project I don't maintain, I create [my own private dev shell](/notes/use-nix-flake-without-git/) with all the project's dependencies.

A lot of people shy away from Nix because it's so complicated and difficult to learn, but what too few people realize is that you can use a lot of powerful features even if you're a dummy like me and understand about 2% of Nix. Once you see how to create a dev shell, you can mainly just tweak it without understanding much.

But also, this year, I finally abandoned my Windows desktop after 30 years of Windows being my primary desktop OS, and I'm now running NixOS. I love it, and I only miss a few things about Windows.

The community is a mess. I wish there was a more centralized leadership board that could unite the community, but there isn't.

### htmx

I'd seen people talking about htmx for the past several years, but the concept never clicked for me. "The flagship feature is that you can make the HTML `<button>` element send a POST request?" I thought. "Who cares?"

During a long plane ride, I read the free ebook _Hypermedia Systems_. It's written by the authors of htmx. And I finally got that it's not about letting a `<button>` send a POST request but rather about bringing simple interactivity to HTML without having to write custom JavaScript.

I was so used to writing custom JavaScript to make my web apps work. I knew it was repetitive and tedious, but I figured that that's just how it has to be if I'm going to add logic to the presentation-focused HTML.

htmx's insight is that there are so many common behaviors of a web app that shouldn't require custom JavaScript. Like writing a comment and submitting it in a comment thread. Why should that require custom JavaScript? Why can't you declare in HTML that you want to send the form to the server and add the server's response to the end of the thread?

### Zig

I'd been interested in Zig ever since I listened to Andrew Kelly on the XX podcast XX years ago. He argued that we suffer so much from designing low-level software in C and C++, languages that were designed XX years ago under constraints that no longer apply. He developed Zig to achieve the same results as C and C++ but using the technological advantages that are available today.

I found Andrew's argument compelling and his enthusiasm contagious. I loved the idea of Zig as a replacement for C++, but I hadn't written any C++ for personal projects in a decade. All the projects I create are just things I want to use and share with friends, so they're typically web apps, which I don't want to write in a low-level systems language like C++ or Zig.

After I attended Handmade Seattle in 2023, I met Andrew Kelly, and it inspired me to finally write some Zig. And I enjoyed Zig. It's the most fun I've had learning a new language in a long time. It reminds me of when I first learned to program and there's a sense of mastery because there's so little abstraction that you feel in control.

I started working on a pure Zig implementatio of the Ethereum virtual machine, but I ran out of steam. It's not particularly useful until I have a complete implementation, and that's a huge amount of work.

I'm always on the lookout for some excuse to use Zig for a practical purpose, but I just don't have any good project ideas for it at the moment.

The thing that kept me from learning Zig was that my fun coding is mainly around projects I want to use, and most of the project ideas I have are web apps.

Zig is the most fun programming I've done in a long time. There's something about coding with extremely low abstraction that feels exciting.

I still have fun coding in Zig. If I was sent to live on a desert island for a year with a laptop but no Internet, the project I'd want to work on is taking an open-source rebuild of some computer game I played in the 90s (e.g. [Age of Empires II](http://openage.dev/), [Command and Conquer](https://www.openra.net/)) and porting all the disgusting C++ code to elegant Zig.

### Fuzz testing with Nix

You probably thought I was done talking about Nix. I'm not!

The most powerful fuzzer is still be AFL++, but hongfuzz is about 80% of the power with 20% of the complexity.

My real discovery was combining honggfuzz with Nix, which too few people are doing.

I wish I had time to do more fuzzing tutorials with Nix because I feel like the world is sleeping on Nix as a fuzzing tool.

Here's my pitch for using Nix in your fuzzing workflow:

- Nix makes fuzzing workflows reproducible.
  - Once you get your fuzzer running under Nix, anyone run your fuzzing configuration by just [typing `nix run`](/nix-fuzz-testing-1/#a-preview-of-the-solution). They don't have to figure out dependencies because Nix automatically reproduces the exact environment you used.
- Nix simplifies installing dependencies.
  - Nix has one of the largest package repositories of any package manager. If your fuzzing target has dependencies, they're probably already available in the Nix package repository, so you don't have to figure out a special process for building each dependency.
- Nix simplifies custom patches.
  - If you need to [apply custom patches](/nix-fuzz-testing-2/#fixing-the-bug) to fuzz your target, Nix makes it easy to apply those and keep the patch files in the same source tree as the rest of your fuzzing workflow.
- Nix caches builds.
  - If you experiment with different compilation options, you don't have to compile from scratch each time. Nix will remember if you've compiled with the same options before and re-use that build. You never have to `make clean` or delete binaries manually.

If that sounds interesting, I wrote [a detailed, beginner-friendly tutorial](/nix-fuzz-testing-1/) about how I used Nix and honggfuzz to create a fuzzing workflow for an open-source PDF reader.

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

Across all of my products, I want to earn $50k in profit. It doesn't have to be recurring revenue. One-time sales count, but I want to find a way to earn about $50k.

### Learn a new programming language

A lot of the people who I like are excited about Elixir and Phoenix, so I'm curious to try those.

### Goal 3
