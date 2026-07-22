---
id: authentication
title: Authentication Guide
---

# Authentication Guide

This guide explains the authentication methods supported by the API: **API Key** for server-to-server use, and **OAuth 2.0** for user-facing applications.

---

## Option 1: API Key Authentication

Best for: backend scripts, CI/CD pipelines, server-to-server integrations.

### How It Works

Include your API key in the `x-api-key` header with every request.

```bash
curl https://api.example.com/v1/users \
  -H "x-api-key: YOUR_API_KEY"
```

### Best Practices

- Store keys in environment variables, never in code.
- Create separate keys for each environment (development, staging, production).
- Rotate keys every 90 days or immediately after a suspected leak.
- Scope keys to the minimum permissions needed.

---

## Option 2: OAuth 2.0 (Authorization Code Flow)

Best for: web apps and integrations where users grant your app access to their data.

### Step 1: Register Your Application

In **Settings → OAuth Apps**, create a new app and note your:
- `client_id`
- `client_secret`
- Registered redirect URI (e.g., `https://yourapp.com/callback`)

### Step 2: Redirect the User to Authorize

```
GET https://auth.example.com/oauth/authorize
  ?client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &response_type=code
  &scope=read:users write:users
  &state=RANDOM_STATE_VALUE
```

> **Always include `state`** — it protects against CSRF attacks. Generate a random value, store it in the session, and verify it when the callback arrives.

### Step 3: Exchange the Code for a Token

After the user approves, they're redirected to your callback URL with a `code` parameter:

```
https://yourapp.com/callback?code=AUTH_CODE&state=RANDOM_STATE_VALUE
```

Exchange the code for tokens:

```bash
curl -X POST https://auth.example.com/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=AUTH_CODE" \
  -d "redirect_uri=https://yourapp.com/callback" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET"
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read:users write:users"
}
```

### Step 4: Use the Token

```bash
curl https://api.example.com/v1/users \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

---

## Token Lifecycle

| Token | Lifetime | Refresh |
|---|---|---|
| Access token | 1 hour | Use refresh token |
| Refresh token | 30 days | Re-authorize user |
| API key | Until revoked | Rotate manually |

---

## Revoking Access

To revoke an OAuth token:

```bash
curl -X POST https://auth.example.com/oauth/revoke \
  -d "token=ACCESS_OR_REFRESH_TOKEN" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET"
```

Tokens are invalidated immediately.
