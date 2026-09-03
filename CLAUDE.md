# CLAUDE.md — Mobile QA Automation Operating Constraints

This is a mobile app QA automation repo for testing the Plaud iOS Testflight build.

## Key Principles

### 1. Real Device Testing
- Tests run against actual iOS devices connected via USB or network
- No mocks or simulators unless explicitly testing simulator-specific behavior
- Device state must be verified before and after each test

### 2. Accessibility IDs for Locators
- All locators use accessibility IDs (not text/XPath when possible)
- Accessibility IDs are stable across app versions and localizations
- Format: `~accessibility-id` in Appium/WebdriverIO

### 3. Balance & Credit Testing
- Use real credit operations - no fake balances
- Always verify initial balance before performing operations
- Document balance changes with timestamps and operation details
- Pre-consume operations should use the app's actual flows

### 4. Test Data
- Accounts in `accounts/` directory (gitignored)
- Never commit credentials, tokens, or sensitive data
- Device UDIDs should be in `.env.local`

### 5. Timing & Async Operations
- Mobile apps are inherently async - use proper waits
- Balance updates may take 1-3 seconds to propagate
- Use `waitForDisplayed()`, `waitForEnabled()` for UI state changes
- Never use fixed `pause()` except for animations (500ms max)

### 6. Real-time Balance Verification
- Always capture balance before → after pairs
- Calculate deltas to verify consumption amounts
- Two-sided assertions: not just directional comparisons

### 7. Failure Reporting
- Include device state in failures (iOS version, app build, device model)
- Capture screenshots on failure (automatic via WebdriverIO)
- Include error logs with timestamps

## Test Structure

```
tests/
  ├── balance-display/          # Feature suite
  │   ├── balance-display.spec.js
  │   └── case-catalog.js
pages/                          # Page Objects
  └── HomePage.js
helpers/                        # Utilities
```

## Running Tests

```bash
npm run qa                       # Run all tests
npm run test:balance-display    # Run balance display tests
npm run install:appium          # Install Appium globally
npm run start:appium            # Start Appium server (in separate terminal)
```

## Device Setup

1. Connect iOS device via USB
2. Enable developer mode and trust the computer
3. Get device UDID: `idevice_id -l`
4. Update `wdio.conf.js` with UDID or set to 'auto'
5. Ensure Xcode command-line tools are installed: `xcode-select --install`

## Credentials & Accounts

- Account credentials go in `.env.local` (gitignored)
- Create `accounts/` directory for test accounts
- Format: `accounts/preview-user.json` with structure:
  ```json
  {
    "email": "preview@example.com",
    "password": "***"
  }
  ```
