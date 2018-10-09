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
header:
  teaser: images/good-developers-bad-tests/cover.jpg
  og_image: images/good-developers-bad-tests/cover.jpg
---

Imagine that Facebook acquires your tech startup, netting you enough money to build your own beach house. You commission an-up-and-coming architect named Peter Keating. He's famous for his skyscrapers but has brilliant plans for your beach house.

Months later, you arrive at your finished beach house to find that the walls are made of three-foot-thick concrete. Your foyer is a reception desk backed by a bank of elevators to ferry people among the house's three stories. You take the elevator upstairs and discover that your master bedroom and three guest bedrooms are just four adjoining cubicles.

What happened? Your architect robotically applied all of his usual office building elements to your vacation home. Now, your "beach house" is just a skyscraper at the beach.

Many software developers make the same mistake when writing unit test code. They learn all the best practices for writing production code, then blindly apply the exact same techniques to test code. They build skyscrapers at the beach.

{% include image.html file="cover.jpg" alt="Architect presenting skyscraper on the beach" max_width="800px" img_link=true %}

# Test code is not like other code

Software development is engineering. The developer must consider competing interests and weigh tradeoffs to build a solution that best satisfies the goal. Production code and test code have different engineering tradeoffs because they have different goals.

When do you read production code? Usually, you're fixing a bug or extending existing functionality in your application. When this happens, you generally read or at least skim an entire class or module.

When do you read test code? Most commonly, when a test fails. How do you optimize for this case. Write your tests to make it as easy and fast as possible for the developer to understand why the test failed.

**Good production code is *maintainable*; good test code is *obvious*.**
{: .notice--info}

Production code is optimized for maintainability. Test code is optimized for readability. They're overlapping qualities, but there's a subtle distinction. The reason it's so easy for good developers to fail to adjust their techniques is that the design goals *seem* the same.

Think back to the skyscraper architect on the beach. Both owners value having windows and lowering energy costs, but the degree to which they value these things is different. The beach house owner cares much more about having large windows at the expense of increased energy costs. The office building owner wants enough windows so that their tenants don't feel like the building is a prison, but they care more about energy costs than the beach bum.

For the rest of this post, I'm going to demonstrate several pitfalls that good developers fall into when they try to bring the lessons of production code to unit tests.

# A good developer's bad test

I often see otherwise talented developers write tests that look like the following:

```python
def test_initial_score(self):
  initial_score = self.account_manager.get_score(username='joe123')
  self.assertEqual(150.0, initial_score)
```

What does that test do? It retrieves a "score" for a user with the name `joe123` and verifies that the user's score is 150. With no other knowledge of this code, you should have the following questions:

1. Where did the `joe123` account come from?
1. Why do I expect `joe123`'s score to be 150?

This is Python code, so perhaps the answers are in `setUp`, the method that Python's native unit test framework calls before executing each test method:

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

No, this is a **bad test**. The reader can't understand why this test works unless they search outside the test itself.

# Keep the reader in your test function

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

A reader can understand 

**The reader should understand a test function without reading any code outside the function body.**
{: .notice--info}

My experienced readers may think, "That's all well and good for a single test. But what happens if you have many tests? Won't you end up duplicating the setup code?"

Yes, I'm going to commit the sin of copy/pasting a block of code many times. Here's another test of the same class:

```python
def test_increase_score(self):
  database = MockDatabase()                  # <
  database.add_row({                         # <
      'username': 'joe123',                  # <--- Copy/pasted from
      'score': 150.0                         # <--- previous test
    })                                       # <
  account_manager = AccountManager(database) # <
	
  account_manager.adjust_score(username='joe123',
	                       adjustment=25.0)

  self.assertEqual(175.0,
	           account_manager.get_score(username='joe123'))
```

Many good developers are strict adherents to the "DRY" principle: don't repeat yourself. To them, the above code is horrifying because I repeated six lines verbatim between two functions. A naive but well-meaning developer might come upon this code and refactor out the common lines, degrading the code back to where it was at the start of this post where the reader was left to wonder where `joe123` and `150` came from.

# Dare to violate DRY

One of the most commonly accepted software principles is the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). It means "don't repeat yourself." Why does this rule exist?

* You don't want to update one place and forget to update others
* You don't want to increase work when you have to change the repeated work
* 
Because there's risk to making changes to production code. This risk exists in test code, but the worst bug you can introduce in test code is a false positive. You can't break anything in production because of a bug in test code (not directly anyway). There's also a risk that code will go out of sync.

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

# Go crazy with test names

Good developers write function names that are concise. Imagine that you're naming a function and deciding between the following two names:

* `userExistsAndTheirAccountIsInGoodStandingWithAllBillsPaid`
* `isAccountActive`

Most developers would choose the second option (except for Java developers, for whom both names are offensively terse). The first name conveys more information, but the second name conveys a similar idea and doesn't clutter up the screen or burden callers with a 57-character name on every invocation.

