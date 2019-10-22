---
title: "Tricks for Reducing Distractions from Gmail, Social Media, and StackOverflow"
---

This isn't another "you should quit social media" blog post. You can use email and social media in healthy ways. The challenge is that they actively struggle with you to induce you to use them in unhealthy ways. This post is about techniques that help you manage these tools instead of allowing them to manage you. Some are simple technical tricks. Others are personal habits.

## Avoid "drag"

Apps that when you use them, they drag you into other stuff.

* You decide to respond to a recent email, but you open Gmail and see four new emails.
* You take out your phone to check the time and see that you have six notifications from four different apps.
* You check your Twitter feed for interesting blog posts and instead spend three hours reading about the latest trending controversy that everyone will forget about in a week.

## Decide what you want from social media

You can manage the cost of social media.

People talk about social media as if it's always a negative thing and you need to eliminate it. But social media can be a useful thing. I like to see when my Facebook friends get married or have babies. I don't want to use Facebook for mindlessly watching videos or getting into political arguments. I like to see when interesting people I follow on Twitter post useful blog articles or advice.

Think about what you want out of social media and if there's a way to get it. I can use Twitter for my stated purpose by checking it once a day in a 5-15 minute block. Same with Facebook.

## Schedule time for email, texts, and social media

If you've taken some time to reflect on what you want from social media, hopefully your answer isn't, "Email and social media are my taskmasters, so I must check in with them every 15 minutes to decide on my next task." No, once you decide what you want from those tools and how much time you need to invest to get that benefit, schedule it.

This is easiest with social media because there's rarely urgent, critical tasks that result from you checking your Facebook feed.

I'm more present in social situations. I was always a firm believer in "don't interrupt a real life interaction to check your phone." But if my friend went to the bathroom or they had to take a call or something, I'd check my email and texts. I didn't think anything of it, but I realized a huge difference once I committed to not doing that.

Checked Twitter and was in a bad mood because someone said something I found really obnoxious.

I check once I get home.

I schedule

Social media becomes less interesting

Don't check your texts in social situations or during brief breaks.

## "What's the harm in checking email and social media during idle times?"

For a long time, I thought I was managing my email and social media well. I wasn't one of those people that kept their inbox open all day or let notifications pop up on my screen every time I got a new email or Facebook like. When I was waiting for a page to load or a 2-minute test to run, what was the harm in using the time to check my email or Twitter instead of just sitting there being bored?

The first problem is that the scenario is a fantasy. If I checked Twitter while I waited for a two minute process to finish, I'd often end up closing Twitter 5-15 minutes later.

The second problem is something I'd never heard of until last year: attention residue. I learned about it in [*Deep Work*](https://amzn.to/2NcYWqL) by Cal Newport ([my notes](/book-reports/deep-work/)). TODO: look up studies.

The last problem is that it trains your brain to expect constant stimulation.

It's okay to be bored! Boredom is a skill. The more you can tolerate boredom when you're doing nothing, the easier it is to rest in deep thought when you're solving a difficult problem.

## Twitter

### Make Twitter's trending hashtags boring

Twitter tries to pull you into deeper engagement by showing you trending topics and hashtags.

{% include image.html file="twitter-trending.jpg" alt="Twitter's trending topics" max_width="800px" img_link=true class="img-border" fig_caption="Twitter shows you trending topics to seduce you into spending more time in the app." %}

This plays on your natural sense of wanting to be involved, so you read about whatever the hashtag is. But these are almost always garbage. The majority is some outrage that everyone will forget in a month. Otherwise, it's a current event, and you're ready low-quality, reactionary responses to it.

Set Twitter's trending news to a location where you don't speak the language and you're not interested in their news. Mine is set to Abu Dhabi.

https://twitter.com/settings/trends

{% include image.html file="twitter-settings.jpg" alt="Twitter's trending topics" max_width="600px" img_link=true fig_caption="Twitter shows you trending topics to seduce you into spending more time in the app." %}

Here's how my trends panel looks after I set it to Abu Dhabi.

{% include image.html file="abu-dhabi-trends.jpg" alt="Setting Twitter trends to Abu Dhabi results in mostly Arabic hashtags" max_width="352px" img_link=true fig_caption="Twitter shows you trending topics to seduce you into spending more time in the app." %}

