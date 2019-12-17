---
title: 'A Simple Pre-Rendered Web App Using Vue + Nuxt'
excerpt: The easiest way to improve social sharing and SEO for a single-page app.
header:
  teaser: images/simple-vue-pre-rendered/og-cover.jpg
  og_image: images/simple-vue-pre-rendered/og-cover.jpg
tags:
  - vue
  - nuxt
---

In this post, I'll show you how to pre-render pages using Vue and Nuxt. This method combines the pleasant developer experience of Vue with the power and control of server-side rendering. I'm sticking to the basics, so even if you have no experience with Vue or Nuxt, everything should still make sense.

## Why pre-render?

Vue offers many advantages over . To understand why, you need to understand a bit about how single page apps (SPAs) work.

While traditional websites force the browser to download a whole new page every time the user clicks a link, SPAs keep everything on a single page. When the user navigates around the site, JavaScript simply draws a new page without pulling everything down from the server again.

When the browser fetches an SPA from the server, the HTML looks something like this.

The page starts out as just an HTML stub, and the JavaScript does the heavy lifting of building the page contents within the browser.

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

Because it's a _single page_ app, that HTML stub is the same for every page on your site. If the user visits `yoursite.com/about` or `yoursite.com/contact` the HTML stub is exactly the same, but the app's JavaScript renders the appropriate page in the user's browser.

Dynamic page rendering is neat and all, but some parts of the web don't react very well to it. In particular, social sharing and search engine optimization.

## SPA problem #1: Social sharing

When I share my blog posts on Twitter, they look like this:

{% include image.html file="twitter-card.jpg" alt="Example of a rich Twitter card" max_width="590px" img_link="true" class="img-border" fig_caption="Using Open Graph tags so that Twitter generates rich cards for my posts." %}

