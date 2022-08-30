import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPictureByQuery } from '../../store/slice/picture.slice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import SinglePicture from '../SinglePictureComponent/SinglePicture';

const PictureList = () => {
  //   const [key, setKey] = useState('');
  //   const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.pictureReducer);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getPictureByQuery({ q: `${searchQuery}`, page: 1 }));
  }, [dispatch]);
  console.log(images);
  const searchValue = images.filter((image) => {
    return image.tags.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Picture Application</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search with keywords"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        {searchValue &&
          searchValue.map((picture) => <SinglePicture key={picture.id} picture={picture} />)}
      </div>
    </div>
  );
};

export default PictureList;
