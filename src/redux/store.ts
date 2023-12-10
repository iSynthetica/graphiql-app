import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonReducer from './commonSlice';
import { Context, createWrapper } from 'next-redux-wrapper';

export const rootReducer = combineReducers({
  common: commonReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

