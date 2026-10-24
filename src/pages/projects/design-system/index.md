---
type: [design, development]
title: One design system for every Evora product
navTitle: "Design System"
date: 2026-10-15
thumbnail: './cover.svg'
summary: A documented React component library shared across Evora's products
role: Principal Designer and lead contributor. I wrote about 60% of the library and owned the core organisms and the documentation pipeline.
period: 2023 – present
tools: Figma, React, TypeScript, Tailwind 4, Radix UI, Storybook, Chromatic
---

## Context

The new platform started with a local UI kit inside the main app. When an internal admin console arrived, components began to be copied between repos and drift. I turned the kit into a versioned, documented package that every app installs.

<div class="stats">
  <div><strong>45</strong><span>composable components</span></div>
  <div><strong>218</strong><span>Storybook stories</span></div>
  <div><strong>3</strong><span>apps built on it</span></div>
  <div><strong>60%</strong><span>written by me</span></div>
</div>

## Extract, don't rewrite

I moved components out in small, reviewable steps, keeping existing APIs where possible so the app could switch one import at a time.

## Tokens for the domain

<div class="shot-placeholder">Screenshot: Storybook "Theme / Colours" page</div>

Semantic CSS variables exposed through a Tailwind preset, plus tokens for sustainability data: an **EPC rating scale (A to G)**, an eight-colour chart palette, per-product brand tokens (SIERA, Metry), and Evora's palette ramps from the 2023 rebrand I implemented.

## The organisms

- **DataTable:** sticky columns, pinned totals, URL-synced filters and pagination, and typed cells so formatting is consistent everywhere.
- **Sidebar and Topbar:** the shared app shell, including the organisation switcher.
- **TimeTrackedField:** values that change over time, such as occupancy, with dated entries and validation. The portfolio model needed it and no library offered it.

<div class="callout">

**Build on Radix primitives.** Keyboard support and focus management come from a well-tested base, so a small team could spend its time on domain-specific data components.

</div>

## Documentation

Every component has Storybook stories published to Chromatic on each change, so visual changes can be reviewed in a pull request. I set up that pipeline and the release workflows, and moved the library to Tailwind 4.

## Outcome

<div class="stats">
  <div><strong>8,375</strong><span>lines of UI (70 files) moved out of the client app into the shared library</span></div>
  <div><strong>56</strong><span>releases in 13 months, roughly one a week</span></div>
  <div><strong>130</strong><span>files in the client app built on it</span></div>
  <div><strong>88%</strong><span>of the admin console's React files import it</span></div>
</div>

The client platform, the admin console (which I started from scratch on the library) and an access management platform all run on it, so they behave like one product.

<!-- TODO (Marius): adoption or speed evidence, e.g. "the admin console's first release took N weeks", or the number of engineers contributing to the library. -->
