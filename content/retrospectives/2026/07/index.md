---
title: "Refactoring English: Month 19"
date: "2026-07-15"
description: Do people pay more for a finished book?
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and founder of small, indie tech businesses. I'm currently working on a book called [_Refactoring English: Effective Writing for Software Developers_](https://refactoringenglish.com).

Every month, I publish a retrospective like this one to share how things are going with my book and my professional life overall.

{{</notice>}}

## Highlights

- _Refactoring English_ had its second-best month of sales.
- I examine my sales numbers to see whether people are more likely to purchase a complete book as opposed to an almost-complete draft.
- I completed my book feedback tool.
- I'm trying a new tool to track my time.

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Invest at least five hours into improving the _Refactoring English_ website

- **Result**: Spent about three hours improving the website
- **Grade**: B-

I improved the website a bit, but it could use more polish.

### Attract 30k unique readers to the _Refactoring English_ website

- **Result**: Got 17.5k unique readers.
- **Grade**: B-

I adapted my chapter on design docs to [a free excerpt](https://refactoringenglish.com/excerpts/write-an-effective-design-doc/). It did well on [Lobsters](https://lobste.rs/s/kmx6wx/how_write_effective_software_design) and [reddit](https://www.reddit.com/r/programming/comments/1uevttg/how_to_write_an_effective_software_design_document/), but it flopped on Hacker News.

I was surprised at how positive the reaction was to the design docs chapter. Generally, when I talk to developers about design docs, their main reaction is that they hate design docs and everything about them. The comments on my post were refreshingly supportive of design docs in general and my recommendations in particular.

### Complete my reader feedback tool

- **Result**: The tool is up and running.
- **Grade**: A

I got stuck for a while on [the great AI blockade](/retrospectives/2026/06/#ai-projects-and-the-great-blockade), but I pushed through by thinking more critically about splitting up large features and being less precious about code quality. In this case, done is better than perfect.

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

June was the best month of book revenue since the initial crowdfunding launch. The increase in visitors was because of my [excerpt about design docs](https://refactoringenglish.com/excerpts/write-an-effective-design-doc/).

## How much difference does the last 8% make?

For the last few months, the _Refactoring English_ website has listed my book as _almost_ complete in early access. I was curious to see what the sales impact would be of going from almost complete book to fully complete, so I looked at weekly sales:

<canvas id="book-sales-chart"></canvas>

Marking the book as complete didn't have an obvious impact on weekly sales, but what if I look at the daily averages?

<canvas id="all-currencies-completion-revenue-chart"></canvas>

Okay, so there was a slight increase after I marked the book as complete.

I was also curious whether Americans, in particular, bought at higher rates after I finished the book. I get email notifications every time someone purchases the book, and it seemed like more of my sales were from customers paying the US price, but I hadn't measured carefully. I checked the data to see if that was true:

<canvas id="completion-revenue-chart"></canvas>

Interesting! Completing the book had no impact on sales for customers purchasing with regional pricing, but customers purchasing in USD purchased at a 20% higher rate in the three weeks after the book was complete.

I didn't include sales after I published my latest excerpt because that obviously changes the numbers a lot, so let me treat that as its own category:

<canvas id="design-docs-excerpt-revenue-chart"></canvas>

But that's always a little skewed because Americans make up the largest share of my readers. What if I normalize revenue per-visitor?

<canvas id="revenue-per-visitor-chart"></canvas>

Oh, that's a switcheroo. By normalizing per-visitor, it flips the story. Now, it's the Americans that buy at the same rate for a finished vs. unfinished book. The readers outside the US are the ones spending about 20% more per visitor on the completed book.

I'm not sure how to use this information, but it did satisfy my curiosity.

## Readers are leaving useful feedback in my book's app

I've asked readers for feedback about my book in the past, and some readers gave enthusiastic feedback, but they were a small minority. I thought it would be fun and helpful to make a web-based feedback app that allows readers to leave notes as they read the book. It seemed like something I could knock out in a week or two. And now, two short... _months_ later, I've got it up and running!

{{<video src="feedback-app-demo-2026-07-14.mp4" max-width="800px" caption="A demo of my book feedback tool, where readers can leave me feedback directly in the book, and I can reply.">}}

My feedback tool has only been live for a few days, but it does seem to encourage readers to give more feedback. One reader just finished the book and cited the feedback app as one of his favorite parts of the experience, so that was neat.

## Using a time tracking tool again, 15 years later

About once a year, I ask myself: where does all my time go? This question comes up for me whenever I'm focused on a project, but it's not progressing as quickly as I expect. Here's me asking myself this question a few times over the years:

- [2022](/retrospectives/2022/02/#how-can-i-manage-tinypilot-with-only-20-hours-per-week)
- [2023](/retrospectives/2023/07/#where-does-my-time-go)
- [2025](/retrospectives/2025/08/#where-does-my-time-go)

This time, I thought, "Maybe I should use a time tracking tool."

About 15 years ago, I tried a time tracking tool called RescueTime. I didn't find it that useful, but I thought maybe I'd keep at it for a few weeks and see what happened. Then, I realized I was letting a random company collect data about every window that appeared on my screen, and I promptly uninstalled RescueTime.

I was wishing for an open-source version of RescueTime, when then I thought, "Wait, there probably is one." And there is. It's called [ActivityWatch](https://activitywatch.net/). It's open-source and privacy-first. It records all your window and browsing activity, but the data all stays local to your machine.

The problem is that ActivityWatch is way less polished than RescueTime. I couldn't understand at all what the timeline was trying to show me:

{{<img src="activitywatch-timeline.webp" max-width="600px" caption="I couldn't understand the timeline in the official ActivityWatch web interface.">}}

You're supposed to assign rules to tell ActivityWatch how to categorize your activities, but I found that UI difficult to use as well:

{{<img src="activitywatch-categorize.webp" max-width="400px" caption="I found the categorization in the official ActivityWatch web UI difficult to use.">}}

I was about to give up on ActivityWatch, and then I thought, "Well, the data collection part probably works. What if I vibecode my own frontend?"

So, [I did](https://codeberg.org/mtlynch/aw-web-ng), and it was pretty easy. I'm starting with a command-line tool, but I plan to expand it to a web app.

To use my custom ActivityWatch frontend, I create a config file to categorize activities based on app name, window title, and/or URL:

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

So far, the data is interesting, but the biggest challenge is that it's hard to categorize all of my activities automatically. For example, I can add a category for browsing Wikipedia, but am I doing it as part of legitimate work on my book? Or did I just go down a rabbit hole, and I'm suddenly reading about [inventors killed by their own inventions](https://en.wikipedia.org/wiki/List_of_inventors_killed_by_their_own_invention)?

## Wrap up

### What got done?

- Finished the _Refactoring English_ feedback tool.
- Made fixes to _Refactoring English_ ebook for consistency and EPUB compatibility.
- Made a [demo video for Little Moments](https://refactoringenglish.com/excerpts/write-an-effective-design-doc/#an-example-design-doc).
  - I'm quite proud of the silly photos in this.

### Lessons learned

- Customers don't care as much as I'd expect about the difference between a 100% complete book and an almost-complete book.
  - Readers do purchase the finished book at higher rates, but the effect is pretty small when you control for number of website visitors.

### Goals for next month

- Pitch to 5 podcasts to talk about _Refactoring English_.
- Attract 30k unique readers to the _Refactoring English_ website.
- Wrap up early access, and declare the 1.0 release of my book.

<script src="/third-party/chart.js/2.9.4/Chart.min.js"></script>
<script src="script.js"></script>
