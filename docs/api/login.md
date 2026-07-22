# POST /auth/login

Authenticates a user with email and password credentials. Returns a short-lived access token and a refresh token.

---

## Request

**Endpoint**

```
POST https://api.example.com/v1/auth/login
```

**Headers**

| Header | Value |
|---|---|
| `Content-Type` | `application/json` |

**Body**

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | string | Yes | The user's registered email address. |
| `password` | string | Yes | The user's password (minimum 8 characters). |

**Example**

```json
{
  "email": "user@example.com",
  "password": "mySecurePassword"
}
```

---

## Response

### 200 OK

Authentication succeeded. Returns access and refresh tokens.

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

| Field | Type | Description |
|---|---|---|
| `access_token` | string | JWT used to authenticate subsequent API requests. Expires in 1 hour. |
| `refresh_token` | string | Token used to obtain a new access token. Expires in 30 days. |
| `token_type` | string | Always `Bearer`. |
| `expires_in` | integer | Access token lifetime in seconds. |

---

## Error Responses

| Status | Code | Description |
|---|---|---|
| `400` | `VALIDATION_ERROR` | Missing or malformed request fields. |
| `401` | `INVALID_CREDENTIALS` | Email or password is incorrect. |
| `429` | `RATE_LIMIT_EXCEEDED` | Too many login attempts. Retry after the interval in the `Retry-After` header. |
| `500` | `INTERNAL_ERROR` | Unexpected server error. |

**Example 401 response**

```json
{
  "error": "INVALID_CREDENTIALS",
  "message": "The email or password you entered is incorrect.",
  "status": 401
}
```

---

## Notes

- Access tokens must be included in the `Authorization` header of all authenticated requests: `Authorization: Bearer <access_token>`
- After an access token expires, use your refresh token to call `POST /auth/refresh` and get a new access token without re-entering credentials.
- After 5 consecutive failed attempts, the account is locked for 15 minutes.
