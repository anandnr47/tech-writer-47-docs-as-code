---
id: ai-agent-doc-template
title: Documenting AI Agents — A Template
---

# Documenting AI Agents: A Reusable Template

Writing documentation for AI agents is different from writing docs for a traditional feature. With a feature, you document what it does and how to use it. With an agent, you also need to tell users what to expect, what to verify, and when not to trust the output.

I developed this template after working on AI agent documentation for an enterprise product. The goal was a structure that could be reused across different agents without reinventing the approach each time.

---

## 1. Overview

Answer four questions upfront:

- **What does the agent do?**
- **What problem does it solve?**
- **What are the typical use cases?**
- **Who should use it?**

**Example:**

> The Sourcing Agent helps users create sourcing events, identify missing information, and recommend next steps based on organizational policies. It is designed for procurement teams who need to move quickly without losing accuracy.

Keep this short. Users scan overviews to decide if they're in the right place — don't make them read a paragraph to find out.

---

## 2. Before You Begin

List what users need before they can interact with the agent:

- Required permissions or roles
- Supported systems and integrations
- Configuration prerequisites
- Any data the agent needs access to in order to function

This section prevents the most common support issue with AI features: users attempting tasks they're not set up to complete.

---

## 3. Capabilities

Document what the agent can do as a table. Keep descriptions action-oriented.

| Capability | Description |
|---|---|
| Create | Creates records or events based on user input |
| Analyze | Reviews data and identifies patterns or gaps |
| Recommend | Suggests next steps or options based on policy and context |
| Summarize | Generates summaries of documents, responses, or data sets |
| Answer | Responds to questions about product features or processes |

Avoid vague capability names like "Assist" or "Support". Name what the agent actually does.

---

## 4. Limitations

This section is more important for AI features than for most other documentation. Users who don't have a clear picture of what the agent can't do will either over-rely on it or lose confidence the first time it gives an unexpected result.

Document clearly:

- **Supported languages** — which languages the agent can process and respond in
- **Data sources** — what information the agent has access to
- **What it cannot access** — real-time data, external systems, files it hasn't been given
- **Accuracy limitations** — where the agent may be uncertain or approximate
- **Cases requiring human review** — decisions that shouldn't be accepted automatically

Put this section early, not buried at the end. If there are critical limitations, link to them from the overview.

---

## 5. How to Use the Agent

Document by user goal, not by UI screen. For each task:

- **Goal** — what the user is trying to accomplish
- **Example prompt** — a realistic, well-formed input
- **Expected response** — what the agent returns
- **Possible follow-ups** — where the conversation typically goes next

**Example:**

**Goal:** Create a sourcing event

> **Prompt:** Create a sourcing event for 500 laptops for the EMEA region, delivery by Q3.
>
> **Agent response:** Confirms the event details, asks for anything missing (preferred suppliers, budget), creates the draft, and shows recommended next steps.
>
> **Follow-up prompts:**
> - "Add Dell and Lenovo as preferred suppliers."
> - "What information is still missing from this event?"

Example prompts with expected responses set realistic expectations and show users how to phrase requests so they get useful results.

---

## 6. Conversation Best Practices

Help users write prompts that get better results.

**Effective prompts:**
- Include context: *"Create a sourcing event for office chairs in Germany, budget €50,000."*
- State the goal clearly: *"Compare these three suppliers based on delivery time and price."*
- Be specific about scope: *"Summarize only the responses from approved suppliers."*

**Prompts to avoid:**
- Ambiguous requests: *"Help me with sourcing."*
- Missing context: *"Create an event."* (For what? For whom? Where?)
- Compound goals in one message: asking the agent to do three unrelated things at once

---

## 7. How the Agent Works (High Level)

Users don't need implementation details, but they do need a mental model of what the agent is working with. Cover:

- What information sources it draws from
- What business rules or policies it applies
- What external systems it can access
- What actions it can take on the user's behalf

Keep this section non-technical. It's for a user deciding whether to trust the output, not an engineer debugging it.

---

## 8. Human Review

Be explicit about what requires human judgment. Classify actions into three categories:

| Action type | Review required? |
|---|---|
| Recommendations and suggestions | Yes — user decides whether to act |
| Draft creation (events, documents) | Yes — review before submitting |
| Read-only queries and summaries | Low — but verify for high-stakes decisions |
| Automated system actions | Document clearly; ensure user is aware |

If an action is irreversible or has downstream consequences, say so. Don't assume users will infer it.

---

## 9. Troubleshooting

Cover the most common failure modes:

| Issue | Likely cause | What to do |
|---|---|---|
| Agent cannot answer | Missing data or out of scope | Check that required data sources are connected |
| Response is incomplete | Prompt lacks context | Add more detail to the request |
| Permission error | User role doesn't allow this action | Contact your administrator |
| Response seems inaccurate | Agent uncertainty | Verify against source data; escalate if needed |
| Timeout or no response | System load or connectivity | Retry; check system status page |

---

## 10. Privacy and Security

Document what data the agent uses, stores, and shares. Users in regulated industries need this to assess compliance before adopting AI features.

Cover:
- What data the agent processes during a session
- What is stored, for how long, and where
- Whether any data is sent to external systems or third-party models
- What permissions govern data access
- Relevant compliance frameworks (GDPR, SOC 2, etc.)

---

## Why This Template Exists

As AI features become more common in enterprise software, documentation teams need a consistent structure that works across different agents. Without one, each team invents their own approach and users get a different experience every time.

The sections in this template aren't arbitrary. Capabilities and limitations go together because knowing what an agent can do is only half the picture. Human review exists because AI output shouldn't be accepted blindly. Conversation best practices exist because most users don't know how to prompt an agent well the first time.

It's designed to be adapted, not followed rigidly. Every agent is different.

---

*This template was developed as part of an AI documentation strategy for a large enterprise SaaS product.*
