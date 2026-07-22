---
id: getting-started
title: Getting Started
---

# Getting Started

This guide walks you through making your first API call — from creating an account to retrieving data. It takes about 10 minutes.

---

## Prerequisites

- A registered account at [example.com](https://example.com)
- A tool for making HTTP requests: [curl](https://curl.se/), [Postman](https://www.postman.com/), or your preferred HTTP client
- Basic familiarity with REST APIs

---

## Step 1: Get Your API Credentials

1. Log in to your dashboard at **app.example.com**.
2. Go to **Settings → API Keys**.
3. Click **Create API Key**, give it a name, and click **Generate**.
4. Copy the key — it's only shown once. Store it somewhere safe (e.g., a password manager or environment variable).

> **Security note:** Never commit API keys to source control. Use environment variables or a secrets manager.

---

## Step 2: Authenticate

Exchange your credentials for an access token using the [POST /auth/login](/api/login) endpoint.

```bash
curl -X POST https://api.example.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "you@example.com",
    "password": "yourPassword"
  }'
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

Save the `access_token` — you'll use it in the next step.

---

## Step 3: Make Your First API Call

Use the access token to fetch your organization's users.

```bash
curl https://api.example.com/v1/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**

```json
{
  "data": [
    {
      "id": "usr_01HX4Z9K2P",
      "name": "Priya Sharma",
      "email": "priya@example.com",
      "role": "member",
      "status": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

---

## Step 4: Handle Token Expiry

Access tokens expire after **1 hour**. When a request returns `401 UNAUTHORIZED`, refresh your token:

```bash
curl -X POST https://api.example.com/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "YOUR_REFRESH_TOKEN"
  }'
```

This returns a new `access_token` without requiring you to log in again.

---

## Next Steps

- Read the full [API Reference](/api/login) for all available endpoints
- Learn about [authentication flows](/tutorials/authentication) including OAuth 2.0
- Check the [Users API](/api/users) to manage team members programmatically
