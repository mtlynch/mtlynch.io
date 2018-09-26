---
title: Why Good Developers Write Bad Unit Tests
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

# Test code is not like other code

Software development is engineering. This means that it's the developer's job to consider competing interests and weigh tradeoffs to build a solution that best satisfies the goal. But test code and production code have different goals.

When do you read or edit production code? When you're fixing a bug or extending the feature of your application. In all of these cases, you generally read or at least skim an entire class or module.

In what situation do you read test code? The most common one is when a test fails. How do you optimize for this case. Write your tests to make it as easy and fast as possible for the developer to understand why the test failed.

**Good production code is *maintainable*; good test code is *obvious*.**
{: .notice--info}

Production code is optimized for maintainability. Test code is optimized for readability. They're overlapping qualities, but there's a subtle distinction. The reason it's so easy for good developers to fail to adjust their techniques is that the design goals *seem* the same.

Think back to the skyscraper architect on the beach. Both owners value having windows and lowering energy costs, but the degree to which they value these things is different. The beach house owner cares much more about having large windows at the expense of increased energy costs. The office building owner wants enough windows so that their tenants don't feel like the building is a prison, but they care more about energy costs than the beach bum.

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

In Python, the standard unit test framework calls the `setUp` method before executing any test function, so perhaps the answers are there:

```python
def setUp():
  database = MockDatabase()
  database.add_row({
      'username': 'joe123',
      'score': 150.0
    })
  self.account_manager = AccountManager(database)
```

Ah ha! The `setUp` function created the `joe123` account with a score of 150, which explains why `test_initial_score` expected those values. Now, all is well with the world, right?

Of course not. This test is a failure because it forced you, the reader, outside the test function to understand its correctness.

# Keep the reader in your test function

**The reader should be able to understand your test without looking at any helper methods.**
{: .notice--info}

My preferred way to write.

```python
def test_initial_score(self):
  database = MockDatabase()
  database.add_row({
      'username': 'joe123',
      'score': 150.0
    })
  account_manager = AccountManager(database)
	
  initial_score = account_manager.get_score(username='joe123')
	
  self.assertEqual(150.0, initial_score)
```

My experienced readers may be thinking, "That's all well and good for a single test. But what happens if you have many tests? Won't you end up duplicating the setup code?"

Yes, I will! Here's another test from that same file:

```python
def test_increase_score(self):
  database = MockDatabase()
  database.add_row({
      'username': 'joe123',
      'score': 150.0
    })
  account_manager = AccountManager(database)
	
  account_manager.adjust_score(username='joe123',
	                       adjustment=25.0)

  self.assertEqual(175.0,
	           account_manager.get_score(username='joe123'))
```

Many good developers are strict adherents to the "DRY" principle: don't repeat yourself. To them, the above code is horrifying because I repeated six lines verbatim between two functions. A naive but well-meaning developer might come upon this code and refactor out the common lines

```python
def test_initial_score(self): # BAD: Don't do this.
  initial_score = account_manager.get_score(username='joe123')
  self.assertEqual(150.0, initial_score)

def test_increase_score(self): # BAD: Don't do this.
  account_manager.adjust_score(username='joe123',
	                       adjustment=25.0)
  self.assertEqual(175.0,
	           account_manager.get_score(username='joe123'))
```

# The DRY rule for testing: *Do* repeat yourself

Why does this rule exist? Because there's risk to making changes to production code. This risk exists in test code, but the worst bug you can introduce in test code is a false positive. You can't break anything in production because of a bug in test code (not directly anyway). There's also a risk that code will go out of sync.

DRY. Don't repeat yourself. Why not? Because if you copy/pasted a snippet of code to nine different places and then you have to change it, now you or some future developer has to track down all nine occurrences and change them. What happens if you copy/paste the same code in nine different tests? They're all in the same file and there's very low risk of breaking anything by changing them all. You ideally want to avoid repeating code in general, but the penalty for doing it in test code is much lower, and thus you should write your test code with that in mind.

# Hide implementation details the reader can ignore

I didn't include `MockDatabase` in the test function, but I chose not to. Why? The implementation details are not necessary to understanding the test. The reader can assume that it's some sort of lightweight database that supports testing. They don't need to read `MockDatabase`'s implementation to understand any claims the test makes.

First, consider whether your production code is in need of refactoring. A class that's difficult to test is often a symptom of weak design. Then, consider adding a factory or builder pattern (TODO: link) to your production code to make it easier to instantiate your class in both production and test. If none of those work, add helper methods, but be careful never to let them swallow details critical to the test.

# Use test helper methods sparingly

The more helper methods you add, the more you obscure usage of the thing you're testing.

**Best option: Refactor the code you're testing**

If the thing you're testing is so hard to exercise the code that you need a lot of boilerplate just to call it, consider refactoring it.

A class that's difficult to test is often a symptom of weak design. Consider whether you can refactor that class so that clients (both test and production) can access it more easily.

**Good option: Create a factory or builder class**

**Last option: Use a test helper method**


# Responsible test helpers

Avoid burying calls to the class you're testing in helper methods. Use helper methods to create objects that you pass in to the system you're testing.

```python
mock_database = create_test_database_with_single_user(username='joe123', score=150.0))
account_manager = AccountManager(mock_database)
```

This is not okay:

```python
# BAD: Hides instantiation of AccountManager class.
account_manager = (
  create_test_account_manager_with_single_user(
    username='joe123', score=150.0)))
```

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


Most developers would appreciate the descriptiveness of the above code, but it's overly verbose and it's a pain to write out such long function names. (Unless you're a Java developer, in which case you're wondering why the function names are so terse).

Unit tests have no callers. Therefore, brevity matters less. It definitely matters &mdash; don't turn your function names into a novel just because you can, but know that the calculus is a little different because many of the factors pushing you toward shorter names don't apply when writing unit test code.

```python
def test_when_user_has_not_selected_podcasts_get_episodes_returns_empty_list(
    self):
  mock_user = MockUser()
  podcast_manager = PodcastManager(mock_user)

  new_episodes	= podcast_manager.get_episodes()
	
  self.assertEqual([], new_episodes)
```

**When a developer causes a test to fail, the test name should be so descriptive that the developer can fix the failure without reading the test code.**
{: .notice--info}
# Summary

* Optimize test code for obviousness and simplicity
* Use test helper functions sparingly
* Prefer literal values to named constants in tests.
* Use more verbose function names for test methods than you would for production methods