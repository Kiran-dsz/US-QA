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
npm install
npm run install:appium  # Install Appium globally
```

### Running Tests

In one terminal, start Appium server:
```bash
npm run start:appium
```

In another terminal, run tests:
```bash
npm run qa                       # Run all tests
npm run test:balance-display    # Run balance display feature tests
```

## Project Structure

```
.
├── tests/
│   ├── balance-display/         # Balance display feature tests
│   │   ├── balance-display.spec.js
│   │   └── case-catalog.js
├── pages/
│   └── HomePage.js              # Page Object Model for home screen
├── helpers/                     # Utility functions
├── wdio.conf.js                 # WebdriverIO configuration
├── package.json
├── CLAUDE.md                    # Operating constraints
└── README.md
```

## Test Cases

### Balance Display Suite (TC-Balance-*)

**TC-Balance-001**: Sidebar displays Preview card with balance
- Verifies the Preview card is visible in the sidebar bottom

**TC-Balance-002**: Balance displays in correct format (n/X)
- Verifies balance format (e.g., "1,050/1,050")

**TC-Balance-003**: Balance is greater than 25%
- Validates test precondition

**TC-Balance-004**: Balance updates in real-time after consumption
- Verifies balance updates immediately after credit consumption

**TC-Balance-005**: Preview card has correct styling
- Verifies visual presentation

## Configuration

Edit `wdio.conf.js` to configure:
- **Device**: Set `udid` to your device's UDID or leave as 'auto'
- **iOS Version**: Update `platformVersion` to match your device
- **Bundle ID**: Update `appium:bundleId` if different
- **Timeout**: Adjust `waitforTimeout` and `timeout` as needed

## Device Setup

1. Connect iOS device via USB
2. Trust the computer on device
3. Get device UDID:
   ```bash
   idevice_id -l
   ```
4. Update `wdio.conf.js` with the UDID

## Page Objects

### HomePage
Methods for interacting with the home screen and sidebar:
- `openSidebar()` - Opens the sidebar
- `getBalanceText()` - Gets balance display text
- `parseBalance()` - Parses "n/X" format balance
- `isPreviewCardVisible()` - Checks if Preview card is displayed
- `waitForBalanceUpdate()` - Waits for balance to change

## Accessibility IDs

Tests use accessibility IDs for locators:
- `sidebar-button` - Button to open sidebar
- `preview-card-bottom` - Preview card container
- `credits-balance` - Balance label
- `balance-value` - Balance amount (e.g., "1,050/1,050")
- `balance-percentage` - Percentage remaining

These should be set in the app's UI code for proper test support.

## Troubleshooting

### Appium Connection Fails
```bash
# Kill any existing Appium processes
lsof -ti:4723 | xargs kill -9
# Start fresh
npm run start:appium
```

### Device Not Found
```bash
# List connected devices
idevice_id -l
# Or use Appium Inspector to detect device
```

### Tests Timeout
- Increase `waitforTimeout` in `wdio.conf.js`
- Check device network connection
- Verify app is running and responsive

## Related Documentation

- [CLAUDE.md](CLAUDE.md) - Operating constraints and principles
- [Appium Documentation](http://appium.io/)
- [WebdriverIO Guide](https://webdriver.io/docs/gettingstarted)
- [XCUITest Driver](https://appium.io/docs/en/drivers/ios-xcuitest/)

## Contributing

- Follow the constraints in [CLAUDE.md](CLAUDE.md)
- Add new tests under appropriate `tests/*/` directories
- Create page objects in `pages/` for new screens
- Use accessibility IDs for all locators
- Document test preconditions and expected results

## Links

- **GitHub**: https://github.com/Kiran-dsz/US-QA
- **Notion Test Cases**: [Project Ultra US QA (App) Test Set](https://app.notion.com/fc3d0604616083-67a466-87da2a7651f4)
