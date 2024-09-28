---
title: "Nix is Surprisingly Useful for Fuzz Testing (Part Two)"
date: 2024-09-14T01:00:00-04:00
tags:
  - nix
  - fuzzing
---

This is the second half of a post about using Nix to automate a fuzz testing workflow.

At this point, I can run AFL++ against `pdftotext`, but it takes a bit of manual effort to get things started. I promised in part one that I'd get all installation and fuzzing down to a single command.

## Automating fuzz runs

```nix
{
    packages = rec {
        xpdf = pkgs.stdenv.mkDerivation rec {
          ...
      }

      afl-fuzz-xpdf = pkgs.writeShellScriptBin "afl-fuzz-xpdf" ''
        readonly FUZZ_RESULTS='fuzz-output'
        mkdir -p "''${FUZZ_RESULTS}"

        # We don't care about the output of pdftotext, so discard it.
        readonly TEXT_OUTPUT=/dev/null

        ${pkgs.aflplusplus}/bin/afl-fuzz \
          -i ${pkgs.aflplusplus}/share/afl/testcases/others/pdf \
          -o "''${FUZZ_RESULTS}" \
          -- ${xpdf}/bin/pdftotext @@ "''${TEXT_OUTPUT}"
      '';
```

```bash
nix build .#afl-fuzz-xpdf
```

This creates a bash script at `./result/bin`:

```bash
ls result/bin/afl-fuzz-xpdf
```

I can run it and start a new fuzzing session, which eliminates some of the gymnastics I had to do before with `nix develop`.

Still, this is not as convenient as it could be, so I add an app to my Nix flake after the `packages` section:

```nix
{
    packages = rec {
        ...
    };

    apps = {
      default = self.apps.${system}.afl-fuzz-xpdf;
      afl-fuzz-xpdf = {
        type = "app";
        program = "${self.packages.${system}.afl-fuzz-xpdf}/bin/afl-fuzz-xpdf";
      };
    };
```

With my `afl-fuzz-xdpf` app in place, I can kick off fuzzing with a single command, even if I'm not in my Nix dev shell:

```bash
nix run
```

The full source at this stage is [available on Gitlab](https://gitlab.com/mtlynch/fuzz-xpdf/-/tree/04-run-fuzzer).

TODO: Can we fix the source paths so it doesn't show as /build?

## Tuning AFL++ for better results

From reading AFL++'s documentation,

TODO: Call

### Using a custom sanitizer

TODO: Add ASAN

https://github.com/AFLplusplus/AFLplusplus/blob/v4.21c/docs/fuzzing_in_depth.md#c-selecting-sanitizers

### Using a format dictionary

TODO: dictionary

### System configuration scripts

AFL++'s [docs](https://github.com/AFLplusplus/AFLplusplus/blob/v4.21c/docs/fuzzing_in_depth.md#a-running-afl-fuzz) mention two scripts to configure my system to maximize fuzzing performance. They unfortunately don't document exactly what changes these scripts make or how to reverse them, so I run them in a dedicated virtual machine that only accepts local network traffic.

The first is `afl-persistent-config`, which requires a reboot:

```bash
nix develop
sudo "$(which afl-persistent-config)" && sudo reboot
```

Next is `afl-system-config`, which I seem to have to run at least once per boot before running fuzz tests:

```bash
nix develop
sudo "$(which afl-system-config)"
```

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

## Bonus: Minimizing the test corpus

I don't know how much difference it makes, but I'll include it here in case it's useful.

---

_Thanks to XX for creating the tutorial series XX. This work builds on that foundation._
