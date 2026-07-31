# LLM Auto Glossary

A Python script that parses Markdown documentation files, uses an LLM to identify technical terms, acronyms, and jargon, and generates a linked Markdown glossary — sorted alphabetically and grouped by letter.

---

## What It Does

Documentation sets accumulate terminology that readers are expected to know but are never formally defined. This script automates the first pass: scanning your docs, identifying terms that need explanation, and generating a structured glossary you can review and refine.

It works on a single file or an entire directory of Markdown files. Terms extracted from multiple files are deduplicated and merged into a single output.

---

## Example Output

```markdown
# Glossary

## A

**access token** *(concept)*
:   A short-lived credential issued after authentication that authorises API
    requests. Included in the `Authorization` header of each request.

**AVRO** *(acronym)*
:   Apache Avro. A data serialisation format that stores data in binary format
    alongside a JSON schema describing the structure.

## H

**HMAC-SHA256** *(acronym)*
:   Hash-based Message Authentication Code using the SHA-256 hashing algorithm.
    Used to sign webhook payloads so receivers can verify authenticity.

## J

**JWT** *(acronym)*
:   JSON Web Token. A self-contained token that carries user claims in a
    Base64URL-encoded payload, signed with a secret or private key.
```

---

## Requirements

- Python 3.9 or later
- An Anthropic API key

```bash
pip install -r requirements.txt
```

---

## Usage

**Process a single file:**

```bash
export ANTHROPIC_API_KEY=your_key_here
python llm_auto_glossary.py --input docs/api/webhooks.md --output glossary.md
```

**Process an entire docs directory:**

```bash
python llm_auto_glossary.py --input docs/ --output glossary.md
```

**Append new terms to an existing glossary:**

```bash
python llm_auto_glossary.py --input docs/new-section/ --output glossary.md --append
```

---

## Arguments

| Argument | Required | Default | Description |
|---|---|---|---|
| `--input` | Yes | — | Path to a Markdown file or directory |
| `--output` | No | `glossary.md` | Output file path |
| `--append` | No | False | Merge with existing glossary instead of overwriting |

---

## How It Works

1. **Collects** all `.md` and `.mdx` files from the input path
2. **Cleans** each file — strips YAML frontmatter and fenced code blocks so the LLM sees prose only
3. **Sends** each file's content to the LLM with a system prompt instructing it to extract terms as structured JSON
4. **Merges** results across files, deduplicating by lowercase term key
5. **Renders** a sorted, letter-grouped Markdown glossary

The LLM classifies each term as one of: `acronym`, `jargon`, `concept`, or `product`. This classification appears in the output so you can filter or style terms differently.

---

## Design Decisions

**Code blocks are stripped before sending to the LLM.** Terms inside code blocks are identifiers, not prose — they don't belong in a prose glossary.

**Deduplication is key-based (lowercase).** If two files both mention "JWT," only one definition is kept (the first one encountered). This prevents near-duplicate entries.

**The LLM is instructed to skip obvious terms.** The system prompt explicitly tells it not to extract common English words, basic programming concepts, or self-explanatory terms. You still need to review the output, but it significantly reduces noise.

**Content is truncated at 12,000 characters per file.** Very long files are trimmed before sending. For large doc sets, consider splitting files before processing.

---

## Connection to the Terminology Consistency Agent

This script and the [Terminology Consistency Agent](/projects/ai-agents) are two sides of the same problem:

- This script **creates** a glossary from existing content
- The agent **enforces** that glossary across new and updated content

A practical workflow: run this script on your existing docs to bootstrap a glossary, review and approve the terms, then feed that approved glossary to the consistency agent to catch drift in future content.
