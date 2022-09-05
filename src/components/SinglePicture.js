import React from 'react';

import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Picture, Columns } from '../styled/SinglePicture';

const SinglePicture = ({ picture, showModal }) => {
  const { previewURL, tags } = picture;
  return (
    <Columns onClick={() => showModal()}>
      <Picture className="picture" border="dark" style={{ width: '18rem' }}>
        <Card.Body style={{ minHeight: '250px' }}>
          <Card.Img
            style={{ maxHeight: '150px', minHeight: '160px' }}
            className="picture__image"
            src={previewURL}></Card.Img>
          <Card.Header className="picture__title">{tags}</Card.Header>
        </Card.Body>
      </Picture>
    </Columns>
  );
};

export default SinglePicture;
