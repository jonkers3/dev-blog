import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import kebabCase from 'lodash.kebabcase'
import Code from '@components/Code'

const BlogPost = ({ data }) => {
  return (
    <>
      <TagList tags={data.mdx.frontmatter.tags} />
      <MDXProvider components={components}>
        <p>{data.mdx.frontmatter.date}</p>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </MDXProvider>
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

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        tags
      }
      slug
      body
    }
  }
`

const components = {
  pre: (preProps) => {
    if (preProps.children?.props?.mdxType === 'code') {
      const {
        children: codeString,
        className = '',
        ...props
      } = preProps.children.props

      const match = className.match(/language-([\0-\uFFFF]*)/)

      return (
        <Code
          {...props}
          codeString={codeString.trim()}
          className={className}
          language={match != null ? match[1] : ''}
        />
      )
    }

    return <pre {...preProps} />
  }
}

export default BlogPost
