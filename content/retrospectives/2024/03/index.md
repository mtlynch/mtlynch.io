---
title: "TinyPilot: Month 44"
date: 2024-03-14T00:00:00-04:00
description: TODO - One-line summary
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $80-100k/month in revenue and employs six other people.

Every month, I publish a retrospective like this one to share how things are going with my business and my professional life overall.
{{</notice>}}

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Publish TinyPilot Pro 2.6.3

- **Result**: We published the release.
- **Grade**: A

We were trying to expose any release steps that are accidentally silo'ed with me, so this was the first release where I didn't perform any release step directly. The team performed every step based on shared documentation, including things like writing [the changelist](https://tinypilotkvm.com/pro/changes#263) and the [release announcement](https://tinypilotkvm.com/blog/whats-new-in-2024-03).

### Document TinyPilot Pro's release process internally

- **Result**: I documented enough to cover the release, but there are still areas to improve.
- **Grade**: B+

Documenting the release process was a great exercise in that exposed not only undocumented processes but also weaknesses in our process. In documenting our release workflow, I realized that we hadn't critically examined much of it, so there were lots of places that were unnecessarily labor-intensive, error-prone, or pushed us to reinvent the wheel.

### File 2023 taxes

- **Result**: Gathered most documents, but I haven't filed yet.
- **Grade**: B

I ended up getting sidetracked by the TinyPilot release, but I still think it's probably a good idea to file my taxes this year.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | January 2024   | February 2024  | Change                                          |
| ------------------------ | -------------- | -------------- | ----------------------------------------------- |
| Unique Visitors          | 7,800          | 13,000         | <font color="green">+5,200 (+67%)</font>        |
| Sales Revenue            | $100,008.98    | $82,517.42     | <font color="red">-$17,491.56 (-17%)</font>     |
| Enterprise Subscriptions | $290.70        | $290.70        | 0                                               |
| Royalties                | $3,313.11      | $3,373.65      | <font color="green">+$60.54 (+2%)</font>        |
| Total Revenue            | $103,612.79    | $86,181.77     | <font color="red">-$17,431.02 (-17%)</font>     |
| **Profit**               | **$79,764.14** | **$24,199.09** | **<font color="red">-$55,565.05 (-70%)</font>** |

We saw a big surge in visitors due to the attention [my annual review](/solo-developer-year-6/) generated, but it didn't seem to impact TinyPilot sales much. There was a 17% drop in sales, but that's mainly due to January being an atypically strong month. $75-95k/month in sales is our typical range.

I need a new way to report monthly profit because switching to the contract manufacturer has made our cash profit numbers basically meaningless at the one-month resolution. Our profit each month is dominated by the timing of manufacturing bills pay every three to four months.

That said, our three-month trailing average profit is back in the $10-20k range I like to see.

## It turns out we have a 25-step release process

Originally, TinyPilot software releases were entirely my job. As the product matured and we added more steps to the process, releases grew to be 10-20 hours of work.

About 18 months in, I delegated the hardest release tasks &mdash; most of the manual testing. That cut my time down to three to five hours per release, and I felt like I'd done a good job delegating.

This last release, I challenged myself to delegate _everything_. I wanted to make sure releases could move forward at times when I'm not available.

I started writing instructions for the tasks I still owned, expecting to document just a handful of steps.

When I enumerated everything I was still doing every release, I realized we had 25 distinct subtasks as part of every release:

> ### Testing a release candidate
>
> 1. Create a release candidate build
> 1. Draft the changelog
> 1. Draft security advisories (if applicable)
> 1. Draft the release announcement
> 1. Update the test plan to cover any feature changes
> 1. Test release candidate on a Voyager device
> 1. Test updating to the release candidate from a Voyager device
> 1. Test release candidate on a DIY device
> 1. Run automated end-to-end tests
> 1. Review test results
> 1. Decide whether to publish the release
>
> ### Publishing the release
>
> 1. Publish security advisories (if applicable)
> 1. Publish the changelog
> 1. Publish TinyPilot Pro production release
> 1. Perform post-release tests
> 1. Announce release to TinyPilot team
> 1. Add image hashes to changelog
> 1. Monitor bug reports for at least 48 hours
>
> ### Announcing the release
>
> 1. Publish TinyPilot Community release
> 1. Publish release announcement blog post
> 1. Share release with EU distributor
> 1. Share release with manufacturer
> 1. Update links in TinyPilot Suport Playbook
> 1. Send release announcement to mailing list
> 1. Share blog post on TinyPilot’s Twitter

I had only documented and delegated three of them: the ones that required manual testing. But I was still doing the other 22 tasks.

Until no

I felt like I wasn't doing that much, but I was still doing

## Some release tasks are deceptively hard to delegate

Some tasks turned out to be much harder to delegate than I expected. I was kind of "cheating" in that I have context across teams, whereas other TinyPilot team members generally do not.

### Making a go vs. no-go decision

There are a few distinct roles. There's the product owner, who represents . There's the developer, who understands how TinyPilot's code works. And there's the release captain, who's responsible for driving the release.

If we discover a bug during testing, a few things need to happen:

1. The person performing the test or reviewing the test footage needs to recognize the bug.
1. The dev team needs to estimate how long it will take to fix the bug and how risky the fix is.
1. The product owner needs to weigh the cost and risk of fixing the bug and re-testing vs. the cost of shipping with the bug as-is.

When I'm performing all the release steps, that process is relatively easy. I'm comfortable with TinyPilot's codebase, so I have a pretty good estimate of how difficult and risky it is to fix a bug without waiting for feedback from them. And I'm the product owner, so I can decide how much it matters if we ship with this bug vs. fixing it pre-release.

When I delegate the release, these tasks suddenly become much more complicated. Suddenly, information is spread across multiple people on multiple teams. How should the relase manager get information from the dev team, and then how does the product owner get all the information they need to decide if the bug is worth fixing?

### Writing security advisories

We'd only had three security advisories, and I've written all of them. At first, I thought it would be easy. Just look at our previous three advisories, and write a new one like that.

- How do we decide what's a Low vs. Medium vs. High severity issue?
- What kinds of bugs merit a security advisory at all?
- How do we responsibly inform customers about risks without panicking them about unlikely attack scenarios?

### Recognizing when features misbehave

I'm planning in future release to have the support engineering team work with the dev team so the dev team can see how new or modified features look in our manual tests and verify that it's what they expect.

## Side projects

### I've written the world's fastest (incomplete) Ethereum implementation

I mentioned last month that I'd found a fun way to learn more about Zig, interpreters, and Ethereum &mdash; I'm writing an Ethereum bytecode interpreter in Zig.

One of the advantages to working in Zig is that I have a high degree of control over performance. One of my earliest tasks on my interpreter was to set up benchmarks in continuous integration to compare my implementation to the official Go implementation.

For a while, my Zig version was slightly underperforming the Go version, but then I refactored my benchmarking scripts and my performance mysteriously tanked.

{{<img src="eth-benchmarks-before.webp" max-width="600px" has-border="true" caption="The official Go implementation was pummeling my Zig implementation (lower is better)">}}

I [asked for help on Ziggit](https://ziggit.dev/t/zig-build-run-is-10x-faster-than-compiled-binary/3446?u=mtlynch), a Zig forum, and it turned out I had a bug in both [my benchmarking scripts](https://ziggit.dev/t/zig-build-run-is-10x-faster-than-compiled-binary/3446/12?u=mtlynch) and [in my Zig code](https://ziggit.dev/t/zig-build-run-is-10x-faster-than-compiled-binary/3446/8?u=mtlynch). Once I fixed those two simple bugs, my Zig version zoomed past the Go version. My implementation now outperforms the official implementation by 30-40%.

{{<img src="eth-benchmarks-after.webp" max-width="600px" has-border="true" caption="After fixing a few simple bugs, my Zig Ethereum implementation outperforms the official implementation by 30-40% (lower is better)">}}

To be fair, my version only implements about 3% of Ethereum, so I have an unfair advantage, but it continues to be a fun project.

## Wrap up

### What got done?

- Published [TinyPilot Pro 2.6.3](https://tinypilotkvm.com/blog/whats-new-in-2024-03)

### Lessons learned

-

### Goals for next month

- Fill the gaps in TinyPilot's release documentation.
- Complete 2023 taxes.
