'use client';

import Link from 'next/link';
import styles from './nav-menu.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { logout } from '../../../store/features/userSlice';
import { useRouter } from 'next/navigation';

export default function NavMenu() {
  const access = useAppSelector((state) => state.users.access);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClickLogout = () => {
    dispatch(logout());
    router.push('/auth/sign-in');
  };

  return (
    <div className={styles.nav__menu}>
      <ul className={styles.menu__list}>
        <li className={styles.menu__item}>
          {/*TODO: a -> Link*/}
          <Link href="#" className={styles.menu__link}>
            Главное
          </Link>
        </li>
        {access ? (
          <li className={styles.menu__item}>
            <Link href="#" className={styles.menu__link}>
              Мой плейлист
            </Link>
          </li>
        ) : null}
        <li onClick={onClickLogout} className={styles.menu__item}>
          <p className={styles.menu__link}>{access ? 'Выйти' : 'Войти'}</p>
        </li>
      </ul>
    </div>
  );
}
