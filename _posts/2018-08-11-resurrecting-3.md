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
- docker
- coveralls
- coverage
header:
  teaser: images/resurrecting-3/cover.jpg
  og_image: images/resurrecting-3/cover.jpg
---

In this post, I show how I began refactoring a legacy Python library. As I refactored, I added unit tests to lock in my understanding of the code and to prevent regressions in behavior. Below, I'll also show how I overcame the strange issues that arose when I ran code coverage tools within a custom Docker container.

This is the final post in a three-part series about how I resurrected [ingredient-phrase-tagger](https://github.com/NYTimes/ingredient-phrase-tagger), a library that uses machine learning to parse raw recipe ingredients (e.g., "2 cups milk") into structured data. Read [part one](/resurrecting-1/) for the full context, but the short version is that I discovered an abandoned library and brought it back to life so that it could power my SaaS business:

* [Part One: Resuscitation](/resurrecting-1/) - In which I nurse the code back to health so that it runs on any modern system
* [Part Two: Stabilization](/resurrecting-2/) - In which I prevent functionality from regressing while I restore the code
* **Part Three: Rehabilitation (this post)** - In which I fix the code's most egregious bugs and begin refactoring

{% include image.html file="cover.jpg" alt="Hermit crab being pulled from shell" max_width="800px" img_link=true %}

# Where are we?

It was time to start refactoring.
As a refresher, at the end of [part two](/resurrecting-2/), the library:

* Had an end-to-end test
* Continuous integration ran the end-to-end test on every code change

These two mechanisms gave me sufficient confidence that I wouldn't break any critical functionality in the code.

It was time to start cleaning up the code.

# Enforcing whitespace conventions

Scanning through the Python code, it didn't seem to have clear code style conventions. It mixed camelCase with snake_case naming. Line breaks sometimes occurred at column 80, but sometimes didn't.

Some of these I had to fix manually, but a simple, easy solution was available for fixing whitespace issues. [YAPF](https://github.com/google/yapf) is a whitespace formatter for Python. It's a standard feature in all of my Python projects. Instead of devoting mental energy to figuring out the right whitespace conventions, I simply run YAPF to apply the right conventions for me.

I added a YAPF command to my build script to apply whitespace conventions according to [Google's Python Style Guide](https://github.com/google/styleguide/blob/gh-pages/pyguide.md):

```bash
yapf \
  --diff \
  --recursive \
  --style google \
  ./ \
  --exclude="third_party/*" \
  --exclude="build/*"
```

Finally, I ran almost the same command, except with the `--in-place` flag instead of `--diff`. This told YAPF to fix whitespace violations within the files themselves rather than simply displaying the changes it wants to make:

```bash
yapf \
  --in-place \
  --recursive \
  --style google \
  ./ \
  --exclude="third_party/*" \
  --exclude="build/*"
```

Note that I don't allow YAPF to modify code automatically within the build process. I think that's dangerous practice, and I instead allow YAPF to just display style violations and give the developer the responsibility of fixing them.

according to my preferred style conventions, then I [added YAPF to my build script](https://github.com/mtlynch/ingredient-phrase-tagger/pull/11) to make sure that these conventions held for every code change.

This created a bit of noise in my source:

{% include image.html file="yapf-diff.png" alt="Diff from YAPF changes" max_width="700px" class="img-border" fig_caption="Diff after adding automatic whitespace enforcement" %}

Another key thing to notice is that I isolated my whitespace changes from any other changes. A common anti-pattern is to mix large-scale whitespace changes with other refactoring. This is poor practice because it makes it more difficult for reviewers (including the author themselves) from verifying that the changes are safe. Whitespace changes are pretty easy to scan through, but if there are other refactorings buried amongst a sea of whitespace changes, it forces the reviewer to carefully read through everything and decide whether it's a pure-whitespace change or another type of refactoring.

Whitespace changes are easy to verify as safe Anyone reviewing this change later can quickly scan through and see that these are purely whitespace changes that don't affect the logic.

Still, it's possible sometimes to introduce a logic change even when it just looks like whitespace refactoring. I was confident that I wasn't doing this because I had end-to-end tests ensuring that my code produced the same output as before its refactoring.

# Adding static analysis

I added [pyflakes](https://github.com/PyCQA/pyflakes) for another quick win. It uses static analysis to identify careless errors such as unitialized variables or unused imports.

It was very easy to set up and produces valuable findings. I [added it to my build](https://github.com/mtlynch/ingredient-phrase-tagger/pull/12), and it immediately caught an unused import:

```bash
$ pyflakes \
    bin/ \
    ingredient_phrase_tagger/
ingredient_phrase_tagger/training/utils.py:3: 'string' imported but unused
```

# Time to read the code

You may have noticed that throughout this process, I've avoided any attempts to understand the code. I skated by without understanding what the library does except at a very high level.

Confession: I'm bad at reading code.

Whenever I read someone else's code, I have to fit it into my own mental model. Often that process distracts me by sending me on a path thinking of how I would organize the code differently.

get distracted thinking about all the ways I want to change it to make the code clearer or simpler. I always felt bad about this until I found out that Martin Fowler, champion of the practice of refactoring, has a similar tendency but harnesses it in a productive way:

>When I look at unfamiliar code, I have to try to understand what it does. I look at a couple of lines and say to myself, oh yes, that’s what this bit of code is doing. With refactoring I don’t stop at the mental note. I actually change the code to better reflect my understanding, and then I test that understanding by rerunning the code to see if it still works.
>
>-Martin Fowler, [*Refactoring: Improving the Design of Existing Code*](https://amzn.to/2nuHVfv)

All the changes I made prior to this point were primarily to support me making modifications to the code. Now that these mechanisms were in place, I could take advantage of them and begin understanding the library by refactoring it.

# Starting top-down

Immediately, I noticed that the code wasn't well-factored. Almost all of the library's logic was in just two files: `cli.py` and `utils.py`. In other words, the authors logically divided the code into two buckets: "user interface" and "everything else."

When I read the files, I discovered that even that simple bucketing scheme wasn't accurate. Most of the code in `cli.py` had nothing to do with reading or writing from the command line. It consisted of a single class, `Cli`, with the following methods:

* `run`
* `generate_data`
* `parseNumbers`
* `matchUp`
* `addPrefixes`
* `bestTag`
* `_parse_args`

Only two of these methods fit into a logical abstraction of a command-line interface: `run` and `_parse_args`. This module code was in desperate need of a refactoring.

{% include ads.html title="zestful" %}

# Dissecting the CLI class

Clearly, I wanted to break up the `Cli` class, but I had to find a starting point. `generate_data` sure doesn't seem to belong there, but I can't move it to a different module because it calls several other member functions in the same class.

What state does `generate_data` share with the other member functions? I checked `Cli`'s constructor:

```python
def __init__(self, argv):
      self.opts = self._parse_args(argv)
      self._upstream_cursor = None
```

The constructor assigns a value to `self._upstream_cursor`, but the rest of the class never references it. It's dead code, so that was an easy delete.

The other member variable, `self.opts` wasn't dead, but only two methods referenced it: `run` and `generate_data`. That meant that none of `Cli`'s other methods needed to be attached to the class itself. They could all live happily as free functions at the module level because they never needed access to any of `Cli`'s instance variables. Or, better yet, I could move them to a completely new module so that these functions that have nothing to do with the command-line aren't living in a module called `cli`.

# Forming a clean abstraction

Now that I had discovered that most of `Cli`'s methods could live in another module, I still had to figure out a better way. I could, of course, move everything to a new module and make everything public. But it would be much better if I could figure out an interface between the `Cli` class and this new module so that the new module presents a logical abstraction for `Cli` to call.

I realized that they were all within `generate_data`'s loop body. If I extracted the body of the loop to a single function, `Cli` could call it with just one function.

{% assign fig_caption = "Extracting loop body from `generate_data` into a new function called `translate_row`" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="function-diff.png" alt="Diff from YAPF changes" fig_caption=fig_caption max_width="614px" img_link=true class="img-border" %}

It didn't have to be perfect, just *better*. Refactoring is an iterative process, so as long as the code was getting less tangled, that was good.

My end-to-end test passed, which told me I didn't break anything major in the move, but my work wasn't over yet. I was adding a new function, which meant that I was also responsible for adding a new unit test to exercise it.

{% include ads.html title="zestful" %}

# My first unit test

Creating the unit test was easy. I added a debug print statements at the beginning of the function to print out the value of the input parameter `row`, another at the end to print out the return value. Then, those values became the input and output of my first unit test:

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

I *still* didn't understand exactly what this function did. I understood that it translated values from the input CSV of training data into a format that CRF++ (the machine learning engine) could use. But I was understanding more and more as I refactored. The more I refactored and tested, the more I would understand. And the more unit tests I had, the more aggressively I could refactor because I had more confidence that I was preserving behavior.

# Integrating unit tests into the build

Unit tests aren't much fun unless they're integrated into the build process. I updated my build script to 

```bash
# Run unit tests and calculate code coverage.
coverage run \
  --source "ingredient_phrase_tagger" \
  -m unittest discover
```

# Adding code coverage

Integrating unit tests into the build was good, but it was also showing me what percentage of my code I was exercising with my unit tests. I wanted to capture that as well. A big motivation for me in writing unit tests is the knowledge that I'll get to see my code coverage percentages climb ever higher.

I'm most familiar with Coveralls, but there was a problem. Docker makes this a bit tricky.

I then added an `after_success` key to my Travis configuration so that Travis would upload my code coverage information to Coveralls.

```yaml
after_success:
  - pip install pyyaml coveralls
  - coveralls
```

I checked the Coveralls dashboard eager to see my code coverage stats, and...

{% include image.html file="no-coverage-data-1.png" alt="Screenshot of Coveralls showing no results" fig_caption="Coveralls shows no code coverage information" max_width="697px" img_link=true class="img-border" %}

Nothing.

# Where did my code coverage go?

I had used Coveralls without issue on other projects, so I didn't understand why this didn't work. It was just a simple Python project.

Oh, that was it! The `coveralls` binary ran in the standard Travis environment, but my `.coverage` file was hiding within my Docker container.

That was an easy fix. I just had to add a command to pull the `.coverage` file back out from the Docker container into the normal Travis environment:

```yaml
after_success:
  - pip install pyyaml coveralls
  - docker cp ingredient-phrase-tagger-container:/app/.coverage ./
  - coveralls
```

Again, I pulled up the Coveralls data for the build and found:

{% assign fig_caption = "Coveralls *still* shows no code coverage information" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="no-coverage-data-2.png" alt="Screenshot of Coveralls showing no results (again)" fig_caption=fig_caption max_width="697px" img_link=true class="img-border" %}

Still nothing.

But this time, [the Travis build](https://travis-ci.org/mtlynch/ingredient-phrase-tagger/builds/415474978) printed output that wasn't there before:

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

Thinking about this a bit, I realized what was going on.

The `coverage` command generated a `.coverage` file with code coverage information, but it encodes file information into the file using absolute paths. Because I ran `coverage` within the Docker container, it has a different view of the filesystem than the `coveralls` command, which runs in the normal Travis environment.

For example, here is where the `cli.py` file is located in both environments:

* Docker container: `/app/ingredient_phrase_tagger/training/cli.py`
* Travis environment: `/home/travis/ingredient_phrase_tagger/training/cli.py`

I ran the `coverage` command within Docker, so it generated a `.coverage` file with the first path. I ran `coveralls` directly in Travis, so it couldn't find any of the paths referenced in the `.coverage` file, as it has a conflicting view of the filesystem.

At this point, I had three options:

1. Configure `coverage` to store relative paths instead of absolute paths.
2. Configure `coveralls` to recognize `.coverage` paths with a particular path prefix.
3. Convert the `.coverage` file's paths from the Docker paths to the Travis paths.

(1) and (2) were out because those tools didn't support such options.

I needed a way to convert paths in the `.coverage` file. I originally did this in a very hacky way by simply using [find and replace](https://github.com/mtlynch/ingredient-phrase-tagger/blob/6a6011341de1995aac0afc403bb6a6067641f342/.travis.yml#L12-L14) within the `.coverage` file. This was a flaky solution, however, as future changes to the `.coverage` format could easily break my strategy.

Fortunately, I found a way to convert paths using supported features of the `coverage` tool, but it was a bit convoluted.

# A roundabout way to convert paths

I noticed in the documentation for `coverage` that supported a `paths` option:

Using this option, rather than a file called `.coverage`, the `coverage` application produces a file with a random suffix, like `.coverage.5afba973bf29.38.599120`. The [`coverage combine` feature](https://coverage.readthedocs.io/en/coverage-4.5.1a/cmd.html#cmd-combining) consolidates several files with these suffixes into a single, standard `.coverage` file.

To use these options, I created the following `.coveragerc` file:

{% include files.html title="coveragerc" language="ini" %}

I had to run the `coverage` command within the Docker container, then run `coverage combine` in the Travis environment, which converted the paths and converted the file back to `.coverage` (no suffix).

This was the updated `after_success` section of my [Travis configuration](https://github.com/mtlynch/ingredient-phrase-tagger/blob/9e66f28b07de290b77b1ec0b84baf14f3e7330a0/.travis.yml):

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

I put my solution to the test, and, finally, the upload to coveralls [succeeded](https://coveralls.io/jobs/39262596):

{% include image.html file="coverage-data.png" alt="Screenshot of Coveralls showing code coverage statistics" fig_caption="Coveralls finally shows code coverage information" max_width="697px" img_link=true class="img-border" %}

I finally had code coverage information. I was impressed that by unit testing a single function, I achieved 56% code coverage. Not bad!

# A review of improvements

Throughout this series of blog posts, I've been incrementally improving the code and its accompanying development tools. I'd like to take a step back and recognize the high-level changes that occurred by this point:

Before my changes:

* Built only on OS X
* No end-to-end tests
* No unit tests
* No code coverage information
* No automated builds
* Inconsistent code style

After my changes:

* Builds in any environment that supports Docker
* Has a thorough end-to-end test
* Has a small number of unit test and an easy mechanism for adding more
* Builds and tests code automatically on every change
* Measures code coverage on every commit and maintains coverage history over time
* Enforces consistent style conventions automatically

TODO (link all of these)

I don't claim that I made this the world's best software library, but I believe I put it on a healthy path toward being production-grade code.

A good test for this is thinking about how much time a new developer would have to spend getting ramped up on the project. In the original version of the library, the cost of ramping up a new developer was very high. They had to figure out how to install all the library's dependencies, and they had no mechanisms telling them if they broke functionality or style conventions. With the improved code a new developer could get up and running quickly because automated tools were in place to guide them.

# Refactor one to throw away

Given how proud I was of the changes, it may surprise you to learn that after a few more weeks of improving the code, I decided to stop working on it in favor of a total rewrite.

I refactored enough to develop a good understanding of the library's logic. Once that was done, I thought about what would be a more intuitive way to architect the library myself.

>...plan to throw one away; you will, anyhow.
>
>-Fred Brooks, [*The Mythical Man Month: Essays on Software Engineering*](https://amzn.to/2OTNCQK)

With the result, I created a business called [Zestful](https://zestfuldata.com). It offers the functionality on the ingredient-phrase-tagger, but in a hosted API, so that clients don't have to worry about gathering training data or setting anything up. To try out the live demo, click the link below:

{% include image.html file="zestful-screenshot.png" alt="Screenshot of Zestful ingredient parsing demo" max_width="800px" link_url="https://zestfuldata.com/demo" class="img-border" %}

If you're a developer with an app that handles recipe ingredients or you know of one that does, let's talk. Shoot me an email at [michael@mtlynch.io](mailto:michael@mtlynch.io).

{% include ads.html title="zestful" %}

---

*Cover illustration by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). My fork of the ingredient-phrase-tagger library is available on [Github](https://github.com/mtlynch/ingredient-phrase-tagger). I offer a managed service based on this library called [Zestful](https://zestfuldata.com).*