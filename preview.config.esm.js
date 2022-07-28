const path = require('path')
import { svgr } from 'vite-plugin-react-svgr'
import * as React from 'react'

/** @type {import("@previewjs/config").PreviewConfig} */
module.exports = {
  alias: {
    '@components': path.resolve(__dirname, 'src', 'components'),
    '@assets': path.resolve(__dirname, 'src', 'assets')
  },
  vite: {
    plugins: [
      svgr({
        // exportAs: "ReactComponent",
        exportAs: 'default',
        alias: {
          '@components': path.resolve(__dirname, 'src', 'components'),
          '@assets': path.resolve(__dirname, 'src', 'assets')
        }
      })
    ]
  },
  wrapper: {
    path: 'preview.config.esm.js',
    componentName: 'Wrapper'
  }
}
