---
title: "Refactoring English: Month XX"
date: "2025-11-10"
description: TODO - One-line summary
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

### Set up editing discounts for readers who have read the book

- **Result**: Created a page explaining discounts
- **Grade**: A

I'm intentionally not advertising it as a perk of early access. My goal is to do editing work with people who are already enthusiastic about the book. I'm not trying to entice people to early access by promising discounts for editing.

I am revealing the discount publicly here because if you're interested enough in my work to read these monthly updates, you're also the kind of person I'd like to take on as a freelance editing client.

There have been no freelance editing customers since I doubled my standard rate and added a discount for early access customers, but that's actually fine. I've had more writing output as a result, and I'd like the numbers to work out so that if freelance editing pulls me away from writing, the financial compensation makes me feel like it's a good tradeoff.

### Create a list of early access customers to reach out to

- **Result**: Created a list of 63 customers I can contact
- **Grade**: A

I keep setting a goal to reach out more to readers one on one. I realized there was a lot of friction to finding customers to reach out to, so I simplified my goal to just create a list of customers that are a good match for me to reach out to, according to this criteria:

1. Their email address isn't Gmail/Yahoo/Hotmail or another email-only domain
1. The domain name from their email address serves a website that responds to HTTP requests

Basically, I'm looking for the readers whose websites I can look at to allow me to say something unique and personal to them. I reached out to three customers based on this list. Two of them responded, and one attended last month's live session. I suspect the personalized email was a factor in their attendance. So, I continue to get positive results on this 1:1 outreach; I just need to do it more.

### Publish a new chapter of the book

- **Result**: I published three new chapters
- **Grade**: A

