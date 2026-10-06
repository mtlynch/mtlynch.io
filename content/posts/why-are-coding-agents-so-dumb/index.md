---
title: "Why Are Coding Agents So Dumb?"
date: 2026-09-23
---

The first time I used a coding agent, I [was mesmerized](/notes/cline-is-mesmerizing/). Previously, I'd been using AI for coding by copy/pasting into a chat window, so an agent that could edit files and fix test errors itself was a gamechanger.

Cline would hang a lot and get into weird states where it couldn't read or write any files until I reloaded VS Code. But, it was early days, and I figured that in six months, coding agents would be as technically impressive as the underlying LLMs.

Two years later, coding agents just stayed bad. AI-assisted development has clearly advanced, but it's the models that are doing the heavy lifting, and the agents remain the bottleneck.

I've used Claude Code, Codex, OpenCode, and Pi, and I have preferences among them, but I'm surprised that coding agents as a technology are advancing so slowly while the LLMs. It's like the AI labs have invented an car engine powerful enough to make cars fly and drive underwater, but the only

## "Harnesses are perfect if you just..."

I know some of you are going to tell me that I can solve all of my problems if I just install 200k lines of skill files from a random git repo.

I'm talking about my expectations of what agent harnesses should be able to do out of the box without me installing random plugins, skill files, or spending hours of tweaking the configuration.

## Limitations of current harnesses

### Agents can't manage tasks

My biggest gripe with harnesses is how atrocious their task management skills are.

