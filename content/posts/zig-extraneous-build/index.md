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

## Asking the Zig community for help

I [asked on Ziggit](https://ziggit.dev/t/zig-build-run-is-10x-faster-than-compiled-binary/3446?u=mtlynch), a discussion forum for Zig.

The first few responses said "input buffering" but they didn't have concrete suggestions to fix it or investigate further.

Andrew Kelly, Zig's founder and lead developer made [a surprise appearance in the thread](https://ziggit.dev/t/zig-build-run-is-10x-faster-than-compiled-binary/3446/8?u=mtlynch) and pointed out that I was making a different performance mistake, but he couldn't explain the phenomenon I was seeing.

> Looks like you’re doing 1 syscall per byte read? That’s going to perform extremely poorly. My guess is that the extra steps of using the build system incidentally introduced some buffering. Not sure why though. The build system is making the child process inherit the file descriptors directly.
>
> -Andrew Kelly, Zig founder

Finally, my friend [Andrew Ayer](https://www.agwa.name) saw my post about this on Mastodon and [had a clear explanation](https://m.mtlynch.io/@agwa@agwa.name/112039058255070708) to explain the mysterious performance measurement:

> Do you still see the 10x disparity with significantly larger inputs (i.e. > 1MB)? Do you still the disparity if you redirect stdin from a file instead of a pipe?
>
> My guess is that when you execute the program directly, xxd and count-bytes start at the same time, so the pipe buffer is empty when count-bytes first tries to read from stdin, requiring it to wait until xxd fills it. But when you use zig build run, xxd gets a head start while the program is compiling, so by the time count-bytes reads from stdin, the pipe buffer has been filled.

Incidentally, Andrew Ayer also had the key insight that [solved my last performance mystery](/notes/picoshare-perf/#ram-bloat-is-fine-but-crashes-are-not).

## My mental model of bash pipelines is wrong

I had never thought too carefully about bash pipelines, but Andrew's comment made me realize my mental model was wrong.

Imagine a simple bash pipeline like the following:

```bash
./jobA | ./jobB
```

My mental model was that `jobA` would start and run to completion, then `jobB` would start with `jobA`'s output as its input.

It turns out that in a bash pipline command, all the commands in the pipeline start at the same time.

```bash
printf '#!/usr/bin/env bash\necho 'hello''
```

## Fixing my benchmark

It can read directly from a file.

## Applying Andrew Kelly's performance fix

As a way of teaching myself about the Zig programming language, I've been working on a bytecode interpreter for the Ethereum virtual machine.

Zig gives the developer fine-grained control over performance, so I've been benchmarking my hobby interpreter's performance against the official Ethereum implementation, written in Go. So far, my implementation is doing pretty well against Go, but I haven't done a ton to optimize performance yet.

I got a strange surprise when I
