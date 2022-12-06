import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { pictureService } from '../../services/picture.service';
import { Favorite, Image, Tag } from '../../types';

interface ImagesState {
  images: Image[];
  lastTags: Tag[];
  favorites: Favorite[];
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
  favorites: [],
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
    addToFavorites(state, { payload }: { payload: Favorite }) {
      const index = state.favorites.findIndex(
        (el: Favorite) => el.previewURL == payload.previewURL
      );
      if (index == -1) state.favorites = [...state.favorites, payload];
    },

    removeFromFavorites(state, { payload }) {
      state.favorites = state.favorites.filter((picture) => picture.previewURL !== payload);
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

export const {
  setTag,
  deleteTag,
  setInitialTags,
  resetImages,
  increasePage,
  resetPage,
  addToFavorites,
  removeFromFavorites
} = pictureSlice.actions;
const pictureReducer = pictureSlice.reducer;
export default pictureReducer;
