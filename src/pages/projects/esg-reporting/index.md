---
type: design
title: Turning ESG reporting into a self-serve workflow
date: 2026-10-19
thumbnail: './cover.png'
summary: A report library and a guided report builder for Evora's ESG platform, so fund managers can find, share and generate framework reports (GRESB, INREV, EPRA, GRI) without waiting on a consultant.
role: Principal Designer. I led research and UX, and built most of the front end.
period: 2025 – present
tools: Figma, React, TypeScript, Power BI Embedded, Playwright
---

## Context

Evora's clients are real estate fund and asset managers. Every year they owe their investors and regulators a stack of sustainability reports: GRESB submissions, INREV and EPRA data tables, GHG and net zero reports, and bespoke investor packs. Historically those reports came out of a consultant's inbox as PDFs and Power BI files, and lived in email threads.

The new platform needed one place where a client could **find** every report about their funds, **trust** that they were looking at the latest version, **control** who else could see it, and eventually **generate** the reports themselves.

<!-- TODO (Marius): add one or two research findings here, e.g. what you heard in interviews about how clients found reports before. A quote works well. -->

## The problem

Three things made this harder than a file browser:

- **Volume and variety.** Reports span 10 types (GRI, GRESB, EPRA, INREV, GHG, NZC, Performance, Data Strategy, Standard and Bespoke) and five frequencies, from monthly to one-off. A flat list falls apart quickly.
- **Versions matter.** A GRESB submission goes through several drafts. Opening the wrong one in a board meeting is a real risk.
- **Access is sensitive.** Fund-level data can't leak between teams, but consultants, asset managers and executives all need different levels of access to the same report.

## What I designed and built

### A library you can actually scan

<div class="shot-placeholder">Screenshot: report library with the pinned favourites bar, "in progress" bar and filters</div>

The library is a dense, sortable table with filters for report type, frequency, reporting year and author, plus search. Filters are kept in the URL, so a filtered view can be bookmarked or pasted to a colleague and opens exactly as they saw it.

Above the table sit two bars: **Favourite reports** and **Reports in progress**. I redesigned the favourites bar after the first release.

<div class="callout">

**Decision: cap favourites at four.** Without a limit, a favourites bar slowly becomes a second, worse library. Four keeps it to "the reports I open every week". When you try to pin a fifth, an inline toast explains the limit instead of failing silently.

</div>

### One page per report

Each report has a detail page that renders the file in place: PDFs inline, and Power BI reports embedded live with silent token refresh, so a long session doesn't expire mid-review. Tabs separate **Details**, **Version history** and **Access**.

- **Version history.** Uploading a new version shows its processing state live. If processing fails, the version is marked as failed rather than left spinning forever.
- **Access.** Four levels: owner, editor, viewer and no access. There is a dedicated change-owner flow, so handing a report over when someone leaves a team doesn't need a support ticket.
- **Upload.** A three-step dialog (file, report details, access) that accepts PDF, Excel, images, text and Power BI files up to 100 MB. Access is set at upload time, so nothing is ever briefly visible to the wrong people.

### A guided report builder

<div class="shot-placeholder">Screenshot: Generate Report wizard, "View Metrics" step showing the data completeness table</div>

The bigger shift was letting clients **generate** INREV and EPRA reports themselves. Generating a report involves a set of choices that are hard to undo, so I designed it as a five-step wizard:

<ol class="flow">
  <li><strong>Report details</strong>Pick the framework (INREV or EPRA), the period and a name.</li>
  <li><strong>Fund selection</strong>One fund per report. The rule is stated up front rather than shown as an error later.</li>
  <li><strong>Confirm parameters</strong>The asset list and sector breakdown the report will be built from, so surprises surface before generation, not after.</li>
  <li><strong>View metrics</strong>Data completeness per meter: actual, calculated, supplier-estimated and missing, with floor area and last-collected date.</li>
  <li><strong>Summary tables</strong>A final review with an explicit confirmation, because generating the tables can't be undone.</li>
</ol>

<div class="callout">

**Decision: show data quality before the report, not inside it.** The most common reason a framework report gets challenged is missing or estimated data. Putting a completeness breakdown in step 4 means a fund manager sees how much of their data is estimated while they can still fix it, not when an investor asks.

</div>

Progress is saved as a draft with **Save & close**, because this task is often paused to chase a missing meter reading.

## Details that build trust

- Skeleton loaders that match the final layout replaced spinning logos, so the page doesn't jump when data arrives.
- Breadcrumbs replaced ad hoc "Back to…" links, giving every report a stable place in the navigation.
- First-party usage analytics (page views, searches, filters applied, cards opened) let us see which reports and filters people actually use, instead of guessing.
- Playwright smoke tests run against production after every deploy, so a broken report viewer is caught by us and not by a client.

<!-- TODO (Marius): outcome. Anything measurable: reports moved off email, % of clients using favourites, generation time vs the consultant-led process, fewer "where's the latest version" support tickets. -->

## What I'd do next

- Use the analytics we now collect to rank the library by what each user opens most, rather than by date.
- Extend the builder beyond INREV and EPRA to GRESB, where the payoff is biggest and the rules are most complex.
