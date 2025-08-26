import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '@shared-types/SharedTypes';

type initialStateType = {
  currentUser: null | UserType;
  access: string;
  refresh: string;
};

const initialState: initialStateType = {
  currentUser: null,
  access: '',
  refresh: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
      localStorage.setItem('access', action.payload);
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refresh = action.payload;
      localStorage.setItem('refresh', action.payload);
    },
    logout: (state) => {
      state.currentUser = null;
      state.access = '';
      state.refresh = '';
      localStorage.clear();
    },
  },
});

export const { setCurrentUser, setAccessToken, setRefreshToken, logout } =
  userSlice.actions;

export const userSliceReduser = userSlice.reducer;
