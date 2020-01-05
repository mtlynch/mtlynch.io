---
title: Notes from PyGotham 2019
description: My notes and self-critiques from speaking at PyGotham.
images:
- /retrospectives/pygotham-2019-notes/pygotham-logo.svg
date: '2019-10-31'
---

## Overview

This past weekend, [PyGotham](https://www.pytexas.org/2019/) invited me to speak at their annual conference in Manhattan. In an effort to maximize the benefit I get from the event, I've prepared notes that capture what I learned by attending. I'm sharing them in hopes that it might be interesting or useful to others.

{{< img src="pygotham-logo.png" alt="PyGotham 2019 logo" maxWidth="450px" >}}

## Ratings and reviews

| Conference Attribute | Grade |
|----------------------|-------|
| Quality of talks     | C     |
| Event smoothness     | A     |
| Venue                | A     |
| How I felt about my talk | B |

### Quality of talks

I was a bit disappointed with the overall quality of the talks this year. There were a few I enjoyed ([see below](#favorite-talks)), but lots of the talks underwhelmed me.

Part of the problem is just that I'm not the target audience. Machine learning talks occupied many of the slots, and I think machine learning is neat, but I don't use it for my job, so I feel like I've had my fill of intro ML talks.

### Event smoothness

Kudos to the PyGotham organizers for running the event like a well-oiled machine. As the speaker, I had all the information when I needed it. The audio and visual equipment worked well for every talk I saw. Everything ran on time. The food was tasty and plentiful, albeit, a bit carb-heavy.

### Venue

The Pennsylvania Hotel is a great venue for conferences. There were three stages with enough seating that I never felt cramped or shut out of a talk I wanted to see. The rooms were all close together to make it easy to move between talks, and there was adequate space to have hallway conversations with other attendees.

### How I felt about my talk

See ["Critiquing my talk"](#critiquing-my-talk) (below).

## Favorite Talks

### Archiving the Internet Before it All Rots Away

{{< youtube 7eoz_EU6-wQ >}}

**Speaker**: [Nick Sweeting](https://nicksweeting.com/) from Monadical

I never realized how big a community there is around webpage archiving and how mature their tooling is. Nick pointed out how common it is for us to lose centralized data repositories. This is true for ancient works like [The Library of Alexandria](https://en.wikipedia.org/wiki/Library_of_Alexandria), and it's true of digital information like Geocities and Tumblr. These repositories survive when common people have the tools to archive and preserve their own copies.

Nick highlighted different tools available for archiving web pages and gave a tour of the different organizations and online communities dedicated to Internet archiving. The tooling is more mature than I expected, with several tools available for archiving even single-page apps (SPAs), which generate HTML dynamically with lots of JavaScript and RPCs. There's even powerful archiving functionality available in common utilities.

Nick showed the following `wget` command, which fully downloads a single webpage, including all JavaScript, CSS, and images:

```bash
wget \
  --no-verbose \
  --adjust-extension \
  --convert-links \
  --force-directories \
  --backup-converted \
  --span-hosts \
  --no-parent \
  -e robots=off \
  --restrict-file-names=windows \
  --timeout=60 \
  --warc-file=archive.warc \
  --page-requisites \
  --user-agent="Lalala this is chrome I promise..." \
  --load-cookies="mycookies.txt" \
  --compression=auto \
  --no-check-certificate \
  --no-hsts \
  "https://2019.pygotham.org"
```

{{<notice type="info">}}
**Note**: If you're on Ubuntu/Debian, take out the `--compression=auto` flag, since your version of wget [doesn't support it](https://unix.stackexchange.com/a/464375/152974).
{{< /notice >}}

Other things I liked:

* Nick shared [kiwix](https://wiki.kiwix.org/wiki/Content_in_all_languages), a project that was new to me. They provide offline copies of large content sites like Wikipedia and StackOverflow that you can run locally.
* Nick maintains [a directory of archiving resources and communities](https://github.com/pirate/ArchiveBox/wiki/Web-Archiving-Community).

### Maintaining a Python Project When It’s Not Your Job

{{< youtube OvUsbGpKp64 >}}

**Speaker**: [Hynek Schlawack](https://hynek.me/)

* [Talk Outline](https://hynek.me/talks/python-foss/)
* [Slides](https://speakerdeck.com/hynek/maintaining-a-python-project-when-its-not-your-job)

Hynek maintains several popular open source projects ([attrs](https://github.com/python-attrs/attrs), [structlog](https://www.structlog.org/en/stable/)), and he has only limited time to review external pull requests. He uses automated tools to minimize his time reviewing and to empower third-party contributors to find their own bugs. This aligned nicely with my #1 rule for code reviews: [Let computers do the boring parts](/human-code-reviews-1/#let-computers-do-the-boring-parts).

Hynek is a fun, and lively speaker. He opens with a joke, "Hello, I'm Hynek, your European friend that you didn't know that you have." It sets the tone for the rest of the talk that the content will be fun and sometimes tongue-in-cheek.

Other things I liked:

* Introduced me to a few tools I didn't know about:
  * [isort](https://github.com/timothycrosley/isort): Sorts your Python import statements.
    * I [added it](https://github.com/mtlynch/python3_seed/pull/15) to my [Python3 boilerplate project](https://github.com/mtlynch/python3_seed).
    * The tool's [shortcoming](https://github.com/timothycrosley/isort/issues/1039) is that it only offers two modes: "fix automatically" (not what I want in a build check) or "give an unhelpful failure message."
  * [Black](https://github.com/psf/black): Formats Python code whitespace.
    * Interesting, but doesn't seem to provide any meaningful improvements over [yapf](https://github.com/google/yapf), my preferred formatter.
  * [tox](https://tox.readthedocs.io/en/latest/): Runs Python test scripts in different virtual environments.
    * I *think* I used tox about five years ago, but at the time, I was using it as a way to mock behavior in unit tests. The project now is something totally different, so I can't figure out if they changed focus after [mock](https://docs.python.org/3/library/unittest.mock.html) made it into the standard library or if I'm just confused.
    * Anyway, it seems neat. I haven't created any projects that run in multiple Python environments, but it's good to keep in my back pocket.
* I liked Hynek's example [pull request checklist](https://github.com/python-attrs/attrs/blob/master/.github/PULL_REQUEST_TEMPLATE.md) and [contributor documentation](https://github.com/python-attrs/attrs/blob/master/.github/CONTRIBUTING.rst).
* I've never seen anyone create a public text outline of their talk before, but [Hynek's](https://hynek.me/talks/python-foss/) was helpful.

### Make You An Async For Great Good!

{{< youtube XEkuqe7tSlA >}}

**Speaker**: [Mark Smith](https://twitter.com/judy2k) from Nexmo

Mark introduced the Python [`asyncio`](https://docs.python.org/3/library/asyncio.html) module, the Python library for writing concurrent code. He explained that he figured out how the library worked by building his own simplified version called `mysyncio`.

I was impressed at how much of `asyncio`'s functionality Mark was able to reimplement in so little code. His implementation skipped critical features of the real `asyncio` module, most notably thread-safety and exception handling, but he achieved `asyncio`'s core functionality. Concurrent programming is often difficult to reason about, so seeing Mark's un-magic version of the library made `asyncio` more intuitive.

## Critiquing my talk

{{< youtube ElzBGwyDzCc >}}

**Speaker**: Michael Lynch (me)

* [Slides](https://mtlynch.page.link/gdbt-pg)

I felt good about my talk. I was happy with my level of prep (5-7 runthroughs of my talk), although I wish I started rehearsing earlier instead of procrastinating until the week of the conference.

After my PyTexas talk, my [notes for improvement](/retrospectives/pytexas-2019-notes/#critiquing-my-own-talk) were to speak slower and avoid looking down too much at my laptop. I think at PyGotham. I was so focused on keeping a slow speaking pace that my tone comes across as flat, like I'm bored of my own material. It improves after the first 5-10 minutes, but one thing I'd like to keep in mind in future talks is remembering to put emotion into what I'm saying.

My biggest mistake was projecting my talk using Google Slides' "Presenter View" rather than mirroring my screen. I thought the on-screen timer would help me keep pace, but I forgot that it would prevent me from seeing my own slides. I knew them well enough that I could present most of them just from seeing the tiny thumbnail in presenter view, but there were several instances where I had to turn away from the audience and look at the screen to read text.

* What went well
  * I felt comfortable with the material I was presenting.
  * I succeeded in slowing down my talking speed and keeping my focus on the audience.

* What needs improvement
  * Remember to mirror my laptop display rather than present with "Presenter View."
  * Speaking slowly doesn't mean speaking keeping a flat tone. I'm excited to be at these conferences, so I can do a better job of showing that enthusiasm in my talk.
  * The content itself comes across as a bit clinical &mdash; it could use some more levity and more jokes.
  * Start rehearsing earlier so that preparation doesn't feel rushed.

## Costs

| Expense | Amount |
|---------|--------|
| Train tickets | $95.00 |
| Lodging (two nights) | $0 (stayed with friends) |
| Uber rides | $9.08 |
| Food | $5.44 |
| **Total** | **$109.52** |

Compare this to the [$1,200ish I spent](/retrospectives/pytexas-2019-notes/#costs) to attend PyTexas! It would be super convenient if all conference organizers just planned conferences within car or train distance from me and ensured that I had friends living nearby with a spare bedroom.

Time-wise, I did 5-10 hours of prep. It was much easier to prepare for this talk since I already had the slides from PyTexas, though I revised my presentation a bit based on my reflections from the previous conference.

## Other thoughts

### "What could I improve?"

At previous conferences, when people approached me to say they liked my talk, I'd always just thank them for saying that. This year, I tried, "Thanks! Are there parts you think I could improve?" People were a bit taken aback by the question, but it usually made them think for a second and make suggestions.

There's an unfortunate lack of feedback in conferences. Everyone can improve their public speaking and the clarity of their slides, but speakers don't have much data about what's working and what's not. When I'm watching talks, I constantly see things where I wish I could tell the speaker they're making an easily-fixable error. But it's rude to approach people with unsolicited advice, especially about something they're probably anxious about in the first place.

When people approach me after my talks in the future, I'm going to thank them, but also remember to ask what I can do better. If you saw my talk, [let me know](/about/) what you think I can improve.

### Conferences are a good place to have ideas

Conferences inspire creative thinking. I always forget it until I'm sitting in the venue, but it happens at every conference I attend. I have ideas at conferences that I never would have had otherwise.

I'm not sure if it's because sometimes I'm in talks where my mind wanders. Or maybe it's because the speaker is walking me through their thought process and it triggers different thoughts in me than I'd normally have. But every conference I attend, I walk away with good ideas about my businesses or projects I'd like to take on in the future.

### I should give a talk about stealing cryptocurrency

As an example of one of the ideas that I wouldn't have had otherwise, I realized at PyGotham that I should turn ["How I Stole Your Siacoin"](/stole-siacoins/) into a conference talk. It's a fun story, it uses Python, and it covers a few topics like [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) and [public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography) that I could describe in a fun way. It never occurred to me to make it a conference talk, but it seemed so obvious once I thought of it.

### Maybe I shouldn't ask for anything

After PyTexas earlier this year, I realized I was looking for a new project, and I had a room full of tech workers, so [I should have asked people](/retrospectives/pytexas-2019-notes/#i-should-have-asked-for-something) to come talk to me about the pain points of their business. Certainly, everyone has aspects of their job they wish they could just delegate to a managed service. I had (hopefully) shown myself to be a competent developer, so they could have asked me to build something for them.

At PyGotham, I [ended my talk](https://youtu.be/ElzBGwyDzCc?t=1398) with an invitation to approach me about managed services people felt were missing in their job. And then, nothing.

I thought that, at worst, I'd at least get some terrible ideas like, "We want MailChimp, except we want it to be free and unlimited." But no, nada. So maybe there isn't much value in that strategy. In the future, I might try to use the platform to attract some new users to [What Got Done](https://whatgotdone.com/).

### It's enlightening to review CFPs

When speakers apply to conferences, they fill out "CFPs", calls for proposals. It's a few paragraphs that explain why you should speak at the conference and what the blurb in the event schedule should say to attract attendees to your talk.

PyGotham is the first conferenced I've experienced where attendees get to see and vote on every CFP. I've written a few CFPs, but I'd never read anyone else's before, so it was enlightening to experience it as someone with voting power (some undefined amount of it anyway) over which talk got selected.

Some takeaways:

* Reviewing CFPs is *really* draining.
  * I think there were ~300 submissions. I split it into 3-4 shifts, but I'm sure I was more patient and generous with some than others just by virtue of different energy levels.
* It's tough to balance my own interests against the crowd's.
  * For example, I'm not that interested in machine learning talks, but I know others are. Do I vote for or against those?
* Snottiness plays poorly in CFPs.
  * Some of the submitters acted as though it was below them to fill out the CFP. There was a question like, "What is your talk about?" and then a subsequent question along the lines of, "What should attendees take away from your talk?" I saw several people give lazy answers to the latter question like, "See above" or ,"This is not meaningfully different from the first question."
  * When you've reviewed 100 CFPs and have to eliminate 90% of what you read, the snotty ones are the easiest to reject.

### Three conferences per year is a good goal

At the beginning of the year, I [set a goal](/solo-developer-year-1/#goals-for-year-two) to speak at three conferences in 2019. PyGotham completes that goal:

1. [NERD Summit 2019](http://2019.nerdsummit.org/)
1. [PyTexas 2019](https://2019.pytexas.org/) ([my notes](/retrospectives/pytexas-2019-notes/))
1. PyGotham 2019

In retrospect, I feel like three remains a good goal. Each conference wipes me out for a week or two, but they also inspire good ideas and expose me to tools and techniques I might not otherwise discover.