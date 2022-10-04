import React from 'react';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import { useQueryParams, StringParam, ArrayParam } from 'use-query-params';
import { AppBar, Box, Toolbar, Typography, Button, ImageList, ImageListItem } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import {
  deleteTag,
  getPictureByQuery,
  setTag,
  resetImages,
  setInitialTags,
  increasePage
} from '../redux/ducks/pictures';
import { ModalView, SinglePicture } from './index';
import store, { RootState } from '../redux/store';
import { Tag } from '../types';

import { TagsStyle, LoadMore } from '../styled/PictureList';

const PictureList = () => {
  const dispatch = useDispatch();
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
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
              display="flex"
              alignItems="center"
              justifyContent="center">
              <CameraAltIcon />
              Picture Application
            </Typography>
          </Toolbar>
        </AppBar>
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
      <ImageList sx={{ width: '100%', height: '100%' }} cols={6} rowHeight="auto" gap={15}>
        {images &&
          images.map((picture) => (
            <ImageListItem key={picture.id}>
              <SinglePicture picture={picture} showModal={() => openModal(picture.largeImageURL)} />
            </ImageListItem>
          ))}
      </ImageList>
      <LoadMore>
        <Button
          variant="outlined"
          size="large"
          disabled={!canLoadMore || !activeTag}
          onClick={loadMore}
          color="info">
          Load more
        </Button>
      </LoadMore>
      <ModalView
        show={modalStatus}
        url={modalImageUrl}
        hideModal={() => {
          setModalImageUrl('');
          setModalStatus(false);
        }}
      />
    </div>
  );
};

export default PictureList;
