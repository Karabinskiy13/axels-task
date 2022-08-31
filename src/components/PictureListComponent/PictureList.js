import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getPictureByQuery, setTags } from '../../store/slice/picture.slice';
import SinglePicture from '../SinglePictureComponent/SinglePicture';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

import './PictureList.css';

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
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="form__header">Picture Application</Form.Label>
          <Form.Control
            className="form__input"
            type="text"
            placeholder="Search by keywords"
            required
            {...register('searchValue')}
          />
        </Form.Group>
        {/* <div>{searchQuery.searchValue}</div> */}
        <Button variant="dark" type="submit" className="form__button">
          Submit
        </Button>
      </Form>
      <div className="form__tags">
        {lastTags.map((tag, index) => (
          <p key={index}>{tag},</p>
        ))}
      </div>
      <div className="pictures">
        {images && images.map((picture) => <SinglePicture key={picture.id} picture={picture} />)}
      </div>
    </div>
  );
};

export default PictureList;
