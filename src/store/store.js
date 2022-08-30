import { configureStore, combineReducers } from '@reduxjs/toolkit';

import pictureReducer from './slice/picture.slice';

const rootReducer = combineReducers({ pictureReducer });

const store = configureStore({
  reducer: rootReducer
});

export default store;
