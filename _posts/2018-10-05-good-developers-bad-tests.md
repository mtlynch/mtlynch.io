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
classes: wide
header:
  teaser: images/good-developers-bad-tests/cover.jpg
  og_image: images/good-developers-bad-tests/cover.jpg
---

Congratulations! You've finally written so many lines of code that you can afford your very own beach house. Money is no object, so you hire Peter Keating, world famous architect. He gained his reputation with skyscrapers, but he assures you that he has brilliant plans for your beachfront property.

Months later, you arrive at the grand unveiling. Your new home is an imposing five-story behemoth of steel, concrete, and reflective glass. You enter your vacation home through a set of revolving doors and find a reception desk backed by an elevator bank. Upstairs, your master bedroom and three guest rooms are just four adjoining office cubicles.

{% include image.html file="cover.jpg" alt="Architect presenting skyscraper on the beach" max_width="800px" img_link=true %}

Peter Keating, expert architect, can't understand why you're disappointed. "I followed **all** the best practices," he tells you, defensively. The walls are three feet thick because structural integrity is important to a building. Therefore, your home is *better* than the breezy, light-filled homes neighboring it. You may not have large oceanside windows, but Keating tells you that such windows are not best practice &mdash; they reduce energy efficiency and distract office workers.

Too often, software developers approach unit testing with the same flawed thinking. They mechanically apply all the "rules" they learned in production code and fail to examine whether the same techniques apply to tests. As a result, they build skyscrapers at the beach.

# Test code is not like other code

Software development is engineering. The developer must consider competing interests and weigh tradeoffs to build a solution that best satisfies the goal. 

Production code is optimized for maintainability. Test code is optimized for readability. They're overlapping qualities, but there's a subtle distinction. The reason it's so easy for good developers to fail to adjust their techniques is that the design goals *seem* the same.

While that's true, you probably recognize that your beach house walls don't need to support 200 tons of building on top of them, and you would have traded away some of that wall strength in favor of floor-to-ceiling windows to give you nice views of the water.

Production code and test code have different engineering tradeoffs because they have different goals.

When do you read production code? Usually, you're fixing a bug or extending existing functionality in your application. When this happens, you generally read or at least skim an entire class or module.

When do you read test code? Most commonly, when a test fails. How do you optimize for this case. Write your tests to make it as easy and fast as possible for the developer to understand why the test failed.

**Good production code is *maintainable*; good test code is *obvious*.**
{: .notice--info}

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

This is Python code, so perhaps the answers are in the `setUp` method. Python's native unit test framework invokes `setUp` before each test method:

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

No, this is a **bad test**. The reader can't understand why this test is correct unless they search outside the test itself.

# Keep the reader in your test function

The reader should be able to read a test from top to bottom with no jumping around. If the reader needs to search outside the test to understand why it's correct, the test has not done its job.

Here's a better way to write `test_initial_score` from [the previous section](#a-good-developers-bad-test):

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

Everything the reader needs is right there in the test.

**The reader should understand a test function without reading any code outside the function body.**
{: .notice--info}

My experienced readers may think, "That's all well and good for a single test. But what happens if you have many tests? Won't you end up duplicating the setup code?"

Prepare yourself for my answer, because you'll likely find it horrifying. I'm about to advocate [copy/paste programming](https://en.wikipedia.org/wiki/Copy_and_paste_programming).

# Dare to violate DRY

Here's another test of the `get_score` function I tested above:

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

To some, the above code is horrifying. The first six lines of the functions are an exact copy from the previous test.

Good developers are strict adherents to the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself): don't repeat yourself. The tests I'm writing violate DRY, so how can I claim that they're good tests? Worse, I'm arguing that my DRY-violating tests are **better** than tests that have been refactored to eliminate repeated code.

* You don't want to update one place and forget to update others
* You don't want to increase work when you have to change the repeated work
* 
Because there's risk to making changes to production code. This risk exists in test code, but the worst bug you can introduce in test code is a false positive. You can't break anything in production because of a bug in test code (not directly anyway). There's also a risk that code will go out of sync.

| Goal | Reasoning | Why it's different in test code |
|-------|----------------|--------------------------------------|
| ***Limit code churn*** | Every change to production code. | Cost of bugs is lower in test code for the simple reason that it never affects production systems. Most test bugs will reveal themselves in the form of test failures. The worst bugs are those that reduce test coverage, but 1000 lines of test code churn is generally favorable to 100 lines of production code churn. |

DRY. Don't repeat yourself. Why not? Because if you copy/pasted a snippet of code to nine different places and then you have to change it, now you or some future developer has to track down all nine occurrences and change them. What happens if you copy/paste the same code in nine different tests? They're all in the same file and there's very low risk of breaking anything by changing them all. You ideally want to avoid repeating code in general, but the penalty for doing it in test code is much lower, and thus you should write your test code with that in mind.

# Use test helper methods sparingly

Maybe you can live with copy/pasting the same five lines in every test. What if the `AccountManager` example above was more difficult to instantiate?

```python
def test_increase_score(self):
  # vvvvvvvvvvvvvvvvvvvvv Beginning of boilerplate code vvvvvvvvvvvvvvvvvvvvv
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
  # ^^^^^^^^^^^^^^^^^^^^^ End of boilerplate code ^^^^^^^^^^^^^^^^^^^^^^^^^^^

  account_manager.adjust_score(username='joe123',
	                       adjustment=25.0)

  self.assertEqual(175.0,
	           account_manager.get_score(username='joe123'))
```

That's 15 lines just to get an instance of `AccountManager` so that you can test it. This is where the "do repeat yourself" rule begins to get crazy. 15 lines of boilerplate in every test function will obscure the logic that you're trying to test. Your natural inclindation might be to refactor your test code to eliminate the duplicate code. Sometimes it's your only choice, but it should be your last option. Instead, try to refactor the production code.

