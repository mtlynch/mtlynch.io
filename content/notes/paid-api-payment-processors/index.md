---
title: "All the Payment Platforms Suck for Small-Scale Paid APIs"
date: 2024-03-03T00:00:00-04:00
---

In 2018, I created [a simple API](https://zestfuldata.com) that converts plain recipe ingredients into software-friendly structured data. If you give it an ingredient like `"2 1/2 tablespoons finely chopped parsley"`, my API parses it into this:

```json
{
  "quantity": 2.5,
  "unit": "tablespoon",
  "product": "parsley",
  "preparationNotes": "finely chopped",
  "usdaInfo": {
    "fdcId": "170416",
    "matchMethod": "exact",
    "category": "Vegetables and Vegetable Products",
    "description": "Parsley, fresh"
  }
}
```

It's not much, but the API has generated $22k in total revenue over the past six years (after platform fees). I put it into maintenance mode back in 2020, but the API still brings in about $150/month of passive income.

Customers purchase access to my API through a service called RapidAPI. I've always been dissatisfied with that platform. Their user interface is atrocious, they do a terrible job at preventing abuse, and their customer service is rarely helpful.

In September 2023, RapidAPI allowed a user to rack up [$14k in usage fees](/retrospectives/2023/10/#i-need-to-migrate-away-from-rapidapi-for-spite) against my service but didn't try to bill them at all until two months later. Naturally, they collected nothing at all from the user. Worse, RapidAPI didn't even ban the abusive user or deactivate their account.

RapidAPI's terrible handling of the abuse situation prompted me to search for alternative payment processors that are compatible with a paid API service. I sadly couldn't find any attractive option, but I'm sharing my the results of my investigation in case they're helpful to other indie API vendors.

## What I want from a payment processor

### Must-haves

- Provider acts as a merchant of record for tax purposes.
  - Otherwise, I'm responsible for calculating sales tax and filing taxes in potentially hundreds of tax jurisdictions.
  - If the provider is a merchant of record, they are responsible for paying all sales tax, and you're just responsible for paying income tax on the revenue they collect for you.
- Provider supports usage-based billing ("metered billing").
  - Some customers want to make hundreds of API calls per day, and others want to make hundreds of thousands, so I want to let customers pay for exactly what they use.
- Provider publishes their pricing.X
  - No "call us for pricing."
- Provider allows you to use their services in a self-serve flow.
  - No "contact us to book a demo."

### Nice-to-haves

- Provider offers a built-in sign-up flow for end-users, so I don't have to implement it.
- Provider can proxy my API and do their own usage calculations and authentication rather than me reporting usage to them.

## Summary

### Providers who meet my criteria

| Provider     | Fees | Support for metered billing | Onboarding experience | Overall experience |
| ------------ | ---- | --------------------------- | --------------------- | ------------------ |
| Paddle       | 5%   | B-                          | C+                    | C                  |
| RapidAPI     | 23%  | C                           | A-                    | D                  |
| LemonSqueezy | 5%   | B                           | C                     | D-                 |

### Payment gateways who don't meet my criteria

- Stripe
  - They're not a merchant of record.
  - I wish they were because they seem to meet all my other criteria well.
  - They can [calculate and collect sales tax](https://stripe.com/tax) for you and show you what you owe, but you're still responsible for filing and paying sales tax in every jurisdiction where you have customers.
- Lago
  - They're not a merchange of record.
  - They're not even a payment gateway, but they can integrate with other payment gateways.
  - They have no published pricing for their product. You have to book a demo with them.
- FastSpring
  - They don't support suport usage-based billing.
  - I theoretically could force usage-based billing in that FastSpring allows me to bill the customer every time they use my service, but my service is $0.02 per parse, so I'd have to charge my customers' credit cards hundreds or thousands of times per month for tiny amounts.
- Chargebee
  - I couldn't find anything on their website saying whether they are or are not a merchant of record, which means they're probably not.
  - Their [docs say](https://www.chargebee.com/docs/2.0/us-sales-tax.html) you have to figure out your own tax rate, which strongly implies they're not a merchant of record.
- [Reach](https://www.withreach.com/)
  - They don't support metered billing.

## LemonSqueezy

LemonSqueezy initially seemed like they'd be a great match for me. They cater to small-scale vendors, and they have simple options to match my simple needs.

### Confusing support for metered billing

LemonSqueezy's UI seemed to support metered billing exactly how I want. It took me a few tries to figure out how to map my intended usage onto LemonSqueezy's UI semantics. I eventually figured out that I could do what I want by choosing a "Subscription" pricing mode with "Volume pricing" as my model. Then I selected "$0.02" as the price for each unit, which would be the price for each ingredient conversion through my API.

{{<img src="lemonsqueezy-settings.png" max-width="550px" has-border="true" caption="LemonSqueezy makes it easy for vendors to set up metered billing.">}}

The problem with LemonSqueezy is that they're bad at conveying to end-users that my service is billed by usage. When a customer signs up for my API through LemonSqueezy, the checkout page erroneously tells them that the cost is $0.00:

{{<img src="zero-dollar-bill.webp" max-width="550px" has-border="true" caption="LemonSqueezy incorrectly tells usage-based API customers that their bill will be $0.00.">}}

LemonSqueezy sends customers an email confirmation after they sign up, and that makes it clearer that the bill depends on usage and is not always $0:

{{<img src="email-confirmation.png" max-width="550px" has-border="true">}}

One of

When I signed up as an end-user through LemonSqueezy, I couldn't find anything in the user portal to show me what my usage charges were, so I think the API provider is responsible for creating that UI for their end users.

### Slow response from customer support

I contacted them through their support portal asking about payment thresholds, and they said they'd get back to me in a few hours. I didn't hear back for a full month, though when I did, it was from Gilbert Pellegrom, LemonSqueezy's CTO and co-founder.

### Onboarding

Setup was pretty straightforward. Requires manual review before my store can be approved, but that process only took one day.

I like the automatic subscription management portal and that I can host on a custom domain.

### Billing thresholds

LemonSqueezy's CTO confirmed that they don't support billing thresholds (i.e., charge the customer's card every $500), but you can manually invoice a customer midway through a billing cycle or set billing to weekly.

{{<img src="manual-invoice.png" max-width="550px" has-border="true">}}

### Developer experience

LemonSqueezy's main focus is as a simple checkout for digital goods. If you have a PDF or a video you want to sell, LemonSqueezy

LemonSqueezy's support for developer-focused products (e.g., paid API services) is much less mature. And you see it very distinctly in the admin UI. If you've used a dev-oriented service like Stripe or Paddle, you're used to a UI that shows you programmatic identifiers for everything you can see in the admin UI.

{{<img src="paddle-ids.png" max-width="800px" has-border="true" caption="Paddle's admin UI makes it easy to access programmatic IDs for every object available through the web interface.">}}

In LemonSqueezy's admin UI, certain identifiers are just not available. LemonSqueezy will show you customers and subscriptions in the admin UI, but there's no way to find out a customer's subscription ID from the

{{<img src="jane-test.webp" max-width="500px" has-border="true" caption="LemonSqueezy shows me customers and subscriptions in the admin UI, but there's no way to find their programmatic identifiers via the web interface.">}}

To work around LemonSqueezy omitting identifiers in the web UI, to get customer's subscription IDs, I have to do it programmatically, like this:

```bash
curl "https://api.lemonsqueezy.com/v1/subscriptions" \
  -H 'Accept: application/vnd.api+json' \
  -H 'Content-Type: application/vnd.api+json' \
  -H "Authorization: Bearer ${LEMONSQUEEZY_API_KEY}" | python3 -m json.tool
```

LemonSqueezy's API is also a bit awkward. With most other vendors, to bill customer `12345` for 25 units of service, I'd expect to POST something like `{ "subscriptionID": 12345, "usage": 25}`.

Here's what the API call looks like in LemonSqueezy:

```bash
curl "https://api.lemonsqueezy.com/v1/usage-records" \
     -H 'Accept: application/vnd.api+json' \
     -H 'Content-Type: application/vnd.api+json' \
     -H "Authorization: Bearer ${LEMONSQUEEZY_API_KEY}" \
     -d '{
  "data": {
    "type": "usage-records",
    "attributes": {
      "quantity": 25,
      "action": "increment"
    },
    "relationships": {
      "subscription-item": {
        "data": {
          "type": "subscription-items",
          "id": "12345"
        }
      }
    }
  }
}'
```

### LemonSqueezy summary

- Pros
  - They have a simpler interface than most other vendors.
  - They seem to be rapidly iterating and adding functionality.
  - I did get a response directly from their CTO, albeit a month late.
- Cons
  - Their focus is on one-time sales and not subscriptions or metered billing.
  - They don't show end-users what usage they've accrued on their bill. In some places, they incorrectly tell customers their bill is $0.
  - Their developer experience for vendors is a bit weak.

## Paddle

Several indie services I use use Paddle.

Sandbox is a totally separate account rather than a mode?

I like that there's direct email support rather than a support web UI where my message just disappears.

They seem to have acquired m3ter, but m3ter is super complicated. Four steps including custom code before you even call an API? No thanks.

{{<img src="m3ter-oauth.png" max-width="550px" has-border="true">}}

The subscription modifier seems easy enough because I can just add $0.02 to the customer's next bill:

https://developer.paddle.com/classic/api-reference/dc2b0c06f0481-create-modifier

Shows API IDs in the dashboard.

No SDK but this third-party one looks decent:

https://github.com/Fakerr/go-paddle

I like his product and I've used it in the past.

Michal Mazurek

https://jasminek.net/blog/post/paddle-problems/

https://jasminek.net/blog/post/payment-solutions/

```bash
PADDLE_VENDOR_ID='15062' # Sandbox
PADDLE_AUTH_CODE='[redacted]' # Sandbox
PADDLE_SUBSCRIPTION_ID='sub_01hcq7a0e33vs9ct0thy0nrjg0' # Sandbox

curl \
  -X POST \
  -d "vendor_id=${PADDLE_VENDOR_ID}" \
  -d "vendor_auth_code=${PADDLE_AUTH_CODE}" \
  -d "subscription_id=${PADDLE_SUBSCRIPTION_ID}" \
  -d 'modifier_recurring=false' \
  -d 'modifier_amount=0.02' \
  -d 'modifier_description=Ingredient parse - 1 ingredient' \
  https://sandbox-vendors.paddle.com/api/2.0/subscription/modifiers/create
```

They don't know how to use HTTP status codes?

```text
HTTP/2 200
content-type: application/json
content-length: 100

{
  "success": false,
  "error": {
    "code": 107,
    "message": "You don't have permission to access this resource"
  }
}
```

New API docs but they don't seem to cover subscription modifiers.

No response from support after four days.

Had to do weird ID verification where I have to upload my ID and a video of me saying numbers and turning my head.

Sent a second email, got a response from a bot who couldn't answer any questions.

Had to send to different email address specifically for sellers.

Paddle required a utility bill after I did verification. Accidentally verified my bank early.

Bizarre bank payout process where they need my bank's address rather than auto-populating. Can only pay out above $100.

### Gotcha: Minimum increment is 70 cents

Even though calling the API seems to work, it doesn't do anything, at least in Sandbox. Only the preview announces the problem.

Made me have to add a database to my app

```bash
curl \
  --request POST \
  --url "https://sandbox-api.paddle.com/subscriptions/${PADDLE_SUBSCRIPTION_ID}/charge/preview" \
  --header "Authorization: Bearer ${PADDLE_AUTH_CODE}" \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --data '{
  "items": [
    {
      "price_id": '"${PADDLE_INGREDIENT_PARSE_PRICE_ID}"',
      "quantity": 1
    }
  ],
  "effective_from": "next_billing_period"
}' | python3 -m json.tool
```

```json
{
  "error": {
    "type": "request_error",
    "code": "subscription_update_transaction_balance_less_than_charge_limit",
    "detail": "Unable to charge for Subscription update: Transaction balance is less than what we can charge. Transaction balance: 2, Minimum payment amount: 70, Currency code: USD",
    "documentation_url": "https://developer.paddle.com/v1/errors/subscriptions/subscription_update_transaction_balance_less_than_charge_limit"
  },
  "meta": {
    "request_id": "f020a3ce-d207-476a-ae20-0bc88256c73e"
  }
}
```

```json
{
  "data": {
    "id": "sub_01hjxmy7m33j3jmhn9wzpqmx83",
    "status": "active",
    "customer_id": "ctm_01hgvsdw65p09cj9t7hv2sky3d",
    "address_id": "add_01hgvsemy48jwcqdpvfwbyrcj5",
    "business_id": null,
    "currency_code": "USD",
    "created_at": "2023-12-30T15:19:33.763Z",
    "updated_at": "2023-12-30T15:47:58.02Z",
    "started_at": "2023-12-30T15:19:33.763Z",
    "first_billed_at": "2023-12-30T15:19:33.763Z",
    "next_billed_at": "2024-01-30T15:19:33.763Z",
    "paused_at": null,
    "canceled_at": null,
    "collection_mode": "manual",
    "billing_details": {
      "enable_checkout": true,
      "purchase_order_number": "",
      "additional_information": "",
      "payment_terms": {
        "frequency": 2,
        "interval": "week"
      }
    },
    "current_billing_period": {
      "starts_at": "2023-12-30T15:19:33.763Z",
      "ends_at": "2024-01-30T15:19:33.763Z"
    },
    "billing_cycle": {
      "frequency": 1,
      "interval": "month"
    },
    "scheduled_change": null,
    "items": [
      {
        "status": "active",
        "quantity": 1,
        "recurring": true,
        "created_at": "2023-12-30T15:19:33.763Z",
        "updated_at": "2023-12-30T15:19:33.763Z",
        "previously_billed_at": "2023-12-30T15:19:33.763Z",
        "next_billed_at": "2024-01-30T15:19:33.763Z",
        "trial_dates": null,
        "price": {
          "id": "pri_01hcq71ae5f3n7nchmd8axgr7n",
          "product_id": "pro_01hcq59kyq4cvz3d1pv4w2ytbt",
          "description": "API access",
          "tax_mode": "account_setting",
          "billing_cycle": {
            "frequency": 1,
            "interval": "month"
          },
          "trial_period": null,
          "unit_price": {
            "amount": "99",
            "currency_code": "USD"
          }
        }
      }
    ],
    "custom_data": null,
    "management_urls": {
      "update_payment_method": null,
      "cancel": "https://sandbox-buyer-portal.paddle.com/subscriptions/sub_01hjxmy7m33j3jmhn9wzpqmx83/cancel?token=pga_eyJhbGciOiJFZERTQSIsImtpZCI6Imp3a18wMWhkazBuOHF3OG55NTJ5cGNocGNhazA1ayIsInR5cCI6IkpXVCJ9.eyJpZCI6InBnYV8wMWhqeHBqOHRtNWNyMGJtZjJ4Y2oyZWNhcyIsInNlbGxlci1pZCI6IjE1MDYyIiwidHlwZSI6InN0YW5kYXJkIiwidmVyc2lvbiI6IjEiLCJ1c2FnZSI6Im1hbmFnZW1lbnRfdXJsIiwic2NvcGUiOiJjdXN0b21lci5zdWJzY3JpcHRpb24tcGF5bWVudC51cGRhdGUgY3VzdG9tZXIuc3Vic2NyaXB0aW9uLXBheW1lbnQucmVhZCBjdXN0b21lci5zdWJzY3JpcHRpb24tY2FuY2VsLmNyZWF0ZSBjdXN0b21lci5zdWJzY3JpcHRpb24ucmVhZCIsImlzcyI6Imd1ZXN0YWNjZXNzLXNlcnZpY2UiLCJzdWIiOiJjdG1fMDFoZ3ZzZHc2NXAwOWNqOXQ3aHYyc2t5M2QiLCJleHAiOjE3MzU1NzM2NzgsImlhdCI6MTcwMzk1MTI3OH0.Q-OW8H9at4Sxp9bbmq-14DRGIXV_t6gI7gqu4fZcclK43LwUdoBtXD_GIbo6kjvp62pOchg1tnuMO04lYNOaAQ"
    },
    "discount": null,
    "import_meta": null
  },
  "meta": {
    "request_id": "35f1f073-b160-4aa0-92e0-7319ec55e99f"
  }
}
```

### Paddle summary

- Pros
- Cons

## RapidAPI

### RapidAPI summary

- Pros
- Cons

## Conclusion: Begrudgingly stick with RapidAPI
