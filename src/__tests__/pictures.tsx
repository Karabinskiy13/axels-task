import React from 'react';
import { expect } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { Image } from '../types';

import pictureReducer, {
  setTag,
  setInitialTags,
  resetImages,
  getPictureByQuery
} from '../redux/ducks/pictures';

import { pictureService } from '../services/picture.service';

const initialState = {
  images: [],
  lastTags: [],
  status: null,
  error: null,
  page: 1,
  canLoadMore: true
};

const imagesResponse: Image[] = [
  {
    id: 1,
    previewURL: '/image.png',
    tags: 'tags',
    largeImageURL: '/'
  },
  {
    id: 1,
    previewURL: '/image.png',
    tags: 'tags',
    largeImageURL: '/'
  }
];

const imagesResponse1: Image[] = [
  {
    id: 1,
    previewURL: '/image.png',
    tags: 'tags',
    largeImageURL: '/'
  }
];

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
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Should set status pending when Images is pending', () => {
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

  test('Should set images when Images is fulfilled', async () => {
    jest
      .spyOn(pictureService, 'getImagesByQuery')
      .mockResolvedValue({ hits: imagesResponse, total: 100 });

    const params = {
      q: 'cats',
      reset: true
    };
    const store = configureStore({
      reducer: pictureReducer
    });

    await store.dispatch(getPictureByQuery(params));
    expect(store.getState().images).toEqual(imagesResponse);
  });

  test('Should set status error when Images is rejected', () => {
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
