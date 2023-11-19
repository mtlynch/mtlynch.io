---
title: "A Simple Example of Calling a C Library from Zig"
date: 2023-11-18T13:52:14-05:00
---

I've been interested in Zig for the past year or so. It's like a modern reimagining of C with all the performance benefits, but the benefit of hindsight and better design to fit modern workflows.

Because Zig is designed to replace C, one of the first-class features is that you can call into C libraries from a Zig application. Or you can replace parts of an existing C application with Zig, and everything should still keep working.

I've been interested in Zig, and I thought a potential way to learn the language would be to take an existing C application and rewrite it in Zig. But I want to rewrite it incrementally rather than trying to replace it in one shot.

## How to do it the simple way?

I wasn't able to find any simple examples of calling

* [ziglearn Chapter 4 - Working with C](https://ziglearn.org/chapter-4/)
  * Describes low-level mechanisms for Zig-C interop, but doesn't show any complete examples.
* ["C/C++/Zig"](https://zig.news/kristoff/compile-a-c-c-project-with-zig-368j)
  * This is a great tutorial, but it's complex. It's not just calling into a C library. It's figuring out how to rebuild a huge C application with Zig, and then writing a new function that both calls the original C code and receives calls from the C code.
  * This tutorial was also written for Zig 0.8.1, and the code no longer compiles with Zig 0.11.0.
* [Extending a C Project with Zig (2023)](https://zig.news/krowemoh/extending-a-c-project-with-zig-2023-18ej)

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

    try stdout.print("{d} + {d} = {d}.\n", .{ x, y, z });
    try bw.flush();
}

test "simple test" {
    const x: i32 = 5;
    const y: i32 = 16;
    try std.testing.expectEqual(@as(i32, 21), add(x, y));
}
```

# How to see the .h file?

https://github.com/kristoff-it/redis/blob/75ec423acefa885b92f1cf58094f0e51822b1a2c/build.zig

shows `addIncludeDir` but I get

```text
/home/mike/zig-c-simple/build.zig:33:15: error: no field or member function named 'addIncludeDir' in 'Build.Step.Compile'
    arithmetic.addIncludeDir(".");
    ~~~~~~~~~~^~~~~~~~~~~~~~
```

Got past it:

```zig
    arithmetic.addIncludePath(.{ .path = "." });
```
