---
title: "Refactoring English: Month 18"
date: "2026-06-09"
description: The book is done! Well, sort of.
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and founder of small, indie tech businesses. I'm currently working on a book called [_Refactoring English: Effective Writing for Software Developers_](https://refactoringenglish.com).

Every month, I publish a retrospective like this one to share how things are going with my book and my professional life overall.

{{</notice>}}

## Highlights

- I've completed all 22 chapters of my book.

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Get _Refactoring English_ to "content complete"

- **Result**: XX
- **Grade**: XX

TODO

### Create a tool that allows _Refactoring English_ readers to give feedback as they read the book

- **Result**: XX
- **Grade**: XX

TODO

## _Refactoring English_ metrics

{{<project-metrics project="refactoring_english">}}

## Bug bounty metrics

I've continued pursuing security bug bounties, but I've reduced my time on them. I'm not quite doing the 70/30 split I planned, but maybe like 60/40.

The main vendor I've been working with paid another $7k (so $17k total) for reports, but they've slowed down on processing reports, so I've mostly stopped searching for new bugs in their code.

I submitted bugs to a few other bug bounties just to see if any are processing bug reports quickly, but none of them are:

- KeePassXC - I submitted an RCE to Zero Day Initiative on May 18th, but I haven't heard any response.
  - For KeePassXC users, this isn't a zero-click attack or something that could compromise your database by just visiting a malicious website, so don't get too worried.
- Cloudflare - I submitted a DoS / logic bypass via HackerOne on May 22nd. No response.
- Proton - I submitted one low severity issue. They asked for a video proof of concept, so I made one on May 29th, and they said to wait to hear back.

## When is the book "done?"

I've completed all the chapters of the book, but I don't consider it officially "done."

I wrote the book over the past year and a half, usually focusing on a single chapter at a time. The order of the chapters in the book was generally unrelated to the order that I wrote them.

I haven't ever read my own book cover-to-cover to make sure it's all consistent. I want to do a few readthroughs at least before I call it done.

### Why wasn't I continuously revising the book?

I originally planned for the book to be more continuously edited based on reader feedback. That way, when I got to the last chapter, the book would be pretty much done because the rest of the book would have had so many revisions based on comments from readers.

In reality, I integrated reader feedback far less than I expected.

The first reason that didn't happen is that I found it hard to split my focus between revising past chapers and writing new chapters. If I spent a week revising old chapters, it didn't feel like tangible forward progress, whereas if I added a new chapter, it meant that my public progress meter got a little fuller. I also felt like I was less productive when splitting my time between new chapters and old chapters.

TODO: Progress meter screenshot

The other reason I didn't continuously revise is that I didn't reach out to readers as much as I planned. Part of that is that I constantly felt behind on the book, so there was always a sense of, "I want to get this chapter out, and _then_ I'll invest more into reader outreach."

But even when I did reach out to readers, it rarely impacted the book. The most common responses from readers were, "I like the book" or, "I haven't started it yet."

When I did get detailed feedback from readers, I wasn't always sure how to act on it. In some cases, the reader would flag an issue, and I felt they were clearly right, so I changed the book to match their feedback. But a lot of the times, the reader would suggest adding something that I didn't think was necessary. And that's not to say the reader was wrong, but I'd want to see a pattern in reader feedback before I make a change that doesn't match my intuitions.

### My reader feedback tool

Now that I've completed all the chapters, I feel like I have more space to reach out to readers.

