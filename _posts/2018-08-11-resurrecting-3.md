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

TODO: Screenshot of function diff.

It didn't have to be perfect, just *better*. Refactoring is an iterative process, so as long as the code was getting less tangled, that was good.

My end-to-end test passed, which told me I didn't break anything major in the move, but my work wasn't over yet. I was adding a new function, which meant that I was also responsible for adding a new unit test to exercise it.

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

I added a few more unit tests for different edge cases:

* `1/2 cup yellow cornmeal` (includes simple fraction)
* `1 1/2 teaspoons salt` (includes mixed fraction)
* `Half a vanilla bean, split lengthwise, seeds scraped` (includes preparation instructions)

https://github.com/mtlynch/ingredient-phrase-tagger/pull/19

# Integrating unit tests into the build

Unit tests aren't much fun unless they're integrated into the build process. I updated my build script to 

```bash
# Run unit tests and calculate code coverage.
coverage run \
  --source "ingredient_phrase_tagger" \
  -m unittest discover
```

# Tracking code coverage

Integrating unit tests into the build was good, but it was also showing me what percentage of my code I was exercising with my unit tests. I wanted to capture that as well. A big motivation for me in writing unit tests is the knowledge that I'll get to see my code coverage percentages climb ever higher.

I'm most familiar with Coveralls, but there was a problem. Docker makes this a bit tricky.

The `coverage` binary stores code coverage in a directory called `.coverage`. The way Coveralls is supposed to work is that the Coveralls client binary uploads this directory to the Coveralls server and the Coveralls server processes it to show

Two problems:

1. The `coverage` refers to source paths as absolute paths instead of relative paths
2. The Coveralls server-side processing expects source paths to be within `/home/travis`

But I ran my build in a Docker container, so 

The Coveralls client binary uploads the `.coverage` folder up to the Coveralls server for processing. But Python's `coverage`

```yaml
after_success:
  - pip install pyyaml coveralls
  - docker cp ingredient-phrase-tagger-container:/ingredient-phrase-tagger/.coverage ./
  # Fix paths in .coverage so they match Coveralls' expectations of Travis'
  # paths.
  - sed -i "s@\"/ingredient-phrase-tagger/@\"${PWD}/@g" .coverage
  - coveralls
```

# Refactor one to throw away

I eventually decided I wanted a whole new design.

>...plan to throw one away; you will, anyhow.
>
>-Fred Brooks, [*The Mythical Man Month: Essays on Software Engineering*](https://amzn.to/2OTNCQK)

You can demo it on my site and you can use it in your apps.


{% include ads.html title="zestful" %}

---

*Cover illustration by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). My fork of the ingredient-phrase-tagger library is available on [Github](https://github.com/mtlynch/ingredient-phrase-tagger). I offer a managed service based on this library called [Zestful](https://zestfuldata.com).*