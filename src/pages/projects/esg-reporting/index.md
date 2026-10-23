---
type: design
title: Turning ESG reporting into a self-serve workflow
navTitle: "ESG Reporting"
date: 2026-10-19
thumbnail: './cover.svg'
summary: Self-serve ESG reports for fund managers to find, share and generate
role: Principal Designer. I led research and UX, and built most of the front end.
period: 2025 – present
tools: Figma, React, TypeScript, Power BI Embedded, Playwright
---

## Context

Evora's clients, real estate fund and asset managers, owe investors and regulators a stack of sustainability reports every year: GRESB, INREV, EPRA, GHG, net zero and bespoke packs. These used to arrive from consultants as PDFs and Power BI files in email threads. The platform needed one place to find, trust, share and eventually generate them.

<!-- TODO (Marius): add one or two research findings here, e.g. what you heard in interviews about how clients found reports before. A quote works well. -->

## The problem

- **Volume:** 10 report types and five frequencies, from monthly to one-off.
- **Versions:** a GRESB submission goes through several drafts, and opening the wrong one in a board meeting is a real risk.
- **Access:** fund data can't leak between teams, yet consultants, asset managers and executives need different access to the same report.

## Report library

<div class="shot-placeholder">Screenshot: report library with the pinned favourites bar, "in progress" bar and filters</div>

A dense, sortable table with filters and search. Filters live in the URL, so a filtered view can be bookmarked or shared. Above it sit **Favourite reports** and **Reports in progress**.

<div class="callout">

**Cap favourites at four.** Without a limit, favourites become a second, worse library. Pinning a fifth shows a toast explaining why.

</div>

Each report page renders the file in place (PDFs inline, Power BI embedded with silent token refresh) with tabs for:

- **Version history**, with live processing state and failed uploads marked as failed, not left spinning.
- **Access**: owner, editor, viewer or no access, plus a change-owner flow that doesn't need a support ticket.
- **Upload**, a three-step dialog where access is set at upload, so nothing is briefly visible to the wrong people.

## Guided report builder

<div class="shot-placeholder">Screenshot: Generate Report wizard, "View Metrics" step showing the data completeness table</div>

Clients can now generate INREV and EPRA reports themselves. The choices are hard to undo, so it's a five-step wizard:

<ol class="flow">
  <li><strong>Report details</strong>Framework, period and name.</li>
  <li><strong>Fund selection</strong>One fund per report, stated up front.</li>
  <li><strong>Confirm parameters</strong>Assets and sector breakdown, so surprises surface before generation.</li>
  <li><strong>View metrics</strong>Data completeness per meter: actual, calculated, estimated and missing.</li>
  <li><strong>Summary tables</strong>Final review with explicit confirmation, as generation can't be undone.</li>
</ol>

<div class="callout">

**Show data quality before the report, not inside it.** Missing or estimated data is the most common reason a report gets challenged. Step 4 shows it while the fund manager can still fix it, not when an investor asks.

</div>

Drafts can be saved, because this task is often paused to chase a missing meter reading.

## Details that build trust

- Layout-matched skeleton loaders and breadcrumbs instead of spinners and ad hoc back links.
- First-party usage analytics showing which reports and filters people actually use.
- Playwright smoke tests against production after every deploy.

<!-- TODO (Marius): outcome. Anything measurable: reports moved off email, % of clients using favourites, generation time vs the consultant-led process, fewer "where's the latest version" support tickets. -->
