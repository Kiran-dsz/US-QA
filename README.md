# Phase 3 QA Tests

Automated E2E tests for Plaud Phase 3 (Teams Money - Web credit system) using Playwright.

## Tests

- **E2E-002:** Transcription deducts minutes only
- **E2E-004:** Agent work deducts credits only

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   npx playwright install --with-deps
   ```

2. **Configure credentials:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your test credentials:
   ```
   TEST_EMAIL=your-test-email@example.com
   TEST_PASSWORD=your-test-password
   BASE_URL=https://beta.theplaud.com
   ```

## Run Tests

```bash
npx playwright test tests/phase3-balance.spec.js
```

Or with debugging:
```bash
npx playwright test --debug
npx playwright test --headed
```

## Architecture

- **Page Object Pattern:** `tests/helpers/phase3.helpers.js`
  - Login with modal handling
  - Balance extraction with regex parsing
  - Feature navigation and interaction
  - Network request logging for debugging

- **Test Suite:** `tests/phase3-balance.spec.js`
  - Two comprehensive E2E test cases
  - Balance verification and consumption tracking
  - Network inspection to validate API calls

## Bug Report

**Issue:** Phase 3 features do not deduct credits
- **Linear:** USM-837
- **Parent:** USM-810
- **Status:** Backend integration issue - consumption endpoints not being called

## Known Issues

- Transcription and agent features complete on UI but don't trigger backend consumption
- This is a backend provisioning issue, not a test automation problem
- Tests will pass once backend is properly configured
