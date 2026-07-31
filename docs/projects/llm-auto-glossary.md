---
id: llm-auto-glossary
title: LLM Auto Glossary
---

# LLM Auto Glossary

A Python script that scans Markdown documentation files, uses an LLM to identify technical terms, acronyms, and jargon, and generates a structured Markdown glossary — sorted alphabetically, grouped by letter, and deduplicated across files.

**[View source on GitHub](https://github.com/anandnr47/tech-writer-47-docs-as-code/tree/main/showcase-codebases/llm-auto-glossary)**

---

## The Problem

Documentation sets accumulate terminology that readers are expected to know but is never formally defined. "JWT," "HMAC," "AVRO," "scope item" — writers know what these mean, but new readers don't. Building a glossary manually means reading every page and pulling out terms by hand.

This script automates the first pass. It scans your docs, identifies terms that need explanation, and generates a draft glossary you can review and refine. The output is standard Markdown that drops into any docs site.

---

## Example Output

```markdown
## H

**HMAC-SHA256** *(acronym)*
:   Hash-based Message Authentication Code using the SHA-256 hashing algorithm.
    Used to sign webhook payloads so receivers can verify authenticity.

## J

**JWT** *(acronym)*
:   JSON Web Token. A self-contained token that carries user claims in a
    Base64URL-encoded payload, signed with a secret or private key.
```

Each term is classified as `acronym`, `jargon`, `concept`, or `product` — useful for filtering or styling in your docs site.

---

## Usage

```bash
# Single file
python llm_auto_glossary.py --input docs/api/webhooks.md --output glossary.md

# Entire docs directory
python llm_auto_glossary.py --input docs/ --output glossary.md

# Append new terms to existing glossary
python llm_auto_glossary.py --input docs/new-section/ --output glossary.md --append
```

---

## How It Works

1. Collects all `.md` and `.mdx` files from the input path
2. Strips YAML frontmatter and code blocks so the LLM sees prose only
3. Sends each file's content to the LLM, which returns terms as structured JSON
4. Merges results across files, deduplicating by lowercase term key
5. Renders a sorted, letter-grouped Markdown glossary

---

## Connection to the Terminology Consistency Agent

This script and the [Terminology Consistency Agent](/projects/ai-agents) are two sides of the same problem:

- This script **creates** a glossary from existing content
- The agent **enforces** that glossary across new and updated content

A practical workflow: run this script on existing docs to bootstrap a glossary, review and approve the terms, then feed that approved glossary to the consistency agent to catch drift in future content.

It also connects to a point in the [Information Architecture](/approach/information-architecture) page — a glossary is one of the first things I'd add when a documentation set scales past 50 pages. This script is how you'd generate one without starting from a blank page.

---

## Source

**[showcase-codebases/llm-auto-glossary](https://github.com/anandnr47/tech-writer-47-docs-as-code/tree/main/showcase-codebases/llm-auto-glossary)**
