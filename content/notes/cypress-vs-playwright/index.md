---
title: "Cypress vs Playwright"
date: 2022-10-02T10:21:05-04:00
---

When I saw Gleb Bahmutov [demo Cypress at a 2018 meetup](https://youtu.be/wApmbgPGmqQ) in New York, I was blown away. I had begrudgingly used Selenium in the past, and Cypress was such a leap forward.

When I heard about Playwright, I wasn't that interested. I much preferred the scrappy open-source team to a big corporate product churned out by Microsoft. I took a look at Playwright a year ago and wasn't impressed. I found the documentation confusing and it didn't seem to offer many advantages over Cypress, so I went back to using Cypress.

# Revisiting Playwright

I tried it last year, and I

> 2022 one should not start a new project with Cypress. Playwright is simply so much better.

https://news.ycombinator.com/item?id=33049047

As an experiment, I tried porting PicoShare's 10 end-to-end tests from Cypress to Playwright, and I'm sorry to say that I agree with the Hacker News thread. From my experience with it so far, Playwright is better than Cypress in almost every dimension.

Using Playwright, I'm seeing all these things that were always an obstacle with Cypress but I either hadn't noticed or had gotten used to.

After trying it out for a day, I must say I agree. And it pains me to say it, as I have a soft spot for Cypress.

# What I like about Playwright

## Playwright is XX faster than Cypress

This is just a single data point and not a rigorous one, but I rewrote my Cypress tests in Playwright, and the same tests run in XX the time.

In development

|                                    | Cypress | Playwright | Difference |
| ---------------------------------- | ------- | ---------- | ---------- |
| Run tests on CircleCI              | 127s    | 84s        | XX         |
| Run tests from development machine | 40s     | 7s         | XX         |

For local development, it's not a big deal because you download it once and you're done. But when I run it in CI, I have to wait for CircleCI to download and decompress the full almost 1 GB image each time.

playwright:v1.26.0-focal-amd64 is 651 MB
cypress/included:10.9.0 is 940 MB

## Playwright has fewer gotchas

I didn't even realize until writing this that Cypress [now supports uploading files](https://www.cypress.io/blog/2022/01/19/uploading-files-with-selectfile/) as part of end-to-end tests, but it's another one that's a bit of a headscratcher that they [didn't support it for 7 years](https://github.com/cypress-io/cypress/issues/170).

There's been [a bug to support mouse hovering](https://github.com/cypress-io/cypress/issues/10) that's been open for almost eight years.

## Single, consistent set of assertions

Cypress has several different styles of assertions, which always confused me. There's `should`, `expect`, and `assert`

```javascript
cy.get("#error-message").should("be.visible");
```

```javascript
cy.get("#error-message").should(($el) => expect($el).to.be.visible);
```

With Playwright, the assertions are more consistent. There's just `expect` like `expect(locator).toBeVisible()`. The fact that they're proper TypeScript functions as opposed to string arguments you have to memorize means that auto-complete can help you remember syntax.

## Not resource constrained

How few things they've done. I submitted what I think is a pretty uncontroversial PR a year ago that they still haven't acknowledged, and I suspect they just don't have the resources to review external pull requests.

## Stack-agnositicism

One of the things that's always bothered me about Cypress is that it's designed around Node.js apps. It expects to live in the same `package.json` as your main app.

Playwright has built-in support for

The whole reason I wrote a tutorial was that it's complex enough to run Cypress outside of their

## GUI-agnosticism

Cypress also assumes that you run it locally.

Playwright works fine on a headless server.

## Everything's free

Cypress is funded by their hosted SaaS. But Cypress is one of the few open-source SaaS products where the paid version would actually make my experience worse. The paid version gives you access to the Cypress web dashboard, but that creates a whole new external dependency for me. And I like the setup I have in CircleCI. I don't want to learn another vendor-specific CI.

I'm sad to list this because I know Playwright only does this because Microsoft has unlimited resources to throw at Playwright, so they don't care about making money from it directly, but it makes it much easier to

## Test recordings actually work

For some reason, the tests recordings would 90% of the time get stuck and not record what I want.

## Test ID shortcuts

await page.locator("data-test-id=log-in").click();

## Playwright makes it easier to navigate the shadow DOM

```javascript
cy.get("#upload-result upload-links")
  .shadow()
  .find("#verbose-link-box")
  .shadow()
  .find("#link")
  .should("be.visible");
```

```javascript
await expect(
  page.locator("#upload-result upload-links #verbose-link-box #link")
).toBeVisible();
```

## Playwright starts your app for you

Cypress assumes that your app is already running and lets you figure out how to

https://docs.cypress.io/guides/continuous-integration/introduction#Boot-your-server

## Playwright requires less domain-specific knowledge

A perfect example is grabbing a URL.

[The bug](https://github.com/cypress-io/cypress/issues/1417) has been open for four years, and Cypress recently stated that they currently have no plans to support it.

```javascript
// Find the link to the guest upload URL.
const guestLinkElement = page.locator(
  '.table td[test-data-id="guest-link-label"] a',
  {
    hasText: "For e2e testing",
  }
);
expect(guestLinkElement).toBeVisible();

// Save the route to the guest link URL so that we can return to it later.
const guestLinkRouteValue = await guestLinkElement.getAttribute("href");
expect(guestLinkRouteValue).not.toBeNull();
const guestLinkRoute = String(guestLinkRouteValue);

// Log out.
await page.locator(".navbar-end .navbar-item.is-hoverable").hover();
await page.locator("#navbar-log-out").click();
await expect(page).toHaveURL("/");

// Make sure we can still access the guest link after logging out.
await page.goto(guestLinkRoute);

// Continue with the test.
```

Here's how I would have to do [the same thing in Cypress](https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Closures):

```javascript
// Save the route to the guest link URL so that we can return to it later.
cy.get('.table td[test-data-id="guest-link-label"] a')
  .invoke("attr", "href")
  .then(($href) => {
    // Log out.
    cy.get("#navbar-log-out").click();
    cy.location("pathname").should("eq", "/");

    // Make sure we can still access the guest link after logging out.
    cy.visit($href);

    // Continue with the test
  });
```

In other words, every time I want to store a value, I have to add a layer of nesting. Being able to just `await` the function and store a normal variable is so much easier.

In addition to supporting `await`, it's nice to be able to use `console.log` instead of a [Cypress-specific `cy.log`](https://docs.cypress.io/api/commands/log). And when I needed to write a reusable helper method to automate the login sequence, Playwright let me write it in normal JavaScript, whereas Cypress requires it to be a custom [Cypress command](https://docs.cypress.io/api/cypress-api/custom-commands) that must adhere to specific naming conventions and has its own API.

## VS Code Integration

There's an official VS Code plugin, which gives you auto-complete, which is something I've been missing.

# What I miss about Cypress

## Small, indepdentent team

I like Gleb Bahmutov, and I liked supporting his product. He was very gracious in giving me feedback about my Cypress tutorial, and when I published it, he generously promoted it in Cypress' channels.

## Cypress' syntax feels more intuitive

I'm still not used to the `await`s everywhere. The Cypress syntax feels much more intuitive to me.

## Test artifacts work in CI

## The Docker image actually contains the software

There must be some good reason for this since both Cypress and Playwright do this, but the Docker images don't actually contain the software. That is, the Playwright Docker image does not contain Playwright and the Cypress Docker image doesn't contain Cypress. Instead, the Docker images contain the _dependencies_ you need to install Playwright or Docker respectively. So the first step after launching the Playwright Docker image is to install Playwright.

When I complained about this for Cypress, they added a special cypress/included image that actually does contain Cypress.