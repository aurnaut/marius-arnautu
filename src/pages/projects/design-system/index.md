---
type: [design, development]
title: One design system for every Evora product
navTitle: "Design System"
date: 2026-10-15
thumbnail: "./cover.svg"
summary: Three apps that look and behave like one product
role: Principal Designer and lead contributor.
period: 2023 – present
tools: Figma, React, TypeScript, npm package, Tailwind 4, Radix UI, Storybook, Chromatic
---

## Context

The new platform started with a local UI kit inside the main app. When an internal admin console arrived, components began to be copied between repos and drift, so the same action could look and behave differently from one app to the next. I turned the kit into a versioned, documented package that every app installs.

<div class="bleed only-light">

![The library's components on light cards in a masonry grid: a data table of assets with EPC ratings across the top, then a date picker, multi-select, tooltip, buttons, stepper, switch and checkbox, timeline, tabs, select, autocomplete, badges, loading states and a month range picker](./components-grid.png)

</div>

<div class="bleed only-dark">

![The library's components on dark cards in a masonry grid: a data table of assets with EPC ratings across the top, then a date picker, multi-select, tooltip, buttons, stepper, switch and checkbox, timeline, tabs, select, autocomplete, badges, loading states and a month range picker](./components-grid-dark.png)

</div>

<video class="bleed" src="/projects/design-system/ds-reel.webm" aria-label="The library's components rise into place in a wave across the grid. The camera closes in on the data table, where every row is selected and sorted by EPC rating, then steps through the stepper and publishes a report with a success toast" controls autoplay muted loop playsinline preload="metadata"></video>

## Move components out, then import them

I moved components out in small, reviewable steps, keeping existing APIs where possible so the app could switch one import at a time.

<div class="callout">

**Add a component once a second app needs it.** Anything tied to one product, such as the CCP's invoice form, stays in that app, so the library stays small and general.

</div>

## Tokens for the domain

I set up the tokens as Figma variables for colour, spacing and sizing, in two layers:

- **Primitives:** the raw values, such as Evora's palette ramps.
- **Semantic tokens:** what each value is for, such as background, border or destructive. Components use these, and each one has a **light** and a **dark** mode, with text contrast checked against WCAG AA in both.

In code they become CSS variables, exposed through a Tailwind preset.

<div class="diagram diagram--flow" role="img" aria-label="Tokens flow in three steps. Colour primitives such as light-blue-100, neutral-100 and error-100, and size primitives such as space-8, space-16 and radius-8, feed semantic tokens such as background, border, destructive, padding-input, gap-section and radius. The colour tokens have a light and a dark value. Components such as the button, input and data table use only the semantic tokens.">
<div class="diagram__box"><span class="diagram__label">Primitives</span><span class="diagram__chip">light-blue-100</span><span class="diagram__chip">neutral-100</span><span class="diagram__chip">error-100</span><span class="diagram__chip">space-8</span><span class="diagram__chip">space-16</span><span class="diagram__chip">radius-8</span></div>
<div class="diagram__arrow" aria-hidden="true">→</div>
<div class="diagram__box"><span class="diagram__label">Semantic</span><span class="diagram__chip">background</span><span class="diagram__chip">border</span><span class="diagram__chip">destructive</span><span class="diagram__chip">padding-input</span><span class="diagram__chip">gap-section</span><span class="diagram__chip">radius</span><span class="diagram__note">Colours in light and dark</span></div>
<div class="diagram__arrow" aria-hidden="true">→</div>
<div class="diagram__box"><span class="diagram__label">Components</span><span class="diagram__chip">Button</span><span class="diagram__chip">Input</span><span class="diagram__chip">Data table</span></div>
</div>

## Figma and code match

The Figma library mirrors the code: the same component names, the same structure and the same tokens. What a designer draws is what a developer imports.

## Small pieces, bigger components

Simple components such as checkboxes, buttons and menus combine into larger ones. The **data table** is built from them, adding sticky columns, filters you can share as a link, and the same formatting in every app.

<div class="callout">

**Build on Radix primitives.** Keyboard support and focus management come from a well-tested base, so a small team could spend its time on domain-specific data components.

</div>

## Documentation

Every component is published to Storybook, so anyone in the company can see what already exists without opening the code. New features start from the same building blocks, and everyone calls them by the same names. Chromatic flags any visual change before it ships.

## Outcome

<div class="stats">
  <div><strong>3</strong><span>apps built on it</span></div>
  <div><strong>45</strong><span>composable components</span></div>
  <div><strong>56</strong><span>releases in 12 months</span></div>
  <div><strong>8,375</strong><span>lines of UI moved out</span></div>
</div>

The client platform, the admin console and the [Collection Case Portal (CCP)](/projects/collection-case-portal/) all run on it, so they behave like one product.

The admin console and the CCP had the library from day one. In the admin console, the first screen, a list of users, was built the day after the library was installed.

<div class="bleed only-wide">

![Three apps built on the design system, stacked in browser windows over bands of their brand colours: the EVORA Admin Portal's user list in green, the Collection Case Portal's invoice queue in Metry purple, and EVORA Analytics' reporting page in Evora teal, all sharing the same sidebar, top bar, header and data table](./apps-hero.png)

</div>

<div class="bleed only-narrow">

![Close-up of the same app shell in three products: the EVORA Admin Portal in green, the Collection Case Portal in Metry purple and EVORA Analytics in Evora teal, each with the shared sidebar, top bar and page header](./app-shells-close-up.png)

</div>

A design system pays off when it is the easiest way to build: if the right component already exists, nobody draws a new one.
