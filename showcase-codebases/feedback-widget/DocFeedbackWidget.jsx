import React, { useState } from 'react';

/**
 * DocFeedbackWidget
 *
 * Embeds a thumbs up/down feedback collector on any documentation page.
 * Records page URL, feedback sentiment, optional comment, and timestamp.
 * Sends results to a configurable endpoint or falls back to console logging.
 *
 * Usage:
 *   <DocFeedbackWidget pageId="api/webhooks" endpoint="/api/feedback" />
 *
 * Props:
 *   pageId    {string}  Identifier for the page (e.g. doc slug or URL path)
 *   endpoint  {string}  Optional POST endpoint to receive feedback payload
 *   question  {string}  Optional override for the feedback prompt text
 */

const DEFAULT_QUESTION = 'Was this page helpful?';

const styles = {
  container: {
    borderTop: '1px solid #e2e8f0',
    marginTop: '3rem',
    paddingTop: '1.5rem',
    fontFamily: 'inherit',
  },
  question: {
    fontSize: '0.95rem',
    color: '#4a5568',
    marginBottom: '0.75rem',
    fontWeight: 500,
  },
  buttonRow: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  button: {
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    background: '#fff',
    cursor: 'pointer',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    transition: 'all 0.15s',
  },
  buttonActive: {
    background: '#ebf8ff',
    borderColor: '#3b82f6',
    color: '#2b6cb0',
    fontWeight: 600,
  },
  commentBox: {
    width: '100%',
    maxWidth: '480px',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    fontSize: '0.875rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    marginBottom: '0.5rem',
    boxSizing: 'border-box',
  },
  submitButton: {
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    border: 'none',
    background: '#3b82f6',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  thanks: {
    fontSize: '0.9rem',
    color: '#2f855a',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },
  commentPrompt: {
    fontSize: '0.85rem',
    color: '#718096',
    marginBottom: '0.5rem',
  },
};

export default function DocFeedbackWidget({
  pageId,
  endpoint,
  question = DEFAULT_QUESTION,
}) {
  const [sentiment, setSentiment] = useState(null); // 'yes' | 'no'
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSentiment = (value) => {
    setSentiment(value);
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    const payload = {
      pageId: pageId || (typeof window !== 'undefined' ? window.location.pathname : ''),
      sentiment,
      comment: comment.trim() || null,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    };

    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        // Fail silently — don't interrupt the user's reading experience
        console.warn('[DocFeedbackWidget] Failed to send feedback:', err);
      }
    } else {
      // No endpoint configured — log locally for development
      console.log('[DocFeedbackWidget] Feedback payload:', payload);
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div style={styles.container}>
        <p style={styles.thanks}>
          ✓ Thanks for the feedback — it helps improve this page.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container} role="region" aria-label="Page feedback">
      <p style={styles.question}>{question}</p>

      <div style={styles.buttonRow}>
        <button
          style={{
            ...styles.button,
            ...(sentiment === 'yes' ? styles.buttonActive : {}),
          }}
          onClick={() => handleSentiment('yes')}
          aria-pressed={sentiment === 'yes'}
          aria-label="Yes, this page was helpful"
        >
          👍 Yes
        </button>
        <button
          style={{
            ...styles.button,
            ...(sentiment === 'no' ? styles.buttonActive : {}),
          }}
          onClick={() => handleSentiment('no')}
          aria-pressed={sentiment === 'no'}
          aria-label="No, this page was not helpful"
        >
          👎 No
        </button>
      </div>

      {sentiment && (
        <>
          <p style={styles.commentPrompt}>
            {sentiment === 'yes'
              ? 'Glad to hear it. Anything we could improve?'
              : 'Sorry about that. What was missing or unclear?'}
          </p>
          <textarea
            style={styles.commentBox}
            rows={3}
            placeholder="Optional — your comment helps us prioritise fixes"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            aria-label="Optional feedback comment"
          />
          <br />
          <button
            style={{
              ...styles.submitButton,
              opacity: submitting ? 0.7 : 1,
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Sending…' : 'Submit feedback'}
          </button>
        </>
      )}
    </div>
  );
}
