import * as React from 'react'
import { Link } from 'gatsby'
import * as styles from './Nav.module.css'
import GithubLink from '@assets/gh.svg'

export default function Nav() {
  return (
    <header>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <Link to='/' className={styles.navLink}>
              Home
            </Link>
          </li>
          {/* <li className={styles.navLinkItem}>
            <Link to='/contact' className={styles.navLinkText}>
              Contact
            </Link>
          </li> */}
          <li className={styles.navItem}></li>
          <li className={styles.navItem}>
            <a
              href='https://github.com/jonkers3/dev-blog'
              className={styles.navItem}
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
