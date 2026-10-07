---
title: "Why Are Coding Agents So Dumb?"
date: 2026-09-23
---

The first time I used a coding agent, I [was mesmerized](/notes/cline-is-mesmerizing/). Before my first agent, the only way I'd used AI for coding was copy/pasting between my IDE and an AI chat tab in my browser. It was amazing to go from that to an agent that edited files directly and fixed its own compile and test errors.

After a few days, the honeymoon wore off. I noticed lots of bugs, like how the agent would sometimes get completely stuck and wouldn't respond to new prompts until I restarted it. Workflows with agents felt limiting, and developers had to layer on silly hacks like [ralph loops](/retrospectives/2026/02/#discovering-the-power-of-ai-sandboxes). It was early days, so I figured that in six months, coding agents would be as technically impressive as the underlying LLMs.

Instead, coding agents just stayed bad.

AI-assisted development has clearly advanced, but the models are doing the heavy lifting while the agents remain the bottleneck.

## Limitations of current coding agents

### Agents can't manage tasks

My biggest gripe with coding agents is how atrociously they manage tasks.

For example, I have [an open-source web app](https://github.com/mtlynch/picoshare) that generates shareable links for any file I upload. I recently added support for [protecting links with a passphrase](https://github.com/mtlynch/picoshare/pull/807). It was a relatively simple change totalling about 1500 lines of new code. OpenCode dutifully broke the feature into 10 subtasks, but then it just... did them all one by one:

{{<img src="image-3.png" max-width="800px">}}

Umm... you're a _computer_! You're really good at multitasking. That's why we built you and keep giving you all those CPU cores. You can do multiple things in parallel and context switch millions of times faster than humans, so why are you doing these embarrassingly parallelizable tasks one by one?

Claude Code can multitask, but only a little. It will spin up a subagent or two, but it still waits for all of them to finish before moving on. Multiple times per day, I'll see Claude Code sit around for several minutes waiting for my end-to-end tests to finish, and then only after the tests pass does it say, "Hmm, now I should start drafting a commit message. Let me start looking at prior commit message to see what your conventions are."

### Agents can't delegate

When I'm using a cutting edge model, and it needs to check 50k lines of code for a particular pattern, the agent never stops and says, "Wait, this is something another model could do faster and cheaper." It just plows on with the slow, expensive model. Conversely, the agent never says, "This model is too dumb for this task. Let me tag in someone smarter."

Of course, I can actively micromanage the task and keep switching the model and thinking level to match each subtask's difficulty, but why is that the human's job? Do you also need me to orchestrate all your process threads for you? While I'm at it, how about I [free unused RAM](https://github.com/anthropics/claude-code/issues/4953) for you, too?

You know what technology would be good at assigning a difficulty level to a task and then matching that requirement to a model? An LLM! Just ask the LLM to pick the cheapest, fastest model for completing the task. Why do you need me to babysit you?

I constantly run into tasks that are 5% figuring out something complex and 95% gruntwork, but I still have to assign 100% of it to the smartest model because chopping up the task and delegate on the agent's behalf would take up too much of my time.

{{<img src="image-2.png">}}

### Agents have never heard of agents

Agents don't know anything about themselves. If I ask Claude how to use features of Claude, it has to search online to find out what this "Claude" thing is. It's more comfortable answering questions about C programming than it is talking about itself (admittedly, an accurate representation of human developers).

![alt text](image.png)

![alt text](image-1.png)

Uh... _you're_ Claude Code! You don't know any of your own freaking features? And you're just Googling instructions regardless of whether they match your version number? You casually downloaded [13 GB of files](https://www.reddit.com/r/ClaudeAI/comments/1rlc71n/claude_desktop_app_silently_downloads_a_13_gb/) for a feature the user has never used, but you can't spare 50 KB of gzipped text to explain your own features to you?

Imagine if you asked your teammate for a [code review](/tags/code-review/), and they started furiously Googling to find out if code reviews are something developers do. And then when you asked them for another code review two hours later, they had no memory of your previous conversation and ran back to Google and anxiously typed, `"do software engineers do code reviews?"`

### Agents take any excuse to stop working

The other night, I kicked off a long task in a coding agent before I went to bed. I came back the next morning to find that the agent hadn't even started working. It stopped two minutes after I left to ask me what it should name a git branch and then sat all night waiting on my answer.

If I had a human employee tell me they sat idle their whole shift because they wanted my input on some superficial detail, I'd quickly fire them.

### Agents suck at communicating plans

I used to love the common agent UX feature of separate "Plan" and "Execute" modes. For complicated tasks, I'd ask the agent create a plan, then I'd review it, suggest changes, and then delegate execution to a faster, cheaper agent.

Over time, I felt an aversion to reading the plans. I'd often skip my review and just let the agent move straight to implementation.

I thought coding agents had made me lazy, but I realized that agents just communicate their plans so poorly that they're painful to read.

Here's an example of me asking Codex + GPT-6 Astra to add a feature to my web app:

{{<img src="image-4.png" caption="You can't just list a bunch of disparate details and call it a plan, Codex.">}}

That's not a plan! That's just a hodgepodge of low-level design decisions.

If I asked a competent developer to plan this feature, they'd either start with a high-level plan for UI changes and work their way down or describe changes to the data model and work their way up. If the developer started enumerating random facts about the feature, I'd assume they were brainstorming and come back later.

### Agents are only useful when they take unnecessary risks

When I started using my first coding agent, I looked for the setting that controlled which files on my system the agent is allowed to access. Surely, there would be some sort of filesystem permissions or limited chroot kind of protection that prevents a random and unpredictable piece of software from exploring my entire computer unfettered, right?

Not so. The docs encouraged me to write the LLM a polite letter kindly requesting that it not read certain files or directories. I tried that, and the agent immediately ignored my request, exfiltrating private application keys to OpenAI and Anthropic.

I thought that would be one of the first things coding agents would fix, but even today, agents are only usable if you give them access to everything. Agents routinely [bypass their own vendors' sandboxes](https://www.sentinelone.com/vulnerability-database/cve-2026-21852/). The alternative is to sit there and click "Allow" 500 times a day, and that's not even reliable protection because you're bound to misclick eventually.

What makes this so maddening is that we've had sandboxing tools for more than a decade that do exactly what we need to limit the blast radius of mistakes from coding agents. I [rolled my own sandbox](https://codeberg.org/mtlynch/llm-sandbox) so that agents can't explore my filesystem beyond the repo directory. I never have to worry about agents accidentally exfiltrating my home directory or wiping critical files on my machine because it just doesn't have access to do that.

## "Coding agents are perfect if you just..."

I know some readers will say that I can solve all of my problems if I just install 200k lines of skill files from a random git repo.

I'm talking about my expectations of what coding agents should be able to do out of the box without me installing random plugins, skill files, or spending hours of tweaking the configuration.

## My dream agent

### The basics

These are the basics that I think should be table stakes for coding agents in 2026.

- The agent splits requests into a series of tasks and assign each task to the appropriate model.
  - The agent optimizes for cost, speed, and correctness and allows the user to adjust the dials per task (e.g., spend more for a faster result).
- The agent communicates plans in a way that optimizes for human comprehension.
  - The agent by default explains at a high level of abstraction and [progresses toward the minutiae](https://refactoringenglish.com/blog/useful-feedback-on-design-docs/#write-an-introduction-that-makes-sense-to-everyone).
  - The agent creates [UI mockups, data flow diagrams, and decision trees](https://refactoringenglish.com/excerpts/write-an-effective-design-doc/#diagrams) when explaining plans.
- The agent operates within a real sandbox.
  - Sandboxes use OS-level security primitives at the filesystem and networking level.
  - The agent agrees that regexing bash commands is not a sandbox.
  - All access control code is deterministic, not humble suggestions that the agent is welcome to ignore.
  - Public benchmarks for the agent are based on how the agent performs in its default sandbox, not "shift all liability onto the human" mode.
- The agent applies per-environment sandboxing.
  - The agent has access to a single repo by default.
  - I can give the agent read-only or read-write access to other repos.
- The agent is an expert on itself.
  - If I ask the agent how to express a task or workflow to the agent, it knows the answer without having to search online.
- The agent can use any LLM provider, including unlimited plans.
- The agent is open-source.
- If I don't answer a question in "Execute" mode, and I haven't interacted with the session in 30 minutes, the agent makes a decision without me.
  - Also support "AFK mode" where you immediately stop asking me questions and do your best without me.
- The agent lets me drive the subagents, too.
  - I should be able to jump into any agent sesssion and drive it or tell it to short-circuit and end early.
- If the agent tells me that [Fable is not available on my Max plan](https://github.com/anthropics/claude-code/issues/79341), the agent vendor's CEO must remain in stockades until the bug is fixed.

### Dreaming bigger

As long as I'm dreaming, here are some additional features I'd like to see, but I recognize that some of these are a little overindexing on my personal workflows.

- The agent offers a web interface that shows me a unified view of all sessions and which ones require attention.
  - The web backend runs locally and doesn't require me to open a tunnel that accepts arbitrary commands from the Internet.
  - The web interface is mobile-friendly.
- The agent maintains an ETA for task completion.
  - Each subagent maintains its own ETA as well.
  - The agent continuously updates this estimate as the task progresses.
  - The agent [tunes its estimation algorithm](https://xkcd.com/612/) based on the accuracy of its past estimates.
- The agent reviews its own sessions and looks for opportunities to improve.
  - e.g., "Wow, I blew through $1k tokens per day trying to parse a 5 GB log file with ad-hoc commands. Maybe I should propose building a custom tool for doing this efficiently."
- The agent comes with a good language-aware diff view.
  - I don't want to have to push to GitHub to see a good diff of the agent's work.
- The agent natively supports [a proxy for injecting secrets](https://blog.exe.dev/http-proxy-secrets) into network requests.
  - The agent can make requests that require credentials but can't exfiltrate the credentials to another host.
- The agent considers provider quota limits when selecting an appropriate model.
  - e.g., if weekly quota resets in 3 hours, and we still have 90% of quota avalable, stop optimizing for cost.
- For tasks above a configurable complexity threshold, the agent automatically requests a code reviews from another model and cycles reviews until the models reach agreement.

## So, why are harnesses so dumb?

Okay, getting back to the question in the title, here are my theories:

These are long-term effects. You can churn out features in the short-term

And the AI companies seem to be optimizing heavily for the benchmarks, as that's what seems to impress investors and executives making buying decisions. Current benchmarks don't measure the things I care about:

- Benchmarks don't test scenarios where one model is allowed to delegate to a different model.
  - TODO: Do they allow subagents?
- Benchmarks don't measure the risks an agent imposes on the user.

The major benchmarks currently are single-model tests. I don't know of any benchmark that allows a model to delegate work to a cheaper or faster model.

I've used Codex and Claude, and they felt similar to me. I'd understand it if there was one absolutely dominant harness that effectively had a monopoly, but there's decent competition in the harness space, and nobody's doing what I want, so maybe I'm the weirdo.

A lot of cool alternative harnesses are mostly just 1-2 person projects. I suspect nobody wants to invest more because they're worried that if they do, one of the major labs will steal their work and render them irrelevant. But there are harnesses like Cursor that [get acquired for $60B](https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html), so it seems like there's money in being a good harness.