I've seen [_Help this Book_](https://helpthisbook.com/), but I didn't like the storing all of my reader feedback somewhere I have to pay for monthly. I saw that Julia Evans [made her own reader feedback tool](https://jvns.ca/blog/2023/03/31/zine-feedback-site/), customized to her products, and I thought that was neat, so I'm working on that.

{{<video src="feedback-app.mp4" max-width="700px" caption="I'm working on a web app to make it easier for readers to give me feedback about my book.">}}

##

## AI projects and the great blockade

Overall, I've found that AI makes me more productive when programming. There are certain tasks like resolving git merge conflicts, debugging unfamiliar code, or making simple tools where AI is a clear win.

I used to think AI was great at helping me start projects, but now I'm not so sure.

### Just have AI make the prototype

Six months ago, I'd give the AI agent a high-level overview of what I wanted and tell it to implement a basic v1 implementation. I knew the agent's output would be messy, but it was just a prototype, so I could keep giving it feedback until it matched my programming sensibilities.

It turns out that it's harder than I expected to navigate AI out of a bad prototype. Once the prototype is bad enough, I have a hard time untangling what the code is even trying to do. And AI seems to have a weird bias toward whatever's implemented. If I tell the AI that a component seems confusing because it's iterating over the same data three times, it just keeps insisting we have to iterate over the data three times. AI is bad at noticing when complexity is coming from an unnecessary requirement.

If I don't fix the core logic of the application, the problem keeps getting worse. The code smells grow like fungus and spread throughout the codebase. As the project grows, complexity grows exponentially on top of a weak foundation.

### Break down the prototype

Okay, easy fix: have the AI agent create the prototype in smaller pieces. Keep the AI on a tighter leash so it can't go so far into the weeds. Instead of having the AI create the whole prototype, have it start with a welcome page. Once that's reviewed and merged, add simple feature, and so on.

That works fine until I get to a complex chunk, like authentication. The AI creates a pull request that's 2-5k of confusing code, and that becomes a huge wall. I can't think of a way to break down the feature any further, so I'm stuck with this massive PR.

Not only does a 4k LOC change takes 20x as long to review as a 400 LOC, but it also requires larger review windows. If I have a 20-minute block available, I can tackle the 400 LOC change, but if I have a 4k LOC change, I need 20 minutes just to build up context. to make meaningful progress on a 4k LOC change without wasting most of it on startup and wind down friction, I need a 90-minute window, which is hard to come by especially for weekend projects when I have a small toddler.

### Example: Implementing authentication for Little Moments

Here's an example. For Little Moments, I'm doing authentication with magic login emails. And for several weeks, I thought that's as much as I can narrow the scope without introducing dead code or broken features. I can't implement half a login flow.

After several weeks of chipping away at a giant PR little by little, I realized I actually _could_ implement half a login. [PicoShare](https://github.com/mtlynch/picoshare), another app I maintain, has a simple authentication flow. The app assumes a single authorized user, so authentication is just a passphrase, not even a username/password pair. Instead of a huge switch from no authentication to email-based authentication, I could go from no authentication to passphrase authentication to email authentication.

So, I got passphrase authentication working, but moving from passphrase to magic email logins was still a pretty massive PR that would take me weeks to review. After hacking on it over several days, I realized I could break it down further. Instead of actually sending emails with the login link, I could just immediately redirect the user to the link I _would have_ emailed them. That was still [a 1.7k LOC PR](https://codeberg.org/mtlynch/little-moments/pulls/167), but it was more manageable than sending actual emails. And it reduced the [actually sending emails part](https://codeberg.org/mtlynch/little-moments/pulls/103) to a mere 1k LOC.

What makes me wonder if AI is actually helping me is that I'm confident that I would have identified these opportunities to simplify had I been writing the code by hand. The fact that I can generate the code so quickly, it reduces the natural negative feedback of making a change so big. When I'm writing by hand, I'm not going to write 4k LOC without finding anything I can merge in on its own because it's just too painful to generate so much code that's not merged into the main repo yet. But with AI, it takes two minutes, but then I spend hours untangling it to try to identify the individual pieces that lift out.

I've tried asking AI to identify the pieces that lift out, and it's surprisingly bad. Even when some parts of the PR are obviously not required, like an update to the `AGENTS.md` file, it doesn't identify that as something that can be in its own PR.

### How AI makes this harder

Okay, but is that AI's fault? Authentication is still hard, so if I had to implement it without AI, it would still be a 4k LOC change, except it would take even longer because I'd be writing everything by hand.

What I discovered is that's not true. I don't think I've ever created a 4k LOC PR. The larger the change gets, the more painful it is to work with, and the pain naturally makes me see opportunities to simplify or slice out indpendent chunks.

Ai disrupts that natural feedback loop. With AI, there's no pain in creating a 4k LOC PR because it happens in two minutes while I check my email. And I can easily give notes to improve the 4k LOC PR and feel like I'm making progress, but the big change makes it hard for me to identify what pieces can lift out into their own smaller changes.

<!--

For example, I've been stuck on Little Moments, my family photo sharing app on authentication for a couple months. Because before I do authentication, I have to do session management, which is also complicated. And I keep running into these situations where the smallest next chunk of work I can think of creates a 2-4k LOC change, and it's a huge pain to review.

The place where I'm less confident AI is making me faster is in the initial implementation stages of a project that I want to maintain long-term.

Back in December, I declared that I was going to replace a commercial family photo sharing app with an open-source version I planned to write myself. I thought implementation should be pretty straightforward:

> How hard could that be? 20 hours of dev work?
>
> - Me, [six months and 80 hours of work ago](/retrospectives/2025/12/#building-a-free-tinybeans-alternative-out-of-spite)

My first delay was mostly unrelated to AI. I decided to write a detailed design doc for the app. It helped me write the design docs chapter of _Refactoring English_ and gave me a real doc I could link to when readers asked me what I considered a good design doc. All my previous design docs are silo'ed with my previous employers.

Once the design doc was done, I was able to move quickly on implementation. I quickly got a simple version of the app running on my local system, but that didn't feel fun because I couldn't share it with anyone. I realized the most important next feature was authentication, so I could publish the app to the web and share it with my family as an early preview.

The problem is that authentication is complicated. You can't solve authentication without solving session management, and you can't solve session management without solving persistent state for session management. And then your solution to session management impacts the core parts of your web app routing logic because you want to drop unautheticated requests as early as possible.

So, if I just told AI, "Implement authentication based on my design doc," I'd end up with a 5-10k LOC pull request that's impossible to review because it's too hard to fit 5k lines of context in my head at once.

Okay, so I break it down. What's the smallest piece that moves me toward authentication without ballooning into a 5k line change?

I can implement sessions without implementing authentication, so I start there. But then even that turns into a 2k+ LOC change and I get stuck trying to review so much code.

I've tried saying, "Eh, who cares. Let's just merge in the early change without being so precious about code quality, and I'll fix the messy spots later." But then it gets worse. If the core of my app is messy, the AI agent thinks that's the style and structure to match, so it keeps duplicating those patterns. It's like a fungus that keeps growing unless you clean it up.

And this is why I'm less confident that AI makes me faster early in a project's lifecycle, at least the way I currently use AI.

When I write code by hand, two things happen:

- I don't introduce ugly design decisions.
- The difficulty of writing code forces me to find intermediate stopping points.

So, I kept working on this long PR, but then after a few days of hacking away at it, I realized I could break it down. Magic login is complicated, so let's just start with passphrase authentication. That exercises my session logic without all the complexity of email.

And then I got that in and it was time to do email. So I spent several days trying to bring down complexity.

I wanted to use email based magic login links. I didn't think this would be hard. I have another app that allows users to reset their password via email, so Little Moments should essentially be a simpler version of code I already have.

When I started porting the magic login feature to Little Moments, I realized the code was pretty confusing. I was using one library, jeff for session management. I was using another library, [simpleauth](https://codeberg.org/mtlynch/simpleauth) for authentication, and simpleauth depended on jeff in confusing ways.

I don't like having coe in the main branch that's inert, dead code. I don't like having broken features. And it's like, "How do you have half an email-based auth login?"

And right now, I'm realizing I can split it into two parts. I can do a first-pass implementation where it doesn't actually send the email but instead just forwards the user to the link they'd click in their email. It's not something I can deploy to the Internet yet, but it exercises the plumbing I need to add real emails. But I'm not sure I'd have realized that if I wasn't writing about it.

If you start with AI, it's easy to generate a lot of code quickly.

Problem is that the low cost makes you miss opportunities to simplify. I definitely would not have made comments and reactions separate representations if I'd been coding by hand.

-->

## Wrap up

### What got done?

-

### Lessons learned

- Using AI eliminates the natural feedback cycle that motivates me to build software in smaller chunks.

### Goals for next month

-

### Requests for help

TODO
