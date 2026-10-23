import React from "react";

// Inline copy of projects/portfolio/cover.svg, so hovering the post title can square the pyramid up.
// The circle is a fully rounded square and the diamond a square turned 45deg, so both can become plain squares.
// The diamond's square is 65.05 wide, so its corners land where the drawing's diamond points were,
// and it grows to the 72 of the other squares as it turns level.
// --delay staggers the rows, top first.
const PortfolioCover = ({ title }) => (
  <svg className="portfolio-cover" viewBox="0 0 600 600" width="150" height="150" role="img" aria-label={`${title} thumbnail`}>
    <path className="portfolio-cover__fund" d="M300 100L346 184H254Z" fill="#3A16D3" stroke="#3A16D3" strokeWidth="0" />
    <rect className="portfolio-cover__square" x="212" y="212" width="72" height="72" fill="none" stroke="#3A16D3" strokeWidth="8" style={{ '--delay': '0.1s' }} />
    <rect className="portfolio-cover__square" x="316" y="212" width="72" height="72" fill="none" stroke="#3A16D3" strokeWidth="8" style={{ '--delay': '0.1s' }} />
    <rect className="portfolio-cover__circle" x="160" y="316" width="72" height="72" rx="36" fill="none" stroke="#3A16D3" strokeWidth="8" style={{ '--delay': '0.2s' }} />
    <rect className="portfolio-cover__square" x="264" y="316" width="72" height="72" fill="none" stroke="#3A16D3" strokeWidth="8" style={{ '--delay': '0.2s' }} />
    <g className="portfolio-cover__diamond" style={{ '--delay': '0.2s' }}>
      <rect x="371.47" y="319.47" width="65.05" height="65.05" fill="none" stroke="#3A16D3" strokeWidth="8" transform="rotate(45 404 352)" />
    </g>
    <rect className="portfolio-cover__square" x="108" y="420" width="72" height="72" fill="none" stroke="#3A16D3" strokeWidth="8" style={{ '--delay': '0.3s' }} />
    <rect className="portfolio-cover__square" x="212" y="420" width="72" height="72" fill="none" stroke="#3A16D3" strokeWidth="8" style={{ '--delay': '0.3s' }} />
    <rect className="portfolio-cover__square" x="316" y="420" width="72" height="72" fill="none" stroke="#3A16D3" strokeWidth="8" style={{ '--delay': '0.3s' }} />
    <rect className="portfolio-cover__square" x="420" y="420" width="72" height="72" fill="none" stroke="#3A16D3" strokeWidth="8" style={{ '--delay': '0.3s' }} />
  </svg>
);

export default PortfolioCover;
