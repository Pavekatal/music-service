import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { trackSliceReducer } from './features/trackSlice';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useStore } from 'react-redux';

// создаем хранилище makeStore с использованием метода configureStore
export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      tracks: trackSliceReducer,
    }),
  });
};

// определяем тип makeStore
export type AppStore = ReturnType<typeof makeStore>;
// выведим типы \`RootState\` и \`AppDispatch\` из самого хранилища
type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];

// используем во всем приложении вместо простоых \`useDispatch\` и \`useSelector\`
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // чтобы вызывать редьюсеры
// export const useAppSelector = useSelector.withTypes<RootState>(); // чтобы получать состояние в любом компоненте
// export const useAppSrore = useStore.withTypes<AppStore>(); //

export const useAppDispatch: () => AppDispatch = useDispatch; // чтобы вызывать редьюсеры
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // чтобы получать состояние в любом компоненте
export const AppDispatch: () => AppStore = useStore;
