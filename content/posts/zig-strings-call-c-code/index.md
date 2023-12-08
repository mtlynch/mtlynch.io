---
title: "Using Zig Strings to Call C Code"
date: 2023-12-01T10:37:03-05:00
---

[Zig](https://ziglang.org/) is a new, open-source programming language designed to replace C. I'm still a Zig beginner, and the way I'm trying to learn more about the language is by using Zig to rewrite parts of existing C applications.

One of the first challenges I encountered with Zig is understanding strings. I couldn't find much documentation about how Zig strings work when calling C code, so I'm sharing my findings in case they're helpful to others who want to use Zig to call C.

## A brief primer on C strings

Before I explain how to pass Zig strings into C code, I need to give a bit of background on how strings work in native C.

In C, a string has the variable type of `char*`. That means the variable stores the memory address where a string begins. The `char*` type doesn't tell the compiler where the string ends. Instead, C applications indicate the end of a string with a "null terminator," a byte after the last character in a string with the value of `0`.

### Exploring string length in C

In C, if I print information about a string, the

```c
void print_string_info(char* value) {
  printf("len=%lu\n", strlen(value));
  printf("value=[%s]\n", value);
}
```

If I call the function with the string `"hello"`:

```c
print_string_info("hello");
```

I get results like this:

```text
len=5
value=[hello]
```

### Truncatings trings in C

However, I can effectively truncate the string by replacing a character with the null byte (`\0`):

```c
char s[] = "hello";
s[2] = '\0';
print_string_info(s);
```

```text
len=2
value=[he]
```

Because I replaced the character at index `2` with a null byte, every string function in C treats that string as if it were two characters long.

This isn't a problem, but now any function that sees the string has no way of knowing the "true" length of the string.

### Making strings longer in C

What happens if I replace the null character in a string?

```c
char s[] = "hello";
s[5] = 'A'; // Replace the null byte with A.
print_string_info(s);
```

The results in this case are undefined, meaning that we don't know what the program will do. `strlen` and `printf` will continue reading past the `A` character looking for the next null byte, but we don't control memory past the end of the `"hello"` string we declared. The program will just be reading whatever happens to be in RAM at that memory location.

Often, this causes the program to crash because the operating system detects the application attempting to read memory outside of the address space that the program was assigned.

### Buffer overflows bugs in C

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

My buffer `str` only has enough room for 15 characters, including the null terminator. The string `"michael"` is seven characters, excluding terminator. The string `" rules"` is six characters, excluding null. The `print_rules` is able to concatenate the two into a 15-character buffer (7 + 6) and still have room for the null terminator.

If I try a longer string and exceed the limits of my 15-byte buffer, things don't go so well:

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
