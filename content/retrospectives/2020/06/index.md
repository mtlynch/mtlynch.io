---
title: "Is It Keto: Month 12"
date: 2020-06-01T00:00:00-04:00
description: 50k monthly visitors is more valuable than I'm giving it credit for.
images:
- /retrospectives/2020/06/cover.png
---

## Highlights

* I added 88 new programmatically-generated articles to Is It Keto.
* With 100k monthly pageviews, it's time to explore new ways of working with Is It Keto's audience.
* I created a KVM over IP device that requires <$100 in hardware.

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Add 100 new articles to Is It Keto

* **Result**: Added 88 new articles to Is It Keto
* **Grade**: B

Programmatically generating content is harder than I expected. It's easy to generate the score and nutrition data, but it's tough to templatize lots of text that fits a wide range of products.

I'm going to continue building up templates and adding new foods, but I'll explore other options for growing the site's revenues as well.

### Publish one new blog post

* **Result**: I published ["My Eight-Year Quest to Digitize 45 Videotapes."](/digitizing-1/)
* **Grade**: A

I've been working on this article in some form or another for the last two years, so I'm happy to have finally published it. I'm pleased with the result, and it's been nice hearing people say it gave them useful ideas their own digitization projects.

The post [got a good response on Reddit](https://redd.it/gqxvxb) but [failed to gain traction on Hacker News](https://news.ycombinator.com/item?id=23311096). I still think it has a chance on Hacker News, so I'll try again in a week or so.

## Stats

### [Is It Keto](https://isitketo.org)

{{<revenue-graph project="isitketo">}}

| Metric                    | April 2020  | May 2020    | Change                                      |
| ------------------------- | ----------- | ----------- | ------------------------------------------- |
| Unique Visitors           | 35,451      | 50,352      | <font color="green">+14,901 (+42%)</font>   |
| Total Pageviews           | 72,894      | 99,391      | <font color="green">+26,497 (+36%)</font>   |
| Domain Rating (Ahrefs)    | 27.0        | 27.0        | 0                                           |
| AdSense Earnings          | $92.09      | $109.92     | <font color="green">+$17.83 (+19%)</font>   |
| Amazon Affiliate Earnings | $128.39     | $111.61     | <font color="red">-$16.78 (-13%)</font>     |
| **Total Revenue**        | **$220.48** | **$221.53** | **<font color="green">+$1.05 (+0%)</font>** |

Is It Keto continued growing in visitors. It seems to have recovered to its normal level of activity pre-COVID. Worryingly, AdSense earnings failed to keep pace, and Amazon Affiliate earnings actually dropped.

Checking the stats more closely, Is It Keto generated 25% more revenue for Amazon in May than it did in April, but Amazon [slashed their affiliate payout rates](https://www.cnbc.com/2020/04/14/amazon-slashes-commission-rates-for-affiliate-program.html), substantially reducing Is It Keto's revenues.

## Doing more with Is It Keto's audience

A few weeks ago, [Justin Vincent](https://nugget.one/jv) reached out to me. He's a serial entrepreneur and founder of [The Nugget Startup Academy](https://nugget.one). He'd been enjoying my blog and wanted to know if I'd be open to a Zoom call to brainstorm ideas for monetizing Is It Keto. I agreed, and it led to several useful insights about the business.

The first thing that surprised me was how highly Justin viewed Is It Keto's visitor stats.

>**Justin**: How many uniques do you get per week?<br>
**Me**: Around ten thousand.<br>
**Justin**: Wow. You're sitting on a goldmine.<br>

Top keto recipe blogs get ~3M unique visitors per month, so my 40-50k felt like nothing. Justin argued that one of the hardest parts of launching a product is finding interested customers, but if I have access to 10,000 people each week interested in keto, that's a huge leg up.

>**Justin**: When you look at existing keto communities, what do you notice people struggling with? What issues come up a lot?<br>
>**Me**: I don't know. I feel like most of the discussion revolves around people sharing progress and other members congratulating them.<br>
>**Justin**: Congratulating each other... That's interesting. Have you seen [wip.chat](https://wip.chat/)?

{{< img src="wip.chat.png" alt="Screenshot of wip.chat" hasBorder="true" maxWidth="650px" caption="[wip.chat](https://wip.chat/), a popular social network for independent software developers" >}}

[wip.chat](https://wip.chat/) is a popular social network for indie developers. Non-members can view some of the content, but you need to be a member to post anything, and that costs $20/month. Their pitch is that the wip.chat community helps you build your product by holding you accountable to your project's milestones.

The more we talked about a wip.chat for keto, the more I liked the idea. All the social networks I've seen for keto use generic tools: Facebook groups, subreddits, Discord channels. What if there was a tool specifically for keto dieters? Over the next week, I brainstormed 25 more ideas, but the wip.chat clone remained at the top of my list.

This week, I'm going to create a landing page for this theoretical keto social network and advertise it on Is It Keto. I'll include a signup button, but when the user tries to pay, they'll see a message saying something like, "I'm still building this site, but you can sign up for this mailing list to find out when it's ready."

Another great insight that came out of the conversation was around partnerships:

>**Justin**: Once you create your membership product, you can make direct partnerships and affiliate deals with other keto businesses.<br>
**Me**: But I already have visitors. Why wouldn't I do that now?<br>
**Justin**: Good question. Why **wouldn't** you do that now?

This is why it's valuable to  have an outsider's perspective. I tried approaching other keto companies for affiliate deals early in Is It Keto's life, but I was too small, so most of them ignored me. With 100k monthly pageviews, Is It Keto is significant enough that partnerships are viable. I just forgot to revisit the idea because it had been infeasible for so long. But what's stopping me from contacting keto businesses advertising on my site via AdSense to ask if they want to set up a deal with me directly?

{{< img src="keto-advertiser.png" alt="Screenshot of wip.chat" hasBorder="true" maxWidth="400px" caption="Maybe I can just make a direct deal with this advertiser instead of working through Google AdSense." >}}

## Improving Is It Keto's browser performance

Through most of Is It Keto's life, performance has been an afterthought. Occasionally, I've fixed components that were causing noticeable slowdowns, but I rarely design for speed.

Given that Google drives 90% of the site's visitors, and [Google uses performance as a metric in ranking search results](https://developers.google.com/web/updates/2018/07/search-ads-speed), I spent a few days identifying bottlenecks on Is It Keto. I use the [Gridsome](https://gridsome.org) framework for generating Is It Keto's contents, so [this article](https://www.codegram.com/blog/improving-a-gridsome-website-performance/) helped me achieve a few performance gains.

| Change | Performance impact |
|--------|--------------------|
| Load Bootstrap-Vue components [a la carte](https://bootstrap-vue.org/docs#individual-components-and-directives) instead of importing all of Bootstrap-Vue and Bootstrap-Vue-Icons | High |
| Filter my Gridsome data [at the graphql layer](https://gridsome.org/docs/filtering-data/) rather than at the Vue layer to reduce the size of static JSON files | High |
| Undid [this hack](https://dev.to/jeremyjackson89/gridsome-g-images-with-dynamic-paths-1mgn) for loading images in Gridsome with dynamic paths | Medium |
| Import Google Fonts using a `<link rel>` tag instead of a CSS `@import` | Low |
| Tune the Google Fonts URL to download only the fonts I need | Low |
| Add [`preconnect` and `dns-prefetch` for Google Fonts](https://www.smashingmagazine.com/2019/06/optimizing-google-fonts-performance/) in the HTML `<head>` | Low |
| [Add `?display=swap`](https://fontsplugin.com/google-fonts-font-display-swap/) to my Google Fonts import URL to prevent "Flash of Invisible Text" | Low |

Everyone talks about using [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) to look for large components in your JS bundle. I felt crazy because I couldn't find any instructions on how to actually use it. All the instructions basically say:

1. `npm install webpack-bundle-analyzer`
1. ???
1. Look at the useful visualization in your browser.

But they never explain **how** you actually generate the visualization. I finally figured out that the missing step 2 is to plug webpack-bundle-analyzer into your build (varies by stack, but [here](https://www.codegram.com/blog/improving-a-gridsome-website-performance/#avoid-enormous-network-payloads-and-minimize-main-thread-work) is how to do it on Gridsome). Then the next time you build your app, you'll see a line like this:

```
Webpack Bundle Analyzer saved report to /home/user/isitketo/dist/report.html
```

And then if you open `report.html`, you'll see the visualization everyone's talking about.

## Web performance is harder than I thought

Is It Keto originally ran on App Engine under Python 2. Given my renewed focus on the site, coupled with Google's plans to [end support for Python 2](https://cloud.google.com/appengine/docs/standard/python/migrate-to-python3/), Back in April, I decided to rewrite the site. I chose [Gridsome](https://gridsome.org), a Vue-based static site generator.

It seemed like I'd get the best of both worlds: the performance of a pre-rendered website and the flexible developer experience of Vue. It turns out that web performance is a bit more complicated than I realized.

I *thought* that the browser would just render all the pre-generated HTML and then evaluate the JavaScript in the background. It turns out that browsers *really* want to evaluate JavaScript before doing anything else. Even though on Is It Keto, my `<script>` tags are at the very bottom of my HTML and they have the `defer` attribute, they still tank my performance metrics:

{{< gallery caption="If I delete the `<script>` tags on Is It Keto, its [Lighthouse score](https://developers.google.com/web/tools/lighthouse) jumps 40 points, but then the site becomes non-functional." >}}
  {{< img src="with-scripts.png" alt="Lighthouse score of 47 with scripts enabled" hasBorder="true" >}}
  {{< img src="without-scripts.png" alt="Lighthouse score of 87 with scripts deleted" hasBorder="true" >}}
{{</ gallery >}}

Vue 3, due out in the next few months, is supposed to improve performance due to [tree shaking](https://vueschool.io/articles/vuejs-tutorials/faster-web-applications-with-vue-3/). That means it will be able to reduce the size of your JavaScript payload by eliminating unused framework code. Gridsome claims that [their 1.0 release will be Vue 3 compatible](https://twitter.com/gridsome/status/1265742280805285896), but they seem so constrained by developer resources that I'm worried that it could be years before they ever get there.

## Raspberry Pi as a virtual keyboard and monitor

I've been working on a hobby project for the past few weeks that I don't think will turn into a business, but maybe there's a market for it.

My [current server](/building-a-vm-homelab/) is headless, so there's no keyboard or monitor attached. I just interact with it over SSH. The problem is that if the OS fails to load or I want to change BIOS settings, I'm stuck &mdash; I have to drag the whole server over to my desk and attach my desktop monitor and keyboard to access the server.

For my next server, I've dreamed about getting some sort of virtual console. There are enterprise solutions like [Dell's iDRAC](https://en.wikipedia.org/wiki/Dell_DRAC) and [HP's iLO](https://en.wikipedia.org/wiki/HP_Integrated_Lights-Out), but they add several hundred dollars to a server's cost. There are also [KVM over IP devices](https://smile.amazon.com/Lantronix-1PORT-Remote-Spider-SLS200USB0-01/dp/B000OH5MDO/), but they also cost $400+ and require bloated client software.

For the past few weeks, I've been trying to build the poor-man's remote console with a [Raspberry Pi 4](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/). The keyboard part works great over the network:

{{< video src="keyboard-demo_2020-05-28.mp4" caption="I got a Raspberry Pi to work as a browser-controlled keyboard" >}}

Displaying video from the target machine is trickier, but I have it working now with about 1 second of latency. Here's what that looks like:

{{< video src="kvmpi-demo.mp4" caption="I got a Raspberry Pi to work as a browser-controlled keyboard" >}}

Right now, the video appears in a separate window, but I'm working on embedding it directly in the webpage.

I'm writing a blog post that will explain everything in more detail, but if you want to peek at the source code, it's public though not fully documented yet:

* [key-mime-pi](https://github.com/mtlynch/key-mime-pi.git): Web server for forwarding keystrokes to the Raspberry Pi's virtual keyboard device.
* [ansible-role-key-mime-pi](https://github.com/mtlynch/ansible-role-key-mime-pi): An Ansible role for configuring the Pi's USB gadget functionality (so it can mimic a keyboard) and for installing the web server as a systemd service.

I'm considering selling pre-configured kits for around $180. If you'd be interested in purchasing one, visit:

* [Tiny Pilot KVM](https://tinypilotkvm.com)

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Zestful](https://zestfuldata.com)

{{<revenue-graph project="zestful">}}

| Metric             | April 2020 | May 2020  | Change                                      |
| ------------------ | ---------- | --------- | ------------------------------------------- |
| Unique Visitors    | 1,142      | 467       | <font color="red">-675 (-59%)</font>        |
| Total Pageviews    | 2,960      | 1,258     | <font color="red">-1,702 (-57%)</font>      |
| RapidAPI Earnings  | $32.19     | $6.48     | <font color="red">-$25.71 (-80%)</font>     |
| **Total Revenue** | **$32.19** | **$6.48** | **<font color="red">-$25.71 (-80%)</font>** |

For some reason, Zestful got a burst of interest in May. Three customers requested Enterprise pricing. Two of them seem like dead leads, but I might have something that works well for the third. I should know what's going to happen by the end of this week.

## Wrap up

### What got done?

* Increased the number of articles on Is It Keto by 40%.
* Improved Is It Keto's Lighthouse performance by 43 points (from 4 to 47).
* Presented a talk called ["How to be a Sort of Successful Blogger"](https://decks.mtlynch.io/show-and-tell-2020-05/#/) to my peer mentorship group.

### Lessons learned

* Pre-rendered Vue sites still pay a significant performance penalty.
* Talking to a new person about your business helps you reassess your assumptions.

### Goals for next month

* Validate ideas for a sister product to Is It Keto.
* Add 30 new articles to Is It Keto.
* Create a working Pi-based KVM over IP, controllable through the web browser.
