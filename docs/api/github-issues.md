---
id: github-issues
title: GitHub Issues API
---

# GitHub Issues API

Manage issues in a GitHub repository. All requests require:

```
Accept: application/vnd.github+json
Authorization: Bearer YOUR_TOKEN
X-GitHub-Api-Version: 2022-11-28
```

**Base URL:** `https://api.github.com`

---

## List Issues

```
GET /repos/{owner}/{repo}/issues
```

**Query Parameters**

| Parameter | Default | Description |
|---|---|---|
| `state` | `open` | `open`, `closed`, or `all` |
| `labels` | — | Comma-separated label names |
| `per_page` | `30` | Max `100` |
| `page` | `1` | Page number |

**Example**

```bash
curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/octocat/hello-world/issues?state=open"
```

**Response — 200 OK**

```json
[
  {
    "number": 42,
    "title": "Add dark mode support",
    "state": "open",
    "user": { "login": "octocat" },
    "labels": [{ "name": "enhancement" }],
    "created_at": "2024-05-10T14:22:00Z"
  }
]
```

> Pull requests appear in this endpoint too. Filter them out by checking that `pull_request` is absent from the object.

---

## Create an Issue

```
POST /repos/{owner}/{repo}/issues
```

**Request Body**

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Issue title |
| `body` | No | Markdown-supported description |
| `labels` | No | Array of label names |
| `assignees` | No | Array of GitHub usernames |

**Example**

```bash
curl -L -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/octocat/hello-world/issues" \
  -d '{"title": "Add dark mode support", "labels": ["enhancement"]}'
```

Returns `201 Created` with the new issue object.

---

## Update an Issue

```
PATCH /repos/{owner}/{repo}/issues/{issue_number}
```

Send only the fields you want to change. To close an issue:

```bash
curl -L -X PATCH \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/octocat/hello-world/issues/42" \
  -d '{"state": "closed"}'
```

---

## Error Responses

| Status | Meaning |
|---|---|
| `401` | Token missing or invalid |
| `403` | Insufficient permissions |
| `404` | Repo or issue not found |
| `410` | Issues disabled for this repo |
| `422` | Validation failed (e.g., invalid assignee) |

---

Reference: [GitHub REST API — Issues](https://docs.github.com/en/rest/issues)
