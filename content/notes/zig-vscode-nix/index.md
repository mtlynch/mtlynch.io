---
title: "My Zig Configuration for VS Code"
date: 2025-02-14
---

I found it surprisingly difficult to configure VS Code properly for development with Zig. I kept running into issues with Zig version mismatches or VS Code completely failing to recognize Zig semantics and failing over to naive autocomplete.

I finally found a solution that makes VS Code work consistently with Zig, so I hope this saves someone else a headache.

{{<img src="vscode-zig-working.webp" has-border="true" max-width="700px" caption="Zig extension for VS Code working correctly">}}

## Managing multiple Zig versions across projects

Zig has not yet reached a stable 1.0 release. If you're working on software written in Zig, you have to use the version of the Zig compiler that matches that project.

The most popular method for managing Zig versions seems to be the [Zig Version Manager](https://www.zvm.app/), which I haven't tried.

I personally manage Zig versions per-project using [Nix development shells](notes/nix-dev-environment/), so that's what I'm sharing below.

## The problem: VS Code can't find ZLS

When I open the project, VS Code helpfully prompts me to enable the Zig Language Server, but when I say yes, I get this error message:

{{<img src="zls-fail.webp" has-border="true" caption="ZLS install fails">}}

The issue is that I start VS Code before I launch my Nix dev environment, so the Zig VS Code plugin doesn't know where to find my local Zig compiler or the Zig Language Server binary, `zls`.

## Just show me the solution

If you want to skip the process of how I got my solution working, you can [skip to the solution below](#working-solution).

## Failed attempt: Hardcode the path to Zig

I started by doing the obvious: creating a Nix flake to install Zig 0.13.0 with the matching version of ZLS, the Zig Language Server. Here was my `flake.nix`:

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

The Nix flake works in that it installs Zig and ZLS correctly in my shell:

```bash
$ zig version && zls --version
0.13.0
0.13.0
```

The problem is that VS Code can't find ZLS.

When I view the sample `main.zig` in VS Code and try to use auto-complete, it just shows a dumb auto-complete based on variable names in the file:

{{<img src="bad-autocomplete.webp" has-border="true">}}

If I go to the command menu and choose "Developer: Open Extension Logs Folder" and open `exthost.log`, I see the following in my logs:

```text
2025-02-08 16:01:55.504 [error] Activating extension ziglang.vscode-zig failed due to an error:
2025-02-08 16:01:55.504 [error] TypeError: Cannot read properties of undefined (reading 'getZigPath')
```

Okay, that makes sense. The Zig VS Code extension can't find the path to Zig in my weirdo Nix development environment.

How do I help the Zig extension find my Zig binary?

### What if I tell VS Code the path?

From reading the documentation, I figured out that the VS Code Zig extension allows me to override the default paths to Zig and ZLS with these VS Code settings:

- `zig.path`
- `zig.zls.path`

Okay, I can figure that out. I just ask the shell where the binaries are:

```bash
$ which zig && which zls
/nix/store/s3nq31mhm8gxkq691p5w6q61ficw1hvr-zig-0.13.0/bin/zig
/nix/store/rfy6amzrkimywfmlgr5mvka99b6yp3jk-zls/bin/zls
```

Have to completely close the window. Reloading doesn't work.

### What about when I switch Zig versions?

That works fine, but what

## Solution: Oh, wait there's an extension for this

I found a [fasterthanlime post](https://fasterthanli.me/series/building-a-rust-service-with-nix/part-10#setting-up-direnv-in-vscode) that talked about this same problem. He solved it by using the .

I actually thought this didn't work because I installed direnv, and nothing happened.

Then I noticed that direnv had attempted to update my system-wide VS Code user settings to add this line:

```json
{
  "zig.zls.enabled": "off"
}
```

It wasn't able to save the changes because I manage VS Code settings with Home Manager, so the file was read-only.

So, I tried adding that setting to my project-local `.vscode/settings.json` folder, and again: nothing happened. But then I tried flipping `"off"` to `"on"`, and suddenly: it worked!

```json
{
  "zig.zls.enabled": "on"
}
```

## Working solution

### Requirements

- Nix (I'm using 2.24.12)
  - with flakes enabled
- [direnv](https://direnv.net/) (I'm using 2.35.0)
- VS Code (I'm using 1.96.4)
- [Zig VS Code extension](https://marketplace.visualstudio.com/items?itemName=ziglang.vscode-zig) (I'm using 0.6.4)

### A Zig VS Code Nix flake template

I created a [Nix flake template](https://codeberg.org/mtlynch/zig-vscode-flake) that captures my Zig + VS Code solution. You can use it by running the following command:

```bash
nix flake init \
  --template git+https://codeberg.org/mtlynch/zig-vscode-flake.git
```

After calling `nix flake init`:

1. Run `direnv allow`
1. In VS Code, go to "Extensions: Show Recommended Extensions" and install the recommended extensions.

At that point, you should see this output:

```bash

```

You can run `zig init` to create a new project, and you should find that the Zig VS Code extension works properly with Zig.

### Changing Zig versions

My flake is set to Zig 0.13.0, the latest release as of this writing. If you want to a different tagged release, replace `0.13.0` with a different version:

```bash
EXISTING_ZIG_VERSION='0.13.0' # Set to whatever the version in the flake.nix is.
NEW_ZIG_VERSION='0.12.0'      # Set to your desired Zig version.
```

To use the bleeding edge development version of Zig, set the version to `master`:

```bash
NEW_ZIG_VERSION='master'      # Set if you want bleeding edge Zig.
```

Once you've updated the Zig version in the `flake.nix` file, run these commands to apply the changes:

```bash
sed \
  --in-place \
  "s/${EXISTING_ZIG_VERSION}/${NEW_ZIG_VERSION}/g" \
  flake.nix && \
  nix flake update zig zls-overlay && \
  nix develop
```

You may have to restart (not just reload) VS Code for the changes to take effect.
