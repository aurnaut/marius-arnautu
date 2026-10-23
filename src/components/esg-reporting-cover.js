import React from "react";

// Inline copy of projects/esg-reporting/cover.svg, so hovering the post title can file its shapes into a report:
// they tuck under the solid sheet, then the circle comes back on top of it as a logo in its top left corner,
// and the outlines as lines of writing, and two more finished sheets slide out from behind it, making a row of three.
// Each shape's --x/--y is the distance from its centre to the sheet's centre (130, 340),
// --r undoes its tilt so the outlines line up with the sheet once tucked under it,
// and --delay staggers them, nearest the sheet first.
// The sheet is drawn a little bigger than in cover.svg, so nothing shows round it once it's all tucked under.
// The logo and the lines grow in, the lines from their left ends, each in its turn (--delay).
// The lines start from the left of a column as wide as the longest one, centred on the sheet, from 82 to 178,
// and the logo sits at the top of it, lined up with them. The space above the logo, between it and the writing,
// and below the writing are all the same, about 37.
// The other two sheets are drawn behind the first, where they're hidden till they slide out to the right (--x),
// 20 apart, each written a little differently, in their turn (--delay).
const otherSheets = [
  { x: 360, delay: '1.95s', lines: 'M82 345H170M82 375H178M82 405H138' },
  { x: 180, delay: '1.8s', lines: 'M82 345H150M82 375H178M82 405H162' },
];

const EsgReportingCover = ({ title }) => (
  <svg className="esg-cover" viewBox="0 0 600 600" width="150" height="150" role="img" aria-label={`${title} thumbnail`}>
    <g className="esg-cover__shape" style={{ '--x': '-340px', '--y': '80px', '--delay': '0.36s' }}>
      <circle cx="470" cy="260" r="70" fill="#EFB940" />
    </g>
    <g className="esg-cover__shape" style={{ '--x': '-255px', '--y': '60px', '--r': '-67.5deg', '--delay': '0.24s' }}>
      <rect x="315" y="203.75" width="140" height="152.5" rx="52.5" fill="none" stroke="#46F1FF" strokeWidth="8" transform="rotate(67.5 385 280)" />
    </g>
    <g className="esg-cover__shape" style={{ '--x': '-170px', '--y': '40px', '--r': '-45deg', '--delay': '0.12s' }}>
      <rect x="230" y="217.5" width="140" height="165" rx="35" fill="none" stroke="#46F1FF" strokeWidth="8" transform="rotate(45 300 300)" />
    </g>
    <g className="esg-cover__shape" style={{ '--x': '-85px', '--y': '20px', '--r': '-22.5deg' }}>
      <rect x="145" y="231.25" width="140" height="177.5" rx="17.5" fill="none" stroke="#46F1FF" strokeWidth="8" transform="rotate(22.5 215 320)" />
    </g>
    {otherSheets.map(({ x, delay, lines }) => (
      <g key={x} className="esg-cover__sheet" style={{ '--x': `${x}px`, '--delay': delay }}>
        <rect x="50" y="235" width="160" height="210" fill="#3A16D3" />
        <circle cx="98" cy="288" r="16" fill="#EFB940" />
        <path d={lines} stroke="#46F1FF" strokeWidth="8" />
      </g>
    ))}
    <rect x="50" y="235" width="160" height="210" fill="#3A16D3" />
    <circle className="esg-cover__logo" cx="98" cy="288" r="16" fill="#EFB940" />
    <g className="esg-cover__writing" stroke="#46F1FF" strokeWidth="8">
      <path d="M82 345H162" style={{ '--delay': '1.2s' }} />
      <path d="M82 375H146" style={{ '--delay': '1.3s' }} />
      <path d="M82 405H178" style={{ '--delay': '1.4s' }} />
    </g>
  </svg>
);

export default EsgReportingCover;
