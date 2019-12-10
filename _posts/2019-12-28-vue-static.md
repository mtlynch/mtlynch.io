---
title: "Pre-Rendering Static Pages with Vue and Nuxt"
excerpt: The easiest way to improve SEO and social sharing for a single-page app.
tags:
- vue
- nuxt
---

In this post, I'll show you how to generate pre-rendered pages using Vue and Nuxt.

## Why pre-render?

In the last few years, the new hot thing in web development is single page apps (SPAs). The three big web development frameworks are Vue, React, and Angular, all of which generate SPAs.

There are two huge problems with SPAs: search engine optimization and social sharing.

For example, if you peek at the source for this blog post, you'll see an HTML tag like this:

```html
<meta name="description" content="{{ page.excerpt }}">
```

That's a suggestion to Google of how to render this article when it appears in search results.

Social sharing is more straightforward. If you share a URL on Twitter, Facebook, or Pinterest, they don't render your page using JavaScript, so any HTML tags need to be there before the page loads.

SPAs are called "single page" because all of the code is on one page. To the user, it may look like they're navigating to different pages, but they're, in fact, staying on the same page and JavaScript is just changing the page contents

## Why not use server-side rendering (SSR)?

The more common solution to populating these tags server side is to use server-side rendering. The problem is that, to leverage server-side rendering, you need to run a live web server. One of the draws of SPAs in the first place was that they didn't require a server. Who wants to maintain a whole node server just to serve a few pages? They'll render the same way every time, so why not just render them once and serve the result.

## How is this different than a regular single page app (SPA)?

Standard SPAs generate all their HTML in the browser. That doesn't

## What it's good for

* Landing pages
* Sites with unique functionality on each page

I used this template to implement the Zestful demo site as a static, pre-rendered site. Before that, it was an SPA

## What it's not good for

* Sites that rely heavily on user-generated content
  * The Vue + Nuxt solution requires you to know all of your page routes when you build your page. If users can add URLs to your site (e.g. yoursite.com/michael123/post/andf3j), the Vue + Nuxt template won't support you well.
* Blogs
  * If you have a site with lots of pages that have similar content and just differ in layout, consider a static site generator like Hugo or Jekyll.

## Pre-requisites

* [Node.js](https://nodejs.org/en/download/)

The only requirement for following along is that you have Node.js. I used [Node v12.13.1](https://nodejs.org/dist/v12.13.1/), which is the latest stable release at the time of this writing.

## A pre-rendered "Hello, world"

To start out, I'll show you a basic hello world 

Hooray! You pre-rendered a Vue app.

## A more realistic project template

Rendering two pages was probably the thrill of a lifetime, but I promised you HTML tags for SEO and social sharing. For the rest of the post, I'm going to show you how to build on the hello world example step by step until you have a project template with all the standard features you'd expect of a modern web app.

### Deploying to Firebase (optional)

Web apps are more fun when you can show your friends, so next I'm going to show you how to publish your app (for free).

I like Firebase's static hosting, but several other providers offer static hosting, including [Netlify](https://www.netlify.com/blog/2016/10/27/a-step-by-step-guide-deploying-a-static-site-or-single-page-app/), [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html), and [Google Cloud Storage](https://cloud.google.com/storage/docs/hosting-static-website).

### Adding a default layout

Okay, back to developing your app. We started out with two pages. I wrote them as two completely independent pages, but for real web apps, pages tend to share a lot of content. For example, navigation bars, footers, and HTML tags.

You can refactor common code out of your pages by creating a layout.

#### `layouts/default.vue`

```html
<template>
  <div class="app">
    <div class="nav horizontal-align">
      <nuxt-link class="nav-item" to="/">
        Home
      </nuxt-link>
      <nuxt-link class="nav-item" to="/about">
        About
      </nuxt-link>
    </div>
    <!-- The <nuxt> tag inserts the unique content for the particular page -->
    <nuxt class="container" />
  </div>
</template>

<style>
body,
html {
  padding: 0;
  margin: 20px;
  min-height: 100vh;
}
.nav-item {
  text-decoration: none;
  font-size: 1.2em;
}
</style>
```

Now, your pages have a navigation bar:

TODO: Screenshots of both pages.

### Setting unique page titles for SEO

You may have noticed that these pages have no title. Time to fix that!

#### `pages/index.vue`

```html
<template>
  <div>
    <h1>Hello, world!</h1>
    <p>I'm an example of a pre-rendered Vue webpage.</p>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Home page',
  },
};
</script>
```

#### `nuxt.config.js`

```javascript
export default {
  head: {
    titleTemplate: '%s | Hello World Vue Static',
  },
};
```

### Adding opengraph tags social sharing

### Adding a sitemap

### Adding robots.txt

### Handling 404s

### Adding a favicon

### Adding a Circle CI configuration

### Setting up Google Analytics

## The final product