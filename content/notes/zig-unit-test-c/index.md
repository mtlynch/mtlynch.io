---
title: "Using Zig to Add Unit Tests to a C Application"
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
  --single-branch \
  --branch "${USTREAMER_VERSION}" \
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

## Configure Zig to import C code

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

## Calling uStreamer code from Zig

Now, I want to call the `us_base64_encode` C function from C. Here's the function signature.

```c
// src/libs/base64.h

void us_base64_encode(const uint8_t *data, size_t size, char **encoded, size_t *allocated);
```

From inspecting the `.c` file implementation, here's what I deduce about the semantics of `us_base64_encode`:

- `data` is input data to encode with base64.
- `size` is the length of the data (in bytes).
- `encoded` is a pointer to an output buffer in which `us_base64_encode` stores the base64-encoded string. `us_base64_encode` allocates memory for the output, and the caller is responsible for freeing the memory when they're done with it.
  - Technically, `us_base64_encode` allows the caller to allocate the buffer for `encoded`, but, for simplicity, I'm ignoring that functionality.
- `allocated` is a pointer to the number of bytes the function allocated into `encoded`.

Now that I understand `us_base64_encode`, the next step is to call the function from Zig code. This turned out to be the hardest part of this process. I'm still a Zig novice, so I had trouble with the basics of creating the right Zig types to match the parameters that the C function required.

Here was my first attempt:

```zig
const ustreamer = @cImport({
    @cInclude("libs/base64.c");
});

pub fn main() !void {
    // WRONG: This doesn't compile.
    const input = "hello, world!";
    var cEncoded: *u8 = undefined;
    var allocatedSize: usize = 0;
    ustreamer.us_base64_encode(&input, input.len, &cEncoded, &allocatedSize);
}
```

That yielded this compiler error:

```bash
$ zig build run
zig build-exe b64 Debug native: error: the following command failed with 1 compilation errors:
...
src/main.zig:17:32: error: expected type '[*c]const u8', found '*const *const [13:0]u8'
    ustreamer.us_base64_encode(&input, input.len, &cEncoded, &allocatedSize);
                               ^~~~~~
src/main.zig:17:32: note: pointer type child '*const [13:0]u8' cannot cast into pointer type child 'u8'
/home/mike/ustreamer/zig-cache/o/9599bf4c636d23e50eddd1a55dd088ff/cimport.zig:1796:43: note: parameter type declared here
pub export fn us_base64_encode(arg_data: [*c]const u8, arg_size: usize, arg_encoded: [*c][*c]u8, arg_allocated: [*c]usize) void {
```

I had trouble understanding this error at first because so much of it was unfamiliar.

The important bit is `error: expected type '[*c]const u8', found '*const *const [13:0]u8'`. Okay, so I tried to pass in a `*const *const [13:0]u8`, but Zig needs me to pass in `[*c]const u8`. What does that mean?

The easiest thing for me to figure out was the `13`. That's the length of the string `hello, world!`.

```bash
$ printf "hello, world!" | wc --chars
13
```

But what does `[13:0]` mean? That's [a sentinel-terminated pointer](https://ziglang.org/documentation/0.11.0/#Sentinel-Terminated-Pointers). In C, the language doesn't keep track of the length of strings. Instead, it places a byte with the value of `0` at the end of a string to indicate where the string ends. In Zig, the compiler keeps track of strings' lengths, but it also terminates them with a `0` byte, a decision I'm assuming was made specifically to facilitate calling C libraries from Zig.

So, that's half of understanding the type of the `input` parameter in our Zig compiler error. The full type was `*const *const [13:0]u8`. So, strings in Zig are immutable, so that explains why a 13-character, null-terminated string would have a type of `*const [13:0]u8`. And I passed `input` with the `&` operator to get its pointer, so that explains why it's a constant pointer to a constant pointer.

Okay, now I understand what I passed. What did Zig _want_ me to pass as the `input` type?

```text
expected type '[*c]const u8'
```

What the heck does `[*c]` mean? This was surprisingly hard to figure out, but I eventually pieced it together from a few different sources.

Here's the official Zig documentation:

> ### C Pointers
>
> This type is to be avoided whenever possible. The only valid reason for using a C pointer is in auto-generated code from translating C code.
>
> When importing C header files, it is ambiguous whether pointers should be translated as single-item pointers (_T) or many-item pointers ([_]T). C pointers are a compromise so that Zig code can utilize translated header files directly.
>
> https://ziglang.org/documentation/0.11.0/#C-Pointers

That was a little too compiler nerdy for me to parse. I found a more beginner-friendly explanation on reddit:

> `[*c]T` is just a C pointer to type T, it says that it doesn't know whether there are multiple elements in that pointer or not. There could be, there could not be. We also don't know the length of it (it's not a slice which has pointer+length, it's just a pointer). And if there are multiple elements, we don't know if it is say null-terminated or not.
>
> [-/u/slimsag on reddit](https://www.reddit.com/r/Zig/comments/11uqo84/comment/jcplxiz/)

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
