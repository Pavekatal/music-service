'use client';

import CenterBlock from '@components/centerblock/CenterBlock';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useEffect, useMemo } from 'react';
import { resetFilters } from '../../../store/features/trackSlice';
import { applySearch } from '@utils/applySearch';

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
    const hasFilters =
      filters.authors.length > 0 ||
      filters.genres.length > 0 ||
      filters.years !== 'По умолчанию';

    if (hasFilters && !searchTrack.trim()) {
      return filteredTracks;
    } else if (hasFilters && searchTrack.trim()) {
      return applySearch(filteredTracks, searchTrack);
    } else if (!hasFilters && searchTrack.trim()) {
      return applySearch(allTracks, searchTrack);
    } else {
      return allTracks;
    }
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
