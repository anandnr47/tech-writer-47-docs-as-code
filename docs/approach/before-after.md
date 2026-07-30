---
id: before-after
title: Before and After
---

# Before and After

One of the harder things to show in a portfolio is editing judgment — knowing not just how to write, but what's wrong with existing content and why. This page shows two rewrites with notes on the decisions behind them.

---

## Example 1: API Getting Started Guide

This is the original "Getting Started" page from this portfolio before it was rewritten.

### Before

```
# Getting Started

Follow this guide to understand how to authenticate and start using our API.
```

That's the entire page. One heading, one sentence, no content.

### After

The rewritten page covers:
- Prerequisites (what you need before you start)
- Step 1: Get your API credentials (where, how, security note)
- Step 2: Authenticate (curl example, sample response)
- Step 3: Make your first API call (real endpoint, annotated response)
- Step 4: Handle token expiry (the thing most guides skip)
- Next steps (links to what comes after)

[Read the rewritten page →](/tutorials/getting-started)

### What changed and why

**The original assumed motivation.** "Follow this guide to understand how to authenticate" tells you what the guide is for, not what you'll be able to do when you're done. Users don't want to understand authentication — they want to make a working API call. The rewrite leads with that goal.

**The original had no content.** A heading and one sentence is a placeholder, not a document. Real onboarding guides answer questions in order: what do I need, how do I authenticate, how do I make a call, what do I do when the token expires.

**The original skipped the hard part.** Token expiry is where most developers hit their first error in production. It's easy to omit because it's not part of the happy path. That's exactly why it belongs in a getting started guide.

---

## Example 2: API Reference Entry

### Before

```
# POST /api/v1/login

Authenticate users and return a token.

## Request
{
  "email": "user@example.com",
  "password": "secret"
}
```

### After

The rewritten page covers:
- Endpoint URL and required headers
- Request body with field types, whether each is required, and what each field means
- A realistic request example
- Response body with field-by-field explanation
- All error responses with status codes, error codes, and what each means
- A worked error example
- Notes on token lifecycle and edge cases

[Read the rewritten page →](/api/login)

### What changed and why

**The original only showed the happy path.** Showing the request body without showing the response is like a recipe that lists the ingredients but not the dish. A developer integrating this endpoint needs to know what they get back, not just what they send.

**The original had no error documentation.** Error handling is where integrations break. A 401 that says "wrong credentials" and a 401 that says "account locked" need different handling in code. If the documentation doesn't distinguish them, developers have to figure it out from production errors.

**The original used "secret" as a password example.** Small thing, but example values matter. Using realistic examples (`mySecurePassword`) and realistic email addresses sets a better mental model than placeholder values that look like they belong in a tutorial from 2008.

**The original had no field descriptions.** `"email"` is self-explanatory. `"password"` less so — minimum length? Special characters allowed? These questions come up in every integration and belong in the docs.

---

## What These Examples Show

Good documentation isn't about making things longer. Both rewrites are longer than the originals, but that's because the originals were missing information users need, not because more words are better.

The question I ask when editing is: what will the user try to do with this, and does this page help them do it? If the answer is no, the page needs work regardless of how polished the prose is.

---

## Example 3: From Raw Engineer Notes to Documentation

This example shows a different part of the process — starting from raw notes rather than an existing doc.

### The Input

These are the kind of notes a developer might hand over before a documentation interview or review session:

```
webhook system
- registers endpoints
- sends POST on events
- events: user.created, user.updated, invoice.paid etc
- payload has id, type, created_at, data.object
- signature verification - HMAC-SHA256, header X-Webhook-Signature
- retries: 5 times, exponential backoff (1min, 5min, 30min, 2hr)
- endpoint must return 200 in 10s or counted as failed
- idempotency important, use event id
- logs kept 30 days
- auto-disable if >50% failure in 24hr
```

This is fairly detailed for raw notes. More often you get half this much, and you fill gaps in a follow-up interview.

### What I Do With It

Before writing anything, I work out what the reader needs that isn't in these notes:

- **How do I register a webhook?** Notes say the system "registers endpoints" but no API call.
- **What does the full payload look like?** Notes list fields but no example.
- **How do I verify signatures in practice?** Notes mention HMAC-SHA256 but no code.
- **What happens to my webhook if it keeps failing?** Notes mention auto-disable but no user-facing detail.
- **How do I handle receiving the same event twice?** Notes mention idempotency but not how.

These gaps come from an interview or follow-up Slack message. The engineer knows the answers — they just didn't think to write them down because they're obvious to someone who built the system.

### After

The output is the [Webhooks](/api/webhooks) page in this portfolio — a full API reference page covering registration, payload structure, event types, signature verification with code, retry behaviour, duplicate handling, and best practices.

### What Changed and Why

**Structure came from user goals, not the notes.**
The notes are organised by implementation detail. The documentation is organised by what a developer needs to do: register a webhook, understand the payload, verify signatures, handle failures. These are different orderings of the same information.

**The gaps were as important as what was there.**
Signature verification is one sentence in the notes. It's a full section with a code example in the docs, because this is the step developers most commonly skip and then wonder why their integration is insecure.

**Retry behaviour needed user-facing framing.**
"Exponential backoff (1min, 5min, 30min, 2hr)" is implementation detail. What a developer actually needs to know is: how long do I have to fix my endpoint before a delivery is abandoned? The docs answer that question, not the underlying mechanism.

**Best practices came from the gaps.**
Nothing in the notes says "respond quickly and process asynchronously." That best practice came from knowing that the most common webhook integration mistake is doing expensive processing synchronously, causing timeouts. The engineer didn't write it down because it's second nature to them. It's not second nature to a developer integrating webhooks for the first time.
