import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'

const TagPage = ({ data, pageContext: { tag } }) => {
  const posts = data.allMdx.edges

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
      filter: { slug: { in: $slugs }, fields: { released: { eq: true } } }
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

export default TagPage
