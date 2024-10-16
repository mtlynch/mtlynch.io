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

I create a new build step in my Nix flake that downloads all the PDFs from Mozilla's pdf.js project:

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

Sidenote: In addition to the PDFs themselves, the pdf.js repo contains several hundred `.link` files that contain URLs of external PDFs. I can't think of a simple way of pulling those external PDFs into a Nix pipeline. I welcome suggestions on integrating the `.link` files, as they would achieve higher fuzzing coverage.

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

At this point, I have a nice initial corpus of edge case PDFs that will hopefully exercise less frequent code paths of any PDF parsing code.

## Automating fuzz runs

In part 1 of this series, I showed how to run honggfuzz manually from a Nix dev shell. But I can make that process even easier by defining it in my Nix flake.

To start, I add a new shell script for launching honggfuzz:

```nix
{
    packages = rec {
      xpdf = pkgs.stdenv.mkDerivation rec {
        ...
      }

      fuzz-xpdf = pkgs.writeShellScriptBin "fuzz-xpdf" ''
        readonly CORPUS_DIR='fuzz-corpus'
        mkdir -p "''${CORPUS_DIR}"

        # Copy the source corpus into a new directory for active fuzzing.
        cp --force ${sample-pdfs}/*.pdf "''${CORPUS_DIR}"

        ${pkgs.honggfuzz}/bin/honggfuzz \
          --input "''${CORPUS_DIR}" \
          --instrument \
          -- ${xpdf}/bin/pdftotext ___FILE___
      '';
```

Writing bash scripts within a Nix flake is awkward because both bash and Nix use the `${foo}` syntax for variables. To disambiguate the two, I need to prefix bash variables with `''`. So, in the snippet above, variables like `${sample-pdfs}` and `${xpdf}` are Nix variables whereas `''${CORPUS_DIR}` is a bash variable.

I build the shell script with `nix build`:

```bash
nix build .#fuzz-xpdf
```

Nix then creates a bash script at `./result/bin/fuzz-xpdf`:

```bash
$ cat ./result/bin/fuzz-xpdf
#!/nix/store/1xhds5s320nfp2022yjah1h7dpv8qqns-bash-5.2p32/bin/bash
readonly CORPUS_DIR='fuzz-corpus'
mkdir -p "${CORPUS_DIR}"

# Copy the source corpus into a new directory for active fuzzing.
cp --force /nix/store/gncc6jy3cry5lwbkd2b54h1dg46wfkdc-sample-pdfs-4.7.76/*.pdf "${CORPUS_DIR}"

/nix/store/kb9vkjv4admbdixrjyanfb1i9dd3cbmm-honggfuzz-2.6/bin/honggfuzz \
  --input "${CORPUS_DIR}" \
  --instrument \
  -- /nix/store/pixq8qiqyy6iwsc4wisb1vrmgy7l1kas-xpdf-4.05/bin/pdftotext ___FILE___
```

The generated output has replaced all the Nix variables with absolute paths but the bash variable (`CORPUS_DIR`) remains a variable so that bash can interpret it at script runtime.

If I run the shell script, it starts a new fuzzing session:

```bash
./result/bin/fuzz-xpdf
```

That command should produce a screen like this:

{{<img src="hfuzz.webp" caption="TODO">}}

This works, but it requires me to run the `nix build` command before I execute the shell script. Nix offers an even simpler solution with `apps`, so I add an app definition to my Nix flake after the `packages` section:

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

With my `fuzz-xpdf` app in place, I can kick off fuzzing with a single command:

```bash
nix run .#fuzz-xpdf
```

I declared `fuzz-xpdf` as the default app for this flake, so I can start fuzzing without even specifying the `fuzz-xpdf` app:

```bash
nix run
```

At this point, `flake.nix` should [look like this](https://gitlab.com/mtlynch/fuzz-xpdf/-/blob/05-launch-honggfuzz/flake.nix).

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

## Keeping debug symbols in test binaries

The hardest part of this whole process was figuruing out how to get debug symbols to work properly in the binary so that I'd see accurate stack traces in my crash dumps and debug sessions.

TODO: Add dontStrip

## Fixing the bug

TODO: Explain how to apply patches.

---

_Thanks to XX for creating the tutorial series XX. This work builds on that foundation._
