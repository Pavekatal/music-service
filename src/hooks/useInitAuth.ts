import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import {
  setAccessToken,
  setCurrentUser,
  setRefreshToken,
} from '../store/features/userSlice';
import { UserType } from '@shared-types/SharedTypes';

export const useInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const access = localStorage.getItem('access') || '';
    const refresh = localStorage.getItem('refresh') || '';
    const dataUserFromLS = localStorage.getItem('user');

    let currentUser: UserType = { email: '', username: '', _id: 0 };

    if (dataUserFromLS) {
      currentUser = JSON.parse(dataUserFromLS);
      dispatch(setCurrentUser(currentUser));
    }

    dispatch(setAccessToken(access));
    dispatch(setRefreshToken(refresh));
  }, [dispatch]);
};
