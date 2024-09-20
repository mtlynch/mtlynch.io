---
title: "Nix is Surprisingly Useful for Fuzz Testing"
date: 2024-09-14T19:16:32-04:00
tags:
  - nix
  - fuzzing
---

Fuzz testing is a cool technique for finding bugs in software, especially security critical bugs. I recently discovered that Nix is a great way to perform fuzz testing, as it eliminates a lot of gruntwork that's normally part of the fuzz testing workflow.

I created a Nix configuration that lets you fuzz test an open-source PDF reader with a single command:

```bash
nix run gitlab:mtlynch/fuzz-xpdf
```

1. Compiles an open-source PDF reader from source with proper instrumentation for fuzz testing
1. Downloads a set of edge-case PDFs to use as a basis for generating inputs
1. Fuzz tests the PDF reader and reports PDFs that caused crashes

So, that's neat! You don't have to hunt around for all the tools in the toolchain for compiling xpdf. You just run the command above, and it will install everything for you.

What's more, if you want to change the compilation options or compile a different version of xpdf, you can make simple changes to a single file.

## What's fuzz testing?

Fuzz testing or "fuzzing" is a way of finding bugs in program by randomly changing its input and checking if the program crashes trying to read the modified input.

For example, if you wanted to fuzz test a program that resized JPEG images, you could test it by starting with a valid JPEG, then randomly modifying the file and having your resizer open each version looking for crashes. If your program crashes, it reveals that your program is not robust against malformed input. These types of bugs often have security implications.

### Why fuzzing is hard

One of the biggest obstacles to fuzz testing is that it's a pain to set up. I've been trying to learn fuzzing, but all the tutorials I've found make it so hard to get a working setup.

## What's Nix?

Nix is a complex tool that does a lot of different things, many of which I don't quite understand, as I'm still a Nix beginner.

For this article, it's sufficient to think of Nix as a hybrid build tool and package manager. I'll show how to use Nix to pull dependencies and tools into your development environment, and I'll also use Nix to create a sequence of steps that compile the application under test and execute fuzz tests.

## If you don't have Nix

Install Nix using the Determinate Systems installer:

TODO

## Building xpdf with Nix

I want to compile the pdftotext utility. It exercises the PDF parsing code, but it's a simple command-line utility with no GUI component, so it should run quickly and be friendly to testing entirely from the terminal.

To start the project, I create a new folder and make it a git repository.

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

This tells Nix that when I want to pull in packages, I'm pulling them from the nixos-24.05 branch of the Nix package repository (TODO: link).

But this is just a skeleton and won't successfully build yet. To compile xpdf using Nix, I need to add a few bits.

```
xpdf = pkgs.stdenv.mkDerivation rec {
  pname = "xpdf";
  version = "4.05";
  ...
```

First, I call []`mkDerivation`](https://nixos.org/manual/nixpkgs/stable/#sec-using-stdenv), which is how I define a build component in Nix. It requires a package name (`pname`) and version, so I specify `xpdf`, the package I want to fuzz and `4.05`, the latest published version of xpdf as of this writing.

```nix
xpdf = pkgs.stdenv.mkDerivation rec {
  ...
  src = pkgs.fetchzip {
    url = "https://dl.xpdfreader.com/${pname}-${version}.tar.gz";
    hash = "sha256-LBxKSrXTdoulZDjPiyYMaJr63jFHHI+VCgVJx310i/w=";
    extension = "tar.gz";
  };
```

The other required field in `mkDerivation` is a `src` which specifies how Nix should retrieve the inputs for the build. In the case of xpdf, the source tarball is located at this URL:

- https://dl.xpdfreader.com/xpdf-4.05.tar.gz

I specify that URL in Nix using the `pname` and `version` variables to make it easier to fuzz other versions if I want to.

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

I only want to run pdftotext, so I only need CMake and FreeType. Looking at the Nix package repository, I see that packages for cmake and freetype are already available:

- [cmake](https://search.nixos.org/packages?channel=24.05&show=cmake&from=0&size=50&sort=relevance&type=packages&query=cmake)
- [freetype](https://search.nixos.org/packages?channel=24.05&show=freetype&from=0&size=50&sort=relevance&type=packages&query=freetype)

I assume I only need cmake at build time, not at runtime, so I specify that in xpdf's `nativeBuildInputs`, which specifies build-time dependencies, and I specify `freetype` under `buildInputs` so that it's available both at build time and at runtime:

```
xpdf = pkgs.stdenv.mkDerivation rec {
  ...
  nativeBuildInputs = with pkgs; [
    cmake
  ];

  buildInputs = with pkgs; [
    freetype
  ];
```

TODO: Explain each part.

The final `flake.nix` file should look like this:

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

Finally, build the package from source with `nix build`:

```bash
nix build
```

If everything worked, there should be a set of binaries under `./result/bin` that you can try running:

```bash
$ ./result/bin/pdftotext -v
pdftotext version 4.05 [www.xpdfreader.com]
Copyright 1996-2024 Glyph & Cog, LLC
```

The full source at this stage is [available on Gitlab](https://gitlab.com/mtlynch/fuzz-xpdf/-/tree/01-compile-xpdf).

## Compile xpdf with AFL++

```nix
{
  description = "xpdf built from source";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        packages.default = pkgs.stdenv.mkDerivation rec {
          pname = "xpdf";
          version = "3.02";

          src = pkgs.fetchzip {
            url = "https://dl.xpdfreader.com/old/${pname}-${version}.tar.gz";
            hash = "sha256-+CO+dS+WloYr2bDv8H4VWrtx9irszqVPk2orDVfk09s=";
            extension = "tar.gz";
          };

          nativeBuildInputs = with pkgs; [
            aflplusplus
          ];

          buildInputs = with pkgs; [
            freetype
            motif
          ];

          configureFlags = [
            "--with-freetype2-library=${pkgs.freetype.out}/lib"
            "--with-freetype2-includes=${pkgs.freetype.dev}/include/freetype2"
            "--prefix=${placeholder "out"}"
          ];

          configurePhase = ''
            export CC=${pkgs.aflplusplus}/bin/afl-clang-fast
            export CXX=${pkgs.aflplusplus}/bin/afl-clang-fast++
            ./configure $configureFlags
          '';
        };

        defaultPackage = self.packages.${system}.default;
      }
    );
}
```

## Fuzzing

```bash
CRASHING_PDF='fuzz-output/default/crashes.2024-09-14-22:05:14/id:000000,sig:11,src:000862+000165,time:102771,execs:57754,op:splice,rep:13'
gdb -ex run --args ./result/bin/pdftotext "${CRASHING_PDF}"
```

Type `bt` to see a backtrace (stacktrace).

---

_Thanks to XX for creating the tutorial series XX. This work builds on that foundation._
