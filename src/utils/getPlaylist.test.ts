import { applySearch } from './applySearch';
import { getPlaylist } from './getPlaylist';

jest.mock('./applySearch');

describe('getPlaylist', () => {
  const baseTracks = [
    {
      _id: 8,
      name: 'Chase',
      author: 'Alexander Nakarada',
      release_date: '2005-06-11',
      genre: ['Классическая музыка'],
      duration_in_seconds: 205,
      album: 'Chase',
      logo: null,
      track_file:
        'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3',
      stared_user: [],
    },
    {
      _id: 9,
      name: 'Open Sea epic',
      author: 'Frank Schroter',
      release_date: '2019-06-12',
      genre: ['Классическая музыка'],
      duration_in_seconds: 165,
      album: 'Open Sea epic',
      logo: null,
      track_file:
        'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Frank_Schroter_-_Open_Sea_epic.mp3',
      stared_user: [],
    },
    {
      _id: 10,
      name: 'Sneaky Snitch',
      author: 'Kevin Macleod',
      release_date: '2022-04-16',
      genre: ['Классическая музыка'],
      duration_in_seconds: 305,
      album: 'Sneaky Snitch',
      logo: null,
      track_file:
        'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Kevin_Macleod_-_Sneaky_Snitch.mp3',
      stared_user: [],
    },
  ];

  const filteredTracks = [
    {
      _id: 9,
      name: 'Open Sea epic',
      author: 'Frank Schroter',
      release_date: '2019-06-12',
      genre: ['Классическая музыка'],
      duration_in_seconds: 165,
      album: 'Open Sea epic',
      logo: null,
      track_file:
        'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Frank_Schroter_-_Open_Sea_epic.mp3',
      stared_user: [],
    },
  ];

  const filters = {
    authors: [],
    genres: [],
    years: 'По умолчанию',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('возвращает список треков, когда применены фильтры, а поиск пустой', () => {
    const searchTrack = '';
    const activeFilters = {
      authors: ['Author'],
      genres: ['Genre'],
      years: 'Сначала старые',
    };
    const result = getPlaylist(
      baseTracks,
      filteredTracks,
      activeFilters,
      searchTrack,
    );
    expect(result).toBe(filteredTracks);
  });

  it('возвращает список треков, когда применены фильтры и задан поиск', () => {
    const searchTrack = 'some search';
    (applySearch as jest.Mock).mockReturnValue(['search result']);

    const filtersWithAuthors = {
      authors: ['Author'],
      genres: [],
      years: 'По умолчанию',
    };

    const result = getPlaylist(
      baseTracks,
      filteredTracks,
      filtersWithAuthors,
      searchTrack,
    );
    expect(applySearch).toHaveBeenCalledWith(filteredTracks, searchTrack);
    expect(result).toEqual(['search result']);
  });

  it('возвращает список треков, когда фильтры не применены и задан поиск', () => {
    const searchTrack = 'some search';
    (applySearch as jest.Mock).mockReturnValue(['search result']);

    const emptyFilters = {
      authors: [],
      genres: [],
      years: 'По умолчанию',
    };

    const result = getPlaylist(
      baseTracks,
      filteredTracks,
      emptyFilters,
      searchTrack,
    );
    expect(applySearch).toHaveBeenCalledWith(baseTracks, searchTrack);
    expect(result).toEqual(['search result']);
  });

  it('возвращает первоначальный список треков, когда фильтры не применены и не задан поиск', () => {
    const searchTrack = '';
    const result = getPlaylist(
      baseTracks,
      filteredTracks,
      filters,
      searchTrack,
    );
    expect(result).toBe(baseTracks);
  });
});
