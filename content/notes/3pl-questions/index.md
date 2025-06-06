---
title: "Questions to ask a potential 3PL vendor"
date: 2023-05-11
---

Over the past six months, I've been transitioning the fulfillment processes at my e-commerce business to a third-party logistics (3PL) vendor.

I didn't know anything about 3PLs before starting this process, so there were a lot of things I didn't know to ask about. Here are the list of questions that I recommend e-commerce merchants ask a 3PL if they're considering working with them for fulfillment.

## Customer profile

- Do you have other clients whose order volumes are similar to mine?
  - What's the minimum and maximum order volume you can support?
- Do you have other clients whose products are similar to mine in price?
- Do you have other clients whose products are similar to mine in weight and volume?

## Integration with e-commerce platforms

- What's the process of connecting to my e-commerce platform?
  - Do I install an app?
  - Do [I have to make you admin in my Shopify store?](/retrospectives/2023/04/#everyone-just-gives-us-their-admin-password)
- How quickly does your order management system sync with my e-commerce platform?
  - i.e., when you print a shipping label, how quickly do I see that reflected in Shopify?
- How do I present your shipping rates to my customers?
  - Can I present real-time shipping rates from your couriers or do we need to use flat shipping fees?

## Recordkeeping / auditing

- How often do you do stocktakes?
- Do I have access to your inventory tracking system?
  - If not, how frequently do you share reports of inventory counts and changes?
- How will you share records of inventory changes with me?
  - i.e., When did products arrive at your warehouse? When did they go out for customer orders? When did stocktakes happen?

## Schedule

- Which days of the week do you fulfill orders?
- What holidays do you observe?
- What's the typical turnaround time for fulfilling an order?

## Shipping

- Do you pass through postage costs directly from couriers or do you add a surcharge?
- Which shipping couriers and services do you support for domestic orders?
- Which shipping couriers and services do you support for international orders?
  - Can you ship international orders [delivered duty paid (DDP)](https://www.investopedia.com/terms/d/delivery-duty-paid.asp)?
- What's the cutoff time for same-day shipping?

## Payment

- What are your fees?
- How do you accept payment?
  - Do you charge a surcharge for different payment options (e.g., surcharge for credit cards)?

## Handling issues and unusual orders

- What's your error rate?
  - i.e., how often do customers receive the wrong item or wrong quantities?
- Who absorbs costs of a fulfillment error?
  - What if we have to re-ship with expedited shipping to meet a customer deadline?
  - What if you sent a more expensive item and the customer has already opened it or refuses to return it?
- Who absorbs costs for lost inventory at the warehouse?
  - e.g., warehouse confirms receipt of 100 items, ships 75 over the course of the next month, but the next stocktake shows only 23 remaining (100 - 75 - 23 = 2 are missing)
- How do we handle it if a customer [places an order and then emails me to make a change](/retrospectives/2023/02/#what-if-a-customer-changes-their-order)?
  - Will changes in my e-commerce platform immediately sync to your order management system?
- How do we handle it when a customer asks us to hold off on fulfilling an order?
  - What's the process of pausing fulfillment on an order?
  - Will your order management system recognize Shopify's "pause fulfillment" feature?

## Location

- Where are your warehouses located?
  - Note: Depending on your tax situation, fulfilling your orders from a warehouse in a state outside of your headquarters means you're responsible for collecting and paying sales tax in the warehouse's state. Keep this in mind, as filing taxes in a new state is a significant administrative burden.

## Insurance

- Does your insurance cover the value of our property?
- If not:
  - What year was the warehouse built?
  - How many stories does the warehouse have?
  - Does the warehouse have wood frame construction?
  - Does the warehouse have a sprinkler system?
