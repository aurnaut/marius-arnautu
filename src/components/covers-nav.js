import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

// Every project, newest first, as its static cover, the same size as the logo it sits under.
// Each cover is its project folder's cover.svg, matched to the project by the folder its slug names,
// cut out of the theme's foreground colour, like the logo.
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
        }
      }
    }
  `);

  const covers = Object.fromEntries(allFile.nodes.map(({ relativeDirectory, publicURL }) => [`/${relativeDirectory}/`, publicURL]));
  const projects = allMarkdownRemark.nodes.filter(({ fields }) => covers[fields.slug]);

  return (
    <nav className="covers-nav" aria-label="Projects">
      <ul>
        {projects.map(({ fields: { slug }, frontmatter: { title, navTitle } }) => (
          <li key={slug}>
            <Link to={slug}>
              <span className="covers-nav__cover" style={{ '--cover': `url(${covers[slug]})` }} />
              <span className="covers-nav__label">{navTitle || title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CoversNav;
