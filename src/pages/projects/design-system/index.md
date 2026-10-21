---
type: development
title: One design system for every Evora product
date: 2026-10-15
thumbnail: './cover.png'
summary: Extracting a shared, documented React component library from the main ESG app and rolling it out across the client platform and the internal admin console, with tokens built for sustainability data.
role: Principal Designer and lead contributor. I wrote about 60% of the library and owned the core organisms and the documentation pipeline.
period: 2025 – present
tools: Figma, React, TypeScript, Tailwind 4, Radix UI, Storybook, Chromatic
---

## Context

Evora's new platform started with a local UI kit inside the main app. That worked until a second product arrived: an internal admin console for managing users, organisations and access. Components began to get copied between repos, and copies drift.

I set out to turn the local kit into a proper design system: a versioned package that every app installs, documented well enough that engineers can use it without asking me.

<div class="stats">
  <div><strong>45</strong><span>components, from atoms to organisms</span></div>
  <div><strong>218</strong><span>documented Storybook stories</span></div>
  <div><strong>3</strong><span>apps built on it</span></div>
  <div><strong>~60%</strong><span>of the library written by me</span></div>
</div>

## Approach

### Extract, don't rewrite

I moved components out of the main app in a series of small, reviewable steps rather than one big-bang rewrite. Each component kept its existing API where it could, so the app could switch over one import at a time. The library follows atomic design: 17 atoms, 24 molecules and 4 organisms.

### Tokens for the domain, not just the brand

<div class="shot-placeholder">Screenshot: Storybook "Theme / Colours" page</div>

The token layer is semantic CSS variables (primary, neutral, positive, destructive, informative and status) exposed through a Tailwind preset, so apps use `bg-primary` rather than raw hex values. On top of that sit tokens specific to sustainability data:

- **An EPC rating scale (A to G),** so energy certificates look the same in every table, card and chart.
- **An eight-colour chart palette** for categorical data.
- **Brand tokens** for each product (SIERA, Metry), so one library can serve products with different identities.
- **Evora's palette ramps** (deep ocean, forest, foliage, nature and sand), carried over from the 2023 rebrand I implemented in the previous platform.

### The organisms that carry the product

Most of my time went into the four components that hold the product together:

- **DataTable.** The platform is mostly tables. I added sticky columns, a pinned header and footer for totals, fixed-width columns with sensible minimum widths, URL-synced filters and pagination, and dedicated cell types for dates, numbers, links and strings so formatting is consistent everywhere.
- **Sidebar and Topbar.** The shared app shell, including the organisation switcher.
- **TimeTrackedField.** A field for values that change over time, such as a building's occupancy or floor area, where each entry has a start and end date. It validates that dates aren't in the future and that consecutive entries actually differ. This is a pattern the portfolio model needed and no off-the-shelf library offered.

<div class="callout">

**Decision: build on Radix primitives.** Menus, dialogs, popovers and selects are built on Radix UI, so keyboard support and focus management come from a well-tested base rather than from us. That let a small team spend its time on the data components that are unique to our domain.

</div>

### Documentation as the interface

Every component has Storybook stories covering its states, published automatically to Chromatic on each change. Chromatic gives engineers and product managers a link to review visual changes in a pull request before they ship. I set up that pipeline along with the PR build and release workflows, and moved the library to Tailwind 4.

## Outcome

<div class="stats">
  <div><strong>8,375</strong><span>lines of UI (70 files) moved out of the client app into the shared library</span></div>
  <div><strong>56</strong><span>releases in 13 months, roughly one a week</span></div>
  <div><strong>130</strong><span>files in the client app built on it</span></div>
  <div><strong>88%</strong><span>of the admin console's React files import it</span></div>
</div>

- The client platform and the internal admin console both run on the system, along with a later access-management prototype, so they look and behave like one product.
- I started the admin console from scratch on top of the library, so its screens are assembled from shared components rather than one-off UI.

<!-- TODO (Marius): adoption or speed evidence, e.g. "the admin console's first release took N weeks", or the number of engineers contributing to the library. -->

## What I'd improve

- **Accessibility audit.** We rely on Radix for the basics, but data tables and custom charts need a proper audit with screen-reader testing.
- **Dark mode.** The config supports it, but no dark theme has been designed yet.
- **Tests.** Visual regression is covered by Chromatic. Interaction tests in Storybook are the next step.
