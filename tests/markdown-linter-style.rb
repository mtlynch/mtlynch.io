#  Include all rules by default
all

# MD002 First header should be a top level header
exclude_rule 'MD002'

# MD004 Unordered list style
# TODO: This should actually be enabled, but it causes the linter to complain
# about valid markers in /stripe-recording-its-customers/
exclude_rule 'MD004'

# Otherwise, linter complains about unordered lists embedded within ordered
# lists.
# MD005 Inconsistent indentation for list items at the same level
# MD007 Unordered list indentation
exclude_rule 'MD005'
exclude_rule 'MD007'

# MD013 - Line length.
exclude_rule 'MD013'

# MD033 - Inline HTML - used for Markdown purists
exclude_rule 'MD033'

## MD026 - Trailing punctuation in header
exclude_rule 'MD026'

# Need to ignore this so that we can quote ordered lists.
# MD029 Ordered list item prefix
exclude_rule 'MD029'

# There's no other way I know of for embedding fenced code blocks in lists.
# MD031 Fenced code blocks should be surrounded by blank lines
exclude_rule 'MD031'

# MD032 - Lists should be surrounded by blank lines
exclude_rule 'MD032'

# MD034 - Bare URLs without angle brackets or inside fenced code block
exclude_rule 'MD034'

# MD036 - Emphasis used instead of a header
exclude_rule 'MD036'

# MD040 Fenced code blocks should have a language specified
# TODO: This should actually be enabled, but it causes the linter to complain
# about valid block in /digitizing-2/
exclude_rule 'MD040'

# MD041 First line in file should be a top level header
exclude_rule 'MD041'

# Conflicts with code blocks embedded in lists.
# MD046 Code block style
exclude_rule 'MD046'
