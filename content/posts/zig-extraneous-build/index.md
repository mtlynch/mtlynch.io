---
title: "Why does an extraeous build step make my Zig app 10x faster?"
date: 2024-03-09T08:15:20-05:00
tags:
  - zig
  - ethereum
---

For the past few months, I've had a curiousity about two new technologies: the Zig programming language and the Ethereum cryptocurrency. To learn more about both, I've been using Zig to write a bytecode interpreter for the Ethereum Virtual Machine.

Zig is a great language for performance optimization, as it gives you fine-grained control over memory and control flow. To motivate myself, I've been benchmarking my Ethereum implementation against the official Go implementation.

TODO: Show benchmarks

Recently, I made what I thought was a simple refactoring to my benchmarking script, and my app's performance tanked. Through trial and error, I narrowed the change down to the difference between these two commands:

```bash
$ echo '60016000526001601ff3' | xxd -r -p | zig build run -Doptimize=ReleaseFast
execution time:  58.808µs
```

```bash
$ echo '60016000526001601ff3' | xxd -r -p | ./zig-out/bin/eth-zvm
execution time:  438.059µs
```

`zig build run` is just a convenience tool for building a binary and executing it. In fact, it should be completely equivalent to the following commands:

```bash
zig build
./zig-out/bin/eth-zvm
```

How could my program be running almost 10x _faster_ with an extra build step?

## Creating a minimal reproduction of the phenomenon

To debug the performance mystery, I tried trimming out parts out of my app until it was no longer a bytecode interpreter and was just a program that counted the number of bytes it read from standard input:

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

```bash
$ echo '00010203040506070809' | xxd -r -p | zig build run -Doptimize=ReleaseFast
bytes:           10
execution time:  13.549µs
```

The test command runs three commands:

1. Use `echo` to print a sequence of ten hex-encoded bytes (`0x00`, `0x01`, ...).
1. Use `xxd` to convert `echo`'s hex-encoded bytes to binary-encoded bytes.
1. Use `zig build run` to compile my byte counter program and run it, counting the number of binary-encoded bytes that `xxd` emitted.

`zig build run` compiles the source code into a `count-bytes` binary executable, but when I ran the compiled binary directly, it took 12x as long to run, completing in 162 microseconds:

```bash
$ echo '00010203040506070809' | xxd -r -p | ./zig-out/bin/count-bytes
bytes:           10
execution time:  162.195µs
```

How could cutting out an extra compilation step make the program _slower_?

## Asking the Zig community for help

At this point, I was stumped. I had read my source code over and over, and I couldn't understand the behavior I was seeting.

Zig is still a new and fairly niche language, so my best hypothesis was that there was something about Zig I wasn't understanding. I thought experienced Zig programmers would look at my program and point out something I misunderstood about the language.

I [posted my question on Ziggit](https://ziggit.dev/t/zig-build-run-is-10x-faster-than-compiled-binary/3446?u=mtlynch), a discussion forum for Zig. The first few responses said "input buffering" but they didn't have concrete suggestions to fix it or investigate further.

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
#!/usr/bin/env bash

echo 'jobA is starting' >&2

sleep 3

echo 'result of jobA is...'

sleep 2

echo '42'

echo 'jobA is terminating' >&2
```

```bash
#!/usr/bin/env bash

echo 'jobB is starting' >&2

echo 'jobB is waiting on input' >&2
while read line
do
  echo "jobB read '${line}' from input"
done < /dev/stdin
echo 'jobB is done reading input' >&2

echo 'jobB is terminating' >&2
```

## Fixing my benchmark

It can read directly from a file.

Hooray, now I'm

## Applying Andrew Kelly's performance fix

## Cheating my way to maximum performance

The slowest part of my program is probably memory allocation. Zig has a memory allocator called the fixed buffer allocator. Instead of the memory allocator requesting memory from the operating system, the fixed-buffer allocator allocates memory from a fixed buffer of bytes.

This is extremely fast because you avoid asking the OS for memory, but it also requires you to know how much memory you need up front.

We can cheat because I know my benchmarks don't require more than about 1 KB of memory (though there are valid Ethereum bytecode sequences that require more). But just for fun, let's see what performance looks like if I know my max memory requirement at compile time:
