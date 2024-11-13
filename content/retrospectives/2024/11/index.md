---
title: "Paternity Leave: Month 3"
date: "2024-11-13T00:00:00-05:00"
description: TODO - One-line summary
---

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Enjoy family time

- **Result**: Enjoyed time with my wife and son.
- **Grade**: A

I found it helpful since the last retrospective to remind myself that even when it seems like I'm going long stretches without working, I'm making that choice, and I'm still mostly in control of my time.

I'm still finding the right balance between work and family time, and things continue feeling better.

### Publish my tutorial on fuzz testing with Nix

- **Result**: I finally [finished the post](/nix-fuzz-testing-1/), but it didn't get much traction.
- **Grade**: A

## Easing back into work

One new change is that my wife offered to

## Am I over-investing in blog posts?

I used to have a bad habit of feeling like once I learned something difficult, I absolutely had to write a blog post explaining it. I tried to polish every post to the best they could be, even if the audience for the article was tiny or if I had no way of reaching readers. Previous examples include ["Hiring Content Writers: A Guide for Small Businesses"](/hiring-content-writers/) (there's an audience, but I don't have a good way of reaching them) and ["Retrofitting Apps for Cloud Storage with Zero Code Changes"](/retrofit-docker-gcs/) (very niche and not interesting outside of my strange use-case).

I've since changed become a bit more strategic in my posts. If I don't think an article can reach a critical mass of readers, I either don't write it or I write a quick 'n dirty version in my ["Notes" section](/notes/).

### "Using Nix to Fuzz Test a PDF Parser"

I feel a bit conflicted about this post. Writing the post taught me a lot about Nix and fuzz testing, but I spent longer than I expected writing it. At first, I thought, "Oh, I can do a quick writeup in a few hours about what I did here," but I ended up spending 20+ hours on it.

I've spoken to readers who are glad that I've written those articles, but I also have to consider the opportunity cost. In the time I spent writing my Nix fuzzing article, was there another article that would benefit me more or reach more readers?

It's also discouraging to write software tutorials in an age of LLMs. Five years ago, there was a long-term return on tutorials, as people would discover them through web searches later. These days, if I write a niche tutorial, I think LLMs will just steal whatever I write, and the reader will have no idea it came from me.

### "Lessons from my First Exit"

I knew from the start that this was a risky post because it has a few things working against it:

- It's about nitty-gritty details of selling a business, which 99% of my readers have no plans to do.
  - My previous post about the sale got traction, but that was a story, so readers could enjoy the story of it even if they weren't interested in doing it themselves.
- The only channel social media channel where it has a decent shot is Hacker News

I think that post still has a decent shot of getting traction on Hacker News.

But even if that post flops entirely, I'm still happy about writing it. It helped me think through the acquisition for myself, and it will be a useful reference if I ever sell another business in the future. I have gotten positive feedback about it from founders who have been through an acquisition or are thinking about it.

## Implementing major features through stacked diffs

For the past few weeks, I've spent most of my hobby programming time on [ScreenJournal](https://github.com/mtlynch/screenjournal), my TV and movie review app. The idea of it is like letterboxd or Goodreads, but the reviews are private and the code is open-source.

<figure class="img">
<img class="img-border" src="https://raw.githubusercontent.com/mtlynch/screenjournal/refs/heads/master/docs/assets/screenjournal-demo.webp" >
<figcaption><p><a href="https://github.com/mtlynch/screenjournal">ScreenJournal</a>, my open-source TV and movie review app</p></figcaption>
</figure>

I always wanted ScreenJournal to support both movies and TV shows, but I implemented movies first because they were simpler. I intentionally avoided generalizing the code to support TV shows in the future. I didn't know if it would ever happen, so I wanted to optimize for the functionality that was there.

In October, I added support TV show reviews, so I had to make a lot of changes to the codebase where I assumed the user would always be reviewing a movie.

