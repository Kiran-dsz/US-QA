# Team Hub Playwright Test Automation - Setup Guide

Welcome! This guide will help you set up and run the Team Hub MVP test automation suite.

## 📋 Quick Overview

- **Framework**: Playwright (E2E testing)
- **Language**: JavaScript
- **Tests**: 8 smoke tests (100% passing ✅)
- **Setup time**: ~10 minutes
- **Environment**: Staging (`https://test.theplaud.com`)

---

## 🚀 Quick Start (5 minutes)

### 1. Clone/Access the Repository

```bash
# Navigate to the project
cd /Users/kirandsouza/dtc-playwright

# Or if cloning:
git clone <your-repo-url>
cd dtc-playwright
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Tests

```bash
# Run all smoke tests (8 tests, ~20 seconds)
npx playwright test tests/team-hub-simple.spec.js --headed

# Or run in headless mode (faster, no browser window)
npx playwright test tests/team-hub-simple.spec.js
```

### 4. View Results

```bash
# Generate HTML report
npx playwright test tests/team-hub-simple.spec.js --reporter=html

# Open report in browser
npx playwright show-report
```

---

## 🔐 Test Credentials

**Account 1** (Current - Recommended)
```
Email: pnookvex@sharklasers.com
Password: Test1234
```

**Account 2** (Backup)
```
Email: xxeckp+5omta1h9zhsw0@sharklasers.com
Password: Test1234
```

> Update credentials in test files if needed:
> - `tests/team-hub-simple.spec.js` (line 7)
> - `tests/team-hub-p0-p1.spec.js` (line 6-18)

---

## 📁 Project Structure

```
dtc-playwright/
├── tests/
│   ├── team-hub-simple.spec.js       # 8 smoke tests (START HERE)
│   ├── team-hub-p0-p1.spec.js        # 32 comprehensive tests
│   └── helpers/
│       └── team-hub.helpers.js       # Reusable page objects
├── playwright.config.js              # Playwright config
├── TEAM-HUB-P0-P1-GUIDE.md          # Detailed test guide
├── ONBOARDING.md                     # This file
└── package.json                      # Dependencies
```

---

## ✅ Test Suites Available

### Simplified Suite (Recommended for beginners)
```bash
npx playwright test tests/team-hub-simple.spec.js
```
- **8 tests** | **~20 seconds** | **100% passing** ✅
- Perfect for: Quick validation, learning, CI/CD integration

**Tests include:**
1. Page loads and displays content
2. Page title verification
3. No error page detected
4. Navigation elements exist
5. Clickable elements found (10 elements)
6. Main content area verified
7. Page interaction works
8. Responsive design verified

### Comprehensive Suite (Advanced)
```bash
npx playwright test tests/team-hub-p0-p1.spec.js
```
- **32 tests** | **Complex navigation** | **Needs selector updates**
- Tests: Team Hub entry, file list, contribute flow, permissions, admin delete
- Status: Requires real UI selectors to be updated

---

## 🎯 Common Commands

```bash
# Run specific test
npx playwright test tests/team-hub-simple.spec.js -g "page loads"

# Run with browser visible
npx playwright test tests/team-hub-simple.spec.js --headed

# Run in debug mode (step through)
npx playwright test tests/team-hub-simple.spec.js --debug

# Run with custom timeout
npx playwright test tests/team-hub-simple.spec.js --timeout=60000

# Generate report
npx playwright test tests/team-hub-simple.spec.js --reporter=html

# View last report
npx playwright show-report

# Run with video recording
npx playwright test tests/team-hub-simple.spec.js --record-video=retain-on-failure
```

---

## 🔧 Troubleshooting

### Tests Timeout
**Problem**: Tests hang or timeout  
**Solution**: Increase timeout
```bash
npx playwright test tests/team-hub-simple.spec.js --timeout=60000
```

### Tests Can't Find Elements
**Problem**: Selectors changed in UI  
**Solution**: 
1. Run in debug mode: `npx playwright test --debug`
2. Inspect elements in browser DevTools
3. Update selectors in test files

### Cannot Login
**Problem**: Credentials rejected  
**Solution**:
1. Verify credentials in test file
2. Test login manually in browser
3. Check if account is active

### Network Errors
**Problem**: Page fails to load  
**Solution**:
1. Check internet connection
2. Verify URL: `https://test.theplaud.com`
3. Check if staging environment is up

---

## 📊 Test Results Explanation

### Sample Output
```
Running 8 tests using 1 worker

✅ Team Hub page loaded successfully
  ✓  1 [chromium] › tests/team-hub-simple.spec.js › P0 | Smoke | Team Hub page loads (2.8s)
  ✓  2 [chromium] › tests/team-hub-simple.spec.js › P0 | Smoke | Verify page title (3.7s)
  ...
  ✓  8 [chromium] › tests/team-hub-simple.spec.js › P1 | Smoke | Page responds (1.7s)

  8 passed (18.7s)
```

**Green ✓ = Passed** | **Red ✘ = Failed** | **Yellow ⚠️ = Timeout**

---

## 🚀 CI/CD Integration

### GitHub Actions Example
```yaml
name: Team Hub Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install
      - run: npx playwright test tests/team-hub-simple.spec.js
      - if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📚 Additional Resources

- **Playwright Docs**: https://playwright.dev
- **Debugging**: https://playwright.dev/docs/debug
- **Best Practices**: https://playwright.dev/docs/best-practices
- **API Reference**: https://playwright.dev/docs/api/class-page

---

## 💡 Tips for Success

1. **Start small**: Run 1 test first to verify setup
2. **Use headed mode**: See browser during test execution for debugging
3. **Check reports**: HTML reports have screenshots of failures
4. **Keep credentials safe**: Don't commit credentials to git
5. **Update selectors**: If UI changes, update test selectors

---

## ❓ Questions?

- Check the detailed guide: `TEAM-HUB-P0-P1-GUIDE.md`
- Review test code: Look at `tests/team-hub-simple.spec.js`
- Debug in real time: Use `--debug` flag
- Ask the team: Reach out for help!

---

## ✅ Verification Checklist

- [ ] Node.js installed (`node --version`)
- [ ] npm packages installed (`npm install`)
- [ ] Can access staging URL
- [ ] Test credentials work
- [ ] First test passes (`npx playwright test tests/team-hub-simple.spec.js`)
- [ ] HTML report generates (`npx playwright show-report`)

---

**Last Updated**: July 21, 2026  
**Status**: ✅ Production Ready  
**Pass Rate**: 100% (8/8 tests)  
**Framework**: Playwright  
**Language**: JavaScript/Node.js
