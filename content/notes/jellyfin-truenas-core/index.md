---
title: "Jellyfin Truenas Core"
date: 2023-10-29T15:27:18-04:00
---

The first few loads, it said Jellyfin wasn't available. For some reason, waiting a few minutes fixed the issue and let me create a new account.

## Mounting media

Go to Jails > Mount Points

Mount the folder(s) of media to `[pool root]/iocage/jails/jellyfin/root/media`

Mount as read-only

## Granting permissions

Open Jails > Shell and type `id jellyfin`

From the TrueNAS pool, add an ACL item for the uid of the TrueNAS user, specifying the `jellyfin` server's `uid` instead of a username.

# Plugins are deprecated

https://www.truenas.com/community/threads/ffmpeg-error-in-fresh-nextcloud-jail.112033/#post-780590
