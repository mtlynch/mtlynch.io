#!/bin/bash

# Verify that all text files end in a trailing newline.

# Exit on first failing command.
set -e
# Exit on unset variable.
set -u

exitcode=0

while read -r filepath; do
  if [[ "${filepath}" == *.svg ]]; then
    : # Ignore
  elif [[ "${filepath}" == *.min.js ]]; then
    : # Ignore
  elif [[ "${filepath}" == *hugo-coder* ]]; then
    : # Ignore
  elif ! [[ -s "${filepath}" && -z "$(tail -c 1 "${filepath}")" ]]; then
    printf "File must end in a trailing newline: %s\n" "${filepath}" >&2
    exitcode=255
  fi
done < <(git ls-files \
  | xargs -d '\n' grep ".*" \
    --recursive \
    --files-with-matches \
    --binary-files=without-match)

exit "${exitcode}"
