---
title: "Split a jj Change Into Two Forgejo PRs"
date: 2026-09-27
tags:
  - jj
  - git
  - forgejo
---

## Objective

Walk through a workflow of creating a Forgejo PR, realizing there's a smaller subchange within it, then pulling out the subchange into its own PR while minimizing manual jj/git conflict resolution and fiddling.

## Goals

- Avoid commands that rely on saving a specific change ID or commit ID.
- Make this a workflow that generalizes rather than overindexes on this specific task.
- Use idiomatic jujutsu for this workflow.

_Agents do not change anything above this line_

I opened a pull request that added two sections to my README, then realized
that the first section should be reviewed and merged on its own. The two
sections are adjacent lines in a single diff hunk, so `jj split` would have
required me to pick lines apart in an interactive diff editor. This workflow
splits the change with `jj restore` instead, and it never produces a conflict.

The idea is to derive the smaller change from the full one, then rebuild the
full change as a child of the smaller one. Once the smaller change is a parent
rather than a sibling, the remaining change only ever contains the leftover
part, so rebasing it onto master after the first PR merges is trivial.

I'm using jj 0.45. The examples assume your Forgejo remote is named `origin`
and its target branch is `master`.

## Create the original change and PR

Start a change on top of master and add both sections to `README.md`:

```bash
jj git fetch
jj new master@origin
$EDITOR README.md
```

```text
Hello World!

## One

This is the first thing.

## Two

This is the second thing.
```

Describe the change, bookmark it, and push it:

```bash
jj describe -m "Add one and two sections"
jj bookmark create add-one-and-two -r @
jj git push --bookmark add-one-and-two
```

Pushing a new bookmark creates the branch on Forgejo and starts tracking it,
so there's no separate `jj bookmark track` step. In Forgejo, open a PR from
`add-one-and-two` into `master`.

This is the point where you realize that `One` should merge separately.

## Derive the smaller change

Start a sibling change on the original change's parent, copy the full
`README.md` into it, and then delete the `## Two` section and its text:

```bash
jj new add-one-and-two- -m "Add one section"
jj restore --from add-one-and-two README.md
$EDITOR README.md
jj bookmark create add-one -r @
jj diff
```

`add-one-and-two-` (with the trailing hyphen) is jj's syntax for the parent
of `add-one-and-two`. The new change starts empty, and `jj restore --from`
copies the file's contents from the original change without touching the
original.

The diff should show only the `One` section:

```text
Modified regular file README.md:
   1    1: Hello World!
        2:
        3: ## One
        4:
        5: This is the first thing.
```

## Rebuild the full change on top of the smaller one

At this point, `add-one` and `add-one-and-two` are siblings. If you rebased
`add-one-and-two` onto `add-one`, jj would try to merge "add `One` and `Two`"
with "add `One`" and report a conflict. Instead, create a fresh child of
`add-one` and copy the full `README.md` into it:

```bash
jj new add-one -m "Add two section"
jj restore --from add-one-and-two README.md
jj diff
```

Because the new change's parent already contains `One`, its diff contains only
`Two`:

```text
Modified regular file README.md:
    ...
   3    3: ## One
   4    4:
   5    5: This is the first thing.
        6:
        7: ## Two
        8:
        9: This is the second thing.
```

The original sibling is now redundant. Abandon it, then move its bookmark to
the new child so the existing PR picks up the new commit:

```bash
jj abandon add-one-and-two
jj bookmark set add-one-and-two -r @
jj log
```

Abandoning the commit marks the `add-one-and-two` bookmark as deleted, and jj
prints a hint about pushing the deletion. Ignore the hint, because the next
command reuses the bookmark. Abandon first and move the bookmark second so
that you never need the abandoned commit's change ID.

The log shows the two changes stacked on master:

```text
@  vqnmznsn mike@example.com 2026-09-28 01:21:00 add-one-and-two* b5ab07c4
│  Add two section
○  zswppnxp mike@example.com 2026-09-28 01:21:00 add-one 91f9f61b
│  Add one section
◆  krvllwrx mike@example.com 2026-09-28 01:21:00 master bc43a819
│  init
~
```

## Push both changes

```bash
jj git push --bookmark add-one
jj git push --bookmark add-one-and-two
```

The second push prints `move sideways`, which is how jj reports a force-push
of a rewritten bookmark. Forgejo updates the existing PR to the new commit.

In Forgejo, open a PR from `add-one` into `master`. Retitle the original PR to
"Add two section" since it now contains only that change.

## Merge the first PR, then rebase the second

Merge the `add-one` PR in Forgejo. Then fetch the updated master and rebase
the remaining change onto it:

```bash
jj git fetch
jj rebase --revision add-one-and-two --destination master@origin
jj diff --revision add-one-and-two
jj git push --bookmark add-one-and-two
```

The rebase can't conflict: the change's parent already contained `One`, and
so does master, so jj has nothing to reconcile. This holds whether Forgejo
merged the first PR with a merge commit or a squash. The diff should still
contain only the `Two` section, and the second PR is ready to merge.

If Forgejo squash-merged the first PR, `jj log` shows a leftover
`Add one section` commit with no bookmark. It's harmless. If it bothers you,
abandon it using the change ID shown in `jj log`.
