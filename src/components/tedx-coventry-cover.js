import React from "react";

// Inline copy of projects/tedx-coventry/cover.svg, so hovering the post title can spin the "x"'s two strokes
// about its centre in opposite directions, round and round, passing through each other.
// Each stroke is turned (--turn) by CSS rather than a transform attribute, so the spin can carry on from it,
// and --spin is which way it goes. The spin is keyframed in _animations.scss.
const lines = 'M70 256H530M70 278H530M70 300H530M70 322H530M70 344H530';

const TedxCoventryCover = ({ title }) => (
  <svg className="tedx-cover" viewBox="0 0 600 600" width="150" height="150" role="img" aria-label={`${title} thumbnail`}>
    <g stroke="#F76A6A" strokeWidth="8">
      <path className="tedx-cover__stroke" d={lines} style={{ '--turn': '45deg', '--spin': '360deg' }} />
      <path className="tedx-cover__stroke" d={lines} style={{ '--turn': '-45deg', '--spin': '-360deg' }} />
    </g>
  </svg>
);

export default TedxCoventryCover;
