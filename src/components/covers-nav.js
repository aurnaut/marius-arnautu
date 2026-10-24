import React, { useEffect, useLayoutEffect, useRef } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

// Where the row was scrolled to on the page before, kept between pages
let lastScrollLeft = 0;

// How long the row takes to glide to the project being viewed, easing in and out
const GLIDE_DURATION = 700;
const ease = t => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

// The row has to be put back where it was before the page is painted, or it shows at the start first.
// That's a layout effect, which doesn't run when the page is built, so it's a plain effect there.
const useBeforePaint = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Every project, newest first, as its static cover, the same size as the logo it sits under.
// Each cover is its project folder's cover.svg, matched to the project by the folder its slug names,
// cut out of the theme's foreground colour, like the logo. The one being viewed keeps its colours,
// drawn inline from the same file, so the theme can recolour it.
const CoversNav = () => {
  const { allMarkdownRemark, allFile } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { frontmatter: { type: { in: ["design", "development"] } }}, sort: { order: DESC, fields: [frontmatter___date] }) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            navTitle
          }
        }
      }
      allFile(filter: { sourceInstanceName: { eq: "markdown-pages" }, name: { eq: "cover" }, extension: { eq: "svg" } }) {
        nodes {
          relativeDirectory
          publicURL
          fields {
            svg
          }
        }
      }
    }
  `);

  const covers = Object.fromEntries(allFile.nodes.map(({ relativeDirectory, publicURL, fields }) => [`/${relativeDirectory}/`, { url: publicURL, svg: fields.svg }]));
  const projects = allMarkdownRemark.nodes.filter(({ fields }) => covers[fields.slug]);
  const list = useRef(null);

  // Where the menu is a row that scrolls sideways, scroll it to the project being viewed, centred if it can be.
  // Each page draws the menu afresh, so it picks up where the last page's row was and glides on from there,
  // unless motion is reduced. The browser's own smooth scroll is too quick to follow, so the glide is stepped here.
  // Set on the row itself, as scrollIntoView would scroll the page too.
  useBeforePaint(() => {
    const row = list.current;
    const current = row?.querySelector('[aria-current="page"]')?.closest('li');
    if (!current) return undefined;
    const rowBox = row.getBoundingClientRect();
    const itemBox = current.getBoundingClientRect();
    const target = Math.max(0, Math.min(
      itemBox.left - rowBox.left - (rowBox.width - itemBox.width) / 2,
      row.scrollWidth - row.clientWidth,
    ));
    const remember = () => { lastScrollLeft = row.scrollLeft; };
    row.addEventListener('scroll', remember, { passive: true });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      row.scrollLeft = target;
      return () => row.removeEventListener('scroll', remember);
    }

    const from = lastScrollLeft;
    row.scrollLeft = from;
    let frame;
    let start;
    const step = now => {
      start = start ?? now;
      const progress = Math.min((now - start) / GLIDE_DURATION, 1);
      row.scrollLeft = from + (target - from) * ease(progress);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    // Touching the row hands it back to the visitor
    const stop = () => cancelAnimationFrame(frame);
    row.addEventListener('pointerdown', stop);
    row.addEventListener('wheel', stop, { passive: true });
    return () => {
      stop();
      row.removeEventListener('scroll', remember);
      row.removeEventListener('pointerdown', stop);
      row.removeEventListener('wheel', stop);
    };
  }, []);

  return (
    <nav className="covers-nav" aria-label="Projects">
      <ul ref={list}>
        {projects.map(({ fields: { slug }, frontmatter: { title, navTitle } }) => (
          <li key={slug}>
            <Link to={slug}>
              <span className="covers-nav__cover" style={{ '--cover': `url(${covers[slug].url})` }} />
              <span className="covers-nav__cover covers-nav__cover--current" dangerouslySetInnerHTML={{ __html: covers[slug].svg }} />
              <span className="covers-nav__label">{navTitle || title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CoversNav;
