---
title: "Notes from Simon Willison's Interview on Software Misadventures"
date: 2025-05-08
---

These were my takeaways. This is not meant to be a summary of the whole interview, just the parts that stood out to me that I'd like to remember.

## Plugins as a form of open-source contribution

> The beauty of a plugin system in an open-source project is that features can be added without requiring me to review every piece of code. I can wake up one morning to find my software has new capabilities because someone else released a plugin. This is an excellent form of open-source contribution because developers can release their plugins without needing my direct involvement or time for code reviews.

\[_Editor's note: I found this to be an interesting observation. I've never designed any software to accept plugins, but Simon makes an excellent case for this type of architecture._]

## Blogging every day

- Inspired by Tom Scott, who made a video every day for 10 years.
- Gives Simon incentive to find something interesting that day.

## Blogging investment

- Simon blogs for 10-15 minutes/day.
- He's able to write more quickly since he's been doing it for 22 years.

## Everything is a Github issue

- Simon maintains personal todo lists as Github issues.

> I can drop back into a project I haven't touched in a year, read the documentation as if I didn't know what the project was, and then start working on it.

- Maintains 250 projects. The only way to do it is if he pretends he's going to forget every detail.
- He writes design documents as issues as well.

> I've got issue threads that are over a hundred comments long, and they're all me. It's just me talking to myself.

\[_Editor's note: This is a surprising workflow, as it optimizes for writes over reads. When you'd want to understand the issue, you're forced to read hundreds of comments instead of reading a single comment that summarizes the current state of affairs._\]

### "Temporal documentation"

- Documenting what was true at the time, though not necessarily what's still true.

## Blog to newsletter pipeline

- Simon has a newsletter that's just a diff of everything new on his blog since his last newsletter.

> It's a really great way of getting things out there to people who live in their email clients.

- Simon wrote an Observable notebook that pulls content from his blog and converts it into Substack-compatible rich text. He then copies from the notebook into Substack, and sends out the newsletter.
- He has 6,000 substack subscribers.
- The process takes two minutes per newsletter.

\[_Editor's note: Simon doesn't address this, but I think this can have a negative effect on SEO, as it creates two copies of the same content at different URLs, and Google won't know which is the original._]

\[_Editor's note: I also find it surprising that Simon uses the Substack domain rather than some subdomain under simonwillison.com, which Substack supports._]

## Blog setup

- Simon's main blog is a Heroku instance sitting behind Cloudflare as CDN.

> he great thing about Cloudflare is if I get a giant spike of traffic, like if I'm linked off the Hacker News homepage, my tiny little cheap Heroku instance doesn't even notice because Cloudflare absorbs all of the traffic, and that's great.

## Bing chat incident

- In 2023, Simon published, a blog post called [Bing: “I will not harm you unless you harm me first”](https://simonwillison.net/2023/Feb/15/bing/).
  - The post summarized people's surprising experiences with AI-powered Bing, which was later revealed to be an early preview of GPT-4.
- Elon Musk [tweeted the article](https://x.com/elonmusk/status/1625936009841213440).
- It was one of the most popular articles of 2023 [on Hacker News](https://news.ycombinator.com/item?id=34804874).
- Led to 1.4 million views on that page.

## Plugins vs. contributions

TODO

## Simon aspires to be financially independent

- This was actually the biggest surprise to me of the whole interview. I assumed he was already financially independent.
