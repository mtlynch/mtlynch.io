---
title: "Delete the Timestamps from your Static Blog"
date: 2024-11-16
---

I build this blog using [Hugo](https://gohugo.io/), a popular static site generator.

The way Hugo works is that when I create a new blog post, Hugo generates a default template that looks like this:

```markdown
---
title: "My New Post"
date: 2024-11-16T20:33:09-04:00
---
```

The boilerplate for the post contains a publication time with a timestamp. But the timestamp obviously isn't the time that I published the post, as I've just started writing it.

## The default timestamp is meaningless

From my readers' perspective, Hugo's timestamp for my post is meaningless.

Readers want to know a post was published, not when the author first started writing down their earliest ideas.

It's not just Hugo &mdash; Jekyll, another popular static site generator, does the same thing.

At some point in the editing process for every single post I've ever written, I have to update the timestamp to the date I plan to publish, and I zero out the time portion like this: `2024-11-16T00:00:00-04:00`.

It's a tedious process, but it only takes five seconds each time, so I quickly forget about it as a problem.

## Let's throw away the timestamps

After what was probably the 100th time manually adjusting the timestamp in one of my blog posts over the last decade, I finally asked, "Do I have to do this every time?"

Fortunately, the answer is: no.

It's easy to throw away timestamps, at least in Hugo, and everything works just like it should.

### Step 1: Update archetypes

The first thing I did was [update my blog's archetypes files](https://github.com/mtlynch/mtlynch.io/pull/1301).

In Hugo, when you generate a new post, Hugo populates it using boilerplate from the [archetype file](https://gohugo.io/content-management/archetypes/) for that post type.

Now, my default archetype looks like this:

```markdown
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ now.Format "2006-01-02" }}
---
```

If I generate a new post, the file has just a plain date with no timestamp attached:

```bash
$ hugo new content/posts/just-a-test/index.md && \
  cat content/posts/just-a-test/index.md
Content "/home/mike/mtlynch.io/content/posts/just-a-test/index.md" created
---
title: "Just a Test"
date: 2024-11-16
---
```

Perfect!

### Step 2: Retroactively delete all timestamps

I also retroactively stripped the timestamps from all of my old posts with this wacky LLM-generated one-liner:

```bash
# Strip timestamps from the date and lastmod fields of every post.
find . \
  -name "*.md" \
  -exec \
    sed \
      -i \
      -e 's/\(date: [0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}\)T[0-9:.-]\+/\1/' \
      -e 's/\(lastmod: [0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}\)T[0-9:.-]\+/\1/' \
  {} +
```

That command [updated all of my previous posts](https://github.com/mtlynch/mtlynch.io/pull/1302) to remove the timestamp and convert down to simple dates.

## Conclusion

My blog is now free of timestamps, and I'm happier for it. The timestamps never had any meaning, and they only got in the way.

I'm elated just imagining all that I'll achieve with the two seconds I save on fiddling with the date field of every post from now on.
