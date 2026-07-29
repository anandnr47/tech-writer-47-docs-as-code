---
id: ai-agents
title: AI Writing Agents
---

# AI Writing Agents

Over the past couple of years I've built a set of AI agents to handle the repetitive parts of documentation work — the tasks that don't require judgment but eat up time anyway. Each one came out of a real pain point on my team.

---

## Why I Built These

Writers in large documentation teams spend a surprising amount of time on things that aren't writing: chasing down information across Jira, wikis, and meeting notes; manually checking terminology; responding to status update requests from PMs. I wanted to automate the parts that follow a predictable pattern so the team could focus on work that actually requires a human.

---

## Agents Built

### Draft Generation Agent

Generates first-draft documentation from multiple inputs simultaneously.

**Inputs:**
- Jira tickets
- Confluence wiki pages
- Meeting transcripts

**What it does:**
- Synthesizes information across all three sources into a structured first draft
- Identifies gaps where information is missing or contradictory across sources
- Extracts process flows from meeting transcripts and auto-generates diagrams where applicable

**Impact:** First drafts used to mean starting from scratch after reading three sources that didn't fully agree. Now writers start from a draft that's already synthesised the inputs — and their job is to fix what the agent got wrong, not to assemble raw material.

---

### Accessibility Checker

Reviews documentation against accessibility standards and flags issues before publishing.

**What it checks:**
- Alt text on images
- Heading hierarchy
- Link text quality (e.g., flags "click here")
- Color contrast in embedded assets
- Table accessibility

**Output:** A structured report of issues with severity levels and suggested fixes.

---

### Terminology Consistency Agent

Monitors documentation for term inconsistencies against an approved glossary.

**What it does:**
- Compares content against a defined term list
- Flags unapproved synonyms, deprecated terms, and inconsistent capitalization
- Suggests the approved term for each flag

**Why it matters:** Inconsistent terminology is one of the most common causes of support tickets in enterprise software docs. Users search for "purchase order" and the docs say "PO" — or worse, both. This agent catches that before it ships.

---

### Content Audit Agent

Running a quality audit across a large documentation set manually takes weeks and still misses things. This agent does it in minutes.

**What it checks:**
- Outdated product version references
- Broken links
- Thin content (pages below a minimum useful length)
- Duplicate content across topics
- Missing required sections (e.g., prerequisites, related topics)

**Output:** A prioritized list of issues sorted by severity and traffic impact.

---

### Test Readiness Automation Agent

Solves a specific operational pain point: keeping documentation test readiness status up to date across a large team.

**The workflow before:**
Product managers email writers individually asking them to update the test readiness status of their documentation. Writers have to manually find the relevant content, update the status, and reply. With a large team, this created noise and missed updates.

**The agent workflow:**
1. Writers forward PM emails to a shared mailbox
2. The agent reads the mailbox and parses each email to identify:
   - Which documentation needs updating
   - What the target status should be
3. The agent locates the correct content and updates the status
4. It sends a notification to the relevant writer confirming the update
5. If it encounters an ambiguity or error it cannot resolve, it flags it in the notification so the writer can follow up with their PM directly

**Impact:** The test readiness agent removed a whole category of interruption from the team's day. Writers forward the email and get back a notification — they don't have to touch the documentation system at all.

---

## Tech Stack

Built using Claude (Anthropic), with integrations into Jira, Confluence, and internal email systems. Agents are implemented as modular skills that can be chained or run independently.

---

## A note on how these were built

I'm a technical writer, not a software engineer. These agents were built because I understood the workflows well enough to specify the logic precisely — the inputs, the decision rules, the edge cases, the failure modes. That domain knowledge is what made them useful rather than generic. The engineering was learnable. Knowing exactly what the agent needed to do was the harder part.
