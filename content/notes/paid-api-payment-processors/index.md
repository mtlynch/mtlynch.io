---
title: "Trying to find a payment processor for a paid API"
date: 2023-10-14T07:42:34-04:00
---

Supports usage based billing / metered billing

Acts as merchant of record

Nice to have:

- Provider has their own sign-up flow so I don't have to implement it.

## Overview

| Provider     | Fees | Support for metered billing | Onboarding experience | Overall experience |
| ------------ | ---- | --------------------------- | --------------------- | ------------------ |
| RapidAPI     | 23%  | C                           | A-                    | D                  |
| LemonSqueezy | 5%   | B                           | C                     | XX                 |
| Paddle       | 5%   | B-                          | C+                    | XX                 |

## LemonSqueezy

Seems indie friendly.

I contacted them through their support portal asking about payment thresholds, and they said they'd get back to me in a few hours, and I never heard back.

Setup was pretty straightforward. Requires manual review before my store can be approved.

I like the automatic subscription management portal and that I can host on a custom domain.

{{<img src="lemonsqueezy-settings.png" max-width="550px" has-border="true">}}

Doesn't make it obvious to the user that they're paying for usage. It tells them they have a $0 bill.

{{<img src="zero-dollar-bill.png" max-width="550px" has-border="true">}}

Email confirmation is better:

{{<img src="email-confirmation.png" max-width="550px" has-border="true">}}

No language SDKs, but their APIs do confirm to json:api, so it's a little easier to use them.

Not seeing usage thresholds, but you can manually invoice a customer midway through a billing cycle or set billing to weekly.

{{<img src="manual-invoice.png" max-width="550px" has-border="true">}}

No dev support in the web dashboard. Stripe is very dev-oriented and shows API identifiers for customers and subscriptions, but LemonSqueezy doesn't show that anywhere in the UI, so I'd have to write custom code to find these identifiers.

JSONAPI is ugly

Was able to make usage based API calls okay.

Currently trying to figure out if user can see their usage anywhere or if I'm responsible for showing that. Would be no worse than RapidAPI.

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

## Other providers that don't meet my criteria

### Stripe

They seem to have very nice support for metered billing, including a customer dashboard that shows metered usage and allowing you to set billing thresholds, but they're not a merchant of record.

### Lago

Not self-serve, need to book a demo with them. No published pricing for hosted version.

Not merchant of record, not even a payment gateway. They can integrate with Paddle and have Paddle act as merchant of record.

### FastSpring

Doesn't suport usage-based billing.

They kind of do in that you're allowed to bill the customer every time they use a service, but my service is $0.02 per parse, so they'd be charged thousands of times for smaller than the minimum probably.

### Chargebee

Doesn't say whether they're merchant of record, so they're probably not.

Docs say you have to figure out your own tax rate: https://www.chargebee.com/docs/2.0/us-sales-tax.html

### Reach

https://www.withreach.com/

Doesn't support metered billing.
