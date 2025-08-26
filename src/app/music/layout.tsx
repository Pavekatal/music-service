'use client';

import { ReactNode, useEffect, useState } from 'react';
import styles from './layout.module.css';
import Nav from '@components/nav/Nav';
import Sidebar from '@components/sidebar/Sidebar';
import Bar from '@components/bar/Bar';
import { getSelectionTracks, getTracks } from '../../services/tracks/tracksApi';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setIsLoading } from '../../store/features/loadingSlice';
import { SelectionTrackType } from '@shared-types/SharedTypes';
import { useParams, usePathname } from 'next/navigation';
import {
  setAllTracks,
  setCurrentPlaylist,
  setErrorMessage,
  setTitlePlaylist,
} from '../../store/features/trackSlice';
import { AxiosError } from 'axios';
import { useInitAuth } from '../../hooks/useInitAuth';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  const dispatch = useAppDispatch();
  // const errorMessage = useAppSelector((state) => state.tracks.errorMessage);
  const allTracks = useAppSelector((state) => state.tracks.allTracks);

  // const [allTracks, setAllTracks] = useState<TrackType[]>([]);
  const [selectionTracks, setSelectionTracks] =
    useState<SelectionTrackType | null>(null);
  // const [errorMessage, setErrorMessage] = useState('');

  const params = useParams<{ id: string }>();
  const pathname = usePathname();

  useEffect(() => {
    console.log('pathname first:', pathname);
    dispatch(setIsLoading(true));
    if (pathname === '/music/main') {
      getTracks()
        .then((res) => {
          dispatch(setAllTracks(res));
          dispatch(setCurrentPlaylist(res));
          dispatch(setTitlePlaylist('Треки'));
          console.log('tracks from All Track Request');
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
    } else if (params.id && pathname.startsWith('/music/category/')) {
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

  // useEffect(() => {
  //   if (params.id) {
  //     dispatch(setIsLoading(true));
  //     getSelectionTracks(params.id)
  //       .then((res) => {
  //         setSelectionTracks(res);
  //       })
  //       .catch((error) => {
  //         if (error instanceof AxiosError) {
  //           if (error.response) {
  //             dispatch(setErrorMessage(error.response.data));
  //             console.log(error.response.data);
  //           } else if (error.request) {
  //             dispatch(
  //               setErrorMessage(
  //                 'Похоже, что-то с интернет-соединением. Попробуйте позже',
  //               ),
  //             );
  //           } else {
  //             dispatch(
  //               setErrorMessage(
  //                 'Неизвестная ошибка. Попробуйте перезагрузить страницу',
  //               ),
  //             );
  //           }
  //         }
  //       })
  //       .finally(() => {
  //         dispatch(setIsLoading(false));
  //       });
  //   }
  // else {
  //   setSelectionTracks(null);
  //   dispatch(setIsLoading(true));
  //   getTracks()
  //     .then((res) => {
  //       setAllTracks(res);
  //       dispatch(setCurrentPlaylist(res));
  //       dispatch(setTitlePlaylist('Треки'));
  //       console.log('tracks from Selection Track Request');
  //     })
  //     .catch((error) => {
  //       if (error instanceof AxiosError) {
  //         if (error.response) {
  //           dispatch(setErrorMessage(error.response.data));
  //           console.log(error.response.data);
  //         } else if (error.request) {
  //           dispatch(
  //             setErrorMessage(
  //               'Похоже, что-то с интернет-соединением. Попробуйте позже',
  //             ),
  //           );
  //         } else {
  //           dispatch(
  //             setErrorMessage(
  //               'Неизвестная ошибка. Попробуйте перезагрузить страницу',
  //             ),
  //           );
  //         }
  //       }
  //     })
  //     .finally(() => {
  //       dispatch(setIsLoading(false));
  //     });
  // }
  // }, [params.id, dispatch]);

  useEffect(() => {
    if (selectionTracks) {
      if (!allTracks.length) {
        setErrorMessage('Не удалось получить список треков');
      }
      const selection = allTracks.filter((track) =>
        selectionTracks.items.includes(track._id),
      );
      dispatch(setCurrentPlaylist(selection));
      dispatch(setTitlePlaylist(selectionTracks.name));
    }
  }, [dispatch, allTracks, selectionTracks]);

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
