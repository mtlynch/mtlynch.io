---
title: "Notes from Simon Willison's Interview on Software Misadventures"
date: 2025-05-14
---

I just finished listening to Simon Willison's interview on the Software Misadventures podcast. I learned a lot from the interview, so I wrote up my notes.

This is not a summary of the whole interview, just the parts that were new to me or that I'd like to remember. The order of notes is from most interesting to least interesting to me rather than how it chronologically appeared in the interview.

## Who's Simon Willison?

- One of the co-creators of Django, the most popular web framework for Python.
- One of the most popular indepedent bloggers on Hacker News.
- For the last few years, has focused his blog primarily on AI, especially on applications of AI technology in everyday software development.
- Currently working on an open-source data analysis tool called Datasette.

## Plugins as a form of open-source contribution

> The beauty of a plugin system in an open-source project is that features can be added without requiring me to review every piece of code. I can wake up one morning to find my software has new capabilities because someone else released a plugin. This is an excellent form of open-source contribution because developers can release their plugins without needing my direct involvement or time for code reviews.

\[_Editor's note: I found this to be an interesting observation. I've never designed any software to accept plugins, but Simon makes an excellent case for this type of architecture._]

## Simon aspires to be financially independent

-

\[_Editor's note: This was the biggest surprise of the whole interview for me. I assumed Simon was already financially independent. Eventbrite acquired Simon's startup while it was still growing, and then he worked there for six years as a director of engineering. I'd assume that's enough to accrue about $5M+ in savings ([$100k/yr in conservative income](https://www.mrmoneymustache.com/2012/05/29/how-much-do-i-need-for-retirement/) from passive investments)._]

## Blogging

### Try to write a new blog post every day

- Tom Scott, who made a video every day for 10 years, inspired Simon to try to publish one new post per day.
  - This goal gives Simon incentive to find something interesting that day.

### Time investment

- Simon blogs for 10-15 minutes/day.
- He's able to write more quickly since he's been doing it for 22 years.

### Blog to newsletter pipeline

- Simon has a newsletter that's just a diff of everything new on his blog since his last newsletter.

> It's a really great way of getting things out there to people who live in their email clients.

- Simon wrote an Observable notebook that pulls content from his blog and converts it into Substack-compatible rich text. He then copies from the notebook into Substack, and sends out the newsletter.
- He has 6,000 substack subscribers.
- The process takes two minutes per newsletter.

\[_Editor's note: Simon doesn't address this, but I think the way he's syndicating to Substack negatively impacts SEO, as it creates two copies of the same content at different URLs, and Google won't know which is the original._]

\[_Editor's note: I also find it surprising that Simon uses the Substack domain rather than some subdomain under simonwillison.com, which Substack supports._]

### Blog infrastructure

- Simon's main blog is a Heroku instance sitting behind Cloudflare as CDN.

> The great thing about Cloudflare is if I get a giant spike of traffic, like if I'm linked off the Hacker News homepage, my tiny little cheap Heroku instance doesn't even notice because Cloudflare absorbs all of the traffic.

### Bing chat incident

- In 2023, Simon published, a blog post called [Bing: “I will not harm you unless you harm me first”](https://simonwillison.net/2023/Feb/15/bing/).
  - The post aggregated surprising experiences people reported on social media with AI-powered Bing, which was later revealed to be an early preview of GPT-4.
- Elon Musk [tweeted the article](https://x.com/elonmusk/status/1625936009841213440).
- It was one of the most popular articles of 2023 [on Hacker News](https://news.ycombinator.com/item?id=34804874).
- The blog post received 1.4 million views.
- Simon was [interviewed live on TV](https://simonwillison.net/2023/Feb/19/live-tv/) by a news station in Chicago.

## Everything is a Github issue

- Simon maintains personal todo lists as Github issues.

> I can drop back into a project I haven't touched in a year, read the documentation as if I didn't know what the project was, and then start working on it.

- Maintains 250 projects. The only way to do it is if he pretends he's going to forget every detail.
- He writes design documents as issues as well.

> I've got issue threads that are over a hundred comments long, and they're all me. It's just me talking to myself.

\[_Editor's note: This is a surprising workflow, as it optimizes for writes over reads. When you'd want to understand the issue, you're forced to read hundreds of comments instead of reading a single comment that summarizes the current state of affairs._\]

### "Temporal documentation"

- Documenting what was true at the time, though not necessarily what's still true.

## Datasette's goals

- Would like a journalist to win a Pulitzer Prize for data journalism that they used Datasette to accomplish.

## Meta: How I created these notes

I downloaded the interview with `yt-dlp`:

```bash
yt-dlp https://www.youtube.com/watch?v=6U_Zk_PZ6Kg
```

And then I used Whisper to conver

```bash
VIDEO_FILE="~/LLMs\ are\ like\ your\ weird,\ over-confident\ intern\ ｜\ Simon\ Willison\ \(Datasette\)\ \[6U_Zk_PZ6Kg].webm"
whisper $VIDEO_FILE
```

My GPU setup was messed up, so it used my CPU, which was slow and error-prone, so I cleaned it up in segments using Google Gemini 2.5 Pro Preview:

````text
Split this transcript into sections by topic.

Under each topic, write the timestamp that the section covers in the transcript.

Break groups of sentences into logical paragraphs under each heading.

Fix words that appear to be transcription errors, but don't editorialize or
change language.

```
1
00:00:00,000 --> 00:00:06,000
call it my weird intern. I'll say to my wife Natalie sometimes, hey so I got my weird intern

2
00:00:06,000 --> 00:00:10,800
to do this. And that works, right? It's a good mental model for these things as well because

[elided...]

```

````

Gemini can only process about 30 minutes of transcript at a time until it runs out of output tokens, so I had to keep repeating it with `Start at 00:26:26,240` at the end of my instructions.

I then aggregated them together.

That creates a well-organized transcript like this:

```text
### The Efficiency and Benefits of Consistent Blogging
(00:08:44,480 --> 00:11:24,800)

Well, that's the secret of blogging, is that it takes a lot of work at first,
but I've been blogging for 22 years...
```

Then I fed my notes to Gemini and asked

````text
Here is a transcript of an interview that's available on YouTube
at https://www.youtube.com/watch?v=6U_Zk_PZ6Kg:

```
TRANSCRIPT GOES HERE
```

Here are  my notes about the interview:

```
MARKDOWN VERSION OF THIS BLOG POST GOES HERE
```

Reproduce my notes, except under every header, include a link to the original
YouTube video that the transcript came from with a timestamped link that points
to that part of the conversation.
````
