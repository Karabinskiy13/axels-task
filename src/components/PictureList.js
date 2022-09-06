import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

import { deleteTags, getPictureByQuery, setTags } from '../redux/ducks/pictures';
import SinglePicture from '../components/SinglePicture';
import { Header, Tags } from '../styled/PictureList';
import ModalView from './ModalView';

const PictureList = () => {
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
  };
  const handleDelete = (index) => {
    dispatch(deleteTags(index));
    if (lastTags[index + 1] !== undefined) {
      dispatch(getPictureByQuery({ q: lastTags[index + 1].id, page: 1 }));
    } else {
      dispatch(getPictureByQuery({ q: '/', page: 1 }));
      console.log(lastTags[index + 1]);
    }
  };
  const handleTagClick = (index) => {
    dispatch(getPictureByQuery({ q: lastTags[index].id, page: 1 }));
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
