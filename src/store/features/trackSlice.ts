import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@shared-types/SharedTypes';

// задаем типизацию для состояния по умолчанию
type initialStateType = {
  currentTrack: null | TrackType; // состояние для текущего трека: либо null, либо трек из массива data
};

// создаем состояние по умолчанию
const initialState: initialStateType = {
  currentTrack: null,
};
// создаем срез состояния создаем срез с именем tracks, включающий в себя состояние по умолчанию initialState и редьюсер setCurrentTrack
const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
  },
});

// экспортируем редюсер - функцию с помощью деструктуризации
export const { setCurrentTrack } = trackSlice.actions;
// экспортируем редюсеры
export const trackSliceReducer = trackSlice.reducer;
