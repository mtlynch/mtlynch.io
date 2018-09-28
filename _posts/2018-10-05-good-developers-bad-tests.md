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

When do you read production code? When you're fixing a bug or extending existing functionality in your application. In all of these cases, you generally read or at least skim an entire class or module.

When do you read test code? The most common one is when a test fails. How do you optimize for this case. Write your tests to make it as easy and fast as possible for the developer to understand why the test failed.

**Good production code is *maintainable*; good test code is *obvious*.**
{: .notice--info}

Production code is optimized for maintainability. Test code is optimized for readability. They're overlapping qualities, but there's a subtle distinction. The reason it's so easy for good developers to fail to adjust their techniques is that the design goals *seem* the same.

Think back to the skyscraper architect on the beach. Both owners value having windows and lowering energy costs, but the degree to which they value these things is different. The beach house owner cares much more about having large windows at the expense of increased energy costs. The office building owner wants enough windows so that their tenants don't feel like the building is a prison, but they care more about energy costs than the beach bum.

# A good developer's bad test

Here's a style of test I see very often from otherwise talented developers:

```python
def test_initial_score(self):
  initial_score = self.account_manager.get_score(username='joe123')
  self.assertEqual(150.0, initial_score)
```

What does that test do? You can tell that it retrieves a "score" for a user with the name `joe123`. It then verifies that the user's score is 150.

With no other knowledge of this code, you should have the following two questions:

* Where did the `joe123` account come from?
* Why do I expect the score to be 150?

In Python, the native unit test framework calls the `setUp` method before executing any test function, so perhaps the answers are there:

```python
def setUp():
  database = MockDatabase()
  database.add_row({
      'username': 'joe123',
      'score': 150.0
    })
  self.account_manager = AccountManager(database)
```

Okay, the `setUp` function created the `joe123` account with a score of 150, which explains why `test_initial_score` expected those values. Now, all is well with the world, right?

Of course not. This is a bad test. It forced you, the reader, to search outside the test function to understand its correctness.

# Keep the reader in your test function



**The reader should be able to understand a test function without reading any code outside the function body.**
{: .notice--info}

Here is a better way to write the above test that conveys the meaning to the reader straightforwardly:

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

Yes, I will! Here another test of the same class:

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

Many good developers are strict adherents to the "DRY" principle: don't repeat yourself. To them, the above code is horrifying because I repeated six lines verbatim between two functions. A naive but well-meaning developer might come upon this code and refactor out the common lines, degrading the code back to where it was at the start of this post where the reader was left to wonder where `joe123` and `150` came from.

# The DRY rule for testing: *Do* repeat yourself

Why does this rule exist? Because there's risk to making changes to production code. This risk exists in test code, but the worst bug you can introduce in test code is a false positive. You can't break anything in production because of a bug in test code (not directly anyway). There's also a risk that code will go out of sync.

DRY. Don't repeat yourself. Why not? Because if you copy/pasted a snippet of code to nine different places and then you have to change it, now you or some future developer has to track down all nine occurrences and change them. What happens if you copy/paste the same code in nine different tests? They're all in the same file and there's very low risk of breaking anything by changing them all. You ideally want to avoid repeating code in general, but the penalty for doing it in test code is much lower, and thus you should write your test code with that in mind.

# Use test helper methods sparingly

Maybe you can live with copy/pasting the same five lines in every test. What if the `AccountManager` example above was more difficult to instantiate?

```python
def test_increase_score(self):
  # Beginning of boilerplate code
  user_database = MockDatabase()
  user_database.add_row({
      'username': 'joe123',
      'score': 150.0
    })
  privilege_database = MockDatabase()
  privilege_database.add_row({
      'privilege': 'upvote',
      'minimum_score': 200.0
    })
  privilege_manager = PrivilegeManager(privilege_database)
  url_downloader = UrlDownloader()
  account_manager = AccountManager(user_database,
	                           privilege_manager,
	                           url_downloader)
  # End of boilerplate code

  account_manager.adjust_score(username='joe123',
	                       adjustment=25.0)

  self.assertEqual(175.0,
	           account_manager.get_score(username='joe123'))
```

That's 15 lines just to get an instance of `AccountManager` so that you can test it. This is where the "do repeat yourself" rule begins to get crazy. 15 lines of boilerplate in every test function will obscure the logic that you're trying to test. Your natural inclindation might be to refactor your test code to eliminate the duplicate code, which you can do, but it should be your last option:

**Best option: Refactor the system you're testing**

If you need a lot of boilerplate code simply to call the system you're testing, that may indicate a flaw in your design. This is the case with the `AccountManager` example above. Why does it manipulate one database directly, but it needs access to another database indirectly through the `PrivilegeManager` class? And what is it doing with a URL downloader, which seems logically distant from its contructor's other two parameters? In this case, the best thing to do. You'll not only make the class easier to test, you'll make the code easier for production clients to use.

**Good option: Create a factory or builder class**

Sometimes you don't have the freedom to go tearing apart a class. In these cases, you can simplify your test code by creating a factory or builder for the class you're testing.

**Last option: Use a test helper method**

