---
title: "TinyPilot: Month 43"
date: 2024-02-19T07:24:06-05:00
description: TODO - One-line summary
tags:
  - zig
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $80-100k/month in revenue and employs six other people.

Every month, I publish a retrospective like this one to share how things are going with my business and my professional life overall.
{{</notice>}}

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Publish annual retrospective

- **Result**: XX
- **Grade**: XX

TODO

### Reach out to five bloggers about TinyPilot collaborations

- **Result**: XX
- **Grade**: XX

TODO

### Get records ready for 2023 taxes

- **Result**: XX
- **Grade**: XX

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

## Abbreviated retro this month

This month, I'm only publishing an abbreviated retrospective. I spent most of my writing time this month on my [sixth year retrospective](/solo-developer-year-6), and we're already close to March.

## Side projects

### Implementing a bytecode interpreter in Zig

I've been exploring Zig for the past few months, and one of the biggest obstacles to learning more is finding projects that are a good match for Zig. Most of my ideas for projects are web apps, and I don't think Zig can ever surpass Go for web development because that's exactly what Go was designed for and not what Zig was designed for.

Over the past few months, I've also been dipping into the books [_Crafting Interpreters_ by Bob Nystrom](https://craftinginterpreters.com/) and [_Mastering Ethereum_ by Andreas M. Antonopoulos and Gavin Wood](https://github.com/ethereumbook/ethereumbook). _Crafting Interpreters_ demonstrates how to implement a bytecode interpreter in C, and _Matering Ethereum_ describes how the core of Ethereum is a bytecode interpreter called the Ethereum Virtual Machine (EVM).

So, I realized I could combine a few different interests by writing an implementation of the Ethereum Virtual Machine in Zig, so I started [eth-zvm](https://github.com/mtlynch/eth-zvm).

I've only implemented about 2% of Ethereum, but my interpreter can already run real Ethereum programs and return the result.

Here is what it looks like when my interpreter runs a simple program compiled to Ethereum bytecode:

```bash
$ echo '600160005260206000f3' | xxd -r -p | zig-out/bin/eth-zvm -v
PUSH1 0x01
  Stack: push 0x1
---
PUSH1 0x00
  Stack: push 0x0
---
  Stack: pop 0x0
  Stack: pop 0x1
MSTORE offset=0, value=0x1
  Memory: 0x00000000000000000000000000000001
---
PUSH1 0x20
  Stack: push 0x20
---
PUSH1 0x00
  Stack: push 0x0
---
  Stack: pop 0x0
  Stack: pop 0x20
RETURN offset=0, size=32
  Return value: 0x0000000000000000000000000000000000000000000000000000000000000001
---
EVM gas used:    18
execution time:  845.017µs
0x0000000000000000000000000000000000000000000000000000000000000001
```

You can compare my interpreter's results to the JavaScript implementation on the [evm.codes playground](https://www.evm.codes/playground).

I thought I would easily crush other interpreters in terms of performance because Zig itself is so performance-optimized, but it turns out that the official Go version is pretty fast:

{{<img src="eth-zvm-benchmarks.png" max-width="800px" has-border="true" caption="Benchmarks comparing my Ethereum virtual machine implementation to the official Go-based version (lower is better)">}}

My interpreter is still leaving a lot of performance optimizations on the table, so I feel like if I spend some time cutting out memory allocations, I can beat the other versions on speed.

I don't know how far I'll take the project, but it's serving as a practical way to build my knowledge of Zig, Ethereum, and interpreters. It's also a fun type of programming I haven't done in a long time because I have to be deliberate about every single byte I read or allocate from the OS.

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

- Publish TinyPilot Pro 2.6.3.
- Document TinyPilot Pro's release process internally.
- File 2023 taxes.
