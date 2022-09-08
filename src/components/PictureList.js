import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { deleteTags, getPictureByQuery, setTags } from '../redux/ducks/pictures';
import SinglePicture from './SinglePicture';
import ModalView from './ModalView';
import { Header, Tags } from '../styled/PictureList';
import { Outlet } from 'react-router-dom';

const PictureList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { images, lastTags } = useSelector((state) => state.pictureReducer);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const openModal = (url) => {
    setModalStatus(true);
    setModalImageUrl(url);
  };

  const handleAddition = (tag) => {
    dispatch(setTags(tag));
    dispatch(getPictureByQuery({ q: tag.id, page: 1 }));
    navigate(`${tag.id}`);
  };
  const handleDelete = (index) => {
    dispatch(deleteTags(index));
    if (lastTags[index + 1] !== undefined) {
      dispatch(getPictureByQuery({ q: lastTags[index + 1].id, page: 1 }));
      navigate(`${lastTags[index + 1].id}`);
    } else {
      dispatch(getPictureByQuery({ q: '/', page: 1 }));
      navigate('/');
    }
  };
  const handleTagClick = (index) => {
    dispatch(getPictureByQuery({ q: lastTags[index].id, page: 1 }));
    navigate(`${lastTags[index].id}`);
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
              <Col sm={12} md={4} xl={3} key={picture.id}>
                <SinglePicture
                  picture={picture}
                  showModal={() => openModal(picture.largeImageURL)}
                />
              </Col>
            ))}
        </Row>
      </Container>
      <Outlet />
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
