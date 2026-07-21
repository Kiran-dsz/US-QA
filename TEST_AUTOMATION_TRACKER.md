# Test Automation Tracker - Team Hub MVP

**Last Updated:** July 21, 2026  
**Total Tests:** 69  
**Automated:** 5  
**Pending:** 64  
**Progress:** 7.2%

---

## 📊 Automation Status Summary

| Status | Count | % |
|--------|-------|-----|
| ✅ Automated | 5 | 7.2% |
| ⏳ Pending | 64 | 92.8% |
| 🔴 Total | 69 | 100% |

---

## 📋 Test Cases Tracking

### ✅ AUTOMATED (5 Tests)

| # | Priority | Test Case | Automated |
|---|----------|-----------|-----------|
| 5 | P0 | When Team Hub is empty, the empty-state copy and icon are displayed | ✅ YES |
| 6 | P1 | The Team Hub page title and subtitle are displayed correctly | ✅ YES |
| 71 | P0 | Clicking a file in the Team Hub file list opens its detail page (P0 smoke) | ✅ YES |
| 72 | P0 | The detail page breadcrumb path includes the "Team Hub" level | ✅ YES |
| 73 | P0 | The detail page audio player loads correctly and can play (3.0 reuse smoke) | ✅ YES |

**Status:** All 5 passing ✅ | Execution Time: ~18s

---

### ⏳ PENDING (64 Tests)

#### **Team Hub Entry & Auto-Creation** (5 tests)

| # | Priority | Test Case | Automated |
|---|----------|-----------|-----------|
| 2 | P1 | The file count in the sidebar Team Hub parentheses updates as files are contributed | ❌ NO |
| 3 | P0 | The Team Hub entry is not shown in the personal workspace sidebar | ❌ NO |
| 4 | P1 | A dual-role account shows Team Hub in both the Admin workspace and the Member workspace | ❌ NO |
| 8 | P1 | Each Team Workspace has only 1 Team Hub entry, with no duplicates in the sidebar | ❌ NO |
| - | P0 | The Member view file list shows 4 columns (Name / Duration / Date created / Date added/Added By) | ❌ NO |

---

#### **View File List** (6 tests)

| # | Priority | Test Case | Automated |
|---|----------|-----------|-----------|
| 11 | P0 | The file list is sorted by contribution date (Date added) in descending order by default | ❌ NO |
| 12 | P0 | After contributing a file, the Team Hub file list shows the new file in real time | ❌ NO |
| 13 | P1 | After an Admin deletes a file, the file list removes it in real time | ❌ NO |
| 14 | P1 | Under multiple tabs, after contributing a file the other tab's Team Hub list stays consistent on refresh | ❌ NO |
| 15 | P1 | Each file list row correctly displays the Name and Duration values | ❌ NO |
| - | P0 | (Empty test case) | ❌ NO |

---

#### **Contribute File Flow** (9 tests)

| # | Priority | Test Case | Automated |
|---|----------|-----------|-----------|
| 22 | P0 | The confirmation modal states the file will be removed from the personal space | ❌ NO |
| 23 | P0 | The confirmation modal includes a "This action cannot be undone" statement | ❌ NO |
| 25 | P0 | Clicking the Cancel button in the confirmation modal keeps the file in the personal space | ❌ NO |
| 26 | P0 | Clicking the confirm button contributes successfully and shows a Toast | ❌ NO |
| 27 | P0 | After contributing, the file disappears from the personal All files list | ❌ NO |
| 29 | P1 | After renaming, a previously same-named file can be contributed successfully | ❌ NO |
| 31 | P1 | Admin account can also perform the "Contribute to Team Hub" action | ❌ NO |
| 32 | P1 | After contributing, there is no entry point to move a file from Team Hub back to personal space | ❌ NO |
| 39 | P0 | After a successful contribution, the file immediately appears in the Team Hub file list (P0 smoke) | ❌ NO |

---

