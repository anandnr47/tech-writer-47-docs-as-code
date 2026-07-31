# DocFeedbackWidget

A React component that adds a thumbs up/down feedback collector to any documentation page. Built to close the loop between user sentiment and content improvement decisions.

---

## What It Does

When placed at the bottom of a documentation page, the widget:

1. Asks "Was this page helpful?" with a thumbs up / thumbs down prompt
2. On selection, reveals a follow-up comment box with a context-aware prompt
3. On submission, sends a structured payload to a configurable endpoint
4. Displays a confirmation message and removes itself from the flow

If no endpoint is configured, the payload is logged to the console — useful during development.

---

## Payload Structure

```json
{
  "pageId": "api/webhooks",
  "sentiment": "no",
  "comment": "The retry behaviour section doesn't explain what happens to the webhook if it's auto-disabled",
  "timestamp": "2025-06-01T10:22:00.000Z",
  "userAgent": "Mozilla/5.0 ..."
}
```

| Field | Description |
|---|---|
| `pageId` | The doc page identifier passed as a prop, or the current URL path as fallback |
| `sentiment` | `"yes"` or `"no"` |
| `comment` | Optional free-text comment, `null` if not provided |
| `timestamp` | ISO 8601 timestamp of when the feedback was submitted |
| `userAgent` | Browser user agent string for device/platform breakdown |

---

## Usage

### Basic

```jsx
import DocFeedbackWidget from './DocFeedbackWidget';

export default function MyDocPage() {
  return (
    <article>
      {/* page content */}
      <DocFeedbackWidget pageId="api/webhooks" />
    </article>
  );
}
```

### With an endpoint

```jsx
<DocFeedbackWidget
  pageId="api/webhooks"
  endpoint="https://yourapp.com/api/feedback"
/>
```

### With a custom prompt

```jsx
<DocFeedbackWidget
  pageId="tutorials/getting-started"
  endpoint="https://yourapp.com/api/feedback"
  question="Did this guide help you get set up?"
/>
```

---

## Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `pageId` | string | No | Current URL path | Identifier for the page being rated |
| `endpoint` | string | No | None | POST endpoint to receive the feedback payload |
| `question` | string | No | "Was this page helpful?" | Override the feedback prompt text |

---

## Backend Integration

The component sends a `POST` request with `Content-Type: application/json`. Any backend that accepts JSON can receive it.

**Example Express.js handler:**

```js
app.post('/api/feedback', (req, res) => {
  const { pageId, sentiment, comment, timestamp } = req.body;

  // Store in your analytics database, spreadsheet, or logging service
  console.log(`[${timestamp}] ${pageId}: ${sentiment}`, comment || '');

  res.status(200).json({ ok: true });
});
```

**Example storage options:**
- Google Sheets via Apps Script
- Airtable API
- Any analytics pipeline (Segment, Amplitude, custom)
- Simple append to a JSON log file

---

## Design Decisions

**Fail silently on network errors.** If the endpoint is unreachable, the widget still shows the confirmation message. A broken feedback widget should never interrupt a user's reading experience.

**No external dependencies.** The component uses only React and inline styles — no CSS modules, no third-party libraries. Drop it into any React-based docs framework (Docusaurus, Nextra, custom).

**Accessibility.** Buttons use `aria-pressed` to communicate state to screen readers. The widget is wrapped in a labelled `role="region"`. The comment textarea has an `aria-label`.

**Comment prompt is context-aware.** Users who click thumbs up see "Anything we could improve?" Users who click thumbs down see "What was missing or unclear?" This framing gets more useful feedback than a generic "Leave a comment" prompt.

---

## Connection to Analytics Framework

This widget is the data collection layer for the [Documentation Analytics Framework](https://anandnr47.github.io/tech-writer-47-docs-as-code/projects/analytics-framework). The sentiment and comment data it collects feeds directly into:

- **Content Effectiveness Score** — aggregated thumbs up/down ratios
- **Failure reason analysis** — open-text comments categorised by issue type
- **Prioritisation matrix** — high-traffic pages with low helpfulness scores get fixed first

Building the collection mechanism alongside the analytical framework closes the loop from measurement to action.
