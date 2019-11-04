---
title: "Tricks for Reducing Distractions from Social Media, Email, and StackOverflow"
---
You open Gmail to send your friend an email. Before composing the email, you notice that you've received six new messages. It pains you to leave emails unopened, so you quickly read all the emails. Two hours later, you realize that you forgot to ever write that email to your friend.

I used to experience this constantly with minor variations for each of my apps. I'd check my phone for the time and realize I had 10 notifications. I'd open Facebook to look up someone's birthday and fall into a zombie state of mindlessly scrolling through my Newsfeed.

Instead of managing our apps, we allow them to manage us. We have a Pavlovian response to app notifications, and we've learned to mindlessly consume their content. It doesn't have to be that way.

This article is a collection of techniques that have helped me use email and social media in more thoughtful, productive ways. Some are technical - tinkering with settings or installing helpful extensions. Others are adjustments to your personal habits and mindset to improve your relationship with social media.

## Decide what you want from social media

If you asked me to sit down and write down what aspects of Facebook I find fulfilling, it would include things like:

* Hearing about my friends' big life events, such as marriages or job changes
* Seeing pictures of my friends as they raise their children
* Remembering people's birthdays

If you observed my *actual* use of Facebook, you'd notice me spending time on aspects of it that were not so fulfulling, like:

* Engaging in heated political arguments
* Reading glamourized, envy-baiting updates from distant acquaintances
* Escaping the experience of sitting alone with my thoughts for more than three seconds at a time

{% include image.html file="ideal-facebook.jpg" alt="Ideal Facebook vs. Actual Facebook" max_width="900px" img_link=true %}

Until a few years ago, I checked Facebook 20-30 times per day. Any time I was bored, I'd open a new browser tab and check Facebook. If I had a 30-second elevator ride, I'd take out my phone and cycle through Facebook, Twitter, and reddit.

My usage patterns served all of my Bad Reasons for using Facebook. To satisfy my Good Reasons for using social media, I didn't have to check it nearly as often as I was. Once a day would be sufficient. Once per week would probably be fine.

The first step toward a healthy relationship with your apps is deciding what you want out of them and what you have to invest to get it. You'll probably find that you can retain the important benefits from your apps while investing substantially less time and attention.

## Schedule time for email, texts, and social media

If you've taken some time to reflect on what you want from social media, hopefully your conclusion is not, "Email and social media are my taskmasters, so I must check in with them every 15 minutes to retrieve my next assignment." No, once you decide what you want from those tools and how much time you need to invest to get that benefit, schedule it.

The first day I tried scheduling my social media time, I felt a desperate craving all day to check Facebook. By 7pm, I felt like I'd been fasting all day and was about to eat an entire birthday cake. Finally, I opened Facebook, and... nothing. After scrolling through my feed for two or three minutes, I couldn't believe how boring it all was. I was so used to the habit of checking my feed that I never realized my satisfaction came from the ritual itself rather than anything fascinating about Facebook.

Once I realized that social media isn't as exciting as it seemed in my head, it became much easier to resist its temptations. My current habit is to check social media once per day right after dinner. I limit myself to half an hour combined for Reddit, Twitter, and Facebook.

## "What's the harm in checking email and social media during idle times?"

For a long time, I thought I was managing my email and social media well. I wasn't one of those people that kept their inbox open all day or let notifications pop up on my screen every time I got a new email or Facebook like. But, when I was waiting for a slow webpage to load or a two-minute test to complete, why not check my email or Twitter instead of sitting there being, bored?

The first problem is that the scenario is a fantasy. If I checked Twitter while I waited for a two-minute process to finish, it would take me at least 15 minutes to return to my original task.

The second problem is something I'd never heard of until last year: [attention residue](https://www.sciencedirect.com/science/article/abs/pii/S0749597809000399). I learned about it in [*Deep Work*](https://amzn.to/2NcYWqL) by Cal Newport ([my notes](/book-reports/deep-work/)). When you shift focus, there's a "residue" from the previous task that occupies your mind and decreases performance on your new activity. When you check email and then go back to your job, your mind is still processing the emails you read, and it distracts you even if you're not conscious of it.

