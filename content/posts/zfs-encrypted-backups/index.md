---
title: "Back Up Encrypted ZFS Data without Unlocking It"
description: How to create backup files of encrypted ZFS datasets that you can securely replicate anywhere.
date: 2022-07-29T00:00:00-04:00
images:
  - zfs-encrypted-backups/og-cover.png
tags:
  - homelab
  - truenas
---

<!-- Linter is getting confused about the asterisks in cron syntax -->
<!-- markdownlint-disable MD037 -->

I recently [built my first home TrueNAS server](/budget-nas/). I use it to store the bulk of my personal and work data, so I've been learning how to make the most of TrueNAS and its filesystem, ZFS.

Today, I want to tell you about backing up encrypted data.

{{<gallery caption="My [homelab TrueNAS server](/budget-nas/)">}}
{{<img src="all-parts.jpg" alt="Photo of NAS server parts in retail packaging" maxWidth="450px">}}
{{<img src="completed-build.jpg" alt="Photo of completed server build" maxWidth="450px">}}
{{</gallery>}}

One of the neat features of ZFS is that you can make backups of encrypted data while it's still encrypted. The tricky part is that TrueNAS assumes you'll only ever back up to other TrueNAS systems. If you're like me and want to back up your encrypted data to a generic cloud storage provider, you need to do a bit more work. In today's blog post, I'll show you how to do it.

## Why back up encrypted data?

I have some files that I rarely access but still want to keep on an encrypted dataset.

On my previous Synology NAS, there was no way to back up an encrypted volume. If data was encrypted, it was completely inaccessible to anything until you unlocked it. For most of my data, that's okay, but what about volumes I access infrequently? My nightly backups wouldn't be able to replicate them to my cloud storage.

TrueNAS is better! You can make full and incremental backups even when the dataset is encrypted and locked. This seemed like a great way to back up infrequently accessed data without having to keep it decrypted.

