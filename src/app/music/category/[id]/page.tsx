'use client';

import CenterBlock from '@components/centerblock/CenterBlock';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { resetFilters } from '../../../../store/features/trackSlice';
import { useEffect, useMemo } from 'react';

export default function CategoryPage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const {
    collectionTracks,
    titlePlaylist,
    errorMessage,
    filteredTracks,
    filters,
  } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const playlist = useMemo(() => {
    const hasFilters =
      filters.authors.length > 0 ||
      filters.genres.length > 0 ||
      filters.years !== 'По умолчанию';

    return hasFilters ? filteredTracks : collectionTracks;
  }, [collectionTracks, filteredTracks, filters]);

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
