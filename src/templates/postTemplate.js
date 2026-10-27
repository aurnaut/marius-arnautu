import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import { TypeLinks } from '../components/post-list';
import { CoverHero } from '../components/covers';

// gatsby-remark-images sizes every image for the reading column, so images that bleed out of it to the
// page's margins would load a file too small for them. Their sizes are the page's width instead.
// The divs are counted, as a bleed block can nest others, such as one image for each theme.
const sizeBleedImages = (html) => {
  let depth = 0; // How many divs deep inside a bleed block, 0 outside one
  return html.replace(/<div\b[^>]*>|<\/div>|sizes="[^"]*"/g, (tag) => {
    if (tag.startsWith('sizes')) return depth ? 'sizes="100vw"' : tag;
    if (tag === '</div>') {
      if (depth) depth -= 1;
    } else if (depth || /class="bleed[\s"]/.test(tag)) {
      depth += 1;
    }
    return tag;
  });
};

const PostTemplate = ({ data, pageContext }) => {
  const { frontmatter, html } = data.markdownRemark;
  // When it was is shown with its types, as on the post lists
  const meta = [
    ['Role', frontmatter.role],
    ['Team', frontmatter.team],
    ['Tools', frontmatter.tools],
  ].filter(([, value]) => value);

  return (
    <Layout>
      <Seo title={frontmatter.title} description={frontmatter.summary} />
      <article className="case-study">
        <header className="case-study__header">
          <CoverHero slug={pageContext.slug} title={frontmatter.title} />
          <div className="post-list__meta">
            <TypeLinks types={frontmatter.type} />
            <span className="post-list__separator" aria-hidden="true">·</span>
            <span className="post-list__date">{frontmatter.period || frontmatter.date}</span>
          </div>
          <h1>{frontmatter.title}</h1>
          {frontmatter.summary && <p className="case-study__summary">{frontmatter.summary}</p>}
          {meta.length > 0 && (
            <dl className="case-study__meta">
              {meta.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>
        <div className="case-study__body" dangerouslySetInnerHTML={{ __html: sizeBleedImages(html) }} />
      </article>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        type
        title
        summary
        role
        period
        team
        tools
      }
    }
  }
`;
