#!/bin/bash

# Exit build script on first failure
set -e
# Echo commands to stdout.
set -x

COUNT_TRAIN=20000
COUNT_TEST=2000

OUTPUT_DIR=$(mktemp -d)
ACTUAL_CRF_TRAINING_FILE="${OUTPUT_DIR}/training_data.crf"
ACTUAL_CRF_TESTING_FILE="${OUTPUT_DIR}/testing_data.crf"
ACTUAL_CRF_MODEL_FILE="${OUTPUT_DIR}/model.crfmodel"
ACTUAL_TESTING_OUTPUT_FILE="${OUTPUT_DIR}/testing_output"
ACTUAL_EVAL_OUTPUT_FILE="${OUTPUT_DIR}/eval_output"

bin/generate_data \
  --data-path=nyt-ingredients-snapshot-2015.csv \
  --count=$COUNT_TRAIN \
  --offset=0 > "$ACTUAL_CRF_TRAINING_FILE"
bin/generate_data \
  --data-path=nyt-ingredients-snapshot-2015.csv \
  --count=$COUNT_TEST \
  --offset=$COUNT_TRAIN > "$ACTUAL_CRF_TESTING_FILE"

crf_learn \
  template_file "$ACTUAL_CRF_TRAINING_FILE" "$ACTUAL_CRF_MODEL_FILE"

crf_test \
  -m "$ACTUAL_CRF_MODEL_FILE" \
  "$ACTUAL_CRF_TESTING_FILE" > "$ACTUAL_TESTING_OUTPUT_FILE"

python bin/evaluate.py "$ACTUAL_TESTING_OUTPUT_FILE" > "$ACTUAL_EVAL_OUTPUT_FILE"

# Check against golden output.
GOLDEN_DIR=tests/golden
GOLDEN_CRF_TRAINING_FILE="${GOLDEN_DIR}/training_data.crf"
GOLDEN_CRF_TESTING_FILE="${GOLDEN_DIR}/testing_data.crf"
GOLDEN_TESTING_OUTPUT_FILE="${GOLDEN_DIR}/testing_output"
GOLDEN_EVAL_OUTPUT_FILE="${GOLDEN_DIR}/eval_output"

diff --context=2 "$GOLDEN_CRF_TRAINING_FILE" "$ACTUAL_CRF_TRAINING_FILE"
diff --context=2 "$GOLDEN_CRF_TESTING_FILE" "$ACTUAL_CRF_TESTING_FILE"
diff --context=2 "$GOLDEN_TESTING_OUTPUT_FILE" "$ACTUAL_TESTING_OUTPUT_FILE"
diff "$GOLDEN_EVAL_OUTPUT_FILE" "$ACTUAL_EVAL_OUTPUT_FILE"
