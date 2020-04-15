---
title: Stripe is Silently Recording Pageviews on Its Customers' Sites
---

Other solutions I considered:

* Load checkout in a dedicated iframe
  * I'm not sure how to load the stripe.js package without infecting the rest of my app
* Create a dedicated WebComponent
  * I'm not sure if scripts can escape a WebComponent and access the page.
  * I've never made a WebComponent before
* Host the subscribe page on a separate domain
  * Couldn't think of a way to do this cleanly without splitting my supporting code across multiple repos.