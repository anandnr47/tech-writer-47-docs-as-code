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
