---
type: design
title: "SIERA: ESG analytics for fund managers, and a rebrand"
date: 2024-04-29
thumbnail: './cover.png'
summary: From 2019 to 2024, designing and building SIERA, Evora's original ESG platform, covering fund dashboards, data quality, net zero pathways and EPC tracking, and leading the front-end side of the 2023 Evora rebrand.
role: Principal Designer (UX Designer / Developer until 2021). I designed features and built them on a large engineering team.
period: 2019 – 2024
tools: Figma, Adobe XD, Axure, React, Chart.js, Sass, Storybook, Hotjar, Pendo
---

## Context

SIERA was Evora Global's ESG data platform for real estate investors. Fund and asset managers used it to track energy and carbon across their portfolios, follow progress against net zero targets, and prepare for frameworks such as GRESB, SFDR and Energy Star.

I joined in 2019 as a UX designer and developer. I maintained the legacy Ext.js product and built its new React data-visualisation module. In 2021 I became Principal Designer, responsible for the design direction of the product. I also set up Pendo and Hotjar so design decisions could be checked against real behaviour.

## Analytics that answer a fund manager's questions

<div class="shot-placeholder">Screenshot: fund dashboard or asset passport</div>

I designed and built across the core analytics:

- **Fund dashboards and fund performance.** Consumption and carbon over time, with column headers coloured by whether an asset is on or off track against its target.
- **Data quality.** One shared component for fund and asset views showing coverage and completeness. ESG figures are only credible when you can see how much of them is estimated.
- **Net zero carbon pathways.** A fund's carbon intensity plotted against a science-based 1.5°C pathway, a business-as-usual line and the fund's own target pathway, with the year the asset becomes **stranded**: the point where business-as-usual crosses the decarbonisation pathway.
- **EPC tracking.** Energy Performance Certificate ratings per asset and across the portfolio.

<div class="shot-placeholder">Screenshot: net zero pathway chart (fund carbon intensity vs 1.5°C pathway, business-as-usual, target pathway and stranding year)</div>

<div class="callout">

**Decision: lead with "when", not "how much".** Comparing three lines is work. Marking the stranding year turns a chart into an answer: *this asset becomes a stranded risk in 2031 unless we act.*

</div>

<!-- TODO (Marius): check the callout above matches what actually happened, or swap in a real research insight. -->

Throughout, I added shimmer loading states, kept users' filter and sort choices as they moved around the product, and wrote some of the first component tests in the codebase.

## Rebranding a live product

In 2023 Evora rebranded, with a new palette (deep ocean, forest, foliage, nature and sand) and a new identity. SIERA had grown for years with colours hard-coded across the codebase.

<ol class="flow">
  <li><strong>Centralise</strong>I moved every colour into one Sass variables file and exported it to JavaScript, so charts and styles used the same values.</li>
  <li><strong>Map</strong>I mapped each legacy colour (greys, blues, reds and greens) onto the new brand palette, deciding where an old colour carried meaning and where it was only decoration.</li>
  <li><strong>Replace</strong>I swept the codebase, replacing hard-coded hex and RGB values with variables and recolouring the SVG icon set.</li>
  <li><strong>Protect</strong>I added an SVG-sprite Icon component and Storybook atoms (buttons, tooltips, timelines), so new work used the system by default.</li>
</ol>

<div class="stats">
  <div><strong>&lt;3 weeks</strong><span>from the first rebrand commit to the last (June–July 2023)</span></div>
  <div><strong>256</strong><span>files updated across 34 commits</span></div>
  <div><strong>98%</strong><span>of hard-coded colours removed, from 247 lines to 5</span></div>
  <div><strong>1</strong><span>source of truth for colour, shared by Sass and JavaScript</span></div>
</div>

The variables file I'd built became the single source of truth for SIERA's colour, and its palette was later carried into the new platform's design system.

## What it taught me

SIERA had a large team and a long history. Working on it taught me how to land design changes in a codebase I didn't own alone: small reviewable steps, systems before screens, and tests that guard the parts people depend on. Those lessons shaped how I approached the [design system](/projects/design-system/) for the new platform.
