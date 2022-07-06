---
title: "How to Back Up an Encrypted ZFS Dataset to an Unencrypted Dataset"
date: 2022-07-05T20:37:27-04:00
---

I recently built my first [TrueNAS server](/budget-nas/), and I've been learning more about TrueNAS and ZFS.

{{<gallery caption="Before and after of my 2022 [homelab TrueNAS server](/budget-nas/)">}}
{{<img src="all-parts.jpg" alt="Photo of NAS server parts in retail packaging" maxWidth="450px">}}
{{<img src="completed-build.jpg" alt="Photo of completed server build" maxWidth="450px">}}
{{</gallery>}}

One of the neat features of ZFS is that you can make backups of encrypted data while it's still encrypted.

## Why back up encrypted data?

I have some files that I access rarely but I still want to keep on an encrypted dataset.

On my previous Synology NAS, there was no way to back up an encrypted volume. If files were on an encrypted volume, the data was completely inaccessible to anything until you unlocked it. That made it difficult to

TrueNAS is better! You can take snapshots of an encrypted dataset and even replicate an encrypted dataset to another server without ever decrypting the data. This seemed like a great way for me to maintain backups of data I wanted to back up without having to decrypte it all the time.

## Trying to

To demonstrate what I'm trying to do, I created a dataset called `diary-entries`.

{{<img src="diary-entries-row.png">}}

Okay, let's put a file into this dataset:

```bash
truenas# echo "I enjoy Taylor Swift, but I don't want anyone to know" \
  > /mnt/pool1/diary-entries/2022-07-05.txt
```

And I'll need to create a new dataset to receive the backups. I don't want this dataset to be encrypted because then I'd just be going in circles trying to back up another encrypted dataset, so I've disabled encryption:

{{<img src="diary-backup.png">}}

Now, I'm ready to set up a replication task to back up encrypted snapshots of the `diary-entries` dataset to the unencrypted `diary-entries-backup` dataset. From there, my Windows machine can access the `diary-entries-backup` dataset and back it up to cloud storage.

When I create the replication task, TrueNAS warns me that I'm replicating an encrypted dataset. And that's fine because it's what I want. I want to take encrypted snapshots and back them up to the cloud while they're still encrypted:

{{<img src="replication-warning.png">}}

I start the replication task and... it fails:

{{<img src="replication-error.png">}}

The error is:

```text
Unable to send encrypted dataset 'pool1/diary-entries' to existing unencrypted or unrelated dataset 'pool1/diary-entries-backup'.
```

Shucks!

It won't let me replicate an encrypted dataset to an unencrypted dataset. That seems a little silly because if the snapshot is encrypted and locked, why does it matter if it's sitting on a dataset that's also encrypted?

## Using ZFS through the command-line interface

To figure out what was going on, I decided to skip TrueNAS and use ZFS directly from the command-line.

The [ZFS CLI documentation](https://openzfs.github.io/openzfs-docs/man/8/zfs-send.8.html) gives an example command like this:

```bash
zfs send pool/fs@a | zfs receive poolB/received/fs@a
```

The `@a` represents a snapshot named `a`, so let's first take a snapshot:

```bash
zfs snapshot pool1/diary-entries@2022-07-05
```

And now let's try replicating `diary-entries` to `diary-entries-backup`:

```bash
$ zfs send pool1/diary-entries@2022-07-05 \
  | zfs receive pool1/diary-entries-backup@2022-07-05
cannot receive new filesystem stream: destination 'pool1/diary-entries-backup' exists
must specify -F to overwrite it
```

Okay, so I can't replicate into an existing dataset? Let's just specify a new dataset name `diary-entries-backup2`:

```bash
$ zfs send pool1/diary-entries@2022-07-05 \
  | zfs receive pool1/diary-entries-backup2@2022-07-05
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
  | zfs receive pool1/diary-entries-backup2@2022-07-05
```

Success!

Let me go back to the TrueNAS dataset listing to see what I just created:

{{<img src="new-encrypted-dataset.png">}}

Okay, that's no good. It created another encrypted dataset. I want an encrypted snapshot on an unencrypted dataset, and ZFS didn't seem to offer any way of doing that.

## Just save the snapshot to a file

Revisiting the command I was using, I noticed something:

```bash
$ zfs send --raw pool1/diary-entries@2022-07-05 \
  | zfs receive pool1/diary-entries-backup2@2022-07-05
```

Okay so there's a `zfs send` command that pipes its output to a `zfs receive` command. What if instead of piping output to `zfs receive`, I just write it to a file?

```bash
$ zfs send --raw pool1/diary-entries@2022-07-05 \
  > /mnt/pool1/diary-entries-backup/snapshot@2022-07-05
```

Hey, it worked! I created a 24 KB backup file on my unencrypted `diary-entries-backup` dataset:

```bash
$ du -h /mnt/pool1/diary-entries-backup/*
24K    /mnt/pool1/diary-entries-backup/snapshot@2022-07-05
```

Now that I have the backup as a file on an unencrypted dataset, I can mount the dataset over Samba from my Windows machine and back up the file to the cloud. But first, let's test that I can recreate the data in `diary-entries` just from this backup:

```bash
$ zfs receive pool1/diary-entries-backup3@2022-07-05 \
  < /mnt/pool1/diary-entries-backup/snapshot@2022-07-05
```

That succeeds and creates a new dataset in my pool:

{{<img src="dataset3.png">}}

If I can decrypt `diary-entries-backup3` with the same password I used for `diary-entries` and it contains the same data, then I'll know that the file `diary-entries-backup/snapshot@2022-07-05` contains everything I need to recover the `diary-entries` dataset in case anything ever happens to the original copy. So, I decrypt `diary-entries-backup3` with the same password and check its contents:

```bash
$ cat /mnt/pool1/diary-entries-backup3/2022-07-05.txt
I enjoy Taylor Swift, but I don’t want anyone to know
```

Hooray! It worked. I

## Replicating encrypted datasets to an unencrypted dataset
