import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@shared-types/SharedTypes';

// задаем типизацию для состояний по умолчанию
type initialStateType = {
  currentTrack: null | TrackType; // состояние для текущего трека
  isPlay: boolean;
  currentTime: number;
  currentPlaylist: TrackType[];
  titlePlaylist: string;
  isShuffle: boolean;
  shuffledPlaylist: TrackType[];
  allTracks: TrackType[];
  collectionTracks: TrackType[];
  favoriteTracks: TrackType[];
  errorMessage: string;
};

// создаем состояния по умолчанию
const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  currentTime: 0,
  currentPlaylist: [],
  titlePlaylist: '',
  isShuffle: false,
  shuffledPlaylist: [],
  allTracks: [],
  collectionTracks: [],
  favoriteTracks: [],
  errorMessage: '',
};
// создаем срез состояния с именем tracks, включающий в себя состояние по умолчанию initialState и редьюсеры setCurrentTrack, setIsPlay, setCurrentTime, setCurrentPlaylist, setIsShuffle:
const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setIsShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.currentPlaylist = action.payload;
      const shuffled = [...state.currentPlaylist].sort(
        () => Math.random() - 0.5,
      );

      if (state.currentPlaylist) {
        const currentIndexInShuffled = shuffled.findIndex(
          (track) => track._id === state.currentTrack?._id,
        );

        if (currentIndexInShuffled !== -1 && currentIndexInShuffled !== 0) {
          const [currentTrackItem] = shuffled.splice(currentIndexInShuffled, 1);
          shuffled.unshift(currentTrackItem);
        }
      }

      state.shuffledPlaylist = shuffled;
    },
    setTitlePlaylist: (state, action: PayloadAction<string>) => {
      state.titlePlaylist = action.payload;
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setCollectionTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.collectionTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id,
      );
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const currentIndex = playlist.findIndex(
        (i) => i._id === state.currentTrack?._id,
      );
      const nextIndexTrack = currentIndex + 1;
      if (nextIndexTrack >= playlist.length) {
        return;
      }
      state.currentTrack = playlist[nextIndexTrack];
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const currentIndex = playlist.findIndex(
        (i) => i._id === state.currentTrack?._id,
      );
      const prevIndexTrack = currentIndex - 1;
      if (prevIndexTrack < 0) {
        return;
      }
      state.currentTrack = playlist[prevIndexTrack];
    },
  },
});

// экспортируем редюсер - функцию с помощью деструктуризации
export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentTime,
  setCurrentPlaylist,
  setTitlePlaylist,
  setAllTracks,
  setCollectionTracks,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  setErrorMessage,
  setNextTrack,
  setPrevTrack,
  setIsShuffle,
} = trackSlice.actions;
// экспортируем редюсеры
export const trackSliceReducer = trackSlice.reducer;
