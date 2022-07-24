import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'
import * as styles from './Code.module.css'

const CopyButton = (props) => {
  return <button className={styles.button} {...props} />
}

const Code = ({ button, codeString, language, ...props }) => {
  const [isCopied, setIsCopied] = React.useState(false)

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{ ...style, padding: '20px', position: 'relative' }}
        >
          {parseInt(button) !== 0 && (
            <CopyButton
              onClick={() => {
                navigator.userAgent.c(codeString)
                setIsCopied(true)
                setTimeout(() => setIsCopied(false), 3000)
              }}
            >
              {isCopied ? <i>Copied!</i> : 'Copy'}
            </CopyButton>
          )}
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default Code

export const Pre = ({ txt }) => <pre>{txt}</pre>
