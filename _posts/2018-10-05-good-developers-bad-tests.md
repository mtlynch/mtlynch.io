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

Months later, you arrive at the grand unveiling. Your new home is an imposing five-story behemoth of steel, concrete, and reflective glass. You enter through a set of revolving doors and find a reception desk backed by an elevator bank. Upstairs, your master bedroom and three guest rooms are just four adjoining office cubicles.

{% include image.html file="cover.jpg" alt="Architect presenting skyscraper on the beach" max_width="800px" img_link=true %}

Peter Keating, expert architect, can't understand why you're disappointed. "I followed **all** the best practices," he tells you, defensively. The walls are three feet thick because structural integrity is important to a building. Therefore, your home is *better* than the breezy, light-filled homes neighboring it. You may not have large oceanside windows, but Keating tells you that such windows are not best practice &mdash; they reduce energy efficiency and distract office workers.

Too often, software developers approach unit testing with the same flawed thinking. They mechanically apply all the "rules" they learned in production code and fail to examine whether the same techniques apply to tests. As a result, they build skyscrapers at the beach.

# Test code is not like other code

The reason so many developers get confused about how to practice good engineering on test code is that the design goals *seem* the same as production code, but there are important differences. To understand them, think about the circumstances in which you read each type of code.

You typically read production code when fixing a bug or extending functionality in your application. When this happens, you generally read or at least skim an entire class or module. The most common scenario for reading test code is when a test fails. Most commonly, when a test fails. How do you optimize for this case. Write your tests to make it as easy and fast as possible for the developer to understand why the test failed.

Production code is all about abstractions. Good production hides complexity in functions and other classes. Test codes are a whole other ball game. You want as little abstraction as possible in test code. Tests are a diagnostic tool, so it should be as simple and obvious as possible.

What if your ruler didn't measure in inches or centimeters but in abstract "ruler units", then you looked at a chart to map ruler units to the unit of measure you want?

Tests are a diagnostic tool and act as living documentation. When you're diagnosing a problem, you want as little abstraction as possible.

The developer must consider competing interests and weigh tradeoffs to build a solution that best satisfies the goal. 

Production code is optimized for maintainability. Test code is optimized for readability. They're overlapping qualities, but there's a subtle distinction. The reason it's so easy for good developers to fail to adjust their techniques is that the design goals *seem* the same.

Production code and test code have different engineering tradeoffs because they have different goals.




Good production code abstracts complexity away. Good test code should be simple and obvious. When a test break and you're trying to diagnose the cause, abstraction makes things harder. You don't want the problem hidden behind layers of abstraction; you want to know in the simplest terms what the test is doing.

**Good production code is maintainable; good test code is *obvious*.**
{: .notice--info}

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

Perhaps the answers are in the `setUp` method, which the test framework calls before executing each test function:

```python
def setUp(self):
  database = MockDatabase()
  database.add_row({
      'username': 'joe123',
      'score': 150.0
    })
  self.account_manager = AccountManager(database)
```

Okay, the `setUp` method created the `joe123` account with a score of 150, which explains why `test_initial_score` expected those values. Now, all is well with the world, right?

No, this is a **bad test**. The reader can't understand why this test is correct unless they search outside the test itself.

# Keep the reader in your test function

The reader should be able to read a test in a straight line from top to bottom. If they have to jump out of the test to read another function, the test has not done its job.

Here's a better way to write the test from the previous section:

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

