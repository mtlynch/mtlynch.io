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

TODO: Increase timeout to 10s?

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

And the fuzzing workflow is complete. I can put this Nix flake in a brand new directory, and when I run `nix run`, it will download all the tricky PDFs, compile xpdf, and start fuzzing. I can let honggfuzz run indefinitely and see what crashes it finds.

{{<img src="hfuzz.webp" caption="With the addition of a `fuzz-xpdf` app in my Nix flake, I have a complete fuzzing workflow and can allow my fuzzer to run indefinitely and find all the bugs that it can.">}}

## Turning subtle memory errors into loud crashes with ASAN

By this point, my fuzzing workflow works, but I can run it more efficiently.

When fuzz testing, you only know when you've found an interesting bug when it causes the target application to crash. The problem is that are lots of ways to make a program misbehave without actually crashing it.

One of the most famous examples of a security bug that didn't cause a crash was the 2014 [Heartbleed](https://heartbleed.com/) bug in OpenSSL. It allowed attackers to extract sensitive information from web servers, but it didn't cause them to crash. In general, tricking a program into reading or writing memory outside of the intended bounaries will not necessarily result in a crash.

The good news is that there's a tool that forces otherwise non-crashy memory errors to crash the program immediately. [Address Sanitizer (ASAN)](https://github.com/google/sanitizers/wiki/addresssanitizer) adds extra safety checks to a program's memory reads and writes that crash the program if it attempts to read or write beyond a variable's intended memory location.

Adding ASAN to my fuzzing workflow allows me to find more memory bugs than I otherwise would. To compile xpdf with ASAN enabled, I add `-fsanitize=address` to xpdf's compilation step:

```nix
{
    {
      packages = rec {
        xpdf = pkgs.stdenv.mkDerivation rec {

          ...

          preConfigure = ''
            export CC=${pkgs.honggfuzz}/bin/hfuzz-clang
            export CXX=${pkgs.honggfuzz}/bin/hfuzz-clang++

            # Use address sanitizer (ASAN).
            export CFLAGS="$CFLAGS -fsanitize=address"
            export CXXFLAGS="$CXXFLAGS -fsanitize=address"
          '';
        };
```

