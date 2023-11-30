---
title: "Using Zig to Unit Test a C Application"
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
  https://github.com/pikvm/ustreamer.git
```

## What's the simplest C function in uStreamer?

I wanted to find something self-contained. I pass it in some input, and it gives me some output that I can inspect easily.

I found the [`base64.c`](https://github.com/pikvm/ustreamer/blob/v5.45/src/libs/base64.c). That sounded like a good match. I understand the basics

Here's the function signature.

```c
// src/libs/base64.h

void us_base64_encode(const uint8_t *data, size_t size, char **encoded, size_t *allocated);
```

From inspecting the `.c` file implementation, here's what I deduce about the semantics of `us_base64_encode`:

- `data` is input data to encode with the base64 encoding scheme.
- `size` is the length of the `data` buffer (in bytes).
- `encoded` is a pointer to an output buffer in which `us_base64_encode` stores the base64-encoded string.
  - `us_base64_encode` allocates memory for the output, and the caller is responsible for freeing the memory when they're done with it.
  - Technically, `us_base64_encode` allows the caller to allocate the buffer for `encoded`, but, for simplicity, I'm ignoring that functionality.
- `allocated` is a pointer that `us_base64_encode` populates with the number of bytes it allocated into `encoded`.

Here's a simple test program to call this function from C:

```c
// src/test.c

#include <stdio.h>

#include "libs/base64.h"

void main(void) {
  char *raw = "hello, world!";
  char *encoded = NULL;
  size_t encoded_bytes = 0;
  us_base64_encode((uint8_t *)raw, strlen(raw), &encoded, &encoded_bytes);
  printf("encoded=%s\n", encoded);
  printf("encoded_bytes=%u\n", encoded_bytes);
  free(encoded);
}
```

```bash
$ gcc src/test.c src/libs/base64.c -o /tmp/b64test && /tmp/b64test
encoded=aGVsbG8sIHdvcmxkIQ==
encoded_bytes=21
```

If I compare the output to my system's built-in `base64` utility, I can verify that my test C application is producing the correct result:

```bash
$ printf 'hello, world!' | base64
aGVsbG8sIHdvcmxkIQ==
```

## Adding Zig to my uStreamer project environment

My favorite way of installing Zig is [with Nix](https://zero-to-nix.com/), as it allows me to switch Zig versions easily. Feel free to [install Zig](https://ziglang.org/learn/getting-started/) any way you prefer.

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
# There's a weird quirk of Nix flakes that they have to be added to your git
# repo.
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

## Calling uStreamer code from Zig

Now, I want to call the `us_base64_encode` C function from Zig.

As a reminder, here's the C function I'm trying to call from Zig, which I explained [above](http://blog.local:1313/notes/zig-unit-test-c/#whats-the-simplest-c-function-in-ustreamer):

```c
// src/libs/base64.h

void us_base64_encode(const uint8_t *data, size_t size, char **encoded, size_t *allocated);
```

Figuring out how to translate between C types and Zig types turned out to be the hardest part of this process, as I'm still a Zig novice.

Here was my first attempt:

```zig
// src/main.zig

const ustreamer = @cImport({
    @cInclude("libs/base64.c");
});

