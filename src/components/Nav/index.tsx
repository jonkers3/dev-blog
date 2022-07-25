import * as React from 'react'
import { Link } from 'gatsby'
import * as styles from './Nav.module.css'
import GithubLink from '@assets/gh.svg'

export default function Nav() {
  return (
    <header>
      <nav>
        <ul className={styles.navLinks}>
          <li className={styles.navLinkItem}>
            <Link to='/' className={styles.navLinkText}>
              Home
            </Link>
          </li>
          <li className={styles.navLinkItem}>
            <a
              href='https://github.com/jonkers3/dev-blog'
              className={styles.navLinkItem}
              target='_new'
            >
              <GithubLink />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
