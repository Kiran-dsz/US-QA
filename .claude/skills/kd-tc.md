# /kd-tc — Generate Test Cases for Notion Database

Generate comprehensive test cases matching your "Phase 3: Redemption — Test Cases" Notion database schema.

## Usage

```
/kd-tc
```

Share your source materials (Notion PRD, Linear tickets, Figma designs) and I'll generate test cases ready to copy into Notion.

## Test Case Fields Generated

- **Test ID** — Auto-generated (TC-001, TC-002, etc.)
- **Title** — Clear, outcome-focused test name
- **Main Category** — Charge Correctness, Charge Recording, Code Validation, Balance Management, Error Handling, Concurrency, Analytics, or Cross-Platform
- **Priotiry** — P0 (critical), P1 (important), P2 (nice-to-have)
- **Preconditions** — What must be true before test starts
- **Test Steps** — Numbered sequence of actions
- **Expected Results** — Specific outcome/state/response
- **Test type** — Manual / Automated (or both)
- **Test Result** — Status (Not needed, Fail, Pass, Backend, Blocked)
- **Bug Ticket** — Related Linear ticket (optional)
- **Comments** — Notes, edge cases, dependencies

## Coverage Provided

1. **Happy Path Tests (P0)** — Core functionality working correctly
2. **Negative Path Tests (P1)** — Error handling, edge cases
3. **Edge Cases (P1/P2)** — Boundary conditions, concurrency scenarios
4. **Backend Tests** — API/database validation

## How to Use

1. Invoke `/kd-tc`
2. Provide:
   - Notion PRD link (requirements document)
   - Linear ticket URL(s) (features/bugs to test)
   - Figma design URL (UI/flows - optional)
   - Which Main Category this covers
3. Get back comprehensive test cases
4. Copy/paste directly into your Notion database

## What I'll Generate

- 15-25 comprehensive test cases per feature
- Organized by priority (P0 → P1 → P2)
- Test data ready to use
- Both manual and automated test scenarios
- Edge cases and concurrency considerations

---

**Notion Database:** Phase 3: Redemption — Test Cases  
**Data Source:** collection://0f6d0604-6160-823b-b874-87acc3d8c76d  
**Last Updated:** September 4, 2026
