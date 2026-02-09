---
title: "Eversource EV Rebate Program Exposed Massachusetts Customer Data"
date: 2026-02-05
---

Massachusetts has a program that partially reimburses homeowners for installing an electric vehicle (EV) charger. So, I bought an EV charger and claimed the rebate only to discover that Eversource, my power company, was publicly exposing personal information of customers who applied, including:

- Full names
- Vehicle registration certificates (including plate number and vehicle identification number)
- Home addresses
- Email addresses
- Phone numbers

I'll include the backstory that led me to the vulnerability, but if you just want to know about the security vulnerability, you can [skip to that](#eversource-leaking-customer-records).

## Why is this rebate process so complicated?

I live in Massachusetts, and the state government offers a program called [Mass Save](https://www.masssave.com/), where you pay a tax on your energy bill, and the money funds sustainable energy initiatives. For example, if you insulate your home for better energy efficiency, Mass Save will subsidize the cost.

I recently installed a charger for my electric vehicle (EV) and discovered that Mass Save reimburses [$700 of my installation costs](https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations). Great!

Eversource is my electric company, so I had to claim the rebate through them. I went online to claim my rebate, expecting it to be a 10-minute process, but it took me over an hour to fill out the endless forms.

First, they wanted to know my name, address, and Eversource account number. This is redundant, as Eversource already has this information about me, but fine.

As I progressed through the form, they started asking me even more irrelevant questions like:

- What kind of electric vehicle do I own?
- Where did I buy it?
- How much did I pay?
- Where's my vehicle registration?
- Who installed my EV charger?
- What is their address?
- Where, exactly, on my house is the charger?

Why do you need any of this to confirm I bought an EV charger?

The process was far more complicated than what Eversource advertises as their ["four-step rebate process."](https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/ev-rebate-process)

## We need your charger's MAC address

The most absurd information Eversource requested as part of the rebate was the _MAC address_ of my EV charger. What?

The MAC address is the unique identifier for the WiFi chip on the EV charger. It's not printed on the device, so how was I supposed to get it?

I'm a software developer and [home networking nerd](/building-first-homelab-rack/), so I was able to find my EV charger's MAC address in my router's admin dashboard, but I don't know how they expect the average person to do that.

## No, that's wrong. Do it again

A week after submitting all of my documents, I got this email from Eversource:

{{<img src="rejection-email.webp" max-width="550px" caption="Eversource claims the photos and documents I uploaded with my application are incorrect.">}}

They didn't like the invoices I uploaded from my electrician because they weren't marked "Paid in full." It's rare for any contractor to give me a "paid in full" invoice after payment, so I had to go pester my busy electrician to generate new invoices.

Did I miss that requirement in the form? Nope, I went back to the portal and looked at what they say about the invoice. All they said was, "Contractor's invoice for wiring upgrade." No mention of "Paid in full."

{{<img src="just-invoice.webp" max-width="800px" caption="The rebate form never mentions needing an invoice to be marked as paid in full.">}}

And what was wrong with my photos? Did I forget to upload the photo of my charger?

I went back into the application and saw that the photo was there. And the charger was clear as day. The photo of the serial number was also plainly legible. Did they think I could photograph a MAC address?

I emailed them asking what was wrong with the photos, explaining that it was impossible for me to photograph a MAC address.

I got a response a week later. They didn't explain why they'd rejected my other photos, but they told me to find the MAC address in my EV charger's mobile app and take a screenshot of that. Okay...

## The perverse incentives of Eversource's EV rebate program

Something felt fishy about Eversource's rebate program. Every step seemed designed to burden me with needless paperwork and subtle gotchas.

Is there something rotten in the state of Massachusetts? Does Eversource get to keep the money they don't distribute in rebates?

I called the Massachusetts Department of Utilities (DPU), who oversees the EV rebate program and asked what was going on. Why was Eversource making it so hard to claim a rebate?

The employee at the DPU said she'd heard complaints of Eversource rejecting photos and then accepting the exact same photos on appeal. It sounded as if Eversource was using an automated system to evaluate photos, but the secondary review was either more accurate or, more likely, a human actually looking at the photo.

So, does Eversource just pocket the rebate in those cases? "No," the DPU rep said. Eversource doesn't keep any money if the rebate application fails. And even on successful claims, Eversource just pays the rebate and requests reimbursement from the state.

Wait, if Eversource is just passing through the money, why are they running this program at all?

The rep at the DPU explained that Eversource wants people to buy EVs. If MA residents have EVs, they're shifting their spending from gasoline, which Eversource doesn't sell, to electricity, which Eversource has exclusive access to sell in many cities.

And then it started to make sense: Eversource doesn't want customer rebate claims to fail; they just don't care about them at all.

By the time a customer requests a rebate from Eversource, the customer has already purchased an EV. The customer is now locked in to buy extra electricity from Eversource for the next several years. At that point, Eversource has everything they want from the deal and no incentive to spend another penny on the customer.

I asked the Massachusetts DPU rep if they keep metrics on how many people apply for this rebate vs. the number who actually complete it. Eversource only tells the DPU how many people complete the process. Eversource could be rejecting 99% of rebate applicants, and the DPU would never know.

## Eversource leaking customer records

When I returned to the Eversource rebate portal to submit the information they requested, I wondered: if Eversource minimized their investment into every part of the EV rebate process, did they invest anything into security?

Unfortunately, the answer was no. It took me less than two minutes to spot a serious security vulnerability on the Eversource rebate portal.

As a basic check on the site's security, I opened up the networking console of my web browser to inspect the raw communication between my browser and the rebate portal. My browser made dozens of requests to the rebate server, but one in particular caught my eye.

A request to the URL `https://eversource.dsmcentral.com/traksmart4/public/guest/commercial/v2/application.json?projectId=123456` returned a huge amount of data that looked like this:

```json
[
  {
    "fieldId": "FORM-60-102189-108632-4094090-2-Task_Instances_Attributes-2354-CustomerPrintedName",
    "label": "Rebate Payee Printed Name",
    "value": "Michael Lynch",
    "displayValue": null,
    "templateParameters": null,
    "attributeName": "CustomerPrintedName",
    "uniqueFieldIdSource": "",
    "inventoryOptions": null,
    "dynamicOptions": null,
    "rendering": "textField",
    "formatter": "None"
  },
...
```

The response was thousands of lines long. It looked like all of the data I submitted in my rebate application, minus the photos and documents I uploaded.

To get that information, my browser sent an HTTP request that looked like this (I've replaced my actual application ID with `123456`):

```text
POST /traksmart4/public/guest/commercial/v2/application.json?projectId=123456 HTTP/1.1
Host: eversource.dsmcentral.com
Cookie: JSESSIONID=node0f7ynpnyr35zk1c91byqpx2x5n97179.node0;Path=/traksmart4;Secure
Content-Type: application/json
Content-Length: 27

{"programId":8,"formId":60}
```

The thing that caught my eye was that the URL path contained the words `public` and `guest`, which typically appear in URLs that are publicly accessible without a login.

The request from my browser was authenticated. The `Cookie` line was telling the server my login ID. But was the server even checking my login status?

To test whether the rebate portal server was checking logins, I made the exact same request but removed the `Cookie`. The rebate portal still returned all my private data. Uh oh.

My application ID is only six numeric digits, meaning less than 1 million possibilties. And I bet they're sequential, so anyone who visits the rebate portal can guess my project ID and see all of the information I submitted, including my name, phone number, mailing address, and vehicle identification number (VIN).

## What if a malicious user changes my application?

It's bad enough that the Eversource rebate portal leaks my personal information, but it gets worse. Here's what the login form looks like to access my application:

{{<img src="login.webp" max-width="500px" caption="The Eversource rebate portal allows me to log in with just my email address, zip code, and a six-digit application number.">}}

The insecure URL that dumps all of my data includes all of those fields. A malicious user can grab my application number, email address and zip code from the vulnerable URL, and then log in to my application as me. They could access all of my information, including the photos or documents I uploaded.

Worse, a malicious user can _change_ information in my rebate application, such as sending my rebate check to a different mailing address

## Reporting the vulnerability

The company that manages Eversource's rebate portal is called [Resource Innovations](https://www.resource-innovations.com/), and it looks like they run similar programs for [a bunch of electric utilities in other cities](https://kagi.com/search?q=site%3Adsmcentral.com%2Ftraksmart4&r=us&sh=f00VrZjIgxNXTRgLgLxsSA).

I emailed Resource Innovations' privacy@ email, explaining that I had found a serious vulnerability and wanted to connect with their security team to share details. I couldn't find a publicly listed security mailbox at Eversource, so I emailed Christopher Leigh, Eversource's Chief Information Security Officer.

I got a response the next day from Desireee Robinson, a VP of Information Security at Resource Innovations. She offered to meet me immediately on a video call to review the vulnerability, but the issue was so simple that we didn't even need a call. I just emailed her an example of the HTTP request that worked without authentication. She responded the following day to say they'd fixed the issue, and I confirmed I could no longer access the vulnerable URL without a valid login token.

Christopher Leigh, Eversource's CISO, never got back to me, but I did hear back from Karla Pickett from Eversource's "Executive Inquiry office." She said the vendor was "currently working to resolve this issue."

I asked both Karla Pickett and Desiree Robinson if they could share more details about what protections they put in place to better protect customers in the future. I also asked if they offered [bug bounties](https://en.wikipedia.org/wiki/Bug_bounty_program) for people who offer them coordinated disclosure of security issues. Neither of them responded to my follow-up questions.

As I was preparing screenshots for this blog post, I noticed another URL on the same UI flow was also exposing customer data without checking authentication. This time, it _only_ exposed my full name, home address, and application number. I reached out to Desiree Robinson again to report it. She responded seven minutes later to say she was investigating. I tried the URL the next day and saw that it was correctly checking authentication.

There's a lot to complain about here in terms of Eversource and Resource Innovations' engineering and security, but I will give them credit for one thing: they were extremely responsive. Except when I asked about compensation.

### Reporting timeline

- 2025-01-27 - I report to Eversource, Resource Innovations, and the Department of Public Utilities that I found a vulnerability I'd like to report.
- 2025-01-28 - Resource Innovations responds asking for details.
- 2025-01-28 - I share details of the vulnerability.
- 2025-01-29 - Resource Innovations reports that they have remediated the issue.
- 2025-02-05 - I report the same issue on another rebate portal URL to Resource Innovations.
- 2025-02-05 - Resource Innovations reports that they will begin work to remediate the issue.
- 2025-02-06 - I test the vulnerable URL again and see that it is now correctly enforcing authentication.

## What Massachusetts residents can do

As it happens, Eversource is in the process of [requesting taxpayer money to fund a new EV rebate program](https://eeaonline.eea.state.ma.us/dpu/fileroom/#/dockets/docket/12810).

Massachusetts residents may submit comments to the state about Eversource's proposal. According to the DPU, comments from MA residents carry weight in these filings, so if you care about EV programs, I encourage you to [submit a public comment](https://fileservice.eea.comacloud.net/V3.1.0/FileService.Api/file/aeiceiice?cwx+darBxD+W5AUrurWiy2+/gw0Qt7CkXyVPBodK3Q+PcSxI+blU344Khxm+qpOeg0hKFj9M9l/xQR8+/8GqPvdGgrFe6XR6ngIfa80wd3rxFD8G4j981M2Rna9aVTXA) by February 18, 2026 (see "Any person interested in commenting on this matter...").

There will also a public hearing on Zoom about Eversource's proposal this Wednesday (February 11).

### My wish list for the EV rebate program

For context: Eversource is not a neighborhood mom and pop electric company. They're a Fortune 500 company, reporting $1.3 billion in profit in the last 12 months.

Based on my experience with Eversource's current EV rebate program, they seem to be use public funds from Massachusetts residents and then shift as much work as possible onto those same residents.

The EV rebate application should be a 5-10 minute process where I submit a proof of purchase and wait for my check in the mail. Instead, it's taken me several hours over two months, and I still don't even know if my application will be approved. The vast majority of my work has been collecting documents and details that feel totally irrelevant to the program's purpose.

The fundamental problem is that what gets measured gets managed, but nobody is measuring the time Massachusetts residents spend dealing with Eversource's rebate program. As a result, Eversource minimizes their investment into the program, wasting residents' time and exposing their personal information.

Here what I'd like to see in Eversource's new EV rebate program:

- Eversource cannot require customers to create new online accounts as a requirement of the rebate.
  - The rebate form must be available through the standard Eversource customer portal.
  - A third-party vendor may administer the rebate portal, but the vendor must implement a secure [single sign-on (SSO)](https://en.wikipedia.org/wiki/Single_sign-on) flow so that customers don't need new accounts.
  - Eversource must pre-populate the rebate form with information they already have about the customer, such as their name, address, and account number.
- For homeowners who claim an EV charging rebate for their primary residence, the only required documentation should be (1) the make, model, and serial number of the charger, and (2) a receipt or invoice for the charger and electrical work.
  - The invoice does not need to be marked as paid.
  - The resident should not need to prove ownership of an EV, as it makes no sense to install an EV charger at a loss just to get a partial rebate.
- Eversource must hire, at their own expense, a Massachusetts-based web security firm to conduct an annual security audit of the rebate portal.
  - Eversource must provide these audit results to the MA DPU and fix any issues rated High or Critical within six weeks.
- Eversource must publish the following metrics quarterly:
  - The number of customers that begin the rebate application,
  - The number of customers that receive one or more claim rejections (regardless of eventual outcome),
  - The number of customers who successfully claim their rebate.
- Throughout the application process, Eversource must display the contact information for the specific Massachusetts DPU office that oversees the EV rebate program.
  - The contact information must be conspicuously displayed in rebate claim denials, allowing residents to appeal an incorrect rejection.
- The MA DPU must have the ability to audit EV charger rebate applications.
- If Eversource rejects an application and the DPU determines it was an invalid rejection, Eversource must pay the customer 150% of the requested rebate amount.
  - DPU must not reimburse Eversource for claims that involved an invalid rejection, even if they were later approved.

---

_Note: I've elided and changed unique identifiers in the HTTP requests shown to avoid leaking data about my own account._
