---
id: ai-agent-doc-template
title: Documenting AI Agents — A Template
---

# Documenting AI Agents — A Reusable Template

Documenting AI agents requires a different mindset than documenting traditional software.

Traditional documentation answers: *"Which buttons do I click?"*

Agent documentation answers: *"What goal am I trying to achieve, what should I ask, what should I expect, and what should I verify before accepting the output?"*

An agent is goal-driven, may invoke multiple tools, reasons through tasks, and its behavior can vary based on context. Users need to understand not just what the agent does — but how to work with it effectively.

This template is designed to be reused across agent implementations. It ensures consistency, reduces the risk of gaps, and helps users build accurate mental models of what an agent can and cannot do.

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

This section matters more for AI than for any other type of software documentation. Users who don't understand limitations will either over-trust the agent or lose confidence after a single unexpected result.

Document clearly:

- **Supported languages** — which languages the agent can process and respond in
- **Data sources** — what information the agent has access to
- **What it cannot access** — real-time data, external systems, user files it hasn't been given
- **Accuracy limitations** — where the agent may be uncertain or approximate
- **Cases requiring human review** — decisions that should not be accepted automatically

Don't bury limitations at the end of a long page. Link to this section from the overview.

---

## 5. How to Use the Agent

Document by **user goal**, not by UI screen. For each task, provide:

- **Goal** — what the user is trying to accomplish
- **Example prompt** — a realistic, well-formed input
- **Expected response** — what the agent returns
- **Possible follow-up prompts** — where the conversation can go next

**Example:**

**Goal:** Create a sourcing event

> **Prompt:** Create a sourcing event for 500 laptops for the EMEA region, delivery by Q3.
>
> **Agent response:** Confirms the event details, requests any missing information (e.g., preferred suppliers, budget), creates the draft, and displays recommended next steps.
>
> **Follow-up prompts:**
> - "Add Dell and Lenovo as preferred suppliers."
> - "What information is still missing from this event?"

Showing example prompts with expected responses sets realistic expectations and teaches users how to phrase requests effectively.

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

Users don't need implementation details, but they do need a mental model. Document:

- What information sources the agent draws from
- What business rules or policies it applies
- What external systems it can access
- What tools or actions it can invoke on behalf of the user

Avoid technical architecture. Write this section for a user who is deciding whether to trust the agent's output — not for an engineer debugging it.

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

As AI features become standard in enterprise software, documentation teams need a consistent structure that works across implementations — not a new approach invented for each agent.

This template was designed to be:
- **Reusable** — drop it into any agent documentation project and adapt the content
- **User-centred** — organized around goals, not features
- **Trust-building** — limitations and human review sections set accurate expectations
- **Consistent** — the same structure across agents reduces cognitive load for users who work with multiple agents in the same product

---

*This template was developed as part of an AI documentation strategy for a large enterprise SaaS product. It is intended to be adapted, not followed rigidly — every agent has different capabilities, limitations, and user contexts.*
