import React from 'react';

import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Columns } from '../styled/SinglePicture';

const SinglePicture = ({ picture, showModal }) => {
  const { previewURL, tags } = picture;
  return (
    <Columns>
      <Card
        className="picture"
        onClick={() => showModal()}
        border="dark"
        style={{ cursor: 'pointer' }}>
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Img
            style={{ minHeight: '220px', maxWidth: '350px', height: '100%', width: 'auto' }}
            className="picture__image"
            src={previewURL}
          />
          <Card.Header className="picture__title">{tags}</Card.Header>
        </Card.Body>
      </Card>
    </Columns>
  );
};

export default SinglePicture;
