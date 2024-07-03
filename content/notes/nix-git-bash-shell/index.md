---
title: "Configure a Git Shell Prompt Under Nix"
date: 2024-07-01T09:42:58-04:00
tags:
  - nix
  - git
  - bash
---

I recently read Julia Evans' [latest zine about git](https://wizardzines.com/zines/git/), and one of her tips was to [configure your terminal shell prompt to show the git status](https://wizardzines.com/comics/knowing-where-you-are-in-git/).

Julia's terminal prompt looks like this:

<style>
.terminal-example {
  background: black;
  color: lightgray;
  font-family: Consolas;
  padding: 2rem;
}
</style>

<div class="terminal-example">
~/work/homepage (<span style="color: lightgreen">main</span>) $
</div>

`main` is Julia's current git branch. When she's in the middle of a git operation like bisect or merge, the terminal changes to this:

<div class="terminal-example">
~/work/homepage (<span style="color: lightgreen">main|MERGING</span>) $
</div>

It had never occurred to me to customize my shell prompt, but I immediately recognized the value.

I constantly run `git status` to remember which branch I'm in, and I often forget that I'm in the middle of a git merge.

## Setting up git prompts in my terminal

Julia's zine convinced me to customize my terminal shell to include my git status, but it wasn't obvious how to do it. Apparently, I needed a file called `git-prompt.sh`, but it wasn't available in my Debian install with git 2.30.2:

```bash
$ find / -name 'git-prompt.sh' -type f -print
# No results
```

The other option was to download an official copy of `git-prompt.sh` from Github:

```bash
# Download git-prompt.sh
curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh > ~/.git-prompt.sh

# Add it to my .bashrc
echo '. ~/.git-prompt.sh' >> ~/.bashrc

# Reload .bashrc
. ~/.bashrc
```

To test whether it was working, I created a scratch git repo:

```bash
mkdir examplerepo && \
  cd examplerepo && \
  git init
```

If `git-prompt.sh` was working correctly, the `__git_ps1` command should display the current git branch:

```bash
$ __git_ps1
(master)
```

Great! It works.

But I don't want to call `__git_ps1` manually all the time time &mdash; I want the branch to appear in my terminal prompt _automatically_ like Julia Evans showed.

The simplest way to show my git status in my terminal shell is to overwrite the `PS1` variable in my bash session:

```bash
$ export PS1='$(__git_ps1 "(%s)") \$ '
(master) $
```

Now, when I perform git commands, the terminal changes to reflect the status:

```bash
(master) $ echo 'hi' > hello.txt && git add -A && git commit -m "Test commit"
[master (root-commit) 7b14d2a] Test commit
 1 file changed, 1 insertion(+)
 create mode 100644 hello.txt
(master) $ git checkout -b branchA && echo 'hey' > hello.txt && git add -A && git commit -m "test A"
Switched to a new branch 'branchA'
[branchA 65b3d63] test A
 1 file changed, 1 insertion(+), 1 deletion(-)
(branchA) $ git checkout master
Switched to branch 'master'
(master) $ git checkout -b branchB && echo 'hello' > hello.txt && git add -A && git commit -m "test B"
Switched to a new branch 'branchB'
[branchB 198c875] test B
 1 file changed, 1 insertion(+), 1 deletion(-)
(branchB) $ git merge branchA
Auto-merging hello.txt
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
(branchB|MERGING) $
```

Cool, that looks like it's working.

But I missed seeing my working directory in my shell prompt, so I changed `PS1` to this:

```bash
$ export PS1='\w $(__git_ps1 "(%s)") \$ '
~/examplerepo (branchB|MERGING) $
```

I also missed having nice colors, so I added them as well:

```bash
export PS1='\[\033[01;34m\]\w\[\033[00m\]\[\033[01;32m\]$(__git_ps1 " (%s)")\[\033[00m\]\$ '
```

