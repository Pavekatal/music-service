'use client';

import { useParams } from 'next/navigation';
import styles from './category.module.css';
import Search from '@components/search/Search';
import FilterTrack from '@components/filter-track/FilterTrack';
import classnames from 'classnames';
import { data } from '@/data';
import Track from '@components/track-card/Track';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  return (
    <>
      <div className={styles.centerblock}>
        <Search />
        {params.id === '1' ? (
          <h2 className={styles.centerblock__h2}>Плейлист дня</h2>
        ) : null}
        {params.id === '2' ? (
          <h2 className={styles.centerblock__h2}>100 танцевальных хитов</h2>
        ) : null}
        {params.id === '3' ? (
          <h2 className={styles.centerblock__h2}>Инди-заряд</h2>
        ) : null}
        <FilterTrack />
        <div className={styles.centerblock__content}>
          <div className={styles.content__title}>
            <div
              className={classnames(styles.playlistTitle__col, styles.col01)}
            >
              Трек
            </div>
            <div
              className={classnames(styles.playlistTitle__col, styles.col02)}
            >
              Исполнитель
            </div>
            <div
              className={classnames(styles.playlistTitle__col, styles.col03)}
            >
              Альбом
            </div>
            <div
              className={classnames(styles.playlistTitle__col, styles.col04)}
            >
              <svg className={styles.playlistTitle__svg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
              </svg>
            </div>
          </div>
          <div className={styles.content__playlist}>
            {data.map((track) => (
              <Track key={track._id} track={track} playlist={data} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