Twitter generates that card based on HTML tags in my page that follow the [Open Graph](https://ogp.me/) standard. For example, to specify the image, I add a tag that looks like this:

```html
<meta property="og:image" content="https://example.com/post-1/cover.jpg" />
```

Recall that I said that on SPAs, all pages have the same initial HTML. This is a problem for social sharing because Twitter, Facebook, and all the other social sharing sites need to see the Open Graph HTML tags before JavaScript executes. With a regular SPA, every page on your site must share the same Open Graph tags. But if you pre-render, each of your pages can have unique HTML tags and thus every page can have its own distinct social sharing card.

## SPA problem #2: Search engine optimization (SEO)

Unlike social networking sites, search engines do render websites using JavaScript. The problem is that [it's impossible for them to do it perfectly](https://twitter.com/JohnMu/status/1018956456304037893). Many websites use JavaScript to continuously update a page's contents while you're viewing it. From Google's perspective, when is a page "done" rendering and ready for indexing?

With a regular SPA, Google will try to index your page, but you never have a guarantee that they'll index it the way you want. With pre-rendering, you can always trust that Google will index your page with the correct tags because they're present before JavaScript even runs.

## Nuxt pre-rendering to the rescue

To solve these problems, you can use a tool called Nuxt. It adds a layer on top of Vue to take some work away from the browser. Instead of sending down a bare stub page and waiting for the browser to render everything, Nuxt pre-processes the page to create HTML ahead of time.

## Why not use server-side rendering (SSR)?

The common solution to populating these tags prior to JavaScript execution is to use server-side rendering. You can run Nuxt in a live Node.js server and use it to run Nuxt to generate The problem is that, to leverage server-side rendering, you need to run a live web server.

Compared to server-side rendering, pre-rendering is cheaper, simpler, and requires less maintenance. Who wants to run an entire web server if they don't have to?

## Should you use pre-rendering?

Pre-rendering is not right for every situation. In some cases, it's better than a regular SPA, and in some cases it's better than server-side rendering. Below, I've included some advantages and disadvantages to help you decide when to employ pre-rendering.

### Advantages

- Control over tags relevant to social sharing and SEO
- Faster page loads
  - Standard SPAs have to wait until the browser downloads all of its JavaScript before it starts rendering the page.
  - With pre-rendering, users see your page before their browser executes any JavaScript.

### Disadvantages

- More complexity than standard Vue
  - While pre-rendering is less complex than running Nuxt on a Node server, it's more complicated than running a fully client-side Vue app.
  - With pre-rendering, you have to mentally track whether code will run server-side or client-side and what context will be available at the time the code executes.
- No user-generated pages
  - Pre-rendering requires you to know all of your page routes when you build your page. It explicitly [does not support dynamic routes](https://nuxtjs.org/guide/routing#dynamic-routes).
  - If your site features user-generated content and you want, for example, users to have their own URLs after joining (e.g., `yoursite.com/users/michael123`), you can't do that with pre-rendering.
  - You can work around this by pushing some of your route into URL queries (e.g., `yoursite.com/users?id=michael123`) then pulling down the dynamic data client-side, but you still can't generate distinct social sharing tags for those pages.

## Pre-requisites

- [Node.js](https://nodejs.org/en/download/)

The only requirement for following this tutorial is that you have Node.js installed. I used [Node v12.13.1](https://nodejs.org/dist/v12.13.1/), which is the latest stable release at the time of this writing.

## A pre-rendered "Hello, world"

To start out, I'll show you a basic, pre-rendered hello world app in just three files:

### `pages/index.vue`

The first file defines a page in the web app. The `pages/` folder has special meaning to Nuxt. It will pre-render a separate page for each `.vue` it finds in the `pages/` folder. `index.vue` indicates that this is a root page, so it's what the user sees if they don't specify any path.

It's a simple hello world page that displays a welcome message and a button. The button updates its text every time you click on it.

```html
<template>
  <div>
    <h1>Hello, world!</h1>
    <p>I'm an example of a pre-rendered Vue webpage.</p>
    <button v-on:click="count++">
      I have been clicked {% raw %}{{ count }}{% endraw %} times
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

The `package.json` file tells Node how to build this app:

```javascript
{
  "name": "hello-world-vue-static",
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
git clone https://github.com/mtlynch/hello-world-vue-static.git
cd hello-world-vue-static
git checkout step-1

npm install
npm run dev
```

The app will run at [http://localhost:3600](http://localhost:3600).

### Pre-rendering your app

When you run `npm run dev`, you're actually performing server-side rendering. Node runs a local development server and generates pages on-demand as you request them.

But I promised you _pre-rendered_ pages. With pre-rendered pages, you don't even need a web server, because it's a set of static files.

To pre-render your app, run the following command:

```bash
npm run generate
```

If you then check the `dist/` folder, you'll see that Nuxt has pre-rendered your page:

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

You can view these through a simple HTTP server, like Python's SimpleHTTPServer:

```bash
python -m SimpleHTTPServer 8123
```

This allows you to view your pre-rendered app at [http://localhost:8123](http://localhost:8123). Later, I'll show you how to [publish this app](#publishing-your-app) to a static file hosting service.

## Adding an About page

To make things more interesting, I'll add a new page to this app:

### `pages/about.vue`

This page uses Vue hooks to display information about how the page was rendered. I'll explain the code in more detail [below](#understanding-two-versions-of-the-about-page).

```html
<template>
  <div>
    <h1>About this Build</h1>
    <p v-if="buildTime">
      Nuxt pre-rendered this page at
      <b>{% raw %}{{ buildTime }}{% endraw %}</b> (before the browser ever saw
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
      <b>{% raw %}{{ loadTime }}{% endraw %}</b>.
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

## Testing the About page

Here is a [live version](https://hello-world-vue-static.web.app) of the About page:

<iframe
  src="https://hello-world-vue-static.web.app/about"
  style="width:100%; height:230px; border:1px solid black; border-radius: 4px; overflow:hidden;"
  title="About this Build"
  sandbox="allow-scripts"
></iframe>

Try starting from the homepage and clicking the "About" link:

<iframe
  src="https://hello-world-vue-static.web.app"
  style="width:100%; height:230px; border:1px solid black; border-radius: 4px; overflow:hidden;"
  title="About this Build"
  sandbox="allow-scripts"
></iframe>

## Understanding two versions of the About page

The about page demonstrates how Nuxt and Vue work together to create a pre-rendered page. You should see two versions of the page depending on how you navigated the site:

{% include image.html file="about-versions.jpg" alt="Screenshot of Is It Keto's Pinterest page" max_width="850px" img_link="true" class="img-border" fig_caption="The About page displays different information depending on how you arrived to the page." %}

Why are you seeing two different versions of the page? The answer is in the [`asyncData` hook](https://nuxtjs.org/api/). This function executes at two points:

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

When Nuxt pre-renders the site, the server executes the `asyncData` method. In the server environment, `process.client` is `null`, so it sets `buildTime` to the current time.

When you navigate to the About page from a different page on the site, the browser executes the `asyncData` method on page load. `process.client` is now non-`null` because the code is running client-side, so the method never defines `buildTime`. Vue then renders the page components for when `buildTime` is undefined:

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

The about page demonstrates a subtlety to pre-rendering. Only the _first_ page the user visits is pre-rendered. After that, Vue behaves like a normal SPA and redraws the page any time the user navigates within the site.

## Running the About page locally

To experiment with the About page, run the following commands

```bash
git clone https://github.com/mtlynch/hello-world-vue-static.git
cd hello-world-vue-static

npm install
npm run dev
```

You'll notice that when you navigate to [https://localhost:3600/about](https://localhost:3600/about) the two times will roughly match one another. That's because when you run `npm run dev`, Nuxt uses server-side rendering to create the page just in time.

{% assign fig_caption = "`npm run dev` renders pages as the user requests them, so build times and load times match." | markdownify | remove: "<p>" | remove: "</p>" %}

{% include image.html file="about-ssr.jpg" alt="Screenshot of Is It Keto's Pinterest page" max_width="650px" img_link="true" class="img-border" fig_caption=fig_caption %}

Unlike pre-rendering, which generates the page once and keeps serving that same page, with server-side rendering, Nuxt generates a fresh version of the page each time the user lands on the page.

## Publishing your app

Because Nuxt pre-renders all of your pages, you don't need a Node server to host your app. All you need is a hosting service that supports static file hosting. Below are instructions for doing this with a few popular providers:

- [Google Firebase](https://firebase.google.com/docs/hosting/quickstart) (I use this)
- [Netlify](https://www.netlify.com/blog/2016/10/27/a-step-by-step-guide-deploying-a-static-site-or-single-page-app/)
- [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)
- [Google Cloud Storage](https://cloud.google.com/storage/docs/hosting-static-website)

## Source code

All code for this example is available on Github under the [MIT license](https://choosealicense.com/licenses/mit/):

- [hello-world-vue-static](https://github.com/mtlynch/hello-world-vue-static)

## A more feature-rich example

If you're building a real-world app with Vue and Nuxt, you'll want a lot more functionality than just two pre-rendered pages. I created a template project, [pre-vue](https://github.com/mtlynch/pre-vue), that includes all the boilerplate you need for SEO and social sharing:

- [https://github.com/mtlynch/pre-vue](https://github.com/mtlynch/pre-vue) (source code)
- [https://pre-vue.web.app/](https://pre-vue.web.app/) (live demo)

It has the following features:

| Feature                                                                           | Purpose                                                                     |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Generates a `robots.txt` file                                                     | Improves SEO.                                                               |
| Generates a sitemap                                                               | Improves SEO.                                                               |
| Supports unique `<title>` tags and other SEO-relevant `<meta>` tags for each page | Improves SEO.                                                               |
| Adds unique [Open Graph](https://ogp.me/) tags to each page                       | Supports social sharing.                                                    |
| Adds Google Analytics support                                                     | Measure visits to your site.                                                |
| Adds a favicon                                                                    | Populates icons in browser tabs and shortcuts.                              |
| Handles 404s                                                                      | Shows a graceful error page when the user navigates to a non-existent page. |

I used the pre-vue template to rewrite the [Zestful demo site](https://zestfuldata.com/), which was previously an Angular SPA. Within days of converting it to a pre-rendered app, the site [climbed to the first page of Google results](/retrospectives/2019/12/#rewriting-the-zestful-website-out-of-spite).

The [README](https://github.com/mtlynch/pre-vue) explains how to use pre-vue, but I'll publish a detailed blog post explaining the details if there's interest.
