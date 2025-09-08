'use client';

import CenterBlock from '@components/centerblock/CenterBlock';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useEffect, useMemo } from 'react';
import { resetFilters } from '../../../store/features/trackSlice';
import { applySearch } from '@utils/applySearch';

export default function FavoritePage() {
  const dispatch = useAppDispatch();
  const {
    favoriteTracks,
    titlePlaylist,
    errorMessage,
    filteredTracks,
    filters,
    searchTrack,
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

    if (hasFilters && !searchTrack.trim()) {
      return filteredTracks;
    } else if (hasFilters && searchTrack.trim()) {
      return applySearch(filteredTracks, searchTrack);
    } else if (!hasFilters && searchTrack.trim()) {
      return applySearch(favoriteTracks, searchTrack);
    } else {
      return favoriteTracks;
    }
  }, [favoriteTracks, filteredTracks, filters, searchTrack]);

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
