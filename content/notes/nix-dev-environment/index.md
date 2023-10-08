---
title: "Using Nix for a Per-Project Development Environment"
date: 2023-10-07T00:00:00-04:00
tags:
  - nix
---

One of the useful things you can do as a Nix beginner is create isolated, per-project development environments.

## Why do I need per-project development environments?

Imagine that you have two software projects on the same machine: Project A and Project B. You built both projects with [Go 1.9](https://go.dev/doc/devel/release#go1.9).

You just read about a cool new feature in [Go 1.21](https://go.dev/doc/devel/release#go1.21.0) that would be useful to Project A. So you upgrade your system to Go 1.21, update Project A to use the new features, and everything's great!

But then you switch to Project B, and you're suddenly seeing tons of deprecation warnings or errors about things that have changed since Go 1.9. That wasn't what you wanted. Taking advantage of a newer Go feature in one project shouldn't require you to upgrade _all_ of your Go projects to that version.

Nix offers an attractive solution. Instead of installing Go system-wide, you can create a `flake.nix` file at the root of your project that specifies the version of Go you want for that particular project. Regardless of what version of Go you have installed globally, when you're in your Nix development shell,

## Like Python virtualenv or Node.js `package.json`, but for everything

Many modern programming languages have tools for creating an isolated development environment on a per-project basis. Python has virtualenv and Node.js has `package.json`. But those tools are limited in that they only control.

The limitation of Python's virtualenv or Node.js's has `package.json` is that most of the packages available are specific to that ecosystem. If you wanted to specify that your Python project depends on a specific version of `gcc`, you couldn't do that with virtualenv because there's no pip package for fine-grained gcc versions.

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

### Go: VS Code extension breaks

TODO:
