/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

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
  ])
}
