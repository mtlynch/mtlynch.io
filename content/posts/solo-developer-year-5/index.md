---
title: "My Fifth Year as a Bootstrapped Founder"
tags:
  - annual review
  - tinypilot
date: 2023-02-10T00:00:00-05:00
custom_css: true
hero_image: cover.webp
images:
  - solo-developer-year-5/og-cover.webp
description: Five years ago today, I quit my job as a developer at Google to create my own self-funded software business. This is a review of my last year and what I've learned so far about bootstrapping software businesses.
discuss_urls:
  reddit: https://www.reddit.com/r/programming/comments/10ytgwb/my_fifth_year_as_a_bootstrapped_founder/
  hacker_news: https://news.ycombinator.com/item?id=34740105
---

<!-- Disable linter complaints about duplicate headers -->
<!-- markdownlint-disable MD024 -->

Five years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to create my own bootstrapped software company.

For the first few years, all of my businesses flopped. None of them earned more than a few hundred dollars per month in revenue, and they all had negative profits.

Halfway through my third year, I created a device called [TinyPilot](https://tinypilotkvm.com). It allows users to control their computers remotely without installing any software. The product quickly caught on, and it's been my main focus ever since.

In 2022, TinyPilot generated $812k in revenue, a 76% increase from 2021.

In this post, I'll share what I've learned about being a bootstrapped founder from my fifth year at it.

## Previous updates

- [My First Year as a Solo Developer](/solo-developer-year-1/)
- [My Second Year as a Solo Developer](/solo-developer-year-2/)
- [My Third Year as a Solo Developer](/solo-developer-year-3/)
- [My Fourth Year as a Bootstrapped Founder](/solo-developer-year-4/)

## Highlights from the year

### TinyPilot grew annual revenue to $812k

{{<revenue-graph project="tinypilot">}}

| Income/Expense                    | 2021      | 2022      | Change           |
| --------------------------------- | --------- | --------- | ---------------- |
| Sales                             | $459,529  | $807,459  | {{<delta-cell>}} |
| Credit card rewards               | $2,241    | $4,327    | {{<delta-cell>}} |
| Raw materials                     | -$224,046 | -$333,656 | {{<delta-cell>}} |
| Payroll                           | -$142,744 | -$206,187 | {{<delta-cell>}} |
| Electrical engineering consulting | -$28,662  | -$124,643 | {{<delta-cell>}} |
| Advertising                       | -$3,873   | -$51,764  | {{<delta-cell>}} |
| Web design / branding             | -$15,931  | -$30,215  | {{<delta-cell>}} |
| Postage                           | -$24,227  | -$30,779  | {{<delta-cell>}} |
| Cloud services                    | -$5,553   | -$7,865   | {{<delta-cell>}} |
| Office space                      | -$4,400   | -$6,600   | {{<delta-cell>}} |
| Equipment                         | -$2,083   | -$5,915   | {{<delta-cell>}} |
| Everything else                   | -$4,902   | -$8,183   | {{<delta-cell>}} |
| **Net profit**                    | $5,349    | $5,979    | {{<delta-cell>}} |

While it sounds impressive to grow revenue by $350k, it's a little less exciting that I'm only walking away with $6k in profit. I don't pay myself a salary, so $6k is the full amount I earned from the business in 2022. Still, I'm excited about these numbers and what they mean for 2023.

One of the major cost increases was electrical engineering. Throughout 2021, TinyPilot's electrical engineering vendor was struggling to keep up with TinyPilot's growth. In late 2021, I switched to a new vendor that fits our needs better, but they cost three times as much.

The ongoing chip shortage forced us into frequent redesigns, which bloated costs in engineering hours and raw materials. We were often in a race to redesign a circuit board before we ran out of our existing version, so we repeatedly paid a premium to expedite the process.

We finally escaped the redesign treadmill in September. I'm hopeful that our fourth quarter results will reflect the coming year. Our profit was $28.6k for the quarter, so if we average $9.5k per month in 2023, I'll be happy.

### TinyPilot got a new website

When I launched TinyPilot in 2020, I told myself the website and logo were just placeholders. Then, things took off so quickly that I never had time to replace them.

In 2022, I finally hired a design agency to create a new logo and redesign the website.

{{<gallery caption="Before and after the [TinyPilot website redesign](/tinypilot-redesign)">}}
{{<img src="landing-before-cropped.png" alt="Screenshot of old landing page" max-width="400px" has-border="true">}}
{{<img src="landing-after-cropped.png" alt="Screenshot of new landing page" max-width="400px" has-border="true">}}
{{</gallery>}}

I wrote previously about how [frustrating and expensive](/tinypilot-redesign) it was working with the design agency, but I'm pleased with the result. My old website looked like a hobby project, and the new design looks like a real company. I suspect that at least a portion of my increased sales resulted from the new design.

### The TinyPilot team grew from six people to seven

At the end of 2021, the TinyPilot team was:

- Me, the sole founder
- Three part-time software developers
- Two part-time local staff who handle assembling devices and fulfilling orders
  - One of whom also handled customer service

By the end of 2022, we had added two support engineers and adjusted responsibilities, so the team is now:

- Me, the sole founder
- **Two** part-time software developers
- Two part-time local staff who handle assembling devices and fulfilling orders
  - **Both now work on customer service**
- **Two part-time support engineers**

Adding the support engineers felt like finding the missing piece of the puzzle. Before they joined, I was the only person handling technical support, and it occupied [about 20% of my time](/retrospectives/2022/02/#how-can-i-manage-tinypilot-with-only-20-hours-per-week). Now, I spend less than 5% of my time on support requests, and customers receive faster support.

The support engineers also do things I didn't have time for, like investigating complex bugs, writing documentation, and improving our diagnostic tools.

Growing the team stretched my skills as a manager. In 2021, TinyPilot's workflows were fairly simple. Almost everyone did their work as a single-person unit. The results either went directly to me or to a customer. When employees needed to coordinate with each other, it was always among teammates of the same role.

Integrating support engineers meant figuring out how different teams work together. How do support requests work when they require cooperation between fulfillment staff and support engineers? What's the feedback loop between the support engineers and the dev team?

### PicoShare became my fastest-growing project

One of my pet peeves in the last few years is how difficult it is to share a single file with cloud storage providers like Google Drive or Dropbox. They won't give you a direct link to your file &mdash; just a link to their web interface, where they pressure your recipient to sign up for an account. If you upload a video to Google Drive, they make you wait 15+ minutes while they re-encode it, even if it was already optimized to play in the browser.

As an alternative to the existing cloud storage options, I made a minimalist file-sharing app called [PicoShare](https://github.com/mtlynch/picoshare). You just upload a file, and it gives you a direct link that you can share. Easy! No re-encoding, no prompts to sign up for anything.

<figure class="picoshare-demo">
<img src="demo-full.gif" alt="Animated demo of uploading a video file to PicoShare and streaming it in another browser window">
<figcaption>Demo of PicoShare</figcaption>
</figure>

There are a few open-source tools that offer [similar functionality](https://github.com/awesome-selfhosted/awesome-selfhosted#file-transfer---single-click--drag-n-drop-upload), but PicoShare is unique in not requiring a database server. That means you can run it in a single Docker container, whereas other solutions require more complicated orchestration.

PicoShare became the fastest-growing open-source project I ever published. It received 600 Github stars within two weeks of its release. As of this writing, PicoShare has [over 100k installs](https://hub.docker.com/r/mtlynch/picoshare/).

{{<img src="picoshare-growth.png" max-width="600px" has-border="true">}}

## Lessons learned

### Don't become anyone's smallest client

I made many mistakes throughout the whole [TinyPilot website redesign fiasco](/tinypilot-redesign), but the core problem was that the design agency was a fundamental mismatch for TinyPilot.

The agency's other clients had 5-20x TinyPilot's budget. At first, I thought that was such a gift &mdash; this fancy agency with expensive clients was betting on a little company like mine.

The reality was that TinyPilot was the agency's lowest priority. They managed the project poorly, which drove up costs, bloated scope, and stretched out timelines.

Now, when I work with new vendors, I ask them how my company compares to their other clients. If I'm an outlier in any important dimension like size, revenue, or industry, I look elsewhere.

### Run at 50% capacity

Wouldn't it be wonderful if your business' capacity perfectly matched your customers' needs? Your employees would fulfill every order and satisfy every support request while working exactly 40 hours per week. They'd never feel overworked nor underworked, and there'd be no idle time.

In practice, that would be a terrible system. Running at 100% utilization would mean you have no margin for error. Ordinary occurences like a bump in sales or an employee taking a vacation would immediately overwhelm you.

I aim for everyone at TinyPilot to run at around 50% capacity. That is, a balance of 50% reactive work and 50% proactive work. For some roles, the balance isn't quite 50/50, but it's a good rule of thumb.

The technical support team is the clearest example of a 50/50 split: they spend half of their time responding to support requests and the other half finding ways to save users from needing support. The proactive tasks include fixing bugs in the product, writing documentation, and improving our diagnostic tools.

Every TinyPilot team comprises two people. When one person is unavailable, the other can suspend their proactive work and handle time-sensitive tasks without feeling overwhelmed. If we get a rush of orders because a popular YouTube channel [mentions us](/retrospectives/2022/12/#tinypilothttpstinypilotkvmcomrefmtlynchio-stats), we have spare capacity to absorb it.

| Team                | Reactive tasks                                                                             | Proactive tasks                                                                |
| ------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Founder             | Team management<br>Vendor management<br>Reviewing work<br>Filling gaps in responsibilities | Marketing<br>Sales<br>Re-evaluating strategy<br>Hiring and training            |
| Support engineers   | Answering technical support questions                                                      | Writing documentation<br>Writing tutorials<br>Investigating difficult bugs     |
| Software developers | Fixing urgent bugs<br>Releasing new features                                               | Improving dev experience<br>Creating automated tests<br>Fixing non-urgent bugs |
| Fulfillment staff   | Assembling devices<br>Fulfilling orders<br>Customer service                                | Creating support playbooks<br>Assisting in marketing                           |

### Ansible and git are not software distribution tools

When I started working on TinyPilot, I didn't know how to distribute Linux software.

To publish the prototype of TinyPilot, I used the tools I knew: bash scripts, Ansible, and git. The [bash script](https://github.com/tiny-pilot/tinypilot/blob/2a97cf02bd6e032a2fc60846d7d2c60be92c7c74/quick-install) bootstrapped an Ansible environment and executed an Ansible playbook. Ansible installed dependencies, made necessary changes to the operating system, and cloned the TinyPilot git repository.

The installation process was okay, not great. It was slow but reliable and didn't require the user to configure anything manually.

Two years later, TinyPilot's update process was a mess. It still relied on the same shaky foundations from the prototype, except now there was a complex web of interdependencies. Ansible roles depended on Git repositories, which depended on other Ansible roles, which depended on parameters in a bunch of YAML files. Minor changes swallowed weeks of development time.

All this because I never bothered to learn standard Linux packaging tools.

This year, the TinyPilot team learned to use Debian packages. It was far less painful than I'd feared. I thought we'd have to deploy all sorts of package servers and key servers, but it turns out we didn't need any of that. The process was relatively easy once we found [the right guides](/retrospectives/2022/12/#getting-out-of-the-ansible-hole).

Debian packages have accelerated our development. The tooling catches expensive mistakes earlier, and we can deploy pre-release versions to our test devices easily, whereas our previous installation system made that process prohibitively complex.

## Grading last year's goals

Last year, I set [three high-level goals](/solo-developer-year-4/#goals-for-year-four) that I wanted to achieve during the year. Here's how I did against those goals:

### Grow TinyPilot to $1M in annual revenue

- **Result**: Grew TinyPilot's revenue by 76% to $812k
- **Grade**: B

I always knew that $1M was an aggressive goal. We fell short, but I'm still impressed at how close we came.

### Manage TinyPilot on 20 hours per week

- **Result**: I spent more time managing TinyPilot in 2022 than in 2021.
- **Grade**: D

I was hoping to automate and delegate away enough of my job to reduce my management time to 20 hours per week, but it didn't happen. Between growing sales, spinning up the support engineering team, and putting out fires due to the chip shortage, my management time increased.

### Ship TinyPilot Voyager 3

- **Result**: We never even completed the design phase
- **Grade**: F

TinyPilot has always used the Raspberry Pi 4B as the core hardware. There's a wonderful ecosystem around the Pi 4B, but the hardware is relatively expensive and difficult to integrate with custom chips.

My plan for 2022 was to create a custom circuit board for the slimmer, less expensive Raspberry Pi Compute Module 4. That could cut our manufacturing costs by up to 60% and simplify our hardware design.

Instead, all of our hardware engineering time went to chasing down manufacturing issues and supply shortages, so we made no progress on a new product.

## Goals for year six

### Manage TinyPilot on 20 hours per week

I failed miserably at reducing my hours last year, but it's now my top priority. I'm hopeful about my chances this year. A lot of my 2022 work laid the groundwork to remove me from the critical path in 2023.

### Earn $100k in profit

For TinyPilot's first two and a half years, I focused on growth. I pay the same in hardware and software engineering costs whether I'm selling 20 devices per month or 2,000, so I needed to reach a certain scale to make the business viable.

For most of 2023, TinyPilot's production will be [constrained by supply](/retrospectives/2023/01/#losing-450k-in-a-single-email). It was disappointing to find out I'd have no chance at growing sales, but the silver lining is that I can slow down and focus on profit rather than growth.

TinyPilot has always roughly broken even, but I think I can reach $100k in profit this year if I avoid further hardware redesigns. Without the hardware redesigns in 2022, I would have saved around $100k on engineering and $20k on materials. If I keep sales steady and run leaner on the hardware side, 2023 should be a profitable year.

### Close the TinyPilot office

I've leased an office for TinyPilot [since early 2021](/retrospectives/2021/05/#tinypilots-new-office-the-fun-stuff). We use it for assembling devices, fulfilling orders, and storing inventory.

Having our own local office has helped us adapt quickly to changes in our hardware and processes, but it's a lot of extra overhead. This year, I hope to transition assembly to China, where all of our parts originate. I'm also in the process of moving our fulfillment to a third-party logistics warehouse.

Eliminating the TinyPilot office would spare us the work of maintaining a physical space, managing inventory, and tracking in-person shifts. Outsourcing manufacturing and fulfillment will also give the team more flexibility in time and location.

## Do I still love it?

Every year, when I write these blog posts, I ask myself whether I still love what I'm doing.

2022 was a hard year &mdash; certainly my hardest since going off on my own. I wasn't miserable, but I can't say I _loved_ it.

The global chip shortage meant we could never manufacture a batch of products the same way twice. There was always some missing component or manufacturing issue, so we were constantly racing to fix issues and adapt our processes before we ran out of stock. We got through it, and there were only a handful of days that I had to mark any product as sold out, but it was stressful.

That said, there were certainly many things to appreciate about the year. I had a relatively small amount of time for writing and software development, but I'm proud of what I produced. Expanding the TinyPilot organization and figuring out how teams work together grew my skills as a manager. It's been gratifying to see the team grow in their roles and expand their skills as the company evolves.

I still prefer working for myself to having an employer. I still feel grateful for the freedom to have my own company. And I still want to do it forever.

---

_Cover image by [Loraine Yow](https://www.lolo-ology.com/). Thanks to my lovely fiancé and the [Blogging for Devs community](http://bloggingfordevs.com/) for providing early feedback on this post._

<script src="/third-party/chart.js/2.9.4/Chart.min.js"></script>
<script src="script.js"></script>
