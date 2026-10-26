---
type: design
title: Dashboards that know who's looking
navTitle: "Power BI Dashboards"
date: 2026-09-30
thumbnail: "./cover.svg"
summary: Power BI dashboards in Evora's ESG platform, published by analysts and scoped to each client
role: Principal Designer. I led the UX and front end, and worked with the back-end engineers on row-level security and access entitlements.
period: 2025 – 2026
tools: Figma, Evora design system, React, TypeScript, Power BI Embedded
---

## Context

The first Analysis area was a set of native React charts, parts of which I designed and built. Every new chart had to be designed, built and released, so clients could only get answers as fast as our roadmap allowed, while Evora's analysts could build the same views in Power BI far faster.

## The decision

Most of the value in Analysis came from Evora's analysts and their ESG expertise rather than from the charts themselves, and Power BI was already better at charting than anything we would build. We migrated every hand-built chart to Power BI, retired the React versions and turned Analysis into Dashboards, the place where analysts publish their work to clients. Analysts look after the insight, and the platform looks after who can see it and whether they can trust it.

Embedding a Power BI report is straightforward. Most of the work went into making sure each person sees only the dashboards meant for them, filtered to their own organisation's data. We had three requirements:

- **Speed:** publishing a new dashboard shouldn't need a release.
- **Scale:** a single dashboard should serve every client, rather than a copy for each.
- **Control:** analysts should be able to manage access across all clients themselves.

## Two audiences, one interface

<div class="bleed only-wide">

![The Dashboards gallery in analyst mode: an amber banner under the top bar reads "Analyst mode active", the Analyst mode toggle is on, and twelve dashboard cards each show their author and status. One card shows its Manage button, one is a Draft not yet published, and one, flagged Missing with a warning and a delete button, is greyed out](./gallery-hero.png)

</div>

<div class="bleed only-narrow">

![Close-up of the gallery in analyst mode: the amber "Analyst mode active" banner above the first two dashboard cards, each with its author and an Available badge, and a Manage button on the second](./gallery-close-up.png)

</div>

Clients see a searchable gallery of the dashboards their organisation has access to. Analysts use the same gallery with an **analyst mode** toggle switched on. We chose this over building a separate admin tool, so analysts publish from the same view the client will see, and we only have one interface to design, build and support.

<div class="callout">

**Make elevated power impossible to miss.** Analysts work inside the client's view, so the risk is forgetting they hold admin powers. A persistent amber banner fixes that without a confirmation dialog on every action.

</div>

## From Power BI to the client

Analysts build their reports in Power BI and upload them to a shared Power BI workspace. Each report in the workspace appears in the gallery as a draft, which only analysts can see in analyst mode. The analyst responsible then publishes it to one or more organisations and chooses who in each one can see it.

<div class="diagram diagram--flow" role="img" aria-label="Publishing happens in three steps. An analyst builds a report in Power BI and uploads it to the shared workspace. It appears in the gallery as a draft, visible only in analyst mode. The analyst publishes it, setting access for each organisation to All, Admin only or None.">
<div class="diagram__box"><span class="diagram__label">Power BI</span><span class="diagram__note">An analyst builds a report and uploads it to the shared workspace</span></div>
<div class="diagram__arrow" aria-hidden="true">→</div>
<div class="diagram__box"><span class="diagram__label">Draft</span><span class="diagram__note">It appears in the gallery, visible only in analyst mode</span></div>
<div class="diagram__arrow" aria-hidden="true">→</div>
<div class="diagram__box"><span class="diagram__label">Published</span><span class="diagram__chip">All</span><span class="diagram__chip">Admin only</span><span class="diagram__chip">None</span><span class="diagram__note">Access set for each organisation</span></div>
</div>

