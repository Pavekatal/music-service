'use client';

import CenterBlock from '@components/centerblock/CenterBlock';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useEffect, useMemo } from 'react';
import { resetFilters } from '../../../store/features/trackSlice';

export default function FavoritePage() {
  const dispatch = useAppDispatch();
  const {
    favoriteTracks,
    titlePlaylist,
    errorMessage,
    filteredTracks,
    filters,
  } = useAppSelector((state) => state.tracks);
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const playlist = useMemo(() => {
    const hasFilters =
      filters.authors.length > 0 ||
      filters.genres.length > 0 ||
      filters.years !== 'По умолчанию';

    return hasFilters ? filteredTracks : favoriteTracks;
  }, [favoriteTracks, filteredTracks, filters]);

  return (
    <CenterBlock
      isLoading={isLoading}
      tracks={playlist}
      title={titlePlaylist}
      errorMessage={errorMessage}
      pagePlaylist={favoriteTracks}
    />
  );
}