pub fn main() !void {
    const input = "hello, world!";
    var cEncoded: *u8 = undefined;
    var allocatedSize: usize = 0;
    // WRONG: This doesn't compile.
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

### Translating the input parameters into Zig

The important bit of the compiler error above is `error: expected type '[*c]const u8', found '*const *const [13:0]u8'`. It's telling me that I tried to pass in a `*const *const [13:0]u8`, but Zig needs me to pass in `[*c]const u8`. What does that mean?

The easiest thing for me to figure out was the `13`. That's the length of the string `hello, world!`.

```bash
$ printf "hello, world!" | wc --chars
13
```

But what does `[13:0]` mean? That's [a sentinel-terminated pointer](https://ziglang.org/documentation/0.11.0/#Sentinel-Terminated-Pointers).

In C, the language doesn't keep track of the length of strings. Instead, it places a byte with the value of `0` at the end of a string to indicate where the string ends.

In Zig, the compiler keeps track of strings' lengths, but it also terminates them with a `0` byte, a decision I'm assuming was made specifically to facilitate calling C libraries from Zig.

So, that's half of understanding the type of the `input` parameter in our Zig compiler error. The full type was `*const *const [13:0]u8`.

Strings in Zig are immutable, so that explains why a 13-character, null-terminated string would have a type of `*const [13:0]u8`. And I passed `input` with the `&` operator to get its pointer, so that explains why it's a constant pointer to a constant pointer.

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

I didn't understand this explanation, but more [Kagi](https://kagi.com)'ing led me to this explanation on reddit, which I found more accessible:

> `[*c]T` is just a C pointer to type T, it says that it doesn't know whether there are multiple elements in that pointer or not. There could be, there could not be. We also don't know the length of it (it's not a slice which has pointer+length, it's just a pointer). And if there are multiple elements, we don't know if it is say null-terminated or not.
>
> [-/u/slimsag on reddit](https://www.reddit.com/r/Zig/comments/11uqo84/comment/jcplxiz/)

Okay, that makes more sense. It sounds like in Zig, the compiler "knows" more about pointer types, whereas C pointers carry less context. The `[*c]` type represents a pointer that Zig got from C, so Zig knows less about this pointer than it normally would for Zig-native pointers.

Through trial and error, I figured out that Zig wanted me to get a pointer to `input` by referencing `input.ptr` rather than using the address of operator `&`. This Zig snippet shows the difference between the two:

```zig
const input = "hello, world!";
std.debug.print("input     is type {s}\n", .{@typeName(@TypeOf(input))});
std.debug.print("&input    is type {s}\n", .{@typeName(@TypeOf(&input))});
std.debug.print("input.ptr is type {s}\n", .{@typeName(@TypeOf(input.ptr))});
```

```text
input     is type *const [13:0]u8
&input    is type *const *const [13:0]u8
input.ptr is type [*]const u8
```

Okay, let's try it again:

```zig
const input = "hello, world!";
var cEncoded: *u8 = undefined;
var allocatedSize: usize = 0;
ustreamer.us_base64_encode(input.ptr, input.len, &cEncoded, &allocatedSize);
```

That gives me:

```bash
$ zig build run
zig build-exe b64 Debug native: error: the following command failed with 1 compilation errors:
...
src/main.zig:12:54: error: expected type '[*c][*c]u8', found '**u8'
    ustreamer.us_base64_encode(input.ptr, input.len, &cEncoded, &allocatedSize);
                                                     ^~~~~~~~~
```

Progress!

The code still doesn't compile, but Zig is now complaining about the third parameter instead of the first. That at least tells me that I've supplied the expected types for the first two parameters.

### Translating the output parameters into Zig

The compiler error also contains a helpful bit of information for calling into the C implementation of `us_base64_encode`:

```bash
pub export fn us_base64_encode(arg_data: [*c]const u8, arg_size: usize, arg_encoded: [*c][*c]u8, arg_allocated: [*c]usize) void {
```

That's the signature of the C function translated into Zig, so Zig is telling me exactly the types I need to pass in to call the function.

Alternatively, I can use the `zig translate-c` utility to translate this C function signature into Zig. This effectively gives the same results as the compiler error above, but it preserves the original parameter names, whereas the compiler error prefixes them with `arg_`.

```bash
# We add --needed-library c to let Zig know the code depends on libc.
$ zig translate-c src/libs/base64.h --needed-library c | grep us_base64
pub extern fn us_base64_encode(data: [*c]const u8, size: usize, encoded: [*c][*c]u8, allocated: [*c]usize) void;
```

From more trial and error, I eventually guessed my way to these semantics for calling `us_base64_encode` from Zig:

```zig
const input = "hello, world!";
var cEncoded: [*c]u8 = null;
var allocatedSize: usize = 0;
ustreamer.us_base64_encode(input.ptr, input.len, &cEncoded, &allocatedSize);
```

And it compiles successfully! Here's the full `src/main.zig` file:

```zig
// src/main.zig

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

    // Free the memory that the C function allocated when this function exits.
    defer std.c.free(cEncoded);

    // Print the input and output of the base64 encode operation.
    std.debug.print("input:       {s}\n", .{input});
    std.debug.print("output:      {s}\n", .{cEncoded});
    std.debug.print("output size: {d}\n", .{allocatedSize});
}
```

```bash
$ zig build run
input:       hello, world!
output:      aGVsbG8sIHdvcmxkIQ==
output size: 21
```

Great! That worked. And the results are identical to [my C implementation above](#whats-the-simplest-c-function-in-ustreamer).

The code at this point is at zig-10-simple-exe.

## Creating a Zig wrapper for the native C implementation

https://stackoverflow.com/a/72975237/90388

---

_Excerpts from uStreamer are used under the GPLv3 license._