<video class="bleed" src="/projects/analysis-dashboards/dashboards-publish-flow.webm" aria-label="An analyst switches on analyst mode: an amber banner appears, the organisation switcher blanks, and a draft and a missing dashboard join the gallery. They open Manage on the Energy Cost Volatility draft and publish it, then open Manage again, search the Access tab for Northwind Demo and set it to All. Switching analyst mode off returns to Northwind Demo's gallery, where the new dashboard now appears" controls autoplay muted loop playsinline preload="metadata"></video>

If someone deletes a report from the workspace, its dashboard is flagged as Missing in analyst mode, with a button to remove it from the gallery.

<div class="bleed only-wide">

![The Manage Dashboard dialog on two tabs. At the back, Details: the dashboard's title, description, author and status. In front, Access: a searchable list of organisations, each set to All, Admin only or None](./manage-hero.png)

</div>

<div class="bleed only-narrow">

![Close-up of the Access tab: organisations listed with their dashboard access, two set to All, one to Admin only and one to None](./manage-close-up.png)

</div>

Each organisation can be given access for all users, admins only or nobody. The admins-only level means a new dashboard can be tried out with a client's admins before the rest of their team sees it.

We also moved access to the Dashboards area itself from front-end feature flags to **back-end entitlements**. Previously the UI hid the area from clients who didn't have it. Now the server checks on every request, so the business can grant it to each client knowing it's actually enforced.

## One dashboard, every client

The simpler option would have been a copy of each dashboard for every client, but then every fix has to be repeated in each copy, and each copy is another chance to show one client someone else's data.

Instead, I worked with the back-end engineers on **row-level security** based on the signed-in user, and made the API changes alongside the front end. Analysts build a dashboard once, each client only sees their own data in it, and a new dashboard is available to each organisation it's published to straight away.

<div class="diagram diagram--flow" role="img" aria-label="One dashboard serves every client. The Portfolio Energy Intensity dashboard is built once in Power BI. Row-level security filters its data by the signed-in user's organisation. Northwind Demo, Contoso Real Estate and Fabrikam Property each see the same dashboard with only their own assets.">
<div class="diagram__box"><span class="diagram__label">One dashboard</span><span class="diagram__chip">Portfolio Energy Intensity</span><span class="diagram__note">Built once in Power BI</span></div>
<div class="diagram__arrow" aria-hidden="true">→</div>
<div class="diagram__box"><span class="diagram__label">Row-level security</span><span class="diagram__note">Filters the data by the signed-in user's organisation</span></div>
<div class="diagram__arrow" aria-hidden="true">→</div>
<div class="diagram__box"><span class="diagram__label">Each organisation</span><span class="diagram__chip">Northwind Demo</span><span class="diagram__chip">Contoso Real Estate</span><span class="diagram__chip">Fabrikam Property</span><span class="diagram__note">Sees only its own assets</span></div>
</div>

<div class="bleed only-wide">

![A dashboard open in the viewer for the Northwind Demo organisation: the page header gives its title, description and author, and below it the embedded Power BI report shows Fund, Region and Asset type filters, four KPIs, energy use intensity by month against last year, intensity by asset type against a benchmark, and the highest-intensity assets](./viewer-hero.png)

</div>

<div class="bleed only-narrow">

![Close-up of the viewer: the dashboard's title, description and author above the embedded report's KPIs and the start of its monthly chart](./viewer-close-up.png)

</div>

## Outcome

<div class="stats">
  <div><strong>0</strong><span>releases needed to get a new dashboard in front of clients</span></div>
  <div><strong>1</strong><span>version of each dashboard serves every client, each seeing only their own data</span></div>
  <div><strong>2</strong><span>audiences, clients and analysts, working in the same gallery</span></div>
  <div><strong>3</strong><span>access levels for each client, including an admins-only preview</span></div>
</div>

Analysts can now get new analysis in front of clients without waiting for a slot on the engineering roadmap, and the team no longer maintains around 6,900 lines of bespoke chart code.

**Trade-off:** Power BI doesn't use our design system, so the charts inside the embed don't fully match the rest of the platform. We accepted that because it let analysts answer clients' questions far faster, and kept everything around the embed on-system.
