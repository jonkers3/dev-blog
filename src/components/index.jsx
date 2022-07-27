import * as React from 'react'
import Code from '@components/Code'

const mdxComponents = {
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

export { mdxComponents }
