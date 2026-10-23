---
type: [design, development]
title: "Sneakerz: a responsive landing page for a sneaker shop"
navTitle: "Sneakerz Landing"
date: 2019-03-20
thumbnail: './cover.svg'
summary: Sneaker shop landing page with a hero, smart header and carousel
role: Designer and front-end developer.
period: 2019
tools: HTML, CSS, Bootstrap 4, jQuery
---

## Context

A concept landing page, built as a front-end exercise in getting the details right with nothing beyond Bootstrap.

<!-- TODO (Marius): was this a take-home test, a client pitch or a practice project? -->

![The hero: a blue full-screen panel with a close-up of a blue sneaker and the headline "Best sneakers in town just got better"](./hero.jpg)

- **A hero that fills exactly one screen,** recalculated on resize.
- **A scroll-aware header:** transparent over the hero, solid blue and tighter once you scroll past it.
- **Alternating product rows** that stack on a phone.

<div class="shots">

![A product row: copy on the left, a pair of blue trainers on a coral panel on the right](./product-rows.jpg)

![The rows alternate: image left and copy right, then the reverse](./product-rows-alt.jpg)

</div>

![The featured sneakers carousel above the footer with link columns and social icons](./featured-slider.jpg)

## What I'd do differently

The copy is placeholder, so this is a layout study. Next time: real content, CSS `position: sticky` with an IntersectionObserver instead of the jQuery scroll handler, and a keyboard-accessible carousel.
