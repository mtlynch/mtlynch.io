---
title: "Using Nix for a Per-Project Development Environment"
date: 2023-10-07T00:00:00-04:00
tags:
  - nix
---

I've been learning Nix recently. Nix is a broad product with a steep learning curve as it's, capable of everything from installing a single package to managing every file and application on your OS.

I've discovered that one thing Nix does well with a gentle learning curve is managing development environments. Nix lets me have multiple projects on the same system that each have their own, independent view of what dependencies are available. I can have one legacy project running Python 2.7 and Node.js 4.x alongside a modern project running Python 3.11 and Node.js 20, and they won't interfere with each other.

## Like Python virtualenv or Node.js `package.json`, but for everything

Many modern programming languages have tools for creating an isolated development environment on a per-project basis. Python has virtualenv and Node.js has `package.json`. But those tools are limited in that they only control dependencies within that ecosystem.

If you wanted to specify that your Python project depends on a specific version of `gcc`, you couldn't do that with virtualenv or `package.json` because there's no package in those managers for fine-grained gcc versions.

With Nix, you can create a project-specific development environment that lets you control lower-level depenedencies like which version of `gcc` is available and which version of Python to use.

## Why not Docker?

I like Docker, but I don't find it friendly for development environments. I do my development in VS Code over SSH, and Docker makes that a pain. I know there are workarounds, but I've never found them appealing.

## Why not Ansible?

Ansible is how I've solved this problem for the past six years. Every project has its own VM and Ansible definition. It works okay, but changing dependencies is slow, so things go out of state.

## Creating a simple Nix development environment

I'm going to use Debian 11 for this tutorial, but anything should work.

### Install Nix

First, install Nix. I'm using the third-party [Determinate Systems installer](https://zero-to-nix.com/start/install) rather than the official Nix installer, as the Determinate Systems one makes some opinionated configuration decisions that are useful for what I'm showing here.

```bash
curl \
  --proto '=https' \
  --tlsv1.2 -sSf -L https://install.determinate.systems/nix \
  | sh -s -- install && \
  . /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh
```

### Create a simple Python 2.7 application

To show Nix development environments in action, I'm going to create a simple application that runs under Python 2.7, the legacy version of Python that was officially deprecated in 2020.

To begin, create a new directory for the project.

```bash
mkdir example && cd example
```

Next, download the Nix flake, the file that defines the Nix development environment:

{{<inline-file filename="flake.nix" language="nix">}}

```bash
curl \
  --show-error \
  --fail \
  {{<baseurl>}}/notes/nixos-dev-environment/flake.nix \
  > flake.nix
```

If you're not familiar with Nix, the `flake.nix` file looks like a lot of confusing syntax, but a lot of it is simple boilerplate. I'll explain it in more detail below. (TODO: link)

Finally, it's time to spin up my Nix development environment. Note that the first time you run the command, it will take a few minutes to initialize everything, but subsequent initializations will only be a few seconds.

```bash
# We need NIXPKGS_ALLOW_INSECURE and --impure because Python 2.7 is past end of
# life.
$ NIXPKGS_ALLOW_INSECURE=1 nix develop --impure
Python 2.7.18.7
```

It worked! I have a Python 2.7 environment available. To prove it, I'll try running a simple Python script using the evil, deprecated `print` syntax that doesn't work in Python 3:

```bash
$ echo 'print "hello, world!"' > main.py && \
  python main.py
hello, world!
```

Cool, I can run legacy Python 2.7 code in this environment.

Note also that I haven't installed Python 2.7 anywhere outside of this specific Nix environment. If I open a new terminal without running `nix develop`, I see the following error message that Python is not installed:

```bash
python  --version
-bash: python: command not found
```

## Finding version strings

One of the first lines in the `flake.nix` file declares the exact version of the Python package I want:

```nix
# 2.7.18.7 release
python_dep.url = "github:NixOS/nixpkgs/517501bcf14ae6ec47efd6a17dda0ca8e6d866f9";
```

The line `# 2.7.18.7 release` is just a comment for my own reference. Nix ignores it. The part that's doing the heavy lifting is the `python_dep` line.

