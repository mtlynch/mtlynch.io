---
title: "Notes from Simon Willison's Interview on Software Misadventures"
date: 2025-05-23
images:
  - /notes/simon-willison-software-misadventures/cover.webp
---

I just finished listening to [Simon Willison's interview on the _Software Misadventures_ podcast](https://softwaremisadventures.com/p/simon-willison-llm-weird-intern). I learned a lot from the interview, so I wrote up my notes.

This is not a summary of the whole interview, just the parts that were new to me or that I'd like to remember.

{{<img src="cover.webp" max-width="700px" caption="Simon Willison on the [_Software Misadventures_ podcast](https://softwaremisadventures.com/p/simon-willison-llm-weird-intern)">}}

## Who's Simon Willison?

- One of the co-creators of Django, the most popular web framework for Python.
- One of the [most popular indepedent bloggers on Hacker News](https://refactoringenglish.com/tools/hn-popularity/domain/?d=simonwillison.net).
- For the last few years, has focused [his blog](https://simonwillison.net) primarily on AI, especially on applications of AI technology in everyday software development.
- Currently working on an open-source data analysis tool called [Datasette](https://datasette.io/).

## Plugins as a form of open-source contribution

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=1826s)

- Designing an application to accept plug-ins that extend its functionality is a form of collaboration that's even lower-friction than accepting open-source contributions.
  - External collaborators can add features without you having to review or approve anything, and you're not responsible for maintaining their code.

> The great thing about plugins is it's a way of building an open-source project where you don't need to review people's code to add features to your thing. I can wake up one morning and my software can do a new thing because somebody else released a plugin for it.

_\[Editor's note: I found this to be an interesting observation. I've never designed any software to accept plugins, but Simon makes an excellent case for this type of architecture.]_

## LLMs

### Developing an intuition about how to use LLMs

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=2001s)

- LLMs are deceptively hard to use because the limitations aren't obvious.
  - They seem easy because they're just chatbots, but you need to use them for several hours on a variety of tasks to develop an intuition about what they can and can't do.
  - Example: LLMs are bad at counting, which is surprising given that computers generally are great at counting.
- Simon recommends the [Anthropic prompt engineering documentation](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) as an effective way to improve your use of LLMs.
- Simon recommends learning with self-hostable models (e.g., Phi-3, LLama 3.1), as they hallucinate and make mistakes more frequently, so you'll develop a better intuition of what LLMs are bad at.

### How Simon uses LLMs

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=1942s)

- Summarizing information
  - Take advantage of long context windows to accelerate research. For example, to research a person, dump into the chat their Wikipedia page, articles about them, and their writing, and ask the LLM to summarize key themes with examples.
  - Ask for direct quotes, and check the original source to verify that the LLM didn't hallucinate the quote.
    > If a friend of mine could read a Wikipedia page and then answer my question, then I know that the LLM will be able to answer that question. But if it's the kind of thing which the Wikipedia page probably isn't going to cover, it's less likely that the LLM will be able to answer it.
- Asking about domains in which you have expertise
  > I'll ask it legal questions, like I'll paste in the terms of service and say, "Hey, is there anything in here that looks a bit dodgy?"
  >
  > I know for a fact that that's a terrible idea because I have no legal knowledge, right? So, I'm sort of like play acting with it and nodding along, but I would never make a life-altering decision based on legal advice from an LLM that I got because I'm not a lawyer.
  >
  > If I was a lawyer, I'd use them all the time because I'd be able to fall back on my actual expertise to sort of like make sure that I'm using them responsibly.
- Writing SQL queries
  - Simon advises showing the LLM your full table schema and a few sample rows.
- Data entry
  - e.g., transcribing information from handwritten notes or pulling structured data out of unstructured documents
  - The best LLMs achieve about 95% accuracy, which is roughly on par with what you'd get hiring a group of human interns to do the same task.
- Making software architecture decisions
  - Simon asks LLMs to give him a variety of options for achieving the same task and talks through their advantages and disadvantages.
- Reading academic papers
  - Simon wrote a tool called [Dejargonizer](https://simonwillison.net/2023/Nov/11/chatgpt-dejargonizer/) that explains unfamiliar terms.
  - _\[Editor's note: I found the tool to be more of a fun idea than an actual practical tool. You have to paste in text, and I exhausted the context limit by feeding in a 5-page paper. It would make more sense to rewrite the text with the jargon words defined inline.\]_

### Simon's "weird intern" mental model for LLMs

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=4680s)

- Simon describes LLMs to his wife as "his weird intern."
  > It's like having an intern who has... memorized the documentation for every programming language and is a wild conspiracy theorist and sometimes comes up with absurd ideas and... they're massively overconfident.
- A major advantage to an LLM over a human teammate is that you can continue asking it to improve a solution.
  - With a human teammate, you eventually have to stop asking for new iterations because it's frustrating for a human for you to keep thinking of new ideas to improve a pull request, but an LLM, you can ask for massive rewrites without worrying that you're disrespecting its time.
- Simon has found that you can get an LLM to improve its answers by just saying, "Do better":
  > One of my favorite prompts is you just say, "Do better," and it works. It's the craziest thing!
  >
  > It'll write some code, and you say, "Do better," and it goes, "Oh I'm sorry," and then it will churn out better code, which is so stupid that that's how this technology works, but it's kinda fun.

### LLMs make projects viable that previously weren't worth the effort

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=4115s)

- One of the major impacts LLMs have had on Simon is that it makes him more ambitious as a developer.
  - Previously, he'd think of a project and recognize the right language to implement it is AppleScript or Go, and he'd shelve the idea because he doesn't know those languages.
  - Now, he can use LLMs to generate the code and verify it does what he wants.
- He could have learned those technologies before, but LLMs lower the barrier to entry enough that they're more practical to create:
  > All of these little projects would not exist without LLMs. Not because I couldn't build them, but because I couldn't build them fast enough to justify the effort.

### Staying on top of LLM developments

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=4979s)

