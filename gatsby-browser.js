import * as React from 'react'
// import 'normalize.css'
// import './src/styles/global.css'
import Layout from '@components/Layout'

const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export { wrapPageElement }
