---
type: [design, development]
title: "Home Library: a catalogue for a home bookshelf"
navTitle: "Home Library"
date: 2021-04-01
thumbnail: './cover.svg'
summary: Home library catalogue with search, a two-reader log and a book picker
role: Sole designer and developer.
period: 2020 – 2021
tools: Adobe XD, React, Node.js, Express, MongoDB (Mongoose), Bootstrap, Heroku
---

## Context

Our home library had outgrown its spreadsheet: no covers, no quick "have either of us read this?", and no help with *what should I read next?* I built a full-stack replacement: React, Node and Express, MongoDB, on Heroku.

<!-- TODO (Marius): number of books catalogued, if you'd like a stat here. -->

## What I built

<div class="shot-placeholder">Screenshot: the books list with search and sortable columns</div>

- **A sortable, searchable catalogue,** with a "read" column for each reader and a running total.
- **Managed categories,** so a typo doesn't create a new genre.
- **Covers moved to FTP storage** on deployment, because Heroku doesn't keep files between restarts.

<div class="callout">

**Make choosing fun, not just fast.** Filters help when you know what you want; often you don't. "Pick my next book" spins a slot machine through the catalogue and lands on one book.

</div>

## Redesigning it

<div class="shot-placeholder">Screenshot: the Adobe XD redesign of the homepage</div>

After using the Bootstrap version daily, I redesigned it in Adobe XD:

- **A homepage per reader,** with books read and current reads with progress bars, instead of a table.
- **A slim side navigation** with the four things we do: search, view all, pick a random book, add a book.
- **Covers first,** for recognition titles can't give.

<!-- TODO (Marius): was the XD redesign built? If so, add a screenshot of the live version. -->

Shipping it plain first showed me what the homepage should be better than up-front design would have.
