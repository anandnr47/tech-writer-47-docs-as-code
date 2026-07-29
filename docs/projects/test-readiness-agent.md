---
id: test-readiness-agent
title: Test Readiness Agent
---

# Test Readiness Agent

## Overview

The Test Readiness Agent automates the process of updating documentation test readiness status in response to requests from product managers.

**How it works:**
1. A PM emails a writer asking to update the test readiness status of one or more documentation deliverables
2. The writer forwards the email to a shared team mailbox
3. The agent reads the mailbox, parses the email, identifies the target deliverables and requested status, and updates the documentation system
4. The agent sends a notification to the writer confirming what changed, or flagging anything it couldn't resolve

**Problem it solves:**

In large documentation teams, PMs email individual writers with status update requests before each release cycle. With many writers, many deliverables, and overlapping release timelines, these requests create noise, get missed, or require writers to context-switch from active work to perform administrative updates. The agent eliminates this entirely.

---

## Platform Support

| Feature | Local desktop mode | Headless / Graph API mode |
|---|---|---|
| Inline email (`--email`) | Yes | Yes |
| Email from file (`--email-file`) | Yes | Yes |
| Shared inbox (`--from-inbox`) | Yes, mail client must be open | Yes, works headlessly, no mail client needed |
| Scheduled runs | No | Yes |
| Mac support | No | Yes |
| Additional setup | None | OAuth credentials in `.env` |

The agent automatically selects the mode based on `.env` configuration:
- **OAuth credentials present** → uses Graph API (headless, schedulable, cross-platform)
- **OAuth credentials absent** → falls back to local mail client (Windows only, client must be open)

---

## Prerequisites

- Python 3.12
- Required packages: `anthropic`, `requests` (plus `pywin32` on Windows for local mail client mode)
- VPN access to reach the documentation system API
- An LLM proxy running locally (the agent sends emails to the LLM for parsing)
- A shared team mailbox for receiving forwarded PM emails

---

## How to Run

### Option 1 — Paste the email inline

```bash
python agent.py --cycle 2602 --email "Hi, please update J45 and 2TX to ready for testing for DE and US."
```

Best for quick one-off updates.

### Option 2 — Read the email from a file

Save the PM email as `email.txt` in the agent folder, then:

```bash
python agent.py --cycle 2602 --email-file email.txt
```

Recommended for long emails with many deliverables.

### Option 3 — Read automatically from the shared mailbox

```bash
python agent.py --cycle 2602 --from-inbox
```

Requires OAuth credentials in `.env`. The agent prints confirmation of which mode it's using:
- `[Inbox] Using Graph API (headless mode)`
- `[Inbox] Using local mail client (desktop mode)`

### Option 4 — Interactive prompt

Omit `--cycle` and the agent prompts you:

```
python agent.py --email-file email.txt
Enter release cycle (e.g. 2602): 2602
```

> The `--cycle` value maps to a specific release cycle field in the documentation system. Change this value for each new cycle.

---

## How Emails Are Filtered from the Inbox

When running with `--from-inbox`, the agent applies two filters before processing:

1. **Must be unread** — emails already marked as read are ignored
2. **Must contain a known deliverable code** — the agent checks whether any known scope item codes appear in the subject or body (case-insensitive)

| Email subject | Processed? | Reason |
|---|---|---|
| `FW: change J45 to ready for testing for DE` | Yes | Contains known code `J45` |
| `Please update 2TX and J45 for DE and US` | Yes | Contains `J45` and `2TX` |
| `please update j45 for de` | Yes | Case-insensitive match |
| `Please update the documentation` | No | No deliverable code found |
| `Re: meeting notes` | No | No deliverable code found |

**Important:** If a deliverable code is not in the mapping file, emails about it are silently skipped. Always add new codes to the mapping file before forwarding PM emails.

---

## Deliverable Code Mapping

The agent uses a `scope_items.json` file that maps the short codes PMs use in emails to the actual filenames in the documentation system.

```json
{
  "J45": "obm1702805947428.ditamap",
  "2TX": "dna1702805874201.ditamap"
}
```

**Automatic discovery:** A discovery script traverses the documentation system and populates the mapping file automatically. Run it at the start of each release cycle to pick up new deliverables.

```bash
python discover_scope_items.py          # update the mapping file
python discover_scope_items.py --dry-run  # preview without saving
```

**Manual addition:** If the script misses a deliverable, look up its filename in the documentation system and add it manually.

If a code is not in the mapping, the agent reports it as unknown and skips it. It never guesses.

---

## Status Mapping

The agent maps natural language from PM emails to exact status values in the documentation system. If the PM's wording cannot be confidently matched, the agent **does not guess**. It flags the request as ambiguous, skips the update, and logs the exact phrase so the writer can follow up with the PM.

Example mappings:

| PM says | Agent maps to |
|---|---|
| "ready for testing" | `ready for testing` |
| "out of scope" | `out of scope` |
| "structure complete" | `process structure complete` |
| "fiori delayed" | `fiori development delayed` |

