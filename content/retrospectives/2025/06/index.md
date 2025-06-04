---
title: "Educational Products: Month 8"
date: "2025-06-09"
description: I just need to focus for one hour per day.
---

## Highlights

- The writing techniques I planned last month are helping me publish more and focus better.
- I need to find more ways to keep having conversations with readers about the book.

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Publish two chapters of my book to pre-order readers

- **Result**: Published "You're Qualified to Write a Blog Post" and "Good vs. Bad Content Marketing"
- **Grade**: A

I completed these chapters and sent them to pre-order customers.

### Assign soft writing time limits to every chapter of my book

- **Result**: Added time limits to each chapter and wrote a quick script to process them all.
- **Grade**: A

Soft time limits helped me avoid spinning on the same chapter forever.

### Adapt [preview chapters](https://refactoringenglish.com/chapters/) of my book to Asciidoctor

- **Result**: Started this but never finished
- **Grade**: F

I kept putting this off because it's so boring to adapt existing chapters from Hugo to Asciidoc, but it will be good to get done.

It was harder than I expected to port over the custom CSS styles I'd applied on the web versions of the samples to Asciidoc, so I need to get creative in how I style the PDF/epub versions.

## One hour of good writing per day works

In last month's retrospective, I brainstormed ideas about [how to manage my time better as I write my book](/retrospectives/2025/05/#managing-my-time-as-i-write-a-book).

I found it difficult to decide how much time to invest in each chapter and how many hours per day to spend on writing given that I have no strict deadline and no objective way to decide if any chapter is polished enough to publish.

My plan was:

- Write in flow state for 60 minutes per day (just writing, no browsing the web or my phone).
- Start each workday by planning how I'll spend each 30-minute block in my schedule.
- Assign soft limits to how much I can spend on each chapter.

I'm happy to report that these techniques worked pretty well. I didn't have perfect discipline every day, but when I know the goal is to only write for an hour per day, I found it easier to resist distractions and focus on writing.

The 60-minute limit also helped me capitalize on that time better. I used to just call the first hour of my day "writing time," and I'd allow myself to do anything writing-related, which included fixing grammar or writing easier posts (like these retrospectives). Recognizing that my flow state time is limited made me better at using that hour just for writing and editing, which are the most cognitively demanding tasks. So, I still make time in my day for less challenging book tasks, but I schedule them outside of my focus hour.

## Becoming less precious about my writing

There's a quote I love in Rob Fitzpatrick's book, [_Write Useful Books_](https://www.usefulbooks.com/book), about how it's more important for non-fiction authors to give practical, impactful advice than it is for them to have beautiful phrasing and perfect grammar:

> I’ve heard plenty of people recommend a messy-but-effective book by saying:
>
> > Listen, it’s terribly written and full of typos and has a cover that appears to have been drawn by a distracted toddler, but it’s got something inside that’s just too important to miss. It’s going to change your life. You’ve got to read it. Trust me.
>
> But I’ve never heard even a single person recommend a problem-solver with the inverse argument of:
>
> > This book is a real zero-impact way to spend thirteen dollars and three hours. But you can tell that the author is super smart, the cover is gorgeous, and there’s not even a single typo. You’re going to love it.
>
> Rob Fitzpatrick, [_Write Useful Books_](https://www.usefulbooks.com/book)

At the start of last month, I went through every chapter and assigned a time limit for the first draft. So, to declare that I wanted to spend just five hours on my content marketing chapter, I added this comment to the top:

```c
// Target: 5h
```

I ended up exceeding the limit on my content marketing chapter by three hours, so I updated the comment to this:

```c
// Original Target: 5h
// Target: 9h
// Elapsed: 8h
```

And I wrote a short script to tell me my progress on the full book:

```bash
$ ./dev-scripts/evaluate-time-remaining
Total target (current): 119.5h / 23.9wks
Total target (original): 114.0h / 22.8wks
Total elapsed: 19.5h / 3.9wks
Total remaining: 100.0h / 20.0wks
```

Obviously, I'm not perfect at obeying my time limits yet, but setting a limit discourages me from overinvesting in the wording at this point.

I have this mental block that because I'm writing a book about writing, all of the writing in the book has to be perfect before any readers see it. I'm trying to adopt the attitude that I'm currently just working on a first draft, and it's more important to convey useful ideas than to maximize eloquence.

## How can I keep talking to readers?

When I publish new blog posts, I get satisfaction in hearing feedback from readers and seeing discussions about my posts on places like Hacker News and Lobsters.

I find it hard to replicate that feeling of feedback for my book. I've tried sending out questionnaires, but only a handful of readers fill them out.

I need a way to keep talking to readers about the book, both for my motivation and to make sure I'm writing about things readers care about and my explanations make sense.

I'd like to do more video calls. I've done two live video calls with groups of readers so far, and those have been fun and helpful in understanding what readers want to learn from me and from the book.

## $7k for a brand new project is still pretty good

I'm still struggling with nagging doubts about my book. I'm betting a lot on a product that generates less money than a software product would. I've made about $7k from pre-orders, but I worry that I committed myself to the book for the next several months, and I might not make any money in that time.

Then, I realized that $7k in profit is pretty good five months in!

If I started working on a software product five months ago and already had $7k in profits, that would be a great start.

I haven't run the numbers, but I think that hour-for-hour, my book has had the third-best return on investment of any of my products (after TinyPilot and Hit the Front Page of Hacker News). I'm still falling shy of my $50k profit goal for 2025, but I'm doing better than I feel like I'm doing.

## Wrap up

### What got done?

- Published ["Which New Language Should I Learn for Web Development?"](/notes/which-new-language/)
- Published my [notes from Simon Willison's Interview on Software Misadventures](/notes/simon-willison-software-misadventures/)
  - I always feel like I should do more of this because I find it valuable to myself and for other people.
  - But then I do it, and it takes longer than I expect, and I can't share it anywhere, and I remember why I don't do it very often.
- I appeared as a guest on [The TMPDIR podcast](https://tmpdir.org/044/).
- Upgraded my home NAS server from 23 TB to 33 TB.

### Lessons learned

- Limit your focused writing time, but make the most of it.
  - Knowing that I have to stay in flow state for 60 minutes per day helps me focus and makes me value that time more.
- Prioritize conversations with readers.
  - Conversations with readers help my motivation and give me confidence that I'm writing something people want to read.

### Goals for next month

- Offer a lower-friction way for users to pre-order my book.
  - Currently, the only way is through Kickstarter, which requires readers to create a Kickstarter account.
- Publish a new sample chapter on the book website.
- Meet at least 10 readers on video calls.
