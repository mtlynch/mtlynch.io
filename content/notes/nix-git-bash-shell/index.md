---
title: "Configure a Git Shell Prompt Under Nix"
date: 2024-07-01T09:42:58-04:00
---

## Git natively supports customizing your terminal shell

I recently read Julia Evans' latest zine about git, and one of her tips was to [configure your terminal shell prompt to show the git status](https://wizardzines.com/comics/knowing-where-you-are-in-git/).

Julia's terminal prompt looks like this:

<style>
.terminal-example {
  background: black;
  color: white;
  font-family: Consolas;
  padding: 1em;
}
</style>

<div class="terminal-example">
~/work/homepage (<span style="color: lightgreen">main</span>) $
</div>

`main` is the current git branch that Julia is on, and when she's in the middle of a git operation like bisect or merge, the terminal changes to this:

<div class="terminal-example">
~/work/homepage (<span style="color: lightgreen">main|MERGING</span>) $
</div>

It had never occurred to me to customize my shell prompt, but I saw the value. I constantly run `git status` to remember which branch I'm in, and I often forget that I'm in the middle of a git merge.

## Setting up git prompts in my terminal

I wanted to customize my terminal shell to include git status, but it wasn't obvious how. Apparently, I needed a file called `git-prompt.sh`, but it wasn't available in my Debian install with git 2.30.2:

```bash
$ find / -name 'git-prompt.sh' -type f -print
# No results
```

The other option was to download an official copy from Github:

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

If everything works, the `__git_ps1` command should display the current git branch:

```bash
$ __git_ps1
(master)
```

Great! It works.

But this isn't so useful if I have to call `__git_ps1` manually every time. I want the branch to appear in my terminal prompt _automatically_ like Julia Evans showed.

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

Cool, that looks like it's working. As I use it, I realize that I miss having the working directory show up in my shell prompt so I change it to this:

```bash
$ export PS1='\w $(__git_ps1 "(%s)") \$ '
~/examplerepo (branchB|MERGING) $
```

I also miss having nice colors, so I add them in like this:

```bash
export PS1='\[\033[01;34m\]\w\[\033[00m\]\[\033[01;32m\]$(__git_ps1 " (%s)")\[\033[00m\]\$ '
```

At this point, editing the `PS1` command is complicated enough that I recommend using a free tool like [Bash Prompt Generator](https://bash-prompt-generator.org/) to create the command and add in the colors for you.

But here's what my prompt looks like with colors and working directory:

<div class="terminal-example">
<span style="color: cyan">~/examplerepo</span> <span style="color: lightgreen">(branchB|MERGING)</span>$
</div>

To make that change permanent, I add the `export PS1` line to my `~/.bashrc` file.

## Integrating git into the bash shell prompt on Nix

```bash
  programs.bash = {
    enable = true;
    enableCompletion = true;
    initExtra = ''
      # https://jeffkreeftmeijer.com/nix-home-manager-git-prompt/
      . ~/.nix-profile/share/git/contrib/completion/git-prompt.sh

      # Show git branch status in terminal shell.
      export PS1='\[\033[01;34m\]\w\[\033[00m\]\[\033[01;32m\]$(__git_ps1 " (%s)")\[\033[00m\]\$ '

      # Not sure why this doesn't happen automatically.
      . ~/.nix-profile/share/git/contrib/completion/git-completion.bash
    '';
  };
```
