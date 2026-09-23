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

The infuriating thing is that the underlying LLMs clearly are smart enough to do this better and the harness doesn't take advantage of it. If I ask an LLM to break a design document into a list of 100-200 subtasks, it would do it no problem. And then if I asked for a directed graph representing the dependencies between those subtasks, it could do that too. But if I said, "Okay, now spin up a pool of 10 subagents to process the subtasks ," it can't do it. With Claude Code and Fable 5.1, it offers to write custom tooling for me to process a task graph, but it's not a feature that works.

But that's an easy example. If I say, "I have a photo site. Add a feature where users can write comments," that can also break down into probably 100 subtasks that can happen in parallel, but it mostly does it serially.

## Harnesses can't delegate

Most tasks don't require human-level intelligence. There are a lot of tasks where you're just doing gruntwork and can hand it off to a fast, cheap model. But because the agent can't manage tasks and doesn't even

![alt text](image-2.png)

I end up burning tokens on the most expensive model because 20% of the task needs it, and I don't want to micromanage to direct it to the right subparts.

## Harnesses don't know themselves

Harnesses don't know anything about themselves. If

![alt text](image.png)

![alt text](image-1.png)

## Harnesses will take any excuse to stop working

I kicked off a long task in an agent harness the other night. I came back the next morning to see the results, and it hadn't done anything. It stopped two minutes after I left to ask me what it should name its new git branch.

If I emailed a developer

## Harnesses can't communicate plans

I used to think it was great that harnesses have a

## Harnesses don't sandbox

## My dream harness

### The basics

- There's a web interface that shows me all agents and which ones require attention.
- Deterministic sandboxing. I can restrict the files and networking options, and it uses OS-level mechanisms to enforce them. Sandboxing is actual code, not a markdown file for the LLM to consider. Sandboxing settings sit outside of the AI agent's control.
- Sandboxing is per-environment. Agents have access to a single repo by default. I can give the agent read-only or read-write access to other repos.
- It can use any provider, including unlimited plans.
- It's open-source and doesn't depend on the harness vendor's server's to run.
- Support an AFK mode where I say I'm leaving, and you do your best without me. Don't block work to wait on me.
- It can split requests into a series of tasks and assign each task to the appropriate model, optimizing for cost, speed, and correctness.

### Fancy

- The web interface is mobile-friendly
- It understands provider quotas and factors that into model selection.
  - e.g., if weekly quota resets in 3 hours and we still have 90% of quota avalable, stop optimizing for cost
- It maintains an ETA for task completion for subtasks and the task overall and continuously updates this estimate. (TODO: file explorer visits friends)
- Agents can get reviews from other agents.

--

If you time traveled to 2019 and showed me ChatGPT and then told me to guess what year it would be available, I'd probably say something like 2050. Talking with a computer in natural language felt so far away, and it was suddenly available and worked really well.

If, on the other hand, you showed me Claude Code or OpenAI Codex and asked me what year it was created, I'd guess something like 2005.

How do we have this incredibly powerful technology trapped inside such dumb harnesses? It would be like if the iPhone came out, but the only software it would run is a rotary phone emulator.
