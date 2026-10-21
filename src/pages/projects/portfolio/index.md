---
type: design
title: Modelling a real estate portfolio people can actually maintain
date: 2026-04-14
thumbnail: './cover.png'
summary: Designing how fund managers browse and edit a five-level portfolio hierarchy (fund, property, building and spaces), with config-driven pages and forms that validate ownership, lifecycle and utilities before bad data gets in.
role: Principal Designer. I led the UX, built most of the front end, and contributed to the API and its validation rules.
period: 2026
tools: Figma, React, TypeScript, react-hook-form, zod
---

## Context

Every number in an ESG report rests on the portfolio: which buildings a fund owns, what share of them, how big they are, what they're used for and which utilities they consume. If the portfolio data is wrong, every carbon intensity and GRESB score built on it is wrong too.

The platform was moving to a new portfolio data model. My job was to make that model something a fund manager could browse, understand and keep up to date.

## The problem

Real estate portfolios are not a neat tree:

- **Five kinds of entity:** investment entities (funds), properties, buildings, internal spaces and external spaces, each with different attributes.
- **Shared ownership:** a property can be split between several funds, and the percentages change over time.
- **Time-varying facts:** sector, occupancy, lifecycle stage (land, new construction, operational, refurbishment) and valuation all change, and reports need to know what was true in a given year.
- **High stakes, low frequency:** most people edit this data a few times a year, so the interface can't rely on them remembering how it works.

## What I designed and built

### One page pattern for five entity types

<div class="shot-placeholder">Screenshot: property detail page with detail cards and the child buildings table</div>

Instead of designing five bespoke detail pages, I designed **one detail pattern driven by configuration**: a header, a set of detail cards, and a table of the entity's children (a property lists its buildings, a building lists its spaces). Each entity type supplies its own card schema and child table.

<div class="callout">

**Decision: one pattern, configured per entity.** Users learn the page once and recognise it at every level of the hierarchy. For the team, a new attribute is a config change rather than a new screen. That mattered because the data model was still evolving while we built it.

</div>

The portfolio list filters by country, sector and managing agent, and the child tables are filterable too, so you can open a large property and quickly find one building.

### Forms that catch problems early

<div class="shot-placeholder">Screenshot: create-property form showing the tab list with error indicators</div>

Creating a property involves nine groups of information: key details, location, ownership, managing agent, financials, lifecycle, occupancy, contracts and utility setup. I split these into **tabs, each with its own error indicator**, so a validation problem on "Ownership" is visible while you're still on "Location".

- **Location** uses address autocomplete rather than free text.
- **Ownership** supports several owners, with GRESB asset IDs and percentages that are validated as you type.
- **Financials** handles valuations in GBP, USD, EUR and JPY.
- **Utility setup** records which utilities a building expects (electricity, gas, water, district heating and cooling, oil), which later drives the data-completeness checks in reporting.

<div class="callout">

**Decision: validate in both places, explain in one.** Ownership rules (records can't overlap in time, and shares can't exceed 100%) are enforced by the API and mirrored in the form. I helped write the server-side rules, then designed the form errors to state the rule in plain language rather than echoing an API error.

</div>

Sector is inherited down the hierarchy by default, so you set it once on a property and its buildings follow.

<!-- TODO (Marius): research behind this: who maintains portfolio data today (client, Evora data team?), what went wrong before, any usability testing on the tabbed form. -->

<!-- TODO (Marius): outcome. Released behind a Feature Lab flag. Who has it, and any early feedback or data-quality improvements. -->

## What I'd do next

- Bulk editing for the common annual update (new valuations, occupancy).
- A timeline view of ownership and lifecycle, so time-varying data is something you can see rather than reconstruct from rows.