---

## What the Agent Updates — and What It Leaves Alone

- **Updates:** Only the status field for the specified release cycle and the countries mentioned in the email
- **Does not touch:** Any other fields, other release cycles, or countries not mentioned in the email
- **All countries:** If no countries are specified, all countries in the deliverable are updated
- **Skips:** Deliverables already at the target status (no unnecessary writes)

---

## Run Logs

After each run, a summary is saved to a local `logs/` folder:

```
logs/run_20260601_143000.md
```

Each log includes:
- The original email
- A table of what changed (deliverable, old status, new status)
- Any warnings or skipped items

> Logs are stored locally on the machine that ran the agent. A planned enhancement will send a summary email to the team after every run, so all writers are notified regardless of which machine processed the emails.

---

## APIs Used

### Documentation System REST API

| Endpoint | Method | Purpose |
|---|---|---|
| `/login` | POST | Authenticate and obtain a session token |
| `/topics/{filename}` | GET | Fetch deliverable XML content and version hash |
| `/topics/{filename}` | PUT | Write updated XML back to the system |
| `/document_lock` | POST | Lock document before editing (non-fatal if fails) |
| `/document_unlock` | POST | Unlock document after editing |
| `/documents` | GET | Fetch raw document XML (used by discovery script) |

### Microsoft Graph API (headless inbox mode)

| Endpoint | Method | Purpose |
|---|---|---|
| `/users/{mailbox}/mailFolders/inbox/messages` | GET | Fetch unread emails from shared mailbox |
| `/users/{mailbox}/messages/{id}` | PATCH | Mark email as read after processing |
| `/users/{mailbox}/messages/{id}/move` | POST | Move processed email to archive folder |

### LLM Proxy

| Endpoint | Method | Purpose |
|---|---|---|
| `localhost:{port}/v1/messages` | POST | Send email content to LLM for parsing and decision-making |

---

## Human Review

| Action | Review required? |
|---|---|
| Status update in documentation system | No, executed automatically |
| Notification sent to writer | No, sent automatically |
| Ambiguous status request | Yes, writer follows up with PM |
| Unrecognised deliverable code | Yes, writer adds code to mapping file |
| Wrong deliverable updated | Yes, correct manually and improve PM email format |

Review the confirmation notification for every run. If the agent updated the wrong deliverable or applied an incorrect status, correct it manually in the documentation system.

---

## Troubleshooting

| Error | Cause | Fix |
|---|---|---|
| `API key not set` | `.env` file missing or key not filled in | Check `.env` exists and has a valid key |
| `401 Wrong username or password` | Documentation system credentials incorrect | Verify credentials in `.env` |
| `Network error: offline` | LLM proxy not running or VPN disconnected | Start the LLM proxy and connect to VPN |
| `Deliverable X not found in mapping` | Missing entry in `scope_items.json` | Add the filename for that deliverable and re-run |
| `500 Internal Server Error` on update | XML or version hash mismatch | Re-run — the agent fetches a fresh hash each time |
| Lock failed (non-fatal) | Known API limitation for the technical user | Safe to ignore — the update still applies |
| `Could not connect to mail client` | Mail client is closed | Open the mail client, or configure Graph API credentials |
| `Graph API 403 Access Denied` | Admin consent not yet granted | Raise an IT ticket to grant `Mail.Read` consent |
| `Graph API token error` | Invalid OAuth credentials in `.env` | Verify `CLIENT_ID`, `TENANT_ID`, `CLIENT_SECRET` |

---

## Known Limitations

| Limitation | Detail |
|---|---|
| **Branch scope** | The agent updates the development branch only. Changes must be manually promoted to release branches via the documentation system UI. |
| **Document locking** | Lock/unlock API calls may fail for the technical user. Updates still apply, but there is a small risk of conflict if two instances run simultaneously against the same deliverable. |
| **One release cycle per run** | Each run targets one cycle. Re-run with a different `--cycle` value to update a different cycle. |
| **VPN required** | The documentation system API is not reachable without VPN. |
| **LLM proxy must be running** | The agent requires a locally running LLM proxy. |
| **Mail client must be open (desktop mode only)** | When using local mail client fallback, the client must be open. Configure Graph API credentials to avoid this. |
| **No scheduled polling yet** | The agent must be triggered manually. With Graph API configured, scheduled polling (e.g. via Windows Task Scheduler) is possible and planned. |
| **Race condition with multiple machines** | If multiple team members run the agent simultaneously against the same shared mailbox, two machines may pick up the same email. The documentation system's hash-based optimistic locking prevents corrupt writes, but an update could be missed and would need re-running. **Recommended approach:** Run the agent on one designated machine. Writers forward emails and receive notifications — they don't need to run the agent themselves. |

---

## Related

- [AI Writing Agents](/projects/ai-agents) — overview of all agents in the documentation toolset
- [AI Agent Documentation Template](/projects/ai-agent-doc-template) — the template used to structure this page
