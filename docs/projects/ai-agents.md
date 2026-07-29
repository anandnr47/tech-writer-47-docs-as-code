---
id: ai-agents
title: AI Writing Agents
---

# AI Writing Agents

A suite of AI agents built to reduce manual work in a large-scale enterprise documentation environment. Each agent handles a specific part of the documentation workflow — from first draft to quality audit to operational maintenance.

---

## The Problem

Enterprise documentation teams deal with high volume and constant change. Writers spend significant time on repetitive tasks: creating first drafts from scattered inputs, checking terminology consistency, auditing content quality, and responding to status update requests from product managers.

These tasks are time-consuming, error-prone when done manually, and take time away from higher-value work like information architecture and content strategy.

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

**Impact:** Cuts first-draft time significantly, letting writers focus on review and refinement rather than starting from blank pages.

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

**Why it matters:** In enterprise software documentation, inconsistent terminology confuses users and creates support tickets. This agent catches drift before it ships.

---

### Content Audit Agent

Audits documentation sets for quality issues at scale — something that would take weeks to do manually.

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

**Impact:** Eliminates manual status updates, reduces missed requests, and gives writers a clear log of what changed and why.

---

## Tech Stack

Built using Claude (Anthropic), with integrations into Jira, Confluence, and internal email systems. Agents are implemented as modular skills that can be chained or run independently.

---

## What This Work Shows

These agents weren't built by an engineering team — they were designed and implemented by a technical writer who identified workflow bottlenecks, understood the inputs and outputs well enough to specify the logic, and had the technical range to build and test them.

It's the intersection of documentation expertise and AI tooling that makes them useful rather than generic.