For example, I have a web app that allows me to upload files and generate shareable links. I recently added support for [protecting links with a passphrase](https://github.com/mtlynch/picoshare/pull/807). It was a relatively simple change totalling about 1500 lines of new code. OpenCode dutifully broke down the feature into 10 subtasks, but then it just... did them all one by one:

{{<img src="image-3.png" max-width="800px">}}

Umm... you're a _computer_! You're really good at multitasking. That's why we built you and keep giving you all those CPU cores. You can do multiple things in parallel and context switch millions of times faster than humans, so why are you doing these embarrassingly parallelizable tasks one by one?

Claude Code can multitask, but only a little. It will spin up a subagent or two, but it still waits for all of them to finish before moving on. Multiple times per day, I'll see Claude Code sit around for several minutes waiting for my end-to-end tests run, and then only after the tests pass does it say, "Hmm, now I should start drafting a commit message."

### Agents can't delegate

When I'm using Claude Code with Fable, and it needs to check 50k lines of code for a particular pattern, it never stops and says, "Wait, this is something another model could do faster and cheaper." It just plows on with slow, expensive model. And the lower-end models never say, "Hmm, I'm too dumb for this task. Let me tag in someone smarter."

The agents let me choose the model and thinking level, but maybe I just want to assign you a task and not decide which of the 20 models times 4-5 thinking levels the task requires. Do you need me to decide which CPU core it runs on and when to evict memory from cache too?

You know what technology would be good at assigning a difficulty level to a task and then matching that requirement to a model? An LLM! Just ask the LLM to pick the cheapest, fastest model for accomplishing a task and assign it to that model.

I constantly run into tasks where I know that 5% of the work is hard, but I still have to let the smartest model do the whole thing because it otherwise consumes too much of my time to chop up the task and delegate on the agent's behalf.

{{<img src="image-2.png">}}

### Agents have never heard of agents

Harnesses don't know anything about themselves. If I ask Claude how to use features of Claude, it responds as if it's never heard of Claude Code before. It's more comfortable answering questions about Microsoft Excel than it is answering questions about itself (in fairness, this is true of most human developers).

![alt text](image.png)

![alt text](image-1.png)

Uh... _you're_ Claude Code! You don't know any of your own freaking features? And you're just Googling instructions regardless of whether they match your version number? You have no problem downloading [13 GB install](https://www.reddit.com/r/ClaudeAI/comments/1rlc71n/claude_desktop_app_silently_downloads_a_13_gb/) for a feature the user has never used, but you can't spare 50 KB of gzipped text to explain your own features to you?

Imagine if you asked your teammate for a code review, and they started furiously Googling to find out if code reviews are something developers do. And then when you asked them for another code review two hours later, they ran back to Google and anxiously typed, `"do software engineers do code reviews?"`

### Agents take any excuse to stop working

The other night, I kicked off a long task in a coding agent before I went to bed. I came back the next morning to find that the agent hadn't even started working. It stopped two minutes after I left to ask me what it should name a git branch and then sat all night waiting on my answer.

If I had a human employee tell me they sat idle their whole shift because they wanted my input on some superficial detail, I'd quickly fire them.

### Agents suck at communicating plans

I used to think it was great that most harnesses have a separate "Plan" and "Execute" mode. For complicated tasks, I'd have the agent create a plan, then I'd review it, suggest changes, and then let it execute.

Over time, I noticed my aversion to reading the plans. I'd often skip reading the plan and let the agent write the code.

I thought coding agents had made me lazy, but I realized recently that the stronger reason is that agents communicate their plans so poorly.

Here's an example of me asking Codex + GPT6 Astra to add a feature to my web app:

{{<img src="image-4.png" caption="You can't just list a bunch of disparate details and call it a plan, Codex.">}}

That's not a plan! That's just a hodgepodge of low-level design decisions mixed with tasks.

If I asked a competent developer to plan this feature, they'd either start with a high-level plan for UI changes and work their way down or think about how the data model would change and work their way up. If the developer started enumerating random facts about the feature, I'd assume they were brainstorming and come back later.

### Agents are only useful when they take unnecessary risks

When I started using Cline, I looked for the setting that controlled which files on my system the agent is allowed to access. Surely, there's some sort of filesystem permissions or limited chroot kind of protection that prevents a random and unpredictable piece of software from exploring my entire computer unfettered, right?

Not so. Cline's docs encouraged me to write the LLM a polite letter kindly requesting that it not read the following sensitive files or directories. I tried that, and Cline immediately ignored my request, exfiltrating my keys out to OpenAI and Anthropic.

I thought surely they'd fix that soon, but even today, the harnesses seem to only be usable if you give them access to everything, and the agents routinely break out of the vendor's sandbox. (TODO: link)

In security, there's a principle of "least privilege." If you're running a military base and you hire a gardener, you're not going to give them a skeleton key that opens every door on the base. You instead grant them the least privileges necessary to do their job. In the case of the gardener, that probably means an access key that gets them in the main entrance and the tool shed but not the room where they're 50 thousand grenades.

The software world has never been good at embracing least privilege, but agents are especially bad at it. They force you into a position where you have to either babysit every move the agent makes and hit "Allow" a million times a day or check a box that says, "I give the agent permission to do whatever it wants on my computer. If the agent decides to send malware to my whole contact list and brick my machine, then I agree it's my fault."

What makes this so maddening is that we have sandboxing tools that meet the needs of coding agents. I [rolled my own sandbox](https://codeberg.org/mtlynch/llm-sandbox) so that agents can't explore my filesystem beyond the repo directory. I never have to worry about agents accidentally exfiltrating my home directory or wiping critical files on my machine because it just doesn't have access to do that.

<!--



### Harnesses don't learn

I've seen Claude Code try to run the `gh` GitHub CLI tool like a million times only to fail and realize there's no `gh` tool installed. And there's no `gh` tool because I say in agent instructions that agents don't have access to my repos on GitHub so don't even try, but they never remember.

If I joined a new team and their deployment was a 20-step manual process where half the steps are not documented or are documented incorrectly, then I'd immediately push for automation, or, at the very least, accurate documentation.

Agent harnesses do not do this. Unless you watch their entire session to see that they keep trying to use tools that aren't there, you don't find out what's ballooning a 5-minute task to a 20-minute task, and the next session will do the same thing, burning tokens and time.

I at one point added an instruction in my AGENTS.md that said at the end of a session, identify what could be improved.

In fairness, the harnesses do a good job of mirroring actual human behavior here. The vast majority of developers I work with will grind through an incredibly tedious, error-prone workflows and not bother to improve it or document the gotchas.

Claude now talks about storing stuff in memory, but I don't notice improvements. Also, when I ask to see Claude's memory, it can't show me, though this might be a problem with my sandboxing.

### Harnesses don't create reviewable work

If I ask an agent to do something, it happily spits out 2000 lines of unreviewable code in a single commit.

I recently wrote a skill that tells the agent to break the work into a set of commits I can review, but why isn't this just the default?


### Harnesses can't follow simple instructions

Earlier this year, I was using AI to do cybersecurity research. A lot of that work is mechanical and repetitive. For example, fuzz testing, you have to find a place to call in to the production code, define input that will exercise it, evaluate results, and tune the inputs and your hooks. But harnesses can't do that easily. I want to just say, "Keep finding ways to increase code coverage"

-->

## My dream agent

### The basics

- There's a web interface that shows me all agents and which ones require attention.
- It sandboxes LLM access deterministically.
  - Not regexing bash commands, actual sandboxing with OS primitives at the filesystem and network level.
  - The agents run in a VM-like environment that can only see the current directory by default.
  - All access control code is deterministic, not humble suggestions that the agent is welcome to ignore.
  - The sandboxing actually works and allows the LLMs to do useful work.
- Sandboxing is per-environment. Agents have access to a single repo by default. I can give the agent read-only or read-write access to other repos.
- It can use any provider, including unlimited plans.
- It's open-source and doesn't depend on the harness vendor's server's to run.
- Support an AFK mode where I say I'm leaving, and you do your best without me.
  - Don't ask a trivial question and then sit idle forever because I'm not around.
- It can split requests into a series of tasks and assign each task to the appropriate model, optimizing for cost, speed, and correctness.

### Fancy

- The web interface is mobile-friendly
- LLMs don't have direct access to secrets.
  - The agent makes external requests via [a proxy that substitutes dummy credentials](https://blog.exe.dev/http-proxy-secrets) for the real ones.
  - The user specifies which domain is allowed to receive credentials, so a rogue agent can't just tell the proxy to use my AWS token to make a request to OpenAI.
  - The user can restrict it so that the agent can push to a GitHub feature branch but not protected branches, even if the user associated with the token can.
- It understands provider quotas and factors that into model selection.
  - e.g., if weekly quota resets in 3 hours and we still have 90% of quota avalable, stop optimizing for cost
- I grant credentials by default in a proxy layer, and I can restrict what types of requests are allowed to use those credentials. For example, I can give you access to my CI, but you can only make GET requests.
- It maintains an ETA for task completion for subtasks and the task overall and continuously updates this estimate. (TODO: file explorer visits friends)
- Agents can get reviews from other agents.
- Comes with a good language-aware diff view.
- Let me drive the subagents, too. I should be able to jump into any agent sesssion and drive it or tell it to short-circuit and end early.
-

## So, why are harnesses so dumb?

Okay, getting back to the question in the title, here are my theories:

And the AI companies seem to be optimizing heavily for the benchmarks, as that's what seems to impress investors and executives making buying decisions. Current benchmarks don't measure the things I care about:

- Benchmarks don't test scenarios where one model is allowed to delegate to a different model.
  - TODO: Do they allow subagents?
- Benchmarks don't measure the risks an agent imposes on the user.

The major benchmarks currently are single-model tests. I don't know of any benchmark that allows a model to delegate work to a cheaper or faster model.

I've used Codex and Claude, and they felt similar to me. I'd understand it if there was one absolutely dominant harness that effectively had a monopoly, but there's decent competition in the harness space, and nobody's doing what I want, so maybe I'm the weirdo.

A lot of cool alternative harnesses are mostly just 1-2 person projects. I suspect nobody wants to invest more because they're worried that if they do, one of the major labs will steal their work and render them irrelevant. But there are harnesses like Cursor that [get acquired for $60B](https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html), so it seems like there's money in being a good harness.