The more helper methods you add, the more you obscure usage of the thing you're testing. If you choose this route, be careful:

* Never put values in the helper methods that readers need to know to understand your test
* Avoid 

Test helper methods are best used to prepare inputs to the system you're testing or to verify its output. When you start burying calls to the system you're testing in helper methods, you make it difficult for the reader to understand how the test interacts with the system under test.

For example, this is a reasonable use of a helper method:

```python
# OK: Uses a helper method to create an input to AccountManager.
mock_database = create_test_database_with_single_user(
  username='joe123', score=150.0))
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

"Don't use magic numbers." It's the "don't talk to strangers" of the programming world. New developers constantly hear this lesson repeated, so they learn to always use named constants instead of committing the sin of magic numbers.

This is a good rule to apply to production code, but it's not what you should do in tests. I often see good developers write tests like the following:

```python
def test_add_hours(self):
  TEST_STARTING_HOURS = 72.0
  TEST_HOURS_INCREASE = 8.0
  hours_tracker = BillableHoursTracker(initial_hours=TEST_STARTING_HOURS)
  hours_tracker.add_hours(TEST_HOURS_INCREASE)
  expected_billable_hours = TEST_STARTING_HOURS + TEST_HOURS_INCREASE
  self.assertEqual(expected_billable_hours, hours_tracker.billable_hours())
```

Compare that to the version below that replaces named constants with the forbidden fruit of magic numbers:

```python
def test_add_hours(self):
  hours_tracker = BillableHoursTracker(initial_hours=72.0)
  hours_tracker.add_hours(8.0)
  self.assertEqual(80.0, hours_tracker.billable_hours())
```

The second example is simpler, with only half as many lines. And it's more obvious. The reader doesn't have to jump around the function tracking names of constants. Magic numbers made this test better.

Why is it okay to break rules about magic numbers in tests? Recall why the rule exists. One big reason is that you don't want the reader to wonder where a value came from. This is what you don't want to do in production code:

```python
total_time = total_days * 86400 # BAD: Magic numbers don't belong in production code
```

The reader will wonder what 86,400 means (it's the total number of seconds in a standard day). But the reader shouldn't ever wonder about that in tests because the answer is always, "It's a number I pulled out of thin air  value chosen to exercise the code." Naming the value of `72.0` a name doesn't change the fact that it's just an arbitrary number and it doesn't make the number any more clear.

The other big reason for the "don't use magic numbers" rule is that you never want to be in a situation where multiple parts of the code rely on the value and you don't want to update one part and forget to update another. This is less of a concern in test code, where the scope of a variable is just a small, tightly scoped test function. But even if you do have multiple parts that rely on the same value, you don't have to worry much about remembering to update all of them because if you forget, your test will remind you by failing.

**Use magic numbers instead of named constants in test code.**
{: .notice--info}

# Go crazy with test names

Good developers write function names that are concise. Imagine the following two names:

* `accountIsActive`
* `userExistsAndTheirAccountIsInGoodStandingWithAllBillsPaid`

Most developers would choose the first option (except for Java developers, for whom both names are shocking terse). The second name conveys more information, but the first name conveys a similar idea and doesn't clutter up the screen or burden callers with typing a 57-character name on every invocation.

Circumstances are different for test functions. Developers never write *calls* to test functions, so that consideration is gone. A developer only has to type out a test name once: in the function signature. Given this, brevity matters, but it matters much less than for other functions. Therefore.

Imagine that you're testing a function that looks like this:

```c++
class PodcastManager {
 public:
  void add_podcast(Podcast* podcast);
  void clear_subscriptions();
  int subscription_count();
}
```

Now imagine the following test name:

* `test_subscription_count`

What does that test do? If you modified `PodcastManager`, ran the unit test suite, and saw that test fail, would you know what you broke? Probably not. You would have to go read the implelementation for `test_subscription_count` to figure out what happened.

Imagine instead that the developer recognized that test functions don't need terse names, so they instead called the test:

* `test_clear_subscriptions_resets_subscription_count_to_zero`

You can guess what the test implementation looks like pretty accurately just from the name. If you're reading through the test code to understand, you don't have to expend mental effort figuring out what the test is really doing. If you modified `PodcastManager`, ran your test suite, and saw this:

TODO: Match gtest output

```text
[ RUN      ] Fixture.foo
/home/imk/dev/so/gtest/main.cpp:19: Failure
      Expected: 1
To be equal to: 0
Fixture::TearDown sees failures
[  FAILED  ] Fixture.foo (0 sec)
```

You could probably fix the break without ever reading that test's implementation. That's the mark of a good test name.

**A test name should be so descriptive that the developer can diagnose failures of that test without reading its implementation.**
{: .notice--info}
# Summary

Remember the "engineering" part of software engineering. When you write test code, you still have the same concerns as production code, but they have different weights. You need to think about how the different weights of those concerns affects the way you're accustomed to writing production code.

If you're a good developer and want to avoid writing bad tests, here are some guidelines to follow in test code:

* Optimize for obviousness over maintainability.
* Avoid helper methods outside of your test functions.
* Prefer literal values (magic numbers) to named constants.
* Use more verbose names for test methods than you would in production code.