---
title: "A Simple Example of Calling a C Library from Zig"
date: 2023-11-18T13:52:14-05:00
---

I've been interested in Zig for the past year or so. It's like a modern reimagining of C with all the performance benefits, but the benefit of hindsight and better design to fit modern workflows.

Because Zig is designed to replace C, one of the first-class features is that you can call into C libraries from a Zig application. Or you can replace parts of an existing C application with Zig, and everything should still keep working.

I've been interested in Zig, and I thought a potential way to learn the language would be to take an existing C application and rewrite it in Zig. But I want to rewrite it incrementally rather than trying to replace it in one shot.

## How to do it the simple way?

I wasn't able to find any simple examples of calling

- [ziglearn Chapter 4 - Working with C](https://ziglearn.org/chapter-4/)
  - Describes low-level mechanisms for Zig-C interop, but doesn't show any complete examples.
- ["C/C++/Zig"](https://zig.news/kristoff/compile-a-c-c-project-with-zig-368j)
  - This is a great tutorial, but it's complex. It's not just calling into a C library. It's figuring out how to rebuild a huge C application with Zig, and then writing a new function that both calls the original C code and receives calls from the C code.
  - This tutorial was also written for Zig 0.8.1, and the code no longer compiles with Zig 0.11.0.
- [Extending a C Project with Zig (2023)](https://zig.news/krowemoh/extending-a-c-project-with-zig-2023-18ej)

There are two good tutorials about calling into a C application from Zig.

Loris Cro published , which shows how to switch a C project to the Zig compiler and then extend it using Zig.

## Create a simple C application

I haven't written pure C code in 10 years, and I haven't written any C++ in five years, so go easy on me.

We're going to create a simple C application.

First, we'll create a library. Here's the header:

```c
// arithmetic.h

int add(int x, int y);
```

And here's the implementation:

```c
// arithmetic.c

int add(int x, int y) {
  return x + y;
}
```

Nothing fancy. The goal is to keep things as simple as possible.

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

Now, I'll install Zig. There are a few ways to install Zig, but I'm using Nix, as it's my new favorite package manager. I only use Nix for the installation, so feel free to install Zig 0.11.0 another way if you prefer not to use Nix.

I'm going to add a `flake.nix` file to my project, which pulls Zig into my environment. I'm using Nix

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
$ zig cc ./c-src/arithmetic.c ./c-src/main.c -o ./bin/example
$ ./bin/example
5 + 16 = 21
```

Cool, everything is working, and now I'm using Zig for compilation. I'm still not using any Zig code, so that's next.

The complete example at this stage [is on Github](https://github.com/mtlynch/zig-c-simple/tree/20-zig-compile).

## Creating an equivalent Zig app

I haven't written any Zig code yet, so I'll create a boilerplate Zig app with the following command:

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

test "simple test" {
    const x: i32 = 5;
    const y: i32 = 16;
    try std.testing.expectEqual(@as(i32, 21), add(x, y));
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

First, I reorganized my files to separate my Zig code from my C code. I organized my source directory like this:

```text
c-src/
  arithmetic.c
  arithmetic.h
  main.c
src/
  main.zig
build.zig
```

Next, I created a static library based on the C arithemtic code in my `build.zig` file:

```zig
    const arithmetic = b.addStaticLibrary(.{
        .name = "arithmetic",
        .target = target,
        .optimize = optimize,
    });
    arithmetic.addCSourceFiles(&.{
        "c-src/arithmetic.c",
    }, &.{});
```

{{<notice type="info">}}
**Note**: Usually, when building a static library from C sources, you'd also call `<library name>.linkLibC()`. My `add` function is so simple that it doesn't call into libc, so I skipped this function call.
{{</notice>}}

Then, further down in my `build.zig` file, I tell my Zig executable to link against my C library and look in my `c-src` directory for headers:

```zig
    const exe = b.addExecutable(.{
        .name = "zig-c-simple",
        .root_source_file = .{ .path = "src/main.zig" },
        .target = target,
        .optimize = optimize,
    });
    exe.linkLibrary(arithmetic);              // Link against C library
    exe.addIncludePath(.{ .path = "c-src" }); // Look for C header files
```

And then I do the same think for Zig's unit test build target:

```zig
    const unit_tests = b.addTest(.{
        .root_source_file = .{ .path = "src/main.zig" },
        .target = target,
        .optimize = optimize,
    });
    unit_tests.linkLibrary(arithmetic);              // Link against C library
    unit_tests.addIncludePath(.{ .path = "c-src" }); // Look for C header files
```

## Calling into a C library from Zig

I've now adjusted my Zig build so that it links against my C arithmetic library, but I haven't called the library yet. To complete this example, I need to make the following small changes to my `src/main.zig` file:

```zig
const arithmetic = @cImport({
    @cInclude("arithmetic.h");
});

fn add(x: i32, y: i32) i32 {
    return arithmetic.add(x, y);
}
```

The above change replaces my Zig-native implementation of the `add` function and converts it to a wrapper to call the native C `add` function in my `arithmetic.c` file.

Now is the moment of truth. Does everything compile and run as expected?

```bash
$ zig build run
5 + 16 = 21
```

Cool, it works!

And I'll try my unit test as well:

```bash
$ zig build test --summary all
Build Summary: 4/4 steps succeeded; 1/1 tests passed
test success
└─ run test 1 passed 850us MaxRSS:1M
   └─ zig test Debug native success 1s MaxRSS:197M
      └─ zig build-lib arithmetic Debug native success 28ms MaxRSS:75M
```

Great!

## Is Zig really calling C?

But even at this stage, I wasn't totally sure everything was working, so I tried intentionally breaking my C `add` function by adding a rogue `- 1` to the arithmetic:

```c
// arithemtic.c

int add(int x, int y) {
  return x + y - 1; // Intentionally return incorrect results.
}
```

If my Zig application is really calling into C, then my Zig unit test should fail because the underlying C code is now incorrect:

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

## Summary

## Source code

- Stage 1: The Pure C Implementation
- Stage 2: Compiling C with Zig