The trends are mostly in Arabic, which I can can't read. Even the English hashtag is fairly specific to the United Arab Emirates and not something that tempts me.

### Mute, block, and unfollow your way to a tidy Twitter feed

I initially joined Twitter to share my blog posts and find other interesting content relevant to my work. Over time, I started adding comedians and celebrities because their tweets were often entertaining. I realized that more and more, my Twitter feed was polluted with the same politics and shallow outrage I was trying to avoid, and most of it was coming from the celebrity accounts, so I trimmed down my follow list.

I followed anyone who I thought was an interesting person.

This got me partway there, and I realized I could clear most of the remaining content by adding [muted words](https://twitter.com/settings/muted_keywords).

I enjoyed following celebrities and comedians because they were entertaining, but I realized they were distracting me from my intended purpose on Twitter, which is to maintain professional connections and see when people post interesting technical content.

{% assign fig_caption = "Use [muted words](https://twitter.com/settings/muted_keywords) to filter out current events and topics you're uninterested in engaging with on Twitter." | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="twitter-muted.jpg" alt="Twitter's trending topics" max_width="600px" img_link=true fig_caption=fig_caption %}

You'll notice that this hides prominent politicians and current events topics. I think the news is important, but Twitter is not an effective way for me to consume it.

Review your the list of accounts you follow on Twitter. Eliminate ones that post a low proportion of relevant content.

## StackOverflow / StackExchange

### Ignore "hot questions"

As a programmer, StackOverflow often has highly valuable answers to problems I run into during software development. But they're also playing games to distract me from my task at hand and drag me deeper into the app. Their sidebar is filled with distractions: "hot questions," blog posts, and job listings. The "hot questions" are especially pernicious because they're no doubt just displaying the questions most likely to attract clicks.

The "hot questions" are never relevant to the problem I came to StackOverflow to solve, but if I'm on StackOverflow, chances are that I'm frustrated debugging something and easily tempted by distractions.

I avoid this with a browser extension called [uBlock Origin](https://github.com/gorhill/uBlock). Its primary purpose is to block ads, but one of its lesser-known features is its "element picker." It allows you to hide any page element permanently with a few mouse clicks. Selecting a page element with the "element picker" tool adds a CSS selector rule to uBlock Origin so that it knows to always hide that element.

<figure>
  <video style="max-width:100%" controls>
    <source src="/files/eliminate-distractions/stackoverflow-cleaning.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Removing all sidebar distractions from StackOverflow using uBlock Origin</figcaption>
</figure>

This technique works on many sites, but it's a bit flaky given that it depends on CSS rules that may change when sites update their design. You also need to watch out for sites like Twitter that use UI frameworks that have so generate so much of their UI dynamically that uBlock Origin's selectors don't work on subsequent visits.

You can also use StackOverflow settings to disable "Hot Questions" natively, though there's no option to hide the other distracting sidebar panels. To suppress "Hot Questions", go to [Site Settings > Preferences](https://stackoverflow.com/users/preferences/) and check the box for "Hide Hot Network Questions":

{% assign fig_caption = 'Disable "Hot Network Questions" in [StackOverflow settings](https://stackoverflow.com/users/preferences/) to eliminate distracting questions.' | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="stackoverflow-settings.jpg" alt="Screenshot of StackOverflow's settings page" max_width="600px" img_link=true class="img-border" fig_caption=fig_caption %}

## Email

### Hide your Gmail inbox

When I first started limiting my email checking, I often struggled with the fact that my email contained lots of useful information I needed. For example, I'd be trying to remember how to install some software package, remember that I emailed someone four months ago explaining how to do it, so I'd check my email archive to find it. But the problem with Gmail is that on the way to searching your mail archive, you have to see your inbox. I wanted a way to make it so that I could still search for old information in my archives without seeing anything new.

Fortunately, I found out there's a tool that's exactly for that: [Inbox When Ready](https://inboxwhenready.org/).

{% assign fig_caption = "When an email merits a thoughtful response, I create a task for it in my [to-do list app](https://nirvanahq.com/)" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="inbox-when-ready.jpg" alt="Gmail screenshot with Inbox When Ready enabled" max_width="800px" img_link=true class="img-border" fig_caption=fig_caption %}

The tool is flexible, so you can allow messages to show up in your inbox immediately when they match certain rules (e.g., mail from a particular sender or with a specific keyword in the subject). You can also configure it to limit the number of checks or the total time you spend in your inbox each day.

Inbox When Ready works great on my desktop, but I haven't found a similar solution for my phone, unfortunately. I don't have to check my mail archive so much when I'm away from my desktop, but there are situations like event tickets in my mail history that require me to pull up the Gmail mobile app, which unhelpfully shows me my new emails on the way.

If you use a desktop mail client like Outlook or Thunderbird, you can suppress the display of new emails by disabling automatic e-mail checking.

### Move your to-do list out of your inbox

At this point, "don't use your inbox as a to-do list" is pretty cliché advice, but I'll say it anyway:

* **Don't use your inbox as a to-do list**

It's tempting to manage tasks with your email inbox because it *seems* so convenient, but it's a horrendous solution:

* It grants power over your time to anyone who writes you an email.
* It makes it impossible to order your tasks by priority.
* It couples the act of reviewing your to-do list with the act of processing new emails.

Instead, I process each email using the following workflow that David Allen popularized in [*Getting Things Done*](https://amzn.to/2J3GIY1):

1. If the email requires no reply, I archive it
1. If the email requires a reply I can write in under two minutes, I reply immediately.
1. For all other emails, I add "Respond to [person]" to my to-do list and then archive the email

If you're used to using your inbox to manage tasks, I know the prospect of managing a whole separate task list sounds tedious and annoying. I encourage you to try it for a week.

Before I did it, I didn't realize the hold that emails had on me by sitting in my inbox. Any time I checked my inbox, it was sitting there begging for my attention. Now, when I receive an email that doesn't require an immediate response, I just create a task and schedule it for a few days in the future. It gives me the freedom to forget about the email because I know my to-do list will remind me about it later.

{% assign fig_caption = "When an email merits a thoughtful response, I create a task for it in my [to-do list app](https://nirvanahq.com/)" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="nirvana-tasks.jpg" alt="Chat settings in Gmail" max_width="785px" img_link=true class="img-border" fig_caption=fig_caption %}

My to-do list app of choice is [Nirvana](https://nirvanahq.com/). I think it's okay not great. I've heard good things about [Todoist](https://todoist.com), but I'm too accustomed to my Nirvana workflow to switch.

### Unbundle Hangouts from Gmail

By default, Gmail integrates Hangouts into your desktop. I use Hangouts to manage my SMS because I hate being forced to send all my SMS messages from my phone. The problem is that, again, this creates intrusive bundling. It means that I can't open my Gmail without seeing my Hangouts messages and vice-versa.

{% include image.html file="hangouts-in-gmail.jpg" alt="Chat settings in Gmail" max_width="800px" img_link=true class="img-border" fig_caption="By default, Gmail embeds Hangouts into your inbox." %}

Fortunately, this is a pretty easy one to solve. Go to the [chat settings in Gmail](https://mail.google.com/mail/u/0/#settings/chat), and just select "Chat off."

{% assign fig_caption = "Disabling chat in [Gmail settings](https://mail.google.com/mail/u/0/#settings/chat)" | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="gmail-disable-chat.jpg" alt="Chat settings in Gmail" max_width="821px" img_link=true class="img-border" fig_caption=fig_caption %}

When you want to access Hangouts, just go to [https://hangouts.google.com](https://hangouts.google.com).

## Use social media with a dedicated browser profile

One way I've found to curb my bad habits is to put obstacles in front of them. For example, if I keep lots of junk food in the house, I'll eat it when I get the craving. I'll sometimes crave it badly enough that I'll drive to the store and buy it, but 99% of the time, I decide I'd rather just eat something less exciting that's already in my house.

I do the same thing with my social media. It's too easy to get bored, hit Ctrl+T to open a new tab, then go to Facebook / Twitter / Reddit.

{% assign fig_caption = '"Typewriter" by [xkcd](https://xkcd.com/477/)' | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="typewriter.png" alt="Chat settings in Gmail" max_width="443px" img_link=true fig_caption=fig_caption %}

Instead, I block social media in my main browser and create a dedicated browser profile for it.

It makes it hard to mindlessly pop open a new tab and visit a time-waster site. To visit Facebook, you have to consciously think about it. It also means that if you visit Facebook unintentionally, like a business' main web presence is their Facebook page, you can get the relevant information without seeing your tantalizing Facebook notifications in the corner.

Then I sign out of the social media sites on my main browser and delete the cookies for those sites. This is sufficient for sites like Facebook or Twitter that are near useless when you're not signed in. For other sites like news site, you have to block it in your main browser so that you remember to use it in your timewaster browser.

I added news.google.com to uBlock Origin's filter rules. That way, any time I visit out of habit, I'm reminded that I need to visit it in my other browser profile.

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

I discovered this solution by mistake. I initially downloaded an app that claimed to enable Do Not Disturb when I turned the phone facedown. The app didn't work and instead just always put my phone into Do Not Disturb. Then, I realized that was actually better. If I wanted to check my texts, I just checked my texts.

There's lots of things that I'd like to do on my phone without getting dragged into some app. I often look at my phone just to check the time, but if I see that I have new texts, it tempts me to check them. With Do Not Disturb, I just don't see anything until I decide to check.

### Replace texts with phone calls

Unfortunately, there's no equivalent of Inbox When Ready for text messages. As soon as you open your texting app, you see all texts from all of your contacts. I've never seen any apps or tools that allow you to limit what you see.

My solution has been to text less. As much as possible, I try to move text conversations to phone calls. Catching up with a friend who lives far away is way easier with a phone call than sending 100 texts. And arranging logistics to meet a friend is way easier over the phone.

There was an adjustment period at first because people were used to me providing prompt responses over text. But people figure it out. When you don't respond for hours, they realize that you're no longer a good texter, so they shouldn't rely on texting to get your immediate attention. By now, my friends and family know to call me if there's anything that requires my immediate attention. And some people have anxiety about talking on the phone, but they also can see the benefits once they try it.

## Replace online communities with real-life meetups

I met my friend [David Toth](https://twitter.com/jupiterunknown) at an Indie Hackers meetup in Manhattan. David lives in Western Massachusetts. I later asked him why he'd spend 3 hours traveling to New York City just for a meetup.

He later told me that it's a very deliberate strategy. He loves engaging with other people in the startup world, but he has only finite time to allocate to this. He finds that he gets a bigger bang for his buck from in-person meetups, so of the time he allocates to participating in professional communities, he dedicates nearly 100% to in-person meetups and conferences.

Once I heard this, it made a lot of sense to me. There are people I met at meetups that I talked to for 30 minutes and am still in touch with today. That's not true of anyone I engage with on Twitter or reddit. There are multiple instances where I spent an hour or more engaging with someone on an online forum, but now I have no memory of the conversation and am not in touch with the person at all.

{% assign fig_caption = "I probably spent 90+ minutes testing this user's app and giving him [feedback on Indie Hackers](https://www.indiehackers.com/product/libate/-L_2noyl2XS5xGWrIwTp?commentId=-L_QMW3ruNo_97Jevk4T). I barely remember the interaction and doubt that he remembers me." | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="indiehackers-feedback.jpg" alt="Chat settings in Gmail" max_width="450px" img_link=true fig_caption=fig_caption %}

With in-person meetups, it's much more common for me to form lasting bonds. I'm not saying that we become best friends, but I reach out to them months later when I need their advice and vice-versa. That's exceedingly rare in the relationships I build purely online.

There's something so different about meeting someone in person. There are people I met at meetups one time more than a year ago and we still keep in touch and help each other out. Meanwhile, there are people who I've probably spent 10x that time engaging.

David and I now organize the Indie Hackers meetup for Western Mass. We weren't sure if anyone would come, but worst case scenario, it's just us hanging out together. We generally draw a crowd of 6-10 people. Western Massachusetts is certainly not a tech hub, but we draw a crowd of 6-10 people. And the advice is highly personalized. Wide variety of people, some have hundreds of dollars in capital while others have hundreds of thousands. Some people are earning enough to hire employees and some are just starting out.

{% include image.html file="indiehackers-august.jpg" alt="Group photo of Indie Hackers meetup" max_width="650px" img_link=true fig_caption="Indie Hackers Western Mass August Meetup" %}

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

*Cover art by [Loraine Yow](https://www.linkedin.com/in/lolo-ology/).*