'use client';

import Image from 'next/image';
import styles from './nav.module.css';
import NavMenu from './nav-menu/NavMenu';
import { useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [openNavMenu, setOpenNavMenu] = useState(false);
  return (
    <nav className={styles.main__nav}>
      <Link href="/music/main">
        <div className={styles.nav__logo}>
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/img/logo.png"
            alt={'logo'}
          />
        </div>
      </Link>

      <div
        className={styles.nav__burger}
        onClick={() => {
          setOpenNavMenu(!openNavMenu);
        }}
      >
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {openNavMenu && <NavMenu />}
    </nav>
  );
}
