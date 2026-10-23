---
type: [design, development]
title: Letting experts correct the AI, from inside the conversation
navTitle: "AI Feedback Loop"
date: 2026-09-29
thumbnail: './cover.svg'
summary: Experts fix Evora's AI knowledge base from Claude, no GitHub needed
role: "Designer and developer of the proposals feature: the flow, the server tools and the user guide."
period: 2026
tools: Claude, Model Context Protocol (MCP), Python, GitHub Apps, Auth0
---

## Context

Evora's AI agents answer from a knowledge base of 270+ ESG reporting-standards documents (GRI, INREV, GRESB). The people who spot wrong answers are ESG consultants, not engineers, so every fix depended on someone technical editing markdown in a repository.

> How can a non-technical expert correct an AI's source material at the moment they notice the mistake, without making the knowledge base less trustworthy?

Low friction, but reviewed before going live. Plain-language edits, but citations and links that mustn't break.

## The flow

<ol class="flow">
  <li><strong>Ask</strong>Every answer names its source document.</li>
  <li><strong>"Show me the source"</strong>Claude shows exactly what the AI read.</li>
  <li><strong>"Change it to say…"</strong>Claude drafts the edit; the server validates it.</li>
  <li><strong>Review the diff</strong>The expert sees exactly what will change.</li>
  <li><strong>Confirm</strong>A proposal opens for maintainers under the expert's name.</li>
</ol>

<div class="callout">

**The human confirms, the system checks.** The server rejects edits that break structure, drop a citation or link to a missing document, and nothing is submitted until the expert has seen the exact change. The AI does the tedious part; people decide.

</div>

### Designing for people without developer tools

- **No GitHub account.** A GitHub App opens the pull request under the expert's Evora login.
- **Stale edits are refused**, not silently overwritten.
- **Explicit permission.** Proposing needs a contributor role; Claude tells you who to ask.
- **Status in the conversation**, without leaving Claude.

I added three tools to the knowledge base's MCP server: `get_document_source`, `propose_change` and `get_proposal_status`.

### Writing for the expert

<div class="shot-placeholder">Screenshot: the SME guide's "What you can do today" table, or a Claude conversation showing a proposal</div>

I wrote a plain-language guide that opens with what experts can and can't do yet, so they don't discover the limits by failing.

## Outcome

<div class="stats">
  <div><strong>&lt;10 min</strong><span>from proposal to merged and live, in the first end-to-end runs</span></div>
  <div><strong>0</strong><span>GitHub accounts or developer tools needed by experts</span></div>
  <div><strong>34</strong><span>automated tests covering the proposal and contribution flow</span></div>
  <div><strong>270+</strong><span>standards documents experts can now correct themselves</span></div>
</div>

Tested end to end on a GRESB indicator: each change went from conversation to live in under ten minutes, with an automatic pull request bumping the knowledge base version.

<!-- TODO (Marius): once consultants are using it, add real adoption, e.g. number of proposals or contributors, and time to fix a wrong answer before vs after. -->
