import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout";
import Seo from "../components/seo";
import PostList from "../components/post-list";

const BlogPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Seo title="Blog" />
      <PostList posts={posts} />
    </Layout>
  );
};

export default BlogPage;

// Get all article markdown data, in descending order by date
export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {type: {eq: "article"}}}, sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          ...PostListItem
        }
      }
    }
  }
`;
