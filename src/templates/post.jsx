import * as React from 'react'
import { Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import kebabCase from 'lodash.kebabcase'
import { mdxComponents } from '@components'

const PrevAndNext = ({ prev, next }) => (
  <div
    style={{
      display: 'flex',
      paddingTop: '3rem'
    }}
  >
    <div style={{ flexBasis: 'calc(50%)', padding: '20px' }}>
      {prev && (
        <Link to={prev.url}>
          <span>Previous</span>
          <h3>{prev.title}</h3>
        </Link>
      )}
    </div>
    <div style={{ textAlign: 'end', flexBasis: 'calc(50%)', padding: '20px' }}>
      {next && (
        <Link to={next.url}>
          <span>Next</span>
          <h3>{next.title}</h3>
        </Link>
      )}
    </div>
  </div>
)

const PostPage = ({ pageContext, ...props }) => {
  const next = pageContext.next
    ? {
        url: `/${pageContext.next.slug}`,
        title: pageContext.next.frontmatter.title
      }
    : null

  const prev = pageContext.prev
    ? {
        url: `/${pageContext.prev.slug}`,
        title: pageContext.prev.frontmatter.title
      }
    : null

  return (
    <>
      <TagList tags={pageContext.node.frontmatter.tags} />
      <div style={{ textAlign: 'right' }}>
        {prev ? (
          <>
            <Link to={prev.url}>{'< '}Prev Post</Link>
          </>
        ) : (
          '< Prev Post'
        )}
        <> | </>
        {next ? (
          <>
            <Link to={next.url}>Next Post{' >'}</Link>
          </>
        ) : (
          'Next Post >'
        )}
      </div>
      <MDXProvider components={mdxComponents}>
        <h1>{pageContext.node.frontmatter.title}</h1>
        <p>{pageContext.node.frontmatter.date}</p>
        <br />
        <MDXRenderer>{pageContext.node.body}</MDXRenderer>
      </MDXProvider>
      <hr style={{ margin: '2rem', marginTop: '3rem' }} />
      <PrevAndNext pageContext={pageContext} />
    </>
  )
}

const TagList = ({ tags }) => (
  <ul style={{ display: 'flex', justifyContent: 'flex-end' }}>
    {tags.map((tag) => (
      <li key={tag} style={{ margin: '8px', listStyle: 'none' }}>
        <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
      </li>
    ))}
  </ul>
)

export default PostPage
