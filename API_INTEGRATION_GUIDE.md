# Phase 3 API Integration Guide

This guide documents how to trigger Phase 3 operations via API for testing and integration purposes.

## Prerequisites

- API authentication token/credentials
- Base URL: `https://beta.theplaud.com/api` (or relevant environment)
- Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`

---

## 1. Bind a Device Using API

**Endpoint:** `POST /devices/bind`

**Purpose:** Register a new device for the user

**Request:**
```json
{
  "device_id": "unique-device-id",
  "device_type": "mobile|web|desktop",
  "device_name": "My Device",
  "os": "ios|android|windows|macos|linux"
}
```

**Response:**
```json
{
  "success": true,
  "device_id": "unique-device-id",
  "bound_at": "2024-09-15T10:30:00Z"
}
```

**cURL Example:**
```bash
curl -X POST https://beta.theplaud.com/api/devices/bind \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "device-abc123",
    "device_type": "web",
    "device_name": "Test Device",
    "os": "macos"
  }'
```

---

## 2. Trigger Transcription Event Using API

**Endpoint:** `POST /transcriptions/create`

**Purpose:** Start a transcription job (costs minutes from user balance)

**Request:**
```json
{
  "audio_file": "base64-encoded-audio|url-to-audio",
  "audio_format": "mp3|wav|ogg|m4a",
  "audio_duration_seconds": 120,
  "language": "en|zh|es|etc",
  "user_id": "user-identifier"
}
```

**Response:**
```json
{
  "success": true,
  "transcription_id": "trans-xyz789",
  "status": "processing",
  "minutes_deducted": 2,
  "remaining_minutes": 298,
  "created_at": "2024-09-15T10:30:00Z"
}
```

**cURL Example:**
```bash
curl -X POST https://beta.theplaud.com/api/transcriptions/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "audio_file": "https://example.com/audio.mp3",
    "audio_format": "mp3",
    "audio_duration_seconds": 120,
    "language": "en"
  }'
```

---

## 3. Trigger Summary Using API

**Endpoint:** `POST /summaries/create`

**Purpose:** Generate a summary (costs minutes from user balance)

**Request:**
```json
{
  "transcription_id": "trans-xyz789",
  "summary_type": "bullet_points|paragraph|key_takeaways",
  "max_length": "short|medium|long"
}
```

**Response:**
```json
{
  "success": true,
  "summary_id": "sum-abc456",
  "transcription_id": "trans-xyz789",
  "summary_text": "Key points from the meeting...",
  "minutes_deducted": 1,
  "remaining_minutes": 297,
  "created_at": "2024-09-15T10:31:00Z"
}
```

**cURL Example:**
```bash
curl -X POST https://beta.theplaud.com/api/summaries/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "transcription_id": "trans-xyz789",
    "summary_type": "bullet_points",
    "max_length": "medium"
  }'
```

---

## 4. Trigger Agent Task Using API

**Endpoint:** `POST /agent/ask`

**Purpose:** Send a query to the AI Agent (costs credits from user balance)

**Request:**
```json
{
  "query": "What are the action items from this meeting?",
  "context": "transcription_id|document_id|raw_text",
  "context_value": "trans-xyz789|doc-123|text content",
  "agent_model": "gpt-4|gpt-3.5-turbo"
}
```

**Response:**
```json
{
  "success": true,
  "agent_response_id": "agent-def789",
  "query": "What are the action items from this meeting?",
  "response": "Based on the meeting transcript, the action items are...",
  "credits_deducted": 5,
  "remaining_credits": 595,
  "tokens_used": 450,
  "created_at": "2024-09-15T10:32:00Z"
}
```

**cURL Example:**
```bash
curl -X POST https://beta.theplaud.com/api/agent/ask \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What are the action items from this meeting?",
    "context": "transcription_id",
    "context_value": "trans-xyz789",
    "agent_model": "gpt-4"
  }'
```

---

## Cost Structure

| Operation | Cost | Unit |
|-----------|------|------|
| Transcription | 1 minute per minute of audio | Minutes |
| Summary | 1 minute per summary | Minutes |
| Agent Query | 5-10 credits per query | Credits |
| Device Binding | Free | - |

**Starter Plan Entitlements:**
- 300 minutes/month (transcription + summary)
- 600 gifted credits (agent work)

---

## Error Handling

All API endpoints return standard error responses:

```json
{
  "success": false,
  "error_code": "INSUFFICIENT_BALANCE",
  "error_message": "User does not have enough minutes for this operation",
  "required_balance": 2,
  "current_balance": 1
}
```

**Common Error Codes:**
- `INSUFFICIENT_BALANCE` - Not enough minutes/credits
- `INVALID_AUDIO_FORMAT` - Audio file format not supported
- `AUDIO_TOO_LONG` - Audio exceeds max duration
- `INVALID_TOKEN` - Authentication failed
- `RATE_LIMITED` - Too many requests

---

## Testing with cURL/Postman

1. Get your auth token from account settings
2. Replace `YOUR_TOKEN` with actual token
3. Use the examples above in Postman or cURL
4. Monitor balance changes in the UI or via `/users/balance` endpoint

## Balance Check Endpoint

**Endpoint:** `GET /users/balance`

```bash
curl -X GET https://beta.theplaud.com/api/users/balance \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "minutes_remaining": 297,
  "credits_remaining": 595,
  "plan_type": "starter",
  "plan_expires_at": "2024-10-15T00:00:00Z"
}
```

---

## Notes for QA

- All timestamps are in ISO 8601 format (UTC)
- Audio file uploads can be done via base64 or URL
- Deductions are immediate upon request acceptance
- Async operations use webhook callbacks or polling via `GET /transcriptions/{id}/status`
