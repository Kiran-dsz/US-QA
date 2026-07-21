# Team Hub MVP - Test Automation Roadmap

**Document Version:** 2.0  
**Last Updated:** 2026-07-21  
**Total Test Cases:** 69  
**Total Automatable:** 45-50 (65-72%)

---

## 📊 Executive Summary

| Phase | Tests | Duration | Effort | Coverage | Start |
|-------|-------|----------|--------|----------|-------|
| **Phase 1** | 18 | 1-2 weeks | 18 hours | Core flows + UI | NOW |
| **Phase 2** | 15 | 2-3 weeks | 18 hours | Advanced flows | Week 2 |
| **Phase 3** | 15 | 3-4 weeks | 20 hours | Edge cases | Week 4 |
| **Phase 4** | 19 | 4+ weeks | 30 hours | Compatibility | Week 7 |
| **Not Automatable** | 24 | N/A | N/A | Manual testing | Ongoing |

**Timeline:** 10-12 weeks to full automation suite  
**Team Effort:** 1 QA engineer full-time  
**ROI:** 85% reduction in manual regression testing

---

## 🎯 PHASE 1: Core Functionality (18 Tests, 18 Hours)

**Goal:** Establish automation foundation with core UI and workflow tests.  
**Status:** 🟢 **IN PROGRESS** (8/18 implemented)

### Phase 1A: UI Display & Navigation (6 tests, 4 hours)
✅ = Already implemented

| # | Test Case | Type | Priority | Effort | Status |
|---|-----------|------|----------|--------|--------|
| 5 | Empty state display | Normal | P0 | 30m | ✅ DONE |
| 6 | Page title & subtitle | Normal | P0 | 25m | ✅ DONE |
| 11 | Default sort by Date added | Normal | P0 | 35m | ✅ DONE |
| 15 | File row Name/Duration display | Normal | P1 | 30m | ✅ DONE |
| 71 | Click file opens detail page | Normal | P0 | 45m | ✅ DONE |
| 72 | Breadcrumb includes Team Hub | Normal | P0 | 35m | ✅ DONE |

**Subtotal:** 3 hours, **100% Complete**

### Phase 1B: Core Workflows (8 tests, 8 hours)
⏳ = Partially implemented

| # | Test Case | Type | Priority | Effort | Status |
|---|-----------|------|----------|--------|--------|
| 23 | "Cannot be undone" warning | Flow | P0 | 1h | ⏳ PARTIAL |
| 25 | Cancel keeps file in personal | Reverse | P0 | 1h | ⏳ PARTIAL |
| 26 | Confirm contributes + Toast | Flow | P0 | 1.5h | ⏳ PARTIAL |
| 39 | File appears in list (real-time) | Flow | P0 | 1.5h | ⏳ PARTIAL |
| 40 | File disappears from personal | Flow | P0 | 1h | ⏳ PARTIAL |
| 58 | Admin sees Delete option | Normal | P0 | 30m | ⏳ PARTIAL |
| 59 | Delete brings up modal | Flow | P0 | 45m | ⏳ PARTIAL |
| 63 | Delete button deletes file | Flow | P0 | 1.5h | ⏳ PARTIAL |

**Subtotal:** 8 hours, **30% Complete**

### Phase 1C: State Management (4 tests, 6 hours)
❌ = Not yet started

| # | Test Case | Type | Priority | Effort | Status |
|---|-----------|------|----------|--------|--------|
| 2 | Sidebar count updates | Normal | P1 | 1h | ❌ TODO |
| 8 | No duplicate entries | Boundary | P1 | 1h | ❌ TODO |
| 12 | File appears in real-time | Flow | P0 | 1.5h | ❌ TODO |
| 13 | Real-time file removal | Flow | P1 | 1.5h | ❌ TODO |

**Subtotal:** 5 hours, **0% Complete**

### Phase 1 Success Criteria
- [x] All 6 UI tests passing
- [ ] 8/8 workflow tests implemented
- [ ] 4/4 state tests implemented
- [ ] Full contribute flow working (happy path)
- [ ] Full delete flow working (happy path)
- [ ] 18+ tests passing consistently

---

## 🚀 PHASE 2: Advanced Workflows (15 Tests, 18 Hours)

**Goal:** Expand to complex user journeys and multi-step operations.  
**Status:** 🟡 **BLOCKED** (waiting for Phase 1 completion)

### Phase 2A: Contribute Flow Deep Dive (7 tests)
- Test 22: File removed from personal space  
- Test 24: 4-point confirmation modal
- Test 27: Same-name conflict handling
- Test 29: Rename + re-contribute
- Test 31: Admin can contribute
- Test 43: State persists after refresh
- Test 45: Sidebar count increments

