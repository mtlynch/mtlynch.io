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

# Adding an end-to-end test

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

It also produced output files in the `tmp/` directory:

```bash
$ file tmp/*
tmp/model_file:  data
tmp/output.html: HTML document, ASCII text, with very long lines
tmp/test_file:   ASCII text
tmp/test_output: ASCII text
tmp/train_file:  ASCII text
```

That was good. I had output files to compare against. `test_output` was just the same performance statistics that `roundtrip.sh` printed to the console.

`test_file` and `train_file` 

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

That looked like 

{% include files.html title="build.sh" language="bash" %}

I wrote an [e2e script](https://github.com/mtlynch/ingredient-phrase-tagger/blob/a4cde8d26e21f345e5291093110a4fb246195619/test_e2e) that performed the same steps as `roundtrip.sh`, but at the end, it compared the output to the "known good" output (the output from above):

I ran this build script on my local machine several times, and it passed each time. Then I ran it on Travis and it failed:

https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/408775714

The build failed, which was obviously bad. But the end-to-end tests caught something, which was very good.

The whole point of a Docker container is that the program should be hermetically contained and behave the same anywhere.

Was CRF++ non-deterministic? No, that couldn't be because I could run the end-to-end test on my local machine and see consistent results. I could also see consistent results if I restarted the Travis build. So Travis and my local machine were both internally consistent across executions, but were inconsisntent between one another.

I didn't like where this was pointing. It suggested that CRF++'s behavior depended on the hardware infrastructure. Maybe an Intel CPU yields different results than an AMD CPU. That would be a big pain because Travis doesn't guarantee anything about the hardware that it builds on. Furthermore, if results are different on different hardware, it defeats the purpose of a Docker container.


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

The `--thread` parameter looked interesting. I checked 

```text
Number of thread(s): 2
```

And then I checked the output from my local machine:

```text
Number of thread(s): 4
```

Ah ha! CRF++ produced different output depending on the number of threads.

Because I left the `--thread` flag unspecified, CRF++ set it automatically based on the number of CPU cores available. On Travis, there were 2 cores, and my local machine had 4.

I tweaked my `build.sh` script to set the thread count explicitly:

```diff
-crf_learn template_file "$ACTUAL_CRF_TRAINING_FILE" "$ACTUAL_CRF_MODEL_FILE"
+crf_learn \
+  --thread=2 \
+  template_file "$ACTUAL_CRF_TRAINING_FILE" "$ACTUAL_CRF_MODEL_FILE"
```

Then I saved the output files to `tests/golden` as the [new expected end-to-end output](https://github.com/mtlynch/ingredient-phrase-tagger/commit/c1cad53a4d661d86dc4842aff6e5bac36723d4e7).

{% include image.html file="e2e-fix.png" alt="Success after fixing end-to-end test" max_width="800px" img_link=true class="img-border" %}

https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/408786692

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

# Enforcing whitespace conventions

YAPF - [#11](https://github.com/mtlynch/ingredient-phrase-tagger/pull/11)

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