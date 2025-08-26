'use client';

import CenterBlock from '@components/centerblock/CenterBlock';
import { useAppSelector } from '../../../store/store';

export default function FavoritePage() {
  const { favoriteTracks, titlePlaylist, errorMessage } = useAppSelector(
    (state) => state.tracks,
  );
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <CenterBlock
      isLoading={isLoading}
      tracks={favoriteTracks}
      title={titlePlaylist}
      errorMessage={errorMessage}
    />
  );
}
