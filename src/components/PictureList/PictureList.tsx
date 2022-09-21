import React from 'react';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import { useQueryParams, StringParam, ArrayParam } from 'use-query-params';
import { Container, Row, Col, Form } from 'react-bootstrap';

import {
  deleteTag,
  getPictureByQuery,
  setTag,
  resetImages,
  setInitialTags
} from '../../redux/ducks/pictures';
import { ModalView, SinglePicture } from '../index';

import { Header, TagsStyle } from '../../styled/PictureList';
import store, { RootState } from '../../redux/store';
import { Tag } from '../../types';

const PictureList = () => {
  const dispatch = useDispatch();
  const { images, lastTags } = useSelector((state: RootState) => state.pictureReducer);

  const [modalStatus, setModalStatus] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const openModal = (url: string) => {
    setModalStatus(true);
    setModalImageUrl(url);
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
    lastTags.length === 0 ? dispatch(resetImages([])) : false;
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
        store.dispatch(getPictureByQuery({ q: query.tags[0] as string, page: 1 }));
      } else {
        setActiveTag(query.activeTag);
        store.dispatch(getPictureByQuery({ q: query.activeTag, page: 1 }));
      }
    }

    if (query.previewURL) {
      openModal(query.previewURL);
    }
  }, []);

  const handleAddition = (tag: Tag) => {
    dispatch(setTag(tag));
    store.dispatch(getPictureByQuery({ q: tag.id, page: 1 }));
  };
  const handleDelete = (index: number) => {
    dispatch(deleteTag(index));
    store.dispatch(
      getPictureByQuery({
        q: lastTags[index + 1] ? lastTags[index + 1].id : lastTags[index - 1].id,
        page: 1
      })
    );
  };
  const handleTagClick = (index: number) => {
    store.dispatch(getPictureByQuery({ q: lastTags[index].id, page: 1 }));
    setActiveTag(lastTags[index].id);
  };
  return (
    <div>
      <Header>
        <Form.Label className="form__header">Picture Application</Form.Label>
      </Header>
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
      <Container fluid>
        <Row>
          {images &&
            images.map((picture) => (
              <Col sm={6} md={4} xl={2} key={picture.id}>
                <SinglePicture
                  picture={picture}
                  showModal={() => openModal(picture.largeImageURL)}
                />
              </Col>
            ))}
        </Row>
      </Container>
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
