const React = require("react")

// Apply a saved light/dark choice before the first paint, so the page doesn't flash
const themeScript = `
try {
  var theme = localStorage.getItem('theme');
  if (theme) document.documentElement.setAttribute('data-theme', theme);
} catch (e) {}
`

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script key="theme" dangerouslySetInnerHTML={{ __html: themeScript }} />,
    // The logo, which follows the browser's light or dark mode, with a light-mode PNG for browsers without SVG favicons
    <link key="favicon-png" rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />,
    <link key="favicon-svg" rel="icon" href="/favicon.svg" type="image/svg+xml" />,
  ])
}
