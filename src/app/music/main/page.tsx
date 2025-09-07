'use client';

import CenterBlock from '@components/centerblock/CenterBlock';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useEffect, useMemo } from 'react';
import { resetFilters } from '../../../store/features/trackSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const { allTracks, titlePlaylist, errorMessage, filteredTracks, filters } =
    useAppSelector((state) => state.tracks);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const playlist = useMemo(() => {
    const hasFilters =
      filters.authors.length > 0 ||
      filters.genres.length > 0 ||
      filters.years !== 'По умолчанию';

    return hasFilters ? filteredTracks : allTracks;
  }, [allTracks, filteredTracks, filters]);

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
