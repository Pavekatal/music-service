'use client';

import { ReactNode, useEffect, useState } from 'react';
import styles from './layout.module.css';
import Nav from '@components/nav/Nav';
import Sidebar from '@components/sidebar/Sidebar';
import Bar from '@components/bar/Bar';
import { getSelectionTracks, getTracks } from '../../services/tracks/tracksApi';
import { useAppDispatch } from '../../store/store';
import { setIsLoading } from '../../store/features/loadingSlice';
import { SelectionTrackType, TrackType } from '@shared-types/SharedTypes';
import { useParams } from 'next/navigation';
import {
  setCurrentPlaylist,
  setTitlePlaylist,
} from '../../store/features/trackSlice';
import { AxiosError } from 'axios';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  const dispatch = useAppDispatch();

  const [allTracks, setAllTracks] = useState<TrackType[]>([]);
  const [selectionTracks, setSelectionTracks] =
    useState<SelectionTrackType | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const params = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(setIsLoading(true));
    getTracks()
      .then((res) => {
        setAllTracks(res);
        dispatch(setCurrentPlaylist(res));
        dispatch(setTitlePlaylist('Треки'));
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
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      dispatch(setIsLoading(true));
      getSelectionTracks(params.id)
        .then((res) => {
          setSelectionTracks(res);
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    } else {
      setSelectionTracks(null);
      dispatch(setIsLoading(true));
      getTracks()
        .then((res) => {
          setAllTracks(res);
          dispatch(setCurrentPlaylist(res));
          dispatch(setTitlePlaylist('Треки'));
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
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectionTracks) {
      const selection = allTracks.filter((track) =>
        selectionTracks.items.includes(track._id),
      );
      dispatch(setCurrentPlaylist(selection));
      dispatch(setTitlePlaylist(selectionTracks.name));
    }
  }, [dispatch, allTracks, selectionTracks]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.error__message}>{errorMessage}</div>
          <main className={styles.main}>
            <Nav />
            {children}
            <Sidebar />
          </main>
          <Bar />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
