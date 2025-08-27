'use client';

import { ReactNode, useEffect, useState } from 'react';
import styles from './layout.module.css';
import Nav from '@components/nav/Nav';
import Sidebar from '@components/sidebar/Sidebar';
import Bar from '@components/bar/Bar';
import {
  getFavoriteTracks,
  getSelectionTracks,
  getTracks,
} from '../../services/tracks/tracksApi';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setIsLoading } from '../../store/features/loadingSlice';
import { SelectionTrackType } from '@shared-types/SharedTypes';
import { useParams, usePathname } from 'next/navigation';
import {
  setAllTracks,
  setCollectionTracks,
  setErrorMessage,
  setFavoriteTracks,
  setTitlePlaylist,
} from '../../store/features/trackSlice';
import { AxiosError } from 'axios';
import { useInitAuth } from '../../hooks/useInitAuth';
import { withReauth } from '@utils/withReAuth';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.users);

  const [selectionTracks, setSelectionTracks] =
    useState<SelectionTrackType | null>(null);

  const params = useParams<{ id: string }>();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(setIsLoading(true));
    if (pathname === '/music/main') {
      dispatch(setErrorMessage(''));
      getTracks()
        .then((res) => {
          dispatch(setAllTracks(res));
          dispatch(setTitlePlaylist('Треки'));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              dispatch(setErrorMessage(error.response.data));
              console.log(error.response.data);
            } else if (error.request) {
              dispatch(
                setErrorMessage(
                  'Похоже, что-то с интернет-соединением. Попробуйте позже',
                ),
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
  }, [dispatch, pathname]);

  useEffect(() => {
    if (params.id && pathname.startsWith('/music/category/')) {
      dispatch(setErrorMessage(''));
      dispatch(setIsLoading(true));
      getSelectionTracks(params.id)
        .then((res) => {
          setSelectionTracks(res);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              dispatch(setErrorMessage(error.response.data));
              console.log(error.response.data);
            } else if (error.request) {
              dispatch(
                setErrorMessage(
                  'Похоже, что-то с интернет-соединением. Попробуйте позже',
                ),
              );
            } else {
              dispatch(
                setErrorMessage(
                  'Неизвестная ошибка. Попробуйте перезагрузить страницу',
                ),
              );
            }
          }
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
  }, [dispatch, pathname, params.id]);

  useEffect(() => {
    if (selectionTracks && pathname.startsWith('/music/category/')) {
      if (!allTracks.length) {
        setErrorMessage('Не удалось получить список треков');
      }
      const selection = allTracks.filter((track) =>
        selectionTracks.items.includes(track._id),
      );
      dispatch(setCollectionTracks(selection));
      dispatch(setTitlePlaylist(selectionTracks.name));
    }
  }, [dispatch, pathname, allTracks, selectionTracks]);

  useEffect(() => {
    dispatch(setIsLoading(true));

    if (pathname === '/music/favorite') {
      dispatch(setErrorMessage(''));
      withReauth(
        () =>
          getFavoriteTracks(access)
            .then((res) => {
              dispatch(setFavoriteTracks(res));
              dispatch(setTitlePlaylist('Мой плейлист'));
              dispatch(setErrorMessage(''));
            })
            .catch((error) => {
              if (error instanceof AxiosError) {
                if (error.response) {
                  dispatch(setErrorMessage(error.response.data.message));
                  console.log(error.response.data);
                } else if (error.request) {
                  dispatch(
                    setErrorMessage(
                      'Похоже, что-то с интернет-соединением. Попробуйте позже',
                    ),
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
            }),
        refresh,
        dispatch,
      );
    }
  }, [dispatch, pathname, access, refresh]);

  useInitAuth();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
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
