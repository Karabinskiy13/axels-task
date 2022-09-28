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
  error: null,
  page: 1,
  canLoadMore: true
};

describe('<Ducks>', () => {
  test('Should return the initial state', () => {
    expect(pictureReducer(undefined, { type: undefined })).toEqual({
      images: [],
      lastTags: [],
      status: null,
      error: null,
      page: 1,
      canLoadMore: true
    });
  });

  test('Should handle tags', () => {
    expect(pictureReducer(initialState, setTag({ id: 'Cats', text: 'Cats' }))).toEqual({
      images: [],
      lastTags: [{ id: 'Cats', text: 'Cats' }],
      status: null,
      error: null,
      page: 1,
      canLoadMore: true
    });
  });

  test('Should handle initial tags', () => {
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
      error: null,
      page: 1,
      canLoadMore: true
    });
  });

  test('Should return empty state of images', () => {
    expect(pictureReducer(initialState, resetImages())).toEqual({
      images: [],
      lastTags: [],
      status: null,
      error: null,
      page: 1,
      canLoadMore: true
    });
  });
});

describe('<ExtraReducers>', () => {
  describe('reducers', () => {
    test('Should sets status pending when Images is pending', () => {
      const action = { type: getPictureByQuery.pending.type };
      const state = pictureReducer(initialState, action);
      expect(state).toEqual({
        images: [],
        lastTags: [],
        status: 'pending...',
        error: null,
        page: 1,
        canLoadMore: true
      });
    });

    test('Should sets images when Images is fulfilled', () => {
      const action = {
        type: getPictureByQuery.fulfilled.type
      };

      const state = pictureReducer(initialState, {
        action,
        type: undefined
      });
      expect(state).toEqual({
        images: [],
        lastTags: [],
        status: 'fulfilled',
        error: null,
        page: 1,
        canLoadMore: true
      });
    });

    test('Should sets status error when Images is rejected', () => {
      const action = { type: getPictureByQuery.rejected.type, payload: { error: 'error' } };
      const state = pictureReducer(initialState, action);
      expect(state).toEqual({
        images: [],
        lastTags: [],
        status: 'error',
        error: null,
        page: 1,
        canLoadMore: true
      });
    });
  });
});
