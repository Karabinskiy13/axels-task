import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';

import pictureReducer from './ducks/pictures';

const rootReducer = combineReducers({ pictureReducer });

const store = configureStore({
  reducer: rootReducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
export default store;
