---
id: content-strategy
title: Documentation Content Strategy
---

# Documentation Content Strategy

This page covers how I approach documentation at a programme level: not just writing individual pages, but deciding what to build, what to cut, and how to measure whether it's working.

---

## Where I Start

Before writing anything, I try to answer three questions:

1. What are users trying to do that they can't figure out on their own?
2. Where are they getting stuck, and why?
3. What would a successful interaction with the documentation look like?

The answers determine the documentation strategy. If users are failing at onboarding, the priority is a better getting started guide. If they're raising support tickets about edge cases, the priority is better reference coverage. If they're abandoning mid-task, the priority is better task structure.

Documentation strategy without data is just opinion. I use analytics (self-service rates, task completion, user feedback) to validate assumptions and prioritise work. See the [Analytics Framework](/projects/analytics-framework) for how I measure this.

---

## What to Build

Not everything needs documentation. Before commissioning a new page, I ask:

**Documentation problem or product problem?**
If users can't figure out a feature because it behaves unexpectedly, writing a longer explanation is a workaround, not a solution. The right answer is often to flag it to product. Some of the most valuable contributions a tech writer makes are the ones that result in a product change, not a new page.

**Does the answer already exist?**
Duplicate content is harder to maintain and worse for users. Before writing a new page, check whether the answer already exists: in the API reference, in a tutorial, in the product itself. If it does, link to it rather than restating it.

**Who is the audience?**
The same concept documented for two different audiences often belongs as two separate pages. A developer integrating the API and a business user configuring the product have different starting points, different vocabulary, and different goals. Trying to serve both on a single page usually serves neither well.

**What's the maintenance cost?**
Every page you add is a page you have to keep accurate. Fast-moving areas of a product accumulate documentation debt quickly. Sometimes the right call is to document the stable underlying behaviour and let users figure out the UI specifics. The UI will change; the concept won't.

---

## What to Cut

This is the harder part of documentation strategy. Most teams are better at adding content than removing it.

I look for content to cut or consolidate when:

- **Traffic is very low and hasn't grown.** A page that gets 10 visits a month after a year in production is probably not meeting a real user need. Consider removing it or merging it into a more visible page.
- **The information is covered better elsewhere.** Duplicate content that isn't kept in sync creates confusion. If two pages say similar things, one should link to the other and be cut down or removed.
- **The feature it documents is deprecated.** Deprecated content should be clearly marked, given a sunset date, and eventually removed. Leaving old docs around creates support load when users follow instructions that no longer work.
- **It was written for an internal audience and never updated.** Implementation details written to help engineers understand a system often end up in user-facing docs by accident. These pages are usually dense, jargon-heavy, and not useful to the actual audience.

---

## Deprecation Strategy

Deprecating documentation is as important as deprecating code. Without a clear strategy, old pages accumulate, confuse users, and create maintenance overhead.

My approach:

**Step 1: Mark it.** Add a deprecation notice at the top of the page with the date the feature or behaviour was deprecated and what replaces it.

```
> **Deprecated:** This endpoint was deprecated on 1 June 2025. Use [POST /auth/login v2](/api/login-v2) instead.
```

**Step 2: Redirect traffic.** Update internal links to point to the replacement. If the URL changes, set up a redirect so users with bookmarks aren't stranded.

**Step 3: Set a removal date.** Communicate when the old documentation will be removed. Give users enough time to migrate, typically one full release cycle minimum.

**Step 4: Remove it.** On the removal date, delete the page or archive it. Don't leave it in place indefinitely with a deprecation notice. That notice stops being read after a few months and the page becomes invisible clutter.

---

## Prioritisation Framework

When there's more work than capacity, I prioritise using a simple matrix:

| User impact | Effort | Priority |
|---|---|---|
| High | Low | Do first |
| High | High | Plan and schedule |
| Low | Low | Do opportunistically |
| Low | High | Don't do |

User impact is measured by traffic volume and task completion rate. A high-traffic page with low task completion is the highest priority fix. A low-traffic page that works fine is the lowest.

This isn't just a writing prioritisation tool. I use the same matrix when deciding whether to push back on a documentation request from a product team. If a requested page would have low user impact and high effort, it's worth asking whether it's the right use of documentation resources.

---

## What Good Looks Like

A documentation set is in good shape when:

- Users can complete common tasks without raising a support ticket
- New users can get from zero to a working integration in under 30 minutes
- The structure is predictable enough that experienced users can find what they need by navigating, not searching
- Pages are updated within one sprint of the product changing
- Deprecated content is removed on schedule

These aren't aspirational. They're measurable. If you can't measure whether documentation is working, you can't improve it systematically.
