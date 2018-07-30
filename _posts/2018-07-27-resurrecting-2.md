---
title: 'Resurrecting a Dead Library: Part Two - Scaffolding'
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

pyflakes - [#12](https://github.com/mtlynch/ingredient-phrase-tagger/pull/12/files)

# Speeding up the build
{% include image.html file="build-time.png" alt="Travis screenshot showing 20 minute build time" max_width="800px" img_link=true class="img-border" %}
# Trimming a heavy dependency


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

---

*Cover illustration by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). My fork of the ingredient-phrase-tagger library is available on [Github](https://github.com/mtlynch/ingredient-phrase-tagger). I offer a managed service based on this library called [Zestful](https://zestfuldata.com).*