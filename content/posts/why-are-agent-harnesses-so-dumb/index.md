---
title: "Why Are Agent Harnesses So Dumb"
date: 2026-09-23
---

I started using AI agent harnesses in early 2025. I [started with Cline](/notes/cline-is-mesmerizing/) and found it a huge improvement from my previous workflow of copy/pasting to a chat window. It was janky and froze up a lot, but I figured it was early days. I tried Claude Code and Codex a few months later, and they were a major improvement because they weren't trying to shoehorn functionality into VS Code. I had a lot of annoyances with Claude Code and Codex, but it was early days, and those companies have infinite AI tokens. The harnesses surely would get better soon.

And then the harnesses just stayed bad. Claude Code came out XX months ago, and Codex came out XX months ago, and they still have most of the limitations that they launched with.

I've tried a couple of open-source alternatives, and I prefer OpenCode to Claude or Codex, but the alternatives are still copying the fundamentally limited workflows of Claude and Codex.

## "But harnesses are perfect if you just..."

I'm evaluating how harnesses work out of the box. I'm sure OpenCode could do everything I dreamed if only I spent a year developing a custom plugin for it or installed 200k lines of skill files from a random git repo.

I'm talking about my expectations of what agent harnesses should be able to do out of the box without handholding or hours of tweaking the configuration.

## Harnesses can't manage tasks

The thing that most drives me crazy about harnesses is that they can't manage tasks. If I show Claude Code a 20-page design doc (TODO: link) and say, "Go implement this," it does it like a person. Maybe if I get lucky, it uses subagents and does 2-3 steps in parallel, but even this is pretty rudimentary.

The infuriating thing is that the underlying LLMs clearly are smart enough to do this better and the harnesses don't take advantage of it. If I handhold the LLM, it can do all of these things:

- Break a design document into a list of 100-200 subtasks.
- Identify dependencies between the tasks.
- Create a plan to divide work between 10 workers of different levels of speed, cost, and skill.

But that's an easy example. If I say, "I have a photo site. Add a feature where users can write comments," that can also break down into probably 100 subtasks that can happen in parallel, but it mostly does it serially. It will patiently wait 2 minutes watching end-to-end tests run, and only then will it think, "Oh, maybe I should start drafting a commit message."

## Harnesses can't delegate

Related to task management, harnesses don't stop to ask which agent would work best. If I'm using the most expensive model, and it needs to check 50k lines of code for a particular pattern, it never stops and thinks, "Wait, this is something another model could do faster and cheaper." It just consumes the expensive

Most tasks don't require human-level intelligence. There are a lot of tasks where you're just doing gruntwork and can hand it off to a fast, cheap model. But because the agent can't manage tasks and doesn't even

{{<img src="image-2.png">}}

I end up burning tokens on the most expensive model because 20% of the task needs it, and I don't want to micromanage to direct it to the right subparts.

## Harnesses don't know how harnesses work

Harnesses don't know anything about themselves. If

![alt text](image.png)

![alt text](image-1.png)

Uh... _you're_ Claude Code! You don't know any of your own freaking features? And you're just Googling instructions regardless of whether they match your version number? Your [13 GB install](https://www.reddit.com/r/ClaudeAI/comments/1rlc71n/claude_desktop_app_silently_downloads_a_13_gb/) didn't have room for 50 KB of gzipped text to explain your own features to you?

## Harnesses will take any excuse to stop working

The other night, I kicked off a long task in an agent harness. I came back the next morning to find that the agent hadn't done jack shit. It stopped two minutes after I left to ask me what it should name a git branch.

If I had a human employee tell me they sat idle their whole shift because they wanted my input on some superficial detail, I'd quickly fire them.

## Harnesses can't communicate plans

I used to think it was great that most harnesses have a separate "Plan" and "Execute" mode. For complicated tasks, I'd have the agent create a plan, then I'd review it, suggest changes, and then let it execute.

I noticed over time that I didn't like reading the plans and would often just skip and let it write the code. I thought I was letting the LLM make me lazy, but I realized recently that the agents are just awful at communicating plans.

When I talk to an effective software developer about implementing a feature, we start with a sketch of the high-level details and work our way down to the minutea. The agents just instantly jump to the minutea of how they'll commit things, which files they'll touch. They flood the plan with so much garbage that I often find it easier to just let them write the code and skim that than to try to deduce the architecture from their convoluted plans.

## Harnesses constantly push you to take cybersecurity risks

