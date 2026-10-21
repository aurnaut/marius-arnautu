---
type: design
title: Letting experts correct the AI, from inside the conversation
date: 2026-09-29
thumbnail: './cover.png'
summary: A human-in-the-loop flow that lets ESG subject-matter experts propose fixes to the reporting-standards knowledge base behind Evora's AI agents, without a GitHub account and without leaving Claude.
role: "Designer and developer of the proposals feature: the flow, the server tools and the user guide."
period: September 2026
tools: Claude, Model Context Protocol (MCP), Python, GitHub Apps, Auth0
---

## Context

Evora built a knowledge base of ESG reporting standards for its AI agents to answer from. It holds more than 270 documents covering GRI, INREV and the full GRESB Real Estate Assessment, with one document per framework, standard, disclosure and metric. People ask Claude questions such as "what evidence does GRESB accept for this indicator?", and the agent answers from those documents, citing the one it used.

The people who know when an answer is wrong are Evora's ESG consultants. They aren't engineers. Without a way in, every fix depended on someone technical editing markdown in a repository the consultant had never seen.

## The problem

An AI answer is only as good as its source, and the experts who could improve the sources had no way in. The design question was:

> How can a non-technical expert correct an AI's source material at the moment they notice the mistake, without making the knowledge base less trustworthy?

That breaks down into tensions to balance:

- **Low friction for experts**, but **review before anything goes live**.
- **Edits in plain language**, but **structured documents** with citations and links that mustn't break.
- **Anyone can read**, but **only approved people can propose**.

## The flow

The proposal happens in the same conversation where the expert spotted the problem:

<ol class="flow">
  <li><strong>Ask</strong>The expert asks a question as normal. Every answer names the document it came from.</li>
  <li><strong>"Show me the source"</strong>Claude retrieves the document behind the answer, so the expert sees exactly what the AI read.</li>
  <li><strong>"Change it to say…"</strong>The expert describes the fix in plain language. Claude drafts the edit and the server validates it.</li>
  <li><strong>Review the diff</strong>The expert sees exactly what will change before anything is submitted.</li>
  <li><strong>Confirm</strong>A proposal opens for maintainers to review, under the expert's name. Once approved and released, every agent uses it.</li>
</ol>

<div class="callout">

**Decision: the human confirms, the system checks.** Claude drafts, but nothing is submitted until the expert has seen the exact change. Before the expert even sees it, the server rejects edits that would break the document's structure, drop a citation or link to a document that doesn't exist. The AI does the tedious part, and people keep both decisions: the expert proposing, and the maintainer approving.

</div>

### Designing for people without developer tools

- **No GitHub account needed.** A GitHub App opens the pull request on the expert's behalf, with their name attached from their Evora login. The expert never sees Git.
- **Stale edits are refused.** If the document changed since the expert looked at it, the proposal is rejected with an explanation, rather than silently overwriting someone else's fix.
- **Permission is explicit.** Reading is open to everyone with access. Proposing needs a contributor role, and if you're missing it Claude tells you who to ask.
- **Status in the conversation.** Experts can ask "what happened to my proposal?" and get an answer without leaving Claude.

I added three tools to the knowledge base's MCP server for this: `get_document_source`, `propose_change` and `get_proposal_status`.

### Writing for the expert

<div class="shot-placeholder">Screenshot: the SME guide's "What you can do today" table, or a Claude conversation showing a proposal</div>

I wrote a plain-language guide for consultants alongside the technical design. It opens with a table of **what you can do today** (update a document when a standard changes, add Evora's house view, correct a misstatement) and what you can't yet (add a brand-new document). Setting that scope honestly meant experts weren't left to discover the limits by failing.

## Outcome

<div class="stats">
  <div><strong>&lt;10 min</strong><span>from proposal to merged and live, in the first end-to-end runs</span></div>
  <div><strong>0</strong><span>GitHub accounts or developer tools needed by experts</span></div>
  <div><strong>34</strong><span>automated tests covering the proposal and contribution flow</span></div>
  <div><strong>270+</strong><span>standards documents experts can now correct themselves</span></div>
</div>

I proved the flow end to end on a GRESB indicator: first proposing a house-view note, then a second proposal removing it again. Each time the change went from the conversation, through review, to merged and published to the agents in under ten minutes. An automatic pull request bumps the knowledge base version the server uses, so nobody has to remember the last step.

<!-- TODO (Marius): once consultants are using it, add real adoption, e.g. number of proposals or contributors, and time to fix a wrong answer before vs after. -->

## What I'd do next

- Let experts propose new documents, not just edits to existing ones.
- Notify the expert when their proposal is approved and live, so the loop closes without them having to ask.
