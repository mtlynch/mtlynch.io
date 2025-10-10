---
title: "Read My Blog With Javascript"
date: 2025-10-10
---

You can now read my blog with client-side JavaScript. I'm not sure why you'd want to, but you can.

Maybe you want to add a blogroll to your site with a list of recent posts from your favorite blogs, but you don't want to fetch them server side. If you wanted to use JavaScript to show my five most recent post titles, you'd write some code like this:

```javascript
fetch("https://mtlynch.io/index.xml")
  .then((response) => response.text())
  .then((str) => new DOMParser().parseFromString(str, "application/xml"))
  .then((data) => {
    const articles = [...data.querySelectorAll("item")].map((item) => ({
      title: item.querySelector("title").textContent,
      date: new Date(item.querySelector("pubDate").textContent),
    }));

    // Sort articles by date, newest to oldest.
    articles.sort((a, b) => b.date - a.date);

    // Print the titles of the 5 most recent articles.
    articles.slice(0, 5).forEach((article) => console.log(article.title));
  });
```

The above code produces this output:

```text
Refactoring English: Month 10
Get xkcd Cartoons at 2x Resolution
List of 2x-resolution xkcd Cartoons
I Once Appeared in The Old New Thing
Refactoring English: Month 9
```

I got the idea from [a recent comment Simon Willison made on Lobsters](https://lobste.rs/s/nr9t3s/rss_server_side_reader#c_kzwi8v).

## How do I let JavaScript read my site?

The only thing I had to change to enable JavaScript access was to set [Cross-Origin Resource Sharing (CORS) HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) for my RSS feeds. Typically, the thing that prevents other sites from reading each other's content with client-side JavaScript is [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

Same-origin policy says that each site (origin) can only read resources associated with its own domain. So, if you visit my blog at mtlynch.io, and I have JavaScript that tries to read your bank balance from chase.com, same-origin policy forbids JavaScript on my page from accessing that information.

To allow other websites to read my blog through JavaScript, I had to set CORS headers for my blog's RSS feeds. This blog is [a static site](https://en.wikipedia.org/wiki/Static_web_page) that I currently host on Netlify, so I had to change my Netlify configuration file to [specify CORS headers for my RSS feed URLs](https://github.com/mtlynch/mtlynch.io/pull/1505/files):

```toml
[[headers]]
  for = "/index.xml"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, HEAD, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type"
```

## What could go wrong?

CORS is a security mechanism, and I'm always appropriately hesitant to relax security restrictions on an Internet-facing site. But I spent a while considering the risks, and I don't see any meaningful risk in my situation.

### Can an attacker exfiltrate secret data?

The purpose of same-origin policy is that if a user has sensitive data on site A, then site B can't access any of it unless site A explicitly gives permission.

My blog is a static site with no secret information. When I visit mtlynch.io, I see the exact same thing everyone else does. So, even if an attacker convinces me to run malicious JavaScript on a third-party site, the code can't abuse my privileges on my blog because I don't have any special privileges here.

I do use [TalkYard](https://www.talkyard.io/) for embedded commenting, and I have admin privileges there, but CORS settings for my RSS feeds don't affect TalkYard.

### Can an attacker DDoS me?

At first, I thought an attacker might abuse CORS settings to launch a DDoS attack against my site. What if the attacker gets millions of people to visit a page that has JavaScript in the background to constantly request my RSS feed?

Then, I realized such a DDoS attack is already possible. CORS only controls whether a third-party domain can read the results of a request, but it doesn't block the request in the first place. Any domain can make GET and POST requests to any other domain, regardless of CORS settings.

### Can an attacker impersonate my site?

Another attack I considered is impersonation. A visitor can go to evil.example.com, and the server there could send back JavaScript that reconstructs my blog in the visitor's browser even though the URL bar still says evil.example.com.

This attack could work, but there are simpler ways to impersonate my blog, regardless of my CORS settings. An impostor can run an HTTP proxy that forwards requests to my blog, which is a simpler way to impersonate my blog. Or, they could just scrape my site and host it somewhere else.

## Why allow JavaScript to read my blog?

Nobody asked me to enable CORS for my RSS feeds, so I don't know that it actually benefits anyone. But I enjoy the open web and this is an interesting way to allow other sites to interoperate with mine, so I figured why not?

If you end up doing anything interesting with my RSS feeds as a result of this change, [let me know](/about/).
