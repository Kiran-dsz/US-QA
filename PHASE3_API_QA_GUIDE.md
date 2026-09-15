# Phase 3 Credits Test API - QA Guide

**Source:** 803 Preview Credits — Test API Guide  
**API Key:** `sk_803_qa_BqBmYBlRWZ6oKsSfE26co8-iPlr9ZTCG`

---

## Quick Setup

### Environment Variables
```bash
# For PRE (beta-staging.plaud.ai)
export APP_URL="https://api-test.plaud.ai"
export WT="<PRE_WORKSPACE_TOKEN>"
export CREDITS_TEST_API_KEY="sk_803_qa_BqBmYBlRWZ6oKsSfE26co8-iPlr9ZTCG"
export RUN_ID="$(date +%s)"

# For Dev
export APP_URL="https://api-dev.plaud.ai"
export WT="<DEV_WORKSPACE_TOKEN>"
export CREDITS_TEST_API_KEY=""
```

### Required Headers
```bash
-H "Authorization: Bearer $WT" \
-H "X-API-KEY: $CREDITS_TEST_API_KEY"
```

---

## Five Helper APIs

### 1. Set Version Tag
**Purpose:** Set/remove Membership-side 4.0 signal for testing

```bash
curl -X POST "$APP_URL/mem-app/v4/credits/test/set-version-tag" \
  -H "Authorization: Bearer $WT" \
  -H "X-API-KEY: $CREDITS_TEST_API_KEY" \
  -d '{
    "tag": "v4.0"
  }'
```

---

### 2. Submit Test Usage
**Purpose:** Inject usage events (transcription, summary, agent) without Kafka

```bash
curl -X POST "$APP_URL/mem-app/v4/credits/test/inject-usage" \
  -H "Authorization: Bearer $WT" \
  -H "X-API-KEY: $CREDITS_TEST_API_KEY" \
  -d '{
    "usage_event_id": "'"$RUN_ID"'-usage-1",
    "member_id": "<MEMBER_ID>",
    "event_type": "transcription",
    "feature": "transcribe",
    "quantity": 2,
    "unit": "minutes",
    "billed_quantity": 2,
    "occurred_at": "'"$(date -u +%Y-%m-%dT%H:%M:%SZ)"'"
  }'
```

**Event Types:**
- `transcription` - Deduct minutes
- `summary` - Deduct minutes  
- `agent_query` - Deduct credits

---

### 3. Set Local Time
**Purpose:** Advance local time for testing time-based entitlements

```bash
curl -X POST "$APP_URL/mem-app/v4/credits/test/set-local-time" \
  -H "Authorization: Bearer $WT" \
  -H "X-API-KEY: $CREDITS_TEST_API_KEY" \
  -d '{
    "local_time": "2025-10-15T00:00:00Z"
  }'
```

---

### 4. Create Subscription  
**Purpose:** Create test subscription with minutes/credits

```bash
curl -X POST "$APP_URL/mem-app/v4/credits/test/create-subscription" \
  -H "Authorization: Bearer $WT" \
  -H "X-API-KEY: $CREDITS_TEST_API_KEY" \
  -d '{
    "subscription_id": "sub_test_'"$RUN_ID"'",
    "plan_id": "starter",
    "minutes_per_month": 300,
    "gifted_credits": 600,
    "start_date": "'"$(date -u +%Y-%m-%d)"'",
    "end_date": "2025-12-31"
  }'
```

---

### 5. Force Activate (Dev Only)
**Purpose:** Force-activate a subscription (Dev environment only)

```bash
curl -X POST "$APP_URL/mem-app/v4/credits/test/force-activate" \
  -H "Authorization: Bearer $WT" \
  -H "X-API-KEY: $CREDITS_TEST_API_KEY" \
  -d '{
    "subscription_id": "sub_test_'"$RUN_ID"'"
  }'
```

---

## Testing Scenarios

### Scenario 1: Test Transcription Cost (2 minutes)
```bash
# 1. Create subscription with 300 minutes
curl -X POST "$APP_URL/mem-app/v4/credits/test/create-subscription" \
  -H "Authorization: Bearer $WT" \
  -H "X-API-KEY: $CREDITS_TEST_API_KEY" \
  -d '{
    "subscription_id": "sub_test_transcribe",
    "plan_id": "starter",
    "minutes_per_month": 300,
    "gifted_credits": 600
  }'

# 2. Inject transcription usage (2 minutes)
curl -X POST "$APP_URL/mem-app/v4/credits/test/inject-usage" \
  -H "Authorization: Bearer $WT" \
  -H "X-API-KEY: $CREDITS_TEST_API_KEY" \
  -d '{
    "usage_event_id": "usage_transcribe_001",
    "event_type": "transcription",
    "feature": "transcribe",
    "quantity": 2,
    "unit": "minutes"
  }'

# 3. Verify balance via UI (should show 298 min left)
```

### Scenario 2: Test Agent Cost (10 credits)
```bash
# 1. Create subscription with 600 credits
curl -X POST "$APP_URL/mem-app/v4/credits/test/create-subscription" \
  -H "Authorization: Bearer $WT" \
  -H "X-API-KEY: $CREDITS_TEST_API_KEY" \
  -d '{
    "subscription_id": "sub_test_agent",
    "plan_id": "starter",
    "minutes_per_month": 300,
    "gifted_credits": 600
  }'

# 2. Inject agent usage (10 credits)
curl -X POST "$APP_URL/mem-app/v4/credits/test/inject-usage" \
  -H "Authorization: Bearer $WT" \
  -H "X-API-KEY: $CREDITS_TEST_API_KEY" \
  -d '{
    "usage_event_id": "usage_agent_001",
    "event_type": "agent_query",
    "feature": "agent",
    "quantity": 10,
    "unit": "credits"
  }'

# 3. Verify balance via UI (should show 590 credits left)
```

### Scenario 3: Test Renewal (Next Month)
```bash
# 1. Set local time to next month
curl -X POST "$APP_URL/mem-app/v4/credits/test/set-local-time" \
  -H "Authorization: Bearer $WT" \
  -H "X-API-KEY: $CREDITS_TEST_API_KEY" \
  -d '{
    "local_time": "2025-11-01T00:00:00Z"
  }'

# 2. Verify balance resets (should show 300 min + 600 credits)
```

---

## API Response Format

**Success:**
```json
{
  "success": true,
  "data": {
    "subscription_id": "sub_test_xxx",
    "minutes_remaining": 298,
    "credits_remaining": 590
  }
}
```

**Error:**
```json
{
  "success": false,
  "error": "INSUFFICIENT_BALANCE",
  "message": "Not enough minutes for this operation"
}
```

---

## Important Notes

1. **API Key is for QA only** - Do not commit or share
2. **PRE shares production database** - Use dedicated test accounts
3. **All calls are audit-logged and rate-limited**
4. **Generate unique IDs for each test run:** `$RUN_ID`, `usage_event_id`, `subscription_id`
5. **Workspace token** required (derive user/workspace/member from token)
6. **No Dev/Test APIs in Production** - Will return 404

---

## Full Documentation

See `NOTION_CREDITS_API.txt` for complete API documentation from Notion.
