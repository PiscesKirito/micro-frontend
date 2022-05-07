import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import LoginReducer from './slices/LoginSlice';
import counterReducer from '../controllers/counter/counterSlice';

export const store = configureStore({
  reducer: {
    login: LoginReducer,
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
