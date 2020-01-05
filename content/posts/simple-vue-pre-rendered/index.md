---
title: A Simple Pre-Rendered Web App Using Vue + Nuxt
description: The easiest way to improve social sharing and SEO for a single-page app.
tags:
- vue
- nuxt
- SPAs
date: '2019-12-19'
images:
- simple-vue-pre-rendered/og-cover.jpg
---

In this post, I'll show you how to pre-render pages using Vue and Nuxt. This method combines the convenient development experience of Vue without forfeiting critical features like social sharing or search engine optimization.

This tutorial assumes no experience with Vue or Nuxt. I'll explain everything along the way.

## The problem with Vue

Like Angular and React, Vue is a framework for building single-page apps (SPAs). While traditional websites force the browser to download a whole new page every time the user clicks a link within your site, SPAs keep everything on a single page. When the user navigates around your site, JavaScript simply draws a new page without pulling everything down from the server again. This cuts out slow network calls between the user's browser and your web server, resulting in a user experience that feels speedy and smooth.

The tradeoff for Vue's responsiveness is that you have less control over your pages' initial HTML. When the browser fetches an SPA from the server, it receives HTML that looks something like the following:

```html
<html>
<head>
  <title>My Awesome Website</title>
</head>
<body>
  <div id="app"></div>
  <!-- app.js populates the rest of the page after the browser executes the script. -->
  <script type="text/javascript" src="app.js">
</body>
</html>
```

Because it's a _single page_ app, that HTML stub is the same for every page on your site. In other words, if the user visits `yoursite.com/about` or `yoursite.com/contact`, the server sends them the same HTML stub for both pages. JavaScript is responsible for for figuring out the path and drawing the appropriate page after it executes in the user's browser.

Dynamic page rendering is a neat innovation that makes site navigation faster, but it creates problems when you connect your site to social networks or search engines.

## SPA problem #1: Social sharing

When I share my blog posts on Twitter, they look like this:

{{< img src="twitter-card.jpg" alt="Example of a rich Twitter card" caption="Using Open Graph tags so that Twitter generates rich cards for my posts." maxWidth="590px" hasBorder="True" >}}

