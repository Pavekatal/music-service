'use client';
import classnames from 'classnames';
import styles from './centerblock.module.css';
import Search from '@components/search/Search';
import Track from '@components/track-card/Track';
import FilterTrack from '@components/filter-track/FilterTrack';
// import { TrackType } from '@shared-types/SharedTypes';
import { useAppSelector } from '../../store/store';
import Loader from '@components/loader/Loader';
// import { useEffect, useState } from 'react';

// type centerBlockProps = {
//   tracks: TrackType[];
// };

export default function CenterBlock() {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const currentPlaylist = useAppSelector(
    (state) => state.tracks.currentPlaylist,
  );
  const titlePlaylist = useAppSelector((state) => state.tracks.titlePlaylist);
  // const [isLoading, setIsLoading] = useState(true);
  console.log('isLoading from centerblock:', isLoading);
  console.log('currentPlaylist from category:', currentPlaylist);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  return (
    <div className={styles.centerblock}>
      <Search />
      {isLoading ? (
        <Loader width="75%" height={72} style={{ marginBottom: '15px' }} />
      ) : (
        <h2 className={styles.centerblock__h2}>{titlePlaylist}</h2>
      )}

      <FilterTrack tracks={currentPlaylist} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classnames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>

        <div className={styles.content__playlist}>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <Loader width="100%" height={30} key={index} />
              ))
            : currentPlaylist.map((track) => (
                <Track
                  key={track._id}
                  track={track}
                  playlist={currentPlaylist}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
