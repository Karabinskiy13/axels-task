import React from 'react';
import { expect } from '@jest/globals';

import pictureReducer, {
  setTag,
  setInitialTags,
  resetImages,
  getPictureByQuery
} from '../redux/ducks/pictures';

const initialState = {
  images: [],
  lastTags: [],
  status: null,
  error: null
};

describe('<Ducks>', () => {
  it('should return the initial state', () => {
    expect(pictureReducer(undefined, { type: undefined })).toEqual({
      images: [],
      lastTags: [],
      status: null,
      error: null
    });
  });

  it('should handle tags', () => {
    expect(pictureReducer(initialState, setTag({ id: 'Cats', text: 'Cats' }))).toEqual({
      images: [],
      lastTags: [{ id: 'Cats', text: 'Cats' }],
      status: null,
      error: null
    });
  });

  it('should handle initial tags', () => {
    expect(
      pictureReducer(
        initialState,
        setInitialTags([
          { id: 'Dogs', text: 'Dogs' },
          { id: 'Cats', text: 'Cats' },
          { id: 'Moon', text: 'Moon' }
        ])
      )
    ).toEqual({
      images: [],
      lastTags: [
        { id: 'Dogs', text: 'Dogs' },
        { id: 'Cats', text: 'Cats' },
        { id: 'Moon', text: 'Moon' }
      ],
      status: null,
      error: null
    });
  });

  it('should return empty state of images', () => {
    expect(pictureReducer(initialState, resetImages([]))).toEqual({
      images: [],
      lastTags: [],
      status: null,
      error: null
    });
  });
});

describe('<ExtraReducers>', () => {
  describe('reducers', () => {
    it('sets fetching true when Images is pending', () => {
      const action = { type: getPictureByQuery.pending.type };
      const state = pictureReducer(initialState, action);
      expect(state).toEqual({ images: [], lastTags: [], status: 'pending...', error: null });
    });

    it('sets images when getPictureByQuery is fulfilled', () => {
      const action = {
        type: getPictureByQuery.fulfilled.type,
        payload: {
          total: 1,
          totalHits: 1,
          hits: []
        }
      };

      const state = pictureReducer(initialState, action);
      expect(state).toEqual({
        images: [],
        lastTags: [],
        status: 'fulfilled',
        error: null
      });
    });

    it('sets fetching false when getPictureByQuery is rejected', () => {
      const action = { type: getPictureByQuery.rejected.type, payload: { error: 'error' } };
      const state = pictureReducer(initialState, action);
      expect(state).toEqual({ images: [], lastTags: [], status: 'error', error: null });
    });
  });
});
