import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import PostList from "../components/post-list";
import GraphicsAnimation from "../components/graphics-animation";

const IndexPage = ({ data}) => {
  const posts = data.allMarkdownRemark.edges;
  return (
  <Layout>
    <Seo title="Home" />
    <h1 className="tagline">
      <span> Hi, I'm Marius</span>
      I design and build<br/>
      data-heavy B2B products.
    </h1>
    <GraphicsAnimation />
    <h2 className="section-title">Selected work</h2>
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
