const path = require('path')
import kebabCase from 'lodash.kebabcase'

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src', 'components'),
        '@assets': path.resolve(__dirname, 'src', 'assets')
      }
    }
  })
}

export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      date: Date @dateformat
    }
    type MdxFrontmatter {
      tags: [String]
    }
  `)
}

export const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            frontmatter {
              title
              date
              tags
            }
            slug
          }
        }
      }
    }
  `)

  const tags = {}
  const tagTemplate = path.resolve(`src/templates/tag.js`)

  result.data.allMdx.edges
    .filter(({ node }) => node.frontmatter.tags)
    .forEach(({ node }) => {
      node.frontmatter.tags.forEach((tag) => {
        if (!tags[tag]) {
          tags[tag] = []
        }
        tags[tag].push(node.slug)
      })
    })

  Object.keys(tags).forEach((tag) => {
    createPage({
      path: `/tags/${kebabCase(tag)}`,
      component: tagTemplate,
      context: {
        tag,
        slugs: tags[tag]
      }
    })
  })
}

export const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent)
    let collection = parent.sourceInstanceName
    createNodeField({
      node,
      name: 'collection',
      value: collection
    })
  }
}
