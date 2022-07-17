import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'

const CopyButton = (props) => {
  return (
    <button
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        margin: '8px',
        padding: '8px 12px 8px 12px',
        borderRadius: '8px',
        borderWidth: 0,
        background: 'deepskyblue'
      }}
      {...props}
    />
  )
}

/**
 * @todo vet this method / write-up clipboard best practice
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
