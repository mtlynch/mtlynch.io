---
title: "Using Zig to Call C Code: Strings"
date: 2023-12-15T00:00:00-05:00
tags:
  - zig
---

[Zig](https://ziglang.org/) is a new, open-source programming language designed to replace C. I'm still a Zig beginner, and the way I'm trying to learn more about the language is by using Zig to rewrite parts of existing C applications.

One of the first challenges I encountered with Zig is understanding strings. I couldn't find much documentation about how Zig strings work when calling C code, so I'm sharing my findings in case they're helpful to others who want to use Zig to call C.

## A brief primer on C strings

Before I explain how to pass Zig strings into C code, I'll give a bit of background on how strings work in C.

In C, a string has the variable type of `char*`.

```c
char* example = "Hi, I'm a C string!";
```

A string is a sequence of characters, and `char*` means the variable stores the memory address of the first character in that sequence.

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

Strings in C and C++ are extremely fragile and frequently cause bugs and security vulnerabilities. Because the compiler doesn't know the length of the string, it's easy to accidentally overwrite memory that belongs to other variables in your application.

## A basic Zig string

Zig is designed to be a modern replacement for C, so it has a difficult job. It has to both correct the mistakes of C while also making it easy to interoperate with legacy C code.

Here's a simple Zig application to demonstrate how Zig handles strings:

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

There's a lot of information in the variable type, so I'll explain it from right to left.

`u8` is how Zig represents a byte, which is an unsigned value of 8 bits.

`:0` means that this is a sentinel-terminated buffer with a sentinel value of `0` (i.e., a null-terminated buffer).

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

### The `len` field excludes the null character

When you declare a string in Zig, the it has a `len` property to report the string's length. Interestingly, the length excludes the null-termination character:

```zig
const s = "hi";
std.debug.print("s.len={d}\n", .{s.len});
```

```text
s.len=2
```

But I know that the length of the buffer is _actually_ three because it has to store the null byte as well. I can prove it by checking the size of the string in bytes:

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

In most languages, if an array has size N, you're only able to read up to slot N - 1 in the array. For example, in an array of size two, you can read slot `0`, and you can read slot `1`, but reading slot `2` will either cause a runtime crash or have undefined behavior.

Zig's normal arrays behave similarly to other languages, but Zig's sentinel-terminated arrays allow you to read one slot beyond the supposed end of the array. This is because, despite what `.len` reports, there's an extra slot for the sentinel value:

```zig
var s = "hi";
std.debug.print("s[{d}]={d}\n", .{ s.len, s[s.len] });
```

```text
s[2]=0
```

At first, I wasn't sure if I was understanding the behavior properly. Maybe I'm actually reading beyond the array bounds, but the next byte in memory happens to be 0.

No, the Zig documentation confirms that you can read slot N in an N-length sentinel-terminated array:

> Sentinel-terminated slices allow element access to the `len` index.
>
> https://ziglang.org/documentation/0.11.0/#Sentinel-Terminated-Slices

I can also try to read slot N + 1 and see that Zig refuses to even compile the code:

```zig
var s = "hi";
std.debug.print("s[{d}]={d}\n", .{ s.len + 1, s[s.len + 1] });
```

```text
src/corrupt-string.zig:5:59: error: index 3 outside array of length 2 +1 (sentinel)
    std.debug.print("s[{d}]={d}\n", .{ s.len + 1, s[s.len + 1] });
                                                    ~~~~~~^~~
```

The compiler message says explicitly that the variable has length `2 + 1`, so it's reserving an extra slot for the null terminator.

### You can't overwrite the null-terminator

The Zig documentation claims that the `[:0]` syntax means that Zig ["guarantees a sentinel value at the element indexed by the length."](https://ziglang.org/documentation/0.11.0/#Sentinel-Terminated-Slices)

I decided to test this by overwriting the null character in a null-terminated buffer:

```zig
var s = [_:0]u8{ 'h', 'e', 'l', 'l', 'o' };
s[s.len] = 'A';
```

The above code compiles and runs without an error.

That's surprising. Isn't Zig supposed to guarantee the null-termination property?

It turns out that Zig guarantees the null-termination by [ignoring assignments that overwrite the null-terminator character](https://github.com/ziglang/zig/issues/9791#issuecomment-1854907508). So even though my code told Zig to overwrite the null-termination character, Zig casually ignores the assignment and preserves the string's null-termination property.

```zig
var s = [_:0]u8{ 'h', 'e', 'l', 'l', 'o' };
s[s.len] = 'A';  // This line has no effect.
std.debug.print("s[{d}]={d}\n", .{ s.len, s[s.len] });
```

```text
s[5]=0
```

## Passing Zig strings to C code

Now that I understand how Zig strings work, I can show how to leverage Zig's guarantees to call into C code more safely.

Imagine that from my Zig code, I want to call a C function that takes a string parameter. As an example, I'll show how I'd call the C standard library [`strlen` function](https://en.cppreference.com/w/cpp/string/byte/strlen):

```c
// Returns the length of the C string str.
size_t strlen(const char* str);
```

`strlen` is a simple function. It iterates through a string looking for the first `0` byte and returns the number of bytes that _weren't_ `0`.

To call C functions that C declares in its `string.h` header file, I can import the header like this:

```zig
const cString = @cImport({
    @cInclude("string.h");
});
```

That allows me to call the `strlen` function from Zig like this:

```zig
cString.strlen("hello!");
```

With that in mind, let me create a Zig-native wrapper to abstract away the C:

```zig
fn strlen(str: [:0]const u8) usize {
    return cString.strlen(str);
}
```

I define the parameter as `[:0]const u8` to ensure that any Zig caller passes a string that's null-terminated. This is a stronger guarantee than you'd get in C, where the compiler doesn't ensure that strings are truly null-terminated.

Here's a complete Zig program to demonstrate the behavior:

```zig
// src/wrap-strlen.zig

const std = @import("std");

const cString = @cImport({
    @cInclude("string.h");
});

fn strlen(str: [:0]const u8) usize {
    return cString.strlen(str);
}

pub fn main() !void {
    const s = "hi";
    std.debug.print("strlen({s})={d}\n", .{ s, strlen(s) });
}
```

Because I'm importing `string.h`, a C header from the C standard library, I need to pass `--library c` to tell the Zig compiler to link against libc.

```bash
$ zig run src/wrap-strlen.zig --library c
strlen(hi)=2
```

By wrapping the C function with a Zig function that takes a parameter of type `[:0]const u8`, I have confide that any string I pass to C is properly null-terminated because I trust the Zig compiler to enforce that for me.

What what happens when I try to pass in a string that's not null-terminated:

```zig
const notNullTerminated = [_]u8{ 'h', 'i' };
std.debug.print("strlen({s})={d}\n", .{ notNullTerminated, strlen(&notNullTerminated) });
```

```bash
$ zig run src/wrap-strlen-badcall.zig --library c
src/wrap-strlen-badcall.zig:13:71: error: expected type '[:0]const u8', found '*const [2]u8'
    std.debug.print("strlen({s})={d}\n", .{ notNullTerminated, strlen(&notNullTerminated) });
                                                                      ^~~~~~~~~~~~~~~~~~
src/wrap-strlen-badcall.zig:13:71: note: destination pointer requires '0' sentinel
src/wrap-strlen-badcall.zig:7:16: note: parameter type declared here
fn strlen(str: [:0]const u8) usize {
               ^~~~~~~~~~~~
```

Zig catches the error at compile time because it sees that `strlen` requires a null-terminated string (`[:0]u8`), but `notNullTerminated` is type `const [2]u8`, so it's missing the null-termination property.

### Null-termination is not a strict guarantee

Even though the Zig compiler makes calling into C string functions safer, it still can't guarantee that a type of `[:0]u8` is null-terminated.

I can trick Zig by creating a slice from an existing array and incorrectly declaring it to be null-terminated:

```zig
var a = [_]u8{ 'h', 'e', 'l', 'l', 'o' };
// This is a lie, as this slice isn't really null-terminated.
const s = a[0..2 :0];
std.debug.print("strlen({s})={d}\n", .{ s, strlen(s) });
```

If I compile this Zig code with default settings, Zig adds debug checks that cause a panic at runtime:

```bash
$ zig run src/wrap-strlen-evil.zig --library c
thread 43926 panic: sentinel mismatch: expected 0, found 108
/home/mike/ustreamer/src/wrap-strlen-evil.zig:13:16: 0x21fefc in main (wrap-strlen-evil)
    const s = a[0..2 :0];
               ^
/nix/store/bg6hyfzr1wzk795ii48mc1v15bswcvp3-zig-0.11.0/lib/zig/std/start.zig:574:37: 0x220477 in main (wrap-strlen-evil)
            const result = root.main() catch |err| {
                                    ^
???:?:?: 0x7ffff7dffacd in ??? (libc.so.6)
Unwind information for `libc.so.6:0x7ffff7dffacd` was not available, trace may be incomplete
```

The error `sentinel mismatch: expected 0, found 108` means that at slot 2 in the array, Zig expected to find a `0` byte, but it found the `'l'` character (represented as `108`).

If I compile the code in release mode, the program has undefined behavior:

```bash
$ zig run src/wrap-strlen-evil.zig --library c -O ReleaseFast
strlen(he)=5
```

Zig sees the string `s` as having two characters because it knows the length of the slice. C doesn't have length information, so it searches for the first null byte, which causes the program to read beyond the memory allocated for the `a` array. Depending on the environment, this program could also crash with an access violation because it's reading memory beyond what it allocated.

## Receiving C strings in Zig

Above, I showed how to write a Zig wrapper around a C function that takes a string as an input parameter.

How do I handle C functions that produce C strings as output?

As an example, I'll show how to create a Zig wrapper around the C [`strdup` function](https://en.cppreference.com/w/c/experimental/dynamic/strdup):

```c
// Returns a pointer to a null-terminated byte string, which is a duplicate of
// the string pointed to by str1. The returned pointer must be passed to free to
// avoid a memory leak.
char* strdup(const char* str1);
```

```zig
const StrdupError = error{
    StrdupFailure,
};

fn strdup(str: [:0]const u8) ![*:0]u8 {
    const copy = cString.strdup(str);
    if (copy == null) {
        // Maybe we can return a better error by calling std.os.errno(), but for
        // now, return a generic error.
        return error.StrdupFailure;
    }
    return copy;
}
```

Here's a complete example:

```zig
const std = @import("std");

const cString = @cImport({
    @cInclude("string.h");
});

const StrdupError = error{
    StrdupFailure,
};

fn strdup(str: [:0]const u8) ![*:0]u8 {
    const copy = cString.strdup(str);
    if (copy == null) {
        // Maybe we can return a better error by calling std.os.errno(), but for
        // now, return a generic error.
        return error.StrdupFailure;
    }
    return copy;
}

pub fn main() !void {
    const s = "hi";
    std.debug.print("s={s}\n", .{s});
    const sCopy = try strdup(s);
    defer std.c.free(sCopy);
    std.debug.print("sCopy={s}\n", .{sCopy});
}
```

Clean it up a little to free in an expected way:

```zig
const std = @import("std");

const cString = @cImport({
    @cInclude("string.h");
});

const StrdupError = error{
    StrdupFailure,
};

fn strdup(allocator: std.mem.Allocator, str: [:0]const u8) ![:0]u8 {
    const cCopy: [*c]u8 = cString.strdup(str);
    if (cCopy == null) {
        // Maybe we can return a better error by calling std.os.errno(), but for
        // now, return a generic error.
        return error.StrdupFailure;
    }
    defer std.c.free(cCopy);
    const zCopy: [:0]u8 = std.mem.span(cCopy);
    const copy: [:0]u8 = try allocator.allocSentinel(u8, zCopy.len, 0);
    @memcpy(copy, zCopy);

    return copy;
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();
    defer _ = gpa.deinit();

    const s = "hi";
    std.debug.print("s={s}\n", .{s});
    const sCopy = try strdup(allocator, s);
    defer allocator.free(sCopy);
    std.debug.print("sCopy={s}\n", .{sCopy});
}
```
