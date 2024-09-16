---
title: "Nix Makes Fuzz Testing Easier"
date: 2024-09-14T19:16:32-04:00
tags:
  - nix
  - fuzzing
---

Fuzz testing is a cool technique for finding bugs in software, especially security critical bugs. To fuzz test an application, you take a valid input like a file and then randomly mutate it to change values, add data, or blah. You then try opening the mutated file and seeing if it crashes.'

One of the biggest challenges of fuzzing is how difficult it is to set up. I recently discovered that Nix greatly alleviates some pain points of fuzzing and allows you to get up and running quickly.

## Why fuzzing is hard

One of the biggest obstacles to fuzz testing is that it's a pain to set up. I've been trying to learn fuzzing, but all the tutorials I've found make it so hard to get a working setup.

```bash
git clone https://gitlab.com/mtlynch/fuzz-xpdf.git && \
  cd fuzz-xpdf && \
  nix run
```

1. Compiles xpdf from source with proper instrumentation for fuzz testing
1. Downloads a set of edge-case PDFs to use as a basis for generating inputs
1. Begins the fuzzing process

That's pretty good for three commands!

What's more, if you want to change the compilation options or compile a different version of xpdf, you can make simple changes to a single file.

## If you don't have Nix

Install Nix using the Determinate Systems installer:

TODO

## Building xpdf with Nix

```bash
mkdir fuzz-xpdf \
  && cd fuzz-xpdf \
  && git init
```

Next, create this file called `flake.nix`:

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

          buildInputs = with pkgs; [
            freetype
            motif
          ];

          configureFlags = [
            "--with-freetype2-library=${pkgs.freetype.out}/lib"
            "--with-freetype2-includes=${pkgs.freetype.dev}/include/freetype2"
            "--prefix=${placeholder "out"}"
          ];
        };

        defaultPackage = self.packages.${system}.default;
      }
    );
}
```

TODO: Explain each part.

```
$ URL='https://dl.xpdfreader.com/old/xpdf-3.02.tar.gz' && \
  nix hash convert \
  --hash-algo sha256 \
  --to sri \
  "$(nix-prefetch-url --unpack "${URL}" | tail -n 1)"
path is '/nix/store/n8p6c9c2r8wdiz7n8d5qvngdfck6mv71-xpdf-3.02.tar.gz'
sha256-+CO+dS+WloYr2bDv8H4VWrtx9irszqVPk2orDVfk09s=
```

Finally, build the package from source with `nix build`:

TODO: Add .gitignore

```bash
git add -A
nix build
```

If everything worked, there should be a set of binaries under `./result/bin` that you can try running:

```bash
$ ./result/bin/pdfinfo -v
pdfinfo version 3.02
Copyright 1996-2007 Glyph & Cog, LLC
```

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
