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
      {/* Drawn in thin outlines, like the logo */}
      {theme === 'dark' && (
        <svg className="theme-toggle__sun" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <path key={angle} d="M12 1.5L12 4.5" transform={`rotate(${angle} 12 12)`} />
          ))}
        </svg>
      )}
      {/* A disc of radius 9 with one of radius 7 cut from its top right, as the outline of what's left */}
      {theme === 'light' && (
        <svg className="theme-toggle__moon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M11.23 3.03A9 9 0 1 0 20.97 12.77A7 7 0 0 1 11.23 3.03Z" />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle;
