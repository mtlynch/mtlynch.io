# Bash style guide

When writing bash code:

- Use environment variables to avoid magic strings
  - Use environment variables for values that change depending on user settings or environment
- Don't export environment variables unless it's necessary
- Use single quoted strings unless we're using string interpolation
- Prefer this format for interpolating environment variables: "the var is ${VARNAME}"
- Use long flags when available for command line arguments
- Join sequences of bash commands with `&&` if they should not proceed if one fails
