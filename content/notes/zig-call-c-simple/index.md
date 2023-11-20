---
title: "A Simple Example of Calling a C Library from Zig"
date: 2023-11-19T00:00:00-05:00
tags:
  - nix
  - zig
---

[Zig](https://ziglang.org/) is a new, independently developed low-level programming language. It's a modern reimagining of C that attempts to retain all of C's performance benefits while also taking advantage of improvements in tooling and language design from the last 30 years.

Because Zig is designed to replace C, one of the first-class features is that you can call into C libraries from a Zig application. I couldn't find any simple examples demonstrating Zig's C interop functionality, so I decided to write my own.

## Existing resources about calling C from Zig

I found a few articles that described how to call C code from Zig. They all had useful information, but they were either too abstract or described scenarios that were more complex than what I was trying to accomplish:

- ["C/C++/Zig"](https://zig.news/kristoff/compile-a-c-c-project-with-zig-368j) by Loris Cro
  - This is a great tutorial, but it's complex. It's not just calling into a C library &mdash; it's figuring out how to build a huge C application with Zig and then writing a new function that both calls the original C code and receives calls from the C code.
  - I learned a lot from the tutorial, but I had a hard time figuring out from this series how to call C from Zig in a simpler scenario.
  - This tutorial was also written for Zig 0.8.1, and the code no longer compiles with Zig 0.11.0.
- ["Extending a C Project with Zig" (2023)](https://nivethan.dev/devlog/extending-a-c-project-with-zig.html)
  - This is a recent article, so it still compiles with the current version of Zig.
  - Similar to the above tutorial, this article tackles how to compile a large, complex C application, so I had a hard time understanding how to apply the lessons to a simpler scenario.
- [ziglearn Chapter 4 - Working with C](https://ziglearn.org/chapter-4/)
  - This article describes low-level mechanisms for Zig-C interop, but doesn't show any complete examples.

One of the major limitations of the two "extend a C project" tutorials above is that they assume you know how to port complex Makefiles into the Zig build system. Both of them say, "Hey, look at this confusing 100-line `Makefile`. Voila, now it's a confusing 100-line `build.zig` file!" and they don't really explain how (unless you watch this [90-minute video](https://vimeo.com/524007646)).

As a complete Zig novice, I didn't want to learn how to convert large Makefiles to the Zig build system. Instead, I wanted to try a simple example where I only used Zig to build a portion of a C application rather than porting the entire application to Zig's native build system.

## Create a simple C application

The thing that tripped me up in other Zig + C examples was that the C code was so complicated that it obscured the basic mechanics of calling into C code from Zig.

To make Zig's C interop functionality simpler, I decided to create a simple C application and library.

Here's my first C header file:

```c
// arithmetic.h

int add(int x, int y);
```

And here's the implementation:

```c
// arithmetic.c

#include "arithmetic.h"

int add(int x, int y) {
  return x + y;
}
```

I'm not doing anything fancy. The goal is to keep things as simple as possible.

Finally, I'll create a test application to exercise the `add` function:

```c
// main.c

#include <stdio.h>

#include "arithmetic.h"

int main(void)
{
  int x = 5;
  int y = 16;
  int z = add(x, y);
  printf("%d + %d = %d\n", x, y, z);
  return 0;
}
```

Okay, if everything works correctly, I should be able to compile this application with `gcc`, a standard C compiler:

```bash
$ gcc arithmetic.c main.c -o ./bin/example
$ ./bin/example
5 + 16 = 21
```

Great, everything works!

The complete example at this stage [is on Github](https://github.com/mtlynch/zig-c-simple/tree/10-pure-c).

## Switching the compiler to Zig

So far, this is a pure C project, and I haven't used Zig at all.

Now, I'll install Zig. There are a few ways to install Zig, but I'm using [Nix](https://nixos.org/), as it's [my new favorite package manager](/tags/nix/). I only use Nix for the installation, so feel free to install Zig 0.11.0 another way if you're not yet [in the cult of Nix](https://zero-to-nix.com/).

I added the following `flake.nix` file to my project, which pulls Zig 0.11.0 into my environment:

```nix
{
  description = "Dev environment for zig-c-simple";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 0.11.0
    zig_dep.url = "github:NixOS/nixpkgs/46688f8eb5cd6f1298d873d4d2b9cf245e09e88e";
  };

  outputs = { self, flake-utils, zig_dep }@inputs :
    flake-utils.lib.eachDefaultSystem (system:
    let
      zig_dep = inputs.zig_dep.legacyPackages.${system};
    in
    {
      devShells.default = zig_dep.mkShell {
        packages = [
          zig_dep.zig
        ];

        shellHook = ''
          echo "zig" "$(zig version)"
        '';
      };
    });
}
```

From here, I can run `nix develop`, and I see that Nix 0.11.0 is available in my project environment:

```bash
$ nix develop
zig 0.11.0
```

Zig has a built-in C compiler that can act as a drop-in replacement for `gcc`. I'll retry the previous compilation, but instead of calling `gcc`, I call `zig cc`:

```bash
$ zig cc arithmetic.c main.c -o ./bin/example
$ ./bin/example
5 + 16 = 21
```

Cool, everything is still working, and now I'm using Zig for compilation. I'm not using any Zig code yet, so that's next.

The complete example at this stage [is on Github](https://github.com/mtlynch/zig-c-simple/tree/20-zig-compile).

## Creating an equivalent Zig app

To create my Zig application, I'll use `zig init-exe`, which creates a boilerplate Zig executable:

```bash
$ zig init-exe
info: Created build.zig
info: Created src/main.zig
```

I replace `src/main.zig` with the following contents, which creates a Zig application that's equivalent to [my `main.c` above](#create-a-simple-c-application).

```zig
// src/main.zig

const std = @import("std");

fn add(x: i32, y: i32) i32 {
    // TODO: Instead of reimplementing this in Zig, call the C version.
    return x + y;
}

pub fn main() !void {
    const x: i32 = 5;
    const y: i32 = 16;
    var z: i32 = add(x, y);

    const stdout_file = std.io.getStdOut().writer();
    var bw = std.io.bufferedWriter(stdout_file);
    const stdout = bw.writer();

    try stdout.print("{d} + {d} = {d}\n", .{ x, y, z });
    try bw.flush();
}

test "test add" {
    try std.testing.expectEqual(@as(i32, 21), add(5, 16));
}
```

And if I run it, I get the same output as the C version:

```bash
$ zig build run
5 + 16 = 21
```

Cool, but my goal is to call into C code from Zig, not just rewrite everything in Zig. Next, I'll figure out how to replace my Zig implementation of `add` with the native C implementation.

The complete example at this stage [is on Github](https://github.com/mtlynch/zig-c-simple/tree/30-zig-main).

## Linking a Zig application against a native C library

Okay, everything so far has been basic "hello, world!" kind of stuff. Now, we're at the part that has been my stumbling block previously: calling into native C code from Zig.

First, I'll reorganize my files to separate my Zig code from my C code. Here's my new folder layout:

```text
c-src/
  arithmetic.c
  arithmetic.h
  main.c
src/
  main.zig
build.zig
```

Next, I adjust my `build.zig` so that my Zig application has access to my C source files:

```zig
    const exe = b.addExecutable(.{
        .name = "zig-c-simple",
        .root_source_file = .{ .path = "src/main.zig" },
        .target = target,
        .optimize = optimize,
    });
    exe.addIncludePath(.{ .path = "c-src" });   // Look for C source files
```

And I do the same thing for Zig's unit test build target:

```zig
    const unit_tests = b.addTest(.{
        .root_source_file = .{ .path = "src/main.zig" },
        .target = target,
        .optimize = optimize,
    });
    unit_tests.addIncludePath(.{ .path = "c-src" }); // Look for C source files
```

I've now adjusted my Zig build so that it has access to my C arithmetic library, but I haven't called the library yet. To complete this example, I need to make the following change to my `src/main.zig` file:

```zig
// src/main.zig

const arithmetic = @cImport({
    @cInclude("arithmetic.c");
});

fn add(x: i32, y: i32) i32 {
    return arithmetic.add(x, y);
}
```

The above change replaces my Zig-native implementation of the `add` function with a wrapper to call the native C `add` function in my `arithmetic.c` file.

Now is the moment of truth. Does everything compile and run as expected?

```bash
$ zig build run
5 + 16 = 21
```

Cool, it works!

And I'll try my unit test as well:

```bash
$ zig build test --summary all
Build Summary: 3/3 steps succeeded; 1/1 tests passed
test success
└─ run test 1 passed 1ms MaxRSS:1M
   └─ zig test Debug native success 2s MaxRSS:201M
```

Unit tests are passing as well. Everything looks great!

## Is Zig really calling C?

I've tried calling C code from other programming languages, and it's never been this easy. I worried that I was somehow tricking myself, and Zig wasn't _really_ calling my C code, so I deliberately introduced a bug into my C code:

```c
// arithemtic.c

int add(int x, int y) {
  return x + y - 1; // Intentionally return incorrect results.
}
```

If my Zig application is really calling into C, then my Zig unit test should fail because the underlying C code is now incorrect.

I ran my unit tests to see what would happen:

```bash
$ zig build test --summary all
run test: error: 'test.simple test' failed: expected 21, found 20
/nix/store/bg6hyfzr1wzk795ii48mc1v15bswcvp3-zig-0.11.0/lib/zig/std/testing.zig:84:17: 0x2244b3 in expectEqual__anon_1014 (test)
                return error.TestExpectedEqual;
                ^
/home/mike/zig-c-simple/src/main.zig:27:5: 0x2245fb in test.simple test (test)
    try std.testing.expectEqual(@as(i32, 21), add(x, y));
    ^
run test: error: while executing test 'test.simple test', the following test command failed:
/home/mike/zig-c-simple/zig-cache/o/60df9dade81f9ba62609a6cbf833478c/test --listen=-
```

Great! That test failed as expected with the error `expected 21, found 20`. The unit test correctly identified the bug I introduced into my C `add` function.

## Is Zig following header references?

The other piece of this solution that works surprisingly well is that I can reference the function through the `.h` file. I haven't done C/C++ programming in a long time, but my memory is that importing by a `.c` file isn't possible, so it's surprising how easy it is in Zig.

To test whether Zig is cheating somehow, I added a new function and preprocessor macro to my `arithmetic.h` header:

```c
// arithmetic.h

#define INCREMENT_AMOUNT 1
int increment(int x);
```

And I add this new function definition to `arithmetic.c`:

```c
// arithemtic.c

int increment(int x) {
  return x + INCREMENT_AMOUNT;
}
```

Finally, I add a quick unit test for this new function in my `src/main.zig` file:

```zig
test "test increment" {
    try std.testing.expectEqual(@as(i32, 6), arithmetic.increment(5));
}
```

If Zig is ignoring the C header `#include` directives, this should either cause a compilation error or my tests should stop passing. Time to run the new test:

```bash
$ zig build test --summary all
Build Summary: 3/3 steps succeeded; 2/2 tests passed
test success
└─ run test 2 passed 830us MaxRSS:1M
   └─ zig test Debug native success 2s MaxRSS:201M
```

It passed! This shows that Zig has a convenient feature of following `#include` references in my C sources, which makes calling into C code easier than any other language I've used.

## Summary

This article showed the simplest example I could think of for showing how to call C code from Zig.

Using this technique, it's possible to port a piece of a C library to the Zig build system and then use Zig to call into that library.

## Source code

The full source code is available on Github. I split it up into the different stages of the project:

- [Stage 1: The Pure C Implementation](https://github.com/mtlynch/zig-c-simple/tree/10-pure-c)
- [Stage 2: Compiling C with Zig](https://github.com/mtlynch/zig-c-simple/tree/20-zig-compile)
- [Stage 3: Create an Equivalent Zig Implementation](https://github.com/mtlynch/zig-c-simple/tree/30-zig-main)
- [Stage 4: Call into the C Library from the Zig Application](https://github.com/mtlynch/zig-c-simple/tree/40-zig-call-c)
- [Stage 5: Verify that Zig is Following `#include` References](https://github.com/mtlynch/zig-c-simple/tree/50-test-include-references)

---

_Thanks to [Stéphane Bortzmeyer](https://www.bortzmeyer.org) and [IntegratedQuantum](https://github.com/IntegratedQuantum) for [offering suggestions](https://ziggit.dev/t/a-simple-example-of-calling-a-c-library-from-zig/2225/3?u=mtlynch) that helped me simplify this solution._
