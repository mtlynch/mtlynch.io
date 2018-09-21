---
title: Why Good Programmers Write Bad Unit Tests
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
sidebar:
  nav: main
---

Imagine that you're hiring an architect to build your beach house. You commission a famous architect in your city by the name of Peter Keating. He's famous for building skyscrapers, and he tells you he's going to . You arrive at your finished beach house and find that the walls are 2 feet thick, there's a service elevator big enough to fit a truck, and your living room is just a reception desk. He technically built a beach house, but he didn't change his techniques at all to match how your use of a beach house differs from 

One of the most common problems that otherwise good developers have is that they build skyscrapers at the beach.

For years, I fell into this trap. I thought I was doing a good job writing tidy test code. In reality, I was writing mediocre test code because I never considered how the goals of test code differ from the goals of production code.

TODO: Cartoon of a row of three beach houses. The two on the side are normal and have nice patios. The middle one looks like a mini skyscraper. It has a revolving door, very small windows, and a spire.

# Unit test basics

To clarify the semantics, when I say "production code," I'm referring to code that runs in production, when real users interact with your software. For the purposes of this article "test code" refers to unit test code. There are many types of test code beyond unit tests, but forget about them for simplicity. The "system under test" is the component that a unit test exercises.

If you have a function like this:

```python
def is_palindrome(word):
  ...
```

Then your unit tests mght look like this:

```python
def test_is_palindrome(self):
  self.assertTrue(is_palindrome('tacocat'))
```

# Test code is not like other code


When do you read or edit production code? When you're fixing a bug or extending the feature of your application. In all of these cases, you generally read or at least skim an entire class or module.

In what situation do you read test code? The most common one is when a test fails. How do you optimize for this case. Write your tests to make it as easy and fast as possible for the developer to understand why the test failed.

**Test code has different goals from production code. Good production code is *maintainable*; good test code is *obvious*.**
{: .notice--info}

Production code is optimized for maintainability. Test code is optimized for readability. They're overlapping qualities, but there's a subtle distinction.

| Production code | Unit tests |
|----------------------|-------------|
| Changes involve **risk**. Changes may affect external clients of the code or downstream dependencies. | Changes are very **low-risk**. No production code calls unit tests. |
| A component can have many callers and dependencies. | Never has callers. |

Programming is engineering. The programmer's job is to weigh competing interests and develop a solution that satisfies them. Think back to the skyscraper architect on the beach. Both skyscrapers and beach houses need windows, but the owner of the beach house probably wants much larger windows so that they can enjoy their view of the ocean. Both need need doorways, but the skyscraper will have tenants moving furniture and other large pieces in and out much more frequently, so they need larger doorways. The architect needs to 

The reason it's so easy for good developers to fail to adjust their techniques is that the design goals *seem* the same.

DRY. Don't repeat yourself. Why not? Because if you copy/pasted a snippet of code to nine different places and then you have to change it, now you or some future developer has to track down all nine occurrences and change them. What happens if you copy/paste the same code in nine different tests? They're all in the same file and there's very low risk of breaking anything by changing them all. You ideally want to avoid repeating code in general, but the penalty for doing it in test code is much lower, and thus you should write your test code with that in mind.


The fundamental point that I and many other well-meaning developers miss is that developers use unit tests differently than production code. In what situation do you read or edit production code? Generally, it's when you're debugging a code, fixing a bug, or extending its features. In all of these cases, you 

In what situation do you read test code? The most common one is when a test fails. How do you optimize for this case. Write your tests to make it as easy and fast as possible for the developer to understand why the test failed.

# A good developer's bad test

Here's a style of test I see very often from good developers:

```python
def test_initial_score(self):
  initial_score = self.account_manager.get_score(username='joe123')
  self.assertEqual(150.0, initial_score)
```

What does that test do? You can tell that it retrieves a "score" for a user with the name `joe123`. It then verifies that the user's score is 150.

