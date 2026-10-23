import React from "react";

// Inline copy of projects/analysis-dashboards/cover.svg, reduced to its eye, with a pie chart for an iris,
// so hovering the post title can set the chart's shares changing, as if it's showing whoever's looking their numbers.
// Each slice is a circle half the pie's radius, with a stroke as wide as the pie, measured as 100 round (pathLength),
// so its dash is its share and its offset is the shares before it. They start from the top, turned a quarter back.
// The shares it moves through are keyframed in _animations.scss; these are the first.
const slices = [
  { colour: '#F76A6A', share: 50, before: 0 },
  { colour: '#EFB940', share: 30, before: 50 },
  { colour: '#3A16D3', share: 20, before: 80 },
];

const AnalysisDashboardsCover = ({ title }) => (
  <svg className="dashboards-cover" viewBox="0 0 600 600" width="150" height="150" role="img" aria-label={`${title} thumbnail`}>
    <path d="M60 300Q300 80 540 300Q300 520 60 300Z M386 300a86 86 0 1 0 -172 0a86 86 0 1 0 172 0Z" fill="#24A529" fillRule="evenodd" />
    <g fill="none" strokeWidth="72" transform="rotate(-90 300 300)">
      {slices.map(({ colour, share, before }, i) => (
        <circle
          key={colour}
          className={`dashboards-cover__slice dashboards-cover__slice--${i + 1}`}
          cx="300"
          cy="300"
          r="36"
          pathLength="100"
          stroke={colour}
          strokeDasharray={`${share} 100`}
          strokeDashoffset={-before}
        />
      ))}
    </g>
  </svg>
);

export default AnalysisDashboardsCover;
