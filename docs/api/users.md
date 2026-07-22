---
id: users
title: Users API
---

# Users API

Manage user accounts in your organization. All endpoints require a valid Bearer token.

---

## GET /users

Returns a paginated list of users in your organization.

**Endpoint**

```
GET https://api.example.com/v1/users
```

**Headers**

| Header | Value |
|---|---|
| `Authorization` | `Bearer <access_token>` |

**Query Parameters**

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `page` | integer | No | `1` | Page number. |
| `limit` | integer | No | `20` | Results per page. Max `100`. |
| `role` | string | No | — | Filter by role: `admin`, `member`, or `viewer`. |
| `status` | string | No | `active` | Filter by status: `active` or `inactive`. |

**Example Request**

```
GET /v1/users?page=1&limit=10&role=member
```

**Response — 200 OK**

```json
{
  "data": [
    {
      "id": "usr_01HX4Z9K2P",
      "name": "Priya Sharma",
      "email": "priya@example.com",
      "role": "member",
      "status": "active",
      "created_at": "2024-03-15T10:22:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 84,
    "total_pages": 9
  }
}
```

---

## GET /users/:id

Returns a single user by ID.

**Endpoint**

```
GET https://api.example.com/v1/users/:id
```

**Path Parameters**

| Parameter | Type | Description |
|---|---|---|
| `id` | string | The unique user ID (prefix `usr_`). |

**Response — 200 OK**

```json
{
  "id": "usr_01HX4Z9K2P",
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "role": "member",
  "status": "active",
  "created_at": "2024-03-15T10:22:00Z",
  "last_login": "2024-06-01T08:45:00Z"
}
```

---

## PATCH /users/:id

Updates a user's role or status.

**Request Body**

| Field | Type | Required | Description |
|---|---|---|---|
| `role` | string | No | New role: `admin`, `member`, or `viewer`. |
| `status` | string | No | New status: `active` or `inactive`. |

**Example**

```json
{
  "role": "admin"
}
```

**Response — 200 OK** — Returns the updated user object.

---

## Error Responses

| Status | Code | Description |
|---|---|---|
| `401` | `UNAUTHORIZED` | Missing or invalid access token. |
| `403` | `FORBIDDEN` | Caller does not have permission to manage users. |
| `404` | `USER_NOT_FOUND` | No user exists with the given ID. |
| `422` | `INVALID_ROLE` | The specified role is not valid. |