I've always cared about software security. In security in general, there's a principle of "least privilege." If you're a gardener in a military base, you shouldn't have an access key that lets you access nuclear weapons. You should have an access card that gives you the least privileges possible that still allow you to do your job, so maybe you need access to a tool shed but not the armory.

The software world has never been that good at embracing least privilege, but agent harnesses are really bad at it.

My first experience with LLMs was using web-based chatbots where they can only see the files that I'm pasting into the chat. I remember when I first started using Cline and was trying to control what the agent can see and being appalled that the security mechanism was, "Just write instructions as Markdown telling the agent what files it can access." And then immediately the agent would ignore those instructions, and I'd have to invalidate keys because an agent just exfiltrated them to OpenAI or Anthropic.

I thought surely they'd fix that soon, but even today, the harnesses seem to only be usable if you give them access to everything, and the LLMs routinely break out of the harness sandbox. (TODO: link)

This is so wildly unnecessary. I implemented my own sandbox so that my harness can only see its current directory, and it works fine. I never have to worry about agents exfiltrating my home directory or wiping critical files on my machine because it just doesn't have that access.

The problem is that even if Claude or OpenAI got their acts together and took sandboxing seriously, I probably still wouldn't use their sandbox because I just don't trust them at this point. I think I need it to be a separate tool just so it's not the wolf guarding the henhouse.

## Harnesses can't follow simple instructions

Earlier this year, I was using AI to do cybersecurity research. A lot of that work is mechanical and repetitive. For example, fuzz testing, you have to find a place to call in to the production code, define input that will exercise it, evaluate results, and tune the inputs and your hooks. But harnesses can't do that easily. I want to just say, "Keep finding ways to increase code coverage"

## Harnesses don't create reviewable work

If I ask an agent to do something, it happily spits out 2000 lines of unreviewable code in a single commit.

I recently wrote a skill that tells the agent to break the work into a set of commits I can review, but why isn't this just the default?

## Harnesses don't improve the process

If I joined a new team and their deployment was a 20-step manual process where half the steps are not documented or are documented incorrectly, then I'd immediately push for automation, or, at the very least, accurate documentation.

Agent harnesses do not do this. Unless you watch their entire session to see that they keep trying to use tools that aren't there, you don't find out what's ballooning a 5-minute task to a 20-minute task, and the next session will do the same thing, burning tokens and time.

I at one point added an instruction in my AGENTS.md that said at the end of a session, identify what could be improved.

In fairness, the harnesses do a good job of mirroring actual human behavior here. The vast majority of developers I work with will grind through an incredibly tedious, error-prone workflows and not bother to improve it or document the gotchas.

Claude now talks about storing stuff in memory, but I don't notice improvements. Also, when I ask to see Claude's memory, it can't show me, though this might be a problem with my sandboxing.

## My dream harness

### The basics

- There's a web interface that shows me all agents and which ones require attention.
- Deterministic sandboxing.
  - Not regexing bash commands, actual sandboxing at the filesystem and network level.
  - The agents run in a VM-like environment that can only see the current directory by default.
  - All access control code is deterministic, not humble suggestions that the agent is welcome to ignore.
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

## Why are they dumb?

Okay, to answer the question in the title, I don't really know why. I mainly wanted to vent.

If I had to guess, my guess would be that current benchmarks don't measure the things I care about. The major benchmarks currently are single-model tests. I don't know of any benchmark that allows a model to delegate work to a cheaper or faster model. And the AI companies seem to be optimizing heavily for the benchmarks, as that's what seems to impress investors and executives making buying decisions.

I've used Codex and Claude, and they felt similar to me. I'd understand it if there was one absolutely dominant harness that effectively had a monopoly, but there's decent competition in the harness space, and nobody's doing what I want, so maybe I'm the weirdo.

A lot of cool alternative harnesses are mostly just 1-2 person projects. I suspect nobody wants to invest more because they're worried that if they do, one of the major labs will steal their work and render them irrelevant. But there are harnesses like Cursor that [get acquired for $60B](https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html), so it seems like there's money in being a good harness.

--

If you time traveled to 2019 and showed me ChatGPT and then told me to guess what year it would be available, I'd probably say something like 2050. Talking with a computer in natural language felt so far away, and it was suddenly available and worked really well.

If, on the other hand, you showed me Claude Code or OpenAI Codex and asked me what year it was created, I'd guess something like 2005.

How do we have this incredibly powerful technology trapped inside such dumb harnesses? It would be like if the iPhone came out, but the only software it would run is a rotary phone emulator.
