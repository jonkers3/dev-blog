import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Code from '@components/Code'

const components = {
  pre: (preProps) => {
    if (
      preProps.children &&
      preProps.children.props &&
      preProps.children.props.mdxType === 'code'
    ) {
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

const BlogPost = ({ data }) => {
  debugger
  return (
    <>
      <ul style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {data.mdx.frontmatter.tags.map((tag) => (
          <li style={{ margin: 8, listStyle: 'none' }}>
            <Link to={`/tags/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
      <MDXProvider components={components}>
        <p>{data.mdx.frontmatter.date}</p>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </MDXProvider>
    </>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        tags
      }
      body
    }
  }
`

export default BlogPost
