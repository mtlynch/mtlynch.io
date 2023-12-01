---
title: "A Beginner's Introduction to Strings in Zig"
date: 2023-12-01T10:37:03-05:00
---

```zig
const std = @import("std");

pub fn main() !void {
    const s = "hello";
    std.debug.print("s is type {s}\n", .{@typeName(@TypeOf(s))});
}
```

```bash
$ zig run src/strings.zig -lc
s is type *const [5:0]u8
```
