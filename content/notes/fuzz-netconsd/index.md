---
title: "Creating a Nix Workflow to Fuzz netconsd"
date: 2024-11-15
tags:
  - nix
  - fuzzing
---

Recently, when I'm having trouble sleeping, I look for software to fuzz test.

Earlier this week, I thought back to Fady Othman's post ["Meta Bug Bounty &mdash; Fuzzing 'netconsd' for fun and profit."](https://blog.fadyothman.com/meta-bug-bounty-fuzzing-netconsd-for-fun-and-profit-part-1-6ffe96eb1419) It's a good tutorial about fuzzing code exhaustively.

Like most fuzzing blog posts, I found the work a bit difficult to reproduce because it requires the reader to figure out how to replicate the author's environment and toolchain.

I thought I'd try making an easily reproducible version of Othman's fuzzer using Nix, as I did [with xpdf](/nix-fuzz-testing-1). My post about xpdf is much more thorough and polished. These are just some quick notes for anyone who's curious.

## fuzz-netconsd

This is the fuzzing workflow I created for netconsd with a few hours of work:

- [fuzz-netconsd](https://gitlab.com/mtlynch/fuzz-netconsd)

If you have git and Nix installed, you can run my workflow with the command:

```bash
nix run gitlab:mtlynch/fuzz-netconsd
```

This is the first fuzzer I've written where the fuzz tool calls directly into the code under test through function calls rather than executing the compiled binary through the shell. In honggfuzz and AFL++, this is called "persistent mode," I guess because the fuzzer can keep one process persistently rather than spawning a new process for every fuzz run.

Fuzzing by function call is interesting because you can do it even if the target code doesn't even publish a shared library. I did this [in the `installPhase` of the workflow](https://gitlab.com/mtlynch/fuzz-netconsd/-/blob/1f4c415f781853c309c6f1a6e322205acad8bcdf/flake.nix#L53-61) by copying the `.o` file containing the code I want to call and the `.h` header for it into the Nix output directory for that step.

Once I had the headers and object files I needed, I wrote this simple test harness that has just enough code to call the function I'm fuzzing, `ncrx_process`:

```c++
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#include "ncrx.h"

int LLVMFuzzerTestOneInput(const uint8_t *buf, size_t len) {
  // Convert the random bytes of the payload to a null-terminated string.
  char *payload = (char *)malloc(len + 1);
  if (!payload) return 0;
  memcpy(payload, buf, len);
  payload[len] = '\0';

  struct timespec ts;
  if (clock_gettime(CLOCK_MONOTONIC, &ts)) {
    perror("clock_gettime");
    return 1;
  }

  uint64_t now = ts.tv_sec * 1000 + ts.tv_nsec / 1000000;

  struct ncrx *ncrx = ncrx_create(NULL);

  // Call the function that we're fuzzing.
  ncrx_process(payload, now, 0, ncrx);

  // Clean up the resources we allocated.
  ncrx_destroy(ncrx);
  free(payload);

  return 0;
}
```

I found persistent mode fuzzing easier than I expected. I didn't even have to learn much about netconsd. I still don't understand what it does exactly, but I understood enough to call one of its parsing functions under the fuzzer.

## I'm probably not going to find anything

Othman reported hitting 100% coverage with his fuzzing work, which is extremely thorough.

I checked [the commit history of netconsd](https://github.com/facebook/netconsd), and there's been almost no activity since Othman's work. He doesn't say so explicitly in his article, but I suspect that this is the change that fixed the vulnerability Othman discovered:

- [prevent overflow on invalid fragment values](https://github.com/facebook/netconsd/commit/dc94f1468e21503c7f666c25649d6bee3d6d6524)

I doubt that I'll find much from fuzzing at this point. I stopped my fuzzer after 12 hours of no crashes.

## Unfinished work

- Othman [used the klee tool](https://blog.fadyothman.com/meta-bug-bounty-fuzzing-netconsd-for-fun-and-profit-part-3-127bb01d6756) to generate edge case inputs for the fuzz corpus. I didn't implement that, but it would fit nicely into the workflow, as klee is [already packaged for Nix](https://search.nixos.org/packages?channel=24.05&show=klee&from=0&size=50&sort=relevance&type=packages&query=klee).
- I used honggfuzz instead of AFL++, which is what Othman used. I prefer the simplicity of honggfuzz, but Othman is knowledgeable enough of AFL++'s knobs to get higher coverage.
  - My [first draft implementation](https://gitlab.com/mtlynch/fuzz-netconsd/-/tree/e001a629a93be843179ccb9cb0bde9a16f5dead0) used AFL++ if you'd prefer to play with that version.
