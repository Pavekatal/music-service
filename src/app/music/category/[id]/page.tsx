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
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setIsLoading } from '../../../../store/features/loadingSlice';
import Loader from '@components/loader/Loader';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const [allTracks, setAllTracks] = useState<TrackType[]>([]);
  const [selectionTracks, setSelectionTracks] =
    useState<SelectionTrackType | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(setIsLoading(true));
    getTracks()
      .then((res) => setAllTracks(res))
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data);
            console.log(error.response.data);
          } else if (error.request) {
            setErrorMessage(
              'Похоже, что-то с интернет-соединением. Попробуйте позже',
            );
          } else {
            setErrorMessage(
              'Неизвестная ошибка. Попробуйте перезагрузить страницу',
            );
          }
        }
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
    getSelectionTracks(params.id)
      .then((res) => setSelectionTracks(res))
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data);
            console.log(error.response.data);
          } else if (error.request) {
            setErrorMessage(
              'Похоже, что-то с интернет-соединением. Попробуйте позже',
            );
          } else {
            setErrorMessage(
              'Неизвестная ошибка. Попробуйте перезагрузить страницу',
            );
          }
        }
      });
  }, [params, dispatch]);
  console.log(selectionTracks);

  const tracks = selectionTracks
    ? allTracks.filter((track) => selectionTracks.items.includes(track._id))
    : [];

  console.log('tracks:', tracks);

  return (
    <>
      <div className={styles.centerblock}>
        <Search />
        {isLoading ? (
          <Loader width="75%" height={72} style={{ marginBottom: '15px' }} />
        ) : (
          <h2 className={styles.centerblock__h2}>{selectionTracks?.name}</h2>
        )}

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
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <Loader width="100%" height={30} key={index} />
                ))
              : tracks.map((track) => (
                  <Track key={track._id} track={track} playlist={tracks} />
                ))}
          </div>
        </div>
      </div>
      <div className={styles.error__message}>{errorMessage}</div>
    </>
  );
}
