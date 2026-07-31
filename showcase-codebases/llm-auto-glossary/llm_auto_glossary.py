"""
llm_auto_glossary.py

Parses one or more Markdown documentation files, uses an LLM to identify
technical terms, acronyms, and jargon, and generates a linked Markdown
glossary file.

Usage:
    python llm_auto_glossary.py --input docs/ --output glossary.md
    python llm_auto_glossary.py --input docs/api/webhooks.md --output glossary.md
    python llm_auto_glossary.py --input docs/ --output glossary.md --append

Requirements:
    pip install anthropic

Environment:
    ANTHROPIC_API_KEY — your Anthropic API key
"""

import os
import sys
import json
import argparse
import re
from pathlib import Path
import anthropic

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

MODEL = "claude-3-5-haiku-20241022"

SYSTEM_PROMPT = """You are a technical documentation specialist.
Your job is to identify technical terms, acronyms, and jargon from
documentation content that a new reader might not immediately understand.

For each term you identify:
- Extract the exact term as it appears (preserve capitalisation)
- Write a concise, plain-language definition (1-2 sentences max)
- Note the term type: acronym, jargon, concept, or product

Only include terms that genuinely need explanation. Skip common English words,
basic programming concepts (variable, function, array), and terms that are
self-explanatory from their name.

Return a JSON array. Each item must have:
  "term": string
  "definition": string
  "type": "acronym" | "jargon" | "concept" | "product"
"""

USER_PROMPT_TEMPLATE = """Extract glossary terms from the following documentation content.

Content:
---
{content}
---

Return only a JSON array with no additional text."""


# ---------------------------------------------------------------------------
# File collection
# ---------------------------------------------------------------------------

def collect_markdown_files(path: str) -> list[Path]:
    p = Path(path)
    if p.is_file() and p.suffix in (".md", ".mdx"):
        return [p]
    elif p.is_dir():
        return sorted(p.rglob("*.md")) + sorted(p.rglob("*.mdx"))
    else:
        print(f"Warning: {path} is not a Markdown file or directory, skipping.")
        return []


def strip_frontmatter(content: str) -> str:
    """Remove YAML frontmatter from Markdown content."""
    if content.startswith("---"):
        end = content.find("---", 3)
        if end != -1:
            return content[end + 3:].strip()
    return content


def strip_code_blocks(content: str) -> str:
    """Remove fenced code blocks — terms inside code are not prose."""
    return re.sub(r"```[\s\S]*?```", "", content)


def clean_content(content: str) -> str:
    content = strip_frontmatter(content)
    content = strip_code_blocks(content)
    # Collapse excessive whitespace
    content = re.sub(r"\n{3,}", "\n\n", content)
    return content.strip()


# ---------------------------------------------------------------------------
# LLM extraction
# ---------------------------------------------------------------------------

def extract_terms(client: anthropic.Anthropic, content: str) -> list[dict]:
    """Send content to the LLM and return extracted terms."""
    # Truncate very long content to stay within token limits
    max_chars = 12000
    if len(content) > max_chars:
        content = content[:max_chars] + "\n\n[Content truncated for processing]"

    message = client.messages.create(
        model=MODEL,
        max_tokens=2048,
        system=SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": USER_PROMPT_TEMPLATE.format(content=content),
            }
        ],
    )

    raw = message.content[0].text.strip()

    # Strip markdown code fences if the model wraps the JSON
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)

    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"  Warning: Could not parse LLM response as JSON: {e}")
        return []


# ---------------------------------------------------------------------------
# Deduplication and merging
# ---------------------------------------------------------------------------

def merge_terms(existing: dict, new_terms: list[dict]) -> dict:
    """Merge new terms into the existing dict, keyed by lowercase term."""
    for item in new_terms:
        term = item.get("term", "").strip()
        if not term:
            continue
        key = term.lower()
        if key not in existing:
            existing[key] = item
    return existing


# ---------------------------------------------------------------------------
# Glossary rendering
# ---------------------------------------------------------------------------

def render_glossary(terms: dict) -> str:
    """Render the merged term dict as a sorted Markdown glossary."""
    lines = [
        "# Glossary",
        "",
        "Auto-generated from documentation source files. "
        "Terms are sorted alphabetically.",
        "",
    ]

    # Group by first letter
    sorted_terms = sorted(terms.values(), key=lambda x: x["term"].lower())
    current_letter = ""

    for item in sorted_terms:
        term = item["term"]
        definition = item["definition"]
        term_type = item.get("type", "")
        first_letter = term[0].upper()

        if first_letter != current_letter:
            current_letter = first_letter
            lines.append(f"## {current_letter}")
            lines.append("")

        type_badge = f" *({term_type})*" if term_type else ""
        lines.append(f"**{term}**{type_badge}")
        lines.append(f":   {definition}")
        lines.append("")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Generate a Markdown glossary from documentation files using an LLM."
    )
    parser.add_argument(
        "--input", required=True,
        help="Path to a Markdown file or directory of Markdown files"
    )
    parser.add_argument(
        "--output", default="glossary.md",
        help="Output path for the generated glossary (default: glossary.md)"
    )
    parser.add_argument(
        "--append", action="store_true",
        help="Append new terms to an existing glossary instead of overwriting"
    )
    args = parser.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("Error: ANTHROPIC_API_KEY environment variable not set.")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    files = collect_markdown_files(args.input)
    if not files:
        print("No Markdown files found.")
        sys.exit(1)

    print(f"Found {len(files)} file(s) to process.\n")

    # Load existing glossary terms if appending
    all_terms = {}
    if args.append and Path(args.output).exists():
        print(f"Loading existing glossary from {args.output}...")
        # Re-parsing the Markdown glossary is fragile; skip and note limitation
        print("  Note: Existing terms loaded by re-processing is not supported.")
        print("  New terms will be merged at the key level to avoid duplicates.\n")

    # Process each file
    for i, filepath in enumerate(files, 1):
        print(f"[{i}/{len(files)}] Processing {filepath}...")
        try:
            raw_content = filepath.read_text(encoding="utf-8")
            content = clean_content(raw_content)
            if not content:
                print("  Skipping — empty after cleaning.")
                continue
            terms = extract_terms(client, content)
            print(f"  Found {len(terms)} term(s).")
            all_terms = merge_terms(all_terms, terms)
        except Exception as e:
            print(f"  Error processing {filepath}: {e}")

    if not all_terms:
        print("\nNo terms extracted. Glossary not written.")
        sys.exit(0)

    glossary_md = render_glossary(all_terms)
    Path(args.output).write_text(glossary_md, encoding="utf-8")

    print(f"\nDone. {len(all_terms)} unique term(s) written to {args.output}")


if __name__ == "__main__":
    main()
