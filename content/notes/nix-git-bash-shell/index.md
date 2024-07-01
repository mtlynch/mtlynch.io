---
title: "Configure a Git Shell Prompt Under Nix"
date: 2024-07-01T09:42:58-04:00
---

I recently read Julia Evans' latest zine about git, and one of her tips was to [configure your terminal shell prompt to show the git status](https://wizardzines.com/comics/knowing-where-you-are-in-git/).

It had never occurred to me to customize my shell prompt, but I saw the value. I constantly run `git status` to remember which branch I'm in, and I often forget that I'm in the middle of a git merge.

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