I published ["How to Get Meaningful Feedback on Your Design Document,"](https://refactoringenglish.com/chapters/useful-feedback-on-design-docs/) "Verbs Drive the Sentence," and "Stay Positive." The design docs one is technically half a chapter. The excerpt on the website talks a little about writing but mostly about reviews. In the actual book, I'm going to have a section on writing the design doc and a section on reviewing it.

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

Visits to the website are way up. Visitors to the website in October were highest since [my big Kickstarter blitz in March](/retrospectives/2025/04/#blogging-like-my-livelihood-depends-on-it). There were 22.3k unique visitors. Of those, 93% came through ["The Software Essays that Shaped Me"](https://refactoringenglish.com/blog/software-essays-that-shaped-me/).

I wish pre-orders scaled a bit more linearly with visitors, but I'm still happy to see that blog posts helps new readers find the book.

## I'm running late

19.8 weeks completed and 11.6 weeks remaining. There are only about 8 weeks left in the year, so I probably won't finish by December.

My estimates were wrong, but I had chapters that I overestimated and underestimated, so on net, my estimate of total hours has been accurate. I've been inaccurate in how many hours I spend on writing the book in a given week. I generally can only write for about an hour per day. I can write for longer, but my productivity goes down a lot, so I feel like my second hour of writing is about 20% as productive as the first. I can sometimes squeeze in a second hour in the afternoon, but that generally doesn't work.

But in addition to writing the book, I also write blog posts, monthly retrospectives, and occasional notes. Those usually eat up my hour of writing for the day as well. I also didn't take into account:

- Freelance editing work
  - I find it hard to [do both in the same day](/retrospectives/2025/10/#adjusting-my-approach-to-freelance-editing)
- Sick days
- Time off
- Days where I just can't get motivated to write.

I made the estimates on May 1, which was six months ago. I estimated that I would write for an average of 5 hours per week. In reality, I've written 99 hours over six months (26 weeks), so I actually only write my book for about 3.8 hours per week.

If I assume the 58 remaining hours should take 15.3 weeks, which would mean I finish around mid-February 2026. For padding, I'm going to say I'm aiming to finish the book by the end of March 2026.

I also feel more confident about the timelines for the remaining chapters. The early chapters of the book were harder to write because I had rough ideas but I needed to refine them a lot. But remaining chapters like explaining my writing routine are easier because it's more concrete, and there's less for me to figure out.

## Topic 2

## Topic 3

## Recommendations

### Evan Hahn's convenience scripts

The best article I read last month was Evan Hahn's, ["Scripts I wrote that I use all the time."](https://evanhahn.com/scripts-i-wrote-that-i-use-all-the-time/) Evan shares several dozens of scripts that make life easier as a developer. My favorites were:

- [`copy`](https://codeberg.org/EvanHahn/dotfiles/src/commit/843b9ee13d949d346a4a73ccee2a99351aed285b/home/bin/bin/copy): Read from stdin and store it in the system clipboard.
- [`pasta`](https://codeberg.org/EvanHahn/dotfiles/src/commit/843b9ee13d949d346a4a73ccee2a99351aed285b/home/bin/bin/pasta): Print from the system clipboard to stdout.
- [`pastas`](https://codeberg.org/EvanHahn/dotfiles/src/commit/843b9ee13d949d346a4a73ccee2a99351aed285b/home/bin/bin/pastas): Watch the system clipboard and print to stdout every time it changes.
  - I missed this on my first read, but it's really clever. You can run `pastas | wget --input-file=/dev/stdin`, and it will just download all the URLs you copy to your clipboard.
- [`emoji`](https://codeberg.org/EvanHahn/dotfiles/src/commit/843b9ee13d949d346a4a73ccee2a99351aed285b/home/bin/bin/emoji): Search for emoji by text. Like `emoji cool` prints out all the emoji that are associated with the idea of "cool."

I loved Evan's article because so many of his scripts were great ideas that I immediately adopted. But I liked the meta-idea of it that I should be looking for more scripts to remove friction from my common workflows.

It inspired me to add a `chat` script to my path to ask questions to a locally-hosted LLM. I often find myself going to the browser to look up semantics for command-line tools, so I can instead stay on the command line and just type it to `chat`:

```bash
#!/usr/bin/env bash

# Read prompt from command-line arg.
PROMPT="$1"

# Add implicit context for the prompt.
PROMPT+=' Assume a Linux OS.'
PROMPT+=' Prefer command-line tools.'
PROMPT+=' Optimize for the simplest possible response.'
PROMPT+=' If there are multiple methods, show me the simplest one.'
PROMPT+=' If possible, show me just a code snippet with no additional explanation.'

MODEL='llama3.2:1b'

ollama run $MODEL "$PROMPT"
```

For example, I used it yesterday to remember how to resize an image:

````bash
$ chat 'how do I use imagemagick to resize an image to 1600px in width?'
```bash
convert input.png -resize 1600x output.png
```
````

And it's super fast! That prompt completed on my system in 265ms, so it's much faster than me switching to a browser, searching, clicking for an answer, then switching back to my task.

Evan's companion article, ["Why 'alias' is my last resort for aliases"](https://evanhahn.com/why-alias-is-my-last-resort-for-aliases/) dovetails well with his scripts, as it argues that putting convenience scripts in `PATH` (e.g., under `~/.local/bin`) affords you much more flexibility than using shell aliases.

### _Oxygen Not Included_

I'm not an active gamer, but I buy one computer game per year. I typically only play each game for 10-20 hours before I get bored, but it's fun to pop into a new game every once in a while.

_Oxygen Not Included_ been on my mind for almost a year since I saw [Andrew Kelly and Mitchell Hashimoto talking about](https://phanpy.social/#/mastodon.social/s/113602735590180420) how it's so good for practicing systems thinking that it should be its own required course in elementary school.

{{<img src="oxygen-not-included.webp" max-width="800px">}}

I started playing _Oxygen Not Included_ in October, and it's really fun. I've seen it compared to Factorio and Rimworld, but I've never played those games. The game it most reminds me of is _Stardew Valley_, specifically the farming part of the game.

- It's pretty fun!
- The biggest problem is that it's pretty difficult to learn, as it's not obvious how to use most of the objects in the game.

If you're an _Oxygen Not Included_ fan, tell me the dumb things I'm [doing with my colony](oxygen-not-included.webp).

## Wrap up

### What got done?

-

### Lessons learned

-

### Goals for next month

- Publish two new book chapters
-
