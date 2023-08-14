---
title: "TinyPilot: Month 37"
date: 2023-08-15T00:00:00-04:00
description: How can TinyPilot increase recurring revenue?
---

{{<notice type="info">}}

**New here?**

Hi, I'm Michael. I'm a software developer and the founder of [TinyPilot](https://tinypilotkvm.com), an independent computer hardware company. I started the company in 2020, and it now earns $60-80k/month in revenue and employs seven other people.

Every month, I publish a retrospective like this one to share how things are going with my business and my professional life overall.
{{</notice>}}

## Highlights

-

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Reach $98k in sales revenue

- **Result**: Revenue dropped 10% to $84k
- **Grade**: C

Our revenue dropped even though we had several new positive reviews:

- [RaidOwl](https://www.youtube.com/watch?v=ceWNyZno7FI)
- [Home Network Guy](https://youtu.be/QsTAKeK0M4s) (and accompanying [blog post](https://homenetworkguy.com/review/remote-control-a-pc-or-server-with-tinypilot-voyager-2a/))
- [Network Profile](https://blog.networkprofile.org/tinypilot-open-sourve-ipkvm/)
- [Botio Studio](https://youtu.be/E94A6EasaSs) (Chinese)

I think a big part of this is due to Amazon downranking our listings through their Kafkaesque account health policies. We're now back in their good graces, and sales have picked up again.

I've also heard from other founders that they see a regular summer slump around this time. And TinyPilot indeed had an [11% revenue drop in July 2022](/retrospectives/2022/08/).

### Stay on schedule for TinyPilot's shift to our contract manufacturer

- **Result**: The schedule has now slipped three weeks.
- **Grade**: D

The schedule manufacturing has been pushed back, as downstream vendors of the contract manufacturer need more time to produce components like power adapters and USB cables. We still have about three weeks of buffer before we

This wasn't a well-designed goal, as I didn't choose the deadline, and I have limited control over keeping the deadline aside from preventing things from being blocked on TinyPilot's side.

### Spend less than 40% of my time on email

- **Result**: Spent most of my time on email.
- **Grade**: D

I ended up spending way more of my time on email than I expected. I had some vacation travel in July, and I didn't take into account how much the days off would cause email backlogs I'd have to catch up when I returned to work.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | June 2023      | July 2023        | Change                                         |
| ------------------------ | -------------- | ---------------- | ---------------------------------------------- |
| Unique Visitors          | 8,300          | 7,800            | <font color="red">-500 (-6%)</font>            |
| Sales Revenue            | $88,378.45     | $79,635.02       | <font color="red">-$8,743.43 (-10%)</font>     |
| Enterprise Subscriptions | $290.70        | $290.70          | 0                                              |
| Royalties                | $4,399.66      | $3,777.52        | <font color="red">-$622.14 (-14%)</font>       |
| Total Revenue            | $93,068.81     | $83,703.24       | <font color="red">-$9,365.57 (-10%)</font>     |
| **Profit**               | **$30,907.55** | **$25,357.82**\* | **<font color="red">-$5,549.73 (-18%)</font>** |

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

Despite revenue dropping, profit is still in the $20-30k range. The number is somewhat inflated because my expenses are artificially low. With the transition to the contract manufacturer, I'm winding down my own production, so I've stopped buying new materials.

I'm surprised to see website visitors down despite all the new reviews that came out. It looks like TinyPilot has probably saturated homelab reviews as a marketing channel for a while, so I should focus on other types of sales and marketing.

## How can TinyPilot increase recurring revenue?

When TinyPilot's sales slump, I start to think more about recurring revenue. In the bootstrapper community, most successful businesses have recurring revenue.

I keep waiting for the day to come when everyone who wants a TinyPilot already has one. Then what am I going to do?

My plan from the beginning was that TinyPilot _would_ have recurring revenue. Customers would buy the hardware once, and then they'd fund ongoing software development by renewing their software license every year.

The problem is that I've never set up TinyPilot to collect recurring revenue from customers. Three years in, we barely have any recurring revenue outside of a few Enterprise clients.

In this retrospective, I want to focus on the challenges around recurring revenue for TinyPilot and explore possible paths to increasing it.

## How TinyPilot Pro's licenses work currently

I first began work work on a premium version of TinyPilot's software a few weeks after I released the original DIY TinyPilot kits in 2020. I was a few days into working on it when I realized it would take me months to write license management code while juggling all of my other responsibilities as a founder.

If it took me three months to implement license management, I'd still have to spend two months implementing other premium features so customers would have a compelling reason to purchase TinyPilot Pro. With the company only a few months old, I didn't want to slow down momentum so much by making users wait five months until the next release.

There's a Basecamp post that I can't find anymore where they talk about how they decided to start selling their SaaS product before they'd even written billing software. They reasoned that invoices for their software were due at the end of each month of service, so they had a month after their first sale to figure out how to actually collect the money.

I decided to follow a similar path with TiyPilot Pro. I settled on [the honor system](/retrospectives/2021/01/#enforcing-software-licenses-via-the-honor-systemdhh) as a way of enforcing licenses with the expectation that I had a year to implement a real license management solution.

Now, it's three years later, and I still haven't made any progress on license enforcement for TinyPilot Pro.

## License enforcement at the worst possible time

We advertise to customers that TinyPilot devices come with 12 months of free updates, but our dirty secret is that once you have a TinyPilot Pro installation, you can keep updating the software forever through the device's web interface.

{{<img src="update-dialog.png" caption="TinyPilot's web app allows any device to retrieve the latest version of TinyPilot Pro" has-border="true" alt="Screenshot of update dialog in TinyPilot web app" max-width="700px">}}

TinyPilot Pro's software doesn't track whether it's associated with a valid license. There are users who purchased in August 2020 that are now in year three of their one-year license.

The vast majority of users don't realize that their license expired at all. They assume, understandably so, that if TinyPilot continues delivering updates to their device, their license is still valid.

But customers do sometimes discover that their license expired, and it's at an especially inconvenient time. TinyPilot uses microSD cards for storage. microSDs are especially vulnerable to filesystem corruption, and the only solution is to reflash the microSD from a TinyPilot Pro disk image.

In order to download a TinyPilot Pro microSD image, customers enter their order details, and we figure out if they still have a valid license before offering the microSD image.

{{<img src="license-check.png" caption="License check on [page to download TinyPilot Pro microSD image](https://tinypilotkvm.com/pro/license-check)" has-border="true" alt="Screenshot of form asking the user to input their order number and email address to download TinyPilot Pro image">}}

From the customer's perspective, this is a terrible way to find out that their license expired. Their filesystem got corrupted, so TinyPilot has interrupted their work. To fix the issue, they have to physically walk over to the device, remove the TinyPilot's microSD, and reflash it. And now we're shaking them down for more money?

When the license check on the website comes back as "expired," the message does tell customers that they can contact support to get an old version of TinyPilot Pro, but it's still a poor customer experience. They still have to wait up to one business day for a response from us, which is bad if we're blocking their work.

This system isn't great for us either because support requests for old TinyPilot Pro versions drain support resources. And once the customer gets a new image, they're back on the "free updates forever" train because they can just keep updating the software from the device's web interface.

## What would make recurring subscriptions worth the effort?

For license renewals to be worthwhile, they'd need to generate at least $30k/yr in additional profit. I estimate payment processing for licenses will cost about 3%, so each license renewal nets TinyPilot about $77.

To hit my target number of $30k/yr in additional profit from licenses, a minimum of 387 customers per year would have to renew their licenses each year.

Since we launched in 2020, TinyPilot has sold around 5,000 devices total. We sell around 2,700 new devices per year. Reaching 387 subscribers means convincing just 7.5% of our existing users to pay for continued updates, which seems doable.

## How can I test customers' willingness to renew their licenses?

Any kind of license enforcement is going to be expensive. At minimum, we'd have to add something to TinyPilot's web interface that allows customers to enter their license information, and then we need a server on the Internet that can decide whether the user qualifies for updates based on their license.

That's expensive to implement because it's several weeks of dev work, and it increases support load when users inevitably email us saying they can't access updates because they deleted the TinyPilot email with their order information.

What if I go through all that effort and trouble and find that fewer than 7.5% of customers are willing to pay for license renewals? That would be a huge waste of money and misuse of limited dev resources, so is there a better way to test willingness without spending so much money?

### Forced factory resets

Earlier this year, we had to switch TinyPilot's base OS from Debian Buster to Debian Bullseye. The Raspberry Pi OS doesn't have a supported way to do major version upgrades, so we unfortunately had to force every user to manually reflash their microSD to make the migration.

I hated pushing that cost onto users, but we weren't able to find any other option. But the positive side effect was that it ended the "free forever" update train. For users to get access to the Debian Bullseye-based TinyPilot Pro image, they had to prove they had an active license.

How many customers seem to have renewed based on that?

TODO: count TinyPilot Pro renewals after the announcement of people who had previous hardware purchases

### Manual expiration notices

TODO: Show emails I've sent.

{{<img src="license-expired-note.png" has-border="true">}}

### Add an auto-renew option

We currently only offer

## Side projects

### [What Got Done](https://whatgotdone.com)

I've been [experimenting with Nix](/tags/nix/) recently, and one of the features that interests me is `nix develop`. It lets you create a self-contained shell environment with exactly the dev tools you need to build and test your project.

One of the annoyances I run into with my various software projects is the difficulty of maintaining dependencies. My projects' dependencies are tied to specific versions like Go 1.19 or Node.js 16. Whenever I have to upgrade to the next version, it's a pain to figure out how to install it in my dev environment, then update the version numbers in my continuous integration (CI) configuration.

Worse, if I have multiple projects on the same system, updating Node.js for one project means that the other projects now have unexpected versions of Node.js and npm.

The promise of `nix develop` is that I could define the dependencies in one place: a [Nix flake](https://nixos.wiki/wiki/Flakes). If I needed to upgrade to the next version of Go, for example, I'd just update one file, re-run `nix develop`, and I'd have a local shell with the right version of Go, and my CI environment would run the same version. The environment is local to the directory, so changing package versions wouldn't affect any other projects on the same system.

I started experimenting with `nix develop` in [What Got Done](https://github.com/mtlynch/whatgotdone/blob/dd3ea38885b04280bcea07f5294440e9a3521301/flake.nix) because it depends on particular versions of Go and Node.js.

It's been interesting playing with Nix for What Got Done's development environments, but here are the roadblocks I've run into so far:

- I [couldn't figure out how to make Go static binary builds work](https://www.reddit.com/r/NixOS/comments/15d874l/trying_to_create_a_nix_flake_for_go_with_static/), and [the solution](https://github.com/mtlynch/whatgotdone/pull/884/files) feels kind of like, "You should just know this magic incantation."
- There's no easy way to specify an exact version of a dependency.
  - I expected to be able to declare versions similar to Docker like `go:1.19.3`, but [Nix doesn't support this](https://github.com/NixOS/nixpkgs/issues/9682).
  - For a tool that focuses so much on reproducibility, this really surprised me.
  - The closest solution I've found is to [use a third-party tool](https://gist.github.com/toraritte/62e53be9e6d88d8b6b97391eb3c6558b#22-pin-nixpkgs-in-a-nix-expression) to find the nixpkgs hash associated with a package version, then pin your package to that nixpkgs hash. Here's what that looks like for [one of What Got Done's dependencies](https://github.com/mtlynch/whatgotdone/blob/67f098bace4c7d6302c193dc20e85d4e6a6761a2/flake.nix#L14-L18).
  - [Devbox](https://github.com/jetpack-io/devbox) solves this problem, but then you're only indirectly using Nix, and you have to learn to use Devbox's abstraction on top of Nix.
- Populating the Nix store is prohibitively slow.
  - There's a [`nixos/nix` Docker image](https://hub.docker.com/r/nixos/nix) that I can spin up pretty quickly in CircleCI, but building the Nix environment for my Nix+Go flake takes about two minutes.
  - This means that any CI step I run has to burn two minutes just initializing Nix.
  - I tried caching the Nix store, but it's about 3 GB, which CircleCI takes about two minutes to download and decompress.

## Wrap up

### What got done?

- Published ["Installing NixOS on Raspberry Pi 4"](https://mtlynch.io/nixos-pi4/)
- Learned to use [hurl](https://hurl.dev/) to replace curl-based integration tests for HTTP APIs.

### Lessons learned

- TinyPilot seems to have saturated
  - I'm seeing greatly diminished returns for new reviews relative to the effect that new reviews had two years ago.

### Goals for next month

- Shift manufacturing to our contract manufacturer as quickly as possible.
- Create a detailed plan for moving out of TinyPilot's local office.

### Requests for help

If you have experience with setting up recurring subscription for a digital product on Shopify, please [email me](/about/).
