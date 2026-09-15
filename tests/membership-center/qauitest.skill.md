# /qauitest - Plaud Membership Center Automated Test

Automated end-to-end QA test for Plaud Membership Center functionality.

## What It Does

Validates the complete Membership Center workflow:

- ✅ Login with test credentials
- ✅ Close "Add your device" popup automatically
- ✅ Navigate to Membership Center via workspace dropdown
- ✅ Verify "Choose Your Plan" heading
- ✅ Confirm all 3 plan tiles (Starter, Pro, Unlimited)
- ✅ Locate currency selector
- ✅ Change currency USD → EUR
- ✅ Verify prices update across all plans

## Usage

```
/qauitest [--ui]
```

### Options

- `--ui`: Run with visible browser window (default: headless)
- Default: Runs in headless mode for CI/CD compatibility

## Quick Start

### For New Users

1. Clone the repo: `git clone https://github.com/Kiran-dsz/US-QA.git`
2. Install dependencies: `npm install puppeteer`
3. Copy skill: `cp tests/membership-center/qauitest.skill.md ~/.claude/skills/qauitest.md`
4. Run test: `/qauitest`

See `SETUP_FOR_COLLEAGUES.md` for detailed setup instructions.

### Update Credentials

Edit the skill file and update `TEST_CONFIG`:

```javascript
const TEST_CONFIG = {
  url: 'https://test.theplaud.com/',
  email: 'your-test-email@example.com',
  password: 'your-test-password'
};
```

## Test Results

**Last Run:** ✅ PASS (8/8 tests)
- Duration: ~27 seconds
- All tests passing
- Verified prices: $8.40 → €9.30, $20.00 → €20.90

## What Gets Generated

### Output Files

1. **Console Output** - Real-time test progress
2. **QAUI_TEST_RESULTS.json** - Detailed results in JSON format
3. **Screenshots**
   - `QAUI_01_membership_center.png` - Plan tiles page
   - `QAUI_02_currency_menu.png` - Currency dropdown
   - `QAUI_03_currency_changed_eur.png` - Final EUR state

## Key Features

✅ **Fully Automated** - No manual intervention required
✅ **Screenshot Evidence** - Visual proof at each step
✅ **Smart Popup Handling** - Removes blocking modal automatically
✅ **Currency Validation** - Verifies prices change when currency changes
✅ **Reliable Navigation** - Coordinate-based dropdown clicks
✅ **CI/CD Ready** - Headless mode for pipelines
✅ **Detailed Reporting** - JSON results for analysis

## Test Structure

| Test | What It Validates | Status |
|------|-------------------|--------|
| 1. Login | Credentials accepted, redirect to home | ✅ PASS |
| 2. Popup Closure | "Add device" modal removed | ✅ PASS |
| 3-4. Navigation | Dropdown → Membership Center | ✅ PASS |
| 5. Plan Heading | "Choose Your Plan" displayed | ✅ PASS |
| 6. Plan Tiles | All 3 plans visible (Starter/Pro/Unlimited) | ✅ PASS |
| 7. Currency Selector | "Prices are in USD $" control found | ✅ PASS |
| 8. Currency Change | USD → EUR prices update correctly | ✅ PASS |

---

## QA Exploration Findings

### 🔴 CRITICAL ISSUE - Pricing Discount Not Applied

**Affects:** 
- `/member/workspace/plan` (Team Plan page)
- `/member/purchase?from=left_up` (Individual purchase page)

**Problem:**
```
Advertised: "20% off every seat until Aug 31, 2026"
Expected:   $25.00 with 20% off = $20.00/seat/month
Actual:     $25.00/seat/month ← NO DISCOUNT SHOWN
Strikethrough: $25.00 (SAME as displayed price)
```

**Why It Matters:**
- ❌ Discount is completely invisible to customers
- ❌ Revenue loss from customers expecting savings
- ❌ Credibility damage (advertised ≠ displayed)
- ❌ Support tickets asking where the discount is

**Math Verification:**
- Original price should be higher: $31.25 with 20% off = $25.00
- OR displayed price should be lower: $20.00 (20% off $25)
- Currently showing: $25.00 with strikethrough $25.00 = **NO DISCOUNT VISIBLE**

**Fix Required:**
1. Update pricing calculation to apply discount
2. Display original price and discounted price clearly
3. Ensure strikethrough ≠ display price

---

### 🟡 HIGH - Annual Pricing Math Inconsistent

**Affects:** Team Plan page `/member/workspace/plan`

**Problem:**
```
Monthly: $25.00 (advertises "20% off")
Annual:  $300.00 = $25 × 12 (FULL price, no discount)
         Badge shows "-11% off"
```

