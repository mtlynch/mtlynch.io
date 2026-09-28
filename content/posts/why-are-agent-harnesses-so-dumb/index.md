---
title: "Why Are Agent Harnesses So Dumb"
date: 2026-09-23
---

I started using AI agent harnesses in early 2025. I [started with Cline](/notes/cline-is-mesmerizing/) and found it a huge improvement from my previous workflow of copy/pasting to a chat window. It was janky and froze up a lot, but I figured it was early days. I tried Claude Code and Codex a few months later, and they were a major improvement because they weren't trying to shoehorn functionality into VS Code. I had a lot of annoyances with Claude Code and Codex, but it was early days, and those companies have infinite AI tokens. The harnesses surely would get better soon.

And then the harnesses just stayed bad. Claude Code came out XX months ago, and Codex came out XX months ago, and they still have most of the limitations that they launched with.

I've tried a couple of open-source alternatives, and I prefer OpenCode, but OpenCode copies most decisions from Claude or Codex, including their bad ones. I'm mainly going to be picking on because it's popular and not the work of an underpaid open-source developer.

## "Harnesses are perfect if you just..."

I'm going to list a bunch of complaints, and I know agent power users are going to tell me that I can solve all of my problems if I just install 200k lines of skill files from a random git repo. If everyone was excited about a new car that shipped with a wheel missing, it's still reasonable to point out that it would be better for the manufacturer to ship complete cars rather than relying on every customer to figure out how to source and install that fourth wheel.

I'm talking about my expectations of what agent harnesses should be able to do out of the box without me installing random plugins, skill files, or spending hours of tweaking the configuration.

## Limitations of current harnesses

### Harnesses can't manage tasks

My biggest gripe with harnesses is how poorly they manage tasks.

