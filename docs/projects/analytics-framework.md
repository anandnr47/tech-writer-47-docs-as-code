---
id: analytics-framework
title: Documentation Analytics Framework
---

# Documentation Analytics Framework

A standardized framework for measuring whether documentation actually works — and a systematic process for improving it based on data, not guesswork.

---

## The Problem

Most documentation teams don't know if their content helps users. Pages get written, published, and left alone. When something is wrong, the signal arrives late — as a support ticket, a complaint, or a user giving up.

This framework closes that loop. It connects user behavior data to content decisions, so improvements are targeted, measurable, and repeatable.

---

## Core Metrics

Four metrics form the foundation. Together they answer: did the user get what they came for?

### 1. Self-Service Success Rate
**What it measures:** Percentage of users who resolved their question without raising a support ticket.

A high self-service rate means the documentation is working. A low rate means users are reading the docs and still not finding answers — and then creating work for support teams.

**Target:** >52%

---

### 2. Task Completion Rate
**What it measures:** Whether users completed their intended task after visiting a page.

This is the most direct measure of documentation effectiveness. Low task completion points to specific failure modes:
- Missing information
- Lack of clarity
- Navigational or structural issues

**Target:** >71%

---

### 3. Content Effectiveness Score
**What it measures:** User feedback on whether the content was helpful — collected via thumbs up/down and open-text comments.

Comments are particularly valuable: they identify *why* a page isn't working, not just *that* it isn't.

**Target:** >60%

---

### 4. Visits
**What it measures:** How many users are reaching each page.

On its own, visits don't tell you much. But combined with the other metrics, traffic volume determines priority: a page with low task completion and high traffic is a high-impact fix. A page with low task completion and almost no traffic is a low-priority fix.

---

## The Analysis Loop

Every improvement cycle asks five questions in order:

**1. Why do users come?**
Check top user intents from the task completion dashboard. What are users trying to accomplish?

**2. Did they succeed?**
Check intent-wise success rates. Where are users failing most?

**3. Why did they fail?**
Review open-text feedback and failure categories:
- Missing information — the answer isn't there
- Lack of clarity — the answer is there but not understood
- Confusing content — the structure or navigation is the problem

**4. How did they feel?**
Check thumbs up/down ratios. Useful for tracking sentiment trends over time.

**5. What to fix first?**
Prioritize by combining traffic and outcome data:

| Traffic | Task Completion | Priority | Diagnosis |
|---|---|---|---|
| High | Low | **Fix first** | High impact, clear problem |
| High | High | Monitor | Working well, maintain quality |
| Low | Low | Fix later | Real problem, limited reach |
| Low | High | Low priority | Fine, few users affected |

---

## Implementation

| | |
|---|---|
| **Owner** | Documentation owner for the relevant product area |
| **Target** | Address at least 75% of identified issues per month |
| **Cycle** | Issues identified in month N are addressed in month N+1 |

**Process:**
1. Identify issues from dashboards
2. Create documentation improvement tasks
3. Implement content updates
4. Measure before vs. after impact — if metrics improve, close the task

---

## Reporting

**Monthly**
- Top failing user intents
- Emerging feedback themes
- Self-service trends

**Quarterly**
- Impact of content improvements (before vs. after)
- Strategic content gaps

---

## Documentation Quality Score

An optional composite score for benchmarking content quality across a documentation set:

```
Score (out of 10) =
  (Visits / 1000 × 10%) +
  (Self-service rate × 60%) +
  (Task completion rate × 30%)
```

Self-service rate carries the highest weight (60%) because it's the most direct measure of whether documentation is reducing user effort. Visits are weighted low — traffic without outcomes is noise.

---

## Why This Matters

Documentation is often treated as a cost center. This framework turns it into something measurable: a function that either reduces support load and improves user outcomes, or doesn't — and now you can tell the difference.

It also gives documentation teams a language that resonates with product and business stakeholders: not "we wrote 40 topics this quarter" but "self-service rates improved by 8 points after we rewrote the top 10 failing topics."
