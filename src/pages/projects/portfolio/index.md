---
type: design
title: Modelling a real estate portfolio people can actually maintain
navTitle: "Real Estate Model"
date: 2026-04-14
thumbnail: "./cover.svg"
summary: Editing a five-level portfolio, with forms that block bad data
role: Principal Designer. I led the UX, built most of the front end, and contributed to the API and its validation rules.
period: 2026
tools: Figma, React, TypeScript, react-hook-form, zod
---

## Context

Every number in an ESG report rests on portfolio data: which buildings a fund owns, what share, how big they are and which utilities they use. If it's wrong, every carbon intensity and GRESB score is wrong too. My job was to make the new portfolio data model something fund managers could browse and keep up to date.

## The problem

- **Five entity types:** funds, properties, buildings, internal and external spaces.
- **Shared ownership:** a property can be split between funds, with percentages that change over time.
- **Time-varying facts:** sector, occupancy, lifecycle stage and valuation change, and reports need what was true in a given year.
- **Rare edits:** most people touch this data a few times a year, so the interface can't rely on memory.

## One page pattern for five entity types

<div class="shot-placeholder">Screenshot: property detail page with detail cards and the child buildings table</div>

One configurable detail page (header, detail cards, a filterable table of children) instead of five bespoke ones.

<div class="callout">

**One pattern, configured per entity.** Users learn the page once. For the team, a new attribute is a config change, not a new screen, which mattered while the data model was still evolving.

</div>

## Forms that catch problems early

<div class="shot-placeholder">Screenshot: create-property form showing the tab list with error indicators</div>

Creating a property covers nine groups of information. I split them into **tabs with their own error indicators**, so a problem on "Ownership" is visible while you're on "Location". Ownership supports several owners with GRESB asset IDs and percentages validated as you type, and utility setup drives the data-completeness checks in reporting. Sector is inherited down the hierarchy by default.

<div class="callout">

**Validate in both places, explain in one.** Ownership rules (no overlapping periods, shares no more than 100%) are enforced by the API and mirrored in the form. I helped write the server rules, then designed errors that state the rule in plain language.

</div>

<!-- TODO (Marius): research behind this: who maintains portfolio data today (client, Evora data team?), what went wrong before, any usability testing on the tabbed form. -->

<!-- TODO (Marius): outcome. Released behind a Feature Lab flag. Who has it, and any early feedback or data-quality improvements. -->
