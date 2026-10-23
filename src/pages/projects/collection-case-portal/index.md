---
type: development
title: "Metry: a case workflow for data-collection agents"
navTitle: "Invoice Case Workflow"
date: 2025-01-13
thumbnail: './cover.svg'
summary: Metry's invoice cases, turning utility bills into validated readings
role: Lead front-end developer and designer. I was the top contributor and built the invoice workflow end to end.
period: 2024 – 2025
tools: React, TypeScript, react-hook-form, Jest
---

## Context

When a utility's automated feed fails, an operations agent keys in consumption from the invoice by hand, and those readings go straight into clients' carbon reports. At [Metry](https://metry.io) I designed and built the **invoice cases** in the Collection Case Portal: the queue, the case detail and the rules connecting them.

<!-- TODO (Marius): say how you worked with Metry (employee, contractor or agency) and who you worked with (product, operations, other developers). -->

## The problem

- **Volume:** every extra click is multiplied.
- **Messy inputs:** long EAN meter codes, easy to mistype, sometimes unknown.
- **Some cases can't be completed**, but the record must stay.
- **Shared queues:** ownership must be obvious.

## What I built

### A queue that supports triage

<div class="shot-placeholder">Screenshot: invoice case list with status and agent filters</div>

Filters for several statuses at once and for **unassigned cases**, so team leads spot work falling through the cracks.

<div class="callout">

**Keep the queue's state when the agent goes back.** Agents return to the list dozens of times a day; keeping filters and page saves rebuilding it every time.

</div>

### A case detail that prevents bad data

<div class="shot-placeholder">Screenshot: invoice case detail with EAN meters and a validation error</div>

- Specific errors for unknown EANs, and creating a new meter from inside the case instead of escalating.
- Several meters per invoice, and drafts.
- Reversible rejection that locks the case's fields.

### From failure to case automatically

In the admin tool, a failed automated import can become an invoice case directly, with its context, instead of an email. I added unit tests around the API calls, because a silent failure means a client's report quietly misses a month.

<!-- TODO (Marius): outcome, e.g. cases processed per week, time per case, reduction in escalations to engineering, feedback from the operations team. -->

The best UX in an operations tool is usually invisible: state that survives navigation, errors that say what to do next, and actions that can be undone.