The last problem is that if you check social media any time you feel a twinge of boredom, you train your brain to expect constant stimulation. **It's okay to be bored!** Boredom is a skill. The more you can tolerate boredom when you're doing nothing, the easier it is to rest in deep thought when you're facing a difficult challenge.

## Twitter

### Make Twitter's trending hashtags boring

Whenever you sign in to Twitter, it shows you hashtags that are likely to attract your interest and send you down a rabbit hole.

{% include image.html file="twitter-trending.jpg" alt="Twitter settings for Trends panel" max_width="800px" img_link=true class="img-border" fig_caption="Twitter shows you trending topics to seduce you into spending more time in the app." %}

The Trending Topics play on your natural desire to feel involved, but they're almost always garbage. The majority are some outrage that everyone will forget in a month. Otherwise, it's just a stream of low-quality, reactionary responses to a newsworthy event.

You can't disable the Trending Topics panel, but you can make it boring. Configure [your Trends locale](https://twitter.com/settings/trends) to a location with a language language you can't read and whose news you don't follow. Mine is set to Abu Dhabi.

{% include image.html file="twitter-settings.jpg" alt="Twitter's trending topics for Abu Dhabi" max_width="600px" img_link=true fig_caption="Adjusting location for Twitter Trending Topics." %}

Here's how my trends panel looks after I set it to Abu Dhabi.

{% include image.html file="abu-dhabi-trends.jpg" alt="Setting Twitter trends to Abu Dhabi results in mostly Arabic hashtags" max_width="352px" img_link=true fig_caption="Twitter Trending Topics for Abu Dhabi, UAE" %}

The trends are mostly in Arabic, which I can can't read. Even the English hashtag is specific to the United Arab Emirates.

### Mute, block, and unfollow your way to a tidy Twitter feed

I initially joined Twitter to share my blog posts and find other interesting content relevant to my work. For fun, I added comedians and celebrities because their tweets were often entertaining. Over time, my Twitter filled with negative political rhetoric and shallow outrage. Most of the negativity was coming from celebrity accounts, so I trimmed down my follow list.

