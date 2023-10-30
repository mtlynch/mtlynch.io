---
title: "Installing Jellyfin on TrueNAS Core"
date: 2023-10-29T15:27:18-04:00
---

I always run into issues installing Jellyfin on TrueNAS core. I fix them, and then I forget a few months later, so these are just my notes to myself of how to install Jellyfin on TrueNAS core.

## Instructions

Install based on these instructions:

https://github.com/Thefrank/jellyfin-server-freebsd/blob/main/Installation_TrueNAS_GUI.md#the-advanced-way

We need to follow the advanced instructions because [TrueNAS plugins are deprecated](https://www.truenas.com/community/threads/ffmpeg-error-in-fresh-nextcloud-jail.112033/#post-780590).

## Gotcha: Jellyfin server is not available

The first few loads after installing, an error will appear saying Jellyfin isn't available. For some reason, waiting a few minutes fixed the issue and let me create a new account.

## Mounting media

Go to Jails > Mount Points.

Mount the folder(s) of media to `[pool root]/iocage/jails/jellyfin/root/media`.

Mount as read-only.

## Granting permissions

Open Jails > Jellyfin > Shell and type `id jellyfin`.

From the TrueNAS pool, add an ACL item for the uid of the Jellyfin user, specifying the `jellyfin` server's `uid` instead of a username.

## Adding libraries

The add library screen is strange and doesn't give good feedback. Type `/media` and then hit the search button. If the permissions are set correctly, you should see subfolders of the mounted drive.
