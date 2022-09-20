import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { pictureService } from '../../services/picture.service';
import { ImagesType, Tag } from '../../types';

interface ImagesState {
  images: ImagesType[];
  lastTags: Tag[];
  status: null | string;
  error: null | undefined;
}

export const getPictureByQuery = createAsyncThunk(
  'pictureSlice/getPictureByQuery',
  async ({ q, page }: { q: string; page: number }, { rejectWithValue }) => {
    try {
      return await pictureService.getImagesByQuery(q, page);
    } catch (e) {
      rejectWithValue((e as AxiosError).message);
    }
  }
);

const initialState: ImagesState = {
  images: [],
  lastTags: [],
  status: null,
  error: null
};

const pictureSlice = createSlice({
  name: 'pictureSlice',
  initialState,
  reducers: {
    setTag(state, { payload }: { payload: Tag }) {
      if (state.lastTags.length === 3) {
        state.lastTags.splice(-1);
      }
      state.lastTags.unshift(payload);
    },
    deleteTag(state, { payload }: { payload: number }) {
      state.lastTags = state.lastTags.filter((tag, index) => index !== payload);
    },
    setInitialTags(state, { payload }) {
      state.lastTags = payload;
    },
    resetImages(state, { payload }) {
      state.images = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPictureByQuery.pending, (state) => {
      state.status = 'pending...';
      state.error = null;
    });
    builder.addCase(getPictureByQuery.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.images = action.payload.hits;
    });
    builder.addCase(getPictureByQuery.rejected, (state) => {
      state.status = 'error';
    });
  }
});

export const { setTag, deleteTag, setInitialTags, resetImages } = pictureSlice.actions;
const pictureReducer = pictureSlice.reducer;
export default pictureReducer;
