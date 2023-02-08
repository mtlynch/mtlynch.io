---
title: "My Fifth Year as a Bootstrapped Founder"
tags:
  - annual review
  - tinypilot
date: 2023-02-08T00:00:00-05:00
custom_css: true
hero_image: cover.webp
images:
  - solo-developer-year-5/og-cover.webp
description: Five years ago today, I quit my job as a developer at Google to create my own self-funded software business. This is a review of my last year and what I've learned so far about bootstrapping software businesses.
---

Five years ago, I [quit my job as a developer at Google](/why-i-quit-google/) to create my own bootstrapped software company.

For the first few years, all of my businesses flopped. None of them earned more than a few hundred dollars per month in revenue, and they all had negative profit.

Halfway through my third year, I created a network administration device called [TinyPilot](https://tinypilotkvm.com). It quickly caught on, and it's been my main focus ever since.

In 2022, TinyPilot generated $812k in revenue, a 76% increase from 2021.

In this post, I'll share what I've learned in my fifth year about being a bootstrapped founder.

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

While it sounds impressive to grow revenue by $350k, it's a little less exciting that I'm only walking away with $6k in profit. I don't pay myself a salary, so $6k is what I earned from the business. Still, I'm excited about these numbers and what they mean for 2023.

One of the major cost increases was in electrical engineering. In late 2021, I switched electrical engineering vendors, as the previous vendor was struggling to keep up with TinyPilot's workload. The new vendor is a larger agency with significantly more capacity, but they also charge three times the hourly rate as the previous vendor.

The ongoing chip shortage forced us into costly redesigns, which ballooned both our cost of electrical engineering hours and raw materials. We'd have to redesign a circuit board before we exhausted our existing supply, and that meant paying a premium to expedite everything and wasting components.

TinyPilot's profit in the fourth quarter of the year was $28.6k, which is $9.5k per month. That's a healthy profit, and I expect that to be representative of the upcoming year. The investments we made in 2022 will allow us to increase scale and reduce costs in 2023. Our electrical engineering and materials cost should drop drastically now that our manufacturing process has matured and we have a healthy inventory.

### TinyPilot got a new website

When I launched TinyPilot in 2020, I told myself the website and logo were just placeholders until I found out if there was any demand for the product. Then, things took off so quickly that I never had time to replace it.

In 2022, I finally hired a design agency to develop a new logo and redesign the website.

{{<gallery caption="Before and after the [TinyPilot website redesign](/tinypilot-redesign)">}}
{{<img src="landing-before-cropped.png" alt="Screenshot of old landing page" max-width="400px" has-border="true">}}
{{<img src="landing-after-cropped.png" alt="Screenshot of new landing page" max-width="400px" has-border="true">}}
{{</gallery>}}

I wrote previously about how [frustrating and expensive](/tinypilot-redesign) it was working with the design agency, but I'm pleased with the end result. My old website looked like a hobby project, and the new design looks like a real company.

### The TinyPilot team grew from five people to seven

At the end of 2021, the TinyPilot team was:

- Me, the sole founder
- Two software developers
- Two local staff who handle assembling devices and fulfilling orders
  - One of whom also handled customer service

At the end of 2022, we added two support engineers and adjusted responsibilities:

- Me, the sole founder
- Two software developers
- Two local staff who handle assembling devices and fulfilling orders
  - **Both now work on customer service**
- **Two support engineers**

Adding the support engineers felt like finding the missing piece of the puzzle. Before they joined, I was the only person handling technical support, and I was spending [about 20% of my time](/retrospectives/2022/02/#how-can-i-manage-tinypilot-with-only-20-hours-per-week) on support requests. Now, I spend less than 5% of my time on support requests, and customers receive faster support.

The support engineers also do things I didn't have time for like investigating complex bugs, writing documentation, and improving our diagnostic tools.

Growing the team stretched my skills as a manager. In 2021, TinyPilot's workflows were fairly simple. Almost everyone did their work as a single-person unit. The results either went directly to a customer or to me. When employees needed to coordinate with each other, it was always among people who had the same role.

Integrating support engineers meant figuring out how different teams work together. How do support requests work when they require coordination between fulfillment staff and support engineers? What's the feedback loop between the support engineers and the dev team?

### PicoShare became my fastest-growing project

One of the annoying situations I encounter in TinyPilot and my personal life is sharing files that are too large for email. I'd often want to share a 15 MB screen capture demonstrating some workflow or bug, but emailing it would eat a discourteous amount of my recipient's email storage.

All of the existing cloud storage providers like Google or Dropbox make sharing a single file needlessly complicated. They won't give you a direct link to your file &mdash; just a link to *their* web interface, where they pressure your recipient to sign up for an account. If you upload a video, Google Drive makes you wait 15+ minutes while they re-encode it, even if it was already optimized to play in the browser.

So, I made a minimalist file sharing app called [PicoShare](https://github.com/mtlynch/picoshare). You just upload a file, and it gives you a direct link that you can share. Easy! No re-encoding, no prompts to sign up for anything.

<figure class="picoshare-demo">
<img src="demo-full.gif" alt="Animated demo of uploading a video file to PicoShare and streaming it in another browser window">
<figcaption>Demo of PicoShare</figcaption>
</figure>

PicoShare become the fastest growing project I ever published. It received 600 Github stars within two weeks of release. As of this writing, PicoShare has [over 100k installs](https://hub.docker.com/r/mtlynch/picoshare/).

{{<img src="picoshare-growth.png" max-width="600px" has-border="true">}}

There are a few open-source tools that offer [similar functionality](https://github.com/awesome-selfhosted/awesome-selfhosted#file-transfer---single-click--drag-n-drop-upload), but PicoShare is unique in not requiring a database server. That means it runs in a single Docker container, whereas other solutions require more complicated orchestration. PicoShare's simple deployment has made it popular with [self-hosters](https://reddit.com/r/selfhosted/) &mdash; users who prefer accessing services on servers they maintain.

## Lessons learned

### Don't become anyone's smallest client

I made many mistakes throughout the whole [TinyPilot website redesign fiasco](/tinypilot-redesign), but the core problem was that the design agency was a fundamental mismatch for a company of TinyPilot's size.

All of the design agency's other clients were spending 5-20x as much as I was. At first, I thought that was such a gift &mdash; this fancy agency with expensive clients was betting on a little company like TinyPilot.

The reality was that TinyPilot was the agency's lowest priority. They ran the project poorly, which drove up costs and stretched out timelines painfully.

When I work with new vendors now, I ask them how my company compares to their clients. If I'm an outlier in any important dimension like size, revenue, or industry, I look elsewhere.

### Run at 50% capacity

Naively, you might think that an ideal business runs so that staff perfectly matches demand. At the end of the week, every support ticket is answered, and every order is shipped, and everyone worked exactly 40 hours.

if every person is is 100% utilized. You don't want anyone sitting idle, but you don't want to be overwhelmed, so wouldn't it be great if everyone worked their normal hours and that was the exact number of hours to fulfill sales and support requests?

In practice, that's obviously not a good system. Running at 100% utilization means you have 0 margin for error, so if someone gets sick, goes on vacation, or you see a sales spike, you're underwater.

Instead, I aim for everyone at TinyPilot to run at around 50% capacity. That is, a balance of 50% reactive work and 50% proactive work. For some roles, the balance isn't quite 50/50, but it's a good rule of thumb.

The clearest example of a 50/50 split is the the technical support team: they spend around half of their time responding to support requests and half of their time finding ways to save users from needing support. The proactive tasks include things like fixing bugs in the product, writing documentation, and improving our diagnostic tools.

Every TinyPilot team is comprised of two people, so if one person is unavailable, the other person can suspend their proactive work and handle time-sensitive tasks without feeling overwhelmed. If we get a rush because a popular YouTube channel mentions us (TODO: link), we have spare capacity to absorb the bump.

| Team                | Reactive tasks                                                                             | Proactive tasks                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Founder             | Team management<br>Vendor management<br>Reviewing work<br>Filling gaps in responsibilities | Marketing<br>Sales<br>Re-evaluating strategy<br>Hiring and training                                        |
| Support engineers   | Answering technical support questions                                                      | Writing documentation<br>Writing tutorials<br>Investigating difficult bugs                                |
| Software developers | Releasing new features<br>Fixing urgent bugs                                               | Refactoring code<br>Improving development experience<br>Creating automated tests<br>Fixing non-urgent bugs |
| Fulfillment staff   | Assembling devices<br>Fulfilling orders<br>Customer service                                | Creating customer support playbooks<br>Assisting in marketing                                              |

### Ansible and git are not software distribution tools

When I started working on TinyPilot, I didn't know how to distribute Linux software.

To publish the first prototype of TinyPilot, I used the tools that I knew: bash scripts, Ansible, and git. The bash script bootstrapped an Ansible environment and executed an Ansible playbook. Then Ansible installed dependencies, made necessary changes to the operating system, and cloned the TinyPilot git repository.

The installation was slow but reliable, and users didn't have to configure anything manually.

Two years later, TinyPilot's update process was a mess. It still relied on the same shaky foundations I used to ship the prototype, except now there was complex web of interdependncies. Ansible roles depended on Git repositories, which depended on Ansible roles, which depended on parameters in a bunch of YAML files. Minor changes could swallow a week of development time.

All this because I never bothered to learn standard Linux packaging technologies.

This year, the TinyPilot team and I learned to use Debian packages. It was much less painful than I expected. I thought we'd have to deploy all sorts of package servers and key servers, but it turns out we didn't need any of that. The process turned out to be relatively easy once we found [the right guides](/retrospectives/2022/12/#getting-out-of-the-ansible-hole).

Debian packages have helped us catch expensive mistakes earlier. And we can easily deploy code to real devices during development, whereas our previous installation system made that process prohibitively complex.

## Grading last year's goals

### Grow TinyPilot to $1M in annual revenue

- **Result**: Grew TinyPilot's revenue by 76% to $812k
- **Grade**: B

I always knew that $1M was an aggressive goal. We fell short, but I'm still impressed how close we came.

### Manage TinyPilot on 20 hours per week

- **Result**: I spent more time managing TinyPilot in 2022 than in 2021.
- **Grade**: D

I'd estimate that I work 40-50 hours per week. I wrote a little more on my blog and participated slightly more in TinyPilot's software development.

I added a new team, and people expanded their roles. It's not just the work of training a new person, it's defining how they fit into other processes. And the more people you have, the more complexity there is in designing workflows that involve multiple people and multiple teams.

### Ship the TinyPilot Voyager 3

- **Result**: We never even completed the design phase
- **Grade**: D

TinyPilot has always used the Raspberry Pi 4B as the core hardware. The 4B is relatively expensive, and it's difficult to engineer extra hardware functionality on top of it.

My plan for 2022 was to create a custom circuit board built around the minimalist Raspberry Pi Compute Module 4. That would reduce our manufacturing costs by 60% and simplify our hardware design.

Instead, all of our hardware engineering time went to chasing down manufacturing issues and supply shortages, so we made no progress on a new product.

## Goals for year six

### Manage TinyPilot on 20 hours per week

I failed miserably at reducing my hours last year, but it's now my top priority.

I'm hopeful that I'll be more successful at reducing my management time this year. Most of my management work in 2022 was growing teams that can independently manage TinyPilot's day-to-day operations. It required a lot of up front investment in hiring, training, and defining processes, but I expect that investment to pay off in 2023.

### Earn $100k in profit

In previous years, I've focused on growth. For a hardware business to work, you need to be at a certain scale. At this point, I'm at the scale where I'd feel happy maintaining this indefinitely.

For most of 2023, TinyPilot's production will be constrained by supply, so I'm going to focus on profit rather than growth.

TODO: Expand on this.

### Close the TinyPilot office

For most of the company's existence, TinyPilot's cases came from a local vendor who designed and 3D printed them. In the last few weeks, we completed the transition to metal cases.

The main reason we switched was to increase our scale &mdash; we had exhausted the print capacity of our local 3D printing partner. The side-effect I didn't anticipate is that most of our raw materials now originate in China. That means it should be possible to manufacture our entire devices at the factory in China rather than assembling and testing each device by hand in TinyPilot's office in the US.

If we don't need to build devices in our office, that eliminates our primary reason for maintaining an office. We can move fulfillment to a third-party logistics provider, and then TinyPilot's staff will no longer be in the critical path for manufacturing and fulfillment. That makes TinyPilot and its employees more time-independent and location-independent.

## Do I still love it?

Every year, when I write these blog posts, I ask myself whether I still love what I'm doing.

2022 was a hard year &mdash; certainly my hardest since going off on my own. I wasn't miserable, but I can't say I _loved_ it.

The things I enjoy doing most are programming and writing, and the past year gave me little time for either. I spent most of my time on TinyPilot scrambling to keep up with demand, filling in gaps as we grew, and putting out small fires.

I grew as a manager. I learned more about hiring and coordinating in an organization with more complexity.

I'm hopeful that this year was hard because I was doing a lot of things that will pay dividends over the next few years.

I still prefer working for myself to working for an employer, and I plan to do it indefinitely.

---

_Cover image by [Loraine Yow](https://www.lolo-ology.com/). Thanks to the [Blogging for Devs community](http://bloggingfordevs.com/) for providing early feedback for this post._

<script src="/third-party/chart.js/2.9.4/Chart.min.js"></script>
<script src="script.js"></script>
