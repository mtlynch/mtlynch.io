---
title: 'Resurrecting a Dead Library: Part One - Resuscitation'
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

Recently, I stumbled upon an open-source library from a time long forgotten. From a time when the earth was roamed by functions as big as buildings. A time when everyone knew the words "unit" and "testing," but nobody had yet dared use them in the same sentence. Oh, wait, it's under source control, so I can just check the date right now:

Oh, 2016? So I guess it's not as vintage as I thought, but I still needed to restore it!

# What is it?

The library is the ingredient-phrase-tagger, published by the *The New York Times*. They describe the backstory on their blog (TODO: link), but the short version is library that the *The New York Times* had a big archive of recipes in non-digital from. They had been paying contractors to digitize them by hand. As part of that work, the contractors need to put the recipe ingredients into a structured data format. If the recipe calls for "2 1/2 cups of finely chopped red onions," the contractor put that in a database in a way that looked kind of like this:

| input | quantity | unit | name | comment |
|--------|------------|------|--------|-------------|
| "2 1/2 cups of finely chopped red onions" | 2.5 | cup | red onions | finely chopped |

TODO: More rows

Eventually, they realized that they had enough data that they could train a machine learning model to do this automatically, so they wrote tools for that.

They mention on the blog that this was mostly a hobby project for them, which might explain the dearth of some features one might expect of a mature software project, such as automated tests or continuous integration.

I wasn't the only one to notice these issues. At the time they published it, they received tough criticism from famed Python developer D. John Trump:

Fake Trump tweet: Failing @nytimes doesn't even unit test their code before release! very DISRESPECTFUL to @kentbeck!


# What business is it of mine?

I was interested in this code for my project KetoHub (TODO: link). I wanted to make my recipes searchable and I wanted search to be so good that you could type part of an ingredient and see results (TODO: screenshot). For that search to work, I want to match on only the product name. For example, if someone searches for "cup" they're probably expecting to see results for things like [Coconut Flour **Cup**cakes](https://www.heyketomama.com/keto-coconut-flour-cupcakes/) or [Spaghetti Squash Taco **Cup**s](http://queenbsincredibleedibles.com/spaghetti-squash-taco-cups/). If I matched on the whole ingredient string and showed the user every ingredient that involves a "cup" of something, that's not a good search experience.

I had solved this in a very hacky way with a hellish hodgepodge of regular expressions (TODO: explain), but I was desperate for something cleaner.

TODO: Screenshot of regex

If ingredient-phrase-tagger could do it, I was happy to save time on that.

# Running it locally

The first step was to see if it still ran at all and produced sane results. The repo only had install instructions for OS X. I hired my friend [Ferngully](#/tags/ferngully) to experiment with it and see if she.

Here is a sample of her initial results:

```text
5 large stalks celery
6 ounces macadamia nuts
2 tablespoons lemon juice
```

```javascript
[
    {
        "input": "5 large stalks celery", 
        "other": "5 large", 
        "name": "celery", 
        "unit": "stalk", 
        "display": "<span class='other'>5 large</span><span class='unit'>stalks</span><span class='name'>celery</span>"
    }, 
    {
        "input": "6 ounces macadamia nuts", 
        "other": "6", 
        "name": "macadamia nuts", 
        "unit": "ounce", 
        "display": "<span class='other'>6</span><span class='unit'>ounces</span><span class='name'>macadamia nuts</span>"
    }, 
    {
        "input": "2 tablespoons lemon juice", 
        "other": "2", 
        "name": "lemon juice", 
        "unit": "tablespoon", 
        "display": "<span class='other'>2</span><span class='unit'>tablespoons</span><span class='name'>lemon juice</span>"
    }
]
```

Success!

The results weren't amazing. You can see that . For my purposes, it really only mattered if it was getting the correct result for the `"name"` field and from Ferngully's initial results, it seemed like it was.

And again, I'm seeing some warts in this library, particularly with the `"display"` field. It's challenging enough for a machine learning model to do natural language processing, so it shouldn't *also* be responsible for rendering HTML.

# Running it in Docker

Ferngully got this running on her hipster Mac laptop, which was all well and good for her, but I wanted to run this on my development VM, which was Ubuntu 16 as well as in continuous integration.

The obvious choice was to use Docker, an excellent tool for creating self-contained environments in which an application can run.

Most of the dependencies were just Python packages, so those installed trivially. It had one dependency that proved trickier, a C++ application called CRF++. This is the application that does the heavy lifting for the machine learning parts of the application. It seemed like a popular open-source library, so I was confident I could run it on a Linux system without much trouble. The instructions looked simple enough, so why don't I just try building:

Darn!

```bash
:/crfpp# git clone https://github.com/taku910/crfpp.git
:/crfpp# cd crfpp
:/crfpp# ./configure
...
:/crfpp# make
...
g++ -DHAVE_CONFIG_H -I.     -O3 -Wall -c -o crf_learn.o crf_learn.cpp
crf_learn.cpp:9:21: fatal error: winmain.h: No such file or directory
compilation terminated.
```

Was this library still maintained?
 
```
:/crfpp# git log -1
commit 1dc92a606f874a4fe52603803364cc1d90f952fb
Author: taku <taku@localhost>
Date:   Sat Mar 14 16:52:37 2015 +0900

    Moved doc/* to top directory so that they are shown in Github pages.
```

No! This repository is unmaintained too? I was already restoring one library. I didn't want to restore another. I checked the repo's outstanding pull requests to see if anyone had fixed it and just not merged it in yet. The oldest pull request looked very promising:

https://github.com/taku910/crfpp/pull/15

I [forked the repo](https://github.com/mtlynch/crfpp), cherry-picked @humem's change, and boom! It worked!

TODO: show how I did that.

```bash
:/crfpp# make
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

Now all I had to do was `make install` and run it:

```bash
:/crfpp# make install
:/crfpp# crf_test --version
crf_test: error while loading shared libraries: libcrfpp.so.0: cannot open shared object file: No such file or directory
```

Nooo!

A few Googles later, I found this possible solution, so I tried it:

```bash
:/crfpp# echo "/usr/local/lib" > /etc/ld.so.conf.d/local.conf && ldconfig
:/crfpp# crf_test --version
CRF++ of 0.59
```

Success!

# *Actually* running it in Docker

As is so often the case in yak shaving adventures with software development, I got so sidetracked by my yak shaving adventure that I forgot what I was actually trying to do: run ingredient-phrase-tagger in a Docker container. I got

```bash
:/ingredient-phrase-tagger# python setup.py install
```

I removed the call to `visualize.rb` and ran `roundtrip.sh` and everything seemed to work end-to-end:

```bash
# Delete ruby line.
:/ingredient-phrase-tagger# sed -i '/ruby/d' roundtrip.sh

:/ingredient-phrase-tagger# ./roundtrip.sh
```

It ran for about five minutes and produced this

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

I could also see that it produced a model file:

```
# ls tmp/
model_file  test_file  test_output  train_file
```

# Success

Next, I 

* Scaffolding:
* Rehabilitation: In which I fix errors

---


Note: For the sake of brevity clarity, I took some creative liberties in the retelling of the changes. If you look at the commits, they don't *perfectly* match up to what I presented here.