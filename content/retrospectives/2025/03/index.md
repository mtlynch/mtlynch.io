---
title: "Educational Products: Month 5"
date: "2025-03-12"
description: My first time raising money on Kickstarter
---

## Highlights

-

## Goal grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Complete the blogging chapter of _Refactoring English_

- **Result**: I decided to focus on the [commit message chapter](https://refactoringenglish.com/chapters/commit-messages/) instead and finished it on time.
- **Grade**: A

Midway through writing the blogging chapter, I realized I could write about commit messages, and that would be a good chapter to share on dev-oriented social networks like Hacker News, /r/programming, and Lobsters.

Unfortunately, the article was a huge miss on Hacker News and didn't get much traction on /r/programming or Lobsters, which was disappointing but I knew was a possibility.

### - Begin selling pre-orders for _Refactoring English_

- **Result**: Started selling pre-orders on Kickstarter
- **Grade**: A

TODO

## Kickstarter: I'm pleasantly surprised

I decided to do the pre-order for _Refactoring English_ on Kickstarter. I'd never used Kickstarter before, and I was bracing myself for it to be a miserable experience where I feel like they're trying to squeeze money out of me and don't care if my campaign succeds, but I found it surprisingly pleasant.

I've tried platforms that are ostensibly "creator-oriented," but then it quickly feels like the platform is working against me. Like the only way to use it is to pay for all these upgrades that have no guarantee of returning the investment.

All in all, it took me six to eight hours of work to fill out all the paperwork, verify my banking information, and create the public-facing text, video, and images.

With Kickstarter, I kept waiting for the upsells or the red tape, but it never came. I launched the project smoothly. The whole time, Kickstarter felt like they were on my side rather than trying to squeeze money out of me.

I like the Kickstarter model for fundraising. I'd like to. If I raise $5k, I'll be happy that there's a critical mass of interested readers to justify me spending a few more months on the book. If I fall short, I'll be disappointed but take solace in the fact that I'm getting a concrete answer.

The one downside of Kickstarter is spam. A ton of spammers must watch Kickstarter because I get about three new emails per day offering some scammy way to help my campaign succeed. They start the conversation by posing (poorly) as an interested customer, and then they steer the conversation towards their friend I should pay to help with my campaign.

{{<img src="ks-spam.webp" has-border="true" max-width="700px" caption="The spammers start with an innocuous message that feigns interest in your product." alt="Hello, An investor promoted your campaign to me, and I was immediately intrigued by your approach to improving writing for software developers. Your experience and success in blogging are impressive! I’d love to support the project. How do you plan to tailor the writing techniques for developers with varying levels of experience and expertise? Best regards, David">}}
{{<img src="ks-spam2.webp" has-border="true" max-width="700px" caption="...and then they shift the conversation to their &ldquo;friend&rdquo; who offers paid Kickstarter publicity services." alt="Hi Michael, Great ! Have you considered reaching out to a creator like yourself on Kickstarter for advice on how they reached their potential goal? I have a friend who's a successful creator on there, and I'm not sure if you're interested, but it might be worth connecting with him for some insights. It could be really helpful for your campaign! Wishing you success with your campaign! Best wishes, David">}}

## Fundraising: How it's going so far

Right now, there have been $XX in pledges. At XX% of the project's window, I'm at XX% of my goal, which sounds good but I worry that I've already played most of my cards. I announced the Kickstarter to the book's mailing list, on social media, and on the little self-ads on the bottom of this blog, so I've already offered the Kickstarter to everyone who follows my writing.

So, now what?

I have two remaining cards to play.

The first is to get on the front page of Hacker News. That's usually difficult to do, but I'm [supposed to be the expert](https://hitthefrontpage.com), so I feel fairly confident that I can do it at least once, hopefully two or three times. I have

My second idea is to reach out to companies who invest heavily in public writing to see if they'd be interested in sponsoring the project. I've never seen a book with corporate sponsors, so maybe this is a bad idea, but it seems like it could work.

## Side project: Hobby cloud server

I recently got a free [4x ARM CPU / 24 GB RAM Oracle Cloud server](/notes/nix-oracle-cloud/). I installed [Woodpecker CI](https://woodpecker-ci.org/) on it, which is helpful for projects I host on [Codeberg](/retrospectives/2025/02/#i-joined-codeberg-as-a-member), as no commercial CIs support Codeberg yet.

The problem is that this fairly powerful server is about 99% idle:

TODO: Screenshot

My criteria are:

- I'd like it to be something that's kind of fun like SETI@home was, where there's neat visual feedback about what you're doing.
- The service is open-source.
- It's useful for a cause I think is neat.
- Oracle can blow away my server, and it shouldn't impact anyone.
  - i.e., I don't want anyone to lose data that they're storing on my server.
- I don't want to spend time moderating something.
- I don't want to mine cryptocurrency.

I wanted to run [ArchiveTeam Warrior](http://warrior.archiveteam.org/) to archive websites to the Internet Archive, but they [don't support ARM](https://wiki.archiveteam.org/index.php/ArchiveTeam_Warrior#Can_I_run_the_Warrior_on_ARM_or_some_other_unusual_architecture?).

I added a [Snowflake proxy](https://snowflake.torproject.org/) to help people defeat censorship, but that still doesn't consume much in terms of resources, and it's a little dull in terms of operator feedback.

If you have suggestions for fun projects that my server should run, let me know in the comments or shoot me an email.

## Interesting links

- ["Writing commit messages"](https://www.chiark.greenend.org.uk/~sgtatham/quasiblog/commit-messages/) by Simon Tatham
  - While writing my take, I read a lot of blog posts about commit message practices, and I thought this was the only good one. Every other article focuses on style considerations that don't matter (e.g., "the title _must_ be imperative voice") or just issue edicts without explaining their value.
  - Based on the URL and site style, I thought the author was a university student and was surprised he had so much wisdom about commit messages, but then I dug deeper and realized [the author](https://www.chiark.greenend.org.uk/~sgtatham/) is the creator of the PuTTY SSH client and [just likes hosting everything on his friend's server](https://www.chiark.greenend.org.uk/~sgtatham/putty/faq.html#faq-domain).
- ["Programming without Pointers"](https://www.hytradboi.com/2025/05c72e39-c07e-41bc-ac40-85e8308f2917-programming-without-pointers) by Andrew Kelley
  - Andrew Kelley, founder of Zig, says he escaped his programming skill plateau by creating a style he calls "programming without pointers."
  - When you design the representation of your app's state, you can't use any data structure that has child pointers. So you can use an array or hashmap at the top level, but they can't contain anything that has pointers.
  - He gives the example of storing strings. You can't store a list of `[:0]u8` objects because that would be a pointer to a pointer. Instead, he creates a custom structure that aggregates all strings into a single array, and then he maintains a list of indexes into.
  - The advantage of this technique is that it's trivial to serialize and deserialize state and share it across environments (e.g., a Zig backend and a WASM frontend) because
- ["Reviving an Old Kindle Paperwhite 7th Gen"](https://terminalbytes.com/reviving-kindle-paperwhite-7th-gen/) by Hemant Kumar
  - I desperately want to buy an old e-reader on eBay for $30 and make my own dashboard, but I don't have any ideas for what to display on it.
- ["If You Ever Stacked Cups In Gym Class, Blame My Dad"](https://defector.com/if-you-ever-stacked-cups-in-gym-class-blame-my-dad) by Kit Fox
  - I woke up at 2 AM one night and couldn't fall back to sleep, and I spent about an hour reading this blog post and cup stacking videos.

## Wrap up

### What got done?

- Launched pre-orders for _Refactoring English_ [on Kickstarter](https://www.kickstarter.com/projects/mtlynch/refactoring-english)
- Published ["How to Write Useful Commit Messages"](https://refactoringenglish.com/chapters/commit-messages/)
- Published [My Zig Configuration for VS Code](/notes/zig-vscode-nix/) and created a [Zig dev flake](https://codeberg.org/mtlynch/zig-vscode-flake)
- Published [my notes for _Never Pay The First Bill_](/book-reports/never-pay-the-first-bill/)

### Lessons learned

- Fundraising on Kickstarter is surprisingly painless.

### Goals for next month

- Reach my $5k Kickstarter goal for _Refactoring English_.
- Publish the blogging chapter of _Refactoring English_.
- Reach out to at least five companies asking them to sponsor _Refactoring English_.

### Requests for help

- If you have suggestions for my Kickstarter project, and you're not a spambot, shoot me an email.
