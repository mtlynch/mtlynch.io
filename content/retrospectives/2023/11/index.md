---
title: "11"
date: 2023-10-31T10:54:57-04:00
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

### Shift manufacturing to our contract manufacturer as quickly as possible

- **Result**: XX
- **Grade**: XX

TODO

### Reduce manual effort from TinyPilot's software release process

- **Result**: XX
- **Grade**: XX

TODO

### Create a plan for better enforcement of TinyPilot Pro licenses

- **Result**: We haven't made progress on a plan.
- **Grade**: F

TODO

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

## The microSD fiasco

### The missing disks

I had sent them the disk image to flash onto the microSD, but they misunderstood and thought I meant for testing.

So the first sample was delay

### Checking correct microSD flashing

I knew that when the first production batch arrived, I'd need to verify that the microSD matched the image we gave them. If the machine they use to generate microSDs was compromised and was tampering with our software or if there was an error in how they were flashing microSDs, then we'd detect that their microSDs don't match our disk images.

On a Friday afternoon, I realized I hadn't thought through _how_ I'd check the microSDs. I needed a short script to load our disk image, compare it to what the manufacturer wrote to the disk, and print out any differences. I reached out to TinyPilot's support engineering team, and they were able to put together a script to do what I needed in two days.

When the first batch arrived, the local team did a full functional test on four of the devices, and they reported that everything looked good. I wanted to check a device as well, but I first had to check that the microSD was correct. I loaded the microSD, ran the script, and it reported that everything matched. Great!

I ran my functional test, and everything worked as it should. But right as I was wrapping up the test, I noticed that my TinyPilot's video settings weren't the standard defaults. Uh oh.

I shut down the device I was testing and re-ran the microSD checking script. This time, it should definitely report changes because I had changed a lot of the settings during my test. Instead, the script reported that this microSD perfectly matched our clean image. That was bad.

From tinkering with the script, I discovered that it had a bug. Even though it worked correctly on the support engineer's machine, my environment was behaving differently and causing the script to always report success.

The problem was that we expected it to be just a quick script, so we didn't put it through the same level of review or testing as our other code. But even if we had wanted to, there wasn't time because I realized too late that we needed the script.

From more inspection, it became clear that the manufacturer had misunderstood our instructions. We wanted them to have a testing microSD that they used for functional tests, and then once it passed functional testing, they were supposed to take out the test microSD and put in a fresh one for the customer. That way, the customer receives a device that has essentially never been booted or used before. The manufacturer was doing QA testing and then just .

Fortunately, that was relatively easy to repair at our office. And that matched our plan. I willingly risked issues like this with the expectations that the things that were likely to go wrong at this point would be things we could fix locally rather than shipping everything back to Vietnam.

### How could I have prevented this?

Check the BOM more rigorously.

I'm not sure what the solution is. When we were doing this in-house, we had a set of instructions in Notion, and our whole team would just follow those. For this, we don't share a Notion workspace with the contract manufacturer in Vietnam. Instead, we give them our English instructions, then they translate them to Vietnamese. They send us the Vietnamese copies, but I can't read Vietnamese.

One thing that was helpful was requesting videos of the QA process. That showed, in a language-independent way, how they're performing QA. But it's hard to get a video of the entire process end-to-end. The QA process didn't make it obvious that the microSD they were using for testing ended up staying in the final product, and I'm not sure how I'd prevent that.

They did invite me to go to Vietnam to visit the factory. I didn't want to go, but looking back, maybe that would have prevented some expensive errors. It probably would have cost about $5k to pay for one of the local team members to visit Vietnam for a few days. That's probably more expensive than the errors we'd be trying to prevent, and it's not even guaranteed to prevent errors. But it would be helpful for the business relationship to meet in person. So, it's not a "darn, I wish I'd thought of that," but more of a "who knows if that would even have been worth it?"

## Topic 2

## Topic 3

## Side projects

### Goodbye Ansible, Hello Nix

I've been exploring Nix for the past few months. I've been using Ansible for the past several years to manage my development environments, but it has a lot of pain points that are wearing on me. I've been trying to replace Ansible with Nix for the past fews months, and I think I'm finally done.

I had seen Home Manager in the past, but I didn't get the point. It manages files in my home directory? Doesn't Nix already do that?

The key things I was missing were:

- Home Manager works on any Linux or Mac system, not just NixOS.
- Home Manager is better than NixOS at managing text files.

Now, instead of managing my dev systems with Ansible, everything is Home Manager plus [project-specific Nix flakes](/notes/nix-dev-environment/). I haven't run an Ansible playbook in over a month.

One notable change is that I use and define bash aliases more regularly for common commands. My old process for adding bash aliases was to add them to my Ansible playbook, then re-run them on any system where I wanted the alias. But running Ansible playbooks on my system was so slow and prone to failure that I'd end up with half my systems knowing about an alias, and half didn't. So I'd stop using any new aliases because I didn't know where it was.

With Nix, Home Manager now manages all my bash aliases. If I want to add one, I edit `~/.config/home-manager/home.nix` and then run `home-manger switch` to apply the changes (actually, I run `hs` because I defined a bash alias for this). The whole process takes less than a minute, and it never fails due to external factors the way Ansible did.

I had been trying to make the switch from Debian + Ansible to NixOS, but I was having trouble because there are so many differences. Debian + Nix + Home Manager is a much gentler transition and lets me pull more of Nix into my workflow at my own pace.

### I'm a weird mechanical keyboard person now

In Lex Fridman's interview with Guido von Rossum, Fridman has an extended aside about how much he loves his Kinesis keyboard. So much so that he brings it with him on places to work rather than use his laptop's built in keyboard.

I've been using a Microsoft Natural Keyboard Pro of some variation since I was about 14 years old. I'd never tried a mechanical keyboard, and I've never tried a physically split keyboard.

The first day, it was a real struggle. I had a lot of paperwork to get through, and I had to put aside the keyboard

I'm pretty sure I'm going to keep it. I'm now faster on this keyboard when typing English prose, but I'm slower at programming. I haven't gotten used to where characters like `[`, `{`, and `=` are on this keyboard. I've even remapped them to make them more convenient to reach, but I'm still struggling a bit.

I've read reports from other people who say they have no trouble switching back to a regular keyboard once they got used to Kinesis, and that hasn't been my experience so far. When I switch to my Surface Pro 6, I have a lot of typos now. Maybe I'll eventually get back to being comfortable on both.

## Wrap up

### What got done?

- I switched to a mechanical keyboard.

### Lessons learned

-

### Goals for next month

- Clear TinyPilot office of all old inventory and spare parts.
