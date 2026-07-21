#!/bin/bash

# Team Hub Tests - Execution Script
# Usage: ./run-tests.sh [--headed] [--report] [--debug] [--grep PATTERN]

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Parse arguments
HEADED=""
REPORT=""
DEBUG=""
GREP_PATTERN=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --headed)
      HEADED="--headed"
      shift
      ;;
    --report)
      REPORT="true"
      shift
      ;;
    --debug)
      DEBUG="--debug"
      shift
      ;;
    --grep)
      GREP_PATTERN="--grep $2"
      shift 2
      ;;
    *)
      shift
      ;;
  esac
done

echo -e "${BLUE}🎯 Team Hub MVP - Test Execution${NC}"
echo "=================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}📦 Installing dependencies...${NC}"
  npm install
  echo ""
fi

# Run tests
echo -e "${BLUE}🚀 Running tests...${NC}"
echo ""

if [ -z "$GREP_PATTERN" ]; then
  npx playwright test tests/team-hub-notion-tests.spec.js --workers=1 $HEADED $DEBUG
else
  npx playwright test tests/team-hub-notion-tests.spec.js --workers=1 $HEADED $DEBUG $GREP_PATTERN
fi

TEST_EXIT=$?

echo ""
echo "=================================="

if [ $TEST_EXIT -eq 0 ]; then
  echo -e "${GREEN}✅ All tests completed successfully!${NC}"
else
  echo -e "${YELLOW}⚠️ Some tests failed or were skipped${NC}"
fi

# Generate report if requested
if [ "$REPORT" = "true" ]; then
  echo ""
  echo -e "${BLUE}📊 Generating HTML report...${NC}"
  npx playwright show-report
fi

echo ""
echo "Test execution completed."
exit $TEST_EXIT
