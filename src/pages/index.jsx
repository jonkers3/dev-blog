import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '@components/Layout'

const BlogPage = ({ data }) => {
  return (
    <>
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>
            <Link to={`/${node.slug}`}>{node.frontmatter.title}</Link>
          </h2>
          <p>Posted: {node.frontmatter.date}</p>
          <p>{node.slug}</p>
        </article>
      ))}
    </>
  )
}

export const query = graphql`
  query {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fields: { released: { eq: true } } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        tableOfContents
        slug
        id
      }
    }
  }
`

export default BlogPage
