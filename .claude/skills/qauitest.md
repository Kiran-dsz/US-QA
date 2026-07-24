# /qauitest - Plaud Membership Center Automated Test

Automated end-to-end QA test for Plaud Membership Center functionality.

## What It Does

Validates the complete Membership Center workflow:

- ✅ Login with test credentials
- ✅ Close "Add your device" popup automatically
- ✅ Navigate to Membership Center
- ✅ Verify "Choose Your Plan" heading
- ✅ Confirm all 3 plan tiles
- ✅ Locate currency selector
- ✅ Change currency USD → EUR
- ✅ Verify prices update

## Usage

```
/qauitest [--ui]
```

Options:
- `--ui`: Run with visible browser window

## Setup (One-Time)

### Option 1: Copy Skill File (Simplest)
```bash
# Copy skill from repo to your Claude Code skills directory
cp .claude/skills/qauitest.md ~/.claude/skills/qauitest.md
```

That's all! Now just type `/qauitest` anywhere.

### Option 2: Auto-Setup Script
```bash
# Run this in the repo root
npm install puppeteer
./setup-qauitest.sh
```

## Credentials

Update the test email/password in `tests/membership-center/qauitest.js`:

```javascript
const TEST_CONFIG = {
  url: 'https://test.theplaud.com/',
  email: 'your-test-email@example.com',
  password: 'your-test-password'
};
```

Or set environment variables:
```bash
export TEST_EMAIL="email@example.com"
export TEST_PASSWORD="password"
```

## Test Results

**Status:** ✅ PASS (8/8 tests)
- Duration: ~27 seconds
- Verified prices: $8.40 → €9.30

## Output

- Console: Real-time test progress
- `QAUI_TEST_RESULTS.json`: Detailed results
- Screenshots: 3 PNG files with test evidence

## Documentation

- Full docs: `tests/membership-center/README.md`
- Setup guide: `tests/membership-center/SETUP_FOR_COLLEAGUES.md`
- Test script: `tests/membership-center/qauitest.js`

## Troubleshooting

See `tests/membership-center/README.md` for complete troubleshooting guide.

---

**Status:** ✅ Production Ready
**Repo:** https://github.com/Kiran-dsz/US-QA
