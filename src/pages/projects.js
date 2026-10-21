import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout";
import Seo from "../components/seo";
import PostList from "../components/post-list";
import ProjectsNav from "../components/projects-nav";

const ProjectsPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Seo title="Work" />
      <ProjectsNav />
      <PostList posts={posts} />
    </Layout>
  );
};

export default ProjectsPage;

// Get all project markdown data, in descending order by date
export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { type: { in: ["design", "development"] } }}, sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          ...PostListItem
        }
      }
    }
  }
`;
