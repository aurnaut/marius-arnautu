import React, { useState, useEffect } from "react";

const STORAGE_KEY = 'theme';

const getCurrentTheme = () => {
  const chosen = document.documentElement.getAttribute('data-theme');
  if (chosen) return chosen;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const ThemeToggle = () => {
  // Unknown until mount, since the build can't see the visitor's setting
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
    setTheme(next);
  }

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={label} title={label}>
      {/* Flat, square-edged shapes in the palette, like the background graphics */}
      {theme === 'dark' && (
        <svg className="theme-toggle__sun" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <circle cx="12" cy="12" r="5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <rect key={angle} x="11" y="1" width="2" height="4" transform={`rotate(${angle} 12 12)`} />
          ))}
        </svg>
      )}
      {theme === 'light' && (
        <svg className="theme-toggle__moon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <mask id="theme-toggle-moon-cut">
            <rect width="24" height="24" fill="white" />
            <circle cx="17" cy="7" r="7" fill="black" />
          </mask>
          <circle cx="12" cy="12" r="9" mask="url(#theme-toggle-moon-cut)" />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle;
