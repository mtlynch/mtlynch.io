Add tags in the frontmatter of this article based on the themes in the text.

Check the `public/tags` directory for a list of existing tags, and try to use existing tags if appropriate ones are available.

Add tags if a tag does not already exist but the article focuses on a particular technology. For example, if I mention a product called "FooBar" a lot, add a tag `- foobar`.

Create a tag if I talk about a product I created. For example, if I mention _Refactoring English_ more than once in an article, create a tag for it.

Aim for 1-5 tags per post, but go up to 7 if you see strong justification for multiple tags.

Format the tags with newlines like this:

```
tags:
  - foo
  - bar
  - baz
```

See content/retrospectives/2025/07/index.md as an example of a post with appropriate tags.

The `annual-review` tag is only for posts in the `posts/` folder with `year-X` in the path.