The [full change](https://github.com/mtlynch/screenjournal/pull/359) ended up weighing in at over 2k lines of code, which is significantly larger than I'd like for a single changelist. I'm using the term "changelist," but I'm talking about something like a pull request in Github terms or a merge request in Gitlab terms.

In the past, the way I've tackled large changes like this is that I have a feature branch that's in a broken or incomplete state until I finish the feature. I either make changes directly into the feature branch or I branch off that feature branch again for a subtask and then merge in the subtask when I'm done.

The problem with this approach is that the feature branch becomes a giant blob of changes that are too large to understand. You can see an example of this [when I migrated What Got Done from Firestore to SQLite](https://github.com/mtlynch/whatgotdone/pull/639). There were lots of substeps within that change, but they're not inspectable because everything is mixed together.

So, for this ScreenJournal change, I tried something different. Instead of keeping a big, messy feature branch, I did stacked diffs.

{{<notice type="info">}}

##### What's a stacked diff?

Stacked diffs are where you have a `main` branch, and you want to merge in a large feature, so you break the feature into change `A`, `B`, and `C`. You create `A` by branching off of `main`, create `B` by branching off of `A`, etc.

Github has okay support for stacked diffs in that if your stack is `A`, `B`, `C`, you'd make a PR from `A` into `main`, then a PR from `B` into `A`. When you merge in the `A` into `main` PR, the `B` into `A` PR automatically updates to a `B` into `main` PR.
{{</notice>}}

I broke up the work by making a PR for each page in the TV show review flow. The first step of leaving a review is to search for the thing you want to review. It used to only be movies, so I started by adding a radio button that let the user choose between a movie or TV show:

TODO: image

That was the [first change](https://github.com/mtlynch/screenjournal/pull/329/files). The next thing I needed was a way for the user to pick a TV show season, as that's something that I didn't have when it was movies only. So, [that was its own chage](https://github.com/mtlynch/screenjournal/pull/342).

Not aware of any command that says to push the whole stack back up. And then you have to force push, which makes the Github PR ugly.

### Issue 1: Deleting source history

The thing I dislike most about the stacked diff workflow is that I end up deleting source history, which defeats the purpose of using source control. Because `git rebase` rewrites history, I have to force push to Github, and my PR becomes littered with this:

TODO

And it's not that I'm particularly precious about having a courtroom-level archive of events exactly as they happened, but I like having a change history in case I screwed something up. With rebase,

### Issue 2: Rebasing is easy, pushing is hard

If I have branches `A`, `B`, and `C`, and I rebase all of them at once, the git output looks like this:

```bash
$ git rebase master --update-refs
Successfully rebased and updated refs/heads/C.
Updated the following refs with --update-refs:
        refs/heads/A
        refs/heads/B
```

Okay, that was easy, but now I want to push all those changes to Github. There's no "okay, now push the branches I just rebased" command, so I instead have to copy the output from git into a text editor, edit to pull out the branch names, then put it back into a command like `git push origin A B C -f`.

### Maybe I should give jujutsu a try

I'm seeing more and more chatter about [jujutsu](https://github.com/martinvonz/jj), a new source control system that's on track to become standard within Google. I thought about trying it and thought, "Eh, git does what I need. Why chase after the next shiny thing?" But then I had this experience with git rebase and remembered there are a lot of times I have to fight with git, and I've just accepted that as normal.

https://steveklabnik.github.io/jujutsu-tutorial/advanced/simultaneous-edits.html

## Recommendations

### ["Why I still blog after 15 years"](https://www.jonashietala.se/blog/2024/09/25/why_i_still_blog_after_15_years) by Jonas Hietala

I related a lot to his post about blogging, and as I explored his site more, I was like, "Oh, this guy is like the Swedish version of me." So if you enjoy my writing, you'd probably enjoy his as well.

### ["Notes on Ukraine"](https://mattlakeman.org/2022/05/15/notes-on-ukraine/) by Matt Lakeman

I discovered Lakeman's blog last week, and every day since then, I just keep thinking, "Who is this guy?" He travels to not-so-popular destinations, usually for ten days or so and then publishes a blog post about the country. But it's not like postcard to your mom blog posts; these are novella-length blog posts based on hours of study of the history of the country and conversations with locals.

I also discovered that he has a long posting history elsewhere on the Internet under the username `dormin111`.

The craziest thing about all his work is that there's seemingly no angle. Usually, when you see someone invest so much into their writing, it's usually obvious how it benefits them: they have a Substack or YouTube channel that earns them money, and their free articles are [loss leaders](https://en.wikipedia.org/wiki/Loss_leader). But I can't find any angle or profit motive in any of Lakeman's stuff. He just seems like a guy who loves thinking deeploy about things and sharing his thoughts.

Anyway, this Ukraine post, I naturally assumed he visited before the war, but it turned out that he visited two months into the war and interviewed people within miles of the front lines.

### Cyberpunk 2077 (video game)

I don't play video games much, but I buy one new game per year and play until I get bored, which usually takes 5-25 hours over a few days. I'm at about 25 hours of play with this game, and I'm still enjoying it, and I find its depth amazing. I think I've only explored like 3% of the game so far, so it amazes me that modern games have such expansive worlds.

I usually don't care about stories in video games and find it irritating when games make me sit through boring exposition, but Cyberpunk is one of the few games where I find the story compelling enough to pay attention. And it's cool to see them invest so much into voice acting to the point that Keanu Reeves plays a major role in the game.

### Detroiters (TV show)

I'd heard of this show, but I think the name always dissuaded me from watching. A show where the defining feature is that they live in Detroit? No thanks.

And then somehow I saw [this clip](https://www.youtube.com/watch?v=yWBqnpCCasg) from the show and realized that great people are in it, and the tone is like a slightly more grounded sitcom version of _I Think You Should Leave_. And I'm eight episodes in, and it's great.

## Wrap up

### What got done?

- Published "Lessons from my First Exit"
- Published "Fuzzing a XX"
-

### Lessons learned

-

### Goals for next month

-

### Requests for help

TODO
