import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Img from 'gatsby-image';
import GraphicsAnimation from "../components/graphics-animation";

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
 
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-GB');

const IndexPage = ({ data}) => {
  const posts = data.allMarkdownRemark.edges;
  return (
  <Layout>
    <SEO title="Home" />
    <h1 className="tagline">
      <span> Hi, I'm Marius</span>
      I design and develop<br/> 
      web applications.
    </h1>
    <GraphicsAnimation />
    <div className="post-list">
    {posts.map(post => (
          <div key={post.node.id} className="post-list__item">
            <div className="post-list__content">
            <a href={ post.node.frontmatter.type === 'article' ? '/blog' : '/projects'} className={ `post-list__type ${post.node.frontmatter.type}` }>{post.node.frontmatter.type}</a>
              <h2 className="post-list__title">
                <Link to={post.node.fields.slug}>
                  {post.node.frontmatter.title}
                </Link>
              </h2>
             
              <div className="post-list__excerpt">
                <p>{post.node.excerpt}</p>
              </div>
              <p className="post-list__date">Added {timeAgo.format(new Date(post.node.frontmatter.date))}</p>
            </div>
            <div className="post-list__thumbnail">
              <Link to={post.node.fields.slug}>
                <Img
                  fixed={post.node.frontmatter.thumbnail.childImageSharp.fixed}
                />
              </Link>
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
                fixed(width: 63, height: 63) {
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
