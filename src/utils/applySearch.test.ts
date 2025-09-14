import { TrackType } from '@shared-types/SharedTypes';
import { applySearch } from './applySearch';

const mockTracks: TrackType[] = [
  {
    _id: 1,
    name: 'Chase',
    author: 'Alexander Nakarada',
    release_date: '2005-06-11',
    genre: ['Классическая музыка'],
    duration_in_seconds: 205,
    album: 'Chase',
    logo: null,
    track_file: 'url1',
    stared_user: [],
  },
  {
    _id: 2,
    name: 'Open Sea epic',
    author: 'Frank Schroter',
    release_date: '2019-06-12',
    genre: ['Классическая музыка'],
    duration_in_seconds: 165,
    album: 'Open Sea epic',
    logo: null,
    track_file: 'url2',
    stared_user: [],
  },
  {
    _id: 3,
    name: 'Sneaky Snitch',
    author: 'Kevin Macleod',
    release_date: '2022-04-16',
    genre: ['Классическая музыка'],
    duration_in_seconds: 305,
    album: 'Sneaky Snitch',
    logo: null,
    track_file: 'url3',
    stared_user: [],
  },
];

describe('applySearch', () => {
  it('возвращает все треки, если запрос пустой или состоит из пробелов', () => {
    expect(applySearch(mockTracks, '')).toEqual(mockTracks);
    expect(applySearch(mockTracks, '   ')).toEqual(mockTracks);
  });

  it('поиск треков по названию', () => {
    const result = applySearch(mockTracks, 'chase');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Chase');
  });

  it('поиск треков по автору', () => {
    const result = applySearch(mockTracks, 'kevin');
    expect(result).toHaveLength(1);
    expect(result[0].author).toBe('Kevin Macleod');
  });

  it('поиск треков по альбому', () => {
    const result = applySearch(mockTracks, 'open sea');
    expect(result).toHaveLength(1);
    expect(result[0].album).toBe('Open Sea epic');
  });

  it('не учитывается регистр', () => {
    const result = applySearch(mockTracks, 'SNEAKY');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Sneaky Snitch');
  });

  it('возвращает пустой список, если искомого нет', () => {
    const result = applySearch(mockTracks, 'nonexistent');
    expect(result).toHaveLength(0);
  });
});
