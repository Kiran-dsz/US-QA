# How to Run DTC Activation Tests (Pre-Prod)

## Quick Start

### Step 1: Get Activation Token
1. Create subscription on `https://staging.theplaud.ai/`
2. Check email for activation message
3. Right-click on "Activate plan" button
4. Select "Copy link address"
5. Extract token from URL: `https://staging.theplaud.ai/dtc?token=**YOUR_TOKEN_HERE**`

### Step 2: Run Tests with Token

```bash
# Option A: Using environment variable (recommended)
PLAUD_URL=https://staging.theplaud.ai ACTIVATION_TOKEN=YOUR_TOKEN_HERE npm test -- tests/dtc-activation-with-helper.spec.js

# Option B: Using full URL directly
PLAUD_URL=https://staging.theplaud.ai ACTIVATION_TOKEN=abc123xyz npm test

# Option C: Interactive mode (with UI)
HEADED=1 PLAUD_URL=https://staging.theplaud.ai ACTIVATION_TOKEN=YOUR_TOKEN_HERE npm test -- tests/dtc-activation-with-helper.spec.js
```

## Command Reference

### Test Against Pre-Prod (Staging)
```bash
PLAUD_URL=https://staging.theplaud.ai ACTIVATION_TOKEN=YOUR_TOKEN npm test
```

### Test Against Dev (Test)
```bash
PLAUD_URL=https://test.theplaud.ai ACTIVATION_TOKEN=YOUR_TOKEN npm test
```

### Run with UI (See what's happening)
```bash
HEADED=1 PLAUD_URL=https://staging.theplaud.ai ACTIVATION_TOKEN=YOUR_TOKEN npm test
```

### Run with Debug Inspector
```bash
PWDEBUG=1 PLAUD_URL=https://staging.theplaud.ai ACTIVATION_TOKEN=YOUR_TOKEN npm test
```

### Run specific test
```bash
PLAUD_URL=https://staging.theplaud.ai ACTIVATION_TOKEN=YOUR_TOKEN npm test -- tests/dtc-activation-with-helper.spec.js -g "Activation succeeds with status=0"
```

### Run without token (will skip tests)
```bash
npm test -- tests/dtc-activation-with-helper.spec.js
```

## Environment Variables

| Variable | Value | Example |
|----------|-------|---------|
| `PLAUD_URL` | Full base URL | `https://staging.theplaud.ai` |
| `ACTIVATION_TOKEN` | Token from email link | `abc123xyz...` |
| `HEADED` | `1` to see browser | `HEADED=1` |
| `PWDEBUG` | `1` for inspector | `PWDEBUG=1` |

## What Each Test Checks

### Test 1: Activation succeeds with status=0
```
✓ Navigates to activation URL with token
✓ Clicks "Activate plan" button
✓ Waits for API response
✓ Verifies response.status = 0 (not error code)
✓ Verifies success page is visible
✓ Verifies NO error dialog appears
```

**Expected Result:** ✅ PASS

### Test 2: Status=0 returned even when legacy activation fails
```
✓ Navigates to activation URL
✓ Triggers activation
✓ Verifies HTTP status 200 OK
✓ Verifies response.status = 0 (best-effort)
✓ No error codes bubble up (-1003, -1004, -1012)
```

**Expected Result:** ✅ PASS

### Test 3: No error dialog on successful activation
```
✓ Completes activation
✓ Verifies NO error dialog
✓ Verifies success page is visible
```

**Expected Result:** ✅ PASS

### Test 4: Log activation response for debugging
```
✓ Logs HTTP status
✓ Logs response.status
✓ Logs full response body
```

**Expected Result:** ✅ PASS (informational)

## Output Examples

### Successful Test Run
```
Running 4 tests using 1 worker

  ✓  1 [chromium] › dtc-activation-with-helper.spec.js › Activation succeeds with status=0 (10.2s)
  ✓  2 [chromium] › dtc-activation-with-helper.spec.js › Status=0 returned even when legacy activation fails (8.5s)
  ✓  3 [chromium] › dtc-activation-with-helper.spec.js › No error dialog on successful activation (9.1s)
  ✓  4 [chromium] › dtc-activation-with-helper.spec.js › Log activation response for debugging (11.3s)

  4 passed (39.1s)
```

### Expected Response in Logs
```
=== DTC Activation Response (USC-138 Fix Verification) ===
HTTP Status: 200
Response status code: 0
Full Response: {
  "status": 0,
  "message": "Subscription activated successfully",
  ...
}
==========================================================
```

## Troubleshooting

### "No activation response captured"
- Confirm `ACTIVATION_TOKEN` is correct
- Verify token is from actual email link
- Check that URL includes full token (not truncated)

### Tests are skipped
- You didn't provide `ACTIVATION_TOKEN`
- Provide it: `ACTIVATION_TOKEN=your_token npm test`

### "That link is broken"
- `PLAUD_URL` is not set correctly
- Use: `PLAUD_URL=https://staging.theplaud.ai npm test`
- Check that URL is reachable in browser first

### Button not found
- Page might have different structure
- Run with `HEADED=1` to see actual page
- Check if button text matches (might not be "Activate plan")

### Page shows error but test expects success
- This is the bug being tested (expected in unfixed environments)
- The fix returns status=0 regardless
- Refresh page - it should show success

## Files

| File | Purpose |
|------|---------|
| `tests/dtc-activation-with-helper.spec.js` | Main test suite |
| `tests/helpers/dtc-activation-helper.js` | Helper utilities |
| `playwright.config.js` | Configuration (uses PLAUD_URL env var) |
| `PREPROD-TESTING-GUIDE.md` | Detailed testing guide |
| `USC-138-SUMMARY.md` | Technical details |

## Next Steps

1. ✅ Create subscription on staging
2. ✅ Get activation token from email
3. ✅ Run test with token
4. ✅ Verify all tests pass
5. ✅ Confirm response shows status=0
6. ✅ Check that page shows success (after refresh)

## Questions?

Check the detailed guides:
- **PREPROD-TESTING-GUIDE.md** - Complete setup and manual testing
- **USC-138-SUMMARY.md** - Technical background
- **DTC-ACTIVATION-TESTING.md** - Detailed documentation
