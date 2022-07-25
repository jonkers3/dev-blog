import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'
import rangeParser from 'parse-numeric-range'
import { clsx } from 'clsx'
import * as styles from './Code.module.css'
import Clipboard from '@assets/icon.svg'
import 'prismjs/plugins/command-line/prism-command-line.css'

const CopyButton = (props) => {
  const { isCopied, ...rest } = props

  return (
    <button className={styles.button} {...rest}>
      {' '}
      <Clipboard title='Copy' />
      {!isCopied ? (
        <span>
          <br />
          Copy
        </span>
      ) : (
        <i>
          <br />
          Copied!
        </i>
      )}
    </button>
  )
}

const calculateLinesToHighlight = (raw) => {
  if (raw) {
    const lineNumbers = rangeParser(raw)
    return lineNumbers
  }
  return []
}

const Code = ({
  exclude,
  copy,
  file,
  codeString,
  language,
  highlight,
  add,
  remove,
  output,
  start = 0
}) => {
  const isTerminal = !!output || language === 'sh'

  const [isCopied, setIsCopied] = React.useState(false)

  const showLineNums = parseInt(start) > 0

  const highlighted = calculateLinesToHighlight(highlight)
  const adding = calculateLinesToHighlight(add)
  const removing = calculateLinesToHighlight(remove)
  const excluding = calculateLinesToHighlight(exclude)

  const copyExclude = removing + excluding

  const copyString = copyExclude.length
    ? codeString
        .split('\n')
        .filter((x, i) => copyExclude.indexOf(i + 1) === -1)
        .join('\n')
    : codeString

  const getLineNumber = (i) =>
    showLineNums
      ? `${((parseInt(start) + i).toString() + '    ').slice(0, 4)}`
      : ''

  return (
    <div className={styles.component}>
      <div style={{ display: 'flex', position: 'relative' }}>
        {file && <div className={styles.filename}>{file}</div>}
        <div style={{ display: 'flex', flexGrow: 1 }}></div>
        {language && language !== 'none' && (
          <div className={styles.language}>{language}</div>
        )}
      </div>
      <div className={styles.codeContainer}>
        <Highlight
          {...defaultProps}
          code={codeString}
          language={language}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{
                ...style,
                position: 'relative',
                padding: '20px',
                margin: 0,
                background: '#000'
              }}
            >
              {parseInt(copy) !== 0 && (
                <CopyButton
                  onClick={() => {
                    navigator.clipboard.writeText(copyString)
                    setIsCopied(true)
                    setTimeout(() => setIsCopied(false), 1111)
                  }}
                  isCopied={isCopied}
                />
              )}
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  className={clsx({
                    [styles.line]: true,
                    [styles.noIndent]:
                      !showLineNums && adding.length < 1 && removing.length < 1,
                    [styles.addLine]: adding.includes(i + 1),
                    [styles.removeLine]: removing.includes(i + 1),
                    [styles.highlightLine]:
                      adding.includes(i + 1) ||
                      removing.includes(i + 1) ||
                      highlighted.includes(i + 1)
                  })}
                  data-line-number={getLineNumber(i)}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
              {isTerminal && output && (
                <div>
                  <hr />
                  {output}
                </div>
              )}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}

export default Code

export const Pre = ({ txt }) => <pre>{txt}</pre>
