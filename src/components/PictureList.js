import React from 'react';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import { useQueryParams, StringParam, ArrayParam } from 'use-query-params';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  deleteTag,
  getPictureByQuery,
  setTag,
  resetImages,
  setInitialTags
} from '../redux/ducks/pictures';
import SinglePicture from './SinglePicture';
import ModalView from './ModalView';
import { Header, Tags } from '../styled/PictureList';

const PictureList = () => {
  const dispatch = useDispatch();
  const { images, lastTags } = useSelector((state) => state.pictureReducer);

  const [modalStatus, setModalStatus] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const openModal = (url) => {
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
      tags: lastTags.map((t) => t.id),
      activeTag: activeTag || undefined,
      previewURL: modalImageUrl || undefined
    });
  }, [lastTags, activeTag, modalImageUrl]);

  useEffect(() => {
    if (lastTags.length === 0) dispatch(resetImages());
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
        dispatch(getPictureByQuery({ q: query.tags[0], page: 1 }));
      } else {
        setActiveTag(query.activeTag);
        dispatch(getPictureByQuery({ q: query.activeTag, page: 1 }));
      }
    }

    if (query.previewURL) {
      openModal(query.previewURL);
    }
  }, []);

  const handleAddition = (tag) => {
    dispatch(setTag(tag));
    dispatch(getPictureByQuery({ q: tag.id, page: 1 }));
  };
  const handleDelete = (index) => {
    dispatch(deleteTag(index));
    dispatch(
      getPictureByQuery({
        q: lastTags[index + 1] ? lastTags[index + 1].id : lastTags[index - 1].id,
        page: 1
      })
    );
  };
  const handleTagClick = (index) => {
    dispatch(getPictureByQuery({ q: lastTags[index].id, page: 1 }));
    setActiveTag(lastTags[index].id);
  };
  return (
    <div>
      <Header>
        <Form.Label className="form__header">Picture Application</Form.Label>
      </Header>
      <Tags>
        <ReactTags
          inputFieldPosition="top"
          allowDragDrop={false}
          tags={lastTags}
          handleAddition={handleAddition}
          handleDelete={handleDelete}
          handleTagClick={handleTagClick}
        />
      </Tags>
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