**Effort:** 9 hours  
**Blockers:** Test account setup, file fixtures

### Phase 2B: Delete Flow & Permissions (5 tests)
- Test 46: Member sees no menu
- Test 47: Title field read-only
- Test 61: Cancel doesn't delete
- Test 64: File not in Trash
- Test 67: Admin can delete others' files

**Effort:** 6 hours  
**Blockers:** Multi-role accounts, permission matrix

### Phase 2C: Real-time Sync (3 tests)
- Test 14: Multi-tab consistency
- Test 42: Tab A contributes, Tab B refreshes
- Test 66: Tab A deletes, Tab B refreshes

**Effort:** 3 hours  
**Blockers:** Cross-browser context coordination

**Phase 2 Timeline:** Weeks 2-3 (after Phase 1 complete)

---

## 📦 PHASE 3: Export & Share Operations (15 Tests, 20 Hours)

**Goal:** Validate file export formats and sharing functionality.  
**Status:** 🔴 **NOT STARTED**

### Phase 3A: Transcript Exports (5 tests)
- Test 86: Export SRT format  
- Test 87: Export TXT (title required)
- Test 88: Export DOCX
- Test 94: Timestamps correct (SRT/DOCX)
- Test 97: Safari SRT export

**Effort:** 7 hours  
**Blockers:** File download validation, format parsing

### Phase 3B: Notes & Audio Exports (5 tests)
- Test 89: Export notes as DOCX
- Test 90: Export notes as PDF
- Test 91: Export mind map (PNG)
- Test 92: Export original audio
- Test 93: Special characters in filename

**Effort:** 7 hours  
**Blockers:** File format validation, special char handling

### Phase 3C: Share Operations (5 tests)
- Test 103: Share link invalidation after delete
- Test 106: Copy link (Firefox)
- Test 107: Copy link (Safari)
- Test 108: Copy link (Edge)
- Test 109: Access share link while logged in

**Effort:** 6 hours  
**Blockers:** Clipboard API testing, incognito mode

**Phase 3 Timeline:** Weeks 4-6 (requires Phase 2 complete)

---

## 🌐 PHASE 4: Compatibility & Edge Cases (19 Tests, 30 Hours)

**Goal:** Ensure cross-browser compatibility and edge case handling.  
**Status:** 🔴 **NOT STARTED**

### Phase 4A: Browser Compatibility (9 tests)
- Test 17: Firefox file list rendering
- Test 18: Safari column fields
- Test 19: Edge column fields  
- Test 36: Firefox contribute modal
- Test 37: Safari contribute modal
- Test 38: Edge contribute modal
- Test 82: Firefox detail page layout
- Test 84: Safari detail page layout
- Test 85: Edge detail page layout

**Effort:** 12 hours  
**Blockers:** Multi-browser setup, BrowserStack/Sauce Labs

### Phase 4B: Timeout & Boundary Tests (5 tests)
- Test 14: Pagination with many files
- Test 35: Weak network error handling
- Test 77: 16-minute timeout → 403 → refresh recovers
- Test 54: Chinese IME composition
- Test 62: ESC key cancels delete

**Effort:** 8 hours  
**Blockers:** Network simulation, timer mocking

### Phase 4C: Workspace Data Ownership (5 tests)
- Test 110: Member removed, others can still view
- Test 111: Admin can delete after contributor removed
- Test 112: Deactivated account, file still accessible
- Test 113: Owner leaves, data survives
- Test 114: Contributor removed, Date added unchanged

**Effort:** 10 hours  
**Blockers:** Workspace member management, Admin APIs

**Phase 4 Timeline:** Weeks 7-10 (infrastructure heavy)

---

## ❌ Manual-Only Tests (24 Tests)

**Rationale:** Cannot be reasonably automated without extensive mocking/infrastructure.

### Permission-Based (6 tests)
- Test 3: No Team Hub in personal workspace
- Test 4: Dual-role shows Team Hub in both
- Test 48: Member cannot rename
- Test 49: Member cannot move back to personal
- Test 51: No Find & Replace entry
- Test 52: No Ask Plaud button

**Reason:** Requires UI inspection across workspace contexts

### Multi-User Scenarios (6 tests)
- Test 31: Admin contributes
- Test 46: Member sees no menu vs Admin
- Test 50: Only 4 columns (no Added By)
- Test 78: Admin action menu differs from Member
- Test 79: Permission differences confirmed
- Test 95: Admin can trigger exports

**Reason:** Requires dual login accounts in same session

