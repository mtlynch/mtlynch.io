---
title: What Got Done - Month 3
excerpt: Ending the What Got Done experiment.
header:
  og_image: /images/retrospectives/2019/07/whatgotdone-metrics.jpg
---

## One-Line Summary

Ending the What Got Done experiment.

## Highlights

* [What Got Done](https://whatgotdone.com) received 32 new user sign-ups (growth of about 5x since May)
* [Zestful](https://zestfuldata.com) may be rising from the dead, with four new inbound customer inquiries.
* [Is It Keto](https://isitketo.org) earned $184, and [Zestful](https://zestfuldata.com) earned $26, making it my highest revenue month since quitting my job.

## Goal Grades

### Conduct five calls with new customers

* **Result**: Conducted nine calls and meetings (five for What Got Done, three for Zestful, one for a project idea)
* **Grade**: A

### Implement two commonly-requested Zestful features

* **Result**: Added USDA matching and handling for either/or ingredients
* **Grade**: B

### Add two engagement-encouraging features to What Got Done

* **Result**: Added a Reactions feature to What Got Done
* **Grade**: B-

## Inactive projects

### Is It Keto

Now that Is It Keto is on the back burner, I'm not going to dive as deeply into its metrics, but here's a summary of the most interesting ones:

| Metric                 | June 2019 | July 2019 | Change |
|------------------------|-----------|-----------|--------|
| Total Earnings         | $184.25   |  | <font color="green">+$XX (+XX%)</font> |
| Unique Visitors        | 14,419    |  | <font color="green">+XX (+XX%)</font> |
| Total Pageviews        | 39,405    |  | <font color="green">+XX (+XX%)</font> |
| Domain Authority (Moz) | 6         |  | 0 |
| Ranking Keywords (Moz) | 862       |  | <font color="red">-XX (-XX%)</font> |

## Fighting a Zestful data thief


{% include image.html file="papertrail-message.jpg" alt="Screenshot of email from Papertrail"  max_width="776px" class="img-border" img_link="true" fig_caption="Email from Papertrail saying I exhausted my log storage quota" %}

{% include image.html file="rapidapi-calls.jpg" alt="Graph of RapidAPI calls showing zero usage on July 31"  max_width="721px" class="img-border" img_link="true" fig_caption="Zero paid calls to Zestful on 7/31" %}

Uh oh... There's only one other way to access the Zestful backend, and that's through my free demo, running on AppEngine:

{% include image.html file="appengine-calls.jpg" alt="Graph of AppEngine calls showing heavy usage on July 31"  max_width="691px" class="img-border" img_link="true" fig_caption="Heavy calls to free Zestful demo on AppEngine" %}

Sure enough, I saw a jump in traffic for the day. They were only hitting it with 3 requests per second, but the service is limited to 30 requests per day per IP address. I checked my logs and found that the IP addresses all seemed to be from different AWS IP blocks. I found out online that AWS [publishes a JSON](https://ip-ranges.amazonaws.com/ip-ranges.json) of all their IP ranges, so I wrote a quick script to block AWS IPs from my AppEngine project:

```bash
#!/bin/bash
set -x
set -e
gcloud app firewall-rules create 100 --action deny --source-range 18.208.0.0/13 --description "Block AWS traffic"
gcloud app firewall-rules create 101 --action deny --source-range 52.95.245.0/24 --description "Block AWS traffic"
gcloud app firewall-rules create 102 --action deny --source-range 99.77.142.0/24 --description "Block AWS traffic"
...
```

The problem was that the script died after the 1000th rule, as Google Cloud Platform limits each project to a maximum of 1000 firewall rules.

I checked the logs again and saw that the requests were still coming, this time from an IP owned by a company called ParseHub:

{% include image.html file="parsehub-screenshot.jpg" alt="Screenshot of ParseHub homepage"  max_width="691px" class="img-border" img_link="true" %}

Scrolling down to their features, I saw this:

{% include image.html file="parsehub-features.jpg" alt="Screenshot of ParseHub features page"  max_width="691px" class="img-border" img_link="true" fig_caption="ParseHub advertising IP rotation as a feature" %}

The attacker was using ParseHub's IP rotation feature to abuse Zestful's free daily request limits.

The requests suddenly stopped at 

### Remediation

I considered what to do to prevent it.

| Idea | Drawbacks |
|------|-----------|
| Block all traffic from AWS and GCP IP blocks | The GCP firewall can't handle that many rules, so I'd have to implement IP blocking in my app, which is a pain. Also blocks legitimate users who may want to test from AWS/GCP. |
| Add exponential backoff the Zestful responses so that the service is slower when it's being pounded with requests | Terrible idea. The attacker probably doesn't mind waiting a few days for results, but all the legimtate users would see a painfully slow service. |
| Add bot detection / CAPTCHA | Adds hassle for legitimate users. I want people to be able to hit my demo API using common command-line utilities. |

What I eventually settled on was keeping a user quota by IP block rather than IP address. MaxMind publishes a [monthly dump of IP blocks](https://dev.maxmind.com/geoip/geoip2/geolite2/). Zestful is such a niche service that only a handful of visitors try the demo each day. The chances of a legitimate user sharing an IP block with anyone else is fairly low. My guess is that while IP rotation services have millions of IPs, they probably only have a few dozen IP blocks. And I'm guessing that banning entire IP blocks is such a rare countermeasure that they probably aren't sophisticated enough to keep track of quota per IP block.

I also thought it would be really fun to mess with the attacker instead of banning them. For example, instead of rejecting the request, return a successful message that contains incorrect results. It's a fun revenge fantasy, but I won't do it because if the "revenge mode" accidentally hits a legitimate customer, I've lost more than I could ever gain from smiting the attacker.

## Wrap Up

### What Got Done?

* Added Google AdSense to 
* Conducted nine customer interviews
* 

### Lessons Learned

* 

### Goals for May

* 