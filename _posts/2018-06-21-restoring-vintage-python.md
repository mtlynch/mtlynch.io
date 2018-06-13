---
title: Restoring a Vintage Python Library
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
---

I recently stumbled upon an open source Python library from a time long forgotten. I'm talking about a time when the earth was roamed by functions as big as buildings. From a time when everyone knew the words "unit" and "testing," but nobody had yet dared use them in the same sentence.

It turned out that the software had some sort of primitive source control. Perhaps I could use modern tools to find its last commit and estimate its vintage that way:

# What is it?

This is a library that *The New York Times* published in order to parse their ingredients.

At the time they published it, many, including famed Python developer D. John Trump:

Fake Trump tweet: Failing @nytimes doesn't even unit test their code before release! very DISRESPECTFUL to @kentbeck!


# Getting it to run

# Adding an end-to-end test

Note: For the sake of brevity clarity, I took some creative liberties in the retelling of the changes. If you look at the commits, the files don't perfectly match up to what I presented here.

This is curious. Between my local Docker container and the one that runs on Travis, I get different results

```diff
1       I1    L12  NoCAP  YesPAREN  B-QTY
small   I2    L12  NoCAP  NoPAREN   OTHER
bulb    I3    L12  NoCAP  NoPAREN   B-UNIT
of      I4    L12  NoCAP  NoPAREN   OTHER
jicama  I5    L12  NoCAP  YesPAREN  B-NAME
(       I6    L12  NoCAP  YesPAREN  OTHER
-1/2     I7    L12  NoCAP  YesPAREN  OTHER
+1/2     I7    L12  NoCAP  YesPAREN  B-COMMENT
cup     I8    L12  NoCAP  YesPAREN  OTHER
grated  I9    L12  NoCAP  YesPAREN  OTHER
jicama  I10   L12  NoCAP  YesPAREN  B-NAME
)       I11   L12  NoCAP  YesPAREN  OTHER
```

I later discovered that this was due to the `--threads` flag in CRF++. It's automatically set to the number of CPUs available

# Speeding up the build

# Trimming a heavy dependency

# Fixing the first bug

# Add in my build tools

I have a standard set of dev tools I use for every Python project I work on:

* Coveralls
* YAPF
* pyflakes
* DocStringChecker

# Delete the cruft

At this point, I had a good feel for the code. Red flags I saw at the beginning, I was now more confident they were indeed extraneous. I had end-to-end tests to verify everything, so if I broke something, I'd find out.

One thing that had gnawing at me throughout my work was seeing a folder called `tmp/` that was only there so that one of their shell scripts. I no longer needed their shell script because I was doing the same

https://github.com/mtlynch/ingredient-phrase-tagger/pull/32
https://github.com/mtlynch/ingredient-phrase-tagger/pull/33

# Edit like nobody's watching

Now that I had the code under decent amount of test, I could start making *functional* changes.

https://github.com/mtlynch/ingredient-phrase-tagger/pull/28/files

# Refactor one to throw away

I eventually decided I wanted a whole new design.

You can demo it on my site and you can use it in your apps.

# A note about the code

I don't think it's high-quality code, but even though a lot was klunky, it still did what it was supposed to do. I had enough information to understand how to use it and generally what everything did. Granted, I think automated tests and better documentation do this much better, but the original authors got me somewhere I might not have been able to get to on my own.