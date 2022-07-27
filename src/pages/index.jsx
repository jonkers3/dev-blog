import * as React from 'react'
import { graphql, Link } from 'gatsby'
import kebabCase from 'lodash.kebabcase'

const BlogPage = ({ data }) => {
  return (
    <>
      <ul style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {data.allMdx.tags.map(({ tag }) => (
          <li key={tag} style={{ margin: '8px', listStyle: 'none' }}>
            <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
          </li>
        ))}
      </ul>
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>
            <Link to={`/${node.slug}`}>{node.frontmatter.title}</Link>
          </h2>
          <p>
            Posted: {node.frontmatter.date} in{' '}
            {node.frontmatter.tags.map((tag, i) => (
              <>
                <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
                {i < node.frontmatter.tags.length - 1 ? ', ' : ''}
              </>
            ))}
          </p>
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
          tags
          title
        }
        tableOfContents
        slug
        id
      }
      tags: group(field: frontmatter___tags) {
        tag: fieldValue
        count: totalCount
      }
    }
  }
`

export default BlogPage
