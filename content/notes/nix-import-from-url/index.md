---
title: "Import from a URL in Nix"
date: 2023-09-17T00:00:00-04:00
tags:
  - nix
---

I'm still a Nix beginner, and one thing I couldn't figure out until recently was how to keep parts of my `configuration.nix` file under source control.

## My goal

I'd like for my Nix configuration files to be modular and reusable, so depending on the system or flake, I can pull in only the configuration files I need. I'd like all my Nix configuration files to be under source control so that different systems can depend on different versions of any file so I don't have to upgrade every system to the latest version of each configuration file at the same time.

## Creating reusable bash aliases with local files

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
  imports = [
    "/tmp/shell.nix"
  ];
```

If I run `sudo nixos-rebuild switch` and then restart my shell, I can see that my bash aliases are now active:

```bash
$ td
/tmp/tmp.awb7PW7aus ~

[/tmp/tmp.awb7PW7aus]$ pwd
/tmp/tmp.awb7PW7aus
```

## Moving the Nix file to a URL

The solution above works, but it requires me to populate the file on each of my systems.

I'd rather host the file at some URL, and then I can have a standard `configuration.nix` file that references the URL.

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

## Using `fetchGit`

To achieve that, I took the `shell.nix` file I created earlier and commit it to a public Github repo. And then I adjust my `configuration.nix` file as follows:

```nix
let
  repo = builtins.fetchGit {
    url = "https://github.com/mtlynch/nix-files";
    rev = "b92d2758b000ed0309027846daa002871abf4e1c";
  };
in {
  imports = [
    "${repo}/shell.nix"
  ];
}
```

The `url` is the public URL of my Github repo, and `rev` is the Git commit hash of the version of the file I want to import.

After I make those changes to `configuration.nix`, I can re-run `sudo nixos-rebuild switch`, and Nix imports my `shell.nix` file from my Github repo.

## Why not Home Manager?

I think the more popular way to modularize your Nix configuration is with [Home Manager](https://github.com/nix-community/home-manager).

But honestly, I still don't understand the purpose of Home Manager. According to the project README:

> This project provides a basic system for managing a user environment using the Nix package manager together with the Nix libraries found in Nixpkgs. It allows declarative configuration of user specific (non global) packages and dotfiles.

That confuses me because it sounds like what Nix already does.

I've peeked at Home Manager a few times, but every time, it feels like I have to invest a lot to learn this new tool for gains that aren't clear to me.
