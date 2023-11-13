---
title: "Import from a URL in Nix"
date: 2023-09-17T00:00:00-04:00
tags:
  - nix
---

I'm still a Nix beginner, and one thing I couldn't figure out until recently was how to keep parts of my `configuration.nix` file under source control.

## My goal

I'd like for my Nix configuration files to be modular and reusable, so depending on the system or flake, I can pull in only the configuration files I need. I'd like all my Nix configuration files to be under source control so that different systems can depend on different versions of any file so I don't have to upgrade every system to the latest version of each configuration file at the same time.

## Creating reusable bash aliases with a local file

One of the reusable Nix configurations I want is my bash aliases. On my existing system, I have these lines in my `.bashrc`:

```bash
alias gc='git commit --message'
alias gs='git status'
alias td='pushd $(mktemp -d)'
```

To achieve the equivalent in bash, I can create a file on my NixOS system with these contents. I've called it `shell.nix` but it can be anything:

```nix
{
  programs.bash.shellAliases = {
    gc = "git commit --message";
    gs = "git status";
    td = "pushd $(mktemp -d)";
  };
}
```

If I store this file under `/tmp/shell.nix`, then I can import it into my `/etc/nixos/configuration.nix` by adding the path to my `imports`:

```nix
{
  imports = [
    "/tmp/shell.nix"
  ];
}
```

If I run `sudo nixos-rebuild switch` and then restart my shell, I can see that my bash aliases are now active:

```bash
$ td
/tmp/tmp.awb7PW7aus ~

[/tmp/tmp.awb7PW7aus]$ pwd
/tmp/tmp.awb7PW7aus
```

## Moving the Nix file to a URL

The solution above works, but it requires me to copy the same file on each of my Nix systems.

I'd rather host the file at a publicly accessible URL, and then I can have a standard `configuration.nix` file that references the URL.

Here's how I adjust my `configuration.nix` to pull in [my `shell.nix` file]({{<baseurl>}}/notes/nix-import-from-url/shell.nix) from a remote URL:

```nix
let
  shellAliases = builtins.fetchurl {
    url = "{{<baseurl>}}/notes/nix-import-from-url/shell.nix";
  };
in {
  imports = [
    shellAliases
  ];
}
```

Once again, if I save these changes to `configuration.nix`, run `sudo nixos-rebuild switch`, and restart my shell, Nix imports my bash aliases from the URL.

## Using `fetchGit` (optional)

Another option for fetching remote Nix files is to store them in a public Git repository and then use `fetchGit` to retrieve the files.

Here's an example of a `configuration.nix` file that fetches my `shell.nix` from a public Github repo:

```nix
let
  repo = builtins.fetchGit {
    url = "https://github.com/mtlynch/nix-files";
    rev = "f98500a995cb5838e40be139a8327867faaff2d5";
  };
in {
  imports = [
    "${repo}/shell.nix"
  ];
}
```

The `url` is the public URL of my Github repo, and `rev` is the Git commit hash of the version of the file I want to import.

After I make those changes to `configuration.nix`, I can re-run `sudo nixos-rebuild switch`, and Nix imports my `shell.nix` file from my Github repo.

## More advanced shell configuration

Most of my bash aliases are simple one-liners, but a few are more complicated. For those, I define bash functions, and then I create short bash aliases for those functions.

One example is my `gcbm` bash alias. I use it like this `gcbm some-branch`, which does the following:

1. Check out the main branch.
1. Pull down the latest changes from the remote repo.
1. Check out a new branch called `some-branch`.

I implement the heavy lifting for the alias in a bash function called `git_sync_and_branch`. Here's how I implement that in my `shell.nix`:

```nix
{
  programs.bash = {
    shellInit = ''
      function git_sync_and_branch {
        local readonly TARGET_BRANCH="''$1"
        local readonly MAIN_BRANCH='master'

        git checkout "''${MAIN_BRANCH}" && \
          git pull origin "''${MAIN_BRANCH}" && \
          if [[ -n "''${TARGET_BRANCH}" ]]; then
            git checkout -b "''${TARGET_BRANCH}"
          fi
      }
      '';
    shellAliases = {
      gc = "git commit --message";
      gcbm = "git_sync_and_branch";
      gs = "git status";
      td = "pushd $(mktemp -d)";
    };
  };
}
```

### Gotcha: Escaping dollar signs

One of the gotchas that caught me when trying to move my bash functions to Nix is that I need to escape the `${` sequences. Otherwise, Nix will try to interpolate them as local variables, but they're bash variables, not Nix variables.

Here's how I originally tried to write one of the lines in my `git_sync_and_branch` bash function:

```bash
git checkout "${MAIN_BRANCH}"
```

Nix failed with this error:

```text
 error: undefined variable 'MAIN_BRANCH'
```

I need to [escape the `${`](https://nixos.org/manual/nix/stable/language/values.html?highlight=escape#primitives) by prepending it with two single quotes (`''`) like this:

```bash
git checkout "''${MAIN_BRANCH}"
```

## Why not Home Manager?

I think the more popular way to modularize your Nix configuration is with [Home Manager](https://github.com/nix-community/home-manager).

But honestly, I still don't understand the purpose of Home Manager. According to the project README:

> This project provides a basic system for managing a user environment using the Nix package manager together with the Nix libraries found in Nixpkgs. It allows declarative configuration of user specific (non global) packages and dotfiles.

That confuses me because it sounds like what Nix already does.

I've peeked at Home Manager a few times, but every time, it feels like I have to invest a lot to learn this new tool for gains that aren't clear to me.

Maybe I'll eventually realize a benefit from managing my Nix configuration with Home Manager, but for now, I've found a fairly straightforward way to manage remote Nix files with standard Nix.
