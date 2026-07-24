# Plaud Web App QA Exploration Summary

**Date:** July 23, 2026  
**Explored By:** Claude AI QA Agent  
**Status:** Complete with findings documented

---

## Executive Summary

Comprehensive QA exploration of the Plaud web application identified:
- **1 CRITICAL issue** (Pricing discount not applied)
- **2 HIGH issues** (Annual pricing math, disabled Team tab)
- **2 MEDIUM issues** (Missing comparison table, dropdown improvements)
- **Multiple features verified working** ✅

All findings documented in skill and README for team visibility.

---

## Pages Explored

1. ✅ **Homepage** (`https://test.theplaud.com/`)
2. ✅ **Login Flow** (email/password authentication)
3. ✅ **Personal Workspace Dropdown** (25 menu items)
4. ✅ **Settings Page** (Account & security, Language, etc.)
5. ✅ **Team Plan Page** (`/member/workspace/plan`)
6. ✅ **Purchase Page** (`/member/purchase?from=left_up`)
7. ✅ **Membership Center** (Individual plans)
8. ✅ **Profile & Account Settings**

---

## Critical Issues Found

### 🔴 CRITICAL: Pricing Discount Not Applied

**Severity:** CRITICAL (Revenue Impact)

**Affected Pages:**
- `/member/workspace/plan` (Team Plan)
- `/member/purchase?from=left_up` (Individual Plans)

**Problem:**
```
Banner says: "20% off every seat until Aug 31, 2026"
Price shows: $25.00
Strikethrough shows: $25.00 (SAME as displayed)
Expected: $20.00 with 20% off (or $25 strikethrough $31.25)
Actual: NO VISIBLE DISCOUNT
```

**Why Critical:**
- Discount is completely invisible to customers
- Revenue loss from customers expecting savings
- Credibility damage (advertised vs actual mismatch)
- Will generate support tickets

**Required Fix:**
- Apply discount calculation to displayed price
- Show original price clearly
- Ensure strikethrough ≠ final price

---

### 🟡 HIGH: Annual Pricing Math Inconsistent

**Affected Page:** Team Plan (`/member/workspace/plan`)

**Problem:**
```
Monthly: $25.00 (shows "20% off")
Annual:  $300.00 = $25 × 12 (shows "-11% off")
Actual: Both show FULL price, no discount applied
```

**Math Error:**
- 20% off $25/month: annual should be $240 (not $300)
- 11% off annual: should be $267.30 (not $300)
- Currently: $300 = 0% discount

**Impact:** User confusion about actual discount rate

---

### 🟡 HIGH: Disabled "Team" Tab on Purchase Page

**Affected Page:** `/member/purchase?from=left_up`

**Problem:**
- Tab bar shows: [Individual] [Team - DISABLED]
- Users see "Team" option but can't click it
- Must navigate to different URL for team plans

**UX Issue:** Disabled UI elements confuse users. Either hide or enable.

---

### 🟡 MEDIUM: Missing Feature Comparison Table

**Affected Page:** Team Plan page

**Problem:**
- Features shown as checklist (✓ items)
- No formal comparison table
- Difficult for users to compare tiers

**Impact:** Users can't easily see differences between plans

---

### 🟡 LOW: Workspace Dropdown Menu Improvements

**Affected Section:** Personal workspace dropdown (homepage)

**Missing Elements:**
1. User profile card (email/avatar)
2. "About Plaud" link
3. Visual grouping/separators

**Impact:** Minor UX improvements possible

---

## Features Verified Working ✅

### Homepage
- ✅ Login flow smooth and reliable
- ✅ Recent files display correctly
- ✅ Plaud Community section functional
- ✅ Navigation between sections works
- ✅ Search accessible
- ✅ No console errors
- ✅ Responsive design

### Workspace Dropdown (25 Items)
- ✅ All menu items accessible
- ✅ Settings page loads correctly
- ✅ Membership Center reachable
- ✅ Support/feedback options present
- ✅ Sign out functional
- ✅ No broken navigation

### Membership Center
- ✅ All 3 plan tiles display (Starter, Pro, Unlimited)
- ✅ "Choose Your Plan" heading shows
- ✅ Currency selector accessible
- ✅ Currency change functional (USD → EUR)
- ✅ Prices update correctly
- ✅ Screenshots capture properly

---

## Test Automation Status

### Automated QA Test (`/qauitest`)
- ✅ **8/8 Tests Passing**
- ✅ Login automation
- ✅ Modal popup closure
- ✅ Navigation to Membership Center
- ✅ Plan tile verification
- ✅ Currency selector testing
- ✅ Price update validation
- ✅ Screenshot evidence capture

**Duration:** ~27 seconds per run  
**Last Run:** July 23, 2026 - All passing

---

## Recommendations

### Priority 1 (CRITICAL)
1. **Fix pricing discount calculation**
   - Apply 20% discount to displayed prices
   - Make discount VISIBLE in UI
   - Ensure consistency across all pages

### Priority 2 (HIGH)
2. **Fix annual pricing math**
   - Either apply 20% discount to annual OR
   - Explain why annual gets different rate

3. **Enable or hide Team tab**
   - Either make Team tab clickable
   - Or remove it and rely on URL navigation

### Priority 3 (MEDIUM)
4. **Add feature comparison table**
   - Side-by-side comparison of plan features
   - Help users understand differences

5. **Improve workspace dropdown**
   - Add user profile card
   - Add About link
   - Add visual grouping

---

## Documentation Updates

All findings documented in:
- ✅ `/qauitest.skill.md` - Skill definition with issues
- ✅ `/tests/membership-center/README.md` - Main documentation
- ✅ This summary file
- ✅ GitHub commit with details

---

## Next Steps

1. **For Developers:** Review documented issues and implement fixes
2. **For QA:** Use `/qauitest` to verify fixes
3. **For Product:** Prioritize pricing discount fix (revenue impact)
4. **For Team:** Share findings via Slack channel

---

## Contact & Questions

Findings documented for team visibility.  
Automated test available: `/qauitest`  
Test repo: https://github.com/Kiran-dsz/US-QA

---

**Document Complete**  
All exploration findings saved and documented.
