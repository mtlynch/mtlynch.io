---
title: "goHardDrive Leaked Personal Data for Thousands of Customers"
date: 2025-06-05
---

I recently purchased a set of three refurbished 8 TB hard drives from goHardDrive, a company that specializes in selling used hard drives. Two of my three drives were defective, so I had to return them. When I went through the return process, I was surprised to discover that goHardDrive's return status page allowed me to view the full address, email address, phone number, and order details of any customer that had returned merchandise to goHardDrive. I believe this affected between 10k-100k customers.

## The leak

The leak is painfully trivial. You don't need special tools or any special knowledge of web security. All you need is a regular web browser.

When I requested a return from goHardDrive, they assigned me a (RMA) number ending in five numeric digits. goHardDrive never emailed me confirmation of my RMA, so every time I checked the status, I had to type it manually in this form.

{{<img src="rma-form.webp" has-border="true" max-width="800px">}}

Note that the form says email address, but it actually expects an RMA number. This form is public and has no authentication, rate limits, or CAPTCHA.

When I entered my RMA number, I saw this screen:

{{<img src="ghd-rma.webp" has-border="true" max-width="800px">}}

That screen shows every bit of private information that goHardDrive knew about me as a customer, including:

- My name
- My mailing address
- My email address
- My phone number (which I thankfully did not provide)
- My order number and date
- The products I was returning and the reason for their return

I didn't notice how much it was exposing until I accidentally mistyped the last digit of my RMA number and saw the full information from another customer who had returned their merchandise on the same date that I had.

The URL for this page had the form of:

```text
https://ghdwebapps.com/rma/check?rmaNo=XYZ12345&fromButton=1
```

Where `XYZ12345` was just my RMA number. It would be trivial to write a script that sends an HTTP GET request for every RMA number from 00001 to 99999 and scrapes the personal details of every goHardDrive customer who had requested a return.

## Scale of leak

I didn't enumerate every possible RMA number, as some companies use the [Computer Fraud and Abuse Act (CFAA)](https://www.justice.gov/jm/jm-9-48000-computer-fraud) as a way to prevent public disclosure of vulnerabilities, so I didn't want to do anything that potentially violated the CFAA.

I can't say for certain how many goHardDrive customers this vulnerability affected, but assuming that goHardDrive started their RMA numbers at somewhere at `10000` or below and increments each by one (as it appeared when I mistyped my RMA number by 1), that means that 10k-100k customers were exposed in this leak.

## goHardDrive's fix

TODO

## Sidenote: The many other issues with goHardDrive's return process

Even if the data leak hadn't happened, goHardDrive has the worst RMA process of any merchant I've encountered.

I originally chose goHardDrive because of glowing comments about goHardDrive on reddit, like this user who reported that goHardDrive replaced a bad drive before even receiving the return and gave the customer a postage-paid label to send the defective unit back:

{{<img src="reddit-review.webp" alt="I just bought a 24TB Seagate Exos from them. Installed it yesterday and found it was DOA (motor making a beeping sound and nothing else). Emailed them at 6:30am and they responded that afternoon and had a replacement in the mail with two day shipping (at their expense) before the end of the day. Gave me a pre-paid label to return the defective drive 'at my convenience.' Obviously would have been better if it worked on arrival, but they handled it perfectly. Replacement should be here tomorrow, hopefully it works.">}}

In my case, two out of the three hard drives I purchased from goHardDrive arrived dead. I started the return process and was surprised to find that goHardDrive makes me re-enter all my order information manually. Normally, an RMA process lets you enter your order details, and the merchant pulls up your information, and you just let them know which item you need to return. With goHardDrive, it was as if they completely forgot who I was in the two weeks since I'd made my purchase.

Also, contrary to the claim I saw on reddit, goHardDrives does not pay return shipping. I had to pay postage out of pocket even though goHardDrive was at fault for shipping me defective hardware.

Finally, there's no email confirmmation or updates. I'm glad I thought to photograph my package before shipping it because I otherwise wouldn't have any record of my RMA number, and goHardDrive offers no way to look it up.

goHardDrives never emailed me to say they received my return nor that they were sending a replacement. From checking the insecure RMA status page, I could see my request go from `OPEN` to `RECEIVED` to `CLOSED` with no further information. Two weeks after I shipped my return, I received working replacements from goHardDrive, but they had never sent me tracking information beforehand.

## Bug bounty

I asked goHardDrive if they offer a bug bounty program for people who offer coordinated disclosure of security vulnerabilities. They said that they did not but they gave me a $20 refund on my $XX purchase as a thank you.

The bounty on an information disclosure of this scale is [normally hundreds to thousands of dollars](https://www.tabcut.com/blog/post/How-I-made-200-in-2-Minutes-on-Hackerone-Zomato-Bug-Bounty-Program-POC), so $20 is quite low.

## Timeline

- 2025-05-21: I report the vulnerability to goHardDrive.
- 2025-05-21: (two hours later) goHardDrive acknowledges the issue and says that they are working on a fix. They say to expect an update in 3-5 business days.
- 2025-05-29: I request a status update from goHardDrive.
- 2025-05-29: goHardDrive responds to say that they've remediated the issue by requiring the customer to enter the matching zip code and street number for the RMA.
- 2025-06-05: I
