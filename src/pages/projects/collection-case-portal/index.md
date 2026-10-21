---
type: development
title: A case workflow for data-collection agents
date: 2025-01-13
thumbnail: './cover.png'
summary: Designing and building the invoice case workflow in an internal operations tool, where agents turn utility invoices into validated meter readings, with a work queue, assignment, rejection and confident error handling.
role: Lead front-end developer and designer. I was the top contributor and built the invoice workflow end to end.
period: Oct 2024 – Jan 2025
tools: React, TypeScript, react-hook-form, Jest
---

## Context

Not every utility supplier sends data automatically. When an automated feed fails, or a meter only exists on paper, an **operations agent** has to step in. They take the utility invoice, find the meter it belongs to, and key in the consumption by hand. Those readings flow straight into clients' carbon and energy reports, so accuracy matters.

Agents worked from the Collection Case Portal, an internal case-management tool. My work was to design and build its **invoice cases**: the queue, the case detail and the rules connecting them. I also added a way for failed automated imports to become invoice cases automatically in the admin tool.

## The problem

- **Volume.** Agents work through cases in bulk, so every extra click is multiplied.
- **Messy inputs.** Invoices list meters by their EAN (European Article Number) codes. These are long, easy to mistype, and sometimes refer to meters our system doesn't know about yet.
- **Not every case can be completed.** Some invoices are unreadable or belong to the wrong client. Agents need a clean way to say "no" without losing the record.
- **Shared queues.** Several agents work the same queue, so it has to be obvious who owns what.

## What I built

### A queue that supports triage

<div class="shot-placeholder">Screenshot: invoice case list with status and agent filters</div>

The case list can be sorted and filtered, including by several statuses at once and by **unassigned cases**, which is how a team lead spots work that's falling through the cracks. Filters can be reset in one action. Going back from a case returns you to the list **exactly as you left it**, with the same filters and the same page.

<div class="callout">

**Decision: keep the queue's state when the agent goes back.** An agent opens a case, completes it and goes back for the next one dozens of times a day. If the list resets each time, they rebuild their filters each time. Keeping the state was a small piece of engineering that saved a lot of tiny frustrations.

</div>

### A case detail that prevents bad data

<div class="shot-placeholder">Screenshot: invoice case detail with EAN meters and a validation error</div>

- **Meter matching with clear errors.** An unknown EAN gets a specific validation error rather than a generic failure. If the meter really is new, the agent can create it from inside the case instead of escalating.
- **Several meters per invoice.** Many invoices cover several meters, so agents can add extra EANs to one case.
- **Drafts.** Consumption can be saved as a draft and finished later. That way an interruption doesn't mean starting again.
- **Reject and un-reject.** Rejecting a case disables its fields, so a rejected case can't be edited by accident, but it stays reversible in case the rejection was a mistake.
- **Confirmation for destructive actions.** Deleting a case asks for confirmation first.

### From failure to case automatically

In the internal admin tool, a failed automated file import can now be turned into an invoice case directly. Problems arrive in the agents' queue with their context attached, instead of being reported by email.

I also added unit tests around the API calls, because a silent failure in this tool means a client's report quietly misses a month of data.

<!-- TODO (Marius): outcome, e.g. cases processed per week, time per case, reduction in escalations to engineering, feedback from the operations team. -->

## What I learned

The best UX in an operations tool is usually invisible: state that survives navigation, errors that say what to do next, and actions that are reversible. None of it would stand out in a portfolio screenshot, but it adds up over every case an agent handles in a day.
