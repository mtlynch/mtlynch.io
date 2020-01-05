---
title: 'Resurrecting a Dead Library: Part Three - Rehabilitation'
tags:
- zestful
- refactoring
- ingredient-phrase-tagger
- ingredient parsing
- docker
- coveralls
- coverage
description: How I used safe techniques to refactor a legacy codebase and minimize
  the risk of regressions
date: '2018-08-20'
images:
- resurrecting-3/cover.jpg
---

I love refactoring. Nothing satisfies me more than untangling spaghetti code to reveal its underlying logic in a clear, intuitive way.

I've learned that refactoring requires diligence. In my younger and more reckless days, I would rush into a legacy codebase and tear apart the code without any concern for controlled changes. Inevitably, days or weeks later, I would discover that I broke the code by removing a subtle piece that seemed irrelevant but was, in fact, critical for an obscure scenario.

In this post, I'll show how to refactor with care. I'll explain the techniques I applied to refactor a real legacy Python library. It includes the development toolchain I used to minimize my errors and my process for adding unit tests to lock in existing behavior.

This is the final post in a three-part series about how I resurrected [ingredient-phrase-tagger](https://github.com/NYTimes/ingredient-phrase-tagger), a library that uses machine learning to parse cooking ingredients (e.g., "2 cups milk") into structured data. Read [part one](/resurrecting-1/) for the full context, but the short version is that I discovered an abandoned library and brought it back to life so that it could power my SaaS business:

* [Part One: Resuscitation](/resurrecting-1/) - In which I nurse the code back to health so that it runs on any modern system
* [Part Two: Stabilization](/resurrecting-2/) - In which I prevent functionality from regressing while I restore the code
* **Part Three: Rehabilitation (this post)** - In which I begin refactoring the code

{{< img src="cover.jpg" alt="Hermit crab being pulled from shell" maxWidth="800px" >}}

## Where are we?

In the previous two blog posts, I [created a custom Docker image](/resurrecting-1/#making-it-easier) so that I could use this library anywhere and [added an end-to-end test](/resurrecting-2/#the-complete-build-script) to preserve high-level behavior. Upon every change to the codebase, [Travis continuous integration](https://travis-ci.org/) built all dependencies and [executed the test in a controlled environment](/resurrecting-2/#running-it-in-continuous-integration).

Until this point, I hadn't modified the code itself. I only added tools and scripts on top of existing code to verify its behavior. Now that I had all the mechanisms in place to modify the code safely, I could finally begin refactoring.

## Enforcing whitespace conventions

Developers should never [waste mental energy on whitespace](/human-code-reviews-1/#let-computers-do-the-boring-parts). Whenever I start a new software project, I automate the whitespace formatting as early as possible.

For Python projects, I achieve this with [YAPF](https://github.com/google/yapf) (Yet Another Python Formatter). My first code change in this project was to reformat all files to match [Google's Python Style Guide](https://github.com/google/styleguide/blob/gh-pages/pyguide.md), my preferred standard:

```bash
yapf \
  --in-place \
  --recursive \
  --style google \
  ./ \
  --exclude="third_party/*" \
  --exclude="build/*"
```

This introduced significant code churn, but I was confident that this was a safe change because YAPF is a mature tool and my end-to-end test still passed.

I was careful to limit [my pull request](https://github.com/mtlynch/ingredient-phrase-tagger/pull/11) to *only* whitespace changes so as not to bury anything else in the noise and make the pull request difficult for other developers to review.

{{< img src="yapf-diff.png" alt="Diff from YAPF changes" caption="Diff after fixing whitespace with YAPF" maxWidth="700px" hasBorder="True" >}}

To ensure that future changes would adhere to the same style conventions, I added a new check to the build script:

```bash
yapf \
  --diff \
  --recursive \
  --style google \
  ./ \
  --exclude="third_party/*" \
  --exclude="build/*"
```

It's the same as the earlier command, but with a `--diff` flag instead of the `--in-place` flag.  If YAPF detects whitespace violations, it will print them out, then emit a failing exit code, causing the build script to terminate in failure.

## Adding static analysis

[pyflakes](https://github.com/PyCQA/pyflakes) is another handy component I always add to my Python toolchain. It uses static analysis to identify careless errors such as uninitialized variables or unused imports.

I [added it to my ingredient-phrase-tagger build script](https://github.com/mtlynch/ingredient-phrase-tagger/pull/12), and it immediately caught an unused import:

```bash
$ pyflakes \
    bin/ \
    ingredient_phrase_tagger/
ingredient_phrase_tagger/training/utils.py:3: 'string' imported but unused
```

## Time to read the code

You may have noticed that throughout this process, I've avoided any attempts to understand the code. I skated by with only a cursory understanding of the library's behavior.

The best way I've found for reading code is to refactor and test as I go. Famed software expert [Martin Fowler](https://en.wikipedia.org/wiki/Martin_Fowler) describes this process best:

>When I look at unfamiliar code, I have to try to understand what it does. I look at a couple of lines and say to myself, oh yes, that’s what this bit of code is doing. With refactoring I don’t stop at the mental note. I actually change the code to better reflect my understanding, and then I test that understanding by rerunning the code to see if it still works.
>
>-Martin Fowler, [*Refactoring: Improving the Design of Existing Code*](https://amzn.to/2nuHVfv)

## Addressing poor code organization

80% of all code in the library was in just two of its files: `cli.py` (command-line interface) and `utils.py` (utilities). In other words, the authors split the code into two buckets: "user interface" and "everything else." But even this wasn't a clean separation.

Very little of the code in `cli.py` related to reading or writing from the command line. It consisted of a single class called `Cli` with the following methods:

* `run`
* `generate_data`
* `parseNumbers`
* `matchUp`
* `addPrefixes`
* `bestTag`
* `_parse_args`

My first order of business was to slim down the `Cli` class so that it formed a more logical abstraction of a command-line interface.

{{<zestful-ad>}}

## Dissecting the `Cli` class

To break up the `Cli` class, I needed a starting point. `generate_data` sure didn't seem to belong in a class responsible for managing a user interface, but I couldn't immediately move it. `generate_data` called `Cli`'s other methods through its `self` parameter, meaning it shared state with the rest of the class.

Or did it? Every function in `cli.py` was a member method of the `Cli` class, but did they actually share instance variables?

I checked `Cli`'s constructor:

```python
def __init__(self, argv):
      self.opts = self._parse_args(argv)
      self._upstream_cursor = None
```

The constructor assigned a value to `self._upstream_cursor`, but nothing ever referenced that variable. It was dead code, so that was an easy deletion.

The other member variable, `self.opts` wasn't dead, but only two methods referenced it: `run` and `generate_data`.

With no shared state, there was no reason for any of `Cli`'s other public methods to be methods at all. They could all live happily as module-level free functions. Better yet, I could move them to an entirely new module that described their purpose better than `cli`.

## Forming a clean abstraction

Once I discovered that most of `Cli`'s methods could live in another module, I had to design that new module. I could, of course, move every function there and make them all public, but I wanted to find a minimal interface between the `Cli` class and this new module.

I realized that `Cli` called all of the other functions within the loop body of `generate_data`. If I extracted that code to a new function, `Cli` would need access only to the new function and none of its previous methods.

{{< img src="function-diff.png" alt="Diff from YAPF changes" caption="Extracting loop body from `generate_data` into a new function called `translate_row`" maxWidth="614px" hasBorder="True" >}}

This change made the `Cli` class slimmer and more logically cohesive. It now consisted of just two public methods and one private one:

* `run`
* `generate_data`
* `_parse_args`

It still wasn't perfect, but it was better than the previous, bloated interface. There were certainly many more changes that I *wanted* to make, but those would have to wait.

To minimize the probability of mistakes, I kept tight scope for each pull request in the refactoring. When moving code between files, it's especially important to minimize change because the move itself makes it hard to notice line-level modifications.

My end-to-end test passed, which told me I didn't break anything significant in the move, but my work wasn't done yet. My refactoring created a new function, which meant I needed a new unit test to exercise it.

{{<zestful-ad>}}

## My first unit test

Creating the unit test was easy. I temporarily added debug log statements at the beginning and end of `translator.translate_row` to print the inputs and outputs. Those values became the input and expected output of my first unit test:

```python
def test_translates_row_with_simple_phrase(self):
    row = {
        'index': 162,
        'input': '2 cups flour',
        'name': 'flour',
        'qty': 2.0,
        'range_end': 0.0,
        'unit': 'cup',
        'comment': '',
    }
     self.assertMultiLineEqual("""
2\tI1\tL4\tNoCAP\tNoPAREN\tB-QTY
cups\tI2\tL4\tNoCAP\tNoPAREN\tB-UNIT
flour\tI3\tL4\tNoCAP\tNoPAREN\tB-NAME
""".strip(),
                              translator.translate_row(row).strip())
```

I still didn't fully understand what this function did, but the unit test brought me closer. I saw that it processed the library's training data, which was in a CSV file that looked like this:

| index | input | name | qty | range_end | unit | comment|
|--------|--------|--------|-----|--------------|------|-------------|
| 162 | 2 cups flour | flour | 2.0 | 0.0 | cup |

It returned a set of tab-separated values that the library's machine learning engine understood.

I [added a few more unit tests](https://github.com/mtlynch/ingredient-phrase-tagger/pull/50/files#diff-6d949259dd4883a10ce9b073d36c7860) to cover different types of ingredients: an ingredient with fractions (`"1 1/2 teaspoons salt"`) and an ingredient with a comment attached (`"Half a vanilla bean, split lengthwise, seeds scraped"`).

## Integrating unit tests into the build

Unit tests aren't much fun unless they're integrated into the build process, so I [updated my build script](https://github.com/mtlynch/ingredient-phrase-tagger/pull/50) to include them:

{{< img src="unittest-build.png" alt="Screenshot of diff to add unit test command to build" caption="Adding unit test execution to build script" maxWidth="525px" hasBorder="True" >}}

Because Travis continuous integration was already running my build script on every code change, I saw the unit test output on [the next Travis build](https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/416406390):

{{< img src="travis-unit-tests.png" alt="Unit test logging output" caption="Unit test logging in [Travis' build output](https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/416406390)" maxWidth="715px" >}}

## Adding code coverage

While refactoring, I love watching the code coverage percentages climb as I bring more code under test. In Python projects, I use the [`coverage` module](https://pypi.org/project/coverage/) to collect coverage information and [Coveralls](http://coveralls.io) to make the results available in a web dashboard.

Switching from Python's native unit test runner to `coverage` required only a trivial change to my build script:

```diff
-python -m unittest discover
+coverage run -m unittest discover
```

Then, I added an `after_success` key to my Travis configuration so that Travis would upload my code coverage information to Coveralls.

```yaml
after_success:
  - pip install pyyaml coveralls
  - coveralls
```

I checked Coveralls, eager to see my code coverage stats, and...

{{< img src="no-coverage-data-1.png" alt="Screenshot of Coveralls showing no results" caption="Coveralls shows no code coverage information" maxWidth="697px" hasBorder="True" >}}

Nothing.

## Where did my code coverage go?

I had used Coveralls in dozens of projects in the past, so I didn't understand why it wasn't displaying anything. It was just a simple Python project. The `coverage` command was supposed to create a file called `.coverage` with the code coverage information, and the `coveralls` command was supposed to upload it to the Coveralls dashboard.

Oh, that was it! The `coverage` command ran in my Docker container, but the `coveralls` binary ran in the standard Travis environment, so it couldn't find the `.coverage` file. I never copied it from the Docker container to the outer Travis environment.

That was an easy fix. I just had to add a command to extract the `.coverage` file from the Docker container:

```yaml
after_success:
  - pip install pyyaml coveralls
  - docker cp ingredient-phrase-tagger-container:/app/.coverage ./
  - coveralls
```

Still, the Coveralls dashboard showed nothing:

{{< img src="no-coverage-data-2.png" alt="Screenshot of Coveralls showing no results (again)" caption="Coveralls *still* shows no code coverage information" maxWidth="697px" hasBorder="True" >}}

However, [the Travis build](https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/415474978) printed output that didn't appear in previous builds:

```text
$ coveralls
Submitting coverage to coveralls.io...
No source for /app/ingredient_phrase_tagger/__init__.py
No source for /app/ingredient_phrase_tagger/training/__init__.py
No source for /app/ingredient_phrase_tagger/training/cli.py
No source for /app/ingredient_phrase_tagger/training/translator.py
No source for /app/ingredient_phrase_tagger/training/utils.py
Coverage submitted!
Job #177.1
https://coveralls.io/jobs/39259674
```

That's when I realized there was another problem.

Travis and Docker had conflicting views of the filesystem. For example, here is how they each saw the `cli.py` file:

| Environment | File path |
|----|----|
| Docker container | `/app/ingredient_phrase_tagger/training/cli.py` |
| Travis | `/home/travis/ingredient_phrase_tagger/training/cli.py` |

Given that, the error message that `coveralls` printed in Travis made more sense:

```text
No source for /app/ingredient_phrase_tagger/training/cli.py
```

Coveralls couldn't find the file because the paths in `.coverage` were based on the Docker container's view of the filesystem. The `/app` path didn't exist on the Travis filesystem.

How could I bridge the gap between these two different environments with incompatible views of the same files? I found a solution, but it was a bit convoluted.

## A roundabout way to convert paths

In the documentation for `coverage`, I noticed that it supported a [`paths` option](https://coverage.readthedocs.io/en/coverage-5.0/config.html#paths) that discussed combining paths from multiple filesystems:

{{< img src="paths-param.png" alt="Screenshot of paths documentation" caption="Documentation for [`paths` option](https://coverage.readthedocs.io/en/coverage-5.0/config.html#paths) of `coverage` command" maxWidth="712px" hasBorder="True" linkUrl="https://coverage.readthedocs.io/en/coverage-5.0/config.html#paths" >}}

To use these options, I created the following `.coveragerc` file:

{{< inline-file filename="coveragerc" language="ini" >}}

My new solution ran the `coverage` command within the Docker container, then executed the [`coverage combine` feature](https://coverage.readthedocs.io/en/coverage-5.0/cmd.html#cmd-combining) in the Travis environment, which canonicalized all of the paths to the Travis filesystem.

After applying this solution, the `after_success` section of my [Travis configuration](https://github.com/mtlynch/ingredient-phrase-tagger/blob/9e66f28b07de290b77b1ec0b84baf14f3e7330a0/.travis.yml) looked like this:

```yaml
after_success:
  - pip install pyyaml coveralls
  # Copy the .coverage.* file from the Docker container to the local filesystem.
  - docker cp ingredient-phrase-tagger-container:/app/$(docker exec -it ingredient-phrase-tagger-container bash -c "ls -a .coverage.*" | tr -d '\r') ./
  # Use coverage combine to canonicalize the source paths.
  - coverage combine
  # Upload coverage information to Coveralls.
  - coveralls
```

## Code coverage at last

I put [my full solution](https://github.com/mtlynch/ingredient-phrase-tagger/pull/51) to the test. Finally, Coveralls received the results and [displayed my code coverage numbers](https://coveralls.io/jobs/39262596):

{{< img src="coverage-data.png" alt="Screenshot of Coveralls showing code coverage statistics" caption="Coveralls finally shows code coverage information." maxWidth="697px" hasBorder="True" linkUrl="https://coveralls.io/jobs/39262596" >}}

## I pronounce this library resurrected

After integrating code coverage tracking, I felt like this library was alive again. It wasn't going to win any awards for quality, but the infrastructure was in place for me or any other developer to continue iterating on the code with high confidence.

Throughout this series of blog posts, I described how I improved the library in small, discrete steps. This minimized the potential for bugs but perhaps obscured the bigger picture. For a bit of perspective, allow me to review the high-level improvements I made to the library in the process of resurrecting it:

| Before | After |
|----------|--------|
| Builds only on OS X | [Builds in any environment that supports Docker](/resurrecting-1/#making-it-easier) |
| No end-to-end tests | Has a thorough [end-to-end test](/resurrecting-2/#adding-an-end-to-end-test) |
| No unit tests | Has a small number of [unit tests](/resurrecting-3/#my-first-unit-test) and an easy mechanism for adding more |
| No code coverage information | Measures [code coverage](/resurrecting-3/#code-coverage-at-last) on every commit and maintains coverage history over time |
| No automated builds | [Builds and tests code automatically](/resurrecting-2/#running-it-in-continuous-integration) on every commit |
| Inconsistent code style | [Enforces style conventions](/resurrecting-3/#enforcing-whitespace-conventions) via automated tools |
| Developers must identify unused imports and uninitialized variables manually | [Applies static analysis](/resurrecting-3/#adding-static-analysis) to catch careless errors automatically |

## Refactor one to throw away

Given how proud I was of these changes, it may surprise you to learn that after a few more weeks of improving the code, I abandoned it in favor of a total rewrite.

>...plan to throw one away; you will, anyhow.
>
>-Fred Brooks, [*The Mythical Man-Month: Essays on Software Engineering*](https://amzn.to/2OTNCQK)

The more I refactored the code, the more I recognized problems with its fundamental architectural. That doesn't mean that I wasted effort in improving the code &mdash; I needed to get my hands dirty to develop a deep understanding. Once I understood everything, I felt comfortable rewriting it from scratch for better maintainability and performance.

The result was a service called [Zestful](https://zestfuldata.com). It offers functionality similar to ingredient-phrase-tagger, but in a hosted API. It allows clients to parse ingredients immediately without jumping through all the hoops I did to make the original library functional.

If you'd like to see Zestful in action, check out the [live demo](https://zestfuldata.com/demo):

{{< img src="zestful-screenshot.png" alt="Screenshot of Zestful ingredient parsing demo" maxWidth="800px" hasBorder="True" linkUrl="https://zestfuldata.com/demo" >}}

If you're a developer and you work on software that handles recipe ingredients, let's talk. Shoot me an email at [michael@mtlynch.io](mailto:michael@mtlynch.io).

{{<zestful-ad>}}

---

*Cover illustration by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). My fork of the ingredient-phrase-tagger library is available on [Github](https://github.com/mtlynch/ingredient-phrase-tagger). I offer a managed service based on this library called [Zestful](https://zestfuldata.com).*
