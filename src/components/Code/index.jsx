import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'
import * as styles from './Code.module.css'

const CopyButton = (props) => {
  return <button className={styles.copyButton} {...props} />
}

/**
 * @todo vet this method / write-up best ways to handle clipboard
 */
const copyToClipboard = (str) => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const Code = ({ codeString, language, ...props }) => {
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
          <CopyButton
            onClick={() => {
              copyToClipboard(codeString)
              setIsCopied(true)
              setTimeout(() => setIsCopied(false), 3000)
            }}
          >
            {isCopied ? <i>Copied!</i> : 'Copy'}
          </CopyButton>

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
