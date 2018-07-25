---
title: "Resurrecting a Dead Library: Part Three - Rehabilitation"
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
tags:
- ferngully
- zestful
- refactoring
---

# Fixing the first bug

https://github.com/mtlynch/ingredient-phrase-tagger/pull/26/files
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

---


Note: For the sake of brevity clarity, I took some creative liberties in the retelling of the changes. If you look at the commits, they don't *perfectly* match up to what I presented here.
