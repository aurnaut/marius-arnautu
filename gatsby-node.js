const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve(`src/templates/postTemplate.js`);
  const categoryTemplate = path.resolve(`src/templates/categoryTemplate.js`);

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              type
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: postTemplate,
        context: { slug: node.fields.slug }, // additional data can be passed via context
      });
    });

    // One listing page per project type, e.g. /projects/design/
    const types = new Set(result.data.allMarkdownRemark.edges.flatMap(({ node }) => node.frontmatter.type));
    types.delete('article');
    types.forEach(type => {
      createPage({
        path: `/projects/${type}/`,
        component: categoryTemplate,
        context: { type },
      });
    });
  });
};

// Case study fields are optional, so declare them rather than rely on inference
exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes([
    `type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }`,
    schema.buildObjectType({
      name: `Frontmatter`,
      fields: {
        title: `String`,
        // A short name for the covers menu
        navTitle: `String`,
        // A post can have one type (type: design) or several (type: [design, development])
        type: {
          type: `[String]`,
          resolve: source => [].concat(source.type || []),
        },
        date: { type: `Date`, extensions: { dateformat: {} } },
        thumbnail: { type: `File`, extensions: { fileByRelativePath: {} } },
        summary: `String`,
        role: `String`,
        period: `String`,
        team: `String`,
        tools: `String`,
      },
    }),
  ]);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};