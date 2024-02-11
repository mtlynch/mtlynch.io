---
title: "Use a Nix Flake without Adding it to Git"
date: 2023-12-29T00:00:00-05:00
---

When I work in my own repositories these days, I always [add a Nix flake to the repo](/notes/nix-dev-environment/) so that I can spin up a working development environment on any system with a single command.

What do I do when I'm working in someone else's repo and they don't want to adopt Nix flakes?

Normally, I'd just add the file to my copy of the repo and [gitignore it locally](https://stackoverflow.com/a/1753078/90388) so I don't commit my personally-specific files with the rest of my changes.

The problem with Nix flakes is that they don't work unless you `git add flake.nix` to your repo. So, I searched for a way to have my own `flake.nix` file without committing it to Git.

## Hiding changes from git

Silvan Mosberger [offered this solution](https://discourse.nixos.org/t/can-i-use-flakes-within-a-git-repo-without-committing-flake-nix/18196/5?u=mtlynch):

```bash
git add --intent-to-add flake.nix flake.lock && \
  git update-index --assume-unchanged flake.nix flake.lock
```

It doesn't work perfectly, as commands like `git reset` will undo it, but it effectively hides the flake files from the changeset.

## Telling Nix to ignore git

Serhii Khoma also [showed a workaround](https://discourse.nixos.org/t/can-i-use-flakes-within-a-git-repo-without-committing-flake-nix/18196/28?u=mtlynch) where you can tell Nix to ignore the git repository:

```bash
nix develop path:.
```

This seems to be a little slower than the standard git-based version.

And then you can ignore the flake files locally with this command:

```bash
echo "flake.nix" >> .git/info/exclude && \
  echo "flake.lock" >> .git/info/exclude
```

This solution is more robust than the hide changes workaround, though you have to remember to use a different `nix develop` command than you might be used to.
