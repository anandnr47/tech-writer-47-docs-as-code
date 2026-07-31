---
id: feedback-widget
title: Doc Feedback Widget
---

# Doc Feedback Widget

A React component that adds a thumbs up/down feedback collector to documentation pages. It captures user sentiment and optional comments, then sends a structured payload to any backend endpoint.

This is the data collection layer for the [Documentation Analytics Framework](/projects/analytics-framework). The widget feeds directly into the metrics that framework tracks: content effectiveness score, failure reason analysis, and the prioritisation matrix.

**[View source on GitHub](https://github.com/anandnr47/tech-writer-47-docs-as-code/tree/main/showcase-codebases/feedback-widget)**

---

## The Problem

Most documentation teams don't know which pages are helping users and which aren't — unless a support ticket arrives. Feedback widgets exist in products like Pendo and Gainsight, but they're expensive, require integration work, and tie your data to a third-party platform.

This component is a self-contained alternative: drop it into any React-based doc site, point it at an endpoint, and start collecting page-level sentiment data.

---

## How It Works

The widget renders at the bottom of a doc page. When a user clicks thumbs up or thumbs down, a follow-up prompt appears — "Anything we could improve?" for positive feedback, "What was missing or unclear?" for negative. The user can optionally add a comment, then submit.

On submission, the component sends a JSON payload:

```json
{
  "pageId": "api/webhooks",
  "sentiment": "no",
  "comment": "The retry section doesn't explain what happens after the webhook is auto-disabled",
  "timestamp": "2025-06-01T10:22:00.000Z"
}
```

If no endpoint is configured, the payload is logged to the console for development use.

---

## Usage

```jsx
import DocFeedbackWidget from './DocFeedbackWidget';

// Basic — logs to console
<DocFeedbackWidget pageId="api/webhooks" />

// With an endpoint
<DocFeedbackWidget
  pageId="api/webhooks"
  endpoint="https://yourapp.com/api/feedback"
/>

// Custom prompt
<DocFeedbackWidget
  pageId="tutorials/getting-started"
  endpoint="https://yourapp.com/api/feedback"
  question="Did this guide help you get set up?"
/>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `pageId` | string | Current URL path | Identifier for the page being rated |
| `endpoint` | string | None | POST endpoint to receive the payload |
| `question` | string | "Was this page helpful?" | Override the feedback prompt |

---

## Design Decisions

**Fails silently.** If the endpoint is unreachable, the widget still shows the confirmation. A broken feedback widget should never interrupt reading.

**No external dependencies.** Only React and inline styles. Works in Docusaurus, Nextra, or any React-based docs framework without any additional setup.

**Context-aware comment prompt.** Positive feedback gets "Anything we could improve?" Negative feedback gets "What was missing or unclear?" The framing produces more actionable responses than a generic comment box.

**Accessible.** Buttons use `aria-pressed` to communicate state. The widget has a `role="region"` with an accessible label. The comment textarea has an `aria-label`.

---

## Connection to the Analytics Framework

This widget is the practical implementation of what the [analytics framework](/projects/analytics-framework) describes. The framework defines:

- **Content Effectiveness Score** — aggregated thumbs up/down ratios per page
- **Failure reason analysis** — open-text comments categorised by issue type (missing info, unclear, structural)
- **Prioritisation** — high-traffic pages with low scores get fixed first

Without a feedback collection mechanism, the framework is theory. This widget is what makes it operational.

---

## Source

The full source — component code and README — is in the repo:

**[showcase-codebases/feedback-widget](https://github.com/anandnr47/tech-writer-47-docs-as-code/tree/main/showcase-codebases/feedback-widget)**
