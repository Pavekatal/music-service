'use client';

import CenterBlock from '@components/centerblock/CenterBlock';
import { useEffect, useState } from 'react';
import { getTracks } from '../../../services/tracks/tracksApi';
import styles from './page.module.css';
import { TrackType } from '@shared-types/SharedTypes';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setIsLoading } from '../../../store/features/loadingSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(setIsLoading(true));
    getTracks()
      .then((res) => {
        setTracks(res);
      })
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
      .finally(() => dispatch(setIsLoading(false)));
  }, [dispatch]);

  console.log('isLoading from main:', isLoading);
  return (
    <div>
      <CenterBlock tracks={tracks} />
      <div className={styles.error__message}>{errorMessage}</div>
    </div>
  );
}
