import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Picture } from '../../styled/SinglePicture';

const SinglePicture = ({ picture }) => {
  const { previewURL, tags } = picture;
  return (
    <Col>
      <Picture>
        <Card className="picture" border="dark" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Img
              style={{ maxHeight: '150px' }}
              className="picture__image"
              src={previewURL}></Card.Img>
            <Card.Header className="picture__title">{tags}</Card.Header>
          </Card.Body>
        </Card>
      </Picture>
    </Col>
  );
};

export default SinglePicture;