**Best option: Refactor the system you're testing**

If you need a lot of boilerplate code simply to call the system you're testing, that may indicate a flaw in your design. Take another look at the line in the test above where that creates the object under test:

```python
account_manager = AccountManager(user_database,
                                 privilege_manager,
                                 url_downloader)
```
Why does it manipulate one database directly, but it needs access to another database indirectly through the `PrivilegeManager` class? And what is it doing with a URL downloader, which seems logically distant from its other two parameters?

In this case, the best thing to do is refactor `AccountManager`. You'll not only make the class easier to test, you'll make the code easier for production clients to use.

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

It hides boilerplate code, but the reader can still see all ther interactions with `AccountManager`, the class you're testing.

In contrast, this is a weaker use of a test helper method:

```python
# BAD: Hides instantiation of AccountManager class.
account_manager = (
  create_test_account_manager_with_single_user(
    username='joe123', score=150.0)))
```

If the test is exercising `AccountManager`, you should instantiate it in the method itself.

**Look for opportunities to refactor production code to eliminate the need for test helper methods.**
{: .notice--info}
# Go crazy with test names

Good developers write function names that are concise. Imagine naming a function in production code and you had a choice between the following two names:

* `userExistsAndTheirAccountIsInGoodStandingWithAllBillsPaid`
* `isAccountActive`

Most developers would choose the second option because it's much shorter and conveys roughly the same information (caveat: Java developers likely find both names offensively terse). 

Circumstances are different for test functions. Developers never write *calls* to test functions, so that consideration is gone. A developer only has to type out a test name once: in the function signature. Given this, brevity matters, but it matters much less than for other functions. Therefore.

Suppose you have a class that looks like this:

```c++
class Tokenizer {
 public:
  Tokenizer(std::unique_ptr<TextStream> stream);
  std::unique_ptr<Token> NextToken();
 private:
  std::unique_ptr<TextStream> stream_;
};
```

Now, imagine that you modified `Tokenizer`, ran your tests, and discovered that the following test failed:

* ` TokenizerTest.TestNextToken`

Would you know what you broke in the production code that caused the test to fail? Probably not. `TestNextToken` tells you that you broke functionality related to the `NextToken()` method, but that doesn't mean much. To diagnose the failure, you'd  have to read the test itself to understand the problem.

What if you modified `Tokenizer`, ran your test suite, and saw this:

```text
[ RUN      ] TokenizerTests.ReturnsNullptrWhenStreamIsEmpty
c:\projects\archiver\archivertests\tokenizertests.cpp(8): error:       Expected: nullptr
      Which is: 4-byte object <00-00 00-00>
To be equal to: tokenizer.NextToken()
      Which is: 4-byte object <48-2A 83-01>
[  FAILED  ] TokenizerTests.ReturnsNullptrWhenStreamIsEmpty (6 ms)
```

A function called `ReturnsNullptrWhenStreamIsEmpty` would feel overly verbose in other contexts, but it's a good test name. It tells the reader exactly what it is asserting about the production code. A developer could likely fix this break without ever reading the test's implementation. That's the mark of a good test name.

**A good test name is so descriptive that a developer can diagnose a failure from the test name alone.**
{: .notice--info}

# Embrace magic numbers

"Don't use magic numbers."

It's the "don't talk to strangers" of the programming world. A "magic number" is a value in .

```python
# BAD: Magic numbers in production code.
image_converter.set_brightness_threshold(27.39, 8)
```

It becomes so ingrained in many talented developers that they never consider when a magic number might improve their code. In unit tests, magic numbers almost always make the code better.

Consider the following test:

```python
def test_add_hours(self):
  TEST_STARTING_HOURS = 72.0
  TEST_HOURS_INCREASE = 8.0
  hours_tracker = BillableHoursTracker(initial_hours=TEST_STARTING_HOURS)
  hours_tracker.add_hours(TEST_HOURS_INCREASE)
  expected_billable_hours = TEST_STARTING_HOURS + TEST_HOURS_INCREASE
  self.assertEqual(expected_billable_hours, hours_tracker.billable_hours())
```

If you believe magic numbers are universally evil, the above test looks correct to you. `72.0` and `8.0` have named constants, so nobody can accuse the test of using magic numbers.

Now, imagine if you wrote the same test, but you indulged the forbidden fruit of magic numbers:

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
| ***Expressiveness*** | Named constants explain intent better more clearly than a literal value like `8`. | The *test name* should convey the intent of the test. When the reader sees a magic number in your unit test code and wonders why chose it, the answer should be in the test name. | 
| ***Consistency*** | If you need to change the value, it's easier and safer to change it in a single place. | Nothing should depend on constants in a unit test. If you want to share a constant between a test helper method and the unit test body, you're probably [abusing helper methods](#use-test-helper-methods-sparingly). |
| ***Disambiguation*** | Named constants allow the reader to distinguish between two instances of a value that must be equal and two instances that are equal by coincidence. | Still a concern in tests, but you can usually write around it. If you're choosing values arbitrarily, avoid numbers that seem related. |

**Avoid creating named constants in test code. Use magic numbers instead.**
{: .notice--info}

# Summary

Remember the "engineering" part of software engineering. When you write test code, you still have the same concerns as production code, but they have different weights. You need to think about how the different weights of those concerns affects the way you're accustomed to writing production code.

If you're a good developer and want to avoid writing bad tests, here are some guidelines to follow in test code:

* Optimize for obviousness over maintainability.
* Avoid helper methods outside of your test functions.
* Use literal values (magic numbers) instead of defining named constants.
* Use more verbose names for test methods than you would in production code.