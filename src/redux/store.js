import { configureStore, combineReducers } from '@reduxjs/toolkit';

import pictureReducer from '../redux/ducks/pictures';

const rootReducer = combineReducers({ pictureReducer });

const store = configureStore({
  reducer: rootReducer
});

export default store;
