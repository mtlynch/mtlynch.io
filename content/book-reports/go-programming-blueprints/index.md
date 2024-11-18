---
title: "Go Programming Blueprints by Mat Ryer"
date: 2023-01-02
rating: 8
purchase_url: https://www.packtpub.com/product/go-programming-blueprints-second-edition/9781786468949
---

I'm a fan of [Mat Ryer](https://twitter.com/matryer)'s work, and his blog posts have had a significant impact on the way I program in Go. I found the book hit or miss. Some chapters were fascinating and taught me valuable Go lessons, while others felt boring and got too bogged down in the minutiae of third-party libraries. Overall, I'd still recommend it to anyone who considers themselves a beginner or intermediate Go programmer.

<!--more-->

---

## What I liked

- The variety of example apps did a good job of demonstrating features of Go in realistic scenarios.
- Features wonderfully elegant Go code that taught me several new idiomatic language patterns.
- Uses the Go standard library in interesting ways.
- Finally made HTTP contexts click for me when I'd never understood them in the past.
- Available in DRM-free formats.

## What I disliked

- Most of the examples focus on highly scalable applications rather than single-server Go applications that I typically write.
- The book felt overly dependent on heavy Google libraries (e.g., Google Maps, OAuth, gRPC, AppEngine).
  - Many of the examples went deeply into the minutiae of a particular library rather than the Go-relevant parts of the solution.
