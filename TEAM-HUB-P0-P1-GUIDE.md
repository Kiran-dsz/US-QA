# Team Hub MVP - P0+P1 Test Automation Guide

Complete Playwright automation for the **Team Hub MVP** project covering **P0 (Critical)** and **P1 (High Priority)** test cases.

## 📊 Test Coverage

- **Total Tests**: 32
- **P0 Tests (Critical)**: 16
- **P1 Tests (High Priority)**: 16
- **Test Modules**: 6
  1. Team Hub Entry & Auto-Creation
  2. View File List
  3. Contribute File Flow
  4. Post-Contribute State Changes
  5. Member Permission Restrictions
  6. Admin Delete File

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd /Users/kirandsouza/dtc-playwright
npm install
```

### 2. Set Environment Variables
```bash
export PLAUD_URL=https://staging.theplaud.ai
```

### 3. Update Test Credentials
Edit `tests/team-hub-p0-p1.spec.js` and update:
```javascript
const TEST_ACCOUNTS = {
  admin: {
    email: 'your-admin@plaud.ai',
    password: 'YourPassword123+'
  },
  member: {
    email: 'your-member@plaud.ai',
    password: 'YourPassword123+'
  },
  dualRole: {
    email: 'your-dualrole@plaud.ai',
    password: 'YourPassword123+'
  }
};
```

### 4. Run Tests

**All P0+P1 tests:**
```bash
npx playwright test tests/team-hub-p0-p1.spec.js
```

**Headed mode (see browser):**
```bash
npx playwright test tests/team-hub-p0-p1.spec.js --headed
```

**Debug mode (step through):**
```bash
npx playwright test tests/team-hub-p0-p1.spec.js --debug
```

**With HTML report:**
```bash
npx playwright test tests/team-hub-p0-p1.spec.js --reporter=html
npx playwright show-report
```

---

## 📋 Test Modules

### Module 1: Team Hub Entry & Auto-Creation (4 tests)

**What it tests**: Sidebar navigation, empty states, workspace switching

| Test ID | Priority | Type | Name |
|---------|----------|------|------|
| 3 | P0 | Reverse | Team Hub NOT shown in personal workspace |
| 5 | P0 | Normal | Empty-state displayed when Team Hub is empty |
| 4 | P1 | Permission | Dual-role account sees Team Hub in both workspaces |
| 6 | P1 | Normal | Team Hub title and subtitle display correctly |

**Key Assertions**:
- ✅ Team Hub entry hidden in personal workspace
- ✅ Empty state icon and copy visible
- ✅ Both Admin and Member workspaces show Team Hub
- ✅ Title and subtitle correctly formatted

---

### Module 2: View File List (5 tests)

**What it tests**: File list display, sorting, real-time updates, column format

| Test ID | Priority | Type | Name |
|---------|----------|------|------|
| 9 | P0 | Normal | 4 columns displayed (Name / Duration / Created / Added) |
| 11 | P0 | Normal | File list sorted by Date Added (descending) by default |
| 12 | P0 | Normal | After contributing, file appears in real time |
| 15 | P1 | Normal | Each row displays Name and Duration correctly |

**Key Assertions**:
- ✅ All 4 columns present and visible
- ✅ Sort indicator on "Date Added" column
- ✅ New files appear instantly without refresh
- ✅ Duration format: `HH:MM:SS`

---

### Module 3: Contribute File Flow (6 tests)

**What it tests**: Contribution workflow, modals, confirmations, file removal

| Test ID | Priority | Type | Name |
|---------|----------|------|------|
| 22 | P0 | Normal | Confirmation modal states file removal from personal space |
| 23 | P0 | Normal | Modal includes "This action cannot be undone" |
| 25 | P0 | Normal | Cancel button keeps file in personal space |
| 26 | P0 | Normal | Confirm button contributes + shows Toast |
| 27 | P0 | Normal | After contributing, file disappears from All Files |

**Key Assertions**:
- ✅ Modal copy mentions "remove" and "personal"
- ✅ "Cannot be undone" warning displayed
- ✅ Cancel cancels without changes
- ✅ Confirm triggers contribution + success toast
- ✅ File removed from personal list

---

### Module 4: Post-Contribute State Changes (4 tests)

**What it tests**: Real-time UI updates after contribution

| Test ID | Priority | Type | Name |
|---------|----------|------|------|
| 39 | P0 | Normal | File immediately appears in Team Hub list |
| 40 | P0 | Normal | File disappears from personal All Files (smoke) |
| 44 | P1 | Normal | Success Toast auto-dismisses without blocking UI |
| 45 | P1 | Normal | Sidebar count increments by 1 |

**Key Assertions**:
- ✅ File visible in Team Hub immediately
- ✅ File removed from personal space
- ✅ Toast appears and auto-dismisses after 3-5s
- ✅ Sidebar counter updates: N → N+1

---

### Module 5: Member Permission Restrictions (7 tests)

**What it tests**: Member cannot edit/delete, read-only fields, limited menu options

| Test ID | Priority | Type | Name |
|---------|----------|------|------|
| 46 | P0 | Normal | Member hovering row shows NO three-dot menu |
| 47 | P1 | Normal | Title field is read-only for Member |
| 48 | P1 | Normal | Member cannot rename file |
| 51 | P1 | Normal | NO Find & Replace entry point |
| 52 | P1 | Normal | NO Ask Plaud button |
| 53 | P1 | Normal | Cannot move file back to personal space |

**Key Assertions**:
- ✅ No menu on hover
- ✅ Title input disabled/readonly
- ✅ No rename option in context menu
- ✅ Find & Replace button missing
- ✅ Ask Plaud button missing
- ✅ No move/remove options

---

### Module 6: Admin Delete File (8 tests)

**What it tests**: Admin delete workflow, confirmation, real-time removal, trash handling

| Test ID | Priority | Type | Name |
|---------|----------|------|------|
| 58 | P0 | Normal | Admin sees Delete in three-dot menu (smoke) |
| 59 | P0 | Normal | Clicking Delete shows confirmation modal (smoke) |
| 60 | P0 | Normal | Modal includes "permanently delete" + "cannot recover" |
| 61 | P0 | Normal | Cancel does not delete (smoke) |
| 63 | P0 | Normal | Red Delete button permanently deletes (smoke) |
| 64 | P0 | Normal | Deleted file NOT in Trash (smoke) |
| 65 | P1 | Normal | After delete, file removed in real time |

**Key Assertions**:
- ✅ Delete option visible in menu
- ✅ Modal appears with confirmation
- ✅ Modal includes danger copy
- ✅ Cancel reverts to list
- ✅ Delete removes file permanently
- ✅ File not recoverable in Trash
- ✅ File count decreases immediately

---

## 🔧 Using Helper Functions

The `tests/helpers/team-hub.helpers.js` file provides reusable page objects:

### TeamHubPage

```javascript
import { TeamHubPage } from './helpers/team-hub.helpers';

