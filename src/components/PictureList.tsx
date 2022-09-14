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
import { ModalView, SinglePicture } from './index';

import { Header, Tags } from '../styled/PictureList';

const PictureList = () => {
  const dispatch = useDispatch();
  const { images, lastTags } = useSelector((state) => state.pictureReducer);

  const [modalStatus, setModalStatus] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const openModal = (url: React.SetStateAction<string>) => {
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
      tags: lastTags.map((t: { id: number; }) => t.id),
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
      !query.activeTag
        ? dispatch(getPictureByQuery({ q: query.tags[0], page: 1 }))
        : setActiveTag(query.activeTag),
        dispatch(getPictureByQuery({ q: query.activeTag, page: 1 }));

      query.previewURL ? openModal(query.previewURL) : false;
    }
  }, []);

  const handleAddition = (tag: { id: number; }) => {
    dispatch(setTag(tag));
    dispatch(getPictureByQuery({ q: tag.id, page: 1 }));
  };
  const handleDelete = (index: number) => {
    dispatch(deleteTag(index));
    dispatch(
      getPictureByQuery({
        q: lastTags[index + 1] ? lastTags[index + 1].id : lastTags[index - 1].id,
        page: 1
      })
    );
  };
  const handleTagClick = (index: number) => {
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
            images.map((picture: { id: React.Key | null | undefined; largeImageURL: any; }) => (
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
