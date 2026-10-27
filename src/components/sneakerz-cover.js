import React from "react";

// Inline copy of projects/sneakerz/cover.svg, so hovering the post title can turn the laces into a running track:
// they run on down to the foot of the upper, so the strips between them are lanes, which turn track red,
// and a chequered finish line runs down the lanes again and again.
// Each lace is drawn the whole way down, and a little past the foot, so the upper's edge cuts it off flat, with pathLength 1, and dashed to show only the part the drawing has,
// so it can lengthen to the whole of it, one after another (--delay). The laces all slant the same way, 22.5deg off upright.
// The lanes' red runs from the first lace to the last, cut by the laces so they show through it, and clipped to the upper.
// The finish line is two rows of squares across the whole track, square on to the lanes, from the outside edge
// of the first lace to the outside edge of the last, starting above the upper, where the clip hides it.
// Mask and clip ids are prefixed, as the cover sits inline in the page.
const upper = 'M80 410V245L530 355V410Z';

const laces = [
  { d: 'M250 280.6L194.8 414', shown: 0.565 },
  { d: 'M290 290.3L238.7 414', shown: 0.531 },
  { d: 'M330 300.1L282.9 414', shown: 0.491 },
  { d: 'M370 309.9L326.8 414', shown: 0.443 },
];

// The first and last laces are 132 apart across the upper, so square on to the lanes their centres are 122 apart,
// and with each lace 8 wide the track is 130 from the first's outside edge to the last's.
// So the finish line is thirteen squares of 10 by 8, starting 4 out from the first lace.
const squares = Array.from({ length: 26 }, (_, i) => [(i % 13) * 10 - 4, Math.floor(i / 13) * 8])
  .filter(([x, y]) => ((x + 4) / 10 + y / 8) % 2 === 0);

const SneakerzCover = ({ title }) => (
  <svg className="sneakerz-cover" viewBox="0 0 600 600" width="150" height="150" role="img" aria-label={`${title} thumbnail`}>
    <defs>
      <mask id="sneakerz-cover-laces" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
        <rect width="600" height="600" fill="#fff" />
        <g stroke="#000" strokeWidth="8">
          {laces.map(({ d, shown }, i) => (
            <path key={d} className="sneakerz-cover__lace" d={d} pathLength="1" strokeDasharray={`${shown} 1`} style={{ '--delay': `${i * 0.15}s` }} />
          ))}
        </g>
      </mask>
      <clipPath id="sneakerz-cover-upper">
        <path d={upper} />
      </clipPath>
    </defs>
    <g transform="translate(0 -58)">
      <path d={upper} fill="#EFB940" mask="url(#sneakerz-cover-laces)" />
      <g clipPath="url(#sneakerz-cover-upper)">
        <path className="sneakerz-cover__lanes" d="M266.8 240H398.9L328.5 410H196.5Z" fill="#F76A6A" mask="url(#sneakerz-cover-laces)" />
        <g className="sneakerz-cover__finish">
          <g transform="translate(262.7 250) rotate(22.5)">
            <rect x="-4" width="130" height="16" fill="#fff" />
            {squares.map(([x, y]) => <rect key={`${x} ${y}`} x={x} y={y} width="10" height="8" fill="#1c1c1c" />)}
          </g>
        </g>
      </g>
      <rect x="62" y="420" width="476" height="50" fill="#3A16D3" />
    </g>
  </svg>
);

export default SneakerzCover;
