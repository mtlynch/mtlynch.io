---
title: "Using Nix to Fuzz Test a PDF Parser (Part Two)"
date: 2024-09-14T01:00:00-04:00
tags:
  - nix
  - fuzzing
images:
  - nix-fuzz-testing-2/hfuzz-cover.webp
---

This is the second half of a post about using Nix to automate a fuzz testing workflow.

At this point, I can run honggfuzz against `pdftotext`, but it takes a bit of manual effort to get things started. I promised in part one that I'd get all installation and fuzzing down to a single command.

## Downloading tricky PDFs

In my ad-hoc fuzzing, I had to download a boring PDF from the IRS interactively through the command-line. I'll start by automating this step.

While I'm automating, I can probably do better than a single PDF. For fuzzing, my goal is to have a wide variety of PDFs that challenge different functionalities of the PDF parser.

Adobe [used to have a corpus of interesting-looking test PDFs](https://web.archive.org/web/20150228065245/http://acroeng.adobe.com/wp/?page_id=10), but they've taken it offline.

The best collection of difficult-to-parse PDFs I found was in Mozilla's pdf.js project [contains 700 PDFs](https://github.com/mozilla/pdf.js/tree/v4.7.76/test/pdfs) that have caused parsing bugs in their project, so it's likely that these same PDFs will trip up other PDF parsers.

```nix
{
    packages = rec {
        ...
        sample-pdfs = pkgs.stdenv.mkDerivation rec {
          pname = "sample-pdfs";
          version = "4.7.76";

          src = pkgs.fetchzip {
            url = "https://github.com/mozilla/pdf.js/archive/refs/tags/v${version}.zip";
            hash = "sha256-2xt8j2xJ3Teg/uiwjbWnpR6zckdxsp3LVbfsbBc3Dco=";
          };

          buildCommand = ''
            mkdir -p $out
            cp $src/test/pdfs/*.pdf $out
          '';
        };
```

At this point, `flake.nix` should [look like this](https://gitlab.com/mtlynch/fuzz-xpdf/-/blob/04-download-pdfs/flake.nix).

Sidenote: In addition to the PDFs themselves, the pdf.js repo contains several hundred `.link` files that contain URLs of external PDFs. I can't think of a simple way of pulling those external PDFs into a Nix pipeline, so I'm skipping them, but they would achieve higher fuzzing coverage.

I can run the new `sample-pdfs` build step with the following command:

```bash
nix build .#sample-pdfs
```

From there, I verify that Nix successfully downloaded 700 PDFs:

```bash
$ ls ./result | head -n 5
160F-2019.pdf
alphatrans.pdf
annotation-border-styles.pdf
annotation-button-widget.pdf
annotation-caret-ink.pdf

$ $ ls ./result | wc --lines
700
```

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
