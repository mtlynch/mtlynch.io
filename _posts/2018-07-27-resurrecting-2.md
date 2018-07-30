---
title: 'Resurrecting a Dead Library: Part Two - Stabilization'
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
header:
  og_image: images/2018-07-27-resurrecting-2/cover.jpg
  teaser: images/2018-07-27-resurrecting-2/cover.jpg
---

In this post, I will retrofit automated tests onto a library that was built without tests in mind.

This is part two of a three-part series about resurrecting a library that its maintainers abandoned two years ago. It's a library that uses machine learning to parse raw recipe ingredients (e.g., "2 cups milk") into structured data.

* [Part One: Resuscitation](/resurrecting-1/) - In which I nurse the code back to health so that it runs on any modern system
* **Part Two: Stabilization (this post)** - In which I prevent functionality from regressing while I restore the code
* Part Three: Rehabilitation (coming soon) - In which I fix the code's most egregious bugs and begin refactoring

{% include image.html file="cover.jpg" alt="Beavers stabilizing shaky house" max_width="800px" img_link=true %}

# Running it in continuous integration

At the end of part one, I created a Docker container that would allow the library to run on any system. I should run it in a continuous integration solution.

Travis offers a free continuous integration builds for open source projects, and it supports Docker. All I had to do was add a Dockerfile and a Travis configuration file:

{% include files.html title="travis.yml" language="yml" %}

It [built](https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/362818282)!

{% include image.html file="first-travis-build.png" class="img-border" alt="Screenshot of first successful build on Travis CI" max_width="800px" %}

# Designing an end-to-end test

Now that I had it running under CI, but it was just building the Docker image to satisfy the library's requirements. To get enough confidence to start changing the library, I needed a test that would exercise the library's functionality thoroughly.

