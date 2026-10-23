import React from "react";

// Inline copy of projects/collection-case-portal/cover.svg, so hovering the post title can feed the invoice's lines into the server.
// Each line that reaches the server is drawn in two parts that move as one: yellow from the invoice's margin to the box,
// and a cut-out from the box to just short of its far side. Both are dashed with the line's length every 500,
// so the next line waits out of sight, and scrolling the dash 500 along feeds one line in as the next comes out.
// The cut-out's dash starts 236 in, the distance from the margin to the box, so it carries on where the yellow stops.
// The status lights are green circles sitting in the cut-outs, hidden until they fade on.
// The mask id is prefixed, as the cover sits inline in the page.
const lines = [
  { y: 268, length: 330 },
  { y: 338, length: 382, delay: '0.15s' },
  { y: 408, length: 300, delay: '0.3s' },
];

const CollectionCasePortalCover = ({ title }) => (
  <svg className="metry-cover" viewBox="0 0 600 600" width="150" height="150" role="img" aria-label={`${title} thumbnail`}>
    <defs>
      <mask id="metry-cover-cut-lines" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
        <rect width="600" height="600" fill="#fff" />
        {lines.map(({ y, length, delay }) => (
          <path key={y} className="metry-cover__line" d={`M346 ${y}H518`} stroke="#000" strokeWidth="8" strokeDasharray={`${length} ${500 - length}`} style={{ '--start': '236px', '--delay': delay }} />
        ))}
      </mask>
    </defs>
    <rect x="74" y="114" width="212" height="372" fill="none" stroke="#3A16D3" strokeWidth="8" />
    <path d="M346 210H534V466H346Z M516 238a10 10 0 1 0 -20 0a10 10 0 1 0 20 0Z M486 238a10 10 0 1 0 -20 0a10 10 0 1 0 20 0Z" fill="#F76A6A" fillRule="evenodd" mask="url(#metry-cover-cut-lines)" />
    <circle className="metry-cover__light" cx="476" cy="238" r="10" />
    <circle className="metry-cover__light" cx="506" cy="238" r="10" style={{ '--delay': '0.35s' }} />
    <g stroke="#EFB940" strokeWidth="8">
      <path d="M110 190H190" />
      {lines.map(({ y, length, delay }) => (
        <path key={y} className="metry-cover__line" d={`M110 ${y}H346`} strokeDasharray={`${length} ${500 - length}`} style={{ '--delay': delay }} />
      ))}
    </g>
  </svg>
);

export default CollectionCasePortalCover;
