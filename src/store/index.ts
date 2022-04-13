import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseReducer } from './base';

export const rootReducer = combineReducers({ base: baseReducer });
export type RootState = ReturnType<typeof rootReducer>;

export const getStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as any, // errors only in this boilerplate?
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(),
  });
