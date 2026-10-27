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
        // The home screen and Apple touch icons, on a tile as iOS fills transparency with black.
        // The tab's favicon is the bare logo instead, linked in gatsby-ssr.js.
        icon: `src/images/icon.svg`,
        include_favicon: false,
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
              // Lets logos drawn on transparency sit on the page's own colour in both themes
              backgroundColor: `transparent`,
              // The blurred preview would show through the transparent parts
              disableBgImageOnAlpha: true,
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