I use [restic](https://restic.readthedocs.io/) and [resticpy](https://github.com/mtlynch/resticpy) to back up my data to cloud storage, so I needed a way for restic to access my encrypted ZFS backups. It took a bit of tinkering and manual bash scripting, but I got it working.

## Trying to back up encrypted datasets through TrueNAS (the wrong way)

To demonstrate what I'm trying to do, I created a dataset called `diary-entries`.

{{<img src="diary-entries-row.png" alt="Screenshot of diary-entries dataset in TrueNAS">}}

Okay, let's put a file into this dataset:

```bash
echo "I enjoy Taylor Swift, but I don't want anyone to know" \
  > /mnt/pool1/diary-entries/2022-07-05.txt
```

And I'll need to create a new dataset to receive the backups called `diary-entries-backup`. I've disabled encryption on this new dataset because I don't need an extra layer of encryption on top of already-encrypted backups:

{{<img src="diary-backup.png" alt="Screenshot of TrueNAS dataset creation screen with encryption disabled">}}

Now, I'm ready to set up a replication task to back up encrypted snapshots of the `diary-entries` dataset to the unencrypted `diary-entries-backup` dataset. From there, restic can access the `diary-entries-backup` dataset and replicate it to cloud storage.

When I create the replication task, TrueNAS warns me that I'm replicating an encrypted dataset. That's fine &mdash; it's exactly what I want. I want to take encrypted snapshots and back them up to the cloud while they're still encrypted:

{{<img src="replication-warning.png" alt="Warning in TrueNAS: You are replicating the following encrypted datasets: 'pool1/diary-entries'. Destination datasets will be locked and can be unlocked with source datasets' encryption key'">}}

I start the replication task, and it... fails:

{{<img src="replication-error.png" alt="Unable to send encrypted dataset 'pool1/diary-entries' to existing unencrypted or unrelated dataset 'pool1/diary-entries-backup'.">}}

The error is:

> Unable to send encrypted dataset 'pool1/diary-entries' to existing unencrypted or unrelated dataset 'pool1/diary-entries-backup'.

Shucks!

It won't let me replicate an encrypted dataset to an unencrypted dataset. That seems a little silly because if the snapshot is encrypted and locked, why does it matter if it's sitting on a dataset that's also encrypted?

{{<notice type="info">}}
**Note**: This didn't work because my mental model of ZFS replication was incorrect. I'll reach the correct model later on.
{{</notice>}}

## Using ZFS through the command-line interface

TrueNAS is mainly a friendly UI around ZFS. To make things easier, I bypassed TrueNAS and went directly to ZFS's more powerful command-line interface (CLI).

The [ZFS documentation](https://openzfs.github.io/openzfs-docs/man/8/zfs-send.8.html) includes an example command for replicating a dataset:

```bash
zfs send pool/fs@a | zfs receive poolB/received/fs@a
```

The `@a` represents a snapshot named `a`, so I'll take a snapshot called `2022-07-05`:

```bash
zfs snapshot pool1/diary-entries@2022-07-05
```

And I'll try replicating `diary-entries` to `diary-entries-backup`:

```bash
$ zfs send pool1/diary-entries@2022-07-05 \
  | zfs receive pool1/diary-entries-backup
cannot receive new filesystem stream: destination 'pool1/diary-entries-backup' exists
must specify -F to overwrite it
```

Okay, so I can't replicate into an existing dataset? Let's just specify a new dataset name `diary-entries-backup2`:

```bash
$ zfs send pool1/diary-entries@2022-07-05 \
  | zfs receive pool1/diary-entries-backup
warning: cannot send 'pool1/diary-entries@2022-07-05': dataset key must be loaded
cannot receive: failed to read from stream
```

So it's refusing to replicate unless `diary-entries` is decrypted? I thought I could replicate an encrypted dataset...

Revisiting the ZFS documentation, I see a `--raw` flag:

> `-w, --raw`
> For encrypted datasets, send data exactly as it exists on disk.

Okay, let me try that:

```bash
$ zfs send --raw pool1/diary-entries@2022-07-05 \
  | zfs receive pool1/diary-entries-backup2
```

Success!

Let me go back to the TrueNAS web UI to see what I created:

{{<img src="new-encrypted-dataset.png" alt="Screenshot of diary-entries-backup2 in TrueNAS, labeled as an encrypted dataset">}}

Darn, that wasn't what I wanted.

ZFS created another _encrypted_ dataset. I want an encrypted backup file on an unencrypted dataset. ZFS didn't seem to offer any way of doing that.

## Revelation: I can redirect output to a file

Revisiting ZFS' replication command, I noticed something:

```bash
$ zfs send --raw pool1/diary-entries@2022-07-05 \
  | zfs receive pool1/diary-entries-backup2
```

Okay so there's a `zfs send` command that pipes output to a `zfs receive` command. What if instead of piping output to `zfs receive`, I just write it to a file?

```bash
$ zfs send --raw pool1/diary-entries@2022-07-05 \
  > /mnt/pool1/diary-entries-backup/snapshot@2022-07-05
```

Hey, it worked! I created a 24 KB backup file on my unencrypted `diary-entries-backup` dataset:

```bash
$ du -h /mnt/pool1/diary-entries-backup/*
24K    /mnt/pool1/diary-entries-backup/snapshot@2022-07-05
```

Now that I have the backup as a file on an unencrypted dataset, restic can back it up to the cloud like any other file.

But first, let me test that I can recreate the data in `diary-entries` from this backup using the `zfs receive` command:

```bash
$ zfs receive pool1/diary-entries-backup3 \
  < /mnt/pool1/diary-entries-backup/snapshot@2022-07-05
```

That succeeds and creates a new dataset in my pool:

{{<img src="dataset3.png" alt="Screenshot of diary-entries-backup3 as an encrypted dataset">}}

Moment of truth! If I can decrypt `diary-entries-backup3` with the same password I used for `diary-entries` and it contains the same data, then I'll know that the file `diary-entries-backup/snapshot@2022-07-05` is a complete backup of the `diary-entries` dataset at snapshot `2022-07-05`.

So, I decrypt `diary-entries-backup3` with the same password and check its contents:

```bash
$ cat /mnt/pool1/diary-entries-backup3/2022-07-05.txt
I enjoy Taylor Swift, but I don’t want anyone to know
```

Hooray! It worked.

I can successfully create encrypted backup files of my encrypted datasets without ever unlocking them.

## Creating incremental backups

One of the datasets I plan to back up this way is for video captures of my screencasts. That dataset is currently 12 GB and will likely grow. If I'm performing daily backups, I don't want a new 12 GB file every day.

Fortunately, ZFS supports incremental backups. If you snapshot a dataset on Monday and then again on Tuesday, you don't have to create a full backup file for both Monday and Tuesday. Instead, your Tuesday backup can just be the delta from Monday.

To demonstrate, I'll add a little more data to my `diary-entries` dataset:

```bash
echo "Upon reflection, I'm not ashamed of how much I enjoy You Belong with Me" \
  > /mnt/pool1/diary-entries/2022-07-06.txt
```

And now I'll create a new snapshot that includes the latest entry:

```bash
zfs snapshot pool1/diary-entries@2022-07-06
```

Finally, I'll create an incremental backup relative to the `2022-07-05` snapshot using the `-i` flag to specify the base snapshot:

```bash
zfs send \
  --raw \
  --verbose \
  -i pool1/diary-entries@2022-07-05 \
  pool1/diary-entries@2022-07-06 \
  > /mnt/pool1/diary-entries-backup/snapshot@2022-07-05-to-2022-07-06
```

Success! The command created a new incremental backup:

```bash
$ du -h /mnt/pool1/diary-entries-backup/*
 24K    /mnt/pool1/diary-entries-backup/snapshot@2022-07-05
6.5K    /mnt/pool1/diary-entries-backup/snapshot@2022-07-05-to-2022-07-06
```

It's a little silly on this demo because my files are tiny anyway, but you can still see that the second snapshot is substantially smaller than the first. That's because it contains only the changes since the `2022-07-05` snapshot.

The test isn't complete until I restore the original data from the backup, so I'll try creating a new dataset using the incremental backup:

```bash
# Recover from full backup.
zfs receive pool1/diary-entries-backup4@2022-07-05 \
  < /mnt/pool1/diary-entries-backup/snapshot@2022-07-05
# Add changes since incremental backup.
zfs receive pool1/diary-entries-backup4 \
  < /mnt/pool1/diary-entries-backup/snapshot@2022-07-05-to-2022-07-06
```

I recovered it!

{{<img src="dataset4.png" alt="Screenshot of diary-entries-backup3 as an encrypted dataset">}}

And both of my files are there:

```text
$ tail -n +1 /mnt/pool1/diary-entries-backup4/*
==> /mnt/pool1/diary-entries-backup4/2022-07-05.txt <==
I enjoy Taylor Swift, but I don't want anyone to know

==> /mnt/pool1/diary-entries-backup4/2022-07-06.txt <==
Upon reflection, I'm not ashamed of how much I enjoy Blank Space
```

Note that I have to first recover from the full backup and then advance it with an incremental backup. If I try to start a recovery with an incremental backup, ZFS will fail with an error:

```bash
# This isn't going to work because it's an incremental backup.
$ zfs receive pool1/diary-entries-backup5 \
  < /mnt/pool1/diary-entries-backup/snapshot@2022-07-05-to-2022-07-06
cannot receive incremental stream: destination 'pool1/diary-entries-backup5' does not exist
```

## Scripting backups

Now that I understand the mechanics of replicating datasets with ZFS, it's time to create a shell script so that I can automate recurring backup tasks.

To start, I'll create a file called `settings.sh` to define everything that's specific to my system:

```bash
readonly POOL="mypool"
readonly BASE_DIR="/mnt/${POOL}/encrypted-backups"
readonly FULL_SNAPSHOTS_DIR="${BASE_DIR}/full-snapshots"
readonly INCREMENTAL_SNAPSHOTS_DIR="${BASE_DIR}/incremental-snapshots"

DATASETS=()
DATASETS+=("documents")
DATASETS+=("music")
DATASETS+=("emails")
readonly DATASETS
```

And now I'll make a script called `replicate-full-snapshots.sh` that creates full backups of my datasets:

```bash
#!/bin/bash

# Create full snapshots of datasets in DATASETS array.

set -eux

. settings.sh

mkdir -p "${FULL_SNAPSHOTS_DIR}"

TIMESTAMP="$(date -Iseconds | sed 's/://g' | sed 's/+0000/Z/g')"
readonly TIMESTAMP

for DATASET in "${DATASETS[@]}"; do
  # Take a snapshot.
  SNAPSHOT_NAME="${POOL}/${DATASET}@${TIMESTAMP}"
  zfs snapshot "${SNAPSHOT_NAME}"

  # Write the snapshot to a file.
  OUTPUT_FILENAME="${SNAPSHOT_NAME//${POOL}\//}"
  zfs send --raw --verbose "${SNAPSHOT_NAME}" > "${FULL_SNAPSHOTS_DIR}/${OUTPUT_FILENAME}"
done
```

The script iterates through each of the datasets I defined in `settings.sh`, creates a new snapshot of each, and then creates a full backup of each snapshot.

Next, I'll create a script called `replicate-incremental-snapshots.sh` that creates incremental backups:

```bash
#!/bin/bash

# Create incremental snapshots of datasets in DATASETS array relative to their
# last full snapshot.

set -eux

. settings.sh

mkdir -p "${INCREMENTAL_SNAPSHOTS_DIR}"

TIMESTAMP="$(date -Iseconds | sed 's/://g' | sed 's/+0000/Z/g')"
readonly TIMESTAMP

for DATASET in "${DATASETS[@]}"; do
  # Take a snapshot.
  INCREMENTAL_SNAPSHOT="${POOL}/${DATASET}@${TIMESTAMP}"
  zfs snapshot "${INCREMENTAL_SNAPSHOT}"

  # Find the most recent full snapshot.
  BASE_SNAPSHOT_FILENAME="$(basename "$(ls -tr "${FULL_SNAPSHOTS_DIR}/${DATASET}"* | tail -1)")"
  BASE_SNAPSHOT="${POOL}/${BASE_SNAPSHOT_FILENAME}"

  # Write the incremental snapshot to a file.
  OUTPUT_FILENAME="${INCREMENTAL_SNAPSHOT//${POOL}\//}"
  OUTPUT_PATH="${INCREMENTAL_SNAPSHOTS_DIR}/${OUTPUT_FILENAME}"
  zfs send --raw --verbose -i "${BASE_SNAPSHOT}" "${INCREMENTAL_SNAPSHOT}" \
    > "${OUTPUT_PATH}"
done
```

`replicate-incremental-snapshots.sh` looks for the most recent full backup of each dataset and then creates an incremental backup relative to that.

Note that `replicate-incremental-snapshots.sh` wastes disk space in favor of simplicity. It always creates incremental backups relative to the last full backup and ignores more recent incremental backups. That means if I create a full backup on Monday and incremental backups for the next five days, I'm wasting space because my Wednesday backup will likely include redundant data from my Tuesday backup. I considered making incremental backups on top of other incremental backups, but that would increase complexity and potential for mistakes more than I want in a backup system.

Finally, backup is not much use if you can't recover, so I created a convenience script called `snapshot-to-dataset.sh` that translates backup files back into a ZFS dataset:

```bash
#!/bin/bash
#
# Recover a dataset from an encrypted snapshot.
#
# Usage:
#   ./snapshot-to-dataset.sh new-dataset-name full-snapshot-path [incremental-snapshot-path]

set -ex

. settings.sh

NEW_DATASET_NAME="$1"
readonly NEW_DATASET_NAME

FULL_SNAPSHOT_PATH="$2"
readonly FULL_SNAPSHOT_PATH

INCREMENTAL_SNAPSHOT_PATH="$3"
readonly INCREMENTAL_SNAPSHOT_PATH

set -u

# Restore from base snapshot
zfs receive "${POOL}/${NEW_DATASET_NAME}" < "${FULL_SNAPSHOT_PATH}"

if [[ -n "${INCREMENTAL_SNAPSHOT_PATH}" ]]; then
  # Update dataset to latest incremental snapshot
  zfs receive "${POOL}/${NEW_DATASET_NAME}" < "${INCREMENTAL_SNAPSHOT_PATH}"
fi
```

These scripts are available on Github:

- [mtlynch/zfs-encrypted-backup](https://github.com/mtlynch/zfs-encrypted-backup)

## My convenience scripts in action

To show you how my scripts in action, I'm going to demonstrate them with my `diary-entries` example dataset:

Here's my `settings.sh` file:

```bash
readonly POOL="pool1"
readonly BASE_DIR="/mnt/${POOL}/secure-backups"
readonly FULL_SNAPSHOTS_DIR="${BASE_DIR}/full-snapshots"
readonly INCREMENTAL_SNAPSHOTS_DIR="${BASE_DIR}/incremental-snapshots"

DATASETS=()
DATASETS+=("diary-entries")
readonly DATASETS
```

And now I'll run a full backup:

```bash
./replicate-full-snapshots.sh
```

Did it work?

```bash
$ du -h /mnt/pool1/secure-backups/full-snapshots/diary-entries*
24K    /mnt/pool1/secure-backups/full-snapshots/diary-entries@2022-07-27T073416-0400
```

Cool, it created a backup file, as expected.

Now, I'll add some new data:

```bash
echo "I've got a blank space, so I'll write a new diary entry" \
  > /mnt/pool1/diary-entries/2022-07-27.txt
```

Next, I'll create an incremental backup that includes `2022-07-27.txt`:

```bash
./replicate-incremental-snapshots.sh
```

I should now see a new file in my `incremental-snapshots` folder:

```bash
$ du -h /mnt/pool1/secure-backups/incremental-snapshots/diary-entries*
12K    /mnt/pool1/secure-backups/incremental-snapshots/diary-entries@2022-07-27T074246-0400
```

And let's see if I can recover from it. Recall that the syntax of my `snapshot-to-dataset.sh` script is:

```bash
./snapshot-to-dataset.sh new-dataset-name full-backup-file [incremental-backup-file]
```

With that, I'll try recovering from my backups:

```bash
./snapshot-to-dataset.sh \
  diary-entries-backup5 \
  /mnt/pool1/secure-backups/full-snapshots/diary-entries@2022-07-27T073416-0400 \
  /mnt/pool1/secure-backups/incremental-snapshots/diary-entries@2022-07-27T074246-0400
```

Success! It created a new dataset with all of my files:

```text
tail -n +1 /mnt/pool1/diary-entries-backup5/*
==> /mnt/pool1/diary-entries-backup5/2022-07-05.txt <==
I enjoy Taylor Swift, but I don't want anyone to know

==> /mnt/pool1/diary-entries-backup5/2022-07-06.txt <==
Upon reflection, I'm not ashamed of how much I enjoy Blank Space

==> /mnt/pool1/diary-entries-backup5/2022-07-27.txt <==
I've got a blank space, so I'll write a new diary entry
```

## Scheduling backups

Now that I have the backups scripted, I can create scheduled jobs to run my backups regularly. Fortunately, this is easy enough to do in the TrueNAS web UI, so I can just create a task from Tasks > Cron Jobs.

The first cron job is a monthly task for creating full backups:

{{<img src="monthly-cron.png" alt="Cron Job in TrueNAS with command '/mnt/pool1/secure-backups/scripts/replicate-full-snapshots.sh' and schedule '0 0 3 * *'">}}

I've scheduled it to start at 3 AM on the first of every month because that's when I'm most reliably asleep.

Next, I want a daily task to create incremental backups relative to my monthly snapshot. I'll start that at 4 AM so that the full backups at 3 AM have time to complete before the incremental backup starts:

{{<img src="daily-cron.png" alt="Cron Job in TrueNAS with command '/mnt/pool1/secure-backups/scripts/replicate-incremental-snapshots.sh' and schedule '0 0 4 * *'">}}

To verify that my cron jobs are running successfully, I can check the logs in `/var/log/cron`:

```bash
$ tail /var/log/cron
Jul 28 05:45:03 truenas 1 2022-07-28T08:45:03.757011-04:00 truenas.local cron 302 - - + OUTPUT_PATH=/mnt/pool1/secure-backups/incremental-snapshots/videos@2022-07-28T084502-0400
Jul 28 05:45:03 truenas 1 2022-07-28T08:45:03.757087-04:00 truenas.local cron 302 - - + [[ -f /mnt/pool1/secure-backups/incremental-snapshots/videos@2022-07-28T084502-0400 ]]
Jul 28 05:45:03 truenas 1 2022-07-28T08:45:03.757168-04:00 truenas.local cron 302 - - + zfs send --raw --verbose -i pool1/videos@2022-07-28T080351-0400 pool1/videos@2022-07-28T084502-0400
Jul 28 05:45:03 truenas 1 2022-07-28T08:45:03.761156-04:00 truenas.local cron 302 - - send from pool1/videos@2022-07-28T080351-0400 to pool1/videos@2022-07-28T084502-0400 estimated size is 624B
Jul 28 05:45:03 truenas 1 2022-07-28T08:45:03.761291-04:00 truenas.local cron 302 - - total estimated size is 624
Jul 28 05:45:03 truenas 1 2022-07-28T08:45:03.761877-04:00 truenas.local cron 302 - - + echo 'Finished replicating incremental snapshots'
Jul 28 05:45:03 truenas 1 2022-07-28T08:45:03.761958-04:00 truenas.local cron 302 - - Finished replicating incremental snapshots
```

## Alerts for failed backup

What happens if my backups start failing two months from now? I'm not going to inspect my logs every day to verify my backups are working.

Fortunately, there are a variety of services that alert you when a scheduled task fails to run. I decided to use [Cronitor](https://cronitor.io/) because it has a generous free tier, and it's easy to set up.

From Cronitor, I created a new monitor with a `0 0 3 * *` schedule that matches the schedule for full backups on my TrueNAS server:

{{<img src="cronitor-setup.png" hasBorder="true" alt="New Cronitor Monitor with name truenas-full-backups and schedule 0 0 3 * *">}}

Cronitor generates a unique URL for this monitor that looks like this:

```text
https://cronitor.link/p/88e0dba70a87424b83c5fd3e9227ac92/1bBG6q
```

To make sure that my full backups cron job reports success, I add a `curl` command to the cron job that gives the thumbs up to Cronitor when the backup completes successfully:

{{<img src="add-cronitor.png" alt="/mnt/pool1/secure-backups/scripts/replicate-full-snapshots.sh && curl --silent https://cronitor.link/p/[my telemetry id]?state=complete">}}

I repeat the same process with my incremental backups job, and that's it!

I now have a robust system for creating backups of my encrypted ZFS datasets, and I'll receive an alert from Cronitor if the jobs ever fail.

## Source code

I've published my convenience scripts on Github:

- [mtlynch/zfs-encrypted-backup](https://github.com/mtlynch/zfs-encrypted-backup)
- [mtlynch/mtlynch-backup](https://github.com/mtlynch/mtlynch-backup)
