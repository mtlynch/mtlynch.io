---
title: " Researchers at Northeastern Univeristy Spammed 47k GitHub Users"
date: 2026-04-30
---

A few weeks ago, I got a spam email inviting me to participate in a survey about cryptocurrency. There were a few unusual things about this email:

The first was that the email came from `blockchainlab@northeastern.edu`, which is the real domain name for Northeastern University. I checked the email headers, and it passed all the email validation checks: DKIM, SPF, and DMARC. So, either the University was really sending out spam or someone had hacked credentials of a Northeastern University employee.

The second notable thing about the email is that it was sent to a unique email (TODO: link) I use for GitHub. It's not an email I ever use to sign up for any services, so it looked like the spammers had scraped email addresses from GitHub in violation of GitHub's terms of service. That's the kind of thing I expect of spammers, but universities generally have to follow the rules.

That brings me to the third thing that stuck out about this email: it claimed it was approved by Northeastern's Institutional Review Board (IRB). Why would an IRB allow researchers to violate GitHub's terms and send spam to people who never agreed to participate in this research?

## I reach out to the IRB

Da Huang, the Northeastern professor leading this research replied to my message to the IRB (emphasis added):

> First, please rest assured that **no personal information was collected at any point in the process**. Second, we comply with the GitHub policy covered under the Educational Use Agreement and Research Program Terms. Specifically, we are also committed to complying with the Information Usage Restrictions that state that “Researchers may use public, non-personal information from the Service for research purposes, only if any publications resulting from that research are open access”. Lastly, but perhaps most importantly, we understand the sensitivity of such a “cold-call”- style survey, which is why the actual survey begins by asking for explicit consent to participate. If the respondents choose no, the survey ends immediately.
>
> We have also taken steps to ensure data security. **All GitHub user emails have already been deleted from our end right after the survey was sent out**, which is why the survey asks for a contact email at the end if the respondent opts into the raffle (because we no longer have the email address to reach out). Please rest assured that we have taken all necessary steps to ensure data security.

So, apparently they don't consider email addresses to be personal information, but just for good measure, they deleted all the emails they collected.

## Where did they get my email?

I suspected that they ran `git clone` on a bunch of repos and then scraped email addresses out of commit messages. But it actually turns out that they don't need to do that

Every time I replied to the IRB, I got a response from Da Huang instead, so finally I removed him from the thread to the bcc line. He sent me one last reply:

> We are confident that we are in full compliance because the information is public and **does not include any identifying information**. So, we have no problem with being fully transparent here.

Sure, how could an _email address_ contain any identifying information? Who owns `John.Smith.1982.from.NJ@gmail.com`? There's no way to know because the email address contains absolutely no identifying information.

## Are emails attached to Git commits public data?

The next day, someone from the IRB responded to say that they were investigating, but they didn't exactly understand what I meant when I tried to explain how GitHub users have no control over the privacy of email addresses on Git commits.

I don't think there's ever justification for scraping emails from GitHub, but if you think there's some gray area and that users on GitHub implicitly want to receive unsolicited email just by being on GitHub, then at least you should be looking at who makes their email address public on their user profile. I did not:

not developers, so they didn't understand what I meant about how users have no control over the publicitity of emails addresses that appear in git commits.

## IRB shuts down the study

A week later, the IRB replied to me to say that the investigation had concluded and they decided to suspend the study.

The researcher had told the IRB that they'd be collecting email addresses throught publicly available data, but the IRB didn't understand that scraping emails from Git commits wasn't exactly public. The researcher agreed to stop scraping emails from GitHub via the REST API.

I asked the IRB what their policy is on unsolicited bulk email generally, and they declined to comment.

I asked if they were comfortable with me quoting them here, and they said no. I'm not totally sure official communication from a public university deserves the right to be kept private, but I appreciate them following up on this, so I'm honoring their request, so that's why I'm quoting Prof. Huang directly but only paraphrasing the IRB responses.