At this point, editing the `PS1` command is complicated enough that I recommend using a free tool like [Bash Prompt Generator](https://bash-prompt-generator.org/) to create the command and add in the colors for you.

Here's what my final terminal prompt looks like:

<div class="terminal-example">
<span style="color: cyan">~/examplerepo</span> <span style="color: lightgreen">(branchB|MERGING)</span>$
</div>

To make that change permanent, I added my `export PS1` line to my `~/.bashrc` file, and now I have my custom terminal every time I start a new bash shell.

## Integrating git into the bash shell prompt on Nix

The problem with all the steps above is that I use [Nix](https://nixos.org/) and [Home Manager](https://github.com/nix-community/home-manager) which is nice but also makes everything about my bash configuration more complicated. I couldn't simply add a line to my `.bashrc` because Home Manager would blow away my changes next time I ran it.

Fortunately, this [post by Jeff Kreeftmeijer](https://jeffkreeftmeijer.com/nix-home-manager-git-prompt/) helped me understand how to adapt the `git-prompt.sh` solution to Nix.

I modified my `home.nix` file for Home Manager with the following:

```bash
  programs.bash = {
    enable = true;
    enableCompletion = true;
    initExtra = ''
      # Load __git_ps1 bash command.
      . ~/.nix-profile/share/git/contrib/completion/git-prompt.sh
      # Also load git command completions for bash.
      . ~/.nix-profile/share/git/contrib/completion/git-completion.bash

      # Show git branch status in terminal shell.
      export PS1='\[\033[01;34m\]\w\[\033[00m\]\[\033[01;32m\]$(__git_ps1 " (%s)")\[\033[00m\]\$ '
    '';
  };
```

Once I updated the file, I ran `home-manager switch`, it updated my `.bashrc`, and everything worked as expected.

## Eliminating Nix terminal cruft in my development environments

Still, there was one last wrinkle in my custom bash terminal prompt.

I do all of my development in [per-project Nix shells](/notes/nix-dev-environment/). When I ran `nix develop` to load my development environment, I saw that Nix had added an extra prefix to my terminal:

```bash
~/examplerepo (branchB|MERGING) $ nix develop
...
(nix:nix-shell-env) ~/examplerepo (branchB|MERGING) $
^^^^^^^^^^^^^^^^^^^ why?
```

That prefix ate up a lot of real estate. Almost half of the terminal prompt was now just telling me that I'm in a Nix environment.

In certain projects, Nix's shell prompt prefix was even longer. This is what I saw in [PicoShare](https://github.com/mtlynch/picoshare):

```bash
~/examplerepo (branchB|MERGING) $ nix develop
...
(nix:nix-shell-x86_64-unknown-linux-musl-env) ~/picoshare (master)$
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ too much!
```

I'm now losing a ton of screen space to that shell prefix. How do I get rid of that?

It turns out that `nix develop` has a `--bash-prompt-prefix` flag that allows me to customize the terminal shell prefix like this:

```bash
$ nix develop --bash-prompt-prefix 'nix:'
nix:~/picoshare (master)$
```

If I don't want it at all, I can set it to the empty string:

```bash
$ nix develop --bash-prompt-prefix ''
~/picoshare (master)$
```

But obviously, I'd rather not add this extra command-line flag every time I run `nix develop`.

I realized that this cruft is actually coming from my `nix.conf` file, which on my Debian system is at `/etc/nix/nix.conf`. I guess the [Determinate Systems Nix installer](https://github.com/DeterminateSystems/nix-installer) chose that prefix for me:

```bash
$ grep 'bash-prompt-prefix' /etc/nix/nix.conf
bash-prompt-prefix = (nix:$name)\040
```

I changed the line to the more concise `nix:` prefix:

```text
bash-prompt-prefix = nix:
```

Then, I restarted Nix to apply the change:

```bash
sudo systemctl restart nix-daemon
```

Now, when I'm in a Nix development environment, I see a short, helpful prefix like this:

<div class="terminal-example">
nix:<span style="color: cyan">~/picoshare</span> <span style="color: lightgreen">(sqlite-performance)</span>$
</div>

## Summary

When I do software development work, it's helpful to customize my terminal shell so that I can see the git status of my directory on every shell prompt.

I hope this post helps others who want a similar configuration to mine on regular bash systems as well as on systems where Nix and Home Manager manage bash settings.
