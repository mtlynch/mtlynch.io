---
title: "goHardDrive Leaked Personal Data for Thousands of Customers"
date: 2025-06-26
---

I recently purchased a set of three refurbished 8 TB hard drives from a company called goHardDrive, a merchant that specializes in selling used hard drives. Two of the drives arrived dead, I discovered during the return process that goHardDrive had accidentally published private details of thousands of its customer, including their full names, mailing addresses, email addresses, and order details.

## The leak

When I requested a return from goHardDrive, they assigned me a return merchandise authorization (RMA) number ending in five numeric digits. goHardDrive never emailed me confirmation of my RMA, so every time I checked the status, I had to type it manually in this form.

{{<img src="rma-form.webp" has-border="true" max-width="800px" caption="goHardDrive's RMA status check form. Yes, it says &ldquo;Enter email&rdquo; when it actually wants an RMA number.">}}

When I entered my RMA number, I saw this screen:

{{<img src="ghd-rma.webp" has-border="true" max-width="800px">}}

That screen shows every bit of private information that goHardDrive knew about me as a customer, including:

- My name
- My mailing address
- My email address
- My phone number (which I thankfully did not provide)
- My order number and date
- The products I was returning and the reason for their return

I didn't notice how much it was exposing until I accidentally mistyped the last digit of my RMA number and saw the full information from another customer who had returned their merchandise on the same date.

The URL for this page had the form of:

```text
https://ghdwebapps.com/rma/check?rmaNo=XYZ12345&fromButton=1
```

`XYZ12345` was the format of my RMA number. It would be trivial to write a script that sends an HTTP GET request for every RMA number from 00001 to 99999 and scrapes the personal details of every goHardDrive customer who had requested a return. Even someone with no specialized knowledge could just type any RMA number in the form and get all of that customer's data.

This form was public and had no authentication, rate limits, or CAPTCHA.

## Scale of leak

I didn't enumerate every possible RMA number to get an exact count of how many customers this affected. Some companies use the [Computer Fraud and Abuse Act (CFAA)](https://www.justice.gov/jm/jm-9-48000-computer-fraud) as a way to prevent public disclosure of vulnerabilities. I didn't want to do anything that potentially violated the CFAA, but I can deduce a lot without doing the actual scraping.

I can't say for certain how many goHardDrive customers this vulnerability affected, but assuming that goHardDrive started their RMA numbers at `10000` or below and increments by one, that means that 10k-100k customers were exposed in this leak.

## goHardDrive's attempted fix

I notified goHardDrive of this issue on May 21, 2025. To their credit, they responded two hours later to acknowledge the issue and confirm that they would deploy a fix within three to five business days.

I didn't hear back from them, so I checked back a week later, and they said they'd updated the form to prevent attackers from enumerating RMA numbers. Checking RMA status now required the customer to enter their postal code and house number.

{{<img src="ghd-zip-search.webp" max-width="500px">}}

At first this seemed sufficient to me. Given a sequential RMA number, you can trivially guess every other valid RMA number. What are the odds of guessing an RMA number and the corresponding ZIP and house number?

Then, I thought about it a bit more. US ZIP codes are only five digits, meaning there are only 100k possible zip codes. And, actually, it's less than half that, as there are only [41,642 valid ZIP codes](https://facts.usps.com/42000-zip-codes/). And ZIP codes are not evenly distributed, so [certain ZIP codes](https://datacommons.org/ranking/Count_Person/CensusZipCodeTabulationArea/country/USA?h=zip%2F14607) are much more common.

There's a wide range of possible house numbers, but the majority are likely to fall in the range of 1 to 100, likely with heavy clustering in the lower numbers.

So, the worst case is that an attacker has to try about 416k possible combinations to leak details associated with an RMA number, but optimizing by ZIP codes and house numbers probably means the attacker has &gt;50% chance of success after about 40k guesses.

How long does it take to make 40k guesses against a web API? The security researcher brutecat recently wrote about enumerating phone numbers on a Google web API. They were able to make [40k HTTP requests per second](https://brutecat.com/articles/leaking-google-phones#time-required-to-brute-the-number) on a $0.30/hr cloud server. I doubt goHardDrive's RMA server could _serve_ 40k requests per second, but still.

## goHardDrive removes RMA status checks entirely

## Sidenote: Leaks aside, this is a terrible return process

goHardDrive has the worst RMA process of any merchant I've encountered.

I originally chose goHardDrive because of glowing comments about goHardDrive on reddit, like this user who reported that goHardDrive replaced a bad drive before even receiving the return and gave the customer a postage-paid label to send the defective unit back:

{{<img src="reddit-review.webp" alt="I just bought a 24TB Seagate Exos from them. Installed it yesterday and found it was DOA (motor making a beeping sound and nothing else). Emailed them at 6:30am and they responded that afternoon and had a replacement in the mail with two day shipping (at their expense) before the end of the day. Gave me a pre-paid label to return the defective drive 'at my convenience.' Obviously would have been better if it worked on arrival, but they handled it perfectly. Replacement should be here tomorrow, hopefully it works.">}}

In my case, two out of the three hard drives I purchased from goHardDrive arrived dead. I wasted a lot of time trying to diagnose hardware issues on my server because I thought it was so unlikely that two separate drives would arrive dead, but I ultimately realized they were just dead drives.

I started the return process and was surprised to find that goHardDrive makes me re-enter all my order information manually. Normally, an RMA process lets you enter your order details, and the merchant pulls up your information, and you just let them know which item you need to return. With goHardDrive, it was as if they completely forgot who I was in the two weeks since I'd made my purchase.

Also, contrary to the claim I saw on reddit, goHardDrive does not pay return shipping. I had to pay postage out of pocket even though goHardDrive was at fault for shipping me defective hardware.

Finally, there's no email confirmation or updates. I'm glad I thought to photograph my package before shipping it because I otherwise wouldn't have any record of my RMA number, and goHardDrive offers no way to look it up.

goHardDrive never emailed me to say they received my return nor that they were sending a replacement. From checking the insecure RMA status page, I could see my request go from `OPEN` to `RECEIVED` to `CLOSED` with no further information. Two weeks after I shipped my return, I received working replacements from goHardDrive, but they never sent me tracking information for my replacements.

## Bug bounty

I asked goHardDrive if they offer a bug bounty program for people who offer coordinated disclosure of security vulnerabilities. They said that they had no bug bounty program, but that they'd refund $20 of my $330 purchase as a thank you.

The bounty on an information disclosure of this scale is [normally hundreds to thousands of dollars](https://www.tabcut.com/blog/post/How-I-made-200-in-2-Minutes-on-Hackerone-Zomato-Bug-Bounty-Program-POC), so $20 is quite low.

## Timeline

- 2025-05-21: I report the vulnerability to goHardDrive.
- 2025-05-21: (two hours later) goHardDrive acknowledges the issue and says that they are working on a fix. They say to expect an update in 3-5 business days.
- 2025-05-29: I request a status update from goHardDrive.
- 2025-05-29: goHardDrive responds to say that they've remediated the issue by requiring the customer to enter the matching zip code and street number for the RMA.
- 2025-06-05: I express concerns to goHardDrive about their new RMA search feature.
- 2025-06-20: goHardDrive confirms to me that they've permanently removed their RMA search form and now share RMA status exclusively over email.
