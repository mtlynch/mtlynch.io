---
title: "Go Programming Blueprints"
date: 2022-08-14T08:47:53-04:00
rating: 8
purchase_url: https://www.packtpub.com/product/go-programming-blueprints-second-edition/9781786468949
---

The reading experience was hit or miss. Some chapters were fascinating and taught me valuable Go lessons, while others felt boring and got too bogged down in particular third-party libraries. Overall, I'd still recommend it as a valuable read for anyone who considers themselves a beginner or intermediate with the Go programming language.

<!--more-->

---

## What I Liked

- The variety of example apps did a good job of demonstrating features of Go in realistic scenarios.
- Features wonderfully elegant Go code that taught me several new idiomatic language patterns.
- Does a great job of using the Go standard library in interesting ways.

## What I Disliked

- Most of the examples focus on highly scalable applications rather than single-server Go applications that I typically write.
- Overly dependent on heavy Google libraries (e.g., Maps, OAuth, gRPC, AppEngine).
  - Often got bogged down in minutiae of a particular library rather than the Go-relevant parts of the solution.
- Recommends several horribly insecure software practices:
  - Advises developers to [use `0777` as the default bitmask](https://github.com/matryer/goblueprints/issues/78) when they don't know what permissions to assign.
  - Fails to protect against directory traversal, leading to an arbitrary write vulnerability in an example application that can [gain remote code execution](https://github.com/matryer/goblueprints/issues/79)
  - Fails to protect against trivial [denial of service attacks on user uploads](https://github.com/matryer/goblueprints/issues/80)
- Poor editing in the prose and error checking in the code.
  - There were a high number of careless grammar and code mistakes.
  - Users have [submitted fixes](https://github.com/matryer/goblueprints/pulls?q=is%3Aopen+is%3Apr), but they've been ignored for years.
- Uses an extra JavaScript library (jQuery) in places where vanilla JavaScript would be just as easy.
- Uses bash scripting poorly.
- ePub formatting was poor, but it's my first time reading a programming book in ePub, so I'm not sure how fixable that is.

## Key Takeaways

-
