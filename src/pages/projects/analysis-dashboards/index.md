---
type: design
title: Dashboards that know who's looking
navTitle: "PowerBI Dashboards"
date: 2026-09-30
thumbnail: './cover.svg'
summary: Power BI dashboards in Evora's ESG platform, scoped to each client
role: Principal Designer. I owned the UX and front end, and contributed to the API.
period: 2025 – 2026
tools: Figma, React, TypeScript, Power BI Embedded
---

## Context

The first Analysis area was a set of native React charts, parts of which I designed and built. Every new chart meant a design-and-build cycle, while Evora's analysts could build views in Power BI far faster. We retired the hand-built charts and made Analysis a secure home for Power BI dashboards: analysts publish insight, the product handles distribution, access and trust.

## The problem

Embedding a dashboard is easy. Showing the **right** dashboard to the **right** person, with **only their data**, is the product. Analysts also needed to manage dashboards across every client, and broken embeds had to be handled.

## Two audiences, one interface

<div class="shot-placeholder">Screenshot: dashboard gallery with the analyst mode banner active</div>

Clients see a searchable gallery with "last refreshed" dates. Analysts get the same gallery plus an **analyst mode** toggle, instead of a separate admin tool. In it they set access per organisation (all users, admins only or no access), publish dashboards, and remove ones whose source has gone missing, which are flagged rather than failing to load.

<div class="callout">

**Make elevated power impossible to miss.** Analysts work inside the client's view, so the risk is forgetting they hold admin powers. A persistent amber banner fixes that without a confirmation dialog on every action.

</div>

## Data scoped to the viewer

I worked with back-end engineers to apply **row-level security** from the user's identity, making the API change alongside the front end, so one dashboard can safely serve every client. Access to Analysis moved from front-end feature flags to **back-end entitlements**, enforced by the server rather than hidden by the UI.

## Failing gracefully

<div class="shot-placeholder">Screenshot: embedded dashboard with the "Invalid filters" toast</div>

Power BI filters break silently when a dataset changes. The viewer now checks filters on every visual and raises an **Invalid filters** toast, because in ESG a blank chart reads as "no data", not "broken filter".

## Impact

<div class="stats">
  <div><strong>~6,900</strong><span>lines of bespoke chart code retired across 66 files</span></div>
  <div><strong>0</strong><span>front-end releases needed to publish a new dashboard</span></div>
</div>

<!-- TODO (Marius): add usage if you can get it, e.g. number of dashboards published, dashboard views per month (Power BI usage metrics or the usage-events data), or how long analysts now take to ship a view. -->

**Trade-off:** Power BI doesn't use our design system, so we lost some visual consistency. We accepted that for analyst speed and kept the frame around each embed fully on-system.