`NixOS/nixpkgs` is a [Github repo](https://github.com/NixOS/nixpkgs), and [`517501bcf14ae6ec47efd6a17dda0ca8e6d866f9`](https://github.com/NixOS/nixpkgs/tree/517501bcf14ae6ec47efd6a17dda0ca8e6d866f9) is the version of the repo where the `python2` package corresponded with Python 2.7.18.7.

How did I know that long version string? I used Nixhub.

Nixhub is a free package search service created by [Jetpack](https://www.jetpack.io), a company that sells developer tooling on top of Nix.

Nixhub was only released [three months ago](https://www.jetpack.io/blog/introducing-nixhub/), and it's made my life in Nix so much easier. If I want to find the version hash for a particular version of a package, I search it in Nixhub and find the commit ID.

So, to find the version string for Python 2.7.18.7, I [searched Nixhub for `python`](https://www.nixhub.io/packages/python) then scrolled down the list of results for the latest available Python 2.7.x version:

TODO: Screenshot

Pinning exact package versions is, honestly, a huge pain. I hope that Nix tooling evolves to the point where you can just specify that you want version `2.7.18.7` rather than go through this roundabout dance of looking up the git commit hash that corresponds to the version you want. But for now, this is the best way I know how to pin versions.

## Understanding the `flake.nix` file

Okay, I told you I'd go into more detail about the `flake.nix` file I showed above. I'm not going to explain everything about Nix flakes because I don't have a deep understanding myself. I'm just going to explain the minimum you need to understand to make your own dev environments. For a deeper dive into Nix flakes, see ["Practical Nix Flakes."](https://serokell.io/blog/practical-nix-flakes)

The `inputs` section is where you put the versions of different Nix sources you want in your environment. I'm using a special syntax for github repos, but you can import from other source repositories or URLs.

`devshells.default` defines the development environment you're creating for your shell. `packages` includes a list of all the packages I want available in my environment. For most packages, the package name doesn't have a version, but certain packages, like Python, have multiple versions available within the same Nixpkgs version, so you have to specify `python2` as opposed to `python`, to avoid confusion with Python 3.

The last relevant bit is the `shellHook` section.

```nix
shellHook = ''
  python --version
'';
```

Nix runs the commands in `shellHook` just before dumping you into the shell. You can put any shell commands there. I like to put commands that print the versions of my dependencies so that I can see easily whether my Nix flake is working correctly.

## Upgrading to Python 3

Okay, let's say that I'm ready to do the hard work of porting my one-line Python app from Python 2.7 to modern Python 3. I just need to update these two snippets:

```nix
    # 3.12.0 release
    python_dep.url = "github:NixOS/nixpkgs/e2b8feae8470705c3f331901ae057da3095cea10";
```

```nix
        packages = [
          python_dep.python312
        ];
```

The new flake should look like this:

```nix
{
  description = "Demo Nix dev environment";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 3.12.0 release
    python_dep.url = "github:NixOS/nixpkgs/e2b8feae8470705c3f331901ae057da3095cea10";
  };

  outputs = { self, flake-utils, python_dep }@inputs :
    flake-utils.lib.eachDefaultSystem (system:
    let
      python_dep = inputs.python_dep.legacyPackages.${system};
    in
    {
      devShells.default = python_dep.mkShell {
        packages = [
          python_dep.python312
        ];

        shellHook = ''
          python --version
        '';
      };
    });
}
```

Exit out of your original Nix shell by typing Ctrl+D or typing `exit`.

Enter the Python 3 shell by running the following:

Conveniently, now that I'm no longer running an obsolete package, I can skip the extra options that allowed that in the past.

```bash
$ nix develop
warning: updating lock file '/home/mike/example/flake.lock':
• Updated input 'python_dep':
    'github:NixOS/nixpkgs/517501bcf14ae6ec47efd6a17dda0ca8e6d866f9' (2023-09-27)
  → 'github:NixOS/nixpkgs/e2b8feae8470705c3f331901ae057da3095cea10' (2023-10-03)
• Removed input 'shellcheck_dep'
Python 3.12.0
```

And if I try to run my Python 2 style `main.py`, Python 3 appropriately screams in horror:

```bash
$ python main.py
  File "/home/mike/example/main.py", line 1
    print "hello, world!"
    ^^^^^^^^^^^^^^^^^^^^^
SyntaxError: Missing parentheses in call to 'print'. Did you mean print(...)?
```

I'll update the syntax for Python 3 and try again:

```bash
$ echo 'print("hello, world!")' > main.py && \
  python main.py
hello, world!
```

Okay, everything is good again.

## Adding a new dependency

Okay, I showed how to update a package, but what about adding a new dependency?

I'm going to add a new bash script that automatically runs my Python file. And I'm intentionally going to make a bash error because I want `shellcheck` to catch it for me.

```bash
(cat <<EOF
#!/usr/bin/env bash

set -eux

readonly MAIN_SCRIPT="main.py"
python \$MAIN_SCRIPT
EOF
) > run.sh && \
  chmod +x run.sh && \
  ./run.sh
```

You should see the following output:

```bash
+ readonly MAIN_SCRIPT=main.py
+ MAIN_SCRIPT=main.py
+ python main.py
hello, world!
```

But that `run.sh` script could be improved. I want to pull shellcheck into my dev environment and get its advice about it.

```nix
{
  description = "Demo Nix dev environment";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 3.12.0 release
    python_dep.url = "github:NixOS/nixpkgs/e2b8feae8470705c3f331901ae057da3095cea10";

    # 0.9.0 release
    shellcheck_dep.url = "github:NixOS/nixpkgs/8b5ab8341e33322e5b66fb46ce23d724050f6606";
  };

  outputs = { self, flake-utils, python_dep, shellcheck_dep }@inputs :
    flake-utils.lib.eachDefaultSystem (system:
    let
      python_dep = inputs.python_dep.legacyPackages.${system};
      shellcheck_dep = inputs.shellcheck_dep.legacyPackages.${system};
    in
    {
      devShells.default = python_dep.mkShell {
        packages = [
          python_dep.python312
          shellcheck_dep.shellcheck
        ];

        shellHook = ''
          python --version
          echo "shellcheck" "$(shellcheck --version | grep '^version:')"
        '';
      };
    });
}
```

Exit out of your original Nix shell by typing Ctrl+D or typing `exit`.

Now, instantiate your new shell by running

```bash
$ nix develop
warning: updating lock file '/home/mike/example/flake.lock':
• Added input 'shellcheck_dep':
    'github:NixOS/nixpkgs/8b5ab8341e33322e5b66fb46ce23d724050f6606' (2023-09-19)
Python 3.12.0
shellcheck version: 0.9.0
```

```bash
$ shellcheck -o all run.sh
In run.sh line 6:
python $MAIN_SCRIPT
       ^----------^ SC2248 (style): Prefer double quoting even when variables don't contain special characters.
       ^----------^ SC2250 (style): Prefer putting braces around variable references even when not strictly required.

Did you mean:
python "${MAIN_SCRIPT}"

For more information:
  https://www.shellcheck.net/wiki/SC2248 -- Prefer double quoting even when v...
  https://www.shellcheck.net/wiki/SC2250 -- Prefer putting braces around vari...
```

## Why not just a single version of nixpkgs?

TODO: 1000 nixpkgs

Pinning is good

## Using `direnv` to automatically load the Nix development shell

Okay, so you have your Nix shell working, but it means that every time you open a new terminal window, you have to type `nix develop` to enter your special Nix shell.

`direnv` automatically loads your Nix shell whenever you `cd` into your project's directory. When you `cd` out of it, `direnv` automatically unloads the shell.

## Drawbacks of Nix development environments

## Every new dependency makes initialization slower

TODO

## I don't have a good solution for Nix in CI

Since I'm doing all this work to create an independent, reproducible development environment for my project, I naturally want to reuse this environment when I run my code in continuous integration (CI). Unfortunately, I haven't found a practical way of integrating Nix into my CI workflows.

The problem with Nix in CI is that Nix has to do a lot of work up front to create its own environment. On my local development systems, Nix takes 60-180 seconds to initialize its environment for the first time, usually downloading multiple gigs of data from package servers.

The slow initialization is annoying but tolerable on my local system because the initialization only has to happen once. On CI, it's a bigger problem because it means that simple CI steps that used to run in 10 seconds now ballon to 2 minutes of initializing Nix plus 10 seconds of doing the thing I care about.

I tried using Cachix, which maybe reduced the overhead to around 60 seconds, but it means every dependency I pin is going to bloat

## Some of my Nix dev flakes

- TODO: Show PicoShare
- TODO: Show ledger

## Gotchas

### Old package versions don't work

I don't know why. Python 3.9.1 breaks both Python and shellcheck...

`nixpkgs/b4e193a23a1c5d8794794e65cabf1f1135d07fd9#python39` ?

### Nix needs `flake.nix` to be in git

```text
error: getting status of '/nix/store/66snibk6a9y3dbam1ww7fj0bdrh0ylw6-source/flake.nix': No such file or directory
```

### Golang: version X does not match go tool version Y

```text
compile: version "go1.18.4" does not match go tool version "go1.19.6"
```

I hit this and it turned out that my `GOROOT` environment variable was pointing to a different version of Go installed on my system.

I had to do:

```bash
unset GOROOT
```

And then figure out what was setting that variable in my shell.

### Go: Failure to link to libc

https://github.com/golang/go/issues/44695

Adding `tags=netgo,osusergo` fixes it

```text
runtime.gcdata: missing Go type information for global symbol .dynsym: size 72
runtime/cgo(.text): relocation target stderr not defined
runtime/cgo(.text): relocation target fwrite not defined
runtime/cgo(.text): relocation target vfprintf not defined
```

## References

https://gist.github.com/toraritte/62e53be9e6d88d8b6b97391eb3c6558b#22-pin-nixpkgs-in-a-nix-expression finally made pieces fit together, though this author uses a different technique for referencing package versions.

```

```
