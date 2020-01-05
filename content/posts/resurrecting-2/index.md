---
title: 'Resurrecting a Dead Library: Part Two - Stabilization'
tags:
- zestful
- docker
- testing
- ingredient-phrase-tagger
- ingredient parsing
description: Using Docker to get a legacy library under test in continuous integration
discuss_urls:
  hacker_news: https://news.ycombinator.com/item?id=17698145
  reddit: https://www.reddit.com/r/programming/comments/95219m/resurrecting_a_dead_library_stabilization/
date: '2018-08-06'
images:
- resurrecting-2/cover.jpg
---

In this post, I demonstrate how to retrofit automated tests onto an untested legacy library.

This is part two of a three-part series about how I resurrected [ingredient-phrase-tagger](https://github.com/NYTimes/ingredient-phrase-tagger), a library that uses machine learning to parse cooking ingredients (e.g., "2 cups milk") into structured data. Read [part one](/resurrecting-1/) for the full context, but the short version is that I discovered an abandoned library and brought it back to life so that it could power my SaaS business:

* [Part One: Resuscitation](/resurrecting-1/) - In which I nurse the code back to health so that it runs on any modern system
* **Part Two: Stabilization (this post)** - In which I prevent functionality from regressing while I restore the code
* [Part Three: Rehabilitation](/resurrecting-3/) - In which I begin refactoring the code

{{< img src="cover.jpg" alt="Beavers stabilizing shaky house" maxWidth="800px" >}}

## Running it in continuous integration

At the end of part one, I created a Docker image that allowed the library to run on any system. The next step was to run the library in continuous integration.

{{< img src="travis-ci-logo.png" alt="Travis CI logo" maxWidth="300px" align="right" linkUrl="https://travis-ci.org/" >}}

Continuous integration is the practice of using an indepedent, controlled environment to test software on each change to the code. My preferred continuous integration solution is [Travis](https://travis-ci.org). Their configuration files are intuitive, and they offer unlimited free builds for open-source projects.

To integrate with Travis, I added [my fork of ingredient-phrase-tagger](https://github.com/mtlynch/ingredient-phrase-tagger) on Travis' configuration page and then enabled builds:

{{< img src="enable-travis.png" alt="Screenshot of enabling Travis" caption="Enabling Travis builds for ingredient-phrase-tagger library" maxWidth="677px" hasBorder="True" >}}

Then, I created a file called `.travis.yml`, which told Travis how to build the library:

{{< inline-file filename="travis.yml" language="yml" >}}

I pushed my commit to Github, created a [pull request](https://github.com/mtlynch/ingredient-phrase-tagger/pull/4), and Travis [built it](https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/362818282) successfully:

{{< img src="first-travis-build.png" alt="Screenshot of first successful build on Travis CI" caption="First successful build on Travis" maxWidth="792px" hasBorder="True" >}}

## Adding an end-to-end test

Travis was building my Docker image, but the build wasn't meaningful yet. It only built the library's dependencies &mdash; it didn't exercise any of its behavior. I wanted a build that could alert me when I broke the library's functionality. To do that, I needed an end-to-end test.

An end-to-end test verifies that a complete, real-world scenario works as expected. It generally matches the following structure:

1. Supply pre-generated input and its expected output (also known as the "golden output").
1. Use automation tools to feed the input to the library.
1. Compare the library's output to the golden output.

The original repository contained a script called [roundtrip.sh](https://github.com/NYTimes/ingredient-phrase-tagger/blob/e414c2ca279f23c99c8338ceba00653d88d40dfe/roundtrip.sh) that resembled an end-to-end test. It provided pre-generated input to the library, used a portion of the input to train a new machine learning model, then used that model to parse other portions of the input. The only piece missing was that it never compared results to a known-good output.

## A basic end-to-end test

In [part one](/resurrecting-1/), I showed that the `roundtrip.sh` script's final result was a set of summary statistics about the model's performance:

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

That gave me enough for a simple end-to-end test. I re-ran the final step of the `roundtrip.sh` script, but redirected the console output to a new file called `tests/golden/eval_output` and added it to source control:

```bash
python bin/evaluate.py tmp/test_output > tests/golden/eval_output
```

Now that I had known-good output, I modified the end of `roundtrip.sh` so that it would compare all future outputs against this saved output:

```bash
python bin/evaluate.py tmp/test_output > tmp/eval_output
diff tests/golden/eval_output tmp/eval_output
```

## Does my test know when code breaks?

An end-to-end test is only useful if it catches bugs, so my next step was to simulate a breaking change and check if my end-to-end test caught it.

In [cli.py](https://github.com/NYTimes/ingredient-phrase-tagger/blob/e414c2ca279f23c99c8338ceba00653d88d40dfe/ingredient_phrase_tagger/training/cli.py#L57), there was a regular expression that matched sequences of numbers (e.g., `"83625"`):

```python
m3 = re.match('^\d+$', ss)
```

As an experiment, I tweaked the regular expression so that it would fail to recognize any number that included a 9:

```python
m3 = re.match('^[0-8]+$', ss)
```

I then re-ran my modified `roundtrip.sh` script:

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

It worked!

When I told the code that 9 was no longer considered a number, the library's accuracy fell, and the script terminated with a failing exit code.

{{<zestful-ad>}}

## Expanding the end-to-end test

The basic end-to-end test above was useful, but `roundtrip.sh` executes a data pipeline with several stages. It would be convenient to know which particular stage broke, so I looked for more outputs to include in the end-to-end test.

In addition to printing output to the console, the script also wrote files to a subdirectory called `tmp/`:

```bash
$ file tmp/*
tmp/model_file:  data
tmp/output.html: HTML document, ASCII text, with very long lines
tmp/test_file:   ASCII text
tmp/test_output: ASCII text
tmp/train_file:  ASCII text
```

`test_file`, `test_output`, and `train_file` were all plaintext files that looked a bit like this:

```bash
$ head -n 16 tmp/test_file
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

I didn't understand the file format yet, but I didn't have to. All I needed was a way to detect when the files changed.

After copying these files to `tests/golden`, I saved them to source control as additional golden outputs. Then, I added `diff`s to my build script to detect when these output files changed.

{{<zestful-ad>}}

## The complete build script

After all my modifications to `roundtrip.sh`, I saved it as a new file called `build.sh`, which looked like this:

{{< inline-file filename="build.sh" language="bash" >}}

I then added a simple wrapper around that script called `docker_build` that ran the end-to-end test within the library's custom Docker container:

{{< inline-file filename="docker_build" language="bash" >}}

With the `docker_build` script, my end-to-end test could run on any system that supported Docker. Naturally, I wanted to run it in my continuous integration environment.

## Running my end-to-end tests in continuous integration

My earlier Travis configuration built the Docker image but didn't exercise the library. Now that I had a thorough test script, I updated my `.travis.yml` file to run it:

```diff
sudo: required
services: docker
-script: docker build .
+script: ./docker_build
```

I [pushed my changes](https://github.com/mtlynch/ingredient-phrase-tagger/pull/47/commits/5876e039a6e5dd36373c94bd793c83d7457034a6), ready to witness the splendor of my brilliant test that could run consistently anywhere. Instead, it failed:

{{< img src="e2e-failing.png" alt="End-to-end test failing on Travis" caption="End-to-end test fails on Travis after passing on my local machine" maxWidth="800px" hasBorder="True" >}}

I wasn't happy to see a build break, but I was glad that my end-to-end test caught something. I just had to figure out what it was.

## Debugging the discrepancy

The whole point of a Docker container is that the program should behave the same anywhere, so how could I run the same container in two places and see different outputs?

The [Travis build log](https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/408775714) showed that the test failed on the diff of the `testing_output` file:

```diff
+ diff --context=2 tests/golden/testing_output /tmp/tmp.W5S3C5T4if/testing_output
*** tests/golden/testing_output  Fri Jul 27 02:44:20 2018
--- /tmp/tmp.W5S3C5T4if/testing_output  Fri Jul 27 03:03:56 2018
***************
*** 173,178 ****
  1  I1  L8  NoCAP  NoPAREN  B-QTY  B-QTY
  tablespoon  I2  L8  NoCAP  NoPAREN  B-UNIT  B-UNIT
! dark  I3  L8  NoCAP  NoPAREN  B-COMMENT  B-COMMENT
! corn  I4  L8  NoCAP  NoPAREN  B-NAME  B-NAME
  syrup  I5  L8  NoCAP  NoPAREN  I-NAME  I-NAME

--- 173,178 ----
  1  I1  L8  NoCAP  NoPAREN  B-QTY  B-QTY
  tablespoon  I2  L8  NoCAP  NoPAREN  B-UNIT  B-UNIT
! dark  I3  L8  NoCAP  NoPAREN  B-COMMENT  B-NAME
! corn  I4  L8  NoCAP  NoPAREN  B-NAME  I-NAME
  syrup  I5  L8  NoCAP  NoPAREN  I-NAME  I-NAME
```

The `testing_output` file was the result of these two lines in my `build.sh` script:

```bash
crf_learn \
  template_file "$ACTUAL_CRF_TRAINING_FILE" "$ACTUAL_CRF_MODEL_FILE"

crf_test \
  -m "$ACTUAL_CRF_MODEL_FILE" \
  "$ACTUAL_CRF_TESTING_FILE" > "$ACTUAL_TESTING_OUTPUT_FILE"
```

`crf_learn` and `crf_test` were both command-line utilities for [CRF++](https://taku910.github.io/crfpp/), the engine that powered ingredient-phrase-tagger's machine learning logic. Without knowing much about these utilities, I could deduce from the syntax that `crf_learn` created a machine learning model and `crf_test` used that model to classify data.

The end-to-end test had verified that the contents of `$ACTUAL_CRF_TRAINING_FILE` and `$ACTUAL_CRF_TESTING_FILE` matched my golden versions. This meant that `crf_learn` and `crf_test` took in inputs that were identical on my local system as well as in continuous integration, but they produced different outputs depending on the environment.

## A deeper dive into CRF++

Was CRF++ non-deterministic? I tried running the test again locally. It passed. I re-ran the test on Travis, and it failed in the same way. This told me that CRF++ was consistent across executions in the same environment, but was inconsistent across environments.

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

This sounded promising.

I compared the CRF++ output on Travis to the same output lines in my local environment:

{{< img src="thread-delta.png" alt="Difference in crf_learn thread count between local machine and Travis" caption="crf_learn runs with two threads on Travis, but eight in my local environment" maxWidth="800px" >}}

Ah ha!

Because I omitted the `--thread` flag, CRF++ set it automatically based on the number of CPU cores available. My Travis environment had two CPU cores, while my local machine had eight.

I tweaked my `build.sh` script to set the thread count explicitly:

```diff
-crf_learn template_file "$ACTUAL_CRF_TRAINING_FILE" "$ACTUAL_CRF_MODEL_FILE"
+crf_learn \
+  --thread=2 \
+  template_file "$ACTUAL_CRF_TRAINING_FILE" "$ACTUAL_CRF_MODEL_FILE"
```

Then, I saved the newly generated output files as my golden copies. I pushed [the changes](https://github.com/mtlynch/ingredient-phrase-tagger/commit/c1cad53a4d661d86dc4842aff6e5bac36723d4e7) to Github and was greeted with a pleasant sight: [my end-to-end tests passed](https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/408786692):

{{< img src="e2e-fix.png" alt="Success after fixing end-to-end test" caption="End-to-end test passing on Travis" maxWidth="800px" hasBorder="True" >}}

## The value of good tests

The end-to-end test proved its value very quickly. While it was tedious to dive into the documentation for one of the library's dependencies, the test exposed that the library produced inconsistent results depending on its environment. This is something the library's original authors likely never realized.

With the end-to-end test in place and continuous integration running, I had an authoritative environment that demonstrated the library's expected functionality. The test provided a valuable safeguard in case I made any changes that unintentionally changed the library's behavior.

## What's next?

With the confidence from my test, it was time for my favorite part of a software project: refactoring. I was free to make large-scale changes to the code because I knew the build would break loudly if I did anything too stupid.

Read on for [part three](/resurrecting-3/)  of this series, where I describe how I:

* added unit tests
* applied style conventions to the code automatically
* integrated static analysis into the build

{{<zestful-ad>}}

---

*Cover illustration by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). My fork of the ingredient-phrase-tagger library is available on [Github](https://github.com/mtlynch/ingredient-phrase-tagger). I offer a managed service based on this library called [Zestful](https://zestfuldata.com).*