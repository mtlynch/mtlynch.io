---
title: "The mustCreate Pattern for Go Tests"
date: 2026-10-13
---

I recently discovered a solution for making my Go tests more concise and

## Problem: Constructors that can fail

One of the biggest improvements to my Go code in the past few years is that [I write in the "parse, don't validate" style](https://refactoringenglish.com/blog/software-essays-that-shaped-me/#-by-alexis-king-2019).

For example, instead defining a username type like this:

```go
type Username string
```

I create a custom type that looks like this:

```go
type Username struct {
  val string
}
```

The unexported internal `val` means that callers can't initialize `Username` themselves, so I create a custom constructor that looks like this:

```go
func NewUsername(raw string) (Username, error) {
  if raw == "" {
    return Username{}, errors.New("username can't be empty")
  }
  // more validation goes here

  // Input passed all validation, so return a valid Username.
  return Username{ val: raw }, nil
}
```

The problem with this approach is that it made my tests ugly. For example, when I'm testing some other component that requires a username

```go
func (s Store) DeleteUser(username model.Username) (error) { ... }
```

I want to write a test that looks like this:

```go
user, err := store.ReadUser(model.NewUsername("joe123"))
if got, want := user.Name.String(), "joe123"; got != want {
  t.Errorf("username=%v, want=%v", got, want)
}
```

Except, I can't do that because `NewUser` can fail, so it returns a second return value of type `error`.

## My old solution: one new helper function per type

The silly thing is that I know the input can't really fail, but because I designed my codebase for rigorous parsing, I can't just skip the parsing and tell the compiler to trust me.

My old solution was to write a helper function like this:

```go
func MustCreateUsername(t testing.TB, raw string) model.Username {
  t.Helper()
  username, err := model.NewUsername(raw)
  if err != nil {
    t.Fatalf("invalid username: %s", raw)
  }
}
```

And then my test looks like this:

```go
user, err := store.ReadUser(MustCreateUsername(t, "joe123"))
if got, want := user.Name.String(), "joe123"; got != want {
  t.Errorf("username=%v, want=%v", got, want)
}
```

That worked okay, but it meant that I had to write a `MustCreateX` helper every time I wanted to use one of my custom types in a Go test.

## New solution: A single MustCreate with generics

In 2022, Go 1.18 [added support for generics](https://go.dev/doc/go1.18#generics), but I didn't see a lot of opportunities to use them. But I recently realized that Go generics offer a better solution to my `MustCreateX` problem.

Instead of defining a helper `MustCreateX` for every type, I could define a single, generic `MustCreate` test helper, so my test becomes:

```go
user, err := store.ReadUser(testutil.MustCreate(t, model.NewUsername, "joe123"))
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

So when I call this:

```go
testutil.MustCreate(t, model.NewUsername, "joe123")
```

It's equivalent to this more explicit version:

```go
testutil.MustCreate[string, model.Username](t, model.NewUsername, "joe123")
```

So, when I call `MustCreate` here, `RawInput` is `string` (the type of the raw username value), and `CreatedValue` is the created type.

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

And the call looks similar to the simple case:

```go
range := testutil.MustCreate2(t, models.NewRange, 0, 5)
```

## Conclusion

Nothing revolutionary, but it's helpful and it eliminates a lot of repetitive helper functions.
