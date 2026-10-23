import React from "react";

// Inline copy of projects/siera-esg-analytics/cover.svg, so hovering the post title can set the dots marching
// and the net zero pathways flowing as waves, with the ball riding them.
// The pathways' forms are built in _animations.scss, the drop one matching this path. They're stretched out to end
// level with the dots, and meet level with the lowest one so it runs straight, which puts the meeting point further right
// and higher than in cover.svg. They're clipped at the dots' end, as the waves reach further than the drawing does.
// The clip id is prefixed, as the cover sits inline in the page.
const SieraEsgAnalyticsCover = ({ title }) => (
  <svg className="siera-cover" viewBox="0 0 600 600" width="150" height="150" role="img" aria-label={`${title} thumbnail`}>
    <path className="siera-cover__dots" d="M88 110.0H530M88 138.2H530M88 166.4H530M88 194.5H530M88 222.7H530M88 250.9H530M88 279.1H530M88 307.3H530M88 335.5H530M88 363.6H530M88 391.8H530M88 420.0H530" stroke="#F76A6A" strokeWidth="6" strokeLinecap="round" strokeDasharray="0 16" fill="none" />
    <defs>
      <clipPath id="siera-cover-pathways">
        <rect x="80" y="0" width="450" height="600" />
      </clipPath>
    </defs>
    <g clipPath="url(#siera-cover-pathways)">
      <path
        className="siera-cover__pathways"
        d="M80 110.0C287.7 125.5 403.1 280.5 530 420
           M80 138.2C287.7 152.3 403.1 293.2 530 420
           M80 166.4C287.7 179.0 403.1 305.9 530 420
           M80 194.5C287.7 205.8 403.1 318.5 530 420
           M80 222.7C287.7 232.6 403.1 331.2 530 420
           M80 250.9C287.7 259.4 403.1 343.9 530 420
           M80 279.1C287.7 286.1 403.1 356.6 530 420
           M80 307.3C287.7 312.9 403.1 369.3 530 420
           M80 335.5C287.7 339.7 403.1 382.0 530 420
           M80 363.6C287.7 366.5 403.1 394.6 530 420
           M80 391.8C287.7 393.2 403.1 407.3 530 420
           M80 420.0C287.7 420.0 403.1 420.0 530 420"
        fill="none"
        stroke="#3A16D3"
        strokeWidth="8"
      />
    </g>
    <circle className="siera-cover__ball" cx="530" cy="420" r="44" fill="#24A529" />
  </svg>
);

export default SieraEsgAnalyticsCover;
