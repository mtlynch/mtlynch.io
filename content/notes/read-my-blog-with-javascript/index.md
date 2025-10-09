---
title: "Read My Blog With Javascript"
date: 2025-10-09
---

You can now read my blog with JavaScript. You can use it to create a client-side blogroll or a client-side RSS reader to other sites. I'm not sure if anyone wants this, but I couldn't see the harm, so I enabled it.

For example, if you wanted to use JavaScript to show my five most recent post titles, you'd write some code like this:

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

## Allowing JavaScript to read my site

https://github.com/mtlynch/mtlynch.io/pull/1505/files

```toml
[[headers]]
  for = "/index.xml"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, HEAD, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type"
```

## What could go wrong?

CORS is a security mechanism, and I'm always appropriately hesitant to relax security restrictions on an Internet facing site, but I've thought for a while about it, and I don't see any negative impact in can have.

### Can an attacker exfiltrate secret data?

The purpose of same-origin policy is that secret information should be isolated to different domains. If I'm on chase.com/dashboard, I might make a request to chase.com/balance and read the result. But if I visit evil.example.com, the web app there shouldn't be able to read the response from chase.com/balance.

My blog is a static site with no secret information. When I visit mtlynch.io, I see the exact same thing everyone else does.

I do use TalkYard for embedded commenting, and I have admin privileges there, but CORS settings for my RSS feeds don't affect TalkYard.

### Can an attacker DDoS me?

At first, I thought an attacker might abuse my site settings to launch a DDoS attack against me. What if the attacker gets millions of people to visit a page that has JavaScript in the background to constantly request my RSS feed?

Then, I realized an attack like I imagined is already possible. CORS just controls whether a third-party domain can read the results of a request, but any domain can make GET and POST requests to any other domain, regardless of CORS settings.

### Can an attacker impersonate my site?

Another attack I considered is impersonation. A visitor can go to evil.example.com, and the server there could send back JavaScript that reconstructs my blog in the visitor's browser even though the URL bar still says evil.example.com.

This attack could work, but it doesn't seem particularly useful. Someone can already do that today by running an HTTP proxy that just forwards requests to my blog, and the same thing would happen. Or, they could just scrape my site and host it somewhere else.