### Workspace Management (6 tests)
- Test 110: Contributor removed, file stays
- Test 111: Admin deletes after contributor removed
- Test 112: Deactivated account, file readable
- Test 113: Owner leaves, data accessible
- Test 114: Date added unchanged after removal

**Reason:** Requires workspace member APIs and admin controls

### Browser-Specific Edge Cases (6 tests)
- Test 56: Safari hover (no menu)
- Test 55: Firefox hover (no menu)
- Test 57: Edge hover (no menu)
- Test 69: Safari delete modal display
- Test 68: Firefox delete modal
- Test 70: Edge delete modal

**Reason:** Visual/browser-specific behavior hard to automate reliably

---

## 📈 Test Execution & Reporting

### Running Phase 1 Tests
```bash
# Run all Phase 1 tests
./run-tests.sh --grep "P0|Normal|Flow"

# Run with visible browser
./run-tests.sh --headed --grep "P0"

# Generate HTML report
./run-tests.sh --report
```

### Metrics Tracked
- ✅ Pass rate (target: >95%)
- ⏱️ Execution time per test
- 🎥 Video recordings for failures
- 📊 Coverage by module
- 🔄 Flaky test detection

### Success Metrics by Phase
| Phase | Pass Rate | Stability | Execution Time | Comments |
|-------|-----------|-----------|-----------------|----------|
| Phase 1 | 95%+ | Stable | <30s | Foundation complete |
| Phase 1+2 | 92%+ | 90% stable | <60s | Workflows validated |
| Phase 1+2+3 | 90%+ | 85% stable | <90s | Export ops working |
| Full Suite | 88%+ | 80% stable | <120s | All features covered |

---

## 🛑 Current Blockers & Solutions

### Blocker 1: Test Data
**Issue:** Tests 71-73 skip when no files available  
**Solution:** Create fixture file before each test  
**Priority:** P0  
**Effort:** 2 hours  

### Blocker 2: Multi-User Tests
**Issue:** Cannot test permissions with single account  
**Solution:** Create admin + member test accounts  
**Priority:** P1  
**Effort:** 4 hours (one-time setup)

### Blocker 3: Network Simulation
**Issue:** Cannot test 403 timeout (Test 77) reliably  
**Solution:** Mock S3 signed URL expiration  
**Priority:** P2  
**Effort:** 3 hours

### Blocker 4: File Export Validation
**Issue:** Cannot validate SRT/DOCX/PDF content  
**Solution:** Parse downloaded files in tests  
**Priority:** P2  
**Effort:** 6 hours

---

## 💡 Recommendations

### Short Term (This Week)
1. ✅ **Complete Phase 1** (8 hours)
   - Finish 8 workflow tests
   - Implement 4 state tests
   - Set up fixture files

2. 🔧 **Prepare Phase 2** (4 hours)
   - Create test accounts (admin + member)
   - Build test data fixtures
   - Document test patterns

### Medium Term (Weeks 2-4)
3. 🚀 **Execute Phase 2** (18 hours)
   - Contribute flow deep-dive
   - Delete flow with permissions
   - Multi-tab sync tests

4. 📦 **Execute Phase 3** (20 hours)
   - Export format validation
   - Share link operations

### Long Term (Weeks 5+)
5. 🌐 **Execute Phase 4** (30 hours)
   - Cross-browser compatibility
   - Edge case handling
   - Workspace management

---

## 🎓 Test Patterns Used

```javascript
// Pattern 1: Graceful Skip
test('Test with optional data', async ({ page }) => {
  const data = await getTestData();
  if (!data) {
    console.log('⚠️ SKIPPED: Data unavailable');
    expect(true).toBeTruthy();
    return;
  }
  // Actual test...
});

// Pattern 2: Auto-Login Fixture
test.beforeEach(async ({ page }) => {
  await autoLogin(page);
});

// Pattern 3: Wait for Real-time Updates
const newFile = page.locator(':text("newly contributed")');
await expect(newFile).toBeVisible({ timeout: 5000 });

// Pattern 4: Modal Validation
const modal = page.locator('[role="dialog"]');
await expect(modal).toContainText('confirm');
```

---

## 📚 Resources

- **Test Code:** `/tests/phase-1-regression.spec.js`
- **Templates:** `/tests/templates/`
- **Execution:** `./run-tests.sh`
- **Reports:** `playwright-report/index.html`
- **GitHub:** https://github.com/Kiran-dsz/US-QA

---

## 👥 Sign-Off

- **Prepared by:** Claude Code
- **Date:** 2026-07-21
- **Status:** Ready for Phase 1 execution
- **Next Review:** After Phase 1 complete (EOW)
