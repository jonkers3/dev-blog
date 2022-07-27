import React from 'react'
import { graphql, Link } from 'gatsby'

export default function TagPage({
  data: { allMdx },
  pageContext: { tag, slugs }
}) {
  const posts = allMdx.edges

  return (
    <>
      <h1>#{tag}</h1>
      <ol>
        {posts.map(({ node }) => (
          <li key={node.slug}>
            <Link to={`/${node.slug}`}>{node.frontmatter.title}</Link>
          </li>
        ))}
      </ol>
    </>
  )
}

export const pageQuery = graphql`
  query ($slugs: [String]) {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { slug: { in: $slugs } }
    ) {
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
`
