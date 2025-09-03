import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  isLoading: boolean;
};

const initialState: initialStateType = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = loadingSlice.actions;
export const loadingSliceReducer = loadingSlice.reducer;
