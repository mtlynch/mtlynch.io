---
title: "Why does an extraeous build step make my Zig app 10x faster?"
date: 2024-03-09T08:15:20-05:00
tags:
  - zig
  - ethereum
---

I'm interested in learning the Zig programming language, and I think Ethereum sounds neat, so to learn about both, I started a hobby project of implementing a bytecode interpreter for the Ethereum Virtual Machine in Zig.

Zig is a great language for performance optimization, as it gives you fine-grained control over memory and control flow. To make my project more fun, I've been benchmarking my implementation against the official Go implementation of Ethereum.

TODO: Show benchmarks

I got a surprise when I wrote a convenience script to automate the benchmarking process, and my app's performance tanked. Through experimentation, I narrowed it down to the difference between the following two commands:

```bash
$ echo '60016000526001601ff3' | xxd -r -p | zig build run -Doptimize=ReleaseFast
execution time:  58.808µs
```

```bash
$ echo '60016000526001601ff3' | xxd -r -p | ./zig-out/bin/eth-zvm
execution time:  438.059µs
```

But `zig build run` is just a convenience tool for building the binary and executing it.

How could my program be running almost 10x _faster_ with an extra build step?

## Creating a minimal reproduction of the phenomenon

At first, I tried performance

Then, I just tried chopping parts out of my app until it was no longer a bytecode interpreter and was just a program that counted the number of bytes you gave it.

```zig
// src/main.zig

const std = @import("std");

pub fn countBytes(reader: anytype) !u32 {
    var count: u32 = 0;
    while (true) {
        _ = reader.readByte() catch |err| switch (err) {
            error.EndOfStream => {
                return count;
            },
            else => {
                return err;
            },
        };
        count += 1;
    }
}

pub fn main() !void {
    var reader = std.io.getStdIn().reader();

    var timer = try std.time.Timer.start();
    const start = timer.lap();
    const count = try countBytes(&reader);
    const end = timer.read();
    const elapsed_micros = @as(f64, @floatFromInt(end - start)) / std.time.ns_per_us;

    const output = std.io.getStdOut().writer();
    try output.print("bytes:           {}\n", .{count});
    try output.print("execution time:  {d:.3}µs\n", .{elapsed_micros});
}
```

And I could still see the performance difference I was seeing with my more complex interpreter. When I ran the bye counter with `zig build run`, it ran in 13 microseconds:

```
$ echo '00010203040506070809' | xxd -r -p | zig build run -Doptimize=ReleaseFast
bytes:           10
execution time:  13.549µs
```

When I ran the compiled binary directly, it ran over 10x slower, completing in 162 microseconds:

```
$ echo '00010203040506070809' | xxd -r -p | ./zig-out/bin/count-bytes
bytes:           10
execution time:  162.195µs
```

My program is measuring its own runtime, so the overhead of compiling it first shouldn't make it faster or slower. So, it was surprising to see that it ran 10x slower without the `zig build run` syntax.

What was going on?

## What is bytecode interpreter?

I vaguely understood what . Compilers like gcc and clang transform a language like C into assembly code, so they run

Compilers like Java or C# compile the language into bytecode. And then as long as a bytecode interpreter is available for that platform, the

##

As a way of teaching myself about the Zig programming language, I've been working on a bytecode interpreter for the Ethereum virtual machine.

Zig gives the developer fine-grained control over performance, so I've been benchmarking my hobby interpreter's performance against the official Ethereum implementation, written in Go. So far, my implementation is doing pretty well against Go, but I haven't done a ton to optimize performance yet.

I got a strange surprise when I
