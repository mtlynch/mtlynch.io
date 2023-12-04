---
title: "Using Zig Strings to Call C Code"
date: 2023-12-01T10:37:03-05:00
---

## A brief primer on C strings

In C, a string has the variable type of `char*`. That means the variable stores the memory address where a string begins. The compiler doesn't know where the string ends.

C strings don't contain information about the string's length. Instead, C applications indicate the end of a string with a "null terminator," a byte after the last character in a string with the value of `0`.

Suppose you have the following function in C that takes a string and adds " rules!" to it:

```c
// INSECURE: Don't do any of this in production code.
void print_rules(char* name) {
  // Create a buffer for our full string that can hold 14 characters plus a null
  // terminator.
  char str[15] = {'\0'};

  // Copy the name into the buffer.
  strcpy(str, name);

  // Copy the end of the string into the buffer.
  strcat(str, " rules!");

  // Print the contents of the full string.
  printf("%s\n", str);
}
```

If I call the function like this:

```c
print_rules("michael");
```

Then the function will print a result like this:

```text
michael rules!
```

But if I try a longer string and exceed the limits of the 15-byte buffer, I created, things don't go so well:

```c
print_rules("rumplestiltskin");
```

```text
*** buffer overflow detected ***: terminated
```

The program crashes because I tried to write beyond the memory region that was allocated for my application. C failed to prevent this mistake because C compilers generally can't identify this class of error, which has been a pervasive source of bugs and security vulnerabilities in C applications.

## Zig strings fix C's mistakes while preserving C compatibility

Zig is designed to be a modern replacement for C, so it has a difficult job. It has to both correct the mistakes of C while also making it easy to interoperate with legacy C code.

In Zig, strings are both null-terminated and length-checked. Null-terminating Zig strings makes it easy to pass them into C functions, as Zig strings look to a C application just like native C strings.

## A basic Zig string

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
