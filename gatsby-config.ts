import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  pathPrefix: process.env.PATH_PREFIX,

  siteMetadata: {
    title: `My Blog`,
    siteUrl: `https://jonkers3.github.io/dev-blog`
  },

  graphqlTypegen: true,

  plugins: [
    'gatsby-plugin-react-svg',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900
            }
          }
        ]
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/'
      },
      __key: 'pages'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: './blog/'
      },
      __key: 'blog'
    },

    {
      resolve: 'gatsby-plugin-released',
      options: {
        force: false
      }
    }
  ]
}

export default config
