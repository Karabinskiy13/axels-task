import React from 'react';

import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';

import './SinglePicture.css';

const SinglePicture = ({ picture }) => {
  const { previewURL, tags } = picture;
  return (
    <div>
      <Card className="picture" border="primary" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Img className="picture__image" src={previewURL}></Card.Img>
          <Card.Header className="picture__title">{tags}</Card.Header>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SinglePicture;
