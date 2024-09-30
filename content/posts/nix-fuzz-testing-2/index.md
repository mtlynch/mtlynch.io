---
title: "Using Nix to Fuzz Test a PDF Parser (Part Two)"
date: 2024-09-14T01:00:00-04:00
tags:
  - nix
  - fuzzing
---

This is the second half of a post about using Nix to automate a fuzz testing workflow.

At this point, I can run honggfuzz against `pdftotext`, but it takes a bit of manual effort to get things started. I promised in part one that I'd get all installation and fuzzing down to a single command.

## Automating fuzz runs

```nix
{
    packages = rec {
        xpdf = pkgs.stdenv.mkDerivation rec {
          ...
      }

          fuzz-xpdf = pkgs.writeShellScriptBin "fuzz-xpdf" ''
            ${pkgs.honggfuzz}/bin/honggfuzz \
              --input "''${CORPUS_DIR}" \
              --instrument \
              -- ${xpdf}/bin/pdftotext ___FILE___
          '';
```

```bash
nix build .#fuzz-xpdf
```

This creates a bash script at `./result/bin`:

```bash
ls result/bin/fuzz-xpdf
```

I can run it and start a new fuzzing session, which eliminates some of the gymnastics I had to do before with `nix develop`.

Still, this is not as convenient as it could be, so I add an app to my Nix flake after the `packages` section:

```nix
{
    packages = rec {
        ...
    };

    apps = {
      default = self.apps.${system}.fuzz-xpdf;
      fuzz-xpdf = {
        type = "app";
        program = "${self.packages.${system}.fuzz-xpdf}/bin/fuzz-xpdf";
      };
    };
```

With my `fuzz-xpdf` app in place, I can kick off fuzzing with a single command, even if I'm not in my Nix dev shell:

```bash
nix run
```

The full source at this stage is [available on Gitlab](https://gitlab.com/mtlynch/fuzz-xpdf/-/tree/04-run-fuzzer).

### Using a custom sanitizer

TODO: Add ASAN

https://github.com/AFLplusplus/AFLplusplus/blob/v4.21c/docs/fuzzing_in_depth.md#c-selecting-sanitizers

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

TODO: Add dontStrip

## Fixing the bug

TODO: Explain how to apply patches.

---

_Thanks to XX for creating the tutorial series XX. This work builds on that foundation._
