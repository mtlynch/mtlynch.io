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
  teaser: images/resurrecting-3/cover.jpg
  og_image: images/resurrecting-3/cover.jpg
---

In this post, I show how to make it safe to modify the low-level logic of a legacy Python library. And I'll address the strange issues that arise when you combine Docker with code coverage tools.

This is the final post in a three-part series about how I resurrected [ingredient-phrase-tagger](https://github.com/NYTimes/ingredient-phrase-tagger), a library that uses machine learning to parse raw recipe ingredients (e.g., "2 cups milk") into structured data. Read [part one](/resurrecting-1/) for the full context, but the short version is that I discovered an abandoned library and brought it back to life so that it could power my SaaS business:

* [Part One: Resuscitation](/resurrecting-1/) - In which I nurse the code back to health so that it runs on any modern system
* [Part Two: Stabilization](/resurrecting-2/) - In which I prevent functionality from regressing while I restore the code
* **Part Three: Rehabilitation (this post)** - In which I fix the code's most egregious bugs and begin refactoring

{% include image.html file="cover.jpg" alt="Hermit crab being pulled from shell" max_width="800px" img_link=true %}

# Enforcing whitespace conventions

My end-to-end tests gave me confidence that if I refactored the code, I wouldn't accidentally break anything. I decided to add one of my favorite Python tools, [YAPF](https://github.com/google/yapf). It's a formatter for Python. I add it to all of my Python projects so that it forces me to use consistent code conventions for whitespace without having to think about it.

I used YAPF to reformat all of the Python files according to my preferred style conventions, then I [added YAPF to my build script](https://github.com/mtlynch/ingredient-phrase-tagger/pull/11) to make sure that these conventions held for every code change.

This created a bit of noise in my source:

{% include image.html file="yapf-diff.png" alt="Diff from YAPF changes" max_width="700px" img_link=true class="img-border" fig_caption="Diff after adding automatic whitespace enforcement" %}

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

I have a hard time just reading code straight through. When I read code, I'm constantly thinking of things to change, so I like to refactor to bake in my understanding.

Martin Fowler describes this best:

>When I look at unfamiliar code, I have to try to understand what it does. I look at a couple of lines and say to myself, oh yes, that’s what this bit of code is doing. With refactoring I don’t stop at the mental note. I actually change the code to better reflect my understanding, and then I test that understanding by rerunning the code to see if it still works.
>
>-Martin Fowler, [*Refactoring: Improving the Design of Existing Code*](https://amzn.to/2nuHVfv)

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

Ohhhh, that made me realize what was going on.

Within the Docker container, all of the library's code is in a folder called `/app`. When I ran the `coverage` command, it stored the absolute paths of all of the source files, but the Travis environment had a different view of the filesystem with different source paths. The `coveralls` command was trying to reconcile the paths in the Travis environment, but it was getting confused because the paths in the `.coverage` file didn't match the paths on the local filesystem.

It would be great if `coverage` supported an option for saving relative paths instead of absolute paths, but alas, it did not. I had to get creative.

# A roundabout way of canonicalizing paths

While `coverage` doesn't support relative paths, I did notice in its documentation that it did support a `paths` option:

Then there was a `coverage merge` option that merged together coverage output that used different views of the filesystem

```text
; Run in parallel mode so that coverage can canonicalize the source paths
; regardless of whether it runs locally or within a Docker container.
parallel = True
 [paths]
source =
  ingredient_phrase_tagger/       ; local path
  /app/ingredient_phrase_tagger/  ; path within Docker container
```

I copied it out:

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

Finally, the upload to coveralls [succeeded](https://coveralls.io/jobs/39262596):

{% include image.html file="coverage-data.png" alt="Screenshot of Coveralls showing code coverage statistics" fig_caption="Coveralls finally shows code coverage information" max_width="697px" img_link=true class="img-border" %}

By unit testing a single function, I achieved 56% code coverage. Not bad!

https://github.com/mtlynch/ingredient-phrase-tagger/compare/master...mtlynch:fix-coverage?expand=1

# A review of improvements

At this point, I'd like to take a step back and recognize what all these changes accomplished. When I started editing this code, it wasn't even possible to build it outside of the OS X operating system. There were no tests and no mechanism for adding them. There were no consistent style conventions.

In editing it, I put it on the path to a production grade project.

* I defined a Docker image to let the code build on any system
* I added end-to-end tests to prevent code changes from breaking high-level functionality
* I added unit tests to verify behavior in low level logic
* I added automatic code formatting to enforce consistent style conventions
* I added static analysis tools to catch careless errors

I'm not going to claim that I made this the best library in the world, but these changes put it well on a path to production-grade code. The project was healthy enough that if I brought in a developer without previous context, they could run and edit the code without a lot of time wasted figuring out the code or determining if their changes broke functionality.

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