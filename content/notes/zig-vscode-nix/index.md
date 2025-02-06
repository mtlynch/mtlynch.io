---
title: "My Zig Configuration for VS Code"
date: 2025-01-27
---

I know there's Zig Version Manager, but I prefer to use Nix to manage all of my project dependencies.

Nix works great for managing Zig versions, but the problem is that I start VS Code before I launch my Nix dev environment. So the Zig VS Code plugin doesn't know where to find my local Zig compiler or the Zig Language Server binary, `zls`.

When I open the project, VS Code helpfully prompts me to enable the Zig Language Server, but when I say yes, I get this error message:

{{<img src="zls-fail.webp" has-border="true" caption="ZLS install fails">}}

## Just show me the solution

If you want to skip the process of how I got my solution working, you can [skip to the solution below](#working-solution).

I installed the [Zig VS Code extension](https://marketplace.visualstudio.com/items?itemName=ziglang.vscode-zig)

## Attempt #1: Just make ZLS available

Here was my first attempt at a Nix flake to install Zig 0.13.0 with the matching version of ZLS, the Zig Language Server. Here is my first `flake.nix`:

```nix
{
  description = "Zig development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
    zig-overlay.url = "github:mitchellh/zig-overlay";
    # Keep in sync with zigVersion below.
    zls-overlay.url = "github:zigtools/zls/0.13.0";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    ...
  } @ inputs:
    flake-utils.lib.eachSystem (builtins.attrNames inputs.zig-overlay.packages) (system: let
      pkgs = import nixpkgs {
        inherit system;
        overlays = [
          (final: prev: {
            zigpkgs = inputs.zig-overlay.packages.${prev.system};
          })
        ];
      };
      zigVersion = "0.13.0";
      zig = pkgs.zigpkgs.${zigVersion};
      zls = inputs.zls-overlay.packages.${system}.zls.overrideAttrs (old: {
        nativeBuildInputs = [zig];
      });
    in {
      devShells.default = pkgs.mkShell {
        packages = with pkgs; [
          zig
          zls
        ];

        shellHook = ''
          echo 'zls' "$(zls --version)"
          echo 'zig' "$(zig version)"
        '';
      };

      formatter = pkgs.alejandra;
    });
}
```

This works, in that it installs Zig and ZLS correctly in my shell:

```bash
$ zig version && zls --version
0.13.0
0.13.0
```

The problem is that VS Code doesn't pick up ZLS. When I view the sample `main.zig` in VS Code and try to use auto-complete, it just shows a dumb auto-complete based on variable names in the file:

{{<img src="bad-autocomplete.webp" has-border="true">}}

## Attempt #2: Give VS Code a hardcoded path

From reading documentation, I figured out that the VS Code Zig extension allows me to override the default paths to Zig and ZLS with these VS Code settings:

- `zig.path`
- `zig.zls.path`

Okay, I can figure that out. I just ask the shell where the binaries are:

```bash
$ which zig && which zls
/nix/store/s3nq31mhm8gxkq691p5w6q61ficw1hvr-zig-0.13.0/bin/zig
/nix/store/rfy6amzrkimywfmlgr5mvka99b6yp3jk-zls/bin/zls
```

Have to completely close the window. Reloading doesn't work.

```bash
nix flake update zls-overlay
```

## Working solution

Note that you have to completely close the VS Code window and reopen it for the solution to work. Simply reloading the window is not sufficient.