- Recommends several horribly insecure software practices:
  - Advises developers to [use `0777` as the default bitmask](https://github.com/matryer/goblueprints/issues/78) when they don't know what permissions to assign.
  - Fails to protect against directory traversal, leading to an arbitrary write vulnerability in an example application that can [gain remote code execution](https://github.com/matryer/goblueprints/issues/79).
  - Fails to protect against trivial [denial of service attacks on user uploads](https://github.com/matryer/goblueprints/issues/80).
- Poor editing in the prose and error checking in the code.
  - There were a high number of careless grammar and code mistakes.
  - Users have [submitted fixes](https://github.com/matryer/goblueprints/pulls?q=is%3Aopen+is%3Apr), but they've been ignored for years.
- Complicates examples with jQuery in places where vanilla JavaScript would work just as well or better.
- The bash script examples felt sloppy.
- Code quality was inconsistent throughout the book.
  - Some examples are elegant and intuitive, while others feel like a first draft.
- There are two independent Github repos: one [from the author](https://github.com/matryer/goblueprints) and one [from the publisher](https://github.com/PacktPublishing/Go-Programming-Blueprints).
  - [The author's repo](https://github.com/matryer/goblueprints) seems to be the correct one.
- There are instructions for running the examples on Windows, but they feel like an untested afterthought.
- Some of the examples no longer compile due to third-party dependencies that have disappeared.

## Key takeaways

### Go language and standard library tips

#### [Signal channels](https://medium.com/@matryer/golang-advent-calendar-day-two-starting-and-stopping-things-with-a-signal-channel-f5048161018)

- Signal channels are an idiomatic way of implementing thread-safe events in Go.
- Signal channels are just a `chan` of of type `struct{}`
  - Signal channels don't pass any data &mdash; they just signal that an event has occurred.
  - The [Twitter votes app](https://github.com/matryer/goblueprints/blob/aae50b4b30fa6dfd73e3c411b3bfe1972294be61/chapter6/twittervotes/main.go) is a good example of using signal channels to:
    1. Allow clients to interrupt the server.
    1. Indicate when the background process has completed its work.

#### [`time.Ticker`](https://pkg.go.dev/time#Ticker)

I'd never seen the `time.Ticker` type before, and I had accidentally reimplemented [my own version](https://github.com/mtlynch/picoshare/pull/186/files). It's a simple way of executing code at timed intervals:

```golang
for range time.NewTicker(5 * time.Minute).C {
  // Execute this code every five minutes.
}
```

I use `time.Ticker` in [PicoShare](https://github.com/mtlynch/picoshare) to schedule [periodic database maintenance](https://github.com/mtlynch/picoshare/blob/3c10b89208912930d820cdfbd983ad99e8f9224b/garbagecollect/schedule.go#L22L27).

#### [`flags.Duration`](https://pkg.go.dev/flag#Duration) is impressively flexible

- `flags.Duration` natively supports different time units like `55s` or `10m`.
  - i.e., when you use `flags.Duration` as a command-line flag, your comman-line interface can take a flag like `--interval 10m`, and the flags package will natively parse it into a `time.Duration` for you.

### Separating test packages from production

- Writing tests in a separate package from your production code yields better tests.
  - e.g., write tests for package `foo` in a package called `foo_test` in the same directory.
  - Normally, Go's tools prohibit you from having multiple packages in the same folder, but they make an exception for tests.
- The separate `_test` package ensures that tests only access the production package's public members.
  - This encourages the tests to verify client-facing behavior rather than internal implementation details.

### Put function args at the end of the paramter list

If your function takes function parameters, put them at the end of the parameter list. Otherwise, it's difficult for readers to track which argument is associated with the inner function and which is for the outer function.

#### Bad argument ordering

Suppose that you have a function `updateValue` that polls for changes to a value and updates the local copy periodically, so it needs to accept a `SetValFn`:

```golang
type SetValFn func(key, value string) bool
```

If the `SetValFn` parameter is the first argument, everything will look fine in the function definition:

```golang
func updateValue(setFn SetValFn, interval time.Duration) {
  for range time.NewTicker(interval).C {
    value := fetchValue()
    setFn("somekey", value)
  }
}
```

But when it comes time to call `updateValue`, the callsite will be hard to read:

```golang
updateValue(func(key, value string) bool {
  if err := DB.SetKey(key, value); err != nil {
    return false
  }
  return true
}, 5*time.Minute) // Which function call is this for?
```

The subtlety is that `5*time.Minute` is an argument to `updateValue` but it occurs after the whole inline function defintion of the `SetValFn`, so it's hard to notice the connection to `updateValue`.

#### Better argument ordering

A better rewrite of the example above is to just make sure the function argument is last in the list:

```golang
// Reorder arguments so that SetValFn is last
func updateValue(interval time.Duration, setFn SetValFn) {
```

That way, at the callsite, it's more obvious that both arguments are for `updateValue`:

```golang
updateValue(5*time.Minute, func(key, value string) bool {
  if err := DB.SetKey(key, value); err != nil {
    return false
  }
  return true
})
```

### Prioritize line of sight in code

The book touches on the idea of "line of sight," but I think Ryer explains the concept better [on his blog](https://medium.com/@matryer/line-of-sight-in-code-186dd7cdea88).

Code becomes hard to read if there's deep nesting of context and conditionals, and it's difficult to maintain context when branches of a conditional are far apart. Ryer advocates structuring code so that logic stays near the left edge of the screen.

#### Poor line of sight

When there's poor line of sight, logic is deeply nested and conditional blocks are large:

```golang
if something.OK() {
  something.Lock()
  defer something.Unlock()
  err := something.Do()
  if err == nil {
    stop := StartTimer()
    defer stop()
    log.Println("working...")
    doWork(something)
    <-something.Done()
    log.Println("finished")
    return nil
  } else {
    return err
  }
} else {
  return errors.New("something not ok")
}
```

#### Good line of sight

To improve line of sight, you can invert logic of conditionals to exit early on error and then keep the rest of the logic outside of a conditional:

```golang
if !something.OK() {  // flipped
  return errors.New("something not ok")
}
something.Lock()
defer something.Unlock()
err := something.Do()
if err != nil {       // flipped
  return err
}
stop := StartTimer()
defer stop()

log.Println("working...")
doWork(something)
<-something.Done()
log.Println("finished")
return nil
```

### Using context in HTTP handlers

I've been doing hobby Go web programming for five years, and I never understood the point of [`context.Context`](https://pkg.go.dev/context) in HTTP handlers until I read this book. [Chapter 6](https://github.com/matryer/goblueprints/blob/aae50b4b30fa6dfd73e3c411b3bfe1972294be61/chapter6/api/main.go) provides a good explanation, but I'll try to summarize here.

Suppose your web app requires users to supply an API key with every HTTP request. It can be a header or a URL query parameter or a cookie, but for simplicity, let's just say it's a query parameter. You expect users to call your API with a key like `/foo?key=abc123`. And you want to protect all of your endpoints by ensuring that requests have a correct API key.

To accomplish this, you can create an HTTP middleware function. Middleware functions act in a chain, so many middleware functions can process the same HTTP request in series. Middleware functions pass along data to subsequent HTTP handlers by using `context.Context`.

To enforce an API key, we first need to create a key for storing the API key in the `Context` object:

```golang
type contextKey struct {
  name string
}

var contextKeyAPIKey = &contextKey{"api-key"}
```

~~For reasons I still can't totally grok, the key needs to be a struct containing a string rather than a simple string.~~

**Update (2023-01-02)**: I was confused at first why they `contextKey` is a struct containing a string rather than just a string. In the book, Ryer explains that this decision prevents collisions with other keys that have the same value, but I didn't understand why the developer wouldn't just avoid re-using the same key for different purposes. Matthew Riley [clarified this behavior](https://twitter.com/mdriley25519/status/1609988055989116928) for me and helped me realize that the local type prevents collisions across packages, whereas a simple string wouldn't.

If you used a context key like `const contextKeyToken := "token"` and another package processed the same request and also used the key `"token"`, then you'd scribble over each other's context values. By defining a custom type local to your package, you're guaranteed that `Context` won't evaluate tokens from any other package as equal to yours because they'll have different types.

Now that you've defined your context key, create a middleware function like this:

```golang
func withAPIKey(fn http.HandlerFunc) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    key := r.URL.Query().Get("key")
    if key != "abc123" {
      http.Error(w, "Invalid API key", http.StatusUnauthorized)
      return
    }
    // Add the API key to the request context.
    ctx := context.WithValue(r.Context(), contextKeyAPIKey, key)
    fn(w, r.WithContext(ctx))
  }
}
```

When defining routes, wrap the request handler with the `withAPIKey` middleware:

```golang
mux := http.NewServeMux()
mux.HandleFunc("/foo", withAPIKey(s.handleFoo))
```

The `withAPIKey` middleware guarantees that the API key in the request is valid and present. If any request handlers downstream of `withAPIKey` need to access the API key, they can call this helper function:

```golang
func APIKey(ctx context.Context) string {
  k := ctx.Value(contextKeyAPIKey)
  if k == nil {
    panic("no API key in request")
  }
  key, ok := k.(string)
  if !ok {
    panic("API key in request is not a string")
  }
  return key
}
```

The `handleFoo` handler sits downstream of the `withAPIKey` middleware, so it can access the API key from the request context:

```golang
func (s *Server) handleFoo(w http.ResponseWriter, r *http.Request) {
  log.Printf("handling /foo, API key=%v", APIKey(r.Context()))
}
```

### HTTP helper functions

#### Mat Ryer's HTTP encoding helper pattern

Ryer advocates abstracting away the encoding format so that HTTP handlers are agnostic to the exchange format. That way, if your interface speaks JSON, you can change it to [protobuf](https://developers.google.com/protocol-buffers/) and only have to change one file.

Ryer uses the helper functions `decode` and `respond` to hide the encoding details so that your route handlers look like this:

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

I like Ryer's helper method idea, but I think it pays too high a cost of abstraction for too little benefit. How often do you rewrite your web app to use a different encoding scheme?

Plus, you're leaking abstraction anyway because the route handler has to specify JSON tags in the struct even though they're not supposed to know anything about the format.

I also don't like writing error messages in JSON because most components in the Go HTTP stack fail with a plaintext error, so JSON-formatted errors mean the client has to look for an error as both well-formed JSON and as plaintext. It's easier to just always send error messages as plaintext.

For successful JSON responses, I use a function called `respondJSON` like this:

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

I end up repeating that `json.NewDecoder(r.Body).Decode(&payload)` snippet, but it's just one line, so it's not a big deal.

### Hiding internal struct details from clients

One web development pitfall that affects all languages is accidental data exposure. Suppose you have an internal struct for representing data about users:

```golang
type User struct {
  Username string `json:"username"`
  DisplayName string `json:"displayName"`
}
```

You want to expose a JSON API like `/user?id=1234`, so you write something like this:

```golang
func handleUserGet(w http.ResponseWriter, r *http.Request) {
  user, err := loadUser(r.URL.Query().Get("id"))
  if err != nil {
    http.Error(w, "Failed to load user", http.StatusInternalServerError)
    return
  }

  respondJSON(w, user)
}
```

When users query the `/user` route, they'll get back public information about a user:

```bash
curl https://example.com/user?id=1234
```

```json
{
  "username": "alice123",
  "displayName": "Alice"
}
```

So far, so good. Except a month later, you realize that you want to adjust your internal struct to pass around some more data, like the user's email address and password hash:

```golang
type User struct {
  Username string `json:"username"`
  DisplayName string `json:"displayName"`
  Email string `json:"email"`               // Add these for
  PasswordHash string `json:"passwordHash"` // internal operations.
}
```

Even though you haven't touched `handleUserGet`, now when users call the `/user` route, they get a lot of new information:

```bash
curl https://example.com/users?id=1234
```

```json
{
  "username": "alice123",
  "displayName": "Alice",
  "email": "alice.albertson@contoso.com",
  "passwordHash": "$2a$10$J5zqqeQgH80ScyOSeCNCD.1V3ApJ1ULYMwMEhOjG6j4SM1mqL84YO"
}
```

Whoops! You just leaked everyone's email addresses and password hashes.

When I used to do penetration testing, I found several companies making this mistake in the real world. It's a subtle bug because, from the developer's perspective, everything worked as intended when they implemented `handlerUserGet`. When they add fields to the `User` struct, they're not touching `handleUsersGet`, so they won't notice the exposure unless they routinely check their applicaiton's raw HTTP traffic.

I'm paranoid about making this class of mistake in my apps, so I'm always curious how other people handle this.

#### Ryer's `Public` method pattern

Ryer proposes solving the above problem by [adding a `Public` method](https://github.com/matryer/goblueprints/blob/aae50b4b30fa6dfd73e3c411b3bfe1972294be61/chapter7/meander/public_test.go) to structs that have both an internal and external representation:

```golang
type obj struct {
  value1 string
  value2 string
  value3 string
}

func (o *obj) Public() interface{} {
  return map[string]interface{}{"one": o.value1, "three": o.value3}
}

func TestPublic(t *testing.T) {
  is := is.New(t)

  o := &obj{
    value1: "value1",
    value2: "value2",
    value3: "value3",
  }

  v, ok := meander.Public(o).(map[string]interface{})
  is.Equal(true, ok)
  is.Equal(v["one"], "value1")
  is.Nil(v["two"])
  is.Equal(v["three"], "value3")
}
```

I like Mat Ryer's technique, and I think it works well if you establish that convention in your codebase, but it's not my favorite solution to this problem in Go.

My main issue with Ryer's technique is that it violates encapsulation. I prefer my internal types to be as simple as possible and minimize assumptions about how clients will use them. Adding a `Public` method means that the type is anticipating how clients will use the data and it forces all endpoints to expose the same fields.

#### My preferred detail-hiding method

In my Go code, I prefer distinct structs for externally-facing data. When I need to publish data to an external client, I copy data from the internal struct into my external struct.

Usually, I use anonymous structs that I declare inline so I don't even need another named type:

```golang
// my internal data
type User struct {
  Username string
  DisplayName string
  Email string
  PasswordHash string
}

func handleUserGet(w http.ResponseWriter, r *http.Request) {
  user, err := loadUser(r.URL.Query().Get("id"))
  if err != nil {
    http.Error(w, "Failed to load user", http.StatusInternalServerError)
    return
  }

  // Copy the fields from User that I want to publish into a new anonymous
  // struct.
  respondJSON(w, struct {
    Username string `json:"username"`
    DisplayName string `json:"displayName"`
  }{
    Username: user.Username,
    DisplayName: user.DisplayName,
  })
}
```

I prefer this method for a few reasons:

- There's an additional layer of protection from accidental disclosure.
  - Even if someone accidentally included an internal struct in an external type, nothing would print out because the internal struct fields have no JSON tags.
- It makes the data you're returning more explicit.
- It gives you more fine-grained control over the data.
  - With the `Public` pattern, all endpoints including the type have to return data in the same format, whereas with the above method, each endpoint decides which fields to expose and in what format.

### Honorable mentions for interesting chapters

#### [Chat Application with Web Sockets](https://github.com/matryer/goblueprints/tree/master/chapter1)

- Cool demo of using goroutines and WebSockets.

#### [Adding User Accounts](https://github.com/matryer/goblueprints/tree/master/chapter2/chat)

- Good example of how to chain HTTP handlers.

#### [Building Distributed Systems and Working with Flexible Data](https://github.com/matryer/goblueprints/tree/master/chapter6)

- This chapter alone would have been worth the price of the book.
- Horizontally scaling: Scaling a system by adding nodes to improve reliability or performance
- Vertically scaling: Scaling a system by increasing the resources of individual nodes (e.g., adding RAM or CPU)
- Cool example of combining horizontally scalable services.
  - Uses [NSQ](https://nsq.io/) to publish messages.
  - Uses the [Twitter streaming API](https://developer.twitter.com/en/docs/twitter-api) to read live data from Twitter.
  - Uses [MongoDB](https://www.mongodb.com/) to store data.
- Very cool to see a system that's highly scalable yet made of simple parts.
- Uses a [custom transport function in an HTTP connection](https://github.com/matryer/goblueprints/blob/aae50b4b30fa6dfd73e3c411b3bfe1972294be61/chapter5/twittervotes/main.go#L58L73) to customize low-level behavior of the underlying TCP connection.
- Good example of how to override the default signal handler to do custom cleanup [when your app receives `SIGINT` or `SIGTERM` signals](https://github.com/matryer/goblueprints/blob/aae50b4b30fa6dfd73e3c411b3bfe1972294be61/chapter5/counter/main.go#L76L89) from the operating system.
