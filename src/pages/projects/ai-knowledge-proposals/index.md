---
type: [design, development]
title: Ask, check and correct the AI in one conversation
navTitle: "AI Feedback Loop"
date: 2026-09-29
thumbnail: "./cover.svg"
summary: ESG experts correct the knowledge base behind Evora's AI agents from the same conversation they ask it questions in
role: "Designer and developer of the proposals feature: the conversation flow, the server tools and the guide for experts, working with the knowledge base's maintainers."
period: 2026
tools: Claude, Model Context Protocol (MCP), Python, GitHub Apps
---

## Context

Evora's AI agents answer ESG reporting questions from a knowledge base of 270+ standards documents. Consultants are the ones who notice wrong answers, but fixing one meant asking someone technical to edit the source. I proposed letting them fix it themselves, in the same conversation, and built it as a proof of concept.

> How can a non-technical expert correct an AI's source material at the moment they notice the mistake, without making the knowledge base less trustworthy?

It had to be quick to use in the moment, while keeping every change reviewed and every citation intact.

## The flow

<ol class="flow">
  <li><strong>Ask</strong>Every answer names the document it came from.</li>
  <li><strong>"Show me the source"</strong>Claude shows exactly what the AI read.</li>
  <li><strong>"Change it to say…"</strong>Claude drafts the edit and checks it against the knowledge base's rules.</li>
  <li><strong>Check the preview</strong>The expert sees exactly what will change.</li>
  <li><strong>Confirm</strong>The change goes to the knowledge base's maintainers for review, under the expert's name.</li>
</ol>

Here's an example of how a correction looks from the expert's side.

<figure class="claude-chat-figure">
<details class="claude-chat" open>
<summary class="claude-chat__title">Estimated readings and data coverage</summary>
<div class="claude-chat__thread">
<div class="claude-chat__user"><p>Do estimated meter readings count towards energy data coverage?</p></div>
<div class="claude-chat__reply">
<div class="claude-chat__tool"><strong>get_metric</strong> Knowledge base</div>
<p>Yes, as long as the estimation method is documented. Estimated and measured consumption are reported separately, so reviewers can see how much of the coverage is estimated.</p><p><span class="claude-chat__source">[1] Energy data coverage, framework guidance</span></p>
</div>
<div class="claude-chat__user"><p>Where did that come from? Show me the source file.</p></div>
<div class="claude-chat__reply">
<div class="claude-chat__tool"><strong>get_document_source</strong> Knowledge base</div>
<p>My answer came from one file in the knowledge base, <code>energy-data-coverage.md</code>, last updated in March. This is the passage it was based on:</p>
<div class="claude-chat__code"><span>## Guidance</span><span></span><span>Estimated consumption counts towards data coverage where the estimation method is documented. Estimated and measured consumption are reported separately.</span></div>
</div>
<div class="claude-chat__user"><p>Add our house view under Guidance: we ask clients to replace estimates with actual readings within 12 months. Based on the ESG team's decision in September. Also link it to the meter data quality indicator.</p></div>
<div class="claude-chat__reply">
<div class="claude-chat__tool"><strong>propose_change</strong> Knowledge base</div>
<p>The edit passed the knowledge base's checks. Nothing has been submitted yet.</p>
<p>I didn't add the link, because there's no meter data quality indicator in the knowledge base.</p>
<p>Here's exactly what will change in <code>energy-data-coverage.md</code>:</p>
<div class="claude-chat__code"><span> Estimated consumption counts towards data coverage where the estimation method is documented. Estimated and measured consumption are reported separately.</span><span> </span><span class="claude-chat__add">+**House view (not a framework requirement):** We ask clients to replace estimated consumption with actual readings within 12 months. Source: ESG team decision, September 2026.</span><span class="claude-chat__add">+</span><span> ## Scoring</span></div>
<ul>
<li><strong>Where:</strong> a proposal for the knowledge base maintainers to review</li>
<li><strong>Proposed by:</strong> John Doe</li>
<li><strong>Source reference:</strong> ESG team decision, September 2026</li>
</ul>
<p>Nothing changes in the knowledge base until the maintainers approve and publish it. Shall I submit?</p>
</div>
<div class="claude-chat__user"><p>Yes</p></div>
<div class="claude-chat__reply">
<div class="claude-chat__tool"><strong>propose_change</strong> Knowledge base</div>
<p>I've submitted the proposal, and it's now waiting for the maintainers to review it.</p>
<p>Ask me about it at any point and I'll get its status and any reviewers' comments.</p>
</div>
<div class="claude-chat__input" aria-hidden="true"><span class="claude-chat__button">+</span><span>Reply to Claude…</span><span class="claude-chat__button claude-chat__send">↑</span></div>
</div>
</details></figure>

