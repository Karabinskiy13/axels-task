import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { pictureService } from '../../services/picture.service';
import { Image, Tag } from '../../types';

interface ImagesState {
  images: Image[];
  lastTags: Tag[];
  page: number;
  canLoadMore: boolean;
  status: null | string;
  error: null | undefined;
}

export const getPictureByQuery = createAsyncThunk(
  'pictureSlice/getPictureByQuery',
  async (
    { q, reset = false }: { q: string; reset?: boolean },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      if (reset) {
        await dispatch(resetPage());
        await dispatch(resetImages());
        return await pictureService.getImagesByQuery(q, 1);
      } else {
        const state = getState() as {
          pictureReducer: ImagesState;
        };
        return await pictureService.getImagesByQuery(q, state.pictureReducer.page);
      }
    } catch (error) {
      rejectWithValue((error as AxiosError).message);
    }
  }
);

const initialState: ImagesState = {
  images: [],
  lastTags: [],
  page: 1,
  canLoadMore: true,
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
    resetImages(state) {
      state.images = [];
    },
    increasePage(state) {
      state.page += 1;
    },
    resetPage(state) {
      state.page = 1;
      state.canLoadMore = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPictureByQuery.pending, (state) => {
      state.status = 'pending...';
      state.error = null;
    });
    builder.addCase(getPictureByQuery.fulfilled, (state, { payload }) => {
      state.status = 'fulfilled';
      if (!payload) return;
      state.images = [...state.images, ...payload.hits];
      if (payload.hits.length < 24 || !payload) state.canLoadMore = false;
    });
    builder.addCase(getPictureByQuery.rejected, (state) => {
      state.status = 'error';
    });
  }
});

export const { setTag, deleteTag, setInitialTags, resetImages, increasePage, resetPage } =
  pictureSlice.actions;
const pictureReducer = pictureSlice.reducer;
export default pictureReducer;
