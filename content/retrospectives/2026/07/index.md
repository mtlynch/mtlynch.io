---
title: "Refactoring English: Month 19"
date: "2026-07-13"
description: Apparently, people are more likely to be a complete book.
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and founder of small, indie tech businesses. I'm currently working on a book called [_Refactoring English: Effective Writing for Software Developers_](https://refactoringenglish.com).

Every month, I publish a retrospective like this one to share how things are going with my book and my professional life overall.

{{</notice>}}

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Invest at least five hours into improving the _Refactoring English_ website

- **Result**: Spent about three hours improving the website
- **Grade**: B-

TODO

### Attract 30k unique readers to the _Refactoring English_ website

- **Result**: Got 17.5k unique readers.
- **Grade**: B-

I adapted my chapter on design docs to [a free excerpt](https://refactoringenglish.com/excerpts/write-an-effective-design-doc/). It did well on [Lobsters](https://lobste.rs/s/kmx6wx/how_write_effective_software_design) and [reddit](https://www.reddit.com/r/programming/comments/1uevttg/how_to_write_an_effective_software_design_document/), but it flopped on Hacker News.

I was surprised at how positive the reception was. Generally, when I talk to other developers about design docs, they have animosity toward the practice itself before I even get to anything about my specific views, but the comments on my post were refreshingly supportive of design docs in general and my recommendations in particular.

### Complete my reader feedback tool

- **Result**: The tool is up and running
- **Grade**: A

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

This was a great month! It was the best month of book revenue since the initial crowdfunding launch, beating out the previous #2 by about 30%.

Here's what weekly book sales looked like:

<canvas id="book-sales-chart"></canvas>

<canvas id="all-currencies-completion-revenue-chart"></canvas>

## How much difference does the last 8% make?

TODO: Look at sales from 100% to new blog post, compare to same time period. Within that time period, do americans in particular buy at higher rates?

Declared complete on June 2.

<canvas id="completion-revenue-chart"></canvas>

Do americans care more about a finished book?

## My custom book feedback tool

I've only had my feedback tool for a few days, but it does seem to encourage more feedback and questions.

## Topic 3

## Trying out ActivityWatch

I go through periods of feeling like, "Where is all my time going?"

About 15 years ago, I tried RecueTime, and I didn't find it that useful, and then I realized I was letting a random company collect everything that appeared on my screen, and I promptly uninstalled it.

I was wishing that there was an open-source version of RescueTime, and then I thought, "Wait, there probably is one." And there is. It's called ActivityWatch.

The problem is that it's way less polished than RescueTime. I couldn't understand what the web interface was trying to report to me at all:

{{<img src="activitywatch-timeline.webp" max-width="600px">}}

And the process for adding categories through the web UI felt really confusing and coarsely-grained:

{{<img src="activitywatch-categorize.webp" max-width="400px">}}

So, I was going to abandon ActivityWatch, and then I thought, "Well, the data collection part probably works. What if I quickly vibecode my own frontend?"

And [I did](https://codeberg.org/mtlynch/aw-web-ng), and it was pretty easy. I create a config file that lets me categorize activities based on app name, window title, and/or URL (for browsers):

```yaml
- name: Book/Feedback Site
  rules:
    - url: "*refactoring-english-feedback*"
    - window_title: "*refactoring-english-feedback*"

- name: Book/Website
  rules:
    - url: "*refactoring-english-landing*"
    - window_title: "*refactoring-english-landing*"

- name: Book/Writing
  rules:
    - app: Zathura
    - app: Code
      window_title: "*refactoring-english*"
    - app: firefox
      window_title: "mtlynch/refactoring-english *"
```

And then the output looks like this:

```text
$ go run ./cmd/app --config data/config.yaml
...
Book               1h34m   19.7%
  Feedback Site      48m   10.0%
  Writing            46m    9.7%
```

## Wrap up

### What got done?

- Finished the _Refactoring English_ feedback tool.
- Made fixes to _Refactoring English_ for consistency and EPUB compatibility.
- Made a demo video for Little Moments.

### Lessons learned

-

### Goals for next month

- Pitch to 5 podcasts.

<script src="/third-party/chart.js/2.9.4/Chart.min.js"></script>
<script src="script.js"></script>