The [roundtrip.sh](https://github.com/NYTimes/ingredient-phrase-tagger/blob/e414c2ca279f23c99c8338ceba00653d88d40dfe/roundtrip.sh) script in the original repo looked like a good place to start. At that point, I didn't understand everything it was doing, but it looked like it was thoroughly exercising the library's functionality.

Earlier, I showed that at the end of the script, it produced summary statistics about the model's performance:

```text
Sentence-Level Stats:
        correct:  1487
        total:  1999
        % correct:  74.3871935968

Word-Level Stats:
        correct: 10391
        total: 11450
        % correct: 90.7510917031
```

It also wrote output files to the `tmp/` subdirectory:

```bash
$ file tmp/*
tmp/model_file:  data
tmp/output.html: HTML document, ASCII text, with very long lines
tmp/test_file:   ASCII text
tmp/test_output: ASCII text
tmp/train_file:  ASCII text
```

These outputs provided a good foundation for the end-to-end test. I decided to capture the output from a successful, save that as the gold standard, then compare all future runs against my golden copy with a simple plaintext `diff`.

# The art of diffing

I knew I wanted the test to compare output to a golden output, but "compare" is a bit hand-wavey. The naive approach would be to just run the `diff` utility to compare the current output with the golden output. But if it's a binary file, that doesn't work so well.

Working backwards, the summary statistics were very easy to compare. I could save the output and just `diff` against my known good stats. If I broke anything and caused the stats to change,  I'd see it in the output like this:

```diff
-        % correct:  74.3871935968
+        % correct:  61.2567665312
```

That was pretty easy. I modified the 

```bash
python bin/evaluate.py tmp/test_output > tmp/eval_output
diff tests/golden/eval_output tmp/eval_output
```

That alone would be a decent end-to-end test, but it has the weakness that it doesn't show which part broke. The end-to-end process is actually a multi-stage pipeline that involves reading the input CSV, training a model, testing a model, and producing summary statistics. If I broke something in the first stage of the pipeline, I'd want my end-to-end test to point me to that stage.

I applied a similar strategy to the other output files. `test_file`, `test_output`, and `train_file` were all plaintext files that looked a bit like this:

```bash
$  head -n 16 tmp/test_file
1       I1      L12     NoCAP   NoPAREN B-QTY
boneless        I2      L12     NoCAP   NoPAREN I-COMMENT
pork    I3      L12     NoCAP   NoPAREN B-NAME
tenderloin      I4      L12     NoCAP   NoPAREN I-NAME
,       I5      L12     NoCAP   NoPAREN B-COMMENT
about   I6      L12     NoCAP   NoPAREN I-COMMENT
1       I7      L12     NoCAP   NoPAREN B-QTY
pound   I8      L12     NoCAP   NoPAREN I-COMMENT

Salt    I1      L8      YesCAP  NoPAREN B-NAME
and     I2      L8      NoCAP   NoPAREN I-NAME
freshly I3      L8      NoCAP   NoPAREN B-COMMENT
ground  I4      L8      NoCAP   NoPAREN I-COMMENT
black   I5      L8      NoCAP   NoPAREN B-NAME
pepper  I6      L8      NoCAP   NoPAREN I-NAME
```

I didn't understand the file format yet, but I didn't have to. All I had to do was add a way to detect when my changes to the Python code caused these outputs to change.

Most of the output was just plaintext. `model_file` was an exception because it was a binary file, which wouldn't be so interesting to `diff`. But that was okay because I didn't need to `diff` it directly. If something changed in the model, I would hopefully see it in the `test_file` or `test_output` because those both depended on the model.

# Creating an end-to-end test

I wrote an [e2e script](https://github.com/mtlynch/ingredient-phrase-tagger/blob/a4cde8d26e21f345e5291093110a4fb246195619/test_e2e) that performed the same steps as `roundtrip.sh`, but at the end, it compared the output to the "known good" output (the output from above):

{% include files.html title="build.sh" language="bash" %}

Note that two outputs are missing from my diffs the binary model file and the generated HTML. I excluded the model file because it's binary data, so it doesn't produce interesting diff output. I do want to know when it changes, but I skipped diffing it directly because I assumed that if I caused it to change, I'd so effects of those changes in the data that the subsequent pipeline stages generate using the model.

I also ignored the generated HTML. I decided that the output visualization script was extraneous to the library and I planned to delete it, so it wasn't worth getting under test.

# Works on my machine, not in Travis

I ran this build script on my local machine several times, and it passed each time. Then I ran it on Travis, and [it failed](https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/408775714).

The build failed, which was obviously bad. But the end-to-end tests caught something, which was very good.

The whole point of a Docker container is that the program should behave the same anywhere, so how could I run the same container in two places and get different outputs?

Was CRF++ non-deterministic? No, that couldn't be because I could run the end-to-end test on my local machine and see consistent results. I could also see consistent results if I restarted the Travis build. So Travis and my local machine were both internally consistent across executions, but were inconsisntent between one another.

I didn't like where this was pointing. It suggested that CRF++'s behavior depended on the hardware infrastructure. Maybe an Intel CPU yielded different results than an AMD CPU. That would be a big pain because Travis doesn't guarantee anything about its hardware environment. Furthermore, if results are different on different hardware, it defeats the purpose of a Docker container.

In desperation, I checked CRF++'s command-line documentation to look for anything that might hint about CPU-dependencies:

```text
$ crf_learn --help
CRF++: Yet Another CRF Tool Kit
Copyright (C) 2005-2013 Taku Kudo, All rights reserved.

Usage: crf_learn [options] files
 -f, --freq=INT              use features that occuer no less than INT(default 1)
 -m, --maxiter=INT           set INT for max iterations in LBFGS routine(default 10k)
 -c, --cost=FLOAT            set FLOAT for cost parameter(default 1.0)
 -e, --eta=FLOAT             set FLOAT for termination criterion(default 0.0001)
 -C, --convert               convert text model to binary model
 -t, --textmodel             build also text model file for debugging
 -a, --algorithm=(CRF|MIRA)  select training algorithm
 -p, --thread=INT            number of threads (default auto-detect)
 -H, --shrinking-size=INT    set INT for number of iterations variable needs to  be optimal before considered for shrinking. (default 20)
 -v, --version               show the version and exit
 -h, --help                  show this help and exit
```

The `--thread` parameter looked interesting. I checked the [full documentation](https://taku910.github.io/crfpp/) for more details:

>-p NUM:
>
>If the PC has multiple CPUs, you can make the training faster by using multi-threading. NUM is the number of threads.

Interesting! My local machine probably had a different number of CPU cores available than Travis. I checked the CRF++ output on my local machine:

```text
Number of thread(s): 4
```

And then I checked the same output line on Travis

```text
Number of thread(s): 2
```

Ah ha!

Because I left the `--thread` flag unspecified, CRF++ set it automatically based on the number of CPU cores available. On Travis, there were 2 cores, and my local machine had 4.

I tweaked my `build.sh` script to set the thread count explicitly:

```diff
-crf_learn template_file "$ACTUAL_CRF_TRAINING_FILE" "$ACTUAL_CRF_MODEL_FILE"
+crf_learn \
+  --thread=2 \
+  template_file "$ACTUAL_CRF_TRAINING_FILE" "$ACTUAL_CRF_MODEL_FILE"
```

Then I saved the output files to `tests/golden` as the [new expected end-to-end output](https://github.com/mtlynch/ingredient-phrase-tagger/commit/c1cad53a4d661d86dc4842aff6e5bac36723d4e7). I pushed my changes to Github and was greeted with a pleasant sight: [my end-to-end tests passed](https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/408786692):

{% include image.html file="e2e-fix.png" alt="Success after fixing end-to-end test" max_width="800px" img_link=true class="img-border" %}

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

# Speeding up the build

Adding the build tools should have been simple, but one thing was getting in my way. Each build took almost 20 minutes:

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



---

*Cover illustration by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). My fork of the ingredient-phrase-tagger library is available on [Github](https://github.com/mtlynch/ingredient-phrase-tagger). I offer a managed service based on this library called [Zestful](https://zestfuldata.com).*