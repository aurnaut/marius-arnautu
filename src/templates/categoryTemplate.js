import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import PostList from '../components/post-list';

const CategoryTemplate = ({ data, pageContext }) => {
  const title = pageContext.type.charAt(0).toUpperCase() + pageContext.type.slice(1);

  return (
    <Layout>
      <Seo title={title} />
      <PostList posts={data.allMarkdownRemark.edges} />
    </Layout>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query($type: String!) {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: $type } } }, sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          ...PostListItem
        }
      }
    }
  }
`;
