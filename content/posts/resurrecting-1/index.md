---
title: 'Resurrecting a Dead Library: Part One - Resuscitation'
tags:
- zestful
- refactoring
- docker
- ingredient-phrase-tagger
- ingredient parsing
description: The story of how I got an old library up and running again and used it
  to build a new business
discuss_urls:
  hacker_news: https://news.ycombinator.com/item?id=17600798
  reddit: https://www.reddit.com/r/programming/comments/91heln/resurrecting_a_dead_library_resuscitation/
date: '2018-07-24'
images:
- resurrecting-1/cover.jpg
---

When I arrived on the scene, it wasn't a pretty sight.

I saw formerly active, cheerful Python classes in a sorry state of atrophy, having gone years without exercise. Functions at all levels of abstraction were crammed together inhumanely under the label `utils`. I tried to read the UI code but found something obstructing it. After a closer look, I was overcome with nausea. The obstructions in the view layer were, in fact, gory chunks of business logic.

The code was dead.

In this three-part series, I'll show you how I resurrected it and built a business with the result:

* **Part One: Resuscitation (this post)** - In which I nurse the code back to health so that it runs on any modern system
* [Part Two: Stabilization](/resurrecting-2/) - In which I prevent functionality from regressing while I restore the code
* [Part Three: Rehabilitation](/resurrecting-3/) - In which I begin refactoring the code

{{< img src="cover.jpg" alt="Bear doctors resuscitating python" maxWidth="800px" >}}

## The library

