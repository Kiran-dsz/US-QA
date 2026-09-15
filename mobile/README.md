# Plaud Mobile QA Automation

QA automation framework for testing the Plaud iOS app (Testflight). Uses WebdriverIO with Appium and XCUITest driver.

## Quick Start

### Prerequisites
- macOS (iOS testing requires a Mac)
- Xcode and command-line tools: `xcode-select --install`
- Node.js 16+
- iOS device connected via USB or network

### Installation

```bash
cd mobile
npm install
npm run install:appium
```

### Running Tests

Terminal 1 - Start Appium:
```bash
cd mobile
npm run start:appium
```

Terminal 2 - Run tests:
```bash
cd mobile
npm run qa                       # Run all tests
npm run test:balance-display    # Run balance display tests
```

## Project Structure

```
mobile/
├── tests/
│   └── balance-display/
│       ├── balance-display.spec.js
│       └── case-catalog.js
├── pages/
│   └── HomePage.js
├── wdio.conf.js
├── package.json
└── README.md
```

## Test Cases

### Balance Display Suite (TC-Balance-*)

**TC-Balance-001**: Sidebar displays Preview card with balance
**TC-Balance-002**: Balance displays in correct format (n/X)
**TC-Balance-003**: Balance is greater than 25% per precondition
**TC-Balance-004**: Balance updates in real-time after consumption
**TC-Balance-005**: Preview card has correct styling

## Configuration

Edit `wdio.conf.js` to configure:
- Device UDID: `'appium:udid': 'YOUR_DEVICE_UDID'`
- iOS Version: `platformVersion: '17.0'`
- Bundle ID: `'appium:bundleId': 'ai.plaud.testflight'`

## Device Setup

1. Connect iOS device via USB
2. Trust the computer on device
3. Get device UDID: `idevice_id -l`
4. Update `wdio.conf.js` with the UDID

## Page Objects

### HomePage
- `openSidebar()` - Opens the sidebar
- `getBalanceText()` - Gets balance text
- `parseBalance()` - Parses "n/X" format
- `isPreviewCardVisible()` - Checks card visibility
- `waitForBalanceUpdate()` - Waits for balance change

## Accessibility IDs

App must expose these accessibility IDs:
- `sidebar-button` - Sidebar toggle
- `preview-card-bottom` - Preview card
- `balance-value` - Balance text (e.g., "1,050/1,050")
