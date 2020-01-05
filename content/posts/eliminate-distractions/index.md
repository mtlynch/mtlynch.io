---
title: Eliminating Distractions from Social Media, Email, and StackOverflow
description: Simple techniques for managing your apps instead of allowing them to
  manage you.
tags:
- deep work
- email
- stackoverflow
- twitter
- facebook
discuss_urls:
  hacker_news: https://news.ycombinator.com/item?id=21506107
  reddit: https://redd.it/dva6b3
date: '2019-11-11'
images:
- eliminate-distractions/ideal-facebook.jpg
---
You open Gmail to write a note to your friend. Before you begin, you notice that you've received six new messages. It pains you to leave emails unopened, so you read them immediately. Two hours later, you realize that you never wrote that note to your friend.

This happened to me constantly, and it wasn't just Gmail. I'd look at my phone to check the time and find myself mindlessly checking 10 notifications. I'd open Facebook to look up someone's birthday and fall into a zombie state scrolling through my News Feed.

Instead of managing my apps, I allowed them to manage me. I developed a Pavlovian response to app notifications and was consuming their content nonstop.

This article is a collection of techniques that have helped me use email, social media, and other apps in more thoughtful, productive ways. Some are technical &mdash; tinkering with settings or installing helpful extensions. Others are adjustments to my habits and mindset that improved my relationship with social media.

## Decide what you want from social media

If you asked me to list Facebook's positive effects on my life, it would include things like:

* Hearing about my friends' major life events, such as marriages or job changes
* Seeing pictures of my friends as they raise their children
* Remembering people's birthdays

If you observed my *actual* use of Facebook, you'd notice me spending time on decidedly non-positive activities, such as:

* Engaging in heated political arguments
* Reading glamourized, envy-baiting updates from distant acquaintances
* Escaping the experience of sitting alone with my thoughts for more than three seconds at a time

{{< img src="ideal-facebook.jpg" alt="Ideal Facebook vs. Actual Facebook" maxWidth="900px" >}}

Until a few years ago, I checked Facebook 20-30 times per day. At the first hint of boredom, I'd open a new browser tab and check Facebook. During a 30-second elevator ride, I'd take my phone out and cycle through Facebook, Twitter, and reddit.

My usage patterns served all of my negative reasons for using Facebook. To nurture the positive reasons, I didn't have to check it that often. Once a day would be sufficient. Once per week would probably be fine.

The first step toward a healthy relationship with your apps is deciding what you want out of them and what you must invest to get it. You'll probably find that you can retain the essential benefits from your apps while granting them substantially less time and attention.

## Twitter

### Make Twitter's trending hashtags boring

Whenever you sign in to Twitter, it shows you a list of hashtags designed to attract your interest and send you down a rabbit hole.

{{< img src="twitter-trending.jpg" alt="Twitter settings for Trends panel" caption="Twitter shows you trending topics to seduce you into spending more time in the app." maxWidth="800px" hasBorder="True" >}}

The Trending Topics play on your natural desire to feel involved, but they're almost always garbage. The majority are some outrage that everyone will forget in a month. Otherwise, it's a stream of low-quality, reactionary responses to a newsworthy event.

You can't disable the Trending Topics panel, but you can make it boring. Configure [your Trends locale](https://twitter.com/settings/trends) to a city whose language you can't read and whose news you don't follow. Twitter now shows me trends for Abu Dhabi.

{{< img src="twitter-settings.jpg" alt="Twitter's trending topics for Abu Dhabi" caption="Adjusting location for Twitter Trending Topics." maxWidth="600px" >}}

Here's how my trends panel looks after I set it to Abu Dhabi.

{{< img src="abu-dhabi-trends.jpg" alt="Setting Twitter trends to Abu Dhabi results in mostly Arabic hashtags" caption="Twitter Trending Topics for Abu Dhabi, UAE" maxWidth="352px" >}}

The trends are mostly in Arabic, which I can't read. Even the English hashtag is specific to the United Arab Emirates.

### Mute, block, and unfollow your way to a tidy Twitter feed

I initially joined Twitter to share my blog posts and find other interesting content relevant to my work. It's not how I want to consume news or political opinions, but I started following a few comedians and celebrities for fun. Over time, negative political rhetoric and shallow outrage inundated my feed. Most of the negativity was coming from celebrity accounts, so I trimmed my follow list.

