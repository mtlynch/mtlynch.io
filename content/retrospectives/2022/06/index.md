---
title: "TinyPilot: Month 23"
date: 2022-06-06T00:00:00-04:00
description: TODO - One-line summary
---

## Highlights

- The TinyPilot website redesign is finally done!

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Publish a blog post and video about building a homelab NAS server with TinyPilot

- **Result**: [Published the post](/budget-nas/)
- **Grade**: A

This was my first blog post in over a year that wasn't a retrospective or year-end review. It got a so-so reception on reddit, but it made to [#2 on Hacker News](https://news.ycombinator.com/item?id=31548829).

The post led many visitors to TinyPilot's website, bringing the monthly unique visitors to 14k. That's twice its typical monthly visitors and 30% higher than its previous monthly record. This helps me feel justified in all the time I spent writing the post.

### Complete the TinyPilot website redesign

- **Result**: It's finally done!
- **Grade**: A

The redesign is finally complete. I've been expecting to wrap up on this project every month for the past four months, but then something always gets delayed or balloons up to take more time, but now it's officially complete.

### Hire a marketing agency or freelancer

- **Result**: Still searching
- **Grade**: D

I found an agency that seemed like a potential match, but I felt a little iffy about them. We agreed on pricing for a three-month contract, but then after I agreed, they asked to change it to a five-month minimum. That was a big red flag, but I was still open to working something out with them.

As we continued discussions, it seemed like we just weren't on the same page, so I ended negotiations. In the meantime, my electrical engineering partner firm recommended a freelancer who has done good work for them, so I'm now speaking with him.

## [TinyPilot](https://tinypilotkvm.com/?ref=mtlynch.io) stats

{{<revenue-graph project="tinypilot">}}

## The TinyPilot website redesign

Oh, boy. The redesign.

What to say?

When I interviewed designers and agencies at the start of this project, I told them I was looking to spend $8-15k on a project that would last a couple of months. I said that I most certainly didn't want this to be the kind of thing where I have to spend six months and $40k before measuring whether the changes have any real impact on sales.

In the end, the project took eight months and cost $46k. I fell into the exact outcome I set out to avoid.

But let's take a look at the results. The redesign was to re-do the logo, color scheme, and fonts, and then to redesign the three pages involved in the checkout flow: landing page, product page, and shopping cart page.

{{<gallery caption="Before and after of landing page redesign">}}
{{<img src="landing-before.png" alt="Photo of NAS server parts in retail packaging" maxWidth="300px" hasBorder="true">}}
{{<img src="landing-after.png" alt="Photo of completed server build" maxWidth="260px" hasBorder="true">}}
{{</gallery>}}

{{<gallery caption="Before and after of product page redesign">}}
{{<img src="product-before.png" alt="Photo of NAS server parts in retail packaging" maxWidth="300px" hasBorder="true">}}
{{<img src="product-after.png" alt="Photo of completed server build" maxWidth="220px" hasBorder="true">}}
{{</gallery>}}

{{<gallery caption="Before and after of shopping cart page redesign">}}
{{<img src="cart-before.png" alt="Photo of NAS server parts in retail packaging" maxWidth="400px" hasBorder="true">}}
{{<img src="cart-after.png" alt="Photo of completed server build" maxWidth="340px" hasBorder="true">}}
{{</gallery>}}

Money aside, I'm happy with the results. I think the new logo and images make the project look substantially more professional.

If I had to do it over, I wouldn't have paid $46k and sunk all that time into the redesign, but now I can at least enjoy the results and take it as an expensive lesson.

## Debian packages are easy

One of TinyPilot's odd design features is that we install and update it using [Ansible](https://www.ansible.com/), a tool that's designed for devops engineers to provision systems at scale. That was what I used to provision my Raspberry Pi with the first prototype of TinyPilot, and that flow worked, so we just stuck with it.

I knew that there were better solutions for installing software on Linux, but I didn't have experience with any of them. And I feared trying to use them with TinyPilot, which has unusual requirements for configuring the underlying OS to take advantage of the Pi's hardware features. So we continued using Ansible, as it worked and wasn't causing any problems except that it was fairly slow, with installs and updates taking a few minutes.

Two years in, we're pushing the limits of Ansible. Our install process is getting too complex, and Ansible is increasingly the wrong tool for our needs.

I'd considered Debian packages (e.g., `apt-get install`) in the past, but they always seemed scary. I knew creating the package required confusing tools, and then there were repository servers involved somehow. There were keypairs and a package signing process. It seemed like it would be a huge effort to just get the basics in place and then an incredible pain to make it do what we need.

As an experiment, I tried building a Debian package. It turns out, it's easy! Debian packages are just tarballs with a particular folder structure and a few special files. I made my first working `.deb` package in about an hour.

And all the parts about setting up repository servers and key pairs? That's optional. You can just distribute the `.deb` package files directly without ever needing a repository.

Better still, we don't have to switch from Ansible to Debian packages in one giant move. We can incrementally move logic from Ansible to Debian packages at our own pace.

