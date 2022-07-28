const path = require('path')
const { svgr } = require('vite-plugin-react-svgr')

/** @type {import("@previewjs/config").PreviewConfig} */
module.exports = {
  alias: {
    '@components': path.resolve(__dirname, 'src', 'components'),
    '@assets': path.resolve(__dirname, 'src', 'assets')
  },
  vite: {
    plugins: [
      svgr({
        exportAs: 'default',
        alias: {
          '@components': path.resolve(__dirname, 'src', 'components'),
          '@assets': path.resolve(__dirname, 'src', 'assets')
        }
      })
    ]
  },
  wrapper: {
    path: 'preview.wrapper.js',
    componentName: 'Wrapper'
  }
}
