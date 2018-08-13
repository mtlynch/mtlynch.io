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
- zestful
- refactoring
- docker
- testing
- ingredient-phrase-tagger
- ingredient parsing
header:
  og_image: images/resurrecting-2/cover.jpg
  teaser: images/resurrecting-2/cover.jpg
---

In this post, I will demonstrate how to use Docker to retrofit tests onto a library that was built without any tests at all.

This is part two of a three-part series about how I resurrected the [ingredient-phrase-tagger](https://github.com/NYTimes/ingredient-phrase-tagger) repository. It's a library that uses machine learning to parse raw recipe ingredients (e.g., "2 cups milk") into structured data. The library was an experimental project that its maintainers abandoned two years ago, but I wanted to turn it into a production-grade code.

This series describes how I resurrected the library and built a business with the result:

* [Part One: Resuscitation](/resurrecting-1/) - In which I nurse the code back to health so that it runs on any modern system
* **Part Two: Stabilization (this post)** - In which I prevent functionality from regressing while I restore the code
* Part Three: Rehabilitation (coming soon) - In which I fix the code's most egregious bugs and begin refactoring

{% include image.html file="cover.jpg" alt="Beavers stabilizing shaky house" max_width="800px" img_link=true %}

# Running it in continuous integration

At the end of part one, I created a Docker container that allowed the library to run on any system. The place I wanted to run it most was in continuous integration.

Continuous integration is a controlled environment that tests source code on each change. At the end of part one, I created a Docker container. If it can run anywhere, it should run in a continuous integration system, so I decided to do just that.

{% include image.html file="travis-ci-logo.png" class="align-right" alt="Travis CI logo" max_width="300px" link_url="https://travis-ci.org/" %}

My preferred continuous integration solution is [Travis](https://travis-ci.org). Their configuration files are simple and intuitive, and they offer unlimited free builds for open-source projects.

To get Travis to start building, I just added my fork of ingredient-phrase-tagger to Travis:

{% include image.html file="enable-travis.png" class="img-border" alt="Screensthot of enabling Travis" fig_caption="Enabling Travis builds for ingredient-phrase-tagger library" max_width="677px" %}

Then I added a file called `.travis.yml`, which Travis needs to understand how to build the library:

{% include files.html title="travis.yml" language="yml" %}

I pushed my commit to Github, created a [pull request](https://github.com/mtlynch/ingredient-phrase-tagger/pull/4), and Travis [built it](https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/362818282) successfully:

{% include image.html file="first-travis-build.png" class="img-border" alt="Screenshot of first successful build on Travis CI" fig_caption="First successful build on Travis" max_width="792px" %}

# Adding an end-to-end test

It was great that Travis could build my Docker container, but the build wasn't meaningful. It only built the library's dependencies &mdash; it didn't exercise any of the library's functionality. I wanted a build that told me if I broke the library's functionality. To do that, I needed an end-to-end test.

The [roundtrip.sh](https://github.com/NYTimes/ingredient-phrase-tagger/blob/e414c2ca279f23c99c8338ceba00653d88d40dfe/roundtrip.sh) script in the original repo looked like a good place to start. I didn't understand everything it was doing, but I could see from the output that it exercised the library heavily.

# Creating golden output

An end-to-end test typically involves comparison to a "golden output": the output that the developer has verified as correct for the given input.

1. Feed 

Not all outputs are useful to validate. For example, the `roundtrip.sh` prints the time it took to train a model. Since I only cared about preserving functionality, it didn't matter that much to me if this process took 401.2 seconds or 399.8 seconds, so I needed to separate the meaningful outputs from the noise.

# A very basic end-to-end test

In part one, I showed that the `roundtrip.sh` script ultimately produced summary statistics about the model's performance:

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

That gave me enough for a simple end-to-end test. I re-ran the final step of the script, but redirected the console output to a file called `tests/golden/eval_output`:

```bash
python bin/evaluate.py tmp/test_output > tests/golden/eval_output
```

Now that I had known-good output, I had a 


That was pretty easy. I modified the end of `roundtrip.sh` to write 

```bash
python bin/evaluate.py tmp/test_output > tmp/eval_output
diff tests/golden/eval_output tmp/eval_output
```

Now, let me try simulating a breaking change to see if the end-to-end test catches it. In [cli.py](https://github.com/NYTimes/ingredient-phrase-tagger/blob/e414c2ca279f23c99c8338ceba00653d88d40dfe/ingredient_phrase_tagger/training/cli.py#L57), there's a line with a regular expression to match sequences of numbers (e.g. `"834"`):

```python
m3 = re.match('^\d+$', ss)
```

Then I fiddled with it so that it fails to recognize `9` as a number:

```python
m3 = re.match('^[0-8]+$', ss)
```

When I ran my modified `roundtrip.sh` script, it successfully identified that the results had deviated from their expected output:

```diff
3c3
<       correct:  1487
---
>       correct:  1486
5c5
<       % correct:  74.3871935968
---
>       % correct:  74.33716858429
```

It worked! When I told the code that `9` was no longer considered a number, the library's accuracy fell.

# Expanding the end-to-end test

The basic end-to-end test above was good, but `roundtrip.sh` consists of many separate stages. It would be convenient to know which particular stage broke, so I looked for more outputs to diff.

In addition to printing output to the console, the script also wrote files to a subdirectory called `tmp/`:

```bash
$ file tmp/*
tmp/model_file:  data
tmp/output.html: HTML document, ASCII text, with very long lines
tmp/test_file:   ASCII text
tmp/test_output: ASCII text
tmp/train_file:  ASCII text
```

`model_file` was just binary data. It would be good to know when it changed, but it wouldn't be useful to diff because it was just an opaque binary blob. I decided to ignore it in my end-to-end tests because breaking changes to the model should manifest in later stages of the pipeline when the script uses the model.

`output.html` wasn't that interesting.

These outputs provided a good foundation for the end-to-end test. I decided to capture the output from a successful, save that as the gold standard, then compare all future runs against my golden copy with a simple plaintext `diff`.

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

Note that two outputs are missing from my diffs the binary model file and the generated HTML.

I excluded the model file because it's binary data, so it doesn't produce interesting diff output. I do want to know when it changes, but I skipped diffing it directly because I assumed that if I caused it to change, I'd so effects of those changes in the data that the subsequent pipeline stages generate using the model.

I also ignored the generated HTML. I decided that the output visualization script was extraneous to the library and I planned to delete it, so it wasn't worth getting under test.

{% include ads.html title="zestful" %}

# The complete build script

After I modified `roundtrip.sh` to convert it to an end-to-end test called `build.sh`, which looked like this:

{% include files.html title="build.sh" language="bash" %}

I then added a simple wrapper around that script called `docker_build` that ran the end-to-end test within the library's custom Docker container:

```bash
#!/bin/bash

# Exit on first failing command.
set -e
# Echo commands to console.
set -x

IMAGE_NAME="ingredient-phrase-tagger-image"
CONTAINER_NAME="ingredient-phrase-tagger-container"

docker build \
  --tag "$IMAGE_NAME" \
  .

docker run \
  --tty \
  --detach \
  --name "$CONTAINER_NAME" \
  "$IMAGE_NAME"

docker exec "$CONTAINER_NAME" ./build.sh
```

The `docker_build` made it possible for anyone to verify the library's correctness regardless of their development environment. The obvious next step was configuring my continuous integration setup to run these tests on every pull request into the source repository.

# Running my end-to-end tests in continuous integration

My earlier Travis configuration built the Docker container, but didn't exercise the library at all. I updated my `.travis.yml` file to run my `docker_build` script instead:

```diff
-script: docker build .
+script: ./docker_build
```

I [pushed my changes](https://github.com/mtlynch/ingredient-phrase-tagger/pull/47/commits/5876e039a6e5dd36373c94bd793c83d7457034a6), and the Travis build promptly failed:

{% include image.html file="e2e-failing.png" alt="End-to-end test failing on Travis" max_width="800px" img_link=true class="img-border" fig_caption="End-to-end passes locally, but fails on Travis" %}

The build failure was bad, but the upside was that my end-to-end tests caught something. Now, I just had to figure out what it was.

# Debugging the discrepancy

The whole point of a Docker container is that the program should behave the same anywhere, so how could I run the same container in two places and get different outputs?

I read the [Travis build log](https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/408775714) and found that it was failing on the diff of the `testing_output` file:

```diff
+ diff --context=2 tests/golden/testing_output /tmp/tmp.W5S3C5T4if/testing_output
*** tests/golden/testing_output	Fri Jul 27 02:44:20 2018
--- /tmp/tmp.W5S3C5T4if/testing_output	Fri Jul 27 03:03:56 2018
***************
*** 173,178 ****
  1	I1	L8	NoCAP	NoPAREN	B-QTY	B-QTY
  tablespoon	I2	L8	NoCAP	NoPAREN	B-UNIT	B-UNIT
! dark	I3	L8	NoCAP	NoPAREN	B-COMMENT	B-COMMENT
! corn	I4	L8	NoCAP	NoPAREN	B-NAME	B-NAME
  syrup	I5	L8	NoCAP	NoPAREN	I-NAME	I-NAME
  
--- 173,178 ----
  1	I1	L8	NoCAP	NoPAREN	B-QTY	B-QTY
  tablespoon	I2	L8	NoCAP	NoPAREN	B-UNIT	B-UNIT
! dark	I3	L8	NoCAP	NoPAREN	B-COMMENT	B-NAME
! corn	I4	L8	NoCAP	NoPAREN	B-NAME	I-NAME
  syrup	I5	L8	NoCAP	NoPAREN	I-NAME	I-NAME
```

The `testing_output` file was the result of these two lines in my `build.sh` script:

```bash
crf_learn \
  template_file "$ACTUAL_CRF_TRAINING_FILE" "$ACTUAL_CRF_MODEL_FILE"

crf_test \
  -m "$ACTUAL_CRF_MODEL_FILE" \
  "$ACTUAL_CRF_TESTING_FILE" > "$ACTUAL_TESTING_OUTPUT_FILE"
```

`crf_learn` and `crf_test` were both command-line utilities for [CRF++](https://taku910.github.io/crfpp/), the engine that powered ingredient-phrase-tagger's machine learning work. Without knowing much about these utilities, I could deduce from the syntax that `crf_learn` created a machine learning model and `crf_test` used that model to classify data.

The end-to-end test had verified that the contents of `$ACTUAL_CRF_TRAINING_FILE` and `$ACTUAL_CRF_TESTING_FILE` matched the golden copies. This meant that `crf_learn` and `crf_test` took in exactly the same inputs, but produced different outputs depending on if I ran the tests locally or in a continuous integration environment.

# A deeper dive into CRF++

Was CRF++ non-deterministic? No, that couldn't be because I saw consistent results when I ran the end-to-end test multiple times on my local machine. When I re-ran the Travis build, it failed in the exact same way. This told me that CRF++ was consistent across executions in the same environment, but not across different environments.

I didn't like where this was pointing. It suggested that CRF++'s behavior depended on the system's underlying hardware. Maybe an Intel CPU yielded different results than an AMD CPU. That would be a pain because Travis doesn't guarantee anything about its hardware environment. Furthermore, if different hardware yielded different results, that would defeat the purpose of a Docker container.

In desperation, I checked CRF++'s command-line documentation to look for anything that might hint about hardware dependencies:

```text
$ crf_learn --help
...
 -p, --thread=INT            number of threads (default auto-detect)
```

The `--thread` flag looked interesting. I checked the [full documentation](https://taku910.github.io/crfpp/) for more details:

>-p NUM:
>
>If the PC has multiple CPUs, you can make the training faster by using multi-threading. NUM is the number of threads.

This sounded promising...

I compared the CRF++ output on Travis to my local environment:

{% include image.html file="thread-delta.png" alt="Difference in crf_learn thread count between local machine and Travis" max_width="800px" img_link=true fig_caption="crf_learn runs with two threads on Travis, but eight in my local environment" %}

Ah ha!

Because I left the `--thread` flag unspecified, CRF++ set it automatically based on the number of CPU cores available. My Travis environment had two CPU cores available, while my local machine had eight.

I tweaked my `build.sh` script to set the thread count explicitly:

```diff
-crf_learn template_file "$ACTUAL_CRF_TRAINING_FILE" "$ACTUAL_CRF_MODEL_FILE"
+crf_learn \
+  --thread=2 \
+  template_file "$ACTUAL_CRF_TRAINING_FILE" "$ACTUAL_CRF_MODEL_FILE"
```

Then, I saved the output files to `tests/golden` as the [new expected end-to-end output](https://github.com/mtlynch/ingredient-phrase-tagger/commit/c1cad53a4d661d86dc4842aff6e5bac36723d4e7). I pushed my changes to Github and was greeted with a pleasant sight: [my end-to-end tests passed](https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/408786692):

{% include image.html file="e2e-fix.png" alt="Success after fixing end-to-end test" max_width="800px" img_link=true class="img-border" fig_caption="End-to-end passing on Travis" %}

# Now for the fun part

I now had an end-to-end test that told me if I broke any of the library's behavior. This meant that it was time for my favorite part of a software project: refactoring.

With the confidence from my tests, I could begin making large scale changes to the code without low probability of introducing regressions.

Stay tuned for **part three** of this series, where I will describe:

* Reducing the build time from 20 minutes to 90 seconds
* Enforcing code style conventions on the library
* Adding static analysis to the build

---

*Cover illustration by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). My fork of the ingredient-phrase-tagger library is available on [Github](https://github.com/mtlynch/ingredient-phrase-tagger). I offer a managed service based on this library called [Zestful](https://zestfuldata.com).*
