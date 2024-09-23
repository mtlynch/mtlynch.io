---
title: "Nix is Surprisingly Useful for Fuzz Testing (Part One)"
date: 2024-09-14T19:16:32-04:00
tags:
  - nix
  - fuzzing
---

Fuzz testing is a technique for automatically uncovering bugs in software. It exposes a lot of bugs, especially security critical ones, but it's a pain to set up.

It turns out that Nix is a great tool for eliminating the gruntwork from the fuzz testing, even for a beginner like me to both Nix and fuzz testing.

## A preview of the solution

I'm going to show you the process I used to create the fuzzing workflow step by step, but here's the end result: you can start fuzz testing [an open-source PDF reader](https://www.xpdfreader.com/) with a single command:

```bash
nix run gitlab:mtlynch/fuzz-xpdf
```

The command should work on any Linux system with Nix installed, and maybe MacOS, too. It should cause your system to spend a few minutes building and then start a terminal UI that looks like this:

TODO

Here's everything that happens when you run the command above:

1. Nix downloads all tools and dependencies for the PDF reader itself and the testing toolchain.
1. Nix compiles an open-source PDF reader from source with proper instrumentation for fuzz testing.
1. Nix downloads a set of edge-case PDFs to use as a basis for generating inputs for testing.
1. Nix automatically generates new PDFs, feeds them to the PDF reader, and reports which inputs caused the PDF reader to crash.

You don't have to hunt around for all the tools in the toolchain for compiling the PDF reader or the fuzzer. You just run the command above, and it will install everything for you.

What's more, if you want to change the fuzzing options or test a different version of the PDF reader, you can make simple changes to a single file.

If you'd like to start hacking around with it, my full configuration is [available on Gitlab](https://gitlab.com/mtlynch/fuzz-xpdf/-/blob/master/flake.nix?ref_type=heads), but in this post, I'm going to share how I created it step by step. The methodology I show allows you to apply the same techniques to other projects.

## What's fuzz testing?

Fuzz testing or "fuzzing" is a way of finding bugs in program by feeding it randomly generated input.

For example, if you wanted to fuzz test a program that resized JPEG images, the workflow would look like this:

1. Take a set of valid and/or malformed JPEG image files.
1. Randomly select one of the input files and randomly mutate it (flip some bits, add some data, delete some data).
1. Feed the mutated input file to the image resizing program.
1. If the mutated input caused the program to crash or hang, save the input for later analysis.
1. Go back to step (2)

Fuzz testing often reveals security-critical bugs.

### Code-path-aware fuzzing

Modern fuzzers are even smarter than random, as they trace execution within a program. So if the fuzzing tool mutates an input file, feeds it to the target program, and then the program executes a piece of code that no other input has triggered, the fuzzer tries more mutations from there to try to execute less-traveled code paths, as that's often where bugs lie.

### Why fuzzing is hard

One of the biggest obstacles to fuzz testing is that it's a pain to set up. I've been trying to learn fuzzing, but all the tutorials I've found make it so hard to get a working setup.

## What's Nix?

Nix is a complex tool that does a lot of different things, many of which I don't even understand.

For the purposes of this article, it's sufficient to think of Nix as:

- A package manager, similar to `apt` or `yum`. Nix has XXk packages available to run within the Nix environment.
- A build tool, similar to `make` or `Docker`. Nix allows you to define a set of build steps and builds

### Why is Nix useful for fuzzing?

Effective caching. If you change a compilation option, you don't have to start from scratch.

With a tool like `make`, if I compile an application with `gcc`, then try compiling with `clang`, then decide to go back to `gcc`, I have to do the whole compilation over from scratch. With Nix, it caches every build, so even if my program takes 20 minutes to compile, once I've compiled at least once with both `gcc` and `clang`, I can switch between them instantly. And that applies not just to the compiler but every compilation option in my build.

## Requirements

### Nix

Install Nix using the Determinate Systems installer:

TODO

### git

You'll also need git installed.

## Building xpdf with Nix

The PDF reader I'm fuzz testing is called [xpdf](https://xpdfreader.com). I'd never seen it before, but it was an example in a good fuzzing tutorial I found, so I'm sticking with it.

xpdf is a PDF viewer, but it ships with a suite of PDF utilities. One of the utilities, `pdftotext` is an attractive fuzzing target because it's so simple. It has no GUI; it just accepts a PDF as input and produces plaintext as output, but it still exercises xpdf's complex PDF parsing code. If I find a bug in `pdftotext`, it means I've probably found a bug in the whole `xpdf` suite.

### Putting the boilerplate in place

To start the project, I create a new folder and create a git repository.

```bash
mkdir fuzz-xpdf \
  && cd fuzz-xpdf \
  && git init
```

Next, I create this file called `flake.nix`:

```nix
{
  description = "compile xpdf from source for fuzzing";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        packages = rec {
          default = xpdf;

          xpdf = pkgs.stdenv.mkDerivation rec {
            # TODO: I'll populate this next.
          };
        };
      }
    );
}
```

This is a Nix "flake," which is a file that defines a set of Nix packages and applications.

So far, this is just a boilerplate skeleton of a Nix flake. Most of it is not worth discussing except this line:

```
nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
```

This tells Nix that when I want to pull in packages, I'm pulling them from the [24.05 tag](https://github.com/NixOS/nixpkgs/tree/24.05) of the Nix package repository.

But this is just a skeleton and won't successfully build yet. To compile xpdf using Nix, I need to add a few bits.

### Specifying a source tarball

First, I call [`mkDerivation`](https://nixos.org/manual/nixpkgs/stable/#sec-using-stdenv), which is how I define a build component in Nix. It requires a package name (`pname`) and version, so I specify `xpdf`, the package I want to fuzz and `4.05`, the latest published version of xpdf as of this writing.

```
xpdf = pkgs.stdenv.mkDerivation rec {
  pname = "xpdf";
  version = "4.05";
  ...
```

The other required field in `mkDerivation` is a `src` which specifies how Nix should retrieve the inputs for the build. In the case of xpdf, the source tarball is located at this URL:

- https://dl.xpdfreader.com/xpdf-4.05.tar.gz

I specify xpdf's tarball URL using the `pname` and `version` variables to make it easier to fuzz other versions if I want to.

```nix
{
  xpdf = pkgs.stdenv.mkDerivation rec {
    ...
    src = pkgs.fetchzip {
      url = "https://dl.xpdfreader.com/${pname}-${version}.tar.gz";
      hash = "sha256-LBxKSrXTdoulZDjPiyYMaJr63jFHHI+VCgVJx310i/w=";
      extension = "tar.gz";
    };
```

### Specifying a source tarball hash

Nix requires a hash of the tarball so that it can tell whether its cached result is valid, so I have to specify the SHA256 hash of the tarball. The easiest way to do this is to just provide a placeholder:

Nix will then dutifully complain that the hash is wrong:

```text
error: hash mismatch in fixed-output derivation '/nix/store/dckwxnxplnzzbf1c5pa4jlspss2vwck9-source.drv':
         specified: sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=
            got:    sha256-LBxKSrXTdoulZDjPiyYMaJr63jFHHI+VCgVJx310i/w=
```

And then I just paste the `got` value back into my `flake.nix`.

The slightly more elegant way to calculate the correct hash is to run this command:

```bash
$ URL='https://dl.xpdfreader.com/xpdf-4.05.tar.gz' && \
  nix hash to-sri --type sha256 \
    "$(nix-prefetch-url --unpack "${URL}" | tail -n 1)"
path is '/nix/store/n7v30hkr7s18z714jgvvg4gxy1f3i94i-xpdf-4.05.tar.gz'
sha256-LBxKSrXTdoulZDjPiyYMaJr63jFHHI+VCgVJx310i/w=
```

The above command is pretty difficult to remember, so I recommend just using the placeholder and taking the correction from the error message.

Now, I have to figure out how to actually build it. The xpdf [compile instructions](https://gitlab.com/mtlynch/xpdf/-/blob/4.05/INSTALL#L32-39) say the following:

> Make sure you have the following installed:
>
> - CMake 2.8.8 or newer
> - FreeType 2.0.5 or newer
> - Qt 5.x or 6.x (for xpdf only)
> - libpng (for pdftopng and pdftohtml)
> - zlib (for pdftopng and pdftohtml)

I only want to run `pdftotext`, so I only need CMake and FreeType.

Looking at the [Nix package repository](https://search.nixos.org), I see that packages for cmake and freetype are already available:

- [cmake](https://search.nixos.org/packages?channel=24.05&show=cmake&from=0&size=50&sort=relevance&type=packages&query=cmake)
- [freetype](https://search.nixos.org/packages?channel=24.05&show=freetype&from=0&size=50&sort=relevance&type=packages&query=freetype)

I assume I only need cmake at build time, not at runtime, which means it belongs under `nativeBuildInputs`. I probably need `freetype` at runtime, so I specify it under `buildInputs`:

```nix
{
  xpdf = pkgs.stdenv.mkDerivation rec {
    ...
    nativeBuildInputs = with pkgs; [
      cmake
    ];

    buildInputs = with pkgs; [
      freetype
    ];
```

At this point, `flake.nix` should look like this:

```nix
{
  description = "compile xpdf from source for fuzzing";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        packages = rec {
          default = xpdf;

          xpdf = pkgs.stdenv.mkDerivation rec {
            pname = "xpdf";
            version = "4.05";

            src = pkgs.fetchzip {
              url = "https://dl.xpdfreader.com/${pname}-${version}.tar.gz";
              hash = "sha256-LBxKSrXTdoulZDjPiyYMaJr63jFHHI+VCgVJx310i/w=";
              extension = "tar.gz";
            };

            nativeBuildInputs = with pkgs; [
              cmake
            ];

            buildInputs = with pkgs; [
              freetype
            ];
          };
        };
      }
    );
}
```

For tidiness, create a `.gitignore`:

```bash
echo 'result
fuzz-output' > .gitignore
```

And add everything to the git repository:

```
git add --all
```

{{<notice type="warning">}}
**Note**: An annoying gotcha of Nix flakes is that Nix can't see files unless they're under source control by git. If you get error messages about "file not found," check that you've added the file to git.
{{</notice>}}

Finally, build the package from source with `nix build`:

```bash
nix build
```

If everything worked, there should be a set of binaries under `./result/bin` that I can run:

```bash
$ ls ./result/bin/
pdfdetach  pdffonts  pdfimages  pdfinfo  pdftohtml  pdftopng  pdftoppm  pdftops  pdftotext
```

### That was confusingly easy

If you're confused at how Nix built that binary, so was I. I hadn't even told Nix what the build process was for `xpdf`, so how did Nix know?

> for Unix packages that use the standard `./configure; make; make install` build interface, you don’t need to write a build script at all; the standard environment does everything automatically. If `stdenv` doesn’t do what you need automatically, you can easily customise or override the various build phases.
>
> ["The Standard Environment"](https://nixos.org/manual/nixpkgs/stable/#chap-stdenv) from the Nix Manual

### Experimenting with pdftotext

```bash
$ ./result/bin/pdftotext -v
pdftotext version 4.05 [www.xpdfreader.com]
Copyright 1996-2024 Glyph & Cog, LLC
```

As a test I downloaded the [Form W-4 PDF](https://www.irs.gov/pub/irs-pdf/fw4.pdf) from the IRS website and fed it to `pdftotext`:

```text
$ ./result/bin/pdftotext fw4.pdf /dev/stdout | head -n 5
Form W-4
Department of the Treasury Internal Revenue Service

Employee's Withholding Certificate
Complete Form W-4 so that your employer can withhold the correct federal income tax from your pay. Give Form W-4 to your employer.
```

Cool, that looks correct.

The full source at this stage is [available on Gitlab](https://gitlab.com/mtlynch/fuzz-xpdf/-/tree/01-compile-xpdf).

## Compile xpdf with AFL++

AFL++ is a XX fuzzer, which means that it traces which parts of the target binary execute as different inputs run. AFL++ can do this even for closed-source binaries, but for open-source projects, AFL++ does a better job of fuzzing if I recompile the application using AFL++ as my compiler.

AFL++ ships with C and C++ compilers that are drop-in replacements for TODO, so compiling with AFL++ should be as simple as telling the build toolchain to use this compiler.

According to AFL++'s docs, I'm likely to see the best fuzzing results with `afl-clang-lto`, but that requires clang 11 or higher. AFL++ docs also recommend the newest possible version of llvm. The latest version of LLVM available through Nix is 18.

Next, I modify `nativeBuildInputs` to include both the [`aflplusplus`](https://search.nixos.org/packages?channel=24.05&show=aflplusplus&from=0&size=50&sort=relevance&type=packages&query=aflplusplus) package and the [`llvm_18` package](https://search.nixos.org/packages?channel=24.05&show=llvm_18&from=0&size=50&sort=relevance&type=packages&query=llvm):

```nix
{
  xpdf = pkgs.stdenv.mkDerivation rec {
    ...
    nativeBuildInputs = with pkgs; [
      aflplusplus
      cmake
      llvm_18
    ];
}
```

Okay, now AFL++ will be available in my build environment, but how do I tell cmake to use the AFL++ compiler instead of whatever it was using before?

Make and CMake respect the [`CC`](https://cmake.org/cmake/help/latest/envvar/CC.html) and [`CXX`](https://cmake.org/cmake/help/latest/envvar/CXX.html) environment variables, which specify a C and C++ compiler, respectively.

Interestingly, I tested setting `export CC=afl-clang-lto`, and that worked fine, but that creates ambiguity, whereas I specifically want to point to the binary from the `aflplusplus` package. But I don't know where in that package `afl-clang-lto` is located

Next, I specify some environment variables to compile xpdf effectively for fuzzing:

```bash
$ nix build nixpkgs#aflplusplus

$ find -L result -type f -name afl-clang-lto
result/bin/afl-clang-lto
```

Okay, that tells me that the compilers are under the package output for aflplusplus under the `bin/` subdirectory, so I specify them like this:

```nix
{
    xpdf = pkgs.stdenv.mkDerivation rec {
    ...
      preConfigure = ''
        export CC=${pkgs.aflplusplus}/bin/afl-clang-lto
        export CXX=${pkgs.aflplusplus}/bin/afl-clang-lto++
      '';
}
```

At this point, `flake.nix` should [look like this](https://gitlab.com/mtlynch/fuzz-xpdf/-/blob/02-compile-xpdf-with-afl++/flake.nix?ref_type=heads).

## Ad-hoc fuzzing

```nix
{
  packages = rec {
    default = xpdf;
    ...
    devShells.default = pkgs.mkShell {
      buildInputs = self.packages.${system}.xpdf.nativeBuildInputs ++ (with pkgs; [
        gdb
        wget
      ]);

      shellHook = ''
        wget --version | head -n 1
        gdb --version | head -n 1
        afl-fuzz --version
      '';
    };
```

At this point, `flake.nix` should [look like this](https://gitlab.com/mtlynch/fuzz-xpdf/-/blob/03-dev-shell/flake.nix?ref_type=heads).

The `devShells` command creates a terminal shell where I can access the components in my Nix environment. I enter the shell by typing `nix develop`:

```bash
$ nix develop
GNU Wget 1.21.4 built on linux-gnu.
GNU gdb (GDB) 14.2
afl-fuzz++4.10c
```

The output is from `shellHook` which prints the version numbers of the tools available within the shell.

Next, I grab a PDF to use as my sample input.

```bash
$ PDF_URL='https://www.irs.gov/pub/irs-pdf/fw4.pdf' && \
  PDF_DIR="$(mktemp --directory)" && \
  wget --directory-prefix="${PDF_DIR}" "${PDF_URL}"
```

Then I create a directory to store the fuzz results. Since this is just experimental, I'm using a temporary directory:

```bash
FUZZ_OUTPUT_DIR="$(mktemp --directory)"
```

I do one more `nix build` to ensure that `pdftotext` is ready to run under the `./result/bin` folder:

```bash
$ nix build && ./result/bin/pdftotext -v
pdftotext version 4.05 [www.xpdfreader.com]
Copyright 1996-2024 Glyph & Cog, LLC
```

Finally, it's the moment of truth. I put everything together to call AFL++'s fuzz testing runner, `afl-fuzz`.

```bash
$ afl-fuzz \
    -i "${PDF_DIR}" \
    -o "${FUZZ_OUTPUT_DIR}" \
    -- ./result/bin/pdftotext @@ /dev/null
```

There's a lot to this command, so let me break it down:

- `-i "${PDF_DIR}"`: Specifies the directory of input files to mutate.
- `-o "${FUZZ_OUTPUT_DIR}"`: Specifies the directory to write fuzzing results.
- `-- ./result/bin/pdftotext @@ /dev/null`: Specifies the target program to fuzz. `afl-fuzz` replaces the `@@` with a newly generated file on each execution, and `/dev/null` tells `pdftotext` to throw out the results of the PDF to text conversion.

I run the command and am greeted to the AFL++ fuzzing interface:

TODO

## Next: Finding an unpatched bug

That's enough for part one. In my follow-up post, I'll show how to automate more of the fuzzing workflow and tune AFL++ to find an unpatched bug in the latest version of xpdf.

- [Nix is Surprisingly Useful for Fuzz Testing (Part Two)](/nix-fuzz-testing-2/)

---

_Thanks to XX for creating the tutorial series XX. This work builds on that foundation._
