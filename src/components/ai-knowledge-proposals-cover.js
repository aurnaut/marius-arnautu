import React from "react";

// Rebuild of projects/ai-knowledge-proposals/cover.svg in pieces, so hovering the post title can set the pencil writing.
// The eraser end and the point turn independently about the ring's centre, and the body between them is two
// dashed circles (the gap between them is the groove), whose dash length stretches and shrinks to join them up.
// The body runs 1deg under the solid ends at both sides, so no hairline shows where they meet.
// The written line is a circle on the ring's centre line, drawn out by its dash length, which the point's tip sits on.
const AiKnowledgeProposalsCover = ({ title }) => (
  <svg className="ai-cover" viewBox="0 0 600 600" width="150" height="150" role="img" aria-label={`${title} thumbnail`}>
    <circle className="ai-cover__line" cx="300" cy="300" r="175" pathLength="360" fill="none" strokeWidth="8" />
    <circle className="ai-cover__body" cx="300" cy="300" r="193" pathLength="360" fill="none" stroke="#EFB940" strokeWidth="28" />
    <circle className="ai-cover__body" cx="300" cy="300" r="157" pathLength="360" fill="none" stroke="#EFB940" strokeWidth="28" />
    <g className="ai-cover__eraser">
      <path d="M384.2 110.9A207 207 0 0 1 433.1 141.4L391.9 190.5A143 143 0 0 0 358.2 169.4Z" fill="#F76A6A" />
      <path d="M433.1 141.4A207 207 0 0 1 453.8 161.5L406.3 204.3A143 143 0 0 0 391.9 190.5Z" fill="#EFB940" />
    </g>
    <g className="ai-cover__point">
      <path d="M236.0 103.1A207 207 0 0 1 257.0 97.5L312.0 125.4L270.3 160.1A143 143 0 0 0 255.8 164.0Z" fill="#EFB940" />
    </g>
  </svg>
);

export default AiKnowledgeProposalsCover;
