module.exports = {
  siteMetadata: {
    title: `Marius Arnautu`,
    description: `Product designer and front-end developer. Case studies from B2B ESG data, reporting and analytics SaaS.`,
    author: `Marius Arnautu`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Gatsby's default of 50 leaves visible compression on artwork
        defaults: { quality: 90 },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Marius Arnautu`,
        short_name: `Marius`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#3A16D3`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900,
              quality: 90,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "fonts",
        path: `${__dirname}/src/fonts/`
      }
    }
  ],
}
