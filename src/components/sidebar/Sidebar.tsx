'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './sidebar.module.css';
import { logout } from '../../store/features/userSlice';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Loader from '@components/loader/Loader';

export default function Sidebar() {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClickLogout = () => {
    dispatch(logout());
    router.push('/music/main');
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        {isLoading ? (
          <Loader width={100} height={24} style={{ marginRight: '15px' }} />
        ) : currentUser ? (
          <p className={styles.sidebar__personalName}>{currentUser.username}</p>
        ) : (
          <p className={styles.sidebar__personalName}>Гость</p>
        )}

        <div className={styles.sidebar__icon} onClick={onClickLogout}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          {isLoading ? (
            <>
              <Loader width={250} height={150} />
              <Loader width={250} height={150} />
              <Loader width={250} height={150} />
            </>
          ) : (
            <>
              <div className={styles.sidebar__item}>
                <Link className={styles.sidebar__link} href="/music/category/1">
                  <Image
                    className={styles.sidebar__img}
                    src="/img/playlist01.png"
                    alt="day's playlist"
                    width={250}
                    height={150}
                  />
                </Link>
              </div>
              <div className={styles.sidebar__item}>
                <Link className={styles.sidebar__link} href="/music/category/2">
                  <Image
                    className={styles.sidebar__img}
                    src="/img/playlist02.png"
                    alt="day's playlist"
                    width={250}
                    height={150}
                  />
                </Link>
              </div>
              <div className={styles.sidebar__item}>
                <Link className={styles.sidebar__link} href="/music/category/3">
                  <Image
                    className={styles.sidebar__img}
                    src="/img/playlist03.png"
                    alt="day's playlist"
                    width={250}
                    height={150}
                  />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