- Highest-signal information comes from private WhatsApp and Discord groups of 15ish people.
- Twitter has good AI discussion.
  - Mastodon does not, as it attracts AI skeptics.
- Because of Simon's blog, people often send him tips about interesting new LLM developments.

### Why LLMs might not pollute the world with terrible code

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=5123s)

- The downside of LLMs is that code is going into production that its authors don't even understand.
  - That's a risk for the world, as it suggests that LLMs will degrade overall software quality.
- Simon points out how much of the world runs on code that's worse than the "goop" code that LLMs generate:
  > We currently live in \[a\] world where half of the world runs on Excel spreadsheets with no unit tests, and no backup, no version control.. and anyone can muck up a formula, and the valuation of a company goes down by half overnight...
  >
  > That's the world we live in today, right? Excel spreadsheets are kind of goop already, and somehow society functions.
  >
  > So, maybe those of us who are like, "No, every line of code has to be perfect," maybe we're wrong. Maybe actually goop is the way forward, but that's a little bit terrifying, you know?

## Blogging

### Write a new blog post every day

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=292s)

- Simon tries to write a new blog post every day.
  - Inspired by Tom Scott, who [made a video every week for 10 years](https://www.youtube.com/watch?v=7DKv5H5Frt0).
  - Gives Simon incentive to find something interesting that day.

### Time investment

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=524s)

- Simon blogs for 10-15 minutes/day.
- He's able to write more quickly since he's been doing it for 22 years.

### Blog to newsletter pipeline

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=1227s)

- Simon has a newsletter that's just a diff of everything new on his blog since his last newsletter:
  > It's a really great way of getting things out there to people who live in their email clients.
