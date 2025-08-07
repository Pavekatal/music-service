import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@shared-types/SharedTypes';

// задаем типизацию для состояния по умолчанию
type initialStateType = {
  currentTrack: null | TrackType; // состояние для текущего трека
  isPlay: boolean;
};

// создаем состояние по умолчанию
const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
};
// создаем срез состояния создаем срез с именем tracks, включающий в себя состояние по умолчанию initialState и редьюсер setCurrentTrack
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
  },
});

// экспортируем редюсер - функцию с помощью деструктуризации
export const { setCurrentTrack, setIsPlay } = trackSlice.actions;
// экспортируем редюсеры
export const trackSliceReducer = trackSlice.reducer;
