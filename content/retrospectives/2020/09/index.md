---
title: "TinyPilot: Month 2"
date: 2020-09-01T09:17:34-04:00
description: TODO - One-line summary
---

## Highlights

*

## Goal Grades

At the start of each month, I declare what I'd like to accomplish. Here's how I did against those goals:

### Sell 30 TinyPilot kits

* **Result**: Sold 16 TinyPilot kits
* **Grade**: C

I was on track to beat my goal, but then a [wrench got caught in the gears](#why-oh-y-cables), and I had to pause sales.

### Test three new marketing channels

* **Result**: Didn't test any marketing channels
* **Grade**: F

For the same reasons as above, I postponed marketing efforts until I had a product for sale again.

### Implement TinyPilot support for mouse integration

* **Result**: [Added mouse support](https://github.com/mtlynch/tinypilot/pull/125) for TinyPilot
* **Grade**: A

This ended up being more difficult than I expected, but I completed the feature right at the end of the month. Integrating the mouse improved the user experience more than I anticipated.

## TinyPilot Stats

| Metric             | July 2020     | August 2020   | Change                                         |
| ------------------ | ------------- | ------------- | ---------------------------------------------- |
| Unique Visitors    | 4,930         | 2,284         | <font color="red">-2,646 (-54%)</font>         |
| Total Pageviews    | 10,427        | 6,136         | <font color="red">-4,291 (-41%)</font>         |
| Sales Revenue      | $8,741.37     | $3,030.74     | <font color="red">-$5,710.63 (-65%)</font>     |
| Donations          | N/A           | $94.06        | <font color="green">+$94.06 (+inf%)</font>     |
| **Total Earnings** | **$8,741.37** | **$3,124.80** | **<font color="red">-$5,616.57 (-64%)</font>** |

## Why, oh Y-cables?

## I can manufacture something from scratch in two weeks?

The engineering firm completed their investigation on Thursday, August 27th. The same day, I asked them to design an electronic component that would address TinyPilot's power issue. The design was ready the next day, and they printed 100 circuit boards.

At the time of this writing, the circuit boards are en-route to the design firm, where they'll be assembled.

Simultaneously, I contacted a 3D printing design shop and asked them to design an enclosure so that I'm not just shipping customers a bare circuit board with some wires sticking into it. They completed the designs in two business days, and they're in the process of printing the first three prototypes. They have capacity to print 100 in under two days.

If everything goes well, the case and boards could be ready for shipping as early as next week. That would mean that we went from zero to a completed physical product in under two weeks. Including parts and labor, the total cost per unit this run is on track for ~$13. Even for a simple project like this, I had no idea turnaround time and cost could be that low.

## HID descriptors are the devil

When you connect a USB keyboard or mouse to a computer, the USB device announces itself to the host in the form of a USB HID descriptor. Because TinyPilot impersonates a keyboard and mouse.

Debugging it is a pain because once you announce the HID descriptor, you can't revise your announcement (as far as I know). So you have to reboot the entire Raspberry Pi and try again.

It's a binary blob that looks like this:

```c
// HID descriptor for a keyboard
// Source: https://www.kernel.org/doc/html/latest/usb/gadget_hid.html
static struct hidg_func_descriptor my_hid_data = {
      .subclass               = 0, /* No subclass */
      .protocol               = 1, /* Keyboard */
      .report_length          = 8,
      .report_desc_length     = 63,
      .report_desc            = {
              0x05, 0x01,     /* USAGE_PAGE (Generic Desktop)           */
              0x09, 0x06,     /* USAGE (Keyboard)                       */
              0xa1, 0x01,     /* COLLECTION (Application)               */
              0x05, 0x07,     /*   USAGE_PAGE (Keyboard)                */
              0x19, 0xe0,     /*   USAGE_MINIMUM (Keyboard LeftControl) */
              0x29, 0xe7,     /*   USAGE_MAXIMUM (Keyboard Right GUI)   */
              0x15, 0x00,     /*   LOGICAL_MINIMUM (0)                  */
              0x25, 0x01,     /*   LOGICAL_MAXIMUM (1)                  */
              0x75, 0x01,     /*   REPORT_SIZE (1)                      */
              0x95, 0x08,     /*   REPORT_COUNT (8)                     */
              0x81, 0x02,     /*   INPUT (Data,Var,Abs)                 */
              0x95, 0x01,     /*   REPORT_COUNT (1)                     */
              0x75, 0x08,     /*   REPORT_SIZE (8)                      */
              0x81, 0x03,     /*   INPUT (Cnst,Var,Abs)                 */
              0x95, 0x05,     /*   REPORT_COUNT (5)                     */
              0x75, 0x01,     /*   REPORT_SIZE (1)                      */
              0x05, 0x08,     /*   USAGE_PAGE (LEDs)                    */
              0x19, 0x01,     /*   USAGE_MINIMUM (Num Lock)             */
              0x29, 0x05,     /*   USAGE_MAXIMUM (Kana)                 */
              0x91, 0x02,     /*   OUTPUT (Data,Var,Abs)                */
              0x95, 0x01,     /*   REPORT_COUNT (1)                     */
              0x75, 0x03,     /*   REPORT_SIZE (3)                      */
              0x91, 0x03,     /*   OUTPUT (Cnst,Var,Abs)                */
              0x95, 0x06,     /*   REPORT_COUNT (6)                     */
              0x75, 0x08,     /*   REPORT_SIZE (8)                      */
              0x15, 0x00,     /*   LOGICAL_MINIMUM (0)                  */
              0x25, 0x65,     /*   LOGICAL_MAXIMUM (101)                */
              0x05, 0x07,     /*   USAGE_PAGE (Keyboard)                */
              0x19, 0x00,     /*   USAGE_MINIMUM (Reserved)             */
              0x29, 0x65,     /*   USAGE_MAXIMUM (Keyboard Application) */
              0x81, 0x00,     /*   INPUT (Data,Ary,Abs)                 */
              0xc0            /* END_COLLECTION                         */
      }
};
```

For keyboards, it was easy. Lots of people had implemented fake keyboards in Python, and the process was well-documented.

Implementing a fake mouse was much harder and required me to learn more about how HID descriptors worked. Because keyboards are pretty bland. They type keys and that's about it. With mice, there are lots of variants depending on what kind of mouse you want to be. Do you have two buttons or eight? Do you have a scrollwheel? Do you have a horizontal scrollwheel? Do you send relative movements (like a traditional mouse) or do you send absolute positions (like a touchpad)?

The USB foundation has published this HID descriptor tool, an old-looking Windows application that *kind of* helps you create descriptors. It's pretty limited in that it only reads descriptors in a special `.hid` file format, but nobody publishes their example descriptors that way.

## Legacy projects

Here are some brief updates on projects that I still maintain but are not the primary focus of my development:

### [Is It Keto](https://isitketo.org)

I switched from AdSense to AdThrive, and it's been rockier than I expected. The onboarding process is very slow. They'll ask me to fill out some form, wait a week, ask me to fill out another form, and on and on. 

Finally, we finally got to the point of switching my site over to AdThrive ads, and it turned out that their JavaScript snippet didn't work on single-page apps. I get that a lot of their clients probably have WordPress sites, but c'mon! An SPA shouldn't be such a curveball in 2020.

That was a whole new can of worms because they kept on sending me broken, hacky JavaScript that was supposed to make my site compatible, I'd run it, report to them that it didn't work, they'd send me a new JavaScript snippet that was broken in a different way.

Finally, I convinced them to host the code on their side and cut me out of the debug loop. I'm not crazy about the fact that they're pushing code to production where the testing seems to be minimal to zero, but I don't have bandwidth to worry about it at the moment.

### [Zestful](https://zestfuldata.com)

Things are still quiet at Zestful, though I'm evaluating a new API marketplace. I've always been desperate for an alternative to my current platform, RapidAPI. A new company called Servernope approached me inviting me to their API platform. I told them that I didn't have time to set it up, but if they wanted to do it for me, I'd do that. So they [did](https://www.servernope.com/store/service/ZestfulData/Zestful).

I can't really tell so far. Their metrics aren't very good, so either nobody has ever called my API from their platform or they just don't track free calls.

## Recommendations

### PirateShip

### FORGE?

## Wrap up

### What got done?

* Set up eBay listings to sell TinyPilot internationally.
  * I'm in the process of figuring out how to do it all through Shopify, but eBay is an easy interim solution.
* Published a new blog post: ["How I Collected a Debt from an Unscrupulous Merchant"](https://mtlynch.io/collect-debt/)

### Lessons learned

* When you're stuck on a hard problem, take a moment to improve your tools.
  * Refactoring is a valid debugging technique

### Goals for next month

*