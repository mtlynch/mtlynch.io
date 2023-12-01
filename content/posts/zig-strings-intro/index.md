---
title: "A Beginner's Introduction to Zig Strings"
date: 2023-12-01T10:37:03-05:00
---

## A brief primer on C strings

In C, a string looks like this:

```c
char* s = "hello";
```

The type is `char*`. That means the variable stores the memory address where a string begins. The compiler doesn't know where the string ends.

C strings don't contain information about the string's length. Instead, C applications indicate the end of a string with a "null terminator," a byte after the last character in a string with the value of `0`.

```c
// Create a string with five characters + one null terminator = 6 bytes.
char *s = "hello";
// Copy a 13-character string into a six-byte buffer.
strcpy(s, "hello, world!");
```

This code compiles just fine. Modern C compilers will throw up warnings, but it's legal C code, and the compiler will produce an executable. When you run the executable, it immediately crashes because the `strcpy` tried to write 14 bytes in a memory buffer that was only allocated to store six.

C's lack of string checking has been an endless source of bugs and security vulnerabilities. Most languages since C have provided safeguards that make it harder for developers to corrupt memory through string operations.

## Zig strings

Zig is designed to be a modern replacement for C, so it has a difficult job. It has to both correct the mistakes of C while also making it easy to interoperate with legacy C code.

In Zig, strings are both null-terminated and length-checked. Null-terminating Zig strings makes it easy to pass them into C functions, as Zig strings look to a C application just like native C strings.

Here's a simple Zig application to show how Zig sees strings:

```zig
const std = @import("std");

pub fn main() !void {
    const s = "hello";
    std.debug.print("s is type {s}\n", .{@typeName(@TypeOf(s))});
}
```

```bash
$ zig run src/strings.zig
s is type *const [5:0]u8
```

The string `"hello"` in Zig has a type of `*const [5:0]u8`.

I'll go from right to left.

`u8` is how Zig represents a byte. An unsigned value of 8 bits.

`:0` means that this is a sentinel-terminated buffer. In this case, the sentinel is `0`

Calling strlen

```bash
$ zig run src/strings.zig --needed-library c
```

https://www.huy.rocks/everyday/01-04-2022-zig-strings-in-5-minutes
