import React from "react";

// Inline copy of projects/branding/cover.svg, so hovering the post title can merge the grid's shapes into a star:
// the square and the diamond end up on the same centre, one turned against the other, so together they make eight points,
// while the circle and the triangle fade away into it.
// Each shape moves in two steps. First within its row (--x, --dy), onto the other shape in it, the two cancelling out
// where they overlap. Then up or down with that shape (--y), onto the other row, as it resizes (--size) and fades (--fade).
// --delay is when it moves within its row, top row first, once the dividers have gone.
// Each shape is masked by moving copies of the other three, so where they overlap they cut each other out.
// The diamond also turns the square's colour in the last step; its copies in the masks stay black, so they keep cutting.
// Once the star has formed, it grows from the centre of the grid, and the grid's sides are rubbed out clockwise
// from the top left corner, each shrinking towards the end the next one starts from (--end).
// The dividers and the sides are drawn one each, so they can go one at a time; the sides' square ends
// fill the corners in where they meet.
// The rows moving together, the star growing and the sides' delays are set in _posts.scss.
// Mask ids are prefixed, as the cover sits inline in the page.
const shapes = [
  { id: 'circle', x: '100px', y: '100px', fade: 0, delay: '1s', shape: <circle cx="200" cy="200" r="50" fill="#EFB940" /> },
  // The square is drawn smaller than the others: at the same size it looks heavier
  { id: 'square', x: '-100px', y: '100px', delay: '1s', shape: <rect x="355" y="155" width="90" height="90" fill="#3A16D3" /> },
  { id: 'triangle', x: '100px', dy: '10px', y: '-100px', fade: 0, delay: '1.6s', shape: <path d="M200 340L254 440H146Z" fill="#F76A6A" /> },
  // Grows to have sides as long as the square's, so the star's points are all the same
  { id: 'diamond', x: '-100px', y: '-100px', size: 1.079, delay: '1.6s', shape: <path className="branding-cover__recolour" d="M400 341L459 400L400 459L341 400Z" fill="#24A529" /> },
];

const Piece = ({ x, dy = '0px', y, size = 1, fade = 1, delay, children }) => (
  <g className="branding-cover__grow">
    <g className="branding-cover__row" style={{ '--y': y }}>
      <g className="branding-cover__piece" style={{ '--x': x, '--dy': dy, '--size': size, '--fade': fade, '--delay': delay }}>
        {children}
      </g>
    </g>
  </g>
);

const BrandingCover = ({ title }) => (
  <svg className="branding-cover" viewBox="0 0 600 600" width="150" height="150" role="img" aria-label={`${title} thumbnail`}>
    <defs>
      {shapes.map(({ id }) => (
        <mask key={id} id={`branding-cover-${id}-cut`} maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
          <rect width="600" height="600" fill="#fff" />
          {shapes.filter(other => other.id !== id).map(other => (
            <Piece key={other.id} {...other}>{React.cloneElement(other.shape, { fill: '#000', className: undefined })}</Piece>
          ))}
        </mask>
      ))}
    </defs>
    <g fill="none" stroke="#46F1FF" strokeWidth="8">
      <g strokeLinecap="square">
        <path className="branding-cover__side" d="M100 100H500" style={{ '--scale': '0 1', '--end': 'right center', '--delay': '2.8s' }} />
        <path className="branding-cover__side" d="M500 100V500" style={{ '--scale': '1 0', '--end': 'center bottom', '--delay': '3.05s' }} />
        <path className="branding-cover__side" d="M100 500H500" style={{ '--scale': '0 1', '--end': 'left center', '--delay': '3.3s' }} />
        <path className="branding-cover__side" d="M100 100V500" style={{ '--scale': '1 0', '--end': 'center top', '--delay': '3.55s' }} />
      </g>
      <path className="branding-cover__divider" d="M300 100V300" style={{ '--scale': '1 0', '--delay': '0s' }} />
      <path className="branding-cover__divider" d="M300 300V500" style={{ '--scale': '1 0', '--delay': '0.2s' }} />
      <path className="branding-cover__divider" d="M100 300H500" style={{ '--scale': '0 1', '--delay': '0.4s' }} />
    </g>
    {shapes.map(({ id, shape, ...piece }) => (
      <g key={id} mask={`url(#branding-cover-${id}-cut)`}>
        <Piece {...piece}>{shape}</Piece>
      </g>
    ))}
  </svg>
);

export default BrandingCover;
