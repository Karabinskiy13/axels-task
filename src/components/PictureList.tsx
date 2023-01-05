import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import { useQueryParams, StringParam, ArrayParam } from 'use-query-params';
import { Box, Button, Grid, Container } from '@mui/material';

import {
  deleteTag,
  getPictureByQuery,
  setTag,
  resetImages,
  setInitialTags,
  increasePage
} from '../redux/ducks/pictures';
import useAuth from '../hooks';
import { ModalView, SinglePicture } from './index';
import store, { RootState } from '../redux/store';
import { Tag } from '../types';
import Header from './Header';

import { TagsStyle, LoadMore } from '../styled/PictureList';

const PictureList = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const { images, lastTags, canLoadMore } = useSelector((state: RootState) => state.pictureReducer);

  const [modalStatus, setModalStatus] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [activeTag, setActiveTag] = useState('');

  const openModal = (url: string) => {
    setModalStatus(true);
    setModalImageUrl(url);
  };

  const loadMore = async () => {
    store.dispatch(increasePage());
    store.dispatch(getPictureByQuery({ q: activeTag }));
  };
  const [query, setQuery] = useQueryParams({
    tags: ArrayParam,
    activeTag: StringParam,
    previewURL: StringParam
  });

  useEffect(() => {
    setQuery({
      tags: lastTags.map((tag) => tag.id),
      activeTag: activeTag || undefined,
      previewURL: modalImageUrl || undefined
    });
  }, [lastTags, activeTag, modalImageUrl]);

  useEffect(() => {
    lastTags.length === 0 ? dispatch(resetImages()) : false;
  }, [lastTags]);

  useEffect(() => {
    if (query.tags) {
      dispatch(
        setInitialTags(
          query.tags.map((t) => {
            return { id: t, text: t };
          })
        )
      );

      if (!query.activeTag) {
        store.dispatch(getPictureByQuery({ q: query.tags[0] as string }));
      } else {
        setActiveTag(query.activeTag);
        store.dispatch(getPictureByQuery({ q: query.activeTag }));
      }
    }

    if (query.previewURL) {
      openModal(query.previewURL);
    }
  }, []);

  const handleAddition = (tag: Tag) => {
    dispatch(setTag(tag));
    setActiveTag(tag.id);

    store.dispatch(getPictureByQuery({ q: tag.id, reset: true }));
  };
  const handleDelete = (index: number) => {
    dispatch(deleteTag(index));
    setActiveTag('');

    store.dispatch(
      getPictureByQuery({
        q: lastTags[index + 1] ? lastTags[index + 1].id : lastTags[index - 1].id,
        reset: true
      })
    );
  };
  const handleTagClick = (index: number) => {
    store.dispatch(getPictureByQuery({ q: lastTags[index].id, reset: true }));
    setActiveTag(lastTags[index].id);
  };
  return isAuth ? (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Header />
      </Box>
      <TagsStyle>
        <ReactTags
          inputFieldPosition="top"
          allowDragDrop={false}
          tags={lastTags}
          handleAddition={handleAddition}
          handleDelete={handleDelete}
          handleTagClick={handleTagClick}
        />
      </TagsStyle>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {images &&
            images.map((picture) => (
              <SinglePicture
                key={picture.id}
                picture={picture}
                showModal={() => openModal(picture.largeImageURL)}
              />
            ))}
        </Grid>
      </Container>

      {activeTag && (
        <LoadMore>
          <Button
            variant="outlined"
            size="large"
            disabled={!canLoadMore}
            onClick={loadMore}
            color="info">
            Load more
          </Button>
        </LoadMore>
      )}

      <ModalView
        show={modalStatus}
        url={modalImageUrl}
        hideModal={() => {
          setModalImageUrl('');
          setModalStatus(false);
        }}
      />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PictureList;
