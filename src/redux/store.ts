import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonReducer from './commonSlice';
import editorReducer from './editorSlice';
import { createWrapper } from 'next-redux-wrapper';
import { graphqlApi } from '@/api/graphql';

export const rootReducer = combineReducers({
  common: commonReducer,
  editor: editorReducer,
  [graphqlApi.reducerPath]: graphqlApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(graphqlApi.middleware),
});

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(graphqlApi.middleware),
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(makeStore);
