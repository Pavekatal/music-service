'use client';

import CenterBlock from '@components/centerblock/CenterBlock';
import { useEffect, useState } from 'react';
import { getTracks } from '../../../services/tracks/tracksApi';
import styles from './page.module.css';
import { TrackType } from '@shared-types/SharedTypes';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
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
              'Неизвестная ошибка. Попробуйте перезарузить страницу',
            );
          }
        }
      });
  }, []);

  return (
    <div>
      <CenterBlock tracks={tracks} />
      <div className={styles.error__message}>{errorMessage}</div>
    </div>
  );
}
