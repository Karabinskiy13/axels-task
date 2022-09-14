import { configureStore, combineReducers } from '@reduxjs/toolkit';

import pictureReducer from './ducks/pictures';

const rootReducer = combineReducers({ pictureReducer });

const store = configureStore({
  reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
