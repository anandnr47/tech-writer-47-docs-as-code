---
id: release-notes
title: Release Notes
---

# Release Notes

---

## v2.4.0 — June 2025

### What's New

**Team Workspaces (Beta)**
You can now create multiple workspaces within a single organization. Each workspace has its own members, API keys, and usage limits. This makes it easier to separate projects, teams, or environments without managing separate accounts.

To create a workspace: go to **Settings → Workspaces → Create Workspace**.

**Improved Rate Limit Headers**
All API responses now include three rate limit headers to help you manage request pacing:

| Header | Description |
|---|---|
| `X-RateLimit-Limit` | Maximum requests allowed per minute. |
| `X-RateLimit-Remaining` | Requests remaining in the current window. |
| `X-RateLimit-Reset` | Unix timestamp when the limit resets. |

**Webhook Retry Logic**
Failed webhook deliveries are now retried up to 5 times with exponential backoff (1s, 2s, 4s, 8s, 16s). The webhook event log in the dashboard now shows each delivery attempt and its response status.

### Changes

- The `GET /users` endpoint now returns `last_login` for all users by default. Previously this required the `?include=last_login` query parameter.
- Inactive users are now excluded from `GET /users` results by default. Pass `?status=all` to include them.

### Bug Fixes

- Fixed an issue where refresh tokens occasionally expired before their 30-day lifetime when generated near a DST boundary.
- Fixed pagination returning duplicate records when items were deleted mid-page.

---

## v2.3.0 — April 2025

### What's New

**SCIM Provisioning**
Enterprise plans now support SCIM 2.0 for automated user provisioning and deprovisioning via your identity provider (Okta, Azure AD, Google Workspace). See the [SCIM Integration Guide](#) for setup instructions.

**Audit Log API**
Programmatic access to your organization's audit log is now available via `GET /audit-log`. Filter by actor, event type, or date range.

### Changes

- OAuth token lifetimes are now configurable per application (1–24 hours for access tokens, 7–90 days for refresh tokens). The default remains 1 hour / 30 days.
- The `POST /auth/login` endpoint now returns `account_locked: true` in the error body when the account is locked, instead of a generic `401`.

### Deprecations

- `GET /v1/me` is deprecated. Use `GET /v1/users/me` instead. The old endpoint will be removed in **v3.0**.

---

## v2.2.1 — March 2025

### Bug Fixes

- Fixed a regression in v2.2.0 where `PATCH /users/:id` returned `422` for valid `status` values.
- Fixed missing `Content-Type: application/json` header on error responses.

---

## v2.2.0 — February 2025

### What's New

**Role-Based Access Control (RBAC)**
Three built-in roles are now available: `admin`, `member`, and `viewer`. Roles control which API endpoints a user can call and which resources they can see in the dashboard.

**Batch User Invitations**
Invite up to 50 users in a single API call using `POST /users/invite` with an array of email addresses.