- Simon wrote an Observable notebook that pulls content from his blog and converts it into Substack-compatible rich text. He then copies from the notebook into Substack, and sends out the newsletter.
- He has 6,000 substack subscribers.
- The process takes two minutes per newsletter.

_\[Editor's note: Simon doesn't address this, but I think the way he's syndicating to Substack negatively impacts SEO, as it creates two copies of the same content at different URLs, and Google won't know which is the original.]_

_\[Editor's note: I also find it surprising that Simon uses the Substack domain rather than some subdomain under simonwillison.net, as I believe Substack lets you bring your own domain.]_

### Blog infrastructure

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=1457s)

- Simon's main blog is a Heroku instance sitting behind Cloudflare as CDN.

> The great thing about Cloudflare is if I get a giant spike of traffic, like if I'm linked off the Hacker News homepage, my tiny little cheap Heroku instance doesn't even notice because Cloudflare absorbs all of the traffic.

### Bing chat incident

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=1511s)

- In 2023, Simon published, a blog post called [Bing: “I will not harm you unless you harm me first”](https://simonwillison.net/2023/Feb/15/bing/).
  - The post aggregated surprising experiences people reported on social media with AI-powered Bing, which was later revealed to be an early preview of GPT-4.
- Elon Musk [tweeted the article](https://x.com/elonmusk/status/1625936009841213440).
- It was one of the most popular articles of 2023 [on Hacker News](https://news.ycombinator.com/item?id=34804874).
- The blog post received 1.4 million views.
- The post led to Simon's [first TV interview](https://simonwillison.net/2023/Feb/19/live-tv/) by a news station in Chicago.

## Making everything a Github issue

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=684s)

- Simon maintains personal to-do lists as Github issues.
- He maintains 250 projects.
  - He documents them by pretending he's going to forget every detail.
    > I can drop back into a project I haven't touched in a year, read the documentation as if I didn't know what the project was, and then start working on it.
- He writes design documents as issues as well.
  > I've got issue threads that are over a hundred comments long, and they're all me. It's just me talking to myself.

_\[Editor's note: This is a surprising workflow, as it optimizes for writes over reads. When you want to understand an issue, you're forced to read hundreds of comments instead of reading a single comment that summarizes the current state.\]_

### "Temporal" documentation vs. current documentation

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=919s)

- Simon considers software as having two types of documentation.
  1. Documentation that says what the software currently does.
  1. Documentation that describes what the software did at the time the documentation was written but is not necessarily accurate today ("temporal documentation")
- Github issues are good for temporal documentation.
  - Simon can look at the issue and see the date he wrote the issue to understand when the documentation was accurate.
- For documentation that has to match the code, he keeps the documentation as markdown files in the same repo as the code itself and ensures that code updates always update documentation to match.

## Life as an indie developer

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=6002s)

- Simon first got his taste for independent work when he was awarded a one-year paid fellowship at Stanford for data journalism.
  > It was amazing, and it completely ruined me because they paid me to spend a year working on whatever I thought was most interesting.
  >
  > And once you've done that, it's very difficult to go back to having somebody else... define what it is that you were going to do. So basically, that was the problem, is that I experienced freedom for a year, and I'm like, "I do not want to give this up. I'm having so much fun working on these things."

### Managing your time

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=6070s)

- Simon finds it extremely difficult to decide what to work on, as there's so little external pressure or accountability relative to working for an employer.
  - There are so many interesting areas of AI to explore and nothing stopping him from exploring them foreer.
- He sometimes wishes he had VC investors so that someone would keep him focused on his goals.
- Conference-driven development
  - Simon promises features in time for a conference, which forces him to prioritize implementation by a deadline.
