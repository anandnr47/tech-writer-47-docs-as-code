---
id: test-readiness-agent
title: Test Readiness Agent
---

# Test Readiness Agent

## Overview

The Test Readiness Agent automates the process of updating documentation test readiness status in response to requests from product managers. It reads a shared mailbox, identifies which documentation needs updating and what the target status should be, performs the update, and notifies the relevant writer — all without manual intervention.

**Problem it solves:**

In large documentation teams, product managers email individual writers to request test readiness status updates before each release cycle. With many writers, many products, and overlapping timelines, these requests create noise, get missed, or require writers to context-switch from active work to handle administrative updates.

**Typical use cases:**
- Updating test readiness status ahead of a product release
- Batch status updates across multiple documentation deliverables
- Audit trail for status changes across the team

**Who uses it:** Documentation writers and their managers; product managers who initiate the requests.

---

## Before You Begin

| Requirement | Details |
|---|---|
| Shared mailbox | A team mailbox that PM emails are forwarded to |
| Writer access | Each writer must be registered with their email and associated deliverables |
| Permissions | Agent requires read access to the mailbox and write access to the documentation system |
| PM instructions | PMs must include the deliverable name and target status in their email |

Writers forward PM emails to the shared mailbox — no other setup is required on the writer side.

---

## Capabilities

| Capability | Description |
|---|---|
| Read | Reads incoming emails from the shared mailbox |
| Parse | Extracts the target documentation and requested status from the email |
| Identify | Matches the request to the correct documentation deliverable |
| Update | Updates the test readiness status in the documentation system |
| Notify | Sends a confirmation email to the relevant writer |
| Escalate | Flags ambiguous or unresolvable requests and includes them in the notification |

---

## Limitations

- **Email format dependency:** The agent parses natural language from PM emails. Highly ambiguous or incomplete emails may not be parsed correctly.
- **One deliverable per email:** Emails requesting updates across many unrelated deliverables in a single message may result in partial processing.
- **No real-time access:** The agent processes the mailbox on a scheduled interval, not instantly on receipt.
- **Scope:** The agent updates test readiness status only. It does not modify content, publish documentation, or communicate directly with PMs.
- **Manual review required for:** Any request flagged as ambiguous, any status that is not a recognised value in the documentation system.

---

## How to Use the Agent

### Goal: Update test readiness status for a documentation deliverable

**Step 1 — Receive a PM request**

A product manager sends you an email asking to update the test readiness status of a deliverable. Example:

> *"Hi, can you update the test readiness status for the Supplier Onboarding Guide to Ready for Testing? We're targeting the release branch on Friday."*

**Step 2 — Forward the email**

Forward the email as-is to the shared team mailbox (e.g., `docs-status-updates@yourorg.com`). No additional text is needed.

**Step 3 — Agent processes the request**

The agent reads the mailbox, identifies:
- Which deliverable is referenced
- What the target status is

It then updates the status in the documentation system.

**Step 4 — You receive a notification**

You receive a confirmation email with:
- The deliverable that was updated
- The old status and new status
- A timestamp

If the agent could not resolve the request, the notification includes the reason and what you need to clarify with your PM.

---

## What the Agent Detects

The agent parses the following from forwarded emails:

| Element | Examples |
|---|---|
| Deliverable name | "Supplier Onboarding Guide", "Invoice Processing Help" |
| Target status | "Ready for Testing", "In Review", "Approved", "Not Started" |
| Urgency signals | Dates, release references (used for prioritisation only) |

---

## Human Review

| Action | Review required? |
|---|---|
| Status update in documentation system | No — executed automatically |
| Notification sent to writer | No — sent automatically |
| Ambiguous request flagged | Yes — writer resolves with PM |
| Unrecognised deliverable name | Yes — writer confirms correct deliverable |
| Unrecognised status value | Yes — writer confirms valid status |

Review the confirmation notification for every update. If the agent updated the wrong deliverable or applied an incorrect status, correct it manually and note the discrepancy so the PM email format can be improved.

---

## Troubleshooting

| Issue | Likely cause | What to do |
|---|---|---|
| No confirmation email received | Email was not forwarded correctly, or agent hasn't processed the batch yet | Check the shared mailbox to confirm the forward arrived; allow time for the next processing cycle |
| Wrong deliverable updated | Deliverable name in the PM email was ambiguous or matched multiple items | Correct the status manually; reply to the PM to clarify naming for future requests |
| Status not recognised | PM used a non-standard status name | Correct manually; share the list of valid status values with your PM |
| Flagged as ambiguous | Email lacked sufficient information | Follow up with the PM for clarification, then re-forward |
| Multiple deliverables in one email | Agent may process partially | Forward as separate emails, one per deliverable |

---

## Privacy and Security

- **Data processed:** Email content (sender, subject, body) and documentation metadata (deliverable ID, current status)
- **Data stored:** A log of status changes is retained for audit purposes
- **Data shared:** No email content is shared externally; updates are made within the internal documentation system only
- **Access control:** Only emails forwarded to the designated shared mailbox are processed; the agent does not have access to individual writer inboxes
- **Compliance:** Status change logs are available to documentation managers for review

---

## Example Notification Email

```
Subject: [Test Readiness Agent] Status updated — Supplier Onboarding Guide

The following update was made:

  Deliverable:   Supplier Onboarding Guide
  Previous status: In Progress
  New status:    Ready for Testing
  Updated at:    2025-06-10 14:32 UTC

No action required.

---
If this update is incorrect, please correct it manually in the documentation system 
and contact your PM to clarify the request format for future updates.
```

---

## Related

- [AI Writing Agents](/projects/ai-agents) — overview of all agents in the documentation toolset
- [AI Agent Documentation Template](/projects/ai-agent-doc-template) — the template used to write this page
