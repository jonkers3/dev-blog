import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'
import rangeParser from 'parse-numeric-range'
import { clsx } from 'clsx'
import { If } from '@components/Utils'
import Clipboard from '@assets/icon.svg'
import * as styles from './Code.module.css'

const CopyButton = (props) => {
  const { isCopied, ...rest } = props

  return (
    <button className={styles.button} {...rest}>
      <Clipboard title='Copy' />
      <If condition={isCopied}>
        <i>
          <br />
          Copied!
        </i>
      </If>
    </button>
  )
}

const calculateLines = (raw) => {
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
  command,
  start = 0
}) => {
  const isTerminal = !!output || language === 'sh'

  const [isCopied, setIsCopied] = React.useState(false)

  const showLineNums = parseInt(start) > 0

  const highlighted = calculateLines(highlight)
  const adding = calculateLines(add)
  const removing = calculateLines(remove)
  const excluding = calculateLines(exclude)
  const commands = calculateLines(command)

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
            <pre>
              {parseInt(copy) !== 0 && (
                <CopyButton
                  onClick={() => {
                    navigator.clipboard.writeText(copyString)
                    setIsCopied(true)
                    setTimeout(() => setIsCopied(false), 4000)
                  }}
                  isCopied={isCopied}
                />
              )}
              {tokens.map((line, i) => {
                let props = {}

                if (isTerminal) {
                  props['data-prepend'] =
                    codeString.split('\n').length === 1 ||
                    commands.includes(i + 1)
                      ? '$ │   '
                      : '  │   '
                }

                if (showLineNums) {
                  props['data-line-number'] = getLineNumber(i)
                }

                return (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    className={clsx({
                      [styles.line]: true,
                      [styles.noIndent]:
                        !showLineNums &&
                        adding.length < 1 &&
                        removing.length < 1,
                      [styles.addLine]: adding.includes(i + 1),
                      [styles.removeLine]: removing.includes(i + 1),
                      [styles.highlightLine]:
                        adding.includes(i + 1) ||
                        removing.includes(i + 1) ||
                        highlighted.includes(i + 1)
                    })}
                    {...props}
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                )
              })}
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
