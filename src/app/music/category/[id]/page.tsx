'use client';

import CenterBlock from '@components/centerblock/CenterBlock';
import { useAppSelector } from '../../../../store/store';

export default function CategoryPage() {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const { collectionTracks, titlePlaylist, errorMessage } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <CenterBlock
      isLoading={isLoading}
      tracks={collectionTracks}
      title={titlePlaylist}
      errorMessage={errorMessage}
    />
  );
}
