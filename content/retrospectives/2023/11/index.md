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

- TinyPilot had its second-strongest month of revenue of all time.
- TinyPilot has almost finished transitioning manufacturing to a third-party vendor.
- I may have crossed into the dark side of mechanical keyboards.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Shift manufacturing to our contract manufacturer as quickly as possible

- **Result**: We had a minor issue with the first batch, but we should be completing the shift soon.
- **Grade**: B

We received our first production batch of devices from our contract manufacturer, and they're shipping to real customers in November.

I was hoping the batch would be perfect, and we could declare the shift complete. I was hoping the first batch would be perfect, and we could tell the manufacturer to ship directly to our warehouse for future orders. Instead, there was a minor error in the assembly process that we had to fix at our office, so we're still not yet at the point where we have a smooth pipeline from manufacturer to warehouse to customer.

### Reduce manual effort from TinyPilot's software release process

- **Result**: We eliminated a manual release task that was bound to me.
- **Grade**: A

I'm always looking for ways to automate and simplify TinyPilot's software release process, and I'm always on the lookout for ways to eliminate myself from the critical path of TinyPilot's routine workflows. In October, we made progress on both by automating how the TinyPilot website gets updated when a new version of TinyPilot Pro was available.

It used to be that I'd cut the release and then manually update the website to point to the new download URLs. Now, the website is sync'ed to our update service, so it discovers new releases automatically.

### Create a plan for better enforcement of TinyPilot Pro licenses

- **Result**: We haven't made progress on a plan.
- **Grade**: F

The dev team has had less availability than I was expecting for October, so we ended up not making progress on a plan for license enforcement.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

| Metric                   | September 2023 | October 2023     | Change                                             |
| ------------------------ | -------------- | ---------------- | -------------------------------------------------- |
| Unique Visitors          | 6,200          | 8,700            | <font color="green">+2,500 (+40%)</font>           |
| Sales Revenue            | $83,380.02     | $98,896.81       | <font color="green">+$15,516.79 (+19%)</font>      |
| Enterprise Subscriptions | $290.70        | $290.70          | 0                                                  |
| Royalties                | $2,056.30      | $2,609.84        | <font color="green">+$553.54 (+27%)</font>         |
| Total Revenue            | $85,727.02     | $101,797.35      | <font color="green">+$16,070.33 (+19%)</font>      |
| **Profit**               | **$8,163.88**  | **$40,835.41**\* | **<font color="green">+$32,671.53 (+400%)</font>** |

\* Profit is a naïve calculation based on my change in cash holdings over the month. I'll update it after I do real bookkeeping mid-month.

This was TinyPilot's second-strongest month in history, and I have no idea why. Nothing stands out in our analytics, and I'm not aware of any new reviews or mentions. We saw [strong sales in October 2022](/retrospectives/2022/11/) as well, so it could just be seasonal.

## Trying to get microSDs right with the new manufacturer

### The missing disks

TinyPilot devices store data on tiny disks called microSDs. A few days before our manufacturer was supposed to send the first sample of the TinyPilot devices, they noticed that reference devices I sent them had microSDs in them, but the devices they were producing had no microSDs. Did I want microSDs?

It turned out that they never included microSDs in the bill of materials (BOM). I never noticed that they were missing either.

Fortunately, buying and flashing microSDs is a fast and straightforward process. We already had vendor that made microSDs with the TinyPilot logo on them. We could just point our manufacturer to that vendor, and our manufacturer could flash the microSDs with TinyPilot's software.

The manufacturer and I agreed that it wasn't worth delaying the first samples for the microSDs. We decided that they'd ship the devices without microSDs, and then they'd send the microSDs a week or two later.