For example, I have a web app that allows me to upload files and generate shareable links. I recently added support for [protecting links with a passphrase](https://github.com/mtlynch/picoshare/pull/807). It was a relatively simple change totalling about 1500 lines of new code. OpenCode dutifully broke down the feature into 10 subtasks, but then it just... did them all one by one:

{{<img src="image-3.png" max-width="800px">}}

Hey! You're a computer! You can do multiple things in parallel. That's a thing you do _way_ better than humans, so why are you doing it the human way?

Claude Code is a little better at multitasking, but I still only see it run one or two tasks in parallel, and it has to wait for all tasks to resolve before moving on. I've watched Claude Code sit around for several minutes while my end-to-end tests run, and then only after the tests pass does it occur to the agent to start drafting a commit message. I see stuff like that all the time. Claude Code blocks on some task even though the next task does not depend on the previous work.

### Harnesses can't delegate

Related to task management, harnesses don't stop to ask which agent would work best. If I'm using the most expensive model, and it needs to check 50k lines of code for a particular pattern, it never stops and thinks, "Wait, this is something another model could do faster and cheaper." It just consumes the expensive

I find myself constantly burning tokens on the most expensive model because 5% of my task is hard, and I don't have a way to express to Claude Code, "Use Fable for this part and this

For every task, I don't want to choose among 20 models and then select among four thinking levels. Do you need me to decide which CPU core it runs on and when to evict memory from cache too?

You know what technology would be good at assigning a difficulty level to a task and then matching that requirement to a model? An LLM! Just ask the LLM to pick the cheapest, fastest model for accomplishing a task and assign it to that model.

Most tasks don't require human-level intelligence. There are a lot of tasks where you're just doing gruntwork and can hand it off to a fast, cheap model. But because the agent can't manage tasks and doesn't even

{{<img src="image-2.png">}}

### Harnesses don't know how harnesses work

Harnesses don't know anything about themselves. If

![alt text](image.png)

![alt text](image-1.png)

Uh... _you're_ Claude Code! You don't know any of your own freaking features? And you're just Googling instructions regardless of whether they match your version number? You have no problem downloading [13 GB install](https://www.reddit.com/r/ClaudeAI/comments/1rlc71n/claude_desktop_app_silently_downloads_a_13_gb/) for a feature the user has never used, but you can't spare 50 KB of gzipped text to explain your own features to you?

Imagine if you asked your teammate for a code review, so they started furiously Googling to find out if that's in their job description. And then when you asked them for another code review two hours later, they did the same furious Googling.

### Harnesses will take any excuse to stop working

The other night, I kicked off a long task in an agent harness before I went to bed. I came back the next morning to find that the agent hadn't even started working. It stopped two minutes after I left to ask me what it should name a git branch.

If I had a human employee tell me they sat idle their whole shift because they wanted my input on some superficial detail, I'd quickly fire them.

### Harnesses suck at communicating plans

I used to think it was great that most harnesses have a separate "Plan" and "Execute" mode. For complicated tasks, I'd have the agent create a plan, then I'd review it, suggest changes, and then let it execute.

I noticed over time that I didn't like reading the plans and would often just skip and let it write the code. I thought I was letting the LLM make me lazy, but I realized recently that the agents are just awful at communicating plans.

When I talk to an effective software developer about implementing a feature, we start with a sketch of the high-level details and work our way down to the minutiae. The agents just instantly jump to the minutiae of how they'll commit things, which files they'll touch. They flood the plan with so much garbage that I often find it easier to just let them write the code and skim that than to try to deduce the architecture from their convoluted plans.

### Harnesses don't manage risk

I've always cared about software security. In security in general, there's a principle of "least privilege." If you're a gardener in a military base, you shouldn't have an access key that lets you access nuclear weapons. You should have an access card that gives you the least privileges possible that still allow you to do your job, so maybe you need access to a tool shed but not the armory.

The software world has never been that good at embracing least privilege, but agent harnesses are really bad at it.

My first experience with LLMs was using web-based chatbots where they can only see the files that I'm pasting into the chat. I remember when I first started using Cline and was trying to control what the agent can see and being appalled that the security mechanism was, "Just write instructions as Markdown telling the agent what files it can access." And then immediately the agent would ignore those instructions, and I'd have to invalidate keys because an agent just exfiltrated them to an AI vendor I actively distrust.

I thought surely they'd fix that soon, but even today, the harnesses seem to only be usable if you give them access to everything, and the LLMs routinely break out of the harness sandbox. (TODO: link)

This is so wildly unnecessary. I implemented my own sandbox so that my harness can only see its current directory, and it works fine. I never have to worry about agents exfiltrating my home directory or wiping critical files on my machine because it just doesn't have that access.

The problem is that even if Claude or OpenAI got their acts together and took sandboxing seriously, I probably still wouldn't use their sandbox because I just don't trust them at this point. I think I need it to be a separate tool just so it's not the wolf guarding the henhouse.

### Harnesses don't create reviewable work

If I ask an agent to do something, it happily spits out 2000 lines of unreviewable code in a single commit.

I recently wrote a skill that tells the agent to break the work into a set of commits I can review, but why isn't this just the default?

### Harnesses make me wait until they're done

I either throw everything away or have to wait until it finally gets to my message.

### Harnesses don't learn

I've seen Claude Code try to run the `gh` GitHub CLI tool like a million times only to fail and realize there's no `gh` tool installed. And there's no `gh` tool because I say in agent instructions that agents don't have access to my repos on GitHub so don't even try, but they never remember.

If I joined a new team and their deployment was a 20-step manual process where half the steps are not documented or are documented incorrectly, then I'd immediately push for automation, or, at the very least, accurate documentation.

Agent harnesses do not do this. Unless you watch their entire session to see that they keep trying to use tools that aren't there, you don't find out what's ballooning a 5-minute task to a 20-minute task, and the next session will do the same thing, burning tokens and time.

I at one point added an instruction in my AGENTS.md that said at the end of a session, identify what could be improved.

In fairness, the harnesses do a good job of mirroring actual human behavior here. The vast majority of developers I work with will grind through an incredibly tedious, error-prone workflows and not bother to improve it or document the gotchas.

Claude now talks about storing stuff in memory, but I don't notice improvements. Also, when I ask to see Claude's memory, it can't show me, though this might be a problem with my sandboxing.

<!--


### Harnesses can't follow simple instructions

Earlier this year, I was using AI to do cybersecurity research. A lot of that work is mechanical and repetitive. For example, fuzz testing, you have to find a place to call in to the production code, define input that will exercise it, evaluate results, and tune the inputs and your hooks. But harnesses can't do that easily. I want to just say, "Keep finding ways to increase code coverage"

-->

## My dream harness

### The basics

- There's a web interface that shows me all agents and which ones require attention.
- Deterministic sandboxing.
  - Not regexing bash commands, actual sandboxing at the filesystem and network level.
  - The agents run in a VM-like environment that can only see the current directory by default.
  - All access control code is deterministic, not humble suggestions that the agent is welcome to ignore.
  - The sandboxing actually works and allows the LLMs to do useful work. You shouldn't have to choose between an agent that actually works and one that requires you to pass `--its-okay-if-you-brick-my-computer` to get any work done.
- Sandboxing is per-environment. Agents have access to a single repo by default. I can give the agent read-only or read-write access to other repos.
- It can use any provider, including unlimited plans.
- It's open-source and doesn't depend on the harness vendor's server's to run.
- Support an AFK mode where I say I'm leaving, and you do your best without me. Don't block work to wait on me.
- It can split requests into a series of tasks and assign each task to the appropriate model, optimizing for cost, speed, and correctness.

### Fancy

- The web interface is mobile-friendly
- It understands provider quotas and factors that into model selection.
  - e.g., if weekly quota resets in 3 hours and we still have 90% of quota avalable, stop optimizing for cost
- I grant credentials by default in a proxy layer, and I can restrict what types of requests are allowed to use those credentials. For example, I can give you access to my CI, but you can only make GET requests.
- It maintains an ETA for task completion for subtasks and the task overall and continuously updates this estimate. (TODO: file explorer visits friends)
- Agents can get reviews from other agents.
- Comes with a good language-aware diff view.
- Let me drive the subagents, too. I should be able to jump into any agent sesssion and drive it or tell it to short-circuit and end early.

## So, why are harnesses so dumb?

Okay, to answer the question in the title, I don't really know why. I mainly wanted to vent.

If I had to guess, my guess would be that current benchmarks don't measure the things I care about. The major benchmarks currently are single-model tests. I don't know of any benchmark that allows a model to delegate work to a cheaper or faster model. And the AI companies seem to be optimizing heavily for the benchmarks, as that's what seems to impress investors and executives making buying decisions.

I've used Codex and Claude, and they felt similar to me. I'd understand it if there was one absolutely dominant harness that effectively had a monopoly, but there's decent competition in the harness space, and nobody's doing what I want, so maybe I'm the weirdo.

A lot of cool alternative harnesses are mostly just 1-2 person projects. I suspect nobody wants to invest more because they're worried that if they do, one of the major labs will steal their work and render them irrelevant. But there are harnesses like Cursor that [get acquired for $60B](https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html), so it seems like there's money in being a good harness.

--

If you time traveled to 2019 and showed me ChatGPT and then told me to guess what year it would be available, I'd probably say something like 2050. Talking with a computer in natural language felt so far away, and it was suddenly available and worked really well.

If, on the other hand, you showed me Claude Code or OpenAI Codex and asked me what year it was created, I'd guess something like 2005.

How do we have this incredibly powerful technology trapped inside such dumb harnesses? It would be like if the iPhone came out, but the only software it would run is a rotary phone emulator.
