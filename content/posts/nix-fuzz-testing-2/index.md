---
title: "Nix is Surprisingly Useful for Fuzz Testing (Part Two)"
date: 2024-09-14T19:16:32-04:00
tags:
  - nix
  - fuzzing
---

## Tuning AFL++ for better results

TODO: Add ASAN and dontStrip

## Downloading tricky PDFs

TODO

## Launching tests with Nix

TODO

## Investigating a crash

```bash
CRASHING_PDF='fuzz-output/default/crashes.2024-09-14-22:05:14/id:000000,sig:11,src:000862+000165,time:102771,execs:57754,op:splice,rep:13'
gdb -ex run --args ./result/bin/pdftotext "${CRASHING_PDF}"
```

Type `bt` to see a backtrace (stacktrace).

## Fixing the bug

TODO: Explain how to apply patches.

## Bonus: Minimizing the test corpus

I don't know how much difference it makes, but I'll include it here in case it's useful.

---

_Thanks to XX for creating the tutorial series XX. This work builds on that foundation._
