---
type: design
title: "SIERA: showing fund managers what their ESG numbers are made of"
navTitle: "ESG Analytics"
date: 2024-04-29
thumbnail: './cover.svg'
summary: Showing what each ESG figure is made of, across Evora's original platform
role: Principal Designer (UX Designer / Developer until 2021). I designed every feature in this case study, and built the asset dashboard and net zero modelling on a large engineering team.
period: 2019 – 2024
tools: Figma, Adobe XD, Axure, React, Chart.js, Sass, Storybook, Hotjar, Pendo
---

## Context

SIERA was Evora Global's ESG data platform for real estate investors, tracking energy, carbon and net zero targets across their funds and assets.

I joined in 2019 as a UX designer and developer, building its React data-visualisation module. From 2021, as Principal Designer, I led the design direction and set up Pendo and Hotjar to check decisions against real behaviour. I designed every feature shown here and built two of them, the asset dashboard and the net zero modelling. All of them shipped.

The screens below are rebuilt with sample data, so no client names or figures appear.

## The problem

A fund manager reporting on carbon is rarely working from complete data. Over a year, a single asset's figures are pieced together from several places:

- **Different sources:** meter readings, invoices, suppliers' own estimates, and estimates SIERA calculates to fill the gaps.
- **Landlord and tenant data:** the landlord controls some meters and tenants control others.
- **Different reference points:** a figure can be compared with a target, where one has been set, or with the previous period.

A total that hides any of this looks more certain than it is, and that matters once it reaches an investor report.

In earlier versions of SIERA, Pendo showed clients logging in, landing on the asset list and leaving. The versions in this case study set out to show what each number is made of wherever the number appears, starting from the first screen of an asset.

## Showing what each number is made of

The asset dashboard opens with one card per utility. Each bar is split into actual and gap-filled data, with the target or the previous period marked across it, so a figure that is mostly estimated looks different from one that is mostly measured.

<div class="bleed only-wide">

<div class="only-light">

