#  Include all rules by default
all

## MD013 - Line length.
exclude_rule 'MD013'

## MD033 - Inline HTML - used for Markdown purists
exclude_rule 'MD033'

## MD026 - Trailing punctuation in header
exclude_rule 'MD026'

# There's no other way I know of for embedding fenced code blocks in lists.
## MD031 Fenced code blocks should be surrounded by blank lines
exclude_rule 'MD031'

## MD032 - Lists should be surrounded by blank lines
exclude_rule 'MD032'

## MD026 - Emphasis used instead of a header
exclude_rule 'MD036'

## MD041 First line in file should be a top level header
exclude_rule 'MD041'

## MD034 - Bare URLs without angle brackets or inside fenced code block
exclude_rule 'MD034'
