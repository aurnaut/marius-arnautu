import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Img from 'gatsby-image';

const IndexPage = ({ data}) => {
  const posts = data.allMarkdownRemark.edges;
  return (
  <Layout>
    <SEO title="Home" />
    <h1 className="tagline">I design<br/> and develop<br/> web applications</h1>
    <div className="post-list">
    {posts.map(post => (
          <div key={post.node.id} className="post-list__item">
            <div className="post-list__thumbnail">
              <Link to={post.node.fields.slug}>
                <Img
                  fixed={post.node.frontmatter.thumbnail.childImageSharp.fixed}
                />
              </Link>
            </div>
            <div className="post-list__content">
            <span>{post.node.frontmatter.type}</span>
              <h2>
                <Link to={post.node.fields.slug}>
                  {post.node.frontmatter.title}
                </Link>
              </h2>
              <p>{post.node.frontmatter.date}</p>
              <div className="post-list__excerpt">
                <p>{post.node.excerpt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
  </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            type
            title
            thumbnail {
              childImageSharp {
                fixed(width: 200, height: 200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;