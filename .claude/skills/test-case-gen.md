---
name: test-case-gen
description: Generate formatted test cases for Notion Phase 3 database
---

# Test Case Generator

Generate test cases formatted for your Notion "Phase 3: Redemption - Test Cases" database.

## What it does

1. Ask for the feature/flow you're testing
2. Gather preconditions, happy path, edge cases
3. Output markdown table for Notion import

## Output Format

- **Test ID**: Sequential (TC-001, TC-002, etc.)
- **Title**: One-line description
- **Main Category**: Feature area
- **Priority**: Critical, High, Medium, Low
- **Preconditions**: Required setup
- **Test Steps**: Numbered steps
- **Expected Results**: What should happen
- **Test Type**: Functional, Regression, Edge Case, etc.

## How to use

When invoked, I'll ask:
1. What feature are you testing?
2. What setup is needed?
3. What's the happy path?
4. What edge cases should we test?

Then generate a complete test matrix ready to paste into Notion.
