import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './ducks/auth';

import pictureReducer from './ducks/pictures';

const rootReducer = combineReducers({ pictureReducer, userReducer });

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