Our first Debian package is for Janus, the open-source WebRTC server. It reduced the install time on a Raspberry Pi from 30 minutes to a few seconds. And even though we need 32-bit ARM binaries, we can build them on x64 cloud servers using Docker's QEMU integration. All of our code for compiling and packaging the code [is open-source](https://github.com/tiny-pilot/janus-debian), if you're interested in taking a peek.

If you're interested in building your own Debian packages, here are the resources we found helpful:

- [Creating and hosting your own deb packages and apt repo](https://earthly.dev/blog/creating-and-hosting-your-own-deb-packages-and-apt-repo/)
- [Building binary deb packages: a practical guide](https://www.internalpointers.com/post/build-binary-deb-package-practical-guide)
- [Debian New Maintainers' Guide](https://www.debian.org/doc/manuals/maint-guide/)
- [Official Debian Documentation](https://help.ubuntu.com/community/Repositories/Personal)
- [Basic Overview of the debian/ Directory](https://packaging.ubuntu.com/html/debian-dir-overview.html)

## Search ads are levelling off

When I last calculated it, Google search ads looked amazing. I calculated that I was making $0.69 in profit for every dollar I spent on Google Ads.

With more data, it's less exciting. When I ran the numbers last month, I was including April and the first week of May. The first 10 days of May were my most successful ad days, so if we look at it by month, it's not as good:

| Metric                     | April     | May       |
| -------------------------- | --------- | --------- |
| Ad spend                   | $804.12   | $4,283.71 |
| Impressions                | 5,270     | 239,498   |
| Clicks                     | 351       | 3,327     |
| Click through rate (CTR)   | 6.6%      | 1.4%      |
| Cost per click (CPC)       | $2.29     | $1.29     |
| Revenue from conversions   | $1,314.91 | $7,649.60 |
| Revenue on ad spend (ROAS) | 1.63      | 1.79      |

About 30% of my revenue goes to hardware and labor costs, so a ROAS at 1.43 or higher is profitable for me. At 1.79, I'm still making about $0.25 for every dollar I spend on ads, so I'll keep it going.

## Side projects

### [PicoShare](http://pico.rocks/)

PicoShare is the open-source tool I [released in March ](/retrospectives/2022/04/#picosharehttpsdemopicorocks). It makes it easy to share files that are too big for email.

In May, I added support for editing a file's metadata after you upload it. Originally, the had the chance to add a note and choose an expiration time for a file at the time you uploaded it, and those decisions were final. Now, PicoShare is more flexible and allows you to change these details at any time:

{{<img src="ps-edit-file.png" alt="TODO" hasBorder="true" caption="In May, I added support in PicoShare for editing file metadata.">}}

After I added the edit screen, I realized it was a good opportunity to make the process of deleting files more error-proof. Before, if you clicked the delete button in the file listing, the file was gone. No confirmation, no undo, no takebacks.

Now, deleting a file requires you to first visit the edit screen, click delete, then approve the confirmation.

{{<img src="ps-confirm-delete.png" alt="TODO" hasBorder="true" caption="I added a confirmation dialog to reduce accidental file deletes.">}}

### [WanderJest](https://wanderjest.com)

Prior to the pandemic, I was [trying to build WanderJest](/retrospectives/2020/04/#putting-wanderjest-on-hold), a business that would help fans find live comedy near them. I [put the site on hold](/retrospectives/2020/04/#putting-wanderjest-on-hold) due to the pandemic and ended up launching TinyPilot instead, but I've kept tending to WanderJest on weekends and evenings.

One of the things that struck me in developing PicoShare is how much faster I can add features. I think the tech stack has a lot to do with it:

|            | PicoShare           | WanderJest |
| ---------- | ------------------- | ---------- |
| Backend    | Go                  | Go         |
| Frontend   | Go + HTML5          | Vue 2      |
| Data Store | SQLite + Litestream | Firestore  |

Firestore slows me down a lot because I find it very difficult to make schema changes. The only way I know how to do it is to write custom migration code and deploy it to the production server. With SQLite, I can just download the production database, tinker with it, and then push it out to the server.

And writing a frontend in Go is easier than I expected. The initial experience isn't as nice as Vue. I'd love conditional rendering or reactive properties, and you just don't get that in vanilla JS. But the advantage is that I can throw away almost all of the code for

With Vue on the frontend, my process for rendering data on the page was:

1. Retrieve the data from the datastore.
1. Derive a copy of the data with only the properties we want to share with the frontend.
1. Serialize all the fields to JSON.
1. Write a controller for the frontend that retrieves the data from the backend.
1. Populate page elements based on data we retrieved from the server.

When you render the frontend in Go, you can skip steps 2-4. You don't have to worry about exposing too much information to the client because you're only exposing what you render.

Started reimplementing in pure Go and SQLite.

## Wrap up

### What got done?

- Completed TinyPilot website redesign.
- Published [a new TinyPilot release](https://tinypilotkvm.com/blog/whats-new-in-2022-05).

### Lessons learned

-

### Goals for next month

-
