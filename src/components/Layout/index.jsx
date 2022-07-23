import React from 'react'
import Nav from '../Nav'
import * as styles from './Layout.module.css'

const Layout = ({ children }) => (
  <div className={styles.pageContainer}>
    <Nav />
    <div className={styles.innerContainer}>{children}</div>
  </div>
)

export default Layout
