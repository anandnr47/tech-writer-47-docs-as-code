---
id: information-architecture
title: Information Architecture
---

# Information Architecture

Good information architecture is invisible. Users find what they need without noticing the structure. Bad IA is very visible — users scroll past things they need, click into the wrong section, and give up.

This page explains the structural decisions behind this portfolio.

---

## Why API Reference and Tutorials Are Separate

The most common mistake in developer documentation is mixing reference and guide content. They serve different users in different situations.

**Reference** is for users who know what they want. They're looking for an endpoint, a parameter name, an error code. They're scanning, not reading. Every extra word is friction.

**Tutorials and guides** are for users who don't know what to do next. They're reading in order, following steps, building understanding. They need context, not just facts.

If you put both in the same navigation, reference users wade through tutorial prose to find the parameter table. Guide users get lost in reference entries when they need step-by-step help. Separating them means each section can be optimised for its actual reader.

---

## Why Getting Started Lives Under API Reference

Getting Started could reasonably sit under Tutorials. I put it under API Reference because of what it actually does.

The Getting Started guide is onboarding for the API — it explains how to authenticate and make a first call. Its primary audience is a developer who just signed up and wants to know if the API works. That's a reference use case: "I need to make a working call right now."

Tutorials, by contrast, are for deeper learning: how JWTs work, how to set up Sphinx, how htop reads CPU metrics. Those pages exist to build understanding, not to get someone unblocked.

The rule: if the primary goal is "make this work now," it belongs near the API reference. If the primary goal is "understand how this works," it belongs in Tutorials.

---

## Why Each Agent Has Its Own Page

The Projects section has separate pages for each agent rather than one long page covering all of them. This was a deliberate decision.

A single long page works when the reader is likely to read everything. It works badly when different readers care about different things. A hiring manager scanning for AI experience wants to land directly on the agent that's most relevant to them. Putting everything on one page means they have to scroll past agents they don't care about to find the one they do.

Separate pages also make each agent linkable. The Test Readiness Agent has its own URL because it's the most technically detailed piece and worth featuring on its own (it's in the landing page spotlight). A section on a longer page can't be featured that way.

The trade-off: a reader who wants an overview has to navigate between pages. That's why the Projects Overview page exists — it's the single-page summary, with links for readers who want depth.

---

## Why Release Notes Is Not Under Tutorials

Release notes could sit under Tutorials as a writing sample. It's a standalone entry instead because it demonstrates a different skill from the tutorial pages.

Tutorials show task-based writing. Release notes show a different register: user-facing, versioned, time-sensitive, written for both technical and non-technical audiences. Grouping it with tutorials would imply it's the same kind of content. It isn't.

---

## What I'd Do Differently at Scale

This portfolio has around 15 pages. At that size, a single-level hierarchy works fine.

At 50+ pages, I'd restructure:

- **Version the API reference.** Right now there's one version of each endpoint. A real product has multiple API versions and users need to know which they're on.
- **Add a search-first entry point.** At scale, navigation becomes secondary. Most users search. The sidebar structure matters less when good search exists.
- **Separate conceptual from task content.** "How JWTs Work" is a concept page. "Authentication Guide" is a task page. At scale, these belong in distinct sections so users can orient faster.
- **Add a glossary.** Terms like "deliverable code," "release cycle," and "scope item" appear across multiple pages. A glossary reduces repetition and gives users a single place to check terminology.

The decisions made for 15 pages are not the same decisions you'd make for 500. Part of IA work is knowing when the structure you have will stop scaling.

---

## What I'd Deprecate

Most documentation teams are better at adding content than removing it. Over time, documentation sets accumulate pages that are outdated, redundant, or simply not useful to anyone. This is as much an IA problem as a content problem — dead pages dilute navigation, confuse search results, and create maintenance overhead.

In this portfolio, if I were maintaining it as a live product doc set, here's what I'd consider cutting or consolidating:

**The fictional API samples (login, users) once real API docs exist.**
The login and users API pages demonstrate writing patterns but document a fictional API. In a real product context, they'd be replaced by actual endpoint documentation. Keeping fictional samples alongside real ones creates a confusing signal for users trying to understand the actual product.

**The `dummy.md` placeholder** was already removed early in this project. Its existence was a reminder that placeholder content is worse than no content — it takes up navigation space and tells users nothing.

**The Getting Started and Authentication guides** currently live under API Reference. At scale, if the product had a proper developer portal with onboarding flows, these would likely be replaced by interactive quickstarts and the static Markdown versions would be deprecated.

The broader principle: every page should earn its place by serving a measurable user need. If you can't point to a user intent a page satisfies, it's a candidate for removal.

---

## On Search vs Navigation

One thing this portfolio doesn't have is search. At 15 pages, it doesn't need it — the sidebar is the navigation. But this is worth noting as an explicit IA decision.

At scale, navigation and search serve different users:

- Navigation serves users who are exploring or who already know roughly where something is
- Search serves users who have a specific question and want the fastest path to the answer

When a documentation set grows past 50–100 pages, most users default to search. The sidebar becomes secondary. At that point, the IA investment shifts — less time on sidebar hierarchy, more time on page titles, headings, and metadata that make pages findable.

This portfolio's IA is optimised for navigation because that's the right call at its current scale. That decision would change at 10x the page count.
