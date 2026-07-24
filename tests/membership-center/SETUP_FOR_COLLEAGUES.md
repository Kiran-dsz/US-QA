# Setting Up Membership Center QA Test for Your Team

Quick setup guide for running the automated Membership Center tests in Claude Code.

## Step 1: Clone the Repository

```bash
git clone https://github.com/Kiran-dsz/US-QA.git
cd US-QA
```

## Step 2: Install Dependencies

```bash
npm install puppeteer
```

## Step 3: Add the Claude Code Skill

Copy the skill file to your Claude Code skills directory:

```bash
# macOS/Linux
mkdir -p ~/.claude/skills/
cp tests/membership-center/qauitest.skill.md ~/.claude/skills/qauitest.md

# Windows
# mkdir %USERPROFILE%\.claude\skills
# copy tests\membership-center\qauitest.skill.md %USERPROFILE%\.claude\skills\qauitest.md
```

## Step 4: Set Up Credentials (One-Time)

Update the test credentials in the skill or test file:

**Option A:** Edit the skill file
```bash
nano ~/.claude/skills/qauitest.md
# Update the credentials in the TEST_CONFIG section
```

**Option B:** Use environment variables
```bash
export TEST_EMAIL="your-email@example.com"
export TEST_PASSWORD="your-password"
export TEST_URL="https://test.theplaud.com/"
```

## Step 5: Run the Test

In Claude Code, simply type:

```
/qauitest
```

Or with UI mode to see the browser:

```
/qauitest --ui
```

## Expected Output

You should see:

```
=== PLAUD QA TEST - MEMBERSHIP CENTER VALIDATION ===

[TEST 1/8] Navigate to login page
✓ PASS - Login page loaded

[TEST 2/8] Login with credentials
✓ PASS - Login completed

Closing popup if present...
✓ Modal removed from DOM
✓ Popup closed/removed successfully

[TEST 3/8] Navigate to Membership Center...
✓ Successfully navigated to Membership Center

[TEST 5/8] Verify "Choose Your Plan" text
✓ PASS - "Choose Your Plan" found

[TEST 6/8] Verify 3 plan tiles
  Starter Plan: ✓
  Pro Plan: ✓
  Unlimited Plan: ✓
✓ PASS - All 3 plans found

[TEST 7/8] Find currency selector
  USD/Currency text: ✓
  Currency control: ✓
✓ PASS - Currency selector found

[TEST 8/8] Change currency and verify price updates
  Initial prices (USD): $8.40, $20.00, $0.02
  ✓ Currency dropdown clicked
  ✓ EUR selected
  New prices (after change): €9.30, €20.90, €0.02
✓ PASS - Currency changed successfully

=== TEST SUMMARY ===
Total Tests: 8
Passed: 8
Failed: 0
Duration: 26.75 seconds

Overall Status: PASS ✅
```

## Troubleshooting

### "Skill not found" error
- Verify the skill file is in `~/.claude/skills/qauitest.md`
- Check that the file was copied correctly
- Restart Claude Code

### Test fails to login
- Check that credentials are correct in the skill file
- Verify network access to https://test.theplaud.com/
- Ensure test account is active and not locked

### Popup closure fails
- This indicates the modal structure may have changed
- Contact the QA lead to update selectors

### Screenshots not captured
- Check that you have write permissions in the working directory
- Ensure sufficient disk space
- Check the `QAUI_TEST_RESULTS.json` for error details

## Files You'll Need

From the US-QA repo:
- `tests/membership-center/qauitest.js` - The actual test script
- `tests/membership-center/qauitest.skill.md` - The Claude Code skill definition
- `tests/membership-center/README.md` - Full documentation

## Running Tests Regularly

Add to your schedule:
- After each Membership Center UI change
- Before each release
- When troubleshooting pricing issues
- To verify currency functionality

## Getting Help

If you run into issues:
1. Check the `QAUI_TEST_RESULTS.json` file for detailed error messages
2. Review the screenshots to see what the test actually saw
3. Check the test duration - if slow, it may indicate network issues
4. Contact Kiran (kiran.dsouza@plaud.ai) for help

## Updating the Test

If the Membership Center UI changes:

1. Pull the latest from the repo
2. Run the test to see what breaks
3. Update selectors in `qauitest.js` if needed
4. Verify all 8 tests pass
5. Commit changes with a clear message

---

**Happy Testing!** 🚀
