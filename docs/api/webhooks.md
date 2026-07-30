---
id: webhooks
title: Webhooks
---

# Webhooks

Webhooks let you receive real-time notifications when events happen in your account. Instead of polling the API repeatedly, you register an endpoint on your server and the platform sends an HTTP POST request to that endpoint whenever a relevant event occurs.

---

## How Webhooks Work

1. You register a webhook endpoint URL in your account settings
2. An event occurs (for example, a user is created or a payment completes)
3. The platform sends a POST request to your endpoint with the event payload
4. Your server processes the payload and returns a `200` response
5. If your server doesn't respond with `200` within 10 seconds, the delivery is retried

---

## Registering a Webhook

```
POST /webhooks
```

**Headers**

| Header | Value |
|---|---|
| `Authorization` | `Bearer YOUR_ACCESS_TOKEN` |
| `Content-Type` | `application/json` |

**Request Body**

| Field | Type | Required | Description |
|---|---|---|---|
| `url` | string | Yes | The HTTPS endpoint that will receive event payloads. Must be publicly accessible. |
| `events` | array | Yes | List of event types to subscribe to. Use `["*"]` to subscribe to all events. |
| `description` | string | No | A label to identify this webhook in the dashboard. |
| `secret` | string | No | A secret string used to sign payloads. Strongly recommended. See [Verifying signatures](#verifying-signatures). |

**Example**

```bash
curl -X POST https://api.example.com/v1/webhooks \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://yourapp.com/webhooks/events",
    "events": ["user.created", "invoice.paid", "subscription.cancelled"],
    "description": "Production event handler",
    "secret": "whsec_your_signing_secret"
  }'
```

**Response — 201 Created**

```json
{
  "id": "wh_01HX9Z2K4P",
  "url": "https://yourapp.com/webhooks/events",
  "events": ["user.created", "invoice.paid", "subscription.cancelled"],
  "status": "active",
  "created_at": "2024-06-01T10:00:00Z"
}
```

---

## Event Payload Structure

Every webhook delivery has the same envelope structure regardless of event type.

```json
{
  "id": "evt_01HX9Z3M5Q",
  "type": "invoice.paid",
  "created_at": "2024-06-01T10:05:00Z",
  "api_version": "2024-01-01",
  "data": {
    "object": {
      "id": "inv_01HX9Z3M5R",
      "amount": 4900,
      "currency": "usd",
      "status": "paid",
      "customer_id": "cus_01HX4Z9K2P",
      "paid_at": "2024-06-01T10:04:58Z"
    }
  }
}
```

| Field | Description |
|---|---|
| `id` | Unique ID for this delivery. Use this to deduplicate events if your endpoint receives the same event twice. |
| `type` | The event type. Format is `resource.action` (e.g. `user.created`, `invoice.paid`). |
| `created_at` | When the event occurred, in ISO 8601 format. |
| `api_version` | The API version used to generate the payload. Pinned to your account's API version at registration time. |
| `data.object` | The full resource object at the time of the event. |

---

## Event Types

| Event | Triggered when |
|---|---|
| `user.created` | A new user account is created |
| `user.updated` | A user's profile or role changes |
| `user.deleted` | A user account is deleted |
| `invoice.created` | A new invoice is generated |
| `invoice.paid` | An invoice is successfully paid |
| `invoice.payment_failed` | A payment attempt fails |
| `subscription.created` | A new subscription is started |
| `subscription.cancelled` | A subscription is cancelled |
| `subscription.renewed` | A subscription renews successfully |

---

## Verifying Signatures

Every delivery includes an `X-Webhook-Signature` header. Verify this signature before processing the payload to confirm the request came from the platform and wasn't tampered with.

**How it works:**

The signature is an HMAC-SHA256 hash of the raw request body, computed using your webhook secret.

**Verification example (Node.js):**

```js
const crypto = require('crypto');

function verifyWebhookSignature(rawBody, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}
```

> Always use `timingSafeEqual` rather than `===` to prevent timing attacks.

Return a `403` response and stop processing if the signature doesn't match.

---

## Retry Behaviour

If your endpoint doesn't return a `2xx` response within 10 seconds, the delivery is marked as failed and retried with exponential backoff:

| Attempt | Delay |
|---|---|
| 1 | Immediate |
| 2 | 1 minute |
| 3 | 5 minutes |
| 4 | 30 minutes |
| 5 | 2 hours |

After 5 failed attempts, the delivery is abandoned and marked as `failed` in the event log. The webhook is automatically disabled if more than 50% of deliveries fail over a 24-hour period.

---

## Handling Duplicate Deliveries

Network issues can sometimes cause the same event to be delivered more than once. Your endpoint should be idempotent — processing the same event twice should produce the same result as processing it once.

Use the event `id` to deduplicate:

```js
const eventId = payload.id;

if (await hasProcessed(eventId)) {
  return res.status(200).send('Already processed');
}

await processEvent(payload);
await markAsProcessed(eventId);
```

---

## Webhook Logs

Every delivery attempt is logged and available in the dashboard under **Settings → Webhooks → [webhook name] → Event log**.

Each log entry shows:
- Event ID and type
- Request headers and body
- Response status code and body
- Delivery duration
- Whether the delivery succeeded or was retried

Logs are retained for 30 days.

---

## Managing Webhooks

**List all webhooks**

```
GET /webhooks
```

**Get a specific webhook**

```
GET /webhooks/:id
```

**Update a webhook**

```
PATCH /webhooks/:id
```

Send only the fields you want to change. To pause deliveries without deleting the webhook:

```json
{ "status": "paused" }
```

**Delete a webhook**

```
DELETE /webhooks/:id
```

Returns `204 No Content`.

---

## Best Practices

**Respond quickly.** Your endpoint should return `200` immediately and process the payload asynchronously. If processing takes longer than 10 seconds, the delivery times out and is retried.

**Always verify signatures.** Don't skip signature verification in production. Any public HTTPS endpoint can receive POST requests — verification confirms the payload is genuine.

**Handle retries gracefully.** Design your event handler to be idempotent. Assume any event might arrive more than once.

**Use the event log.** If your integration stops working, the webhook event log is the fastest way to see what's happening — what was sent, what your server returned, and whether deliveries are failing.
