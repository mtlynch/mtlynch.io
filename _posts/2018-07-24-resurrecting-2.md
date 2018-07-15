---
title: "Resurrecting a Dead Library: Part Two - Scaffolding"
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

# Running it in continuous integration

Okay, now I could run it locally under Docker. I needed to build it on Travis:

{% include files.html title="Dockerfile" language="bash" %}

{% include files.html title=".travis.yml" language="yml" %}

It built!

https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/362818282?utm_source=github_status&utm_medium=notification

TODO: Show Travis screenshot.

# Adding an end-to-end test

Now that I had it running under CI, but it was just building. I wanted a test that would fail if I did anything to change the library's behavior.

The [roundtrip.sh](https://github.com/NYTimes/ingredient-phrase-tagger/blob/e414c2ca279f23c99c8338ceba00653d88d40dfe/roundtrip.sh) script in the original repo looked like a good place to start. At that point, I didn't understand everything it was doing, but it looked like it was thoroughly exercising the library's functionality.

Earlier, I showed that at the end of the script, it produces summary statistics about the model's performance:

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

That looked like 

I wrote an [e2e script](https://github.com/mtlynch/ingredient-phrase-tagger/blob/a4cde8d26e21f345e5291093110a4fb246195619/test_e2e) that performed the same steps as `roundtrip.sh`, but at the end, it compared the output to the "known good" output (the output from above):

```bash
EVAL_OUTPUT_FILE="$(mktemp -d)/eval_output"
python bin/evaluate.py "${OUTPUT_DIR}/testing_data.crf" > "$EVAL_OUTPUT_FILE"

GOLDEN_EVAL_OUTPUT_FILE="tests/golden/eval_output"
diff "$GOLDEN_EVAL_OUTPUT_FILE" "$EVAL_OUTPUT_FILE"
```

I ran this build script on my local machine several times, and it passed each time. Then I ran it on Travis and it failed:

```diff
+ diff tests/golden/eval_output /tmp/tmp.yVarTSxgRy/eval_output
3c3
<       correct:  1487
---
>       correct:  1482
5c5
<       % correct:  74.3871935968
---
>       % correct:  74.1370685342
8c8
<       correct: 10391
---
>       correct: 10326
10c10
<       % correct: 90.7510917031
---
>       % correct: 90.1834061135
```

The test was catching a change in behavior, which was good. But I was baffled because the test ran in a Docker container on both my local machine and on Travis. How could I be getting different results? The whole point of a Docker container is that the program should be hermetically contained and behave the same anywhere.

I needed to expand the test to produce more actionable information.

# Expanding the end-to-end test

The build script did have other intermediate outputs before the summary statistics. The build script trained and evaluated a machine learning model, but before it did that, it ran a script called `generate_data` that took in a raw CSV and produced output files that would later get fed into ML training.

The CSV just looked like a database dump of all of the NYT's data:

```bash
$ head -n 3 nyt-ingredients-snapshot-2015.csv
index,input,name,qty,range_end,unit,comment
0,"1 1/4 cups cooked and pureed fresh butternut squash, or 1 10-ounce package frozen squash, defrosted",butternut squash,1.25,0.0,cup,"cooked and pureed fresh, or 1 10-ounce package frozen squash, defrosted"
1,"1 cup peeled and cooked fresh chestnuts (about 20), or 1 cup canned, unsweetened chestnuts",chestnuts,1.0,0.0,cup,"peeled and cooked fresh (about 20), or 1 cup canned, unsweetened"
```

Fortunately, the output files were plaintext files as well. They all looked a bit like this:

```bash
$ head -n 16 /tmp/tmp.yVarTSxgRy/testing_data.crf
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

I didn't know what these files did yet. I knew they were related to training the model or evaluating its performance, but I didn't understand hat all the data meant.

I later discovered that this was due to the `--threads` flag in CRF++. It's automatically set to the number of CPUs available

# Add in my build tools

I have a standard set of dev tools I use for every Python project I work on:

* Coveralls
* YAPF
* pyflakes
* DocStringChecker

# Speeding up the build

# Trimming a heavy dependency

This was curious. Between my local Docker container and the one that runs on Travis, I get different results

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

