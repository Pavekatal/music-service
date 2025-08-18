import classnames from 'classnames';
import styles from './centerblock.module.css';
import Search from '@components/search/Search';
import Track from '@components/track-card/Track';
import FilterTrack from '@components/filter-track/FilterTrack';
import { TrackType } from '@shared-types/SharedTypes';

type centerBlockProps = {
  tracks: TrackType[];
};

export default function CenterBlock({ tracks }: centerBlockProps) {
  console.log('tracks from centerblock', tracks);
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
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
          {tracks.map((track) => (
            <Track key={track._id} track={track} playlist={tracks} />
          ))}
        </div>
      </div>
    </div>
  );
}
