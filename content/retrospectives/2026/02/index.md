---
title: "Refactoring English: Month 14"
date: "2026-02-12"
description: Discovering the power of AI sandboxes
banner_image: cover.webp
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and founder of small, indie tech businesses. I'm currently working on a book called [_Refactoring English: Effective Writing for Software Developers_](https://refactoringenglish.com).

Every month, I publish a retrospective like this one to share how things are going with my book and my professional life overall.

{{</notice>}}

## Highlights

- I'm seeing success with a strategy of finding new readers for my book by celebrating other software writers I like.
- I had another AI breakthrough experience by letting an AI agent run in a sandbox.
- I've been successfully using AI to port code and fix tech stack choices I regret.

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Publish three chapters of _Refactoring English_

- **Result**: Published two new chapters
- **Grade**: B-

I'm still having the same problem as last month where I'm getting too excited about AI experiments and letting it eat into my writing time.

### Publish my 2025 [annual review](/tags/annual-review) (year 8)

- **Result**: [Published it](/bootstrapped-founder-year-8/)
- **Grade**: A

It's done! I'm happy with how it turned out. I'm now finished with a string of posts I've had queued where I felt like I had to publish them by a certain date, either because they'd lose relevance later or because I have a tradition to publish on a certain day every year.

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

I published ["The Most Popular Blogs of Hacker News in 2025"](https://refactoringenglish.com/blog/2025-hn-top-5/) at the beginning of January, and it did far better than I expected. It gave January the book's highest visitors and revenue since the Kickstarter last year.

Other revenue is down, as I haven't had any editing clients, and the new owner of TinyPilot wrapped up their sponsorship of the book in 2025. I'm not planning to pursue any more professional sponsors because the companies don't seem that interested, and it's easier to focus on readers.

## Success by writing about other writers

["The Most Popular Blogs of Hacker News in 2025"](https://refactoringenglish.com/blog/2025-hn-top-5/) is a continuation of a strategy I've been exploring for about six months that basically boils down to: celebrate other software writers.

At a party last summer, I met a romance novelist who self-published. It was interesting hearing about her work because we had similar problems despite writing about drastically different topics.

I asked her how she found readers, and she said, "That's the question!"

She told me that she had great results by starting a newsletter to review other romance novels, primarily by indie authors. It created a virtuous cycle for everyone:

1. Her subscribers discover other interesting novels through her newsletter.
1. Readers discover and buy her book after reading her newsletter.
1. Other indie authors enjoy seeing reviews of their work, so they direct their own readers to her newsletter, which increases (2).

I love strategies where incentives align for everyone, so I started looking for ways to apply that to my book. I started writing about other bloggers and book authors that I enjoy and publishing those on my blog, and that's worked well:

| Post                                                                                                                       | Unique Readers | Hacker News score | Lobsters score |
| -------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------------- | -------------- |
| [The Most Popular Blogs of Hacker News in 2025](https://refactoringenglish.com/blog/2025-hn-top-5/)                        | 33.8k          | 692               | -              |
| [The Software Essays that Shaped Me](https://refactoringenglish.com/blog/software-essays-that-shaped-me/)                  | 25.6k          | 308               | 85             |
| [What Makes the Intro to Crafting Interpreters so Good?](https://refactoringenglish.com/blog/crafting-interpreters-intro/) | 3.5k           | -                 | 137            |

## Discovering the power of AI sandboxes

I had a revelatory experience a year ago when [I first started using an AI agent](/notes/cline-is-mesmerizing/). At that point, I just let it edit files while I watched, and I thought that was a scary amount of control to give an LLM.

For the past year, I've mostly been coding with Cline, an AI agent extension in VS Code. It sped up a lot of my workflows, but I also micromanaged it aggressively because I didn't trust it to perform arbitrary actions on my dev machine.

A few weeks ago, [my friend okay](https://oky.moe) showed me his AI workflow with Codex, OpenAI's terminal-based AI agent. He lets Codex edit files and run commands without direct supervision. It made me realize how much time I've been wasting babysitting my AI agents and dealing with hangs in Cline.

okay said that he sometimes lets Codex work unsupervised for an hour or more, and I couldn't believe it. If I gave Cline a task that would take more than 10 minutes, it would either go down the wrong path or explode my costs. But Codex is flat-fee rather than pay-per-token, which means you stop thinking about costs.

I still don't trust any AI agent to run amok on my real computer, so I set up a custom sandbox for running AI agents on my machine. I go to the directory for one of my projects and run my custom command: `sb`. It spins up a [rootless Podman container](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md) that has no access to my local network and only can see the current working directory. It has Codex and Claude Code pre-installed and authenticated with my accounts.

With AI in a sandbox, I was fine giving it full permissions to edit files, install applications, etc.

And wow, what a difference!

Seeing an AI agent run with full permissions was another breakthrough moment for me. Previously, if I said, "Make a bar chart of my income from the last 8 years," about 30% of the time, the AI agent would implement something partially wrong. I'd have to check the result myself and say, "No, the bars are misaligned. Fix it." But when the AI agent has root access in its own sandbox, it can spin up a test server, view the page in the browser, and iterate independently until it completes its task correctly.

And then I heard about [Ralph Loops](https://ghuntley.com/loop/). I still haven't found a good explanation, so I'm not sure if what I'm doing matches an "official" Ralph loop, but here's what mine looks like. I run a bash script called `ralph-loop` that contains this simple code:

```bash
#!/usr/bin/env bash

rm ALL-DONE.txt || true

while true; do
  cat AGENT-WORKFLOW.md | codex exec

  if [[ -f "ALL-DONE.txt" ]]; then
    echo "ALL-DONE.txt detected. Exiting."
    exit 0
  fi
done
```

And `AGENT-WORKFLOW.md` looks like this:

```markdown
1. Pick the top task in TODO.md and begin work on it
   - If no actions remain, write a file called ALL-DONE.txt to the current
     directory, and exit.
1. Complete the task and delete the entry from TODO.md.
   - If the task is unachievable, explain why in the commit message.
1. Commit the changes with a detailed commit message explaining what you
   changed, why you changed it, and what impact it had.
```

And then I just create a `TODO.md` file with a list of tasks. Some of the tasks involve creating follow up tasks, so the list grows and shrinks with the agent's progress.

The Ralph Loop has allowed me to run AI agent autonomously overnight for 4+ hours unsupervised. It's surreal to come back to my computer in the morning and see that the AI agent completed all the work I assigned it while I was sleeping.

## AI is great at porting code

From experimenting with AI for the past few months, AI has has the most impact when:

1. You can objectively define the success criteria.
   - e.g. "Find the cause of this crash" is objective and definable whereas "make this landing page better" is not.
1. The AI agent can verify success independently.
   - e.g., "Visit the page in a browser and verify the background turns blue when you push the button."
1. The problem is such that a human with junior-level software knowledge could solve it with a search engine, experimentation, and patience.

Here are some classes of software tasks that meet these criteria:

- Refactoring code that has automated tests
- Porting code from one language/technology to another while preserving behavior
- Compiling a project from source, installing any necessary dependencies
- Fixing code to make a test pass

Recently, I've been using AI to port code. I have some codebases where I wish I'd made different choices about my tech stack, but it was always too time-consuming rewrite everything. But with AI, swapping out pieces of my stack is inexpensive and fast.

I've successfully ported code in several of my projects:

- Converted the Zestful website [from Vue/Nuxt2 to vanilla HTML with Hugo](https://github.com/mtlynch/zestful-frontend2/pull/152)
  - I got a Github alert saying that I had some dumb vulnerability through a transitive Node.js library I'd never heard of, and I thought, "I'd love to never get another one of these alerts again." So I had AI rewrite the site in Hugo and plain HTML/JS/CSS.
- Ported PicoShare's CSS framework [from Bulma to Bootstrap](https://github.com/mtlynch/picoshare/pull/718)
  - When I created PicoShare, I wanted to try out Bulma as a CSS framework. It was fine, but I prefer Bootstrap, so I kept using it everywhere else and always had to switch gears when I worked on PicoShare.
- Converted LogPaste's e2e tests [from Cypress to Playwright](https://github.com/mtlynch/logpaste/pull/235)
  - I wrote the e2e tests before I discovered Playwright, and now I'm so used to Playwright that it's hard to go back to Cypress.
- Converted the fusion RSS reader [from Svelte to vanilla HTML + Go templates](https://github.com/mtlynch/fusion/pull/3)
  - This is just a proof of concept, as fusion isn't my project, but I'd like to fork it to use my preferred tech stack. AI did a good job converting all the Svelte.js code to vanilla HTML and Go templates, but I'd want to get more test infrastructure in place if I were to port this for real.
- Converted the MeshCore web app [from Vue.js to Flutter](/retrospectives/2026/01/#creating-my-first-flutter-app)
  - This actually worked poorly because it's missing the "AI can verify the result" step. I thought Flutter would emit semantic HTML for its web app output, but it actually generates a wonky Flutter-centric HTML dialect. And the MeshCore app depends heavily on an external hardware device (the LoRa radio), so I had to be in the loop a lot.

## Side projects

### [StreamPreserve](https://codeberg.org/mtlynch/stream-preserve)

I've thought about what I'd do in a situation where I was witnessing something I wanted to record on my phone, but there's a possibility of someone stealing my phone and deleting the footage or destroying my phone entirely.

So, I made Stream Preserve, a web app that tries to move critical video as quickly as possible to a remote, secure server.

{{<img src="stream-preserve.webp" max-width="300px" caption="Stream Preserve captures important video and moves it to a remote server as quickly as possible.">}}

Here's how it works:

1. I open the StreamPreserve app and begin recording video.
1. The app streams a low-resolution video to the backend server, tuning the stream quality to the available bandwidth.
1. The app records high-resolution video to browser storage in discrete chunks.
1. With any spare bandwidth, the app uploads high-resolution video chunks to the server while low-resolution streaming is in progress.
1. When recording stops, the app saves the high-resolution video as a download on the local device.
1. When the app is open and no recording is in progress, it syncs all high-resolution footage from the device to the server.

So, the idea is if I record something and someone smashes my phone, I'd still have a low-resolution copy of the video on my server. And if they seize my phone to stop the recording, it still uploads the high-resolution copy in the background.

I lost my enthusiasm for the idea when I realized there are a few flaws:

- It's a bad solution for recording hours of footage.
- Implementing it as a web app adds complexity and possibility of losing footage, but I [dislike mobile development](/retrospectives/2026/01/#creating-my-first-flutter-app).
- It's not a great task for AI because it depends on using the browser camera API, which is annoying to fake in an AI sandbox.

## Wrap up

### What got done?

- Published [My Eighth Year as a Bootstrapped Founder](/bootstrapped-founder-year-8/)
- Published a new chapter of _Refactoring English_
- [Fixed a crash](https://github.com/podofo/podofo/pull/311) in the PoDoFo PDF reader that I discovered using [my PDF fuzzing workflow](/nix-fuzz-testing-1/)

### Lessons learned

- Celebrating other software writers helps me find new readers.
- AI agents are significantly more useful when they run in an environment where they have root access and can install applications and search the web.
- AI is good at solving problems when you can define success criteria objectively, and the agent has a way of verifying success and self-correcting through iteration.
- AI is great at porting code from one technology to another.

### Goals for next month

- Finish two chapters of _Refactoring English_.
- Schedule a live event for _Refactoring English_ readers.
