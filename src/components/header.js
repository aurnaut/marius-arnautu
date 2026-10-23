import { Link } from "gatsby"
import React from "react"
import TodayDate from '../components/todaydate';
import ThemeToggle from '../components/theme-toggle';

// The logo, drawn as the lines of images/marius-arnautu-logo-thin.svg, so they take the theme's colour:
// an "m", a bar with three legs, going back in perspective, with an "A" folded over on top of it as its roof.
const logoLines = [
  'M0.5 9L16.9 9',
  'M0.5 9L0.5 37.6',
  'M8.9 9L8.9 29.2',
  'M16.9 9L16.9 20.5',
  'M0.5 9L9.2 0.5',
  'M9.2 0.5L25.7 0.5',
  'M25.7 0.5L16.9 9',
  'M25.7 0.5L25.7 12.1',
];

const Header = () => (
  <header className="site-header">
    <div>
      <Link className="logo-link" to="/">
        <svg className="logo" viewBox="0 0 26.2 38.1" role="img" aria-label="Marius Arnautu">
          {logoLines.map(d => <path key={d} d={d} />)}
        </svg>
      </Link>
      <div className="header-actions">
        <TodayDate />
        <ThemeToggle />
      </div>
    </div>
  </header>
);

export default Header
