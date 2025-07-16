import Nav from '@components/nav/Nav';
import styles from './notfound.module.css';
import Link from 'next/link';
import Bar from '@components/bar/Bar';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Nav />
          <div className={styles.centerblock__search}>
            <svg className={styles.search__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
            </svg>
            <input
              className={styles.search__text}
              type="search"
              placeholder="Поиск"
              name="search"
            />
          </div>
          <div className={styles.sidebar__personal}>
            <div className={styles.sidebar__icon}>
              <svg>
                <use xlinkHref="/img/icon/sprite.svg#logout"></use>
              </svg>
            </div>
          </div>
        </div>

        <h1 className={styles.centerblock__h1}>404</h1>
        <div className={styles.content}>
          <h4 className={styles.title}>Страница не найдена</h4>
          <p className={styles.text}>
            Возможно, она была удалена или перенесена на другой адрес
          </p>
          <Link href={'/'}>
            <button className={styles.modal__btnEnter}>
              Вернуться на главную
            </button>
          </Link>
        </div>
        <Bar />
      </div>
    </div>
  );
}
