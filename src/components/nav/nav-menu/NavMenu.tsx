import Link from 'next/link';
import styles from './nav-menu.module.css';

export default function NavMenu() {
  return (
    <div className={styles.nav__menu}>
      <ul className={styles.menu__list}>
        <li className={styles.menu__item}>
          {/*TODO: a -> Link*/}
          <Link href="#" className={styles.menu__link}>
            Главное
          </Link>
        </li>
        <li className={styles.menu__item}>
          <Link href="#" className={styles.menu__link}>
            Мой плейлист
          </Link>
        </li>
        <li className={styles.menu__item}>
          <Link href="../sign-in" className={styles.menu__link}>
            Войти
          </Link>
        </li>
      </ul>
    </div>
  );
}
