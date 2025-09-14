import { TrackType } from '@shared-types/SharedTypes';
import { initialStateType } from '../store/features/trackSlice';

export const applyFilters = (state: initialStateType): TrackType[] => {
  let filteredPlaylist = state.pagePlaylist;

  if (state.filters.authors.length) {
    filteredPlaylist = filteredPlaylist.filter((track) => {
      return state.filters.authors.includes(track.author);
    });
  }

  if (state.filters.genres.length) {
    filteredPlaylist = filteredPlaylist.filter((track) => {
      return state.filters.genres.some((el) => track.genre.includes(el));
    });
  }

  if (state.filters.years === 'Сначала новые') {
    filteredPlaylist = filteredPlaylist.slice().sort((a, b) => {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });
  } else if (state.filters.years === 'Сначала старые') {
    filteredPlaylist = filteredPlaylist.slice().sort((a, b) => {
      return (
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
    });
  }

  return filteredPlaylist;
};
