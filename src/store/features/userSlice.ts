import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '@shared-types/SharedTypes';

type initialStateType = {
  currentUser: null | UserType;
};

const initialState: initialStateType = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, logout } = userSlice.actions;

export const userSliceReduser = userSlice.reducer;
