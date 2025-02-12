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

The solution was to use the [direnv VS Code extension](https://marketplace.visualstudio.com/items?itemName=mkhl.direnv) to sync Zig paths with VS code.

## Working solution

### Requirements

- Nix (I'm using 2.24.12)
  - with flakes enabled
- [direnv](https://direnv.net/) (I'm using 2.35.0)
- VS Code (I'm using 1.96.4)

### A Zig VS Code Nix flake template

I created a [Nix flake template](https://codeberg.org/mtlynch/zig-vscode-flake) that captures my Zig + VS Code solution. You can use it by running the following command:

```bash
nix flake init \
  --template git+https://codeberg.org/mtlynch/zig-vscode-flake.git
```

After calling `nix flake init`, run `direnv allow`, which should show zig and zls available:

```bash
$ direnv allow
...
direnv: nix-direnv: Renewed cache
Alejandra 3.0.0
zls 0.13.0
zig 0.13.0
```

Finally, in VS Code, go to "Extensions: Show Recommended Extensions" and install the recommended extensions.

At this point, you can run `zig init` to create a new project, and you should find that the Zig VS Code extension works properly with Zig.

{{<img src="vscode-zig-working.webp" has-border="true" max-width="700px" caption="If everything works, you should see language overlays in `src/main.zig`, and you should be able to jump to Zig library definitions.">}}

### Changing Zig versions

My flake is set to Zig 0.13.0, the latest release as of this writing.

If you want to a different tagged release, replace `0.13.0` with a different version:

```bash
EXISTING_ZIG_VERSION='0.13.0' # Set to whatever the version in the flake.nix is.
NEW_ZIG_VERSION='0.12.0'      # Set to your desired Zig version.
```

To use the bleeding edge, pre-release version of Zig, set the version to `master`:

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
