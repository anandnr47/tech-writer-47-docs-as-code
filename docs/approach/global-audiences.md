---
id: global-audiences
title: Writing for Global Audiences
---

# Writing for Global Audiences

Writing for a global audience is different from writing for a known enterprise user base. When your documentation is read by millions of people across dozens of countries, languages, and cultures, decisions that seem stylistic become structural.

---

## The Baseline: Plain Language

Most documentation style guides recommend plain language. For global audiences, plain language isn't a recommendation — it's a requirement.

The practical rules:

**Short sentences.** Long sentences with multiple clauses are harder to translate and harder to parse for non-native readers. Break them up.

**Active voice.** "Click Save" is clearer than "The Save button should be clicked." Active voice maps more directly across languages.

**One idea per sentence.** Compound sentences that connect two actions with "and" or "then" are easy to misread. State each step separately.

**No idioms.** "Get the ball rolling," "out of the box," "under the hood" — these don't translate. Replace them with literal descriptions.

**No cultural references.** Examples, analogies, and jokes that rely on shared cultural context fail internationally. Keep examples neutral and concrete.

---

## Terminology Consistency

For global audiences, terminology consistency matters more than it does for a single-region product. Users who read documentation in translation are relying on consistent term usage because they're often cross-referencing translated docs against the product UI.

If the docs say "invoice" but the product UI says "bill" — that's a minor friction point for an English speaker. For a user reading a machine-translated version of the docs while navigating a localised UI, it can be genuinely confusing.

Rules I apply:

- Define technical terms on first use and link to a glossary
- Use the exact same term the product UI uses, every time
- Avoid synonyms — pick one word per concept and use it consistently
- Flag terms that have different meanings in different regions (for example, "bill" means a document in the US and a draft law in the UK)

---

## Structure Over Prose

International readers navigate documentation more than they read it. Structure matters more than elegant prose.

**Headings should be self-sufficient.** A reader scanning headings should understand the page structure without reading the body text. "Prerequisites" is better than "Before you start, you'll need a few things."

**Tables and lists beat paragraphs.** Structured information is easier to process in any language. If you're explaining three things, a numbered list is almost always clearer than three sentences.

**Put the action first.** Task-based documentation should lead with what the user needs to do, not with context. Context is important but it belongs after the action, not before it.

---

## Localisation Readiness

If your documentation will be translated or localised, write with that in mind from the start. Retrofitting localisation-ready writing onto existing docs is significantly more expensive than writing it correctly the first time.

**Avoid embedding text in images.** Text in screenshots and diagrams can't be translated without recreating the image. Use callouts or numbered references to a table instead.

**Date and number formats vary.** 01/02/2025 means January 2nd in the US and February 1st in most of Europe. Use unambiguous formats: 1 February 2025 or ISO 8601 (2025-02-01).

**Units of measurement.** Specify which system you're using and, where relevant, include conversions. Don't assume metric or imperial.

**Currency and pricing examples.** Use neutral placeholders (100 USD, €50) rather than culturally specific examples that may not resonate globally.

**Code examples are mostly language-neutral** — but variable names, comments, and error messages embedded in code may need localisation consideration.

---

## Writing for Translation

If your docs are translated by humans or machine-translated, the source text quality directly affects translation quality. Ambiguous source text produces ambiguous translations.

Things that consistently cause translation problems:

- Sentences where the subject is unclear ("It should be set to active" — what is "it"?)
- Pronouns with ambiguous antecedents ("Click the button after selecting the option. It will turn green." — what turns green?)
- Passive constructions without an obvious actor
- Negations inside negations ("Users who have not yet been deactivated should not skip this step")
- Implied steps ("Configure the settings and save" — how?)

Reading your own writing out loud catches most of these. If you have to pause to parse a sentence, a translator will too.

---

## A Different Mindset

Writing for an enterprise product with a known user base, you can make assumptions. You know roughly who your readers are, what they already know, and what problems they're trying to solve.

Writing for a global developer audience at scale, you can't make those assumptions. Your readers include first-year developers learning to code, senior engineers at large companies, users in countries where internet access is intermittent and documentation is saved locally, and users who are reading a translation of your work made by a machine.

The documentation that works for all of them is clear, predictable, and complete. Not clever. Not personality-driven. Not optimised for the reader who already knows the product. Optimised for the reader who doesn't.

That's a harder standard to write to. It's also a more honest one.
