---
id: ai-agents
title: AI Writing Agents
---

# AI Writing Agents

Over the past couple of years I've built a set of AI agents to handle the repetitive parts of documentation work. The tasks that don't require judgment but eat up time anyway. Each one came out of a specific pain point on my team.

---

## Why I Built These

Writers in large documentation teams spend a surprising amount of time on things that aren't writing: chasing down information across Jira, wikis, and meeting notes; manually checking terminology; responding to status update requests from PMs. I wanted to automate the parts that follow a predictable pattern so the team could focus on work that actually needs a human.

---

## Agents Built

### Draft Generation Agent

Generates a first draft from multiple inputs at once.

**Inputs:**
- Jira tickets
- Confluence wiki pages
- Meeting transcripts

**What it does:**
- Pulls information across all three sources into a structured first draft
- Flags gaps where sources contradict each other or where information is missing
- Extracts process flows from meeting transcripts and generates diagrams where applicable

**Impact:** First drafts used to mean starting from scratch after reading three sources that didn't fully agree. Now writers start from a draft that's already pulled everything together. Their job is to fix what the agent got wrong, not assemble raw material.

---

### Accessibility Checker

Reviews documentation against accessibility standards and flags issues before publishing.

**What it checks:**
- Alt text on images
- Heading hierarchy
- Link text quality (flags things like "click here")
- Colour contrast in embedded assets
- Table accessibility

**Output:** A report of issues with severity levels and suggested fixes.

---

### Terminology Consistency Agent

Checks documentation against an approved glossary and flags inconsistencies.

**What it does:**
- Compares content against a defined term list
- Flags unapproved synonyms, deprecated terms, and inconsistent capitalisation
- Suggests the approved term for each flag

**Why it matters:** Inconsistent terminology is one of the most common causes of support tickets in enterprise software docs. Users search for "purchase order" and the docs say "PO," or worse, both. This catches that before it ships.

---

### Content Audit Agent

Running a quality audit across a large documentation set manually takes weeks and still misses things. This agent does it in minutes.

**What it checks:**
- Outdated product version references
- Broken links
- Thin content (pages below a minimum useful length)
- Duplicate content across topics
- Missing required sections (for example, prerequisites or related topics)

**Output:** A prioritised list of issues sorted by severity and traffic impact.

---

### Test Readiness Automation Agent

This one solved a very specific problem. Before the agent existed, PMs would email individual writers asking them to update the test readiness status of their documentation. Writers had to find the right content, update the status, and reply. With a large team, things got missed.

**How it works now:**
1. Writers forward the PM email to a shared mailbox
2. The agent reads the email and works out which documentation needs updating and what status to set
3. It updates the documentation system
4. It sends the writer a notification confirming what changed
5. If it can't resolve something, it flags it in the notification so the writer can follow up with the PM

**Impact:** Writers forward an email and get a notification back. They don't have to touch the documentation system at all. A whole category of interruption gone.

---

## Tech Stack

Built using Claude (Anthropic), with integrations into Jira, Confluence, and internal email systems. Agents are implemented as modular skills that can be chained or run independently.

---

## A note on how these were built

I'm a technical writer, not a software engineer. These agents came together because I understood the workflows well enough to specify the logic precisely: the inputs, the decision rules, the edge cases, the failure modes. That domain knowledge is what made them useful. The engineering side was learnable. Knowing exactly what each agent needed to do was the harder part.
