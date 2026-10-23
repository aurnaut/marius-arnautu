import React from "react";

// Inline copy of projects/design-system/cover.svg, so hovering the post title can move the shapes around the ring,
// the hole in the logo in the middle taking the shape of each one as it passes over the top.
// Each shape's --dx/--dy is the distance from the ring's centre (300, 300) to the shape's centre.
// The logo's hole is cut out of it by a mask, over a cut-out that morphs into each shape in turn, keyframed in
// _animations.scss. It's drawn as the logo's own hole, as the circle starts at the top, hidden under the hole till then.
// The mask id is prefixed, as the cover sits inline in the page.
const DesignSystemCover = ({ title }) => (
  <svg className="design-system-cover" viewBox="0 0 600 600" width="150" height="150" role="img" aria-label={`${title} thumbnail`}>
    <circle cx="300" cy="300" r="200" fill="none" stroke="#3A16D3" strokeWidth="8" />
    <defs>
      <mask id="design-system-cover-hole" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
        <rect width="600" height="600" fill="#fff" />
        <path className="design-system-cover__hole" d="M19.2682 40.975C12.7534 38.3271 8.72439 32.3981 8.75401 25.4942C8.71927 18.7207 12.6417 12.8237 18.9896 10.1056C21.1684 9.1717 23.4321 8.69818 25.7198 8.69818C29.9264 8.69818 33.9463 10.3393 37.0468 13.3257C40.3033 16.2682 42.2138 20.6063 42.2868 25.2264C42.3602 29.8362 40.5887 34.2267 37.4261 37.2718L37.4165 37.2809C34.2585 40.5557 30.1093 42.2748 25.7779 42.2748C23.6201 42.2754 21.4174 41.8486 19.2682 40.975Z" transform="translate(213.3 213.3) scale(3.4)" />
        <path className="design-system-cover__cut" d="M259.7 259.7C282 237.4 318 237.4 340.3 259.7C362.6 282 362.6 318 340.3 340.3C318 362.6 282 362.6 259.7 340.3C237.4 318 237.4 282 259.7 259.7Z" />
      </mask>
    </defs>
    <g mask="url(#design-system-cover-hole)">
      <path d="M19.095 1.89453C17.6094 2.82276 16.3767 4.13107 15.2136 6.01262C13.7343 8.40643 11.8784 10.5854 9.69845 12.4903C8.46066 13.573 7.12374 14.5559 5.72873 15.4089C2.19933 17.5327 0.0575322 21.3544 0 25.6571C0.0592411 29.843 2.45509 33.7805 6.24082 35.9276C7.86198 36.9259 9.24731 37.9903 10.4737 39.1807C11.9559 40.6354 13.8294 42.595 15.1709 44.8475C17.2431 48.585 21.2921 50.9999 25.4845 50.9999C25.9094 50.9999 26.3389 50.9748 26.7536 50.9258C30.5804 50.5657 34.0671 48.1935 36.0716 44.5951C37.5384 42.244 39.3857 40.126 41.573 38.2935C42.6428 37.3322 43.8817 36.4341 45.4744 35.4666C47.251 34.3868 48.6444 32.9041 49.6127 31.0682C52.3298 26.2047 50.9325 19.5584 46.4974 16.2534L45.6339 15.6528C42.8564 13.7303 40.2338 11.9137 38.198 9.29364C37.2068 8.13576 36.4139 7.04684 35.7754 5.96475C34.4675 3.74986 32.819 2.19311 30.7456 1.21075C29.1438 0.399892 27.3563 -0.00012098 25.5631 -0.00012098C23.2966 -0.0006908 21.0203 0.638645 19.095 1.89453Z" fill="#3A16D3" transform="translate(213.3 213.3) scale(3.4)" />
    </g>
    <g className="design-system-cover__shape" style={{ '--dx': '0px', '--dy': '-200px' }}>
      <circle cx="300" cy="100" r="45" fill="#EFB940" />
    </g>
    <g className="design-system-cover__shape" style={{ '--dx': '190.2px', '--dy': '-61.9px' }}>
      <rect x="445.2" y="231.1" width="90" height="14" fill="#EFB940" />
    </g>
    <g className="design-system-cover__shape" style={{ '--dx': '117.5px', '--dy': '161.8px' }}>
      <rect x="397.5" y="416.8" width="40" height="90" fill="#EFB940" />
    </g>
    <g className="design-system-cover__shape" style={{ '--dx': '-117.6px', '--dy': '156.15px' }}>
      <path d="M182.4 416.8L227.4 495.5H137.4Z" fill="#EFB940" />
    </g>
    <g className="design-system-cover__shape" style={{ '--dx': '-190.3px', '--dy': '-61.9px' }}>
      <rect x="74.7" y="203.1" width="70" height="70" fill="#EFB940" />
    </g>
  </svg>
);

export default DesignSystemCover;