#### **Post-Contribute State Changes** (6 tests)

| # | Priority | Test Case | Automated |
|---|----------|-----------|-----------|
| - | P0 | After a successful contribution, the file disappears from the personal All files list (P0 smoke) | ❌ NO |
| 42 | P1 | After contributing a file in Tab A, refreshing the Team Hub list in Tab B syncs and shows the new file | ❌ NO |
| 43 | P1 | After a page refresh, the state of the contributed file in Team Hub persists | ❌ NO |
| 44 | P1 | The contribute success Toast auto-dismisses after display and does not persistently block the UI | ❌ NO |
| 45 | P1 | After a successful contribution, the file count in parentheses next to Team Hub in the sidebar syncs and increments by 1 | ❌ NO |
| - | P1 | After refreshing a Team Hub file detail page, the content restores correctly with no blank page | ❌ NO |

---

#### **Member Permission Restrictions** (7 tests)

| # | Priority | Test Case | Automated |
|---|----------|-----------|-----------|
| 46 | P0 | When a Member hovers over a row in the Team Hub file list, the ... three-dot menu button is not rendered (P0 smoke) | ❌ NO |
| 47 | P1 | On the Team Hub file detail page, the title field is read-only (disabled) for a Member and cannot be edited | ❌ NO |
| 48 | P1 | A Member cannot rename a file from the Team Hub file list | ❌ NO |
| 51 | P1 | The Team Hub file detail page has no Find & Replace entry point at all, unavailable to both Admin and Member | ❌ NO |
| 52 | P1 | The Team Hub file detail page has no single-file Ask Plaud button at all, unavailable to both Admin and Member | ❌ NO |
| 53 | P1 | A Member cannot move a file from Team Hub back to personal space through any entry point | ❌ NO |
| 79 | P1 | Comparing the Member and Admin action menus on a Team Hub file detail page, the Member has no delete item | ❌ NO |

---

#### **Admin Delete File** (9 tests)

| # | Priority | Test Case | Automated |
|---|----------|-----------|-----------|
| 58 | P0 | The Admin sees the Delete option in the three-dot menu of the Team Hub file list (P0 smoke) | ❌ NO |
| 59 | P0 | Clicking Delete brings up the delete confirmation modal (P0 smoke) | ❌ NO |
| - | P0 | Delete confirmation modal copy includes "permanently delete" and "cannot be recovered" statements | ❌ NO |
| 61 | P0 | Clicking the confirmation modal's Cancel button does not delete the file, and the Team Hub list is unchanged | ❌ NO |
| 63 | P0 | Clicking the modal's red Delete button permanently deletes the file (P0 smoke) | ❌ NO |
| 64 | P0 | After an Admin deletes a file, it does not appear in Trash (P0 smoke) | ❌ NO |
| 65 | P1 | After an Admin deletes, the Team Hub file list removes the file in real time, with no manual refresh needed | ❌ NO |
| 66 | P1 | After an Admin deletes a file in Tab A, refreshing Tab B syncs the removal of the file in the Team Hub list | ❌ NO |
| 67 | P1 | An Admin can delete a file contributed by any member (not limited to ones they contributed themselves) | ❌ NO |

---

#### **View File Detail (Read-only)** (12 tests)

| # | Priority | Test Case | Automated |
|---|----------|-----------|-----------|
| 74 | P0 | The detail page Transcript tab shows the transcript content; the text area is read-only and cannot be edited | ❌ NO |
| 75 | P0 | The detail page Notes/Summary tab displays note content correctly; the text area is read-only | ❌ NO |
| 76 | P0 | The file title at the top of the detail page is shown as disabled/read-only; a Member cannot edit the title | ❌ NO |
| 77 | P1 | After staying on the detail page for 16 minutes, the audio resource returns 403; playback resumes after a refresh | ❌ NO |
| 78 | P1 | On a Team Hub file detail page, an Admin's action menu shows export and share operations | ❌ NO |
| 81 | P1 | Opening the same Team Hub file detail page in multiple tabs does not abnormally overwrite state | ❌ NO |
| 83 | P1 | The Team Hub file detail page and the private-space file detail page have a consistent content-area layout (Same view) | ❌ NO |
| - | P1 | (Empty test case) | ❌ NO |

