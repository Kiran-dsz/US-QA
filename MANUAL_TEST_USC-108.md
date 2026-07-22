# Manual Test Steps: USC-108 - Activation Success Popup Localization

## Issue Summary
Activation success popup is not showing localized text - displays English instead of translated content (e.g., Chinese)

---

## Test Environment
- **URL**: https://api-dev.theplaud.com (or DTC app)
- **Device**: iOS (primary) / Also test on Web
- **Test Account**: 
  - Email: `vincent+dtc2901@plaud.ai`
  - Password: `Admin123+`

---

## Prerequisites
- [ ] Test account is active and verified
- [ ] App is on api-dev environment
- [ ] Device language settings are accessible
- [ ] Clear app cache before starting (if needed)

---

## Test Case 1: DTC Activation with Chinese Language

### Setup
1. [ ] Open iOS device Settings
2. [ ] Navigate to: Settings → Language & Region
3. [ ] Change language to **Chinese (Simplified)** or **Chinese (Traditional)**
4. [ ] Return to DTC app

### Activation Flow
1. [ ] Open DTC app
2. [ ] Log in with test account:
   - Email: `vincent+dtc2901@plaud.ai`
   - Password: `Admin123+`
3. [ ] Navigate to activation section
   - Look for: "Activate DTC" button or similar CTA
4. [ ] Start DTC activation process:
   - [ ] Enter required information (if needed)
   - [ ] Complete payment/subscription steps
   - [ ] Click "Activate" or "Confirm" button

### Verification - SUCCESS POPUP

**Expected Result:**
- [ ] Popup appears after successful activation
- [ ] Popup title is in **Chinese** (not English)
- [ ] Popup message/copy is in **Chinese**
- [ ] All buttons show **Chinese text**
- [ ] Example expected text: 激活成功 (Activation Success)

**Actual Result (Current Bug):**
- [ ] Popup appears
- [ ] But shows **English text** instead of Chinese
- [ ] Localization did NOT work

### Screenshot
- [ ] Take screenshot of the popup
- [ ] Attach to the issue or test report

---

## Test Case 2: DTC Activation with English Language

### Setup
1. [ ] Change device language back to **English**
2. [ ] Clear app cache (Settings → Apps → [App Name] → Storage → Clear Cache)

### Activation Flow
1. [ ] Repeat activation flow (same as Test Case 1)
2. [ ] Complete activation

### Verification
**Expected Result:**
- [ ] Popup appears with **English text**
- [ ] Localization works correctly for English

**Note:** This test should pass (English is the default/fallback)

---

## Test Case 3: DTC Activation with Spanish Language

### Setup
1. [ ] Change device language to **Spanish**
2. [ ] Clear app cache

### Activation Flow
1. [ ] Repeat activation flow
2. [ ] Complete activation

### Verification
**Expected Result:**
- [ ] Popup appears with **Spanish text**
- [ ] Example expected text: Activación Exitosa (if localized)

---

## Test Case 4: Web Platform (if applicable)

### Setup
1. [ ] Open browser on computer
2. [ ] Go to: https://api-dev.theplaud.com (or DTC web URL)
3. [ ] Set browser language to Chinese:
   - Chrome: Settings → Languages → Add Chinese
   - Safari: Settings → Websites → Chinese

### Activation Flow
1. [ ] Log in with test account
2. [ ] Complete DTC activation
3. [ ] Verify popup appears with Chinese text

---

## Checklist Summary

### Bug Validation (Issue EXISTS)
- [ ] Activation popup displays **English** when device language is **Chinese**
- [ ] Localization strings not loaded for non-English languages
- [ ] Issue is consistently reproducible

### Fix Validation (Issue is FIXED)
- [ ] Popup displays **Chinese** when device language is **Chinese**
- [ ] Popup displays **Spanish** when device language is **Spanish**
- [ ] Popup displays **English** when device language is **English**
- [ ] All text in popup is properly localized
- [ ] Works on both iOS and Web

---

## Test Execution Report

**Tester Name**: _________________  
**Test Date**: _________________  
**Environment**: api-dev  
**Device/Browser**: _________________  

### Results Summary
- [ ] Bug Confirmed (popup not localized)
- [ ] Bug Fixed (popup properly localized)
- [ ] Partial Fix (some languages work, some don't)
- [ ] Cannot Reproduce

### Issues Found
```
[Describe any issues encountered during testing]
```

### Screenshots/Evidence
```
[Attach screenshots of popup in different languages]
```

### Notes
```
[Any additional observations]
```

---

## Related Issue
- **SRE-219**: DB seed for multilingual copy - may need to verify translation data is present in database

---

## Quick Checklist for Developers (Fix Validation)
- [ ] Localization strings are loaded based on device language
- [ ] Fallback to English if translation not available
- [ ] All UI text in popup is localized (title, message, buttons)
- [ ] Database has translation entries for all supported languages
- [ ] No hardcoded English strings in popup component
