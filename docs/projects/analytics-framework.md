---
id: analytics-framework
title: Documentation Analytics Framework
---

# Documentation Analytics Framework

Most documentation teams publish content and move on. Whether it actually helped users is anyone's guess until a support ticket arrives, or a user complains, or someone notices a page hasn't been updated in two years.

I built this framework to close that gap. Connect user behaviour data to content decisions, measure what's working, and prioritise fixes based on impact rather than instinct.

---

## Core Metrics

Four metrics form the foundation.

### 1. Self-Service Success Rate

Percentage of users who resolved their question without raising a support ticket. If this is low, users are reading the docs and still not finding answers, and then creating work for support teams.

**Target:** >52%

---

### 2. Task Completion Rate

Whether users completed their intended task after visiting a page. This is the most direct signal. Low task completion usually points to one of three things: information is missing, the content is unclear, or the structure makes it hard to find what you need.

**Target:** >71%

---

### 3. Content Effectiveness Score

User feedback collected via thumbs up/down ratings and open-text comments. The comments are where the useful signal is. They tell you *why* a page isn't working, not just that it isn't.

**Target:** >60%

---

### 4. Visits

How many users are reaching each page. On its own, this doesn't tell you much. Combined with the other metrics, it determines priority. High traffic and low task completion is where you start.

---

## The Analysis Loop

Every improvement cycle works through five questions.

**1. Why do users come?**
Check top user intents. What are people actually trying to do?

**2. Did they succeed?**
Check intent-level success rates. Where are users failing?

**3. Why did they fail?**
Review open-text feedback:
- Missing information: the answer isn't there
- Lack of clarity: the answer is there but not understood
- Confusing structure: the page organisation is the problem

**4. How did they feel?**
Check thumbs up/down ratios over time.

**5. What to fix first?**
Combine traffic and outcome data:

| Traffic | Task Completion | Priority | What it means |
|---|---|---|---|
| High | Low | Fix first | High impact, clear problem |
| High | High | Monitor | Working well |
| Low | Low | Fix later | Real problem, limited reach |
| Low | High | Low priority | Fine, few users affected |

---

## Implementation

| | |
|---|---|
| **Owner** | Documentation owner for the relevant product area |
| **Target** | Address at least 75% of identified issues per month |
| **Cycle** | Issues found in month N are addressed in month N+1 |

**Process:**
1. Identify issues from dashboards
2. Create documentation improvement tasks
3. Implement updates
4. Measure before vs. after. If metrics improve, close the task.

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

An optional composite score for benchmarking across a documentation set:

```
Score (out of 10) =
  (Visits / 1000 × 10%) +
  (Self-service rate × 60%) +
  (Task completion rate × 30%)
```

Self-service rate gets the highest weight because it's the most direct measure of whether documentation is reducing user effort. Visits are weighted low. Traffic without outcomes is just noise.

---

## Why This Matters

Documentation teams often struggle to justify their work to stakeholders. Counting topics written or pages published doesn't tell you whether any of it is helping.

When you can say "self-service rates went up 8 points after we rewrote the top 10 failing topics," that's a conversation product managers and support leads actually care about. It also makes prioritisation much easier. Instead of debating which page needs updating, you look at which pages have high traffic and low task completion and start there.
