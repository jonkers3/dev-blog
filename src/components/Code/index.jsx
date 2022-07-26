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

const extractMetadata = (raw) => rangeParser(String(raw)) ?? []

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

  const highlighted = extractMetadata(highlight)
  const adding = extractMetadata(add)
  const removing = extractMetadata(remove)
  const excluding = extractMetadata(exclude)
  const commands = extractMetadata(command)

  const allHighlighted = adding + removing + highlighted

  const showLineNums = parseInt(start) > 0
  const hideGutter = !showLineNums && adding.length < 1 && removing.length < 1

  const copyExclude = removing + excluding
  const copyString = getCopyString(copyExclude, codeString)

  return (
    <div className={styles.component}>
      <div style={{ display: 'flex', position: 'relative' }}>
        <If condition={file}>
          <div className={styles.filename}>{file}</div>
        </If>
        <div style={{ display: 'flex', flexGrow: 1 }}></div>
        <If condition={language !== 'none'}>
          <div className={styles.language}>{language}</div>
        </If>
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
                  props['data-prepend'] = getTerminalCommands(
                    i,
                    commands,
                    codeString
                  )
                } else if (showLineNums) {
                  props['data-line-number'] = `${(
                    (parseInt(start) + i).toString() + '    '
                  ).slice(0, 4)}`
                }

                return (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    className={clsx({
                      [styles.line]: true,
                      [styles.noIndent]: hideGutter,
                      [styles.addLine]: adding.includes(i + 1),
                      [styles.removeLine]: removing.includes(i + 1),
                      [styles.highlightLine]: allHighlighted.includes(i + 1)
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

const getCopyString = (copyExclude, codeString) =>
  copyExclude.length
    ? codeString
        .split('\n')
        .filter((x, i) => copyExclude.includes(i + 1))
        .join('\n')
    : codeString

const getTerminalCommands = (i, commands, codeString) =>
  codeString.split('\n').length === 1 || commands.includes(i + 1)
    ? '$ │   '
    : '  │   '

export default Code
