import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import rangeParser from 'parse-numeric-range'
import { clsx } from 'clsx'
import { If } from '@components/Utils'
import ClipboardIcon from '@assets/clipboard.svg'
import * as styles from './Code.module.css'

const CopyButton = (props) => {
  const { isCopied, ...rest } = props

  return (
    <button className={styles.button} {...rest}>
      <ClipboardIcon title='Copy' />
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
  file = 'test.js',
  codeString = 'test\ntest22',
  language = 'JS',
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
  const terminalOutput = extractMetadata(output)
  const removing = extractMetadata(remove)
  const excluding = extractMetadata(exclude)
  const commands = extractMetadata(command)

  const allHighlighted = adding.concat(removing).concat(highlighted)

  const showLineNums = parseInt(start) > 0
  const hideGutter = !showLineNums && adding.length < 1 && removing.length < 1

  const copyExclude = removing + excluding
  const copyString = getCopyString(copyExclude, codeString)

  return (
    <div className={styles.component}>
      <div style={{ display: 'flex', position: 'relative' }}>
        <If condition={isTerminal || file}>
          <div className={styles.filename}>{isTerminal ? '>_' : file}</div>
        </If>
        <div style={{ display: 'flex', flexGrow: 1 }}></div>
        <If condition={language !== 'none'}>
          <div className={styles.language}>{language}</div>
        </If>
      </div>
      <div className={styles.codeContainer}>
        <Highlight {...defaultProps} code={codeString} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={clsx({
                [styles.terminal]: isTerminal || language === 'none'
              })}
            >
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
                      [styles.terminalOutput]: terminalOutput.includes(i + 1),
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
    ? '[user@localhost] $   ' // │
    : '                     '

export default Code
