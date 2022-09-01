import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getPictureByQuery, setTags } from '../../redux/ducks/pictures';
import SinglePicture from '../SinglePictureComponent/SinglePicture';
import { Forma, Header, Tags } from '../../styled/PictureList';

const PictureList = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { images, lastTags } = useSelector((state) => state.pictureReducer);
  const onSubmit = ({ searchValue }, e) => {
    e.preventDefault();
    dispatch(getPictureByQuery({ q: `${searchValue}`, page: 1 }));
    dispatch(setTags(searchValue));
  };

  return (
    <div>
      <Forma>
        <Form onSubmit={handleSubmit(onSubmit)} className="form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Header>
              <Form.Label className="form__header">Picture Application</Form.Label>
            </Header>
            <Form.Control
              className="form__input"
              type="text"
              placeholder="Search by keywords"
              required
              {...register('searchValue')}
            />
          </Form.Group>
          <Button variant="dark" type="submit" className="form__button">
            Submit
          </Button>
        </Form>
      </Forma>
      <Tags>
        {lastTags.map((tag, index) => (
          <p key={index}>{tag},</p>
        ))}
      </Tags>
      <Container fluid>
        <Row>
          {images && images.map((picture) => <SinglePicture key={picture.id} picture={picture} />)}
        </Row>
      </Container>
    </div>
  );
};

export default PictureList;
