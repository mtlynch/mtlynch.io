---
title: "Using Zig to Call C Code: Strings"
date: 2023-12-15T00:00:00-05:00
tags:
  - zig
---

[Zig](https://ziglang.org/) is a new, open-source programming language designed to replace C. I'm still a Zig beginner, so I'm trying to learn the language by using Zig to rewrite parts of existing C applications.

One of the first challenges I encountered with Zig is understanding strings. I couldn't find detailed documentation about how Zig strings work when calling C code, so I'm sharing my findings in case they're helpful to others who want to use Zig to call C.

## A brief primer on C strings

Before I explain how to pass Zig strings into C code, I'll provide some background on how strings work in C.

In C, a string has a type of `char*`.

```c
char* example = "Hi, I'm a C string!";
```

A C string is just a sequence of characters. A type `char*` means the variable stores the memory address of the first character in that sequence.

Frustratingly, the `char*` type doesn't tell the C compiler where the string ends. Instead, C applications indicate the end of a string with a "null terminator," a byte after the last character in a string with the value of `0`.

If I call `strlen`, which returns the length of a string, it tells me the number of characters in the string, excluding the null terminator:

```c
printf("strlen=%lu\n", strlen("hi"));
```

```text
strlen=2
```

Even though `strlen` says the string has length two, the `sizeof` function tells me the size of the string in bytes, which is three:

```c
printf("sizeof=%lu\n", sizeof("hi"));
```

```text
sizeof=3
```

The reason `sizeof` returns `3` for a two-character string is that C implicitly added a null terminator at the end of the string.

I can prove the null terminator is there by printing the value of the each character in the string:

```c
char s[] = "hi";
printf("%s=[%c, %c, %d]\n", s, s[0], s[1], s[2]);
```

```text
hi=[h, i, 0]
```

Strings in C and C++ are extremely fragile and frequently cause security vulnerabilities and application crashes. Because the compiler doesn't know the length of the string, it's easy for C code to accidentally overwrite memory that belongs to other variables in your application.

## A basic Zig string

Zig is designed to be a modern replacement for C, so it has a difficult job. It has to correct the mistakes of C while also making it easy to interoperate with legacy C code.

Here's a simple Zig application to demonstrate how strings work:

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

- Zig knows the length of the string variable.
- Zig adds a null terminator to strings.

## Zig's null terminator is for C compatibility

In C, a null terminator effectively determines the length of the string. If you have a five-character string, and you replace character 3 with a null byte, every C string function now considers that string to be two characters long.

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

In Zig, a string still has a null terminator, but as far as I can tell, the null terminator is meaningless to Zig APIs. When I print the string or check its length, a null character makes no difference. Zig knows the string's true length regardless of where it finds a null character.

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

When you declare a string in Zig, it has a `len` property to report the string's length. Interestingly, the length excludes the null-termination character:

```zig
const s = "hi";
std.debug.print("s.len={d}\n", .{s.len});
```

```text
s.len=2
```

I know that the length of the string is _actually_ three because it has to store the null byte as well. I can prove it by checking the size of the string in bytes:

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

In most languages, if an array has size `N`, you're only able to read up to slot `N - 1` in the array. For example, in an array of size `2`, you can read slot `0`, and you can read slot `1`, but reading slot `2` will either cause a runtime crash or have undefined behavior.

Zig's normal arrays behave similarly to other languages, but Zig's sentinel-terminated arrays allow you to read one slot beyond the supposed end of the array. This is because, despite what `.len` claims, there's an extra slot for the sentinel value:

```zig
var s = "hi";
std.debug.print("s[{d}]={d}\n", .{ s.len, s[s.len] });
```

```text
s[2]=0
```

At first, I wasn't sure if I was understanding the behavior properly. Maybe I'm actually reading beyond the array bounds, but the next byte in memory happens to be `0`?

No, the Zig documentation confirms that you can read slot `N` in an `N`-length sentinel-terminated array:

> Sentinel-terminated slices allow element access to the `len` index.
>
> <https://ziglang.org/documentation/0.11.0/#Sentinel-Terminated-Slices>

I can also try to read slot `N + 1` and see that Zig refuses to compile the code:

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

It turns out that Zig guarantees null-termination by [ignoring assignments that overwrite the null-terminator character](https://github.com/ziglang/zig/issues/9791#issuecomment-1854907508). So even though my code told Zig to overwrite the null-termination character, Zig casually ignores the assignment, thus preserving the null-termination property.

```zig
var s = [_:0]u8{ 'h', 'e', 'l', 'l', 'o' };
s[s.len] = 'A';  // This line has no effect.
std.debug.print("s[{d}]={d}\n", .{ s.len, s[s.len] });
```

```text
s[5]=0
```

## Passing Zig strings to C code

Now that I understand how Zig strings work, I can show how to leverage Zig's null-termination guarantees to call into C code more safely.

Imagine that from my Zig code, I want to call a C function that takes a string parameter. As an example, I'll show how I'd call the C standard library [`strlen` function](https://en.cppreference.com/w/cpp/string/byte/strlen):

```c
// Returns the length of the C string str.
size_t strlen(const char* str);
```

`strlen` is a simple function. It iterates through a string looking for the first `0` byte and returns the number of bytes that _weren't_ `0`.

To call functions that the C standard library declares in its `string.h` header file, I import the header like this in Zig:

```zig
const cString = @cImport({
    @cInclude("string.h");
});
```

That allows me to call the `strlen` function from Zig like this:

```zig
cString.strlen("hello!");
```

With that in mind, let me create a Zig-native wrapper for the C `strlen` function:

```zig
fn strlen(str: [:0]const u8) usize {
    return cString.strlen(str);
}
```

I define the parameter as `[:0]const u8` to ensure that any Zig caller passes a string that's null-terminated. This provides a degree of safety not possible in C, as Zig enforces the null termination, whereas C can't guarantee any string is null-terminated.

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

I can use `zig run` to compile and run this example. I'm importing `string.h`, a header from the C standard library, so I need to pass `--library c` to tell the Zig compiler to link against libc.

```bash
$ zig run src/wrap-strlen.zig --library c
strlen(hi)=2
```

Cool, that works how I expected. I'm using C's `strlen` function to calculate the length of a string I created from Zig.

What happens if I try to pass in a string that's not null-terminated?

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

Great!

Zig catches the error at compile time because it sees that `strlen` requires a null-terminated string (`[:0]u8`), but `notNullTerminated` is type `const [2]u8`, so it's missing the null-termination property.

### Null-termination is not a strict guarantee

Even though the Zig compiler makes calling into C string functions safer, it still can't guarantee _for sure_ that a type of `[:0]u8` is null-terminated.

I can trick Zig by creating a slice from an existing array and incorrectly declaring it to be null-terminated:

```zig
var a = [_]u8{ 'h', 'e', 'l', 'l', 'o' };
// This is a lie, as this slice isn't really null-terminated.
const s = a[0..2 :0];
std.debug.print("strlen({s})={d}\n", .{ s, strlen(s) });
```

If I compile this code with default settings, Zig adds debug checks that cause a panic at runtime:

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

The error `sentinel mismatch: expected 0, found 108` means that at slot 2 in the slice, Zig expected to find a `0` byte (null terminator), but it found the `'l'` character (represented as `108`).

If I compile the code in release mode, the program has [undefined behavior](https://ziglang.org/documentation/0.11.0/#Undefined-Behavior):

```bash
$ zig run src/wrap-strlen-evil.zig --library c -O ReleaseFast
strlen(he)=5
```

Zig sees the string `s` as having two characters (`"he"`) because it knows the length of the slice. C doesn't have length information, so it searches for the first null byte, which causes the program to read beyond the memory allocated for the `a` array. Depending on the environment, this program could crash with an access violation because it's reading memory beyond what it allocated.

## Receiving C strings in Zig

Okay, so I've shown how to write a Zig wrapper around a C function that takes a string as an input parameter.

How do I handle C functions that produce C strings as output?

As an example, I'll show how to create a Zig wrapper around the C [`strdup` function](https://en.cppreference.com/w/c/experimental/dynamic/strdup):

```c
// Returns a pointer to a null-terminated byte string, which is a duplicate of
// the string pointed to by str1. The returned pointer must be passed to free to
// avoid a memory leak.
char* strdup(const char* str1);
```

As the comment says, `strdup` takes a string, allocates memory for a copy of that string, then copies the contents of the string into the newly allocated buffer.

A Zig wrapper for the C `strdup` function might look like this:

```zig
fn strdup(str: [:0]const u8) ![*:0]u8 { ... }
```

The function takes as input a null-terminated string. The return value is `![*:0]u8`, which breaks down as:

`u8` means an unsigned byte.

`[*:0]` means a null-terminated slice of unknown length. This differs from `[:0]`, as the latter means that Zig knows the slice's length and makes it accessible through the `.len` property. For a type of `[*:0]`, Zig doesn't know the length, just that it terminates with a null byte.

`!` means that this function may return an error. The error is possible because the underlying C `strdup` function can fail.

Now that I've explained the inputs and outputs to this function, let me take a try at implementing it:

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

And here's a complete example of me calling the `strdup` wrapper function from Zig:

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
    std.debug.print("s    = [{s}] (type={}, size={d}, len={d})\n", .{ s, @TypeOf(s), @sizeOf(@TypeOf(s.*)), s.len });
    const sCopy = try strdup(s);
    defer std.c.free(sCopy);
    std.debug.print("sCopy= [{s}] (type={}, size={d}, len={d})\n", .{ sCopy, @TypeOf(sCopy), @sizeOf(@TypeOf(sCopy)), std.mem.len(sCopy) });
}
```

Here is the output:

```bash
$ zig run src/wrap-strdup.zig --library c
s    = [hi] (type=*const [2:0]u8, size=3, len=2)
sCopy= [hi] (type=[*:0]u8, size=8, len=2)
```

The output is pretty straightforward. `s` and `sCopy` are different variable types even though they contain the same data. That's because `sCopy` represents memory that C allocated, whereas `s` represents memory that Zig allocated and manages.

Zig reports that `sCopy`'s size is `8` because that's the size of a pointer on a 64-bit system. Zig can't tell me the size of the memory buffer because C allocated it and can't communicate buffer size information to Zig.

### Improving the wrapper with Zig-managed buffers

I was able to call C's `strdup` function from Zig, but my solution is a bit untidy. My Zig wrapper bleeds out its implementation details because it's returning a slice of unknown length, and the caller has to free the buffer with `std.c.free` instead of using a Zig-native memory allocator.

What if I wanted to abstract away the C implementation details and make this look like a regular, native Zig function?

Here's a revision of my `strdup` wrapper that allocates a Zig-native buffer and copies the resulting string into the new buffer:

```zig
fn strdup(allocator: std.mem.Allocator, str: [:0]const u8) ![:0]u8 {
    const cCopy: [*c]u8 = cString.strdup(str);
    if (cCopy == null) {
        // Maybe we can return a better error by calling std.os.errno(), but for
        // now, return a generic error.
        return error.StrdupFailure;
    }
    defer std.c.free(cCopy);

    // Create a Zig slice of the C buffer that's length-aware.
    const zCopy: [:0]u8 = std.mem.span(cCopy);

    // Allocate a new null-terminated slice with a Zig-native memory allocator.
    const copy: [:0]u8 = try allocator.allocSentinel(u8, zCopy.len, 0);

    // Copy the contents of the C string from the C-managed memory into the Zig-
    // managed buffer.
    @memcpy(copy, zCopy);

    // Return the Zig-native slice to the caller.
    return copy;
}
```

There are a few changes between the original implementation and this revision.

First, this function takes a `std.mem.Allocator`, a Zig object that allocates memory. In Zig, you don't just allocate memory whenever you feel like it by calling a global memory allocation function like you do in C. To avoid hidden memory allocations, functions accept a `std.mem.Allocator` type, which makes it obvious to callers that the function might allocate memory.

Next, instead of returning a C memory buffer and making it the caller's responsibility to free in a non-standard way, the new `strdup` implementation returns a regular Zig slice. Callers to `strdup` are still responsible for freeing the slice, but they can do it the standard way with `allocator.free`.

The downside of this revision is that it's slower than the previous version. I'm allocating and copying memory twice: once in C, and another time in Zig. If this were performance-critical code, perhaps I'd take the speedup by making the caller deal with the C array, but in general, I prefer to let Zig manage my memory.

Here's a complete example with the new wrapper implementation:

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
    std.debug.print("s    = [{s}] (type={}, size={d}, len={d})\n", .{ s, @TypeOf(s), @sizeOf(@TypeOf(s.*)), s.len });
    const sCopy = try strdup(allocator, s);
    defer allocator.free(sCopy);
    std.debug.print("sCopy= [{s}] (type={}, size={d}, len={d})\n", .{ sCopy, @TypeOf(sCopy), @sizeOf(@TypeOf(sCopy)), sCopy.len });
}
```

```bash
$ zig run src/wrap-strdup2.zig --library c
s    = [hi] (type=*const [2:0]u8, size=3, len=2)
sCopy= [hi] (type=[:0]u8, size=16, len=2)
```

I can't figure out why the size of `sCopy` is 16. The size remains the same regardless of how many characters I store in the slice, but it reduces to `size=8` if I run the same code on my 32-bit ARM Raspberry Pi.

I know that `s` is an array whose size Zig knows at compile time, whereas `sCopy` is a slice whose size Zig doesn't know until runtime. Still, Zig knows the length of the slice and should therefore know how many bytes it takes up, but I can't figure out how to query that information.

**Update**: [/u/paulstelian97](https://www.reddit.com/user/paulstelian97) on reddit [explains](https://www.reddit.com/r/Zig/comments/18j13tu/using_zig_to_call_c_code_strings/kdgx3df/) that slices are "fat pointers," which contain a memory address and a length. Now I understand why it's two times the size of a regular pointer, but I still don't know how to ask Zig for the size of the slice in bytes.

## Wrap up

Zig makes it easy to pass strings into C code and receive string outputs from C.

Zig's type system is stronger than C, which allows developers to write Zig-native wrappers for C libraries, yielding more robust checks against memory corruption than is available in C.

## Further reading

- [Zig Strings in Five Minutes](https://www.huy.rocks/everyday/01-04-2022-zig-strings-in-5-minutes)