test('Example', async ({ page }) => {
  const hub = new TeamHubPage(page);

  // Navigation
  await hub.goToTeamHub();
  await hub.goToAllFiles();

  // Verification
  await hub.verifyTeamHubVisible();
  const count = await hub.getFileCount();
  const names = await hub.getFileNames();

  // Operations
  await hub.contributeFile(0);
  await hub.deleteFile(0);

  // Checks
  const isReadOnly = await hub.isTitleFieldReadOnly();
  const hasMenu = await hub.isFileMenuVisible(0);
});
```

### AuthHelper

```javascript
import { AuthHelper } from './helpers/team-hub.helpers';

const auth = new AuthHelper(page);
await auth.login('user@example.com', 'password');
await auth.logout();
const loggedIn = await auth.isLoggedIn();
```

### WorkspaceHelper

```javascript
import { WorkspaceHelper } from './helpers/team-hub.helpers';

const workspace = new WorkspaceHelper(page);
await workspace.switchWorkspace('Team Workspace 1');
const current = await workspace.getCurrentWorkspace();
const available = await workspace.getAvailableWorkspaces();
```

---

## 📝 Test Execution Patterns

### Run Specific Module
```bash
npx playwright test tests/team-hub-p0-p1.spec.js -g "Team Hub Entry"
```

### Run Only P0 Tests
```bash
npx playwright test tests/team-hub-p0-p1.spec.js -g "P0"
```

### Run Only P1 Tests
```bash
npx playwright test tests/team-hub-p0-p1.spec.js -g "P1"
```

### Run Specific Test
```bash
npx playwright test tests/team-hub-p0-p1.spec.js -g "Admin sees Delete option"
```

### Retry Failed Tests
```bash
npx playwright test tests/team-hub-p0-p1.spec.js --retries=2
```

---

## 🐛 Troubleshooting

### Tests Timeout
**Problem**: Tests hanging at navigation or element waits
```bash
# Increase timeout
npx playwright test tests/team-hub-p0-p1.spec.js --timeout=60000
```

### Selectors Not Found
**Problem**: `data-testid` attributes missing or changed

**Solution**: 
1. Check browser DevTools for actual selectors
2. Update selectors in test file or helpers
3. Use `--debug` mode to inspect elements

```bash
npx playwright test tests/team-hub-p0-p1.spec.js -g "your-test" --debug
```

### Flaky Tests (Random Failures)
**Problem**: Tests pass sometimes, fail other times

**Solution**:
- Add explicit waits for network idle: `await page.waitForLoadState('networkidle')`
- Increase toast/modal wait times
- Add retry logic: `npx playwright test --retries=2`

### Modal/Toast Not Appearing
**Problem**: Expected modal or toast not visible

**Solution**:
1. Verify selectors: `[role="dialog"]`, `[role="status"]`, `.toast`
2. Add wait before interaction: `await page.waitForTimeout(500)`
3. Check browser console for JS errors

---

## 📊 Test Results & Reports

### HTML Report
```bash
npx playwright test --reporter=html
npx playwright show-report
```

Shows:
- ✅/❌ Pass/Fail status
- ⏱️ Execution time per test
- 🎥 Screenshots on failure
- 📹 Video recordings

### JSON Report
```bash
npx playwright test --reporter=json > results.json
```

### JUnit Report (for CI/CD)
```bash
npx playwright test --reporter=junit
```

---

## 🔄 CI/CD Integration

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
      - run: npx playwright test tests/team-hub-p0-p1.spec.js
      - if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📚 Test Data

### Prerequisites for Each Test Module

**Module 1-2: Requires**
- Admin account in Team Workspace
- Member account in Team Workspace
- Existing Team Hub with files (for list tests)

**Module 3-4: Requires**
- Member account with files in personal space
- Contribution permission enabled

**Module 5: Requires**
- Member account (view-only permissions)
- Cannot have admin role in this workspace

**Module 6: Requires**
- Admin account
- Permission to delete files
- Multiple files in Team Hub

---

## 🎯 Best Practices

1. **Run in Headless First**
   ```bash
   npx playwright test tests/team-hub-p0-p1.spec.js
   ```

2. **Debug Failing Tests**
   ```bash
   npx playwright test tests/team-hub-p0-p1.spec.js -g "failing-test" --headed --debug
   ```

3. **Check Selectors**
   - Use browser DevTools
   - Inspect elements before updating tests
   - Verify `data-testid` values match

4. **Use Helpers**
   - Reuse TeamHubPage, AuthHelper classes
   - Reduces duplication
   - Easier maintenance

5. **Add Assertions**
   - Always verify expected results
   - Don't just check if action completes
   - Include UI text verification

---

## 📞 Support

- 📖 [Playwright Docs](https://playwright.dev)
- 🐛 [Debugging Guide](https://playwright.dev/docs/debug)
- 💬 [Team Slack](https://plaud-ai.slack.com)

---

## Next Steps

1. ✅ Configure test accounts
2. ✅ Run all P0+P1 tests
3. ⏳ Fix any failing tests
4. ⏳ Add P2 tests (boundary/edge cases)
5. ⏳ Integrate into CI/CD pipeline

---

**Last Updated**: July 21, 2026  
**Test Coverage**: 32 tests (P0+P1)  
**Status**: Ready for Execution
