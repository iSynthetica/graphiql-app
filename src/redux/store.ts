import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonReducer from './commonSlice';
import { createWrapper } from 'next-redux-wrapper';

export const rootReducer = combineReducers({
  common: commonReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(makeStore);
