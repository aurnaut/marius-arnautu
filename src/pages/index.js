import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import PostList from "../components/post-list";
import GraphicsAnimation from "../components/graphics-animation";

const IndexPage = ({ data}) => {
  const posts = data.allMarkdownRemark.edges;
  return (
  <Layout showCoversNav={false} narrow>
    <Seo title="Home" />
    <GraphicsAnimation />
    <h1 className="tagline">
      <span> Hi, I'm Marius</span>
      I design and build<br/>
      digital products.
    </h1>
    <PostList posts={posts} />
  </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          ...PostListItem
        }
      }
    }
  }
`;
