---
title: "The MustCreate Pattern for Go Tests"
date: 2026-11-13
tags:
  - go
  - testing
---

I recently discovered a solution for making my Go tests more less repetitive and more readable.

Suppose I have a constructor that can fail:

```go
func NewUsername(raw string) (Username, error) { ... }
```

And I have another function that takes the `Username` as an argument:

```go
func (ds Datastore) ReadUser(username Username) (User, error) { ... }
```

When it comes time to write tests for `ReadUser`, I have to call `NewUsername` with a value I know is valid, but I still have to include a lot of verbose error-checking code to convince the compiler that everything is okay:

```go
username, err := NewUsername("joe123")

// This is silly because *I* know joe123 is a valid username, so this should
// never happen.
if err != nil {
  t.Fatalf("failed to create username: %v", err)
}

// Perform the test assertion I actually care about.
user, err := store.ReadUser(username)
if got, want := user.Name.String(), "joe123"; got != want {
  t.Errorf("username=%v, want=%v", got, want)
}
```

## My old solution: one new helper function per type

Until a few months ago, I avoided the verbose error checking with a helper function like `MustCreateUsername` that wraps `NewUsername` so it can't fail:

```go
user, err := store.ReadUser(MustCreateUsername(t, "joe123"))
if got, want := user.Name.String(), "joe123"; got != want {
  t.Errorf("username=%v, want=%v", got, want)
}
```

The implementation of `MustCreateUsername` looks like how you'd expect:

```go
func MustCreateUsername(t testing.TB, raw string) Username {
  t.Helper()
  username, err := NewUsername(raw)
  if err != nil {
    t.Fatalf("invalid username: %s", raw)
  }
}
```

The helper function strategy worked fine, but it scales poorly. Eventually, my code becomes littered with `MustCreateX` functions for every type in my app.

## New solution: A single, generic `MustCreate` helper

Go 1.18 [added support for generics](https://go.dev/doc/go1.18#generics) back in 2022. I thought generics were a helpful change to the language, but I didn't encounter many problems I wanted to solve with generics. Recently, I realized generics are the better way to solve my sprawling `MustCreateX` problem.

Instead of defining a helper `MustCreateX` for every type, I defined a single, generic `MustCreate` test helper, so my test becomes:

```go
user, err := store.ReadUser(testutil.MustCreate(t, NewUsername, "joe123"))
if got, want := user.Name.String(), "joe123"; got != want {
  t.Errorf("username=%v, want=%v", got, want)
}
```

The magic is the generic `MustCreate` function:

```go
func MustCreate[RawInput, CreatedValue any](
	t testing.TB,
	create func(RawInput) (CreatedValue, error),
	rawInput RawInput,
) CreatedValue {
	t.Helper()
	createdValue, err := create(rawInput)
	if err != nil {
		t.Fatalf("failed to create test value: %v", err)
	}
	return createdValue
}
```

I have trouble reasoning about generics, so I'll walk through the function implementation. Here's what calls to `MustCreate` look like in my tests:

```go
testutil.MustCreate(t, NewUsername, "joe123")
```

The above call is equivalent to this more explicit version:

```go
testutil.MustCreate[string, Username](t, NewUsername, "joe123")
```

When I call `MustCreate` here, `RawInput` is `string` (the type of the raw username value), and `CreatedValue` is `Username` (the return type). It's equivalent to an implementation that looks like this:

```go
func MustCreate(
	t testing.TB,
	create func(string) (Username, error),
	rawInput string,
) CreatedValue {
	t.Helper()
	createdValue, err := create(rawInput)
	if err != nil {
		t.Fatalf("failed to create test value: %v", err)
	}
	return createdValue
}
```

Benefit is that you can be confident that there's nothing hiding in the `MustCreate`. If you've read it once, you've read it for every function, whereas if there's a `MustCreateUsername` and `MustCreateDate`, and so on, then there's a chance something tricky is happening in one of the implementations that you might miss.

### Extending to multi-param constructors

The solution gets a bit less elegant when the constructor takes two parameters like this:

```go
func NewRange(start int, end int) (Range, error) {
	if start < 0 || end <= start {
		return Range{}, errors.New("invalid range")
	}
	return Range{start: start, end: end}, nil
}
```

For those cases, I use an additional helper called `MustCreate2`:

```go
func MustCreate2[RawInput1, RawInput2, CreatedValue any](
  t testing.TB,
  create func(RawInput1, RawInput2) (CreatedValue, error),
  rawInput1 RawInput1,
  rawInput2 RawInput2,
) CreatedValue {
  t.Helper()
  createdValue, err := create(rawInput1, rawInput2)
  if err != nil {
    t.Fatalf("failed to create test value: %v", err)
  }
  return createdValue
}
```

Calling `MustCreate2` looks similar to the basic `MustCreate` call:

```go
range := testutil.MustCreate2(t, models.NewRange, 0, 5)
```

## Conclusion

Nothing revolutionary, but it's helpful and it eliminates a lot of repetitive helper functions.
