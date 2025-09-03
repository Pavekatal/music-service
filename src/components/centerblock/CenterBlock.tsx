import classnames from 'classnames';
import styles from './centerblock.module.css';
import Search from '@components/search/Search';
import Track from '@components/track-card/Track';
import FilterTrack from '@components/filter-track/FilterTrack';
import Loader from '@components/loader/Loader';
import { TrackType } from '@shared-types/SharedTypes';

type CenterBlockProps = {
  isLoading: boolean;
  tracks: TrackType[];
  title: string;
  errorMessage: string;
};

export default function CenterBlock({
  isLoading,
  tracks,
  title,
  errorMessage,
}: CenterBlockProps) {
  return (
    <div className={styles.centerblock}>
      <Search />
      {isLoading ? (
        <Loader width="75%" height={72} style={{ marginBottom: '15px' }} />
      ) : (
        <h2 className={styles.centerblock__h2}>{title}</h2>
      )}

      <FilterTrack tracks={tracks} />
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
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <Loader width="100%" height={30} key={index} />
            ))
          ) : errorMessage ? (
            <div className={styles.error__message}>{errorMessage}</div>
          ) : (
            tracks.map((track) => (
              <Track key={track._id} track={track} playlist={tracks} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
