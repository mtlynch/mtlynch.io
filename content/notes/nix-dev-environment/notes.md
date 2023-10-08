## Install nix

```bash
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install
```

## Install direnv

https://determinate.systems/posts/nix-direnv

Started here.

A bit of yak shaving, had to install direnv, had to hook direnv into my shell.

Installing direnv apt package was too old, got flake not found.

```text
use_flake: command not found
```

```bash
$ direnv --version
2.25.2
```

Guide not clear on how to create nix environment from scratch.

### Old

Official instructions don't work. Might be a VS code thing, but direnv isn't in my PATH.

```bash
$ curl -sfL https://direnv.net/install.sh | bash

echo 'eval "$(direnv hook bash)"' >> ~/.bashrc
. ~/.bashrc
```

### Better

```bash
export DIRENV_PATH=/opt/direnv
sudo mkdir -p "${DIRENV_PATH}"
sudo chown "${USER}:${USER}" "${DIRENV_PATH}"
pushd "${DIRENV_PATH}"

wget https://github.com/direnv/direnv/releases/download/v2.32.3/direnv.linux-amd64
mv direnv.linux-amd64 ./direnv
chmod +x ./direnv
echo 'export PATH="${PATH}:'"${DIRENV_PATH}\"" >> ~/.bashrc
echo 'eval "$(direnv hook bash)"' >> ~/.bashrc
popd
. ~/.bashrc
```

```bash
echo 'use flake .' > .envrc
ech '.direnv' >> .gitignore
```

## Flox?

tried floxdev.com

Install was fine, but then the tutorials were for starting a project from scratch.

No guidance on adding flox to an existing project. No template for Go or Node.js.

## devbox

https://github.com/jetpack-io/devbox

Haven't tried it

Claims it solves the specific versioning problem

Tried it, but it totally abstracts away Nix, so can't use anything anymore.

Couldn't figure out how to use nixhub because it gives different information from

https://www.nixhub.io/packages/sqlfluff

### nix develop

Gotcha: Experimental features

error: experimental Nix feature 'nix-command' is disabled; use '--extra-experimental-features nix-command' to override

### direnv

First it didn't recognize use_flake, turned out direnv was too old (0.25).

Tried to create `.envrc` and `flake.nix`

Kept getting file not found.

Turned out I had to delete my flake.nix and run `nix flake init`.

Works until static linking, got to

https://nixos.wiki/wiki/Go

Hard because a lot of guides expect you to make Nix your build system rather than an optional tool for creating a dev environment. Don't want to jump full on into Nix.

Fixed in https://github.com/mtlynch/whatgotdone/pull/884

## How to pin specific versions?

https://github.com/NixOS/nixpkgs/issues/9682#issuecomment-658424656

Unclear how to express that in a Flake

not helpful: https://discourse.nixos.org/t/best-practice-for-pinning-version-of-individual-packages/6194/7

Use devbox: https://github.com/NixOS/nixpkgs/issues/93327#issuecomment-1648276095

https://news.ycombinator.com/item?id=28593823

Finally made it click: https://gist.github.com/toraritte/62e53be9e6d88d8b6b97391eb3c6558b#22-pin-nixpkgs-in-a-nix-expression

https://github.com/mtlynch/whatgotdone/pull/885/commits/be53555c6b2308b27d564927f7b09998125b508d

Doesn't work, seems to ignore version+sha256 for sqlfluff, installs the wrong version.

Gotcha: forgot to update the sha256

Better version: https://www.nixhub.io/

Can't figure out Go:

```
Version 1.21.0

Nixpkgs Reference
a63a64b593dcf2fe05f7c5d666eb395950f36bc9 # go_1_21

Last updated 6 days ago

Install with Devbox
devbox add go@1.21.0

Version 1.20.7

Nixpkgs Reference
a63a64b593dcf2fe05f7c5d666eb395950f36bc9 # go

Last updated 6 days ago

Install with Devbox
devbox add go@1.20.7

Version 1.20.6

Nixpkgs Reference
4107024ef4d9f637b568296f40a2ba0f62b13437 # go

Last updated 17 days ago

Install with Devbox
devbox add go@1.20.6
```

If I specify the hash, it installs the wrong version.

When updating the target, need to clear the hash.

### CircleCI

https://github.com/mtlynch/whatgotdone/commit/6ec8fa0da9bad8e1e35ec7ccd0b5cc6c0853a625

https://app.circleci.com/pipelines/github/mtlynch/whatgotdone/2232/workflows/d9d01847-9a44-43f9-9f21-c139573bf481

All jobs hung - fix was to use `--command` syntax for `nix develop`

Jobs got slower, need to share the Nix environment across jobs.

run-go-tests fails, similar to this

https://github.com/golang/go/issues/44695#issuecomment-973685193

Interestingly, only in one package

import "C" in one handlers/parse .go file fixes it, but then it fails again on staticcheck

```text
+ go install honnef.co/go/tools/cmd/staticcheck@v0.3.3
# honnef.co/go/tools/cmd/staticcheck
runtime.gcdata: missing Go type information for global symbol .dynsym: size 72
```

Fix is to add external

---

Caching `/nix/store` ends up being like 1 GB

Docs say not to cache more than 500 MB

But before I do anything, `/nix/store` is already:

```bash
$ du -s -h /nix/store
766M    /nix/store
```

After `nix develop`:

```bash
$ du -h -s /nix/store
3.7G    /nix/store
```

```bash
nix-env --delete-generations old && nix-store --gc
```

After GC:

```bash
$ du -h -s /nix/store
2.8G    /nix/store
```

### Python

Can't figure out how to do virtualenv correctly. Best I can approximate is adding the source line.

Gotcha: When I tried source venv/bin/activae, I kept getting confused because it would report a different Python version, but it was getting the venv Python.

Gotcha: six can't import

```text
ImportError while importing test module '/home/mike/personal-ledger/importers/schwab/schwab_test.py'.
Hint: make sure your test modules/packages have valid Python names.
Traceback:
/nix/store/7bp44csmx928w534nn76icz2pcvlfcgx-python3-3.11.3/lib/python3.11/importlib/__init__.py:126: in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
importers/schwab/__init__.py:4: in <module>
    import dateutil.parser
venv/lib/python3.11/site-packages/dateutil/parser/__init__.py:2: in <module>
    from ._parser import parse, parser, parserinfo, ParserError
venv/lib/python3.11/site-packages/dateutil/parser/_parser.py:42: in <module>
    import six
E   ModuleNotFoundError: No module named 'six'
```

Fixed with:

```bash
pip install --ignore-installed six
```
