#!/bin/bash

# PLAUD QA UI Test Skill - Membership Center Automation
# Runs automated tests on the Plaud Membership Center
# Tests: Login, Navigation, Plan Tiles, Currency Selection

set -e

# Configuration
SCRIPT_DIR="/private/tmp/claude-501/-Users-kirandsouza/f8f7057f-03f2-4861-b187-43bb5de165c5/scratchpad"
TEST_SCRIPT="plaud_qauitest_final.js"
RESULTS_FILE="QAUI_TEST_RESULTS.json"

# Parse arguments
MODE="${1:-ui}"
if [ "$MODE" = "--headless" ]; then
  MODE="headless"
elif [ "$MODE" = "--ui" ]; then
  MODE="ui"
fi

echo "🧪 PLAUD QA UI TEST - Membership Center Validation"
echo "=================================================="
echo "Mode: $MODE"
echo "Test script: $SCRIPT_DIR/$TEST_SCRIPT"
echo ""

# Check if test script exists
if [ ! -f "$SCRIPT_DIR/$TEST_SCRIPT" ]; then
  echo "❌ Error: Test script not found at $SCRIPT_DIR/$TEST_SCRIPT"
  exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
  echo "❌ Error: Node.js is not installed. Please install Node.js to run this test."
  exit 1
fi

# Run the test
echo "Starting test..."
echo ""

cd "$SCRIPT_DIR"
node "$TEST_SCRIPT"

# Check if results file was created
if [ -f "$RESULTS_FILE" ]; then
  echo ""
  echo "✅ Test completed successfully!"
  echo "Results saved to: $SCRIPT_DIR/$RESULTS_FILE"
  echo ""

  # Display summary from results
  if command -v jq &> /dev/null; then
    echo "Test Summary:"
    echo "  Overall: $(jq -r '.overall' $RESULTS_FILE)"
    echo "  Duration: $(jq -r '.duration' $RESULTS_FILE | awk '{print int($1/1000) "s"}')"
    echo "  Tests Passed: $(jq '.tests | map(select(.status == "PASS")) | length' $RESULTS_FILE)/$(jq '.tests | length' $RESULTS_FILE)"
  fi

  echo ""
  echo "Screenshots captured:"
  if command -v jq &> /dev/null; then
    jq -r '.screenshots[] | "  - \(.step): \(.path)"' $RESULTS_FILE
  else
    ls -1 QAUI_*.png 2>/dev/null || echo "  (No screenshots found)"
  fi
else
  echo "⚠️ Warning: Results file was not created"
  exit 1
fi