With no other knowledge of this code, you should be asking:

* Where did this `joe123` account come from?
* Why do I expect the score to be 150?

In Python, the standard unit test framework calls a method called `setUp` before executing any test function, so perhaps the answers are there:

```python
def setUp():
  database = MockDatabase()
  database.add_row({
      'username': 'joe123',
      'score': 150.0
    })
  self.account_manager = AccountManager(database)
```

Ah ha! The `setUp` function created the `joe123` account with a score of 150, so now you understand why `test_initial_score` expected those values. Now, all is well with the world, right?

No! This test is a failure because it forced you, the reader, outside the test function to understand its correctness.

# Keep the reader in your test function

**The reader should be able to understand your test without looking at any helper methods.**
{: .notice--info}

My preferred way to write.

```python
def test_initial_balance(self):
  database = MockDatabase()
  database.add_row({
      'username': 'joe123',
      'score': 150.0
    })
  account_manager = AccountManager(database)
	
  initial_score = account_manager.get_score(username='joe123')
	
  self.assertEqual(150.0, initial_score)
```

I didn't include `MockDatabase` in the test function, but I chose not to. Why? The implementation details are not necessary to understanding the test. The reader can assume that it's some sort of lightweight database that supports testing. They don't need to read `MockDatabase`'s implementation to understand any claims the test makes.

# In tests, magic numbers are your friends

Like "Don't talk to strangers," you've been told that magic numbers are not your friends and you should stay away from them. As a result, I see developers write tests like the following:

```python
def test_withdrawal(self):
  TEST_STARTING_BALANCE = 100.0
  TEST_WITHDRAWAL_AMOUNT = 5.0
  account = create_test_account(balance=TEST_STARTING_BALANCE)
  account.withdraw(TEST_WITHDRAWAL_AMOUNT)
  expected_balance = TEST_STARTING_BALANCE - TEST_WITHDRAWAL_AMOUNT
  self.assertEqual(expected_balance, account.balance())
```

Compare that to the following:

```python
def test_withdrawal(self):
  account = create_test_account(balance=50.0)
  account.withdraw(5.0)
  self.assertEqual(45.0, account.balance())
```

# Good test names are more descriptive than other functions

Good developers write function names that are concise. The names should be descriptive and clear, but the programmer still has to weigh a verbose name against the cost of writing it out every single time

```c
  if (userExistsAndTheirAccountIsInGoodStandingWithAllBillsPaid(user_id)) {
    for (int i = 0;
         i < numberOfPodcastsToWhichTheUserHasRequestedRegularUpdates(
           user_id);
         i++) {
      retrieveLatestEpisodeOfPodcastForUser(user_id, i);
    }
  }
```

**When a test fails, its name should be so descriptive that the developer can fix the failure without reading the test implementation.**

Most developers would appreciate the descriptiveness of the above code, but it's overly verbose and it's a pain to write out such long function names. (Unless you're a Java developer, in which case you're wondering why the function names are so terse).

Unit tests have no callers. Therefore, brevity matters less. It definitely matters &mdash; don't turn your function names into a novel just because you can, but know that the calculus is a little different because many of the factors pushing you toward shorter names don't apply when writing unit test code.


### Garbage


If you find yourself wanting a lot of helper code, it's a sign that you could need a refactoring. The function under test should interact with its dependencies through simple interactions.

If it takes your tests 20 lines of boilerplate code to get the module into a usable state, it will also take that long at production callsites.

When I discovered unit tests, it was love at first sight. They made so much sense. I wanted to treat unit tests with the same respect as production code. I was aghast at developers who put lots of effort into making their production code clean and maintainable, only to phone it in on their test code.

I attacked test code with the same fervor as my production code. To my horror, I learned later that this approach was wrong. I had been making my unit tests worse for years and teaching others to do the same. Here I hope to undo some of the bad lessons I accidentally propagated.