'use client';

import CenterBlock from '@components/centerblock/CenterBlock';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { resetFilters } from '../../../../store/features/trackSlice';
import { useEffect, useMemo } from 'react';
import { getPlaylist } from '@utils/getPlaylist';

export default function CategoryPage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const {
    collectionTracks,
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
    return getPlaylist(collectionTracks, filteredTracks, filters, searchTrack);
  }, [collectionTracks, filteredTracks, filters, searchTrack]);

  return (
    <CenterBlock
      isLoading={isLoading}
      tracks={playlist}
      title={titlePlaylist}
      errorMessage={errorMessage}
      pagePlaylist={collectionTracks}
    />
  );
}
