// const path = require(`path`)

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const template = path.resolve(`./src/pages/{mdx.slug}.js`)

//   const result = await graphql(`
//     query {
//       allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
//         edges {
//           node {
//             slug
//             frontmatter {
//               date(formatString: "DD MMMM YYYY")
//               title
//             }
//           }
//         }
//       }
//     }
//   `)

//   const items = result.data.allMdx.edges

//   items.forEach((edge, i) => {
//     createPage({
//       path: `${edge.node.slug}`,
//       component: template,
//       context: {
//         slug: edge.node.slug,
//         prev: i === 0 ? undefined : items[i - 1],
//         next: i === items.length - 1 ? undefined : items[i + 1]
//       }
//     })
//   })
// }
