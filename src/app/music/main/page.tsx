'use client';

import CenterBlock from '@components/centerblock/CenterBlock';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useEffect, useMemo } from 'react';
import { resetFilters } from '../../../store/features/trackSlice';
import { getPlaylist } from '@utils/getPlaylist';

export default function Home() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const {
    allTracks,
    titlePlaylist,
    errorMessage,
    filteredTracks,
    filters,
    searchTrack,
  } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const playlist = useMemo(() => {
    return getPlaylist(allTracks, filteredTracks, filters, searchTrack);
  }, [allTracks, filteredTracks, filters, searchTrack]);

  return (
    <CenterBlock
      isLoading={isLoading}
      tracks={playlist}
      title={titlePlaylist}
      errorMessage={errorMessage}
      pagePlaylist={allTracks}
    />
  );
}
