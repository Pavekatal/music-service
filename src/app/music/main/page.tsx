'use client';

import CenterBlock from '@components/centerblock/CenterBlock';
import { useAppSelector } from '../../../store/store';
import { TrackType } from '@shared-types/SharedTypes';
import { useEffect, useState } from 'react';

export default function Home() {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const { allTracks, titlePlaylist, errorMessage, filteredTracks, filters } =
    useAppSelector((state) => state.tracks);

  const [playlist, setPlaylist] = useState<TrackType[]>([]);

  useEffect(() => {
    const currentPlaylist = filters.authors.length ? filteredTracks : allTracks;
    setPlaylist(currentPlaylist);
  }, [allTracks, filteredTracks, filters.authors.length]);

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
