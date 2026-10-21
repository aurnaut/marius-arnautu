import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import { TypeLink } from '../components/post-list';

const PostTemplate = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const isCaseStudy = frontmatter.type !== 'article';
  const meta = [
    ['Role', frontmatter.role],
    ['When', frontmatter.period],
    ['Team', frontmatter.team],
    ['Tools', frontmatter.tools],
  ].filter(([, value]) => value);

  return (
    <Layout>
      <Seo title={frontmatter.title} description={frontmatter.summary} />
      <article className="case-study">
        <Link className="case-study__back" to={isCaseStudy ? '/projects' : '/blog'}>
          ← All {isCaseStudy ? 'work' : 'articles'}
        </Link>
        <header className="case-study__header">
          <TypeLink type={frontmatter.type} />
          <h1>{frontmatter.title}</h1>
          {frontmatter.summary && <p className="case-study__summary">{frontmatter.summary}</p>}
          {meta.length > 0 ? (
            <dl className="case-study__meta">
              {meta.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <span>{frontmatter.date}</span>
          )}
        </header>
        <div className="case-study__body" dangerouslySetInnerHTML={{ __html: html }} />
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