All I did was inline the code that was previously in `setUp` but it made a world of difference. Now, everything the reader needs is right there in the test. It also has a clear structure of [arrange, act, assert](http://wiki.c2.com/?ArrangeActAssert), making it easier for anyone familiar with that pattern to understand.

**The reader should understand a test function without reading any code outside the function body.**
{: .notice--info}

My experienced readers may think, "That's all well and good for a single test. But what happens if you have many tests? Won't you end up duplicating the setup code?"

Prepare yourself, because you'll likely find my answer shocking: I'm about to advocate [copy/paste programming](https://en.wikipedia.org/wiki/Copy_and_paste_programming).

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

To some, the above code is horrifying. The first six lines are an exact copy from the previous test.

Good developers are strict adherents to the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself): don't repeat yourself. The tests I'm writing violate DRY, so how can I claim that they're good tests? Worse, I'm arguing that my DRY-violating tests are **better** than tests that have been refactored to eliminate repeated code.

* You don't want to update one place and forget to update others
* You don't want to increase work when you have to change the repeated work
* 
Because there's risk to making changes to production code. This risk exists in test code, but the worst bug you can introduce in test code is a false positive. You can't break anything in production because of a bug in test code (not directly anyway). There's also a risk that code will go out of sync.

| Goal | Reasoning | Why it's different in test code |
|-------|----------------|--------------------------------------|
| ***Limit code churn*** | Every change to production code. | Cost of bugs is lower in test code for the simple reason that it never affects production systems. Most test bugs will reveal themselves in the form of test failures. The worst bugs are those that reduce test coverage, but 1000 lines of test code churn is generally favorable to 100 lines of production code churn. |

DRY. Don't repeat yourself. Why not? Because if you copy/pasted a snippet of code to nine different places and then you have to change it, now you or some future developer has to track down all nine occurrences and change them. What happens if you copy/paste the same code in nine different tests? They're all in the same file and there's very low risk of breaking anything by changing them all. You ideally want to avoid repeating code in general, but the penalty for doing it in test code is much lower, and thus you should write your test code with that in mind.

# Resist the temptation of test helper methods

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

That's 15 lines just to get an instance of `AccountManager` and begin testing it. At that level, there's so much boilerplate that it distracts from whatever behavior you're trying to test.

Your natural inclindation might be to refactor your test code to eliminate the uninteresting code. Sometimes it's your only choice, but it should be your last option.

**Best option: Refactor the system you're testing**

If you need a lot of boilerplate code simply to call the system you're testing, that may indicate a flaw in your design. Take another look at the line in the test above that instantiates the object under test:

```python
account_manager = AccountManager(user_database,
                                 privilege_manager,
                                 url_downloader)
```

Upon closer inspection, there are some design smells here. It takes one database object(`user_database`) directly, but its next parameter is `privilege_manager`, which wraps the `privilege_database`. And what is it doing with a "URL downloader?" That certainly seems pretty distant conceptually from its other two parameters?

In this case, the best thing to do is refactor `AccountManager`. This will not only make the class easier to test but it will make the code easier for production clients to use as well.

**Good option: Create a factory or builder class**

Sometimes you don't have the freedom to go tearing apart a class. In these cases, you can simplify your test code by creating a factory or builder for the class you're testing.

```python
def test_increase_score(self):
  account_manager = AccountManagerBuilder()
    .with_user(username='joe123', score=150.0)
    .with_privilege(privilege='upvote', minimum_score=200.0)
    .build()

  account_manager.adjust_score(username='joe123',
                               adjustment=25.0)

  self.assertEqual(175.0,
                   account_manager.get_score(username='joe123'))
```

So, it's now 18 lines instead of 15 lines, but it's a single *statement*.

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

# Go crazy with long test names

Which of the following function names do you prefer?

* `userExistsAndTheirAccountIsInGoodStandingWithAllBillsPaid`
* `isAccountActive`

The first is more precise, but the burden of typing a 57-character name on every invocation outweighs the benefit of extra precision for most developers (except for Java developers, for whom both names are offensively terse). 

For test functions, there's a key factor that changes the equation: nobody writes *calls* to test functions. A developer only has to type out a test name once in the function signature. Given this, brevity matters, but it matters less than for other functions.

In addition, precise function names have higher value in test code. Whenever a test breaks, the test name is the first thing you see, so it should convey as much information as possible. For example, imagine modifying this production class:

```c++
class Tokenizer {
 public:
  Tokenizer(std::unique_ptr<TextStream> stream);
  std::unique_ptr<Token> NextToken();
 private:
  std::unique_ptr<TextStream> stream_;
};
```

What if you ran your test suite and saw this:

```text
[  FAILED  ] TokenizerTests.TestNextToken (6 ms)
```

Would you know what caused the test to fail? Probably not.

A failure in `TestNextToken` tells you that you screwed up the `NextToken()` method, but that doesn't mean much. To diagnose the failure, you'd  have to read the test itself to understand the problem.

Instead, what if you saw this:

```text
[  FAILED  ] TokenizerTests.ReturnsNullptrWhenStreamIsEmpty (6 ms)
```

A function called `ReturnsNullptrWhenStreamIsEmpty` would feel overly verbose in other contexts, but it's a good test name. It tells the reader exactly what behavior it verifies. A developer could fix this break without ever reading the test's implementation. That's the mark of a good test name.

**A good test name is so descriptive that a developer can diagnose failures of that test from the name alone.**
{: .notice--info}

# Embrace magic numbers

"Don't use magic numbers."

It's the "don't talk to strangers" of the programming world. It becomes so ingrained in many talented developers that they never consider when a magic number might improve their code. But, here's the secret: magic numbers make unit tests better.

As a refresher, a "magic number" is a numeric value or string that appears in code without information about what it represents or how it relates to other values. Here's an example:

```python
calculate_pay(hours=80) # <-- magic number
```

Programmers generally agree that magic numbers in production code are A Bad Thing, so they replace them with named constants like this:

```python
HOURS_PER_WEEK = 40
WEEKS_PER_PAY_PERIOD = 2
calculate_pay(hours=HOURS_PER_WEEK * WEEKS_PER_PAY_PERIOD)
```

Unfortunately, there's a misconception that magic numbers also weaken *test* code, but the opposite is true.

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

If you believe magic numbers are universally evil, the above test looks correct to you. `72.0` and `8.0` have named constants, so nobody can accuse the test of magic numbers. But just for a moment, suspend your religious beliefs and indulge in the forbidden fruit of magic numbers:

```python
def test_add_hours(self):
  hours_tracker = BillableHoursTracker(initial_hours=72.0)
  hours_tracker.add_hours(8.0)
  self.assertEqual(80.0, hours_tracker.billable_hours())
```

The second example is simpler, with only half as many lines. And it's more obvious. The reader doesn't have to jump around the function tracking names of constants. Magic numbers made this test better.

**Avoid creating named constants in test code. Use magic numbers instead.**
{: .notice--info}

There are good reasons that magic numbers were added to developers' bad lists, but these reasons generally don't apply to test code:

| Goal | Reasoning | Why it's different in test code |
|-------|----------------|--------------------------------------|
| ***Expressiveness*** | Named constants explain intent better more clearly than a literal value like `8`. | The *test name* should convey the intent of the test. When the reader sees a magic number in your unit test code and wonders why you chose it, the answer should be in the test name. | 
| ***Consistency*** | If you need to change the value, it's better to change it in a single place. | Nothing should depend on constants a unit test defines. If you want to share a constant between a test helper method and the unit test body, you're probably [abusing helper methods](#use-test-helper-methods-sparingly). |
| ***Disambiguation*** | Named constants allow the reader to distinguish between values that are equal by coincidence vs. equal by necessity. | Still a concern in tests, but you can usually write around it by choosing test values that are unequal to other values that appear in the test. |

# Conclusion

Software development is engineering. A good engineer does more than just memorize a list of rules and apply them universally. Engineering requires one to understand fundamental principles and to weigh the benefits and drawbacks of different decisions. 

To write excellent tests, you must recognize how the goals of test code differ from production code and adjust your engineering decisions accordingly. Most importantly, tests should be obvious and minimize complexity.