There ended up being [so many issues](/retrospectives/2023/10/#correcting-issues-in-the-first-article-sample) with the first sample that I forgot about the microSDs entirely, and the manufacturer never sent them.

### Checking correct microSD flashing

By mid-October, the manufacturer said they'd fixed all the issues I'd raised with the first sample. The manufacturer was going to send [a small production batch](/retrospectives/2023/10/#do-we-skip-the-second-sample) that should be totally complete and ready to ship to customers.

We were still going to perform additional QA on the first batch to make sure they matched our in-house standards. Part of our verification would be to check that the manufacturer flashed the microSDs correctly.

It wasn't until two days before the batch was scheduled to arrive that I thought - _how_ am I going to check that the manufacturer flashed the microSDs correctly?

I could boot up a TinyPilot using the manufacturer's microSD, but that's not enough. What if there's something wrong with their flashing process, and some of the files are missing or corrupt? What if their flashing system has malware on it, and it's infecting our microSDs?

I reached out to TinyPilot's support engineering team and asked them to write a shell script to compare a microSD from the manufacturer with our "golden" disk image and report any differences. They were able to create the script just in time for my testing.

When the first batch arrived, the local team did a full functional test on four of the devices, and they reported that everything looked good. I wanted to check a device as well, but I first had to check that the microSD was correct. I loaded the microSD, ran our integrity checking script, and it reported that everything matched. Great!

I ran my functional test, and everything worked as it should. I was delighted! This meant that the manufacturer had gotten this batch totally correct, so we could declare victory on our transition to an external manufacturer.

Right as I was preparing to shut down the TinyPilot and re-box it, I noticed something. The video settings weren't the defaults we set. It looked like someone had used this device before me.

I shut down the device I was testing and re-ran the microSD checking script. This time, it should definitely report changes because I had changed a lot of the settings during my test. Instead, the script reported that this microSD perfectly matched our golden image. That was bad.

From tinkering with the script, I discovered that it had a bug. Even though it worked correctly on the support engineer's machine, there was a bug that caused it to always report success in my testing environment.

From more inspection of the microSD, it became clear that the manufacturer had misunderstood our instructions. We wanted them to have microSDs specifically for testing. They were supposed to use the test microSDs for their functional tests, but once the device passed the functional tests, they were supposed to replace the microSD with one that was freshly flashed and had never been booted. The manufacturer was performing QA and then leaving that microSD in the device that they packaged for customers.

Fortunately, this mistake was relatively easy for us to correct at our office. Our local team opened each box, re-flashed the microSDs back to the correct state, re-packed them, and sent them to our warehouse.

In a way, this went according to plan. We could have prevented this by asking for a second sample instead of jumping to a production batch, but we're running low on inventory, and I reasoned that [we could likely fix small issues at our office](/retrospectives/2023/10/#do-we-skip-the-second-sample).

Long-term, we obviously don't want to re-flash every microSD in our office. When we reported this to our manufacturer, they told us that they had indeed misunderstood our instructions and revised their process to ensure that every microSD that reaches customers is freshly flashed with our image.

### How could I have prevented this?

Check the BOM more rigorously.

Track commitments more actively.

I'm not sure what the solution is. When we were doing this in-house, we had a set of instructions in Notion, and our whole team would just follow those. For this, we don't share a Notion workspace with the contract manufacturer in Vietnam. Instead, we give them our English instructions, then they translate them to Vietnamese. They send us the Vietnamese copies, but I can't read Vietnamese.

One thing that was helpful was requesting videos of the QA process. That showed, in a language-independent way, how they're performing QA. But it's hard to get a video of the entire process end-to-end. The QA process didn't make it obvious that the microSD they were using for testing ended up staying in the final product, and I'm not sure how I'd prevent that.

They did invite me to go to Vietnam to visit the factory. I didn't want to go, but looking back, maybe that would have prevented some expensive errors. It probably would have cost about $5k to pay for one of the local team members to visit Vietnam for a few days. That's probably more expensive than the errors we'd be trying to prevent, and it's not even guaranteed to prevent errors. But it would be helpful for the business relationship to meet in person. So, it's not a "darn, I wish I'd thought of that," but more of a "who knows if that would even have been worth it?"

## Creating a customer success process

My main focus for TinyPilot in 2023 has been shifting our manufacturing and fulfillment to third-party vendors. So what happens to our local team who used to do all of our assembly and fulfillment in-house?

At the start of the year, the local team's job was about 20% customer service and 80% assembly and fulfillment. That balance has shifted significantly this year, and by the start of 2024, assembly and fulfillment should be 0% of their work.

The problem is that there's not suddenly five times as many customer service requests to occupy their time. And nobody on the team wants to work for only thirty minutes per day. And we have a strong local team who's been with TinyPilot since almost the beginning, so I don't want to lose them.

As we've shifted to third-party vendors for manufacturing and fulfillment, we've also been discussing how to transition the local team's role to other tasks that fit into TinyPilot. The most natural fit seems to be shifting from reactively responding to support requests to proactively reaching out to existing customers. Some companies call this role "customer success."

The embarrassing truth is that I rarely reach out to customers. It's one of the important but non-urgent tasks (TODO: link) that I always neglect. But if I can teach the local staff to do it, I think it will help us tune our roadmap to features that our customers want, and it will help us find out about new opportunities for TinyPilot that we otherwise wouldn't discover.

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

In Lex Fridman's interview with Guido von Rossum, Fridman has an extended aside about how much he loves [his Kinesis keyboard](https://twitter.com/lexfridman/status/1206238129180549120?lang=en). He loves it so much so that he brings it with him on flights because he'd rather lug around a giant keyboard than use his laptop's built-in keyboard.

I've been using a Microsoft Natural Keyboard Pro of some variation since I was 14 years old. I'd never tried a mechanical keyboard, and I've never tried a physically split keyboard.

{{<img src="kinesis-keyboard.jpg" max-width="700px" caption="I've just switched to the Kinesis Advantage 360 keyboard.">}}

The first day, it was a real struggle. I had a lot of paperwork to get through, and I had to put aside the keyboard

I'm now faster on this keyboard when typing English prose, but I'm slower at programming. I haven't gotten used to characters like `[`, `{`, and `=` on this keyboard. I've even remapped them to make them more convenient to reach, but I'm still struggling a bit.

I've read reports from other people who say they have no trouble switching back to a regular keyboard once they got used to Kinesis, and that hasn't been my experience so far. When I switch to my Surface Pro 6, I have a lot of typos now. Maybe I'll eventually get back to being comfortable on both.

There's a 60-day return window, but at this point, I'm pretty sure I'm going to stick with the Kinesis.

## Wrap up

### What got done?

- We shipped the first batch of TinyPilot Voyager 2a devices made by our contract manufacturer.
- I switched to a mechanical keyboard.

### Lessons learned

- Track manufacturer commitments more actively.
  - This is a mistake I made before and didn't address it correctly.
  - The microSDs repeate a pattern where the manufacturer commits to doing something, I assume that they're handling it, and then we both forget, and it causes issues down the line.
  - I need to start recording their commitments and review each week what the status is in case they forget.
- Match BOMs component by component.
  - When the manufacturer sent the bill of materials months ago, I just mentally checked what I expected to see, but I missed that the microSD was missing.
  - When I go through a BOM agreement process in the future, I'll take our existing product apart, inventory all the components, and then verify that it matches the manufacturer's BOM.

### Goals for next month

- Shift manufacturing to our contract manufacturer as quickly as possible.
- Conduct five customer outreach calls.
- Clear TinyPilot office of all old inventory and spare parts.
