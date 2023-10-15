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

If you wanted to specify that your Python project depends on a specific version of `gcc`, you couldn't do that with virtualenv because there's no pip package for fine-grained gcc versions.

## Creating a simple Nix development environment

I'm going to use Debian 11 for this tutorial, but anything should work.

### Install Nix

First, install Nix.

### Create a simple Go application

## Using `direnv` to automatically load the Nix development shell

Okay, so you have your Nix shell working, but it means that every time you open a new terminal window, you have to type `nix develop` to enter your special Nix shell.

`direnv` automatically loads your Nix shell whenever you `cd` into your project's directory. When you `cd` out of it, `direnv` automatically unloads the shell.

## Gotchas

### Old package versions don't work

I don't know why. Python 3.9.1 breaks both Python and shellcheck...

### flake is not added to git

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
