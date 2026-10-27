import React from "react";

// Inline copy of projects/arnautus-library/cover.svg, so hovering the post title can shelve the book's text:
// the spine turns into a shelf across the middle, so the book's front and the pages behind it become a bookcase
// with two rows, and each line of text moves onto one of them as a book. Then more books fill the shelves in.
// Lines short enough to fit a row stand up, as tall as the line was long. The rest are too tall, so they lie flat,
// one on the top shelf and two in a pile on the bottom one.
// Each line's place is the centre it moves to, in the order the lines are read, left page then right.
// --x/--y is how far its centre moves there, --turn stands it up, --colour is the colour it turns, if any,
// and --delay staggers them.
// The books filling in grow from where they rest, up from the shelf when standing and out from the left when flat,
// one after another (--delay).
const top = 328;
const bottom = 464;
const red = '#F76A6A';
const green = '#24A529';
const blue = '#46F1FF';

const lines = [
  { d: 'M94 252H228', place: [407, top - 4] },
  { d: 'M94 302H204', place: [100, top - 55], standing: true, colour: red },
  { d: 'M94 352H234', place: [156, bottom - 4] },
  { d: 'M94 402H178', place: [116, top - 42], standing: true },
  { d: 'M310 252H400', place: [132, top - 45], standing: true },
  { d: 'M310 302H438', place: [156, bottom - 16], colour: green },
  { d: 'M310 352H382', place: [440, bottom - 36], standing: true },
  { d: 'M310 402H426', place: [456, bottom - 58], standing: true },
];

// Standing books are [x, shelf, height], flat ones [start, end, centre height].
// They're mostly much the same height, so they read as a set, with only a few picked out in colour.
const extras = [
  { standing: [148, top, 100] },
  { standing: [164, top, 96] },
  { standing: [180, top, 104] },
  { standing: [196, top, 100] },
  { standing: [212, top, 84] },
  { standing: [228, top, 100] },
  { standing: [244, top, 96] },
  { standing: [260, top, 104], colour: blue },
  { standing: [276, top, 100] },
  { standing: [292, top, 96] },
  { standing: [308, top, 88] },
  { standing: [324, top, 100] },
  { flat: [352, 462, top - 16] },
  { standing: [482, top, 96] },
  { standing: [248, bottom, 100] },
  { standing: [264, bottom, 96] },
  { standing: [280, bottom, 104] },
  { standing: [296, bottom, 100] },
  { standing: [312, bottom, 84] },
  { standing: [328, bottom, 100] },
  { standing: [344, bottom, 96] },
  { standing: [360, bottom, 104], colour: red },
  { standing: [376, bottom, 100] },
  { standing: [392, bottom, 96] },
  { standing: [408, bottom, 88] },
  { standing: [424, bottom, 100] },
  { flat: [100, 212, bottom - 28], colour: green },
  { standing: [472, bottom, 100] },
];

// The centre of a line drawn as Mx yHx
const centre = d => {
  const [start, y, end] = d.match(/[\d.]+/g).map(Number);
  return [(start + end) / 2, y];
};

const ArnautusLibraryCover = ({ title }) => (
  <svg className="library-cover" viewBox="0 0 600 600" width="150" height="150" role="img" aria-label={`${title} thumbnail`}>
    <g fill="none" stroke="#3A16D3" strokeWidth="8">
      <path d="M62 196H494V468H62Z" />
      <path className="library-cover__spine" d="M278 196V468" />
      <path d="M62 196L90 168H522V440L494 468M494 196L522 168" strokeLinejoin="miter" />
    </g>
    <g stroke="#EFB940" strokeWidth="8">
      {extras.map(({ standing, flat, colour }, i) => {
        const style = { '--delay': `${0.6 + i * 0.03}s` };
        if (standing) {
          const [x, shelf, height] = standing;
          return <path key={i} className="library-cover__extra library-cover__extra--standing" d={`M${x} ${shelf}V${shelf - height}`} stroke={colour} style={style} />;
        }
        const [start, end, y] = flat;
        return <path key={i} className="library-cover__extra library-cover__extra--flat" d={`M${start} ${y}H${end}`} stroke={colour} style={style} />;
      })}
      {lines.map(({ d, place, standing, colour }, i) => {
        const [x, y] = centre(d);
        return (
          <path
            key={d}
            className="library-cover__line"
            d={d}
            style={{
              '--x': `${place[0] - x}px`,
              '--y': `${place[1] - y}px`,
              '--turn': standing ? '-90deg' : '0deg',
              '--colour': colour,
              '--delay': `${i * 0.08}s`,
            }}
          />
        );
      })}
    </g>
  </svg>
);

export default ArnautusLibraryCover;