**Math Doesn't Work:**
- If 20% off: should be $240/year ($20 × 12), not $300
- If 11% off: should be $267.30/year ($25 × 12 × 0.89), not $300
- Current: $300 = NO discount applied

**Impact:** User confusion about actual discount rate

---

### 🟡 MEDIUM - Disabled "Team" Tab on Purchase Page

**Affects:** `/member/purchase?from=left_up`

**Issue:**
- Tab bar shows [Individual] [Team (grayed out)]
- Users see "Team" tab but cannot click it
- Must navigate to different URL to see team plans

**UX Problem:** Disabled UI elements are confusing. Either hide the tab or enable it.

---

### 🟡 MEDIUM - Missing Feature Comparison Table

**Affects:** `/member/workspace/plan` (Team Plan page)

**Issue:**
- Page shows features as checklist (✓ items)
- No formal table comparing tiers
- Hard for users to understand differences

**Impact:** Users can't easily compare plan features

---

### 🟡 LOW - Workspace Dropdown Menu Improvements

**Affects:** Homepage Personal workspace dropdown

**Findings:**
- ✅ All 25 menu items working
- ✅ Settings, Membership Center, Support accessible
- ✅ Sign out option present
- ❌ Missing user profile card (email/avatar not shown)
- ❌ Missing "About Plaud" link
- ❌ Menu items not visually grouped/separated

---

### ✅ Homepage Structure - FUNCTIONAL

Tested and verified:
- ✅ Login flow works smoothly
- ✅ Recent files display correctly
- ✅ Plaud Community section shows templates
- ✅ Navigation between sections works
- ✅ Search functionality accessible
- ✅ Settings page loads correctly
- ✅ No console errors or broken assets
- ✅ Responsive design works at 1400x900

---

### ✅ Workspace Dropdown Menu - MOSTLY FUNCTIONAL

**Menu Structure (25 items):**
- Workspace: Create Team workspace, Membership Center, Settings
- Help: Contact support, Download App, Send feedback
- Navigation: Home, Ask Plaud, Template Community, Explore
- Files: All files (3), Unfiled (3), Trash (0)
- File Ops: View all, Start recording, Import audio, Rename, Move, Trash

**Status:**
- ✅ All items clickable
- ✅ No broken navigation
- ✅ Settings page functional
- ✅ Membership Center accessible
- ⚠️ Could use visual improvements (see above)

## Credentials

Test credentials are configured in the skill. To use different credentials:

1. Update `TEST_CONFIG` in the skill file
2. Or set environment variables:
   ```bash
   export TEST_EMAIL="email@example.com"
   export TEST_PASSWORD="password"
   export TEST_URL="https://test.theplaud.com/"
   ```

**Note:** Never commit real credentials to git. Use `.env` files or environment variables.

## Troubleshooting

### "Command not found: /qauitest"
- Verify skill file is in `~/.claude/skills/qauitest.md`
- Restart Claude Code
- Check file permissions are readable

### Test fails at login
- Verify credentials are correct
- Check network access to test.theplaud.com
- Ensure test account is active

### Popup closure fails
- Modal structure may have changed
- Check page source and update selectors in `qauitest.js`
- Contact QA lead

### Screenshots not saving
- Check write permissions in working directory
- Ensure disk space available
- Review `QAUI_TEST_RESULTS.json` for errors

## Maintenance

### When to Update

- UI changes to Membership Center
- New pricing plans added
- Currency options change
- Authentication flow modifications

### How to Update

1. Identify what changed by running test
2. Update selectors in `tests/membership-center/qauitest.js`
3. Re-run to verify fix works
4. Commit with message: `test: update membership center selectors`
5. Push to repo so all team members get updates

## Integration Examples

### GitHub Actions CI/CD

```yaml
- name: Run Membership Center QA Test
  run: |
    npm install puppeteer
    node tests/membership-center/qauitest.js
    
- name: Upload Test Results
  if: always()
  uses: actions/upload-artifact@v2
  with:
    name: qa-test-results
    path: tests/membership-center/QAUI_*
```

### Pre-Commit Hook

```bash
#!/bin/bash
echo "Running QA tests..."
node tests/membership-center/qauitest.js
if [ $? -ne 0 ]; then
  echo "QA tests failed!"
  exit 1
fi
```

## Support

For help:
1. Check `QAUI_TEST_RESULTS.json` for detailed errors
2. Review captured screenshots
3. Check test duration (indicates network issues if slow)
4. Contact: kiran.dsouza@plaud.ai

## File References

- Test script: `tests/membership-center/qauitest.js`
- Setup guide: `tests/membership-center/SETUP_FOR_COLLEAGUES.md`
- Full docs: `tests/membership-center/README.md`
- Repo: https://github.com/Kiran-dsz/US-QA

---

**Status:** ✅ Production Ready
**Last Updated:** July 23, 2026
**Maintenance:** Active
