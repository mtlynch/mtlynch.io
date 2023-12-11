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

## Zig's null terminator is for C compatibility

In C, a null terminator effectively determins the length of the string. If you have a five-character string, and you replace character 3 with a null byte, every C string function now considers that string to be two characters long.

```c
// Truncating a string in C.
char s[] = "hello";
s[2] = '\0';
printf("s=[%s]\n", s);
printf("len=%lu\n", strlen(s));
```

```text
s=[he]
len=2
```

In Zig, a string still has a null terminator, but as far as I can tell, the null terminator doesn't have special meaning within Zig. When I print the string or check its length, a null character makes no difference. Zig knows the string's true length regardless of where it find a null character.

```zig
// Trying to null-terminate a string in the middle in Zig.
const s = [_:0]u8{ 'h', 'e', 0, 'l', 'o' };
std.debug.print("s={s}\n", .{s});
std.debug.print("s.len={d}\n", .{s.len});
```

```text
s=[helo]
s.len=5
```

## Understanding null-termination in Zig

Just like in C, Zig strings are null-terminated.

Zig has a special variable type for sentinel-terminated arrays. The syntax for a sentinel-terminated array is square brackets containing the sentinel character, so that's why a string is `[:0]`, as strings are null (zero)-terminated.

Zig is the first language I've worked with that has sentinel-terminated arrays, so I was curious about how they work.

### The `len` field excludes the null character

When you declare a string in Zig, the it has a `len` property to report the string's length. Interestingly, the length excludes the null-termination character:

```zig
const s = "hi";
std.debug.print("s.len={d}\n", .{s.len});
```

```text
s.len=2
```

But I know that the length of the array is _actually_ three because it has to store the null byte as well. I can prove it by checking the size of the string in bytes:

```zig
const s = "hi";
// Dereference the string s with s.*. Otherwise, Zig would report the size of
// the pointer.
std.debug.print("@sizeOf={d}\n", .{@sizeOf(@TypeOf(s.*))});
```

```text
@sizeOf=3
```

### Where is the real array boundary?

In most languages, if an array has size N, you're only able to read up to slot N - 1 in the array. For example, in an array of size two, you can read slot `0`, and you can read slot `1`, but reading slot `2` will either cause a runtime crash or have undefined behaviour.

Zig's normal arrays behave similarly to other languages, but Zig's sentinel-terminated arrays allow you to read one slot beyond the supposed end of the array. This is because, despite what `.len` reports, there's an extra slot for the sentinel value:

```zig
var s = "hi";
std.debug.print("s[{d}]={d}\n", .{ s.len, s[s.len] });
```

```text
s[2]=0
```

At first, I wasn't sure if I was understanding the behavior properly. Maybe I'm actually reading beyond the array bounds, but the next byte in memory happens to be 0.

I can disprove my alternate hypothesis by trying to read one more character: the code refuses to even compile:

```zig
var s = "hello";
std.debug.print("s[{d}]={d}\n", .{ s.len + 1, s[s.len + 1] });
```

```text
src/corrupt-string.zig:5:59: error: index 6 outside array of length 5 +1 (sentinel)
    std.debug.print("s[{d}]={d}\n", .{ s.len + 1, s[s.len + 1] });
```

The compiler message says explicitly that the variable has length 5 + 1, so it's reserving an extra slot for the null terminator.

The Zig documentation confirms my understanding:

> Sentinel-terminated slices allow element access to the `len` index.
>
> https://ziglang.org/documentation/0.11.0/#Sentinel-Terminated-Slices

### You can't overwrite the null-terminator

The Zig documentation claims that the `[:0]` syntax means that Zig "guarantees a sentinel value at the element indexed by the length."

I decided to test this by overwriting the null character in a null-terminated buffer:

```zig
var s = [_:0]u8{ 'h', 'e', 'l', 'l', 'o' };
s[s.len] = 'A';
```

Surprisingly, the above code compiles and runs without an error. Isn't Zig supposed to guarantee the null-termination property?

It turns out that, Zig guarantees the null-termination by ignoring operations to overwrite the null-terminator character. Even though Zig allows me to write code that overwrites the null-termination character, the operation is ignored, and that slot in the array preserves its original value of `0`.

```zig
var s = [_:0]u8{ 'h', 'e', 'l', 'l', 'o' };
s[s.len] = 'A';  // This line has no effect.
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
