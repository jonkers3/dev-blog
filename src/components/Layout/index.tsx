import React, { PropsWithChildren } from 'react'
import Nav from '@components/Nav'
import * as styles from './Layout.module.css'

const Layout = ({ children }: PropsWithChildren) => (
  <div className={styles.pageContainer}>
    <Nav />
    <div className={styles.innerContainer}>{children}</div>
  </div>
)

export default Layout