This got me partway there, and I realized I could clear most of the remaining low-quality content by adding [muted words](https://twitter.com/settings/muted_keywords):

{% assign fig_caption = "Use [muted words](https://twitter.com/settings/muted_keywords) to filter out current events and topics you're uninterested in engaging with on Twitter." | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="twitter-muted.jpg" alt="Twitter's trending topics" max_width="600px" img_link=true fig_caption=fig_caption %}

You'll notice that this hides prominent politicians and current events topics. I think the news is important, but Twitter is not an effective way for me to consume it.

Twitter evolves quickly, so this is a continuous process. When too much of my feed fills with uninteresting content, I review my follow list for accounts whose signal-to-noise ratio is poor, and I look for new muted words that can help me curate my feed.

## StackOverflow / StackExchange

### Ignore "hot questions"

StackOverflow often offers me valuable answers to software development roadblocks. The company unfortunately plays games to steal my focus and drag me deeper into their platform. Their sidebar is filled with distractions: "hot questions," blog posts, and job listings. The "hot questions" are especially pernicious because they're no doubt just displaying the questions most likely to attract clicks.

The "hot questions" are never relevant to the problem I came to StackOverflow to solve, but if I'm on StackOverflow, chances are that I'm frustrated with a technical problem and easily tempted by distractions.

A free browser extension mitigates this problem for me: [uBlock Origin](https://github.com/gorhill/uBlock). Its primary purpose is to block ads, but its lesser-known "element picker" feature allows you to hide any page element permanently with a few mouse clicks:

<figure>
  <video style="max-width:100%" controls>
    <source src="/files/eliminate-distractions/stackoverflow-cleaning.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Removing all sidebar distractions from StackOverflow using uBlock Origin</figcaption>
</figure>

This technique works on many sites, though it does break occasionally when sites adjust their design. It fails on sites like Twitter that generate so much of their UI dynamically that uBlock Origin's selectors become ineffective on subsequent visits.

StackOverflow offers a native settings to disable "Hot Questions," though there's no option to hide the other distracting sidebar panels. To suppress "Hot Questions", go to [Site Settings > Preferences](https://stackoverflow.com/users/preferences/) and check the box for "Hide Hot Network Questions":

{% assign fig_caption = 'Click "Hide Hot Network Questions" in [StackOverflow settings](https://stackoverflow.com/users/preferences/) to eliminate distracting questions.' | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="stackoverflow-settings.jpg" alt="Screenshot of StackOverflow's settings page" max_width="700px" img_link=true class="img-border" fig_caption=fig_caption %}

## Email

### Hide your Gmail inbox

When I first started limiting my email checking, I often struggled with the fact that my email contained lots of useful information I needed. For example, I'd be trying to remember how to install some software package, remember that I emailed someone four months ago explaining how to do it, so I'd check my email archive to find it. But the problem with Gmail is that on the way to searching your mail archive, you have to see your inbox. I wanted a way to make it so that I could still search for old information in my archives without seeing anything new.

Fortunately, there's a tool for that exact purpose: [Inbox When Ready](https://inboxwhenready.org/).

{% assign fig_caption = "When an email merits a thoughtful response, I create a task for it in my [to-do list app](https://nirvanahq.com/)" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="inbox-when-ready.jpg" alt="Gmail screenshot with Inbox When Ready enabled" max_width="800px" img_link=true class="img-border" fig_caption=fig_caption %}

The tool is flexible, so you can allow messages to show up in your inbox immediately when they match certain rules (e.g., mail from a particular sender or with a specific keyword in the subject). You can also configure it to limit the number of checks or the total time you spend in your inbox each day.

Inbox When Ready works great on my desktop, but I haven't found a similar solution for my phone. I don't have to check my mail archive so much when I'm away from my desktop, but there are situations like event tickets in my mail history that require me to pull up the Gmail mobile app, which unhelpfully shows me my new emails on the way.

If you use a desktop mail client like Outlook or Thunderbird, you can achieve the same effect as Inbox When Ready by disabling your client's automatic e-mail checking.

### Move your to-do list out of your inbox

At this point, "don't use your inbox as a to-do list" is pretty cliché advice, but I'll say it anyway:

* **Don't use your inbox as a to-do list**

It's tempting to manage tasks with your email inbox because it *seems* so convenient, but it's a horrendous solution:

* It grants power over your time to anyone who writes you an email.
* It makes it impossible to order your tasks by priority.
* It couples the act of reviewing your to-do list with the act of processing new emails.

Instead, I process each email using the following workflow that David Allen popularized in [*Getting Things Done*](https://amzn.to/2J3GIY1):

1. If the email does not require a reply, I archive it
1. If the email requires a reply I can write in under two minutes, I reply immediately.
1. For all other emails, I add "Respond to [person]" to my to-do list and then archive the email.

If you're in the habit of using your inbox to manage tasks, the prospect of managing a whole separate task list sounds tedious and annoying. Just try it for a week.

Before I did it, I didn't realize the hold that emails had on me by sitting in my inbox. Any time I checked my inbox, it was sitting there begging for my attention. Now, when I receive an email that doesn't require an immediate response, I just create a task and schedule it for when I have time to reply. It gives me the freedom to forget about the email because I know my to-do list will remind me about it later.

{% assign fig_caption = "When an email merits a thoughtful response, I create a task for it in my [to-do list app](https://nirvanahq.com/)" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="nirvana-tasks.jpg" alt="Chat settings in Gmail" max_width="785px" img_link=true class="img-border" fig_caption=fig_caption %}

My to-do list app of choice is [Nirvana](https://nirvanahq.com/). I think it's okay not great. I've heard good things about [Todoist](https://todoist.com), but I'm too accustomed to my Nirvana workflow to switch.

### Unbundle Hangouts from Gmail

I use Hangouts to manage my SMS because I hate typing on my phone when there's usually a full-size keyboard right in front of me. Unfortunately, Google integrates Hangouts into my Gmail inbox by default. This creates intrusive bundling, as opening my Gmail forces me to see my Hangouts messages and vice-versa.

{% include image.html file="hangouts-in-gmail.jpg" alt="Chat settings in Gmail" max_width="800px" img_link=true class="img-border" fig_caption="By default, Gmail embeds Hangouts into your inbox." %}

Fortunately, this is a pretty easy one to solve. Go to the [chat settings in Gmail](https://mail.google.com/mail/u/0/#settings/chat), and just select "Chat off."

{% assign fig_caption = "Disabling chat in [Gmail settings](https://mail.google.com/mail/u/0/#settings/chat)" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="gmail-disable-chat.jpg" alt="Chat settings in Gmail" max_width="821px" img_link=true class="img-border" fig_caption=fig_caption %}

You can still access Hangouts on a dedicated URL: [https://hangouts.google.com](https://hangouts.google.com).

## Use social media with a dedicated browser profile

One way I've found to curb my bad habits is to put obstacles in front of them. For example, if I keep lots of junk food in the house, I'll eat it when I get the craving. I'll sometimes crave it badly enough that I'll drive to the store and buy it, but 99% of the time, I decide I'd rather just eat something less exciting that's already in my house.

I do the same thing with my social media. It's too easy to get bored, hit Ctrl+T to open a new tab, then go to Facebook / Twitter / Reddit.

{% assign fig_caption = '"Typewriter" by [xkcd](https://xkcd.com/477/)' | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="typewriter.png" alt="Chat settings in Gmail" max_width="443px" img_link=true fig_caption=fig_caption %}

Instead, I block social media in my main browser and create a dedicated browser profile for it.

<figure>
  <video style="max-width:100%" controls>
    <source src="/files/eliminate-distractions/browser-profiles.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Setting up separate browser profiles in Chrome</figcaption>
</figure>

It makes it hard to mindlessly pop open a new tab and visit a time-waster site. To visit Facebook, you have to consciously think about it. It also means that if you visit Facebook unintentionally, like a business' main web presence is their Facebook page, you can get the relevant information without seeing your tantalizing Facebook notifications in the corner. Then, I sign out of the social media sites on my main browser and delete the cookies for those sites.

This is sufficient for sites like Facebook or Twitter that are near useless when you're not signed in. For others, like news sites, I add it to uBlock Origin's filter rules. That way, any time I visit out of habit, I'm reminded that I need to visit it in my other browser profile.

{% include image.html file="block-news3.jpg" alt="The browser blocks subsequent visits to uBlock Origin" img_link="true" max_width="650px" fig_caption="Blocking Google News" %}

Here's how to set that up:

<figure class="half">
  {% include image.html file="block-news1.jpg" alt="Open uBlock Origin settings" img_link="true" media_rendition="half" %}
  {% include image.html file="block-news2.jpg" alt="Adding Google News as a blocked site in uBlock Origin" img_link="true" media_rendition="half" %}
  <figcaption>Using <a href="https://github.com/gorhill/uBlock">uBlock Origin</a> rules to block Google News.</figcaption>
</figure>

## Phone

### Set your phone to "Do Not Disturb" forever

My phone has been continuously on "Do Not Disturb" mode for the last 18 months. Incoming phone calls will set off my ringer, but other than that, my phone can't interrupt my focus. I don't see notifications for emails, texts, or from any other apps. I read messages when I choose to open them.

{% include image.html file="do-not-disturb.jpg" alt="Do Not Disturb settings in Android" max_width="350px" class="img-border" img_link=true fig_caption="I permanently set my phone to Do Not Disturb." %}

I discovered this solution by mistake. I initially downloaded an app that claimed to toggle Do Not Disturb based on whether my phone was facing up or down. The app didn't work and it instead always put my phone into Do Not Disturb. Then, I realized that was actually better. If I wanted to check my texts, I just checked my texts.

There's lots of things that I'd like to do on my phone without getting dragged into some app. I often look at my phone just to check the time, but if I see that I have new texts, it tempts me to check them. With Do Not Disturb, I just don't see anything until I open the app I'm interested in.

### Replace texts with phone calls

Unfortunately, there's no equivalent of Inbox When Ready for text messages. As soon as you open your texting app, you see all texts from all of your contacts. I've never seen any apps or tools that allow you to limit when incoming texts become visible.

My solution has been to text less. As much as possible, I try to move text conversations to phone calls. Catching up with a friend who lives far away is way easier with a phone call than sending 100 texts. And a phone call is the far more efficient way to arrange logistics of things like meeting for lunch.

There was an adjustment period at first because people were used to me providing prompt responses over text. But people figure it out. When you don't respond for hours, people realize that you're no longer a good texter, so they shouldn't rely on texting to get your immediate attention. By now, my friends and family know to call me if there's anything that requires my immediate attention.

## Replace online communities with real-life meetups

I originally met my friend [David Toth](https://twitter.com/jupiterunknown) at an Indie Hackers meetup I organized in Manhattan. When he told me that he had traveled three hours from Western Massachusetts to attend, I thought he was nuts, but I later discovered that it's part of a strikingly sensible strategy.

David loves meeting other founders, but he only has finite time to do it. He found that his in-person interactions were almost always richer and longer-lasting than relationships he formed online, so he dedicates nearly all of his networking time to real life events.

{% assign fig_caption = "Photo from [Indie Hackers Western Mass Meetup](https://www.meetup.com/nerdsummit/events/266162598/), which David and now I co-organize" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="indiehackers-august.jpg" alt="Group photo of Indie Hackers meetup" max_width="650px" img_link=true fig_caption=fig_caption %}

This made complete sense to me. I can think of several people I'm still in touch with today because I met them at a meetup or conference years ago for only 30 minutes. That's not true of anyone I interact with on Twitter or reddit. Reading through my social media history, I found countless instances where I spent an hour or more engaging with someone online, but now I have no memory of the conversation and am not in touch with the person at all.

{% assign fig_caption = "I probably spent 90+ minutes testing this user's app and giving him [feedback on Indie Hackers](https://www.indiehackers.com/product/libate/-L_2noyl2XS5xGWrIwTp?commentId=-L_QMW3ruNo_97Jevk4T). I barely remember the interaction and doubt that he remembers me." | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="indiehackers-feedback.jpg" alt="Chat settings in Gmail" max_width="450px" img_link=true fig_caption=fig_caption %}

## The hardest part of changing habits is the beginning

The hardest part is starting these habits, but once I did them for a few days, they become exponentially easier. One of the earliest things I did was to defer checking my email until 10 am instead of right when I woke up. It felt so difficult, and I kept feeling compelled to check my email to satisfy my curiosity about what's there.

After a week, I no longer felt the temptation when I woke up. By two weeks, I almost dreaded checking my email. My mornings had become so peaceful and productive. Once I checked my email, I was opening the door to whatever stresses awaited me there.

Today, I don't check my email until after I eat lunch.

## Be vigilant

Notice apps that drag you back in. Eliminate distractions and put obstacles in front of them.

Think about the apps you use and the results you want from them.
Notice when the app induces you to spend time on tasks that don't align with your intended use of the app.
Notice when the app pulls you into it for longer periods than you intended or at times that you didn't intend to use it.
Think about how you can change your usage of the app to prevent this.

## If you backslide, just start over

Some days, I'm obsessively checking texts and email. It feeds on itself. It usually happens when I'm feelign frustrated or lonely. I open up email or social media to distract me; it usually doesn't, and then that creates an even greater desperation for stimulation. I find that on these cases, I resign myself to the bad day and focus on doing better the following day. It works.

Another frequent breaker of my good habits is travel. Sitting around in airports or train stations, it feels like a perfect time to turn off your brain and check social media. But I find this bleeds into my habits back home. Now, when I travel, I plan ahead so that I have a book to read or podcasts to listen to. Sometimes, I just accept the boredom and enjoy looking out the window and taking in unfamiliar scenery.

---

*Original artwork by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*