Twitter generates that card based on HTML tags in my page that follow the [Open Graph](https://ogp.me/) standard. For example, to specify the image in the card, I add a tag that looks like this:

```html
<meta property="og:image" content="https://mtlynch.io/post-42/cover.jpg" />
```

If your site is an SPA, then all of your pages share the same HTML skeleton and thus the same Open Graph tags. The dominant social networks like Twitter and Facebook require Open Graph tags to be present before any JavaScript executes. The result is that you can't create unique Twitter cards or Facebook cards for the different pages on your site.

## SPA problem #2: Search engine optimization (SEO)

Unlike social networking sites, search engines _do_ render websites using JavaScript. The problem is that [they can't do it perfectly](https://twitter.com/JohnMu/status/1018956456304037893).

Many websites use JavaScript to continuously update a page's contents while the user views it. From Google's perspective, when is a page "done" rendering and ready for indexing? With a regular SPA, Google tries to index your page, but you have no guarantee that they'll index it correctly.

## Nuxt to the rescue

On the modern web, social networks and SEO are fairly important, so it would be a huge bummer if using Vue meant that your app couldn't fully integrate with those services.

{{< img src="NuxtJS_Logo.png" alt="Nuxt.js logo" maxWidth="250px" linkUrl="https://nuxtjs.org/" >}}

[Nuxt](https://nuxtjs.org/) is the framework that addresses this issue. It adds a layer on top of Vue to move some of the browser's work back to the server. Instead of sending down a bare HTML stub and waiting for client-side JavaScript to render everything, Nuxt pre-processes the page server-side to generate more fully-rendered HTML.

## The problem with server-side rendering

Most people run Nuxt from their web server. This is known as "server-side rendering." When a user requests a page from the server, Nuxt builds the page on the fly server-side before sending it to the user's browser.

Server-side rendering cuts down on your app's initial page load because your server is absorbing some of the browser's work. But if all you want is to populate a few HTML tags for social sharing and SEO, it's crazy to add Nuxt and a whole Node.js server to your tech stack.

One of the biggest strengths of SPAs is that they're just static HTML, CSS, and JavaScript, so they don't require an application server at all. Simple file hosts like Google Cloud Storage and Amazon S3 can host a standard SPA. If you use server-side rendering, you have to graduate from static file hosting to an entire app server, which is more costly and complex.

Fortunately, there's an alternative to server-side rendering: pre-rendering. Instead of rendering pages on-demand in response to HTTP requests, Nuxt simply renders every page on your site in advance. This process generates static files, so you can still host your app anywhere you can host a standard SPA.

## Should you use pre-rendering?

Pre-rendering is not right for every situation. You'll need to decide what your app needs and whether that requires pre-rendering or server-side rendering or if you should stick with plain Vue. Below, I've included a few advantages and disadvantages to help you decide when to employ pre-rendering.

### Advantages of pre-rendering

- Allows you to have unique social sharing cards for each page on your site
- Improves page load time
  - Standard SPAs have to wait until the browser downloads and executes JavaScript before it starts rendering the page. With pre-rendering, users see your page before their browser executes any JavaScript.

### Disadvantages of pre-rendering

- Increases complexity over standard Vue
  - While pre-rendering is less complex than running Nuxt on a Node server, it's more complicated than running a fully client-side Vue app.
  - With pre-rendering, you have to mentally track whether code runs server-side or client-side and what context is available at the time the code executes.
- Prevents user-generated pages
  - Pre-rendering requires you to know all of your page routes when you build your page. It explicitly [does not support dynamic routes](https://nuxtjs.org/guide/routing#dynamic-routes).
  - If your site features user-generated content and you want, for example, users to have their own URLs after joining (e.g., `yoursite.com/users/michael123`), you can't do that with pre-rendering.
  - You can work around this by pushing some of your route into URL queries (e.g., `yoursite.com/users?id=michael123`) then pulling down the dynamic data client-side, but you still can't generate distinct social sharing tags for those pages.

## A pre-rendered "Hello, world"

To demonstrate pre-rendering, I'll show you a basic, pre-rendered "Hello, world!" app in just three files.

The only pre-requisite is [Node.js](https://nodejs.org/en/download/). I used [Node v12.13.1](https://nodejs.org/dist/v12.13.1/), which is the latest stable release at the time of this writing.

### `pages/index.vue`

The first file defines a page in the web app. The `pages/` folder has special meaning to Nuxt. It pre-renders separate pages for each `.vue` file it finds in the `pages/` folder. The name `index.vue` indicates that this is a root page, so it's what the user sees if they don't specify any path.

`index.vue` generates a simple "Hello, world!" page that displays a welcome message and a button. To showcase some of Vue's client-side functionality, the button updates its text every time the user clicks on it.

```html
<template>
  <div>
    <h1>Hello, world!</h1>
    <p>I'm an example of a pre-rendered Vue webpage.</p>
    <button v-on:click="count++">
      I have been clicked {{ count }} times
    </button>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        count: 0,
      };
    },
  };
</script>
```

### `package.json`

The `package.json` file tells Node.js how to build this app:

```javascript
{
  "name": "hello-world-vue-pre-rendered",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt --port 3600",
    "generate": "nuxt generate"
  }
}
```

### `nuxt.config.js`

Lastly, Nuxt requires a configuration file, even if it's empty:

```javascript
// Even though we have no Nuxt settings, this file is required.
```

### Running "Hello, world"

You can run this app [on Codesandbox](https://codesandbox.io/s/mystifying-sutherland-qgw4f):

<iframe
  src="https://codesandbox.io/embed/mystifying-sutherland-qgw4f?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="mystifying-sutherland-qgw4f"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

Alternatively, you can run the app on your local machine with the following commands:

```bash
git clone https://github.com/mtlynch/hello-world-vue-pre-rendered.git
cd hello-world-vue-pre-rendered
git checkout step-1

npm install
npm run dev
```

The app will run at [http://localhost:3600](http://localhost:3600).

### Pre-rendering your app

When you run `npm run dev`, you're using server-side rendering. Node runs a local development server and generates pages on-demand as you request them.

But I promised you _pre-rendered_ pages. With pre-rendered pages, you don't even need a web server, because it's a set of static files.

To pre-render your app, run the following command:

```bash
npm run generate
```

If you check the `dist/` folder, you'll see that Nuxt has pre-rendered your page:

```bash
$ find ./dist/ -type f
./dist/.nojekyll
./dist/200.html
./dist/index.html
./dist/_nuxt/7cef7880379068a94897.js
./dist/_nuxt/b10d0692e6306468ee9f.js
./dist/_nuxt/cae55ee8b1125819f113.js
./dist/_nuxt/ee10340617a3beab9da2.js
./dist/_nuxt/LICENSES
```

You can view these through a simple HTTP server, like Python2's SimpleHTTPServer:

```bash
cd dist
python -m SimpleHTTPServer 8123
```

Python will then spawn a web server that allows you to view your pre-rendered app at [http://localhost:8123](http://localhost:8123). Later, I'll show you how to [publish this app](#publishing-your-app) to a static file hosting service.

## Adding an About page

To make things more interesting, I'll add a second page to this app.

### `pages/about.vue`

This page uses Vue hooks to display information about how the page was rendered. I'll explain the code in more detail [below](#understanding-two-versions-of-the-about-page).

```html
<template>
  <div>
    <h1>About this Build</h1>
    <p v-if="buildTime">
      Nuxt pre-rendered this page at
      <b>{{ buildTime }}</b> (before the browser ever saw
      it).
    </p>
    <template v-else>
      <p>
        Vue generated this page client-side because you navigated here from
        another route on the same site.
      </p>
      <p>
        <a href="/about">Refresh the page</a> to see the pre-rendered version.
      </p>
    </template>
    <p>
      The browser loaded this page at
      <b>{{ loadTime }}</b>.
    </p>
    <p><nuxt-link to="/">Home</nuxt-link></p>
  </div>
</template>

<script>
  export default {
    asyncData() {
      // Don't re-evaluate buildTime when the client loads this page in the
      // browser.
      if (!process.client) {
        return {
          buildTime: new Date().toUTCString(),
        };
      }
    },
    // Vue evaluates data variables at page render time and again every time the
    // browser loads this page.
    data: function() {
      return {
        loadTime: new Date().toUTCString(),
      };
    },
  };
</script>
```

Here's a [live version](https://hello-world-vue-pre-rendered.web.app) of the About page:

<iframe
  src="https://hello-world-vue-pre-rendered.web.app/about"
  style="width:100%; height:230px; border:1px solid black; border-radius: 4px; overflow:hidden;"
  title="About this Build"
  sandbox="allow-scripts"
></iframe>

## Understanding two versions of the About page

The About page demonstrates how Nuxt and Vue work together to create a pre-rendered page. You should see two versions of the page depending on how you navigate the site.

{{< img src="about-versions.jpg" alt="Screenshot of different versions of About page" caption="The About page displays different information depending on how you arrived to the page." maxWidth="850px" hasBorder="True" >}}

If you start on the [`/about` page](https://hello-world-vue-pre-rendered.web.app/about), you should see the version on the left. If you start on the [root page](https://hello-world-vue-pre-rendered.web.app), then click the "about page" link, you should see the version on the right.

Why do you see two different versions of the page? The answer is in the [`asyncData` hook](https://nuxtjs.org/api/). This function executes at two points:

1. (server-side) When Nuxt pre-renders the page
1. (client-side) When the browser navigates to this page from elsewhere on the site

Here's the definition again:

```javascript
asyncData() {
  // Don't re-evaluate buildTime when the client loads this page in the
  // browser.
  if (!process.client) {
    return {
      buildTime: new Date().toUTCString(),
    };
  }
},
```

When Nuxt pre-renders the site, the server executes the `asyncData` method. In the server environment, `process.client` is null, so it sets `buildTime` to the current time and uses that variable when it pre-renders the page's HTML.

When you navigate to the `/about` path from a different page on the site, the browser executes the `asyncData` method on page load. `process.client` is now non-null because the code is running client-side, so the method never defines `buildTime` and Vue renders the page template for when `buildTime` is undefined:

```html
<p v-if="buildTime">
  ...
</p>
<template v-else>
  <p>
    Vue generated this page client-side because you navigated here from another
    route on the same site.
  </p>
  <p><a href="/about">Refresh the page</a> to see the pre-rendered version.</p>
</template>
```

## Pre-rendering is only for the first page

The About page demonstrates one of the subtleties of pre-rendering: Nuxt only pre-renders the _first_ page the user visits. After that, Vue behaves like a normal SPA and redraws the page client-side any time the user navigates within the site. This is a good thing, as it means that your app retains Vue's instant page-to-page navigation without sacrificing compatibility with services that require server-side rendering.

## Running the About page locally

To experiment with the About page, run the following commands

```bash
git clone https://github.com/mtlynch/hello-world-vue-pre-rendered.git
cd hello-world-vue-pre-rendered

npm install
npm run dev
```

You'll notice that when you navigate to [https://localhost:3600/about](https://localhost:3600/about), the build time and the load time roughly match one another. That's because when you run `npm run dev`, Nuxt uses server-side rendering to create the page just in time.

{{< img src="about-ssr.jpg" alt="Screenshot of About page rendered with server-side rendering" caption="`npm run dev` renders pages as the user requests them, so build times and load times match." maxWidth="650px" hasBorder="True" >}}

Unlike pre-rendering, which generates the page once and keeps serving that same page, server-side rendering generates a fresh version of the page each time the user visits.

## Publishing your app

With pre-rendering, you don't need a Node.js server to host your app. All you need is a hosting service that supports static file hosting.

Below are instructions for publishing static files with a few popular providers:

- [Google Firebase](https://firebase.google.com/docs/hosting/quickstart) (I use this)
- [Netlify](https://www.netlify.com/blog/2016/10/27/a-step-by-step-guide-deploying-a-static-site-or-single-page-app/)
- [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)
- [Google Cloud Storage](https://cloud.google.com/storage/docs/hosting-static-website)

## Source code

All code for this example is available on Github under the [MIT license](https://choosealicense.com/licenses/mit/):

- [hello-world-vue-pre-rendered](https://github.com/mtlynch/hello-world-vue-pre-rendered)

## A more feature-rich example

If you're building a real-world app with Vue and Nuxt, you'll want more functionality than just two pre-rendered pages. I created a template project, [pre-vue](https://github.com/mtlynch/pre-vue), that includes all the boilerplate you need for SEO and social sharing:

- [https://github.com/mtlynch/pre-vue](https://github.com/mtlynch/pre-vue) (source code)
- [https://pre-vue.web.app/](https://pre-vue.web.app/) (live demo)

It has the following features:

- Generates a `robots.txt` file
- Generates a sitemap
- Supports unique `<title>` tags and other SEO-relevant `<meta>` tags for each page
- Adds unique [Open Graph](https://ogp.me/) tags to each page
- Adds Google Analytics support
- Adds a favicon
- Handles 404s

I used the pre-vue template to rewrite the [Zestful demo site](https://zestfuldata.com/), which was previously an Angular SPA. The [README](https://github.com/mtlynch/pre-vue) explains how to use pre-vue, but I'll publish a detailed blog post explaining the details if there's interest.
