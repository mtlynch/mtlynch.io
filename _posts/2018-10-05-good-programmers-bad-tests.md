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

When I discovered unit tests, it was love at first sight. They made so much sense. I wanted to treat unit tests with the same respect as production code. I was aghast at developers who put lots of effort into making their production code clean and maintainable, only to phone it in on their test code.

I attacked test code with the same fervor as my production code. To my horror, I learned later that this approach was wrong. I had been making my unit tests worse for years and teaching others to do the same. Here I hope to undo some of the bad lessons I accidentally propagated.

# Good production code is maintainable, good unit tests are obvious

Unit test code has different goals from production code.

The fundamental point that I and many other well-meaning developers miss is that developers use unit tests differently than production code. In what situation do you read or edit production code? Generally, it's when you're debugging a code, fixing a bug, or extending its features. In all of these cases, you 

In what situation do you read test code? The most common one is when a test fails.

# Unit test code is not like other code

The fundamentals are the same, but you should have very different design considerations. If an architect applied the exact same techniques to build a mayonnaise factory and a beach home, you'd probably end up with a beach home that doesn't feel very relaxing.

# Good unit tests are self-explanatory

What does this test do?

```python
def test_initial_balance(self):
  database = create_test_database()
  account_manager = AccountManager(database)
  account = account_manager.get_account('Timothy')
  self.assertEqual(150.0, account.get_balance())
```

Here are some questions you might ask

* Where did this `Timothy` account come from?
* Why do we expect Timothy's account balance to be 150?

So you probably assume that it's in `create_test_database` and lo and behold:

```python
def create_test_database():
  database = MockDatabase()
  database.add_row(account_name='Timothy', account_balance=150.0)
  return database
```

So now the magic number has an explanation and all is well with the world, right? No! This test is a failure because you, the reader, were forced to stray outside the function definition to understand why it passed.

**The reader should never have to read a helper method to understand your test**.

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

Most developers would appreciate the descriptiveness of the above code, but it's overly verbose and it's a pain to write out such long function names. (Unless you're a Java developer, in which case you're wondering why the function names are so terse).

Unit tests have no callers. Therefore, brevity matters less. It definitely matters &mdash; don't turn your function names into a novel just because you can, but know that the calculus is a little different because many of the factors pushing you toward shorter names don't apply when writing unit test code.

# In tests, magic numbers are your friends

Like "Don't talk to strangers," you've been told that magic numbers are not your friends and you should stay away from them. As a result, I see developers write tests like the following:

```python
def test_withdrawal(self):
  account = create_test_account(balance=TEST_STARTING_BALANCE)
  account.withdraw(TEST_WITHDRAWAL_AMOUNT)
  expected_balance = TEST_STARTING_BALANCE - TEST_WITHDRAWAL_AMOUNT
  self.assertEqual(expected_balance, account.balance())
```

Somewhere else in the file, they've defined `TEST_STARTING_BALANCE` and `TEST_WITHDRAWAL_AMOUNT` but you can understand it without knowing what they're assigned to.

Compare that to the following:

```python
def test_withdrawal(self):
  account = create_test_account(balance=50.0)
  account.withdraw(5.0)
  self.assertEqual(45.0, account.balance())
```

Don't hide important stuff in setUp
Don't hide important stuff in helper methods
Test names can be super long
Test names get printed to console on failure

Production code = developers read most of the file or class
Test code = developers read only the test that failed

Production code = maintainability is usually most important thing
Test code = obviousness is most important thing, don't fall into trap of duplicating production code in tests (e.g. don't do arithmetic on variables, just do the result)

If you find yourself wanting a lot of helper code, it's a sign that you could need a refactoring. The function under test should interact with its dependencies through simple interactions.

If it takes your tests 20 lines of boilerplate code to get the module into a usable state, it will also take that long at production callsites.