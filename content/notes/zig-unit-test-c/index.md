---
title: "Use Zig to Unit Test a C Application"
date: 2023-11-26T00:00:00-05:00
tags:
  - zig
---

[Zig](https://ziglang.org/) is a new, independently developed low-level programming language. It's a modern reimagining of C that attempts to retain all of C's performance benefits while also taking advantage of improvements in tooling and language design from the last 30 years.

One of the main differences from C is that Zig treats unit testing as a first-class feature. This makes it easier to port legacy code from C to Zig. Legacy C applications rarely have unit tests, but using Zig, we can first write unit tests for the existing code to verify the existing behavior, then port the code from C to Zig and have confidence that we haven't broken behavior.

## Adding unit tests to uStreamer

For the past three years, I've been working on TinyPilot, an open-source KVM over IP. In short, it allows users to plug a Raspberry Pi into any computer and then control that computer remotely.

To stream the target computer's display, TinyPilot uses uStreamer, a video streaming app that's optimized for Raspberry Pi's hardware.

I've been working with uStreamer for several years, but I've had trouble getting a handle on it because it's a complex C codebase with no automated tests. As an experiment, I tried to use Zig to get uStreamer under test.

## Getting the uStreamer source code

```bash
USTREAMER_VERSION='v5.45'
git clone \
  --branch "${USTREAMER_VERSION}" \
  --single-branch \
  https://github.com/pikvm/ustreamer.git
```

## Finding the simplest C function in uStreamer

I wanted to find something self-contained. I pass it in some input, and it gives me some output that I can inspect easily.

I found the [`base64.c`](https://github.com/pikvm/ustreamer/blob/v5.45/src/libs/base64.c). That sounded like a good match. I understand the basics

## Adding Zig to my uStreamer project environment

My favorite way of installing Zig is [with Nix](https://zero-to-nix.com/), as it allows me to switch Zig versions easily. Feel free to install Zig any way you prefer, but the version I'm using is 0.11.0.

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
$ git add flake.nix
$ nix develop
zig 0.11.0
```

## Creating a Zig executable

```bash
$ zig init-exe
info: Created build.zig
info: Created src/main.zig
info: Next, try `zig build --help` or `zig build run`
```

```bash
$ zig build run
All your codebase are belong to us.
Run `zig build test` to run the tests.
```

## Calling uStreamer code from Zig

```c
// src/libs/base64.h

void us_base64_encode(const uint8_t *data, size_t size, char **encoded, size_t *allocated);
```

- `data` is input data for the function to encode with base64.
- `size` is the length of the data (in bytes).
- `encoded` is a pointer to a buffer in which to store the base64-encoded string.
- `allocated` is a pointer to the number of bytes the function allocated into `encoded`.

First, I need to adjust my `build.zig` file so that my `src/main.zig` can build against uStreamer's sources:

```zig
    const exe = b.addExecutable(.{
        .name = "base64-encoder", // Change binary name.
        .root_source_file = .{ .path = "src/main.zig" },
        .target = target,
        .optimize = optimize,
    });
    exe.linkLibC();               // Link against C standard library.
    exe.addIncludePath(.{ .path = "src" });
```

Next, I rewrite `src/main.zig` as follows:

```zig
const std = @import("std");

// Import the base64 implementation from uStreamer's C source file.
const ustreamer = @cImport({
    @cInclude("libs/base64.c");
});

pub fn main() !void {
    // Create a standard Zig string.
    const input = "hello, world!";

    // Create variables to store the ouput parameters of us_base64_encode.
    var cEncoded: [*c]u8 = null;
    var allocatedSize: usize = 0;

    // Call the uStreamer C function from Zig.
    ustreamer.us_base64_encode(input.ptr, input.len, &cEncoded, &allocatedSize);
    defer std.c.free(cEncoded);

    // Print the input and output of the base64 encode operation.
    std.debug.print("input:  {s}\n", .{input});
    std.debug.print("output: {s}\n", .{cEncoded});
}
```

When I try `zig build run`, I get this error:

```text
src/main.zig:3:16: error: C import failed
const base64 = @cImport({
               ^~~~~~~~
referenced by:
    main: src/main.zig:13:5
    callMain: /nix/store/bg6hyfzr1wzk795ii48mc1v15bswcvp3-zig-0.11.0/lib/zig/std/start.zig:574:32
    remaining reference traces hidden; use '-freference-trace' to see all reference traces
/home/mike/ustreamer/src/libs/tools.h:194:27: error: call to undeclared function 'sigabbrev_np'; ISO C99 and later do not support implicit function declarations
 const char *const name = sigabbrev_np(signum);
                          ^
/home/mike/ustreamer/src/libs/tools.h:194:20: error: incompatible integer to pointer conversion initializing 'const char *const' with an expression of type 'int'
 const char *const name = sigabbrev_np(signum);
                   ^
/home/mike/ustreamer/src/libs/tools.h:205:3: error: call to undeclared function 'asprintf'; ISO C99 and later do not support implicit function declarations
  US_ASPRINTF(buf, "SIG%s", name);
  ^
/home/mike/ustreamer/src/libs/tools.h:207:3: error: call to undeclared function 'asprintf'; ISO C99 and later do not support implicit function declarations
  US_ASPRINTF(buf, "SIG[%d]", signum);
```

If I look into `src/libs/tools.h`, I see that all the errors are around [a single function](https://github.com/pikvm/ustreamer/blob/v5.45/src/libs/tools.h#L192-L210). Let me see if I can just comment out that function to get the build working.

```c

/*
DEBUG: Temporarily delete this function to get the build working again.
INLINE char *us_signum_to_string(int signum) {
...
	return buf;
}
*/
```

With the pesky `tools.h` function removed, I'll try the build again:

```bash
$ zig build run
input:  hello, world!
output: aGVsbG8sIHdvcmxkIQ==
```

Great! That worked.

If I compare the output to my system's built-in `base64` utility, I can verify that it's producing the correct result:

```bash
$ printf 'hello, world!' | base64
aGVsbG8sIHdvcmxkIQ==
```

## Breaking down the simple Zig program

The import:

```zig
// Import the base64 implementation from uStreamer's C source file.
const ustreamer = @cImport({
    @cInclude("libs/base64.c");
});
```

The import is simple. It's pulling in the `base64.c` file so that I can call it from Zig code.

Next, I create a simple input string:

```zig
// Create a standard Zig string.
const input = "hello, world!";
```

In C, strings are null-terminated, meaning that they end in a byte with a value of `0`.

The [Zig documentation](https://ziglang.org/documentation/0.11.0/#String-Literals-and-Unicode-Code-Point-Literals) confirms that Zig's strings are also null-terminated

> String literals are constant single-item Pointers to null-terminated byte arrays.

This is convenient, as it means we can pass standard Zig strings to C functions that expect strings. In the case of `us_base64_encode`, that's not so critical, as it expects a pointer to a buffer of bytes (`uint8_t*`).

This is where it gets tricky. How do I get the result of `us_base64_encode` from Zig? Let me take another look at the function signature:

```c
void us_base64_encode(const uint8_t *data, size_t size, char **encoded, size_t *allocated);
```

So, `us_base64_encode` takes a pointer to a pointer to a string buffer. From inspecting the implementation in `base64.c`, I see that `us_base64_encode` allocates memory on the caller's behalf and stores the address of the buffer in the `encoded` parameter.

`us_base64_encode` does the same thing with the `allocated` parameter, and that's simpler to reason about. The caller provides `us_base64_encode` with the memory address of an unsigned integer, and `us_base64_encode` populates that address with the number of bytes it allocated for `encoded`.

```bash
$ zig translate-c src/libs/base64.h --needed-library c | grep us_base64
pub extern fn us_base64_encode(data: [*c]const u8, size: usize, encoded: [*c][*c]u8, allocated: [*c]usize) void;
```

--

Excerpts from uStreamer are licensed under the GPLv3.
