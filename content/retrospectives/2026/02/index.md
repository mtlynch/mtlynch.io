---
title: "Refactoring English: Month 14"
date: "2026-02-11"
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

### Publish three chapters of _Refactoring English_

- **Result**: XX
- **Grade**: XX

TODO

### Publish my 2025 [annual review](/tags/annual-review) (year 8)

- **Result**: XX
- **Grade**: XX

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

I published ["The Most Popular Blogs of Hacker News in 2025"](https://refactoringenglish.com/blog/2025-hn-top-5/) at the beginning of January, and it did far better than I expected. It gave January the book's highest visitors and revenue since the Kickstarter last year.

The new owner of TinyPilot wrapped up their sponsorship of the book in 2025, so that monthly payment is done. I'm not planning to pursue any more professional sponsors because the companies don't seem that interested.

## Success by writing about other writers

["The Most Popular Blogs of Hacker News in 2025"](https://refactoringenglish.com/blog/2025-hn-top-5/) is a continuation of a strategy I've been exploring for about six months that basically boils down to celebrating other software writers.

Last summer, I met a professional romance novelist at a party, and it was interesting hearing about her work because she was also indie and self-published. Even though the subjects of our books were drastically different, we had many similar problems.

I asked her how she found readers, and she said, "That's the question!"

She told me that she had great results by starting a newsletter to review other romance novels, primarily by indie authors. And it created a virtuous cycle for everyone involved because:

1. Her subscribers discover other interesting novels through her newsletter.
1. New readers buy her book after discovering her reviews.
1. Other indie authors are excited about being reviewed, so they direct their own readers to her newsletter, which increases (2).

I love strategies where incentives align for everyone, so I started looking for ways to apply that to my book.

TODO: Visit stats, HN vots, Lobsters votes

- [The Software Essays that Shaped Me](https://refactoringenglish.com/blog/software-essays-that-shaped-me/)
- [What Makes the Intro to Crafting Interpreters so Good?](https://refactoringenglish.com/blog/crafting-interpreters-intro/)
- [The Most Popular Blogs of Hacker News in 2025](https://refactoringenglish.com/blog/2025-hn-top-5/)

## Discovering the power of LLM sandboxes

I had a bit of a revelatory a year ago when [I first started using an AI agent](/notes/cline-is-mesmerizing/). At that point, I just let it edit files while I watched, and I thought that was a scary amount of control to give an LLM.

For the past year, I've been coding with AI with the Cline extension in VS Code, and it sped up a lot of my workflows.

But then my friend okay showed me his AI workflow where he lets Codex edit files and run commands without direct supervision. It made me realize how much time I've been wasting micromanaging my AI agents and dealing with hangs in Cline.

okay said that he sometimes lets Codex work unsupervised for an hour or more, and I couldn't believe it. I'd

I still don't trust any AI agent enough to let it run on a real machine, so I set up a custom sandbox for running AI agents on my machine. I go to the directory for one of my projects and run my custom command: `sb`. It spins up a rootless podman container that has no access to my local network and only can see the current working directory. It has Codex and Claude Code pre-installed and authenticated with my accounts.

There's something in the ether because after I started working on my sandbox, I've seen a new blog post almost every day about a new AI sandbox.

I don't think my particular sandbox is so great, so I'm not releasing it, but I think there's a good meta-lesson in building your own sandbox, so I might write more about that.

One of the biggest misunderstandings around AI sandboxes is what they protect you against and what they don't. I see people talking about how they can't use Docker because containers aren't a real security boundary, but then they have a VM-based sandbox that mounts their local directory, and then they proceed to run code their AI agent wrote. And obviously, if you're worried your AI will exploit Docker vulnerabilities to escape your container, you shouldn't be sharing git hooks with it or running code you let it generate.

I think the much more likely risk is actually incompetent AI that accidentally exfiltrates my private data to the vendor's servers or deletes data I didn't want it to touch. And for that, a container is fine.

## AI is great at porting code

From my experience, AI has the most impact in solving problems where:

1. Success is objective and definable.
   - e.g. "Find the cause of this crash" is objective and definable whereas "make this landing page better" is not.
1. The problem is not unique or novel.
1. A human with junior-level software knowledge could solve the problem with a search engine, experimentation, and patience.

Some examples of this:

- Refactoring code that has automated tests
- Porting code from one language/technology to another while preserving behavior
- Compiling a project from source, installing any necessary dependencies
- Fixing code to make a test pass

For the past couple of months, I've been using AI to port code, and it's worked extremely well. I maintain some codebases where I wish I'd made different choices about my tech stack but it would be too expensive to do a from-scratch rewrite. But with AI, the from scratch rewrite is inexpensive and fast.

Here are some codebases I ported recently:

- Converted the Zestful website [from Vue/Nuxt2 to vanilla HTML with Hugo](https://github.com/mtlynch/zestful-frontend2/pull/152)
  - I got a Github alert saying that I had some dumb vulnerability through a transitive Node.js library I'd never heard of, and I thought, "I'd love to never get another one of these alerts again." So I had AI rewrite the site in Hugo and plain HTML/JS/CSS.
- Ported PicoShare's CSS framework [from Bulma to Bootstrap 5](https://github.com/mtlynch/picoshare/pull/718)
  - When I started PicoShare, I wanted to try out Bulma as a CSS framework. It was fine, but I prefer Bootstrap, so I kept using it everywhere else and always had to switch gears when I worked on PicoShare.
- Converted LogPaste's e2e tests [from Cypress to Playwright](https://github.com/mtlynch/logpaste/pull/235)
  - I wrote the e2e tests before I discovered Playwright, and now I'm so used to Playwright that it's hard to go back to Cypress.
- Converted the fusion RSS reader [from Svelte to vanilla HTML + Go templates](https://github.com/mtlynch/fusion/pull/3)
  - This is just a proof of concept, as fusion isn't my project, but I'd like to fork it to use my preferred tech stack. AI did a good job converting all the Svelte.js code to vanilla HTML and Go templates.
- Converted the MeshCore web app [from Vue.js to Flutter](/retrospectives/2026/01/#creating-my-first-flutter-app)
  - This actually worked poorly because it's somewhat hard for AI to verify the result. I thought Flutter would emit semantic HTML for its web app output, but it actually generates a wonky Flutter-centric HTML dialect. The MeshCore app depends heavily on an external hardware device (the LoRa radio), so I had to be in the loop a lot.

## Side projects

## Wrap up

### What got done?

- Published [My Eighth Year as a Bootstrapped Founder](/bootstrapped-founder-year-8/)
- Published a new chapter of _Refactoring English_
- [Fixed a crash](https://github.com/podofo/podofo/pull/311) in the PoDoFo PDF reader that I discovered using [my PDF fuzzing workflow](/nix-fuzz-testing-1/)

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