---

#### **Export Operations** (10 tests)

| # | Priority | Test Case | Automated |
|---|----------|-----------|-----------|
| 86 | P0 | Export a Transcript as SRT format from a Team Hub file detail page (P0 smoke) | ❌ NO |
| 87 | P1 | Export Transcript as TXT from a Team Hub file detail page | ❌ NO |
| 88 | P0 | Export Transcript as DOCX from a Team Hub file detail page | ❌ NO |
| 89 | P1 | Export Summary/Notes as DOCX from a Team Hub file detail page | ❌ NO |
| - | P1 | Export Summary/Notes as PDF from a Team Hub file detail page | ❌ NO |
| 91 | P1 | Export a Mind Map from a Team Hub file detail page | ❌ NO |
| 92 | P1 | Export the original audio file from a Team Hub file detail page | ❌ NO |
| 93 | P1 | Export completes the download with no error when the file name contains special characters (* / \ : ? " < >) | ❌ NO |
| 94 | P1 | Timestamps are correct with no misalignment when exporting transcripts as SRT/DOCX | ❌ NO |
| 95 | P1 | An Admin account can trigger exports normally on a Team Hub file detail page | ❌ NO |

---

#### **Share Operations** (1 test)

| # | Priority | Test Case | Automated |
|---|----------|-----------|-----------|
| 109 | P1 | Accessing a valid share link while logged in (as a Workspace member), the landing page correctly displays the file content | ❌ NO |

---

#### **Workspace Data Ownership** (2 tests)

| # | Priority | Test Case | Automated |
|---|----------|-----------|-----------|
| 1 | P1 | After a file contributor is removed from the Workspace, other Members can still view the file in Team Hub | ❌ NO |
| 111 | P1 | After a file contributor is removed from the Workspace, an Admin can still delete the file in Team Hub | ❌ NO |

---

#### **Global Search & Ask** (2 tests)

| # | Priority | Test Case | Automated |
|---|----------|-----------|-----------|
| - | P0 | After a file is contributed to the team hub, it is reachable in global search | ❌ NO |
| - | P0 | After a file is contributed to the team hub, it is reachable in global ask | ❌ NO |

---

## 📈 Next Phase Recommendations

### **Phase 2: Medium Difficulty (Recommended Next)** 🟡
- Test 22, 23, 25 (Contribute Flow - Modal interactions)
- Test 11, 15 (File List - Display & sorting)
- **Estimated time:** 8-10 hours for ~10 tests

### **Phase 3: Core Functionality** 📥
- Contribute flow (9 tests)
- Admin delete (9 tests)
- State changes (6 tests)
- **Estimated time:** 15-20 hours

### **Phase 4: Advanced Features** 🔴
- Export operations (10 tests)
- File detail page (12 tests)
- Permissions (7 tests)
- **Estimated time:** 20-30 hours

---

## 📝 Notes

- **Automated Tests Location:** `/tests/team-hub-notion-tests.spec.js`
- **Test Account:** pnookvex@sharklasers.com / Test1234
- **Environment:** https://test.theplaud.com
- **Pass Rate:** 100% (5/5 tests passing)
- **Average Execution:** ~18 seconds for all 5 tests

---

## ✅ How to Use This Tracker

1. **Mark tests as automated** when they're completed
2. **Update progress %** as you go
3. **Track execution times** to estimate remaining work
4. **Use for sprint planning** to prioritize next tests

---

**Last Automated:** July 21, 2026 @ 13:50 UTC  
**Tests Passing:** 5/5 ✅  
**Overall Progress:** 7.2% Complete

