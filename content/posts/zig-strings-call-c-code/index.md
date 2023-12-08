---
title: "Using Zig Strings to Call C Code"
date: 2023-12-01T10:37:03-05:00
---

[Zig](https://ziglang.org/) is a new, open-source programming language designed to replace C. I'm still a Zig beginner, and the way I'm trying to learn more about the language is by using Zig to rewrite parts of existing C applications.

One of the first challenges I encountered with Zig is understanding strings. I couldn't find much documentation about how Zig strings work when calling C code, so I'm sharing my findings in case they're helpful to others who want to use Zig to call C.

## A brief primer on C strings

Before I explain how to pass Zig strings into C code, I'll give a bit of background on how strings work in C.

In C, a string has the variable type of `char*`. A string is a sequence of characters, and `char*` means the variable stores the memory address of the first character in that sequence.

The `char*` type doesn't tell the compiler where the string ends. Instead, C applications indicate the end of a string with a "null terminator," a byte after the last character in a string with the value of `0`.

If I call `strlen`, which returns the length of a string, it tells me the number of characters in the string, excluding the null terminator:

```c
printf("strlen=%lu\n", strlen("hi"));
```

```text
strlen=2
```

However, if I call `sizeof` to get the size of the data in memory, I get a number that's one higher:

```c
printf("sizeof=%lu\n", sizeof("hi"));
```

```text
sizeof=3
```

The reason `sizeof` returns `3` for a two-character string is that C implicitly added a null terminator at the end of the string for me.

I can verify this by printing the value of the each character in the string:

```c
char s[] = "hi";
printf("%s=[%c, %c, %d]\n", s, s[0], s[1], s[2]);
```

```text
hi=[h, i, 0]
```

Strings in C and C++ are extremely fragile and are a frequent source of bugs and security vulnerabilities. Because the compiler knows so little about the string, there are tons of mistakes you can make:

- You have to iterate the entire string character by character to determine the length of the string.
- You accidentally overwrite the null terminator, destroying information about where the string ends.
- You try to add to the string and accidentally write past the end of the string, corrupting other program memory.

## Zig's goal: Fix C's mistakes while preserving C compatibility

Zig is designed to be a modern replacement for C, so it has a difficult job. It has to both correct the mistakes of C while also making it easy to interoperate with legacy C code.

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

`u8` is how Zig represents a byte, which is an unsigned value of 8 bits.

`:0` means that this is a sentinel-terminated buffer. In this case, the sentinel is `0`, the null byte.

`const` means that this is a constant variable, so I can't change it after I assign a value.

`*` means that this value is a pointer to a memory location.

Two important takeaways here:

- Zig always knows the length of a string variable.
- Zig adds a null terminator to every string.

## The null terminator is just for C

In C, a null terminator effectively determins the length of the string. If you have a five-character string, and you replace character 3 with a null byte, every C string function now considers that string to be two characters long.

```c
// Truncating a string in C.
char s[] = "hello";
s[2] = '\0';
printf("len=%lu\n", strlen(s));
printf("value=[%s]\n", s);
```

```text
len=2
value=[he]
```

In Zig, a string still has a null terminator, but as far as I can tell, the null terminator doesn't have special meaning within Zig. When I print the string or check its length, a null character makes no difference. Zig knows the string's true length regardless of where it find a null character.

```zig
const s = [_:0]u8{ 'h', 'e', 0, 'l', 'o' };
std.debug.print("s={s}\n", .{s});
std.debug.print("s.len={d}\n", .{s.len});
```

```text
s=helo
s.len=5
```

## Zig's bonus character for sentinel-terminated arrays

In Zig, a string is a type of sentinel-terminated array where the sentinel is 0. That means that Zig keeps a null terminator at the end of the string.

```zig
var s = "hello";
std.debug.print("s.len={d}\n", .{s.len});
```

```text
s.len=5
```

In most languages, if an array has size N, you're only able to read up to slot N - 1 in the array. In Zig, you're allowed to read up to slot N because Zig allocated an extra space for the null terminator:

```zig
var s = "hello";
std.debug.print("s[{d}]={d}\n", .{ s.len, s[s.len] });
```

```text
s[5]=0
```

Is this true, or is Zig just letting me read unallocated memory, and it happens to be zero?

No, I can see if I try to read one more character, as the code refuses to even compile:

```zig
var s = "hello";
std.debug.print("s[{d}]={d}\n", .{ s.len + 1, s[s.len + 1] });
```

```text
src/corrupt-string.zig:5:59: error: index 6 outside array of length 5 +1 (sentinel)
    std.debug.print("s[{d}]={d}\n", .{ s.len + 1, s[s.len + 1] });
```

The compiler message says explicitly that the variable has length 5 + 1, so it's reserving an extra slot for the null terminator.

I also see that if I manually construct a string without a null terminator, Zig refuses to read slot N:

```zig
const s = [_]u8{ 'h', 'e', 'l', 'l', 'o' };
std.debug.print("s[{d}]={d}\n", .{ s.len, s[s.len] });
```

```text
src/corrupt-string.zig:5:50: error: index 5 outside array of length 5
    std.debug.print("s[{d}]={d}\n", .{ s.len, s[s.len] });
                                                ~^~~~
```

Zig prevents you from overwriting the null terminator

```zig
var s = [_:0]u8{ 'h', 'e', 'l', 'l', 'o' };
s[s.len] = 'A';
std.debug.print("s[{d}]={d}\n", .{ s.len, s[s.len] });
```

```text
s[5]=0
```

## Using Zig to safely wrap C string functions

Knowing this, I can use Zig's types to ensure that when I pass strings to C functions, I make sure that I use the `[:0]u8` type so that Zig makes sure I'm using null-terminated strings.

There are two types:

- `[:0]u8` - Length-tracked, null-terminated strings
- `[*:0]u8` - Null-terminated string of unknown length

I'm not totally sure how you end up with the second one. Maybe it's specifically for wrapping C code that gives back a string of unknown length like `strdup`. You're trusting that the function properly null terminated.

But interestingly, on null-terminated

If this weren't a null-terminated string, I couldn't do this. For example, if I didn't bother declaring the type was null terminated, and I just had a function that accepts arrays, Zig will tell me that I can't check past the end of the array:

```zig

```

The compiler doesn't stop me from overwriting the null terminator if I really want to:

TODO
