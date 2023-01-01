---
title: "Go Programming Blueprints"
date: 2022-12-26T00:00:00-04:00
rating: 8
purchase_url: https://www.packtpub.com/product/go-programming-blueprints-second-edition/9781786468949
---

I'm a fan of Mat Ryer, and his blog posts have had a significant impact on the way I program in Go. I found the book hit or miss. Some chapters were fascinating and taught me valuable Go lessons, while others felt boring and got too bogged down in particular third-party libraries. Overall, I'd still recommend it to anyone who considers themselves a beginner or intermediate Go programmer.

<!--more-->

---

## What I Liked

- The variety of example apps did a good job of demonstrating features of Go in realistic scenarios.
- Features wonderfully elegant Go code that taught me several new idiomatic language patterns.
- Uses the Go standard library in interesting ways.

## What I Disliked

- Most of the examples focus on highly scalable applications rather than single-server Go applications that I typically write.
- The book felt overly dependent on heavy Google libraries (e.g., Google Maps, OAuth, gRPC, AppEngine).
  - Many of the examples went deeply into the minutiae of a particular library rather than the Go-relevant parts of the solution.
- Recommends several horribly insecure software practices:
  - Advises developers to [use `0777` as the default bitmask](https://github.com/matryer/goblueprints/issues/78) when they don't know what permissions to assign.
  - Fails to protect against directory traversal, leading to an arbitrary write vulnerability in an example application that can [gain remote code execution](https://github.com/matryer/goblueprints/issues/79)
  - Fails to protect against trivial [denial of service attacks on user uploads](https://github.com/matryer/goblueprints/issues/80)
- Poor editing in the prose and error checking in the code.
  - There were a high number of careless grammar and code mistakes.
  - Users have [submitted fixes](https://github.com/matryer/goblueprints/pulls?q=is%3Aopen+is%3Apr), but they've been ignored for years.
- Complicates examples with jQuery in places where vanilla JavaScript would be work just as well or better.
- The bash script examples felt sloppy.
- Code quality was inconsistent throughout the book.
  - Some examples are elegant and intuitive, while others feel like a first draft
- There are two independent Github repos: one [from the author](https://github.com/matryer/goblueprints) and one [from the publisher](https://github.com/PacktPublishing/Go-Programming-Blueprints).
  - [The author's repo](https://github.com/matryer/goblueprints) seems to be the correct one.
- There are instructions for running the examples on Windows, but they seem to be untested and feel like an afterthought.
- Some of the examples no longer compile due to third-party dependencies that have disappeared.

## Key Takeaways

### [Signal channels](https://medium.com/@matryer/golang-advent-calendar-day-two-starting-and-stopping-things-with-a-signal-channel-f5048161018)

- Signal channels are an idiomatic way of implementing thread-safe events in Go.
- Signal channels are just a `chan` of of type `struct{}`
  - Signal channels don't pass any data &mdash; they just signal that an event has occurred.
  - The [Twitter votes app](https://github.com/matryer/goblueprints/blob/aae50b4b30fa6dfd73e3c411b3bfe1972294be61/chapter6/twittervotes/main.go) is a good example of using signal channels to:
    1. Allow clients to interrupt the server.
    1. Indicate when the background process has completed its work.

### Horizontal vs. vertical scaling

- Horizontally scaling: Scaling a system by adding nodes to improve reliability or performance
- Vertically scaling: Scaling a system by increasing the resources of individual nodes (e.g., adding RAM or CPU)

### Using `time.Ticker`

- Good for periodic tasks

### HTTP helper functions

#### Mat Ryer's HTTP encoding helper pattern

Ryer advocates abstracting away the encoding format so that the HTTP handler is agnostic to whether the exchange format is JSON, protobuf, etc. He proposes `decode` and `respond` helper functions like this so that your route handlers look like this:

```golang
func handleFooPost(w http.ResponseWriter, r *http.Request) {
  var payload struct {
    Username string `json:"username"`
    DisplayName string `json:"displayName"`
  }
  if err := decode(r, &payload); err != nil {
    respondErr(ctx, w, r, err, http.StatusBadRequest)
    return
  }

  // Do something with the request.

  response := struct {
      ID string `json:"id"`
    }{
      ID: "1234",
    }
  respond(ctx, w, r, response, http.StatusOK)
}
```

And then `decode` and `respond` handle the JSON deserialization and serialization, respectively:

```golang
// decode parses JSON from an HTTP request body.
func decode(r *http.Request, v interface{}) error {
  err := json.NewDecoder(r.Body).Decode(v)
  if err != nil {
    return err
  }
  if valid, ok := v.(interface {
    OK() error
  }); ok {
    err = valid.OK()
    if err != nil {
      return err
    }
  }
  return nil
}

// respond serializes response data to JSON in the body of an HTTP request.
func respond(ctx context.Context, w http.ResponseWriter, r *http.Request, v interface{}, code int) {
  var buf bytes.Buffer
  err := json.NewEncoder(&buf).Encode(v)
  if err != nil {
    respondErr(ctx, w, r, err, http.StatusInternalServerError)
    return
  }
  w.Header().Set("Content-Type", "application/json; charset=utf-8")
  w.WriteHeader(code)
  _, err = buf.WriteTo(w)
  if err != nil {
    log.Errorf(ctx, "respond: %s", err)
  }
}
```

#### How I've adapted Ryer's encoding helper pattern

I like the helper method idea, but I think it's a little too abstract. How often do you rewrite your interface to use a different encoding scheme? Plus, you're leaking abstraction anyway because the client has to specify JSON tags in the struct even though they're not supposed to know anything about JSON.

Instead, I just use a function called `respondJSON` like this:

```golang
func respondJSON(w http.ResponseWriter, data interface{}) {
  w.WriteHeader(http.StatusOK)
  w.Header().Set("Content-Type", "application/json")
  if err := json.NewEncoder(w).Encode(data); err != nil {
    log.Fatalf("failed to encode JSON response: %v", err)
  }
}
```

And I just do the JSON decoding inline, so my `handleFooPost` would look like this:

```golang
func handleFooPost(w http.ResponseWriter, r *http.Request) {
  var payload struct {
    Username string `json:"username"`
    DisplayName string `json:"displayName"`
  }
  if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
    http.Error(w, "JSON is invalid", http.StatusBadRequest)
    return
  }

  // Do something with the request.

  respondJSON(w, struct {
      ID string `json:"id"`
    }{
      ID: "1234",
    })
}
```

- It's useful to write HTTP helper functions for common HTTP handler parts (e.g. "respond with an error", "respond with data encoded as JSON")
- Protecting internal details

  - "Public views of Go struct"
  - Interesting technique to prevent you from accidentally exposing internal fields of a struct.
    - I do explicit conversion instead, too easy to accidenelly publish wrong thing.

- Separating test packages
- It's good to test go packages from a separate package.
  - e.g., write tests for package `foo` in a package called `foo_test`
- Testing from an external package ensures that the test package only accesses the production package's public members.

  - Prevents you from testing implementation details.

- `flags.Duration` natively supports different time units like `55s` or `10m`.

### API Tip

- If you, API takes function arguments, put them at the end of the orgs list.
  - It's difficult to read arguments that appear after function arguments.
  - "When it comes to writing your own..."

### Line of sight

- Blog post

### Response patterns

- "Response helpers"

### Chat app

- Cool demo of goroutnes and websockets

### Auth

- Good demo, explanation of chaining HTTP Handlers

### Twitter votes

- This chapter alone is worth the price of the best book.
- Cool example of combining horizontally scalable services.
  - Uses NSQ to publish messages.
  - Uses the Twitter streaming API to read input from Twitter.
  - Uses MongoDB to store data.
- Very cool to see a system that's highly scalable, yet made of simple parts.
- Interesting exp example of using a custom transport function in an HTTP connection to customize low-level behavior of the underlying TCP connection.
- Good example of how to override the default signal handler to do custom cleanup [when your app receives `SIGINT` or `SIGTERM` signals](https://github.com/matryer/goblueprints/blob/aae50b4b30fa6dfd73e3c411b3bfe1972294be61/chapter5/counter/main.go#L76L89) from the operating system.

### Ch. 7

- Wrapping handler function with API Key
- Good example of getting data about an HTTP request and making it available to subsequent handler functions.
