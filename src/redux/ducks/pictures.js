import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { pictureService } from '../../services/picture.service';

export const getPictureByQuery = createAsyncThunk(
  'pictureSlice/getPictureByQuery',
  async ({ q, page }, { rejectedWithValue }) => {
    try {
      return await pictureService.getImagesByQuery(q, page);
    } catch (e) {
      rejectedWithValue(e.message);
    }
  }
);

const pictureSlice = createSlice({
  name: 'pictureSlice',
  initialState: {
    images: [],
    lastTags: [],
    status: null,
    error: null
  },
  reducers: {
    setTags(state, action) {
      if (state.lastTags.length === 3) {
        state.lastTags.splice(-1);
      }
      state.lastTags.unshift(action.payload);
    }
  },
  extraReducers: {
    [getPictureByQuery.pending]: (state) => {
      state.status = 'pending...';
      state.error = null;
    },
    [getPictureByQuery.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.images = action.payload.hits;
    },
    [getPictureByQuery.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    }
  }
});

export const { setTags } = pictureSlice.actions;
const pictureReducer = pictureSlice.reducer;
export default pictureReducer;