At this point, `flake.nix` should [look like this](https://gitlab.com/mtlynch/fuzz-xpdf/-/blob/06-asan/flake.nix).

Now, I'm finally ready to kick off my fuzzer and let it find some bugs for me. With my Nix flake, that's as simple as running:

```bash
nix run
```

## Finding my first crash

I let honggfuzz run for two hours and checked back to find that it discovered its first crash:

{{<img src="hfuzz-crash.webp">}}

honggfuzz also saved a file to the local directory called `SIGABRT.PC.55555592fff5.STACK.1bb46b81df.CODE.-6.ADDR.0.INSTR.mov____%eax,%edx.fuzz`, which contained the randomly generated PDF that caused the crash.

To reproduce the crash, I ran the following commands:

```bash
# Specify the path to the crashing PDF.
CRASHING_PDF='SIGABRT.PC.55555592fff5.STACK.1bb46b81df.CODE.-6.ADDR.0.INSTR.mov____%eax,%edx.fuzz'

# Rebuild pdftotext in the result folder
nix build

# Run pdftotext with the crashing PDF.
./result/bin/pdftotext "${CRASHING_PDF}" /dev/null
```

The program indeed crashes with ASAN reporting that it caught a buffer overflow:

```text
==1259902==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200002228f at pc 0x557c3230bd58 bp 0x7ffd7f070cf0 sp 0x7ffd7f070ce8
READ of size 1 at 0x60200002228f thread T0
    #0 0x557c3230bd57  (/nix/store/l774c0m9kh6z7iq1jn5m31kzy77kwffc-xpdf-4.05/bin/pdftotext+0x3e3d57)
    #1 0x557c3231f6ea  (/nix/store/l774c0m9kh6z7iq1jn5m31kzy77kwffc-xpdf-4.05/bin/pdftotext+0x3f76ea)
    #2 0x557c32327a0d  (/nix/store/l774c0m9kh6z7iq1jn5m31kzy77kwffc-xpdf-4.05/bin/pdftotext+0x3ffa0d)
    #3 0x557c3232733c  (/nix/store/l774c0m9kh6z7iq1jn5m31kzy77kwffc-xpdf-4.05/bin/pdftotext+0x3ff33c)
    #4 0x557c322bfaa7  (/nix/store/l774c0m9kh6z7iq1jn5m31kzy77kwffc-xpdf-4.05/bin/pdftotext+0x397aa7)
...
SUMMARY: AddressSanitizer: heap-buffer-overflow (/nix/store/l774c0m9kh6z7iq1jn5m31kzy77kwffc-xpdf-4.05/bin/pdftotext+0x3e3d57)
Shadow bytes around the buggy address:
  0x602000022000: fa fa fd fd fa fa fd fa fa fa fd fd fa fa fd fa
  0x602000022080: fa fa fd fd fa fa fd fd fa fa 00 01 fa fa fd fd
  0x602000022100: fa fa 00 03 fa fa fd fa fa fa 00 00 fa fa fd fa
  0x602000022180: fa fa fd fa fa fa fd fd fa fa 00 02 fa fa fd fa
  0x602000022200: fa fa fd fa fa fa fd fa fa fa fd fa fa fa 00 00
=>0x602000022280: fa[fa]00 fa fa fa fd fa fa fa fd fa fa fa fd fa
  0x602000022300: fa fa fd fa fa fa fd fa fa fa 03 fa fa fa fd fa
```

The error message is a bit arcane, but it's telling me that ASAN caught `pdftotext` trying to read 1 byte outside of the buffer it allocated.

So, how do I dig deeper into what's causing this crash?

## Improving debug symbols

When `pdftotext` crashed, I hoped to see a stack trace that included source filenames and line numbers. Instead, the output was just memory offsets, which makes debugging harder:

```text
#0 0x557c3230bd57  (/nix/store/l774c0m9kh6z7iq1jn5m31kzy77kwffc-xpdf-4.05/bin/pdftotext+0x3e3d57)
#1 0x557c3231f6ea  (/nix/store/l774c0m9kh6z7iq1jn5m31kzy77kwffc-xpdf-4.05/bin/pdftotext+0x3f76ea)
#2 0x557c32327a0d  (/nix/store/l774c0m9kh6z7iq1jn5m31kzy77kwffc-xpdf-4.05/bin/pdftotext+0x3ffa0d)
```

Strangely, the hardest part of this whole process was figuruing out how to get debug symbols to work properly in the binary so that I'd see accurate stack traces in my crash dumps.

First, I happened to notice that `nix run`'s log output said something about stripping debug output from the binary. It turns out that Nix has [a `dontStrip` option](https://nixos.org/manual/nixpkgs/stable/#var-stdenv-dontStrip) that defaults to `false`, meaning that it automatically strips debug information.

I also noticed that xpdf's [compile instructions](https://gitlab.com/mtlynch/xpdf/-/blob/4.05/INSTALL#54) mentioned a `CMAKE_BUILD_TYPE` option. It's not documented, but searching the source [revealed that it accepted a value of `Debug`](https://gitlab.com/mtlynch/xpdf/-/blob/4.05/cmake-config.txt#L48).

To preserve debug symbols in my xpdf binaries, I added these options to the end of my `xpdf` package definition:

```nix
{
    {
      packages = rec {
        xpdf = pkgs.stdenv.mkDerivation rec {

          ...

          preConfigure = ''
            ...
          '';

          cmakeFlags = [
            "-DCMAKE_BUILD_TYPE=Debug"
          ];

          # Don't strip debug information from binaries, as the debug symbols
          # are usefule during crash analysis.
          dontStrip = true;
        };
```

At this point, something strange happened. I got rich stack traces with filenames and line numbers, but then they'd mysteriously stop working after a few hours. I still don't know why.

To get the rich stack traces to work consistently, I had to use a tool called `llvm-symbolizer`, which I'd never heard of before. Fortunately, `llvm-symbolizer` ships as part of the popular [`llvm_18` Nix package](https://search.nixos.org/packages?channel=24.05&show=llvm_18&from=0&size=50&sort=relevance&type=packages&query=llvm_18), so I included that package in my Nix flake and added an environment variable called `ASAN_SYMBOLIZER_PATH` to point to that binary.

The changes to my Nix flake are a bit hard to show because they touch many parts of the so it's easiest to look at [the diff](https://gitlab.com/mtlynch/fuzz-xpdf/-/compare/06-asan...07-debug-symbols).

With the changes to my Nix flake, I need to enter the Nix dev shell to see rich stack traces, as that will set the proper `ASAN_SYMBOLIZER_PATH` environment value.

```bash
# Enter the nix dev shell.
nix develop

# Rebuild pdftotext in the result folder
nix build

# Specify the path to the crashing PDF.
CRASHING_PDF='SIGABRT.PC.55555592fff5.STACK.1bb46b81df.CODE.-6.ADDR.0.INSTR.mov____%eax,%edx.fuzz'

# Run pdftotext with the crashing PDF.
./result/bin/pdftotext "${CRASHING_PDF}" /dev/null
```

And then, I should finally see a stack trace with filenames:

```
=================================================================
==1461608==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200002228f at pc 0x55555592fff5 bp 0x7fffffffac70 sp 0x7fffffffac68
READ of size 1 at 0x60200002228f thread T0
    #0 0x55555592fff4 in GString::getChar(int) /build/source/goo/GString.h:82:32
    #1 0x55555592fff4 in GfxFont::readFontDescriptor(XRef*, Dict*) /build/source/xpdf/GfxFont.cc:553:20
    #2 0x5555559423da in GfxCIDFont::GfxCIDFont(XRef*, char const*, Ref, GString*, GfxFontType, Ref, Dict*) /build/source/xpdf/GfxFont.cc:1732:3
    #3 0x55555594a065 in GfxFont::makeFont(XRef*, char const*, Ref, Dict*) /build/source/xpdf/GfxFont.cc:190:16
...
    #22 0x7ffff7a7110d in __libc_start_call_main (/nix/store/r8qsxm85rlxzdac7988psm7gimg4dl3q-glibc-2.39-52/lib/libc.so.6+0x2a10d) (BuildId: 323d12eb412f4a20879fb07d3514ca673c5aee20)
    #23 0x7ffff7a711c8 in __libc_start_main@GLIBC_2.2.5 (/nix/store/r8qsxm85rlxzdac7988psm7gimg4dl3q-glibc-2.39-52/lib/libc.so.6+0x2a1c8) (BuildId: 323d12eb412f4a20879fb07d3514ca673c5aee20)
    #24 0x555555698a04 in _start (/nix/store/x59ccyx8gz0ap74zapdi7k8ssgypmipm-xpdf-4.05/bin/pdftotext+0x144a04)
```

It worked! Now, I get source filenames, line numbers, and function names.

But there's still a problem. Look at the path to any of the files.

```text
/build/source/xpdf/GfxFont.cc
^^^^^^^^^^^^^
  Where is this coming from?
```

The xpdf sources all point to a root folder called `/build/source` that doesn't really exist:

```bash
$ ls /build/source
ls: cannot access '/build/source': No such file or directory
```

I'm not sure if the `/build/source` path is a quirk of Nix or of xpdf's build configuration. The only way I found to fix it was to do this semi-ugly hack to replace that path with the correct one at compile time using clang's `-fdebug-prefix-map` flag:

```nix
{
    {
      packages = rec {
        xpdf = pkgs.stdenv.mkDerivation rec {

          ...

          preConfigure = ''
            ...

            # For some reason, without these flags, the debug symbols point to
            # source files at the base filesystem /build/source, so we
            # manually fix the source path.
            export CXXFLAGS="$CXXFLAGS -fdebug-prefix-map=/build/source=${xpdf.src}"
          '';
```

If I re-run my `nix build` sequence, finally, the stack traces are correct:

```text
==1498830==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200002228f at pc 0x55555592fff5 bp 0x7fffffffac70 sp 0x7fffffffac68
READ of size 1 at 0x60200002228f thread T0
    #0 0x55555592fff4 in GString::getChar(int) /nix/store/alirmx60yanq6g8ym5v3laa7ncw2h9nm-source/goo/GString.h:82:32
    #1 0x55555592fff4 in GfxFont::readFontDescriptor(XRef*, Dict*) /nix/store/alirmx60yanq6g8ym5v3laa7ncw2h9nm-source/xpdf/GfxFont.cc:553:20
    #2 0x5555559423da in GfxCIDFont::GfxCIDFont(XRef*, char const*, Ref, GString*, GfxFontType, Ref, Dict*) /nix/store/alirmx60yanq6g8ym5v3laa7ncw2h9nm-source/xpdf/GfxFont.cc:1732:3
    #3 0x55555594a065 in GfxFont::makeFont(XRef*, char const*, Ref, Dict*) /nix/store/alirmx60yanq6g8ym5v3laa7ncw2h9nm-source/xpdf/GfxFont.cc:190:16
    #4 0x55555594a065 in GfxFontDict::load(char*, GfxFontDictEntry*) /nix/store/alirmx60yanq6g8ym5v3laa7ncw2h9nm-source/xpdf/GfxFont.cc:2393:12
```

If I plug that file path into `sed`, it prints the file's contents:

```bash
$ sed -n '548,558p' /nix/store/alirmx60yanq6g8ym5v3laa7ncw2h9nm-source/xpdf/GfxFont.cc
      i -= 2;
    } else if (i > 7 && !strncmp(name->getCString() + i - 7, "Oblique", 7)) {
      flags |= fontItalic;
      i -= 7;
    }
    char c = name->getChar(i-1);
    if (!((c >= 'A' && c <= 'Z') ||
          (c >= 'a' && c <= 'z') ||
          (c >= '0' && c <= '9'))) {
      --i;
    }
```

At this point, `flake.nix` should [look like this](https://gitlab.com/mtlynch/fuzz-xpdf/-/blob/07-debug-symbols/flake.nix).

## Understanding the crash

I now have an out of bounds memory read that crashes consistently. I've got all the debugging information I need to understand this bug, so it's time to dive into the source.

The top of the stack trace points to this line:

```c
// goo/GString.h

// Get <i>th character.
char getChar(int i) { return s[i]; }
```

Okay, so `s` is a `char` buffer, so it probably contains a C-style string. The `getChar` function doesn't perform any bounds checking to ensure that the caller is passing a legal value for `i`, and so the function is reading memory outside of the buffer that was allocated for `s`.

I'll step back one layer and check how `getChar` was called just before the crash. The next line of the stack trace points here:

```c++
// xpdf/GfxFont.cc

void GfxFont::readFontDescriptor(XRef *xref, Dict *fontDict) {
  ...

  // scan font name for bold/italic tags and update the flags
  if (name) {
    i = name->getLength();
    if (i > 2 && !strncmp(name->getCString() + i - 2, "MT", 2)) {
      i -= 2;
    }

    ...

    char c = name->getChar(i-1); // <<< CRASH
```

Okay, this is actually a fairly simple bug. `readFontDescriptor` checks that `name` is not `NULL`, but it assumes that it has a length of at least 1. If `name` is actually an empty string, then the `getChar` call evaluates to `name->getChar(-1)`. Then, `getChar` returns `s[-1]`, which is 1 byte before the memory buffer that was allocated for `s`.

If I re-read the ASAN output of the crash, that matches what ASAN was trying to tell me:

```text
==241578==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200002360f at pc 0x55555592fff5 bp 0x7fffffffa650 sp 0x7fffffffa648
READ of size 1 at 0x60200002360f thread T0
    #0 0x55555592fff4 in GString::getChar(int) /nix/store/alirmx60yanq6g8ym5v3laa7ncw2h9nm-source/goo/GString.h:82:32
    #1 0x55555592fff4 in GfxFont::readFontDescriptor(XRef*, Dict*) /nix/store/alirmx60yanq6g8ym5v3laa7ncw2h9nm-source/xpdf/GfxFont.cc:553:20

...

SUMMARY: AddressSanitizer: heap-buffer-overflow /nix/store/alirmx60yanq6g8ym5v3laa7ncw2h9nm-source/goo/GString.h:82:32 in GString::getChar(int)
Shadow bytes around the buggy address:
...
=>0x602000023600: fa[fa]00 fa fa fa fd fd fa fa fd fa fa fa fd fa
```

ASAN said that it's an illegal read of size 1, which makes sense because `getChar` tries to read a single 1-byte character.

ASAN's also shows the memory layout where it read `fa` which appears right before `00`. In the source code, `s` contains an empty string, which C++ represents in memory as `00`, so `pdftotext` was (illegally) trying to read the byte just before the empty string, which contains `fa`.

## Fixing the bug

If my hypothesis is correct, this bug should be easy to fix. In `readFontDescriptor`, I can change this line:

```c++
  if (name) {
```

To this:

```c++
  if (name && (name->getLength() > 0)) {
```

That ensures that the function treats an empty string the same as a null pointer and doesn't process it further.

TODO: Explain how to apply patches.

---

_Excerpts from xpdf are used under [the GPLv3 license](https://gitlab.com/mtlynch/xpdf/-/blob/4.05/COPYING3)._
