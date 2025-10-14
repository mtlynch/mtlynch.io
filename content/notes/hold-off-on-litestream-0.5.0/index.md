---
title: "Hold Off on Litestream 0.5.0"
date: 2025-10-14
tags:
  - litestream
---

[Litestream](https://litestream.io/) is an open-source tool that backs up SQLite databases to cloud storage in real time. I love it and use it in all of my projects.

Litestream [is owned by Fly.io](https://news.ycombinator.com/item?id=31320032), and they paused development on Litestream for almost two years in favor of an alternative project called LiteFS. Two weeks ago, Ben Johnson, Litestream's creator and lead developer, [announced](https://fly.io/blog/litestream-v050-is-here/) that they were shifting focus back to Litestream and had just published a new release, 0.5.0.

I tried out Litestream 0.5.0, but I caution other Litestream users to give it another release and more extensive testing before deploying it in production. I had a bumpy experience migrating to the new version of Litestream.

{{<notice type="info">}}

**Note**: I'm not complaining about Litestream. I love Litestream, and I'm glad to see renewed development. I'm just hoping to save other Litestream users from running into the same bugs I'm hitting.

{{</notice>}}

## The expected migration work

There are two tasks that are intentional in upgrading from previous versions of Litestream to v0.5.0 and above:

1. The backup format has changed, so Litestream 0.5.0 cannot restore from backups created in previous versions of Litestream.
1. The `litestream.yml` configuration file format has changed slightly. There used to be an array field called `replicas`, but 0.5.0 changes this to a dictionary called `replica` (singular).

Litestream has published a [helpful migration guide](https://litestream.io/docs/migration/) with more details.

One of the benefits of Litestream 0.5.0 is that there's now an [official litestream Docker image](https://hub.docker.com/r/litestream/litestream). All of my previous Docker containers required a lot of boilerplate [to download the correct version of Litestream](https://github.com/mtlynch/whatgotdone/blob/2d5085fb9480d7b6e19fc65e0c08895ae236e784/Dockerfile#L24-L49) and make it available in my container, but now it reduces to a single Dockerfile line:

```Dockerfile
COPY --from=litestream/litestream:0.5.0 /usr/local/bin/litestream /app/litestream
```

## My test migration to Litestream 0.5.0

To test out Litestream 0.5.0, I tried deploying it on my project, [What Got Done](https://www.whatgotdone.com/). This is a good project for testing because:

1. I already announced that I was [shutting down this service](https://www.whatgotdone.com/shutdown-notice), so users have stopped using the site.
1. The server kept failing due to [a bug in Litestream 0.3.13](https://github.com/benbjohnson/litestream/issues/688) that was fixed in 0.5.0.

### Uploading to Backblaze backends no longer works

To start the migration, I downloaded the latest copy of my data using Litestream 0.3.13 and then tried to use Litestream 0.5.0 to upload it back to Backblaze's cloud storage in Litestream's new format. But I hit this error:

```text
error" db=store.db replica=s3 error="write ltx file: s3: upload to db/0000/0000000000000001-0000000000000001.ltx: operation error S3: PutObject, resolve auth scheme: resolve endpoint: endpoint rule error, Custom endpoint `s3.us-west-002.backblazeb2.com` was not a valid URI"
```

The exact same definition had worked in previous versions, so I was a bit puzzled.

I tried several alternative ways of specifying the Backblaze S3 endpoint, but Litestream rejected them all as configuration errors before even attempting to back up. The configuration I had was the only one that Litestream accepted as valid configuration, but it failed to back up.

I filed [Backblaze replica fails with "Custom endpoint ... was not a valid URI" #789](https://github.com/benbjohnson/litestream/issues/789), and Litestream developer Cory LaNou [fixed it](https://github.com/benbjohnson/litestream/pull/792) the next day.

Now that I was able to upload data to Backblaze in Litestream's new format, I was unblocked from integrating Litestream 0.5.0 into What Got done.

### `-if-replica-exists` disappeared

I deployed [Litestream 0.5.0 to What Got Done](https://github.com/mtlynch/whatgotdone/pull/982), but the server failed to boot with this error:

```text
flag provided but not defined: -if-replica-exists
```

I checked the command documentation, and it said that `-if-replica-exists` was still supported:

```bash
$ litestream restore -help | grep if-replica-exists --after-context=1
        -if-replica-exists
            Returns exit code of 0 if no backups found.
```

It turns out that the flag was [removed by mistake](https://github.com/benbjohnson/litestream/issues/774) and [will be back in 0.5.1](https://github.com/benbjohnson/litestream/issues/774#issuecomment-3393536299).

### Restore fails with `transaction not available`

Undeterred by the loss of `-if-replica-exists`, I [removed it from my start script](https://github.com/mtlynch/whatgotdone/pull/983/files). But then my server failed to start with a new error:

```text
level=ERROR msg="failed to run" error="cannot calc restore plan: transaction not available"
```

That turns out to match this open Litestream issue, with an alarming severity of "CRITICAL - Complete Data Loss":

- [CRITICAL: Restore fails with 'nonsequential page numbers' after checkpoint during Litestream downtime #752](https://github.com/benbjohnson/litestream/issues/752)

### Litestream no longer creates directories

At this point, I was just willing to try anything to get back up and running, so I ran the latest bleeding edge version of Litestream by [building it from source in my Docker container](https://github.com/mtlynch/whatgotdone/pull/984/files).

Fortunately, the latest version got around whatever `transaction not available` issue I was hitting, and Litestream made it further in the process!

Unfortunately, there was still one error to overcome:

```text
level=ERROR msg="failed to run" error="create temp database path: open /app/data/store.db.tmp: no such file or directory"
```

This one was actually simple enough that I had a pretty strong suspicion about what was happening. In previous versions of Litestream, if I told it to restore a SQLite database to `/app/data/store.db` and the `/app/data` path didn't exist, Litestream would attempt to create it before writing the file.

I checked the source and saw that the folder creation logic had disappeared in this code flow, but it was simple enough to fix, so I created a fix:

- [Create parent directory on replica restore #793](https://github.com/benbjohnson/litestream/pull/793)

### Success!

With my fork of Litestream with the final `mkdir` fix applied, What Got Done was back up and running!

## Reflections

I was able to get Litestream 0.5.x working with a pre-release fork, but I'm going to hold off deploying it to my other projects for another release or two. The 0.5.0 changes seem to have been more disruptive than the Litestream folks expected, and they're still struggling with some serious bugs:

- [CRITICAL: Restore fails with 'nonsequential page numbers' after checkpoint during Litestream downtime #752](https://github.com/benbjohnson/litestream/issues/752)
- [Local LTX Level 0 files are never compacted/removed #784](https://github.com/benbjohnson/litestream/issues/784)

And there are several other serious bugs that they've fixed in the development version but are not yet in a production release:

- [Restore does not update LTX ID information #781](https://github.com/benbjohnson/litestream/issues/781)
- [Age encryption configuration silently ignored in v0.5.0+ #790](https://github.com/benbjohnson/litestream/issues/790)
- [\[Regression\] LTX transactions get deleted in 0.5.0, cannot restore more than a few seconds #771](https://github.com/benbjohnson/litestream/issues/771)

{{<notice type="info">}}

**Note**: Again, this is not a criticism of Litestream. Streaming replication is hard to do correctly, and what they're doing is way more robust than what I'd be able to produce. I'm grateful to the Litestream team for responding to bug reports and fixing issues so quickly.

{{</notice>}}
