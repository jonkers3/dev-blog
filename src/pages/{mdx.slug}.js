import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { preToCodeBlock } from 'mdx-utils'
import Code from '@components/Code'
import Layout from '@components/Layout'

const components = {
  pre: (preProps) => {
    const props = preToCodeBlock(preProps)

    if (props) {
      return <Code {...props} />
    } else {
      return <pre {...preProps} />
    }
  }
}

const BlogPost = ({ data }) => {
  return (
    <Layout>
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
      }
      body
    }
  }
`

export default BlogPost
