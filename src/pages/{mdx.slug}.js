import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { preToCodeBlock } from 'mdx-utils'
import Code from '@components/Code'
import Layout from '@components/Layout'

const components = {
  pre: (preProps) => {
    const props = preToCodeBlock(preProps)
    return props ? <Code {...props} /> : <pre {...preProps} />
  }
}

const BlogPost = ({ data }) => {
  debugger
  return (
    <Layout>
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
    </Layout>
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