Eliminating irrelevant accounts cleared most of the low-quality content, and I eradicated the remainder by adding [muted words](https://twitter.com/settings/muted_keywords):

{{< img src="twitter-muted.jpg" alt="Twitter's trending topics" caption="Use [muted words](https://twitter.com/settings/muted_keywords) to filter out current events and topics you're uninterested in engaging with on Twitter." maxWidth="600px" >}}

Twitter evolves quickly, so this is a continuous process. When too much of my feed fills with uninteresting content, I review my follow list for accounts whose signal-to-noise ratio is poor and look for new muted words.

## StackOverflow / StackExchange

### Ignore "hot questions"

StackOverflow offers valuable solutions to many programming roadblocks. Unfortunately, they also try to steal my focus and drag me deeper into their platform. Their sidebar is teeming with distractions: "hot questions," blog posts, and job listings. The "hot questions" are especially pernicious because StackOverflow no doubt fills this panel with the questions that attract the most clicks.

{{< img src="stackoverflow-sidebars.jpg" alt="Twitter's trending topics" caption="&ldquo;Hot Questions&rdquo; on StackOverflow distract you from the problem you're trying to solve" maxWidth="800px" >}}

The "hot questions" are never relevant to the problem I came to StackOverflow to solve. But if I'm on StackOverflow, I'm frustrated with a technical problem and easily tempted by distractions.

I solve this problem with a free browser extension: [uBlock Origin](https://github.com/gorhill/uBlock). Its primary purpose is to block ads, but its lesser-known "element picker" allows you to hide any page element permanently with a few mouse clicks:

<figure>
  <video style="max-width:100%" controls>
    <source src="stackoverflow-cleaning.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Removing all sidebar distractions from StackOverflow using <a href="https://github.com/gorhill/uBlock">uBlock Origin</a></figcaption>
</figure>

This technique works on many sites, though it does occasionally break after redesigns. It's ineffective on sites like Twitter because they generate so much of their page layouts dynamically that uBlock Origin's rules become invalid on subsequent visits.

StackOverflow offers a native setting to disable "Hot Questions," though there's no option to hide the other distracting sidebar panels. To suppress "Hot Questions" through app settings, go to [Site Settings > Preferences](https://stackoverflow.com/users/preferences/) and check the box for "Hide Hot Network Questions":

{{< img src="stackoverflow-settings.jpg" alt="Screenshot of StackOverflow's settings page" caption="Click \"Hide Hot Network Questions\" in [StackOverflow settings](https://stackoverflow.com/users/preferences/) to eliminate distracting questions." maxWidth="700px" hasBorder="True" >}}

## Email

### Hide your Gmail inbox

Gmail forces you to see new messages in your inbox before you do anything else in the app. If there's information you need to find in an old email, you can't access it without risking distraction from new emails.

Fortunately, there's a tool that solves this problem: [Inbox When Ready](https://inboxwhenready.org/). It allows you to access Gmail's standard functionality but hides new messages until you explicitly choose to see them. You can still allow messages to show up in your inbox immediately when they match certain rules (e.g., mail from a particular sender or with specific keywords).

{{< img src="inbox-when-ready.jpg" alt="Gmail screenshot with Inbox When Ready enabled" caption="When an email merits a thoughtful response, I create a task for it in my [to-do list app](https://nirvanahq.com/)" maxWidth="800px" hasBorder="True" >}}

{{<notice type="info">}}
If you use a desktop mail client like Outlook or Thunderbird, disabling automatic email checking achieves the same effect as Inbox When Ready. Unfortunately, I haven't discovered an equivalent solution for mobile devices.
{{< /notice >}}

### Move your to-do list out of your inbox

At this point, "don't use your inbox as a to-do list" is cliché advice, but I'll say it anyway:

* **Don't use your inbox as a to-do list**

It's tempting to manage tasks with your email inbox because it *seems* so convenient. In reality, it's a horrendous solution:

* It grants power over your time to anyone who writes you an email.
* It makes it impossible to order your tasks by priority.
* It couples the act of reviewing your to-do list with the act of checking for new emails.

Instead, I process each email using the workflow that David Allen popularized in [*Getting Things Done*](https://amzn.to/2J3GIY1):

1. If the email doesn't require a response, I archive it.
1. If the email requires a response I can write in under two minutes, I reply immediately.
1. For all other emails, I add "Respond to [person]" to my to-do list and then archive the email.

If you currently manage tasks through your inbox, the prospect of maintaining a whole separate task list probably sounds tedious and annoying. Try it for a week.

Before extracting my to-do list from my inbox, I never realized the power those emails held over me. Any time I checked my inbox, every message was sitting there, begging for my attention. Now, when an email requires a non-urgent response, I create a task and schedule my reply for an appropriate time. It gives me the freedom to forget about the email because I know my to-do list will remind me when the time is right.

{{< img src="nirvana-tasks.jpg" alt="Chat settings in Gmail" caption="When an email merits a thoughtful response, I create a task for it in my [to-do list app](https://nirvanahq.com/)" maxWidth="785px" hasBorder="True" >}}

{{<notice type="info">}}
My to-do list app of choice is [Nirvana](https://nirvanahq.com/). It's *okay*, not great. People tell me good things about [Todoist](https://todoist.com), but I'm too accustomed to my Nirvana workflow to switch.
{{< /notice >}}

### Unbundle Hangouts from Gmail

I send all of my texts through Hangouts because it allows me to type on my desktop keyboard instead of the tiny virtual keyboard on my phone. Unfortunately, Google integrates Hangouts into my Gmail by default, creating intrusive bundling. Checking my email means seeing my texts and vice-versa.

{{< img src="hangouts-in-gmail.jpg" alt="Chat settings in Gmail" caption="By default, Gmail embeds Hangouts into your inbox." maxWidth="800px" hasBorder="True" >}}

This is an easy problem to solve. Go to the [chat settings in Gmail](https://mail.google.com/mail/u/0/#settings/chat) and select "Chat off."

{{< img src="gmail-disable-chat.jpg" alt="Chat settings in Gmail" caption="Disabling chat in [Gmail settings](https://mail.google.com/mail/u/0/#settings/chat)" maxWidth="821px" hasBorder="True" >}}

Now, Hangouts messages will not appear in your Gmail, but you can still access Hangouts through its dedicated URL: [https://hangouts.google.com](https://hangouts.google.com).

## Use social media with a dedicated browser profile

One way I've found to curb my bad habits is to put obstacles in front of them. For example, I resist the temptation to eat junk food by not keeping any of it in my house. It doesn't completely protect me from poor eating because intense cravings can always drive me to the store. But 99% of the time, laziness prevents me from making the unhealthy choice.

Free of obstacles, it's painfully easy for me to indulge in social media on my computer. I get bored, hit Ctrl+T to open a new tab, then visit Facebook, Twitter, or reddit.

{{< img src="typewriter.png" alt="Chat settings in Gmail" caption="\"Typewriter\" by [xkcd](https://xkcd.com/477/)" maxWidth="443px" >}}

To curb my social media usage, I add mildly annoying hurdles to interrupt my habits. I sign out of time-waster sites in my main browser and access them only through a separate, dedicated browser profile.

<figure>
  <video style="max-width:100%" controls>
    <source src="browser-profiles.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Setting up separate browser profiles in Chrome</figcaption>
</figure>

This seemingly minor speed bump prevents me from mindlessly popping open a new tab and visiting time-waster sites. To visit Facebook, I have to choose it consciously. It also means that when visiting Facebook for other reasons, such as finding information for a local business, Facebook can't show me personal notifications.

This is sufficient for sites like Facebook or Twitter that are near useless when you're signed out. For others, like a news site, I add its URL to uBlock Origin's filter rules. That way, any time I visit out of habit, uBlock Origin forces me to make a conscious choice about spending time on the site.

{{< img src="block-news3.jpg" alt="The browser blocks subsequent visits to uBlock Origin" caption="Blocking Google News" maxWidth="650px" >}}

Here's how to set that up:

{{< gallery caption="Using [uBlock Origin](https://github.com/gorhill/uBlock) rules to block Google News." >}}
  {{< img src="block-news1.jpg" alt="Open uBlock Origin settings" >}}
  {{< img src="block-news2.jpg" alt="Adding Google News as a blocked site in uBlock Origin" >}}
{{< /gallery >}}

## Phone

### Set your phone to "Do Not Disturb" forever

My phone has been on "Do Not Disturb" mode continuously for the last 18 months. Incoming phone calls will set off my ringer, but other than that, my phone can't interrupt my focus. I don't see notifications for emails, texts, or any other apps.

{{< img src="do-not-disturb.jpg" alt="Do Not Disturb settings in Android" caption="I permanently set my phone to Do Not Disturb." maxWidth="350px" hasBorder="True" >}}

I discovered this solution by mistake. Intending to use "Do Not Disturb" only during periods of deep focus, I'd often forget to re-enable notifications afterward. It turned out that there was no need.

My life is better without notifications. If I want to check my texts, I check my texts. There's no need to see seven apps begging for my attention every time I take out my phone.

### Replace texts with phone calls

Unfortunately, there's no equivalent of Inbox When Ready for text messages. As soon as you open your texting app, you see all texts from all of your contacts. I've never found any tools that limit when incoming texts become visible.

My solution has been to text less. As much as possible, I try to move text conversations to phone calls. Instead of maintaining an ongoing text conversation throughout the day, my girlfriend and I call each other in the evening. Catching up with a friend who lives across the country is quicker with a single phone call than 100 texts.

## Replace online communities with real-life meetups

I originally met my friend [David Toth](https://twitter.com/jupiterunknown) at an [Indie Hackers meetup](https://www.indiehackers.com/meetups) I organized in Manhattan. When he told me that he had traveled three hours from Western Massachusetts to attend, I thought he was nuts. Later, I discovered that his long trip fit into a strikingly sensible strategy.

David loves meeting other tech founders, but he only has finite time to do it. He found that his in-person interactions were almost always richer and longer-lasting than relationships he formed online, so he dedicates nearly all of his networking time to real-life events.

{{< img src="indiehackers-august.jpg" alt="Group photo of Indie Hackers meetup" caption="Photo from a recent [Indie Hackers Western Mass Meetup](https://www.meetup.com/nerdsummit/events/266162598/), which David and I now co-organize" maxWidth="650px" >}}

David's philosophy made complete sense to me. I'm still in touch with several people today after meeting them at a meetup or conference years ago for only 30 minutes. That's not true of anyone I interact with on Twitter or reddit. In my social media history, there are countless examples of me spending an hour or more to engage with someone, but now I have no memory of the conversation and am not in touch with the person at all.

{{< img src="indiehackers-feedback.jpg" alt="Chat settings in Gmail" caption="I probably spent 90+ minutes testing this user's app and giving him [feedback on Indie Hackers](https://www.indiehackers.com/product/libate/-L_2noyl2XS5xGWrIwTp?commentId=-L_QMW3ruNo_97Jevk4T). I barely remember the interaction and doubt that he remembers me." maxWidth="450px" >}}

## Schedule time for email, texts, and social media

When I first noticed myself overusing social media, I set a vague objective to use it less. And I did at first. Then, my usage would slowly creep up over time.

Scheduling explicit start and end times for different apps has been more effective. For example, I process my email and texts in three or four 30-minute blocks each day, deferring the first check until after lunch. I give Twitter, reddit, and Facebook a combined half-hour block after dinner.

This practice forces me to decide ahead of time how much real estate in my day I grant to email and social media. It also helps keep the less useful parts of social media appropriately dull. There's a 24-hour turnaround before I see responses to anything I post, so it's hard for pointless conversations to build too much momentum.

## "What's the harm in checking email and social media during idle times?"

For a long time, I thought I was managing my email and social media well. I wasn't one of those people who kept their inbox open all day or let notifications pop up on my screen every time I got a Facebook like. *Buuuut...* if a webpage was loading slowly or a two-minute automated test was running, why not check my email or Twitter instead of sitting there being, bored?

The first problem is that the scenario is a fantasy. If I check Twitter while waiting for a two-minute process to finish, it takes me at least 10 minutes to return to my original task.

The second problem is something I'd never heard of until last year: [attention residue](https://www.sciencedirect.com/science/article/abs/pii/S0749597809000399). I learned about it from the book [*Deep Work*](https://amzn.to/2NcYWqL) by Cal Newport ([my notes](/book-reports/deep-work/)). When you shift focus, there's a "residue" from the previous task that occupies your mind and decreases performance on your new activity. When you check email and then go back to your job, your mind is still processing the new emails, and it distracts you even if you're not conscious of it.

The last problem is that if you check social media any time you feel a twinge of boredom, you train your brain to expect constant stimulation. **It's okay to feel bored!** Boredom is a skill. The more you can tolerate boredom when you're doing nothing, the easier it is to rest in deep thought when you're facing a difficult challenge.

## The hardest part of changing habits is the beginning

For the last 15 years, I've checked my email within minutes of waking up. My first few days using scheduled email times felt like starving myself. I spent my mornings obsessively checking the time and counting the minutes until I could open my inbox.

After a week, I no longer felt the call of my inbox when I woke up. By the two-week mark, I almost dreaded it. My mornings had become so peaceful and productive. Once I checked my email, I was opening the door to whatever stresses awaited me there.

I've noticed a similar pattern with every tech habit I break. I'm painfully conscious of the absence for the first few days, and then it quickly becomes normal and preferable.

## If you backslide, start over

Some days, I still find myself obsessively checking texts and email. When I'm feeling frustrated or lonely, I seek comfort from email and social media. Rarely do these apps improve my mood, so my desperation for distraction grows, and the cycle repeats.

On days of weakened willpower, I resign myself to the bad day, avoid beating myself up about it, and focus on doing better the following day. Going to sleep and waking up feels like a reset, so I find it easier to return to my good habits in the morning.

## Monitor yourself to prevent apps from managing you

The techniques for eliminating distractions vary from app to app, but the underlying principles are the same:

1. Decide what you want from the app.
1. Evaluate what you must invest to earn that benefit.
1. Suppress mechanisms in the app that induce you to invest more than you intended.

Apps will continue to evolve and find new ways to grab your attention. Nobody will defend your focus except for you. The only way to conserve your limited attention is to exercise vigilance and introspection over the apps you use.

---

*"Ideal Facebook" cartoon by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*