![An asset dashboard in SIERA: six cards for carbon, energy intensity, electricity, gas, water and waste recycling, each with its variance against target or the previous period and a bar split into actual and gap-filled data. Below, data coverage by floor area, a data completeness bar, the action plan's status counts and a small net zero pathway chart](./dashboard-hero.png)

</div>

<div class="only-dark">

![An asset dashboard in SIERA: six cards for carbon, energy intensity, electricity, gas, water and waste recycling, each with its variance against target or the previous period and a bar split into actual and gap-filled data. Below, data coverage by floor area, a data completeness bar, the action plan's status counts and a small net zero pathway chart](./dashboard-hero-dark.png)

</div>

</div>

<div class="bleed only-narrow">

<div class="only-light">

![Close-up of the asset dashboard's cards: carbon emissions 13% below target with 88% actual and 12% gap-filled data, energy intensity 12.6% above the previous period, and electricity and gas with their own splits, above the data coverage and completeness cards](./dashboard-close-up.png)

</div>

<div class="only-dark">

![Close-up of the asset dashboard's cards: carbon emissions 13% below target with 88% actual and 12% gap-filled data, energy intensity 12.6% above the previous period, and electricity and gas with their own splits, above the data coverage and completeness cards](./dashboard-close-up-dark.png)

</div>

</div>

Two small icons tell the reader which comparison they are looking at: a target for "variance against target" and a calendar for "variance against previous period". They mean the same thing on the dashboard, in the asset list and in chart tooltips, so a percentage never has to be read without its reference point.

<div class="callout">

**Keep data quality on the same screen as the number.** Coverage by floor area and data completeness sit on the dashboard itself, so nobody has to open the Data Quality tab to know whether a figure can be trusted.

</div>

## Finding the gaps

When the data isn't complete, the next question is where the gaps are. The Data Quality tab has a summary and a meter view. The meter view gives each meter a 12-month strip coloured by actual, supplier estimated, calculated estimate and missing, and labels it landlord or tenant, so a month that needs chasing stands out without reading a table.

<div class="bleed only-wide">

<div class="only-light">

![The meter view of an asset's data quality: utility and area filters, a legend for actual, supplier estimated, calculated estimate and missing, then ten meters for electricity, water and gas, each labelled landlord or tenant, with a strip of twelve months from April 2023 to March 2024 coloured by data source](./meters-hero.png)

</div>

<div class="only-dark">

![The meter view of an asset's data quality: utility and area filters, a legend for actual, supplier estimated, calculated estimate and missing, then ten meters for electricity, water and gas, each labelled landlord or tenant, with a strip of twelve months from April 2023 to March 2024 coloured by data source](./meters-hero-dark.png)

</div>

</div>

<div class="bleed only-narrow">

<div class="only-light">

![Close-up of the meter view: the Summary and Meter view toggle, then the first meters' monthly strips, where missing months show in orange next to supplier and calculated estimates](./meters-close-up.png)

</div>

<div class="only-dark">

![Close-up of the meter view: the Summary and Meter view toggle, then the first meters' monthly strips, where missing months show in orange next to supplier and calculated estimates](./meters-close-up-dark.png)

</div>

</div>

At fund level, the same tab ranks assets by their share of the fund's missing data and splits it into landlord and tenant data, so the team can start with the assets that make the biggest difference to the fund's figures.

The same principle later shaped the data quality step in [self-serve ESG reporting](/projects/esg-reporting/), where fund managers see the gaps before a report is generated.

## Explaining why a number moved

Once a variance stands out, the next question is why it happened. The Performance tab breaks consumption down by sector or by tenant, with gap-filling switched on or off, and a line above the chart says what the data is being compared with, such as a carbon target instead of the previous period.

<div class="bleed only-wide">

<div class="only-light">

![The Performance tab for an asset's carbon emissions: a toolbar with absolute, sectors and tenants views and a gap-filling switch, a summary of 268.1 tonnes of CO2, 3.7% above target, and a monthly bar chart against target with two tooltips showing the target variance for April and September. The Events table begins below](./performance-hero.png)

</div>

<div class="only-dark">

![The Performance tab for an asset's carbon emissions: a toolbar with absolute, sectors and tenants views and a gap-filling switch, a summary of 268.1 tonnes of CO2, 3.7% above target, and a monthly bar chart against target with two tooltips showing the target variance for April and September. The Events table begins below](./performance-hero-dark.png)

</div>

</div>

<div class="bleed only-narrow">

<div class="only-light">

![Close-up of the Events table under the chart: completed actions such as occupancy sensors and LED lighting next to commercial events such as a lease ending and rates changes, each with its latest note and the number of comments](./performance-close-up.png)

</div>

<div class="only-dark">

![Close-up of the Events table under the chart: completed actions such as occupancy sensors and LED lighting next to commercial events such as a lease ending and rates changes, each with its latest note and the number of comments](./performance-close-up-dark.png)

</div>

</div>

Under the chart, an **Events** table lists what happened at the asset over the same period: completed actions, such as new LED lighting or smart meters, and commercial events, such as a lease ending or a rates change. Each event has notes and a comment thread, so the reason behind a spike sits next to it, in notes from the people who were involved.

## Net zero pathways

Net zero modelling works on a fund-level model: the set of assets included, the pathways compared and notes explaining the scenario. The chart shows the fund's carbon intensity against a science-based target, business as usual, a pathway from the action plan and any target pathways imported for the model. Sold assets stay in the list with the date of sale.

<div class="bleed only-wide">

<div class="only-light">

![The Net Zero Carbon tab for a fund's default model with imported data: stranding years along the top for business as usual (2034), the target pathway (2039), the actions pathway (2038) and the selected asset (2029), the assets in the model with sold assets tagged, and a chart of carbon intensity from 2020 to 2050 against the science-based target, business as usual, the action-based pathway and an imported target pathway](./nzc-hero.png)

</div>

<div class="only-dark">

![The Net Zero Carbon tab for a fund's default model with imported data: stranding years along the top for business as usual (2034), the target pathway (2039), the actions pathway (2038) and the selected asset (2029), the assets in the model with sold assets tagged, and a chart of carbon intensity from 2020 to 2050 against the science-based target, business as usual, the action-based pathway and an imported target pathway](./nzc-hero-dark.png)

</div>

</div>

<div class="bleed only-narrow">

<div class="only-light">

![Close-up of the net zero model: the model's name with Default model and Imported data tags, the row of stranding years for each pathway, and the asset list beside the start of the pathway chart](./nzc-close-up.png)

</div>

<div class="only-dark">

![Close-up of the net zero model: the model's name with Default model and Imported data tags, the row of stranding years for each pathway, and the asset list beside the start of the pathway chart](./nzc-close-up-dark.png)

</div>

</div>

In its pathway settings, the model can switch between the 1.5°C and 2°C CRREM targets, include agreed or applicable actions, upload top-down pathways from a template and add custom target pathways.

<div class="callout">

**Give every pathway its stranding year.** A row above the chart lists the year each pathway strands, marked in the same colour and dash as its line, so business as usual, the action plan and the target pathway can be compared without working out where each line crosses the target.

</div>

## Bringing in Energy Star ratings

Clients who rate their buildings in Energy Star Portfolio Manager can bring those ratings into SIERA. Data from outside SIERA is handled with the same care as its own, so SIERA suggests a match for each asset and the match only counts once the client confirms it. Where an address could belong to more than one record, the row becomes a dropdown of the candidates, so the uncertain matches are the ones that ask for attention.

<div class="bleed only-wide">

<div class="only-light">

![The Energy Star integration page: a note explaining the suggested matches, then a table of SIERA assets beside their suggested Energy Star records, with checkboxes, a counter reading 5 of 453 assets selected, and dropdowns where an asset has several possible matches, one of them open](./energy-star-hero.png)

</div>

<div class="only-dark">

![The Energy Star integration page: a note explaining the suggested matches, then a table of SIERA assets beside their suggested Energy Star records, with checkboxes, a counter reading 5 of 453 assets selected, and dropdowns where an asset has several possible matches, one of them open](./energy-star-hero-dark.png)

</div>

</div>

<div class="bleed only-narrow">

<div class="only-light">

![Close-up of the asset matching table: selected rows with their suggested Energy Star address, and a row with its four possible SIERA matches open to choose from](./energy-star-close-up.png)

</div>

<div class="only-dark">

![Close-up of the asset matching table: selected rows with their suggested Energy Star address, and a row with its four possible SIERA matches open to choose from](./energy-star-close-up-dark.png)

</div>

</div>

## A design system for dense data

SIERA's screens share one set of components: colours including the EPC rating scale, form fields, dropdowns with grouped checkboxes and search, tags, tooltips and small modals such as the session timeout warning.

<div class="bleed only-wide">

<div class="only-light">

![SIERA's design system: text fields and the reporting period pickers, buttons and links, the primary, secondary and EPC rating colours, tags and the icon set](./design-system-hero.png)

</div>

<div class="only-dark">

![SIERA's design system: text fields and the reporting period pickers, buttons and links, the primary, secondary and EPC rating colours, tags and the icon set](./design-system-hero-dark.png)

</div>

</div>

<div class="bleed only-narrow">

<div class="only-light">

![Close-up of the reporting period pickers: one compares 12 months with the same months a year earlier, the other chooses 1, 3, 6 or 12 months and a starting month](./design-system-close-up.png)

</div>

<div class="only-dark">

![Close-up of the reporting period pickers: one compares 12 months with the same months a year earlier, the other chooses 1, 3, 6 or 12 months and a starting month](./design-system-close-up-dark.png)

</div>

</div>

The reporting period picker is the component most specific to the domain. Funds report on different financial years and compare a period with the one before, so the picker chooses a length of 1, 3, 6 or 12 months and a starting month, and can set the previous period alongside the current one.

## Outcome

Once these versions launched, clients went past the asset list, opening their assets and going through the tabs, from the dashboard to performance, data quality and net zero.

<div class="stats">
  <div><strong>46 → 203</strong><span>visits a month to the asset tabs, from earlier versions to the first six months after launch</span></div>
</div>

## Rebranding a live product

In 2023 I also led the front-end side of Evora's rebrand in SIERA, moving every hard-coded colour into one source of truth in under three weeks. That work is written up with my other [branding](/projects/branding/) projects.

Working in a large, long-lived codebase taught me small reviewable steps and systems before screens, which shaped the [design system](/projects/design-system/) for the new platform.