The library was [ingredient-phrase-tagger](https://github.com/NYTimes/ingredient-phrase-tagger), an open-source library that *The New York Times* published. It allowed users to parse recipe ingredients into structured data.

A few years ago, the *Times* decided to digitize their extensive historical archive of cooking recipes. They hired data entry workers to look at raw ingredients from these recipes and tease apart the data they represented. The result was a database that looked like this:

| raw ingredient | quantity | unit | name | comment |
|--------|------------|------|--------|-------------|
| 3 tablespoons flour | 3.0 | tablespoon |  flour | |
| 2 1/2 cups of finely chopped red onions | 2.5 | cup | red onions | finely chopped |
| 2 dried pasilla chilies | 2.0 | | pasilla chilies | dried |

After six years of adding to this database, they realized that they had enough data to [train a machine learning model](https://open.blogs.nytimes.com/2015/04/09/extracting-structured-data-from-recipes-using-conditional-random-fields/) that could simulate the human workers' data entry decisions. The project was a success, so they published all of their source code and data.

## What business was it of mine?

I had the same problem as the *Times*. My project [KetoHub](https://ketohub.io/) aggregates recipes from around the web and makes them searchable by ingredient. Recipe websites typically don't publish their ingredient lists in a structured format, I had to tease apart the structure myself.

{{< img src="ketohub-screenshot.jpg" alt="Screenshot of KetoHub" caption="Results of a for a [KetoHub](https://ketohub.io/?q=avocado) search for recipes matching 'avocado'" maxWidth="400px" hasBorder="True" >}}

{{< img src="regex.png" alt="Screenshot of regex implementation" caption="Excerpt from my disgusting regex parsing implementation" maxWidth="300px" hasBorder="True" align="right" >}}

At the time I stumbled upon ingredient-phrase-tagger, I was parsing ingredients in an ugly, hacky way: with [regular expressions](https://en.wikipedia.org/wiki/Regular_expression).

It wasn't sustainable. Every time I added a new recipe site to KetoHub's index, I had to modify my long sequence of regular expressions to handle new edge cases. Over time, the ingredient parsing code grew hellishly convoluted and began breaking in confusing ways.

My regular expressions were tedious to maintain and debug. I felt like I was chopping away at ingredients with a chainsaw, blindfolded. The *Times'* library looked like it dissected ingredients with clean, surgical precision. I desperately wanted it.

But first, I had to figure out how to make their code run.

## Why was this hard?

The *Times* built this library for a hack week event, so it lacked many features one expects of a professional software project, such as  automated tests or thorough documentation.  The README included instructions for installing the application, but they only worked on Mac OS X. Without tests or a continuous integration configuration, it was unclear how to make the code run at all.

{{< img src="osx-install.png" alt="OS X install instructions" caption="[Installation instructions](https://github.com/NYTimes/ingredient-phrase-tagger#development) for ingredient-phrase-tagger library" maxWidth="756px" hasBorder="True" >}}

Of course, I wasn't the only one to notice these issues. At the time they published, the *Times* received tough criticism from famed Python developer D. John Trump:

{{< img src="trump-tweet.png" alt="Trump tweet about code" maxWidth="628px" hasBorder="True" >}}

## Building it in Docker

I wanted to build the library in a way that ensured consistent behavior regardless of the OS. This seemed like a job for Docker.

Docker allows developers to build self-contained environments for an application that run anywhere. It only took a single command for me to spin up an Ubuntu base environment on which to build:

```bash
$ docker run -it --rm ubuntu:16.04 /bin/bash
root@164475279c95:/# cat /etc/*release | head -n 2
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=16.04
```

The ingredient parsing library's first dependency was its machine learning engine: a C++ application called [CRF++](https://taku910.github.io/crfpp/).

{{< img src="crfpp-installation.png" alt="CRF++ installation instructions" caption="CRF++ [installation instructions](https://taku910.github.io/crfpp/#install)" maxWidth="426px" hasBorder="True" >}}

The CRF++ build instructions looked simple enough, so I ran the commands within my Ubuntu container:

```bash
$ apt-get update && apt-get install git build-essential -y
...
$ git clone https://github.com/taku910/crfpp.git
$ cd crfpp
$ ./configure
...
$ make
...
g++ -DHAVE_CONFIG_H -I.     -O3 -Wall -c -o crf_learn.o crf_learn.cpp
crf_learn.cpp:9:21: fatal error: winmain.h: No such file or directory
compilation terminated.
```

Whoops, `make` failed with an error about a missing Windows header file.

Was that code still maintained?

{{< img src="crfpp-commits.png" alt="CRF++ change history" caption="CRF++ [change history](https://github.com/taku910/crfpp/commits/master), showing the last commit in 2015" maxWidth="800px" hasBorder="True" >}}

Oh no! Another dead repository? I was already resurrecting one library. I didn't want to take on another.

## Taking a small detour

The CRF++ error message about `winmain.h` was a bad sign, but if the *Times* developers ran CRF++ on OS X, I knew it was possible to run it in a non-Windows environment.

Maybe someone had already fixed it, but the maintainers never merged in the change. I checked the repo's outstanding pull requests. [One, in particular](https://github.com/taku910/crfpp/pull/15), seemed promising:

{{< img src="winmain-pr.png" alt="CRF++ pull requests" caption="[Pending pull requests](https://github.com/taku910/crfpp/pulls) into CRF++" maxWidth="800px" >}}

The pull request might as well have been titled, "Hey look, Michael! I solved the exact problem you're struggling with," so I applied [@humem](http://github.com/humem)'s patch:

```bash
$ git remote add humem https://github.com/humem/crfpp.git
$ git checkout -b patch
Switched to a new branch 'patch'
$ git pull humem patch
remote: Counting objects: 2, done.
remote: Total 2 (delta 1), reused 1 (delta 1), pack-reused 1
Unpacking objects: 100% (2/2), done.
From https://github.com/humem/crfpp
 * branch            patch      -> FETCH_HEAD
 * [new branch]      patch      -> humem/patch
Updating 1dc92a6..37ec31f
Fast-forward
 winmain.h | 69 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 69 insertions(+)
 create mode 100644 winmain.h
```

...and then tried building again:

```bash
$ make
make  all-am
make[1]: Entering directory '/crfpp'
g++ -DHAVE_CONFIG_H -I.     -O3 -Wall -c -o crf_learn.o crf_learn.cpp
/bin/bash ./libtool --tag=CXX   --mode=link g++  -O3 -Wall   -o crf_learn crf_learn.o libcrfpp.la -lpthread -lpthread -lm -lm -lm
libtool: link: g++ -O3 -Wall -o .libs/crf_learn crf_learn.o  ./.libs/libcrfpp.so -lpthread -lm
g++ -DHAVE_CONFIG_H -I.     -O3 -Wall -c -o crf_test.o crf_test.cpp
/bin/bash ./libtool --tag=CXX   --mode=link g++  -O3 -Wall   -o crf_test crf_test.o libcrfpp.la  -lpthread -lpthread -lm -lm -lm
libtool: link: g++ -O3 -Wall -o .libs/crf_test crf_test.o  ./.libs/libcrfpp.so -lpthread -lm
make[1]: Leaving directory '/crfpp'
```

Great! `make` succeeded.

Now, all I had to do was `make install` and run CRF++:

```bash
$ make install
...
$ crf_test --version
crf_test: error while loading shared libraries: libcrfpp.so.0: cannot open shared object file: No such file or directory
```

No! The installation succeeded, but CRF++ immediately blew up with an error about a missing library.

I Googled the error message and found [a StackOverflow answer](https://stackoverflow.com/a/39635827/90388) telling me to run the `ldconfig` command. I tried it and...

```bash
$ ldconfig
$ crf_test --version
CRF++ of 0.59
```

Woohoo! It worked!

{{<zestful-ad>}}

## *Actually* building it in Docker

Oh, wait. That wasn't really what I was trying to do.

My [yak shaving](https://seths.blog/2005/03/dont_shave_that/) adventure sidetracked me so much that I forgot my original goal: run ingredient-phrase-tagger within a Docker container.

Nevertheless, I was hopeful that the worst was over. The only other installation step was to run the library's [setuptools](https://pypi.org/project/setuptools/) installer, and I generally had good luck with setuptools:

```bash
$ apt-get install python python-pip -y
...
$ git clone https://github.com/NYTimes/ingredient-phrase-tagger.git
$ cd ingredient-phrase-tagger
$ python setup.py install
...
Installed /usr/local/lib/python2.7/dist-packages/six-1.11.0-py2.7.egg
Finished processing dependencies for ingredient-phrase-tagger==0.0.0.dev0
```

Whew! No problems there. It looked like I had everything installed.

## Taking it out for a spin

The repository's "Quick Start" instructions referred to a shell script called [`roundtrip.sh`](https://github.com/NYTimes/ingredient-phrase-tagger/blob/e414c2ca279f23c99c8338ceba00653d88d40dfe/roundtrip.sh) that exercised the library's functionality end-to-end:

```bash
$ ./roundtrip.sh
...
visualizing...
./roundtrip.sh: 18: ./roundtrip.sh: ruby: not found
```

Hmm, so this Python library needs Ruby for some reason. Fine, let's try that again:

```bash
$ apt-get install ruby -y
...
$ ./roundtrip.sh
```

It ran for about five minutes and spit out lots of output, finally ending with this:

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

Success!

Oh, wait. What did it do?

## Testing with my ingredients

The library was doing *something*, but it didn't give me insight into what was going on. The documentation mentioned two scripts for parsing arbitrary ingredients, [`parse-ingredients.py`](https://github.com/NYTimes/ingredient-phrase-tagger/blob/e414c2ca279f23c99c8338ceba00653d88d40dfe/bin/parse-ingredients.py) and [`convert-to-json.py`](https://github.com/NYTimes/ingredient-phrase-tagger/blob/e414c2ca279f23c99c8338ceba00653d88d40dfe/bin/convert-to-json.py), so I tried those:

```bash
$ echo "1 pinch Garlic Powder" >> input.txt
$ echo "1 Cup Mozzarella, shredded" >> input.txt
$ echo "6 slices cooked bacon" >> input.txt

$ python bin/parse-ingredients.py input.txt > results.txt
$ python bin/convert-to-json.py results.txt
[
    {
        "input": "1 pinch Garlic Powder",
        "display": "<span class='qty'>1</span><span class='unit'>pinch</span><span class='name'>Garlic Powder</span>",
        "name": "Garlic Powder",
        "unit": "pinch",
        "qty": "1"
    },
    {
        "comment": "shredded",
        "name": "Cup Mozzarella",
        "qty": "1",
        "other": ",",
        "input": "1 Cup Mozzarella, shredded",
        "display": "<span class='qty'>1</span><span class='name'>Cup Mozzarella</span><span class='other'>,</span><span class='comment'>shredded</span>"
    },
    {
        "comment": "cooked",
        "name": "bacon",
        "qty": "6",
        "input": "6 slices cooked bacon",
        "display": "<span class='qty'>6</span><span class='unit'>slices</span><span class='comment'>cooked</span><span class='name'>bacon</span>",
        "unit": "slice"
    }
]
```

It worked!

Well, it mostly worked. The model failed to identify "Cup" as the unit of measurement in "1 Cup Mozzarella, shredded." The machine learning model apparently thought there was a product called, "Cup Mozzarella," and the recipe needed one of those.

{{< img src="cup-mozzarella.jpg" alt="Picture of Cup Mozzarella product" caption="A product invented by the machine learning model" maxWidth="300px" >}}

{{<zestful-ad>}}

## Making it easier

I didn't want to go through all of those steps every time I ran the library, so I needed a way to speed up the installation process.

First, I made [my own fork](https://github.com/mtlynch/crfpp) of the CRF++ repository that included @humem's fix. That provided a convenient copy of CRF++'s source that built cleanly on Linux. Then, I collected all of the shell commands I ran into a `Dockerfile`:

{{< inline-file filename="Dockerfile" language="bash" >}}

If I want an environment with this library in the future, all I need to do is run these two commands in the directory with the `Dockerfile`:

```bash
docker build --tag phrase-tagger .
docker run -it --rm phrase-tagger /bin/bash
```

Those commands create a Docker container that satisfies all of the ingredient parsing library's dependencies. Within that environment, I can run the `roundtrip.sh` script without any errors:

```bash
$ ./roundtrip.sh
...
Done!434.32 s

testing...
visualizing...
evaluating...

Sentence-Level Stats:
        correct:  1487
        total:  1999
        % correct:  74.3871935968

Word-Level Stats:
        correct: 10391
        total: 11450
        % correct: 90.7510917031
```

To make it even easier, I uploaded the container image to [Docker Hub](https://hub.docker.com/r/mtlynch/ingredient-phrase-tagger/) so that all of you at home can use my container with this single command:

```bash
docker run -it --rm mtlynch/ingredient-phrase-tagger:nyt-untouched /bin/bash
```

I recorded the demo below on an Ubuntu system with nothing installed except Docker. I used it to pull down my custom image from Docker Hub, train a machine learning model, and parse a new ingredient:

<script src="https://asciinema.org/a/CEHqACV35S4UglTvwke0q6DxB.js" id="asciicast-CEHqACV35S4UglTvwke0q6DxB" async></script>

## Onward

The code ran successfully, and my work was reproducible on any system that supported Docker. What was next?

I hadn't dug into the source yet, but I noticed odd things from running the scripts. Most notably, the usage scripts felt opaque and rigid &mdash; training data, file locations, and model parameters were all hard-coded and buried in shell scripts. I wanted the user to have the freedom to tune these values to optimize the model's accuracy.

Also, did you catch this in the parsed output?

```javascript
"display": "<span class='qty'>2</span><span class='unit'>tablespoons</span><span class='name'>lemon juice</span>",
```

Why is a machine learning model responsible for structuring ingredient data *and* generating HTML? That would be like putting a neurosurgeon in charge of brain surgery *and* assembling hospital furniture.

I would have loved to dive right into the code to make sweeping functional changes, but first I had to perform a critical step: stabilization. I needed to lock in the library's existing behavior so that any changes I made to its functionality were explicit and deliberate.

I cover that in [part two of this series](/resurrecting-2/), which describes:

* How I added end-to-end tests so that I wouldn't accidentally break anything
* How I configured the tests to run automatically before applying any change to the code
* How I added my standard toolset to the codebase to facilitate maintenance

{{<zestful-ad>}}

---

*Cover illustration by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/). My fork of the ingredient-phrase-tagger library is available on [Github](https://github.com/mtlynch/ingredient-phrase-tagger). I offer a managed service based on this library called [Zestful](https://zestfuldata.com).*