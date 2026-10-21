---
type: design
title: Dashboards that know who's looking
date: 2026-09-30
thumbnail: './cover.png'
summary: Rebuilding the Analysis area of Evora's ESG platform around embedded Power BI dashboards, with per-organisation access, an analyst mode for internal staff, and data scoped to each client.
role: Principal Designer. I owned the UX and front end, and contributed to the API.
period: 2025 – 2026
tools: Figma, React, TypeScript, Power BI Embedded
---

## Context

The first version of the platform's Analysis area was a set of native React charts: carbon emissions by scope, EPC rating distribution, green building certificate coverage, utility consumption with variance, and data quality. I designed and built parts of it. They worked, but every new chart meant a design-and-build cycle, while Evora's analysts could build new views in Power BI far faster.

The team decided to **retire the hand-built charts** and make the Analysis area a curated, secure home for Power BI dashboards. That way the analysts who understand the data could publish insight directly, and the product's job became distribution, access and trust.

## The problem

Embedding a dashboard is easy. Embedding the **right** dashboard, for the **right** person, showing **only their data**, is the actual product. It needed:

- clients to see only dashboards published to their organisation, and only their own data inside them
- Evora analysts to publish, configure and troubleshoot dashboards across every client
- some way to handle dashboards breaking, because embedded content fails in ways the host app can't always control

## What I designed and built

### Two audiences, one interface

<div class="shot-placeholder">Screenshot: dashboard gallery with the analyst mode banner active</div>

Clients see a searchable gallery of dashboard cards with "last refreshed" dates. Evora analysts see the same gallery plus an **analyst mode** toggle. Rather than building a separate admin tool, analyst mode adds management controls to the page the client sees.

<div class="callout">

**Decision: make elevated power impossible to miss.** When analyst mode is on, a persistent amber banner reads "Analyst mode active: you can now manage dashboard configurations and access settings across all organizations." Analysts work inside the client's view, so the risk is forgetting you are holding admin powers. The banner fixes that without adding a confirmation dialog to every action.

</div>

In analyst mode, each dashboard has an access setting per organisation: **all users**, **admins only** or **no access**. Analysts can publish new dashboards and remove ones whose Power BI source has gone missing. Those are flagged with a warning icon instead of failing to load.

### Data that's scoped to the viewer

Access to the page isn't enough. A shared dashboard template must only ever show the viewer's own portfolio. I worked with back-end engineers to apply **row-level security** from the user's identity, so one dashboard can safely serve every client. I made that change in the API alongside the front end.

Entry to Analysis itself moved from front-end feature flags to **back-end entitlements**, so whether a client has the module is a decision the server enforces, not just one the UI hides.

### Failing gracefully

<div class="shot-placeholder">Screenshot: embedded dashboard with the "Invalid filters" toast</div>

Power BI filters break silently when a dataset changes underneath them: a visual just shows nothing. The embedded viewer now checks the filters on every visual and raises an **Invalid filters** toast that names the problem. A blank chart reads as "no data", which in ESG is a very different message from "broken filter".

Card skeletons load in the final grid shape, so the gallery doesn't jump as dashboards arrive.

## Impact

<div class="stats">
  <div><strong>~6,900</strong><span>lines of bespoke chart code retired across 66 files</span></div>
  <div><strong>0</strong><span>front-end releases needed to publish a new dashboard</span></div>
</div>

A new view used to mean a design, build and release cycle. Now an analyst publishes it from the gallery and sets who can see it, and the product team's time goes into the platform instead of individual charts.

<!-- TODO (Marius): add usage if you can get it, e.g. number of dashboards published, dashboard views per month (Power BI usage metrics or the usage-events data), or how long analysts now take to ship a view. -->

## Trade-offs

Retiring native charts cost us some visual consistency, since Power BI doesn't use our design system. We accepted that in exchange for analyst velocity, and kept the frame around each embed (navigation, search, states and messages) fully on-system.

## What I'd do next

- Use the analytics events we now collect to show analysts which dashboards are opened, and which are never looked at.
- Let clients subscribe to a dashboard and be told when its data refreshes, instead of checking "last refreshed".
