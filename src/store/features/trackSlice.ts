import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@shared-types/SharedTypes';

// задаем типизацию для состояния по умолчанию
type initialStateType = {
  currentTrack: null | TrackType; // состояние для текущего трека
  isPlay: boolean;
  currentTime: number;
};

// создаем состояние по умолчанию
const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  currentTime: 0,
};
// создаем срез состояния с именем tracks, включающий в себя состояние по умолчанию initialState и редьюсеры setCurrentTrack, setIsPlay:
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
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
  },
});

// экспортируем редюсер - функцию с помощью деструктуризации
export const { setCurrentTrack, setIsPlay, setCurrentTime } =
  trackSlice.actions;
// экспортируем редюсеры
export const trackSliceReducer = trackSlice.reducer;
