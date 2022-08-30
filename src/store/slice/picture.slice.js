import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { pictureService } from '../../services/picture.service';

export const getPictureByQuery = createAsyncThunk(
  'pictureSlice/getPictureByQuery',
  async (_, { rejectedWithValue }) => {
    try {
      return await pictureService.getImagesByQuery();
    } catch (e) {
      rejectedWithValue(e.message);
    }
  }
);

const pictureSlice = createSlice({
  name: 'pictureSlice',
  initialState: {
    images: [],
    status: null,
    error: null
  },
  reducers: {},
  extraReducers: {
    [getPictureByQuery.pending]: (state) => {
      state.status = 'pending...';
      state.error = null;
    },
    [getPictureByQuery.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.images = action.payload.hits;
      console.log(action.payload);
    },
    [getPictureByQuery.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    }
  }
});

const pictureReducer = pictureSlice.reducer;
export default pictureReducer;
