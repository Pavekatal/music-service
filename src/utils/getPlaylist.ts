import { TrackType } from '@shared-types/SharedTypes';
import { applySearch } from './applySearch';

type FiltersType = {
  authors: string[];
  genres: string[];
  years: string;
};

export const getPlaylist = (
  baseTracks: TrackType[],
  filteredTracks: TrackType[],
  filters: FiltersType,
  searchTrack: string,
): TrackType[] => {
  const hasFilters =
    filters.authors.length > 0 ||
    filters.genres.length > 0 ||
    filters.years !== 'По умолчанию';

  const trimmedSearch = searchTrack.trim();

  if (hasFilters && !trimmedSearch) {
    return filteredTracks;
  } else if (hasFilters && trimmedSearch) {
    return applySearch(filteredTracks, trimmedSearch);
  } else if (!hasFilters && trimmedSearch) {
    return applySearch(baseTracks, trimmedSearch);
  } else {
    return baseTracks;
  }
};
