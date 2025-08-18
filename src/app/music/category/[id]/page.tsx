'use client';

import { useParams } from 'next/navigation';
import styles from './category.module.css';
import Search from '@components/search/Search';
import FilterTrack from '@components/filter-track/FilterTrack';
import classnames from 'classnames';
import Track from '@components/track-card/Track';
import { useEffect, useState } from 'react';
import {
  getSelectionTracks,
  getTracks,
} from '../../../../services/tracks/tracksApi';
import { SelectionTrackType, TrackType } from '@shared-types/SharedTypes';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const [allTracks, setAllTracks] = useState<TrackType[]>([]);
  const [selectionTracks, setSelectionTracks] =
    useState<SelectionTrackType | null>(null);

  useEffect(() => {
    getTracks().then((res) => setAllTracks(res));
    getSelectionTracks(params.id).then((res) => setSelectionTracks(res));
  }, [params]);
  console.log(selectionTracks);

  const tracks = selectionTracks
    ? allTracks.filter((track) => selectionTracks.items.includes(track._id))
    : [];

  console.log('tracks:', tracks);

  return (
    <>
      <div className={styles.centerblock}>
        <Search />
        <h2 className={styles.centerblock__h2}>{selectionTracks?.name}</h2>
        <FilterTrack tracks={tracks} />
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
            {tracks.map((track) => (
              <Track key={track._id} track={track} playlist={tracks} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
