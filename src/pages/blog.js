import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from "../components/layout";
import {GatsbyImage, getImage} from 'gatsby-plugin-image';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
 
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-GB');
const BlogPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <div className="post-list">
      {posts.map(post => (
          <div key={post.node.id} className="post-list__item">
            <div className="post-list__content">
            <span className={ `post-list__type ${post.node.frontmatter.type}` }>{post.node.frontmatter.type}</span>
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
                <GatsbyImage
                  alt={`${post.node.frontmatter.title} thumbnail`}
                  image={getImage(post.node.frontmatter.thumbnail)}
                  width={100}
                  height= {100}
                />
              </Link>
            </div>
            
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default BlogPage;

// Get all markdown data, in descending order by date, and grab the id, excerpt, slug, date, and title
export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {type: {eq: "article"}}}, sort: { order: DESC, fields: [frontmatter___date] }) {
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
                gatsbyImageData(
                  width: 150
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  }
`;