<div class="callout">

**Let the expert decide and the system check.** Nothing is submitted until the expert has seen exactly what will change, and the server turns down edits that drop a citation, break a document's structure or link to a document that doesn't exist.

</div>

When an edit breaks one of those rules, the server turns it down and Claude explains why in the conversation.

<figure class="claude-chat-figure">
<details class="claude-chat" open>
<summary class="claude-chat__title">Tidying up energy data coverage</summary>
<div class="claude-chat__thread">
<div class="claude-chat__user"><p>Can you tidy up the energy data coverage document? Remove the citations at the bottom, they just clutter it.</p></div>
<div class="claude-chat__reply">
<div class="claude-chat__tool claude-chat__tool--open"><strong>propose_change</strong> Knowledge base</div>
<div class="claude-chat__code"><span>{</span><span>  "error": "The change was not proposed. Fix these and retry.",</span><span>  "problems": [</span><span>    "The '# Citations' section was removed. Keep it: it is how every answer served from this document names its source."</span><span>  ]</span><span>}</span></div>
<p>The server didn't accept that edit, so nothing has been proposed. Every answer that uses this document names its source through the Citations section, so the section has to stay.</p>
<p>If the citations are hard to read, I can propose a change that tidies their formatting and keeps them in place. Would that help?</p>
</div>
<div class="claude-chat__input" aria-hidden="true"><span class="claude-chat__button">+</span><span>Reply to Claude…</span><span class="claude-chat__button claude-chat__send">↑</span></div>
</div>
</details>
</figure>

### Fitting how consultants work

- **Their own login:** Proposals use the expert's Evora account and carry their name, so no developer account is needed.
- **Three kinds of change:** Experts choose between a standards update, a house view and a correction, and each proposal names its source. House views are labelled as Evora's, so agents can tell them apart from the standard.
- **Review in the conversation:** Experts can follow their proposal, read reviewers' comments and revise it without leaving Claude.
- **Clear limits:** The guide I wrote for consultants opens with what they can't do yet, so they don't find out by running into it.

### Designing what Claude says and does

Most of the interface is Claude's behaviour, so I designed it through each tool's instructions. Claude previews before it submits, changes only what the expert asked for, never adds a link the knowledge base doesn't have, and labels house views as Evora's.

Because a model can still miss an instruction, the server checks the key rules again, and its messages are written for Claude to pass on in plain language, as in the example above.

### Reviewed before anyone relies on it

<div class="callout">

**Route every correction through review.** Direct edits would have been quicker, but a mistake would reach every agent at once. Changes only go live after maintainers approve them and the knowledge base is released, so agents only ever see reviewed text.

</div>

## Outcome

<div class="stats stats--three">
  <div><strong>&lt;10 min</strong><span>from proposal to approved and live, in end-to-end tests</span></div>
  <div><strong>0</strong><span>developer tools or extra accounts needed by experts</span></div>
  <div><strong>270+</strong><span>standards documents experts can correct from the conversation</span></div>
</div>

In end-to-end tests on the development environment, each change went live in under ten minutes, including review and release. One test also caught a document summary cut off mid-word, the kind of small error that used to wait for someone technical. Once it's in regular use, the measures to watch are how many corrections consultants propose and how long a wrong answer takes to fix.

**Trade-off:** House views currently sit inside the standards documents. Giving them their own layer, with their own reviewers, would let them survive each year's refresh of a standard, and is the next step.
