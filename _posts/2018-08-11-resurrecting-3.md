---
title: 'Resurrecting a Dead Library: Part Three - Rehabilitation'
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
tags:
- zestful
- refactoring
- ingredient-phrase-tagger
- ingredient parsing
header:
  teaser: images/2018-08-11-resurrecting-3/cover.jpg
  og_image: images/2018-08-11-resurrecting-3/cover.jpg
---

* [Part One: Resuscitation](/resurrecting-1/) - In which I nurse the code back to health so that it runs on any modern system
* [Part Two: Stabilization](/resurrecting-2/) - In which I prevent functionality from regressing while I restore the code
* **Part Three: Rehabilitation (this post)** - In which I fix the code's most egregious bugs and begin refactoring

{% include image.html file="cover.jpg" alt="Hermit crab being pulled from shell" max_width="800px" img_link=true %}

# Enforcing whitespace conventions

My end-to-end tests gave me confidence that if I refactored the code, I wouldn't accidentally break anything. I decided to add one of my favorite Python tools, [YAPF](https://github.com/google/yapf). It's a formatter for Python. I add it to all of my Python projects so that it forces me to use consistent code conventions for whitespace without having to think about it.

I used YAPF to reformat all of the Python files according to my preferred style conventions, then I [added YAPF to my build script](https://github.com/mtlynch/ingredient-phrase-tagger/pull/11) to make sure that these conventions held for every code change.

This created a bit of noise in my source:

{% include image.html file="yapf-diff.png" alt="Diff from YAPF changes" max_width="702px" img_link=true class="img-border" %}

I isolated whitespace changes to a single pull request. Anyone reviewing this change later can quickly scan through and see that these are purely whitespace changes that don't affect the logic.

Still, it's possible sometimes to introduce a logic change even when it just looks like whitespace refactoring. I was confident that I wasn't doing this because I had end-to-end tests ensuring that my code produced the same output as before its refactoring.

# Adding static analysis

[pyflakes](https://github.com/PyCQA/pyflakes) is another tool I keep in all of my Python projects. It catches errors using static analysis like unused variables or unused imports. It was easy to [add to my build](https://github.com/mtlynch/ingredient-phrase-tagger/pull/12) and it immediately caught an unused import:

```bash
$ pyflakes bin/ ingredient_phrase_tagger/
ingredient_phrase_tagger/training/utils.py:3: 'string' imported but unused
```

# Maybe I should read the code

You may have noticed that throughout this process, I have avoided trying to understand the code. I've managed to skate by without really understanding what any of it is doing except at a very high level.

Now that my end-to-end test was in place and I had automated development tools in place, maybe I should, y'know, read the code.

I have a hard time just reading code straight through. When I read code, I'm constantly thinking of things to change, so I like to refactor to bake in my understanding. Martin Fowler describes this best:

>TODO: Fowler quote
>
>-Martin Fowler, *Refactoring*

# Starting top-down

The code wasn't well-factored. Almost all of the library's logic was in just two files: `cli.py` and `utils.py`. So, basically, the code was divided into two modules: "command-line interface" and "everything else." But this division wasn't even very accurate, as most of `cli.py` had nothing to do with reading or writing from the command line.

Here are the `Cli` class' methods:

* `run`
* `generate_data`
* `parseNumbers`
* `matchUp`
* `addPrefixes`
* `bestTag`
* `_parse_args`

The only two that make sense as logical parts of a command-line interface class are `run` and `_parse_args`. This code was in need of a refactoring.

# Finding a seam

In his book *Working with Legacy Code*, Michael Feathers suggests looking for "seams":

>TODO: Add seams definition.


https://github.com/mtlynch/ingredient-phrase-tagger/pull/19

# Speeding up the build

Adding the build tools should have been simple, but one thing was getting in my way. Each build took almost 20 minutes to complete:

{% include image.html file="build-time.png" alt="Travis screenshot showing 20 minute build time" max_width="800px" img_link=true class="img-border" %}

The library was only a few thousand lines of Python, so a 20-minute build was outrageous. What was taking so long?

My immediate thought was CRF++. It's a C++ application that needs to be compiled, so that must be the culprit. I split my Docker image into two layers: a CRF++ layer and an ingredient-phrase-tagger layer. That way, I 

The [new build](https://github.com/mtlynch/ingredient-phrase-tagger/pull/15) took 14 minutes, which was still too slow. It also meant that something in ingredient-phrase-tagger was 

I watched a build to see what was taking so long and I was surprised to see that it was still compiling C code. It turned out that ingredient-phrase-tagger depends on the pandas library, which depends on numpy, which installs itself in a lengthy process that involves compiling everything locally from source.

# Why do we need pandas?

I've worked on a few projects that used pandas, but I wasn't super familiar with it. I only knew it as a tool for data visualization. But ingredient-phrase-tagger didn't have any data visualization, so why were they using pandas?

I checked the code and found that they called the pandas API in exactly one place in the whole library:

```python
import pandas as pd
...
df = pd.read_csv(self.opts.data_path)
```

They were pulling in this enormous, bulky dependency just to read CSV files! This was crazy because Python has a [built-in library](https://docs.python.org/2/library/csv.html) that reads CSVs.

But this is understandable. The original developers probably set up their development environments exactly one time, so they didn't care that it took 20 minutes. And they probably were comfortable with the pandas API and had no reason to look for a simpler solution. Continuous integration makes this harder, but it also surfaces problems like this that otherwise go unnoticed.

# Switching to the native csv library

```diff
diff --context=2 tests/golden/training_data.crf /tmp/tmp.fCFt3e4Eky/training_data.crf
*** tests/golden/training_data.crf      Mon Jul 30 14:26:19 2018
--- /tmp/tmp.fCFt3e4Eky/training_data.crf       Mon Jul 30 14:36:29 2018
***************
*** 1,3 ****
! 1$1/4 I1      L20     NoCAP   NoPAREN B-QTY
  cups  I2      L20     NoCAP   NoPAREN B-UNIT
  cooked        I3      L20     NoCAP   NoPAREN B-COMMENT
--- 1,3 ----
! 1$1/4 I1      L20     NoCAP   NoPAREN OTHER
  cups  I2      L20     NoCAP   NoPAREN B-UNIT
  cooked        I3      L20     NoCAP   NoPAREN B-COMMENT
***************
*** 37,41 ****
  chestnuts     I19     L20     NoCAP   NoPAREN B-NAME

! 1     I1      L8      NoCAP   NoPAREN B-QTY
  medium-size   I2      L8      NoCAP   NoPAREN B-COMMENT
  onion I3      L8      NoCAP   NoPAREN B-NAME
--- 37,41 ----
  chestnuts     I19     L20     NoCAP   NoPAREN B-NAME

! 1     I1      L8      NoCAP   NoPAREN OTHER
  medium-size   I2      L8      NoCAP   NoPAREN B-COMMENT
  onion I3      L8      NoCAP   NoPAREN B-NAME

```

To simplify the debugging exercise, I created a simplified input file that had only one line that yielded different outputs between CSV libraries:

```bash
$ cat /tmp/debug.csv
index,input,name,qty,range_end,unit,comment
19994,1 pinch cayenne pepper,cayenne pepper,1.0,0.0,pinch,
```

```bash
$ bin/generate_data --data-path=/tmp/debug.csv --count=1 --offset=0
1       I1      L8      NoCAP   NoPAREN B-QTY
pinch   I2      L8      NoCAP   NoPAREN B-UNIT
cayenne I3      L8      NoCAP   NoPAREN B-NAME
pepper  I4      L8      NoCAP   NoPAREN I-NAME
```

```bash
$ bin/generate_data --data-path=/tmp/debug.csv --count=1 --offset=0
1       I1      L8      NoCAP   NoPAREN OTHER
pinch   I2      L8      NoCAP   NoPAREN B-UNIT
cayenne I3      L8      NoCAP   NoPAREN B-NAME
pepper  I4      L8      NoCAP   NoPAREN I-NAME
```

```python
for k, v in row.iteritems():
    print '[%s] (%s) -> [%s] (%s)' % (k, type(k), v, type(v))
```

I ran it under the pandas implementation:

```bash
$ bin/generate_data --data-path=/tmp/debug.csv --count=1 --offset=0
[index] (<type 'str'>) -> [19994] (<type 'int'>)
[input] (<type 'str'>) -> [1 pinch cayenne pepper] (<type 'str'>)
[name] (<type 'str'>) -> [cayenne pepper] (<type 'str'>)
[qty] (<type 'str'>) -> [1.0] (<type 'float'>)
[range_end] (<type 'str'>) -> [0.0] (<type 'float'>)
[unit] (<type 'str'>) -> [pinch] (<type 'str'>)
[comment] (<type 'str'>) -> [] (<type 'str'>)
```

And then again under the native CSV implementation:

```bash
$ bin/generate_data --data-path=/tmp/debug.csv --count=1 --offset=0
[range_end] (<type 'str'>) -> [0.0] (<type 'str'>)
[index] (<type 'str'>) -> [19994] (<type 'str'>)
[name] (<type 'str'>) -> [cayenne pepper] (<type 'str'>)
[comment] (<type 'str'>) -> [] (<type 'str'>)
[qty] (<type 'str'>) -> [1.0] (<type 'str'>)
[input] (<type 'str'>) -> [1 pinch cayenne pepper] (<type 'str'>)
[unit] (<type 'str'>) -> [pinch] (<type 'str'>)
```

That was it! The data types were different. It looked like pandas automatically interpreted numbers as number types whereas the `csv` library let them remain as strings. If the cell contained the string `1.0`, then the csv library read it as the string `'1.0'` whereas pandas read it as a floating-point number of `1.0`.

# Surely that's sorted

```bash
$ ./docker_build
...
diff --context=2 tests/golden/training_data.crf /tmp/tmp.3jATNKzDTl/training_data.crf
*** tests/golden/training_data.crf      Mon Jul 30 14:26:19 2018
--- /tmp/tmp.3jATNKzDTl/training_data.crf       Mon Jul 30 15:25:32 2018
***************
*** 98626,98630 ****
  large I2      LX      NoCAP   NoPAREN I-NAME
  or    I3      LX      NoCAP   NoPAREN I-NAME
! 2     I4      LX      NoCAP   NoPAREN I-NAME
  smaller       I5      LX      NoCAP   NoPAREN I-NAME
  swordfish     I6      LX      NoCAP   NoPAREN I-NAME
--- 98626,98630 ----
  large I2      LX      NoCAP   NoPAREN I-NAME
  or    I3      LX      NoCAP   NoPAREN I-NAME
! 2     I4      LX      NoCAP   NoPAREN B-RANGE_END
  smaller       I5      LX      NoCAP   NoPAREN I-NAME
  swordfish     I6      LX      NoCAP   NoPAREN I-NAME
***************
...
```

So I again repeated it to just one of the troublesome lines:

```bash
$ cat /tmp/debug.csv
index,input,name,qty,range_end,unit,comment
14583,"1 large or 2 smaller swordfish steaks, a total of 1 1/2 to 2 pounds (tuna may be substituted)",swordfish steaks (1 large or 2 smaller),1.5,2.0,pound,(tuna may be substituted)
```

I was baffled. I ran the same print debugging and all the keys and values were exactly the same:

TODO

I was baffled. To the rest of the library, it's getting the exact same inputs. Other parts didn't know about pandas, so how could they produce different output?

I kept adding `print` statements in the code to try to locate where results diverged on the same inputs. Finally, I narrowed it down to this function:

```python
def _matchUp(token, ingredientRow):
    """
    Returns our best guess of the match between the tags and the
    words from the display text.
    This problem is difficult for the following reasons:
        * not all the words in the display name have associated tags
        * the quantity field is stored as a number, but it appears
          as a string in the display name
        * the comment is often a compilation of different comments in
          the display name
    """
    ret = []

    # strip parens from the token, since they often appear in the
    # display_name, but are removed from the comment.
    token = utils.normalizeToken(token)
    decimalToken = _parseNumbers(token)

    for key, val in ingredientRow.iteritems():
        if isinstance(val, basestring):

            for n, vt in enumerate(utils.tokenize(val)):
                if utils.normalizeToken(vt) == token:
                    ret.append(key.upper())

        elif decimalToken is not None:
            if val == decimalToken:
                ret.append(key.upper())

    return ret
```

I added print statements at the beginning and end.

```bash
$ bin/generate_data --data-path=/tmp/debug.csv --count=1 --offset=0
...
2
['RANGE_END', 'NAME']
```

```bash
$ bin/generate_data --data-path=/tmp/debug.csv --count=1 --offset=0
...
2
['NAME', 'RANGE_END']
```

It was the **ordering**!

Both libraries converted rows into dictionary-like objects that other code could iterate over, but the iterators ran in different order. the `_matchUp` function had an implicit dependency on a particular iteration order. I made this order explicit based on what the pandas implementation was doing explicitly:

```diff
-    for key, val in ingredientRow.iteritems():
+    for key in ['index', 'name', 'qty', 'range_end', 'unit', 'comment']:
+        val = ingredientRow[key]
```

And then it worked!

# Did we speed up the build?

That reduced the running time to just 1 minute, 38 seconds:

# Refactor one to throw away

I eventually decided I wanted a whole new design.

>Hence plan to throw one away; you will, anyhow.
>
>-Fred Brooks, *The Mythical Man Month*

You can demo it on my site and you can use it in your apps.


{% include ads.html title="zestful" %}

---

*Cover illustration by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). My fork of the ingredient-phrase-tagger library is available on [Github](https://github.com/mtlynch/ingredient-phrase-tagger). I offer a managed service based on this library called [Zestful](https://zestfuldata.com).*