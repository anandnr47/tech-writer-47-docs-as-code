---
id: how-jwts-work
title: How JWTs Work
---

# How JWTs Work

A JWT (JSON Web Token) is a self-contained token that carries information about a user. Instead of looking up a session in a database on every request, the server reads the token directly.

A JWT has three parts, separated by dots:

```
HEADER.PAYLOAD.SIGNATURE
```

---

## The Payload

The payload holds claims, which are facts about the user or session.

```json
{
  "sub": "usr_01HX4Z9K2P",
  "role": "admin",
  "iat": 1719824000,
  "exp": 1719827600
}
```

| Claim | Meaning |
|---|---|
| `sub` | User ID |
| `iat` | Issued at (Unix timestamp) |
| `exp` | Expires at (Unix timestamp) |

> **The payload is encoded, not encrypted.** Anyone can decode it. Never put passwords or sensitive data in a JWT.

---

## The Signature

The signature is computed from the header + payload using a secret key:

```
HMACSHA256(base64url(header) + "." + base64url(payload), secret)
```

When a server receives a token, it recomputes the signature. If it matches, the payload hasn't been tampered with. If even one character changed, verification fails.

---

## The Basic Flow

1. User logs in → server issues a JWT
2. Client sends the JWT with every request: `Authorization: Bearer <token>`
3. Server verifies the signature and checks `exp`
4. Valid → request proceeds. Expired or tampered → `401`

---

## Common Gotchas

**Token expired.** The client needs to re-authenticate or use a refresh token.

**Can't revoke early.** JWTs are valid until `exp`. If you need instant revocation (after a password change, for example), use short expiry times or maintain a blocklist.

**`alg: none` vulnerability.** Some old libraries accepted unsigned tokens. Always configure your library to require a specific algorithm.

---

Paste any JWT into [jwt.io](https://jwt.io) to inspect it.