Circumstances are different for test functions. Developers never write *calls* to test functions, so that consideration is gone. A developer only has to type out a test name once: in the function signature. Given this, brevity matters, but it matters much less than for other functions. Therefore.

Imagine that you're testing a function that looks like this:

```c++
class PodcastManager {
 public:
  void AddPodcast(Podcast* podcast);
  void ClearSubscriptions();
  int SubscriptionCount();
}
```

Now imagine the following test name:

* `PodcastManagerTest.SubscriptionCount`

What does that test do? If you modified `PodcastManager`, ran the unit test suite, and saw that test fail, would you know what you broke? Probably not. You would have to go read the implelementation for `PodcastManagerTest.SubscriptionCount` to figure out what happened.

Imagine instead that the developer recognized that test functions don't need terse names, so they instead called the test:

* `PodcastManagerTest.ClearSubscriptionsResetsSubscriptionCountToZero`

You can guess what the test implementation looks like pretty accurately just from the name. If you're reading through the test code to understand, you don't have to expend mental effort figuring out what the test is really doing. If you modified `PodcastManager`, ran your test suite, and saw this:

```text
[----------] 1 test from PodcastManagerTests
[ RUN      ] PodcastManagerTests.ClearSubscriptionsResetsSubscriptionCountToZero
PodcastManagerTests.cpp(50): : error:       Expected: SubscriptionCount()
      Which is: 1
To be equal to: 0
[  FAILED  ] PodcastManagerTests.ClearSubscriptionsResetsSubscriptionCountToZero (4 ms)
[----------] 1 test from PodcastManagerTests (4 ms total)
```

You could probably fix the break without ever reading that test's implementation. That's the mark of a good test name.

**Test names should be so descriptive that a developer can diagnose a test failure from the name alone.**
{: .notice--info}

# Embrace magic numbers

"Don't use magic numbers."

It's the "don't talk to strangers" of the programming world. It becomes so ingrained in many talented developers that they never even consider when a magic number might improve their code. In unit tests, magic numbers almost always make the code better.

Consider the following test, which uses named constants instead of magic numbers:

```python
def test_add_hours(self):
  TEST_STARTING_HOURS = 72.0
  TEST_HOURS_INCREASE = 8.0
  hours_tracker = BillableHoursTracker(initial_hours=TEST_STARTING_HOURS)
  hours_tracker.add_hours(TEST_HOURS_INCREASE)
  expected_billable_hours = TEST_STARTING_HOURS + TEST_HOURS_INCREASE
  self.assertEqual(expected_billable_hours, hours_tracker.billable_hours())
```

If you believe you should never see magic numbers in code, the above test looks correct to you. `72.0` and `8.0` have named constants, so nobody can accuse the test of using magic numbers.

Now, taste the forbidden fruit of magic numbers:

```python
def test_add_hours(self):
  hours_tracker = BillableHoursTracker(initial_hours=72.0)
  hours_tracker.add_hours(8.0)
  self.assertEqual(80.0, hours_tracker.billable_hours())
```

The second example is simpler, with only half as many lines. And it's more obvious. The reader doesn't have to jump around the function tracking names of constants. Magic numbers made this test better.

There are good reasons that magic numbers were added to developers' bad lists, but I'll examine them and decide whether these reasons apply in unit test code:

| Goal | Reasoning | Why it's different in test code |
|-------|----------------|--------------------------------------|
| ***Expressiveness*** | Named constants provide more context for the intent or concept better than a literal value like `8`. | The *test name* should convey the intent of the test. When the reader sees a magic number in your unit test code and wonders why you selected that value, the answer should either be in the test name itself or simply "it's an arbitrary value." | 
| ***Consistency*** | If you need to change the value, it's easier and safer to change it in a single place. | Nothing should depend on constants in a unit test. If you have a situation both a test helper method and the unit test body need to share access to a constant, it likely means that you're abusing helper methods. |
| ***Disambiguation*** | Named constants allow the reader to distinguish between two instances of a value that must be equal and two instances that are equal by coincidence. | You can usually write around it. If you're choosing values arbitrarily, avoid numbers that seem related. |

**Use magic numbers instead of defining named constants in test code.**
{: .notice--info}

Note that I'm advocating using magic numbers instead of *defining* named constants.

# Summary

Remember the "engineering" part of software engineering. When you write test code, you still have the same concerns as production code, but they have different weights. You need to think about how the different weights of those concerns affects the way you're accustomed to writing production code.

If you're a good developer and want to avoid writing bad tests, here are some guidelines to follow in test code:

* Optimize for obviousness over maintainability.
* Avoid helper methods outside of your test functions.
* Prefer literal values (magic numbers) to defining named constants.
* Use more verbose names for test methods than you would in production code.