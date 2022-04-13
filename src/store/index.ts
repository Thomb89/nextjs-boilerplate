import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseReducer } from './base';

export const rootReducer = combineReducers({ base: baseReducer });

export const store = configureStore({
  reducer: rootReducer,
  // don't forget to add middleware from api
  // middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat([]),
});

export type RootState = ReturnType<typeof rootReducer>;
