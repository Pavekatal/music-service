import { TrackType } from '@shared-types/SharedTypes';

export const applySearch = (
  tracks: TrackType[],
  query: string,
): TrackType[] => {
  if (!query.trim()) return tracks;

  const lowerQuery = query.toLowerCase();
  return tracks.filter(
    (track) =>
      track.name.toLowerCase().includes(lowerQuery) ||
      track.author.toLowerCase().includes(lowerQuery) ||
      track.album.toLowerCase().includes(lowerQuery),
  );
};
