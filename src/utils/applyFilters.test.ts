import { TrackType } from '@shared-types/SharedTypes';
import { initialStateType } from '../store/features/trackSlice';
import { applyFilters } from './applyFilters';

describe('applyFilters', () => {
  const sampleTracks: TrackType[] = [
    {
      _id: 1,
      name: 'Track 1',
      author: 'Author A',
      release_date: '2023-09-01',
      genre: ['Классическая музыка'],
      duration_in_seconds: 200,
      album: 'Album 1',
      logo: null,
      track_file: '',
      stared_user: [],
    },
    {
      _id: 2,
      name: 'Track 2',
      author: 'Author B',
      release_date: '2021-05-10',
      genre: ['Поп'],
      duration_in_seconds: 180,
      album: 'Album 2',
      logo: null,
      track_file: '',
      stared_user: [],
    },
    {
      _id: 3,
      name: 'Track 3',
      author: 'Author A',
      release_date: '2022-12-15',
      genre: ['Классическая музыка', 'Поп'],
      duration_in_seconds: 220,
      album: 'Album 3',
      logo: null,
      track_file: '',
      stared_user: [],
    },
  ];

  const baseState: initialStateType = {
    pagePlaylist: [...sampleTracks],
    filteredTracks: [],
    currentTrack: null,
    currentPlaylist: [...sampleTracks],
    shuffledPlaylist: [...sampleTracks],
    isShuffle: false,
    searchTrack: '',
    favoriteTracks: [],
    errorMessage: '',
    titlePlaylist: '',
    filters: {
      authors: [],
      genres: [],
      years: 'По умолчанию',
    },
    isPlay: false,
    collectionTracks: [...sampleTracks],
    allTracks: [...sampleTracks],
    currentTime: 0,
  };

  it('без фильтров возвращает исходный список', () => {
    const result: TrackType[] = applyFilters({
      ...baseState,
      filters: { authors: [], genres: [], years: 'По умолчанию' },
      pagePlaylist: [...sampleTracks],
    });
    expect(result).toEqual(sampleTracks);
  });

  it('фильтр по автору', () => {
    const state = {
      ...baseState,
      filters: {
        authors: ['Author A'],
        genres: [],
        years: 'По умолчанию',
      },
    };
    const result = applyFilters(state);
    expect(result).toEqual([sampleTracks[0], sampleTracks[2]]);
  });

  test('фильтр по жанру', () => {
    const state = {
      ...baseState,
      filters: {
        authors: [],
        genres: ['Поп'],
        years: 'По умолчанию',
      },
    };
    const result = applyFilters(state);
    expect(result).toEqual([sampleTracks[1], sampleTracks[2]]);
  });

  test('фильтр по автору и жанру одновременно', () => {
    const state = {
      ...baseState,
      filters: {
        authors: ['Author A'],
        genres: ['Классическая музыка'],
        years: 'По умолчанию',
      },
    };
    const result = applyFilters(state);
    expect(result).toEqual([sampleTracks[0], sampleTracks[2]]);
  });

  test('сортировка по новизне', () => {
    const state = {
      ...baseState,
      filters: {
        authors: [],
        genres: [],
        years: 'Сначала новые',
      },
    };
    const result = applyFilters(state);
    expect(result[0].release_date).toBe('2023-09-01');
  });

  test('сортировка по старым', () => {
    const state = {
      ...baseState,
      filters: {
        authors: [],
        genres: [],
        years: 'Сначала старые',
      },
    };
    const result = applyFilters(state);
    expect(result[0].release_date).toBe('2021-05-10');
  });
});