- Weeknotes
  - Simon wrote blog posts he called ["weeknotes"](https://simonwillison.net/tags/weeknotes/) every few weeks to summarize his past few weeks of work.
  - _\[Editor's note: I do [something similar](https://www.whatgotdone.com/michael), a practice I [picked up from Google](https://mtlynch.io/status-updates-to-nobody/).\]_
  - _\[Editor's note: Simon coincidentally [stopped doing this](https://simonwillison.net/2025/Mar/20/calling-a-wrap-on-my-weeknotes/) shortly after the interview.\]_

### Working towards financial independence

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=6100s)

- Simon aspires to have financial independence.
  - Eventbrite acquired Simon's startup while it was still growing, and then he worked there for six years as a director of engineering.
  - He has "substantial runway" but not enough that he doesn't have to worry about income.
  - He's pursuing consulting opportunities to provide income until Datasette is generating enough revenue to be his primary source of income.

_\[Editor's note: The biggest surprise of the whole interview for me was that Simon isn't already financially independent, as I assumed Simon he was.]_

## Datasette's goals

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=6230s)

- Simon's goal for Datasette is for a journalist to use Datasette to inform an article that wins the Pulitzer Prize.
- He'd like to hire a team to work with him on the project, as he finds it lonely to work solo.
- He wants to follow the WordPress model of open-sourcing the code and making money by offering it as a managed service.

### Challenges of using LLMs for data journalism

[_Original discussion_](https://www.youtube.com/watch?v=6U_Zk_PZ6Kg&t=3621s)

- All the major LLMs censor information, which makes data journalism more difficult.

> If you're a journalist, some of the source material you work with is nasty, right? It's police reports about violent incidents. It's fascist message boards... Right now, if you've got an LLM that's helping process these things, and you like ask it to summarize the themes from this fascist notice board, it's going to say "no," right?
>
> A lot of the LLMs will just straight up refuse to process that, which... greatly limits how useful they can be...

## Meta: How I created these notes

I downloaded the interview with `yt-dlp`:

```bash
yt-dlp https://www.youtube.com/watch?v=6U_Zk_PZ6Kg
```

And then I used Whisper to generate a transcript:

```bash
VIDEO_FILE="~/LLMs\ are\ like\ your\ weird,\ over-confident\ intern\ ｜\ Simon\ Willison\ \(Datasette\)\ \[6U_Zk_PZ6Kg].webm"
whisper $VIDEO_FILE
```

My NixOS system's CUDA configuration mysteriously stopped working, so Whisper used my CPU, which was slow and error-prone. I used Google Gemini 2.5 Pro Preview to clean it up:

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

I then aggregated together all the formatted transcripts.

That creates a well-organized transcript like this:

```text
### The Efficiency and Benefits of Consistent Blogging
(00:08:44,480 --> 00:11:24,800)

Well, that's the secret of blogging, is that it takes a lot of work at first,
but I've been blogging for 22 years...
```

Then I fed my notes to Gemini 2.5 Pro with this prompt:

````text
Here is a transcript of an interview that's available on YouTube
at https://www.youtube.com/watch?v=6U_Zk_PZ6Kg:

```
SRT TRANSCRIPT GOES HERE
```

Here are  my notes about the interview:

```
MARKDOWN VERSION OF THIS BLOG POST GOES HERE
```

Reproduce the headers in my notes, but under each, include a link to the
original YouTube video that the transcript came from with a timestamped link
that points to that part of the conversation.
````

I wanted to validate that the direct quotes were all accurate, but I couldn't find a good solution. I initially tried prompting Gemini Pro and Flash to generate an ffmpeg command to edit the video down to just the quoted portions, but it kept doing it incorrectly. I tried a more modest approach of asking it to append the timestamped YouTube link to every quote, but it was always a few minutes off. I eventually just did it manually by searching the SRT file and then seeking to that point in the video. In one instance, Gemini had completely revised Simon's wording, but it mostly got the quotes accurately.

## Links

- [_Software Misadventures_ episode](https://softwaremisadventures.com/p/simon-willison-llm-weird-intern)
- [Simon Willison's notes about this appearance](https://simonwillison.net/2024/Sep/10/software-misadventures/)
