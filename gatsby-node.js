const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src', 'components'),
        '@assets': path.resolve(__dirname, 'src', 'assets')
      }
    }
  })
}

exports.createSchemaCustomization = ({ actions }) => {
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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  result = await graphql(`
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
      path: `/tags/${tag}`,
      component: tagTemplate,
      context: {
        tag,
        slugs: tags[tag]
      }
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
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
