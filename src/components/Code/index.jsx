import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'
import * as styles from './Code.module.css'

const CopyButton = (props) => {
  return <button className={styles.button} {...props} />
}

const Code = ({ button, file, codeString, language, ...props }) => {
  const [isCopied, setIsCopied] = React.useState(false)

  return (
    <div
      style={{
        background: '#011627',
        borderRadius: '0.75rem',
        marginTop: '2rem',
        marginBottom: '2rem',
        padding: '10px',
        paddingLeft: '1.5rem',
        paddingRight: '6px'
      }}
    >
      <div style={{ display: 'flex', position: 'relative' }}>
        <div
          style={{
            color: '#9d9d9d',
            fontFamily: 'Montserrat',
            fontStyle: 'italic',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {file && `${file}`}
        </div>
        <div style={{ flexGrow: '1' }}></div>
        <div
          style={{
            marginTop: '6px',
            // paddingLeft: '0.5rem',
            paddingRight: '20px',
            paddingTop: '8px',
            paddingBottom: '0px',
            textTransform: 'uppercase',
            fontFamily: 'Montserrat',
            fontWeight: 'bold',
            border: 'none', //'1px solid black',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >{`${language}`}</div>
      </div>
      <div
        style={{
          overflow: 'auto',
          background: '#011627',
          borderRadius: '0.5rem'
        }}
      >
        <Highlight
          {...defaultProps}
          code={codeString}
          language={language}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{ ...style, position: 'relative', padding: '20px' }}
            >
              <CopyButton
                onClick={() => {
                  navigator.clipboard.writeText(codeString)
                  setIsCopied(true)
                  setTimeout(() => setIsCopied(false), 4000)
                }}
              >
                {isCopied ? <i>Copied</i> : 'Copy'}
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
      </div>
    </div>
  )
}

export default Code

export const Pre = ({ txt }) => <pre>{txt}</pre>
