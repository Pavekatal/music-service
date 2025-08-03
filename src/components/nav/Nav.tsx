'use client';

import Image from 'next/image';
import styles from './nav.module.css';
import NavMenu from './nav-menu/NavMenu';
import { useState } from 'react';

export default function Nav() {
  const [openNavMenu, setOpenNavMenu] = useState(false);
  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        {/*TODO: img –> Image*/}
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
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
